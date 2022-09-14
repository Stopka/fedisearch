import { scalarType } from 'nexus'
import { Kind } from 'graphql/language'

export const DateTime = scalarType({
  name: 'DateTime',
  asNexusMethod: 'dateTime',
  serialize: (value: unknown): string | null => {
    if (typeof value === 'number' || typeof value === 'string') {
      return (new Date(value)).toISOString()
    }
    if (value instanceof Date) {
      return value.toISOString()
    }
    throw new TypeError(
      'DateTime cannot be serialized from a non string, ' +
      'non numeric or non Date type ' + JSON.stringify(value)
    )
  },
  parseValue: (value: unknown): Date => {
    if (typeof value !== 'string') {
      throw new TypeError(
        `DateTime cannot represent non string type ${JSON.stringify(value)}`
      )
    }
    return new Date(value)
  },
  parseLiteral: (ast): Date => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `DateTime cannot represent non string type ${JSON.stringify(ast)}`
      )
    }
    const { value } = ast
    return new Date(value)
  }
})
