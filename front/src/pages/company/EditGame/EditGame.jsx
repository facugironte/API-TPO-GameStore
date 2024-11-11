import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import GameForm from '../../../components/GameForm/GameForm';
import { getGamebyId, updateGame  } from '../../../utils/fetchGames';
import { useDispatch } from 'react-redux';
import { updateCompanyGame } from '../../../app/slices/login/userSlice';
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

const ModificarJuego = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const {languages, categories, sos, modes} = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadGame = async () => {
      try {
        const data = await getGamebyId(id);
        setGame(data);
      } catch (error) {
        console.error('Error al cargar el juego:', error);
      }
    };
    loadGame();
  }, [id]);

  if (!game) {
    return <p>Cargando datos del juego...</p>;
  }

  const existingGameData = {
    nombre: game.name || '',
    precio: game.price || '',
    descripcion: game.description || '',
    img: game.logo_url || '',
    port: game.cover_url || '',
    video: game.video_url || '',
    categoria: game.categories ? game.categories.map(cat => cat.name).join(", ") : '',
    idioma: game.languages ? game.languages.map(lang => lang.name).join(", ") : '',
    jugadores: game.players_modes ? game.players_modes.map(mode => mode.name).join(", ") : '',
    sistemaOperativo: game.sos ? game.sos.map(so => so.name).join(", ") : '',
    minimos: {
      procesador: game.minCpu || '',
      memoria: game.minRam || '',
      graficos: game.minGpu || '',
      almacenamiento: game.minStorage || '',
      sonido: game.minSound || ''
    },
    recomendados: {
      procesador: game.optCpu || '',
      memoria: game.optRam || '',
      graficos: game.optGpu || '',
      almacenamiento: game.optStorage || '',
      sonido: game.optSound || ''
    }
  };

  const handleModifyGame = async (juego) => {
    try {


      await updateGame(id, {
        name: juego.nombre,
        price: parseFloat(juego.precio),
        description: juego.descripcion,
        logo_url: juego.img,
        cover_url: juego.port,
        video_url: juego.video,
        categories: juego.categoria.split(", "),
        languages: juego.idioma.split(", "),
        players_modes: juego.jugadores.split(", "),
        sos: juego.sistemaOperativo.split(", "),
        minCpu: juego.minimos.procesador,
        minRam: juego.minimos.memoria,
        minGpu: juego.minimos.graficos,
        minStorage: juego.minimos.almacenamiento,
        minSound: juego.minimos.sonido,
        optCpu: juego.recomendados.procesador,
        optRam: juego.recomendados.memoria,
        optGpu: juego.recomendados.graficos,
        optStorage: juego.recomendados.almacenamiento,
        optSound: juego.recomendados.sonido,
      }).then((data) => {
        dispatch(updateCompanyGame(data))
      })

      navigate('/company-your-games');
    } catch (error) {
      console.error('Error al actualizar el juego:', error);
    }
  };

  return (
    <>
      <Header currentPage={"modify-game"} />
      <GameForm initialData={existingGameData} onSubmit={handleModifyGame} buttonText="Modificar Juego" languages={languages} categories={categories} sos={sos} modes={modes} />
    </>
  );
};

export default ModificarJuego;