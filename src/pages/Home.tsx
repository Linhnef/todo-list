import { Grid, Dialog } from "@material-ui/core"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { MainLayout } from "../layouts/MainLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router"
import { useContext, useState, useEffect } from "react"
import { ButtonSecondary } from "../components/buttons/ButtonSecondary"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { UseAppApiClient } from "../hooks/useAppApiClient"
import UseAsync from "../hooks/useAsync"
import { User } from "../services/api/types/User"

const RequireLoginCard = styled.h2`
  text-align: center;
`

const ProfileTitle = styled(Grid)`
  text-align: center;
`

export const Home = () => {
  const api = UseAppApiClient()
  const { user,setToken } = useContext(AuthenticationContext)
  const [profileDialogStatus, setProfileDialogStatus] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()
  const useLogout = UseAsync<boolean | undefined, {}>(api.logout)
  const handleLogout = async () => {
    useLogout.fetch()
  }

  const handleProfileStatusDIalogChange = () => {
    setProfileDialogStatus(!profileDialogStatus)
  }

  useEffect(() => {
    const { data, error } = useLogout
    setError(error)
    if (data) {
      setToken(undefined)
      localStorage.clear()
      history.replace("/login")
    }
  }, [useLogout.loading])
  return (
    <MainLayout>
      <h1>WELL COME HOME !!!</h1>
      <ButtonOutlined onClick={handleProfileStatusDIalogChange}>PROFILE</ButtonOutlined>
      <NavLink to="/updateUser">Update User</NavLink>
      <ButtonSecondary onClick={handleLogout}>Logout</ButtonSecondary>
      <Dialog open={profileDialogStatus} onClose={handleProfileStatusDIalogChange}>
        {error === null ? (
          <ProfileTitle>
            <h2>Profile</h2>
            <h4>
              {user.name} : {user.age}
            </h4>
            <h4>{user.email}</h4>
          </ProfileTitle>
        ) : (
          <RequireLoginCard>Please login !!!</RequireLoginCard>
        )}
      </Dialog>
    </MainLayout>
  )
}
