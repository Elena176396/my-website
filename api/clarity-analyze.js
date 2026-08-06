const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestLog = new Map();

const SYSTEM_PROMPT = `你是一位决策思维教练，擅长第一性原理分析。用户刚完成了一份 7 步决策拆解练习。请完成：
1. 矛盾检测：找出自相矛盾或未自觉的假设
2. 盲点提示：指出 2-3 个可能忽略的角度
3. 风险评估：各指出一个最关键的短期与长期风险
4. 行动建议：把 48 小时行动变成一个更具体的验证步骤
5. 核心洞察：用一句话总结最重要的发现

使用中文，直接简洁，不重复用户内容。用 Markdown 标题分隔，每部分 2-4 句话。`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "仅支持 POST 请求" });
  }
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(503).json({ error: "AI 分析尚未配置" });
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "local")
    .split(",")[0]
    .trim();
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    return res.status(429).json({ error: "请求过于频繁，请稍后重试" });
  }
  recent.push(now);
  requestLog.set(ip, recent);

  const draft = req.body?.draft;
  if (!draft?.decision) return res.status(400).json({ error: "缺少决策内容" });
  const userContent = Object.entries(draft)
    .filter(([, value]) => typeof value === "string" && value.trim())
    .map(([key, value]) => `【${key}】${value}`)
    .join("\n\n");
  if (userContent.length > 20000) {
    return res.status(413).json({ error: "内容过长，请精简后重试" });
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `以下是我的决策拆解记录：\n\n${userContent}` },
        ],
        max_tokens: 1500,
        temperature: 0.4,
        stream: false,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("DeepSeek API error", response.status, data?.error?.message);
      return res.status(502).json({ error: "AI 服务暂时不可用，请稍后重试" });
    }
    const analysis = data?.choices?.[0]?.message?.content?.trim();
    if (!analysis) return res.status(502).json({ error: "AI 未返回分析结果" });
    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("Clarity AI analysis error", error);
    return res.status(500).json({ error: "AI 分析失败，请稍后重试" });
  }
}
