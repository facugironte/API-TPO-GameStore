import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import MainModifyGame from "../components/mains/MainModifyGame";

const ModifyGame = () => {
  const location = useLocation();
  const { game } = location.state;

  return (
    <div>
      <Header currentPage={"store"} />
      <MainModifyGame game={game} />
    </div>
  );
};

export default ModifyGame;
