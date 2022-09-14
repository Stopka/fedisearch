import { inputObjectType } from 'nexus'

export const PagingInput = inputObjectType({
  name: 'PagingInput',
  definition: (t) => {
    t.nonNull.int('page', { default: 0 })
  }
})
