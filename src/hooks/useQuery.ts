import * as queryString from "query-string"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"

const useQuery = () => {
  const history = useHistory()
  const { parse, stringify } = queryString
  const [query, setQuery] = useState<any>()
  const queryUrl = window.location.search
  const patchQuery = (objs: object) => {
    history.push(window.location.pathname + `?${stringify(objs)}`)
  }
  useEffect(() => {
    const queryParams = parse(queryUrl)
    setQuery(queryParams)
  }, [])
  return { query, patchQuery }
}

export default useQuery
