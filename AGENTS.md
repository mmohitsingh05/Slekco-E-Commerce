# AGENTS.md — Slekco E-Commerce Assessment

> Read this file FIRST, fully, before writing any code. This is the single source
> of truth for scope, architecture, sequencing and quality bar. It links out to
> detailed specs in `/docs`. If any instruction below conflicts with a linked doc,
> **this file wins**.

## 0. What this project is

Slekco is a 24-hour full-stack assessment submission: a modern multi-category
e-commerce storefront (Next.js) + a REST API (Express) + MongoDB, deployed live
(Vercel + Render + MongoDB Atlas), with a professional README and documented AI
usage. Evaluator judges: visual/UX quality, engineering structure, real
frontend↔backend integration, and the developer's ability to explain and modify
the code live in an interview.

**Non-negotiable end state:** live, working, mobile-responsive site + clean
GitHub repo + README that explains architecture, setup, API, deployment and AI
usage + developer who can explain every non-trivial line.

## 1. Repository layout (monorepo)

```
slekco-ecommerce/
├── frontend/        # Next.js App Router, TypeScript
├── backend/         # Express + TypeScript + Mongoose
├── docs/            # This spec pack (not required in submission repo, keep local)
├── README.md
├── .gitignore
└── package.json     # optional root scripts
```

Full detail: [docs/03-FRONTEND-ARCHITECTURE.md](docs/03-FRONTEND-ARCHITECTURE.md),
[docs/04-BACKEND-ARCHITECTURE.md](docs/04-BACKEND-ARCHITECTURE.md)

## 2. Build order — follow this sequence, don't skip ahead

| Phase | Hours (of 24) | Deliverable | Spec |
|---|---|---|---|
| 1. Setup + design lock | 0–1 | repo, design tokens, IA | [02](docs/02-DESIGN-SYSTEM.md) |
| 2. Frontend shell | 1–7 | navbar, hero, homepage, listing, cards, search, filters | [03](docs/03-FRONTEND-ARCHITECTURE.md) |
| 3. Product detail + responsive | 7–9 | PDP, breakpoints, animation | [03](docs/03-FRONTEND-ARCHITECTURE.md) |
| 4. Cart | 9–11 | Zustand + persistence + drawer | [03](docs/03-FRONTEND-ARCHITECTURE.md) §Cart |
| 5. Backend core | 11–16 | Express, Mongoose, models, all APIs | [04](docs/04-BACKEND-ARCHITECTURE.md), [05](docs/05-API-SPEC.md), [06](docs/06-DATABASE-SCHEMA.md) |
| 6. Integration | 16–18 | frontend consumes real API, loading/error states | [03](docs/03-FRONTEND-ARCHITECTURE.md) §Integration |
| 7. Deploy | 18–20 | Atlas + Render + Vercel + CORS + env vars | [07](docs/07-DEPLOYMENT.md) |
| 8. QA pass | 20–21.5 | responsive, bug fixing | [08](docs/08-TESTING-CHECKLIST.md) |
| 9. SEO/A11y/perf/security | 21.5–22.5 | checklist | [08](docs/08-TESTING-CHECKLIST.md) |
| 10. Docs | 22.5–23.5 | README, screenshots, AI-workflow section | [09](docs/09-AI-WORKFLOW-README.md) |
| 11. Final check | 23.5–24 | prod test, GitHub hygiene, submit | [08](docs/08-TESTING-CHECKLIST.md) §Final |

## 3. Hard scope boundaries

**MUST build:** homepage, product listing, search, filters, sort, product
detail, cart (client-side, Zustand+localStorage), Express REST API, MongoDB
persistence, deployment on Vercel+Render+Atlas, README.

**Nice-to-have, only if time remains:** wishlist, basic auth, contact API
persistence, advanced sort.

**Do NOT build:** payment gateway, admin dashboard, recommendation engine,
GraphQL, microservices, Redis, Kafka, Kubernetes, Elasticsearch, multi-region
infra. These cost time without moving the assessment score.

## 4. Core architectural decisions (agent must respect these, don't re-derive)

- **Monorepo**, two independently deployable apps (`frontend`, `backend`).
- **Next.js App Router + TypeScript** for frontend; Server Components by
  default, Client Components only for interactive state (cart, filters,
  search, mobile menu, animated bits).
- **Express + TypeScript + Mongoose** for backend, layered as
  `route → controller → service → model`. No business logic in routes or
  controllers.
- **Cart is client-side only** (Zustand + localStorage) — no server cart,
  because checkout/auth are out of scope. State this explicitly if asked why.
- **Order totals are always recalculated server-side** from DB product prices,
  never trusted from the frontend payload.
- **API is versioned** at `/api/v1`.
- **Consistent API response envelope**: `{ success, data | message }`.
- Product images are **URLs**, not binaries in DB.
- **Design tokens are centralized** (CSS variables / Tailwind theme), not
  hardcoded per component.

## 5. AI-assisted development — process to actually follow, not just document

1. Understand the requirement myself before prompting.
2. Use AI (this agent) for research/boilerplate/debugging.
3. **I decide architecture** — the agent implements within decisions above.
4. Review every generated diff before accepting.
5. Test manually against [08-TESTING-CHECKLIST.md](docs/08-TESTING-CHECKLIST.md).
6. Commit with a descriptive message (see §6).
7. Be able to explain any AI-generated block: what it does, why, failure mode,
   alternative. See [10-INTERVIEW-PREP.md](docs/10-INTERVIEW-PREP.md) — this is
   an explicit assessment requirement, not optional polish.

Record at least one real "AI suggested X, I changed it to Y because Z" example
for the README — don't fabricate, use something that actually happened during
the build (cart architecture and filtering-on-server are the two strongest
candidates per the original plan).

## 6. Commit discipline

Small, sequential, conventional commits — not one giant commit. Pattern:
`feat: initialize Next.js frontend`, `feat: build responsive navbar`,
`feat: implement Zustand cart`, `feat: add product and category APIs`,
`docs: add project README`. Never commit `.env`, `node_modules`, or secrets —
only `.env.example`.

## 7. Definition of done for any task in this repo

A task (e.g. "build ProductCard", "add /products API") is done only when:
- It matches the relevant spec doc.
- It has a loading state and an error state if it does async work.
- It's responsive at 375 / 768 / 1024 / 1440.
- It has no hardcoded product/category data left in frontend components.
- Secrets are in `.env`, not in code.
- I can explain it without re-reading the diff.

## 8. Docs index

- [01-PRODUCT-STRATEGY.md](docs/01-PRODUCT-STRATEGY.md) — brand, positioning, assessment interpretation
- [02-DESIGN-SYSTEM.md](docs/02-DESIGN-SYSTEM.md) — colors, type, spacing, radius, tokens
- [03-FRONTEND-ARCHITECTURE.md](docs/03-FRONTEND-ARCHITECTURE.md) — pages, components, state, integration
- [04-BACKEND-ARCHITECTURE.md](docs/04-BACKEND-ARCHITECTURE.md) — folder structure, layering, security
- [05-API-SPEC.md](docs/05-API-SPEC.md) — every endpoint, params, response shapes
- [06-DATABASE-SCHEMA.md](docs/06-DATABASE-SCHEMA.md) — Mongoose schemas, indexes, relationships
- [07-DEPLOYMENT.md](docs/07-DEPLOYMENT.md) — Atlas, Render, Vercel, env vars, CORS
- [08-TESTING-CHECKLIST.md](docs/08-TESTING-CHECKLIST.md) — functional, responsive, security, final checks
- [09-AI-WORKFLOW-README.md](docs/09-AI-WORKFLOW-README.md) — README structure + copy to paste in
- [10-INTERVIEW-PREP.md](docs/10-INTERVIEW-PREP.md) — likely Qs, strong answers, live-modification prep