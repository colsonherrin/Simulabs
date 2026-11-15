// Simulacra voice relay: lets the hosted pages give Sim her live voice with no key in the page.
//
// The OpenAI key lives here, as a secret on this worker, and never reaches a browser. A page asks
// this worker for a pass; the worker asks OpenAI for a short-lived one (good only for starting a
// live voice call, expiring within minutes) and hands that over.
//
// Deploy (Cloudflare Workers, free plan):
//   1. dash.cloudflare.com -> Workers & Pages -> Create -> "Hello World" worker -> Deploy.
//   2. Edit code: replace everything with this file. Deploy.
//   3. Settings -> Variables and Secrets -> add a Secret named OPENAI_API_KEY with the key.
//   4. Optional: add a plain variable ALLOWED_ORIGINS, e.g. https://colsonherrin.github.io
//   5. Put the worker's address in sim-config.json at the root of the site ("tokenUrl").
//
// Anyone who opens the site can then talk to Sim on this key, so: passes are only given to the
// allowed site, each visitor is limited, and you should set a monthly spending limit on the key.

const PER_VISITOR_PER_HOUR = 20;
const recent = new Map(); // visitor -> times of recent passes (best effort: per worker instance)

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || 'https://colsonherrin.github.io').split(',').map((s) => s.trim()).filter(Boolean);
    const ok = allowed.includes('*') || allowed.includes(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin);
    const cors = { 'Access-Control-Allow-Origin': ok ? origin : allowed[0], 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'content-type', Vary: 'Origin' };
    const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...cors } });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return reply(405, { error: 'POST only' });
    if (!ok) return reply(403, { error: 'this site is not allowed to use this relay' });
    if (!env.OPENAI_API_KEY) return reply(500, { error: 'the relay has no OPENAI_API_KEY secret yet' });

    const visitor = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    const times = (recent.get(visitor) || []).filter((t) => now - t < 3600_000);
    if (times.length >= PER_VISITOR_PER_HOUR) return reply(429, { error: 'too many voice sessions from this network in the last hour' });
    times.push(now);
    recent.set(visitor, times);
    if (recent.size > 5000) recent.clear();

    const res = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ session: { type: 'realtime', model: env.REALTIME_MODEL || 'gpt-realtime' } }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.value) return reply(502, { error: 'OpenAI refused: ' + ((data.error && data.error.message) || res.status) });
    return reply(200, { value: data.value, expires_at: data.expires_at });
  },
};
