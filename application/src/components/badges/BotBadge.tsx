import React from 'react'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import Badge from './Badge'

const BotBadge: React.FC<{ bot: boolean | null }> = ({ bot }) => {
  return (
      <Badge faIcon={faRobot}
             label={'Bot'}
             value={bot !== null ? (bot ? 'Yes' : 'No') : null}
             className={'bot'}
      />
  )
}
export default BotBadge
