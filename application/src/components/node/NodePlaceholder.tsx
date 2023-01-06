import React, { ReactElement } from 'react'
import SoftwareBadgePlaceholder from '../SoftwareBadgePlaceholder'

const Row = (): ReactElement => <tr>
    <td className={'placeholder-glow'}><span className={'placeholder col-10'}/></td>
    <td>
        <div><SoftwareBadgePlaceholder /></div>
        <div className={'placeholder-glow'}><span className={'placeholder col-5'}/></div>
    </td>
    <td className={'text-end placeholder-glow'}><span className={'placeholder col-3'}/></td>
    <td className={'text-end placeholder-glow'}><span className={'placeholder col-3'}/></td>
    <td className={'text-end placeholder-glow'}><span className={'placeholder col-3'}/></td>
    <td className={'text-end placeholder-glow'}><span className={'placeholder col-3'}/></td>
    <td className={'text-end placeholder-glow'}><span className={'placeholder col-3'}/></td>
    <td className={' placeholder-glow'}><span className={'placeholder col-6'}/></td>
    <td className={' placeholder-glow'}><span className={'placeholder col-6'}/></td>
</tr>

export default function NodePlaceholder ({ rowCount }: { rowCount?: number }): ReactElement {
  if (rowCount === undefined || rowCount <= 0) {
    rowCount = 1
  }
  return (
        <tbody className={'placeholder-wrapper'} aria-hidden="true">
        {[...Array(rowCount).keys()].map(key => {
          return <Row key={key}/>
        })}
        </tbody>
  )
}
