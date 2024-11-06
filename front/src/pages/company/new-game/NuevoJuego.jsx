import React from 'react';
import Header from '../../../components/Header/Header';
import GameForm from '../../../components/GameForm/GameForm';

const NuevoJuego = () => {
  const initialData = {
    nombre: '',
    precio: '',
    descripcion: '',
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

  const handleAddGame = async (juego) => {
    try {
      // Hacer la solicitud POST
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...juego,
          state: "CREADO",
        }),
      });

      if (!response.ok) {
        throw new Error("Error al añadir el juego");
      }

      const newGame = await response.json();
      console.log("Juego añadido con éxito:", newGame);
      // Aquí puedes redirigir o mostrar una notificación de éxito
    } catch (error) {
      console.error("Error en handleAddGame:", error);
      // Aquí puedes mostrar una notificación de error
    }
  };

  return (
    <>
      <Header currentPage={"new-game"} />
      <GameForm initialData={initialData} onSubmit={handleAddGame} buttonText="Añadir Juego" />
    </>
  );
};

export default NuevoJuego;
