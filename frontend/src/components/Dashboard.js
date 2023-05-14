import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { countGames } from "../utils/sanity/gameServices";
import MyFavourites from "./dashboardComponents/MyFavourites";
import UserContext from "../context/UserContext";
import MyGames from "./dashboardComponents/MyGames";
import GameShop from "./dashboardComponents/GameShop";

export default function Dashboard() {
  //state for antall spill i MyGames
  const [numGames, setNumGames] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //const count = 0;

  const { user } = useContext(UserContext);

  async function getCount() {
    const data = await countGames();
    setNumGames(data);
  }

  useEffect(() => {
    getCount();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <section id="welcome-section">
            {user ? (
              <h2 id="welcometxt">Welcome, {user.username}!</h2>
            ) : (
              <h2>Welcome, stranger!</h2>
            )}
          </section>
          <section className="gs">
            <section className="gs-txt-box">
              <h3>Game Shop</h3>
              <Link
                to="/gameshop"
                className="btn btn-outline-secondary"
                id="visitshop-btn"
              >
                Visit shop
              </Link>
            </section>
            <GameShop />
          </section>
          {user ? (
            <>
              <section className="gs">
                <section className="gs-txt-box">
                  <h3>
                    My games library (<span>{numGames.total}</span> games)
                  </h3>
                  <Link
                    to="/my-games"
                    className="btn btn-outline-secondary"
                    id="visitshop-btn"
                  >
                    My Games
                  </Link>
                </section>
                <MyGames />
              </section>
              <section className="gs">
                <section className="gs-txt-box">
                  <h3>My Favourites</h3>
                  <Link
                    to="/my-favourites"
                    className="btn btn-outline-secondary"
                    id="visitshop-btn"
                  >
                    My Favourites
                  </Link>
                </section>
                <MyFavourites />
              </section>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
