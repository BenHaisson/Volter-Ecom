import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CartItem, Product } from '../data/products';
import { formatMoney } from '../utils/checkout';

type CartDrawerProps = {
  open: boolean;
  items: CartItem[];
  products: Product[];
  onClose: () => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  onDealerQuote: () => void;
};

export function CartDrawer({
  open,
  items,
  products,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onDealerQuote,
}: CartDrawerProps) {
  const lines = items
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      return product ? { ...item, product, total: product.price * item.quantity } : null;
    })
    .filter(Boolean) as Array<CartItem & { product: Product; total: number }>;

  const subtotal = lines.reduce((sum, line) => sum + line.total, 0);
  const shipping = subtotal > 0 ? 390 : 0;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          aria-hidden={!open}
          data-lock-scroll="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="absolute inset-0 cursor-default" aria-label="Close cart" onClick={onClose} />
          <motion.div
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/12 bg-carbon shadow-hard"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="eyebrow">Cart</p>
                <h2 id="cart-title" className="font-display text-3xl font-black uppercase">
                  Your Bikes
                </h2>
              </div>
              <button
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/5"
                type="button"
                onClick={onClose}
                aria-label="Close cart"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {!lines.length ? (
                <div className="grid min-h-72 place-items-center rounded-lg border border-white/10 bg-white/[0.035] p-8 text-center">
                  <div>
                    <ShoppingBag aria-hidden className="mx-auto h-10 w-10 text-lime" />
                    <p className="mt-4 font-bold text-zinc-300">Your cart is empty.</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {lines.map(({ product, quantity, total: lineTotal }) => (
                    <article key={product.id} className="grid grid-cols-[88px_1fr] gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <img className="h-[88px] w-[88px] rounded-lg object-cover" src={product.image} alt={product.name} />
                      <div>
                        <h3 className="font-display text-lg font-black uppercase">{product.name}</h3>
                        <p className="text-xs font-bold text-zinc-500">{product.color}</p>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            <button
                              className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/5"
                              type="button"
                              onClick={() => onDecrement(product.id)}
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              <Minus aria-hidden className="h-3.5 w-3.5" />
                            </button>
                            <strong className="grid min-w-7 place-items-center">{quantity}</strong>
                            <button
                              className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/5"
                              type="button"
                              onClick={() => onIncrement(product.id)}
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              <Plus aria-hidden className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <strong className="font-display text-xl text-lime">{formatMoney(lineTotal)}</strong>
                        </div>
                        <button className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white" type="button" onClick={() => onRemove(product.id)}>
                          <Trash2 aria-hidden className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-5">
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <strong className="text-white">{formatMoney(subtotal)}</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated shipping</span>
                  <strong className="text-white">{formatMoney(shipping)}</strong>
                </div>
                <div className="mt-2 flex justify-between border-t border-white/10 pt-3 text-lg">
                  <span className="font-black">Total</span>
                  <strong className="font-display text-2xl text-lime">{formatMoney(total)}</strong>
                </div>
              </div>
              <div className="mt-5 grid gap-2">
                <button className="button-primary w-full" type="button" onClick={onCheckout}>
                  Checkout
                </button>
                <button className="button-secondary w-full" type="button" onClick={onDealerQuote}>
                  Request Dealer Quote
                </button>
              </div>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
