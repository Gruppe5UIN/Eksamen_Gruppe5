import React from "react";
import GameShop from "./GameShop";
import MyGames from "./MyGames";
import MyFavourites from "./MyFavourites";
import GamePage from "./GamePage";
import { useState, useEffect } from "react";
import { fetchAllGenres } from "../utils/sanity/gameServices";

export default function Dashboard({ games }) {

  const [genres, setGenres] = useState(null)

  async function getGenres() {
    const data = await fetchAllGenres();
    setGenres(data)
}

useEffect(() => {
  getGenres()
},[])

//console.log(genres)
  return (
    <>
      <article>
        <GameShop games={games} />
      </article>
      <section>
        <MyGames />
        <MyFavourites />
      </section>
    </>
  );
}
