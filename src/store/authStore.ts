import { create } from 'zustand'
import { User, UserType } from '../types'

/**
 * Interface defining the shape of the authentication store state.
 */
interface AuthState {
  /** The currently authenticated user, or null if not logged in. */
  user: User | null
  /** The type of the currently authenticated user (personal or student). */
  userType: UserType | null
  /**
   * Logs in a user based on the specified type.
   * Currently mocks the login process by creating a fake user.
   * @param type - The type of user to log in as ('personal' or 'aluno').
   */
  login: (type: UserType) => void
  /**
   * Logs out the current user and clears the state.
   */
  logout: () => void
}

/**
 * Zustand store for managing authentication state.
 * Handles user login simulation and logout.
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
