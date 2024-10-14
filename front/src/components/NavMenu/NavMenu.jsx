import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../app/slices/login/userSlice";
import { clear, selectCartItems } from "../../app/slices/cart/cartSlice";
import "./navMenu.css";

const NavMenu = () => {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const goToShop = () => {
    navigate("/shop/cart");
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clear());
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const DropdownMenu = () => {
    return (
      <>
        {isOpen && (
          <ul className="dropdown-menu">
            <li>
              <a href="/profile/your-profile">Tu perfil</a>
            </li>
            <li>
              <a href="/profile/wishlist">Wishlist</a>
            </li>
            <li>
              <span onClick={handleLogout}>Cerrar sesión</span>
            </li>
          </ul>
        )}
      </>
    );
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

        <button className="btn" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
      <DropdownMenu />
    </div>
  );
};

export default NavMenu;
