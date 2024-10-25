import React from "react";
import {RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home, {loader as homeLoader} from "./pages/Home/Home";
import Store, {loader as storeLoader} from "./pages/Store/Store";
import GameDetail from "./pages/GameDetail/GameDetail";
import Library from "./pages/Library/Library";
import Cart from "./pages/Cart/Cart";
import Purchase from "./pages/Purchase/Purchase";
import NewPaymentMethod from "./pages/NewPaymentMethod/NewPaymentMethod";
import Forum from "./pages/user/Forum/Forum";
import Profile from "./pages/Profile/Profile";
import Wishlist from "./pages/Wishlist/Wishlist";
import PerfilEmpresa from "./pages/company/company-profile/PerfilEmpresa";
import NuevoJuego from "./pages/company/new-game/NuevoJuego";
import JuegosEmpresa from "./pages/company/your-games/JuegosEmpresa";
import EstadisticasEmpresa from "./pages/company/stats/EstadisticasEmpresa";
import Modificadores from "./pages/company/modify/Modificadores";

import "./styles.css";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <Home />,
      loader: homeLoader
    },
    {
      path: "/store",
      element: <Store />,
      loader: storeLoader
    },
    {
      path: "/community",
      element: <Forum />
    },
    {
      path: "/your-games",
      element: <Library />
    },
    {
      path: "/profile/your-profile",
      element: <Profile />
    },
    {
      path: "/profile/wishlist",
      element: <Wishlist />
    },
    {
      path: "/store/game-details/:id",
      element: <GameDetail />
    },
    {
      path: "/shop/cart",
      element: <Cart />
    },
    {
      path: "/shop/buy",
      element: <Purchase />
    },
    {
      path: "/shop/payment-method",
      element: <NewPaymentMethod />
    },
    {
      path: "/company-profile",
      element: <PerfilEmpresa />
    },
    {
      path: "/new-game",
      element: <NuevoJuego />
    },
    {
      path: "/company-your-games",
      element: <JuegosEmpresa/>
    },
    {
      path: "/stats",
      element: <EstadisticasEmpresa/>
    },
    {
      path: "/company-modify-game",
      element: <Modificadores/>
    }
  ])

  return (

    <RouterProvider router = {router}/>

  );
};

export default App;