import { useState, createContext, ReactNode } from "react"
import { Task } from "../services/api/types/Task"

interface TaskContextProps {
  tasks: Task[] | null | undefined
  setTasks: (tasks: Task[]) => void
  currentTask: Task | null | undefined
  setCurrentTask: (tasks: Task) => void
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: null,
  setTasks: (data: Task[]) => {},
  currentTask: null,
  setCurrentTask: (tasks: Task) => {},
})
interface TaskContextProviderProps {
  children: ReactNode
}

export const TaskContextProvider = (props: TaskContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)

  const contextValue: TaskContextProps = {
    tasks,
    setTasks,
    currentTask,
    setCurrentTask,
  }
  return <TaskContext.Provider value={contextValue}>{props.children}</TaskContext.Provider>
}
