import React from "react";
import { getGames } from "../../functions/Fetch";
import GameCard from "./../GameCard";
import { useState, useEffect } from "react";

export default function GameShopPage() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    getGames({
      ordering: "-released",
      page_size: 10,
    }).then((results) => {
      setGames(results);
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    });
  }, []);
  return (
    <section className="gameshop-container">
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          (
          {games?.map((game, index) => (
            <GameCard
              key={index}
              title={game?.name}
              genre={game?.genres.map((genre, i) => (
                <li key={i}>{genre?.name}</li>
              ))}
              slug={`/${game?.slug}`}
              text="Buy"
              image={game?.background_image}
            />
          ))}
          )
        </>
      )}
    </section>
  );
}
