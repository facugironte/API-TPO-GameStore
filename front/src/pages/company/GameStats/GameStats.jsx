import React from "react";
import Header from "../../../components/Header/Header";
import GameList from "../../../components/GameList/GameList";
import { useSelector } from "react-redux";
import { selectUser } from "../../../app/slices/login/userSlice";
import "./gameStats.css";

const GameStats = () => {
  
  const user = useSelector(selectUser).user;

  const games = user.company_games;


  return (
    <>
      <Header currentPage={"stats"} />
      <div className="estadisticas">
        <main className="main">
          <div className="estadisticas-container">
            {games.map((game, index) => (
              <GameList
                key={index}
                game = {game}
                mode="stats"
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default GameStats;
