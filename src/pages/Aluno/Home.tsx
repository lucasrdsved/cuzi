import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, Button } from '../../components/common'
import { getTreinosByAluno } from '../../services/mockService'
import { Treino } from '../../types'
import { Calendar, TrendingUp, MessageSquare, Play } from 'lucide-react'

export default function AlunoHome() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [treinoDoDia, setTreinoDoDia] = useState<Treino | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      const treinos = getTreinosByAluno(user.id)
      // Pegar o treino mais recente como treino do dia
      const treino = treinos.length > 0 ? treinos[0] : null
      setTreinoDoDia(treino ?? null)
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-brutal-white flex items-center justify-center">
        <p className="text-2xl font-brutal">CARREGANDO...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brutal-white pb-20">
      {/* Header */}
      <div className="border-b-brutal-thick border-brutal-black bg-brutal-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-brutal">
              Olá, {user?.name}! 👋
            </h1>
            <Button onClick={logout} variant="secondary" size="sm">
              SAIR
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Treino do Dia */}
        <Card padding="lg" border="thick" className="bg-brutal-white">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-brutal mb-2">TREINO DO DIA</h2>
            <p className="text-lg font-bold">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>
          </div>

          {treinoDoDia ? (
            <div className="space-y-4">
              <div className="border-brutal-thick border-brutal-black p-6 bg-brutal-white">
                <h3 className="text-2xl font-brutal mb-4">{treinoDoDia.nome}</h3>
                {treinoDoDia.descricao && (
                  <p className="text-sm font-bold text-gray-600 mb-4">
                    {treinoDoDia.descricao}
                  </p>
                )}
                <div className="mb-6">
                  <p className="text-lg font-bold mb-2">
                    {treinoDoDia.exercicios.length} exercícios
                  </p>
                  <div className="space-y-2">
                    {treinoDoDia.exercicios.slice(0, 3).map((ex) => (
                      <div
                        key={ex.id}
                        className="border-brutal border-brutal-black p-2 bg-brutal-white"
                      >
                        <p className="font-bold">
                          {ex.exercicio.nome} - {ex.series}x{ex.repeticoes}
                        </p>
                      </div>
                    ))}
                    {treinoDoDia.exercicios.length > 3 && (
                      <p className="text-sm font-bold text-gray-600">
                        +{treinoDoDia.exercicios.length - 3} exercícios
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/aluno/treino/${treinoDoDia.id}`)}
                  variant="success"
                  size="lg"
                  className="w-full text-xl"
                >
                  <Play size={24} className="inline mr-2" />
                  INICIAR TREINO
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border-brutal-thick border-brutal-black p-6 bg-brutal-white">
              <p className="text-xl font-bold mb-4">Nenhum treino atribuído hoje</p>
              <p className="text-sm font-bold text-gray-600">
                Entre em contato com seu personal trainer
              </p>
            </div>
          )}
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 gap-4">
          <Card padding="md" border="thick">
            <div className="text-center">
              <Calendar size={32} className="mx-auto mb-2 text-brutal-black" />
              <p className="text-sm font-bold text-gray-600 mb-1">TREINOS ESTA SEMANA</p>
              <p className="text-3xl font-brutal">3</p>
            </div>
          </Card>

          <Card padding="md" border="thick">
            <div className="text-center">
              <TrendingUp size={32} className="mx-auto mb-2 text-brutal-black" />
              <p className="text-sm font-bold text-gray-600 mb-1">SEQUÊNCIA</p>
              <p className="text-3xl font-brutal">5 dias</p>
            </div>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card padding="lg" border="thick">
          <h2 className="text-2xl font-brutal mb-4">AÇÕES RÁPIDAS</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => navigate('/aluno/progresso')}
              variant="primary"
              size="md"
              className="w-full"
            >
              <TrendingUp size={20} className="inline mr-2" />
              PROGRESSO
            </Button>
            <Button
              onClick={() => navigate('/aluno/chat')}
              variant="secondary"
              size="md"
              className="w-full"
            >
              <MessageSquare size={20} className="inline mr-2" />
              CHAT
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t-brutal-thick border-brutal-black bg-brutal-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-around items-center">
            <button
              onClick={() => navigate('/aluno')}
              className="border-brutal border-brutal-black p-3 hover:bg-brutal-black hover:text-brutal-white transition-colors duration-200"
            >
              <Calendar size={24} />
            </button>
            <button
              onClick={() => navigate('/aluno/progresso')}
              className="border-brutal border-brutal-black p-3 hover:bg-brutal-black hover:text-brutal-white transition-colors duration-200"
            >
              <TrendingUp size={24} />
            </button>
            <button
              onClick={() => navigate('/aluno/chat')}
              className="border-brutal border-brutal-black p-3 hover:bg-brutal-black hover:text-brutal-white transition-colors duration-200"
            >
              <MessageSquare size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
