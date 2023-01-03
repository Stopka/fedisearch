import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export interface Feed {
  __typename?: 'Feed'
  avatar?: Maybe<Scalars['String']>
  bot?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['DateTime']>
  description: Scalars['String']
  displayName: Scalars['String']
  domain: Scalars['String']
  fields: Field[]
  followersCount?: Maybe<Scalars['Int']>
  followingCount?: Maybe<Scalars['Int']>
  foundAt: Scalars['DateTime']
  id: Scalars['ID']
  lastStatusAt?: Maybe<Scalars['DateTime']>
  locked: Scalars['Boolean']
  name: Scalars['String']
  node: Node
  parent?: Maybe<Feed>
  refreshedAt?: Maybe<Scalars['DateTime']>
  statusesCount?: Maybe<Scalars['Int']>
  type: FeedTypeEnum
  url: Scalars['String']
}

export interface FeedIdentityInput {
  name: Scalars['String']
  nodeDomain: Scalars['String']
}

export interface FeedInput {
  avatar?: InputMaybe<Scalars['String']>
  bot?: InputMaybe<Scalars['Boolean']>
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  displayName: Scalars['String']
  emails: Array<Scalars['String']>
  fields: FieldInput[]
  followersCount: Scalars['Int']
  followingCount: Scalars['Int']
  lastStatusAt?: InputMaybe<Scalars['DateTime']>
  locked: Scalars['Boolean']
  name: Scalars['String']
  parentFeed?: InputMaybe<FeedIdentityInput>
  statusesCount?: InputMaybe<Scalars['Int']>
  tags: Array<Scalars['String']>
  type: FeedTypeEnum
  url: Scalars['String']
}

export interface FeedList {
  __typename?: 'FeedList'
  items: Feed[]
  paging: Paging
}

export interface FeedQueryInput {
  search?: Scalars['String']
}

export enum FeedTypeEnum {
  Account = 'account',
  Channel = 'channel'
}

export interface Field {
  __typename?: 'Field'
  name: Scalars['String']
  value: Scalars['String']
}

export interface FieldInput {
  name: Scalars['String']
  value: Scalars['String']
}

export interface GeoIp {
  __typename?: 'GeoIp'
  city_name?: Maybe<Scalars['String']>
  continent_name?: Maybe<Scalars['String']>
  country_iso_code?: Maybe<Scalars['String']>
  country_name?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
  region_iso_code?: Maybe<Scalars['String']>
  region_name?: Maybe<Scalars['String']>
}

export interface Node {
  __typename?: 'Node'
  accountFeedCount?: Maybe<Scalars['Int']>
  channelFeedCount?: Maybe<Scalars['Int']>
  domain: Scalars['String']
  foundAt: Scalars['DateTime']
  geoip?: Maybe<GeoIp>
  halfYearActiveUserCount?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  monthActiveUserCount?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  openRegistrations?: Maybe<Scalars['Boolean']>
  refreshAttemptedAt?: Maybe<Scalars['DateTime']>
  refreshedAt?: Maybe<Scalars['DateTime']>
  serverIps?: Maybe<Array<Scalars['String']>>
  softwareName?: Maybe<Scalars['String']>
  softwareVersion?: Maybe<Scalars['String']>
  standardizedSoftwareVersion?: Maybe<Scalars['String']>
  statusesCount?: Maybe<Scalars['Int']>
  totalUserCount?: Maybe<Scalars['Int']>
}

export interface NodeList {
  __typename?: 'NodeList'
  items: Node[]
  paging: Paging
}

export interface NodeQueryInput {
  search?: Scalars['String']
  sortBy?: InputMaybe<NodeSortingByEnum>
  sortWay?: InputMaybe<SortingWayEnum>
}

export enum NodeSortingByEnum {
  AccountFeedCount = 'accountFeedCount',
  Domain = 'domain',
  HalfYearActiveUserCount = 'halfYearActiveUserCount',
  MonthActiveUserCount = 'monthActiveUserCount',
  OpenRegistrations = 'openRegistrations',
  RefreshedAt = 'refreshedAt',
  SoftwareName = 'softwareName',
  StatusesCount = 'statusesCount',
  TotalUserCount = 'totalUserCount'
}

export interface NodeStats {
  __typename?: 'NodeStats'
  account: Scalars['Int']
  channel: Scalars['Int']
}

export interface Paging {
  __typename?: 'Paging'
  hasNext: Scalars['Boolean']
}

export interface PagingInput {
  page?: Scalars['Int']
}

export interface Query {
  __typename?: 'Query'
  countNodeFeeds?: Maybe<NodeStats>
  listFeeds?: Maybe<FeedList>
  listNodes?: Maybe<NodeList>
  listStats?: Maybe<StatsList>
}

export interface QueryCountNodeFeedsArgs {
  nodeDomain: Scalars['String']
}

export interface QueryListFeedsArgs {
  paging?: PagingInput
  query?: FeedQueryInput
}

export interface QueryListNodesArgs {
  paging?: PagingInput
  query?: NodeQueryInput
}

export interface QueryListStatsArgs {
  query?: StatsQueryInput
}

export interface Sorting {
  __typename?: 'Sorting'
  by: Scalars['String']
  way: SortingWayEnum
}

export enum SortingWayEnum {
  Asc = 'asc',
  Desc = 'desc'
}

export interface Stats {
  __typename?: 'Stats'
  accountFeedCount: Scalars['Int']
  channelFeedCount: Scalars['Int']
  nodeCount: Scalars['Int']
  softwareName: Scalars['String']
}

export interface StatsAggregation {
  __typename?: 'StatsAggregation'
  accountFeedCount: Scalars['Int']
  channelFeedCount: Scalars['Int']
  nodeCount: Scalars['Int']
}

export interface StatsAggregations {
  __typename?: 'StatsAggregations'
  max: StatsAggregation
  sum: StatsAggregation
}

export interface StatsList {
  __typename?: 'StatsList'
  aggregations: StatsAggregations
  items: Stats[]
}

export interface StatsQueryInput {
  sortBy?: InputMaybe<StatsSortingByEnum>
  sortWay?: InputMaybe<SortingWayEnum>
}

export enum StatsSortingByEnum {
  AccountFeedCount = 'accountFeedCount',
  ChannelFeedCount = 'channelFeedCount',
  NodeCount = 'nodeCount',
  SoftwareName = 'softwareName'
}

export interface ListFeedsItemFragment { __typename?: 'Feed', id: string, avatar?: string | null, displayName: string, foundAt: any, bot?: boolean | null, createdAt?: any | null, description: string, followersCount?: number | null, followingCount?: number | null, lastStatusAt?: any | null, locked: boolean, name: string, refreshedAt?: any | null, statusesCount?: number | null, type: FeedTypeEnum, url: string, fields: Array<{ __typename?: 'Field', name: string, value: string }>, node: { __typename?: 'Node', domain: string, foundAt: any, halfYearActiveUserCount?: number | null, id: string, monthActiveUserCount?: number | null, name?: string | null, openRegistrations?: boolean | null, refreshAttemptedAt?: any | null, refreshedAt?: any | null, softwareName?: string | null, geoip?: { __typename?: 'GeoIp', city_name?: string | null, country_iso_code?: string | null } | null }, parent?: { __typename?: 'Feed', id: string, avatar?: string | null, displayName: string, name: string, domain: string, url: string } | null }

export interface ListFeedsNodeFragment { __typename?: 'Node', domain: string, foundAt: any, halfYearActiveUserCount?: number | null, id: string, monthActiveUserCount?: number | null, name?: string | null, openRegistrations?: boolean | null, refreshAttemptedAt?: any | null, refreshedAt?: any | null, softwareName?: string | null, geoip?: { __typename?: 'GeoIp', city_name?: string | null, country_iso_code?: string | null } | null }

export interface ListNodesGeoIpFragment { __typename?: 'GeoIp', city_name?: string | null, country_iso_code?: string | null }

export interface ListNodesItemFragment { __typename?: 'Node', domain: string, foundAt: any, halfYearActiveUserCount?: number | null, id: string, monthActiveUserCount?: number | null, accountFeedCount?: number | null, name?: string | null, openRegistrations?: boolean | null, refreshAttemptedAt?: any | null, refreshedAt?: any | null, serverIps?: string[] | null, softwareName?: string | null, softwareVersion?: string | null, standardizedSoftwareVersion?: string | null, statusesCount?: number | null, totalUserCount?: number | null, geoip?: { __typename?: 'GeoIp', city_name?: string | null, country_iso_code?: string | null } | null }

export interface PagingFragment { __typename?: 'Paging', hasNext: boolean }

export interface ParentFeedFragment { __typename?: 'Feed', id: string, avatar?: string | null, displayName: string, name: string, domain: string, url: string }

export interface StatsAggregationFragment { __typename?: 'StatsAggregation', accountFeedCount: number, channelFeedCount: number, nodeCount: number }

export interface StatsAggregationsFragment { __typename?: 'StatsAggregations', sum: { __typename?: 'StatsAggregation', accountFeedCount: number, channelFeedCount: number, nodeCount: number }, max: { __typename?: 'StatsAggregation', accountFeedCount: number, channelFeedCount: number, nodeCount: number } }

export interface StatsItemFragment { __typename?: 'Stats', softwareName: string, nodeCount: number, accountFeedCount: number, channelFeedCount: number }

export type ListFeedsQueryVariables = Exact<{
  paging: PagingInput
  query: FeedQueryInput
}>

export interface ListFeedsQuery { __typename?: 'Query', listFeeds?: { __typename?: 'FeedList', paging: { __typename?: 'Paging', hasNext: boolean }, items: Array<{ __typename?: 'Feed', id: string, avatar?: string | null, displayName: string, foundAt: any, bot?: boolean | null, createdAt?: any | null, description: string, followersCount?: number | null, followingCount?: number | null, lastStatusAt?: any | null, locked: boolean, name: string, refreshedAt?: any | null, statusesCount?: number | null, type: FeedTypeEnum, url: string, fields: Array<{ __typename?: 'Field', name: string, value: string }>, node: { __typename?: 'Node', domain: string, foundAt: any, halfYearActiveUserCount?: number | null, id: string, monthActiveUserCount?: number | null, name?: string | null, openRegistrations?: boolean | null, refreshAttemptedAt?: any | null, refreshedAt?: any | null, softwareName?: string | null, geoip?: { __typename?: 'GeoIp', city_name?: string | null, country_iso_code?: string | null } | null }, parent?: { __typename?: 'Feed', id: string, avatar?: string | null, displayName: string, name: string, domain: string, url: string } | null }> } | null }

export type ListNodesQueryVariables = Exact<{
  paging: PagingInput
  query: NodeQueryInput
}>

export interface ListNodesQuery { __typename?: 'Query', listNodes?: { __typename?: 'NodeList', paging: { __typename?: 'Paging', hasNext: boolean }, items: Array<{ __typename?: 'Node', domain: string, foundAt: any, halfYearActiveUserCount?: number | null, id: string, monthActiveUserCount?: number | null, accountFeedCount?: number | null, name?: string | null, openRegistrations?: boolean | null, refreshAttemptedAt?: any | null, refreshedAt?: any | null, serverIps?: string[] | null, softwareName?: string | null, softwareVersion?: string | null, standardizedSoftwareVersion?: string | null, statusesCount?: number | null, totalUserCount?: number | null, geoip?: { __typename?: 'GeoIp', city_name?: string | null, country_iso_code?: string | null } | null }> } | null }

export type ListStatsQueryVariables = Exact<{
  query: StatsQueryInput
}>

export interface ListStatsQuery { __typename?: 'Query', listStats?: { __typename?: 'StatsList', items: Array<{ __typename?: 'Stats', softwareName: string, nodeCount: number, accountFeedCount: number, channelFeedCount: number }>, aggregations: { __typename?: 'StatsAggregations', sum: { __typename?: 'StatsAggregation', accountFeedCount: number, channelFeedCount: number, nodeCount: number }, max: { __typename?: 'StatsAggregation', accountFeedCount: number, channelFeedCount: number, nodeCount: number } } } | null }

export const ListNodesGeoIpFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'ListNodesGeoIp' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'GeoIp' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'city_name' } }, { kind: 'Field', name: { kind: 'Name', value: 'country_iso_code' } }] } }] } as unknown as DocumentNode<ListNodesGeoIpFragment, unknown>
export const ListFeedsNodeFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'ListFeedsNode' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Node' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'domain' } }, { kind: 'Field', name: { kind: 'Name', value: 'foundAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'geoip' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ListNodesGeoIp' } }] } }, { kind: 'Field', name: { kind: 'Name', value: 'halfYearActiveUserCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'id' } }, { kind: 'Field', name: { kind: 'Name', value: 'monthActiveUserCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'name' } }, { kind: 'Field', name: { kind: 'Name', value: 'openRegistrations' } }, { kind: 'Field', name: { kind: 'Name', value: 'refreshAttemptedAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'refreshedAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'softwareName' } }] } }, ...ListNodesGeoIpFragmentDoc.definitions] } as unknown as DocumentNode<ListFeedsNodeFragment, unknown>
export const ParentFeedFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'ParentFeed' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Feed' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }, { kind: 'Field', name: { kind: 'Name', value: 'avatar' } }, { kind: 'Field', name: { kind: 'Name', value: 'displayName' } }, { kind: 'Field', name: { kind: 'Name', value: 'name' } }, { kind: 'Field', name: { kind: 'Name', value: 'domain' } }, { kind: 'Field', name: { kind: 'Name', value: 'url' } }] } }] } as unknown as DocumentNode<ParentFeedFragment, unknown>
export const ListFeedsItemFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'ListFeedsItem' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Feed' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }, { kind: 'Field', name: { kind: 'Name', value: 'avatar' } }, { kind: 'Field', name: { kind: 'Name', value: 'displayName' } }, { kind: 'Field', name: { kind: 'Name', value: 'foundAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'bot' } }, { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'description' } }, { kind: 'Field', name: { kind: 'Name', value: 'displayName' } }, { kind: 'Field', name: { kind: 'Name', value: 'followersCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'followingCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'lastStatusAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'locked' } }, { kind: 'Field', name: { kind: 'Name', value: 'name' } }, { kind: 'Field', name: { kind: 'Name', value: 'refreshedAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'statusesCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'type' } }, { kind: 'Field', name: { kind: 'Name', value: 'url' } }, { kind: 'Field', name: { kind: 'Name', value: 'fields' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }, { kind: 'Field', name: { kind: 'Name', value: 'value' } }] } }, { kind: 'Field', name: { kind: 'Name', value: 'node' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ListFeedsNode' } }] } }, { kind: 'Field', name: { kind: 'Name', value: 'parent' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ParentFeed' } }] } }] } }, ...ListFeedsNodeFragmentDoc.definitions, ...ParentFeedFragmentDoc.definitions] } as unknown as DocumentNode<ListFeedsItemFragment, unknown>
export const ListNodesItemFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'ListNodesItem' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Node' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'domain' } }, { kind: 'Field', name: { kind: 'Name', value: 'foundAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'geoip' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ListNodesGeoIp' } }] } }, { kind: 'Field', name: { kind: 'Name', value: 'halfYearActiveUserCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'id' } }, { kind: 'Field', name: { kind: 'Name', value: 'monthActiveUserCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'accountFeedCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'name' } }, { kind: 'Field', name: { kind: 'Name', value: 'openRegistrations' } }, { kind: 'Field', name: { kind: 'Name', value: 'refreshAttemptedAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'refreshedAt' } }, { kind: 'Field', name: { kind: 'Name', value: 'serverIps' } }, { kind: 'Field', name: { kind: 'Name', value: 'softwareName' } }, { kind: 'Field', name: { kind: 'Name', value: 'softwareVersion' } }, { kind: 'Field', name: { kind: 'Name', value: 'standardizedSoftwareVersion' } }, { kind: 'Field', name: { kind: 'Name', value: 'statusesCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'totalUserCount' } }] } }, ...ListNodesGeoIpFragmentDoc.definitions] } as unknown as DocumentNode<ListNodesItemFragment, unknown>
export const PagingFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'Paging' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Paging' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'hasNext' } }] } }] } as unknown as DocumentNode<PagingFragment, unknown>
export const StatsAggregationFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'StatsAggregation' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'StatsAggregation' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'accountFeedCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'channelFeedCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'nodeCount' } }] } }] } as unknown as DocumentNode<StatsAggregationFragment, unknown>
export const StatsAggregationsFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'StatsAggregations' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'StatsAggregations' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'sum' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'StatsAggregation' } }] } }, { kind: 'Field', name: { kind: 'Name', value: 'max' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'StatsAggregation' } }] } }] } }, ...StatsAggregationFragmentDoc.definitions] } as unknown as DocumentNode<StatsAggregationsFragment, unknown>
export const StatsItemFragmentDoc = { kind: 'Document', definitions: [{ kind: 'FragmentDefinition', name: { kind: 'Name', value: 'StatsItem' }, typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Stats' } }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'softwareName' } }, { kind: 'Field', name: { kind: 'Name', value: 'nodeCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'accountFeedCount' } }, { kind: 'Field', name: { kind: 'Name', value: 'channelFeedCount' } }] } }] } as unknown as DocumentNode<StatsItemFragment, unknown>
export const ListFeedsDocument = { kind: 'Document', definitions: [{ kind: 'OperationDefinition', operation: 'query', name: { kind: 'Name', value: 'ListFeeds' }, variableDefinitions: [{ kind: 'VariableDefinition', variable: { kind: 'Variable', name: { kind: 'Name', value: 'paging' } }, type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PagingInput' } } } }, { kind: 'VariableDefinition', variable: { kind: 'Variable', name: { kind: 'Name', value: 'query' } }, type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'FeedQueryInput' } } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'listFeeds' }, arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'paging' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'paging' } } }, { kind: 'Argument', name: { kind: 'Name', value: 'query' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'query' } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'paging' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Paging' } }] } }, { kind: 'Field', name: { kind: 'Name', value: 'items' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ListFeedsItem' } }] } }] } }] } }, ...PagingFragmentDoc.definitions, ...ListFeedsItemFragmentDoc.definitions] } as unknown as DocumentNode<ListFeedsQuery, ListFeedsQueryVariables>
export const ListNodesDocument = { kind: 'Document', definitions: [{ kind: 'OperationDefinition', operation: 'query', name: { kind: 'Name', value: 'ListNodes' }, variableDefinitions: [{ kind: 'VariableDefinition', variable: { kind: 'Variable', name: { kind: 'Name', value: 'paging' } }, type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PagingInput' } } } }, { kind: 'VariableDefinition', variable: { kind: 'Variable', name: { kind: 'Name', value: 'query' } }, type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'NodeQueryInput' } } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'listNodes' }, arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'paging' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'paging' } } }, { kind: 'Argument', name: { kind: 'Name', value: 'query' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'query' } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'paging' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Paging' } }] } }, { kind: 'Field', name: { kind: 'Name', value: 'items' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ListNodesItem' } }] } }] } }] } }, ...PagingFragmentDoc.definitions, ...ListNodesItemFragmentDoc.definitions] } as unknown as DocumentNode<ListNodesQuery, ListNodesQueryVariables>
export const ListStatsDocument = { kind: 'Document', definitions: [{ kind: 'OperationDefinition', operation: 'query', name: { kind: 'Name', value: 'ListStats' }, variableDefinitions: [{ kind: 'VariableDefinition', variable: { kind: 'Variable', name: { kind: 'Name', value: 'query' } }, type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatsQueryInput' } } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'listStats' }, arguments: [{ kind: 'Argument', name: { kind: 'Name', value: 'query' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'query' } } }], selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'items' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'StatsItem' } }] } }, { kind: 'Field', name: { kind: 'Name', value: 'aggregations' }, selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'StatsAggregations' } }] } }] } }] } }, ...StatsItemFragmentDoc.definitions, ...StatsAggregationsFragmentDoc.definitions] } as unknown as DocumentNode<ListStatsQuery, ListStatsQueryVariables>
