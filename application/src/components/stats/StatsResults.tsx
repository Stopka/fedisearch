import React, { ReactElement } from 'react'
import { StatsAggregationFragment, StatsItemFragment } from '../../graphql/generated/types'
import StatsResult from './StatsResult'

export default function StatsResults ({ items, maxAggregation }: {
  items: StatsItemFragment[] | undefined
  maxAggregation: StatsAggregationFragment | undefined
}): ReactElement {
  if (items === undefined || maxAggregation === undefined || items.length === 0) {
    return (
            <tbody>
            <tr>
                <td colSpan={4}><em>No stats found.</em></td>
            </tr>
            </tbody>
    )
  }
  return (
        <tbody>
        {
            items.map((software, index) => {
              return <StatsResult key={index} software={software} maxAggregation={maxAggregation} />
            })
        }
        </tbody>
  )
}
