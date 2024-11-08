import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./navbar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/login/userSlice";

const NavBar = ({ currentPage }) => {
  const navigate = useNavigate();

  const goTo = (link) => {
    navigate(`/${link}`);
  };

  const user = useSelector(selectUser);

  let account_type = null;

  if(user){
    account_type = user.user.account_type;
  }

  return (
    <nav className="navbar">
      <ul>
        {/* se deja igual porque el inicio funciona tanto para empresa como para usuario */}
        <li
          onClick={() => goTo("")}
          className={currentPage === "home" ? "selected" : ""}
        >
          <Button text="INICIO" btn_class={"btn-nav"} />
        </li>

        {account_type === "USUARIO" && (
          <li
            onClick={() => goTo("store")}
            className={currentPage === "store" ? "selected" : ""}>
            <Button text="TIENDA" btn_class={"btn-nav"} />
        </li>
        )
        }

        {account_type === "USUARIO" && (
          <li
            onClick={() => goTo("your-games")}
            className={currentPage === "your-games" ? "selected" : ""}>
            <Button text="BIBLIOTECA" btn_class={"btn-nav"} />
          </li>
        )
        }

        {account_type === "USUARIO" && (
        <li
          onClick={() => goTo("community")}
          className={currentPage === "community" ? "selected" : ""}
        >
          <Button text="FORO" btn_class={"btn-nav"} />
        </li>
        )
        }

        {account_type === "EMPRESA" && (
          <li
            onClick={() => goTo("company-your-games")}
            className={currentPage === "company-your-games" ? "selected" : ""}
          ><Button text="TUS JUEGOS" btn_class={"btn-nav"} /></li>
        )
        }

        {account_type === "EMPRESA" && (
          <li
            onClick={() => goTo("stats")}
            className={currentPage === "stats" ? "selected" : ""}
          ><Button text="ESTADISTICAS" btn_class={"btn-nav"} /></li>
        )
        }
      </ul>
    </nav>
  );
};

export default NavBar;