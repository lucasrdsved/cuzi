/**
 * Defines the type of user in the system.
 * Can be either 'personal' (Personal Trainer) or 'aluno' (Student).
 */
export type UserType = 'personal' | 'aluno'

/**
 * Represents a generic user in the system.
 * This is the base interface for authentication and general user identification.
 */
export interface User {
  /** Unique identifier for the user. */
  id: string
  /** Full name of the user. */
  name: string
  /** Email address of the user. */
  email: string
  /** The role of the user (personal trainer or student). */
  type: UserType
  /** Optional URL to the user's avatar image. */
  avatar?: string
}

/**
 * Represents a student (Aluno) profile.
 * Contains specific details related to a student managed by a personal trainer.
 */
export interface Aluno {
  /** Unique identifier for the student. */
  id: string
  /** The ID of the personal trainer who manages this student. */
  personalId: string
  /** Full name of the student. */
  name: string
  /** Email address of the student. */
  email: string
  /** Optional phone number of the student. */
  phone?: string
  /** Optional URL to the student's avatar image. */
  avatar?: string
  /** The main fitness goal of the student (e.g., "Hypertrophy", "Weight loss"). */
  objetivo?: string
  /** Any physical restrictions or injuries the student has. */
  restricoes?: string
  /** ISO date string representing when the student record was created. */
  createdAt: string
}

/**
 * Represents an exercise available in the system.
 * Defines the static properties of an exercise (name, muscle group, media).
 */
export interface Exercicio {
  /** Unique identifier for the exercise. */
  id: string
  /** Name of the exercise. */
  nome: string
  /** Target muscle group (e.g., "Chest", "Legs"). */
  grupoMuscular: string
  /** Optional description or instructions for the exercise. */
  descricao?: string
  /** Optional URL to a demonstration video. */
  videoUrl?: string
  /** Optional URL to an image of the exercise. */
  imagemUrl?: string
  /** Difficulty level of the exercise. */
  dificuldade: 'iniciante' | 'intermediario' | 'avancado'
}

/**
 * Represents an exercise within a specific workout routine (Treino).
 * Includes the prescription details like sets, reps, and load.
 */
export interface TreinoExercicio {
  /** Unique identifier for this specific workout exercise instance. */
  id: string
  /** The ID of the base exercise definition. */
  exercicioId: string
  /** The full exercise object containing details like name and muscle group. */
  exercicio: Exercicio
  /** Number of sets to perform. */
  series: number
  /** Number of repetitions per set. */
  repeticoes: number
  /** Optional prescribed load/weight in kg. */
  carga?: number
  /** Rest interval between sets in seconds. */
  descanso: number // em segundos
  /** Optional specific observations or instructions for this exercise in this workout. */
  observacoes?: string
  /** The order of execution in the workout routine. */
  ordem: number
}

/**
 * Represents a workout routine (Treino) assigned to a student.
 * Contains a collection of exercises and metadata.
 */
export interface Treino {
  /** Unique identifier for the workout. */
  id: string
  /** The ID of the personal trainer who created the workout. */
  personalId: string
  /** The ID of the student this workout is assigned to. */
  alunoId: string
  /** Name of the workout (e.g., "Treino A - Peito e Tríceps"). */
  nome: string
  /** Optional description or notes about the workout. */
  descricao?: string
  /** List of exercises included in this workout. */
  exercicios: TreinoExercicio[]
  /** ISO date string when the workout was created. */
  dataCriacao: string
  /** Optional ISO date string when the workout was assigned to the student. */
  dataAtribuicao?: string
  /** Indicates if the workout is currently active for the student. */
  ativo: boolean
}

/**
 * Represents the record of a completed workout execution.
 * Stores data about when and how a workout was performed.
 */
export interface ExecucaoTreino {
  /** Unique identifier for the execution record. */
  id: string
  /** The ID of the workout routine that was executed. */
  treinoId: string
  /** The ID of the student who performed the workout. */
  alunoId: string
  /** ISO date string when the workout was executed. */
  dataExecucao: string
  /** List of details for each exercise performed during the session. */
  exerciciosExecutados: ExecucaoExercicio[]
  /** Optional user feedback on the workout intensity/difficulty. */
  feedback?: 'facil' | 'medio' | 'dificil'
  /** Optional general observations about the session. */
  observacoes?: string
  /** Optional total duration of the workout in minutes. */
  duracaoTotal?: number // em minutos
}

/**
 * Represents the details of a specific exercise performed during a workout execution.
 */
export interface ExecucaoExercicio {
  /** The ID of the exercise performed. */
  exercicioId: string
  /** Number of sets actually completed. */
  seriesCompletas: number
  /** Optional load used during execution (if different from prescribed). */
  cargaUsada?: number
  /** Optional observations about this specific exercise execution. */
  observacoes?: string
}

/**
 * Represents a chat message between users.
 */
export interface Mensagem {
  /** Unique identifier for the message. */
  id: string
  /** The ID of the user sending the message. */
  remetenteId: string
  /** The ID of the user receiving the message. */
  destinatarioId: string
  /** The content of the message. */
  conteudo: string
  /** The type of content contained in the message. */
  tipo: 'texto' | 'imagem' | 'video'
  /** ISO date string when the message was sent. */
  dataEnvio: string
  /** Indicates if the message has been read by the recipient. */
  lida: boolean
}

/**
 * Represents body measurements for a student to track progress.
 */
export interface Medida {
  /** Unique identifier for the measurement record. */
  id: string
  /** The ID of the student. */
  alunoId: string
  /** ISO date string when the measurements were taken. */
  data: string
  /** Weight in kg. */
  peso?: number
  /** Height in cm (or meters, depending on convention). */
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
  /** Optional observations or notes about the measurements. */
  observacoes?: string
}
