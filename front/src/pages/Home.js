import React from "react";
import MainHome from "../components/mains/MainHome";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header currentPage={"home"} />
      <MainHome />
    </div>
  );
};

export default Home;
