import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export default function Badge ({ faIcon, label, value, className, showUnknown }: {
  faIcon: IconProp
  label: string
  value: string | number | null | undefined | ReactElement
  className?: string
  showUnknown?: boolean
}): ReactElement {
  if ((value === null || value === undefined) && showUnknown !== true) {
    return (<></>)
  }
  return (
      <div className={`badge bg-secondary ${className ?? ''}`} title={label}>
          <FontAwesomeIcon icon={faIcon} className={'margin-right'}/>
          <span className="visually-hidden">{label}:</span>
          <span className={'value'}>{value === null || value === undefined ? '?' : value}</span>
      </div>
  )
}
