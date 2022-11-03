import { FeedQueryInputType } from '../types/FeedQueryInput'
import { PagingInputType } from '../types/PagingInput'

export interface ListFeedsVariables {
  paging: PagingInputType
  query: FeedQueryInputType
}
