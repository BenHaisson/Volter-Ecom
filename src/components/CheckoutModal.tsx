import { CheckCircle2, Loader2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { CartItem, Product } from '../data/products';
import { createPaymentSession, submitReservationLead } from '../utils/checkout';

const SHIPPING = 390;

type CheckoutModalProps = {
  open: boolean;
  products: Product[];
  cart: CartItem[];
  preferredProductId?: string;
  preferredQuantity?: number;
  mode?: 'checkout' | 'reserve' | 'dealer';
  onClose: () => void;
};

export function CheckoutModal({
  open,
  products,
  cart,
  preferredProductId,
  preferredQuantity = 1,
  mode = 'reserve',
  onClose,
}: CheckoutModalProps) {
  const [successId, setSuccessId] = useState('');
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState('');

  const preferredProduct = useMemo(
    () => products.find((product) => product.id === preferredProductId) ?? products[0],
    [preferredProductId, products],
  );

  const cartTotal = useMemo(() => {
    if (cart.length > 0) {
      return (
        cart.reduce((sum, item) => {
          const product = products.find((p) => p.id === item.productId);
          return sum + (product?.price ?? 0) * item.quantity;
        }, 0) + SHIPPING
      );
    }
    return preferredProduct.price * preferredQuantity + SHIPPING;
  }, [cart, products, preferredProduct, preferredQuantity]);

  function resetAndClose() {
    setSuccessId('');
    setPayError('');
    onClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const email = String(formData.get('email') || '');
    const quantity = Number(formData.get('quantity') || preferredQuantity);

    setLoading(true);
    setPayError('');

    try {
      if (mode === 'checkout') {
        const orderId = `VLT-${Date.now()}`;
        const session = await createPaymentSession({
          amount: cartTotal,
          currency: 'USD',
          email,
          orderId,
        });
        window.location.href = session.checkoutUrl;
        return;
      }

      const lead = {
        fullName: String(formData.get('fullName') || ''),
        email,
        phone: String(formData.get('phone') || ''),
        country: String(formData.get('country') || ''),
        city: String(formData.get('city') || ''),
        preferredModel: String(formData.get('preferredModel') || preferredProduct.name),
        quantity,
        message: String(formData.get('message') || ''),
        wantsReserve: formData.get('wantsReserve') === 'on',
        submittedAt: new Date().toISOString(),
        cart,
      };

      submitReservationLead(lead);
      setSuccessId(`VLT-${Date.now().toString().slice(-6)}`);
      form.reset();
    } catch (err) {
      setPayError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const title = mode === 'checkout' ? 'Checkout' : mode === 'dealer' ? 'Dealer Quote' : 'Reserve';
  const submitLabel = mode === 'checkout' ? 'Pay Now' : mode === 'dealer' ? 'Request Quote' : 'Submit Reservation';

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-3 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lock-scroll="true"
        >
          <button className="absolute inset-0 cursor-default" aria-label="Close reservation form" onClick={resetAndClose} />
          <motion.div
            className="relative max-h-[calc(100svh-24px)] w-full max-w-3xl overflow-auto rounded-lg border border-white/12 bg-carbon shadow-hard"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-carbon/90 p-5 backdrop-blur">
              <div>
                <p className="eyebrow">{title}</p>
                <h2 id="checkout-title" className="font-display text-3xl font-black uppercase">
                  {successId ? 'Reservation Received' : 'VOLTERRA Inquiry'}
                </h2>
              </div>
              <button
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/5"
                type="button"
                onClick={resetAndClose}
                aria-label="Close reservation form"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            {successId ? (
              <div className="grid place-items-center p-8 text-center">
                <CheckCircle2 aria-hidden className="h-14 w-14 text-lime" />
                <h3 className="mt-5 font-display text-4xl font-black uppercase">Lead {successId}</h3>
                <p className="mt-3 max-w-lg text-zinc-300">
                  Your reservation request has been saved. Our team will be in touch to confirm details and next steps.
                </p>
                <button className="button-primary mt-6" type="button" onClick={resetAndClose}>
                  Done
                </button>
              </div>
            ) : (
              <form className="grid gap-4 p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-bold">
                    Full name
                    <input className="rounded-lg border border-white/12 bg-white/[0.055] px-4 py-3 outline-none focus:border-lime" name="fullName" autoComplete="name" required />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Email
                    <input className="rounded-lg border border-white/12 bg-white/[0.055] px-4 py-3 outline-none focus:border-lime" name="email" type="email" autoComplete="email" required />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Phone
                    <input className="rounded-lg border border-white/12 bg-white/[0.055] px-4 py-3 outline-none focus:border-lime" name="phone" autoComplete="tel" required />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Country
                    <input className="rounded-lg border border-white/12 bg-white/[0.055] px-4 py-3 outline-none focus:border-lime" name="country" autoComplete="country-name" required />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    City
                    <input className="rounded-lg border border-white/12 bg-white/[0.055] px-4 py-3 outline-none focus:border-lime" name="city" autoComplete="address-level2" required />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Preferred model
                    <select className="rounded-lg border border-white/12 bg-[#101414] px-4 py-3 outline-none focus:border-lime" name="preferredModel" defaultValue={preferredProduct.name}>
                      {products.map((product) => (
                        <option key={product.id}>{product.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Quantity
                    <input className="rounded-lg border border-white/12 bg-white/[0.055] px-4 py-3 outline-none focus:border-lime" name="quantity" type="number" min="1" max="25" defaultValue={preferredQuantity} required />
                  </label>
                  {mode !== 'checkout' && (
                    <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm font-bold sm:mt-7">
                      <input className="h-5 w-5 accent-lime" type="checkbox" name="wantsReserve" defaultChecked />
                      I want to reserve this bike
                    </label>
                  )}
                  {mode === 'checkout' && (
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:mt-7">
                      <span className="text-sm font-bold text-zinc-400">Order total</span>
                      <span className="font-display text-xl font-black text-lime">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cartTotal)}
                      </span>
                    </div>
                  )}
                </div>
                <label className="grid gap-2 text-sm font-bold">
                  Message
                  <textarea className="min-h-28 resize-y rounded-lg border border-white/12 bg-white/[0.055] px-4 py-3 outline-none focus:border-lime" name="message" placeholder="Preferred delivery timing, dealer request, terrain use, or questions." />
                </label>

                {payError && (
                  <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {payError}
                  </p>
                )}

                {mode === 'checkout' && (
                  <p className="text-xs text-zinc-500">
                    You will be redirected to a secure payment page to complete your purchase with card, Apple Pay, or Google Pay.
                    Payout is settled in USDC on Polygon.
                  </p>
                )}

                <button className="button-primary flex w-full items-center justify-center gap-2" type="submit" disabled={loading}>
                  {loading && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
                  {loading ? 'Processing…' : submitLabel}
                </button>
              </form>
            )}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
