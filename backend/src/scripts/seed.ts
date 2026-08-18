import mongoose from 'mongoose';
import { connectDb, disconnectDb } from '../config/db.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

interface SeedCategory {
  name: string;
  slug: string;
  description: string;
  image: string;
  isFeatured: boolean;
}

interface SeedProduct {
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  details: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

const categories: SeedCategory[] = [
  {
    name: 'Electronics & Audio',
    slug: 'electronics-audio',
    description: 'Sound, screens and desk essentials.',
    image: img('photo-1505740420928-5e560c06d30e'),
    isFeatured: true,
  },
  {
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Quiet objects for calm spaces.',
    image: img('photo-1522708323590-d24dbb6b0267'),
    isFeatured: true,
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Everyday carry, refined.',
    image: img('photo-1523275335684-37898b6baf30'),
    isFeatured: true,
  },
  {
    name: 'Beauty & Care',
    slug: 'beauty-care',
    description: 'Simple rituals for daily care.',
    image: img('photo-1596462502278-27bfdc403348'),
    isFeatured: true,
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description: 'Gear for an active routine.',
    image: img('photo-1517836357463-d25dfeac3438'),
    isFeatured: false,
  },
  {
    name: 'Stationery & Office',
    slug: 'stationery-office',
    description: 'Tools for focused work.',
    image: img('photo-1497032628192-86f99bcd76bc'),
    isFeatured: false,
  },
];

const products: SeedProduct[] = [
  // ---- Electronics & Audio (matches frontend mock) ----
  {
    name: 'Aurora Wireless Earbuds',
    slug: 'aurora-wireless-earbuds',
    description:
      'Active noise-cancelling earbuds with a 30-hour battery and a warm, detailed sound signature. IPX5-rated for workouts and travel.',
    brand: 'Aura',
    category: 'electronics-audio',
    price: 2999,
    compareAtPrice: 3999,
    image: img('photo-1590658268037-6bf12165a8df'),
    details: ['Bluetooth 5.3', '30h total battery', 'IPX5 water resistance', 'USB-C fast charge'],
    rating: 4.6,
    reviewCount: 128,
    stock: 24,
    isFeatured: true,
    tags: ['earbuds', 'audio', 'wireless', 'anc'],
    createdAt: '2026-07-12T10:00:00.000Z',
  },
  {
    name: 'Lumen Over-Ear Headphones',
    slug: 'lumen-over-ear-headphones',
    description:
      'Studio-tuned over-ears with plush memory-foam cushions. Foldable, with a detachable cable for wired listening.',
    brand: 'Lumen',
    category: 'electronics-audio',
    price: 6499,
    image: img('photo-1505740420928-5e560c06d30e'),
    details: ['40mm dynamic drivers', 'Bluetooth 5.2', '40h battery', '3.5mm aux input'],
    rating: 4.4,
    reviewCount: 86,
    stock: 12,
    isFeatured: false,
    tags: ['headphones', 'audio', 'bluetooth'],
    createdAt: '2026-06-30T10:00:00.000Z',
  },
  {
    name: 'Halo Mechanical Keyboard',
    slug: 'halo-mechanical-keyboard',
    description:
      'A compact 75% mechanical keyboard with hot-swappable switches, gasket mounting and a soft per-key RGB glow.',
    brand: 'Halo',
    category: 'electronics-audio',
    price: 8499,
    compareAtPrice: 9499,
    image: img('photo-1587829741301-dc798b83add3'),
    details: ['75% layout', 'Hot-swap switches', 'Gasket mount', 'Tri-mode: USB-C / BT / 2.4GHz'],
    rating: 4.8,
    reviewCount: 61,
    stock: 8,
    isFeatured: true,
    tags: ['keyboard', 'mechanical', 'desk', 'work'],
    createdAt: '2026-07-01T10:00:00.000Z',
  },
  {
    name: 'Orbit Desk Lamp',
    slug: 'orbit-desk-lamp',
    description:
      'A minimal LED desk lamp with stepless dimming and three colour temperatures. Dimmable touch control with a weighted aluminium base.',
    brand: 'Slekco',
    category: 'electronics-audio',
    price: 2499,
    compareAtPrice: 2999,
    image: img('photo-1538688525198-9b88f6f53126'),
    details: ['Stepless dimming', '3000K–5000K', 'Aluminium base', 'USB-C powered'],
    rating: 4.3,
    reviewCount: 42,
    stock: 0,
    isFeatured: false,
    tags: ['lamp', 'desk', 'lighting'],
    createdAt: '2026-05-20T10:00:00.000Z',
  },
  {
    name: 'Drift Portable Speaker',
    slug: 'drift-portable-speaker',
    description:
      'A waterproof Bluetooth speaker with 360° sound and a 16-hour battery. Small enough for the beach, loud enough for a room.',
    brand: 'Aura',
    category: 'electronics-audio',
    price: 3999,
    compareAtPrice: 4799,
    image: img('photo-1608043152269-423dbba4e7e1'),
    details: ['IPX7 waterproof', '360° sound', '16h battery', 'Pair two for stereo'],
    rating: 4.5,
    reviewCount: 73,
    stock: 18,
    isFeatured: true,
    tags: ['speaker', 'bluetooth', 'audio', 'portable'],
    createdAt: '2026-07-09T10:00:00.000Z',
  },

  // ---- Home & Living (matches frontend mock) ----
  {
    name: 'Terra Ceramic Vase',
    slug: 'terra-ceramic-vase',
    description:
      'Hand-glazed stoneware vase in a soft matte finish. Each piece varies slightly, making it one of a kind.',
    brand: 'Terra',
    category: 'home-living',
    price: 1299,
    image: img('photo-1567016432779-094069958ea5'),
    details: ['Stoneware', 'Matte glaze', 'H 22cm', 'Hand-wash'],
    rating: 4.7,
    reviewCount: 54,
    stock: 20,
    isFeatured: true,
    tags: ['vase', 'ceramic', 'decor', 'home'],
    createdAt: '2026-06-25T10:00:00.000Z',
  },
  {
    name: 'Linen Throw Blanket',
    slug: 'linen-throw-blanket',
    description:
      'Stonewashed 100% French linen throw that gets softer with every wash. Breathable for year-round use.',
    brand: 'Terra',
    category: 'home-living',
    price: 3499,
    compareAtPrice: 4299,
    image: img('photo-1586023492125-27b2c045efd7'),
    details: ['100% French linen', '130 x 180 cm', 'Stonewashed', 'Machine washable'],
    rating: 4.5,
    reviewCount: 37,
    stock: 15,
    isFeatured: false,
    tags: ['linen', 'throw', 'blanket', 'home'],
    createdAt: '2026-06-18T10:00:00.000Z',
  },
  {
    name: 'Apex Wall Clock',
    slug: 'apex-wall-clock',
    description:
      'A silent-sweep wall clock with a powder-coated steel frame and a clean, numbered face.',
    brand: 'Slekco',
    category: 'home-living',
    price: 1899,
    image: img('photo-1560448204-e02f11c3d0e2'),
    details: ['Silent sweep', 'Steel frame', 'Ø 30 cm', 'AA battery'],
    rating: 4.2,
    reviewCount: 29,
    stock: 9,
    isFeatured: false,
    tags: ['clock', 'wall', 'decor'],
    createdAt: '2026-05-28T10:00:00.000Z',
  },
  {
    name: 'Ritual Pour-Over Set',
    slug: 'ritual-pour-over-set',
    description:
      'A glass pour-over dripper with a hand-blown carafe and a walnut stand. Brews a clean, bright cup every morning.',
    brand: 'Ritual',
    category: 'home-living',
    price: 2799,
    compareAtPrice: 3299,
    image: img('photo-1447933601403-0c6688de566e'),
    details: ['Borosilicate glass', 'Walnut stand', '600ml carafe', 'Paper-free mesh filter'],
    rating: 4.6,
    reviewCount: 48,
    stock: 18,
    isFeatured: true,
    tags: ['coffee', 'pour-over', 'kitchen', 'home'],
    createdAt: '2026-07-05T10:00:00.000Z',
  },
  {
    name: 'Moss Planter Set',
    slug: 'moss-planter-set',
    description:
      'A set of three matte ceramic planters with drainage trays. Sized for a shelf, a table and a windowsill.',
    brand: 'Terra',
    category: 'home-living',
    price: 2199,
    compareAtPrice: 2499,
    image: img('photo-1485955900006-10f4d324d411'),
    details: ['3 sizes', 'Ceramic', 'Drainage tray', 'Matte finish'],
    rating: 4.4,
    reviewCount: 31,
    stock: 14,
    isFeatured: false,
    tags: ['planter', 'plants', 'ceramic', 'decor'],
    createdAt: '2026-07-03T10:00:00.000Z',
  },

  // ---- Accessories (matches frontend mock) ----
  {
    name: 'Nomad Leather Wallet',
    slug: 'nomad-leather-wallet',
    description:
      'A slim bifold wallet in full-grain leather that patinas beautifully over time. Six card slots and a note sleeve.',
    brand: 'Nomad',
    category: 'accessories',
    price: 2199,
    compareAtPrice: 2599,
    image: img('photo-1627123424574-724758594e93'),
    details: ['Full-grain leather', '6 card slots', 'RFID shielded', 'Slim 1.2cm profile'],
    rating: 4.5,
    reviewCount: 72,
    stock: 30,
    isFeatured: true,
    tags: ['wallet', 'leather', 'accessories'],
    createdAt: '2026-06-10T10:00:00.000Z',
  },
  {
    name: 'Canvas Everyday Tote',
    slug: 'canvas-everyday-tote',
    description:
      'Heavyweight 16oz cotton-canvas tote with leather-reinforced handles and an interior zip pocket.',
    brand: 'Nomad',
    category: 'accessories',
    price: 1499,
    image: img('photo-1548036328-c9fa89d128fa'),
    details: ['16oz cotton canvas', 'Leather handles', 'Zip pocket', '48 x 40 cm'],
    rating: 4.3,
    reviewCount: 55,
    stock: 40,
    isFeatured: false,
    tags: ['tote', 'bag', 'canvas'],
    createdAt: '2026-05-15T10:00:00.000Z',
  },
  {
    name: 'Cove Polarised Sunglasses',
    slug: 'cove-polarised-sunglasses',
    description:
      'Timeless acetate sunglasses with polarised UV400 lenses in an olive acetate frame.',
    brand: 'Cove',
    category: 'accessories',
    price: 1999,
    compareAtPrice: 2499,
    image: img('photo-1511499767150-a48a237f0083'),
    details: ['Acetate frame', 'Polarised UV400', 'Includes case', 'Unisex fit'],
    rating: 4.4,
    reviewCount: 33,
    stock: 14,
    isFeatured: false,
    tags: ['sunglasses', 'eyewear', 'summer'],
    createdAt: '2026-07-02T10:00:00.000Z',
  },
  {
    name: 'Pendulum Leather Watch',
    slug: 'pendulum-leather-watch',
    description:
      'A minimalist quartz watch with a brushed steel case and an interchangeable leather strap.',
    brand: 'Pendulum',
    category: 'accessories',
    price: 4999,
    compareAtPrice: 5999,
    image: img('photo-1523275335684-37898b6baf30'),
    details: ['Quartz movement', 'Brushed steel', 'Interchangeable strap', '5ATM water resistant'],
    rating: 4.7,
    reviewCount: 64,
    stock: 11,
    isFeatured: true,
    tags: ['watch', 'leather', 'minimal'],
    createdAt: '2026-06-20T10:00:00.000Z',
  },
  {
    name: 'Trail Cotton Cap',
    slug: 'trail-cotton-cap',
    description:
      'A six-panel cotton cap with an unstructured crown and a leather strap. Made to be worn in.',
    brand: 'Nomad',
    category: 'accessories',
    price: 899,
    compareAtPrice: 1099,
    image: img('photo-1521369909029-2afed882baee'),
    details: ['100% cotton twill', 'Leather strap', 'One size', 'Washable'],
    rating: 4.2,
    reviewCount: 47,
    stock: 36,
    isFeatured: false,
    tags: ['cap', 'hat', 'cotton', 'summer'],
    createdAt: '2026-06-22T10:00:00.000Z',
  },

  // ---- Beauty & Care (matches frontend mock) ----
  {
    name: 'Dew Vitamin C Serum',
    slug: 'dew-vitamin-c-serum',
    description:
      'A stable 10% vitamin C serum with hyaluronic acid and niacinamide to brighten and hydrate. Fragrance-free.',
    brand: 'Dew',
    category: 'beauty-care',
    price: 1299,
    compareAtPrice: 1599,
    image: img('photo-1620916566398-39f1143ab7be'),
    details: ['10% Vitamin C', 'Hyaluronic acid', 'Niacinamide', 'Fragrance-free'],
    rating: 4.6,
    reviewCount: 143,
    stock: 26,
    isFeatured: true,
    tags: ['serum', 'vitamin c', 'skincare'],
    createdAt: '2026-07-08T10:00:00.000Z',
  },
  {
    name: 'Oak & Fig Candle',
    slug: 'oak-and-fig-candle',
    description:
      'A slow-burning soy candle with notes of oakmoss, fig and cedar. 45+ hour burn in a reusable amber jar.',
    brand: 'Oak & Pine',
    category: 'beauty-care',
    price: 1099,
    image: img('photo-1603006905003-be475563bc59'),
    details: ['100% soy wax', '45h burn', 'Amber glass jar', 'Cotton wick'],
    rating: 4.8,
    reviewCount: 91,
    stock: 22,
    isFeatured: false,
    tags: ['candle', 'soy', 'home fragrance'],
    createdAt: '2026-06-12T10:00:00.000Z',
  },
  {
    name: 'Field Grooming Kit',
    slug: 'field-grooming-kit',
    description:
      'A travel-ready grooming kit with beard oil, balm and a folding comb in a canvas case.',
    brand: 'Field',
    category: 'beauty-care',
    price: 1699,
    compareAtPrice: 1999,
    image: img('photo-1519345182560-3f2917c472ef'),
    details: ['Beard oil 30ml', 'Beard balm 50ml', 'Folding comb', 'Canvas case'],
    rating: 4.5,
    reviewCount: 58,
    stock: 17,
    isFeatured: false,
    tags: ['grooming', 'beard', 'men', 'travel'],
    createdAt: '2026-05-25T10:00:00.000Z',
  },
  {
    name: 'Calm Barrier Cream',
    slug: 'calm-barrier-cream',
    description:
      'A ceramide-rich moisturiser that strengthens the skin barrier and soothes dryness. Suitable for sensitive skin.',
    brand: 'Dew',
    category: 'beauty-care',
    price: 1199,
    compareAtPrice: 1399,
    image: img('photo-1556228578-8c89e6adf883'),
    details: ['Ceramides', 'Panthenol', 'Sensitive-skin safe', 'Non-comedogenic'],
    rating: 4.4,
    reviewCount: 67,
    stock: 0,
    isFeatured: false,
    tags: ['cream', 'moisturiser', 'skincare'],
    createdAt: '2026-06-05T10:00:00.000Z',
  },
  {
    name: 'Willow Facial Oil',
    slug: 'willow-facial-oil',
    description:
      'A lightweight blend of squalane, rosehip and jojoba that sinks in fast and leaves skin soft, never greasy.',
    brand: 'Willow',
    category: 'beauty-care',
    price: 1599,
    compareAtPrice: 1899,
    image: img('photo-1608248543803-ba4f8c70ae0b'),
    details: ['Squalane', 'Rosehip seed oil', 'Jojoba', '30ml'],
    rating: 4.6,
    reviewCount: 38,
    stock: 21,
    isFeatured: true,
    tags: ['facial oil', 'skincare', 'hydration'],
    createdAt: '2026-07-07T10:00:00.000Z',
  },

  // ---- Sports & Fitness ----
  {
    name: 'Prime Yoga Mat',
    slug: 'prime-yoga-mat',
    description:
      'A 6mm non-slip yoga mat with a cushioned, closed-cell surface that stays clean and grippy.',
    brand: 'Prime',
    category: 'sports-fitness',
    price: 1999,
    compareAtPrice: 2399,
    image: img('photo-1592432678016-e910b452f9a2'),
    details: ['6mm cushion', 'Non-slip', 'Closed-cell', '183 x 61 cm'],
    rating: 4.5,
    reviewCount: 82,
    stock: 28,
    isFeatured: true,
    tags: ['yoga', 'mat', 'fitness'],
    createdAt: '2026-07-10T10:00:00.000Z',
  },
  {
    name: 'Tempo Kettlebell Set',
    slug: 'tempo-kettlebell-set',
    description:
      'A pair of vinyl-coated kettlebells (4kg + 6kg) with flat bases and smooth handles for comfortable swings.',
    brand: 'Tempo',
    category: 'sports-fitness',
    price: 2499,
    compareAtPrice: 2999,
    image: img('photo-1517836357463-d25dfeac3438'),
    details: ['4kg + 6kg', 'Vinyl coated', 'Flat base', 'Smooth handle'],
    rating: 4.4,
    reviewCount: 41,
    stock: 16,
    isFeatured: false,
    tags: ['kettlebell', 'strength', 'gym'],
    createdAt: '2026-06-28T10:00:00.000Z',
  },
  {
    name: 'Hydro Steel Bottle',
    slug: 'hydro-steel-bottle',
    description:
      'A double-walled insulated bottle that keeps drinks cold for 24 hours. Powder-coated, leak-proof, dishwasher-safe.',
    brand: 'Prime',
    category: 'sports-fitness',
    price: 1299,
    compareAtPrice: 1599,
    image: img('photo-1571731956672-f2b94d7dd0cb'),
    details: ['750ml', '24h cold / 12h hot', 'Leak-proof lid', 'Powder coated'],
    rating: 4.7,
    reviewCount: 96,
    stock: 50,
    isFeatured: true,
    tags: ['bottle', 'hydration', 'insulated'],
    createdAt: '2026-07-15T10:00:00.000Z',
  },
  {
    name: 'Courser Running Shoes',
    slug: 'courser-running-shoes',
    description:
      'A breathable daily trainer with responsive foam midsole and a grippy rubber outsole for road and track.',
    brand: 'Courser',
    category: 'sports-fitness',
    price: 4499,
    compareAtPrice: 5499,
    image: img('photo-1542291026-7eec264c27ff'),
    details: ['Responsive foam', 'Breathable mesh', 'Rubber outsole', 'Weight: 260g'],
    rating: 4.6,
    reviewCount: 119,
    stock: 19,
    isFeatured: false,
    tags: ['running', 'shoes', 'fitness', 'sports'],
    createdAt: '2026-06-26T10:00:00.000Z',
  },

  // ---- Stationery & Office ----
  {
    name: 'Atelier Hardbound Notebook',
    slug: 'atelier-hardbound-notebook',
    description:
      'A lay-flat hardbound notebook with 120gsm dotted paper, a ribbon bookmark and an elastic closure.',
    brand: 'Atelier',
    category: 'stationery-office',
    price: 699,
    image: img('photo-1517842645767-c639042777db'),
    details: ['120gsm paper', 'A5 dotted grid', 'Lay-flat binding', '192 pages'],
    rating: 4.8,
    reviewCount: 133,
    stock: 44,
    isFeatured: true,
    tags: ['notebook', 'stationery', 'office', 'paper'],
    createdAt: '2026-07-11T10:00:00.000Z',
  },
  {
    name: 'Studio Pen Set',
    slug: 'studio-pen-set',
    description:
      'A set of five gel pens in muted tones with a satin finish and a fine 0.5mm tip.',
    brand: 'Studio',
    category: 'stationery-office',
    price: 499,
    compareAtPrice: 599,
    image: img('photo-1455390582262-044cdead277a'),
    details: ['5 colours', '0.5mm tip', 'Satin finish', 'Refillable'],
    rating: 4.3,
    reviewCount: 27,
    stock: 60,
    isFeatured: false,
    tags: ['pens', 'stationery', 'office'],
    createdAt: '2026-06-15T10:00:00.000Z',
  },
  {
    name: 'Cedar Desk Organiser',
    slug: 'cedar-desk-organiser',
    description:
      'A bamboo and aluminium desk organiser with a phone dock, pen tray and a small drawer.',
    brand: 'Studio',
    category: 'stationery-office',
    price: 1799,
    compareAtPrice: 2099,
    image: img('photo-1497032628192-86f99bcd76bc'),
    details: ['Bamboo + aluminium', 'Phone dock', 'Pen tray', 'Small drawer'],
    rating: 4.4,
    reviewCount: 34,
    stock: 13,
    isFeatured: false,
    tags: ['desk', 'organiser', 'office', 'organisation'],
    createdAt: '2026-05-30T10:00:00.000Z',
  },
  {
    name: 'Nova Laptop Stand',
    slug: 'nova-laptop-stand',
    description:
      'An aluminium laptop stand with six height adjustments and a ventilated surface. Folds flat for travel.',
    brand: 'Nova',
    category: 'stationery-office',
    price: 1499,
    compareAtPrice: 1899,
    image: img('photo-1496181133206-80ce9b88a853'),
    details: ['Aluminium', '6 heights', 'Folds flat', 'Holds up to 15"'],
    rating: 4.5,
    reviewCount: 52,
    stock: 23,
    isFeatured: true,
    tags: ['laptop', 'stand', 'office', 'ergonomics'],
    createdAt: '2026-07-14T10:00:00.000Z',
  },
];

async function seed(): Promise<void> {
  await connectDb();

  await Promise.all([Category.deleteMany({}), Product.deleteMany({}), Order.deleteMany({})]);

  const createdCategories = await Category.insertMany(
    categories.map((c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      isFeatured: c.isFeatured,
    })),
  );

  const categoryBySlug = new Map(createdCategories.map((c) => [c.slug, c._id]));

  const productDocs = products.map((p) => ({
    name: p.name,
    slug: p.slug,
    description: p.description,
    brand: p.brand,
    category: categoryBySlug.get(p.category),
    price: p.price,
    compareAtPrice: p.compareAtPrice ?? null,
    images: [p.image, p.image.replace('w=900', 'w=600')],
    details: p.details,
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
    isFeatured: p.isFeatured,
    tags: p.tags,
    createdAt: new Date(p.createdAt),
  }));

  await Product.insertMany(productDocs);

  console.log(`[seed] Inserted ${createdCategories.length} categories and ${productDocs.length} products`);
}

seed()
  .catch((err) => {
    console.error('[seed] failed', err);
    process.exit(1);
  })
  .finally(async () => {
    await disconnectDb();
  });