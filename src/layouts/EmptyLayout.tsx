import styled from "styled-components"
import { Header } from "../components/Header"
import * as React from 'react';

// Layout for public pages
interface LayoutProps {
  children: React.ReactNode
}
export const EmptyLayout = (props: LayoutProps) => {
  return (
    <Layout>
      <Header></Header>
      <main>{props.children}</main>

    </Layout>
  )
}

const Layout = styled.div``
