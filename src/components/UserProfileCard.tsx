import { Grid } from "@material-ui/core"
import { User } from "../services/api/types/User"
import styled from "styled-components"

const ProfileTitle = styled(Grid)`
  text-align: center;
`

interface UserProfileCardProps {
  user: User
}

export const UserProfileCard = (props: UserProfileCardProps) => {
  return (
    <ProfileTitle>
      <h2>Profile</h2>
      <h4>
        {props.user.name} : {props.user.age}
      </h4>
      <h4>{props.user.email}</h4>
    </ProfileTitle>
  )
}
