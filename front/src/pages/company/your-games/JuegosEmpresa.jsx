import React from 'react';
import './JuegosEmpresa.css';
import Header from '../../../components/Header/Header';

const JuegosEmpresa = () => {
  const juegos = [
    {
      id: 1,
      nombre: 'Grand Theft Auto V',
      estado: 'Eliminado',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare libero a sem imperdiet, mollis venenatis tortor maximus.',
      imagen: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png'
    },
    {
      id: 2,
      nombre: 'Red Dead Redemption 2',
      estado: 'Sin publicar',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare libero a sem imperdiet, mollis venenatis tortor maximus.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Gx5ucZF9jSdbk4eLGO6XUE7oYAupAKSlsg&s'
    },
    {
      id: 3,
      nombre: 'Max Payne',
      estado: 'Publicado',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare libero a sem imperdiet, mollis venenatis tortor maximus.',
      imagen: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Maxpaynebox.jpg/220px-Maxpaynebox.jpg'
    },
  ];

  return (
    <>
      <Header currentPage={"company-your-games"} />
      <div className="juegos-container">
        <div className="nuevo-juego">
          <a href="/new-game">
              <button>Nuevo Juego +</button>
          </a>
        </div>
        <div className="juegos-lista">
          {juegos.map(juego => (
            <div key={juego.id} className="juego-card">
              <img src={juego.imagen} alt={juego.nombre} className="juego-imagen" />
              <div className="juego-info">
                <h3>{juego.nombre}</h3>
                <p>Estado: {juego.estado}</p>
                <p>{juego.descripcion}</p>
              </div>
              <a href="/company-modify-game">
                <button className="modificar-btn">Modificar</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JuegosEmpresa;
