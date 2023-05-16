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

  /*IsLoading settes til true før henting av data og viser dermed en loading spinner mens brukeren venter. 
Denne settes så til false når dataen er hentet, slik at dataen erstatter spinneren. */

  useEffect(() => {
    if (games && selected) {
      setIsLoading(true);
      const filtered = getFilteredGames();
      setFilteredGames(filtered);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [games, selected]);

  /*handleSelect håndterer henting av spill basert på sjanger. Den setter verdien man velger i select-boksen inn i selected-staten.
Hvis bruker har valgt "all genres" som har value "all", så skal den spytte ut alle spill.
Ellers skal den kalle på getFilteredGames som returnerer spill hvor tittelen på spillet matcher valget i selectboksen*/

  const handleSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
    if (e.target.value === "all") {
      setFilteredGames(games);
    }
  };

  const getFilteredGames = () => {
    if (selected === "all") {
      return games;
    } else {
      return games?.filter((game) =>
        game.game.genres.some((genre) => genre.title === selected)
      );
    }
  };

  // Lager en ny liste til unike spill, slik at man kan sile ut duplikater fra nedtrekksmenyen i filteret
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
            <h2 className="head head1">My Games Library</h2>{" "}
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
                            /*Mapper gjennom alle sjangre, men fordi sjanger dukker opp flere ganger så legger vi kun unike sjangre
                            inn i en ny liste, som vi kan benytte for å unngå duplikater i filteret */
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
                {/*Mapper gjennom filteredGames for å se hvilke spillsammensetningen den skal vise på GameCard*/}
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
