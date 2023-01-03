import MatomoTracker from '@datapunt/matomo-tracker-js'
import { UserOptions } from '@datapunt/matomo-tracker-js/es/types'
import MatomoConfig from '../config/MatomoConfig'

export default function createMatomo (config: MatomoConfig): MatomoTracker {
  const userOptions: UserOptions = {
    urlBase: config.url === '' ? '/' : config.url,
    siteId: config.siteId <= 0 ? 1 : config.siteId,
    disabled: config.url === '' || config.siteId === 0
  }
  console.info('Starting Matomo', userOptions)
  return new MatomoTracker(userOptions)
}
