import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { UserType } from '../../types'

/**
 * Props for the ProtectedRoute component.
 */
interface ProtectedRouteProps {
  /** Array of user roles allowed to access this route. If undefined, any authenticated user can access. */
  allowedRoles?: UserType[]
  /** The path to redirect to if access is denied. Defaults to '/'. */
  redirectPath?: string
}

/**
 * A wrapper component for routes that require authentication and specific roles.
 * Checks the current user's authentication status and role against the allowed roles.
 * Redirects to the login page (or specified path) if access is denied.
 *
 * @param props - The properties for the protected route.
 * @returns The nested routes (Outlet) if authorized, otherwise a Navigate component.
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
