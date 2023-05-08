import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { getUserByEmail } from "../utils/sanity/gameServices";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
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

  return (
    <>
      <h1>Login</h1>
      {error && 
      <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}