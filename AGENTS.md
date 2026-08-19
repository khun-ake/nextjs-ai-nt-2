<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server (port 3000)
- `npm run build` — production build (standalone output)
- `npm run lint` — ESLint (no separate typecheck script; use `npx tsc --noEmit` manually)

## Prisma

Prisma v7 with MariaDB driver adapter. Client generated to `generated/prisma/` (not the default `node_modules` location).

After schema changes: `npx prisma generate` (required before build/dev).

Import pattern: `import prisma from "@/lib/prisma"` — never import from `@prisma/client` directly.

## Architecture

- **Next.js 16.3.1** / React 19 / App Router
- **Route groups** — `(front)` for public pages, `(auth)` for login/signup. Each has its own `layout.tsx`; there is no root `layout.tsx`.
- **Path alias** — `@/*` maps to `./src/*`
- **Auth** — better-auth with Prisma adapter; API route at `src/app/api/auth/[...all]/route.ts`
- **UI** — shadcn (radix-rhea style, lucide icons) in `src/components/ui/`; Tailwind CSS 4 via PostCSS
- **State** — Zustand (`src/lib/cart-store.ts`)
- **Cache** — `cacheComponents: true` enabled globally in `next.config.ts`; individual routes opt out via `export const instant = false`

## Key Gotchas

- `.env` contains `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. Prisma reads it via `import "dotenv/config"` in `prisma.config.ts` and `src/lib/prisma.ts`.
- The Prisma client uses `PrismaMariaDb` adapter — not a direct database connection.
- No CI workflows or test suite in this repo.
- `CLAUDE.md` just references `AGENTS.md` — keep instructions in this file only.
