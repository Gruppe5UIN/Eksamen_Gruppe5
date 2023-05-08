import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Nav() {
  const { user } = useContext(UserContext);

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
          {user !== null ? (
            <>
              <li>
                <a href="/my-games">My Games</a>
              </li>
              <li>
                <a href="/about">Welcome, {user.username}</a>
              </li>
            </>) : (
            <li>
              <a href="/login">Login</a>
            </li>)}
        </ul>
      </nav>
    </header>
  );
}
