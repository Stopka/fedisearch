import React, { ReactElement } from 'react'

export default function ({ title, description }: {
  title?: string
  description?: string
}): ReactElement {
  const pageName = 'FediSearch'
  const htmlTitle = (title !== undefined ? `${title} | ` : '') + pageName
  description = description ?? 'Search on Fediverse'
  return <>
        <title>{htmlTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content={description}/>
        <meta property="og:image" content="/fedisearch.png"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={title ?? pageName}/>
        <meta property="og:description" content={description}/>
        <link rel="icon" href="/fedisearch.png"/>
    </>
}
