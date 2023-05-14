import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { fetchFavouritesByUsername } from "../../utils/sanity/userServices";
import GameCard from "./../GameCard";

export default function FavouritesPage() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async (username) => {
    try{
      const data = await fetchFavouritesByUsername(username);
      const favourites = data.favourites
      return favourites;
    } catch (error){
      console.log(error)
    }
  };

  useEffect(() => {
    if (user) {
      getFavorites(user.username)
        .then((favourites) => {
          setFavorites(favourites);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return (
    <article className="gs-box">
      {favorites.map((item, index) => (
        <GameCard
          key={index}
          title={item.game.title}
          image={item.game.image}
          genre={item.game.genres.map((genre, index) => (
            <li key={index}>{genre.title}</li>
        ))}
          slug={`/${item.game.slug.current}`}
          playTime={0}
          text={"Test"}
        />
      ))}
    </article>
  );
}
