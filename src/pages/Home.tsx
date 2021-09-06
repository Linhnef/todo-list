import { Grid, Dialog, Paper, Avatar } from "@material-ui/core"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { MainLayout } from "../layouts/MainLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { LogoutButton } from "../components/buttons/LogoutButton"

export const Home = () => {
  const { user, userAvatar } = useContext(AuthenticationContext)
  const [profileDialogStatus, setProfileDialogStatus] = useState(false)

  const generaDefaultAvatar = () => {
    if (!user) return "?".toUpperCase()
    const nameArray = user?.name.split(" ")
    if (nameArray?.length === 1) return nameArray[0][0].toUpperCase()
    return (nameArray[0][0] + nameArray[nameArray?.length][0]).toUpperCase()
  }
  const handleProfileStatusDIalogChange = () => {
    setProfileDialogStatus(!profileDialogStatus)
  }
  return (
    <MainLayout>
      <HomePageContent>
        <h1>TODO</h1>
        <HomePageButtonOutlined onClick={handleProfileStatusDIalogChange}>PROFILE</HomePageButtonOutlined>
        <NavLinkHomePage to="/updateUser">
          <HomePageButtonOutlined>UPDATE USER</HomePageButtonOutlined>
        </NavLinkHomePage>
        <NavLinkHomePage to="/task">
          <HomePageButtonOutlined>TASK</HomePageButtonOutlined>
        </NavLinkHomePage>
        <LogoutButton />
        <Dialog open={profileDialogStatus} onClose={handleProfileStatusDIalogChange}>
          {user ? (
            <ProfileTitle>
              <h2>Profile</h2>
              {userAvatar ? <Avatar src={userAvatar} /> : <Avatar>{generaDefaultAvatar()}</Avatar>}
              <h4>
                {user.name} : {user.age}
              </h4>
              <h4>{user.email}</h4>
            </ProfileTitle>
          ) : (
            <RequireLoginCard>Some thing wrong !!!</RequireLoginCard>
          )}
        </Dialog>
      </HomePageContent>
    </MainLayout>
  )
}

const RequireLoginCard = styled.h2`
  text-align: center;
`

const ProfileTitle = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  padding: 2em;
`
const HomePageContent = styled(Paper)`
  margin: 20% 30%;
  text-align: center;
  padding: 2em;
  z-index: 20;
`

const HomePageButtonOutlined = styled(ButtonOutlined)`
  width: 10em;
`

const NavLinkHomePage = styled(NavLink)`
  text-decoration: none;
`
