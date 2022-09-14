import { z } from 'zod'
import { stringTrimmed, transform } from '../../../lib/transform'

export const feedQueryInputSchema = z.object({
  search: transform(
    z.string().optional(),
    stringTrimmed,
    z.string()
  )
})

export type FeedQueryInputType = z.infer<typeof feedQueryInputSchema>
