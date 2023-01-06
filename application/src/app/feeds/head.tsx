import React, { ReactElement } from 'react'
import HtmlHead from '../../components/layout/HtmlHead'

export default function Head (): ReactElement {
  return <>
    <HtmlHead title={'People'} description={'Search people on Fediverse'}/>
    </>
}
