import { Avatar } from "@material-ui/core"
import { useEffect } from "react"
import { getAbbreviatedString } from "../helpers/getAbbreviatedString"

interface UserAvatarProps {
  name: string
  userAvatar?: string | null
}

const UserAvatar = (props: UserAvatarProps) => {
  useEffect(() => {
    console.log(getAbbreviatedString(props.name))
  }, [])
  return (
    <> {props.userAvatar ? <Avatar src={props.userAvatar} /> : <Avatar>{getAbbreviatedString(props.name)}</Avatar>}</>
  )
}

export default UserAvatar
