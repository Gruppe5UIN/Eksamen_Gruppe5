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
