import { Button } from "@material-ui/core"
interface ButtonOutlinedProps {
  text: string
  onclick: () => void
}

export const ButtonOutlined = (props: ButtonOutlinedProps) => {
  return (
    <Button variant="outlined" onClick={props.onclick}>
      {props.text}
    </Button>
  )
}
