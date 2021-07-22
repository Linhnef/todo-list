import { useHistory } from "react-router-dom"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { Fragment, useContext, useState } from "react"
import { Dialog, Typography } from "@material-ui/core"
import { useInput } from "../hooks/useInput"
import { Form, FormControl } from "./Register"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { LoginRequest, LoginResponse } from "../services/api/createAppApiClient"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import styled from "styled-components"

export const Login = () => {
  const history = useHistory()
  const api = useAppApiClient()
  const { setToken, setUser } = useContext(AuthenticationContext)
  const [formValid, setFormValid] = useState(false)
  const login = useAsync<void | undefined | null, LoginRequest>(async (loginRequest: LoginRequest) => {
    const response = await api.login(loginRequest)
    if (!response) return
    setToken(response.token)
    setUser(response.user)
    history.replace("/")
  })

  const {
    value: email,
    isValueValid: emailiIsValid,
    hasError: emailInputHasError,
    inputBlurHandler: handleEmailBlur,
    valueChangeHanlder: emailHanldeChange,
    reset: resetInputEmail,
  } = useInput((value) => value.trim().includes("@"))

  const validFormHandler = () => {
    setFormValid(!passwordInputHasError && !emailInputHasError)
  }

  const {
    value: password,
    isValueValid: passwordInputValid,
    hasError: passwordInputHasError,
    inputBlurHandler: handlePasswordlBlur,
    valueChangeHanlder: passwordHanldeChange,
    reset: resetInputpassword,
  } = useInput((value) => value.trim() !== "" && value.trim().length > 6)

  const loginHandle = (event: any) => {
    event.preventDefault()
    handleEmailBlur(true)
    handlePasswordlBlur(true)
    if (!(passwordInputValid && emailiIsValid)) {
      return
    }
    login.run({ email: email, password: password })
    resetInputEmail()
    resetInputpassword()
  }
  return (
    <Fragment>
      {!(login.error === null) ? (
        login.loading ? (
          <Typography variant="h1">Loading</Typography>
        ) : (
          <Typography variant="h1">Erorr</Typography>
        )
      ) : (
        <EmptyLayout>
          <Dialog open>
            <FormControl>
              <Form onChange={validFormHandler}>
                <LoginInputOutlined
                  label="Email"
                  error={emailInputHasError ? true : false}
                  value={email}
                  onChange={emailHanldeChange}
                  id="email"
                  type="text"
                  onBlur={handleEmailBlur}
                ></LoginInputOutlined>
                <LoginInputOutlined
                  label="Password"
                  error={passwordInputHasError ? true : false}
                  value={password}
                  onChange={passwordHanldeChange}
                  id="password"
                  type="password"
                  onBlur={handlePasswordlBlur}
                ></LoginInputOutlined>
                <ButtonOutlined onClick={loginHandle} type="button" disabled={!formValid}>
                  Login
                </ButtonOutlined>
              </Form>
            </FormControl>
          </Dialog>
        </EmptyLayout>
      )}
    </Fragment>
  )
}

const LoginInputOutlined = styled(InputOutlined)`
  width: 90%;
  height: 30%;
`
