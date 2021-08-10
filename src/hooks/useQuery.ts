import { parse, stringify } from "query-string"
import { useHistory, useLocation } from "react-router"

const useQuery = <TQuery>(initialQuery: TQuery) => {
  const history = useHistory()
  const queryString = useLocation().search
  const query = parse(queryString) as unknown as TQuery ? parse(queryString) as unknown as TQuery  : initialQuery 
  const patchQuery = (updatedQuery: TQuery) => {
    history.push({ search: stringify(updatedQuery) })
  }
  return { query, patchQuery }
}

export default useQuery
