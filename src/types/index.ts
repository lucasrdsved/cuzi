export type UserType = 'personal' | 'aluno'

export interface User {
  id: string
  name: string
  email: string
  type: UserType
  avatar?: string
}

export interface Aluno {
  id: string
  personalId: string
  name: string
  email: string
  phone?: string
  avatar?: string
  objetivo?: string
  restricoes?: string
  createdAt: string
}

export interface Exercicio {
  id: string
  nome: string
  grupoMuscular: string
  descricao?: string
  videoUrl?: string
  imagemUrl?: string
  dificuldade: 'iniciante' | 'intermediario' | 'avancado'
}

export interface TreinoExercicio {
  id: string
  exercicioId: string
  exercicio: Exercicio
  series: number
  repeticoes: number
  carga?: number
  descanso: number // em segundos
  observacoes?: string
  ordem: number
}

export interface Treino {
  id: string
  personalId: string
  alunoId: string
  nome: string
  descricao?: string
  exercicios: TreinoExercicio[]
  dataCriacao: string
  dataAtribuicao?: string
  ativo: boolean
}

export interface ExecucaoTreino {
  id: string
  treinoId: string
  alunoId: string
  dataExecucao: string
  exerciciosExecutados: ExecucaoExercicio[]
  feedback?: 'facil' | 'medio' | 'dificil'
  observacoes?: string
  duracaoTotal?: number // em minutos
}

export interface ExecucaoExercicio {
  exercicioId: string
  seriesCompletas: number
  cargaUsada?: number
  observacoes?: string
}

export interface Mensagem {
  id: string
  remetenteId: string
  destinatarioId: string
  conteudo: string
  tipo: 'texto' | 'imagem' | 'video'
  dataEnvio: string
  lida: boolean
}

export interface Medida {
  id: string
  alunoId: string
  data: string
  peso?: number
  altura?: number
  braco?: number
  peito?: number
  cintura?: number
  quadril?: number
  coxa?: number
  observacoes?: string
}

