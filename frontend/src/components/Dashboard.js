import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGames } from "../functions/Fetch";
import { fetchAllGames, countGames } from '../utils/sanity/gameServices'
import MyGamesSection from "./dashboardComponents/MyGamesSection.js";
import MyShopSection from "./dashboardComponents/MyShopSection";

export default function Dashboard() {
  //state for spill fra Sanity
  const [userGames, setUserGames] = useState([])
  //state for antall spill i MyGames
  const [numGames, setNumGames] = useState(0)

  const [games, setGames] = useState([]);
  //const count = 0;

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
    const limitData = data.slice(0,3)
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
          <MyShopSection games={games}/>
        </article>
      </section>
      <article>
        <section className="mygames-box">
          <h3>
            My games library (<span>{numGames.total}</span> games)
          </h3>
          <MyGamesSection userGames={userGames}/>
        </section>
        <section className="favourites-box">
          <h3>My Favourites</h3>
          {/*Vise noen av spillene fra MyFavourites */}
        </section>
      </article>
    </>
  );
}
