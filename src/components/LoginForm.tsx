import { useInput } from "../hooks/useInput"
import { Form, FormButton, FormControl, FormLabel, FormTextField } from "./RegisterForm"
import { Modal } from "@material-ui/core"
import styled from "styled-components"
interface FormProps {
  signin: (email: string, password: string) => void
}

const FormModal = styled(Modal)`
  margin: 7em auto;
`

export const LoginForm = (props: FormProps) => {
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
  const handleLogin = (event: any) => {
    event.preventDefault()
    handleEmailBlur(true)
    handlePasswordlBlur(true)
    if (!(passwordInputValid && emailiIsValid)) {
      return
    }
    props.signin(email, password)
    resetInputEmail()
    resetInputpassword()
  }

  return (
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
          <FormButton onClick={handleLogin} type="button" disabled={!formValid}>
            Login
          </FormButton>
        </Form>
      </FormControl>
    </FormModal>
  )
}
