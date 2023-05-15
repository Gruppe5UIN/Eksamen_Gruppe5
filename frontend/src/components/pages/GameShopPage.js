import React from "react";
import { getGames } from "../../functions/Fetch";
import GameCard from "./../GameCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GameShopPage() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kaller på getGames funksjonen fra Fetch.js, som sorterer spillene etter released dato, og setter en maksimumsgrense på 10 spill.
    getGames({
      ordering: "-released",
      page_size: 10,
    }).then((results) => {
      // Setter loading effekt til true
      setIsLoading(true);
      // Setter games til å være lik resultatet fra getGames funksjonen.
      setGames(results);
      // Setter loading effekt til false
      setIsLoading(false);
    });
  }, []);
  
  return (
    <>
      <section className="breadcrumb">
        <Link to="/">Home</Link> / <p>Game Shop</p>
      </section>

      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <section className="page-container">
            <h2 className="head">Game Shop</h2>
            {games?.map((game, index) => (
              <GameCard
                key={index}
                title={game?.name}
                genre={game?.genres.map((genre, i) => (
                  <li key={i}>{genre?.name}</li>
                ))}
                slug={`/${game?.slug}`}
                text="Buy This Game"
                image={game?.background_image}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
}
