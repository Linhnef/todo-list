import {
  AppBar,
  Grid,
  Toolbar,
  Badge,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Dialog,
  Paper,
  Checkbox,
  TextField,
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
import FirstPageIcon from "@material-ui/icons/FirstPage"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import { useState, ChangeEvent, useContext, useEffect } from "react"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { AddTaskRequest, GetTaskRequest, UpdateTaskByIdRequest } from "../services/api/createAppApiClient"
import { TaskContext } from "../contexts/taskContext"
import { Heading2 } from "../components/Text/Heading2"
import { Heading5 } from "../components/Text/Heading5"
import { Task } from "../services/api/types/Task"
import DoneIcon from "@material-ui/icons/Done"
import useQuery from "../hooks/useQuery"
import { NavLink } from "react-router-dom"
const LIMIT_TASK_PER_PAGE = 3

const Tasks = () => {
  const { query, patchQuery } = useQuery<{ page: number }>({ page: 1 })
  const page = typeof query.page === "string" ? parseInt(query.page) : query.page
  const api = useAppApiClient()
  const { tasks, setTasks } = useContext(TaskContext)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [description, setDescription] = useState<string>("")
  const [checked, setChecked] = useState(false)
  const [showDetal, setShowDetail] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined)
  const [updateDescription, setUpdateDescription] = useState("")
  const [updateCompleted, setUpdateCompleted] = useState<boolean | undefined>(undefined)
  const addTask = useAsync(async (addTaskRequest: AddTaskRequest) => {
    const result = await api.addTask(addTaskRequest)
    if (!result) return
    setDescription("")
    setIsAddOpen(false)
  })
  const getTask = useAsync(async (getTaskRequest: GetTaskRequest) => {
    const response = await api.getTasks(getTaskRequest)
    if (!response) return
    setTasks(response)
  })
  const deleteTask = useAsync(async (id: string) => {
    const response = await api.deleteTaskById(id)
    if (!response?.success) return
    patchQuery({ page: query.page })
  })

  const updateTask = useAsync(async (data: UpdateTaskByIdRequest) => {
    const response = await api.updateTaskById(data)
    if (!response) return
    patchQuery({ page: query.page })
  })
  const handleUpdateTask = () => {
    if (currentTask)
      updateTask.run({ _id: currentTask._id, data: { completed: updateCompleted, description: updateDescription } })
  }

  const hanleShowDetail = (data: Task) => {
    setShowDetail(!showDetal)
    setCurrentTask(data)
  }
  const getFirstPage = () => {
    patchQuery({ page: 1 })
  }
  const getPrevPage = () => {
    patchQuery({ page: page - 1 })
  }
  const getNextPage = () => {
    patchQuery({ page: page + 1 })
  }

  useEffect(() => {
    getTask.run({
      limit: LIMIT_TASK_PER_PAGE,
      skip: page * LIMIT_TASK_PER_PAGE,
    })
  }, [page])

  return (
    <>
      <TasksHeader color="default" position="static">
        <Toolbar>
          <Grid container>
            <TasksHeaderGrid item sm={12}>
              <TasksHeaderBackground item>
                <Heading2>
                  <NavLink to="/">TODO LIST</NavLink>
                </Heading2>
              </TasksHeaderBackground>
              <TaskButton
                onClick={() => {
                  getTask.run({ completed: false })
                }}
              >
                <Badge color="secondary">
                  <CheckCircleOutlineIcon fontSize="large" />
                </Badge>
              </TaskButton>
              <TaskButton
                onClick={() => {
                  getTask.run({ completed: true })
                }}
              >
                <Badge color="secondary">
                  <CancelIcon fontSize="large" />
                </Badge>
              </TaskButton>
              <TaskButton onClick={() => setIsAddOpen(true)}>
                <Badge color="secondary">
                  <NoteAddIcon fontSize="large" />
                </Badge>
              </TaskButton>
              <TaskButton onClick={() => getTask.run({})}>
                <Badge color="secondary">
                  <AllInboxIcon fontSize="large" />
                </Badge>
              </TaskButton>
              <TaskButton onClick={() => getFirstPage()}>
                <Badge color="secondary">
                  <FirstPageIcon fontSize="large" />
                </Badge>
              </TaskButton>
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
                  <IconButtonTable onClick={() => hanleShowDetail(item)}>
                    <UpdateIcon fontSize="large" />
                  </IconButtonTable>
                  <IconButtonTable onClick={() => deleteTask.run(item._id)}>
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
              <IconButton disabled={query.page === 1 ? true : false}>
                <ArrowBackIosIcon onClick={() => getPrevPage()} fontSize="large" />
              </IconButton>
              <IconButton>
                <ArrowForwardIosIcon onClick={() => getNextPage()} fontSize="large" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </MuiTable>
      <Dialog open={showDetal}>
        {currentTask ? (
          <UpdateTaskContainer>
            <TextField
              variant="outlined"
              value={updateDescription}
              defaultValue={currentTask.description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setUpdateDescription(event.target.value)}
            />
            {updateCompleted ? (
              <TaskButton onClick={() => setUpdateCompleted(!updateCompleted)}>
                <DoneIcon />
              </TaskButton>
            ) : (
              <TaskButton onClick={() => setUpdateCompleted(!updateCompleted)}>
                <CancelIcon />
              </TaskButton>
            )}
            <ButtonOutlined onClick={() => setShowDetail(!showDetal)}>Close</ButtonOutlined>
            <ButtonOutlined onClick={() => handleUpdateTask()}>Update</ButtonOutlined>
          </UpdateTaskContainer>
        ) : (
          <> </>
        )}
      </Dialog>
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

const UpdateTaskContainer = styled.div`
  display: flex;
  padding: 1em;
  overflow: hidden;
`

const TasksHeader = styled(AppBar)`
  width: 100%;
  background-color: white;
  margin-bottom: 5%;
`

const TasksHeaderGrid = styled(Grid)`
  border: 1px solid;
`

const TaskButton = styled(IconButton)`
  float: right;
  display: block;
  &:hover {
    cursor: pointer;
  }
  & svg {
    margin: 0 1em;
    color: #5aff;
    &:hover {
      cursor: pointer;
    }
  }
`

const TasksHeaderBackground = styled(Grid)`
  display: block;
  padding-top: 0.5%;
  padding-left: 1%;
  float: left;
  & a {
    text-decoration: none;
    color: #000;
  }
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
