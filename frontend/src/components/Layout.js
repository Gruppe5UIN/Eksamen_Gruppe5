import React from "react";
import Nav from "./Nav";

export default function Layout() {
  return (
    <div className="main-container">
      <header>
        <h1>MAC's Gamehub</h1>
        <Nav />
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; Gruppe 5</p>
        <p>
          Game data provided by <a href="https://rawg.io/apidocs">RAWG</a>
        </p>
      </footer>
    </div>
  );
}
