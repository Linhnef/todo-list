import React, { useState } from "react"
import { Register } from "./pages/Register"
import "./App.css"
import { Route, Switch,Redirect } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Profile } from "./pages/Profile"
import { Update } from "./pages/Update"
import { useContext } from "react"
import { AuthenticationContext } from "./contexts/authenticationContext"

function App() {
  const { isLogin } = useContext(AuthenticationContext);

  const [isLoggedIn] = useState<boolean>(isLogin);

  return (
    <Switch>
      <Route exact path="/">
      { isLoggedIn ? <Home />:<Redirect to="/login" /> }
      </Route>
      <Route path="/login" component={Login}>
      { isLoggedIn ? <Redirect to="/" /> : <Login /> }
      </Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/profile" >
      <Profile />
      </Route>
      <Route path="/update" >
      <Update />
      </Route>
    </Switch>
  )
}

export default App
