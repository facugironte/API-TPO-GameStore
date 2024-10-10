import React, { useState, useEffect } from "react";

import { getGames } from "../../utils/fetchGames";
import Header from "../../components/Header/Header";
import GameList from "../../components/GameList/GameList";
import "./store.css";

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
      <div className="store">
        <main className="main">
          <ul>
            {games.map((game, index) => (
              <GameList key={index} game={game}  />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Store;
