import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { motion } from 'framer-motion'
import { Button } from '../components/common'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleLogin = (type: 'personal' | 'aluno') => {
    login(type)
    navigate(`/${type}`)
  }

  return (
    <div className="min-h-screen bg-brutal-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'linear' }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-brutal mb-4 border-brutal-thick border-brutal-black p-4 bg-brutal-white">
            PERSONAL & ALUNO
          </h1>
          <p className="text-xl font-bold">Escolha seu modo de acesso</p>
        </motion.div>

        {/* Botões */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: 'linear' }}
          >
            <Button
              onClick={() => handleLogin('personal')}
              variant="primary"
              size="lg"
              className="w-full text-3xl"
            >
              👨‍🏫 PERSONAL TRAINER
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: 'linear' }}
          >
            <Button
              onClick={() => handleLogin('aluno')}
              variant="secondary"
              size="lg"
              className="w-full text-3xl"
            >
              🧍‍♂️ ALUNO
            </Button>
          </motion.div>
        </div>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-center text-sm font-bold mt-8"
        >
          Versão de Teste - Acesso Rápido
        </motion.p>
      </div>
    </div>
  )
}

