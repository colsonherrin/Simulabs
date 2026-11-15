// Builds the WebXR client as a static site (for GitHub Pages or any web host):
//   npm run build:webxr -- <output folder>
// The site holds no keys and does no thinking: it connects to a backend you run yourself.
import { build } from 'esbuild';
import { webxrBuild } from './webxr-bundle.js';
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const out = resolve(process.argv[2] ?? join(root, 'webxr-site'));
mkdirSync(join(out, 'avatar'), { recursive: true });
await build({ ...webxrBuild('main.js'), outfile: join(out, 'app.js'), logLevel: 'warning' });
cpSync(join(root, 'webxr', 'index.html'), join(out, 'index.html'));
cpSync(join(root, 'webxr', 'sim-config.json'), join(out, 'sim-config.json')); // names the voice relay, if any
const avatar = join(root, 'packages', 'com.simulacra.core', 'Avatar', 'Rocketbox');
for (const f of ['RocketboxAdult.fbx', 'f006_body_color.png', 'f006_body_normal.png', 'f006_head_color.png', 'f006_head_normal.png', 'f006_opacity_color.png', 'animations.json', 'animations.bin', 'LICENSE.md']) cpSync(join(avatar, f), join(out, 'avatar', f));
writeFileSync(join(out, '.nojekyll'), '');
// People type /xr/ (the backend-served address) or a wrong path: send them to the page instead of a 404.
const redirect = (to: string) => `<!doctype html><meta charset="utf-8"><title>Simulacra</title><script>location.replace(${to})</script>`;
mkdirSync(join(out, 'xr'), { recursive: true });
writeFileSync(join(out, 'xr', 'index.html'), redirect("'../' + location.search"));
writeFileSync(join(out, '404.html'), redirect("'/' + location.pathname.split('/')[1] + '/'"));
console.log('WebXR site written to ' + out);
