import GameCard from "./../GameCard";
import { useState, useEffect } from "react";

export default function FavouritesPage({ userFavourites }) {
  const favourites = userFavourites?.favourites;
  const numFavourites = userFavourites?.numFavourites;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}
      <article className="gs-box">
        {favourites !== undefined ? (
          <>
            {favourites.map((item, index) => (
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
            ))}{" "}
          </>
        ) : (
          ""
        )}
      </article>
    </>
  );
}
