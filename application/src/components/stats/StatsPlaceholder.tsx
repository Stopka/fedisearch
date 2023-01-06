import React, { ReactElement } from 'react'
import ProgressBar from '../ProgressBar'
import SoftwareBadgePlaceholder from '../SoftwareBadgePlaceholder'

const Row = (): ReactElement => <tr>
    <td>
        <SoftwareBadgePlaceholder/>
    </td>
    <td className={'text-end placeholder-glow'}>
        <span className={'placeholder col-5'}></span>
        <ProgressBar way={'left'}
                     percents={0}/>
    </td>
    <td className={'text-end placeholder-glow'}>
        <span className={'placeholder col-5'}></span>
        <ProgressBar way={'left'}
                     percents={0}/>
    </td>
    <td className={'text-end placeholder-glow'}>
        <span className={'placeholder col-5'}></span>
        <ProgressBar way={'left'}
                     percents={0}/>
    </td>
</tr>

export default function StatsPlaceholder ({ rowCount }: { rowCount?: number }): ReactElement {
  if (rowCount === undefined || rowCount <= 0) {
    rowCount = 1
  }
  return <tbody className="placeholder-wrapper" aria-hidden="true">
        {[...Array(rowCount).keys()].map(key => {
          return <Row key={key}/>
        })}
        </tbody>
}
