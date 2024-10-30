import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured.jsx";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Header from "../../components/header/Header.jsx";
import MailList from "../../components/mailList/MailList.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import PropertyList from "../../components/propertyList/PropertyList.jsx";
import "./home.css";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "loginSuccess") {
      setMessage("You have successfully logged in.");
    } else if (params.get("status") === "logoutSuccess") {
      setMessage("You have successfully logged out.");
    }

    // Clear message after 3 seconds
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      
      {/* Display login/logout message if present */}
      {message && <div className="statusMessage">{message}</div>}
      
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;