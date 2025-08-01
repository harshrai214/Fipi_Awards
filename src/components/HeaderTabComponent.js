
import React from "react";
import fipiLogo from "../assets/images/fipi-logo-white.png";
import IEWLogo from "../assets/images/IEW_logo.png";
import historyBg from '../assets/images/history.jpg'; 
import { FaSearch, FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import "../styles/HeaderTabComponent.css";
import Header from './Header';
import Navigation from './Navigation';

const HeaderTabComponent = ({ user, onLogout, isLoggedIn, onLoginClick, onRegisterClick, onLogin, onRegister, userRole }) => {
  return (
    <div className="header-tab-wrapper">
      {/* Top Bar with Contact and Social Icons */}
      <div className="header-contact-bar">
        <div className="header-contact-left">
          <FaEnvelope className="icon" />
          <span>dg.sectt@fipi.org.in</span>
        </div>
        <div className="middel"></div>
        <div className="header-contact-right">
          <FaSearch className="icon" />
          <FaTwitter className="icon" />
          <FaFacebookF className="icon" />
          <FaLinkedinIn className="icon" />
          <FaYoutube className="icon" />
          {user && (
            <button
              className="logout-btn"
              style={{ marginLeft: 12, background: "#e53935", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              onClick={onLogout}
              title="Logout"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>

      {/* Background Image Section */}
      
        <div className="header-tab-overlay">

          <div className="header-tab-top">

            <div className="logo-section">
              <img src={fipiLogo} alt="FIPI Logo" className="logo-img" />
            </div>
            <nav className="main-navigation">
              <div className="nav-item dropdown">
                <a href="#" className="dropdown-toggle">About Us</a>
                <div className="dropdown-menu">
                  <a href="https://www.fipi.org.in/history.php">History</a>
                  <a href="/about/leadership">Leadership</a>
                  <a href="/about/vision-mission">Vision & Mission</a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="dropdown-toggle">Membership</a>
                <div className="dropdown-menu">
                  <a href="https://www.fipi.org.in/members.php">Members</a>
                  <a href="/members/corporate">Corporate Member</a>
                  <a href="/members/partners">Partners</a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="dropdown-toggle">Media</a>
                <div className="dropdown-menu">
                  <a href="https://www.fipi.org.in/in-news1.php">FIPI Speaks</a>
                  <div className="sub-dropdown">
                    <a href="#" className="dropdown-toggle">Publication</a>
                    <div className="dropdown-submenu">
                      <a href="/media/publication/journal">Journal</a>
                      <a href="/media/publication/bcda">Bcda</a>
                    </div>
                  </div>
                  <a href="/media/videos">Videos</a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="dropdown-toggle">Awards</a>
                <div className="dropdown-menu">
                  <a href="https://www.fipi.org.in/awards-page2023.php">Awards 2023</a>
                  <a href="/awards/special">Special Recognitions</a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="dropdown-toggle">Recommendations</a>
                <div className="dropdown-menu">
                  <div className="sub-dropdown">
                    <a href="https://www.fipi.org.in/recommendations.php" className="dropdown-toggle">Recommendations</a>
                    <div className="dropdown-submenu">
                      <div className="sub-dropdown">
                        <a href="#" className="dropdown-toggle">Finance & Taxation</a>
                        <div className="dropdown-submenu">
                          <a href="/recommendations/finance/gst">GST</a>
                        </div>
                      </div>
                      <a href="/recommendations/upstream">Upstream</a>
                      <a href="/recommendations/downstream">Downstream</a>
                      <a href="/recommendations/gas">Natural Gas</a>
                    </div>
                  </div>
                  <a href="/recommendations/research">Reports</a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="dropdown-toggle">Committees</a>
                <div className="dropdown-menu">
                  <a href="/committees/downstream">Committees</a>
                  <a href="/committees/upstream">Meetings</a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="dropdown-toggle">Events</a>
                <div className="dropdown-menu">
                  <a href="/events/past">Past Events</a>
                  <a href="/events/upcoming">Upcoming Events</a>
                  <a href="/events/energy-week">India Energy Week</a>
                </div>
              </div>
              <div className="nav-item dropdown">
              <a href="/cgd-helpdesk" className="dropdown-toggle">CGD Help Desk</a>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="dropdown-toggle">FIPI Awards</a>
                <div className="dropdown-menu">
                  <a href="/events/energy-week">India Energy Week</a>
                  <a href="/events/upcoming">Upcoming Events</a>
                  <a href="/events/past">Past Events</a>
                </div>
              </div>
            <div className="logo-section">
              <a href="https://www.indiaenergyweek.com/event/2026/_home"><img src={IEWLogo} alt="IEW Logo" className="logo-img" onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} /></a>
            </div>
            </nav>
            <div className="headerlast"></div>
          </div>

          {/* Include Header and Navigation components */}
         
          {/* <Navigation
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            onLogin={onLogin}
            onLogout={onLogout}
            onLoginClick={onLoginClick}
            onRegister={onRegister}
            onRegisterClick={onRegisterClick}
          /> */}
                                <div
        className="header-tab-background"
        style={{ backgroundImage: `url(${historyBg})` }}
      >

          <div className="header-tab-content">
              <h1></h1>
               <h1>Welcome </h1>
                 <h1> to</h1>
            <h1>FIPI Awards 2025</h1>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default HeaderTabComponent;




