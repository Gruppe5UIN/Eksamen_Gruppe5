import React from "react";
import { useState, useEffect, useContext } from "react";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";
import { getGames } from "../functions/Fetch";
import { fetchAllGames, countGames } from '../utils/sanity/gameServices'
import MyFavourites from "./MyFavourites";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  //state for spill fra Sanity
  const [userGames, setUserGames] = useState([])
  //state for antall spill i MyGames
  const [numGames, setNumGames] = useState(0)

  const [games, setGames] = useState([]);
  //const count = 0;

  const { user } = useContext(UserContext);

  useEffect(() => {
    getGames({
      ordering: "-released",
      page_size: 3,
    }).then((results) => {
      setGames(results);
    });
  }, []);

  //Henter spill fra Sanity og returnerer 3 spill
  //Muligens må denne på et høyere nivå for å sende inn props i MyGames komponentet
  async function getUserGames() {
    const data = await fetchAllGames()
    const limitData = data.slice(0, 3)
    setUserGames(limitData);
  }

  async function getCount() {
    const data = await countGames()
    setNumGames(data)
  }

  useEffect(() => {
    getCount()
    getUserGames()
  }, [])

  return (
    <>
      <section className="gs">
        <section className="gs-txt-box">
          <h2>Game Shop</h2>
          <Link
            to="/gameshop"
            className="btn btn-outline-secondary"
            id="visitshop-btn"
          >
            Visit shop
          </Link>
        </section>

        <article className="gs-box">
          {games.map((game, index) => (
            <GameCard
              key={index}
              image={game.background_image}
              slug={game.slug}
              title={game.name}
              playTime={game.playtime}
              genre={game.genres.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
              text="Buy"
            />
          ))}
        </article>
      </section>
      {user ?
        <article>
          <section className="mygames-box">
            <h3>
              My games library (<span>{numGames.total}</span> games)
            </h3>
            <article>
              {userGames.map((game, index) => (
                <GameCard
                  key={index}
                  title={game.title}
                  genre={game.genres.map((genre, index) => (
                    <li key={index}>{genre.title}</li>
                  ))}
                  image={game.image}
                  slug={game.slug}
                  playTime={game.playtime}
                  text="Play"
                />))}
            </article>
            {/*Vise noen av spillene fra MyGames */}
          </section>
          <section className="favourites-box">
            <h3>My Favourites</h3>
            {/*Vise noen av spillene fra MyFavourites */}
            <MyFavourites />
          </section>
        </article>
        : <></>}
    </>
  );
}
