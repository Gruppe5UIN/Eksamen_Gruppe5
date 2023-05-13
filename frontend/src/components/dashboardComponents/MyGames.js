import GameCard from "../GameCard"

export default function MyGames({userGames}){


    return (
          <article>
            {userGames.map((game, index) => (
              <GameCard
                key={index}
                title={game.title}
                genre={game.genres.map((genre, index) => (
                  <li key={index}>{genre.title}</li>
                ))}
                image={game.image}
                slug={game.slug}
                playTime={game.playtime}
                text="Play"
            />))}
          </article>
    )
}