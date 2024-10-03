import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from "../components/forms/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import {
  failure,
  login,
  selectIsLoggedIn,
} from "../app/slices/login/userSlice";
import { loginAuth } from "../utils/fetchAuth";

const Home = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate(`/`);
  }

  const handleLogin = async (userData) => {
    try {
      const response = await loginAuth(userData);
      dispatch(
        login({
          username: response.user.username,
          password: response.user.password,
        })
      );
    } catch (error) {
      dispatch(failure({ error: error.message }));
    }
  };

  return (
    <div>
      <Header currentPage={"login"} />

      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Home;
