import { Component, ReactNode } from 'react'
import { Button } from './index'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brutal-white flex items-center justify-center p-6">
          <div className="border-brutal-thick border-brutal-red bg-brutal-white p-8 max-w-md text-center">
            <h1 className="text-4xl font-brutal mb-4">ERRO!</h1>
            <p className="text-xl font-bold mb-6">Algo deu errado</p>
            <Button
              onClick={() => window.location.href = '/'}
              variant="danger"
              size="lg"
            >
              VOLTAR
            </Button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
