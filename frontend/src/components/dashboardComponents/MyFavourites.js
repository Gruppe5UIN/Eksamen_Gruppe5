import GameCard from "../GameCard";

export default function MyFavourites({ favourites }) {
  const checkFavourites = () => {
    if (favourites?.length > 4) {
      return favourites.slice(0, 4);
    } else {
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
              text="Buy This Game"
            />
          ))}
        </article>
      ) : (
        ""
      )}
    </>
  );
}
