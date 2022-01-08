import React from 'react'

const StatusesCountBadge:React.FC<{ statusesCount: number | null }> = ({ statusesCount }) => {
  return (
      <div className={'badge last-status-at'} title={'Status count'}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comment-alt"
               className="svg-inline--fa fa-comment-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512">
              <path fill="currentColor"
                    d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z"/>
          </svg>
          <span className={'label'}>Status count</span>
          <span className={'value'}>{statusesCount !== null ? statusesCount : '?'}</span>
      </div>
  )
}

export default StatusesCountBadge
