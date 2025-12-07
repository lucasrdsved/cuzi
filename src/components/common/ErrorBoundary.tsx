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
  /** Indicates whether an error has been caught. */
  hasError: boolean
}

/**
 * A class-based Error Boundary component to catch JavaScript errors anywhere in the child component tree.
 * Displays a fallback UI when an error occurs.
 */
export default class ErrorBoundary extends Component<Props, State> {
  /** Initial state. */
  override state = { hasError: false }

  /**
   * Update state so the next render will show the fallback UI.
   * @param _error - The error that was thrown.
   * @returns The new state object.
   */
  static getDerivedStateFromError(_error: Error) {
    return { hasError: true }
  }

  /**
   * Renders the children or a fallback UI if an error occurred.
   * @returns The component tree.
   */
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
