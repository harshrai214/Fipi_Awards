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
            
            <li><a href="https://www.fipi.org.in/we-represent.php">We Represent</a></li>
            <li><a href="https://www.fipi.org.in/vision.php">Vision</a></li>
            <li><a href="https://www.fipi.org.in/governing-council-members.php">Governing Council Members</a></li>
            <li><a href="https://www.fipi.org.in/governing-council-meetings.php">Governing Council Meeting</a></li>
            <li><a href="https://www.fipi.org.in/leadership-team.php">Leadership Team</a></li>
            <li><a href="https://www.fipi.org.in/contact-us.php">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Access</h4>
          <ul>
            <li><a href="https://www.fipi.org.in/members.php">Members</a></li>
            <li><a href="https://www.fipi.org.in/in-news1.php">FIPI Speaks</a></li>
            <li><a href="https://www.fipi.org.in/awards-page2023.php">Awards 2023</a></li>
            <li><a href="https://www.fipi.org.in/recommendations.php">Recommendations</a></li>
            <li><a href="https://www.fipi.org.in/committees-meetings.php"> Meetings</a></li>
            <li><a href="https://www.fipi.org.in/events.php">Past Events</a></li>
            <li><a href="https://www.fipi.org.in/upcoming-events.php"> Upcoming Events</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <address>
            3rd Floor, PHD House, 4/2,<br /><br/>
            Siri Institutional Area,<br /><br/>
            August Kranti Marg,<br /><br/>
            New Delhi - 110 016
          </address>
          <br/>
          <p><FaEnvelope /> dg.sectt@fipi.org.in</p>
          <br/>
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
          <a href="https://www.fipi.org.in/sitemap.php">Sitemap</a>
          <a href="https://www.fipi.org.in/term-of-use.php">Terms of use</a>
          <a href="https://www.fipi.org.in/privacy-policy.php">Privacy Policy</a>
          <a href="https://www.fipi.org.in/refund-and-cancellation.php">Refund Policy</a>
        </div>
        <p className="copyright">Copyright © {new Date().getFullYear()} FIPI</p>
      </div>
    </footer>
  );
};

export default FooterTabComponent;