import { TextField, Grid, ListItem, ListItemSecondaryAction, IconButton, Dialog } from "@material-ui/core"
import styled from "styled-components"
import { User } from "../services/api/types/User"
import React, { useState } from "react"
import { ButtonOutlined } from "./buttons/ButtonOutlined"

const ProfileGrid = styled(Grid)`
  text-align: center;
  width: 50em;
`

interface UpdateUserInformationCardProps {
  user: User
}

const UpdateUserInformationCardTextField = styled(TextField)`
  margin-left: 2em;
`

export const UpdateUserInformationCard = (props: UpdateUserInformationCardProps) => {
  const [name, setName] = useState<string>(props.user.name)
  const [age, setAge] = useState<number>(props.user.age)
  const [email, setEmail] = useState<string>(props.user.email)

  const nameChange = (event: any) => {
    setName(event.target.value)
  }
  const ageChange = (event: any) => {
    setAge(event.target.value)
  }
  const emailChange = (event: any) => {
    setEmail(event.target.value)
  }

  return (
    <React.Fragment>
      <ProfileGrid alignItems="center" container direction="column">
        <h2>Profile</h2>
      </ProfileGrid>
      <ListItem>
        <UpdateUserInformationCardTextField label="Name" onChange={nameChange} value={name} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="update">
            <ButtonOutlined onclick={() => {}} text="UPDATE" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <UpdateUserInformationCardTextField label="Age" onChange={ageChange} value={age} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="update">
            <ButtonOutlined onclick={() => {}} text="UPDATE" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <UpdateUserInformationCardTextField label="label" onChange={emailChange} value={email} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="update">
            <ButtonOutlined onclick={() => {}} text="UPDATE" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  )
}
