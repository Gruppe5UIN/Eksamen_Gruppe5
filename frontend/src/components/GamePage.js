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
export default function GamePage() {
  
  //hente spill basert på slug eller id?
  //const { slug } = useParams();
  //console.log(slug)
  //navigasjon for å gå tilbake et steg
  //const navigate = useNavigate();
 
  //url for å hente bilder 
  //https://api.rawg.io/api/games/3498/screenshots?key=d2d5f79e22a6464d852e6cd6b671c8d7
  //developers: https://api.rawg.io/api/developers?id=2306&key=d2d5f79e22a6464d852e6cd6b671c8d7
  

  const [games, setGames] = useState([]);

  const getGames = async() => {
    const url = 'https://api.rawg.io/api/games?key=d2d5f79e22a6464d852e6cd6b671c8d7&page_size=20';
    const response = await fetch(url);
    const data = await response.json();
    setGames(data.results);
}

useEffect(() => {
  getGames()
},[]);

console.log(games?.short_screenshots)
const mainImage = games[0]?.short_screenshots[0].image;
const miniature1 = games[0]?.short_screenshots[1].image;
const miniature2 = games[0]?.short_screenshots[2].image;
const miniature3 = games[0]?.short_screenshots[3].image;


  return (
    <article className="gamepage">
      <figure className="image-frame">
          <img className="main-image" src={mainImage} alt=""></img>
          <section className="miniatures">
            <img className="miniature" src={miniature1} alt=""></img>
            <img className="miniature" src={miniature2} alt=""></img>
            <img className="miniature" src={miniature3} alt=""></img>
          </section>
      </figure>
      <section className="textarea">
        <header className="gamepage-header">
          <h1>{games[0]?.name}</h1>
          <section className="game-details">
            <span className="rating">
              <p>4.7</p></span>
            <GiHeartShield className="favourite-icon" size={42} alt="favourite"/> 
         </section>
        </header>
        <p className="plot">
        On olemassa monta eri versiota Lorem Ipsumin kappaleista, mutta suurin osa on kärsinyt muunnoksista joissain muodoissa, kuten huumorin tai sattumanvaraisesti asetetuin sanoin jotka eivät näytä edes vähän uskottavalta. Jos sinä aiot käyttää kappaletta Lorem

        </p>
     
        <table className="game-info">
          <tbody>
            <tr>
              <td>Genres: </td>
              <td>Action, rpg</td>
            </tr>
            <tr>
              <td>Published: </td>
              <td>12.12.2023</td>
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
