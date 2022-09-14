import { z } from 'zod'
import { createSortingInputSchema } from './SortingInput'
import { statsSortingBySchema } from './StatsSortingByEnum'

export const statsQueryInputSchema = createSortingInputSchema(statsSortingBySchema)

export type StatsQueryInputType = z.infer<typeof statsQueryInputSchema>
