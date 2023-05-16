import GameCard from "../GameCard";
import { useState, useEffect } from "react";
import { getGames } from "../../functions/Fetch";

export default function GameShop() {
  const [games, setGames] = useState([]);
  const [buttonText, setButtonText] = useState("Buy This Game");

  useEffect(() => {
    // Kaller på getGames funksjonen fra Fetch.js, som sorterer spillene etter released dato, og setter en maksimumsgrense på 3 spill.
    getGames({
      ordering: "-released",
      page_size: 3,
    }).then((results) => {
      // Setter games til å være lik resultatet fra getGames funksjonen.
      setGames(results);
    });
  }, []);

  return (
    <>
      <article className="gs-box">
        {games?.map((game, index) => (
          <GameCard
            key={index}
            image={game.background_image}
            slug={game.slug}
            title={game.name}
            playTime={0}
            genre={game.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
            text={buttonText}
          />
        ))}
      </article>
    </>
  );
}
