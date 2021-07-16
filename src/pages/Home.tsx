import { TextField, Grid, ListItem, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { MainLayout } from "../layouts/MainLayout"
import * as React from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { DialogCard } from "../components/DialogCard"
import styled from "styled-components"

const ProfileGrid = styled(Grid)`
  text-align: center;
  width: 50em;
`

const UpdateUserInformationCardTextField = styled(TextField)`
  margin-left: 2em;
`
const RequireLoginCard = styled.h2`
  text-align: center;
`

const ProfileTitle = styled(Grid)`
  text-align: center;
`
export const Home = () => {
  const { isLogin, user, updateCurrentUser, getCurrentUser } = React.useContext(AuthenticationContext)
  const [profileDialogStatus, setProfileDialogStatus] = React.useState(false)
  const [updateProfileDialogStatus, setUpdateProfileDialogStatus] = React.useState(false)
  const [name, setName] = React.useState<string | undefined>()
  const [age, setAge] = React.useState<number | undefined>()
  const [email, setEmail] = React.useState<string | undefined>()

  const nameChange = (event: any) => {
    setName(event.target.value)
  }
  const ageChange = (event: any) => {
    setAge(event.target.value)
  }
  const emailChange = (event: any) => {
    setEmail(event.target.value)
  }
  const handleProfileStatusDIalogChange = () => {
    setProfileDialogStatus(!profileDialogStatus)
  }
  const handleUpdateProfileStatusDialogChange = () => {
    setUpdateProfileDialogStatus(!updateProfileDialogStatus)
  }
  const loadProfile = async () => {
    if (isLogin) getCurrentUser()
  }
  const handleUpdateName = () => {
    updateCurrentUser({ name })
    setUpdateProfileDialogStatus(false)
    setProfileDialogStatus(true)
  }

  const handleUpdateAge = () => {
    updateCurrentUser({ age })
    setUpdateProfileDialogStatus(false)
    setProfileDialogStatus(true)
  }

  const handleUpdateEmail = () => {
    updateCurrentUser({ email: email })
    setUpdateProfileDialogStatus(false)
    setProfileDialogStatus(true)
  }
  React.useEffect(() => {
    loadProfile()
  }, [])
  return (
    <MainLayout>
      <h1>WELL COME HOME !!!</h1>
      <ButtonOutlined text="PROFILE" onclick={handleProfileStatusDIalogChange}></ButtonOutlined>
      <ButtonOutlined text="UPDATE PROFILE" onclick={handleUpdateProfileStatusDialogChange}></ButtonOutlined>
      <DialogCard open={profileDialogStatus} onClose={handleProfileStatusDIalogChange}>
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
      </DialogCard>
      <DialogCard open={updateProfileDialogStatus} onClose={handleUpdateProfileStatusDialogChange}>
        {user !== undefined ? (
          <div>
            <ProfileGrid alignItems="center" container direction="column">
              <h2>Profile</h2>
            </ProfileGrid>
            <ListItem>
              <UpdateUserInformationCardTextField
                label="Name"
                onChange={nameChange}
                defaultValue={user.name}
                value={name}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="update">
                  <ButtonOutlined onclick={handleUpdateName} text="UPDATE" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <UpdateUserInformationCardTextField
                label="Age"
                onChange={ageChange}
                defaultValue={user.age}
                value={age}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="update">
                  <ButtonOutlined onclick={handleUpdateAge} text="UPDATE" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <UpdateUserInformationCardTextField
                label="label"
                onChange={emailChange}
                defaultValue={user.email}
                value={email}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="update">
                  <ButtonOutlined onclick={handleUpdateEmail} text="UPDATE" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        ) : (
          <RequireLoginCard>Please login !!!</RequireLoginCard>
        )}
      </DialogCard>
    </MainLayout>
  )
}
