import { ReactNode } from "react"
import styled from "styled-components"

// Layout for public pages
interface LayoutProps {
  children: ReactNode
}
export const EmptyLayout = (props: LayoutProps) => {
  return (
    <Layout>
      <main>{props.children}</main>
    </Layout>
  )
}

const Layout = styled.div``
