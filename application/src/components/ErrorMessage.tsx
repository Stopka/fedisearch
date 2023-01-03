'use client'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'

export default function ErrorMessage ({ message }: { message?: string }): ReactElement {
  if (message === undefined) {
    return (
        <></>
    )
  }
  return (
        <div className={'d-flex justify-content-center'}>
            <FontAwesomeIcon icon={faExclamationTriangle} className={'margin-right'}/>
            <span>{message}</span>
        </div>
  )
}
