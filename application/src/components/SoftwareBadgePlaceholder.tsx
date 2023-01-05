'use client'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'

export default function SoftwareBadgePlaceholder (): ReactElement {
  return <div className={'software-name placeholder-glow'}>
        <FontAwesomeIcon icon={faCircle} className={'icon'}/>
        <span className={'value placeholder col-6'}/>
    </div>
}
