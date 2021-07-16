import { Button } from "@material-ui/core"

interface ButtonSecondaryProps {
  logout: () => void
}

export const ButtonSecondary = (props: ButtonSecondaryProps) => {
  return (
    <Button onClick={props.logout} variant="contained" color="secondary">
      Logout
    </Button>
  )
}
