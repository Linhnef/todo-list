import { parse, stringify } from "query-string"
import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"

const useQuery = <TQuery>(initialQuery: TQuery) => {
  const history = useHistory()
  const queryString = useLocation().search
  const [query, setQuery] = useState<TQuery>(initialQuery)
  const patchQuery = (updateQuery: TQuery) => {
    history.push({ search: stringify(updateQuery) })
  }
  useEffect(() => {
    const queryParams = parse(queryString) as unknown as TQuery
    setQuery(queryParams)
  }, [queryString])
  return { query, patchQuery }
}

export default useQuery
