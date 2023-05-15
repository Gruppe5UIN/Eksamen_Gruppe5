//import { useState, useEffect } from "react";
import "./App.css";
import "./css/main.css";
import GamePage from "./components/pages/gamepage/GamePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import { getUserByEmail } from "./utils/sanity/userServices";
import UserContext from "./context/UserContext";
import Login from "./components/Login";
import { getUserEmail } from "./helper/userHelper";
import GameShopPage from "./components/pages/GameShopPage";
import FavouritesPage from "./components/pages/FavouritesPage";
import MyGamesLibrary from "./components/pages/MyGamesLibrary";
import { fetchGamesByUsername, fetchFavouritesByUsername } from "./utils/sanity/userServices";

function App() {
  const [favourites, setFavourites] = useState([]);

  //har satt favourites i komponenter midlertidig på denne for å ikke kræsje favourites som er i GamePage
  //Endres av den som jobber med favourites
  const [userFavourites, setUserFavourites] = useState([])

  const [user, setUser] = useState(null);
  const [userGames, setUserGames] = useState([]);


  const fetchUser = async (email) => {
    // Hjelpemetode som henter bruker e-post fra localStorage
    const user = await getUserByEmail(email);
    // Sjekker om bruker er null
    if (user == null) {
      // Skriver ut feilmelding
      console.log("Not logged in");
      // Hvis bruker ikke er null
    } else {
      // Setter bruker til å være lik loggedInUser
      setUser(user);
    }
  };

  useEffect(() => {
    // Hjelpemetode som henter bruker e-post fra localStorage
    const email = getUserEmail();
    // Kjører fetchUser funksjonen med email som parameter
    fetchUser(email);
  }, []);

  // Henter spill basert på brukernavn
  async function getUserGames(username) {
    // Prøver å hente spill basert på brukernavn
    try {
      // Henter spill basert på brukernavn
      const data = await fetchGamesByUsername(username);
      // Setter userGames til å være lik data      
      const userGames = data
      // Returnerer userGames
      return userGames
      // Hvis det ikke går
    } catch (error) {
      // Skriver ut feilmelding
      console.log(error)
    }
  }

  useEffect(() => {
    // Sjekker om bruker er definert
    if (user) {
      // Kjører getUserGames funksjonen med brukernavn som parameter
      getUserGames(user.username)
        .then((userGames) => {
          // Setter userGames til å være lik resultatet fra getUserGames funksjonen
          setUserGames(userGames);
        })
        // Hvis det ikke går
        .catch((error) => {
          // Skriver ut feilmelding
          console.error(error);
          // Sender bruker til "/login"
          window.location.href = "/login";
        })

      // Henter brukerens favoritter basert på brukernavn
      getUserFavourites(user.username)
        .then((userFavourites) => {
          // Setter userFavourites til å være lik resultatet fra getUserFavourites funksjonen
          setUserFavourites(userFavourites);
        })
        // Hvis det ikke går
        .catch((error) => {
          // Skriver ut feilmelding
          console.error(error);
          // Sender bruker til "/login"
          window.location.href = "/login";
        })
    }
    // useEffect kjører når user endrer seg
  }, [user]);

  // Henter brukerens favoritter basert på brukernavn
  async function getUserFavourites(username) {
    // Prøver å hente brukerens favoritter basert på brukernavn
    try {
      // Henter brukerens favoritter basert på brukernavn
      const data = await fetchFavouritesByUsername(username);
      // Setter userFavourites til å være lik data
      const userFavourites = data
      // Returnerer userFavourites
      return userFavourites
      // Hvis det ikke går
    } catch (error) {
      // Skriver ut feilmelding
      console.log(error)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard userGames={userGames} favourites={userFavourites} />} />
            <Route
              path=":slug"
              element={
                <GamePage
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              }
            />
            <Route path="/gameshop" element={<GameShopPage />} />
            <Route path="/my-games" element={<MyGamesLibrary userGames={userGames} />} />
            <Route path="/my-favourites" element={<FavouritesPage userFavourites={userFavourites} />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
