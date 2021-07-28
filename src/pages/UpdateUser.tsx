import { Grid, Typography } from "@material-ui/core"
import * as React from "react"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useContext, useState, ChangeEvent } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router"
import styled from "styled-components"
import { UpdateCurrentUserRequest, UpdateCurrentUserResponse } from "../services/api/createAppApiClient"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { InputOutlined } from "../components/inputs/InputOutlined"

export const UpdateUser = () => {
  const history = useHistory()
  const api = useAppApiClient()
  const { user, setUser } = useContext(AuthenticationContext)
  const [name, setName] = useState<string>()
  const [age, setAge] = useState<number>()
  const [email, setEmail] = useState<string>()


  const updateUser = useAsync(async (updateUserRequest: UpdateCurrentUserRequest) => {
    const response = await api.updateCurrentUser(updateUserRequest)
    if (!response) return
    setUser(response.data)
    history.replace("/")
  })

  return (
    <React.Fragment>
      {updateUser.error === null && user ? (
        <FormControl container>
          <ProfileGrid alignItems="center" container direction="column">
            <h2>Profile</h2>
          </ProfileGrid>

          <FormGrid item xs={2}>
            <InputOutlined
              label="Name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
              defaultValue={user.name}
              value={name}
            />

            <InputOutlined
              label="Age"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setAge(parseInt(event.target.value))}
              defaultValue={user.age}
              value={age}
              type="number"
            />

            <InputOutlined
              label="label"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              defaultValue={user.email}
              value={email}
            />
            <ButtonOutlined color="primary" onClick={() => updateUser.run({ age, name, email })}>

              Update
            </ButtonOutlined>
          </FormGrid>
        </FormControl>
      ) : updateUser.loading ? (
        <Typography variant="h2">Loading</Typography>
      ) : (
        <Typography variant="h2">Error</Typography>
      )}
    </React.Fragment>
  )
}

const ProfileGrid = styled(Grid)`
  text-align: center;
  width: 100%;
`

const FormGrid = styled(Grid)`
  margin-left: 45%;
  width: 80%;
`

const FormControl = styled(Grid)``
