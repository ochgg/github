import React from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export const Header = () => {
  return (
    <header className="layout__navbar bg-secondary">
      {/* <div className="navbar__header">
      </div> */}

        <Nav />

        <Footer />
    </header>
  );
};
