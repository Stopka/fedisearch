import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'
import SoftwareBadge from "../SoftwareBadge";
import SoftwareBadgePlaceholder from "../SoftwareBadgePlaceholder";
import Avatar from './Avatar'
import Badge from './badges/Badge'

export default function FeedPlaceholder (): ReactElement {
  const greyDotBlob = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
  return (
      <section className="card feed g-col-12 mb-3" aria-hidden="true">
          <div className="card-body">
              <h3 className={'card-title with-emoji display-name placeholder-glow'}>
                  <a><span className="placeholder col-4"></span></a>
              </h3>
              <Avatar url={greyDotBlob} />
              <div className={'address placeholder-glow'}>
                  <span className="placeholder col-6"></span>
              </div>
              <SoftwareBadgePlaceholder />
              <div className={'badges placeholder-glow'}>
                  <Badge faIcon={faCircle}
                         label={''}
                         value={<span className={'placeholder col-4'} style={{ minWidth: '40px' }}/>}
                  />
                  <Badge faIcon={faCircle}
                         label={''}
                         value={<span className={'placeholder col-4'} style={{ minWidth: '40px' }}/>}
                  />
                  <Badge faIcon={faCircle}
                         label={''}
                         value={<span className={'placeholder col-4'} style={{ minWidth: '40px' }}/>}
                  />
                  <Badge faIcon={faCircle}
                         label={''}
                         value={<span className={'placeholder col-4'} style={{ minWidth: '40px' }}/>}
                  />
                  <Badge faIcon={faCircle}
                         label={''}
                         value={<span className={'placeholder col-4'} style={{ minWidth: '40px' }}/>}
                  />
                  <Badge faIcon={faCircle}
                         label={''}
                         value={<span className={'placeholder col-4'} style={{ minWidth: '40px' }}/>}
                  />
                  <Badge faIcon={faCircle}
                         label={''}
                         value={<span className={'placeholder col-4'} style={{ minWidth: '40px' }}/>}
                  />
              </div>
              <div className={'table-responsive fields'}>
                  <table className={'table'}>
                      <tbody>
                      <tr>
                          <th className={'with-emoji table-active  placeholder-glow'} style={{ width: '30%' }}>
                              <span className={'placeholder col-8'}/>
                          </th>
                          <td className={'with-emoji  placeholder-glow'}>
                              <span className={'placeholder col-10'}/>
                          </td>
                      </tr>
                      <tr>
                          <th className={'with-emoji table-active  placeholder-glow'} style={{ width: '30%' }}>
                              <span className={'placeholder col-8'}/>
                          </th>
                          <td className={'with-emoji  placeholder-glow'}>
                              <span className={'placeholder col-10'}/>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </div>
              <div className={'description placeholder-glow'}>
                  <p>
                      <span className={'placeholder col-4'}/>
                      <span className={'placeholder col-4'}/>
                      <span className={'placeholder col-2'}/>
                      <span className={'placeholder col-3'}/>
                  </p>
                  <p>
                      <span className={'placeholder col-4'}/>
                      <span className={'placeholder col-4'}/>
                      <span className={'placeholder col-2'}/>
                      <span className={'placeholder col-3'}/>
                  </p>
              </div>
          </div>
      </section>
  )
}
