import React, { useState } from "react";
import { GiDuration } from "react-icons/gi";
import { Link } from "react-router-dom";

//Komponent for forhåndsvisning av spill som kan brukes på forsiden av dashboard og på spillsidene

export default function GameCard({
  title,
  genre,
  image,
  slug,
  playTime,
  text,
}) {

  const [buttonText, setButtonText] = useState(text);

  const handleBuy = (e) => {
    e.preventDefault();
    console.log(text)
    if (buttonText === "Buy This Game") {
      setButtonText("Added to cart")
    }
  };
  return (
    <article className="gamecard">
      <img className="gamecard-image" src={image} alt="game"></img>

      <section className="gamecard-text">
        <h3>{title}</h3>

        {genre.length > 0 ?
          <>
            <h4>Genres:</h4>
            <ul>{genre}</ul>
          </> : ''}

        <section className="playtime">
          {playTime === 0 ? null : (
            <>
              <GiDuration className="duration-icon" size={28} alt="playtime" />
              <p> {playTime} hours</p>
            </>
          )}
        </section>
        <section className="button-section">
          { }
          <Link to={slug} className="btn btn-outline-dark">
            Show Game Details
          </Link>
          <button onClick={handleBuy} className="btn btn-outline-dark">{buttonText}</button>
        </section>
      </section>
    </article>
  );
}
