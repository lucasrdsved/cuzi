import { Aluno } from '../types'

export const mockAlunos: Aluno[] = [
  {
    id: 'aluno-1',
    personalId: 'personal-1',
    name: 'João Santos',
    email: 'joao@aluno.com',
    phone: '(11) 99999-9999',
    objetivo: 'Ganho de massa muscular',
    restricoes: 'Problema no joelho esquerdo',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'aluno-2',
    personalId: 'personal-1',
    name: 'Maria Oliveira',
    email: 'maria@aluno.com',
    phone: '(11) 88888-8888',
    objetivo: 'Perda de peso',
    restricoes: 'Nenhuma',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'aluno-3',
    personalId: 'personal-1',
    name: 'Pedro Costa',
    email: 'pedro@aluno.com',
    phone: '(11) 77777-7777',
    objetivo: 'Melhoria da resistência',
    restricoes: 'Asma',
    createdAt: '2024-02-01T10:00:00Z',
  },
]

