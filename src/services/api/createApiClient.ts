import axios, { AxiosInstance } from "axios"

export type CreateApiClientArgs = {
  baseURL?: string
}

function getLocalToken() {
  const token = window.localStorage.getItem('token')
  return token
}

export const createApiClient = (args: CreateApiClientArgs): AxiosInstance => {
  const { baseURL } = args
  const api = axios.create({
    baseURL,
    headers:{
      'Authorization' : `Bearer ${getLocalToken()}`,
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
     }
  })

  return api
}
