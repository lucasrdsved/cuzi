# Copilot Instructions — Personal & Aluno (cuzi)

PWA fitness app connecting **Personal Trainers** and **Students (Alunos)**. Built with React 19 + Vite 7 + TypeScript + Tailwind 4 + Zustand + React Router 7.

## Architecture Overview

```
src/
├── components/common/   # Reusable UI (Button, Card, Modal, Input, ProgressCard)
├── pages/               # Route components (lazy-loaded)
│   ├── Aluno/           # Student views (Home, ExecucaoTreino)
│   └── Personal/        # Trainer views (Dashboard)
├── store/               # Zustand state (authStore.ts)
├── services/            # Data layer (mockService.ts → future Supabase)
├── mockdata/            # Static test data (alunos, treinos, exercicios, etc.)
└── types/               # TypeScript domain types (index.ts)
```

### Data Flow
1. **Auth**: `useAuthStore()` holds mock user with `UserType: 'personal' | 'aluno'`
2. **Routing**: `ProtectedRoute` guards `/personal/*` and `/aluno/*` by role
3. **Data**: `mockService.ts` simulates API (keep signatures for Supabase Phase 2)

## Essential Patterns

### Brutalist Design System (tailwind.config.js)
```tsx
// Colors: brutal-black, brutal-white, brutal-green, brutal-orange, brutal-red, brutal-cyan, brutal-fuchsia
// Borders: border-brutal (6px), border-brutal-thick (8px)
// Shadows: shadow-brutal (8px offset), shadow-brutal-hover (12px offset)
// Font: font-brutal (Inter, weight 900)
// Radius: brutal (0px), brutal-sm (4px)
```

### Component Pattern (see Button.tsx)
```tsx
import { motion } from 'framer-motion'

interface MyComponentProps {
  /** JSDoc all props */
  children: ReactNode
}

export default function MyComponent({ children }: MyComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'linear' }}
      className="border-brutal-thick border-brutal-black bg-brutal-white font-brutal uppercase"
    >
      {children}
    </motion.div>
  )
}
```

### Animation Standards
- Use Framer Motion `motion.*` primitives
- **Linear easing** with short durations (0.2-0.3s)
- Subtle scale interactions: `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`

## Code Rules (Strict)

| Rule | Details |
|------|---------|
| TypeScript | Avoid `any` (use `unknown`). Run `npm run type-check` before PRs |
| Path Aliases | Use `@/`, `@components/`, `@pages/`, `@store/`, `@services/`, `@types/` |
| Components | Functional only, props typed, JSDoc all exports |
| Barrel Exports | Use `index.ts` pattern (see `components/common/index.ts`) |
| Styling | **Tailwind only**, use `brutal-*` tokens. No CSS files |
| Forms | React Hook Form + Zod for validation |
| Lazy Loading | All pages via `React.lazy()` with `<Suspense fallback={<Loading/>}>` |

### Domain Types (src/types/index.ts)

| Type | Description |
|------|-------------|
| `User` / `UserType` | Auth user ('personal' \| 'aluno') |
| `Aluno` | Student profile with `objetivo`, `restricoes` |
| `Treino` / `TreinoExercicio` | Workout + exercises (series, repeticoes, descanso) |
| `ExecucaoTreino` / `ExecucaoExercicio` | Completed workout session |
| `Exercicio` | Exercise catalog (grupoMuscular, dificuldade) |
| `Mensagem` | Chat message between users |
| `Medida` | Physical measurements |

## Development Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # TypeScript check + Vite build
npm run preview      # Preview production build
npm run type-check   # tsc --noEmit
npm run lint:fix     # ESLint auto-fix
```

## PWA Configuration

Managed by `vite-plugin-pwa` in `vite.config.ts`. **Do NOT hand-edit generated SW.**

- **Caching**: API (NetworkFirst), images/fonts (CacheFirst)
- **Offline**: Fallback page at `/offline`
- **Testing**: `npm run build && npm run preview` → DevTools → Application → Service Workers

## Deploy

**Vercel only** (CLI or web UI). See `vercel.json`. **Do NOT add GitHub Actions for deploy.**

## Adding New Features

### New Mock Endpoint
1. Add types to `src/types/index.ts`
2. Add mock data to `src/mockdata/{entity}.ts`
3. Export wrapper function in `src/services/mockService.ts` with proper return type

### New Component
1. Create in `src/components/common/` with JSDoc
2. Export from `src/components/common/index.ts`
3. Use brutalist tokens and Framer Motion

### New Page
1. Create in `src/pages/{Role}/` (Aluno or Personal)
2. Add lazy import in `src/App.tsx`
3. Wrap route with `ProtectedRoute` for role-based access

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/services/mockService.ts` | All data access (Phase 1 mock) |
| `src/store/authStore.ts` | Mock auth with `login(type)` / `logout()` |
| `src/App.tsx` | Routes + ProtectedRoute configuration |
| `src/components/common/Button.tsx` | Reference component pattern |
| `tailwind.config.js` | Brutalist design tokens |
| `vite.config.ts` | PWA, path aliases, build optimization |
| `tsconfig.json` | Strict TypeScript with path aliases |

## Future: Supabase Migration (Phase 2)

`mockService.ts` function signatures are designed to match Supabase patterns:
- `getAlunosByPersonal(personalId)` → `supabase.from('alunos').select().eq('personalId', id)`
- Replace mock imports with `@supabase/supabase-js` client
