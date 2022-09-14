import { objectType } from 'nexus'

export const Field = objectType({
  name: 'Field',
  definition: (t) => {
    t.nonNull.string('name')
    t.nonNull.string('value')
  }
})
