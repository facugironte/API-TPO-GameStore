import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotal, clear } from "../../../app/slices/cart/cartSlice";
import { addGameToPurchases, selectUser } from "../../../app/slices/login/userSlice";

import { buyGame } from "../../../utils/fetchShop";

import Header from "../../../components/Header/Header";
import Button from "../../../components/Button/Button";
import "./purchase.css";

const Purchase = () => {

  const user = useSelector(selectUser).user;
  const games = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  
  const [payment_method, setPaymentMethod] = React.useState(
    user.payment_methods.length > 0 ? user.payment_methods[0].id : ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buy = () => {
    for (let game of games) {
      buyGame(user.email, game.id, payment_method).then((response) => {
        if (response.status === 200) {
          dispatch(addGameToPurchases(game))
        }
      });
      
    }
    dispatch(clear());
    navigate(`/your-games`)
  }

  return (
    <div>
      <Header currentPage={"cart"} />
      <div className="purchase">
        <main className="main">
          <h1>Realiza tu compra</h1>
          <div className="sub">
            <h2>Carrito</h2>
            <ul>
              {games.map((game) => (
                <li key={game.id}>
                  <p>{game.name} (${game.price}) </p>
                </li>
              ))}
            </ul>

            <p className="total">Total: ${total}</p>
          </div>
          <div className="sub">
            <h2>Método de pago</h2>
            <select
              value={payment_method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {user.payment_methods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name} {method.number}
                </option>
              ))}
            </select>
            <a href="/shop/payment-method">Añadir método de pago</a>
          </div>
          <Button text="Terminar compra" onClick={buy} btn_class={"finish-buy"} />
        </main>
      </div>
    </div>
  );
};

export default Purchase;
