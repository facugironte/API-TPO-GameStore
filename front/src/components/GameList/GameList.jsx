import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./gameList.css";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../app/slices/cart/cartSlice";
import { selectIsLoggedIn, selectUser } from "../../app/slices/login/userSlice";

const GameList = ({ game, mode }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogged = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser);
  
  const purchased_games = isLogged ? user.user.purchased_games : []

  const handleDetail = (game) => {
    navigate(`/store/game-details/${game.id}`, { state: { game: game } });
  };

  const deleteFromCart = (game) => {
    dispatch(removeItem(game))
  };

  return (
    <div className="game-list">
      <img src={game.logo_url} alt={game.name}></img>
      <div className="details">
        <p>{game.name} <span>{game.company_owner.company_name}</span></p>
        <p className="description">{game.description}</p>
      </div>
      <div className={(mode === "cart" ? "cart-options" : "options")}>
        {mode === "store" && (
            <>{
                purchased_games.some((pGame) => pGame.id === game.id) ? 
                (<p>Adquirido!</p>) :
                (
                  <>
                    <p>${game.price}</p>
                    <Button text={"Ver info"} btn_class={"btn-options"} onClick={() => handleDetail(game)}/>
                  </>
                )
            }</>
          )
        }
        {
          mode === "library" && (
            <Button text={"Descargar"} btn_class={"btn-options"} onClick={() => handleDetail(game)}/>
          )
        }
        {
          mode === "cart" && (
            <>
              <p>${game.price}</p>
              <Button icon = {faTrash} btn_class={"btn-cart-trash"} onClick={() => deleteFromCart(game)}/>
            </>
          )
        }
      </div>
    </div>
  );
};

export default GameList;
