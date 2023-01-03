import React, { ReactElement } from 'react'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import Badge from './Badge'

export default function BotBadge ({ bot }: { bot: boolean | null | undefined }): ReactElement {
  return (
      <Badge faIcon={faRobot}
             label={'Bot'}
             value={bot !== null && bot !== undefined ? (bot ? 'Yes' : 'No') : null}
             className={'bot'}
      />
  )
}
