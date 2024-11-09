export const loginAuth = async (userData) => {
  const response = await fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
    }),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.status);
};

export const registerAuth = async (userData) => {
  const response = await fetch("http://localhost:3000/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...userData,
    }),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.status);
};

export const answerAuth = async (answer, email) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/auth/answer/${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        security_answer: answer,
      }),
    }
  );
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export const updatePassAuth = async (email, new_password) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/auth/user/${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_password: new_password,
      }),
    }
  );

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
