import React from 'react';
import Header from '../../../components/Header/Header';
import GameForm from '../../../components/GameForm/GameForm';
import { postGame } from '../../../utils/fetchGames';
import { useSelector } from "react-redux";
import { selectUser } from "../../../app/slices/login/userSlice";
import { useLoaderData } from "react-router-dom";
import { getCategories, getLanguages, getPlayerModes, getSos } from "../../../utils/fetchCombos";

export async function loader() {
  let languages = await getLanguages();
  languages =languages.map((language) => language.name)
  let categories = await getCategories();
  categories = categories.map((category) => category.name)
  let sos = await getSos();
  sos = sos.map((so) => so.name)
  let modes = await getPlayerModes();
  modes = modes.map((mode) => mode.name)

  return { languages, categories, sos, modes };
}

const NewGame = () => {
  const user = useSelector(selectUser).user;
  
  const initialData = {
    nombre: '',
    precio: '',
    descripcion: '',
    img: '',
    port: '',
    video: '',
    categoria: '',
    idioma: '',
    jugadores: '',
    sistemaOperativo: '',
    minimos: {
      procesador: '',
      memoria: '',
      graficos: '',
      almacenamiento: '',
      sonido: ''
    },
    recomendados: {
      procesador: '',
      memoria: '',
      graficos: '',
      almacenamiento: '',
      sonido: ''
    }
  };

  const {languages, categories, sos, modes} = useLoaderData();

  const handleAddGame = async (gameData) => {
    const newGame = {
      name: gameData.nombre,
      company_id: user.id,
      price: parseFloat(gameData.precio),
      description: gameData.descripcion,
      logo_url: gameData.img,
      cover_url: gameData.port,
      video_url: gameData.video,
      categories: [gameData.categoria],
      languages: [gameData.idioma],
      players_modes: [gameData.jugadores],
      sos: [gameData.sistemaOperativo],
      minCpu: gameData.minimos.procesador,
      minGpu: gameData.minimos.graficos,
      minRam: gameData.minimos.memoria,
      minStorage: gameData.minimos.almacenamiento,
      minSound: gameData.minimos.sonido,
      optCpu: gameData.recomendados.procesador,
      optGpu: gameData.recomendados.graficos,
      optRam: gameData.recomendados.memoria,
      optStorage: gameData.recomendados.almacenamiento,
      optSound: gameData.recomendados.sonido,
    };

    try {
      const response = await postGame(newGame);
      console.log("Juego añadido con éxito:", response);
    } catch (error) {
      console.error("Error al añadir el juego:", error);
    }
  };

  return (
    <>
      <Header currentPage={"new-game"} />
      <GameForm initialData={initialData} onSubmit={handleAddGame} buttonText="Añadir Juego" languages={languages} categories={categories} sos={sos} modes={modes} />
    </>
  );
};

export default NewGame;