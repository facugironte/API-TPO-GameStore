import React from "react";
import "./styles/header.css";
import NavBar from "./NavBar";
import NavMenu from "./NavMenu";
import img from "../resources/logo.png";

const Header = ({ currentPage }) => {
  let headerClass;
  let login = false;

  if (currentPage === "login") {
    headerClass = "header-login";
    login = true;
  } else {
    headerClass = "header";
  }

  return (
    <header className={headerClass}>
      <img src={img} alt="logo" />
      {!login && (
        <>
          <NavBar currentPage={currentPage} />
          <NavMenu />
        </>
      )}
    </header>
  );
};

export default Header;
