import React, { useState } from "react";
import { postGame } from "../../utils/fetchGames";
import Button from "../Button";

const CreateGameForm = ({ onGameCreated }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    postGame({ name });

    setName("");

    onGameCreated();
  };

  return (
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
      <Button type="submit" text="Create" onClick={null} />
    </form>
  );
};

export default CreateGameForm;
