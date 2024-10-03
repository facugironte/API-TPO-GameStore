import React, { useState } from "react";
import Button from "../Button";
import { useSelector } from "react-redux";
import {
  selectInvalidCredentials,
  selectServerFailed,
} from "../../app/slices/login/userSlice";

const CreateGameForm = ({ onLogin }) => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const invalidCredentials = useSelector(selectInvalidCredentials);
  const serverFailed = useSelector(selectServerFailed);
  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {invalidCredentials && <p>Invalid credentials.</p>}
        {serverFailed && <p>Server failed. Try it later.</p>}
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          value={userData.username}
          onChange={(e) => {
            setUserData({ ...userData, username: e.target.value });
          }}
          required
        />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          value={userData.password}
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
          required
        />
      </div>
      <Button type="submit" text="Login" />
    </form>
  );
};

export default CreateGameForm;
