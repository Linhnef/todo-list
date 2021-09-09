import { Avatar, FormGroup, Badge, IconButton, Typography } from "@material-ui/core"
import * as React from "react"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useContext, useState, ChangeEvent } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router"
import styled from "styled-components"
import { UpdateCurrentUserRequest } from "../services/api/createAppApiClient"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { InputOutlined } from "../components/inputs/InputOutlined"
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"

export const UpdateUser = () => {
  const history = useHistory()
  const api = useAppApiClient()
  const { user, setUser, setUserAvatar, userAvatar } = useContext(AuthenticationContext)
  const [name, setName] = useState<string>()
  const [age, setAge] = useState<number>()
  const [email, setEmail] = useState<string>()
  const [preview, setPreview] = useState<string>(userAvatar ? userAvatar : "")
  const [img, setImg] = useState<File>()

  const updateUser = useAsync(async (updateUserRequest: UpdateCurrentUserRequest) => {
    const response = await api.updateCurrentUser(updateUserRequest)
    if (!response) return
    setUser(response.data)
    history.replace("/")
  })

  const updateImage = useAsync(async (data: FormData) => {
    const response = await api.uploadImage(data)
    if (!response) return
    preview && setUserAvatar(preview)
  })

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (!files) return
    setImg(files[0])
    setPreview(URL.createObjectURL(files[0]))
  }

  const handleUpdate = () => {
    if (img && preview !== null) {
      const formData = new FormData()
      formData.append("avatar", img)
      updateImage.run(formData)
    }

    updateUser.run({ age, name, email })
  }

  return (
    <React.Fragment>
      {updateUser.error === null && user ? (
        <>
          <Container>
            <InformationContainer>
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <label htmlFor="btn-upload">
                    <ChooseFile id="btn-upload" onChange={handleUpload} accept="image/*" type="file" />
                    <IconButton component="span">
                      <AddAPhotoIcon />
                    </IconButton>
                  </label>
                }
              >
                <ProfilePicture src={preview ? preview : ""} />
              </Badge>

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
              <ButtonOutlined color="primary" onClick={handleUpdate}>
                Update
              </ButtonOutlined>
            </InformationContainer>
          </Container>
        </>
      ) : updateUser.loading ? (
        <Typography variant="h2">Loading</Typography>
      ) : (
        <Typography variant="h2">Error</Typography>
      )}
    </React.Fragment>
  )
}

const ChooseFile = styled.input`
  display: none;
`

const ProfilePicture = styled(Avatar)`
  &.MuiAvatar-root {
    height: 5em;
    width: 5em;
    border: 1px solid black;
  }
`

const InformationContainer = styled(FormGroup)`
  justify-content: center;
  align-items: center;
  & div {
    margin: 0.5em 0;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
