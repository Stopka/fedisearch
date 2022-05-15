import { ZodSchema } from 'zod'

export function preserveUndefined<Source, Target> (cast: (value:Source)=>Target) {
  return (value:Source|undefined):Target|undefined => {
    if (value === undefined) {
      return undefined
    }
    return cast(value)
  }
}

export function preserveNull<Source, Target> (cast: (value:Source)=>Target) {
  return (value:Source|null):Target|null => {
    if (value === null) {
      return null
    }
    return cast(value)
  }
}

export function undefinedToDefault<Type> (defaultValue:Type): (value:Type|undefined)=>Type {
  return (value) => typeof value === 'undefined' ? defaultValue : value
}

export function stringTrimmed (value: string|undefined): string {
  return (value ?? '').trim().replace(/^\++|\++$/g, '')
}

export function stringToInt (value: string): number {
  return parseInt(value)
}

export function stringToBool (value:string):boolean {
  switch (value) {
    case 'true':
    case '1':
    case 'on':
    case 'yes':
      return true
    default:
      return false
  }
}

export function transform<Target> (originalSchema:ZodSchema<any>, cast:(value:unknown)=>Target, newSchema:ZodSchema<any>) {
  return originalSchema.refine(
    value => {
      try {
        value = cast(value)
        newSchema.parse(value)
      } catch (err) {
        return false
      }
      return true
    }
  ).transform(cast)
}
