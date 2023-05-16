import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { getUserByEmail } from "../utils/sanity/userServices";
import { useNavigate } from "react-router-dom";
import { getUserEmail } from "../helper/userHelper";
import { Link } from "react-router-dom";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  // Funksjon som håndterer innlogging
  const handleLogin = async (e) => {
    e.preventDefault();
    // Henter email fra input feltet
    const email = e.target.email.value;
    // Hjelpemetode som henter bruker e-post fra localStorage
    const loggedInUser = await getUserByEmail(email);
    // Sjekker om bruker er null
    if (loggedInUser === null) {
      console.log("Not logged in");
      // Skriver ut "Invalid email"
      setError("Invalid email");
    } else {
      // prøver å sette email i localStorage
      try {
        localStorage.setItem("email_account", email);
        // Hvis det ikke går
      } catch (error) {
        // Skriver ut feilmelding
        console.error("localStorage error:", error);
      }
      // Setter bruker til å være lik loggedInUser
      setUser(loggedInUser);
      // Navigerer til "/"
      navigate("/");
    }
  };

  useEffect(() => {
    // Hjelpemetode som henter bruker e-post fra localStorage
    const email = getUserEmail();
    // Sjekker om email er definert
    if (email) {
      // Sender bruker til "/"
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <section className="breadcrumb">
        <Link to="/">Home</Link> / <p>Login</p>
      </section>
      <section className="login-section">
        <section className="head">
          <h2>Login</h2>
        </section>
        <section className="login-items-sec">
          {error && <p className="alert alert-danger">{error}</p>}
          <form onSubmit={handleLogin} className="login-form">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" />
            <button type="submit" className="btn btn-outline-dark">
              Log in
            </button>
          </form>
        </section>
      </section>
    </>
  );
}
