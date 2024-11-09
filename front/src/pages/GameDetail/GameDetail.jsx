import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

import {addItem, selectCartUser } from "../../app/slices/cart/cartSlice"
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button/Button"
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";

import { getGamebyId, postComment } from "../../utils/fetchGames";
import "./gameDetail.css";

export const loader = async ({ params }) => {
  const { id } = params;
  return await getGamebyId(id);
};

const GameDetail = () => {
  const game = useLoaderData();
  
  
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const dispatch = useDispatch()
  const user = useSelector(selectCartUser)


  const [rating, setRating] = useState(0);

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const handleAddToCart = () => {
    dispatch(
    addItem({
      item: game,
      quantity: 1
    }))
  }

  const sendComment = () => {

    if (document.getElementById("comment").value !== "") {
      const comment = {
        email_user: user.email,
        rating: parseFloat(rating),
        comment: document.getElementById("comment").value
      };
      
      postComment(game.id, comment).then(() => {
        closeModal()
      })
  }}


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
              <p>Puntuación: {game.rating}</p>
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
            <div className="game-comments">
                <h2>Reseñas</h2> <Button text = "Opinar sobre este juego" btn_class={"btn-comment"} onClick={openModal} />
                {
                  game.comments.map((comment, index) => {
                    return (
                    <div key={index} className="comment">
                      <h3><strong>{comment.email_user}</strong> puntuó: {comment.rating}</h3>
                      <p>{comment.comment}</p>
                    </div>
                  )})
                }
            </div>
          </div>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <form onSubmit={(e) => e.preventDefault()} className="modal-form">
              <div className="top">
                <img src={game.logo_url} alt="" className="logo" />
                <h3>{game.name}</h3>

                <input
                  type="range"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.5"
                  value={rating}
                  onChange={handleChange}
                  required
                />

                <span>Puntuación: {rating}</span>  

              </div>
              <textarea name="comment" id="comment" placeholder="Escribe tu comentario" required />
              <Button text="Puntuar" btn_class={"btn-send-comment"} onClick={sendComment} />
            </form>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default GameDetail;
