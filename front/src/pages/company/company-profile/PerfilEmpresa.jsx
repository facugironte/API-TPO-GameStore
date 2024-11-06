import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../components/Header/Header';
import { selectUser } from "../../../app/slices/login/userSlice";
import './PerfilEmpresa.css';

const PerfilEmpresa = () => {
  const user = useSelector(selectUser);
  const [empresa, setEmpresa] = useState({
    nombre: '',
    cuit: '',
    logo: 'https://download.logo.wine/logo/Rockstar_Games/Rockstar_Games-Logo.wine.png',
    usuario: '',
    contraseña: ''
  });

  useEffect(() => {
    // para cargar datos del perfil
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${user.email}`);
        if (!response.ok) throw new Error('Error al cargar perfil');
        const data = await response.json();
        setEmpresa({
          nombre: data.company_name,
          cuit: data.CUIT,
          logo: data.logo || empresa.logo,
          usuario: data.email,
          contraseña: '',
        });
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    };
    if (user?.email) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${user.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: empresa.nombre,
          CUIT: empresa.cuit,
          email: empresa.usuario,
          password: empresa.contraseña,
        }),
      });
      if (!response.ok) throw new Error('Error al guardar cambios');
      setMensaje('Perfil actualizado exitosamente');
    } catch (error) {
      setMensaje('Error al actualizar perfil:', error);
    }
  };

  return (
    <>
      <Header currentPage={"company-profile"} />
      <div className="profile-empresa">
        <main className="main">
          <h2>Tu perfil</h2>
          <form onSubmit={handleSubmit} className="profile-form">
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
