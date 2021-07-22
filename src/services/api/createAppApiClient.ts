import { AxiosInstance } from "axios"
import { User } from "./types/User"
import { Task } from "./types/Task"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    logout: logout(api),
    getCurrentUser: getCurrentUser(api),
    updateCurrentUser: updateCurrentUser(api),
    addTask: addTask(api),
    getTask: getTask(api),
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
    } catch (err) {}
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
    } catch (err) {}
  }

type LogoutResponse = {
  success: boolean
}

const logout = (api: AxiosInstance) => async (): Promise<boolean | undefined | null> => {
  try {
    const res = await api.post<LogoutResponse>("/user/logout")
    return res.data.success
  } catch (err) {}
}

const getCurrentUser = (api: AxiosInstance) => async (): Promise<User | undefined | null> => {
  try {
    const res = await api.get<User>("/user/me")
    return res.data
  } catch (err) {}
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
    } catch (err) {}
  }

export type AddTaskRequest = {
  description: string
}

export type AddTaskResponse = {
  success: boolean
  data: Task
}

const addTask =
  (api: AxiosInstance) =>
  async (data: AddTaskRequest): Promise<boolean | undefined | null> => {
    try {
      const res = await api.post<AddTaskResponse>("/task", data)
      return res.data.success
    } catch (err) {}
  }

export type GetTaskResponse = {
  count: number
  data: Task[]
}

export type GetTaskRequest = {
  completed?: boolean
  limit?: number
  skip?: number
}

const getTask =
  (api: AxiosInstance) =>
  async (data: GetTaskRequest): Promise<GetTaskResponse | undefined | null> => {
    try {
      const res = await api.get<GetTaskResponse>("/task", {
        params: {
          completed: data.completed,
          limit: data.limit,
          skip: data.skip,
        },
      })
      return res.data
    } catch (err) {}
  }
