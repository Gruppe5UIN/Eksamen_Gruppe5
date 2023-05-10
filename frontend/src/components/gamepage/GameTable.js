
//Eget komponent for info om spill som brukes i GamePage
//Har skilt ut fordi GamePage ble for stor
//Jeg tror table er korrekt i forhold til UU, men må styles så den passer listeformatet
export default function GameTable({game}){


const publishers = game?.publishers?.map((pub, index)=>{
    return (
      <td key={index}>
        {pub.name}
      </td>
    )
  })
  
  const genres = game?.genres?.map((genre, index)=>{
    return (
      <td key={index}>
        {genre.title}
      </td>
    )
  })
  const developers = (game?.developers?.map((dev, index) =>{
    return (
      <td key={index}>{dev.name}</td>
    )
  
  }))
  
  const platforms = game?.platforms?.map((platform, index) => {
    return(
      <td key={index}>{platform.platform.name}</td>
    )
  })


 const stores = game?.stores?.map((store, index) => {
    return(
      <td key={index}>{store.store.name}</td>
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

            
            {game?.stores.length > 0 ?
            <tr>
              <td>Stores: </td>
              {stores}
            </tr> : ''}
          </tbody>

        </table>
    )
}