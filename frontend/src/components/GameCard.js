import React from "react";
import { GiDuration } from "react-icons/gi";
import {Link} from 'react-router-dom'

//Komponent for forhåndsvisning av spill som kan brukes på forsiden av dashboard og på spillsidene
//Skal ha en lenke basert på apiId videre til GamePage
//Henter inn et spillobjekt som props
//Sjanger må senere basereres på filtrering? På objektet er det en liste med sjangere
//Se på hvordan vi velger bilde. Bruker foreløpig kun første der det er en liste med flere
export default function GameCard({game}) {
  const image = game?.short_screenshots[0]?.image
  const title = game?.name
  const genre = game?.genres[0]?.name
  const playTime = game?.playtime
  const id = game?.id
  
  console.log(id)
  return (

      <article className="gamecard">
        <img className="gamecard-image" src={image} alt="game" style={{maxWidth: '200px'}}></img>
  
        <section className="gamecard-text">
          <h3>{title}</h3>
          <h4>{genre}</h4>
          <section className="playtime">
            <GiDuration className="duration-icon" size={28} alt="playtime"/>
            <p>{playTime}</p>
          </section>
           <Link to={game?.slug}>Tittel</Link>
        </section>
      </article>
 
  )
}
