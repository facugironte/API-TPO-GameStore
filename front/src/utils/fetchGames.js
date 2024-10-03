export async function getGames() {
  const response = await fetch("http://localhost:3000/api/v1/games", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export const deleteGame = async (id) => {
  const response = await fetch(`http://localhost:3000/api/v1/games/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const updateGame = async (id, newGame) => {
  const response = await fetch(`http://localhost:3000/api/v1/games/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newGame.name,
    }),
  });
  const data = await response.json();
  return data;
};

export const postGame = async (newGame) => {
  const response = await fetch("http://localhost:3000/api/v1/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newGame.name,
    }),
  });
  const data = await response.json();
  return data;
};
