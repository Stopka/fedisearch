import React, { ReactElement } from 'react'
import { ListNodesItemFragment } from '../../graphql/generated/types'
import FormattedDate from '../FormattedDate'
import SoftwareBadge from '../SoftwareBadge'

export default function NodeResult ({ node }: { node: ListNodesItemFragment }): ReactElement {
  return (
        <tr>
            <td>{node.domain}</td>
            <td>
                <div title={'Name'}>
                    <SoftwareBadge softwareName={node.softwareName ?? null}/>
                </div>
                <div title={`Version: ${node.softwareVersion ?? '?'}`}>{node.standardizedSoftwareVersion ?? ''}</div>
            </td>
            <td className={'text-end'}>{node.totalUserCount ?? '?'}</td>
            <td className={'text-end'}>{node.accountFeedCount ?? '0'}</td>
            <td className={'text-end'}>{node.monthActiveUserCount ?? '?'}</td>
            <td className={'text-end'}>{node.halfYearActiveUserCount ?? '?'}</td>
            <td className={'text-end'}>{node.statusesCount ?? '?'}</td>
            <td>{
                node.openRegistrations === null || node.openRegistrations === undefined
                  ? '?'
                  : (node.openRegistrations ? 'Opened' : 'Closed')
            }</td>
            <td><FormattedDate timestamp={node.refreshedAt} emptyValue={'Never'} timeTitle={true} /></td>
        </tr>
  )
}
