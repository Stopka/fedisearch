import React from 'react'

const CreatedAtBadge:React.FC<{ createdAt: string | null }> = ({ createdAt }) => {
  return (
      <div className={'badge created-at'} title={'Created at'}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star-of-life"
               className="svg-inline--fa fa-star-of-life fa-w-15" role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 480 512">
              <path fill="currentColor"
                    d="M471.99 334.43L336.06 256l135.93-78.43c7.66-4.42 10.28-14.2 5.86-21.86l-32.02-55.43c-4.42-7.65-14.21-10.28-21.87-5.86l-135.93 78.43V16c0-8.84-7.17-16-16.01-16h-64.04c-8.84 0-16.01 7.16-16.01 16v156.86L56.04 94.43c-7.66-4.42-17.45-1.79-21.87 5.86L2.15 155.71c-4.42 7.65-1.8 17.44 5.86 21.86L143.94 256 8.01 334.43c-7.66 4.42-10.28 14.21-5.86 21.86l32.02 55.43c4.42 7.65 14.21 10.27 21.87 5.86l135.93-78.43V496c0 8.84 7.17 16 16.01 16h64.04c8.84 0 16.01-7.16 16.01-16V339.14l135.93 78.43c7.66 4.42 17.45 1.8 21.87-5.86l32.02-55.43c4.42-7.65 1.8-17.43-5.86-21.85z"/>
          </svg>
          <span className={'label'}>Created at</span>
          <span className={'value'}>{createdAt !== null ? (new Date(createdAt)).toLocaleDateString() : '?'}</span>
      </div>
  )
}
export default CreatedAtBadge
