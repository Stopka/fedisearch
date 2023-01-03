import { InputMaybe, Scalars, SortingWayEnum } from '../graphql/generated/types.js'

export interface Sort {
  sortBy?: InputMaybe<Scalars['String']>
  sortWay?: InputMaybe<SortingWayEnum>
}
