import axios, { AxiosInstance } from "axios"

export type CreateApiClientArgs = {
  baseURL?: string
}

function getLocalToken() {
  const token = window.localStorage.getItem("token")
  return token
}

export const createApiClient = (args: CreateApiClientArgs): AxiosInstance => {
  const { baseURL } = args
  const api = axios.create({
    baseURL,
  })

  api.interceptors.request.use((config) => {
    let token = getLocalToken()
    config.headers = Object.assign(
      {
        Authorization: `Bearer ${token}`,
      },
      config.headers
    )
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response ? error.response.status : null
      if (status) {
        localStorage.clear()
        window.location.href = "/login"
      }
      return Promise.reject(error)
    }
  )

  return api
}
