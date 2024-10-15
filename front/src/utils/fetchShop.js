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

export const newPaymentMethod = async (
  email,
  number,
  alias,
  expiration_date,
  cvc
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/shop/payment-method/${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number,
          alias,
          expiration_date,
          cvc,
        }),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
