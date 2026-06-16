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

export async function createCheckoutSession() {
  // Connect Stripe Checkout, PayPal, bank transfer, or financing here.
  // Keep payment collection on a PCI-compliant provider or secure backend endpoint.
  return { status: 'placeholder' as const };
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
