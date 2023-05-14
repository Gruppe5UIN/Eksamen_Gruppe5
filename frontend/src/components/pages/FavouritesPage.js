import GameCard from "./../GameCard";

export default function FavouritesPage({userFavourites}) {

  const favourites = userFavourites?.favourites
  const numFavourites = userFavourites?.numFavourites;


  return (
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
      ))} </>) : ('')}
    </article>
  );
}
