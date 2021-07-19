import { useState, useEffect, useCallback } from "react"

const UseAsync = <T, TData>(asyncFunction: (...data: TData[]) => Promise<T>, active: boolean = false) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<T>()
  const [error, setError] = useState<any>(null)

  const fetch = useCallback(async (...data: TData[]) => {
    setLoading(true)
    setError(null)
    try {
      const response = await asyncFunction(...data)
      setData(response)
      setLoading(false)
      return response
    } catch (err) {
      setError(err)
      setLoading(false)
      return error
    }
  }, [])

  useEffect(() => {
    if (active) fetch()
  }, [])

  return { loading, data, error, fetch }
}

export default UseAsync
