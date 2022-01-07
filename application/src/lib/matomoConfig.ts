export const matomoConfig = {
  urlBase: typeof process.env.MATOMO_URL === 'string' && process.env.MATOMO_URL !== ''
    ? process.env.MATOMO_URL
    : 'https://domain.tld',
  siteId: parseInt(typeof process.env.MATOMO_SITE_ID === 'string' && process.env.MATOMO_SITE_ID !== ''
    ? process.env.MATOMO_SITE_ID
    : '1'
  ),
  disabled: !process.env.MATOMO_URL || !process.env.MATOMO_SITE_ID
}
