import { useHistory } from "react-router-dom"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useContext } from "react"
import { Modal } from "@material-ui/core"
import { useInput } from "../hooks/useInput"
import { Form, FormTextField, FormLabel, FormControl, FormButton } from "./Register"
import styled from "styled-components"
const FormModal = styled(Modal)`
  margin: 7em auto;
`

export const Login = () => {
  const history = useHistory()
  const { login } = useContext(AuthenticationContext)
  const handleLogin = async (email: string, password: string) => {
    login({ email: email, password: password })
    history.push("/")
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
    <EmptyLayout>
      <FormModal open>
        <FormControl>
          <Form>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormTextField
              error={emailInputHasError ? true : false}
              value={email}
              onChange={emailHanldeChange}
              id="email"
              type="text"
              onBlur={handleEmailBlur}
            ></FormTextField>

            <FormLabel htmlFor="password">Password</FormLabel>
            <FormTextField
              error={passwordInputHasError ? true : false}
              value={password}
              onChange={passwordHanldeChange}
              id="password"
              type="password"
              onBlur={handlePasswordlBlur}
            ></FormTextField>
            <FormButton onClick={loginHandle} type="button" disabled={!formValid}>
              Login
            </FormButton>
          </Form>
        </FormControl>
      </FormModal>
    </EmptyLayout>
  )
}
