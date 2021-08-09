import { parse, stringify } from "query-string"
import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"

const useQuery = <TQuery>(initialQuery: TQuery) => {
  const history = useHistory()
  const queryString = useLocation().search
  const queryParams = parse(queryString) as unknown as TQuery
  const [query, setQuery] = useState<TQuery>(initialQuery)
  const patchQuery = (updatedQuery: TQuery) => {
    history.push({ search: stringify(updatedQuery) })
  }
  if(query !== queryParams){
    setQuery(queryParams)
  }
  return { query, patchQuery }
}

export default useQuery
