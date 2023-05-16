import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import GameTable from "./GameTable";
import WordCloud from "./WordCloud";
import { Link } from "react-router-dom";
import { fetchFavouritesByUsername, fetchGamesByUsername } from "../../../utils/sanity/userServices";
import UserContext from "../../../context/UserContext";

//Komponent for presentasjon av et spill. Henter slug fra url og bruker denne i fetch fra rawg api 

export default function GamePage({ favourites, setFavourites }) {
  const { slug } = useParams();

  const [game, setGame] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [Icon, setIcon] = useState(false);
  const [buttonText, setButtonText] = useState("Buy this game");
  const { user } = useContext(UserContext);

  const url = `https://api.rawg.io/api/games/${slug}?key=6ccebb406ca942cd8ddc8584b1da9a4f`;

  const getGame = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setGame(data);
  };

  // Håndterer et klikk på favoritt ikon - legger til hvis den ikke er favoritt, fjerner hvis den allerede er favoritt
  const handleFavourite = (event) => {
    // Stopper reload av siden
    event.preventDefault();
    // Setter icon til true
    setIcon(true);
    // Sjekker om game er i favourites arrayet
    if (favourites.some((item) => item["id"] === game?.id)) {
      // Fjerner game fra favourites arrayet
      setFavourites(favourites.filter((item) => item.id !== game?.id));
      console.log(`${game?.name} er fjernet fra favoritter`);
      // Setter icon til false
      setIcon(false);
    } else {
      // Legger til game i favourites arrayet
      setFavourites([
        ...favourites,
        {
          id: game?.id,
          name: game?.name,
          image: game?.background_image,
          slug: game?.slug,
        },
      ]);
      // Setter icon til true
      setIcon(true);
      console.log(`${game?.name} er min favoritt`);
    }
  };

  const handleBuy = (event) => {
    event.preventDefault();
    if (buttonText === "Buy this game") {
      setButtonText("Added to cart!");
    }
  };

  useEffect(() => {
    // Setter loading effekt til true
    setIsLoading(true);
    // Kaller på getGame funksjonen
    getGame();
    // Setter loading effekt til false
    setIsLoading(false);
    // eslint-disable-next-line
    // Sjekker om bruker allerede har spillet i sin liste

    if (user) {
      userHasGame(slug, user.username).then((result) => {
        if (result) {
          // Hvis resultatet er true, setter vi buttonText til "Spillet er i din liste"
          setButtonText("Spillet er i din liste");
        }
      })

      // Sjekker om bruker allerede har spillet i sin favorittliste
      userHasFavorite(slug, user.username).then((result) => {
        if (result) {
          // Hvis resultatet er true, setter vi icon til true
          setIcon(true);
        }
      });
    }

  }, []);

  // Funksjon for å sjekke om bruker har spillet i sin favorittliste
  const userHasFavorite = async (slug, username) => {
    try {
      const response = await fetchFavouritesByUsername(username);
      // Returnerer true hvis spillet finnes i favorittlisten
      return response.favourites.some((item) => item.game.slug.current === slug);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw error;
    }
  };

  // Funksjon for å sjekke om bruker har spillet i sin liste
  const userHasGame = async (slug, username) => {
    try {
      const response = await fetchGamesByUsername(username);
      // Returnerer true hvis spillet finnes i spillisten
      return response.games.some((item) => item.game.slug.current === slug);
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  };


  return (
    <>
      <section className="breadcrumb">
        <Link to="/">Home</Link> / <p>{game?.name}</p>
      </section>
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <article className="gamepage">
            <figure className="image-frame">
              <img
                className="main-image"
                src={game?.background_image}
                alt={game?.name}
              ></img>
            </figure>

            <section className="textarea">
              <header className="gamepage-header">
                <h2 className="gamepagehead">{game?.name}</h2>
                <section className="game-details">
                  {game?.rating ? (
                    <span className="rating">
                      <p>{game?.rating}</p>
                    </span>
                  ) : (
                    ""
                  )}
                  {Icon ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fillRule="currentColor"
                        className="bi bi-heart-fill"
                        viewBox="0 0 16 16"
                        onClick={handleFavourite}
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fillRule="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                        onClick={handleFavourite}
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                    </>
                  )}
                </section>
              </header>

              <p className="plot">{game?.description_raw}</p>

              <GameTable game={game} />
              {game?.tags !== undefined ? (
                <section className="tag-group">
                  <WordCloud gameTags={game?.tags} />
                </section>
              ) : (
                ""
              )}
              {user ? (
                <Link to={(buttonText === 'Buy this game') ? "#" : "/my-games"}>
                  <button onClick={handleBuy} className="btn btn-outline-dark buy-btn">
                    {buttonText}
                  </button>
                </Link>
              ) : (
                <Link to={(buttonText === 'Buy this game' && !user) ? "/login" : ""}>
                  <button className="btn btn-outline-dark buy-btn">
                    {buttonText}
                  </button>
                </Link>
              )}
            </section>
          </article>
        </>
      )}
    </>
  );
}
