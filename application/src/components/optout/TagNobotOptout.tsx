import React, { ReactElement } from 'react'
import AccordionItem from '../accordion/AccordionItem'

export default function TagNobotOptout (): ReactElement {
  return <AccordionItem
        label={<>#nobot in profile description</>}
        id={'tag-nobot'}
    >
        <p className={'lead'}>On any platform you can add <strong>#nobot</strong> tag to your profile description.</p>
        <p>Depending on your platform:</p>
        <ol>
            <li>Open profile editing</li>
            <li>Enter the word <code>#nobot</code> to de description field (including the hash symbol).</li>
            <li>Save changes</li>
        </ol>
    </AccordionItem>
}
