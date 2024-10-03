import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Store from "./pages/Store";
import ModifyGames from "./pages/ModifyGames";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/games/modify/:id" element={<ModifyGames />} />
      </Routes>
    </Router>
  );
};

export default App;
