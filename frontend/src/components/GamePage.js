import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//navigere bakover onClick={()=>navigate(-1)

//komponent for presentasjon av et spill
export default function GamePage({name}) {
  
  //hente spill basert på slug eller id?
  const { slug } = useParams();
  console.log(slug)
  //navigasjon for å gå tilbake et steg
  //const navigate = useNavigate();
 
  //url for å hente bilder 
  //https://api.rawg.io/api/games/3498/screenshots?key=d2d5f79e22a6464d852e6cd6b671c8d7
  
  const [games, setGames] = useState([]);

  const getGames = async() => {
    const url = 'https://api.rawg.io/api/games?key=d2d5f79e22a6464d852e6cd6b671c8d7&page_size=20';
    const response = await fetch(url);
    const data = await response.json();
    setGames(data.results);
}
/*
{games.map((game, index) => (
                <h1 key="index">{game.name}</h1>
                             
                  ))
            }
*/

useEffect(() => {
  getGames()
},[]);

console.log(games[0]?.name)

  return (
    <article className="gamepage">
      <figure className="image-frame">
          <img className="gameimage" src="https://placekitten.com/850/500" alt=""></img>
          <img className="miniatyr" src="https://placekitten.com/270/100" alt=""></img>
          <img className="miniatyr" src="https://placekitten.com/270/100" alt=""></img>
          <img className="miniatyr" src="https://placekitten.com/270/100" alt=""></img>
      </figure>
      <section className="textarea">
        <header className="gamepage-header">
          <h2>{name}</h2>
          <div className="rating">
            rate rate
          </div>
          <div>
            heart
          </div>
          
        </header>
        <p className="plot">
          flkjøvgkjbnkgvjk vgjhknlk
          gvhjkjk hkjlk hjlkj hjvkj 

        </p>
     
      <table className="game-info">

      </table>
      <section className="tags">
        ta tag tag
      </section>

      </section>

    </article>
  )
}
