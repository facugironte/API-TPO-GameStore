import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Store from "./pages/Store/Store";
import GameDetail from "./pages/GameDetail/GameDetail";
import Library from "./pages/Library/Library";
import Cart from "./pages/Cart/Cart";
import Purchase from "./pages/Purchase/Purchase";
import NewPaymentMethod from "./pages/NewPaymentMethod/NewPaymentMethod";
import Forum from "./pages/Forum/Forum";
import Profile from "./pages/Profile/Profile";
import Wishlist from "./pages/Wishlist/Wishlist";

import "./styles.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/community" element={<Forum/>}/>
        <Route path="/your-games" element={<Library />} />
        
        <Route path="/profile/your-profile" element={<Profile />}/>
        <Route path="/profile/wishlist" element={<Wishlist />}/>
        <Route path="/store/game-details/:id" element={<GameDetail />} />

        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/shop/buy" element={<Purchase />} />
        <Route path="/shop/payment-method" element={<NewPaymentMethod />} />
      </Routes>
    </Router>
  );
};

export default App;
