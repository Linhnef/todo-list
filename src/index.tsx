import React, { StrictMode } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { AuthenticationContextProvider } from "./contexts/authenticationContext"
import { TaskContextProvider } from "./contexts/taskContext"

ReactDOM.render(
  <AuthenticationContextProvider>
    <TaskContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TaskContextProvider>
  </AuthenticationContextProvider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
