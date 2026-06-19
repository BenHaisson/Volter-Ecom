import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { order_id } = req.query as Record<string, string>;

  if (!order_id) {
    return res.status(400).json({ error: 'Missing order_id' });
  }

  console.log(`[paygate] Payment confirmed for order: ${order_id}`);

  return res.status(200).json({ status: 'ok' });
}
