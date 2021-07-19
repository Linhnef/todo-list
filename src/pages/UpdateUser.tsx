import { Grid, Typography } from "@material-ui/core"
import * as React from "react"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useContext, useState } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router"
import { propsChange } from "../hooks/useInput"
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
  const [name, setName] = useState<string | undefined>()
  const [age, setAge] = useState<number | undefined>()
  const [email, setEmail] = useState<string | undefined>()

  const updateUser = useAsync<User | undefined | null, UpdateCurrentUserRequest>(api.updateCurrentUser)

  const handleUpdate = () => {
    const result = updateUser.run({ name, age, email })
    if (!result) return
    const { data } = updateUser
    if (data) {
      setUser(data)
      history.replace("/")
    }
  }
  return (
    <React.Fragment>
      {updateUser.error === null && user !== null ? (
        <FormControl container>
          <ProfileGrid alignItems="center" container direction="column">
            <h2>Profile</h2>
          </ProfileGrid>

          <FormGrid item xs={2}>
            <InputOutlined
              label="Name"
              onChange={(event: any) => propsChange<string>(event, setName)}
              defaultValue={user.name}
              value={name}
            />

            <InputOutlined
              label="Age"
              onChange={(event: any) => propsChange<number>(event, setAge)}
              defaultValue={user.age}
              value={age}
              type="number"
            />

            <InputOutlined
              label="label"
              onChange={(event: any) => propsChange<string>(event, setEmail)}
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
