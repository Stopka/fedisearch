import MatomoTracker from '@datapunt/matomo-tracker-js'

export const tracker = new MatomoTracker({
  urlBase: typeof process.env.NEXT_PUBLIC_MATOMO_URL === 'string' && process.env.NEXT_PUBLIC_MATOMO_URL !== ''
    ? process.env.NEXT_PUBLIC_MATOMO_URL
    : 'https://dummy.url',
  siteId: parseInt(typeof process.env.NEXT_PUBLIC_MATOMO_SITE_ID === 'string' && process.env.NEXT_PUBLIC_MATOMO_SITE_ID !== ''
    ? process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    : '1'
  ),
  disabled: !process.env.NEXT_PUBLIC_MATOMO_URL || !process.env.NEXT_PUBLIC_MATOMO_SITE_ID
})
