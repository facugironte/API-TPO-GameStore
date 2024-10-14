export const buyGame = async (email, game_id, payment_method_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/shop/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        game_id,
        payment_method_id,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
