import React, { useEffect, useState, useContext, useNavigate } from "react";
import GameCard from "./GameCard";
import { getGamesByUsername } from "../utils/sanity/userServices";
import UserContext from "../context/UserContext";

export default function MyGames() {
  const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);

  const getGames = async (username) => {
    const games = await getGamesByUsername(username);
    return games;
  };

<<<<<<< HEAD
  const getGames = async () => {
    setGames([
      {
        id: 1,
        name: "Game 1",
        slug: "game-1",
        released: "2021-01-01",
        background_image: "https://via.placeholder.com/300x200",
        rating: 4.5,
        ratings_count: 100,
        favorite: true,
      },
      {
        id: 2,
        name: "Game 2",
        slug: "game-2",
        released: "2021-01-01",
        background_image: "https://via.placeholder.com/300x200",
        rating: 4.5,
        ratings_count: 100,
        favorite: false,
      },
      {
        id: 3,
        name: "Game 3",
        slug: "game-3",
        released: "2021-01-01",
        background_image: "https://via.placeholder.com/300x200",
        rating: 4.5,
        ratings_count: 100,
        favorite: false,
      },
      {
        id: 4,
        name: "Game 4",
        slug: "game-4",
        released: "2021-01-01",
        background_image: "https://via.placeholder.com/300x200",
        rating: 4.5,
        ratings_count: 100,
        favorite: false,
      },
    ]);
  };
=======
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
>>>>>>> c99cfbb2a2a6ff066321938de3948e3a5e9ea1b0

  return (
    <div>
      <h3 id="gs-first">My Games Library - {games.length} games</h3>
      <section className="page-container">
        {games.map((game) => (
          <GameCard
            key={game._id}
            title={game.title}
            genre={game.genre}
            image={game.imageUrl[0]}
            slug={game.slug}
<<<<<<< HEAD
            playTime={2}
            text={"Text here"}
          />
=======
            playTime={game.playTime}
            text={"Text here"} />
>>>>>>> c99cfbb2a2a6ff066321938de3948e3a5e9ea1b0
        ))}
      </section>
    </div>
  );
}
