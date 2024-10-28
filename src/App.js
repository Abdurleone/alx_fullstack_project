import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";
import List from "./pages/list/List.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main route for the home page */}
        <Route path="/" element={<Home />} />

        {/* Route for the hotel list */}
        <Route path="/hotels" element={<List />} />

        {/* Dynamic route for individual hotel details */}
        <Route path="/hotels/:id" element={<Hotel />} />

        {/* Additional route for "/properties/hotel" if needed */}
        <Route path="/properties/hotel" element={<Hotel />} />

        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for listing hotels by city */}
        <Route path="/city/:cityName" element={<List />} />

        {/* Route for the registration page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
