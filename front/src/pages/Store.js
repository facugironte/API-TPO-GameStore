import React, { useState, useEffect } from "react";

import { getGames } from "../utils/fetchGames";
import MainGames from "../components/mains/MainGames";
import Header from "../components/Header";

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
      <MainGames games={games} loadGames={loadGames} />
    </div>
  );
};

export default Store;
