import { NavLink } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

export const Home = () => {
  return (
    <MainLayout>
      <h1>WELL COME HOME !!!</h1>
      <NavLink to='/profile'>Profile</NavLink> | <NavLink to='/update'>Update</NavLink>
    </MainLayout>
  );
};
