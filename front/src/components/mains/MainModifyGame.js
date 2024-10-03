import React from "react";
import ModifyGameForm from "../forms/ModifyGameForm";
import "../styles/main.css";

const MainModifyGame = ({ game }) => {
  return (
    <div className="games">
      <main className="main">
        <ModifyGameForm data={game} />
      </main>
    </div>
  );
};

export default MainModifyGame;
