import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button"
import {addItem } from "../../app/slices/cart/cartSlice"
import { useDispatch } from "react-redux";
import "./gameDetail.css";

const GameDetail = () => {
  const location = useLocation();
  const { game } = location.state;
  const dispatch = useDispatch()


  const handleAddToCart = () => {
    dispatch(
    addItem({
      item: game,
      quantity: 1
    }))
  }


  return (
    <div>
      <Header currentPage={"store"}  />
      <div className="game-detail">
        <main className="main">
          <div className="game-header">
            <img src={game.logo_url} alt={game.name} />
            <h1>{game.name}</h1>
            <iframe 
              src={game.video_url} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
            <div className="price">
              <p>${game.price}</p>
              <div className="btns-anadir">
                <Button text={"Añadir al carrito"} btn_class={"btn-anadir"} onClick={handleAddToCart}/>
                <Button text={"Añadir a wishlist"} btn_class={"btn-anadir"}/>
              </div>
            </div>
            <div className="rating">
              <p>★★★★★</p>
              <div className="categories">
                {
                  game.categories.map((category, index) => (
                    <p key={index}>{category.name}</p>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="game-info">
            <div className="game-about">
              <h2>Acerca de este juego</h2>
              <p>{game.description}</p>
            </div>

            <div className="requirements">
              <div className="min">
                  <h2>Requisitos mínimos</h2>
                  <p>Sistema operativo: {game.sos.map((so) => so.name).join(", ")}</p>
                  <p>Procesador: {game.minCpu.name}</p>
                  <p>Memoria RAM: {game.minRam}</p>
                  <p>Gráficos: {game.minGpu.name}</p>
                  <p>Almacenamiento: {game.minStorage}</p>
                  <p>Sonido: {game.minSound}</p>
              </div>
              <div className="rec">
                  <h2>Requisitos recomendados</h2>
                  <p>Sistema operativo: {game.sos.map((so) => so.name).join(", ")}</p>
                  <p>Procesador: {game.optCpu.name}</p>
                  <p>Memoria RAM: {game.optRam}</p>
                  <p>Gráficos: {game.optGpu.name}</p>
                  <p>Almacenamiento: {game.optStorage}</p>
                  <p>Sonido: {game.optSound}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GameDetail;
