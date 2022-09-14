import { PagingInputType } from '../types/PagingInput'
import { NodeQueryInputType } from '../types/NodeQueryInput'

export type ListNodesVariables = {
    paging: PagingInputType;
    query: NodeQueryInputType
}
