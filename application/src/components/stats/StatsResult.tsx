import React, { ReactElement } from 'react'
import { Stats, StatsAggregationFragment } from '../../graphql/generated/types'
import SoftwareBadge from '../SoftwareBadge'
import ProgressBar from '../ProgressBar'

export default function StatsResult ({ software, maxAggregation }: {
  software: Stats
  maxAggregation: StatsAggregationFragment
}): ReactElement {
  return <tr>
        <td>
            <SoftwareBadge softwareName={software.softwareName}/>
        </td>
        <td className={'text-end'}>
            <span>{software.nodeCount}</span>
            <ProgressBar way={'left'}
                         percents={100 * software.nodeCount / maxAggregation.nodeCount}/>
        </td>
        <td className={'text-end'}>
            <span>{software.accountFeedCount}</span>
            <ProgressBar way={'left'}
                         percents={100 * software.accountFeedCount / maxAggregation.accountFeedCount}/>
        </td>
        <td className={'text-end'}>
            <span>{software.channelFeedCount}</span>
            <ProgressBar way={'left'}
                         percents={100 * software.channelFeedCount / maxAggregation.channelFeedCount}/>
        </td>
    </tr>
}
