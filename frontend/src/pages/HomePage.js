import { useState, useEffect } from "react";
import "../App.css";
import "../css/main.css";
import Dashboard from "../components/Dashboard";
import Nav from "../components/Nav";

function HomePage() {
    const [games, setGames] = useState([]);

    //Fetching 3 newest games from 01.01.2023 until 27.04.2023
    //Will change to dynamic fetch later if needed
    const getGames = async () => {
        const response = await fetch(
            `https://api.rawg.io/api/games?key=d2d5f79e22a6464d852e6cd6b671c8d7&ordering=-released&page_size=3&dates=2023-01-01,2023-04-27`
        );
        const data = await response.json();
        setGames(data.results);
    };

    useEffect(() => {
        getGames();
    }, []);

    console.log(games);

    return (
        <div>
            <Nav />
            <Dashboard games={games} />
        </div>
    );
}

export default HomePage;