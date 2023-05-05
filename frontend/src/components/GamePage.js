import React from "react";
import { useState, useEffect } from "react";
import { GiHeartShield } from "react-icons/gi";
import { useParams } from "react-router-dom";
import GameTable from "./GameTable";

//Komponent for presentasjon av et spill basert på slug - som er unik og fungerer som id hos rawg

//Legge til feilhåndtering 

//Skal ha funksjonalitet for:
//favourite - må onClick legge til i favourites - legge til i state
//button - kjøpe eller innlogget bruker...

export default function GamePage() {
  const { slug } = useParams();

  const [game, setGame] = useState();
  const [favourite, setFavourite] = useState([]);

  const url = `https://api.rawg.io/api/games/${slug}?key=6ccebb406ca942cd8ddc8584b1da9a4f`;

  const getGame = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setGame(data);
  };


  useEffect(() => {
    getGame() 
    // eslint-disable-next-line
  }, []);

  //Bare en begynnelse på en funksjon på favoritt ikon - fortsett gjerne her
  const handleFavourite = (event) => {
    event.preventDefault();
    console.log(`${game?.name} er min favoritt`);
  };

  //lazy loading images
  const mainImage = game?.background_image;

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
        {/*<button className="btn btn-outline-primary">Buy</button>*/}
      </section>
    </article>
  );
}
