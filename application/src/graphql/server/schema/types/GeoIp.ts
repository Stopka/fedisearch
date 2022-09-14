import { objectType } from 'nexus'

export const GeoIp = objectType({
  name: 'GeoIp',
  definition: (t) => {
    t.nullable.string('city_name')
    t.nullable.string('continent_name')
    t.nullable.string('country_iso_code')
    t.nullable.string('country_name')
    t.nullable.string('location')
    t.nullable.string('region_iso_code')
    t.nullable.string('region_name')
  }
})
