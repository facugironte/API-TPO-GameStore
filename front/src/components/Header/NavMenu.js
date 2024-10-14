import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../app/slices/login/userSlice";
import { clear, selectCartItems } from "../../app/slices/cart/cartSlice";
import { useDispatch } from "react-redux";

const NavMenu = () => {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToShop = () => {
    navigate("/shop/cart");
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clear());
    navigate("/login");
  };

  return (
    <div className="nav-menu">
      <p className="title">
        Bienvenido, {user ? user.user.user_fullname : "invitado"}!
      </p>
      <div className="btns">
        <button className="btn" onClick={goToShop}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cart.length > 0 && <p>{cart.length}</p>}
        </button>
        <button className="btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </div>
  );
};

export default NavMenu;
