import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getEstatisticasPersonal, createAluno, createTreino } from './mockService'
import { mockExecucoes } from '../mockdata/execucoes'
import { mockTreinos } from '../mockdata/treinos'
import { mockAlunos } from '../mockdata/alunos'

describe('getEstatisticasPersonal', () => {
  beforeEach(() => {
    // Clear mocks
    mockExecucoes.length = 0
    mockTreinos.length = 0
    mockAlunos.length = 0

    // Reset timers
    vi.useRealTimers()
    // Set Timezone to Sao Paulo to reproduce the issue
    vi.stubEnv('TZ', 'America/Sao_Paulo')
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
  })

  it('should count executions from today correctly when local day != UTC day', async () => {
    // Scenario:
    // Timezone: America/Sao_Paulo (UTC-3)
    // Current Local Time: 2024-01-01 22:00:00
    // UTC Time: 2024-01-02 01:00:00
    // Execution Local Time: 2024-01-01 10:00:00
    // Execution UTC Time: 2024-01-01 13:00:00

    // We mock the Date to return 2024-01-02T01:00:00Z when new Date() is called
    // which corresponds to Jan 1st 22:00 in Sao Paulo
    const mockNow = new Date('2024-01-02T01:00:00Z')
    vi.setSystemTime(mockNow)

    const personalId = 'p-test'

    // Create Aluno
    await createAluno({
      name: 'Test Aluno',
      email: 'test@aluno.com',
      personalId: personalId,
      objetivo: 'Test',
      restricoes: 'None'
    })
    const aluno = mockAlunos[0]

    // Create Treino
    await createTreino({
      personalId: personalId,
      alunoId: aluno.id,
      nome: 'Treino Test',
      exercicios: [],
      ativo: true
    })
    const treino = mockTreinos[0]

    // Create Execution earlier that day (Local)
    // 10:00 Local -> 13:00 UTC
    const execucaoDate = '2024-01-01T13:00:00Z'

    mockExecucoes.push({
      id: 'exec-test-1',
      treinoId: treino.id,
      alunoId: aluno.id,
      dataExecucao: execucaoDate,
      exerciciosExecutados: []
    })

    const stats = getEstatisticasPersonal(personalId)

    expect(stats.execucoesHoje).toBe(1)
  })
})
