import React from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal, clear } from "../../../app/slices/cart/cartSlice";
import Header from "../../../components/Header/Header";
import GameList from "../../../components/GameList/GameList";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {

  const games = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearCart = () => {
    dispatch(clear());
  }

  const buy = () => {
    console.log("buy");
    navigate(`/shop/buy`)
  }

  return (
    <div>
      <Header currentPage={"cart"} />
      <div className="cart">
        <main className="main">
          <h1>Carrito de compras</h1>
          {games.length > 0 &&
            <>
              <ul>
                {games.map((game) => (
                  <GameList key={game.id} game={game} mode="cart" />
                ))}
              </ul>
              <div className="cart-options">
                <Button text="Vaciar carrito" btn_class={"btn-cart"} onClick={clearCart}/>
                <h2>${total}</h2>
                <Button text="Comprar" btn_class={"btn-cart"} onClick={buy}/>
              </div>
            </>
          }
          {
            games.length === 0 &&
            <div className="empty-cart">
              <h2>No hay juegos en el carrito</h2>
              <p>
                <FontAwesomeIcon icon={faSadTear} className="face-icon"/>
              </p>
            </div>
          }
        </main>
      </div>
    </div>
  );
};

export default Cart;
