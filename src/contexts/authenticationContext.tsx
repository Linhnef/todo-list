import { useState, createContext, ReactNode } from "react"
import { Task } from "../services/api/types/Task"
import { User } from "../services/api/types/User"

interface AuthenticationContextProps {
  user: User | null | undefined
  setUser: (data: User) => void
  token: string | undefined | null
  setToken: (data: string | null) => void
  tasks: Task[] | null | undefined
  setTasks: (tasks: Task[]) => void
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({
  user: null,
  setUser: (data: User | null) => {},
  token: null,
  setToken: (data: string | null) => {},
  tasks: null,
  setTasks: (data: Task[]) => {},
})
interface AuthenticationContextProviderProps {
  children: ReactNode
}

export const AuthenticationContextProvider = (props: AuthenticationContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[] | null>(null)
  token ? localStorage.setItem("token", token) : localStorage.clear()

  const contextValue: AuthenticationContextProps = {
    user: user,
    token: token,
    tasks: tasks,
    setUser,
    setToken,
    setTasks,
  }
  return <AuthenticationContext.Provider value={contextValue}>{props.children}</AuthenticationContext.Provider>
}
