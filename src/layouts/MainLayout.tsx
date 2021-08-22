import styled from "styled-components"
import { Header } from "../components/Header"
import * as React from "react"

interface MainLayoutProps {
  children: React.ReactNode
}
export const MainLayout = (props: MainLayoutProps) => {
  return (
    <Layout>
      <Header></Header>
      <main>{props.children}</main>
    </Layout>
  )
}

const Layout = styled.div`
  background-image: url("https://br-art.vn/wp-content/uploads/2017/07/background-phong-canh-45.jpg");
  height: 100vh;
  width: 100vw;
`
