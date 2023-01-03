import React, { ReactElement } from 'react'
import AccordionItem from '../accordion/AccordionItem'

export default function MastodonSuggestingOptout (): ReactElement {
  return <AccordionItem
        label={<>Mastodon profile suggesting</>}
        id={'mastodon-suggesting'}
    >
        <p className={'lead'}>On Mastodon you can remove yourself from data offered by your instance&apos;s API.</p>
        <ol>
            <li>Head to <code>Preferences</code> ➡ <code>Profile</code> ➡ <code>Appereance</code></li>
            <li>Uncheck the option labeled as <code>Suggest account to others</code></li>
            <li>Confirm the change by clicking on the button labeled as <code>Save changes</code></li>
        </ol>
    </AccordionItem>
}
