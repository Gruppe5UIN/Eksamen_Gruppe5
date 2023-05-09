import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Nav() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <nav>
        <h1>Game Haven</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gameshop">Store</Link>
          </li>
          {user !== null ? (
            <>
              <li>
                <Link to="/my-games">My Games</Link>
              </li>
              <li>
                <Link to="#">Welcome, {user.username}</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
