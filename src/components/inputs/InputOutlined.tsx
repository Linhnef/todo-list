import { TextField } from "@material-ui/core"
import styled from "styled-components"

export const InputOutlined = styled(TextField).attrs((props) => ({
  variant: "outlined",
  ...props,
}))``
