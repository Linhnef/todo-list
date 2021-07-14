import styled from "styled-components";
import { Header } from "../components/Header";
import * as React from "react";

// Layout for public pages
interface layoutProps {
  children: any;
}
export const EmptyLayout = (props: layoutProps) => {
  return (
    <Layout>
      <Header></Header>
      <main>{props.children}</main>
    </Layout>
  );
};

const Layout = styled.div``;
