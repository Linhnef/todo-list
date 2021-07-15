import { Button } from "@material-ui/core"

interface logoutProps {
  logout: () => void
}

export const LogoutButton = (props: logoutProps) => {
  return (
    <Button onClick={props.logout} variant="contained" color="secondary">
      Logout
    </Button>
  )
}
