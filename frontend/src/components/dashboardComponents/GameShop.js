import GameCard from "../GameCard"
import { useState, useEffect } from "react";
import { getGames } from "../../functions/Fetch";

export default function GameShop(){

  const [games, setGames] = useState([]);

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
         <article className="gs-box">
          {games?.map((game, index) => (
            <GameCard
              key={index}
              image={game.background_image}
              slug={game.slug}
              title={game.name}
              playTime={game.playtime}
              genre={game.genres.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
              text="Buy"
            />
          ))}
        </article>
       
         </> 
    )
}