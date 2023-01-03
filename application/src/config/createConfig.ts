import convict from 'convict'
import AppConfig from './AppConfig'
import 'server-only'

export default function createConfig (): AppConfig {
  console.info('Creating config')

  return convict({
    client: {
      graphql: {
        url: {
          doc: 'Storage graphql endpoint url',
          format: '*',
          env: 'GRAPHQL_URL',
          arg: 'graphql-url',
          default: '/api/graphql'
        }
      },
      matomo: {
        url: {
          doc: 'Matomo endpoint url',
          env: 'MATOMO_URL',
          arg: 'matomo-url',
          format: '*',
          default: ''
        },
        siteId: {
          doc: 'Matomo site identificator',
          env: 'MATOMO_SITE_ID',
          arg: 'matomo-site-id',
          format: 'int',
          default: 0
        }
      }
    }
  })
}
