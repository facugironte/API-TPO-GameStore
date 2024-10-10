import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Store from "./pages/Store/Store";
import GameDetail from "./pages/GameDetail/GameDetail";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/games/:id" element={<GameDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
