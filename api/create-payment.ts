import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const walletAddress = process.env.PAYGATE_WALLET_ADDRESS;
  if (!walletAddress) {
    return res.status(500).json({ error: 'Payment gateway not configured' });
  }

  const { amount, currency = 'USD', email, orderId } = req.body as {
    amount: number;
    currency?: string;
    email: string;
    orderId: string;
  };

  if (!amount || !email || !orderId) {
    return res.status(400).json({ error: 'Missing required fields: amount, email, orderId' });
  }

  const secret = crypto.createHash('sha256').update(`paygate_salt_${walletAddress}`).digest('hex');
  const sig = crypto.createHmac('sha256', secret).update(orderId).digest('hex');

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `https://${req.headers.host}`;

  const callbackUrl = `${baseUrl}/api/payment-callback?order_id=${orderId}&sig=${sig}`;

  const params = new URLSearchParams({
    address: walletAddress,
    callback: callbackUrl,
  });

  let paygateData: { address_in?: string; polygon_address_in?: string };
  try {
    const paygateRes = await fetch(`https://api.paygate.to/control/wallet.php?${params}`);
    paygateData = (await paygateRes.json()) as typeof paygateData;
  } catch {
    return res.status(502).json({ error: 'Payment provider unreachable' });
  }

  if (!paygateData.address_in) {
    return res.status(502).json({ error: 'Failed to generate payment address' });
  }

  const checkoutParams = new URLSearchParams({
    address: paygateData.address_in,
    amount: String(amount),
    currency,
    email,
  });

  return res.status(200).json({
    orderId,
    addressIn: paygateData.address_in,
    checkoutUrl: `https://checkout.paygate.to/process-payment.php?${checkoutParams}`,
  });
}
