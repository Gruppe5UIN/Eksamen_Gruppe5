import GameCard from "../GameCard"

export default function MyGames({userGames}){
  
   const checkGames = () => {
      if(userGames?.length > 4){
        return userGames.slice(0,4)
      }
      else{
        return userGames
      }
    }
    const games = checkGames(userGames)

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