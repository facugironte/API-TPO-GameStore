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
  return response;
};

export const updateGame = async (id, newGame) => {
  const response = await fetch(`http://localhost:3000/api/v1/games/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newGame,
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

export const getGamebyId = async (id, count_stat = false) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/games/${id}${
      count_stat ? "?count_stat=true" : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const postComment = async (gameId, newComment) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/games/${gameId}/comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newComment,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Error al crear el comentario");
  }
  const data = await response.json();
  return data;
};

export const addGameToWishlist = async (email, gameId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/${email}/game/${gameId}/wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al agregar el juego a la wishlist");
    }

    const data = await response.json();
    return data.game;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteGameFromWishlist = async (email, gameId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/${email}/game/${gameId}/wishlist`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el juego de la wishlist");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
