export const loginAuth = async (userData) => {
  const response = await fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
    }),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.status);
};

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
