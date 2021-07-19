import { TextField, Grid, ListItem, ListItemSecondaryAction, IconButton, Typography } from "@material-ui/core"
import * as React from "react"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useContext, useState, useEffect } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router"
import { propsChange } from "../hooks/useInput"
import styled from "styled-components"
import { UpdateCurrentUserRequest } from "../services/api/createAppApiClient"
import { UseAppApiClient } from "../hooks/useAppApiClient"
import UseAsync from "../hooks/useAsync"
import { User } from "../services/api/types/User"

export const UpdateUser = () => {
  const history = useHistory()
  const api = UseAppApiClient()
  const { user, setUser } = useContext(AuthenticationContext)
  const [name, setName] = useState<string | undefined>()
  const [age, setAge] = useState<number | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const useUpdateUser = UseAsync<User | undefined, UpdateCurrentUserRequest>(api.updateCurrentUser)

  useEffect(() => {
    const { data, error, loading } = useUpdateUser
    setLoading(loading)
    setError(error)
    if (data !== undefined) {
      setUser(data)
      history.replace("/")
    }
  }, [useUpdateUser.loading])
  const handleUpdateName = () => {
    useUpdateUser.fetch({ name })
  }

  const handleUpdateAge = () => {
    useUpdateUser.fetch({ age })
  }

  const handleUpdateEmail = () => {
    useUpdateUser.fetch({ email: email })
  }
  return (
    <React.Fragment>
      {error === null ? (
        <div>
          <ProfileGrid alignItems="center" container direction="column">
            <h2>Profile</h2>
          </ProfileGrid>
          <ListItem>
            <UpdateUserInformationCardTextField
              label="Name"
              onChange={(event: any) => propsChange<string>(event, setName)}
              defaultValue={user.name}
              value={name}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="update">
                <ButtonOutlined onClick={handleUpdateName}>UPDATE</ButtonOutlined>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <UpdateUserInformationCardTextField
              label="Age"
              onChange={(event: any) => propsChange<number>(event, setAge)}
              defaultValue={user.age}
              value={age}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="update">
                <ButtonOutlined onClick={handleUpdateAge}>UPDATE</ButtonOutlined>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <UpdateUserInformationCardTextField
              label="label"
              onChange={(event: any) => propsChange<string>(event, setEmail)}
              defaultValue={user.email}
              value={email}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="update">
                <ButtonOutlined onClick={handleUpdateEmail}>UPDATE</ButtonOutlined>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      ) : (
        <Typography>Error</Typography>
      )}
    </React.Fragment>
  )
}

const ProfileGrid = styled(Grid)`
  text-align: center;
  width: 50em;
`

const UpdateUserInformationCardTextField = styled(TextField)`
  margin-left: 2em;
`
