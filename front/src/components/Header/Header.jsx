import React from "react";
import "./header.css";
import NavBar from "../NavBar/NavBar";
import NavMenu from "../NavMenu/NavMenu";
import img from "../../resources/logo.png";

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
