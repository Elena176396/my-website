const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: { message: '仅支持 POST 请求' } });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: { message: '服务端尚未配置 DEEPSEEK_API_KEY' } });
  }

  const input = req.body || {};

  const isTest = input.test === true;
  const messages = isTest
    ? [{ role: 'user', content: 'Reply with exactly: OK' }]
    : input.messages;

  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 17) {
    return res.status(400).json({ error: { message: '对话消息数量无效' } });
  }

  const safeMessages = messages.map((msg) => {
    const role = msg && typeof msg === 'object' ? msg.role : null;
    const content = msg && typeof msg === 'object' ? msg.content : null;
    if (!['user', 'assistant'].includes(role) || typeof content !== 'string') return null;
    return { role, content: content.slice(0, 6000) };
  });

  if (safeMessages.some((msg) => msg === null)) {
    return res.status(400).json({ error: { message: '对话消息格式无效' } });
  }

  // DeepSeek 用 OpenAI 格式：system 是 messages 数组的第一条
  const system = typeof input.system === 'string' ? input.system.slice(0, 6000) : undefined;
  const allMessages = system
    ? [{ role: 'system', content: system }, ...safeMessages]
    : safeMessages;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 28000);

  try {
    const upstream = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        max_tokens: isTest ? 32 : 1000,
        messages: allMessages,
        temperature: 0.7,
        stream: false,
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error('DeepSeek API error', upstream.status, data?.error?.message);
      return res.status(502).json({ error: { message: 'AI 服务暂时不可用' } });
    }

    const text = data?.choices?.[0]?.message?.content?.trim() || '';

    // 前端读的是 Anthropic 格式：data.content[{type,text}]
    // 这里把 DeepSeek 的返回转成前端期望的格式
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      content: [{ type: 'text', text }],
    });
  } catch (error) {
    const message = error instanceof Error && error.name === 'AbortError'
      ? '上游接口请求超时'
      : '无法连接上游接口';
    return res.status(502).json({ error: { message } });
  } finally {
    clearTimeout(timeout);
  }
}
