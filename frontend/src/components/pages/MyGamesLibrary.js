import GameCard from "./../GameCard";
import { useState, useEffect } from "react";

export default function MyGamesLibrary({ userGames }) {
  const games = userGames?.games;
  const numGames = userGames?.numGames;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <section className="page-container">
            <h3 id="gs-first">My Games Library {numGames} - games</h3>
            {games !== undefined ? (
              <>
                {games.map((item, index) => (
                  <GameCard
                    key={index}
                    title={item.game.title}
                    genre={item.game.genres.map((genre, index) => (
                      <li key={index}>{genre.title}</li>
                    ))}
                    image={item.game.image}
                    slug={`/${item.game.slug.current}`}
                    playTime={item.playtime}
                    text={"Text here"}
                  />
                ))}{" "}
              </>
            ) : (
              ""
            )}
          </section>
        </>
      )}
    </>
  );
}
