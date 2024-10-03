import React from "react";
import "./styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { selectUser } from "../app/slices/login/userSlice";

const NavMenu = () => {
  const user = useSelector(selectUser);

  return (
    <div className="nav-menu">
      <p className="title">Bienvenido, {user ? user.username : "invitado"}!</p>
      <div className="btns">
        <button className="btn">
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        <button className="btn">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </div>
  );
};

export default NavMenu;
