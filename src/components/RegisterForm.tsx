import styled from "styled-components"
import { useInput } from "../hooks/useInput"
import { Dialog, TextField } from "@material-ui/core"

export const Form = styled.form`
  position: relative;
  width: 100%;
`
export const FormTextField = styled(TextField)`
  margin: 20px;
  width: 95%;
  height: 30px;
  border: 1px solid black;
  &:focus {
    background-color: orange;
  }
`
export const FormLabel = styled.label`
  color: black;
  font-size: 25px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  font-style: oblique;
`

export const FormButton = styled.button`
  position: absolute;
  top : -1em;
  right: 1.4em;
  font-size: 20px;
  width: 100px;
  background-color: white;
  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
`

export const FormControl = styled.div`
  padding: 30px;
  margin-left: 30px;
  margin-top: 50px;
  width: 80%;
  border-bottom: 1px solid black;
  background-color: white;
`

interface formProps {
  signup: (username: string, email: string, password: string, age: number) => void
}

export const RegisterFrom = (props: formProps) => {
  const {
    value: email,
    isValueValid: emailiIsValid,
    hasError: emailInputHasError,
    inputBlurHandler: handleEmailBlur,
    valueChangeHanlder: emailHanldeChange,
    reset: resetInputEmail,
  } = useInput((value) => value.trim().includes("@"))

  const {
    value: name,
    isValueValid: nameiIsValid,
    hasError: nameInputHasError,
    inputBlurHandler: handleNameBlur,
    valueChangeHanlder: nameHanldeChange,
    reset: resetInputName,
  } = useInput((value) => value.trim() !== "")

  const {
    value: password,
    isValueValid: passwordInputValid,
    hasError: passwordInputHasError,
    inputBlurHandler: handlePasswordlBlur,
    valueChangeHanlder: passwordHanldeChange,
    reset: resetInputpassword,
  } = useInput((value) => value.trim() !== "" && value.trim().length > 6)

  const {
    value: age,
    isValueValid: ageInputValid,
    hasError: ageInputHasError,
    inputBlurHandler: handleAgelBlur,
    valueChangeHanlder: ageHanldeChange,
    reset: resetInputAge,
  } = useInput((value) => parseInt(value + "") > 0)

  let formValid = false
  if (!nameInputHasError && !passwordInputHasError && !emailInputHasError && !ageInputHasError) formValid = true
  const handleRegister = (event: any) => {
    event.preventDefault()
    handleNameBlur(true)
    handlePasswordlBlur(true)
    handleEmailBlur(true)
    handleAgelBlur(true)
    if (!(emailiIsValid && passwordInputValid && ageInputValid && nameiIsValid)) {
      return
    }
    props.signup(name, email, password, parseInt(age + ""))
    resetInputEmail()
    resetInputpassword()
    resetInputName()
    resetInputAge()
  }

  return (
    <Dialog open>
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
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormTextField
            error={nameInputHasError ? true : false}
            value={name}
            onChange={nameHanldeChange}
            id="name"
            type="text"
            onBlur={handleNameBlur}
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
          <FormLabel htmlFor="age">Age</FormLabel>
          <FormTextField
            error={age ? true : false}
            value={age}
            onChange={ageHanldeChange}
            id="age"
            type="number"
            onBlur={handleAgelBlur}
          ></FormTextField>
          <FormButton onClick={handleRegister} type="button" disabled={!formValid}>
            Register
          </FormButton>
        </Form>
      </FormControl>
    </Dialog>
  )
}
