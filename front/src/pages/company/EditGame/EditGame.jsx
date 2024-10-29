import React from 'react';
import Header from '../../../components/Header/Header';
import GameForm from '../../../components/GameForm/GameForm';

const ModificarJuego = () => {
  const existingGameData = {
    nombre: 'Nombre Existente',
    precio: '100',
    descripcion: 'Descripción existente del juego',
    categoria: 'Categoría existente',
    idioma: 'Español',
    jugadores: '1-4',
    sistemaOperativo: 'Windows',
    minimos: {
      procesador: 'Intel i5',
      memoria: '8GB',
      graficos: 'NVIDIA GTX 960',
      almacenamiento: '20GB',
      sonido: 'Compatible'
    },
    recomendados: {
      procesador: 'Intel i7',
      memoria: '16GB',
      graficos: 'NVIDIA GTX 1080',
      almacenamiento: '50GB',
      sonido: 'Compatible'
    }
  };

  const handleModifyGame = (juego) => {
    console.log('Modificando juego:', juego);
  };

  return (
    <>
      <Header currentPage={"modify-game"} />
      <GameForm initialData={existingGameData} onSubmit={handleModifyGame} buttonText="Modificar Juego" />
    </>
  );
};

export default ModificarJuego;