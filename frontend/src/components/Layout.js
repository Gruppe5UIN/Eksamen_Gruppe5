import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>
        <h1>MAC's Gamehub</h1>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; Gruppe 5</p>
        <p>
          Game data provided by <a href="https://rawg.io/apidocs">RAWG</a>
        </p>
      </footer>
    </div>
  );
}
