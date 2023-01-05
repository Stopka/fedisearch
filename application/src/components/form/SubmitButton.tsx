import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'

export default function SubmitButton ({ faIcon, label, id }: {
  faIcon: IconProp
  label: string
  id?: string
}): ReactElement {
  return <button type={'submit'} className={'btn btn-primary'} id={id}>
        <FontAwesomeIcon icon={faIcon}/>
        <span>{label}</span>
    </button>
}
