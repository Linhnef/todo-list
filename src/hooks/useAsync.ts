import { useState, useEffect, useCallback } from "react"

const useAsync = <T, TData>(asyncFunction: (...data: TData[]) => Promise<T>, active: boolean = false) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>(null)

  const run = useCallback(async (...data: TData[]) => {
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
    if (active) run()
  }, [])

  return { loading, data, error, run }
}

export default useAsync
