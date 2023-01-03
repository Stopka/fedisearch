'use client'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { MouseEventHandler, ReactElement } from 'react'

export default function LoadMoreButton (
  { onClick, show }: {
    onClick: () => void
    show: boolean
  }
): ReactElement {
  const handleClick: MouseEventHandler = (event): void => {
    event.preventDefault()
    onClick()
  }

  if (!show) {
    return <></>
  }

  return (
    <div className={'d-flex justify-content-center'}>
        <button className={'btn btn-secondary'} onClick={handleClick}>
            <FontAwesomeIcon icon={faAngleDoubleDown} className={'margin-right'}/>
            <span>Load more</span>
        </button>
    </div>
  )
}
