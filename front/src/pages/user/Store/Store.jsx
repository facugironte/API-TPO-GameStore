import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { getGames } from "../../../utils/fetchGames";
import { getCategories, getLanguages, getPlayerModes, getSos } from "../../../utils/fetchCombos";
import Header from "../../../components/Header/Header";
import GameList from "../../../components/GameList/GameList";
import "./store.css";

export async function loader() {
  const languages = [{id: null, name: "Todos"}, ...await getLanguages()];
  const categories = [{id: null, name: "Todos"}, ...await getCategories()];
  const sos = [{id: null, name: "Todos"}, ...await getSos()];
  const modes = [{id: null, name: "Todos"}, ...await getPlayerModes()];

  return { languages, categories, sos, modes };
}

const Store = () => {
  const [games, setGames] = useState([]);
  
  const {languages, categories, sos, modes} = useLoaderData();

  const loadGames = (filters = []) => {

    filters = [...[{name: "state", value: "PUBLICADO"}],...filters.filter(filter => filter.value !== "Todos")]

    getGames(filters).then((data) => {
      setGames(data);
    });

  };

  useEffect(() => {
    loadGames();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const filters = [];
    const form = event.target;
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      if (element.name && element.value) {
        filters.push({ name: element.name, value: element.value });
      }
    }
    loadGames(filters);

  };

  return (
    <div>
      <Header currentPage={"store"} />
      <div className="store">
        <main className="main">
          <ul>
        <h1>Tienda</h1>
            {games.map((game, index) => (
              <GameList key={index} game={game} mode = "store" />
            ))}
          </ul>
        </main>
        <aside className="aside">
          <h2>Filtros</h2>
          <form onSubmit={handleSubmit} className="search-game">
            <input type="text" name="name" placeholder="Buscar juego..." />

            <label>Categoría</label>
            <select name="category">
              {
                categories.map((category, index) => (
                  <option key={index} value={category.name}>{category.name}</option>
                ))
              }
            </select>

            <label>Precio</label>
            <input type="number" name="minPrice" placeholder="Mínimo" />
            <input type="number" name="maxPrice" placeholder="Máximo" />

            <label>Sistema operativo</label>
            <select name="os">
              {
                sos.map((os, index) => (
                  <option key={index} value={os.name}>{os.name}</option>
                ))
              }
            </select>

            <label>Idioma</label>
            <select 
              name="language" 
            >
              {
                languages.map((language, index) => (
                  <option key={index} value={language.name}>{language.name}</option>
                ))
              }
            </select>

            <label>Cantidad de jugadores</label>
            <select name="players_mode">
              {
                modes.map((mode, index) => (
                  <option key={index} value={mode.name}>{mode.name}</option>
                ))
              }
            </select>

            <label>Calificación</label>
            <input type="range" name="rating" min="0" max="5" step="0.5" defaultValue={"0"} />

            <input type="submit" value="Aplicar filtros" />

          </form>
        </aside>
      </div>
    </div>
  );
};

export default Store;