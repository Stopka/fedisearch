export default function prepareSimpleQuery (search: string): string {
  const tokens = search.split(/\s+/)
  const searchContainsWildcard = tokens.filter(token => token.length > 0 && token.slice(-1) === '*').length > 0
  return tokens.map(token => searchContainsWildcard ? token : token + '*').join(' ')
}
