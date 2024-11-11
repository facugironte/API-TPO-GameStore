import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import { removeItem } from "../../app/slices/cart/cartSlice";
import { selectIsLoggedIn, selectUser } from "../../app/slices/login/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart, faEye, faHeart, faPercent, faStar } from "@fortawesome/free-solid-svg-icons";

import "./gameList.css";

const GameList = ({game, mode, onRemove}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogged = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const purchased_games = isLogged ? user.user.purchased_games : [];

  const handleDetail = (game) => {
    navigate(`/store/game-details/${game.id}`);
  };

  const deleteFromCart = (game) => {
    dispatch(removeItem(game));
  };

  const handleEdit = () => {
    navigate(`/company-game-state/${game.id}`);
  };

  const handleDownload = (game) => {
    alert("Tu juego se está descargando...")
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(game.id); // Llamando a la función pasada como prop
    }
  };

  return (
    <div className="game-list">
      <img src={game.logo_url} alt={game.name} className="game-image" />
      <div className="game-info">
        <h1>{game.name}</h1>

        {/* Modo de estadísticas */}
        {mode === "stats" && (
                      
          <>
            <p className="game-state">
              <strong>Estado:</strong> {game.state}
            </p>
            <p>
              <FontAwesomeIcon icon={faShoppingCart}/> UNIDADES VENDIDAS: {game.sales}
            </p>

            <p>
            <FontAwesomeIcon icon={faEye}/> CANTIDAD DE VISUALIZACIONES: {game.visualizations}
            </p>

            <p>
            <FontAwesomeIcon icon={faHeart}/> WISHLISTS: {game.addToWishlist}
            </p>

            <p>
              <FontAwesomeIcon icon={faPercent}/> TASA DE CONVERSION: {`${(game.salesOverViews * 100).toFixed(2)}%`}
            </p>
            <p>
              <FontAwesomeIcon icon={faStar}/> RATING: {`${(game.rating).toFixed(2)}`}
            </p>
          </>
        )}

        {/* Modos edit/store/library/cart */}
        {mode === "edit" && (
          <div className="game-description-modify">
            <p className="game-state">
              <strong>Estado:</strong> {game.state}
            </p>
            <p className="game-description">{game.description}</p>
            <Button btn_class={"modify-btn"} text={"Ver estado"} onClick={handleEdit} />
          </div>
        )}

        {mode === "store" && (
          <div className="game-details">
            <p className="game-description">{game.description}</p>
            {purchased_games.some((pGame) => pGame.id === game.id) ? (
              <p>Adquirido!</p>
            ) : (
              <>
                <div>
                  <p className="price">${game.price}</p>
                <Button text={"Ver info"} btn_class={"btn-options"} onClick={() => handleDetail(game)} />

                </div>
              </>
            )}
          </div>
        )}

        {mode === "library" && (
          <Button text={"Descargar"} btn_class={"btn-options"} onClick={() => handleDownload(game)} />
        )}

        {mode === "cart" && (
          <div className="cart-options">
            <p>${game.price}</p>
            <Button icon={faTrash} btn_class={"btn-cart-trash"} onClick={() => deleteFromCart(game)} />
          </div>
        )}

        {mode === "wishlist" && (
          <div className="wishlist-options">

            <p className="wishlist-description">{game.description}</p>
            <div className="wishlist-price-buttons">
              <p className="wishlist-price">${game.price}</p>
              <Button text={"Eliminar"} btn_class={"btn-wishlist"} onClick={handleRemove} />
              <Button text={"Ver info"} btn_class={"btn-wishlist"} onClick={() => handleDetail(game)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameList;
