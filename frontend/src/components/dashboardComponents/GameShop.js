import GameCard from "../GameCard"

export default function GameShop({games}){

    return (
        <>
        {games.map((game, index) => (
            <GameCard
              key={index}
              image={game.background_image}
              slug={game.slug}
              title={game.name}
              playTime={game.playtime}
              genre={game.genres.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
              text="Buy"
            />
          ))}
         </> 
    )
}