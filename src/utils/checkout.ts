import type { CartItem } from '../data/products';

export type ReservationLead = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  preferredModel: string;
  quantity: number;
  message: string;
  wantsReserve: boolean;
  submittedAt: string;
  cart: CartItem[];
};

export type PaymentSession = {
  orderId: string;
  checkoutUrl: string;
};

export async function createPaymentSession(params: {
  amount: number;
  currency?: string;
  email: string;
  orderId: string;
}): Promise<PaymentSession> {
  const { amount, currency = 'USD', email, orderId } = params;

  const walletAddress = import.meta.env.VITE_PAYGATE_WALLET_ADDRESS as string | undefined;
  if (!walletAddress) {
    throw new Error('Payment gateway not configured. Set VITE_PAYGATE_WALLET_ADDRESS in your environment.');
  }

  const callbackUrl = `${window.location.origin}/api/payment-callback?order_id=${orderId}`;

  const walletParams = new URLSearchParams({
    address: walletAddress,
    callback: callbackUrl,
  });

  const res = await fetch(`https://api.paygate.to/control/wallet.php?${walletParams}`);
  if (!res.ok) throw new Error('PayGate unreachable. Please try again.');

  const data = (await res.json()) as { address_in?: string };
  if (!data.address_in) throw new Error('Could not generate a payment address. Please try again.');

  const checkoutParams = new URLSearchParams({
    address: data.address_in,
    amount: String(amount),
    currency,
    email,
  });

  return {
    orderId,
    checkoutUrl: `https://checkout.paygate.to/process-payment.php?${checkoutParams}`,
  };
}

export function submitReservationLead(lead: ReservationLead) {
  const existing = JSON.parse(localStorage.getItem('volterra-reservation-leads') || '[]') as ReservationLead[];
  const next = [...existing, lead];
  localStorage.setItem('volterra-reservation-leads', JSON.stringify(next));
  return next;
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}
