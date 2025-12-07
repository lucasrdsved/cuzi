import { create } from 'zustand'
import { User, UserType } from '../types'

interface AuthState {
  user: User | null
  userType: UserType | null
  login: (type: UserType) => void
  logout: () => void
}

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

