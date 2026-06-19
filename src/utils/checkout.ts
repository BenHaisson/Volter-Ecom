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

const PAYGATE_WALLET = '0x312b34C949A33c4F6c3D9cf8Ef03AE61a19E97bF';

export async function createPaymentSession(params: {
  amount: number;
  currency?: string;
  email: string;
  orderId: string;
}): Promise<PaymentSession> {
  const { amount, currency = 'USD', email, orderId } = params;

  const callbackUrl = `${window.location.origin}/api/payment-callback?order_id=${orderId}`;

  const walletParams = new URLSearchParams({
    address: PAYGATE_WALLET,
    callback: callbackUrl,
  });

  const res = await fetch(`https://api.paygate.to/control/wallet.php?${walletParams}`);
  if (!res.ok) throw new Error('PayGate unreachable. Please try again.');

  const data = (await res.json()) as { address_in?: string };
  if (!data.address_in) throw new Error('Could not generate a payment address. Please try again.');

  // address_in is already URL-encoded in PayGate's JSON response — use it raw
  // to avoid double-encoding (e.g. %2B becoming %252B)
  const checkoutUrl =
    `https://checkout.paygate.to/process-payment.php` +
    `?address=${data.address_in}` +
    `&amount=${amount}` +
    `&currency=${currency}` +
    `&email=${encodeURIComponent(email)}`;

  return { orderId, checkoutUrl };
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
