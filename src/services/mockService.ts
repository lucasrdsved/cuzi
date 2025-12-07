import { Aluno, Treino, Exercicio, ExecucaoTreino, Mensagem } from '../types'
import { mockAlunos } from '../mockdata/alunos'
import { mockTreinos } from '../mockdata/treinos'
import { mockExercicios } from '../mockdata/exercicios'
import { mockExecucoes } from '../mockdata/execucoes'
import { mockMensagens } from '../mockdata/mensagens'

// Simulação de delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Retrieves all students associated with a specific personal trainer.
 * @param personalId - The unique identifier of the personal trainer.
 * @returns An array of students (Aluno objects) managed by the trainer.
 */
export const getAlunosByPersonal = (personalId: string): Aluno[] => {
  return mockAlunos.filter((aluno) => aluno.personalId === personalId)
}

/**
 * Retrieves a single student by their ID.
 * @param id - The unique identifier of the student.
 * @returns The student object if found, or undefined if not found.
 */
export const getAlunoById = (id: string): Aluno | undefined => {
  return mockAlunos.find((aluno) => aluno.id === id)
}

/**
 * Creates a new student record.
 * Simulates an API call with a delay.
 * @param aluno - The student data to create, excluding 'id' and 'createdAt'.
 * @returns A promise that resolves to the newly created student object.
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

/**
 * Retrieves all active workouts assigned to a specific student.
 * @param alunoId - The unique identifier of the student.
 * @returns An array of active workouts (Treino objects).
 */
export const getTreinosByAluno = (alunoId: string): Treino[] => {
  return mockTreinos.filter((treino) => treino.alunoId === alunoId && treino.ativo)
}

/**
 * Retrieves a single workout by its ID.
 * @param id - The unique identifier of the workout.
 * @returns The workout object if found, or undefined if not found.
 */
export const getTreinoById = (id: string): Treino | undefined => {
  return mockTreinos.find((treino) => treino.id === id)
}

/**
 * Retrieves all workouts created by a specific personal trainer.
 * @param personalId - The unique identifier of the personal trainer.
 * @returns An array of workouts created by the trainer.
 */
export const getTreinosByPersonal = (personalId: string): Treino[] => {
  return mockTreinos.filter((treino) => treino.personalId === personalId)
}

/**
 * Retrieves the most relevant workout for the student to perform today.
 * Currently selects the most recently assigned active workout.
 * @param alunoId - The unique identifier of the student.
 * @returns The recommended workout for today, or null if no active workouts exist.
 */
export const getTreinoDoHoje = (alunoId: string): Treino | null => {
  const treinosAtivos = getTreinosByAluno(alunoId)
  return treinosAtivos.sort((a, b) => 
    new Date(b.dataAtribuicao || '').getTime() - new Date(a.dataAtribuicao || '').getTime()
  )[0] || null
}

/**
 * Creates a new workout routine.
 * Simulates an API call with a delay.
 * @param treino - The workout data to create, excluding 'id' and 'dataCriacao'.
 * @returns A promise that resolves to the newly created workout object.
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

/**
 * Retrieves a list of all available exercises in the system.
 * @returns An array of all Exercicio objects.
 */
export const getAllExercicios = (): Exercicio[] => {
  return mockExercicios
}

/**
 * Retrieves a specific exercise by its ID.
 * @param id - The unique identifier of the exercise.
 * @returns The exercise object if found, or undefined if not found.
 */
export const getExercicioById = (id: string): Exercicio | undefined => {
  return mockExercicios.find((ex) => ex.id === id)
}

/**
 * Retrieves all exercises belonging to a specific muscle group.
 * @param grupo - The muscle group name (e.g., "Peito", "Costas").
 * @returns An array of exercises for that muscle group.
 */
export const getExerciciosByGrupoMuscular = (grupo: string): Exercicio[] => {
  return mockExercicios.filter((ex) => ex.grupoMuscular === grupo)
}

/**
 * Retrieves all workout executions performed by a student.
 * @param alunoId - The unique identifier of the student.
 * @returns An array of execution records, sorted by date (newest first).
 */
export const getExecucoesByAluno = (alunoId: string): ExecucaoTreino[] => {
  return mockExecucoes.filter((exec) => exec.alunoId === alunoId)
    .sort((a, b) => new Date(b.dataExecucao).getTime() - new Date(a.dataExecucao).getTime())
}

/**
 * Retrieves all executions of a specific workout routine.
 * @param treinoId - The unique identifier of the workout.
 * @returns An array of execution records for that workout.
 */
export const getExecucoesByTreino = (treinoId: string): ExecucaoTreino[] => {
  return mockExecucoes.filter((exec) => exec.treinoId === treinoId)
}

/**
 * Records a new workout execution.
 * Simulates an API call with a delay.
 * @param execucao - The execution data to record, excluding 'id'.
 * @returns A promise that resolves to the newly created execution record.
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

/**
 * Retrieves the chat history between two users.
 * @param userId1 - The ID of the first user.
 * @param userId2 - The ID of the second user.
 * @returns An array of messages between the two users, sorted chronologically.
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
 * Retrieves all unread messages for a specific user.
 * @param userId - The ID of the user (recipient).
 * @returns An array of unread messages.
 */
export const getMensagensNaoLidas = (userId: string): Mensagem[] => {
  return mockMensagens.filter(
    (msg) => msg.destinatarioId === userId && !msg.lida
  )
}

/**
 * Sends a new message from one user to another.
 * Simulates an API call with a delay.
 * @param mensagem - The message data to send, excluding 'id', 'dataEnvio', and 'lida'.
 * @returns A promise that resolves to the sent message.
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

/**
 * Computes general statistics for a student.
 * @param alunoId - The unique identifier of the student.
 * @returns An object containing stats like total workouts, executions, and last activity.
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
 * Computes general statistics for a personal trainer.
 * @param personalId - The unique identifier of the personal trainer.
 * @returns An object containing stats like total students, active workouts, and today's activity.
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
    execucoesHoje: execucoes.filter(e => 
      e.dataExecucao.startsWith(new Date().toISOString().split('T')[0]!)
    ).length
  }
}
