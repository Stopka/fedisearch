import { FeedQueryInputType } from '../types/FeedQueryInput'
import { PagingInputType } from '../types/PagingInput'

export type ListFeedsVariables = {
    paging: PagingInputType;
    query: FeedQueryInputType
}
