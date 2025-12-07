import { Aluno, Treino, Exercicio, ExecucaoTreino, Mensagem } from '../types'
import { mockAlunos } from '../mockdata/alunos'
import { mockTreinos } from '../mockdata/treinos'
import { mockExercicios } from '../mockdata/exercicios'
import { mockExecucoes } from '../mockdata/execucoes'
import { mockMensagens } from '../mockdata/mensagens'

// Alunos
export const getAlunosByPersonal = (personalId: string): Aluno[] => {
  return mockAlunos.filter((aluno) => aluno.personalId === personalId)
}

export const getAlunoById = (id: string): Aluno | undefined => {
  return mockAlunos.find((aluno) => aluno.id === id)
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
}

export const getExecucoesByTreino = (treinoId: string): ExecucaoTreino[] => {
  return mockExecucoes.filter((exec) => exec.treinoId === treinoId)
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
  )
}

export const getMensagensNaoLidas = (userId: string): Mensagem[] => {
  return mockMensagens.filter(
    (msg) => msg.destinatarioId === userId && !msg.lida
  )
}

