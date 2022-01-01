import React from 'react'

const FeedTypeBadge:React.FC<{ type: 'account' | 'channel' }> = ({ type }) => {
  if (type === 'channel') {
    return (
        <div className={'badge feed-type'} title={'Feed type'}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rss"
                 className="feed-type svg-inline--fa fa-rss fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 448 512">
                <path fill="currentColor"
                      d="M128.081 415.959c0 35.369-28.672 64.041-64.041 64.041S0 451.328 0 415.959s28.672-64.041 64.041-64.041 64.04 28.673 64.04 64.041zm175.66 47.25c-8.354-154.6-132.185-278.587-286.95-286.95C7.656 175.765 0 183.105 0 192.253v48.069c0 8.415 6.49 15.472 14.887 16.018 111.832 7.284 201.473 96.702 208.772 208.772.547 8.397 7.604 14.887 16.018 14.887h48.069c9.149.001 16.489-7.655 15.995-16.79zm144.249.288C439.596 229.677 251.465 40.445 16.503 32.01 7.473 31.686 0 38.981 0 48.016v48.068c0 8.625 6.835 15.645 15.453 15.999 191.179 7.839 344.627 161.316 352.465 352.465.353 8.618 7.373 15.453 15.999 15.453h48.068c9.034-.001 16.329-7.474 16.005-16.504z"/>
                <title>Channel</title>
            </svg>
            <span className={'label'}>Feed type</span>
            <span className={'value'}>Channel</span>
        </div>
    )
  }
  return (
      <div className={'badge feed-type'} title={'Feed type'}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
               className="feed-type svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 448 512">
              <path fill="currentColor"
                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
              <title>Account</title>
          </svg>
          <span className={'label'}>Feed type</span>
          <span className={'value'}>Account</span>
      </div>
  )
}

export default FeedTypeBadge
