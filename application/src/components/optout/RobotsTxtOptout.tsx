import React, { ReactElement } from 'react'
import AccordionItem from '../accordion/AccordionItem'

export default function RobotsTxtOptout (): ReactElement {
  return <AccordionItem
        label={<>Server robots.txt</>}
        id={'robots-txt'}
    >
        <p className={'lead'}>If you are a server maintainer, you can disable crawling of your instance using
            <strong>robots.txt</strong>.</p>
        <p>This method will remove all users on your instance from our index.
            Your users can't bypass your decision.</p>
        <ol>
            <li>Create a text file with following content:
                <pre><code>
            User-agent: FediCrawl/1.0<br/>
            Disallow: /
        </code></pre></li>
            <li>Expose the file on your instance's domain, on path:<br/>
                <code>https://&lt;your instace&#39;s domain&gt;/robots.txt</code>
            </li>
        </ol>
    </AccordionItem>
}
