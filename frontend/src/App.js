//import { useState, useEffect } from "react";
import "./App.css";
import "./css/main.css";
import GamePage from "./components/gamepage/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameShop from "./components/GameShop";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import MyGames from "./components/MyGames";
import { getUserByEmail } from "./utils/sanity/userServices";
import UserContext from "./context/UserContext";
import Login from "./components/Login";

function App() {
  const [favourites, setFavourites] = useState([]);

  const [user, setUser] = useState(null);

  const fetchUser = async (email) => {
    const user = await getUserByEmail(email)
    if (user == null) {
      console.log("Not logged in")
    } else {
      setUser(user)
    }
  }

  useEffect(() => {
    const email = localStorage.getItem("email_account")
    fetchUser(email)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path=":slug" element={<GamePage favourites={favourites} setFavourites={setFavourites} />} />
            <Route path="/gameshop" element={<GameShop />} />
            <Route path="/my-games" element={<MyGames />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
