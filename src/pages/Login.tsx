import { useHistory } from "react-router-dom"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { Fragment, useContext } from "react"
import { Dialog, Typography } from "@material-ui/core"
import { useInput } from "../hooks/useInput"
import { Form, FormControl } from "./Register"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { LoginRequest, LoginResponse } from "../services/api/createAppApiClient"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"
import styled from "styled-components"
import { useEffect } from "react"
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants"

export const Login = () => {
  const history = useHistory()
  const api = useAppApiClient()
  const { setToken, setUser } = useContext(AuthenticationContext)
  const login = useAsync<LoginResponse | undefined | null, LoginRequest>(api.login)
  const handleLogin = async (email: string, password: string) => {
    const result = await login.run({ email: email, password: password })
    if (!result) return
    setToken(result.token)
    setUser(result.user)
    history.replace("/")
  }
  const {
    value: email,
    isValueValid: emailiIsValid,
    hasError: emailInputHasError,
    inputBlurHandler: handleEmailBlur,
    valueChangeHanlder: emailHanldeChange,
    reset: resetInputEmail,
  } = useInput((value) => value.trim().includes("@"))

  const {
    value: password,
    isValueValid: passwordInputValid,
    hasError: passwordInputHasError,
    inputBlurHandler: handlePasswordlBlur,
    valueChangeHanlder: passwordHanldeChange,
    reset: resetInputpassword,
  } = useInput((value) => value.trim() !== "" && value.trim().length > 6)

  let formValid = false
  if (!passwordInputHasError && !emailInputHasError) formValid = true
  const loginHandle = (event: any) => {
    event.preventDefault()
    handleEmailBlur(true)
    handlePasswordlBlur(true)
    if (!(passwordInputValid && emailiIsValid)) {
      return
    }
    handleLogin(email, password)
    resetInputEmail()
    resetInputpassword()
  }
  return (
    <Fragment>
      {!(login.error === null) ? (
        <Typography variant="h1">Erorr</Typography>
      ) : (
        <EmptyLayout>
          <Dialog open>
            <FormControl>
              <Form>
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
