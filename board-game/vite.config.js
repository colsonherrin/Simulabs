import { defineConfig } from 'vite';
import { cpSync, createReadStream, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
// Sim's body lives with the shared Unity package; serve it at ./avatar/ and copy it into builds.
const AVATAR = join(here, '..', 'packages', 'com.simulacra.core', 'Avatar', 'Rocketbox');
const AVATAR_FILES = ['RocketboxAdult.fbx', 'f006_body_color.png', 'f006_body_normal.png', 'f006_head_color.png', 'f006_head_normal.png', 'f006_opacity_color.png', 'LICENSE.md'];
const simAvatar = () => ({
  name: 'sim-avatar',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const m = /\/avatar\/([\w.]+)$/.exec((req.url || '').split('?')[0]);
      const file = m && AVATAR_FILES.includes(m[1]) ? join(AVATAR, m[1]) : null;
      if (!file || !existsSync(file)) return next();
      res.setHeader('content-type', file.endsWith('.png') ? 'image/png' : 'application/octet-stream');
      createReadStream(file).pipe(res);
    });
  },
  closeBundle() {
    const out = resolve(here, process.env.CROWNFALL_OUT || 'dist', 'avatar');
    mkdirSync(out, { recursive: true });
    for (const f of AVATAR_FILES) cpSync(join(AVATAR, f), join(out, f));
  },
});

export default defineConfig(async () => {
  const plugins = [simAvatar()];
  if (process.env.AR_HTTPS === '1') {
    const { default: basicSsl } = await import('@vitejs/plugin-basic-ssl');
    plugins.push(basicSsl());
  }
  return {
    plugins,
    base: './', // so a build can be hosted in a sub-folder (GitHub Pages)
    define: { __BUILD__: JSON.stringify(new Date().toISOString().slice(5, 16).replace('T', ' ') + ' UTC') },
    build: { outDir: process.env.CROWNFALL_OUT || 'dist', emptyOutDir: true, target: 'es2022' },
    server: { host: true, port: 5173, fs: { allow: ['..'] } },
    preview: { host: true, port: 5173 },
  };
});
