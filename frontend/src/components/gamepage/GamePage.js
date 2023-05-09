import React from "react";
import { useState, useEffect } from "react";
import { GiHeartShield } from "react-icons/gi";
import { useParams } from "react-router-dom";
import GameTable from "./GameTable";
import { fetchGameBySlug } from "../../utils/sanity/gameServices";
import WordCloud from "./WordCloud";


/*Komponent for presentasjon av et spill. Henter slug fra url og bruker denne i fetch fra rawg api og sanity.
  Slug er unik og fungerer som id hos rawg - den er lest inn fra rawg api hos Sanity slik at vi er garantert 100% lik
  Men selv om både Sanity og rawg krever helt unike slugs er det en risiko hvis man slugify url i Sanity studio 
  med en regex som ikke dekker hele spekteret av muligheter. 
  For eksempel er det en del paranteser rundt årstall i rawg api som med en standard slugify fra undervisning ikke ble fjernet.
  Henter inn favoritt state fra App.js
*/

//Button funksjonalitet må lages
//Trenger error håndtering
//Vil vi ha flere klikkbare bilder? Kan hentes fra liste i Sanity og et kall til 'screenshots' etter slug/id hos rawg api
//Får et race eller noe lignende når jeg henter med apiId fra Sanity - må fikses hvis vi ikke skal bruke slug

//også usikker WordCloud - faller ut iblant

export default function GamePage({favourites, setFavourites}) {
  const { slug } = useParams();

  const [game, setGame] = useState();
  const [userGame, setUserGame] = useState();

  async function getUserGame() {
    const data = await fetchGameBySlug(slug)
    setUserGame(data[0]);
}

useEffect(() => {
    
  getUserGame(slug)
    // eslint-disable-next-line
},[slug])


 const url = `https://api.rawg.io/api/games/${slug}?key=6ccebb406ca942cd8ddc8584b1da9a4f`;
 
  const getGame = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setGame(data);
  };
 
  //Håndterer et klikk på favoritt ikon - legger til hvis den ikke er favoritt, fjerner hvis den allerede er favoritt
  //Ligger en midlertidig print til console når man legger til/fjerner favoritt
  //Lagrer apiId og tittel
  const handleFavourite = (event) => {  
      event.preventDefault()
      if(favourites.some(item => item['id'] === game?.id)){
        setFavourites(
          favourites.filter(item => item.id !== game?.id));
        console.log(`${game?.name} er fjernet fra favoritter`)
      }
     else{
        setFavourites( 
          [ 
            ...favourites, 
            { id: game?.id, name: game?.name} 
          ]
        );
        console.log(`${game?.name} er min favoritt`);
        }
  }

  
  useEffect(() => {
    
    getGame()
      // eslint-disable-next-line
  },[])

  return (
    <article className="gamepage">
      <figure className="image-frame">
        <img
          className="main-image"
          src={game?.background_image}
          alt={game?.name}></img>
      </figure>

      <section className="textarea">
        <header className="gamepage-header">
          <h1>{userGame?.title}</h1>
          <section className="game-details">
            {game?.rating ? 
            <span className="rating">
              <p>{game?.rating}</p>
            </span> : ''}
            <GiHeartShield
              onClick={handleFavourite}
              className="favourite-icon"
              size={42}
              alt="favourite"
            />
          </section>
        </header>

        <p className="plot">{game?.description_raw}</p>
        <GameTable game={game} userGame={userGame} />
        <section className="tag-group">

            <WordCloud gameTags={game?.tags}/>

        </section>

        <button className="btn btn-outline-primary">Buy</button>
      </section>
    </article>
  );
}
