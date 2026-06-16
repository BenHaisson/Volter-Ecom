import { motion } from 'framer-motion';
import type { GalleryImage } from '../data/products';

type GalleryGridProps = {
  images: GalleryImage[];
};

export function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <section id="gallery" className="shell py-20 md:py-28">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Gallery</p>
        <h2 className="display-title mt-3 text-4xl md:text-6xl">Product photography with dirt on it</h2>
      </div>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <motion.figure
            key={`${image.src}-${index}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.38, delay: Math.min(index * 0.035, 0.22) }}
            className={`overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] ${
              image.featured ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}
          >
            <img className="h-full w-full object-cover transition duration-500 hover:scale-105" src={image.src} alt={image.alt} loading="lazy" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
