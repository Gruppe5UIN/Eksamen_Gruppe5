//import { useState, useEffect } from "react";
import "./App.css";
import "./css/main.css";
import HomePage from "./pages/HomePage";
import GamePage from "./components/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  //Cecilie: har satt inn GamePage her for å sjekke link/path. Bare å flytte/ordne
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path=":slug" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
