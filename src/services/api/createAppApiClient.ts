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
    getTaskById: getTaskById(api),
    UpdateTaskById: UpdateTaskById(api),
    DeleteById: DeleteById(api),
    UploadImage: UploadImage(api),
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

export type AddTaskRequest = {
  description: string
}

type AddTaskResponse = {
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

type GetTaskByIdResponse = {
  success: boolean
  data: Task
}

export type GetTaskByIdRequest = {
  id: string
}

const getTaskById =
  (api: AxiosInstance) =>
  async (data: GetTaskByIdRequest): Promise<Task | undefined | null> => {
    try {
      const res = await api.get<GetTaskByIdResponse>("/task/" + data.id)
      return res.data.data
    } catch (err) {}
  }

type GetAllTaskResponse = {
  count: number
  data: Task[]
}

export type GetTaskRequest = {
  params?: {
    completed?: boolean
    limit?: number
    skip?: number
  }
}

const getTask =
  (api: AxiosInstance) =>
  async (data: GetTaskRequest): Promise<Task[] | undefined | null> => {
    try {
      const res = await api.get<GetAllTaskResponse>("/task", {
        data,
      })
      return res.data.data
    } catch (err) {}
  }

export type UpdateTaskByIdRequest = {
  _id: string
  data: {
    completed?: boolean
    description?: string
  }
}

type UpdateTaskByIdResponse = {
  success: boolean
  data: Task
}

const UpdateTaskById =
  (api: AxiosInstance) =>
  async (data: UpdateTaskByIdRequest): Promise<Task | undefined | null> => {
    try {
      const res = await api.put<UpdateTaskByIdResponse>("/task/" + data._id, data.data)
      return res.data.data
    } catch (err) {}
  }

export type DeleteTaskByIdRequest = {
  _id: string
}

type DeleteTaskByIdResponse = {
  success: boolean
  data: Task
}

const DeleteById =
  (api: AxiosInstance) =>
  async (data: DeleteTaskByIdRequest): Promise<boolean | undefined | null> => {
    try {
      const res = await api.delete<DeleteTaskByIdResponse>("/task/" + data._id)
      return res.data.success
    } catch (err) {}
  }

type UploadResponse = {
  success: boolean
}

export type UploadImageRequest = {
  avatar: File
}
const UploadImage =
  (api: AxiosInstance) =>
  async (data: UploadImageRequest): Promise<boolean | undefined | null> => {
    try {
      const res = await api.delete<UploadResponse>("/user/me/avatar")
      return res.data.success
    } catch (err) {}
  }
