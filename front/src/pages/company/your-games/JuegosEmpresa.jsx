import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import GameList from "../../../components/GameList/GameList";
import { useSelector } from "react-redux";
import { selectUser } from "../../../app/slices/login/userSlice";
import "./JuegosEmpresa.css";
import Button from "../../../components/Button/Button";

const JuegosEmpresa = () => {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.user && user.user.company_games) {
      setJuegos(user.user.company_games);
      setLoading(false);
    }
    
  }, [user]);

  const removeGame = (gameId) => {
    setJuegos((prevJuegos) => prevJuegos.filter((juego) => juego.id !== gameId));
  };

  if (loading) {
    return <p>Cargando juegos...</p>;
  }

  return (
    <>
      <Header currentPage={"company-your-games"} />
      <div className="juegos">
        <main className="main">
          <div className="juegos-container">
            <div className="nuevo-juego">
              <a href="/new-game">
                <Button text={"NUEVO JUEGO +"} btn_class={"btn-nuevo-juego"} />
              </a>
            </div>
            <div className="juegos-lista">
              {juegos.map((juego) => (
                <GameList
                  key={juego.id}
                  game={juego}
                  mode="edit"
                  onRemove={removeGame}
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