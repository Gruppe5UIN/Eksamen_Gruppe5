//import { useState, useEffect } from "react";
import "./App.css";
import "./css/main.css";
import GamePage from "./components/pages/gamepage/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import { getUserByEmail } from "./utils/sanity/userServices";
import UserContext from "./context/UserContext";
import Login from "./components/Login";
import { getUserEmail } from "./helper/userHelper";
import GameShopPage from "./components/pages/GameShopPage";
import FavouritesPage from "./components/pages/FavouritesPage";
import MyGamesLibrary from "./components/pages/MyGamesLibrary";
import { fetchGamesByUsername } from "./utils/sanity/userServices";

function App() {
  const [favourites, setFavourites] = useState([]);

  const [user, setUser] = useState(null);
  const [userGames, setUserGames] = useState([]);

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

  
  async function getUserGames(username) {
    try{
      const data = await fetchGamesByUsername(username);
      const userGames = data.games
  
      return userGames
    } catch (error) {
        console.log(error)
    }
  } 

   useEffect(() => {
    if (user) {
      getUserGames(user.username)
        .then((userGames) => {
         
          setUserGames(userGames);
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/login";
        })
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard userGames={userGames}/>} />
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
            <Route path="/my-games" element={<MyGamesLibrary games={userGames} />} />
            <Route path="/my-favourites" element={<FavouritesPage />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
