import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, Button } from '../../components/common'
import { getAlunosByPersonal, getTreinosByPersonal } from '../../services/mockService'
import { Aluno, Treino } from '../../types'
import { Users, Plus, TrendingUp, MessageSquare } from 'lucide-react'

export default function PersonalDashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [treinos, setTreinos] = useState<Treino[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      const personalAlunos = getAlunosByPersonal(user.id)
      const personalTreinos = getTreinosByPersonal(user.id)
      setAlunos(personalAlunos)
      setTreinos(personalTreinos)
      setLoading(false)
    }
  }, [user])

  const alunosAtivos = alunos.length
  const treinosAtivos = treinos.filter(t => t.ativo).length
  const treinosHoje = treinos.filter(t => {
    const hoje = new Date().toISOString().split('T')[0]
    return t.dataAtribuicao?.startsWith(hoje || '')
  }).length

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
        <div className="max-w-6xl mx-auto px-4 py-6">
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

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card padding="md" border="thick">
            <div className="flex items-center gap-4">
              <div className="border-brutal-thick border-brutal-black p-4 bg-brutal-white">
                <Users size={32} className="text-brutal-black" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600">ALUNOS ATIVOS</p>
                <p className="text-3xl font-brutal">{alunosAtivos}</p>
              </div>
            </div>
          </Card>

          <Card padding="md" border="thick">
            <div className="flex items-center gap-4">
              <div className="border-brutal-thick border-brutal-black p-4 bg-brutal-white">
                <TrendingUp size={32} className="text-brutal-black" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600">TREINOS ATIVOS</p>
                <p className="text-3xl font-brutal">{treinosAtivos}</p>
              </div>
            </div>
          </Card>

          <Card padding="md" border="thick">
            <div className="flex items-center gap-4">
              <div className="border-brutal-thick border-brutal-black p-4 bg-brutal-white">
                <MessageSquare size={32} className="text-brutal-black" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600">TREINOS HOJE</p>
                <p className="text-3xl font-brutal">{treinosHoje}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Alunos Section */}
        <Card padding="lg" border="thick">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-brutal">MEUS ALUNOS</h2>
            <Button
              onClick={() => navigate('/personal/alunos/novo')}
              variant="success"
              size="md"
            >
              <Plus size={20} className="inline mr-2" />
              NOVO ALUNO
            </Button>
          </div>

          {alunos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold mb-4">Nenhum aluno cadastrado</p>
              <Button
                onClick={() => navigate('/personal/alunos/novo')}
                variant="primary"
              >
                CADASTRAR PRIMEIRO ALUNO
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {alunos.map((aluno) => (
                <Card
                  key={aluno.id}
                  padding="md"
                  border="normal"
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  onClick={() => navigate(`/personal/alunos/${aluno.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-brutal mb-2">{aluno.name}</h3>
                      <p className="text-sm font-bold text-gray-600">{aluno.email}</p>
                      {aluno.objetivo && (
                        <p className="text-sm font-bold mt-2">
                          Objetivo: {aluno.objetivo}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation()
                          navigate(`/personal/alunos/${aluno.id}`)
                        }}
                      >
                        VER
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation()
                          navigate(`/personal/chat/${aluno.id}`)
                        }}
                      >
                        CHAT
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Treinos Recentes */}
        <Card padding="lg" border="thick">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-brutal">TREINOS RECENTES</h2>
            <Button
              onClick={() => navigate('/personal/treinos/novo')}
              variant="success"
              size="md"
            >
              <Plus size={20} className="inline mr-2" />
              NOVO TREINO
            </Button>
          </div>

          {treinos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-bold mb-4">Nenhum treino criado</p>
              <Button
                onClick={() => navigate('/personal/treinos/novo')}
                variant="primary"
              >
                CRIAR PRIMEIRO TREINO
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {treinos.slice(0, 5).map((treino) => {
                const aluno = alunos.find(a => a.id === treino.alunoId)
                return (
                  <Card key={treino.id} padding="md" border="normal">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-brutal mb-2">{treino.nome}</h3>
                        <p className="text-sm font-bold text-gray-600">
                          Aluno: {aluno?.name || 'Desconhecido'}
                        </p>
                        <p className="text-sm font-bold">
                          {treino.exercicios.length} exercícios
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate(`/personal/treinos/${treino.id}`)}
                        >
                          VER
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t-brutal-thick border-brutal-black bg-brutal-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-around items-center">
            <button
              onClick={() => navigate('/personal')}
              className="border-brutal border-brutal-black p-3 hover:bg-brutal-black hover:text-brutal-white transition-colors duration-200"
            >
              <Users size={24} />
            </button>
            <button
              onClick={() => navigate('/personal/treinos')}
              className="border-brutal border-brutal-black p-3 hover:bg-brutal-black hover:text-brutal-white transition-colors duration-200"
            >
              <TrendingUp size={24} />
            </button>
            <button
              onClick={() => navigate('/personal/chat')}
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
