import { useState, createContext, ReactNode } from "react"
import { User } from "../services/api/types/User"

interface AuthenticationContextProps {
  userAvatar: string | null | undefined
  user: User | null | undefined
  setUser: (data: User) => void
  token: string | undefined | null
  setToken: (data: string | null) => void
  setUserAvatar: (data: string) => void
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({
  userAvatar: null,
  user: null,
  setUser: (data: User | null) => {},
  token: null,
  setToken: (data: string | null) => {},
  setUserAvatar: (data: string) => {},
})
interface AuthenticationContextProviderProps {
  children: ReactNode
}

export const AuthenticationContextProvider = (props: AuthenticationContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  token ? localStorage.setItem("token", token) : localStorage.clear()

  const contextValue: AuthenticationContextProps = {
    user: user,
    token: token,
    setUser,
    setToken,
    userAvatar,
    setUserAvatar,
  }
  return <AuthenticationContext.Provider value={contextValue}>{props.children}</AuthenticationContext.Provider>
}
