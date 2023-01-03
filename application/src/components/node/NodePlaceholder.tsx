import React, { ReactElement } from 'react'
import SoftwareBadgePlaceholder from '../SoftwareBadgePlaceholder'

export default function NodePlaceholder (): ReactElement {
  return (
        <tbody>
        <tr>
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
        </tbody>
  )
}
