import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button } from '../../components/common'
import { getTreinoById } from '../../services/mockService'
import { Treino, ExecucaoExercicio } from '../../types'
import { Check, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * The Workout Execution page component.
 * Guides the student through a workout session, tracking sets, rest times, and progress.
 *
 * @returns The rendered Workout Execution page.
 */
export default function ExecucaoTreino() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [treino, setTreino] = useState<Treino | null>(null)
  const [exercicioAtual, setExercicioAtual] = useState(0)
  const [serieAtual, setSerieAtual] = useState(1)
  const [descansoAtivo, setDescansoAtivo] = useState(false)
  const [tempoDescanso, setTempoDescanso] = useState(0)
  const [execucoes, setExecucoes] = useState<Record<string, ExecucaoExercicio>>({})
  const [treinoFinalizado, setTreinoFinalizado] = useState(false)

  useEffect(() => {
    if (id) {
      const treinoData = getTreinoById(id)
      setTreino(treinoData || null)
    }
  }, [id])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (descansoAtivo && tempoDescanso > 0) {
      interval = setInterval(() => {
        setTempoDescanso((prev) => {
          if (prev <= 1) {
            setDescansoAtivo(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [descansoAtivo, tempoDescanso])

  if (!treino) {
    return (
      <div className="min-h-screen bg-brutal-white flex items-center justify-center">
        <p className="text-2xl font-brutal">TREINO NÃO ENCONTRADO</p>
      </div>
    )
  }

  const exercicio = treino.exercicios[exercicioAtual]

  if (!exercicio) {
    return (
      <div className="min-h-screen bg-brutal-white flex items-center justify-center">
        <p className="text-2xl font-brutal">EXERCÍCIO NÃO ENCONTRADO</p>
      </div>
    )
  }

  const execucaoAtual = execucoes[exercicio.id] || {
    exercicioId: exercicio.id,
    seriesCompletas: 0,
    cargaUsada: exercicio.carga,
  }

  const handleSerieCompleta = () => {
    const novasExecucoes: Record<string, ExecucaoExercicio> = {
      ...execucoes,
      [exercicio.id]: {
        ...execucaoAtual,
        seriesCompletas: execucaoAtual.seriesCompletas + 1,
        cargaUsada: exercicio.carga || 0,
      },
    }
    setExecucoes(novasExecucoes)

    if (execucaoAtual.seriesCompletas + 1 >= exercicio.series) {
      // Todas as séries completas, ir para próximo exercício
      if (exercicioAtual < treino.exercicios.length - 1) {
        setDescansoAtivo(true)
        setTempoDescanso(exercicio.descanso)
        setTimeout(() => {
          setExercicioAtual(exercicioAtual + 1)
          setSerieAtual(1)
        }, exercicio.descanso * 1000)
      } else {
        // Último exercício, finalizar treino
        setTreinoFinalizado(true)
      }
    } else {
      // Iniciar descanso
      setDescansoAtivo(true)
      setTempoDescanso(exercicio.descanso)
      setSerieAtual(serieAtual + 1)
    }
  }

  const pularDescanso = () => {
    setDescansoAtivo(false)
    setTempoDescanso(0)
  }

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60)
    const secs = segundos % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (treinoFinalizado) {
    return (
      <div className="min-h-screen bg-brutal-white flex items-center justify-center p-6">
        <Card padding="lg" border="thick" className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: 'linear' }}
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-brutal mb-4">TREINO CONCLUÍDO!</h2>
            <p className="text-xl font-bold mb-6">Parabéns pela dedicação!</p>
            <div className="space-y-4">
              <Button
                onClick={() => navigate('/aluno')}
                variant="success"
                size="lg"
                className="w-full"
              >
                VOLTAR PARA HOME
              </Button>
            </div>
          </motion.div>
        </Card>
      </div>
    )
  }

  if (descansoAtivo) {
    return (
      <div className="min-h-screen bg-brutal-white flex items-center justify-center p-6">
        <Card padding="lg" border="thick" className="max-w-md w-full text-center">
          <h2 className="text-4xl font-brutal mb-6">DESCANSO</h2>
          <div className="text-8xl font-brutal mb-6 border-brutal-thick border-brutal-black p-8 bg-brutal-white">
            {formatarTempo(tempoDescanso)}
          </div>
          <p className="text-xl font-bold mb-6">Próximo: {exercicio.exercicio.nome}</p>
          <Button
            onClick={pularDescanso}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            PULAR DESCANSO
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brutal-white pb-20">
      {/* Header */}
      <div className="border-b-brutal-thick border-brutal-black bg-brutal-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/aluno')}
              className="border-brutal border-brutal-black p-2 hover:bg-brutal-black hover:text-brutal-white transition-colors duration-200"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-brutal">{treino.nome}</h1>
              <p className="text-sm font-bold text-gray-600">
                Exercício {exercicioAtual + 1} de {treino.exercicios.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Exercício Atual */}
        <Card padding="lg" border="thick">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-brutal mb-4">{exercicio.exercicio.nome}</h2>
            {exercicio.exercicio.descricao && (
              <p className="text-lg font-bold text-gray-600">
                {exercicio.exercicio.descricao}
              </p>
            )}
          </div>

          {/* Informações do Exercício */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card padding="md" border="normal" className="text-center">
              <p className="text-sm font-bold text-gray-600 mb-2">SÉRIES</p>
              <p className="text-3xl font-brutal">
                {execucaoAtual.seriesCompletas}/{exercicio.series}
              </p>
            </Card>
            <Card padding="md" border="normal" className="text-center">
              <p className="text-sm font-bold text-gray-600 mb-2">REPETIÇÕES</p>
              <p className="text-3xl font-brutal">{exercicio.repeticoes}</p>
            </Card>
            <Card padding="md" border="normal" className="text-center">
              <p className="text-sm font-bold text-gray-600 mb-2">CARGA</p>
              <p className="text-3xl font-brutal">{exercicio.carga || 0}kg</p>
            </Card>
          </div>

          {/* Série Atual */}
          <Card padding="md" border="thick" className="mb-6" style={{ backgroundColor: 'rgba(0, 255, 0, 0.1)' }}>
            <p className="text-center text-xl font-brutal mb-2">
              SÉRIE {serieAtual} de {exercicio.series}
            </p>
          </Card>

          {/* Botão Completar Série */}
          <Button
            onClick={handleSerieCompleta}
            variant="success"
            size="lg"
            className="w-full text-2xl py-6"
          >
            <Check size={32} className="inline mr-2" />
            COMPLETAR SÉRIE
          </Button>
        </Card>

        {/* Progresso Geral */}
        <Card padding="md" border="normal">
          <div className="space-y-2">
            {treino.exercicios.map((ex, index) => (
              <div
                key={ex.id}
                className={`flex items-center gap-4 p-3 border-brutal border-brutal-black ${index === exercicioAtual ? '' : ''
                  }`}
                style={index === exercicioAtual ? { backgroundColor: 'rgba(0, 255, 0, 0.1)' } : {}}
              >
                <div className="w-8 h-8 border-brutal border-brutal-black flex items-center justify-center font-brutal">
                  {execucoes[ex.id]?.seriesCompletas === ex.series ? (
                    <Check size={20} className="text-brutal-green" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-brutal">{ex.exercicio.nome}</p>
                  <p className="text-sm font-bold text-gray-600">
                    {execucoes[ex.id]?.seriesCompletas || 0}/{ex.series} séries
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
