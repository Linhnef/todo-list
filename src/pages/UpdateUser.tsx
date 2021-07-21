import { Grid, Typography } from "@material-ui/core"
import * as React from "react"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useContext, useState } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router"
import styled from "styled-components"
import { UpdateCurrentUserRequest } from "../services/api/createAppApiClient"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { User } from "../services/api/types/User"
import { InputOutlined } from "../components/inputs/InputOutlined"

export const UpdateUser = () => {
  const history = useHistory()
  const api = useAppApiClient()
  const { user, setUser } = useContext(AuthenticationContext)
  const [name, setName] = useState<string>()
  const [age, setAge] = useState<number>()
  const [email, setEmail] = useState<string>()

  const updateUser = useAsync<User | undefined | null, UpdateCurrentUserRequest>(api.updateCurrentUser)

  const handleUpdate = async () => {
    const result = await updateUser.run({ name: name, age, email })
    if (!result) return
    setUser(result.data)
    history.replace("/")
  }
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
              onChange={(event: any) => setName(event.target.value)}
              defaultValue={user.name}
              value={name}
            />

            <InputOutlined
              label="Age"
              onChange={(event: any) => setAge(event.target.value)}
              defaultValue={user.age}
              value={age}
              type="number"
            />

            <InputOutlined
              label="label"
              onChange={(event: any) => setEmail(event.target.value)}
              defaultValue={user.email}
              value={email}
            />
            <ButtonOutlined color="primary" onClick={handleUpdate}>
              Update
            </ButtonOutlined>
          </FormGrid>
        </FormControl>
      ) : (
        <Typography>Error</Typography>
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
