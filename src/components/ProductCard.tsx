import { Eye, ShoppingCart, TicketCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';
import { formatMoney } from '../utils/checkout';

type ProductCardProps = {
  product: Product;
  onAddToCart: (productId: string, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  onReserve: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart, onViewDetails, onReserve }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-hard"
    >
      <div className="aspect-[1.14] overflow-hidden bg-black">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={product.image}
          alt={`${product.name} in ${product.color}`}
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-black uppercase text-white">{product.name}</h3>
            <p className="mt-1 text-sm font-bold text-zinc-400">{product.color}</p>
          </div>
          <p className="text-right font-display text-2xl font-black text-lime">{formatMoney(product.price)}</p>
        </div>

        <p className="mt-4 min-h-[72px] text-sm leading-6 text-zinc-300">{product.description}</p>

        <div className="mt-5 flex gap-2" aria-label={`${product.name} color palette`}>
          {product.swatches.map((swatch) => (
            <span
              key={swatch}
              className="h-6 w-6 rounded border border-white/20 shadow-[inset_0_0_0_3px_rgba(0,0,0,0.32)]"
              style={{ backgroundColor: swatch }}
            />
          ))}
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-2 text-xs">
          {Object.entries(product.specs)
            .slice(0, 4)
            .map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-black/25 p-3">
                <dt className="font-bold text-zinc-500">{label}</dt>
                <dd className="mt-1 font-black text-zinc-100">{value}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          <button className="button-primary px-3 text-sm" type="button" onClick={() => onAddToCart(product.id)}>
            <ShoppingCart aria-hidden className="h-4 w-4" /> Add
          </button>
          <button className="button-secondary px-3 text-sm" type="button" onClick={() => onViewDetails(product)}>
            <Eye aria-hidden className="h-4 w-4" /> Details
          </button>
          <button className="button-secondary px-3 text-sm" type="button" onClick={() => onReserve(product)}>
            <TicketCheck aria-hidden className="h-4 w-4" /> Reserve
          </button>
        </div>
      </div>
    </motion.article>
  );
}
