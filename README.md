# Slekco — Modern E-Commerce Storefront

A full-stack multi-category e-commerce storefront built with **Next.js 16**, **Express 5**, **MongoDB**, and deployed live on **Vercel** + **Render** + **MongoDB Atlas**.

**Live site:** [https://slekco-e-commerce.vercel.app/](https://slekco-e-commerce.vercel.app/)

---

## Features

### Frontend
- **Homepage** — hero banner, category grid, new arrivals (6-col), promo blocks, trust strip, newsletter
- **Shop page** — 4-column product grid, search, filters (category, brand, price), sort (featured, price, newest, rating), pagination
- **Product detail** — image gallery, rating stars, price with compare-at, stock status, quantity selector, FAQ accordion, related products
- **Cart** — Zustand store with localStorage persistence, slide-in drawer with YOUR CART / YOU MAY ALSO LIKE sections, full cart page with order summary
- **Responsive** — mobile-first, tested at 375 / 768 / 1024 / 1440
- **Premium UI** — gradient buttons, subtle section gradients, smooth animations (Framer Motion), skeleton loading states

### Backend (Express + TypeScript + Mongoose)
- REST API versioned at `/api/v1`
- Layered architecture: `route → controller → service → model`
- Input validation with Zod
- MongoDB Atlas persistence with Mongoose schemas
- Security: Helmet, CORS, Morgan logging

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | List products (search, filter, sort, paginate) |
| GET | `/api/v1/products/:slug` | Get single product |
| GET | `/api/v1/products/:slug/related` | Get related products |
| GET | `/api/v1/categories` | List all categories |
| GET | `/api/v1/categories/:slug` | Get single category |
| POST | `/api/v1/orders` | Create order |
| POST | `/api/v1/contact` | Submit contact form |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| State | Zustand (cart) + localStorage persistence |
| Animation | Framer Motion |
| Backend | Express 5, TypeScript, Mongoose 9 |
| Database | MongoDB Atlas |
| Validation | Zod |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas connection string (or local MongoDB)

### 1. Clone & install

```bash
git clone https://github.com/mmohitsingh05/Slekco-E-Commerce.git
cd Slekco-E-Commerce

# Install root scripts
npm install

# Install frontend
cd frontend && npm install && cd ..

# Install backend
cd backend && npm install && cd ..
```

### 2. Environment variables

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Seed the database

```bash
npm run seed
```

### 4. Run development servers

```bash
# Frontend (port 3000)
npm run dev:frontend

# Backend (port 5000)
npm run dev:backend
```

### 5. Production build

```bash
npm run build
```

---

## Project Structure

```
slekco-ecommerce/
├── frontend/                  # Next.js App Router
│   ├── app/                   # Pages & routes
│   │   ├── page.tsx           # Homepage
│   │   ├── products/          # Shop + product detail
│   │   ├── categories/        # Category pages
│   │   └── cart/              # Cart page
│   ├── components/            # UI components
│   │   ├── cart/              # CartDrawer, CartItem, CartSummary, CrossSell
│   │   ├── home/              # Hero, CategoryStrip, NewArrivals, PromoStrip
│   │   ├── layout/            # Navbar, Footer, AnnouncementBar
│   │   ├── product/           # ProductCard, ProductGrid, ProductGallery
│   │   └── ui/                # Button, Badge, Skeleton, icons
│   ├── lib/                   # API client, types, content, utils
│   └── store/                 # Zustand stores (cart, ui)
├── backend/                   # Express + TypeScript
│   └── src/
│       ├── models/            # Mongoose schemas (Product, Category, Order, User)
│       ├── routes/            # API routes
│       ├── controllers/       # Request handlers
│       ├── services/          # Business logic
│       ├── validators/        # Zod schemas
│       └── middlewares/       # Error handling, auth
└── README.md
```

---

## Design System

- **Brand colors:** `#0b0b0b` (dark), `#d4f038` (accent yellow)
- **Typography:** Inter, uppercase headings, bold weights
- **Spacing:** 4px base scale
- **All tokens** defined as CSS variables in `globals.css` via Tailwind `@theme`

---

## AI Usage

This project was built with AI assistance (GitHub Copilot / Claude) for:
- Boilerplate generation and scaffolding
- Debugging type errors and build issues
- Design system token definitions
- Component architecture decisions

All AI-generated code was reviewed, tested, and modified before commit.

---

## License

Private — built for assessment submission.
