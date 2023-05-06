import React from "react";
import { useState, useEffect } from "react";
import { GiHeartShield } from "react-icons/gi";
import { useParams } from "react-router-dom";
import GameTable from "./GameTable";

//Komponent for presentasjon av et spill basert på slug som er unik og fungerer som id hos rawg
//Henter inn favoritt state fra App.js
//Trenger error håndtering
//Ligger en midlertidig print til console når man legger til/fjerner favoritt
//Button funksjonalitet er ikke laget
export default function GamePage({favourites, setFavourites}) {
  const { slug } = useParams();

  const [game, setGame] = useState();
  
  const url = `https://api.rawg.io/api/games/${slug}?key=6ccebb406ca942cd8ddc8584b1da9a4f`;

  const getGame = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setGame(data);
  };
 
  //Håndterer et klikk på favoritt ikon - legger til hvis den ikke er favoritt, fjerner hvis den allerede er favoritt
  //Er dette brukervennlig nok?
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
          <h1>{game?.name}</h1>
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
        <GameTable game={game} />
        <section className="tag-group">
          {game?.tags.slice(0,5).map((tag, index)=>(
            <span className="tags" key={index}>{tag.name}</span>))}
        </section>
        <button className="btn btn-outline-primary">Buy</button>
      </section>
    </article>
  );
}
