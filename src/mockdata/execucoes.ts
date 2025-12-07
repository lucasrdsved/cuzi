import { ExecucaoTreino } from '../types'

/**
 * Mock data for workout executions.
 * Represents records of completed workouts by students.
 */
export const mockExecucoes: ExecucaoTreino[] = [
  {
    id: 'exec-1',
    treinoId: 'treino-1',
    alunoId: 'aluno-1',
    dataExecucao: '2024-01-21T14:00:00Z',
    exerciciosExecutados: [
      {
        exercicioId: 'ex-2',
        seriesCompletas: 4,
        cargaUsada: 60,
        observacoes: 'Bom desempenho',
      },
      {
        exercicioId: 'ex-7',
        seriesCompletas: 3,
        cargaUsada: 25,
      },
    ],
    feedback: 'medio',
    duracaoTotal: 45,
  },
  {
    id: 'exec-2',
    treinoId: 'treino-2',
    alunoId: 'aluno-1',
    dataExecucao: '2024-01-23T16:00:00Z',
    exerciciosExecutados: [
      {
        exercicioId: 'ex-1',
        seriesCompletas: 4,
        cargaUsada: 0,
      },
      {
        exercicioId: 'ex-5',
        seriesCompletas: 3,
        cargaUsada: 100,
      },
    ],
    feedback: 'facil',
    duracaoTotal: 40,
  },
]
