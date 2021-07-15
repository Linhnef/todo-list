import { TextField, Grid, Button, ListItem, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import { ModalOverlay } from "./Default"
import styled from "styled-components"
import { User } from "../services/api/types/User"
import { useState } from "react"
import { ButtonOutlined } from "./ButtonOutlined"

const ProfileGrid = styled(Grid)`
  text-align: center;
`

interface updateProps {
  user: User
}

export const UpdateUserInformationCard = (props: updateProps) => {
  const [name, setName] = useState<string>(props.user.name)
  const [age, setAge] = useState<number>(props.user.age)
  const [email, setEmail] = useState<string>(props.user.email)

  const nameChange = (event : any) =>{
    setName(event.target.value);
  }
  const ageChange = (event : any) =>{
    setAge(event.target.value);
  }
  const emailChange = (event : any) =>{
    setEmail(event.target.value);
  }

  return (
    <ModalOverlay zIndex={20}>
      <ProfileGrid alignItems="center" container direction="column">
        <h2>Profile</h2>
      </ProfileGrid>
      <ButtonOutlined data={name} label='Name' onchange={nameChange} />
      <ButtonOutlined data={age} label='Age' onchange={ageChange} />
      <ButtonOutlined data={email} label='Email' onchange={emailChange} />

    </ModalOverlay>
  )
}
