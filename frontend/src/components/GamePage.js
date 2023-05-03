import React from "react";
import { useState, useEffect } from "react";
import { GiHeartShield } from "react-icons/gi";
//import { useParams } from "react-router-dom";

//navigere bakover onClick={()=>navigate(-1)
/*
Utviklere (developers)
//Kjøpsmuligheter (stores) - ?
*/
//komponent for presentasjon av et spill
export default function GamePage({game}) {

  //description - hente med id?
 

  //hente spill basert på slug eller id?
  //const { slug } = useParams();
  //console.log(slug)
  //navigasjon for å gå tilbake et steg
  //const navigate = useNavigate();
 
  //url for å hente bilder 
  //const plot = 'https://api.rawg.io/api/games/3498?key=d2d5f79e22a6464d852e6cd6b671c8d7'

  //console.log(plot?.description)
  //developers: https://api.rawg.io/api/developers?id=2306&key=d2d5f79e22a6464d852e6cd6b671c8d7
 
  

  const [thisGame, setThisGame] = useState([]);

  const getThisGame = async() => {
    const url = 'https://api.rawg.io/api/games/3498?key=d2d5f79e22a6464d852e6cd6b671c8d7';
    const response = await fetch(url);
    const data = await response.json();
    setThisGame(data);
}

useEffect(() => {
  getThisGame()
},[]);

console.log({thisGame})
const genres = thisGame?.genres
//mappe gjennom
const mainImage = game?.short_screenshots[0].image;
const miniature1 = game?.short_screenshots[1].image;
const miniature2 = game?.short_screenshots[2].image;
const miniature3 = game?.short_screenshots[3].image;


  return (
    <article className="gamepage">
      <figure className="image-frame">
          <img className="main-image" src={mainImage} alt=""></img>
          <section className="miniatures">
            <img className="miniature" style={{maxWidth: '250px'}} src={miniature1} alt=""></img>
            <img className="miniature" style={{maxWidth: '250px'}} src={miniature2} alt=""></img>
            <img className="miniature" style={{maxWidth: '250px'}} src={miniature3} alt=""></img>
          </section>
      </figure>
      <section className="textarea">
        <header className="gamepage-header">
          <h1>{game?.name}</h1>
          <section className="game-details">
            <span className="rating">
              <p>{game?.rating}</p></span>
            <GiHeartShield className="favourite-icon" size={42} alt="favourite"/> 
         </section>
        </header>
        <p className="plot">
        {thisGame.description_raw}
        </p>
     
        <table className="game-info">
          <tbody>
            <tr>
              <td>Genres: </td>
             
              {genres?.map((genre, index) =>(
                <td key={index}>
                  {genre?.name}
                </td>
              ))}
            </tr>
            <tr>
              <td>Published: </td>
              <td></td>
            </tr>
            <tr>
              <td>Publisher: </td>
              <td>EA Sports</td>
            </tr>
            <tr>
              <td>Developers: </td>
              <td>Sega, Ubisoft</td>
            </tr>
            <tr>
              <td>Platforms: </td>
              <td>Android, iOS</td>
            </tr>
          </tbody>

        </table>
        <section className="tag-group">
          Tags: 
          <span className="tags">platformer</span>
          <span className="tags">jump</span>
          <span className="tags">stressful</span>
        </section>
        <button className="buy-button">Buy</button>
      </section>

    </article>
  )
}
