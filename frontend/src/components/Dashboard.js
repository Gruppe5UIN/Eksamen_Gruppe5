import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import MyFavourites from "./dashboardComponents/MyFavourites";
import UserContext from "../context/UserContext";
import MyGames from "./dashboardComponents/MyGames";
import GameShop from "./dashboardComponents/GameShop";

export default function Dashboard({ userGames, favourites }) {
  const numGames = userGames.numGames;
  const numFavourites = favourites.numFavourites;

  const myGames = userGames?.games;
  const myFavourites = favourites?.favourites;

  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  /*isLoading/setIsLoading setter state til true før lasting av data og false når data er lastet inn. Denne er koblet til en loader spinner
  som gjør at vi kan laste en gif mens vi venter på at data skal komme inn, for bedre brukervennlighet*/

  useEffect(() => {
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
                className="btn btn-outline-dark visitshop-btn"
              >
                All Shop Items
              </Link>
            </section>
            <GameShop />
          </section>
          {user ? (
            <>
              <section className="gs">
                <section className="gs-txt-box">
                  <h3>
                    My games library (<span>{numGames}</span> games)
                  </h3>
                  <Link
                    to="/my-games"
                    className="btn btn-outline-dark visitshop-btn"
                  >
                    My Full Games Library
                  </Link>
                </section>

                <MyGames userGames={myGames} />
              </section>
              <section className="gs">
                <section className="gs-txt-box">
                  <h3>
                    My Favourites (<span>{numFavourites}</span> games)
                  </h3>
                  <Link
                    to="/my-favourites"
                    className="btn btn-outline-dark visitshop-btn"
                  >
                    Full List of Favourites
                  </Link>
                </section>
                <MyFavourites favourites={myFavourites} />
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
