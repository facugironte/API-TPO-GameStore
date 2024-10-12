import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import GameMosaic from "../../components/GameMosaic/GameMosaic";
import { getGames } from "../../utils/fetchGames";
import "./home.css";

const Home = () => {
  const [mostSaleGames, setMostSaleGames] = React.useState([]);
  const [lastGames, setLastGames] = React.useState([]);
  useEffect(() => {
    setTimeout(() => {
      getGames(
        [
          {name: "order", value: "sales"},
          {name: "direction", value: "desc"},
          {name: "limit", value: 8},
          {name: "state", value: "PUBLICADO"}
        ]
      ).then((data) => {
        setMostSaleGames(data);
      });
      getGames(
        [
          {name: "order", value: "createdAt"},
          {name: "direction", value: "desc"},
          {name: "limit", value: 8},
          {name: "state", value: "PUBLICADO"}
        ]
      ).then((data) => {
        setLastGames(data);
      });
    }, 100);
  }, []);

  return (
    <>
      <Header currentPage={"home"} />
      <div className="home">
        <main className="main">
          {/* Sección de lanzamientos */}
          <section className="game-section">
            <h2>Nuevos Lanzamientos!</h2>
            <div className="game-grid">
              {lastGames.map((game, index) => (
                <GameMosaic game={game} key={index} />
              ))}
            </div>
          </section>

          {/* Sección de los más vendidos */}
          <section className="game-section">
            <h2>Los más vendidos</h2>
            <div className="game-grid">
              {mostSaleGames.map((game, index) => (
                <GameMosaic game={game} key={index} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
