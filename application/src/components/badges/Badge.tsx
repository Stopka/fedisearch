import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const Badge: React.FC<{ faIcon: IconProp, label: string, value: string | number | null, className?: string, showUnknown?: boolean }> = ({ faIcon, label, value, className, showUnknown }) => {
  if (value === null && showUnknown !== true) {
    return (<></>)
  }
  return (
      <div className={`badge bg-secondary ${className ?? ''}`} title={label}>
          <FontAwesomeIcon icon={faIcon} className={'margin-right'}/>
          <span className="visually-hidden">{label}:</span>
          <span className={'value'}>{value === null ? '?' : value}</span>
      </div>
  )
}
export default Badge
