import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { order_id, sig } = req.query as Record<string, string>;

  if (!order_id || !sig) {
    return res.status(400).json({ error: 'Missing order_id or sig' });
  }

  const walletAddress = process.env.PAYGATE_WALLET_ADDRESS ?? '';
  const secret = crypto.createHash('sha256').update(`paygate_salt_${walletAddress}`).digest('hex');
  const expected = crypto.createHmac('sha256', secret).update(order_id).digest('hex');

  if (expected !== sig) {
    console.error(`[paygate] Signature mismatch for order ${order_id}`);
    return res.status(401).json({ error: 'Invalid signature' });
  }

  console.log(`[paygate] Payment confirmed for order: ${order_id}`);

  return res.status(200).json({ status: 'ok' });
}
