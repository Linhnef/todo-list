import React from "react"

const UseAsync = <T, TData>(asyncFunction: (...data: TData[]) => Promise<T>, active: boolean = false) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<T>()
  const [error, setError] = React.useState<any>(null)

  const fetch = React.useCallback(async (...data: TData[]) => {
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

  React.useEffect(() => {
    if (active) fetch()
  }, [])

  return { loading, data, error, fetch }
}

export default UseAsync
