import React from "react";
import { GiDuration } from "react-icons/gi";


export default function GameCard() {

  
  return (

      <article className="gamecard">
        <img className="gamecard-image" src="https://placekitten.com/150/100" alt=""></img>
  
        <section className="gamecard-text">
          <h3>Tittel kan være lang</h3>
          <h4>Action</h4>
          <section className="playtime">
            <GiDuration className="duration-icon" size={28} alt="playtime"/>
            <p>7</p>
          </section>
        </section>
      </article>
 
  )
}
