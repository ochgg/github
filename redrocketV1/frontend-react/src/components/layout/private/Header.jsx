import React from "react";
import { Nav } from "./Nav";
import { Footer } from "../public/Footer";

export const Header = () => {
  return (
    <header className="layout__navbar bg-secondary">
      {/* <div className="navbar__header">
        <a href="#" className="navbar__title">
          REDROCKET
        </a>
      </div> */}

        <Nav />

        <Footer />
    </header>
  );
};
