import React from "react";

export default function Nav() {
  return (
    <nav>
      <div>
        <h1>Logo</h1>
      </div>
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
  );
}
