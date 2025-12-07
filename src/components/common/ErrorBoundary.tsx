import { Component, ReactNode } from 'react'
import { Button } from './index'

/**
 * Props for the ErrorBoundary component.
 */
interface Props {
  /** The child components to wrap and monitor for errors. */
  children: ReactNode
}

/**
 * State for the ErrorBoundary component.
 */
interface State {
  /** Whether an error has been caught. */
  hasError: boolean
}

/**
 * A class component that catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
export default class ErrorBoundary extends Component<Props, State> {
  override state = { hasError: false }

  /**
   * Updates the state when an error is thrown in a descendant component.
   * @returns The new state with hasError set to true.
   */
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  override render() {
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
