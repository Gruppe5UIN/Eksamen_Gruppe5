import React from "react";
import { getGames } from "../../functions/Fetch";
import GameCard from "./../GameCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GameShopPage() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*Kaller på getGames-funksjonen som vi importerer fra eget komponent, som henter data fra RAWG. I den er det dynamiske parameter, så når vi kaller funksjonen
legger vi inn ønskede parameter, som her er sortert på reversert releasedato og 10 resultater. */

  useEffect(() => {
    getGames({
      ordering: "-released",
      page_size: 10,
    }).then((results) => {
      setIsLoading(true);
      setGames(results);
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
