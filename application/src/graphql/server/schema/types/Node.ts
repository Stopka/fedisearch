import { objectType } from 'nexus'
import NodeSource from '../../../../lib/storage/Definitions/Node'
import { GeoIp } from './GeoIp'
import { DateTime } from './DateTime'

export const Node = objectType({
  name: 'Node',
  definition: (t) => {
    t.nonNull.id('id', {
      resolve: async (source: NodeSource) => {
        return source.domain
      }
    })
    t.nullable.string('name')
    t.nonNull.field('foundAt', { type: DateTime })
    t.nullable.field('refreshAttemptedAt', { type: DateTime })
    t.nullable.field('refreshedAt', { type: DateTime })
    t.nullable.boolean('openRegistrations')
    t.nonNull.string('domain')
    t.nonNull.string('domain')
    t.nullable.list.nonNull.string('serverIps')
    t.nullable.field('geoip', {
      type: GeoIp
    })
    t.nullable.string('softwareName')
    t.nullable.int('accountFeedCount')
    t.nullable.int('channelFeedCount')
    t.nullable.string('softwareVersion')
    t.nullable.string('standardizedSoftwareVersion')
    t.nullable.int('halfYearActiveUserCount')
    t.nullable.int('monthActiveUserCount')
    t.nullable.int('statusesCount')
    t.nullable.int('totalUserCount')
  }
})
