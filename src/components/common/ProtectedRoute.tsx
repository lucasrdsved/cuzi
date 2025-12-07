import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { UserType } from '../../types'

interface ProtectedRouteProps {
  allowedRoles?: UserType[]
  redirectPath?: string
}

export default function ProtectedRoute({
  allowedRoles,
  redirectPath = '/',
}: ProtectedRouteProps) {
  const { user, userType } = useAuthStore()

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  if (allowedRoles && userType && !allowedRoles.includes(userType)) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}
