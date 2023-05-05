import React from "react";
import { useState, useEffect } from "react";
import { GiHeartShield } from "react-icons/gi";
import { useParams } from "react-router-dom";
import GameTable from "./GameTable";

//Komponent for presentasjon av et spill basert på apiId
//Trenger hjelp til å få til en fetch fra to kilder: et game objekt og en liste med screenshots (bilder)

//Dessuten forbedre koden som er, legge til feilhåndtering og utnytte useEffect bedre(?)

//Skal ha funksjonalitet for:
//tags - wordCloud
//favourite - må onClick legge til i favourites
//button - kjøpe eller innlogget (?)

//Tar ut tag i eget komponent

export default function GamePage() {
  const { slug } = useParams();

  const [game, setGame] = useState();
  //const [images, setImages] = useState();

  const url = `https://api.rawg.io/api/games/${slug}?key=6ccebb406ca942cd8ddc8584b1da9a4f`;
  //const imageUrl = `https://api.rawg.io/api/games/${apiId}/screenshots?key=6ccebb406ca942cd8ddc8584b1da9a4f`

  const getGame = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setGame(data);
  };

  useEffect(() => {
    getGame();
    // eslint-disable-next-line
  }, []);

  //Bare en begynnelse på en funksjon på favoritt ikon - fortsett gjerne her
  const handleFavourite = (event) => {
    event.preventDefault();
    console.log(`${game?.name} er min favoritt`);
  };

  //Bilder kan ev også få et eget komponent ?,
  //særlig hvis vi vil ha en slider/bytte mellom hovedbilder og miniatyrer
  //bør ha en alt tekst som skiller de ulike bildene..har bare satt på et nummer nå
  const mainImage = game?.background_image;
  const miniature1 = game?.background_image_additional;
  const miniature2 = game?.background_image;
  const miniature3 = game?.background_image_additional;

  return (
    <article className="gamepage">
      <figure className="image-frame">
        <img
          className="main-image"
          src={mainImage}
          alt={`${game?.name} num 1`}
        ></img>
        <section className="miniatures">
          <img
            className="miniature"
            style={{ maxWidth: "250px" }}
            src={miniature1}
            alt={`${game?.name} num 2`}
          ></img>
          <img
            className="miniature"
            style={{ maxWidth: "250px" }}
            src={miniature2}
            alt={`${game?.name} num 3`}
          ></img>
          <img
            className="miniature"
            style={{ maxWidth: "250px" }}
            src={miniature3}
            alt={`${game?.name} num 4`}
          ></img>
        </section>
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
          Tags:
          <span className="tags">platformer</span>
          <span className="tags">jump</span>
          <span className="tags">stressful</span>
        </section>
        <button class="btn btn-outline-primary">Buy</button>
      </section>
    </article>
  );
}
