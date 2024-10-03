import React, { useState } from "react";
import { updateGame } from "../../utils/fetchGames";
import { useNavigate } from "react-router-dom";

const ModifyUserForm = ({ data }) => {
  const navigate = useNavigate();

  const [name, setName] = useState(data.name);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateGame(data.id, { name });
    navigate(`/store`);
  };
  return (
    <div>
      <h2>Modificar juego</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Modificar</button>
      </form>
    </div>
  );
};

export default ModifyUserForm;
