import GameCard from "../GameCard";

export default function MyGames({ userGames }) {
  // Denne funksjonen sjekker spillene til en bruker
  const checkGames = () => {
    if (userGames?.length > 4) {
      // Hvis brukeren har mer enn 4 spill, returner de 4 første spillene.
      return userGames.slice(0, 4);
    } else {
      // Hvis brukeren har mindre enn 4 spill, returner alle spillene.
      return userGames;
    }
  };
  const games = checkGames(userGames);

  return (
    <>
      {games !== undefined ? (
        <article className="gs-box">
          {games?.map((item, index) => (
            <GameCard
              key={index}
              title={item.game.title}
              genre={item.game.genres.map((genre, index) => (
                <li key={index}>{genre.title}</li>
              ))}
              image={item.game.image}
              slug={item.game.slug.current}
              playTime={item.playtime}
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
