# Voice relay

Lets the hosted pages (Simulacra and Crownfall) give Sim her live voice with **no key on the
device**. The OpenAI key is stored as a secret on a small server; pages get passes that only start
a live voice call and expire in ten minutes.

## Set it up (about five minutes, free)

1. Sign in at https://dash.cloudflare.com (a free account is enough).
2. **Workers & Pages → Create → Start with Hello World → Deploy.**
3. **Edit code**, replace everything with the contents of `worker.js` from this folder, **Deploy**.
4. **Settings → Variables and Secrets → Add**, type **Secret**, name `OPENAI_API_KEY`, value: the
   OpenAI key. Deploy.
5. Copy the worker's address (like `https://something.your-name.workers.dev`).
6. Put it in `webxr/sim-config.json` as `"tokenUrl"`, rebuild and publish the site.

After that anyone opening the site hears and talks to Sim without typing anything.

## What protects the key

- It never leaves the worker. Browsers only ever receive ten-minute passes.
- Passes are only given to the allowed site (`ALLOWED_ORIGINS`, default
  the site's own address) and to at most 20 sessions an hour per network.
- These stop casual misuse, not a determined one: the site is public, so **set a monthly spending
  limit on the key** at platform.openai.com.

## Checked

Run against the real OpenAI service: an allowed site gets a pass (`ek_…`, 600 s), another site is
refused, a missing secret and over-use are reported. Both pages, pointed at a locally run copy,
started the live call with a pass and no key in the page. Not deployed to Cloudflare by the author.
