import React from 'react'

export function getFlagEmoji (countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export interface GeoParams {
  countryCode?: string
  countryName?: string
  city?: string
}

export default function Geo ({ countryCode, countryName, city }: GeoParams): React.ReactElement | null {
  const alignedCountryCode = countryCode ?? ''
  const alignedCity = city ?? ''
  if (alignedCountryCode === '' && alignedCity === '') {
    return null
  }
  return <div className={'geo'}>
      {
          alignedCity !== ''
            ? <span className={'city'}>{alignedCity}</span>
            : ''
      }
      {
          alignedCountryCode !== ''
            ? <span className={'country'} title={`${countryName ?? alignedCountryCode}`}>{getFlagEmoji(alignedCountryCode)}</span>
            : ''
      }
    </div>
}
