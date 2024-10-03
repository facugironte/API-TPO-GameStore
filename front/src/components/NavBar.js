import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./styles/navbar.css";

const NavBar = ({ currentPage }) => {
  const navigate = useNavigate();

  const goTo = (link) => {
    navigate(`/${link}`);
  };

  return (
    <nav className="navbar">
      <ul>
        <li
          onClick={() => goTo("")}
          className={currentPage === "home" ? "selected" : ""}
        >
          <Button text="INICIO" />
        </li>
        <li
          onClick={() => goTo("store")}
          className={currentPage === "store" ? "selected" : ""}
        >
          <Button text="TIENDA" />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
