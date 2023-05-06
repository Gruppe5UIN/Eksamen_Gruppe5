import React from "react";
import { useState, useEffect } from "react";
import { GiHeartShield, GiAbacus } from "react-icons/gi";
import { useParams } from "react-router-dom";
import {fetchGame} from '../utils/sanity/gameServices'
import GameTable from "./GameTable";

//Komponent for presentasjon av et spill basert på slug - som er unik og fungerer som id hos rawg

//Legge til feilhåndtering 

//Skal ha funksjonalitet for:
//favourite - fjerne hvis i liste - css
//button - kjøpe eller innlogget bruker...

export default function GamePage({favourites, setFavourites}) {
  const { slug } = useParams();

  const [game, setGame] = useState();
  const [usergame, setUsergame] = useState();

  const url = `https://api.rawg.io/api/games/${slug}?key=6ccebb406ca942cd8ddc8584b1da9a4f`;

  const getGame = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setGame(data);
  };

 

  async function getUserGame(id) {
        const data = await fetchGame(id)
        setUsergame();
    }
  
  //Kun hvis den ikke ligger der
  //fjerne hvis den allerede er der
  const handleFavourite = (event) => {
      event.preventDefault();
      if(favourites.length === 0){
        console.log("første favoritt")
      }
     
      /*
      setFavourites(
        favourites.filter(g =>
          g.id !== game.id
        ));
        console.log(`${game?.name} er fjernet `)*/
   
        setFavourites( 
        [ 
          ...favourites, 
          { id: game?.id, name: game?.name} 
        ]
      );
  
      console.log(`${game?.name} er min favoritt`);
    
  }


  const handleDelete = (event) => {
    event.preventDefault()
    if(favourites.length > 0){
       setFavourites(...favourites.filter((element, i) => element !== game))
    }
  }

  useEffect(() => {
    getGame() 
    // eslint-disable-next-line
  }, []);


  const mainImage = game?.background_image;
  console.log(favourites)

  return (
    <article className="gamepage">
      <figure className="image-frame">
        <img
          className="main-image"
          src={mainImage}
          alt={game?.name}></img>
      </figure>

      <section className="textarea">
        <header className="gamepage-header">
          <h1>{game?.name}</h1>
          <section className="game-details">
            <span className="rating">
              <p>{game?.rating}</p>
            </span>
            <GiHeartShield
              onClick={handleFavourite}
              className="favourite-icon"
              size={42}
              alt="favourite"
            />
        
            <GiAbacus
              onClick={handleDelete}
              className="favourite-icon"
              size={42}
              alt="remove from favourite"/>
          </section>
        </header>
        <p className="plot">{game?.description_raw}</p>
        <GameTable game={game} />
        <section className="tag-group">
          {game?.tags.slice(0,5).map((tag, index)=>(
            <span className="tags" key={index}>{tag.name}</span>
          )  
        
          )}
        </section>
        <button className="btn btn-outline-primary" >Buy</button>
      </section>
    </article>
  );
}
