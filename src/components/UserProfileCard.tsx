import { Grid, Modal } from "@material-ui/core"
import styled from "styled-components"
import { User } from "../services/api/types/User"

const ProfileTitle = styled(Grid)`
  text-align: center;
`

interface profileProps {
  user: User
}

export const UserProfileCard = (props: profileProps) => {
  return (
    <Modal open>
      <ProfileTitle>
        <h2>Profile</h2>
        <h4>
          {props.user.name} : {props.user.age}
        </h4>
        <h4>{props.user.email}</h4>
      </ProfileTitle>
    </Modal>
  )
}
