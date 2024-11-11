import React from "react";
import "./header.css";
import NavBar from "../NavBar/NavBar";
import NavMenu from "../NavMenu/NavMenu";
import img from "../../resources/logo.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/login/userSlice";

const Header = ({ currentPage }) => {
  let headerClass;
  let login = false;

  let user = useSelector(selectUser)
  let account_type = ""
  let company_logo_url = ""


  if (user) {
    user = user.user
    account_type = user.account_type
    company_logo_url = user.company_logo_url
  }

  if (currentPage === "login") {
    headerClass = "header-login";
    login = true;
  } else {
    headerClass = "header";
  }

  return (
    <header className={headerClass}>
      <div className="imgs">
        <img src={img} alt="logo" />
        {
          account_type === "EMPRESA" && (
            <img src={company_logo_url} alt="logo" />
          )
        }
      </div>
        
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
