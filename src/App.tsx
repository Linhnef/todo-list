import { useState } from "react"
import { Register } from "./pages/Register"
import "./App.css"
import { Route, Switch, Redirect } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { useContext } from "react"
import { AuthenticationContext } from "./contexts/authenticationContext"
import { UpdateUser } from "./pages/UpdateUser"

function App() {
  const { token } = useContext(AuthenticationContext)

  return (
    <Switch>
      <Route exact path="/">
        {token && <Home />}
      </Route>
      <Route path="/login">{!token && <Login />}</Route>
      <Route path="/register"> {!token && <Register />}</Route>
      <Route path="/updateUser">{token && <UpdateUser />}</Route>
    </Switch>
  )
}

export default App
