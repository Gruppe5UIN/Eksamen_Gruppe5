import React from "react";
import GameShop from "./GameShop";
import MyGames from "./MyGames";
import MyFavourites from "./MyFavourites";
import GamePage from "./GamePage";

export default function Dashboard({ games }) {
  console.log(games[0])
  return (
    <>
      <article>
        <GameShop games={games} />
      </article>
      <section>
        <MyGames />
        <MyFavourites />
        <GamePage game={games[0]}/>
      </section>
    </>
  );
}
