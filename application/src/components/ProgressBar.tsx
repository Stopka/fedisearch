import React from 'react'

const ProgressBar: React.FC<{ percents: number, way?: 'left' | 'right' | 'top' | 'bottom', color?: string }> = ({ percents, way, color }) => {
  way = way ?? 'right'
  percents = Math.round(percents)
  color = color ?? 'var(--accent-color)'
  return (
      <div className="progress justify-content-end">
          <div className="progress-bar" role="progressbar" style={{ width: `${percents}%` }} />
      </div>
  )
}

export default ProgressBar
