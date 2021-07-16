import { TextField, Grid, ListItem, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import * as React from "react"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useContext,useState,useEffect } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router"
import styled from "styled-components"

const ProfileGrid = styled(Grid)`
  text-align: center;
  width: 50em;
`

const UpdateUserInformationCardTextField = styled(TextField)`
  margin-left: 2em;
`
export const UpdateUser = () => {
  const history = useHistory()
  const { user, isLogin, getCurrentUser, updateCurrentUser } = useContext(AuthenticationContext)
  const [name, setName] = useState<string | undefined>()
  const [age, setAge] = useState<number | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const nameChange = (event: any) => {
    setName(event.target.value)
  }
  const ageChange = (event: any) => {
    setAge(event.target.value)
  }
  const emailChange = (event: any) => {
    setEmail(event.target.value)
  }

  const loadProfile = async () => {
    if (isLogin) getCurrentUser()
  }
  useEffect(() => {
    loadProfile()
  }, [])
  const handleUpdateName = () => {
    updateCurrentUser({ name })
    history.replace("/")
  }

  const handleUpdateAge = () => {
    updateCurrentUser({ age })
    history.replace("/")
  }

  const handleUpdateEmail = () => {
    updateCurrentUser({ email: email })
    history.replace("/")
  }
  return (
    <React.Fragment>
      {user ? (
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
            <UpdateUserInformationCardTextField label="Age" onChange={ageChange} defaultValue={user.age} value={age} />
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
        <h1>Error</h1>
      )}
    </React.Fragment>
  )
}
