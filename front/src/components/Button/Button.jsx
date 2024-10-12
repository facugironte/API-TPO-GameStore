import React from "react";
import "./button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ text, onClick, icon, btn_class }) => {
  return (
    <button className={`button ${btn_class}`} onClick={onClick}>
      <p>{icon ? <FontAwesomeIcon icon={icon} /> : text}</p>
    </button>
  );
};

export default Button;
