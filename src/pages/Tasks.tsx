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
  Checkbox,
} from "@material-ui/core"
import styled from "styled-components"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import CancelIcon from "@material-ui/icons/Cancel"
import AllInboxIcon from "@material-ui/icons/AllInbox"
import UpdateIcon from "@material-ui/icons/Update"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useState, ChangeEvent, useContext } from "react"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { AddTaskRequest, GetTaskRequest } from "../services/api/createAppApiClient"
import { TaskContext } from "../contexts/taskContext"
import { TaskContextProvider } from "../contexts/taskContext"
import { Heading2 } from "../components/Text/Heading2"
import { Heading5 } from "../components/Text/Heading5"

const Tasks = () => {
  const api = useAppApiClient()
  const { tasks, setTasks } = useContext(TaskContext)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [description, setDescription] = useState<string>("")
  const [checked, setChecked] = useState(false)
  const addTask = useAsync(async (addTaskRequest: AddTaskRequest) => {
    const result = await api.addTask(addTaskRequest)
    if (!result) return
    setDescription("")
    setIsAddOpen(false)
  })
  const getTask = useAsync(async (getTaskRequest: GetTaskRequest) => {
    const response = await api.getTasks(getTaskRequest)
    if (!response) return
    setTasks(response.data)
  })
  return (
    <TaskContextProvider>
      <TasksHeader color="default" position="static">
        <Toolbar>
          <Grid container>
            <TasksHeaderGrid item sm={12}>
              <TasksHeaderBackground item>
                <Heading2>TODO LIST</Heading2>
              </TasksHeaderBackground>
              <AddButton onClick={() => setIsAddOpen(true)}>
                <Badge color="secondary">
                  <NoteAddIcon fontSize="large" />
                </Badge>
              </AddButton>
              <AddButton onClick={() => getTask.run({})}>
                <Badge color="secondary">
                  <AllInboxIcon fontSize="large" />
                </Badge>
              </AddButton>
            </TasksHeaderGrid>
          </Grid>
        </Toolbar>
      </TasksHeader>

      <MuiTable>
        <TableBody>
          {tasks ? (
            tasks.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Heading5>{item.description}</Heading5>
                </TableCell>
                <TableCell>
                  {item.completed ? <CheckCircleOutlineIcon fontSize="large" /> : <CancelIcon fontSize="large" />}
                </TableCell>
                <TableCell>
                  <IconButtonTable>
                    <ArrowForwardIosIcon fontSize="large" />
                  </IconButtonTable>
                  <IconButtonTable>
                    <UpdateIcon fontSize="large" />
                  </IconButtonTable>
                  <IconButtonTable>
                    <DeleteOutlineIcon fontSize="large" />
                  </IconButtonTable>
                </TableCell>
              </TableRow>
            ))
          ) : getTask.loading ? (
            <Heading2>Loading</Heading2>
          ) : getTask.error ? (
            <Heading2>Error</Heading2>
          ) : (
            <Heading2>Empty</Heading2>
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
          </TableRow>
        </TableBody>
      </MuiTable>

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
    </TaskContextProvider>
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

const AddButton = styled(IconButton)`
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
const IconButtonTable = styled(IconButton)`
  float: right;
  &:hover {
    cursor: pointer;
  }
`

export default Tasks
