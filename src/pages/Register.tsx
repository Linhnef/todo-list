import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { Dialog, Typography } from "@material-ui/core"
import { useInput } from "../hooks/useInput"
import styled from "styled-components"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { Fragment } from "react"
import { RegisterRequest } from "../services/api/createAppApiClient"
import { InputOutlined } from "../components/inputs/InputOutlined"
import { ButtonOutlined } from "../components/buttons/ButtonOutlined"

export const Register = () => {
  const history = useHistory()
  const api = useAppApiClient()
  const { setToken, setUser } = useContext(AuthenticationContext)
  const [formValid, setFormValid] = useState(false)
  const register = useAsync(async (registerRequest: RegisterRequest) => {
    const response = await api.register(registerRequest)
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
  const validFormHandler = () => {
    setFormValid(!formValid)
  }
  const handleRegister = (event: any) => {
    event.preventDefault()
    handleNameBlur(true)
    handlePasswordlBlur(true)
    handleEmailBlur(true)
    handleAgelBlur(true)
    if (!formValid) {
      return
    }
    register.run({ name, email, password, age: parseInt(age) })
    resetInputEmail()
    resetInputpassword()
    resetInputName()
    resetInputAge()
  }

  return (
    <Fragment>
      {!(register.error === null) ? (
        register.loading ? (
          <Typography variant="h1">Loading</Typography>
        ) : (
          <Typography variant="h1">Erorr</Typography>
        )
      ) : (
        <EmptyLayout>
          <Dialog open>
            <FormControl>
              <Form onChange={validFormHandler}>
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
