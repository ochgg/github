import React from "react";
import avatar from "../../../assets/img/user.png";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


export const Nav = () => {
  const { auth } = useAuth();


  return (
    
    <nav className="navbar__container-lists">
      <div>
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to="/social" className="menu-list__link">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title">Inicio</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/feed" className="menu-list__link">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title">Timeline</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/gente" className="menu-list__link">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title">Personas</span>
          </NavLink>
        </li>
      </ul>
      </div>
<div>
      <ul className="container-lists__list-end">
        <div>
        <li className="list-end__item">
        {/* <NavLink to={"/social/perfil/"+auth.id} className="list-end__link-image">
          {auth.image != "defaul.png" && (
              <img
                src={auth.image}
                className="list-end__img"
                alt="Foto de perfil"
              />
            )}
            {auth.image == "defaul.png" && (
              <img
                src={avatar}
                className="list-end__img"
                alt="Foto de perfil"
              />
            )}
          </NavLink> */}
        </li>
        </div>
        <li className="list-end__item">
          <NavLink to={"/social/perfil/"+auth.id} className="list-end__link">
            <span className="list-end__name">{auth.nick}</span>
          </NavLink>
        </li>

        <li className="list-end__item">
          <NavLink to="/social/ajustes" className="list-end__link">
            <i className="fa-solid fa-gear"></i>
            <span className="list-end__name">Ajustes</span>
          </NavLink>
        </li>

        <li className="list-end__item">
          <NavLink to="/social/logout" className="list-end__link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="list-end__name">Cerrar sesión</span>
          </NavLink>
        </li>
      </ul>
      </div>
    </nav>
    
  );
};