import { AppBar, Grid, Toolbar, Badge, Typography, IconButton, Dialog, Paper } from "@material-ui/core"
import styled from "styled-components"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useState } from "react"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { AddTaskRequest } from "../services/api/createAppApiClient"

const TaskTodo = () => {
  const api = useAppApiClient()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addTaskDescription, setAddTaskDescription] = useState<string>("")
  const addTask = useAsync<void | undefined | null, AddTaskRequest>(async (addTaskRequest: AddTaskRequest) => {
    const result = await api.addTask(addTaskRequest)
    if (!result) return
    setAddTaskDescription("")
    setIsAddOpen(false)
  })
  return (
    <>
      <TaskTodoHeader color="default" position="static">
        <Toolbar>
          <Grid container>
            <TaskTodoHeaderGrid item sm={12}>
              <TaskTodoHeaderBackground item>
                <Typography variant="h3">TODO LIST</Typography>
              </TaskTodoHeaderBackground>
              <TaskTodoListIcon
                onClick={() => {
                  setIsAddOpen(true)
                }}
              >
                <Badge color="secondary">
                  <NoteAddIcon fontSize="large" />
                </Badge>
              </TaskTodoListIcon>z
            </TaskTodoHeaderGrid>
          </Grid>
        </Toolbar>
      </TaskTodoHeader>
      <Dialog open={isAddOpen}>
        <AddPaper>
          <AddInput
            value={addTaskDescription}
            onChange={(event: any) => {
              setAddTaskDescription(event.target.value)
            }}
            label="Description"
          />
          <ButtonOutlined
            onClick={() => {
              addTask.run({ description: addTaskDescription })
            }}
          >
            Submit
          </ButtonOutlined>
          <ButtonOutlined
            onClick={() => {
              setIsAddOpen(false)
            }}
          >
            Cancle
          </ButtonOutlined>
        </AddPaper>
      </Dialog>
    </>
  )
}

const TaskTodoHeader = styled(AppBar)`
  width: 100%;
  background-color: white;
  margin-bottom: 5%;
`

const TaskTodoHeaderGrid = styled(Grid)`
  border: 1px solid;
`

const TaskTodoListIcon = styled(IconButton)`
  float: right;
  display: block;
  &:hover {
    cursor: pointer;
  }
`

const TaskTodoHeaderBackground = styled(Grid)`
  display: block;
  padding-top: 0.5%;
  padding-left: 1%;
  float: left;
`

const AddPaper = styled(Paper)`
  padding: 100px;
`

const AddInput = styled(InputOutlined)`
  width: 90%;
`

export default TaskTodo
