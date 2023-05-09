import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { getUserByEmail } from "../utils/sanity/userServices";
import { useNavigate } from "react-router-dom";
import { getUserEmail } from "../helper/userHelper";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const loggedInUser = await getUserByEmail(email);
    if (loggedInUser === null) {
      console.log("Not logged in");
      setError("Invalid email");
    } else {
      try {
        localStorage.setItem("email_account", email);
      } catch (error) {
        console.error("localStorage error:", error);
      }
      setUser(loggedInUser);
      navigate("/");
    }
  };

  useEffect(() => {
    const email = getUserEmail();
    if (email) {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <h1>Login</h1>
      { error && <p className="alert alert-danger">{error}</p> }
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}