import React, { useState } from 'react';
import Header from '../../../components/Header/Header';
import './PerfilEmpresa.css';

const PerfilEmpresa = () => {
  const [empresa, setEmpresa] = useState({
    nombre: '',
    cuit: '',
    logo: 'https://download.logo.wine/logo/Rockstar_Games/Rockstar_Games-Logo.wine.png',
    usuario: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos guardados:', empresa);
  };

  return (
    <>
      <Header currentPage={"company-profile"}  />
      <div className="profile-container">
        <main className="main">
          <h2>Tu perfil</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre de la empresa</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={empresa.nombre}
              onChange={handleChange}
            />

            <label htmlFor="cuit">CUIT</label>
            <input
              type="text"
              id="cuit"
              name="cuit"
              value={empresa.cuit}
              onChange={handleChange}
            />

            <label>Logo de la empresa</label>
            <div className="logo-container">
              <img src={empresa.logo} alt="Logo de la empresa" />
            </div>

            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={empresa.usuario}
              onChange={handleChange}
            />

            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={empresa.contraseña}
              onChange={handleChange}
            />

            <button type="submit">Guardar cambios</button>
          </form>
        </main>
      </div>
    </>
  );
};

export default PerfilEmpresa;