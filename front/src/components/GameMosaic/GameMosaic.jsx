import React from "react";
import "./gameMosaic.css";

const GameMosaic = ({ game }) => {
  return (
    <div className="game">
      <img src={game.cover_url} alt={game.name}></img>
      <p>{game.name}</p>
    </div>
  );
};

export default GameMosaic;
