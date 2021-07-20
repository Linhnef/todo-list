import { Button } from "@material-ui/core"
import styled from "styled-components"

export const ButtonSecondary = styled(Button).attrs((props) => ({
  variant: "outlined",
  color: "secondary",
  ...props,
}))`
  &:hover {
    cursor: pointer;
  }
`
