import React, { ReactNode } from 'react'
import Spinner from './Spinner'

const Loader: React.FC<{ children: ReactNode, loading: boolean, hideContent?: boolean, table?: number, showTop?: boolean, showBottom?: boolean }> = ({
  showTop,
  showBottom,
  hideContent,
  children,
  table,
  loading
}) => {
  const className = 'loader' + (loading ? ' -loading' : '')

  const spinner = (
        <div className={'d-flex justify-content-center'}>
            <Spinner/>
        </div>
  )

  if (table !== undefined || table !== 0) {
    return (
            <>
                {(showTop ?? false) && loading
                  ? (
                        <tbody>
                        <tr className={className}>
                            <td colSpan={table}>
                                {spinner}
                            </td>
                        </tr>
                        </tbody>
                    )
                  : ''}
                {(hideContent ?? false) && loading ? '' : children}
                {(showBottom ?? false) && loading
                  ? (
                        <tbody>
                        <tr className={className}>
                            <td colSpan={table}>
                                <div className={'d-flex justify-content-center'}>
                                    <Spinner/>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    )
                  : ''}
            </>
    )
  }
  return (
        <>
            {(showTop ?? false) && loading ? spinner : ''}
            {(hideContent ?? false) && loading ? '' : children}
            {(showBottom ?? false) && loading ? spinner : ''}
        </>
  )
}

export default Loader
