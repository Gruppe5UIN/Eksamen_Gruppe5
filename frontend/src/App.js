//import { useState, useEffect } from "react";
import "./App.css";
import "./css/main.css";
import GamePage from "./components/gamepage/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameShop from "./components/GameShop";
import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import MyGames from "./components/MyGames";

function App() {
  const [favourites, setFavourites] = useState([]);

  //Cecilie: har satt inn GamePage her for å sjekke link/path. Bare å flytte/ordne
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path=":slug" element={<GamePage favourites={favourites} setFavourites={setFavourites}/>} />
          <Route path="/gameshop" element={<GameShop />} />
          <Route path="/my-games" element={<MyGames />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
