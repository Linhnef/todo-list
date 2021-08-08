import * as queryString from "query-string"

import { useEffect, useState } from "react"

const useQuery = () => {
  const { parse, stringify } = queryString
  const [query, setQuery] = useState<any>()
  const queryUrl = window.location.search
  const patchQuery = (objs: object) => {
    window.location.search = stringify(objs)
  }
  useEffect(() => {
    const queryParams = parse(queryUrl)
    setQuery(queryParams)
  }, [])
  return { query, patchQuery }
}

export default useQuery
