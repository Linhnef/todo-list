import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { RegisterFrom } from "../components/RegisterForm"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { UseAppApiClient } from "../hooks/useAppApiClient"
import { AuthenticationContext } from "../contexts/authenticationContext"

export const Register = () => {
  const history = useHistory()
  const { register } = useContext(AuthenticationContext)
  const handleSignUp = async (username: string, email: string, password: string, age: number) => {
    register({
      name: username,
      email: email,
      password: password,
      age: age,
    })
    history.push("/")
  }

  return (
    <EmptyLayout>
      <RegisterFrom signup={handleSignUp}></RegisterFrom>
    </EmptyLayout>
  )
}
