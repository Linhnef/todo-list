import { Button } from "@material-ui/core"
import styled from "styled-components"

export const ButtonOutlined = styled(Button).attrs((props) => ({ variant: "outlined", ...props }))`
    &:hover{
        cursor: pointer;
    }
`
