# Slekco — Modern E-Commerce Storefront

A full-stack multi-category e-commerce storefront built with **Next.js 16**, **Express 5**, **MongoDB**, and deployed live on **Vercel** + **Render** + **MongoDB Atlas**.

**Live site:** [https://slekco-e-commerce.vercel.app/](https://slekco-e-commerce.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
  - [Homepage](#homepage)
  - [Shop Page](#shop-page)
  - [Product Detail](#product-detail)
  - [Cart System](#cart-system)
  - [Responsive Design](#responsive-design)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Architecture](#architecture)
  - [Frontend Architecture](#frontend-architecture)
  - [Backend Architecture](#backend-architecture)
  - [State Management](#state-management)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [AI Usage](#ai-usage)

---

## Overview

Slekco is a curated modern lifestyle store — electronics & audio, home & living, accessories and beauty & care. Built as a 24-hour full-stack assessment submission, it demonstrates a production-grade e-commerce experience with real frontend↔backend integration, professional UI/UX, and clean code architecture.

### Key Highlights

- **28 seeded products** across 6 categories with real Unsplash images
- **Full-text search** across product name, brand, description, and tags
- **Real-time cart** with Zustand + localStorage persistence
- **Slide-in cart drawer** with cross-sell recommendations
- **Server-side rendering** with Next.js App Router + ISR revalidation
- **REST API** with layered architecture, Zod validation, and error handling

---

## Live Demo

| Page | URL |
|------|-----|
| Homepage | [slekco-e-commerce.vercel.app](https://slekco-e-commerce.vercel.app/) |
| Shop | [slekco-e-commerce.vercel.app/products](https://slekco-e-commerce.vercel.app/products) |
| Product Detail | [slekco-e-commerce.vercel.app/products/hydro-steel-bottle](https://slekco-e-commerce.vercel.app/products/hydro-steel-bottle) |
| Cart | [slekco-e-commerce.vercel.app/cart](https://slekco-e-commerce.vercel.app/cart) |
| Category | [slekco-e-commerce.vercel.app/categories/electronics-audio](https://slekco-e-commerce.vercel.app/categories/electronics-audio) |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js (App Router) | 16.3.1 |
| UI Library | React | 19.2.8 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| State | Zustand | 5.x |
| Animation | Framer Motion | 13.x |
| Backend | Express | 5.x |
| ORM | Mongoose | 9.x |
| Database | MongoDB Atlas | — |
| Validation | Zod | 4.x |
| Frontend Deploy | Vercel | — |
| Backend Deploy | Render | — |

---

## Features

### Homepage

The homepage is a multi-section landing page designed to drive discovery:

1. **Announcement Bar** — free shipping threshold, promo code (SLEKCO10), help/track links. Dark background with subtle gradient shimmer.
2. **Navigation** — sticky navbar with logo, desktop nav (Home, Shop, Collections), search icon, user icon, cart button with item count badge. Collapses to hamburger on mobile.
3. **Hero Section** — full-width hero with background image, gradient overlays (left-to-right + bottom-to-top), yellow accent headline, two CTA buttons. Minimum height 600px.
4. **Trust Strip** — 4-column value props (Free shipping, Easy returns, Secure payment, Customer support) with icons and subtle horizontal gradient background.
5. **Category Grid** — 6-column grid (responsive: 2→3→6) with category images, dark gradient overlays, icon + name + "Shop now" link. Fetches categories from API.
6. **New Arrivals** — 6-column product grid showing latest products, "View all" link to shop page. Uses ProductGrid component.
7. **Promo Blocks** — 2-column grid with promotional images, directional gradient overlays per tone (dark/light), eyebrow text, headline, CTA buttons.
8. **Newsletter** — email subscription form with success/error states, localStorage persistence. Subtle gradient background.
9. **Footer** — 5-column layout (bio + social, Shop, Customer Care, Company), payment icons, copyright. Subtle top-to-bottom gradient overlay.

### Shop Page

- **Product Grid** — 4-column responsive grid (2→3→4) with product cards showing image (3:4 aspect ratio), name, price, and wishlist button.
- **Search** — real-time search input that queries the API's full-text search.
- **Sidebar Filters** — collapsible filter sections:
  - Category filter (checkboxes with product counts)
  - Brand filter (checkboxes with product counts)
  - Price range filter (min/max inputs)
- **Sort Options** — Featured, Price: Low to High, Price: High to Low, Newest, Top Rated
- **Pagination** — page numbers with Previous/Next navigation
- **URL State** — all filters, search, sort, and page are reflected in URL query params (shareable/bookmarkable)
- **Skeleton Loading** — loading skeletons while data fetches
- **Empty State** — friendly message with "Clear filters" CTA when no results match

### Product Detail

- **Breadcrumb Navigation** — Home / Category / Product name
- **Image Gallery** — main image with zoom-on-hover, thumbnail navigation
- **Product Info** — brand, category link, product name, star rating with review count
- **Price Display** — current price with compare-at price (strikethrough) and discount badge
- **Stock Status** — "In stock — ships within 24 hours" (green), "Only X left in stock — order soon" (yellow), or "Out of stock" badge
- **Quantity Selector** — decrement/increment buttons with min 1, max 99
- **Add to Cart** — yellow gradient button, adds item and opens cart drawer
- **Trust Strip** — shipping, returns, secure payment, support icons
- **Product Description** — full description text
- **Details List** — bullet-point product features with dot indicators
- **FAQ Accordion** — "Good to know" section with expandable questions (How fast is delivery?, Return policy, Product authenticity)
- **Related Products** — 4-column grid of products from the same category
- **JSON-LD** — structured data for SEO (Product schema with rating, offers, brand)

### Cart System

**Cart Drawer (slide-in panel):**
- Slides in from the right with Framer Motion animation
- Dark backdrop (25% opacity) with click-to-close
- Escape key closes the drawer
- Body scroll lock when open
- **Sticky header** — "CART (N)" title + close button
- **Free shipping progress** — dynamic status bar showing "You're ₹X away from FREE SHIPPING" or "You've unlocked free shipping!" with progress bar
- **YOUR CART section** — labeled section with cart items:
  - 72px square product image (links to PDP)
  - Product name (uppercase, bold, truncated)
  - Unit price
  - Quantity stepper (h-8, touch-friendly)
  - Line total
  - Remove button
- **YOU MAY ALSO LIKE section** — up to 3 cross-sell products (filtered to exclude items already in cart):
  - 56px product image
  - Name + price
  - ADD button (opens drawer on click)
- **Sticky footer summary** — subtotal, shipping (Free/—), estimated total, "View cart" (yellow gradient) + "Continue shopping" (outline) buttons

**Cart Page (full page):**
- Two-column layout at xl (≥1280px): items table + sticky order summary
- Free shipping progress bar at top
- Table header (Product / Quantity / Total)
- Full-width cart items with 12-column grid layout
- Order summary with subtotal, shipping, total, "Proceed to checkout" button
- Empty state with icon, message, and CTA

**Cart Store (Zustand + localStorage):**
- Items stored as `Record<string, CartItem>` keyed by productId
- Actions: `addItem`, `removeItem`, `setQty`, `clearCart`
- Quantity clamped between 1 and 99
- Persisted to localStorage under key `"slekco-cart"`
- Derived selectors: `selectCount` (total units), `selectSubtotal` (total price)

### Responsive Design

Tested and optimized at 4 breakpoints:

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | 375px | Single column, hamburger nav, stacked cards |
| Tablet | 768px | 3-column grids, sidebar filters |
| Desktop | 1024px | 4-column grids, full nav |
| Large | 1440px | 2-column cart layout, max-width containers |

---

## API Reference

All endpoints are versioned at `/api/v1` and return a consistent envelope:

```json
{
  "success": true,
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["field-level error 1", "field-level error 2"]
}
```

### Products

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|-------------|
| `GET` | `/api/v1/products` | List products | `search`, `category`, `brand`, `minPrice`, `maxPrice`, `sort`, `page`, `limit` |
| `GET` | `/api/v1/products/:slug` | Get single product | — |
| `GET` | `/api/v1/products/:slug/related` | Get related products | — |

**Sort options:** `featured`, `price_asc`, `price_desc`, `newest`, `rating`

**Example:** `GET /api/v1/products?search=headphones&category=electronics-audio&sort=rating&page=1&limit=12`

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/categories` | List all categories |
| `GET` | `/api/v1/categories/:slug/products` | List products in a category |

### Orders

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/v1/orders` | Create order | `{ items: [{ product, name, price, quantity }] }` |
| `GET` | `/api/v1/orders/:id` | Get order by ID | — |

### Contact

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/v1/contact` | Submit contact form | `{ name, email, subject, message }` |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/health` | Returns `{ status: "ok", db: "connected", uptime: ... }` |

---

## Database Schema

### Product

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` (required) | Product name |
| `slug` | `string` (required, unique) | URL-friendly identifier |
| `description` | `string` (required) | Full product description |
| `brand` | `string` (required) | Brand name |
| `category` | `ObjectId` → Category | Category reference |
| `price` | `number` (min: 0) | Current price in INR |
| `compareAtPrice` | `number \| null` | Original/strikethrough price |
| `images` | `string[]` | Array of image URLs |
| `details` | `string[]` | Bullet-point features |
| `rating` | `number` (0–5) | Average rating |
| `reviewCount` | `number` | Total reviews |
| `stock` | `number` (min: 0) | Available stock |
| `isFeatured` | `boolean` | Featured flag |
| `tags` | `string[]` | Searchable tags |

**Indexes:** text index on `name`, `brand`, `description`, `tags` for full-text search. Individual indexes on `slug`, `brand`, `category`, `price`, `isFeatured`.

### Category

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` (required) | Category name |
| `slug` | `string` (required, unique) | URL-friendly identifier |
| `description` | `string` (optional) | Category description |
| `image` | `string` (optional) | Category image URL |
| `isFeatured` | `boolean` | Featured flag |

### Order

| Field | Type | Description |
|-------|------|-------------|
| `user` | `ObjectId` → User (optional) | User reference (guest orders allowed) |
| `items` | `IOrderItem[]` | Embedded sub-documents |
| `subtotal` | `number` | Calculated server-side |
| `shipping` | `number` | Shipping cost |
| `total` | `number` | Calculated server-side |
| `status` | `enum` | `pending` → `confirmed` → `processing` → `shipped` → `delivered` / `cancelled` |

**Order Item sub-schema:**

| Field | Type | Description |
|-------|------|-------------|
| `product` | `ObjectId` → Product | Product reference |
| `name` | `string` | Snapshot of product name at order time |
| `price` | `number` | Snapshot of product price at order time |
| `quantity` | `number` (min: 1) | Quantity ordered |

### User

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` (required) | User's full name |
| `email` | `string` (required, unique) | Email address |
| `passwordHash` | `string` (select: false) | Hashed password |
| `role` | `enum` | `user` (default) or `admin` |

---

## Architecture

### Frontend Architecture

```
┌─────────────────────────────────────────────────┐
│                   Next.js App Router             │
│                                                  │
│  Server Components (default)                     │
│  ├── Data fetching via lib/api.ts                │
│  ├── SEO metadata via generateMetadata           │
│  └── Static generation via generateStaticParams  │
│                                                  │
│  Client Components ("use client")                │
│  ├── Cart drawer, filters, search                │
│  ├── Mobile menu, animations                     │
│  └── Interactive UI only                         │
│                                                  │
│  Data Flow:                                      │
│  API → lib/api.ts → Server Component → Props     │
│  Store (Zustand) → Client Components → UI        │
└─────────────────────────────────────────────────┘
```

- **Server Components** by default for performance (no client JS shipped)
- **Client Components** only for interactive state (cart, filters, search, mobile menu)
- **ISR revalidation** at 1 hour for product data
- **`dynamicParams = true`** for on-demand product page rendering

### Backend Architecture

```
┌─────────────────────────────────────────────────┐
│                   Express 5                      │
│                                                  │
│  Route Layer (route → controller → service → model)│
│  ├── product.routes.ts → productController       │
│  ├── category.routes.ts → categoryController     │
│  ├── order.routes.ts → orderController           │
│  └── contact.routes.ts → contactController       │
│                                                  │
│  Middleware:                                      │
│  ├── helmet() — security headers                 │
│  ├── cors() — configurable origins               │
│  ├── express.json() — body parsing               │
│  ├── morgan('dev') — request logging             │
│  ├── validate(schema) — Zod validation           │
│  ├── notFoundMiddleware — 404 handler            │
│  └── errorMiddleware — global error handler      │
│                                                  │
│  Models:                                         │
│  ├── Product (text search, compound indexes)     │
│  ├── Category                                    │
│  ├── Order (embedded items, status enum)         │
│  └── User (password hashing, role-based)         │
└─────────────────────────────────────────────────┘
```

- **No business logic in routes or controllers** — all logic lives in service layer
- **Zod validation** on all mutating endpoints
- **Order totals always recalculated server-side** from DB product prices (never trusted from frontend)
- **Graceful shutdown** on SIGINT/SIGTERM

### State Management

**Cart Store (`cart-store.ts`):**
- Zustand with `persist` middleware → localStorage
- Key: `"slekco-cart"`
- Shape: `{ items: Record<string, CartItem>, addItem, removeItem, setQty, clearCart }`
- Derived selectors: `selectCount`, `selectSubtotal`

**UI Store (`ui-store.ts`):**
- Zustand (no persistence)
- Shape: `{ isCartOpen, openCart, closeCart, toggleCart }`

---

## Design System

All design tokens are centralized in `globals.css` via Tailwind's `@theme` directive:

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand-dark` | `#0b0b0b` | Primary dark, headings, footer |
| `--color-brand-yellow` | `#d4f038` | Accent, CTAs, highlights |
| `--color-ink` | `#0b0b0b` | Body text |
| `--color-ink-soft` | `#6b7280` | Secondary text |
| `--color-ink-faint` | `#9ca3af` | Muted text, labels |
| `--color-canvas` | `#ffffff` | Page background |
| `--color-surface` | `#ffffff` | Card/panel background |
| `--color-border` | `#e5e7eb` | Borders, dividers |
| `--color-success` | `#2e7d32` | In stock, free shipping |
| `--color-warning` | `#b26a00` | Low stock |
| `--color-danger` | `#b3261e` | Out of stock, errors |

### Typography

| Token | Size | Usage |
|-------|------|-------|
| `--text-display` | `clamp(2.25rem, 5vw, 4rem)` | Hero headline |
| `--text-h1` | `2rem` | Page titles |
| `--text-h2` | `1.5rem` | Section headings |
| `--text-h3` | `1.125rem` | Sub-headings |
| `--text-body` | `1rem` | Body text |
| `--text-body-sm` | `0.875rem` | Small body, labels |
| `--text-label` | `0.75rem` | Captions, metadata |

### Spacing (4px base scale)

`--spacing-1` (4px) → `--spacing-9` (96px)

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 1px 2px rgba(11,11,11,0.05)` | Card resting |
| `--shadow-card-hover` | `0 8px 24px rgba(11,11,11,0.08)` | Card hover |
| `--shadow-drawer` | `-8px 0 32px rgba(11,11,11,0.12)` | Cart drawer |

### Gradient System

Premium gradient effects applied across the UI:

- **Buttons:** `bg-gradient-to-b from-brand-yellow to-[#c8e430]` with inset highlight
- **Hero:** layered gradients (left-to-right + bottom-to-top)
- **Category cards:** `bg-gradient-to-t from-black/70 via-black/20 to-transparent`
- **Promo blocks:** directional gradients per tone
- **Footer:** `bg-gradient-to-b from-white/[0.03] to-transparent`
- **Product cards:** hover gradient overlay `from-black/20`

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/mmohitsingh05/Slekco-E-Commerce.git
cd Slekco-E-Commerce
```

### 2. Install dependencies

```bash
# Root (for convenience scripts)
npm install

# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..
```

### 3. Set up environment variables

**Backend** — create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/slekco?retryWrites=true&w=majority
CLIENT_ORIGINS=http://localhost:3000
```

**Frontend** — create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Seed the database

```bash
npm run seed
```

This populates 28 products across 6 categories with real Unsplash images.

### 5. Start development servers

```bash
# Terminal 1 — Frontend (port 3000)
npm run dev:frontend

# Terminal 2 — Backend (port 5000)
npm run dev:backend
```

### 6. Open in browser

Visit [http://localhost:3000](http://localhost:3000)

---

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import repo in Vercel dashboard
3. Set root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
5. Deploy — automatic on every push to `main`

### Backend (Render)

1. Create a new Web Service on Render
2. Connect GitHub repo
3. Set root directory to `backend`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add environment variables (MONGODB_URI, CLIENT_ORIGINS, etc.)
7. Deploy

### Database (MongoDB Atlas)

1. Create a free cluster on MongoDB Atlas
2. Create a database user
3. Whitelist IP addresses (0.0.0.0/0 for Render)
4. Get the connection string and add to `MONGODB_URI`
5. Run `npm run seed` to populate initial data

---

## Project Structure

```
slekco-ecommerce/
├── frontend/                          # Next.js App Router
│   ├── app/                           # Pages & routes
│   │   ├── page.tsx                   # Homepage
│   │   ├── layout.tsx                 # Root layout (navbar, footer, cart drawer)
│   │   ├── globals.css                # Design tokens & base styles
│   │   ├── not-found.tsx              # 404 page
│   │   ├── cart/
│   │   │   └── page.tsx               # Cart page
│   │   ├── products/
│   │   │   ├── page.tsx               # Shop page
│   │   │   ├── loading.tsx            # Shop loading skeleton
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Product detail page
│   │   └── categories/
│   │       └── [slug]/
│   │           └── page.tsx           # Category page
│   ├── components/
│   │   ├── cart/                      # Cart system
│   │   │   ├── CartDrawer.tsx         # Slide-in cart panel
│   │   │   ├── CartItem.tsx           # Cart item (compact + full)
│   │   │   ├── CartSummary.tsx        # Order summary (drawer + page)
│   │   │   ├── CrossSell.tsx          # Recommendations
│   │   │   ├── EmptyCart.tsx          # Empty state
│   │   │   └── FreeShippingProgress.tsx # Shipping threshold bar
│   │   ├── home/                      # Homepage sections
│   │   │   ├── Hero.tsx               # Hero banner
│   │   │   ├── CategoryStrip.tsx      # Category grid
│   │   │   ├── NewArrivalsRow.tsx     # New arrivals
│   │   │   ├── PromoStrip.tsx         # Promo blocks
│   │   │   └── ValueProps.tsx         # Trust strip
│   │   ├── layout/                    # Shared layout
│   │   │   ├── Navbar.tsx             # Navigation
│   │   │   ├── MobileMenu.tsx         # Mobile nav
│   │   │   ├── Footer.tsx             # Footer
│   │   │   ├── AnnouncementBar.tsx    # Top bar
│   │   │   ├── CartButton.tsx         # Cart icon + badge
│   │   │   └── NewsletterBand.tsx     # Newsletter form
│   │   ├── product/                   # Product components
│   │   │   ├── ProductCard.tsx        # Product card
│   │   │   ├── ProductGrid.tsx        # Responsive grid
│   │   │   ├── ProductGallery.tsx     # Image gallery
│   │   │   ├── ProductPurchasePanel.tsx # Buy section
│   │   │   ├── PriceTag.tsx           # Price display
│   │   │   ├── RatingStars.tsx        # Star rating
│   │   │   ├── RelatedRow.tsx         # Related products
│   │   │   ├── AddToCartButton.tsx    # Add to cart CTA
│   │   │   └── WishlistButton.tsx     # Wishlist toggle
│   │   ├── shop/                      # Shop components
│   │   │   ├── FilterBar.tsx          # Sidebar filters
│   │   │   └── EmptyState.tsx         # No results
│   │   └── ui/                        # Reusable UI
│   │       ├── Button.tsx             # Button variants
│   │       ├── Badge.tsx              # Status badges
│   │       ├── Container.tsx          # Max-width wrapper
│   │       ├── Skeleton.tsx           # Loading skeletons
│   │       ├── Reveal.tsx             # Scroll animation
│   │       └── icons.tsx              # SVG icon components
│   ├── lib/                           # Utilities
│   │   ├── api.ts                     # API data access layer
│   │   ├── types.ts                   # TypeScript interfaces
│   │   ├── content.ts                 # Static copy (single source)
│   │   ├── format.ts                  # formatINR, discountPercent
│   │   └── site.ts                    # Site config, nav, API URL
│   └── store/                         # State management
│       ├── cart-store.ts              # Cart (Zustand + persist)
│       └── ui-store.ts                # UI state (drawer open/close)
├── backend/                           # Express + TypeScript
│   └── src/
│       ├── app.ts                     # Express app factory
│       ├── server.ts                  # Server startup + graceful shutdown
│       ├── config/
│       │   ├── env.ts                 # Environment config
│       │   └── db.ts                  # MongoDB connection
│       ├── models/                    # Mongoose schemas
│       │   ├── Product.ts
│       │   ├── Category.ts
│       │   ├── Order.ts
│       │   └── User.ts
│       ├── routes/                    # API routes
│       │   ├── product.routes.ts
│       │   ├── category.routes.ts
│       │   ├── order.routes.ts
│       │   └── contact.routes.ts
│       ├── controllers/               # Request handlers
│       ├── services/                  # Business logic
│       ├── validators/                # Zod schemas
│       ├── middlewares/               # Error handling, validation
│       └── scripts/
│           └── seed.ts                # Database seeder
├── package.json                       # Root scripts
├── .gitignore
└── README.md
```

---

## AI Usage

This project was built with AI assistance for:

- **Boilerplate generation** — scaffolding Next.js pages, Express routes, Mongoose schemas
- **Debugging** — resolving TypeScript errors, build failures, and runtime issues
- **Design system** — defining CSS tokens, gradient system, and component variants
- **Architecture decisions** — cart drawer structure, API envelope convention, state management patterns
- **Code review** — identifying hardcoded values, accessibility issues, and responsive breakpoints

All AI-generated code was reviewed, tested, and modified before commit. Key decisions (cart being client-side only, server-side order total calculation, API versioning) were made by the developer.

---

## License

Private — built for assessment submission.
