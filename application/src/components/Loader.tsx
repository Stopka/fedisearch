import React, { ReactNode } from 'react'

const Loader:React.FC<{ children: ReactNode, loading: boolean, hideContent?:boolean, table?:number, showTop?:boolean, showBottom?:boolean }> = ({ showTop, showBottom, hideContent, children, table, loading }) => {
  const className = 'loader' + (loading ? ' -loading' : '')
  const loaderVisual = (
        <div className={'loader-visualisation'}>
            <svg xmlns="http://www.w3.org/2000/svg" className='loader-graphics' width="34" height="34">
                <path className="rail" d="m 16.977523,0.24095147 c -9.2629169,0 -16.73280045,7.51449143 -16.73280045,16.77740253 0,9.262912 7.46988355,16.777403 16.73280045,16.777403 9.262917,0 16.777413,-7.514491 16.777413,-16.777403 0,-9.2629111 -7.514496,-16.77740253 -16.777413,-16.77740253 z m 0,4.14972823 c 6.966927,0 12.627682,5.6607523 12.627682,12.6276743 0,6.966923 -5.660755,12.583053 -12.627682,12.583053 -6.966937,0 -12.5830596,-5.61613 -12.5830596,-12.583053 0,-6.966922 5.6161226,-12.6276743 12.5830596,-12.6276743 z" />
                <path className="train" d="M 31.677259,17.003529 A 14.680208,14.680199 0 0 1 20.796571,31.183505" />
            </svg>
            <span>Loading...</span>
        </div>
  )
  if (table) {
    return (
        <>
            {showTop && loading
              ? (
                <tr className={className}>
                    <td colSpan={table}>{loaderVisual}</td>
                </tr>
                )
              : ''}
            { hideContent && loading ? '' : children}
            {showBottom && loading
              ? (
                    <tr className={className}>
                        <td colSpan={table}>{loaderVisual}</td>
                    </tr>
                )
              : ''}
        </>
    )
  }
  return (
        <div className={className}>
            {showTop && loading ? loaderVisual : ''}
            <div className={'loader-content'}>
                {hideContent && loading ? '' : children}
            </div>
            {showBottom && loading ? loaderVisual : ''}
        </div>
  )
}

export default Loader
