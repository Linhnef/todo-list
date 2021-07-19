import { useState, createContext, ReactNode } from "react"
import { User } from "../services/api/types/User"

interface AuthenticationContextProps {
  user: User | null
  setUser: (data: User) => void
  token: string | undefined | null
  setToken: (data: string | null) => void
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({
  user: null,
  setUser: (data: User | null) => {},
  token: undefined,
  setToken: (data: string | null) => {},
})
interface AuthenticationContextProviderProps {
  children: ReactNode
}

export const AuthenticationContextProvider = (props: AuthenticationContextProviderProps) => {
  const tokenData = localStorage.getItem("token")
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(tokenData ? tokenData : null)
  token ? localStorage.setItem("token", token) : localStorage.clear()

  const contextValue: AuthenticationContextProps = {
    user: user,
    token: token,
    setUser,
    setToken,
  }
  return <AuthenticationContext.Provider value={contextValue}>{props.children}</AuthenticationContext.Provider>
}
