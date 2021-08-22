import { useEffect } from "react"
import { useState, createContext, ReactNode } from "react"
import { Task } from "../services/api/types/Task"

interface TaskContextProps {
  tasks: Task[] | null | undefined
  setTasks: (tasks: Task[]) => void
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: null,
  setTasks: (data: Task[]) => {},
})
interface TaskContextProviderProps {
  children: ReactNode
}

export const TaskContextProvider = (props: TaskContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[] | null>(null)

  const contextValue: TaskContextProps = {
    tasks,
    setTasks,
  }
  return <TaskContext.Provider value={contextValue}>{props.children}</TaskContext.Provider>
}
