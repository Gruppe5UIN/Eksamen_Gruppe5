import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { removeUserEmail } from "../helper/userHelper";
import { Link } from "react-router-dom";

export default function Nav() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <nav>
        <Link to="/" id="headline">
          <h1>Game Haven</h1>
        </Link>
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
                <Link to="/my-favourites">My Favourites</Link>
              </li>
              <li>
                <Link onClick={removeUserEmail} to="/">
                  Logout
                </Link>
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
