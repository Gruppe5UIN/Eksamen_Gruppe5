import GameCard from "../GameCard";

export default function MyFavourites({ favourites }) {
  // Denne funksjonen sjekker favorittene til en bruker
  const checkFavourites = () => {
    // Hvis brukeren har mer enn 4 favoritter, returner de 4 første favorittene.
    if (favourites?.length > 4) {
      return favourites.slice(0, 4);
    } else {
      // Hvis brukeren har mindre enn 4 favoritter, returner alle favorittene.
      return favourites;
    }
  };

  const userFavourites = checkFavourites(favourites);

  return (
    <>
      {userFavourites !== undefined ? (
        <article className="gs-box">
          {userFavourites?.map((item, index) => (
            <GameCard
              key={index}
              title={item.game.title}
              genre={item.game.genres.map((genre, index) => (
                <li key={index}>{genre.title}</li>
              ))}
              image={item.game.image}
              slug={item.game.slug.current}
              playTime={0}
              text="Play this game"
            />
          ))}
        </article>
      ) : (
        ""
      )}
    </>
  );
}
