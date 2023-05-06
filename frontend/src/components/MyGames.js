import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";

export default function MyGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    setGames([
      {
        id: 1,
        name: "Game 1",
        slug: "game-1",
        released: "2021-01-01",
        background_image: "https://via.placeholder.com/300x200",
        rating: 4.5,
        ratings_count: 100,
        favorite: true,
      },
      {
        id: 2,
        name: "Game 2",
        slug: "game-2",
        released: "2021-01-01",
        background_image: "https://via.placeholder.com/300x200",
        rating: 4.5,
        ratings_count: 100,
        favorite: false,
      },
      {
        id: 3,
        name: "Game 3",
        slug: "game-3",
        released: "2021-01-01",
        background_image: "https://via.placeholder.com/300x200",
        rating: 4.5,
        ratings_count: 100,
        favorite: false,
      },
      {
        id: 4,
        name: "Game 4",
        slug: "game-4",
        released: "2021-01-01",
        background_image: "https://via.placeholder.com/300x200",
        rating: 4.5,
        ratings_count: 100,
        favorite: false,
      },
    ]);
  };

  return (
    <div>
      <h3>MY GAMES LIBRARY - {games.length} games</h3>
      <section className="page-container">
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.name}
            genre={game.name}
            image={game.background_image}
            slug={game.slug}
            playTime={2}
            text={"Text here"}
          />
        ))}
      </section>
    </div>
  );
}
