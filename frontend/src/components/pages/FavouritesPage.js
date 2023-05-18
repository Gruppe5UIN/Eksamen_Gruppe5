import GameCard from "./../GameCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGameBySlug } from "../../utils/sanity/gameServices";
import { getFavouriteSlugsFromLocalStorage } from "../../helper/userHelper";

export default function FavouritesPage({ userFavourites }) {
  const favourites = userFavourites?.favourites;

  const [isLoading, setIsLoading] = useState(true);
  const [favouriteGames, setFavouriteGames] = useState([]);
  const [numFavourites, setNumFavourites] = useState(0);

  useEffect(() => {
    // Kaller på setLocalStorageGames funksjonen
    setLocalStorageGames();
    // Setter loading effekt til false
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  // Funksjon for å hente spill fra local storage og legge til i favourites arrayet
  const setLocalStorageGames = async () => {
    // Henter spill fra local storage
    const favGamesLocalStorage = getFavouriteSlugsFromLocalStorage();
    const finishedSlugs = []; // Array to store processed slugs
    const sanityGames = [];
  
    // Gå gjennom alle spillene i local storage
    for (let i = 0; i < favGamesLocalStorage.length; i++) {
      // Setter slug til å være lik spillet i local storage
      const slug = favGamesLocalStorage[i];
  
      // Sjekker om spillet allerede er i favourites arrayet
      if (!finishedSlugs.includes(slug)) {
        // Hvis spillet ikke er i favourites arrayet, legger vi til spillet i favourites arrayet
        finishedSlugs.push(slug);
        // Henter spillet fra sanity og legger til i sanityGames arrayet
        sanityGames.push(fetchGameBySlug(slug));
      }
    }
  
    try {
      // Henter alle spillene fra sanityGames arrayet og vent til alle er hentet
      const gameResults = await Promise.all(sanityGames);
  
      // Gå gjennom alle spillene i gameResults arrayet og legge til unike spill i favourites arrayet
      const newFavourites = gameResults.reduce((current, result) => {
        // Sjekker om resultatet er true og om resultatet er større enn 0
        if (result && result.length > 0) {
          // Setter game til å være lik resultatet av index 0 i gameResults arrayet
          const game = result[0];
          // Sjekker om spillet allerede er i favourites arrayet
          const existingGame = favourites.find((favourite) => favourite.game.slug.current === game.slug);
  
          // Sjekker om spillet ikke er i favourites arrayet
          if (!existingGame) {
            // Lager et objekt med spillet, likt objektet som kommer fra sanity
            const gameObj = {
              game: {
                apiId: game.apiId,
                title: game.title,
                slug: {
                  current: game.slug,
                  _type: "slug",
                },
                image: game.images[0],
                genres: game.genres,
              },
            };
            // Legger til spillet i favourites arrayet
            current.push(gameObj);
          }
        }
        // Returnerer current arrayet
        return current;
      }, []);
  
      // Setter favourites til å være lik favourites arrayet og newFavourites arrayet
      setFavouriteGames([...favourites, ...newFavourites]);
      // Setter numFavourites til å være lik antall spill i favourites arrayet + antall spill i finishedSlugs arrayet
      setNumFavourites(userFavourites?.numFavourites + finishedSlugs.length);
    } catch (error) {
      // Hvis det oppstår en feil, skriver vi ut feilen i konsollen
      console.error("Error fetching games:", error);
      throw error;
    }
  };


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
          {favouriteGames !== undefined ? (
            <section className="page-container">
              <h2 className="head head1">My Favourites</h2>
              <div id="favdiv">
                <div className="numofgames">
                  <span>{numFavourites}</span>
                  <span>Games</span>
                </div>
              </div>
              {favouriteGames.map((item, index) => (
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
