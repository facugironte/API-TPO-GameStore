import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./button.css";

const Button = ({ text, onClick, icon, btn_class }) => {
  return (
    <button className={`button ${btn_class ? btn_class : ""}`} onClick={onClick}>
      <p>{icon ? <FontAwesomeIcon icon={icon} /> : text}</p>
    </button>
  );
};

export default Button;