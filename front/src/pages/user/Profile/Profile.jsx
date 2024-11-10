import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../components/Header/Header';
import { selectUser } from "../../../app/slices/login/userSlice";
import { updateUser } from '../../../utils/fetchUsers';
import ProfileForm from '../../../components/Profile-Form/Profile-form';

const PerfilUsuario = () => {
  const user = useSelector(selectUser).user;

  const formattedDate = new Date(user.birthdate).toISOString().split('T')[0];

  const [usuario, setUsuario] = useState({
    nombreCompleto: user.user_fullname,
    fechaNacimiento: formattedDate,
    contraseña: user.password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(user.email, {
        user_fullname: usuario.nombreCompleto,
        birthdate: usuario.fechaNacimiento,
        password: usuario.contraseña,
      });

      if (!response.ok) throw new Error('Error al guardar cambios');
    } catch (error) {
      // Error handling
    }
  };

  const fields = [
    { name: "nombreCompleto", label: "Nombre completo" },
    { name: "fechaNacimiento", label: "Fecha de nacimiento", type: "date" },
    { name: "contraseña", label: "Contraseña", type: "password" }
  ];

  return (
    <>
      <Header currentPage={"user-profile"} />
      <div className="profile-empresa">
        <main className="main">
          <h2>Tu perfil</h2>
          <ProfileForm fields={fields} userData={usuario} handleChange={handleChange} handleSubmit={handleSubmit} />
        </main>
      </div>
    </>
  );
};

export default PerfilUsuario;
