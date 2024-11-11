import React from "react";
import {RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home, {loader as homeLoader} from "./pages/Home/Home";
import Store, {loader as storeLoader} from "./pages/User/Store/Store";
import GameDetail, {loader as gameDetailLoader} from "./pages/GameDetail/GameDetail";
import Library from "./pages/User/Library/Library";
import Cart from "./pages/User/Cart/Cart";
import Purchase from "./pages/User/Purchase/Purchase";
import NewPaymentMethod from "./pages/User/NewPaymentMethod/NewPaymentMethod";
import Forum from "./pages/User/Forum/Forum";
import Profile from "./pages/User/Profile/Profile";
import Wishlist from "./pages/User/Wishlist/Wishlist";
import CompanyProfile from "./pages/Company/CompanyProfile/CompanyProfile";
import NewGame, {loader as newGameLoader} from "./pages/Company/NewGame/NewGame";
import CompanyGames from "./pages/Company/CompanyGames/CompanyGames";
import GameStats from "./pages/Company/GameStats/GameStats";
import GameState from "./pages/Company/GameState/GameState";
import EditGame, {loader as editGameLoader} from "./pages/Company/EditGame/EditGame";
import Register, {loader as registerLoader} from "./pages/Register/Register";
import ForgotPassword, {loader as forgotLoader} from "./pages/ForgotPassword/ForgotPassword";


import "./styles.css";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />,
      loader: registerLoader
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
      loader: forgotLoader,
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
      element: <GameDetail />,
      loader: gameDetailLoader
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
      element: <CompanyProfile />
    },
    {
      path: "/new-game",
      element: <NewGame />,
      loader: newGameLoader
    },
    {
      path: "/company-your-games",
      element: <CompanyGames/>
    },
    {
      path: "/stats",
      element: <GameStats/>
    },
    {
      path: "/company-modify-game/:id",
      element: <GameState/>
    },
    {
      path: "/edit-game/:id",
      element: <EditGame/>,
      loader: editGameLoader
    }
  ])

  return (

    <RouterProvider router = {router}/>

  );
};

export default App;