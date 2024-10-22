import Featured from "../../components/featured/Featured.jsx";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Header from "../../components/header/Header.jsx";
import MailList from "../../components/mailList/MailList.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import PropertyList from "../../components/propertyList/PropertyList.jsx";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
