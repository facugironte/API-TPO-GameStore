import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Game from "../components/Game/Game";
import "../components/styles/home.css";
import { getGames } from "../utils/fetchGames";

const Home = () => {
  const [games, setGames] = React.useState([]);
  useEffect(() => {
    setTimeout(() => {
      getGames().then((data) => {
        setGames(data);
      });
    }, 100);
  }, []);

  return (
    <>
      <Header currentPage={"home"} />
      <div className="home">
        <main className="main">
          <div className="center">
            {/* Sección de lanzamientos */}
            <section className="game-section">
              <h2>Nuevos Lanzamientos!</h2>
              <div className="game-grid">
                {games.map((game, index) => (
                  <Game game={game} key={index} />
                ))}
              </div>
            </section>

            {/* Sección de los más vendidos */}
            <section className="game-section">
              <h2>Los más vendidos</h2>
              <div className="game-grid">
                {games.map((game, index) => (
                  <Game game={game} key={index} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
