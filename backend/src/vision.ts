import type { Detection } from './protocol.js';

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['objects'],
  properties: {
    objects: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['label', 'x', 'y', 'confidence'],
        properties: {
          label: { type: 'string', description: 'lowercase singular noun, e.g. "chair"' },
          x: { type: 'number', description: 'horizontal centre of the object, 0 (left edge) to 1 (right edge)' },
          y: { type: 'number', description: 'vertical centre of the object, 0 (top edge) to 1 (bottom edge)' },
          confidence: { type: 'number', description: '0 to 1' },
        },
      },
    },
  },
};

const PROMPT = `This is one frame from a mixed-reality headset camera in a room. List up to 8 distinct physical objects a person could walk up to or point at (furniture, appliances, bags, plants, laptops, bottles and so on). Skip walls, floor, ceiling, people and anything you are unsure about. For each give a lowercase singular label and the centre point of the object's visible body in normalised image coordinates.`;

/**
 * Object detection with an off-the-shelf vision model. Returns image-space points only; the
 * headset turns them into 3D positions with its own camera pose and depth.
 */
export async function detectObjects(jpegBase64: string, opts: { apiKey: string; model: string; baseUrl?: string }): Promise<Detection[]> {
  const res = await fetch(`${opts.baseUrl ?? 'https://api.openai.com/v1'}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${opts.apiKey}` },
    body: JSON.stringify({
      model: opts.model,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: PROMPT },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${jpegBase64}` } },
          ],
        },
      ],
      response_format: { type: 'json_schema', json_schema: { name: 'detections', strict: true, schema: SCHEMA } },
    }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`vision HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const body: any = await res.json();
  const parsed = JSON.parse(body.choices?.[0]?.message?.content ?? '{"objects":[]}');
  const clamp = (v: unknown) => Math.max(0, Math.min(1, Number(v) || 0));
  return (parsed.objects as any[])
    .map((o) => ({ label: String(o.label).toLowerCase().trim().replace(/\s+/g, '_'), x: clamp(o.x), y: clamp(o.y), confidence: clamp(o.confidence) }))
    .filter((o) => o.label && o.confidence >= 0.4);
}
