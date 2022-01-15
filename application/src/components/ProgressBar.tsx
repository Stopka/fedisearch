import React from 'react'

const ProgressBar: React.FC<{ percents: number, way?: 'left' | 'right' | 'top' | 'bottom', color?:string }> = ({ percents, way, color }) => {
  way = way ?? 'right'
  percents = Math.round(percents)
  color = color ?? 'var(--accent-color)'
  return (
        <div className={'progressbar'} style={{
          background: `linear-gradient(to ${way}, ${color} ${percents}%, transparent ${percents}%`
        }}/>
  )
}

export default ProgressBar
