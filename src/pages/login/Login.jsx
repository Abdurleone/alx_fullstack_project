import axios from "axios";
import { useContext, useState } from "react";
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setInputError("Please fill in both username and password.");
      return;
    }

    setInputError(null);

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
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
          
          {inputError && <span className="errorMessage">{inputError}</span>}
          
          <button 
            disabled={loading} // This should control whether the button is clickable
            type="submit" // Ensure this is set correctly
            className="lButton"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
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
