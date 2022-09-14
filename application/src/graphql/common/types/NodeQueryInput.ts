import { stringTrimmed, transform } from '../../../lib/transform'
import { z } from 'zod'
import { createSortingInputSchema } from './SortingInput'
import { nodeSortingBySchema } from './NodeSortingByEnum'

export const nodeQueryInputSchema = createSortingInputSchema(nodeSortingBySchema)
  .extend(
    {
      search: transform(
        z.string().optional(),
        stringTrimmed,
        z.string()
      )
    }
  )

export type NodeQueryInputType = z.infer<typeof nodeQueryInputSchema>
