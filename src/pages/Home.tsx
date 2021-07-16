import { Grid, Dialog } from "@material-ui/core"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { MainLayout } from "../layouts/MainLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router"
import { useContext, useState, useEffect } from "react"
import { ButtonSecondary } from "../components/buttons/ButtonSecondary"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const RequireLoginCard = styled.h2`
  text-align: center;
`

const ProfileTitle = styled(Grid)`
  text-align: center;
`

export const Home = () => {
  const { isLogin, user, getCurrentUser, logout } = useContext(AuthenticationContext)
  const [profileDialogStatus, setProfileDialogStatus] = useState(false)
  const history = useHistory()
  const handleLogout = async () => {
    if (isLogin) {
      logout()
      history.push("/login")
    }
  }

  const handleProfileStatusDIalogChange = () => {
    setProfileDialogStatus(!profileDialogStatus)
  }
  const loadProfile = async () => {
    if (isLogin) getCurrentUser()
  }
  useEffect(() => {
    loadProfile()
  }, [])
  return (
    <MainLayout>
      <h1>WELL COME HOME !!!</h1>
      <ButtonOutlined text="PROFILE" onclick={handleProfileStatusDIalogChange}></ButtonOutlined>
      <NavLink to="/updateUser">Update User</NavLink>
      <NavLink to='/task'>Task list</NavLink>
      <ButtonSecondary logout={handleLogout}></ButtonSecondary>
      <Dialog open={profileDialogStatus} onClose={handleProfileStatusDIalogChange}>
        {user !== undefined ? (
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
