import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { getFavoritesByUsername } from "../utils/sanity/userServices";
import GameCard from "./GameCard";

export default function MyFavourites() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async (username) => {
    const favorites = await getFavoritesByUsername(username);
    return favorites;
  };

  useEffect(() => {
    if (user) {
      getFavorites(user.username)
        .then((favorites) => {
          setFavorites(favorites);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return (
    <article className="gs-box">
      {favorites.map((favorite) => (
        <GameCard
          key={favorite._id}
          title={favorite.title}
          image={favorite.imageUrl[0]}
          slug={favorite.slug}
          playTime={favorite.playTime}
          text={"Test"}
        />
      ))}
    </article>
  );
}
