import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { Dialog, Typography } from "@material-ui/core"
import { useInput } from "../hooks/useInput"
import styled from "styled-components"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { Fragment } from "react"
import { LoginResponse, RegisterRequest } from "../services/api/createAppApiClient"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"

export const Register = () => {
  const history = useHistory()
  const api = useAppApiClient()
  const { setToken, setUser } = useContext(AuthenticationContext)
  const register = useAsync<LoginResponse | undefined | null, RegisterRequest>(api.register)

  const handleSignUp = async (username: string, email: string, password: string, age: number) => {
    const result = register.run({
      name: username,
      email: email,
      password: password,
      age: age,
    })
    if (!result) return
    const { data, error } = register
    if (error === null && data) {
      setToken(data.token)
      setUser(data.user)
      history.replace("/")
    }
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
  } = useInput((value) => parseInt(value) > 0)

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
    handleSignUp(name, email, password, parseInt(age))
    resetInputEmail()
    resetInputpassword()
    resetInputName()
    resetInputAge()
  }

  return (
    <Fragment>
      {!(register.error === null) ? (
        <Typography variant="h1">Erorr</Typography>
      ) : (
        <EmptyLayout>
          <Dialog open>
            <FormControl>
              <Form>
                <RegisternputOutlined
                  label="Email"
                  error={emailInputHasError ? true : false}
                  value={email}
                  onChange={emailHanldeChange}
                  id="email"
                  type="text"
                  onBlur={handleEmailBlur}
                ></RegisternputOutlined>
                <RegisternputOutlined
                  label="Name"
                  error={nameInputHasError ? true : false}
                  value={name}
                  onChange={nameHanldeChange}
                  id="name"
                  type="text"
                  onBlur={handleNameBlur}
                ></RegisternputOutlined>
                <RegisternputOutlined
                  label="Password"
                  error={passwordInputHasError ? true : false}
                  value={password}
                  onChange={passwordHanldeChange}
                  id="password"
                  type="password"
                  onBlur={handlePasswordlBlur}
                ></RegisternputOutlined>
                <RegisternputOutlined
                  label="Age"
                  error={age ? true : false}
                  value={age}
                  onChange={ageHanldeChange}
                  id="age"
                  type="number"
                  onBlur={handleAgelBlur}
                ></RegisternputOutlined>
                <ButtonOutlined onClick={handleRegister} type="button" disabled={!formValid}>
                  Register
                </ButtonOutlined>
              </Form>
            </FormControl>
          </Dialog>
        </EmptyLayout>
      )}
    </Fragment>
  )
}

export const Form = styled.form`
  position: relative;
  width: 100%;
`

export const FormControl = styled.div`
  padding: 30px;
  margin-left: 30px;
  margin-top: 50px;
  width: 80%;
  border-bottom: 1px solid black;
  background-color: white;
`

const RegisternputOutlined = styled(InputOutlined)`
  width: 90%;
  height: 30%;
`
