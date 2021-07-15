import { ListItem, TextField, ListItemSecondaryAction, IconButton, Button } from "@material-ui/core"
import styled from "styled-components"

interface btnOutlinedProps {
  label: string
  data: string | number
  onchange: (event: any) => void
}

const BtnOutlinedTextField = styled(TextField)`
    margin-left: 2em;
`

export const ButtonOutlined = (props: btnOutlinedProps) => {
  return (
    <ListItem>
      <BtnOutlinedTextField label={props.label} onChange={props.onchange} value={props.data} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="update">
          <Button variant="outlined">UPDATE</Button>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
