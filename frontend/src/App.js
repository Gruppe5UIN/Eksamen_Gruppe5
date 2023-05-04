//import { useState, useEffect } from "react";
import "./App.css";
import "./css/main.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const [games, setGames] = useState([]);

  // //Fetching 3 newest games from 01.01.2023 until 27.04.2023
  // //Will change to dynamic fetch later if needed
  //Cecilie: ny api key  -> 6ccebb406ca942cd8ddc8584b1da9a4f
  // const getGames = async () => {
  //   const response = await fetch(
  //     `https://api.rawg.io/api/games?key=6ccebb406ca942cd8ddc8584b1da9a4f&ordering=-released&page_size=3&dates=2023-01-01,2023-04-27`
  //   );
  //   const data = await response.json();
  //   setGames(data.results);
  // };

  // useEffect(() => {
  //   getGames();
 //  }, []);

  // console.log(games);

  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
