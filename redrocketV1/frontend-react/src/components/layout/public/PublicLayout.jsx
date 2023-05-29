import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from './Header';
import useAuth from '../../../hooks/useAuth';

export const PublicLayout = () => {

  const {auth} = useAuth();

  console.log(auth);

  return (
    <>
        {/*LAYOUT*/}
        <Header />

        {/*CONTENIDO PRINCIPAL*/}
        <section className="layout__content">
          {!auth.id ?
              <Outlet />
              : 
              <Navigate to="/social" />
          }
        </section>
    </>
  )
}
