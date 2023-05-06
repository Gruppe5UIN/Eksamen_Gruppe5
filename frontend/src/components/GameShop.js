import React from "react";
import { getGames } from "../functions/Fetch";
import GameCard from "./GameCard";
import { useState, useEffect } from "react";

export default function GameShop() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames({
      ordering: "-released",
      page_size: 10,
    }).then((results) => {
      setGames(results);
    });
  }, []);
  return (
    <>
      <h2 id="gs-first">Game Shop</h2>
      <section className="page-container">
        {games?.map((game, index) => (
          <GameCard
            key={index}
            title={game?.name}
            genre={game?.genres.map((genre, i) => (
              <li key={i}>{genre?.name}</li>
            ))}
            text="Buy"
            image={game?.background_image}
          />
        ))}
      </section>
    </>
  );
}
