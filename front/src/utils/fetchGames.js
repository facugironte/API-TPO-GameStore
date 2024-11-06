export async function getGames(filters) {
  const query = new URLSearchParams();

  filters.forEach((filter) => {
    query.append(filter.name, filter.value);
  });

  const response = await fetch(
    `http://localhost:3000/api/v1/games?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function getTopSaleGames() {
  const query = new URLSearchParams({
    order: "sales",
    direction: "desc",
    limit: 8,
    state: "PUBLICADO",
  }).toString();

  const response = await fetch(`http://localhost:3000/api/v1/games?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getLastGames() {
  const query = new URLSearchParams({
    order: "createdAt",
    direction: "desc",
    limit: 8,
    state: "PUBLICADO",
  }).toString();

  const response = await fetch(`http://localhost:3000/api/v1/games?${query}`, {
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
      ...newGame,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al crear el juego");
  }

  const data = await response.json();
  return data;
};
