import React from "react";
import { GiDuration } from "react-icons/gi";


export default function GameCard({game}) {
  const image = game?.short_screenshots[0]?.image
  const thisTitle = game?.name
  const thisGenre = game?.genres[0]?.name
  const thisPlayTime = game?.playtime
  
  return (

      <article className="gamecard">
        <img className="gamecard-image" src={image} alt="game" style={{maxWidth: '200px'}}></img>
  
        <section className="gamecard-text">
          <h3>{thisTitle}</h3>
          <h4>{thisGenre}</h4>
          <section className="playtime">
            <GiDuration className="duration-icon" size={28} alt="playtime"/>
            <p>{thisPlayTime}</p>
          </section>
        </section>
      </article>
 
  )
}
