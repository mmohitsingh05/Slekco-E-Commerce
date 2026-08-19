/**
 * Slekco content — single source of truth for static copy.
 * Kept out of components so copy can be tuned in one place.
 */

export type TrustIcon = "truck" | "rotate" | "shield" | "headset" | "check";

export const content = {
  announcement: "Free shipping on orders over ₹1,999 · 30-day returns",

  announcementZones: {
    left: "Free shipping on orders over ₹1,999",
    center: "10% off your first order | code: ",
    code: "SLEKCO10",
    right: { label: "Help & Support", href: "/products", label2: "Track order", href2: "/cart" },
  },

  freeShippingThreshold: 1999,

  hero: {
    eyebrow: "New collection",
    title: "Everyday objects.\nMade to stand out.",
    highlight: "stand out.",
    subtitle:
      "A considered selection of electronics, home, accessories and beauty — chosen to make everyday life feel calmer.",
    cta: "Shop now",
    ctaSecondary: "Explore collection",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Curated lifestyle objects on display",
  },

  trust: [
    {
      icon: "truck" as TrustIcon,
      title: "Free shipping",
      description: "On orders over ₹1,999.",
    },
    {
      icon: "rotate" as TrustIcon,
      title: "Easy returns",
      description: "30-day returns.",
    },
    {
      icon: "shield" as TrustIcon,
      title: "Secure payment",
      description: "100% secure checkout.",
    },
    {
      icon: "headset" as TrustIcon,
      title: "Customer support",
      description: "24/7 support.",
    },
  ],

  bestSellers: {
    title: "Best sellers",
    subtitle: "The most-loved picks, ranked by rating.",
  },

  newArrivals: {
    title: "New arrivals",
    subtitle: "Fresh additions to the collection.",
  },

  faq: [
    {
      question: "How fast is delivery?",
      answer:
        "Orders ship within 24 hours. Delivery typically takes 2–4 business days across India, and shipping is free on orders above ₹1,999.",
    },
    {
      question: "What is the return policy?",
      answer:
        "You have 30 days to return any item in its original condition — no questions asked.",
    },
    {
      question: "Are the products original?",
      answer:
        "Every product is sourced directly from its maker and tested before it joins the collection.",
    },
  ],

  promo: [
    {
      eyebrow: "Join the movement",
      title: "Be part of something real.",
      cta: "Shop now",
      href: "/products",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      tone: "dark" as const,
    },
    {
      eyebrow: "Limited drop",
      title: "Exclusive styles. Limited quantities.",
      cta: "Explore now",
      href: "/products?sort=newest",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      tone: "light" as const,
    },
  ],

  newsletter: {
    title: "Stay in the loop",
    description: "New drops, exclusive offers, and more.",
    placeholder: "Enter your email address",
    button: "Subscribe",
    success: "You're on the list — check your inbox for 10% off your first order.",
    error: "Please enter a valid email address.",
  },

  footer: {
    blurb: "A curated modern lifestyle store — electronics, home, accessories and beauty, chosen to make everyday life feel calmer.",
    shop: [
      { label: "All Products", href: "/products" },
      { label: "New Arrivals", href: "/products?sort=newest" },
      { label: "Best Sellers", href: "/products?sort=rating" },
      { label: "Categories", href: "/#categories" },
    ],
    customerCare: [
      { label: "Contact Us", href: "/products" },
      { label: "Shipping & Delivery", href: "/products" },
      { label: "Returns & Exchanges", href: "/cart" },
      { label: "Track Order", href: "/cart" },
      { label: "FAQ", href: "/products" },
    ],
    company: [
      { label: "About Us", href: "/" },
      { label: "Our Story", href: "/" },
      { label: "Sustainability", href: "/" },
    ],
    social: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "X", href: "#" },
    ],
  },
} as const;
