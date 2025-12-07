npm run lint:fix     # ESLint auto-fix
# Personal & Aluno PWA — AI Agent Guide

**Context**: React 19 + Vite 7 + TS + Tailwind 4 + Zustand + React Router 7. Phase 1 = frontend with mock data; Phase 2 will swap mockService for Supabase (keep signatures stable).

**Architecture**
- Dual roles share the app; routes in `src/App.tsx` guarded by `ProtectedRoute` and `useAuthStore` (mock login, sets role/user). Personal: `/personal/*`; Aluno: `/aluno/*`.
- Data is mock-only: always fetch via `src/services/mockService.ts` (wraps `src/mockdata/*.ts`). No hardcoded data in components.
- Types live in `src/types/index.ts` (`User`→`Aluno`, `Treino`→`TreinoExercicio`→`Exercicio`, `ExecucaoTreino` with `ExecucaoExercicio`). Keep payloads aligned with these shapes.

**Design System (brutalist, non-negotiable)**
- Colors only: brutal-black/white/green/orange/red from `tailwind.config.js`; black borders 6–8px (`border-brutal`, `border-brutal-thick`), radius 0–4px (`brutal`, `brutal-sm`), font weight 900 uppercase, shadows `shadow-brutal`, animations linear only.
- Example: `src/components/common/Button.tsx` shows variant classes and linear Framer Motion hover/tap. Reuse patterns; avoid gradients, soft shadows, big radii, easing curves.

**State & Navigation**
- Global auth: `useAuthStore` (Zustand) mock user by role; logout clears both user and role.
- Routes are lazy-loaded with `<Suspense fallback={<Loading />}>` in `App.tsx`; keep new pages lazy.

**Workflow & Commands**
- Dev: `npm run dev`; Build: `npm run build`; Type check: `npm run type-check`; Lint fix: `npm run lint:fix`.
- PWA check: `npm run build && npm run preview`, then DevTools → Application → Service Workers. Do not hand-edit service workers (managed by `vite-plugin-pwa` in `vite.config.ts`).

**Component/Data Patterns**
- New UI: place shared in `src/components/common/`, role-specific in `src/components/personal|aluno/`, export via barrel (`common/index.ts`), keep brutalist styling.
- Mock data extension: add types first, then mock arrays in `src/mockdata/{entity}.ts`, expose through `mockService` with same signatures you’ll need for Supabase later.
- Forms: React Hook Form + Zod; Animations: Framer Motion with `ease: 'linear'` and small scale hover/tap.

**Key Files**
- `src/App.tsx`, `src/store/authStore.ts`, `src/services/mockService.ts`, `src/types/index.ts`, `tailwind.config.js`, `vite.config.ts`, `.cursorrules` (legacy but still relevant).

**Hard Rules / Don’ts**
- No CSS files (Tailwind only); no gradients/soft shadows/rounded >4px; no manual SW; no GitHub Actions deploy (use Vercel CLI); no `any`; no hardcoded data.

**Phase 2 Heads-up**
- Swap `mockService` for Supabase keeping function signatures; replace mock auth with Supabase Auth; chat/messages should move to Supabase Realtime; plan offline/IndexedDB then.
