const TIMICC_MESSAGES_URL = 'https://timicc.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: { message: '仅支持 POST 请求' } });
  }

  const apiKey = process.env.TIMICC_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: { message: '服务端尚未配置 TIMICC_API_KEY' } });
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

  const system = typeof input.system === 'string' ? input.system.slice(0, 6000) : undefined;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 28000);

  try {
    const upstream = await fetch(TIMICC_MESSAGES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        max_tokens: isTest ? 32 : 1000,
        ...(system ? { system } : {}),
        messages: safeMessages,
      }),
    });

    const body = await upstream.text();
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(upstream.status).send(body);
  } catch (error) {
    const message = error instanceof Error && error.name === 'AbortError'
      ? '上游接口请求超时'
      : '无法连接上游接口';
    return res.status(502).json({ error: { message } });
  } finally {
    clearTimeout(timeout);
  }
}
