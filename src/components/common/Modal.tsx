import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

/**
 * Props for the Modal component.
 */
interface ModalProps {
  /** Whether the modal is currently open. */
  isOpen: boolean
  /** Function to call when the modal should be closed (e.g., clicking backdrop or close button). */
  onClose?: () => void
  /** Optional title to display in the modal header. */
  title?: string
  /** The content to display inside the modal body. */
  children: ReactNode
  /** Optional content to display in the modal footer. */
  footer?: ReactNode
}

/**
 * A modal dialog component with backdrop and animations.
 *
 * @param props - The properties for the modal.
 * @returns A portal containing the modal and backdrop, or null if not open.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              className="bg-brutal-white border-brutal-thick border-brutal-black w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || onClose) && (
                <div className="border-b-brutal border-brutal-black p-6 flex justify-between items-center">
                  {title && (
                    <h2 className="text-2xl font-brutal">{title}</h2>
                  )}
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="border-brutal border-brutal-black p-2 hover:bg-brutal-black hover:text-brutal-white transition-colors duration-200"
                      aria-label="Fechar"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>
              )}
              
              {/* Content */}
              <div className="p-6">
                {children}
              </div>
              
              {/* Footer */}
              {footer && (
                <div className="border-t-brutal border-brutal-black p-6">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
