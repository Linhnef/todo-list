import { useHistory } from "react-router-dom"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { Fragment, useContext } from "react"
import { Dialog, Typography } from "@material-ui/core"
import { useInput } from "../hooks/useInput"
import { Form, FormControl } from "./Register"
import UseAsync from "../hooks/useAsync"
import { UseAppApiClient } from "../hooks/useAppApiClient"
import { LoginRequest, LoginResponse } from "../services/api/createAppApiClient"
import { useEffect, useState } from "react"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"

export const Login = () => {
  const history = useHistory()
  const api = UseAppApiClient()
  const { setToken, setUser } = useContext(AuthenticationContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const useLogin = UseAsync<LoginResponse | undefined, LoginRequest>(api.login)
  const handleLogin = async (email: string, password: string) => {
    useLogin.fetch({ email: email, password: password })
  }

  useEffect(() => {
    const { data, loading, error } = useLogin
    setLoading(loading)
    setError(error)
    if (error == null && data !== undefined) {
      setToken(data.token)
      setUser(data.user)
      history.replace("/")
    }
  }, [useLogin.loading])

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
      {!(error === null) ? (
        <Typography variant="h1">Erorr</Typography>
      ) : (
        <EmptyLayout>
          <Dialog open>
            <FormControl>
              <Form>
                <InputOutlined
                  label="Email"
                  error={emailInputHasError ? true : false}
                  value={email}
                  onChange={emailHanldeChange}
                  id="email"
                  type="text"
                  onBlur={handleEmailBlur}
                ></InputOutlined>
                <InputOutlined
                  label="Password"
                  error={passwordInputHasError ? true : false}
                  value={password}
                  onChange={passwordHanldeChange}
                  id="password"
                  type="password"
                  onBlur={handlePasswordlBlur}
                ></InputOutlined>
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
