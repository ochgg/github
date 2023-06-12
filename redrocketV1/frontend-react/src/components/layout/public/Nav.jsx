import React from "react";
import avatar from "../../../assets/img/user.png";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <a className="navbar-brand" href="#"></a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink exact to="/login" className="nav-item nav-link" activeClassName="active">
            Login
          </NavLink>
          <NavLink exact to="/registro" className="nav-item nav-link" activeClassName="active">
            Registro
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
