import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import getMatomo from '../lib/getMatomo'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import SoftwareBadge from '../components/badges/SoftwareBadge'
import SortToggle from '../components/SortToggle'
import { faSearch, faAngleDoubleDown, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import {
  ListNodesQuery,
  ListNodesResult
} from '../graphql/client/queries/ListNodesQuery'
import { nodeQueryInputSchema, NodeQueryInputType } from '../graphql/common/types/NodeQueryInput'
import { ListNodesVariables } from '../graphql/common/queries/listNodes'
import { NodeSoringByEnumType } from '../graphql/common/types/NodeSortingByEnum'

const Nodes: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const router = useRouter()
  let routerQuery: NodeQueryInputType
  try {
    routerQuery = nodeQueryInputSchema.parse(router.query)
  } catch (e) {
    routerQuery = {
      search: '',
      sortBy: 'refreshedAt',
      sortWay: 'desc'
    }
  }
  console.log('Router query', routerQuery)
  const [query, setQuery] = useState<NodeQueryInputType>(routerQuery)
  const [page, setPage] = useState<number>(0)
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const { loading, error, data, fetchMore, refetch } = useQuery<ListNodesResult, ListNodesVariables>(ListNodesQuery, {
    variables: {
      query,
      paging: {
        page: 0
      }
    }
  })

  useEffect(() => {
    getMatomo(matomoConfig).trackEvent({
      category: 'nodes',
      action: 'next-page',
      customDimensions: [
        {
          value: page.toString(),
          id: 1
        }
      ]
    })
  }, [page])
  useEffect((): void => {
    void router.push({ query })
    getMatomo(matomoConfig).trackEvent({
      category: 'nodes',
      action: 'new-search'
    })
  }, [query])

  const handleQueryChange = (event): void => {
    const targetInput = event.target
    const value = targetInput.value
    const name = targetInput.name
    const newQuery: NodeQueryInputType = { ...query }
    newQuery[name] = value
    console.info('Query changed', { name, value })
    setQuery(newQuery)
    setPage(0)
  }

  const handleSearchSubmit = async (event): Promise<void> => {
    setPageLoading(true)
    event.preventDefault()
    setQuery(query)
    setPage(0)
    await refetch({ paging: { page: 0 } })
    setPageLoading(false)
  }

  const handleLoadMore = async (event): Promise<void> => {
    event.preventDefault()
    setPage(page + 1)
    console.info('Loading next page', { query, page })
    setPageLoading(true)
    await fetchMore({
      variables: {
        paging: { page: page + 1 }
      },
      updateQuery: (previousData, { fetchMoreResult }) => {
        console.log('more', {
          previousData, fetchMoreResult
        })
        fetchMoreResult.listNodes.items = [
          ...previousData.listNodes.items,
          ...fetchMoreResult.listNodes.items
        ]
        return fetchMoreResult
      }
    })
    setPageLoading(false)
  }

  const toggleSort = (sortBy: NodeSoringByEnumType): void => {
    const sortWay = query.sortBy === sortBy && query.sortWay === 'asc' ? 'desc' : 'asc'
    getMatomo(matomoConfig).trackEvent({
      category: 'nodes',
      action: 'sort',
      customDimensions: [
        {
          value: `${sortBy} ${sortWay}`,
          id: 2
        }
      ]
    })
    setQuery({
      ...query,
      sortBy,
      sortWay
    })
  }

  return (
        <Layout matomoConfig={matomoConfig}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1>Search servers</h1>
            <form onSubmit={handleSearchSubmit}>
                <div className={'input-group mb-3'}>
                    <input
                        name={'search'}
                        id={'search'}
                        type={'search'}
                        className={'form-control'}
                        onChange={handleQueryChange}
                        value={query.search}
                        placeholder={'Search servers on fediverse'}
                        autoFocus={true}
                        aria-label="Search servers on fediverse"
                        aria-describedby="search-nodes-button"
                    />
                    <button type={'submit'} className={'btn btn-primary'} id={'search-nodes-button'}>
                        <FontAwesomeIcon icon={faSearch}/>
                        <span>Search</span>
                    </button>
                </div>
            </form>
            <Loader loading={loading || pageLoading} showBottom={true}>
                {
                    (data != null)
                      ? (
                            <div className="table-responsive">
                                <table className={'table table-dark table-striped table-bordered nodes'}>
                                    <thead>
                                    <tr>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'domain'} sort={query}>
                                                Domain
                                            </SortToggle>
                                        </th>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'softwareName'} sort={query}>
                                                Software
                                            </SortToggle>
                                        </th>
                                        <th colSpan={4}>User count</th>
                                        <th rowSpan={2} className={'number-cell'}>
                                            <SortToggle onToggle={toggleSort} field={'statusesCount'} sort={query}>
                                                Statuses
                                            </SortToggle>
                                        </th>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'openRegistrations'} sort={query}>
                                                Registrations
                                            </SortToggle>
                                        </th>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'refreshedAt'} sort={query}>
                                                Last refreshed
                                            </SortToggle>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className={'text-end'}>
                                            <SortToggle onToggle={toggleSort} field={'totalUserCount'} sort={query}>
                                                Total
                                            </SortToggle>
                                        </th>
                                        <th className={'text-end'}>
                                          <SortToggle onToggle={toggleSort} field={'accountFeedCount'} sort={query}>
                                            Indexed
                                          </SortToggle>
                                        </th>
                                        <th className={'text-end'}>
                                            <SortToggle onToggle={toggleSort} field={'monthActiveUserCount'} sort={query}>
                                                Month active
                                            </SortToggle>
                                        </th>
                                        <th className={'text-end'}>
                                            <SortToggle onToggle={toggleSort} field={'halfYearActiveUserCount'} sort={query}>
                                                Half year active
                                            </SortToggle>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {(data.listNodes.items.length > 0)
                                      ? data.listNodes.items.map((node, index) => {
                                        return (
                                                <tr key={index}>
                                                    <td>{node.domain}</td>
                                                    <td>
                                                        <div title={'Name'}><SoftwareBadge
                                                            softwareName={node.softwareName}/></div>
                                                        <div title={'Version: ' + node.softwareVersion ?? '?'}>{node.standardizedSoftwareVersion ?? ''}</div>
                                                    </td>
                                                    <td className={'text-end'}>{node.totalUserCount ?? '?'}</td>
                                                    <td className={'text-end'}>{node.accountFeedCount ?? '0'}</td>
                                                    <td className={'text-end'}>{node.monthActiveUserCount ?? '?'}</td>
                                                    <td className={'text-end'}>{node.halfYearActiveUserCount ?? '?'}</td>
                                                    <td className={'text-end'}>{node.statusesCount ?? '?'}</td>
                                                    <td>{node.openRegistrations === null ? '?' : (node.openRegistrations ? 'Opened' : 'Closed')}</td>
                                                    <td>{node.refreshedAt !== '' ? (new Date(node.refreshedAt)).toLocaleDateString() : 'Never'}</td>
                                                </tr>
                                        )
                                      })
                                      : (
                                            <tr>
                                                <td colSpan={9}>No servers found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )
                      : ''
                }
            </Loader>
            {!loading && !pageLoading && data?.listNodes?.paging?.hasNext !== undefined && data?.listNodes?.paging?.hasNext
              ? (
                  <div className={'d-flex justify-content-center'}>
                    <button className={'btn btn-secondary'} onClick={handleLoadMore}>
                        <FontAwesomeIcon icon={faAngleDoubleDown} className={'margin-right'} />
                        <span>Load more</span>
                    </button>
                  </div>
                )
              : ''}
          {(error != null)
            ? (<div className={'d-flex justify-content-center'}>
                  <FontAwesomeIcon icon={faExclamationTriangle} className={'margin-right'}/>
                  <span>{error.message}</span>
              </div>)
            : ''}
        </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.info('Loading matomo config', matomoConfig)
  return {
    props: {
      matomoConfig
    }
  }
}

export default Nodes
