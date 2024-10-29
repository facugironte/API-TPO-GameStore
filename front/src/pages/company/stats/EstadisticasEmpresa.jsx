import React from "react";
import Header from "../../../components/Header/Header";
import GameList from "../../../components/GameList/GameList";
import "./EstadisticasEmpresa.css";

const EstadisticasEmpresa = () => {
  const games = [
    {
      name: "Grand Theft Auto V",
      state: "Publicado",
      unitsSold: "190.000.000",
      views: "300.000.000",
      wishlists: "1500.000.000",
      conversionRate: "75%",
      image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
    },
    {
      name: "Red Dead Redemption 2",
      state: "Publicado",
      unitsSold: "190.000.000",
      views: "300.000.000",
      wishlists: "1500.000.000",
      conversionRate: "75%",
      image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg"
    },
    {
      name: "Max Payne",
      state: "Publicado",
      unitsSold: "190.000.000",
      views: "300.000.000",
      wishlists: "1500.000.000",
      conversionRate: "75%",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Gx5ucZF9jSdbk4eLGO6XUE7oYAupAKSlsg&s"
    }
  ];

  return (
    <>
      <Header currentPage={"stats"} />
      <div className="estadisticas">
        <main className="main">
          <div className="estadisticas-container">
            {games.map((game, index) => (
              <GameList
                key={index}
                {...game}
                mode="stats"
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default EstadisticasEmpresa;
