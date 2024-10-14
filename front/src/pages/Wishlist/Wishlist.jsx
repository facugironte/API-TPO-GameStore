import React from "react";
import Header from "../../components/Header/Header";

import "./wishlist.css";

const Wishlist = () => {

  return (
    <>
      <Header currentPage={"wishlist"} />
      <div className="wishlist">
        <main className="main">
          <h1>Tus juegos deseados</h1>
        </main>
      </div>
    </>
  );
};

export default Wishlist;
