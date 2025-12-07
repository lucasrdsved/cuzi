import { Exercicio } from '../types'

/**
 * Mock data for exercises.
 * Contains a comprehensive list of exercises categorized by muscle group.
 */
export const mockExercicios: Exercicio[] = [
  // Pernas
  {
    id: 'ex-1',
    nome: 'Agachamento',
    grupoMuscular: 'Pernas',
    descricao: 'Exercício para fortalecer quadríceps, glúteos e posterior de coxa',
    dificuldade: 'iniciante',
  },
  {
    id: 'ex-5',
    nome: 'Leg Press',
    grupoMuscular: 'Pernas',
    descricao: 'Exercício para fortalecimento das pernas',
    dificuldade: 'iniciante',
  },
  {
    id: 'ex-9',
    nome: 'Stiff',
    grupoMuscular: 'Pernas',
    descricao: 'Exercício para posterior de coxa e glúteos',
    dificuldade: 'intermediario',
  },
  {
    id: 'ex-10',
    nome: 'Extensão de Pernas',
    grupoMuscular: 'Pernas',
    descricao: 'Isolamento do quadríceps',
    dificuldade: 'iniciante',
  },
  
  // Peito
  {
    id: 'ex-2',
    nome: 'Supino Reto',
    grupoMuscular: 'Peito',
    descricao: 'Exercício para desenvolvimento do peitoral maior',
    dificuldade: 'intermediario',
  },
  {
    id: 'ex-11',
    nome: 'Supino Inclinado',
    grupoMuscular: 'Peito',
    descricao: 'Foco na parte superior do peitoral',
    dificuldade: 'intermediario',
  },
  {
    id: 'ex-12',
    nome: 'Crucifixo',
    grupoMuscular: 'Peito',
    descricao: 'Isolamento do peitoral',
    dificuldade: 'avancado',
  },
  
  // Costas
  {
    id: 'ex-3',
    nome: 'Remada Curvada',
    grupoMuscular: 'Costas',
    descricao: 'Exercício para desenvolvimento dos músculos das costas',
    dificuldade: 'intermediario',
  },
  {
    id: 'ex-13',
    nome: 'Puxada Frontal',
    grupoMuscular: 'Costas',
    descricao: 'Exercício para latíssimo do dorso',
    dificuldade: 'intermediario',
  },
  {
    id: 'ex-14',
    nome: 'Pulley Baixo',
    grupoMuscular: 'Costas',
    descricao: 'Remada no pulley baixo',
    dificuldade: 'intermediario',
  },
  
  // Ombros
  {
    id: 'ex-4',
    nome: 'Desenvolvimento com Halteres',
    grupoMuscular: 'Ombros',
    descricao: 'Exercício para desenvolvimento dos deltoides',
    dificuldade: 'avancado',
  },
  {
    id: 'ex-15',
    nome: 'Elevação Lateral',
    grupoMuscular: 'Ombros',
    descricao: 'Isolamento do deltoide lateral',
    dificuldade: 'iniciante',
  },
  {
    id: 'ex-16',
    nome: 'Elevação Frontal',
    grupoMuscular: 'Ombros',
    descricao: 'Isolamento do deltoide anterior',
    dificuldade: 'iniciante',
  },
  
  // Braços
  {
    id: 'ex-6',
    nome: 'Rosca Direta',
    grupoMuscular: 'Bíceps',
    descricao: 'Exercício para desenvolvimento dos bíceps',
    dificuldade: 'iniciante',
  },
  {
    id: 'ex-7',
    nome: 'Tríceps Pulley',
    grupoMuscular: 'Tríceps',
    descricao: 'Exercício para desenvolvimento dos tríceps',
    dificuldade: 'intermediario',
  },
  {
    id: 'ex-17',
    nome: 'Rosca Martelo',
    grupoMuscular: 'Bíceps',
    descricao: 'Variação da rosca para bíceps',
    dificuldade: 'iniciante',
  },
  {
    id: 'ex-18',
    nome: 'Tríceps Testa',
    grupoMuscular: 'Tríceps',
    descricao: 'Exercício deitado para tríceps',
    dificuldade: 'intermediario',
  },
  
  // Abdômen
  {
    id: 'ex-8',
    nome: 'Abdominal Crunch',
    grupoMuscular: 'Abdômen',
    descricao: 'Exercício para fortalecimento do abdômen',
    dificuldade: 'iniciante',
  },
  {
    id: 'ex-19',
    nome: 'Prancha',
    grupoMuscular: 'Abdômen',
    descricao: 'Exercício isométrico para core',
    dificuldade: 'iniciante',
  },
  {
    id: 'ex-20',
    nome: 'Abdominal Bicicleta',
    grupoMuscular: 'Abdômen',
    descricao: 'Exercício para oblíquos',
    dificuldade: 'intermediario',
  },
]
