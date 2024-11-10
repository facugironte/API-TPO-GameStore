import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import GameForm from '../../../components/GameForm/GameForm';
import { getGamebyId, updateGame  } from '../../../utils/fetchGames';
import { useDispatch } from 'react-redux';
import { updateCompanyGame } from '../../../app/slices/login/userSlice';

const ModificarJuego = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
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
      const jugadoresMapping = {
        "1": "Un jugador",
        "2": "Dos jugadores",
        "3": "Online",
      };
      const jugadoresNombres = juego.jugadores.split(", ").map(jugador => jugadoresMapping[jugador] || jugador);

      await updateGame(id, {
        name: juego.nombre,
        price: parseFloat(juego.precio),
        description: juego.descripcion,
        logo_url: juego.img,
        categories: juego.categoria.split(", "),
        languages: juego.idioma.split(", "),
        players_modes: jugadoresNombres,
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
  console.log(game)

  return (
    <>
      <Header currentPage={"modify-game"} />
      <GameForm initialData={existingGameData} onSubmit={handleModifyGame} buttonText="Modificar Juego" />
    </>
  );
};

export default ModificarJuego;