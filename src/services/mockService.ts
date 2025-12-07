import { Aluno, Treino, Exercicio, ExecucaoTreino, Mensagem } from '../types'
import { mockAlunos } from '../mockdata/alunos'
import { mockTreinos } from '../mockdata/treinos'
import { mockExercicios } from '../mockdata/exercicios'
import { mockExecucoes } from '../mockdata/execucoes'
import { mockMensagens } from '../mockdata/mensagens'

// Simulação de delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Alunos
export const getAlunosByPersonal = (personalId: string): Aluno[] => {
  return mockAlunos.filter((aluno) => aluno.personalId === personalId)
}

export const getAlunoById = (id: string): Aluno | undefined => {
  return mockAlunos.find((aluno) => aluno.id === id)
}

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
export const getTreinosByAluno = (alunoId: string): Treino[] => {
  return mockTreinos.filter((treino) => treino.alunoId === alunoId && treino.ativo)
}

export const getTreinoById = (id: string): Treino | undefined => {
  return mockTreinos.find((treino) => treino.id === id)
}

export const getTreinosByPersonal = (personalId: string): Treino[] => {
  return mockTreinos.filter((treino) => treino.personalId === personalId)
}

export const getTreinoDoHoje = (alunoId: string): Treino | null => {
  const treinosAtivos = getTreinosByAluno(alunoId)
  return treinosAtivos.sort((a, b) => 
    new Date(b.dataAtribuicao || '').getTime() - new Date(a.dataAtribuicao || '').getTime()
  )[0] || null
}

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
export const getAllExercicios = (): Exercicio[] => {
  return mockExercicios
}

export const getExercicioById = (id: string): Exercicio | undefined => {
  return mockExercicios.find((ex) => ex.id === id)
}

export const getExerciciosByGrupoMuscular = (grupo: string): Exercicio[] => {
  return mockExercicios.filter((ex) => ex.grupoMuscular === grupo)
}

// Execuções
export const getExecucoesByAluno = (alunoId: string): ExecucaoTreino[] => {
  return mockExecucoes.filter((exec) => exec.alunoId === alunoId)
    .sort((a, b) => new Date(b.dataExecucao).getTime() - new Date(a.dataExecucao).getTime())
}

export const getExecucoesByTreino = (treinoId: string): ExecucaoTreino[] => {
  return mockExecucoes.filter((exec) => exec.treinoId === treinoId)
}

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

export const getMensagensNaoLidas = (userId: string): Mensagem[] => {
  return mockMensagens.filter(
    (msg) => msg.destinatarioId === userId && !msg.lida
  )
}

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

