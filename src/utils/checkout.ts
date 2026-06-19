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
  addressIn: string;
  checkoutUrl: string;
};

export async function createPaymentSession(params: {
  amount: number;
  currency?: string;
  email: string;
  orderId: string;
}): Promise<PaymentSession> {
  const res = await fetch('/api/create-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? 'Failed to create payment session');
  }

  return res.json() as Promise<PaymentSession>;
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
