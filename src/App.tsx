import { useState } from "react"
import { Register } from "./pages/Register"
import "./App.css"
import { Route, Switch, Redirect } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { useContext } from "react"
import { AuthenticationContext } from "./contexts/authenticationContext"

function App() {
  const { isLogin } = useContext(AuthenticationContext)

  return (
    <Switch>
      <Route exact path="/">
        {isLogin && <Home />}
      </Route>
      <Route path="/login">{!isLogin && <Login />}</Route>
      <Route path="/register" component={Register}></Route>
    </Switch>
  )
}

export default App
