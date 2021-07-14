import styled from "styled-components";
import { Header } from "../components/Header";
import { LogoutButton } from "../components/Logout";
import { api } from "../container";
import * as React from "react";
import { AuthenticationContext } from "../contexts/authenticationContext";
import { useHistory } from "react-router-dom";
import { UseAppApiClient } from "../hooks/useAppApiClient";

interface layoutProps {
  children: any;
}
// Layout for private pages
export const MainLayout = (props: layoutProps) => {
  const history = useHistory();
  const { token, logout } = React.useContext(AuthenticationContext);
  const handleLogout = async () => {
    if (token !== undefined && token !== null) {
      api.defaults.headers.common["Content-Type"] = "application/json";
      api.defaults.headers.common["Accept"] = "application/json";
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await UseAppApiClient().logout();
      logout();
      history.push("/");
      console.log(response);
    }
  };
  return (
    <Layout>
      <Header></Header>
      <main>{props.children}</main>
      <LogoutButton logout={handleLogout}></LogoutButton>
    </Layout>
  );
};

const Layout = styled.div``;
