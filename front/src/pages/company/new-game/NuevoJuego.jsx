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

  const handleAddGame = (juego) => {
    console.log('Añadiendo nuevo juego:', juego);
    // Lógica para añadir el juego
  };

  return (
    <>
      <Header currentPage={"new-game"} />
      <GameForm initialData={initialData} onSubmit={handleAddGame} buttonText="Añadir Juego" />
    </>
  );
};

export default NuevoJuego;
