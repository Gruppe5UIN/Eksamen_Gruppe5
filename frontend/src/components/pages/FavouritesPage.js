import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { getFavoritesByUsername } from "../../utils/sanity/userServices";
import GameCard from "./../GameCard";

export default function FavouritesPage() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const getFavorites = async (username) => {
    const favorites = await getFavoritesByUsername(username);
    return favorites;
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getFavorites(user.username)
        .then((favorites) => {
          setFavorites(favorites);
          setTimeout(() => {
            setIsLoading(false);
          }, 700);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return (
    <article className="gs-box">
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </article>
  );
}
