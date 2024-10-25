import React from "react";

import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

import "./newPaymentMethod.css";
import { newPaymentMethod } from "../../utils/fetchShop";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, addPaymentMethod } from "../../app/slices/login/userSlice";
import { useNavigate } from "react-router-dom";

const NewPaymentMethod = () => {

  const [alias, setAlias] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");
  const [cvc, setCvc] = React.useState("");

  const user = useSelector(selectUser).user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addMethod = (e) => {
    e.preventDefault();

    newPaymentMethod(user.email, cardNumber, alias, expirationDate, cvc).then((response) => {
      response.json().then((data) => {
        
        dispatch(addPaymentMethod(data));
        console.log(user)
        navigate(`/shop/buy`)
      })

    }).catch((error) => {
      alert(error);
    });
  
  };

  return (
    <div>
      <Header currentPage={"payment-method"} />
      <div className="payment-method">
        <main className="main">
          <h1>Nueva tarjeta </h1>
          <form className="form-payment-method" onSubmit={addMethod}>

            <label htmlFor="alias">Alias de la tarjeta</label>
            <input type="text" id="alias" name="alias" placeholder="Alias" value={alias} onChange={(e) => setAlias(e.target.value)} />

            <label htmlFor="cardNumber">Número de tarjeta</label>
            <input type="text" id="cardNumber" name="cardNumber" placeholder="Número de tarjeta" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />

            <label htmlFor="expirationDate">Fecha de vencimiento</label>
            <input type="text" id="expirationDate" name="expirationDate" placeholder="Fecha de vencimiento" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />

            <label htmlFor="cvc">CVC</label>
            <input type="text" id="cvc" name="cvc" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />

            <Button text="Guardar" btn_class="btn-payment-method"/>
          </form>

        </main>
      </div>
    </div>
  );
};

export default NewPaymentMethod;
