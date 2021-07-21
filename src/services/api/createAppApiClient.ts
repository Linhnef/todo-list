import { AxiosInstance } from "axios"
import { User } from "./types/User"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    logout: logout(api),
    getCurrentUser: getCurrentUser(api),
    updateCurrentUser: updateCurrentUser(api),
  }
}

export type LoginResponse = {
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
  async (data: RegisterRequest): Promise<LoginResponse | undefined | null> => {
    try {
      const res = await api.post<LoginResponse>("/user/register", data)
      return res.data
    } catch (err) {
      return null
    }
  }

export type LoginRequest = {
  email: string
  password: string
}

const login =
  (api: AxiosInstance) =>
  async (data: LoginRequest): Promise<LoginResponse | undefined | null> => {
    try {
      const res = await api.post<LoginResponse>("/user/login", data)
      return res.data
    } catch (err) {
      return null
    }
  }

type LogoutResponse = {
  success: boolean
}

const logout = (api: AxiosInstance) => async (): Promise<boolean | undefined | null> => {
  try {
    const res = await api.post<LogoutResponse>("/user/logout")
    return res.data.success
  } catch (err) {
    return null
  }
}

const getCurrentUser = (api: AxiosInstance) => async (): Promise<User | undefined | null> => {
  try {
    const res = await api.get<User>("/user/me")
    return res.data
  } catch (err) {
    return null
  }
}

export type UpdateCurrentUserRequest = {
  name?: string
  email?: string
  age?: number
}
export type UpdateCurrentUserResponse = {
  success: boolean
  data: User
}

const updateCurrentUser =
  (api: AxiosInstance) =>
  async (data: UpdateCurrentUserRequest): Promise<UpdateCurrentUserResponse | undefined | null> => {
    try {
      const res = await api.put<UpdateCurrentUserResponse>("/user/me", data)
      return res.data
    } catch (err) {
      return null
    }
  }
