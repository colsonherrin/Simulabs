// The setup page: paste keys in a browser instead of editing a file.
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import WebSocket from 'ws';
import { startServer } from '../src/server.js';
import { opts } from './helpers.js';

test('setup: pasted keys are checked, saved, and used without a restart', async () => {
  // A stand-in for both providers: accepts exactly one key each.
  const provider = createServer((req, res) => {
    const good = req.headers['x-api-key'] === 'sk-ant-good' || req.headers.authorization === 'Bearer sk-good';
    res.writeHead(good ? 200 : 401).end('{}');
  });
  await new Promise<void>((r) => provider.listen(0, '127.0.0.1', r));
  const cloud = `http://127.0.0.1:${(provider.address() as any).port}`;
  const envPath = join(mkdtempSync(join(tmpdir(), 'simulacra-')), '.env');
  writeFileSync(envPath, '# mine\nPORT=8787\nOPENAI_API_KEY=old\n');
  const { port, close } = await startServer({ ...opts({ url: cloud }, { brain: 'mock', anthropicKey: undefined, envPath, openaiBaseUrl: cloud }) });
  const base = `http://127.0.0.1:${port}`;
  const post = async (body: object) => (await fetch(base + '/setup', { method: 'POST', body: JSON.stringify(body) })).json() as Promise<any>;
  try {
    assert.match(await (await fetch(base + '/setup')).text(), /Simulacra setup/);
    assert.deepEqual(await (await fetch(base + '/setup/status')).json(), { brain: 'mock', anthropic: false, openai: false, voice: false, saved: true });

    // A wrong key is refused and nothing changes.
    let r = await post({ openaiKey: 'sk-typo' });
    assert.equal(r.openai, 'rejected');
    assert.equal(r.brain, 'mock');
    assert.match(readFileSync(envPath, 'utf8'), /OPENAI_API_KEY=old/);

    // A connected client is dropped when keys change, so it reconnects into the new mind.
    const ws = new WebSocket(`ws://127.0.0.1:${port}/device`);
    await new Promise((res) => ws.once('open', res));
    const dropped = new Promise((res) => ws.once('close', res));

    // The OpenAI key alone gives a talking character.
    r = await post({ openaiKey: '  "sk-good" ' });
    assert.deepEqual(r, { anthropic: 'skipped', openai: 'ok', brain: 'gpt', voice: true, saved: true });
    await dropped;

    // Adding the Anthropic key moves the thinking to Claude and keeps the voice.
    r = await post({ anthropicKey: 'sk-ant-good' });
    assert.deepEqual(r, { anthropic: 'ok', openai: 'skipped', brain: 'claude', voice: true, saved: true });
    const env = readFileSync(envPath, 'utf8');
    assert.match(env, /^# mine\nPORT=8787\nOPENAI_API_KEY=sk-good\nANTHROPIC_API_KEY=sk-ant-good\n$/);
    assert.equal((await (await fetch(base + '/health')).json() as any).brain, 'claude');
  } finally {
    await close();
    provider.close();
  }
});
