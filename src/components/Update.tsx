import {
  TextField,
  Grid,
  Button,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core"
import { ModalOverlay } from "./Default"
import styled from "styled-components"

const user = {
  name: "linh",
  age: 21,
  email: "begin270519@gmail.com",
}

const ProfileGrid = styled(Grid)`
  text-align: center;
`

const LargeAvater = styled(Avatar)`
  width: 4em;
  height: 4em;
`

export const Update = () => {
  return (
    <ModalOverlay zIndex={20}>
      <ProfileGrid alignItems="center" container direction="column">
        <h2>Profile</h2>
        <LargeAvater>Avatar</LargeAvater>
      </ProfileGrid>

      <ListItem style={{ marginLeft: 45 }}>
        <TextField label="name" defaultValue={user.name} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="update">
            <Button variant="outlined">UPDATE</Button>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem style={{ marginLeft: 45 }}>
        <TextField label="age" defaultValue={user.age} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="update">
            <Button variant="outlined">UPDATE</Button>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem style={{ marginLeft: 45 }}>
        <TextField label="email" defaultValue={user.email} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="update">
            <Button variant="outlined">UPDATE</Button>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </ModalOverlay>
  )
}
