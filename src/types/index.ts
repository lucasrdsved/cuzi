/**
 * Represents the type of user in the system.
 */
export type UserType = 'personal' | 'aluno'

/**
 * Represents a user in the system.
 */
export interface User {
  /** Unique identifier for the user. */
  id: string
  /** Full name of the user. */
  name: string
  /** Email address of the user. */
  email: string
  /** Type of the user (personal trainer or student). */
  type: UserType
  /** URL to the user's avatar image. */
  avatar?: string
}

/**
 * Represents a student (Aluno) profile.
 */
export interface Aluno {
  /** Unique identifier for the student. */
  id: string
  /** ID of the personal trainer associated with the student. */
  personalId: string
  /** Full name of the student. */
  name: string
  /** Email address of the student. */
  email: string
  /** Phone number of the student. */
  phone?: string
  /** URL to the student's avatar image. */
  avatar?: string
  /** The student's fitness goal. */
  objetivo?: string
  /** Any physical restrictions or injuries. */
  restricoes?: string
  /** Date when the student profile was created (ISO string). */
  createdAt: string
}

/**
 * Represents a fitness exercise.
 */
export interface Exercicio {
  /** Unique identifier for the exercise. */
  id: string
  /** Name of the exercise. */
  nome: string
  /** Target muscle group. */
  grupoMuscular: string
  /** Detailed description of the exercise. */
  descricao?: string
  /** URL to a video demonstration of the exercise. */
  videoUrl?: string
  /** URL to an image of the exercise. */
  imagemUrl?: string
  /** Difficulty level of the exercise. */
  dificuldade: 'iniciante' | 'intermediario' | 'avancado'
}

/**
 * Represents an exercise within a specific workout routine.
 */
export interface TreinoExercicio {
  /** Unique identifier for this workout exercise entry. */
  id: string
  /** ID of the base exercise. */
  exercicioId: string
  /** The full exercise object details. */
  exercicio: Exercicio
  /** Number of sets to perform. */
  series: number
  /** Number of repetitions per set. */
  repeticoes: number
  /** Weight load in kg. */
  carga?: number
  /** Rest time between sets in seconds. */
  descanso: number // em segundos
  /** Specific observations or instructions for this exercise in the workout. */
  observacoes?: string
  /** Order of the exercise in the workout routine. */
  ordem: number
}

/**
 * Represents a workout routine (Treino).
 */
export interface Treino {
  /** Unique identifier for the workout. */
  id: string
  /** ID of the personal trainer who created the workout. */
  personalId: string
  /** ID of the student assigned to this workout. */
  alunoId: string
  /** Name of the workout. */
  nome: string
  /** Description of the workout. */
  descricao?: string
  /** List of exercises included in the workout. */
  exercicios: TreinoExercicio[]
  /** Date when the workout was created (ISO string). */
  dataCriacao: string
  /** Date when the workout was assigned to the student (ISO string). */
  dataAtribuicao?: string
  /** Whether the workout is currently active. */
  ativo: boolean
}

/**
 * Represents a completed workout session (Execution).
 */
export interface ExecucaoTreino {
  /** Unique identifier for the execution record. */
  id: string
  /** ID of the workout that was executed. */
  treinoId: string
  /** ID of the student who performed the workout. */
  alunoId: string
  /** Date and time when the workout was executed (ISO string). */
  dataExecucao: string
  /** List of exercises performed during the session. */
  exerciciosExecutados: ExecucaoExercicio[]
  /** Student's feedback on the workout difficulty. */
  feedback?: 'facil' | 'medio' | 'dificil'
  /** General observations or comments from the student. */
  observacoes?: string
  /** Total duration of the workout in minutes. */
  duracaoTotal?: number // em minutos
}

/**
 * Represents the execution details of a specific exercise within a workout session.
 */
export interface ExecucaoExercicio {
  /** ID of the exercise performed. */
  exercicioId: string
  /** Number of sets successfully completed. */
  seriesCompletas: number
  /** Weight load used during the exercise. */
  cargaUsada?: number
  /** Observations specific to this exercise execution. */
  observacoes?: string
}

/**
 * Represents a message in the chat system.
 */
export interface Mensagem {
  /** Unique identifier for the message. */
  id: string
  /** ID of the user sending the message. */
  remetenteId: string
  /** ID of the user receiving the message. */
  destinatarioId: string
  /** Content of the message. */
  conteudo: string
  /** Type of the message content. */
  tipo: 'texto' | 'imagem' | 'video'
  /** Date and time when the message was sent (ISO string). */
  dataEnvio: string
  /** Whether the message has been read by the recipient. */
  lida: boolean
}

/**
 * Represents physical measurements of a student.
 */
export interface Medida {
  /** Unique identifier for the measurement record. */
  id: string
  /** ID of the student. */
  alunoId: string
  /** Date of the measurement (ISO string). */
  data: string
  /** Weight in kg. */
  peso?: number
  /** Height in cm. */
  altura?: number
  /** Arm circumference in cm. */
  braco?: number
  /** Chest circumference in cm. */
  peito?: number
  /** Waist circumference in cm. */
  cintura?: number
  /** Hip circumference in cm. */
  quadril?: number
  /** Thigh circumference in cm. */
  coxa?: number
  /** Observations regarding the measurements. */
  observacoes?: string
}
