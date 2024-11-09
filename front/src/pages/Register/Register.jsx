import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { registerAuth } from "../../utils/fetchAuth";

import "./register.css";
import { getQuestions } from "../../utils/fetchCombos";

export async function loader(){
  const secQuestions = await getQuestions();
  console.log(secQuestions);
  return {secQuestions}
}

const Register = () => {
  const [userData, setUserData] = useState({account_type: "USUARIO"});
  const [userType, setUserType] = useState("USUARIO");

  const { secQuestions } = useLoaderData();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerAuth(userData);
      alert(response.message)
      navigate("/login");
      console.log(response)

    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <div>
      <Header currentPage={"login"} />

      <div className="main-register">
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
            required
          />

          <label htmlFor="account_type">Tipo de usuario</label>
          <select
            id="account_type"
            value={userData.account_type}
            onChange={(e) => {
              setUserData({ ...userData, account_type: e.target.value });
              setUserType(e.target.value);
            }}
            required
          >
            
            <option value="USUARIO">Cliente</option>
            <option value="EMPRESA">Empresa</option>
          </select>

          {userType === "EMPRESA" && 
            (
              <>
                <label htmlFor="company_name">Nombre de la empresa</label>
                <input
                  type="text"
                  id="company_name"
                  value={userData.company_name}
                  onChange={(e) => {
                    setUserData({ ...userData, company_name: e.target.value });
                  }}
                  required
                />
                <label htmlFor="CUIT">CUIT</label>
                <input
                  type="text"
                  id="CUIT"
                  value={userData.CUIT}
                  onChange={(e) => {
                    setUserData({ ...userData, CUIT: e.target.value });
                  }}
                  required
                />
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  value={userData.company_description}
                  onChange={(e) => {
                    setUserData({ ...userData, company_description: e.target.value });
                  }}
                  required
                />
                <label htmlFor="logo">Logo de la empresa</label>
                <input
                  type="text"
                  id="logo"
                  value={userData.company_logo_url}
                  onChange={(e) => {
                    setUserData({ ...userData, company_logo_url: e.target.value });
                  }}
                  required
                />
              </>
            )
          }
          {
            userType === "USUARIO" &&
            (
              <>
                <label htmlFor = "birthdate">Fecha de cumpleaños</label>
                <input
                  type="date"
                  id="birthdate"
                  value={userData.birthdate}
                  onChange={(e) => {
                    setUserData({ ...userData, birthdate: e.target.value });
                  }}
                  required
                />
                <label htmlFor="fullname">Nombre completo</label>
                <input
                  type="text"
                  id="fullname"
                  value={userData.fullname}
                  onChange={(e) => {
                    setUserData({ ...userData, user_fullname: e.target.value });
                  }}
                  required
                />
                                
              </>
            )
          }

          <label htmlFor="security_question">Pregunta de seguridad</label>
          <select
            id="security_question"
            value={userData.security_question_id}
            onChange={(e) => {
              setUserData({ ...userData, security_question_id: parseInt(e.target.value) });
            }}
            required
          >
            <option>Elegí una pregunta de seguridad</option>
            {secQuestions.map((question, index) => (
              <>
                <option key={index} value={question.id}>
                  {question.question}
                </option>
              </>
            ))}
          </select>
          <label htmlFor="security_answer">Respuesta de seguridad</label>
          <input
            type="text"
            id="security_answer"
            value={userData.security_answer}
            onChange={(e) => {
              setUserData({ ...userData, security_answer: e.target.value });
            }}
            required
          />


          <input type="submit" value="Creá tu cuenta!" />
        </form>
      </div>
    </div>
  );
};

export default Register;
