import React, { useEffect, useState, useContext } from "react";
import GameCard from "./../GameCard";
import { fetchGamesByUsername } from "../../utils/sanity/userServices";
import UserContext from "../../context/UserContext";

export default function MyGamesLibrary() {
  const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);

  const getGames = async (username) => {
    const data = await fetchGamesByUsername(username);
    const games = data.games
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
      {games.map((item) => (
        <GameCard
          key={item._id}
          title={item.game.title}
          genre={item.game.genres.map((genre, index) => (
            <li key={index}>{genre.title}</li>
        ))}
          image={item.game.image}
          slug={`/${item.game.slug.current}`}
          playTime={item.playtime}
          text={"Text here"}
        />
      ))}
    </section>
  );
}
