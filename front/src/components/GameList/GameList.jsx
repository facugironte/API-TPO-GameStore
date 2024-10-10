import React from "react";
import "./gameList.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const GameList = ({ game }) => {
  const navigate = useNavigate();

  const handleDetail = (game) => {
    navigate(`/games/${game.id}`, { state: { game: game } });
  };

  return (
    <div className="game-list">
      <img src={game.image_url} alt={game.name}></img>
      <div className="details">
        <p>{game.name}</p>
        <p className="description">{game.description}</p>
      </div>
      <div className="price">
        <p>${game.price}</p>
        <Button text={"Ver info"} btn_class={"btn-ver-info"} onClick={() => handleDetail(game)}/>
      </div>
    </div>
  );
};

export default GameList;
