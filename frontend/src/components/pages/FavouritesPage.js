import GameCard from "./../GameCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FavouritesPage({ userFavourites }) {
  const favourites = userFavourites?.favourites;
  const numFavourites = userFavourites?.numFavourites

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Setter loading effekt til false
    setIsLoading(false);
  }, []);

  return (
    <>
      <section className="breadcrumb">
        <Link to="/">Home</Link> / <p>My Favourites</p>
      </section>

      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {" "}
          {favourites !== undefined ? (
            <section className="page-container">
              <h2 className="head">My Favourites</h2>
              <div className="numofgames">
                <span>{numFavourites}</span>
                <span>Games</span>
              </div>
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
                  text={"Remove from favourites"}
                />
              ))}
            </section>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
