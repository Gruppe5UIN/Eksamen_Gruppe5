import React from "react";
import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";
import { getGames } from "../functions/Fetch";

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const count = 0;

  useEffect(() => {
    getGames({
      ordering: "-released",
      page_size: 3,
    }).then((results) => {
      setGames(results);
    });
  }, []);

  return (
    <>
      <section className="gs">
        <section className="gs-txt-box">
          <h2>Game Shop</h2>
          <Link
            to="/gameshop"
            className="btn btn-outline-secondary"
            id="visitshop-btn"
          >
            Visit shop
          </Link>
        </section>

        <article className="gs-box">
          {games.map((game, index) => (
            <GameCard
              key={index}
              image={game.background_image}
              title={game.name}
              playTime={game.playtime}
              genre={game.genres.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
              game={game}
              text="Buy"
            />
          ))}
        </article>
      </section>
      <article>
        <section className="mygames-box">
          <h3>
            My games library (<span>{count}</span> games)
          </h3>
          {/*Vise noen av spillene fra MyGames */}
        </section>
        <section className="favourites-box">
          <h3>My Favourites</h3>
          {/*Vise noen av spillene fra MyFavourites */}
        </section>
      </article>
    </>
  );
}
