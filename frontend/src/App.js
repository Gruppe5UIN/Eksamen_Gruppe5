//import { useState, useEffect } from "react";
import "./App.css";
import "./css/main.css";
import GamePage from "./components/gamepage/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import { getUserByEmail } from "./utils/sanity/userServices";
import UserContext from "./context/UserContext";
import Login from "./components/Login";
import { getUserEmail } from "./helper/userHelper";
import GameShopPage from "./components/GameShopPage";
import FavouritesPage from "./components/FavouritesPage";
import MyGamesLibrary from "./components/MyGamesLibrary";

function App() {
  const [favourites, setFavourites] = useState([]);

  const [user, setUser] = useState(null);

  const fetchUser = async (email) => {
    const user = await getUserByEmail(email);
    if (user == null) {
      console.log("Not logged in");
    } else {
      setUser(user);
    }
  };

  useEffect(() => {
    const email = getUserEmail();
    fetchUser(email);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route
              path=":slug"
              element={
                <GamePage
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              }
            />
            <Route path="/gameshop" element={<GameShopPage />} />
            <Route path="/my-games" element={<MyGamesLibrary />} />
            <Route path="/my-favourites" element={<FavouritesPage />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
