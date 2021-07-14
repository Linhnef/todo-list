import React from "react";
import { RegisterPage } from "./pages/RegisterPage";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";

/* const HomeLazy = React.lazy(() => import('./pages/Home/HomePage')
                                          .then(({HomePage}) => ({default : HomePage}))
) */

function App() {
  return (
    <Switch>
     <Route exact path="/" component={HomePage}></Route>
      <Route path="/login" component={LoginPage}></Route>
      <Route path="/register" component={RegisterPage}></Route>
      <Route path="/profile" component={ProfilePage}></Route>
    </Switch>
  );
}

export default App;
