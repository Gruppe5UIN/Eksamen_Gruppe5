import React from "react";
import { useState, useEffect } from "react";
//import { useParams, useNavigate } from "react-router-dom";

//navigere bakover onClick={()=>navigate(-1)

//komponent for presentasjon av et spill
export default function GamePage() {
  
  //hente spill basert på slug eller id?
  //const { slug } = useParams();
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

console.log(games)

  return (
    <article className="gamepage">
      <figure className="gameimage">
        <img src="" alt="" className="main-image"/>
        <img src="" alt="" className="miniatyr"/>
        <img src="" alt="" className="miniatyr"/>
        <img src="" alt="" className="miniatyr"/>
      </figure>
      <section className="textarea">
        <header>
          <h1>{games[0]?.name}</h1>
          <p>icon</p>
          <p>icon2</p>
        </header>
        <p className="plot">

        </p>
     
      <table className="game-info">

      </table>
      <section className="tags">
      </section>

      </section>

    </article>
  )
}
