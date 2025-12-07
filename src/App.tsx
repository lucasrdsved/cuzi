import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedRoute } from './components/common'
import Loading from './components/common/Loading'

const Login = lazy(() => import('./pages/Login'))
const PersonalDashboard = lazy(() => import('./pages/Personal/Dashboard'))
const AlunoHome = lazy(() => import('./pages/Aluno/Home'))
const ExecucaoTreino = lazy(() => import('./pages/Aluno/ExecucaoTreino'))
const Offline = lazy(() => import('./pages/Offline'))

/**
 * The main application component.
 * Sets up routing, code splitting with lazy loading, and authentication protection.
 *
 * @returns The main App component with Routing.
 */
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/offline" element={<Offline />} />
          
          {/* Personal Routes */}
          <Route element={<ProtectedRoute allowedRoles={['personal']} />}>
            <Route path="/personal" element={<PersonalDashboard />} />
            <Route path="/personal/*" element={<PersonalDashboard />} />
          </Route>

          {/* Aluno Routes */}
          <Route element={<ProtectedRoute allowedRoles={['aluno']} />}>
            <Route path="/aluno" element={<AlunoHome />} />
            <Route path="/aluno/treino/:id" element={<ExecucaoTreino />} />
            <Route path="/aluno/*" element={<AlunoHome />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
