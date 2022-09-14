import { createSortingInput } from './SortingInput'
import { NodeSortingByEnum } from './NodeSortingByEnum'

export const NodeQueryInput = createSortingInput('NodeQueryInput', NodeSortingByEnum, (t) => {
  t.nonNull.string('search', { default: '' })
}, 'refreshedAt', 'desc')
