import { NavLink } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

export const HomePage = () => {
  return (
    <MainLayout>
      <h1>WELL COME HOME !!!</h1>
      <NavLink to='/profile'>Profile</NavLink>
    </MainLayout>
  );
};
