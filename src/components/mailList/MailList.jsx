import { useState } from "react";
import "./mailList.css";

const MailList = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail(""); // Clear email field after subscribing
    }
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input
          type="text"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {isSubscribed && (
        <div className="successMessage">
          <p>Thank you for subscribing! Check your inbox for the best deals.</p>
        </div>
      )}
    </div>
  );
};

export default MailList;