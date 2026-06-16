import { Minus, Plus, ShoppingCart, TicketCheck, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Product } from '../data/products';
import { formatMoney } from '../utils/checkout';

type ProductDetailModalProps = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (productId: string, quantity?: number) => void;
  onReserve: (product: Product, quantity?: number) => void;
};

export function ProductDetailModal({ product, onClose, onAddToCart, onReserve }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-3 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-detail-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lock-scroll="true"
        >
          <button className="absolute inset-0 cursor-default" aria-label="Close product details" onClick={onClose} />
          <motion.div
            className="relative max-h-[calc(100svh-24px)] w-full max-w-5xl overflow-auto rounded-lg border border-white/12 bg-carbon shadow-hard"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-carbon/90 p-4 backdrop-blur">
              <div>
                <p className="eyebrow">Model Detail</p>
                <h2 id="product-detail-title" className="font-display text-3xl font-black uppercase text-white">
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/5"
                onClick={onClose}
                aria-label="Close product details"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-4 md:grid-cols-[1.05fr_0.95fr] md:p-6">
              <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
                <img className="h-full min-h-[360px] w-full object-cover" src={product.image} alt={product.name} />
              </div>

              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-400">{product.color}</p>
                    <p className="mt-2 font-display text-4xl font-black text-lime">{formatMoney(product.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    {product.swatches.map((swatch) => (
                      <span
                        key={swatch}
                        className="h-7 w-7 rounded border border-white/20"
                        style={{ backgroundColor: swatch }}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-5 text-zinc-300">{product.story}</p>

                <dl className="mt-6 divide-y divide-white/10 rounded-lg border border-white/10">
                  {Object.entries(product.specs).map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[0.8fr_1fr] gap-3 p-3 text-sm">
                      <dt className="font-bold text-zinc-500">{label}</dt>
                      <dd className="font-black text-zinc-100">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <span className="font-bold text-zinc-300">Quantity</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/5"
                      type="button"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus aria-hidden className="h-4 w-4" />
                    </button>
                    <strong className="grid min-w-8 place-items-center">{quantity}</strong>
                    <button
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/5"
                      type="button"
                      onClick={() => setQuantity((value) => Math.min(9, value + 1))}
                      aria-label="Increase quantity"
                    >
                      <Plus aria-hidden className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <button
                    className="button-primary"
                    type="button"
                    onClick={() => {
                      onAddToCart(product.id, quantity);
                      onClose();
                    }}
                  >
                    <ShoppingCart aria-hidden className="h-4 w-4" /> Add to Cart
                  </button>
                  <button className="button-secondary" type="button" onClick={() => onReserve(product, quantity)}>
                    <TicketCheck aria-hidden className="h-4 w-4" /> Reserve
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
