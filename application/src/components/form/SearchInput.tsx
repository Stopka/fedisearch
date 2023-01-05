import React, { ChangeEventHandler, ReactElement } from 'react'

export default function SearchInput ({ label, onChange, value, describedBy }: {
  label: string
  onChange?: ChangeEventHandler
  value?: string
  describedBy?: string
}): ReactElement {
  return <input
        name={'search'}
        id={'search'}
        type={'search'}
        className={'form-control'}
        onChange={onChange}
        value={value}
        placeholder={label}
        autoFocus={true}
        aria-label={label}
        aria-describedby={describedBy}
    />
}
