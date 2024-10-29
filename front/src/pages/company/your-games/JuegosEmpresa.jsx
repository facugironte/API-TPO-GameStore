import React from "react";
import Header from "../../../components/Header/Header";
import GameList from "../../../components/GameList/GameList";
import "./JuegosEmpresa.css";

const JuegosEmpresa = () => {
  const juegos = [
    {
      id: 1,
      name: "Grand Theft Auto V",
      state: "Eliminado",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare libero a sem imperdiet, mollis venenatis tortor maximus.",
      image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
    },
    {
      id: 2,
      name: "Red Dead Redemption 2",
      state: "Sin publicar",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare libero a sem imperdiet, mollis venenatis tortor maximus.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Gx5ucZF9jSdbk4eLGO6XUE7oYAupAKSlsg&s"
    },
    {
      id: 3,
      name: "Max Payne",
      state: "Publicado",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare libero a sem imperdiet, mollis venenatis tortor maximus.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Maxpaynebox.jpg/220px-Maxpaynebox.jpg"
    }
  ];

  return (
    <>
      <Header currentPage={"company-your-games"} />
      <div className="juegos">
        <main className="main">
          <div className="juegos-container">
            <div className="nuevo-juego">
              <a href="/new-game">
                <button>Nuevo Juego +</button>
              </a>
            </div>
            <div className="juegos-lista">
              {juegos.map((juego) => (
                <GameList
                  key={juego.id}
                  name={juego.name}
                  state={juego.state}
                  description={juego.description}
                  image={juego.image}
                  mode="edit"
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default JuegosEmpresa;
