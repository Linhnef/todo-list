import { useHistory } from "react-router-dom";
import { Login } from "../components/Login";
import { EmptyLayout } from "../layouts/EmptyLayout";
import { UseAppApiClient } from "../hooks/useAppApiClient";
import { AuthenticationContext } from "../contexts/authenticationContext";
import { useContext } from "react";

export const LoginPage = () => {
  const history = useHistory();
  const { login } = useContext(AuthenticationContext);
  const handleLogin = async (email: string, password: string) => {
    const response = await UseAppApiClient().login({
      email: email,
      password: password,
    });
    if (response !== undefined) {
      login(response);
    }
    history.push("/");
  };
  return (
    <EmptyLayout>
      <Login signin={handleLogin}></Login>
    </EmptyLayout>
  );
};
