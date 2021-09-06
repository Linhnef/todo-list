import { useContext } from "react"
import { Avatar } from "@material-ui/core"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { getAbbreviatedString } from "../helpers/getAbbreviatedString"

function UserAvatar() {
  const { userAvatar, user } = useContext(AuthenticationContext)
  return (
    <> {userAvatar ? <Avatar src={userAvatar} /> : <Avatar>{user ? getAbbreviatedString(user.name) : "?"}</Avatar>}</>
  )
}

export default UserAvatar
