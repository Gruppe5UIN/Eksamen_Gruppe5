import React from "react";
import GameCard from "./GameCard";

//Cecilie: kun en test av game som props, bare å fjerne
export default function GameShop({ games }) {

  return (
    <> 
      <GameCard game={games[0]}/>
      {/* AN EXAMPLE OF HOW GAMECARD COULD LOOK:
      
      <section>
        <h2>Gameshop</h2>
        <button>Visit shop</button>
        {games?.map((game, index) => (
          <article key={index}>
            <img
              src={game.background_image}
              alt={game.name}
              style={{ maxWidth: "300px" }}
            />
            <h3>{game.name}</h3>
            <ul>
              {game.genres.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
            </ul>
            <button>buy</button>
          </article>
        ))}
      </section>
      */}
    </>
  );
}
