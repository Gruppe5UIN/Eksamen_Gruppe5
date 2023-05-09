import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { removeUserEmail } from "../helper/userHelper";

export default function Nav() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <nav>
        <a href="/" id="headline">
          <h1>Game Haven</h1>
        </a>
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
                <a href="#">Welcome, {user.username}</a>
              </li>
              <li>
                <a onClick={removeUserEmail} href="/">Logout</a>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
