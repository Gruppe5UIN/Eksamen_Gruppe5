//import { useState, useEffect } from "react";
import "./App.css";
import "./css/main.css";
import GamePage from "./components/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameShop from "./components/GameShop";
import HomePage from "./pages/HomePage";

function App() {
  //Cecilie: har satt inn GamePage her for å sjekke link/path. Bare å flytte/ordne
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path=":slug" element={<GamePage />} />
        <Route path="/gameshop" element={<GameShop />} />
      </Routes>
    </Router>

    /* Forslag til bruk av Layout og dermed unngå komponentet HomePage: 

    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path=":slug" element={<GamePage />} />
          <Route path="/gameshop" element={<GameShop />} />
        </Route>
      </Routes>
    </Router>

    */
  );
}

export default App;
