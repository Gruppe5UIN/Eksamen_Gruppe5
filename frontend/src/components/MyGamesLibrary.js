import React, { useEffect, useState, useContext } from "react";
import GameCard from "./GameCard";
import { getGamesByUsername } from "../utils/sanity/userServices";
import UserContext from "../context/UserContext";

export default function MyGamesLibrary() {
  const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);

  const getGames = async (username) => {
    const games = await getGamesByUsername(username);
    return games;
  };

  useEffect(() => {
    if (user) {
      getGames(user.username)
        .then((games) => {
          setGames(games);
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/login";
        });
    }
  }, [user]);

  return (
    <section className="page-container">
      <h3 id="gs-first">My Games Library - {games.length} games</h3>
      {games.map((game) => (
        <GameCard
          key={game._id}
          title={game.title}
          genre={game.genre}
          image={game.imageUrl[0]}
          slug={game.slug}
          playTime={game.playTime}
          text={"Text here"}
        />
      ))}
    </section>
  );
}