import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import MyFavourites from "./dashboardComponents/MyFavourites";
import UserContext from "../context/UserContext";
import MyGames from "./dashboardComponents/MyGames";
import GameShop from "./dashboardComponents/GameShop";

export default function Dashboard({ userGames, favourites }) {
  //antall spill og favoritter
  const numGames = userGames.numGames;
  const numFavourites = favourites.numFavourites;

  //kun lister med spill fra data objektet
  const myGames = userGames?.games;
  const myFavourites = favourites?.favourites;

  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

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
