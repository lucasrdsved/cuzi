import { ReactNode } from 'react'
import Card from './Card'

interface ProgressCardProps {
  title: string
  progress: number // 0-100
  current: number
  total: number
  label: string
  icon?: ReactNode
  className?: string
}

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

