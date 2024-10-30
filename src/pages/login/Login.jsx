import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const [inputError, setInputError] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(false); // State for logout message
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logout message query param (if redirecting from logout)
    const params = new URLSearchParams(window.location.search);
    if (params.get("logout") === "true") {
      setLogoutMessage(true);
      setTimeout(() => setLogoutMessage(false), 3000); // Clear message after 3 seconds
    }
  }, []);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!credentials.username || !credentials.password) {
      setInputError("Please fill in both username and password.");
      return;
    }

    setInputError(null); // Clear any previous input error

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/"); // Redirect to home after successful login
    } catch (err) {
      console.error("Login error:", err);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || { message: "Something went wrong. Please try again." },
      });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h2 className="lTitle">Welcome Back!</h2>
        
        {/* Display logout message if user has logged out */}
        {logoutMessage && (
          <div className="logoutMessage">You have successfully logged out.</div>
        )}

        <form onSubmit={handleClick}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            value={credentials.username}
            className="lInput"
            aria-label="Username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            value={credentials.password}
            className="lInput"
            aria-label="Password"
            required
          />

          {/* Display input error message if any */}
          {inputError && <span className="errorMessage">{inputError}</span>}

          <button 
            disabled={loading}
            type="submit"
            className="lButton"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Display error message from login response */}
          {error && <span className="errorMessage">{error.message}</span>} 

          <div className="loginFooter">
            <span>Don't have an account? <a href="/register">Register</a></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
