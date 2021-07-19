import { useState, createContext } from "react"
import { User } from "../services/api/types/User"

interface ContextProps {
  user: User
  setUser: (data: User) => void
  token: string | undefined | null
  setToken: (data: string | undefined | null) => void
}

const initialUser = {
  age: 0,
  email: "",
  name: "",
  password: "",
}

export const AuthenticationContext = createContext<ContextProps>({
  user: initialUser,
  setUser: (data: User) => {},
  token: undefined,
  setToken: (data: string | undefined | null) => {},
})

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token")
  return {
    token: storedToken,
  }
}
interface autheChildren {
  children: any
}

export const AuthenticationContextProvider = (props: autheChildren) => {
  const tokenData = retrieveStoredToken()
  let initialToken
  if (tokenData) {
    initialToken = tokenData.token
  }
  const [user, setUser] = useState<User>(initialUser)
  const [token, setToken] = useState<string | undefined | null>(initialToken)
  token ? localStorage.setItem("token", token) : localStorage.clear()

  const handleSetUser = (data: User) => {
    setUser(data)
  }

  const handleSetToken = (data: string | undefined | null) => {
    setToken(data)
  }

  const contextValue: ContextProps = {
    user: user,
    token: token,
    setUser: handleSetUser,
    setToken: handleSetToken,
  }
  return <AuthenticationContext.Provider value={contextValue}>{props.children}</AuthenticationContext.Provider>
}
