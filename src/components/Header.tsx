import { AppBar, Grid, Toolbar } from "@material-ui/core"
import styled from "styled-components"

export const Header = () => {
  return (
    <HeaderAppBar color="default" position="static">
      <Toolbar>
        <Grid container>
          <HeaderGrid item sm={12}>
            <h2>REACT TODOLIST APP</h2>
          </HeaderGrid>
        </Grid>
      </Toolbar>
    </HeaderAppBar>
  )
}

const HeaderAppBar = styled(AppBar)`
  width: 100%;
  background-color: white;
`

const HeaderGrid = styled(Grid)`
  border: 1px solid;
`
