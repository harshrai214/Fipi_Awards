import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";
import "../styles/FooterTabComponent.css";

const FooterTabComponent = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-top">
        <div className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li><a href="https://www.fipi.org.in/history.php">History</a></li>
            <li>We Represent</li>
            <li>Vision</li>
            <li>Governing Council Members</li>
            <li>Governing Council Meeting</li>
            <li>Leadership Team</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Access</h4>
          <ul>
            <li>Members</li>
            <li>FIPI Speaks</li>
            <li>Awards 2023</li>
            <li>Recommendations</li>
            <li>Meetings</li>
            <li>Past Events</li>
            <li>Upcoming Events</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <address>
            3rd Floor, PHD House, 4/2,<br />
            Siri Institutional Area,<br />
            August Kranti Marg,<br />
            New Delhi - 110 016
          </address>
          <p><FaEnvelope /> dg.sectt@fipi.org.in</p>
          <p><FaPhone /> +91-11-40886000</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <FaTwitter />
            <FaFacebookF />
            <FaYoutube />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-links">
          <a href="/sitemap">Sitemap</a>
          <a href="/terms-of-use">Terms of use</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/refund-policy">Refund Policy</a>
        </div>
        <p className="copyright">Copyright © {new Date().getFullYear()} FIPI</p>
      </div>
    </footer>
  );
};

export default FooterTabComponent;