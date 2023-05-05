import React from "react";
import { useState, useEffect } from "react";
import GameCard from "./GameCard";

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const count = 0;

  //Dynamic queryParams to use in other components
  const getGames = async (params) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://api.rawg.io/api/games?key=6ccebb406ca942cd8ddc8584b1da9a4f&${queryParams}&dates=2023-01-01,2023-05-01`
    );
    const data = await response.json();
    setGames(data.results);
  };

  useEffect(() => {
    getGames({
      ordering: "-released",
      page_size: 3,
    });
  }, []);

  return (
    <>
      <section className="gs">
        <section className="gs-txt-box">
          <h2>Game Shop</h2>
          <button className="btn btn-outline-primary" id="visitshop-btn">
            Visit gameshop
          </button>
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
