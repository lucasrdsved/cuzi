import { ReactNode } from 'react'
import Card from './Card'

/**
 * Props for the ProgressCard component.
 */
interface ProgressCardProps {
  /** The title of the progress card. */
  title: string
  /** The percentage of progress (0-100). */
  progress: number // 0-100
  /** The current value achieved. */
  current: number
  /** The total target value. */
  total: number
  /** The label describing the units (e.g., "workouts"). */
  label: string
  /** Optional icon to display in the header. */
  icon?: ReactNode
  /** Additional CSS classes for styling. */
  className?: string
}

/**
 * A card component that displays a progress bar and statistics.
 *
 * @param props - The properties for the progress card.
 * @returns A Card containing a progress bar and label.
 */
export default function ProgressCard({
  title,
  progress,
  current,
  total,
  label,
  icon,
  className = '',
}: ProgressCardProps) {
  return (
    <Card padding="md" border="thick" className={className}>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-brutal">{title}</h3>
          {icon && <div className="text-2xl">{icon}</div>}
        </div>
        <div className="border-brutal-thick border-brutal-black bg-brutal-white h-8 relative">
          <div
            className="h-full bg-brutal-green transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-brutal text-brutal-black">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-lg font-brutal">
        {current}/{total} {label}
      </p>
    </Card>
  )
}
