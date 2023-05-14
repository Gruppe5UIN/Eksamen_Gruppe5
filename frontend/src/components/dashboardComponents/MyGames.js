import GameCard from "../GameCard"

//Komponent for forhåndsvisning av bruker spill
export default function MyGames({userGames}){
  const games = userGames.slice(0,4)

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
      
              text="Buy"
            />
          ))}
        </article>) : ('')}
    </>    
    )
}