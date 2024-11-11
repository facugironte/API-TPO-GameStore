import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/Header/Header';
import { selectUser, updateProfile } from "../../../app/slices/login/userSlice";
import { updateUser } from '../../../utils/fetchUsers';
import ProfileForm from '../../../components/ProfileForm/ProfileForm';

import './companyProfile.css';

const CompanyProfile = () => {

  const dispatch = useDispatch();

  const user = useSelector(selectUser).user;
  
  const [empresa, setEmpresa] = useState({
    company_name: user.company_name,
    CUIT: user.CUIT,
    company_logo_url: user.company_logo_url,
    email: user.email,
    password: user.password
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
      const data = await updateUser(user.email, empresa);

      dispatch(updateProfile(data))

    } catch (error) {
      console.error(error);
    }
  };


  const fields = [
    { name: "company_name", label: "Nombre de la empresa" },
    { name: "CUIT", label: "CUIT" },
    { name: "company_logo_url", label: "Logo URL" },
    { name: "email", label: "Email" },
    { name: "password", label: "Contraseña", type: "password" }
  ];

  return (
    <>
      <Header currentPage={"company-profile"} />
      <div className="profile-empresa">
        <main className="main">
          <h2>Tu perfil</h2>
          <div className="logo-container">
            <img src={empresa.company_logo_url} alt="Logo de la empresa" />
          </div>
          <ProfileForm fields={fields} userData={empresa} handleChange={handleChange} handleSubmit={handleSubmit} />
        </main>
      </div>
    </>
  );
};

export default CompanyProfile;
