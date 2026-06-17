import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  BatteryCharging,
  Cpu,
  Gauge,
  Headphones,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  SlidersHorizontal,
  Zap,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
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

const cartKey = 'volterra-cart';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const launchMetrics = [
  ['80 hp', 'Peak power'],
  ['920 N-m', 'Wheel torque'],
  ['2.3s', '0-60 km/h'],
  ['120 km', 'Max range'],
  ['85 kg', 'Lightweight'],
  ['98%', 'Drive efficiency'],
];

const trustItems = [
  { icon: ShieldCheck, title: '2 year warranty', copy: 'Comprehensive coverage on every bike.' },
  { icon: Headphones, title: 'Dedicated support', copy: 'Real riders. Real support. We have got you.' },
  { icon: PackageCheck, title: 'Genuine parts', copy: 'Built for performance. Built to last.' },
  { icon: RefreshCcw, title: 'Over-the-air updates', copy: 'Your bike gets better over time.' },
];

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
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="mb-10 grid gap-5 md:grid-cols-[1fr_0.72fr] md:items-end"
          >
            <div>
              <p className="eyebrow text-blue">The Volterra collection</p>
              <h2 className="display-title mt-3 text-4xl md:text-6xl">Engineered for every terrain</h2>
            </div>
            <div className="grid gap-5">
              <p className="text-zinc-400">
                Three launch variants share the same high-output electric platform, removable battery architecture, and
                aggressive off-road chassis.
              </p>
              <a className="inline-flex w-fit items-center gap-2 border border-blue/60 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white hover:bg-blue/10" href="#comparison">
                View all bikes <ArrowDown aria-hidden className="h-4 w-4 -rotate-90" />
              </a>
            </div>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={addToCart}
                onViewDetails={setDetailProduct}
                onReserve={(selected) => openReserve(selected)}
              />
            ))}
          </div>
        </section>

        <section id="performance" className="motion-band relative overflow-hidden border-y border-white/10 py-20 md:py-28">
          <img className="absolute inset-0 h-full w-full object-cover opacity-45" src={assets.action} alt="" aria-hidden loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050707_0%,rgba(5,7,7,0.86)_42%,rgba(5,7,7,0.42)),linear-gradient(0deg,#050707_0%,rgba(5,7,7,0)_52%,#050707_100%)]" />
          <div className="shell relative grid gap-10 lg:grid-cols-[0.72fr_1.1fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65 }}
              className="overflow-hidden border border-white/10 bg-black/40"
            >
              <img className="h-full min-h-[420px] w-full object-cover" src={assets.sunset} alt="VOLTERRA rider in launch film terrain" loading="lazy" />
            </motion.div>
            <div>
              <p className="eyebrow text-blue">Performance that moves you</p>
              <h2 className="display-title mt-3 max-w-3xl text-4xl md:text-6xl">A silent hit of speed, control, and terrain grip</h2>
              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
                {launchMetrics.map(([value, label], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: index * 0.035 }}
                    className="metric-tile"
                  >
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-8 max-w-2xl text-zinc-300">
                High-output electric powertrain delivers explosive acceleration, industry-leading torque, and unmatched control without compromise.
              </p>
              <a className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-blue hover:text-lime" href="#technology">
                Explore all specs <ArrowDown aria-hidden className="h-4 w-4 -rotate-90" />
              </a>
            </div>
          </div>
        </section>

        <section id="technology" className="shell grid gap-8 py-20 md:grid-cols-[0.95fr_1.05fr] md:py-28">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="relative overflow-hidden border border-white/10 bg-black"
          >
            <img className="h-full min-h-[560px] w-full object-cover" src={assets.closeup} alt="VOLTERRA drivetrain close-up" loading="lazy" />
            <div className="absolute inset-x-4 bottom-4 grid gap-3 sm:grid-cols-3">
              {['20-80% in 45 min', 'Removable battery', 'Intelligent BMS'].map((label) => (
                <div key={label} className="glass p-3 text-xs font-black uppercase tracking-[0.1em] text-white">
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
          <div className="self-center">
            <p className="eyebrow text-blue">Built around next-gen energy</p>
            <h2 className="display-title mt-3 text-4xl md:text-6xl">Electric engineering for aggressive terrain</h2>
            <p className="mt-5 text-zinc-400">
              X1 is built around predictable torque, sealed electrical protection, and a service path that removes the most repetitive gas-bike maintenance.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {technologyBullets.slice(0, 6).map(([title, copy], index) => {
                const Icon = specIconMap[index % specIconMap.length];
                return (
                  <motion.article
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: index * 0.035 }}
                    className="technical-border bg-panel/80 p-4"
                  >
                    <Icon aria-hidden className="h-5 w-5 text-lime" />
                    <h3 className="mt-4 font-display text-xl font-black uppercase text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{copy}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="shell py-20 md:py-28">
          <div className="grid gap-3 lg:grid-cols-[0.7fr_1fr_1fr_1fr]">
            <div className="min-h-72 bg-black p-6">
              <p className="eyebrow text-blue">Built for more than</p>
              <h2 className="display-title mt-3 text-4xl">The track</h2>
              <p className="mt-5 text-sm leading-6 text-zinc-400">From weekend rides to backcountry missions, Volterra goes where you go.</p>
              <a className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-blue hover:text-lime" href="#gallery">
                See the lifestyle <ArrowDown aria-hidden className="h-4 w-4 -rotate-90" />
              </a>
            </div>
            {[assets.grit, assets.action, assets.finalCta].map((src, index) => (
              <motion.figure
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group min-h-72 overflow-hidden border border-white/10 bg-white/[0.035]"
              >
                <img className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={src} alt="VOLTERRA cinematic off-road scene" loading="lazy" />
              </motion.figure>
            ))}
          </div>
        </section>

        <section className="shell pb-20 md:pb-28">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {performanceFeatures.slice(0, 4).map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="technical-border glass p-5 transition hover:-translate-y-1 hover:border-blue/50"
              >
                <feature.icon aria-hidden className="h-7 w-7 text-lime" />
                <h3 className="mt-5 font-display text-2xl font-black uppercase text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{feature.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <div id="comparison">
          <ComparisonTable />
        </div>

        <section className="border-y border-white/10 bg-black/70 py-6">
          <div className="shell grid gap-3 md:grid-cols-4">
            {trustItems.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="flex gap-4 border-white/10 p-4 md:border-r md:last:border-r-0">
                <Icon aria-hidden className="h-7 w-7 shrink-0 text-zinc-200" />
                <div>
                  <h3 className="font-display text-xl font-black uppercase text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-5 text-zinc-400">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <GalleryGrid images={galleryImages} />
        <FAQAccordion />

        <section className="relative overflow-hidden py-24 md:py-36">
          <img className="absolute inset-0 h-full w-full object-cover" src={assets.finalCta} alt="VOLTERRA sunset reserve campaign" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,7,0.92),rgba(5,7,7,0.52),rgba(5,7,7,0.18)),linear-gradient(0deg,#050707_0%,rgba(5,7,7,0)_42%,#050707_100%)]" />
          <div className="shell relative grid gap-8 md:grid-cols-[1fr_0.55fr] md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow text-blue">{brand.tagline}</p>
              <h2 className="display-title mt-3 text-5xl md:text-7xl">The future is electric. Reserve yours.</h2>
              <p className="mt-5 text-lg text-zinc-200">
                Limited launch allocation. Be among the first to ride the next generation of electric off-road performance.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="button-primary" type="button" onClick={() => openReserve(products[0])}>
                  <Zap aria-hidden className="h-4 w-4" /> Reserve Now
                </button>
                <button className="button-secondary" type="button" onClick={() => openReserve(products[0], 1, 'dealer')}>
                  <ShieldCheck aria-hidden className="h-4 w-4" /> Learn More
                </button>
              </div>
            </div>
            <div className="allocation-panel">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">Launch allocation</p>
              <strong className="mt-2 block font-display text-4xl font-black text-white">Limited units</strong>
              <div className="mt-4 grid grid-cols-8 gap-1">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span key={index} className={`h-3 ${index < 6 ? 'bg-lime' : 'bg-white/15'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="shell pb-20">
          <div className="grid gap-3 border border-white/10 bg-white/[0.035] p-4 md:grid-cols-4">
            {[
              { icon: BatteryCharging, title: 'Removable 72V pack', copy: 'Charge in the garage or rotate spare packs.' },
              { icon: Gauge, title: '90 km/h top speed', copy: 'Launch spec for private off-road riding.' },
              { icon: SlidersHorizontal, title: 'Ride modes', copy: 'Tune delivery for mud, climbs, or open trail.' },
              { icon: Cpu, title: 'Digital control', copy: 'Controller architecture designed for software updates.' },
            ].map(({ icon: Icon, title, copy }) => (
              <article key={title} className="bg-black/20 p-4">
                <Icon aria-hidden className="h-5 w-5 text-lime" />
                <h3 className="mt-4 font-display text-xl font-black uppercase">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{copy}</p>
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

