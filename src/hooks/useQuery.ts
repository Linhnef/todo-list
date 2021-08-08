import { parse, stringify } from "query-string"
import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"

const useQuery = <TQuery>(initialQuery: TQuery) => {
  const history = useHistory()
  const queryString = useLocation().search
  const [query, setQuery] = useState<TQuery | any>(initialQuery)
  const patchQuery = (obj: TQuery) => {
    history.push({ search: stringify(obj) })
  }
  useEffect(() => {
    const queryParams = parse(queryString)
    setQuery(queryParams)
  }, [queryString])
  return { query, patchQuery }
}

export default useQuery
