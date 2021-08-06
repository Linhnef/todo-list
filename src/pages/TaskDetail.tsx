import { ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core"
import styled from "styled-components"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import CancelIcon from "@material-ui/icons/Cancel"
import { MainLayout } from "../layouts/MainLayout"
import { useContext } from "react"
import { TaskContext } from "../contexts/taskContext"
import { Heading2 } from "../components/Text/Heading2"

function TaskDetail() {
  const { currentTask } = useContext(TaskContext)
  return (
    <>
      <MainLayout>
        <Container></Container>
        {currentTask ? (
          <>
            <ListItem>
              <ListItemIcon>
                {currentTask.completed ? <CheckCircleOutlineIcon fontSize="large" /> : <CancelIcon fontSize="large" />}
              </ListItemIcon>
              <ListItemText>
                <Typography variant="overline">{currentTask.description}</Typography>
              </ListItemText>
            </ListItem>
          </>
        ) : (
          <Heading2>Error</Heading2>
        )}
      </MainLayout>
    </>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default TaskDetail
