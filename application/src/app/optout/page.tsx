import React, { ReactElement } from 'react'
import Accordion from '../../components/accordion/Accordion'
import AccordionItem from '../../components/accordion/AccordionItem'
import MastodonNoindexOptout from '../../components/optout/MastodonNoindexOptout'
import MastodonSuggestingOptout from '../../components/optout/MastodonSuggestingOptout'
import RobotsTxtOptout from '../../components/optout/RobotsTxtOptout'
import TagNobotOptout from '../../components/optout/TagNobotOptout'
import Layout from '../../components/server/Layout'
import createConfig from '../../config/createConfig'

export default async function Page (): Promise<ReactElement> {
  const clientConfig = createConfig().get('client')
  return (
        <Layout title={'Opt out'} description={'What to do to opt out from the index'} config={clientConfig}>
            <p>You don&apos;t want to be listed here? There are several ways to opt-out from our index:</p>
            <Accordion>
                <MastodonNoindexOptout/>
                <MastodonSuggestingOptout/>
                <TagNobotOptout/>
                <RobotsTxtOptout/>
            </Accordion>
            <p>It can take up to <strong>3 weeks</strong> for the change to be processed and to records be deleted from
                the index.</p>
        </Layout>
  )
}
