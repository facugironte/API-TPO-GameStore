import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeItem } from "../../app/slices/cart/cartSlice";
import { selectIsLoggedIn, selectUser } from "../../app/slices/login/userSlice";
import "./gameList.css";

const GameList = ({game, mode}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogged = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const purchased_games = isLogged ? user.user.purchased_games : [];

  const handleDetail = (game) => {
    navigate(`/store/game-details/${game.id}`, { state: { game: game } });
  };

  const deleteFromCart = (game) => {
    dispatch(removeItem(game));
  };

  const handleEdit = () => {
    navigate(`/company-modify-game/${game.id}`);
  };

  return (
    <div className="game-list">
      <img src={game.logo_url} alt={game.name} className="game-image" />
      <div className="game-info">
        <h2>{game.name}</h2>
        <p className="game-state"><strong>Estado:</strong> {game.state}</p>

        {/* Modo de estadísticas */}
        {mode === "stats" && (
          <>
            <p>
              <span role="img" aria-label="units-sold">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6200EA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </span>
              UNIDADES VENDIDAS: {game.sales}
            </p>

            <p>
              <span role="img" aria-label="views">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6200EA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
              </span>
              CANTIDAD DE VISUALIZACIONES: {game.visualizations}
            </p>

            <p>
              <span role="img" aria-label="wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6200EA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
              </span>
              WISHLISTS: {game.addToWishlist}
            </p>

            <p>
              <span role="img" aria-label="conversion-rate">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6200EA" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 17m-1 0a1 1 0 1 0 2 0a2 2 0 1 0 -4 0" />
                  <path d="M7 7m-1 0a1 1 0 1 0 2 0a2 2 0 1 0 -4 0" />
                  <path d="M6 18l12 -12" />
                </svg>
              </span>
              TASA DE CONVERSION: {game.salesOverViews}
            </p>
          </>
        )}

        {/* Modos edit/store/library/cart */}
        {mode === "edit" && (
          <div className="game-description-modify">
            <p className="game-description">{game.description}</p>
            <button className="modify-btn" onClick={handleEdit}>Modificar</button>
          </div>
        )}

        {mode === "store" && (
          <>
            {purchased_games.some((pGame) => pGame.id === game.id) ? (
              <p>Adquirido!</p>
            ) : (
              <>
                <p>${game.price}</p>
                <Button text={"Ver info"} btn_class={"btn-options"} onClick={() => handleDetail(game)} />
              </>
            )}
          </>
        )}

        {mode === "library" && (
          <Button text={"Descargar"} btn_class={"btn-options"} onClick={() => handleDetail(game)} />
        )}

        {mode === "cart" && (
          <div className="cart-options">
            <p>${game.price}</p>
            <Button icon={faTrash} btn_class={"btn-cart-trash"} onClick={() => deleteFromCart(game)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameList;
