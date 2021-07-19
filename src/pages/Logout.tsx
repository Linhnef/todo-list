import { Grid } from "@material-ui/core"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router"
import { useContext } from "react"
import { ButtonSecondary } from "../components/buttons/ButtonSecondary"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"

export const Logout = () => {
  const api = useAppApiClient()
  const { setToken } = useContext(AuthenticationContext)
  const history = useHistory()
  const logout = useAsync<boolean | undefined | null, {}>(api.logout)
  const handleLogout = async () => {
    const result = await logout.run()
    if (!result) return
    setToken(null)
    localStorage.clear()
    history.replace("/login")
  }

  return <ButtonSecondary onClick={handleLogout}>Logout</ButtonSecondary>
}
