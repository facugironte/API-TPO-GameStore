export async function getUsers() {
  const response = await fetch("http://localhost:3000/api/v1/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getUserProfile(email) {
  const response = await fetch(
    `http://localhost:3000/api/v1/users/profile/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

export const postUser = async (newUser) => {
  const response = await fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newUser.name,
      birthdate: newUser.birthdate,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (email, newUser) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/users/profile/${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_name: newUser.company_name,
        CUIT: newUser.CUIT,
        email: newUser.email,
        password: newUser.password,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
