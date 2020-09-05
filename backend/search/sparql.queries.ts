export const formatQuery = (query: string): string => {
  return (
    '^' +
    query
      .split(' ')
      .map((w) => `(?=.*\\b${w.trim()}\\b)`)
      .join('') +
    '.*$'
  )
}

/*const generalSearchQuery = (query) => `
  SELECT DISTINCT ?subject WHERE {
    ?subject [] ?object.
    FILTER isLiteral(?object).
    FILTER regex(?object, "${formatQuery(query)}", "i")
  }
  LIMIT 100
`*/

const generalSearchQuery = (query: string) => `
SELECT DISTINCT ?subject WHERE {
    ?subject [] ?object.
    ?object bif:contains "'${query}'".
  }
  LIMIT 100
`
export default generalSearchQuery
