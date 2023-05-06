import React from "react";

export default function Nav() {
  return (
    <header>
      <nav>
        <h1>Game Haven</h1>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/games">Store</a>
          </li>
          <li>
            <a href="/about">My Library</a>
          </li>
          <li>
            <a href="/about">Welcome, Name</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
