import type { Category, Product, ProductListItem } from "@/lib/types";

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const mockCategories: Category[] = [
  {
    _id: "cat-electronics",
    name: "Electronics & Audio",
    slug: "electronics-audio",
    image: img("photo-1505740420928-5e560c06d30e"),
    description: "Sound, screens and desk essentials.",
    productCount: 4,
  },
  {
    _id: "cat-home",
    name: "Home & Living",
    slug: "home-living",
    image: img("photo-1522708323590-d24dbb6b0267"),
    description: "Quiet objects for calm spaces.",
    productCount: 4,
  },
  {
    _id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    image: img("photo-1523275335684-37898b6baf30"),
    description: "Everyday carry, refined.",
    productCount: 4,
  },
  {
    _id: "cat-beauty",
    name: "Beauty & Care",
    slug: "beauty-care",
    image: img("photo-1596462502278-27bfdc403348"),
    description: "Simple rituals for daily care.",
    productCount: 4,
  },
];

const catRef = (slug: string) => {
  const cat = mockCategories.find((c) => c.slug === slug)!;
  return { name: cat.name, slug: cat.slug };
};

export const mockProducts: Product[] = [
  // ---- Electronics & Audio ----
  {
    _id: "p-earbuds-01",
    name: "Aurora Wireless Earbuds",
    slug: "aurora-wireless-earbuds",
    description:
      "Active noise-cancelling earbuds with a 30-hour battery and a warm, detailed sound signature. IPX5-rated for workouts and travel.",
    details: ["Bluetooth 5.3", "30h total battery", "IPX5 water resistance", "USB-C fast charge"],
    price: 2999,
    compareAtPrice: 3999,
    image: img("photo-1590658268037-6bf12165a8df"),
    images: [
      img("photo-1590658268037-6bf12165a8df"),
      img("photo-1590658268037-6bf12165a8df", 600),
    ],
    category: catRef("electronics-audio"),
    stock: 24,
    rating: 4.6,
    ratingCount: 128,
    isFeatured: true,
    tags: ["earbuds", "audio", "wireless", "anc"],
    createdAt: "2026-07-12T10:00:00.000Z",
    updatedAt: "2026-07-18T09:00:00.000Z",
  },
  {
    _id: "p-headphones-01",
    name: "Lumen Over-Ear Headphones",
    slug: "lumen-over-ear-headphones",
    description:
      "Studio-tuned over-ears with plush memory-foam cushions. Foldable, with a detachable cable for wired listening.",
    details: ["40mm dynamic drivers", "Bluetooth 5.2", "40h battery", "3.5mm aux input"],
    price: 6499,
    compareAtPrice: null,
    image: img("photo-1505740420928-5e560c06d30e"),
    images: [img("photo-1505740420928-5e560c06d30e"), img("photo-1505740420928-5e560c06d30e", 600)],
    category: catRef("electronics-audio"),
    stock: 12,
    rating: 4.4,
    ratingCount: 86,
    isFeatured: false,
    tags: ["headphones", "audio", "bluetooth"],
    createdAt: "2026-06-30T10:00:00.000Z",
    updatedAt: "2026-07-10T09:00:00.000Z",
  },
  {
    _id: "p-keyboard-01",
    name: "Halo Mechanical Keyboard",
    slug: "halo-mechanical-keyboard",
    description:
      "A compact 75% mechanical keyboard with hot-swappable switches, gasket mounting and a soft per-key RGB glow.",
    details: ["75% layout", "Hot-swap switches", "Gasket mount", "Tri-mode: USB-C / BT / 2.4GHz"],
    price: 8499,
    compareAtPrice: 9499,
    image: img("photo-1587829741301-dc798b83add3"),
    images: [img("photo-1587829741301-dc798b83add3"), img("photo-1587829741301-dc798b83add3", 600)],
    category: catRef("electronics-audio"),
    stock: 8,
    rating: 4.8,
    ratingCount: 61,
    isFeatured: true,
    tags: ["keyboard", "mechanical", "desk", "work"],
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-07-16T09:00:00.000Z",
  },
  {
    _id: "p-lamp-01",
    name: "Orbit Desk Lamp",
    slug: "orbit-desk-lamp",
    description:
      "A minimal LED desk lamp with stepless dimming and three colour temperatures. Dimmable touch control with a weighted aluminium base.",
    details: ["Stepless dimming", "3000K–5000K", "Aluminium base", "USB-C powered"],
    price: 2499,
    compareAtPrice: 2999,
    image: img("photo-1538688525198-9b88f6f53126"),
    images: [img("photo-1538688525198-9b88f6f53126"), img("photo-1538688525198-9b88f6f53126", 600)],
    category: catRef("electronics-audio"),
    stock: 0,
    rating: 4.3,
    ratingCount: 42,
    isFeatured: false,
    tags: ["lamp", "desk", "lighting"],
    createdAt: "2026-05-20T10:00:00.000Z",
    updatedAt: "2026-07-05T09:00:00.000Z",
  },

  // ---- Home & Living ----
  {
    _id: "p-vase-01",
    name: "Terra Ceramic Vase",
    slug: "terra-ceramic-vase",
    description:
      "Hand-glazed stoneware vase in a soft matte finish. Each piece varies slightly, making it one of a kind.",
    details: ["Stoneware", "Matte glaze", "H 22cm", "Hand-wash"],
    price: 1299,
    compareAtPrice: null,
    image: img("photo-1567016432779-094069958ea5"),
    images: [img("photo-1567016432779-094069958ea5"), img("photo-1567016432779-094069958ea5", 600)],
    category: catRef("home-living"),
    stock: 20,
    rating: 4.7,
    ratingCount: 54,
    isFeatured: true,
    tags: ["vase", "ceramic", "decor", "home"],
    createdAt: "2026-06-25T10:00:00.000Z",
    updatedAt: "2026-07-14T09:00:00.000Z",
  },
  {
    _id: "p-throw-01",
    name: "Linen Throw Blanket",
    slug: "linen-throw-blanket",
    description:
      "Stonewashed 100% French linen throw that gets softer with every wash. Breathable for year-round use.",
    details: ["100% French linen", "130 x 180 cm", "Stonewashed", "Machine washable"],
    price: 3499,
    compareAtPrice: 4299,
    image: img("photo-1586023492125-27b2c045efd7"),
    images: [img("photo-1586023492125-27b2c045efd7"), img("photo-1586023492125-27b2c045efd7", 600)],
    category: catRef("home-living"),
    stock: 15,
    rating: 4.5,
    ratingCount: 37,
    isFeatured: false,
    tags: ["linen", "throw", "blanket", "home"],
    createdAt: "2026-06-18T10:00:00.000Z",
    updatedAt: "2026-07-08T09:00:00.000Z",
  },
  {
    _id: "p-clock-01",
    name: "Apex Wall Clock",
    slug: "apex-wall-clock",
    description:
      "A silent-sweep wall clock with a powder-coated steel frame and a clean, numbered face.",
    details: ["Silent sweep", "Steel frame", "Ø 30 cm", "AA battery"],
    price: 1899,
    compareAtPrice: null,
    image: img("photo-1560448204-e02f11c3d0e2"),
    images: [img("photo-1560448204-e02f11c3d0e2"), img("photo-1560448204-e02f11c3d0e2", 600)],
    category: catRef("home-living"),
    stock: 9,
    rating: 4.2,
    ratingCount: 29,
    isFeatured: false,
    tags: ["clock", "wall", "decor"],
    createdAt: "2026-05-28T10:00:00.000Z",
    updatedAt: "2026-06-30T09:00:00.000Z",
  },
  {
    _id: "p-pour-01",
    name: "Ritual Pour-Over Set",
    slug: "ritual-pour-over-set",
    description:
      "A glass pour-over dripper with a hand-blown carafe and a walnut stand. Brews a clean, bright cup every morning.",
    details: ["Borosilicate glass", "Walnut stand", "600ml carafe", "Paper-free mesh filter"],
    price: 2799,
    compareAtPrice: 3299,
    image: img("photo-1447933601403-0c6688de566e"),
    images: [img("photo-1447933601403-0c6688de566e"), img("photo-1447933601403-0c6688de566e", 600)],
    category: catRef("home-living"),
    stock: 18,
    rating: 4.6,
    ratingCount: 48,
    isFeatured: true,
    tags: ["coffee", "pour-over", "kitchen", "home"],
    createdAt: "2026-07-05T10:00:00.000Z",
    updatedAt: "2026-07-17T09:00:00.000Z",
  },

  // ---- Accessories ----
  {
    _id: "p-wallet-01",
    name: "Nomad Leather Wallet",
    slug: "nomad-leather-wallet",
    description:
      "A slim bifold wallet in full-grain leather that patinas beautifully over time. Six card slots and a note sleeve.",
    details: ["Full-grain leather", "6 card slots", "RFID shielded", "Slim 1.2cm profile"],
    price: 2199,
    compareAtPrice: 2599,
    image: img("photo-1627123424574-724758594e93"),
    images: [img("photo-1627123424574-724758594e93"), img("photo-1627123424574-724758594e93", 600)],
    category: catRef("accessories"),
    stock: 30,
    rating: 4.5,
    ratingCount: 72,
    isFeatured: true,
    tags: ["wallet", "leather", "accessories"],
    createdAt: "2026-06-10T10:00:00.000Z",
    updatedAt: "2026-07-12T09:00:00.000Z",
  },
  {
    _id: "p-tote-01",
    name: "Canvas Everyday Tote",
    slug: "canvas-everyday-tote",
    description:
      "Heavyweight 16oz cotton-canvas tote with leather-reinforced handles and an interior zip pocket.",
    details: ["16oz cotton canvas", "Leather handles", "Zip pocket", "48 x 40 cm"],
    price: 1499,
    compareAtPrice: null,
    image: img("photo-1548036328-c9fa89d128fa"),
    images: [img("photo-1548036328-c9fa89d128fa"), img("photo-1548036328-c9fa89d128fa", 600)],
    category: catRef("accessories"),
    stock: 40,
    rating: 4.3,
    ratingCount: 55,
    isFeatured: false,
    tags: ["tote", "bag", "canvas"],
    createdAt: "2026-05-15T10:00:00.000Z",
    updatedAt: "2026-06-28T09:00:00.000Z",
  },
  {
    _id: "p-sunglasses-01",
    name: "Cove Polarised Sunglasses",
    slug: "cove-polarised-sunglasses",
    description:
      "Timeless acetate sunglasses with polarised UV400 lenses in an olive acetate frame.",
    details: ["Acetate frame", "Polarised UV400", "Includes case", "Unisex fit"],
    price: 1999,
    compareAtPrice: 2499,
    image: img("photo-1511499767150-a48a237f0083"),
    images: [img("photo-1511499767150-a48a237f0083"), img("photo-1511499767150-a48a237f0083", 600)],
    category: catRef("accessories"),
    stock: 14,
    rating: 4.4,
    ratingCount: 33,
    isFeatured: false,
    tags: ["sunglasses", "eyewear", "summer"],
    createdAt: "2026-07-02T10:00:00.000Z",
    updatedAt: "2026-07-15T09:00:00.000Z",
  },
  {
    _id: "p-watch-01",
    name: "Pendulum Leather Watch",
    slug: "pendulum-leather-watch",
    description:
      "A minimalist quartz watch with a brushed steel case and an interchangeable leather strap.",
    details: ["Quartz movement", "Brushed steel", "Interchangeable strap", "5ATM water resistant"],
    price: 4999,
    compareAtPrice: 5999,
    image: img("photo-1523275335684-37898b6baf30"),
    images: [img("photo-1523275335684-37898b6baf30"), img("photo-1523275335684-37898b6baf30", 600)],
    category: catRef("accessories"),
    stock: 11,
    rating: 4.7,
    ratingCount: 64,
    isFeatured: true,
    tags: ["watch", "leather", "minimal"],
    createdAt: "2026-06-20T10:00:00.000Z",
    updatedAt: "2026-07-11T09:00:00.000Z",
  },

  // ---- Beauty & Care ----
  {
    _id: "p-serum-01",
    name: "Dew Vitamin C Serum",
    slug: "dew-vitamin-c-serum",
    description:
      "A stable 10% vitamin C serum with hyaluronic acid and niacinamide to brighten and hydrate. Fragrance-free.",
    details: ["10% Vitamin C", "Hyaluronic acid", "Niacinamide", "Fragrance-free"],
    price: 1299,
    compareAtPrice: 1599,
    image: img("photo-1620916566398-39f1143ab7be"),
    images: [img("photo-1620916566398-39f1143ab7be"), img("photo-1620916566398-39f1143ab7be", 600)],
    category: catRef("beauty-care"),
    stock: 26,
    rating: 4.6,
    ratingCount: 143,
    isFeatured: true,
    tags: ["serum", "vitamin c", "skincare"],
    createdAt: "2026-07-08T10:00:00.000Z",
    updatedAt: "2026-07-19T09:00:00.000Z",
  },
  {
    _id: "p-candle-01",
    name: "Oak & Fig Candle",
    slug: "oak-and-fig-candle",
    description:
      "A slow-burning soy candle with notes of oakmoss, fig and cedar. 45+ hour burn in a reusable amber jar.",
    details: ["100% soy wax", "45h burn", "Amber glass jar", "Cotton wick"],
    price: 1099,
    compareAtPrice: null,
    image: img("photo-1602874801006-10c1a172c1d4"),
    images: [img("photo-1602874801006-10c1a172c1d4"), img("photo-1602874801006-10c1a172c1d4", 600)],
    category: catRef("beauty-care"),
    stock: 22,
    rating: 4.8,
    ratingCount: 91,
    isFeatured: false,
    tags: ["candle", "soy", "home fragrance"],
    createdAt: "2026-06-12T10:00:00.000Z",
    updatedAt: "2026-07-07T09:00:00.000Z",
  },
  {
    _id: "p-grooming-01",
    name: "Field Grooming Kit",
    slug: "field-grooming-kit",
    description:
      "A travel-ready grooming kit with beard oil, balm and a folding comb in a canvas case.",
    details: ["Beard oil 30ml", "Beard balm 50ml", "Folding comb", "Canvas case"],
    price: 1699,
    compareAtPrice: 1999,
    image: img("photo-1519345182560-3f2917c472ef"),
    images: [img("photo-1519345182560-3f2917c472ef"), img("photo-1519345182560-3f2917c472ef", 600)],
    category: catRef("beauty-care"),
    stock: 17,
    rating: 4.5,
    ratingCount: 58,
    isFeatured: false,
    tags: ["grooming", "beard", "men", "travel"],
    createdAt: "2026-05-25T10:00:00.000Z",
    updatedAt: "2026-06-29T09:00:00.000Z",
  },
  {
    _id: "p-cream-01",
    name: "Calm Barrier Cream",
    slug: "calm-barrier-cream",
    description:
      "A ceramide-rich moisturiser that strengthens the skin barrier and soothes dryness. Suitable for sensitive skin.",
    details: ["Ceramides", "Panthenol", "Sensitive-skin safe", "Non-comedogenic"],
    price: 1199,
    compareAtPrice: 1399,
    image: img("photo-1556228578-8c89e6adf883"),
    images: [img("photo-1556228578-8c89e6adf883"), img("photo-1556228578-8c89e6adf883", 600)],
    category: catRef("beauty-care"),
    stock: 0,
    rating: 4.4,
    ratingCount: 67,
    isFeatured: false,
    tags: ["cream", "moisturiser", "skincare"],
    createdAt: "2026-06-05T10:00:00.000Z",
    updatedAt: "2026-07-01T09:00:00.000Z",
  },
];

const toListItem = (p: Product): ProductListItem => ({
  _id: p._id,
  name: p.name,
  slug: p.slug,
  price: p.price,
  compareAtPrice: p.compareAtPrice,
  image: p.image,
  images: p.images,
  category: p.category,
  rating: p.rating,
  ratingCount: p.ratingCount,
  stock: p.stock,
  isFeatured: p.isFeatured,
  createdAt: p.createdAt,
});

/** Temporary in-memory store so the frontend can be built before the API exists. */
const products = mockProducts.map(toListItem);

const delay = () => new Promise((r) => setTimeout(r, 150));

export async function queryMockProducts(query: {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ items: ProductListItem[]; total: number; page: number; pages: number; limit: number }> {
  await delay();
  const limit = Math.min(query.limit ?? 12, 24);
  const page = query.page ?? 1;

  let list = [...mockProducts];

  if (query.category) {
    list = list.filter((p) => p.category.slug === query.category);
  }
  if (query.q) {
    const q = query.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  switch (query.sort) {
    case "price_asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      list.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      break;
    default:
      list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }

  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    items: list.slice(start, start + limit).map(toListItem),
    total,
    page: Math.min(page, pages),
    pages,
    limit,
  };
}

export async function getMockProduct(slug: string): Promise<Product | null> {
  await delay();
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getMockRelated(slug: string): Promise<ProductListItem[]> {
  await delay();
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) return [];
  return products
    .filter((p) => p.category.slug === product.category.slug && p.slug !== slug)
    .slice(0, 4);
}