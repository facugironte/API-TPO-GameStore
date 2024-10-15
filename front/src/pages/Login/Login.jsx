import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import {
  failure,
  login,
  selectIsLoggedIn,
  selectInvalidCredentials,
  selectServerFailed,
} from "../../app/slices/login/userSlice";
import { setUser } from "../../app/slices/cart/cartSlice";
import { loginAuth } from "../../utils/fetchAuth";

import "./login.css";

const Home = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const invalidCredentials = useSelector(selectInvalidCredentials);
  const serverFailed = useSelector(selectServerFailed);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate(`/`);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAuth(userData);

      dispatch(
        login({
          user: response.user,
        })
      );

      dispatch(setUser(response.user));

    } catch (error) {
      dispatch(failure({ error: error.message }));
    }
  };

  return (
    <div>
      <Header currentPage={"login"} />

      <div className="main-login">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
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

          <input type="submit" value="Iniciar Sesión" />
          {invalidCredentials && (
            <p className="error-message">Email o contraseña incorrectos</p>
          )}
          {serverFailed && (
            <p className="error-message">Error en el servidor</p>
          )}

          <a href="/registro">Creá tu cuenta</a>
          <a href="/forgotPassword">¿Olvidaste tu contraseña?</a>
        </form>
      </div>
    </div>
  );
};

export default Home;
