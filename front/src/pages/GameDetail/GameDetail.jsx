import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./gameDetail.css";

const GameDetail = () => {
  const location = useLocation();
  const { game } = location.state;
  console.log(game);

  return (
    <div>
      <Header currentPage={"store"} />
      <div className="game-detail">
        <main className="main">
          <p>{game.name}</p>
        </main>
      </div>
    </div>
  );
};

export default GameDetail;
