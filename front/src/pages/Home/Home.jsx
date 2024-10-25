import React from "react";
import Header from "../../components/Header/Header";
import GameMosaic from "../../components/GameMosaic/GameMosaic";
import { getGames } from "../../utils/fetchGames";
import "./home.css";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const mostSaleGames = await getGames(
    [
      {name: "order", value: "sales"},
      {name: "direction", value: "desc"},
      {name: "limit", value: 8},
      {name: "state", value: "PUBLICADO"}
    ]
  );
  const lastGames = await getGames(
    [
      {name: "order", value: "createdAt"},
      {name: "direction", value: "desc"},
      {name: "limit", value: 8},
      {name: "state", value: "PUBLICADO"}
    ]
  );
  return { mostSaleGames, lastGames };
}

const Home = () => {

  const { mostSaleGames, lastGames } = useLoaderData();
  console.log("hola")

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