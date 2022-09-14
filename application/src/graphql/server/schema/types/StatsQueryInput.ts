import { createSortingInput } from './SortingInput'
import { StatsSortingByEnum } from './StatsSortingByEnum'

export const StatsQueryInput = createSortingInput(
  'StatsQueryInput',
  StatsSortingByEnum,
  () => {},
  'nodeCount',
  'desc'
)
