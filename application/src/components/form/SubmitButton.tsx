import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'

export default function SubmitButton ({ faIcon, label, id, loading, loadingLabel }: {
  faIcon: IconProp
  label: string
  loadingLabel?: string
  loading?: boolean
  id?: string
}): ReactElement {
  loadingLabel = loadingLabel ?? label
  return <button type={'submit'} className={'btn btn-primary'} id={id}>
        {
            loading === true
              ? <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>{loadingLabel}</span>
                </>
              : <>
                    <FontAwesomeIcon icon={faIcon}/>
                    <span>{label}</span>
                </>
        }
    </button>
}
