import GameCard from "./../GameCard";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function MyGamesLibrary({ userGames }) {
  const games = userGames?.games;
  const numGames = userGames?.numGames;

  const [filteredGames, setFilteredGames] = useState([]);
  const [selected, setSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sjekker om games og selected er definert
    if (games && selected) {
      // Setter loading effekt til true
      setIsLoading(true);
      // Kaller på getFilteredGames funksjonen
      const filtered = getFilteredGames();
      // Setter filteredGames til å være lik resultatet fra getFilteredGames funksjonen.
      setFilteredGames(filtered);
      // Setter loading effekt til false
      setIsLoading(false);
    }
    // eslint-disable-next-line
    // Kjører useEffect når games eller selected endrer seg
  }, [games, selected]);

  // Funksjon som håndterer valg av sjanger
  const handleSelect = (e) => {
    // Forhindrer at siden lastes på nytt
    e.preventDefault();
    // Setter selected til å være lik verdien som er valgt i select boksen
    setSelected(e.target.value);
    // Sjekker om verdien som er valgt i select boksen er "all"
    if (e.target.value === "all") {
      // Henter spill basert på all sjanger
      setFilteredGames(games);
    }
  };

  // Funksjon som henter spill basert på valgt sjanger
  const getFilteredGames = () => {
    // Sjekker om valgt sjanger er "all"
    if (selected === "all") {
      // Returnerer alle spill
      return games;
      // Sjekker om valgt sjanger er noe annet enn "all"
    } else {
      // Returnerer spill basert på valgt sjanger
      return games?.filter((game) =>
        // Sjekker om spill har sjangeren som er valgt
        game.game.genres.some((genre) => genre.title === selected)
      );
    }
  };

  // Lager en ny Set
  const uniqueGenres = new Set();

  return (
    <>
      <section className="breadcrumb">
        <Link to="/">Home</Link> / <p>My Games Library</p>
      </section>
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <section className="page-container">
            <h3 className="head head1">My Games Library</h3>{" "}
            <div className="numofgames">
              <span>{numGames}</span>
              <span>Games</span>
            </div>
            {games !== undefined ? (
              <>
                <div id="selectbox">
                  <select id="genre-filter" onChange={handleSelect}>
                    <option value="all">All genres</option>
                    {games?.map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          {item?.game.genres.map((genre, index) => {
                            if (!uniqueGenres.has(genre.title)) {
                              uniqueGenres.add(genre.title);
                              return (
                                <option
                                  value={genre.title}
                                  key={`${genre.title}-${index}`}
                                >
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
                </div>
                {filteredGames?.map((item, index) => (
                  <GameCard
                    key={index}
                    title={item.game.title}
                    genre={item.game.genres.map((genre, index) => (
                      <li key={index}>{genre.title}</li>
                    ))}
                    image={item.game.image}
                    slug={`/${item.game.slug.current}`}
                    playTime={item.playtime}
                    text={"Play this game"}
                  />
                ))}{" "}
              </>
            ) : (
              ""
            )}
          </section>
        </>
      )}
    </>
  );
}
