import { Eye, ShoppingCart, TicketCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';
import { formatMoney } from '../utils/checkout';

type ProductCardProps = {
  product: Product;
  index?: number;
  onAddToCart: (productId: string, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  onReserve: (product: Product) => void;
};

export function ProductCard({ product, index = 0, onAddToCart, onViewDetails, onReserve }: ProductCardProps) {
  const primarySpecs = Object.entries(product.specs).slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="product-launch-card group"
    >
      <div className="relative aspect-[1.13] overflow-hidden bg-black">
        <img
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          src={product.image}
          alt={`${product.name} in ${product.color}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,7,7,0.82)_0%,rgba(5,7,7,0.1)_54%)]" />
        <div className="absolute left-4 top-4 border border-blue/50 bg-black/55 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue backdrop-blur">
          0{index + 1} / Launch
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-black uppercase text-white">{product.name.replace('Volterra X1 ', '')}</h3>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-blue">{product.color}</p>
          </div>
          <p className="text-right font-display text-2xl font-black text-lime">{formatMoney(product.price)}</p>
        </div>

        <p className="mt-4 min-h-[72px] text-sm leading-6 text-zinc-300">{product.description}</p>

        <div className="mt-5 flex gap-2" aria-label={`${product.name} color palette`}>
          {product.swatches.map((swatch) => (
            <span
              key={swatch}
              className="h-7 w-7 border border-white/20 shadow-[inset_0_0_0_3px_rgba(0,0,0,0.32)]"
              style={{ backgroundColor: swatch }}
            />
          ))}
        </div>

        <dl className="mt-5 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-3 text-xs">
          {primarySpecs.map(([label, value]) => (
            <div key={label} className="px-3 first:pl-0 last:pr-0">
              <dt className="font-bold uppercase tracking-[0.1em] text-zinc-500">{label}</dt>
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
