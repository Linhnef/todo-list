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
    getTasks: getTasks(api),
    deleteTaskById: deleteTaskById(api),
    updateTaskById: updateTaskById(api),
    uploadImage: uploadImage(api),
    getUserImage: getUserImage(api),
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
  completed?: boolean
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

const getTasks =
  (api: AxiosInstance) =>
  async (data: GetTaskRequest): Promise<Task[] | undefined | null> => {
    try {
      const res = await api.get<GetTaskResponse>("/task", {
        params: data,
      })
      return res.data.data
    } catch (err) {}
  }

export type DeleteTaskByIdResponse = {
  success: boolean
  data: Task
}

const deleteTaskById =
  (api: AxiosInstance) =>
  async (id: string): Promise<DeleteTaskByIdResponse | undefined | null> => {
    try {
      const res = await api.delete<DeleteTaskByIdResponse>(`/task/${id}`)
      return res.data
    } catch (err) {}
  }
export type UpdateTaskByIdRequest = {
  _id: string
  data: {
    completed?: boolean
    description?: string
  }
}

export type UpdateTaskByIdResponse = {
  success: boolean
  data: Task
}

const updateTaskById =
  (api: AxiosInstance) =>
  async (data: UpdateTaskByIdRequest): Promise<UpdateTaskByIdResponse | undefined | null> => {
    try {
      const res = await api.put<UpdateTaskByIdResponse>(`/task/${data._id}`, data.data)
      return res.data
    } catch (err) {}
  }

type UploadImageResponse = {
  success: boolean
}
const uploadImage =
  (api: AxiosInstance) =>
  async (data: FormData): Promise<boolean | undefined | null> => {
    try {
      const res = await api.post<UploadImageResponse>("/user/me/avatar", data)

      return res.data.success
    } catch (error) {}
  }

const getUserImage =
  (api: AxiosInstance) =>
  async (id: string): Promise<string | undefined> => {
    try {
      const res = await api.get<string>(`/user/${id}/avatar`)

      return res.request.responseURL
    } catch (error) {}
  }
