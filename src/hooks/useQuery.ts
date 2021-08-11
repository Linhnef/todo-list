import { parse, stringify } from "query-string"
import { useHistory, useLocation } from "react-router"

const useQuery = <TQuery>(initialQuery: TQuery) => {
  const history = useHistory()
  const queryString = useLocation().search
  const query = { ...initialQuery, ...parse(queryString) }
  const patchQuery = (updatedQuery: TQuery) => {
    history.push({ search: stringify(updatedQuery) })
  }
  return { query, patchQuery }
}

export default useQuery
