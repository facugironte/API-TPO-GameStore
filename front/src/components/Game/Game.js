import React from "react";
import "./game.css";

const Game = ({ game }) => {
  console.log(game);

  return (
    <div className="game">
      <img src={game.image_url} alt={game.name}></img>
      <p>{game.name}</p>
    </div>
  );
};

export default Game;
