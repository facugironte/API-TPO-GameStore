import React from "react";
import { deleteGame } from "../utils/fetchGames";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

const GameList = ({ games, onGameEliminated }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteGame(id).then(() => {
      onGameEliminated();
    });
  };

  const handleModify = (game) => {
    navigate(`/games/modify/${game.id}`, { state: { game: game } });
  };

  return (
    <div>
      <h2>List of games</h2>

      <ul>
        {games.map((game, index) => (
          <li key={index}>
            {game.id} - {game.name} -{" "}
            <Button text={"Modificar"} onClick={() => handleModify(game)} />
            <Button
              icon={faTrash}
              text={"Eliminar"}
              onClick={() => handleDelete(game.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
/*

*/
