import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem"><a href="https://abdurleone.com/careers" target="_blank" rel="noopener noreferrer">Careers</a></li>
          <li className="fListItem"><a href="https://greenbeltmovement.org" target="_blank" rel="noopener noreferrer">Sustainability</a></li>
          <li className="fListItem"><a href="https://pexels.com/search/destinations/" target="_blank" rel="noopener noreferrer">Press center</a></li>
          <li className="fListItem"><a href="https://dignited.com/102891/emergency-services-contacts-kenya/" target="_blank" rel="noopener noreferrer">Safety Resource Center</a></li>
        </ul>
      </div>
      <div className="fText">
        Copyright © 2024 Abdurleone Booking.
        <a href="https://drive.google.com/file/d/1RKHn3xAFchIQFjmIPpa3Pa2Wp2x86ta-/view?usp=sharing" target="_blank" rel="noopener noreferrer"> View Terms and Conditions</a>
      </div>
    </div>
  );
};

export default Footer;