import { Register } from "./pages/Register"
import "./App.css"
import { Route, Switch } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { useContext } from "react"
import { AuthenticationContext } from "./contexts/authenticationContext"
import { UpdateUser } from "./pages/UpdateUser"
import Tasks from "./pages/Tasks"
import { TaskContextProvider } from "./contexts/taskContext"

function App() {
  const { token } = useContext(AuthenticationContext)

  return (
    <Switch>
      {!token && (
        <>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </>
      )}
      {token && (
        <>
          <Route path="/updateUser">
            <UpdateUser />
          </Route>
          <Route path="/task">
            <TaskContextProvider>
              <Tasks />
            </TaskContextProvider>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </>
      )}
    </Switch>
  )
}

export default App
