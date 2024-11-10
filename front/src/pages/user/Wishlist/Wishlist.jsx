import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import GameList from "../../../components/GameList/GameList";
import "./wishlist.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../app/slices/login/userSlice";
import { deleteGameFromWishlist } from "../../../utils/fetchGames";

const Wishlist = () => {
  const user = useSelector(selectUser).user;
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (user && user.wishlists) {
      setGames(user.wishlists);
    }
  }, [user]);

  // Función para manejar la eliminación de un juego
  const handleRemoveGame = async (gameId) => {
    try {
      await deleteGameFromWishlist(user.email, gameId);
      setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
    } catch (error) {
      console.error("Error al eliminar el juego de la wishlist:", error);
    }
  };

  return (
    <div>
      <Header currentPage={"wishlist"} />
      <div className="wishlist">
        <main className="main">
          <ul>
            {games.map((game, index) => (
              <GameList
                key={index}
                game={game}
                mode="wishlist"
                onRemove={handleRemoveGame} // Pasando handleRemoveGame como prop
              />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Wishlist;
