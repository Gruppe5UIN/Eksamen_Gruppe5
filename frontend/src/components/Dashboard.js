import React from "react";
import { useState, useEffect, useContext } from "react";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";
import { getGames } from "../functions/Fetch";
import { countGames } from "../utils/sanity/gameServices";
import MyFavourites from "./MyFavourites";
import UserContext from "../context/UserContext";
import { fetchGamesByUsername } from "../utils/sanity/userServices";


export default function Dashboard() {
  //state for spill fra Sanity
  const [userGames, setUserGames] = useState([]);
  //state for antall spill i MyGames
  const [numGames, setNumGames] = useState(0);

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

  //Henter spill fra Sanity....
  async function getUserGames(username) {
    const data = await fetchGamesByUsername(username);
    const userGames = data.games
    return userGames.slice(0,4)
  } 

   useEffect(() => {
    if (user) {
      getUserGames(user.username)
        .then((userGames) => {
         
          setUserGames(userGames);
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/login";
        })
    }
  }, [user]);

  async function getCount() {
    const data = await countGames();
    setNumGames(data);
  }

  useEffect(() => {
    getCount();
   
  }, []);

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
          {games?.map((game, index) => (
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

          {userGames !== undefined ? ( 
            <article className="gs-box">
          
              {userGames?.map((item, index) => (
                  <GameCard
                    key={index}
                    title={item.game.title}
                    genre={item.game.genres.map((genre, index) => (
                      <li key={index}>{genre.title}</li>
                    ))}
                    image={item.game.image}
                    slug={item.slug}
                    playTime={item.playtime}
                
                    text="Buy"
                  />
              ))}

            </article>) : ('')}
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
  );
}
