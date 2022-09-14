import React from 'react'

export function getFlagEmoji (countryCode:string):string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export interface GeoParams{
    countryCode?: string,
    countryName?:string,
    city?: string
}

export default function Geo ({ countryCode, countryName, city }:GeoParams):React.ReactElement|null {
  if (!countryCode && !city) {
    return null
  }
  return <div className={'geo'}>
      {city ? <span className={'city'}>{city}</span> : ''}
      {countryCode ? <span className={'country'} title={`${countryName ?? countryCode}`}>{getFlagEmoji(countryCode)}</span> : ''}
    </div>
}
