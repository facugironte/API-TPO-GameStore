import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../components/Header/Header';
import { selectUser } from "../../../app/slices/login/userSlice";
import './PerfilEmpresa.css';
import { updateUser } from '../../../utils/fetchUsers';
import ProfileForm from '../../../components/Profile-Form/Profile-form';

const PerfilEmpresa = () => {
  const user = useSelector(selectUser).user;
  const [empresa, setEmpresa] = useState({
    nombre: user.company_name,
    cuit: user.CUIT,
    logo: user.company_logo_url,
    email: user.email,
    contraseña: user.password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(user.email, {
        company_name: empresa.nombre,
        CUIT: empresa.cuit,
        company_logo_url: empresa.logo,
        email: empresa.email,
        password: empresa.contraseña,
      });

      if (!response.ok) throw new Error('Error al guardar cambios');
    } catch (error) {
      
    }
  };

  const fields = [
    { name: "nombre", label: "Nombre de la empresa" },
    { name: "cuit", label: "CUIT" },
    { name: "logo", label: "Logo URL" },
    { name: "email", label: "Email" },
    { name: "contraseña", label: "Contraseña", type: "password" }
  ];

  return (
    <>
      <Header currentPage={"company-profile"} />
      <div className="profile-empresa">
        <main className="main">
          <h2>Tu perfil</h2>
          <div className="logo-container">
            <img src={empresa.logo} alt="Logo de la empresa" />
          </div>
          <ProfileForm fields={fields} userData={empresa} handleChange={handleChange} handleSubmit={handleSubmit} />
        </main>
      </div>
    </>
  );
};

export default PerfilEmpresa;
