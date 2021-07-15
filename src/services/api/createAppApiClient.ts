import { AxiosInstance } from "axios"
import { User } from "./types/User"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    logout: logout(api),
    getCurrentUser: getCurrentUser(api),
    setToken : setToken(api)
  }
}

const setToken =
  (api: AxiosInstance) =>
  async (token : string) => {
    api.defaults.headers.common["Content-Type"] = "application/json";
    api.defaults.headers.common["Accept"] = "application/json";
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

type LoginResponse = {
  token: string
  user: User
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
  age: number
}

const register =
  (api: AxiosInstance) =>
  async (data: RegisterRequest): Promise<string | undefined> => {
    try {
      const res = await api.post<LoginResponse>("/user/register", data)
      return res.data.token
    } catch (err) {
      return err
    }
  }

export type LoginRequest = {
  email: string
  password: string
}

const login =
  (api: AxiosInstance) =>
  async (data: LoginRequest): Promise<string | undefined> => {
    try {
      const res = await api.post<LoginResponse>("/user/login", data)
      return res.data.token
    } catch (err) {
      return err
    }
  }

type LogoutResponse = {
  success: boolean
}

const logout = (api: AxiosInstance) => async (): Promise<boolean | undefined> => {
  try {
    const res = await api.post<LogoutResponse>("/user/logout")
    return res.data.success
  } catch (err) {
    return err
  }
}

const getCurrentUser = (api: AxiosInstance) => async (): Promise<User | undefined> => {
  try {
    const res = await api.get<User>("/user/me")
    return res.data
  } catch (err) {
    return err
  }
}

const updateProfile = (api: AxiosInstance) => async (): Promise<User | undefined> => {
  try {
    const res = await api.put<User>("/user/me")
    return res.data
  } catch (err) {
    return err
  }
}
