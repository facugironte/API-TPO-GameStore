import React, { useState, useEffect } from "react";

import { getGames } from "../utils/fetchGames";
import Header from "../components/Header/Header";
import CreateGameForm from "../components/forms/CreateGameForm";
import GameList from "../components/GameList";

const Store = () => {
  const [games, setGames] = useState([]);

  const loadGames = () => {
    setTimeout(() => {
      getGames().then((data) => {
        setGames(data);
      });
    }, 100);
  };

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <div>
      <Header currentPage={"store"} />
      <div className="games">
        <main className="main">
          <GameList games={games} onGameEliminated={loadGames} />
          <CreateGameForm onGameCreated={loadGames} />
        </main>
      </div>
    </div>
  );
};

export default Store;
