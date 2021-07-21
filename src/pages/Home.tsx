import { Grid, Dialog } from "@material-ui/core"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { MainLayout } from "../layouts/MainLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { LogoutButton } from "./LogoutButton"

export const Home = () => {
  const { user } = useContext(AuthenticationContext)
  const [profileDialogStatus, setProfileDialogStatus] = useState(false)

  const handleProfileStatusDIalogChange = () => {
    setProfileDialogStatus(!profileDialogStatus)
  }
  return (
    <MainLayout>
      <h1>WELL COME HOME !!!</h1>
      <ButtonOutlined onClick={handleProfileStatusDIalogChange}>PROFILE</ButtonOutlined>
      <NavLink to="/updateUser">Update User</NavLink>
      <NavLink to="/task">Task</NavLink>
      <LogoutButton />
      <Dialog open={profileDialogStatus} onClose={handleProfileStatusDIalogChange}>
        {user ? (
          <ProfileTitle>
            <h2>Profile</h2>
            <h4>
              {user.name} : {user.age}
            </h4>
            <h4>{user.email}</h4>
          </ProfileTitle>
        ) : (
          <RequireLoginCard>Some thing wrong !!!</RequireLoginCard>
        )}
      </Dialog>
    </MainLayout>
  )
}

const RequireLoginCard = styled.h2`
  text-align: center;
`

const ProfileTitle = styled(Grid)`
  text-align: center;
`
