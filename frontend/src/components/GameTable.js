
//Eget komponent for info tabell i GamePage fordi GamePage blir for stor
//Jeg tror table er korrekt i forhold til UU, men må styles så den passer listeformatet
export default function GameTable({game}){


const publishers = game?.publishers?.map((pub, index)=>{
    return (
      <tr style={{margin:'0'}} key={index}>
        {pub.name}
      </tr>
    )
  })
  
  const genres = game?.genres?.map((genre, index)=>{
    return (
      <td style={{margin:'0'}} key={index}>
        {genre.name}
      </td>
    )
  })
  const developers = (game?.developers?.map((dev, index) =>{
    return (
      <td style={{margin:'0'}} key={index}>{dev.name}</td>
    )
  
  }))
  
  const platforms = game?.platforms?.map((platform, index) => {
    return(
      <td style={{margin: '0'}} key={index}>{platform.platform.name}</td>
    )
  })

    return (
        <table className="game-info">
          <tbody>
          <tr>
              <td>Published: </td>
              <td>{game?.released}</td>
            </tr>
          {game?.genres.length > 0 ? 
            <tr>
              <td>Genres: </td>
              {genres}
            </tr>
          : ''
            }
           
           
            {game?.publishers.length  > 0 ?
            
            <tr>
              <td>Publisher: </td>
              {publishers}
            </tr> : ''}

            {game?.developers.length > 0 ?
            <tr>
              <td>Developers: </td>
              {developers}
            </tr> : '' }

            {game?.platforms.length > 0 ?
            <tr>
              <td>Platforms: </td>
              {platforms}
            </tr> : ''}
          </tbody>

        </table>
    )
}