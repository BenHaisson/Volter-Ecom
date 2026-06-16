import { ArrowDown, Gauge, Leaf, ShieldCheck, Wrench, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from '../data/products';

type HeroProps = {
  onReserveOpen: () => void;
};

const badges = [
  ['100% Electric', Leaf],
  ['Instant Torque', Zap],
  ['Off-Road Ready', ShieldCheck],
  ['Low Maintenance', Wrench],
];

export function Hero({ onReserveOpen }: HeroProps) {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-24">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={assets.hero}
        alt="VOLTERRA electric dirt bike in neon studio lighting"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,9,0.94),rgba(7,9,9,0.66)_45%,rgba(7,9,9,0.22)),linear-gradient(0deg,#070909_0%,rgba(7,9,9,0)_34%)]" />
      <div className="absolute inset-x-0 top-24 h-px bg-lime/30" aria-hidden />
      <div className="shell relative flex min-h-[calc(100svh-96px)] items-end pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <p className="eyebrow">Electric. Unleashed.</p>
          <h1 className="display-title mt-4 text-5xl text-white sm:text-6xl lg:text-8xl">
            Electric Dirt Bikes Built to Dominate
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-200 md:text-xl">
            Instant torque, silent power, zero emissions - engineered for riders who want motocross performance
            without compromise.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="button-primary" href="#bikes">
              Shop Bikes <ArrowDown aria-hidden className="h-4 w-4" />
            </a>
            <a className="button-secondary" href="#performance">
              Explore Performance <Gauge aria-hidden className="h-4 w-4" />
            </a>
            <button className="button-secondary" type="button" onClick={onReserveOpen}>
              Reserve Now
            </button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {badges.map(([label, Icon]) => (
              <div key={label as string} className="technical-border glass rounded-lg p-3">
                <Icon aria-hidden className="mb-3 h-5 w-5 text-lime" />
                <p className="text-sm font-black uppercase text-white">{label as string}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
