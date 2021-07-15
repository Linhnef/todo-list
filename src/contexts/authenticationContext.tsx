import * as React from "react"
import UseAsync from "../hooks/useAsync"
import { UseAppApiClient } from "../hooks/useAppApiClient"
import { LoginRequest, RegisterRequest } from "../services/api/createAppApiClient"
import { useEffect } from "react"
import { User } from "../services/api/types/User"

interface ContextProps {
  user: User | undefined
  token: string | undefined | null
  isLogin: boolean
  loading: boolean
  error: string | null
  login: (data: LoginRequest) => void
  register: (data: RegisterRequest) => void
  logout: () => void
  getCurrentUser : () => void
}

export const AuthenticationContext = React.createContext<ContextProps>({
  user: undefined,
  token: undefined,
  loading: false,
  error: null,
  isLogin: false,
  login: (data: LoginRequest) => {},
  register: (data: RegisterRequest) => {},
  logout: () => {},
  getCurrentUser: () => {}
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
  const api = UseAppApiClient()
  const tokenData = retrieveStoredToken()
  let initialToken
  if (tokenData) {
    initialToken = tokenData.token
  }
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [token, setToken] = React.useState(initialToken)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setErorr] = React.useState<string | null>(null)
  const userIsLoggedIn = !!token
  const useLogin = UseAsync<string | undefined, LoginRequest>(api.login)
  const useRegister = UseAsync<string | undefined, RegisterRequest>(api.register)
  const useLogout = UseAsync<boolean | undefined, {}>(api.logout)
  const useGetCurrentUser = UseAsync<User | undefined, {}>(api.getCurrentUser)
  const loginHandler = (loginRequest: LoginRequest) => {
    useLogin.fetch(loginRequest)
  }

  const registerHanler = (registerRequest: RegisterRequest) => {
    useRegister.fetch(registerRequest)
  }

  const logoutHanlder = () => {
    useLogout.fetch()
  }

  const getCurrentUserHandler = () => {
    useGetCurrentUser.fetch();
  }

  React.useEffect(() => {
    const { data, error, loading } = useLogin
    setLoading(loading)
    setToken(data)
    setErorr(error)
    data && localStorage.setItem("token", data)
  }, [useLogin.loading])

  useEffect(() => {
    const { data, error, loading } = useRegister
    setLoading(loading)
    setToken(data)
    setErorr(error)
    data && localStorage.setItem("token", data)
  }, [useRegister.loading])

  useEffect(() => {
    const { data, error, loading } = useLogout
    setLoading(loading)
    setToken(null)
    setErorr(error)
    data && localStorage.clear()
  }, [useLogout.loading])

  useEffect(() => {
    const { data, error, loading } = useGetCurrentUser
    setLoading(loading)
    setUser(data)
    setErorr(error)
    data && localStorage.clear()
  },[useGetCurrentUser.loading])


  const contextValue: ContextProps = {
    user : user,
    token: token,
    loading: loading,
    isLogin: userIsLoggedIn,
    error: error,
    login: loginHandler,
    logout: logoutHanlder,
    register: registerHanler,
    getCurrentUser : getCurrentUserHandler
  }
  return <AuthenticationContext.Provider value={contextValue}>{props.children}</AuthenticationContext.Provider>
}
