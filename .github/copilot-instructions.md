# Personal & Aluno PWA - AI Agent Instructions

## Project Overview
Progressive Web App connecting personal trainers and students with a **brutalist design system**. Currently in **Phase 1** (frontend-first with mock data), preparing for **Phase 2** (Supabase backend integration).

**Stack**: React 19 + Vite 7 + TypeScript + Tailwind 4 + Zustand + React Router 7  
**Build Output**: Optimized chunks via manual splitting (react-vendor, ui-vendor, form-vendor, charts)  
**PWA Strategy**: Workbox with NetworkFirst (API), CacheFirst (assets), offline fallback to `/offline`

## Architecture & Data Flow

### Two-User System with Role-Based Access
- **Personal Trainer** (`/personal/*`): Dashboard with stats (alunos ativos, treinos ativos), manages students via `getAlunosByPersonal()`, creates workouts, tracks executions
- **Student/Aluno** (`/aluno/*`): Views "Treino do Dia" (most recent active workout), executes exercises with timer/rest periods, logs progress
- **Shared Login**: Single `/` route with two mock login buttons → creates fake users based on role (`personal-1` or `aluno-1`)

### Mock-First Development Pattern (Phase 1)
All data flows through `src/services/mockService.ts` - a facade over mock arrays in `src/mockdata/`:
```typescript
// CORRECT: Use service functions
import { getTreinosByAluno, getAlunoById } from '../services/mockService'
const treinos = getTreinosByAluno(user.id) // Filters by alunoId + ativo=true
const aluno = getAlunoById('aluno-1')

// WRONG: Direct array access
import { mockTreinos } from '../mockdata/treinos' // ❌ Breaks Phase 2 migration
```
**Why**: Keeps components decoupled from data source. In Phase 2, only `mockService.ts` changes to Supabase calls - components stay identical.

### Type System Hierarchy (`src/types/index.ts`)
```
User (id, name, email, type: 'personal' | 'aluno')
  ↓
Aluno (personalId, objetivo, restricoes, createdAt)
  
Exercicio (nome, grupoMuscular, dificuldade)
  ↓
TreinoExercicio (exercicioId, series, repeticoes, carga, descanso, ordem)
  ↓  
Treino (personalId, alunoId, exercicios[], ativo)
  ↓
ExecucaoTreino (treinoId, alunoId, exerciciosExecutados[], feedback, duracaoTotal)
  ↓
ExecucaoExercicio (exercicioId, seriesCompletas, cargaUsada)
```
**Critical relationships**:
- `TreinoExercicio.exercicio` is denormalized (includes full `Exercicio` object) for easier rendering
- `Treino.ativo` filters workouts in `getTreinosByAluno()` - only active ones shown to students
- `ExecucaoTreino` tracks **completed** workouts; `ExecucaoExercicio` tracks per-exercise progress

### State Management & Routing
- **Auth**: `useAuthStore` (Zustand) - mock login creates `User` with `id`, `name`, `email`, `type`
  - `login('personal')` → creates `personal-1` user → redirects to `/personal`
  - `login('aluno')` → creates `aluno-1` user → redirects to `/aluno`
- **Protected Routes**: `ProtectedRoute` wrapper checks `allowedRoles[]` before rendering `<Outlet />` (React Router 7 pattern)
- **Lazy Loading**: All pages use `React.lazy()` + `<Suspense fallback={<Loading />}>` in `App.tsx`
  - Initial bundle ~120KB (react-vendor) + code-split routes load on demand

## Brutalist Design System (Strict Enforcement)

Every UI element MUST follow these rules from `tailwind.config.js`. Violations break the visual identity.

### Color Palette (Closed Set)
```typescript
brutal-black: #000000   // Borders, primary text, button hover states
brutal-white: #FFFFFF   // Backgrounds, inverted button text
brutal-green: #00FF00   // Success (treino completed, action buttons)
brutal-orange: #FF6600  // Warnings, highlights (unused in current impl)
brutal-red: #FF0000     // Errors, danger actions (unused in current impl)
brutal-cyan: #00FFFF    // Available but unused
brutal-fuchsia: #FF00FF // Available but unused
```
**Usage in code**: `className="bg-brutal-white border-brutal-black text-brutal-green"`

### Visual Constraints
- **Borders**: `border-brutal` (6px) or `border-brutal-thick` (8px) - ONLY black or accent colors
- **Border radius**: `brutal` (0px) or `brutal-sm` (4px) - **never** use `rounded-md`, `rounded-lg`
- **Typography**: Font weight `brutal` (900) for headings/buttons, weight 700 for body text
  - Always uppercase for buttons: `className="font-brutal uppercase"`
- **Shadows**: `shadow-brutal` (8px 8px solid black) or `shadow-brutal-sm` (4px 4px solid black)
  - **Never** use soft shadows (`shadow-md`, `shadow-lg`)
- **Spacing**: Multiples of 8px (p-2, p-4, p-6, p-8) - maintains grid rigidity

### Animation Rules (Linear Only)
```tsx
// CORRECT: Brutalist animation
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: 'linear' }} // ← LINEAR ONLY
/>

// WRONG: Smooth animations
transition={{ ease: 'easeInOut' }} // ❌ Breaks brutalism
```
See `src/components/common/Button.tsx` for reference implementation.

### Component Patterns
```tsx
// Button with brutalist styling (primary variant)
<Button variant="primary" size="lg" onClick={handleAction}>
  INICIAR TREINO
</Button>
// → Renders: 8px black border, white bg, black text, hover inverts colors

// Card with thick border
<Card padding="lg" border="thick">
  <h2 className="text-3xl font-brutal">TREINO DO DIA</h2>
</Card>
// → Renders: 8px border, 32px (p-8) padding

// Input with brutalist style (see Input.tsx)
<Input 
  label="EMAIL" 
  error={errors.email?.message}
  className="border-brutal" // 6px border
/>
```

**Anti-Patterns**:
- ❌ `rounded-lg`, `rounded-md` → Use `brutal` (0px) or `brutal-sm` (4px)
- ❌ `shadow-lg` → Use `shadow-brutal` (solid offset)
- ❌ Gradient backgrounds → Use solid `bg-brutal-*` colors
- ❌ Smooth hover transitions → Use 200ms linear only

## Development Workflow

### Essential Commands
```bash
npm run dev          # Vite dev server on auto-assigned port (usually :5173)
npm run build        # TypeScript check → Vite build → outputs to dist/
npm run preview      # Serve production build locally (test PWA features)
npm run type-check   # TypeScript validation only (no build)
npm run lint         # ESLint with max 0 warnings
npm run lint:fix     # Auto-fix ESLint issues
```

### PWA Development & Testing
**Critical**: Service worker only active in production builds. Dev mode skips SW registration.

```bash
# Test PWA locally
npm run build && npm run preview

# Then in browser:
# 1. DevTools → Application → Manifest (check icons, name, theme_color)
# 2. DevTools → Application → Service Workers (should see "activated")
# 3. DevTools → Network → Offline (test offline.html fallback)
# 4. DevTools → Application → Cache Storage (verify workbox caches)
```

**PWA Config** (`vite.config.ts`):
- **registerType**: `'prompt'` - user must accept update (not autoUpdate)
- **Caching strategies**:
  - API calls (`/^https:\/\/api\./i`): `NetworkFirst` (10s timeout, 1h cache)
  - Images (`png|jpg|svg|webp`): `CacheFirst` (100 entries, 30 days)
  - Fonts (`woff|woff2`): `CacheFirst` (20 entries, 1 year)
- **Offline fallback**: `/offline` route renders `Offline.tsx` page

**Don't**: Manually edit `dist/sw.js` or `public/sw.js` - vite-plugin-pwa generates it automatically.

### Adding Components (Structured Approach)

**1. Reusable components** → `src/components/common/`
```tsx
// src/components/common/ExerciseCard.tsx
export default function ExerciseCard({ exercise }: { exercise: Exercicio }) {
  return (
    <Card padding="md" border="normal">
      <h3 className="font-brutal text-xl">{exercise.nome}</h3>
      <p className="text-sm">{exercise.grupoMuscular}</p>
    </Card>
  )
}

// Export from barrel file
// src/components/common/index.ts
export { default as ExerciseCard } from './ExerciseCard'
```

**2. Role-specific components** → `src/components/personal/` or `src/components/aluno/`
```tsx
// src/components/aluno/TreinoTimer.tsx (aluno-only feature)
export default function TreinoTimer({ descanso }: { descanso: number }) {
  const [tempo, setTempo] = useState(descanso)
  // Timer logic...
}
```

**3. Page-level components** → `src/pages/{Role}/`
```tsx
// src/pages/Aluno/Progresso.tsx (new page)
import { lazy } from 'react'

// In App.tsx, lazy load:
const AlunoProgresso = lazy(() => import('./pages/Aluno/Progresso'))

// Add route:
<Route path="/aluno/progresso" element={<AlunoProgresso />} />
```

### Adding Mock Data (4-Step Process)

**Example**: Adding `Medida` (body measurements) feature

1. **Define type** in `src/types/index.ts`:
```typescript
export interface Medida {
  id: string
  alunoId: string
  data: string
  peso?: number
  altura?: number
  observacoes?: string
}
```

2. **Create mock data** in `src/mockdata/medidas.ts`:
```typescript
import { Medida } from '../types'

export const mockMedidas: Medida[] = [
  {
    id: 'med-1',
    alunoId: 'aluno-1',
    data: '2024-01-15T10:00:00Z',
    peso: 75,
    altura: 175,
  },
]
```

3. **Add service functions** in `src/services/mockService.ts`:
```typescript
import { mockMedidas } from '../mockdata/medidas'

export const getMedidasByAluno = (alunoId: string): Medida[] => {
  return mockMedidas.filter((m) => m.alunoId === alunoId)
}

export const getLatestMedida = (alunoId: string): Medida | undefined => {
  const medidas = getMedidasByAluno(alunoId)
  return medidas.sort((a, b) => 
    new Date(b.data).getTime() - new Date(a.data).getTime()
  )[0]
}
```

4. **Use in components**:
```typescript
import { getMedidasByAluno } from '../../services/mockService'

function ProgressoPage() {
  const { user } = useAuthStore()
  const [medidas, setMedidas] = useState<Medida[]>([])
  
  useEffect(() => {
    if (user?.id) {
      setMedidas(getMedidasByAluno(user.id))
    }
  }, [user])
  
  // Render medidas...
}
```

## Key Files Reference

- **`src/App.tsx`**: Route definitions with lazy loading, `<Suspense>` boundaries, role-based `<ProtectedRoute>` wrappers
- **`src/store/authStore.ts`**: Zustand store - mock login creates fake `User` objects (`personal-1` or `aluno-1`)
- **`src/services/mockService.ts`**: **Single source of truth** for data access - all components import from here
- **`tailwind.config.js`**: Complete design token system (colors, borders, shadows, animations)
- **`vite.config.ts`**: 
  - PWA manifest (name, icons, theme_color)
  - Workbox runtime caching strategies
  - Manual code splitting (`manualChunks`)
  - Path aliases (`@/`, `@components/`, etc.)
- **`src/types/index.ts`**: All TypeScript interfaces (9 total: User, Aluno, Exercicio, etc.)
- **`.cursorrules`**: Legacy 424-line comprehensive guide - superset of this file with more examples

## Real-World Component Examples

### 1. ExecucaoTreino.tsx - Complex State Machine
Located at `src/pages/Aluno/ExecucaoTreino.tsx` - demonstrates advanced patterns:

**Features**:
- Multi-step workout execution with series tracking
- Rest timer with countdown (updates every 1s via `setInterval`)
- State transitions: exercise → rest → next exercise → completion
- Progress tracking across all exercises in workout

**Key patterns**:
```tsx
// State for current position in workout
const [exercicioAtual, setExercicioAtual] = useState(0) // Index in treino.exercicios[]
const [serieAtual, setSerieAtual] = useState(1)         // Current set number

// State for rest timer
const [descansoAtivo, setDescansoAtivo] = useState(false)
const [tempoDescanso, setTempoDescanso] = useState(0)

// Track completed sets per exercise
const [execucoes, setExecucoes] = useState<Record<string, ExecucaoExercicio>>({})

// Cleanup interval on unmount
useEffect(() => {
  let interval: NodeJS.Timeout | null = null
  if (descansoAtivo && tempoDescanso > 0) {
    interval = setInterval(() => {
      setTempoDescanso((prev) => prev <= 1 ? 0 : prev - 1)
    }, 1000)
  }
  return () => { if (interval) clearInterval(interval) }
}, [descansoAtivo, tempoDescanso])

// Transition logic when completing a set
const handleSerieCompleta = () => {
  const novasExecucoes = {
    ...execucoes,
    [exercicio.id]: {
      ...execucaoAtual,
      seriesCompletas: execucaoAtual.seriesCompletas + 1,
    }
  }
  setExecucoes(novasExecucoes)
  
  if (allSeriesComplete) {
    // Move to next exercise or finish workout
  } else {
    // Start rest period
    setDescansoAtivo(true)
    setTempoDescanso(exercicio.descanso)
  }
}
```

**Why this matters**: Shows how to build multi-step flows with timers in brutalist style (no smooth progress bars - just countdown numbers).

### 2. PersonalDashboard.tsx - Data Aggregation Pattern
Located at `src/pages/Personal/Dashboard.tsx`:

**Features**:
- Loads data from multiple mock sources (`alunos`, `treinos`)
- Computes stats (active students, active workouts, workouts today)
- Renders dashboard with stat cards + lists

**Key pattern**:
```tsx
const [alunos, setAlunos] = useState<Aluno[]>([])
const [treinos, setTreinos] = useState<Treino[]>([])

useEffect(() => {
  if (user?.id) {
    const personalAlunos = getAlunosByPersonal(user.id)
    const personalTreinos = getTreinosByPersonal(user.id)
    setAlunos(personalAlunos)
    setTreinos(personalTreinos)
  }
}, [user])

// Derived stats (no separate useState)
const alunosAtivos = alunos.length
const treinosAtivos = treinos.filter(t => t.ativo).length
const treinosHoje = treinos.filter(t => {
  const hoje = new Date().toISOString().split('T')[0]
  return t.dataAtribuicao?.startsWith(hoje || '')
}).length
```

**Why this matters**: Shows proper separation of data fetching (service layer) from computation (component). No business logic in mockService - just filtering.

### 3. Button.tsx - Brutalist Component Template
Located at `src/components/common/Button.tsx`:

**Complete implementation** (use as reference for new components):
```tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({ ... }: ButtonProps) {
  const variantClasses = {
    primary: 'border-brutal-black bg-brutal-white hover:bg-brutal-black hover:text-brutal-white',
    success: 'border-brutal-green bg-brutal-white hover:bg-brutal-green',
    // etc.
  }
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: 'linear' }} // ← Always linear
      className={`border-brutal-thick font-brutal uppercase ${variantClasses[variant]}`}
    >
      {children}
    </motion.button>
  )
}
```

**Why this matters**: Every component should follow this pattern - typed props, variant system, brutalist styling, linear animations.

## Common Patterns

### Protected Route with Role Check
```tsx
// App.tsx - Nested route structure with protection
<Route element={<ProtectedRoute allowedRoles={['personal']} />}>
  <Route path="/personal" element={<PersonalDashboard />} />
  <Route path="/personal/*" element={<PersonalDashboard />} /> {/* Catch-all for sub-routes */}
</Route>
```
**How it works**: `ProtectedRoute` checks `useAuthStore().user` and `userType` → renders `<Outlet />` if authorized, else `<Navigate to="/" />`

### Framer Motion Brutalist Animation
```tsx
// From Button.tsx - reference implementation
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: 'linear' }} // Always linear
>
  AÇÃO
</motion.button>

// From Login.tsx - staggered entrance
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.3, delay: 0.1, ease: 'linear' }}
>
  <Button>PERSONAL TRAINER</Button>
</motion.div>
```
**Don't**: Use `ease: 'easeInOut'`, spring animations, or smooth cubic-bezier curves.

### Form Validation Pattern (Not Yet Implemented)
React Hook Form + Zod is installed but not actively used. When implementing forms:
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Email inválido'),
  nome: z.string().min(3, 'Mínimo 3 caracteres'),
})

function FormExample() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="EMAIL"
        {...register('email')}
        error={errors.email?.message}
      />
    </form>
  )
}
```

### Conditional Rendering with Loading States
```tsx
// From PersonalDashboard.tsx
const [loading, setLoading] = useState(true)

useEffect(() => {
  if (user?.id) {
    const data = getDataFromMockService(user.id)
    setData(data)
    setLoading(false) // Only set after data is ready
  }
}, [user])

if (loading) {
  return (
    <div className="min-h-screen bg-brutal-white flex items-center justify-center">
      <p className="text-2xl font-brutal">CARREGANDO...</p>
    </div>
  )
}

// Render actual content
```
**Why**: Prevents rendering with empty data. Use simple text loading (no spinners - not brutalist).

### Timer/Interval Pattern with Cleanup
```tsx
// From ExecucaoTreino.tsx - proper cleanup to avoid memory leaks
useEffect(() => {
  let interval: NodeJS.Timeout | null = null
  
  if (descansoAtivo && tempoDescanso > 0) {
    interval = setInterval(() => {
      setTempoDescanso((prev) => {
        if (prev <= 1) {
          setDescansoAtivo(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }
  
  return () => {
    if (interval) clearInterval(interval) // ← Critical: cleanup on unmount
  }
}, [descansoAtivo, tempoDescanso])
```

### Navigation Patterns
```tsx
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

// Navigate to dynamic route
<Button onClick={() => navigate(`/aluno/treino/${treino.id}`)}>
  INICIAR TREINO
</Button>

// Navigate back
<button onClick={() => navigate('/aluno')}>
  <ArrowLeft size={24} />
</button>

// Navigate with state reset (from authStore)
const logout = () => {
  useAuthStore.getState().logout() // Clears user
  navigate('/')
}
```

## Phase 2 Migration Notes (Future)
When Supabase is integrated:
- Replace `mockService.ts` functions with Supabase queries
- Keep same function signatures for minimal component changes
- Use Supabase Auth to replace `authStore.ts` mock login
- Enable real-time features for chat (`mockdata/mensagens.ts` → Supabase Realtime)

## Conventions

- **File naming**: PascalCase for components (`Button.tsx`), camelCase for utilities
- **TypeScript**: No `any` types - use `unknown` and type guards when necessary
- **Imports**: Absolute paths via barrel files (`'../components/common'` not `'../components/common/Button'`)
- **Linting**: ESLint strict mode - fix all warnings before committing
- **Git**: No specific branching strategy documented (check with team)

## Critical Don'ts
1. Don't add CSS files - Tailwind only
2. Don't create manual service workers - use vite-plugin-pwa
3. Don't use soft design patterns (shadows, gradients, rounded corners >4px)
4. Don't hardcode data - always use mockService
5. Don't use GitHub Actions for deploy - Vercel CLI only

## Questions to Clarify
- Testing strategy? (No test files found - unit/e2e approach?)
- Offline sync strategy for Phase 2? (IndexedDB mentioned but not implemented)
- i18n requirements? (Currently hardcoded PT-BR strings)
- Error boundary implementation status?
