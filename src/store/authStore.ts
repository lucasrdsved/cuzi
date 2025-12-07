import { create } from 'zustand'
import { User, UserType } from '../types'

/**
 * Interface representing the authentication state of the application.
 */
interface AuthState {
  /** The currently authenticated user, or null if not logged in. */
  user: User | null
  /** The type of the currently authenticated user (personal or aluno), or null. */
  userType: UserType | null
  /**
   * Logs in a user with a specific user type.
   * This is a mock implementation that creates a fictitious user.
   * @param type - The type of user to simulate logging in as ('personal' or 'aluno').
   */
  login: (type: UserType) => void
  /**
   * Logs out the current user, clearing the user and userType state.
   */
  logout: () => void
}

/**
 * Zustand store hook for managing authentication state.
 * Provides access to the current user, user type, and functions to login and logout.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userType: null,
  login: (type: UserType) => {
    // Mock login - criar usuário fictício
    const mockUser: User = {
      id: type === 'personal' ? 'personal-1' : 'aluno-1',
      name: type === 'personal' ? 'Personal Trainer' : 'Aluno',
      email: type === 'personal' ? 'personal@example.com' : 'aluno@example.com',
      type,
    }
    set({ user: mockUser, userType: type })
  },
  logout: () => {
    set({ user: null, userType: null })
  },
}))
