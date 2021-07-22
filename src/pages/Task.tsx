import {
  AppBar,
  Grid,
  Toolbar,
  Badge,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  Paper,
} from "@material-ui/core"
import styled from "styled-components"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useState } from "react"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { AddTaskRequest, GetTaskRequest } from "../services/api/createAppApiClient"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import CancelIcon from "@material-ui/icons/Cancel"
import AllInboxIcon from "@material-ui/icons/AllInbox"
import UpdateIcon from "@material-ui/icons/Update"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import { useContext } from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"

const TaskTodo = () => {
  const api = useAppApiClient()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addTaskDescription, setAddTaskDescription] = useState<string>("")
  const { tasks, setTasks } = useContext(AuthenticationContext)
  const addTask = useAsync<void | undefined | null, AddTaskRequest>(async (addTaskRequest: AddTaskRequest) => {
    const response = await api.addTask(addTaskRequest)
    if (!response) return
    setAddTaskDescription("")
    setIsAddOpen(false)
  })

  const getTask = useAsync<void | undefined | null, GetTaskRequest>(async (getTaskRequest: GetTaskRequest) => {
    const response = await api.getTask(getTaskRequest)
    if (!response) return
    setTasks(response.data)
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
              </TaskTodoListIcon>
              <TaskTodoListIcon onClick={() => getTask.run({})}>
                <Badge color="secondary">
                  <AllInboxIcon fontSize="large" />
                </Badge>
              </TaskTodoListIcon>
            </TaskTodoHeaderGrid>
          </Grid>
        </Toolbar>
      </TaskTodoHeader>

      <MuiTable>
        <TableBody>
          {tasks ? (
            tasks.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="h5">{item.description}</Typography>
                </TableCell>
                <TableCell>
                  {item.completed ? <CheckCircleOutlineIcon fontSize="large" /> : <CancelIcon fontSize="large" />}
                </TableCell>
                <TableCell>
                  <IcoinButtonTable>
                    <ArrowForwardIosIcon fontSize="large" />
                  </IcoinButtonTable>
                  <IcoinButtonTable>
                    <UpdateIcon fontSize="large" />
                  </IcoinButtonTable>
                  <IcoinButtonTable>
                    <DeleteOutlineIcon fontSize="large" />
                  </IcoinButtonTable>
                </TableCell>
              </TableRow>
            ))
          ) : getTask.loading ? (
            <Typography variant="h2">Loading</Typography>
          ) : getTask.error ? (
            <Typography variant="h2">Error</Typography>
          ) : (
            <Typography variant="h2">Empty</Typography>
          )}
          <TableRow>
            <TableCell>
              <IconButton>
                <ArrowBackIosIcon fontSize="large" />
              </IconButton>
              <IconButton>
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </MuiTable>

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

const TaskTodoHeaderGrid = styled(Grid)``

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
const IcoinButtonTable = styled(IconButton)`
  float: right;
  &:hover {
    cursor: pointer;
  }
`

export default TaskTodo
