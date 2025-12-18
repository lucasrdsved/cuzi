import { Aluno, Treino, Exercicio, ExecucaoTreino, Mensagem } from '../types'
import { mockAlunos } from '../mockdata/alunos'
import { mockTreinos } from '../mockdata/treinos'
import { mockExercicios } from '../mockdata/exercicios'
import { mockExecucoes } from '../mockdata/execucoes'
import { mockMensagens } from '../mockdata/mensagens'

// Simulação de delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Alunos

/**
 * Retrieves a list of students associated with a specific personal trainer.
 * @param personalId - The ID of the personal trainer.
 * @returns An array of `Aluno` objects.
 */
export const getAlunosByPersonal = (personalId: string): Aluno[] => {
  return mockAlunos.filter((aluno) => aluno.personalId === personalId)
}

/**
 * Retrieves a student by their ID.
 * @param id - The ID of the student.
 * @returns The `Aluno` object if found, otherwise `undefined`.
 */
export const getAlunoById = (id: string): Aluno | undefined => {
  return mockAlunos.find((aluno) => aluno.id === id)
}

/**
 * Creates a new student record.
 * @param aluno - The student data (excluding `id` and `createdAt`).
 * @returns A promise that resolves to the newly created `Aluno` object.
 */
export const createAluno = async (aluno: Omit<Aluno, 'id' | 'createdAt'>): Promise<Aluno> => {
  await delay(300)
  const newAluno: Aluno = {
    ...aluno,
    id: `aluno-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  mockAlunos.push(newAluno)
  return newAluno
}

// Treinos

/**
 * Retrieves active workouts for a specific student.
 * @param alunoId - The ID of the student.
 * @returns An array of active `Treino` objects.
 */
export const getTreinosByAluno = (alunoId: string): Treino[] => {
  return mockTreinos.filter((treino) => treino.alunoId === alunoId && treino.ativo)
}

/**
 * Retrieves a workout by its ID.
 * @param id - The ID of the workout.
 * @returns The `Treino` object if found, otherwise `undefined`.
 */
export const getTreinoById = (id: string): Treino | undefined => {
  return mockTreinos.find((treino) => treino.id === id)
}

/**
 * Retrieves all workouts created by a specific personal trainer.
 * @param personalId - The ID of the personal trainer.
 * @returns An array of `Treino` objects.
 */
export const getTreinosByPersonal = (personalId: string): Treino[] => {
  return mockTreinos.filter((treino) => treino.personalId === personalId)
}

/**
 * Retrieves the most recently assigned workout for a student.
 * @param alunoId - The ID of the student.
 * @returns The latest `Treino` object, or `null` if no active workouts exist.
 */
export const getTreinoDoHoje = (alunoId: string): Treino | null => {
  const treinosAtivos = getTreinosByAluno(alunoId)
  return treinosAtivos.sort((a, b) => 
    new Date(b.dataAtribuicao || '').getTime() - new Date(a.dataAtribuicao || '').getTime()
  )[0] || null
}

/**
 * Creates a new workout routine.
 * @param treino - The workout data (excluding `id` and `dataCriacao`).
 * @returns A promise that resolves to the newly created `Treino` object.
 */
export const createTreino = async (treino: Omit<Treino, 'id' | 'dataCriacao'>): Promise<Treino> => {
  await delay(300)
  const newTreino: Treino = {
    ...treino,
    id: `treino-${Date.now()}`,
    dataCriacao: new Date().toISOString()
  }
  mockTreinos.push(newTreino)
  return newTreino
}

// Exercícios

/**
 * Retrieves all available exercises.
 * @returns An array of all `Exercicio` objects.
 */
export const getAllExercicios = (): Exercicio[] => {
  return mockExercicios
}

/**
 * Retrieves an exercise by its ID.
 * @param id - The ID of the exercise.
 * @returns The `Exercicio` object if found, otherwise `undefined`.
 */
export const getExercicioById = (id: string): Exercicio | undefined => {
  return mockExercicios.find((ex) => ex.id === id)
}

/**
 * Retrieves exercises belonging to a specific muscle group.
 * @param grupo - The muscle group to filter by.
 * @returns An array of `Exercicio` objects in the specified group.
 */
export const getExerciciosByGrupoMuscular = (grupo: string): Exercicio[] => {
  return mockExercicios.filter((ex) => ex.grupoMuscular === grupo)
}

// Execuções

/**
 * Retrieves workout execution records for a specific student, sorted by date (newest first).
 * @param alunoId - The ID of the student.
 * @returns An array of `ExecucaoTreino` objects.
 */
export const getExecucoesByAluno = (alunoId: string): ExecucaoTreino[] => {
  return mockExecucoes.filter((exec) => exec.alunoId === alunoId)
    .sort((a, b) => new Date(b.dataExecucao).getTime() - new Date(a.dataExecucao).getTime())
}

/**
 * Retrieves execution records for a specific workout routine.
 * @param treinoId - The ID of the workout routine.
 * @returns An array of `ExecucaoTreino` objects.
 */
export const getExecucoesByTreino = (treinoId: string): ExecucaoTreino[] => {
  return mockExecucoes.filter((exec) => exec.treinoId === treinoId)
}

/**
 * Creates a new workout execution record.
 * @param execucao - The execution data (excluding `id`).
 * @returns A promise that resolves to the newly created `ExecucaoTreino` object.
 */
export const createExecucaoTreino = async (execucao: Omit<ExecucaoTreino, 'id'>): Promise<ExecucaoTreino> => {
  await delay(300)
  const newExecucao: ExecucaoTreino = {
    ...execucao,
    id: `exec-${Date.now()}`
  }
  mockExecucoes.push(newExecucao)
  return newExecucao
}

// Mensagens

/**
 * Retrieves messages exchanged between two users, sorted chronologically.
 * @param userId1 - The ID of the first user.
 * @param userId2 - The ID of the second user.
 * @returns An array of `Mensagem` objects representing the conversation.
 */
export const getMensagensByUsers = (
  userId1: string,
  userId2: string
): Mensagem[] => {
  return mockMensagens.filter(
    (msg) =>
      (msg.remetenteId === userId1 && msg.destinatarioId === userId2) ||
      (msg.remetenteId === userId2 && msg.destinatarioId === userId1)
  ).sort((a, b) => new Date(a.dataEnvio).getTime() - new Date(b.dataEnvio).getTime())
}

/**
 * Retrieves unread messages for a specific user.
 * @param userId - The ID of the user.
 * @returns An array of unread `Mensagem` objects.
 */
export const getMensagensNaoLidas = (userId: string): Mensagem[] => {
  return mockMensagens.filter(
    (msg) => msg.destinatarioId === userId && !msg.lida
  )
}

/**
 * Sends a new message.
 * @param mensagem - The message data (excluding `id`, `dataEnvio`, and `lida` status).
 * @returns A promise that resolves to the newly created `Mensagem` object.
 */
export const sendMensagem = async (mensagem: Omit<Mensagem, 'id' | 'dataEnvio' | 'lida'>): Promise<Mensagem> => {
  await delay(200)
  const newMensagem: Mensagem = {
    ...mensagem,
    id: `msg-${Date.now()}`,
    dataEnvio: new Date().toISOString(),
    lida: false
  }
  mockMensagens.push(newMensagem)
  return newMensagem
}

// Estatísticas

/**
 * Calculates statistics for a student's performance.
 * @param alunoId - The ID of the student.
 * @returns An object containing statistics like total workouts, executions, last execution date, and average feedback.
 */
export const getEstatisticasAluno = (alunoId: string) => {
  const execucoes = getExecucoesByAluno(alunoId)
  const treinos = getTreinosByAluno(alunoId)
  
  return {
    totalTreinos: treinos.length,
    treinosExecutados: execucoes.length,
    ultimaExecucao: execucoes[0]?.dataExecucao || null,
    mediaFeedback: execucoes.length > 0 
      ? execucoes.filter(e => e.feedback).length / execucoes.length 
      : 0
  }
}

/**
 * Calculates statistics for a personal trainer's activity.
 * @param personalId - The ID of the personal trainer.
 * @returns An object containing statistics like total students, total workouts, active workouts, total executions, and executions today.
 */
export const getEstatisticasPersonal = (personalId: string) => {
  const alunos = getAlunosByPersonal(personalId)
  const treinos = getTreinosByPersonal(personalId)
  const execucoes = mockExecucoes.filter(e => 
    treinos.some(t => t.id === e.treinoId)
  )
  
  return {
    totalAlunos: alunos.length,
    totalTreinos: treinos.length,
    treinosAtivos: treinos.filter(t => t.ativo).length,
    totalExecucoes: execucoes.length,
    execucoesHoje: (() => {
      const today = new Date()
      return execucoes.filter(e => {
        const execDate = new Date(e.dataExecucao)
        return today.getDate() === execDate.getDate() &&
          today.getMonth() === execDate.getMonth() &&
          today.getFullYear() === execDate.getFullYear()
      }).length
    })()
  }
}
