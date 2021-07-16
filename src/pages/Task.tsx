import { MainLayout } from "../layouts/MainLayout"
import styled from "styled-components"
import { TextField, Grid } from "@material-ui/core"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useState } from "react"
import { useContext } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useEffect } from "react"

const AddTaskController = styled(Grid)`
  display: block;
  float: right;
`

export const UserTask = () => {
  const { addTask } = useContext(AuthenticationContext)

  const [addTextDescription, setAddTextDescription] = useState<string>("")
  const addTextDescriptionChange = (event: any) => {
    setAddTextDescription(event.target.value)
  }
  const handleAddTask = () => {
    addTask({ description: addTextDescription })
  }
  useEffect(() => {}, [])

  return (
    <MainLayout>
      <Grid container>
        <Grid sm={9}>
          <h1>Task!!!</h1>
        </Grid>
        <Grid sm={3}>
          <AddTaskController>
            <TextField label="Description" value={addTextDescription} onChange={addTextDescriptionChange}></TextField>
            <ButtonOutlined text="Add" onclick={handleAddTask} />
          </AddTaskController>
        </Grid>
      </Grid>
    </MainLayout>
  )
}
