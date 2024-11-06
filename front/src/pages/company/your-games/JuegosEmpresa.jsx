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
      setJuegos(user.user.company_games); // traer los juegos directamente del usuario
      setLoading(false);
    }
  }, [user]); // se ejecuta cada vez que el usuario cambia

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
              <Button text = {"Nuevo Juego +"} btn_class={"btn-nuevo-juego"}/>
              </a>
            </div>
            <div className="juegos-lista">
              {juegos.map((juego) => (
                <GameList
                  key={juego.id}
                  game = {juego}
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