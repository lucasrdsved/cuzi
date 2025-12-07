import { User } from '../types'

/**
 * Mock data for system users.
 * Contains sample user profiles for personal trainers and students.
 */
export const mockUsers: User[] = [
  {
    id: 'personal-1',
    name: 'Carlos Silva',
    email: 'carlos@personal.com',
    type: 'personal',
  },
  {
    id: 'aluno-1',
    name: 'João Santos',
    email: 'joao@aluno.com',
    type: 'aluno',
  },
  {
    id: 'aluno-2',
    name: 'Maria Oliveira',
    email: 'maria@aluno.com',
    type: 'aluno',
  },
]
