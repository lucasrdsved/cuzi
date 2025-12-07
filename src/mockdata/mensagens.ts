import { Mensagem } from '../types'

/**
 * Mock data for chat messages.
 * Simulates conversation history between users.
 */
export const mockMensagens: Mensagem[] = [
  {
    id: 'msg-1',
    remetenteId: 'aluno-1',
    destinatarioId: 'personal-1',
    conteudo: 'Olá! Como devo fazer o agachamento?',
    tipo: 'texto',
    dataEnvio: '2024-01-21T10:00:00Z',
    lida: true,
  },
  {
    id: 'msg-2',
    remetenteId: 'personal-1',
    destinatarioId: 'aluno-1',
    conteudo: 'Mantenha as costas retas e desça até formar 90 graus com os joelhos',
    tipo: 'texto',
    dataEnvio: '2024-01-21T10:05:00Z',
    lida: true,
  },
  {
    id: 'msg-3',
    remetenteId: 'aluno-1',
    destinatarioId: 'personal-1',
    conteudo: 'Obrigado! Consegui fazer hoje!',
    tipo: 'texto',
    dataEnvio: '2024-01-21T14:30:00Z',
    lida: false,
  },
]
