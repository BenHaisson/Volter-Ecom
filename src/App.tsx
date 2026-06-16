import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BatteryCharging, Cpu, Gauge, ShieldCheck, SlidersHorizontal, Zap } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SpecCard } from './components/SpecCard';
import { GalleryGrid } from './components/GalleryGrid';
import { ComparisonTable } from './components/ComparisonTable';
import { FAQAccordion } from './components/FAQAccordion';
import { Footer } from './components/Footer';
import {
  assets,
  brand,
  galleryImages,
  performanceFeatures,
  products,
  specIconMap,
  technologyBullets,
  type CartItem,
  type Product,
} from './data/products';
import { formatMoney } from './utils/checkout';

const cartKey = 'volterra-cart';

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(cartKey) || '[]') as CartItem[];
  } catch {
    return [];
  }
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState<'checkout' | 'reserve' | 'dealer'>('reserve');
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [preferredProduct, setPreferredProduct] = useState<Product | undefined>(products[0]);
  const [preferredQuantity, setPreferredQuantity] = useState(1);

  useEffect(() => {
    setCart(readCart());
  }, []);

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  function addToCart(productId: string, quantity = 1) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: Math.min(25, item.quantity + quantity) } : item,
        );
      }
      return [...current, { productId, quantity }];
    });
  }

  function increment(productId: string) {
    setCart((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity: Math.min(25, item.quantity + 1) } : item)),
    );
  }

  function decrement(productId: string) {
    setCart((current) =>
      current
        .map((item) => (item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function remove(productId: string) {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }

  function openReserve(product = products[0], quantity = 1, mode: 'checkout' | 'reserve' | 'dealer' = 'reserve') {
    setPreferredProduct(product);
    setPreferredQuantity(quantity);
    setCheckoutMode(mode);
    setCheckoutOpen(true);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-carbon text-zinc-100">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onReserveOpen={() => openReserve()} />
      <main>
        <Hero onReserveOpen={() => openReserve()} />

        <section id="bikes" className="shell py-20 md:py-28">
          <div className="mb-10 grid gap-5 md:grid-cols-[1fr_0.72fr] md:items-end">
            <div>
              <p className="eyebrow">Bikes</p>
              <h2 className="display-title mt-3 text-4xl md:text-6xl">Launch collection</h2>
            </div>
            <p className="text-zinc-400">
              Three X1 variants share the same high-output electric platform, removable battery architecture, and
              aggressive off-road chassis.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={setDetailProduct}
                onReserve={(selected) => openReserve(selected)}
              />
            ))}
          </div>
        </section>

        <section id="performance" className="border-y border-white/10 bg-[#0b0f0f] py-20 md:py-28">
          <div className="shell">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow">Performance</p>
              <h2 className="display-title mt-3 text-4xl md:text-6xl">Silent power. No fuel. Less maintenance.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {performanceFeatures.map((feature) => (
                <SpecCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section id="technology" className="shell grid gap-8 py-20 md:grid-cols-[0.95fr_1.05fr] md:py-28">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="overflow-hidden rounded-lg border border-white/10 bg-black"
          >
            <img className="h-full min-h-[520px] w-full object-cover" src={assets.closeup} alt="VOLTERRA drivetrain close-up" loading="lazy" />
          </motion.div>
          <div className="self-center">
            <p className="eyebrow">Technology</p>
            <h2 className="display-title mt-3 text-4xl md:text-6xl">Electric engineering for aggressive terrain</h2>
            <p className="mt-5 text-zinc-400">
              VOLTERRA X1 is built around predictable torque, sealed electrical protection, and a service path that
              removes the most repetitive gas-bike maintenance.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {technologyBullets.map(([title, copy], index) => {
                const Icon = specIconMap[index % specIconMap.length];
                return (
                  <article key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <Icon aria-hidden className="h-5 w-5 text-lime" />
                    <h3 className="mt-4 font-display text-xl font-black uppercase text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 py-20 md:py-28">
          <img className="absolute inset-0 h-full w-full object-cover" src={assets.action} alt="VOLTERRA rider driving through rugged terrain" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#070909_0%,rgba(7,9,9,0.76)_44%,rgba(7,9,9,0.2)),linear-gradient(0deg,#070909_0%,rgba(7,9,9,0)_45%,#070909_100%)]" />
          <div className="shell relative grid gap-8 md:grid-cols-[0.9fr_1fr] md:items-end">
            <div>
              <p className="eyebrow">Off-road control</p>
              <h2 className="display-title mt-3 text-4xl md:text-6xl">Engineered for riders who read terrain fast</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['12 kW', 'Peak electric drive'],
                ['95 km', 'Launch range target'],
                ['82 kg', 'Responsive platform weight'],
              ].map(([value, label]) => (
                <div key={value} className="glass rounded-lg p-5">
                  <strong className="font-display text-4xl font-black text-lime">{value}</strong>
                  <p className="mt-2 text-sm font-bold text-zinc-300">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="shell grid gap-8 py-20 md:grid-cols-[1fr_0.85fr] md:py-28 md:items-center">
          <div>
            <p className="eyebrow">Brand System</p>
            <h2 className="display-title mt-3 text-4xl md:text-6xl">A sharp identity built around electric grit</h2>
            <p className="mt-5 max-w-2xl text-zinc-400">
              The VOLTERRA mark, graphite surfaces, and lime energy accents keep the brand technical and premium without
              losing the dirt-bike edge.
            </p>
            <div className="mt-8 flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <span className="grid h-20 w-24 shrink-0 place-items-center rounded-lg bg-lime p-3">
                <img src={brand.logoMark} alt="" className="h-full w-full object-contain" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-2xl font-black uppercase">Official brand mark</h3>
                <p className="mt-1 text-sm text-zinc-400">The angular VOLTERRA symbol now drives the product UI, favicon, and footer identity.</p>
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ['Graphite', '#111616'],
                ['Electric Lime', '#d7ff28'],
                ['Moss Alloy', '#8da26f'],
              ].map(([label, color]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <span className="block h-16 rounded-lg border border-white/10" style={{ backgroundColor: color }} />
                  <strong className="mt-3 block text-sm">{label}</strong>
                </div>
              ))}
            </div>
          </div>
          <img className="rounded-lg border border-white/10" src={brand.logoBoard} alt="VOLTERRA identity board" loading="lazy" />
        </section>

        <GalleryGrid images={galleryImages} />
        <ComparisonTable />
        <FAQAccordion />

        <section className="relative overflow-hidden py-24 md:py-36">
          <img className="absolute inset-0 h-full w-full object-cover" src={assets.finalCta} alt="VOLTERRA sunset reserve campaign" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,9,0.9),rgba(7,9,9,0.5),rgba(7,9,9,0.18)),linear-gradient(0deg,#070909_0%,rgba(7,9,9,0)_42%,#070909_100%)]" />
          <div className="shell relative">
            <div className="max-w-2xl">
              <p className="eyebrow">{brand.tagline}</p>
              <h2 className="display-title mt-3 text-5xl md:text-7xl">Reserve Your Electric Dirt Bike</h2>
              <p className="mt-5 text-lg text-zinc-200">
                Join the first wave of riders bringing silent electric power to dirt, trails, and mountain terrain.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="button-primary" type="button" onClick={() => openReserve(products[0])}>
                  <Zap aria-hidden className="h-4 w-4" /> Reserve Now
                </button>
                <button className="button-secondary" type="button" onClick={() => openReserve(products[0], 1, 'dealer')}>
                  <ShieldCheck aria-hidden className="h-4 w-4" /> Request Dealer Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="shell pb-20">
          <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 md:grid-cols-4">
            {[
              [BatteryCharging, 'Removable 72V pack', 'Charge in the garage or rotate spare packs.'],
              [Gauge, '90 km/h top speed', 'Launch spec for private off-road riding.'],
              [SlidersHorizontal, 'Ride modes', 'Tune delivery for mud, climbs, or open trail.'],
              [Cpu, 'Digital control', 'Controller architecture designed for software updates.'],
            ].map(([Icon, title, copy]) => (
              <article key={title as string} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <Icon aria-hidden className="h-5 w-5 text-lime" />
                <h3 className="mt-4 font-display text-xl font-black uppercase">{title as string}</h3>
                <p className="mt-2 text-sm text-zinc-400">{copy as string}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={addToCart}
        onReserve={(product, quantity) => openReserve(product, quantity)}
      />
      <CartDrawer
        open={cartOpen}
        items={cart}
        products={products}
        onClose={() => setCartOpen(false)}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={remove}
        onCheckout={() => {
          setCartOpen(false);
          openReserve(products[0], cartCount || 1, 'checkout');
        }}
        onDealerQuote={() => {
          setCartOpen(false);
          openReserve(products[0], cartCount || 1, 'dealer');
        }}
      />
      <CheckoutModal
        open={checkoutOpen}
        products={products}
        cart={cart}
        preferredProductId={preferredProduct?.id}
        preferredQuantity={preferredQuantity}
        mode={checkoutMode}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}

export default App;
