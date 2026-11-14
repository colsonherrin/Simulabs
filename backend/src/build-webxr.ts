// Builds the WebXR client as a static site (for GitHub Pages or any web host):
//   npm run build:webxr -- <output folder>
// The site holds no keys and does no thinking: it connects to a backend you run yourself.
import { build } from 'esbuild';
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const out = resolve(process.argv[2] ?? join(root, 'webxr-site'));
mkdirSync(join(out, 'avatar'), { recursive: true });
await build({ entryPoints: [join(root, 'webxr', 'main.js')], bundle: true, format: 'esm', target: 'es2020', minify: true, outfile: join(out, 'app.js'), nodePaths: [join(here, '..', 'node_modules')], logLevel: 'warning' });
cpSync(join(root, 'webxr', 'index.html'), join(out, 'index.html'));
const avatar = join(root, 'packages', 'com.simulacra.core', 'Avatar', 'Rocketbox');
for (const f of ['RocketboxAdult.fbx', 'f006_body_color.png', 'f006_body_normal.png', 'f006_head_color.png', 'f006_head_normal.png', 'f006_opacity_color.png', 'LICENSE.md']) cpSync(join(avatar, f), join(out, 'avatar', f));
writeFileSync(join(out, '.nojekyll'), '');
console.log('WebXR site written to ' + out);
