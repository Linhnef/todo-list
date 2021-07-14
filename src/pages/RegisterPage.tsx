import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Register } from "../components/Register";
import { EmptyLayout } from "../layouts/EmptyLayout";
import { UseAppApiClient } from "../hooks/useAppApiClient";
import { AuthenticationContext } from "../contexts/authenticationContext";

export const RegisterPage = () => {
  const history = useHistory();
  const { login } = useContext(AuthenticationContext);
  const handleSignUp = async (
    username: string,
    email: string,
    password: string,
    age: number
  ) => {
    const response = await UseAppApiClient().register({
      name: username,
      age: age,
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
      <Register signup={handleSignUp}></Register>
    </EmptyLayout>
  );
};
