function createSearchString (object: object): string {
  const parts: string[] = []
  for (const key in object) {
    const value = object[key]
    switch (typeof value) {
      case 'string':
      case 'number':
        parts.push(`${key}=${value}`)
        break
      case 'object':
        parts.push(createSearchString(value))
    }
  }
  return parts.join('&')
}

export default function createUrlSearchParams (object: object): URLSearchParams {
  return new URLSearchParams(createSearchString(object))
}
