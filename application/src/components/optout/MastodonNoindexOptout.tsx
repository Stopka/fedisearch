import React, { ReactElement } from 'react'
import AccordionItem from '../accordion/AccordionItem'

export default function MastodonNoindexOptout (): ReactElement {
  return <AccordionItem
        label={(<>Mastodon no index option</>)}
        id={'mastodon-noindex'}
    >
        <p className={'lead'}>On Mastodon you can set noindex option in your profile.</p>
        <ol>
            <li>Head to <code>Preferences</code> ➡ <code>Other</code></li>
            <li>Check the option labeled as <code>Opt-out of search engine indexing</code></li>
            <li>Confirm the change by clicking on the button labeled as <code>Save changes</code></li>
        </ol>
    </AccordionItem>
}
