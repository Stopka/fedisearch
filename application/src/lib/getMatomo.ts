import { UserOptions } from '@datapunt/matomo-tracker-js/es/types'
import MatomoTracker from '@datapunt/matomo-tracker-js'

let matomo: MatomoTracker | undefined

const getMatomo = (config: UserOptions): MatomoTracker => {
  if (matomo == null) {
    console.info('Starting Matomo', config)
    matomo = new MatomoTracker(config)
  }
  return matomo
}

export default getMatomo
