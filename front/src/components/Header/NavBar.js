import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./navbar.css";

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
          <Button text="INICIO" btn_class={"btn-nav"} />
        </li>

        <li
          onClick={() => goTo("store")}
          className={currentPage === "store" ? "selected" : ""}
        >
          <Button text="TIENDA" btn_class={"btn-nav"} />
        </li>

        <li
          onClick={() => goTo("your-games")}
          className={currentPage === "your-games" ? "selected" : ""}
        >
          <Button text="BIBLIOTECA" btn_class={"btn-nav"} />
        </li>
        <li
          onClick={() => goTo("community")}
          className={currentPage === "community" ? "selected" : ""}
        >
          <Button text="FORO" btn_class={"btn-nav"} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
