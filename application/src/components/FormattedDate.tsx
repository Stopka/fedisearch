import React, { ReactElement, ReactNode } from 'react'

export default function FormattedDate ({ timestamp, emptyValue, timeTitle }: {
  timestamp: string | number | null | undefined
  emptyValue?: string | ReactNode
  timeTitle?: boolean
}): ReactElement {
  if (timestamp === '' || timestamp === null || timestamp === undefined) {
    return <>{emptyValue ?? ''}</>
  }
  const date = new Date(timestamp)
  return <span title={timeTitle === true ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` : undefined}>{date.toLocaleDateString()}</span>
}
