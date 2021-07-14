import styled from "styled-components"

// Layout for public pages
interface layoutProps{
  children : any
}
export const EmptyLayout = (props : layoutProps) => {
  return <Layout>{props.children}</Layout>
}

const Layout = styled.div``
