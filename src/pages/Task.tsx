import { AppBar, Grid, Toolbar, Badge, Checkbox, Typography, IconButton, Dialog, Paper } from "@material-ui/core"
import styled from "styled-components"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useState, ChangeEvent } from "react"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { AddTaskRequest } from "../services/api/createAppApiClient"

const Tasks = () => {
  const api = useAppApiClient()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [description, setDescription] = useState<string>("")
  const [checked, setChecked] = useState(false)
  const addTask = useAsync(async (addTaskRequest: AddTaskRequest) => {
    const result = await api.addTask(addTaskRequest)
    if (!result) return
    setDescription("")
    setIsAddOpen(false)
  })
  return (
    <>
      <TasksHeader color="default" position="static">
        <Toolbar>
          <Grid container>
            <TasksHeaderGrid item sm={12}>
              <TasksHeaderBackground item>
                <Typography variant="h3">TODO LIST</Typography>
              </TasksHeaderBackground>
              <TasksAddIcon onClick={() => setIsAddOpen(true)}>
                <Badge color="secondary">
                  <NoteAddIcon fontSize="large" />
                </Badge>
              </TasksAddIcon>
            </TasksHeaderGrid>
          </Grid>
        </Toolbar>
      </TasksHeader>
      <Dialog open={isAddOpen}>
        <AddPaper>
          <AddInput
            value={description}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value)
            }}
            label="Description"
          />
          <Checkbox color="default" onClick={() => setChecked(!checked)} checked={checked} />
          <ButtonOutlined
            onClick={() => {
              addTask.run({ description: description, completed: checked })
            }}
          >
            Submit
          </ButtonOutlined>
          <ButtonOutlined
            onClick={() => {
              setIsAddOpen(false)
            }}
          >
            Cancel
          </ButtonOutlined>
        </AddPaper>
      </Dialog>
    </>
  )
}

const TasksHeader = styled(AppBar)`
  width: 100%;
  background-color: white;
  margin-bottom: 5%;
`

const TasksHeaderGrid = styled(Grid)`
  border: 1px solid;
`

const TasksAddIcon = styled(IconButton)`
  float: right;
  display: block;
  &:hover {
    cursor: pointer;
  }
`

const TasksHeaderBackground = styled(Grid)`
  display: block;
  padding-top: 0.5%;
  padding-left: 1%;
  float: left;
`

const AddPaper = styled(Paper)`
  padding: 100px;
`

const AddInput = styled(InputOutlined)`
  width: 80%;
`

export default Tasks
