import React from "react";
import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import useAuth from "../../../hooks/useAuth";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <>
        {/*Layout*/}

        {/*Cabecera*/}
        <Header />

        {/**ontenido Principal */}
        <section className="layout__content">
          {auth.id ? <Outlet /> : <Navigate to="/login" />}
        </section>

        {/*Barra Lateral */}
        <Sidebar />
      </>
    );
  }
};
