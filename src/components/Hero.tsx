import { ArrowDown, Gauge, Leaf, PlayCircle, ShieldCheck, Timer, Wrench, Zap } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { assets } from '../data/products';

type HeroProps = {
  onReserveOpen: () => void;
};

const badges = [
  ['0', 'Emissions', Leaf],
  ['85%', 'Instant torque on demand', Zap],
  ['2.3s', '0-60 km/h launch model', Timer],
  ['120 km', 'Max range target', ShieldCheck],
];

const filmFrames = [
  assets.action,
  assets.sunset,
  assets.grit,
  assets.closeup,
];

export function Hero({ onReserveOpen }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.35], prefersReducedMotion ? ['0%', '0%'] : ['0%', '12%']);
  const titleY = useTransform(scrollYProgress, [0, 0.22], prefersReducedMotion ? [0, 0] : [0, -46]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.42]);

  return (
    <section id="top" className="hero-cinematic relative min-h-[100svh] overflow-hidden pt-24">
      <motion.img
        style={{ y: imageY }}
        className="absolute inset-0 h-[112%] w-full object-cover"
        src={assets.hero}
        alt="VOLTERRA electric dirt bike cinematic launch reveal"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_30%,rgba(0,149,255,0.23),transparent_26%),linear-gradient(90deg,rgba(4,6,7,0.96),rgba(4,6,7,0.72)_42%,rgba(4,6,7,0.12)),linear-gradient(0deg,#050707_0%,rgba(5,7,7,0)_34%)]" />
      <div className="scanline absolute inset-0 opacity-55" aria-hidden />

      <div className="scroll-index hidden xl:grid" aria-hidden>
        {['01', '02', '03', '04', '05', '06'].map((item, index) => (
          <span key={item} className={index === 0 ? 'text-lime' : ''}>{item}</span>
        ))}
      </div>

      <div className="shell relative flex min-h-[calc(100svh-96px)] items-end pb-8 md:pb-10">
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="eyebrow text-blue"
          >
            The future of off-road
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: 'easeOut' }}
            className="display-title mt-4 max-w-3xl text-5xl text-white sm:text-6xl lg:text-8xl"
          >
            Electric Dirt Bikes Built to Dominate
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-base leading-7 text-zinc-200 md:text-lg"
          >
            Instant torque. Zero limits. Total control. Volterra delivers the next generation of off-road performance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: 'easeOut' }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button className="button-primary min-w-44" type="button" onClick={onReserveOpen}>
              Reserve Now <ArrowDown aria-hidden className="h-4 w-4 -rotate-90" />
            </button>
            <a className="button-secondary min-w-52 border-blue/60 text-white" href="#performance">
              Explore Performance <Gauge aria-hidden className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38, ease: 'easeOut' }}
            className="film-strip mt-8 max-w-xl"
          >
            <button className="film-play" type="button" aria-label="Play launch film teaser">
              <PlayCircle aria-hidden className="h-8 w-8" />
            </button>
            {filmFrames.map((frame, index) => (
              <img key={frame} src={frame} alt="" aria-hidden className={index === 3 ? 'hidden sm:block' : ''} />
            ))}
          </motion.div>
          <a className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-300 hover:text-lime" href="#bikes">
            Play launch film <ArrowDown aria-hidden className="h-3.5 w-3.5 -rotate-90" />
          </a>
        </motion.div>
      </div>

      <div className="relative border-y border-white/10 bg-black/38 backdrop-blur-md">
        <div className="shell grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {badges.map(([value, label, Icon]) => (
            <div key={label as string} className="flex min-h-24 items-center gap-4 px-4 py-5 md:justify-center">
              <Icon aria-hidden className="hidden h-6 w-6 text-blue sm:block" />
              <div>
                <strong className="font-display text-3xl font-black text-white md:text-5xl">{value as string}</strong>
                <p className="mt-1 max-w-32 text-[0.65rem] font-black uppercase tracking-[0.13em] text-zinc-400">{label as string}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
