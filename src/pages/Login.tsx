import { useHistory } from "react-router-dom"
import { LoginForm } from "../components/LoginForm"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useContext } from "react"

export const Login = () => {
  const history = useHistory()
  const { login } = useContext(AuthenticationContext)
  const handleLogin = async (email: string, password: string) => {
    const response = login({ email: email, password: password })
    if (response.data !== undefined) {
      localStorage.setItem("TOKEN", response.data);
    }
    history.push("/")
  }
  return (
    <EmptyLayout>
      <LoginForm signin={handleLogin}></LoginForm>
    </EmptyLayout>
  )
}
