import { AppBar, Grid, Toolbar } from "@material-ui/core"
import styled from "styled-components"

const HeaderAppBar = styled(AppBar)`
  width: 100%;
  background-color: white;
`

const RightGrid = styled(Grid)`
  border: 1px solid;
`

export const Header = () => {
  return (
    <HeaderAppBar color="default" position="static">
      <Toolbar>
        <Grid container>
          <RightGrid item sm={12}>
            <h2>REACT TODOLIST APP</h2>
          </RightGrid>
        </Grid>
      </Toolbar>
    </HeaderAppBar>
  )
}
