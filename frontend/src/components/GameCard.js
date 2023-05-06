import React from "react";
import { GiDuration } from "react-icons/gi";
import { Link } from "react-router-dom";

//Komponent for forhåndsvisning av spill som kan brukes på forsiden av dashboard og på spillsidene
//Skal ha en lenke basert på apiId videre til GamePage
//Henter inn et spillobjekt som props
//Sjanger må senere basereres på filtrering? På objektet er det en liste med sjangere
//Se på hvordan vi velger bilde. Bruker foreløpig kun første der det er en liste med flere
export default function GameCard({
  title,
  genre,
  image,
  slug,
  playTime,
  text,
}) {
  return (
    <article className="gamecard">
      <img className="gamecard-image" src={image} alt="game"></img>

      <section className="gamecard-text">
        <h3>{title}</h3>
        <h5>Genres:</h5>
        <ul>{genre}</ul>
        <section className="playtime">
          {playTime === 0 ? null : (
            <>
              <GiDuration className="duration-icon" size={28} alt="playtime" />
              <p> {playTime} hours</p>
            </>
          )}
        </section>
        <section className="button-section">
          <Link to={slug} className="btn btn-outline-primary">
            Read more
          </Link>
          <button className="btn btn-outline-primary">{text}</button>
        </section>
      </section>
    </article>
  );
}
