/**
 * Slekco content — single source of truth for static copy.
 * Kept out of components so copy can be tuned in one place.
 */

export type TrustIcon = "truck" | "rotate" | "shield" | "check";

export const content = {
  announcement: "Free shipping on orders over ₹999 · 30-day returns",

  freeShippingThreshold: 999,

  trust: [
    {
      icon: "truck" as TrustIcon,
      title: "Free shipping",
      description: "On all orders above ₹999.",
    },
    {
      icon: "rotate" as TrustIcon,
      title: "30-day returns",
      description: "No questions asked.",
    },
    {
      icon: "shield" as TrustIcon,
      title: "Considered quality",
      description: "Tested and hand-picked.",
    },
    {
      icon: "check" as TrustIcon,
      title: "Secure checkout",
      description: "Protected payments.",
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

  newsletter: {
    title: "Get 10% off your first order",
    description:
      "Join the list for new arrivals, private restocks and considered recommendations.",
    placeholder: "Email address",
    button: "Subscribe",
    success: "You're on the list — check your inbox for 10% off your first order.",
    error: "Please enter a valid email address.",
  },

  faq: [
    {
      question: "How fast is delivery?",
      answer:
        "Orders ship within 24 hours. Delivery typically takes 2–4 business days across India, and shipping is free on orders above ₹999.",
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

  footer: {
    blurb:
      "A small, considered selection of electronics, home, accessories and beauty — chosen to make everyday life feel calmer.",
  },
} as const;