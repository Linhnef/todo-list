import styled from "styled-components"
import { Header } from "../components/Header"
import { LogoutButton } from "../components/LogoutButton"
import * as React from "react"
import { AuthenticationContext } from "../contexts/authenticationContext"
import { useHistory } from "react-router-dom"
import { UseAppApiClient } from "../hooks/useAppApiClient"

interface MainLayoutProps {
  children: any
}
export const MainLayout = (props: MainLayoutProps) => {
  const history = useHistory()
  const { isLogin,logout } = React.useContext(AuthenticationContext)
  const handleLogout = async () => {
    if (isLogin) {
      logout()
      history.push("/login")
    }
  }
  return (
    <Layout>
      <Header></Header>
      <main>{props.children}</main>
      <LogoutButton logout={handleLogout}></LogoutButton>
    </Layout>
  )
}

const Layout = styled.div``
