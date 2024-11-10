import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { getGames } from "../../../utils/fetchGames"; // Importa la función correctamente
import "./forum.css";

const Forum = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Llama a getGames y guarda los comentarios de cada juego en el estado
    getGames([])
      .then((games) => {
        const allComments = [];

        // Recorre cada juego y sus comentarios
        games.forEach((game) => {
          game.comments.forEach((comment) => {
            allComments.push({
              id: `${game.id}-${comment.email_user}`, // Generar un ID único
              user: comment.email_user,
              game: game.name,
              rating: comment.rating,
              review: comment.comment,
            });
          });
        });

        setReviews(allComments);
      })
      .catch((error) => {
        console.error("Error al obtener los juegos:", error);
      });
  }, []);

  return (
    <>
      <Header currentPage={"community"} />
      <div className="forum">
        <main className="main">
          {reviews.map((review) => (
            <div key={review.id} className="forum-list">
              <p className="forum-user">
                <strong>{review.user}</strong> sobre <em>{review.game}</em>
              </p>
              <div className="forum-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="forum-review">{review.review}</p>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Forum;