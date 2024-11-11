import React from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../../app/slices/login/userSlice";

import Header from "../../../components/Header/Header";
import GameList from "../../../components/GameList/GameList";
import "./library.css";

const Library = () => {

  const games = useSelector(selectUser).user.purchased_games;

  return (
    <div>
      <Header currentPage={"your-games"} />
      <div className="library">
        <main className="main">
          <ul>
            <h1>Tu biblioteca</h1>
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
