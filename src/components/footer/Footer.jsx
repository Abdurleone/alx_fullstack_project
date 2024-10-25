import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem"><a href="https://example.com/customer-service" target="_blank" rel="noopener noreferrer">Customer Service</a></li>
          <li className="fListItem"><a href="https://example.com/partner-help" target="_blank" rel="noopener noreferrer">Partner Help</a></li>
          <li className="fListItem"><a href="https://abdurleone.com/careers" target="_blank" rel="noopener noreferrer">Careers</a></li>
          <li className="fListItem"><a href="https://example.com/sustainability" target="_blank" rel="noopener noreferrer">Sustainability</a></li>
          <li className="fListItem"><a href="https://example.com/press-center" target="_blank" rel="noopener noreferrer">Press center</a></li>
          <li className="fListItem"><a href="https://example.com/safety-resources" target="_blank" rel="noopener noreferrer">Safety Resource Center</a></li>
        </ul>
      </div>
      <div className="fText">
        Copyright © 2024 Abdurleone Booking.
        <a href="https://example.com/terms-and-conditions.pdf" target="_blank" rel="noopener noreferrer"> View Terms and Conditions</a>
      </div>
    </div>
  );
};

export default Footer;