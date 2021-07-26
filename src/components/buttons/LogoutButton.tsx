import { AuthenticationContext } from "../../contexts/authenticationContext"
import { useHistory } from "react-router"
import { useContext } from "react"
import { ButtonSecondary } from "./ButtonSecondary"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import useAsync from "../..//hooks/useAsync"

export const LogoutButton = () => {
  const api = useAppApiClient()
  const { setToken } = useContext(AuthenticationContext)
  const history = useHistory()
  const logout = useAsync<void | undefined | null, {}>(async () => {
    const result = await api.logout()
    if (!result) return
    setToken(null)
    localStorage.clear()
    history.replace("/login")
  })

  return <ButtonSecondary onClick={() => logout.run()}>Logout</ButtonSecondary>
}
