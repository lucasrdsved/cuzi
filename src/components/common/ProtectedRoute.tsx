import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { UserType } from '../../types'

/**
 * Props for the ProtectedRoute component.
 */
interface ProtectedRouteProps {
  /** Array of user roles allowed to access this route. If undefined, any authenticated user is allowed. */
  allowedRoles?: UserType[]
  /** The path to redirect to if access is denied. Defaults to '/'. */
  redirectPath?: string
}

/**
 * A wrapper component that enforces authentication and role-based access control.
 * Redirects unauthenticated or unauthorized users to a specified path.
 *
 * @param props - The properties for the protected route.
 * @returns An Outlet rendering the child routes if access is granted, or a Navigate component for redirection.
 */
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
