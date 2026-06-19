import {
  BatteryCharging,
  Bike,
  Droplets,
  Gauge,
  Leaf,
  Mountain,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  VolumeX,
  Wrench,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const asset = (file: string) => `/assets/${file}`;

export type Product = {
  id: string;
  name: string;
  color: string;
  price: number;
  description: string;
  story: string;
  image: string;
  swatches: string[];
  specs: Record<string, string>;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type GalleryImage = {
  src: string;
  alt: string;
  featured?: boolean;
};

export type PerformanceFeature = {
  title: string;
  copy: string;
  icon: LucideIcon;
};

export const brand = {
  name: 'VOLTERRA',
  tagline: 'Electric. Unleashed.',
  logoMark: asset('volterra-logo-mark.png'),
  logoSource: asset('volterra-brand-logo.png'),
  logoBoard: asset('a_clean_high_resolution_branding_identity_board_a.png'),
};

export const assets = {
  hero: asset('futuristic_electric_motocross_bike_ad.png'),
  finalCta: asset('electric_power_unleashed_at_sunset.png'),
  action: asset('rider_in_action_through_rugged_terrain.png'),
  sunset: asset('electric_motocross_bike_at_sunset.png'),
  closeup: asset('electric_dirt_bike_in_neon_green_lighting.png'),
  grit: asset('electric_grit_on_the_trail.png'),
  studioBlack: asset('sleek_black_and_neon_electric_dirt_bike.png'),
  studioBlackAlt: asset('volterra_electric_dirt_bike_in_studio.png'),
  blackReveal: asset('volterra_electric_dirt_bike_reveal.png'),
  white: asset('futuristic_volterra_electric_dirt_bike.png'),
  whiteAlt: asset('imagegen.png'),
  neonBrand: asset('electric_off_road_beast_in_neon_glow.png'),
};

const sharedSpecs = {
  Motor: '12 kW peak electric drive',
  Battery: '72V removable lithium pack',
  Range: 'Up to 95 km',
  Charge: '2.5-4 hours',
  'Top speed': '90 km/h',
  Weight: '82 kg',
};

export const products: Product[] = [
  {
    id: 'x1-shadow',
    name: 'Volterra X1 Shadow',
    color: 'Black / Neon Lime',
    price: 50,
    description: 'The aggressive electric dirt bike for technical trails and high-torque off-road control.',
    story:
      'X1 Shadow is tuned for riders who want traction, silence, and immediate response on rugged singletrack. The black and neon lime finish keeps the platform stealthy while the electric drive delivers full torque without clutch work.',
    image: assets.studioBlack,
    swatches: ['#0b0f10', '#d7ff28', '#5d625d'],
    specs: sharedSpecs,
  },
  {
    id: 'x1-alpine',
    name: 'Volterra X1 Alpine',
    color: 'White / Neon Lime',
    price: 50,
    description: 'A clean white performance edition built for premium riders and mountain terrain.',
    story:
      'X1 Alpine pairs the same electric platform with a brighter body finish for high-visibility mountain riding. It is built around fast charge cycles, removable battery access, and low-maintenance ownership.',
    image: assets.white,
    swatches: ['#f5f5f0', '#d7ff28', '#101414'],
    specs: sharedSpecs,
  },
  {
    id: 'x1-blue-storm',
    name: 'Volterra X1 Blue Storm',
    color: 'Blue / Neon Lime',
    price: 50,
    description: 'A bold blue edition with the same high-output platform and futuristic trail presence.',
    story:
      'X1 Blue Storm brings the most expressive finish to the launch collection while retaining the same drivetrain, frame architecture, and suspension package used across the X1 platform.',
    image: assets.blackReveal,
    swatches: ['#175dd6', '#d7ff28', '#050707'],
    specs: sharedSpecs,
  },
];

export const performanceFeatures: PerformanceFeature[] = [
  {
    title: 'Instant torque',
    copy: 'Linear electric drive gives immediate rear-wheel response for climbs, exits, and low-speed control.',
    icon: Zap,
  },
  {
    title: 'No fuel',
    copy: 'Charge from the grid and skip fuel storage, premix, hot exhaust, and engine warm-up routines.',
    icon: Leaf,
  },
  {
    title: 'Low maintenance',
    copy: 'Fewer rotating parts reduce service complexity around oil, plugs, filters, and clutch wear.',
    icon: Wrench,
  },
  {
    title: 'Quiet riding',
    copy: 'A low acoustic profile helps riders focus on terrain and expands where electric off-road can fit.',
    icon: VolumeX,
  },
  {
    title: 'Regenerative braking',
    copy: 'Configurable regen assists braking feel and recovers energy during long technical descents.',
    icon: RotateCcw,
  },
  {
    title: 'Removable battery',
    copy: 'The 72V pack is designed for quick swaps, garage charging, and service-friendly access.',
    icon: BatteryCharging,
  },
  {
    title: 'Off-road suspension',
    copy: 'Long-travel geometry and knobby tire fitment are tuned for dirt, rocks, roots, and ruts.',
    icon: Mountain,
  },
  {
    title: 'Waterproof architecture',
    copy: 'Sealed electrical routing and protected battery housing support rain, mud, and washdown use.',
    icon: Droplets,
  },
];

export const technologyBullets = [
  ['Electric drivetrain', 'A compact 12 kW peak motor delivers controllable acceleration without clutch fade.'],
  ['Battery architecture', 'The removable lithium pack supports garage charging, spare-pack rotations, and service inspection.'],
  ['Cooling', 'Open body channels move air across the controller and battery enclosure during sustained trail work.'],
  ['Lightweight frame', 'A rigid chassis keeps the 82 kg platform responsive when riders shift weight aggressively.'],
  ['Suspension geometry', 'Long-travel fork stance and rear linkage tuning are built for off-road absorption and grip.'],
  ['Ride modes', 'Mode profiles let riders soften delivery for wet roots or sharpen response for open terrain.'],
  ['Digital display', 'A compact cockpit readout keeps speed, state of charge, and mode data visible.'],
  ['Maintenance simplicity', 'No oil changes, no exhaust packing, and fewer heat-cycle service points.'],
];

export const galleryImages: GalleryImage[] = [
  { src: brand.logoBoard, alt: 'VOLTERRA identity board with logo and model color directions', featured: true },
  { src: assets.hero, alt: 'Black VOLTERRA electric dirt bike in neon studio lighting', featured: true },
  { src: assets.grit, alt: 'VOLTERRA rider carving through dirt with brand campaign typography' },
  { src: assets.sunset, alt: 'VOLTERRA electric motocross bike on a ridge at sunset', featured: true },
  { src: assets.neonBrand, alt: 'Close cropped black and neon VOLTERRA bike with logo' },
  { src: assets.finalCta, alt: 'VOLTERRA bike sunset launch campaign image' },
  { src: assets.white, alt: 'White VOLTERRA electric dirt bike in smoke studio' },
  { src: assets.whiteAlt, alt: 'White VOLTERRA studio product alternate view' },
  { src: assets.action, alt: 'Rider in action through rugged terrain on VOLTERRA bike', featured: true },
  { src: assets.studioBlack, alt: 'Sleek black and neon VOLTERRA electric dirt bike in studio' },
  { src: assets.studioBlackAlt, alt: 'Black VOLTERRA electric dirt bike in dusty studio' },
  { src: assets.blackReveal, alt: 'Blue and neon VOLTERRA electric dirt bike reveal image' },
  { src: assets.closeup, alt: 'Technical close-up of electric dirt bike drivetrain and front end' },
];

export const comparisonRows = [
  ['Torque delivery', 'Instant, programmable electric torque', 'Delayed by gears, clutch, and RPM band'],
  ['Noise', 'Low acoustic output for quieter trail sessions', 'High exhaust noise and engine vibration'],
  ['Emissions', 'Zero tailpipe emissions', 'Combustion exhaust at the riding site'],
  ['Maintenance', 'No oil, plugs, fuel system, or exhaust service', 'Frequent oil, filters, plugs, and engine checks'],
  ['Fuel cost', 'Low-cost charging from standard electrical supply', 'Recurring fuel, oil, and transport storage costs'],
  ['Riding access', 'Better fit for noise-sensitive private land', 'More limited around sound restrictions'],
  ['Charging/fueling', 'Home charging and removable pack flexibility', 'Fast refuel but requires fuel transport'],
  ['Ownership simplicity', 'Fewer service variables and cleaner storage', 'More fluids, heat, smell, and seasonal prep'],
];

export const faqs = [
  [
    'Is VOLTERRA road legal?',
    'VOLTERRA X1 is presented as an off-road electric dirt bike. Road legality depends on your country, state, registration category, lighting equipment, and homologation rules.',
  ],
  [
    'How long does the battery last?',
    'Range is listed up to 95 km, but actual ride time depends on terrain, rider weight, speed, tire pressure, temperature, and ride mode.',
  ],
  ['Is the battery removable?', 'Yes. The X1 platform is designed around a removable 72V lithium pack for garage charging and service access.'],
  ['Can I ride it in rain or mud?', 'The electrical architecture is designed for off-road wet conditions, but deep submersion and pressure washing connectors should be avoided.'],
  ['How fast does it go?', 'The launch specification lists a top speed of 90 km/h for the X1 platform.'],
  ['How do I reserve a bike?', 'Use the Reserve Now button, choose your preferred model and quantity, and submit the lead form. The inquiry is saved locally in this demo build.'],
  ['Do you support dealers or bulk orders?', 'Yes. The reservation flow includes dealer quote handling for distributors, riding parks, fleets, and bulk orders.'],
];

export const specIconMap: LucideIcon[] = [Bike, BatteryCharging, Gauge, Sparkles, ShieldCheck, Zap];
