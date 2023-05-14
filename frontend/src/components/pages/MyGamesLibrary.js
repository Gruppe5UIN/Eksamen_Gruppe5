import GameCard from "./../GameCard";

export default function MyGamesLibrary({games}) {

  return (
    <section className="page-container">
      <h3 id="gs-first">My Games Library - games</h3>
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
      ))}
    </section>
  );
}
