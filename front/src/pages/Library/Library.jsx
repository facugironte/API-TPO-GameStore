import React, { useState, useEffect } from "react";

import { getGames } from "../../utils/fetchGames";
import Header from "../../components/Header/Header";
import GameList from "../../components/GameList/GameList";
import "./library.css";

const Library = () => {

  const [games, setGames] = useState([]);

  const loadGames = () => {
    setTimeout(() => {
      getGames([{name: "state", value: "PUBLICADO"}]).then((data) => {
        setGames(data);
      });
    }, 100);
  };

  useEffect(() => {
    loadGames();
  }, []);


  return (
    <div>
      <Header currentPage={"your-games"} />
      <div className="library">
        <main className="main">
          <ul>
            {games.map((game, index) => (
              <GameList key={index} game={game} mode="library" />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Library;
