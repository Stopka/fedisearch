export const matomoConfig = {
  urlBase:
      process.env.MATOMO_URL !== undefined && process.env.MATOMO_URL !== ''
        ? process.env.MATOMO_URL
        : 'https://domain.tld',
  siteId: parseInt(
    process.env.MATOMO_SITE_ID !== undefined && process.env.MATOMO_SITE_ID !== ''
      ? process.env.MATOMO_SITE_ID
      : '1'
  ),
  disabled: (process.env.MATOMO_URL ?? '') === '' || (process.env.MATOMO_SITE_ID ?? '') === ''
}
