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
  const [inputError, setInputError] = useState(null); // For input validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Input validation: Check if username and password are provided
    if (!credentials.username || !credentials.password) {
      setInputError("Please fill in both username and password.");
      return;
    }

    setInputError(null); // Clear input validation error if passed

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      console.error("Login error:", err); // Log the error for debugging
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || { message: "Something went wrong. Please try again." },
      });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <form onSubmit={handleClick}> {/* Wrap inputs and button in a form */}
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            value={credentials.username}
            className="lInput"
            aria-label="Username" // Accessibility label
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            value={credentials.password}
            className="lInput"
            aria-label="Password" // Accessibility label
          />
          
          {inputError && <span className="errorMessage">{inputError}</span>} {/* Show input validation error */}
          
          <button disabled={loading} type="submit" className="lButton"> {/* Change to type "submit" */}
            {loading ? "Logging in..." : "Login"} {/* Show loading message */}
          </button>
          
          {error && <span className="errorMessage">{error.message}</span>} {/* Show server error message */}
        </form>
      </div>
    </div>
  );
};

export default Login;
