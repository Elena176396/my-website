import type { APIRoute } from 'astro';

export const prerender = false;

const TIMICC_MESSAGES_URL = 'https://timicc.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.TIMICC_API_KEY;
  if (!apiKey) {
    return json({ error: { message: '服务端尚未配置 TIMICC_API_KEY' } }, 503);
  }

  let input: { system?: unknown; messages?: unknown; test?: unknown };
  try {
    input = await request.json();
  } catch {
    return json({ error: { message: '请求内容不是有效 JSON' } }, 400);
  }

  const isTest = input.test === true;
  const messages = isTest
    ? [{ role: 'user', content: 'Reply with exactly: OK' }]
    : input.messages;

  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 17) {
    return json({ error: { message: '对话消息数量无效' } }, 400);
  }

  const safeMessages = messages.map((message) => {
    const role = message && typeof message === 'object' ? Reflect.get(message, 'role') : null;
    const content = message && typeof message === 'object' ? Reflect.get(message, 'content') : null;
    if (!['user', 'assistant'].includes(role) || typeof content !== 'string') return null;
    return { role, content: content.slice(0, 6000) };
  });

  if (safeMessages.some((message) => message === null)) {
    return json({ error: { message: '对话消息格式无效' } }, 400);
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
    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const message = error instanceof Error && error.name === 'AbortError'
      ? '上游接口请求超时'
      : '无法连接上游接口';
    return json({ error: { message } }, 502);
  } finally {
    clearTimeout(timeout);
  }
};
