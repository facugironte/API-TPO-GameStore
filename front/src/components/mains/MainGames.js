import React from "react";
import GameList from "../GameList";
import "../styles/main.css";
import CreateGameForm from "../forms/CreateGameForm";

const MainGames = ({ games, loadGames }) => {
  return (
    <div className="games">
      <main className="main">
        <GameList games={games} onGameEliminated={loadGames} />
        <CreateGameForm onGameCreated={loadGames} />
      </main>
    </div>
  );
};

export default MainGames;
