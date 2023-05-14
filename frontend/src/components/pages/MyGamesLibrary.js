import React, { useEffect, useState, useContext } from "react";
import GameCard from "./../GameCard";
import { fetchGamesByUsername } from "../../utils/sanity/userServices";
import UserContext from "../../context/UserContext";

export default function MyGamesLibrary() {
  const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selected, setSelected] = useState("");

  const getGames = async (username) => {
    const data = await fetchGamesByUsername(username);
    const games = data.games;
    return games;
  };

  useEffect(() => {
    if (user) {
      getGames(user.username)
        .then((games) => {
          setGames(games);
          setFilteredGames(games);
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/login";
        });
    }
    console.log(games);
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const filtered = getFilteredGames();
    setFilteredGames(filtered);
    // eslint-disable-next-line
  }, [selected]);

  const handleSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
  };

  const getFilteredGames = () => {
    if (selected === "all") {
      return games;
    } else {
      return games.filter((game) =>
        game.game.genres.some((genre) => genre.title === selected)
      );
    }
  };

  const uniqueGenres = new Set();

  return (
    <section className="page-container">
      <h3 id="gs-first">My Games Library - {games.length} games</h3>
      <select id="genre-filter" onChange={handleSelect}>
        <option value="all">All genres</option>
        {games?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item?.game.genres.map((genre) => {
                if (!uniqueGenres.has(genre.title)) {
                  uniqueGenres.add(genre.title);
                  return (
                    <option value={genre.title} key={genre.title}>
                      {genre.title}
                    </option>
                  );
                }
                return null;
              })}
            </React.Fragment>
          );
        })}
      </select>
      {filteredGames?.map((item) => (
        <GameCard
          key={item._id}
          title={item.game.title}
          genre={item.game.genres.map((genre) => (
            <li key={genre.title}>{genre.title}</li>
          ))}
          image={item.game.image}
          slug={item.game.slug.current}
          playTime={item.playtime}
          text={"Text here"}
        />
      ))}
    </section>
  );
}
