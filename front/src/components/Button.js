import React from "react";
import "./styles/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ text, onClick, icon }) => {
  return (
    <button className={"button"} onClick={onClick}>
      <p>{icon ? <FontAwesomeIcon icon={icon} /> : text}</p>
    </button>
  );
};

export default Button;
