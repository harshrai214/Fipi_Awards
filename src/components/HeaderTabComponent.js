
// import React from "react";
// import fipiLogo from "../assets/images/fipi-logo-white.png";
// import IEWLogo from "../assets/images/IEW_logo.png";
// import historyBg from '../assets/images/history.jpg'; 
// import { FaSearch, FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
// import "../styles/HeaderTabComponent.css";
// import Header from './Header';
// import Navigation from './Navigation';
// import { useEffect } from "react";

// const HeaderTabComponent = ({ user, onLogout, isLoggedIn, onLoginClick, onRegisterClick, onLogin, onRegister, userRole }) => {


//   useEffect(() => {
//     const handleDropdowns = () => {
//       document.querySelectorAll('.dropdown, .sub-dropdown').forEach(item => {
//         item.addEventListener('click', (e) => {
//           e.stopPropagation();
//           item.classList.toggle('open');
//         });
//       });
//       document.addEventListener('click', () => {
//         document.querySelectorAll('.dropdown, .sub-dropdown').forEach(item => {
//           item.classList.remove('open');
//         });
//       });
//     };
//     handleDropdowns();
//     return () => {
//       document.removeEventListener('click', handleDropdowns);
//     };
//   }, []);

//   return (
//     <div className="header-tab-wrapper">
//       {/* Top Bar with Contact and Social Icons */}
//       <div className="header-contact-bar">
//         <div className="header-contact-left">
//           <FaEnvelope className="icon" />
//           <span>dg.sectt@fipi.org.in</span>
//         </div>
//         <div className="middel"></div>
//         <div className="header-contact-right">
//           <FaSearch className="icon" />
//           <FaTwitter className="icon" />
//           <FaFacebookF className="icon" />
//           <FaLinkedinIn className="icon" />
//           <FaYoutube className="icon" />
//           {user && (
//             <button
//               className="logout-btn"
//               style={{ marginLeft: 12, background: "#e53935", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
//               onClick={onLogout}
//               title="Logout"
//             >
//               <FaSignOutAlt /> Logout
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Background Image Section */}
      
//         <div className="header-tab-overlay">

//           <div className="header-tab-top">

//             <div className="logo-section">
//               <img src={fipiLogo} alt="FIPI Logo" className="logo-img" />
//             </div>
//             <nav className="main-navigation">
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">About Us</a>
//                 <div className="dropdown-menu">
//                   <a href="https://www.fipi.org.in/history.php">History</a>
//                   <a href="/about/leadership">Leadership</a>
//                   <a href="/about/vision-mission">Vision & Mission</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Membership</a>
//                 <div className="dropdown-menu">
//                   <a href="https://www.fipi.org.in/members.php">Members</a>
//                   <a href="/members/corporate">Corporate Member</a>
//                   <a href="/members/partners">Partners</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Media</a>
//                 <div className="dropdown-menu">
//                   <a href="https://www.fipi.org.in/in-news1.php">FIPI Speaks</a>
//                   <div className="sub-dropdown">
//                     <a href="#" className="dropdown-toggle">Publication</a>
//                     <div className="dropdown-submenu">
//                       <a href="/media/publication/journal">Journal</a>
//                       <a href="/media/publication/bcda">Bcda</a>
//                     </div>
//                   </div>
//                   <a href="/media/videos">Videos</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Awards</a>
//                 <div className="dropdown-menu">
//                   <a href="https://www.fipi.org.in/awards-page2023.php">Awards 2023</a>
//                   <a href="/awards/special">Special Recognitions</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Recommendations</a>
//                 <div className="dropdown-menu">
//                   <div className="sub-dropdown">
//                     <a href="https://www.fipi.org.in/recommendations.php" className="dropdown-toggle">Recommendations</a>
//                     <div className="dropdown-submenu">
//                       <div className="sub-dropdown">
//                         <a href="#" className="dropdown-toggle">Finance & Taxation</a>
//                         <div className="dropdown-submenu">
//                           <a href="/recommendations/finance/gst">GST</a>
//                         </div>
//                       </div>
//                       <a href="/recommendations/upstream">Upstream</a>
//                       <a href="/recommendations/downstream">Downstream</a>
//                       <a href="/recommendations/gas">Natural Gas</a>
//                     </div>
//                   </div>
//                   <a href="/recommendations/research">Reports</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Committees</a>
//                 <div className="dropdown-menu">
//                   <a href="/committees/downstream">Committees</a>
//                   <a href="/committees/upstream">Meetings</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Events</a>
//                 <div className="dropdown-menu">
//                   <a href="/events/past">Past Events</a>
//                   <a href="/events/upcoming">Upcoming Events</a>
//                   <a href="/events/energy-week">India Energy Week</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//               <a href="/cgd-helpdesk" className="dropdown-toggle">CGD Help Desk</a>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">FIPI Awards</a>
//                 <div className="dropdown-menu">
//                   <a href="/events/energy-week">India Energy Week</a>
//                   <a href="/events/upcoming">Upcoming Events</a>
//                   <a href="/events/past">Past Events</a>
//                 </div>
//               </div>
//             <div className="logo-section">
//               <a href="https://www.indiaenergyweek.com/event/2026/_home"><img src={IEWLogo} alt="IEW Logo" className="logo-img" onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} /></a>
//             </div>
//             </nav>
//             <div className="headerlast"></div>
//           </div>

//           {/* Include Header and Navigation components */}
         
//           {/* <Navigation
//             isLoggedIn={isLoggedIn}
//             userRole={userRole}
//             onLogin={onLogin}
//             onLogout={onLogout}
//             onLoginClick={onLoginClick}
//             onRegister={onRegister}
//             onRegisterClick={onRegisterClick}
//           /> */}
//                                 <div
//         className="header-tab-background"
//         style={{ backgroundImage: `url(${historyBg})` }}
//       >

//           <div className="header-tab-content">
//               <h1></h1>
//                <h1>Welcome </h1>
//                  <h1> to</h1>
//             <h1>FIPI Awards 2025</h1>
//           </div>
//         </div>
//       </div>

      
//     </div>
//   );
// };

// export default HeaderTabComponent;



// import React, { useEffect, useState } from "react";
// import fipiLogo from "../assets/images/fipi-logo-white.png";
// import IEWLogo from "../assets/images/IEW_logo.png";
// import historyBg from '../assets/images/history.jpg'; 
// import { FaSearch, FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
// import "../styles/HeaderTabComponent.css";
// import Header from './Header';
// import Navigation from './Navigation';


// const HeaderTabComponent = ({ user, onLogout, isLoggedIn, onLoginClick, onRegisterClick, onLogin, onRegister, userRole }) => {
// const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleDropdowns = () => {
//       document.querySelectorAll('.dropdown, .sub-dropdown').forEach(item => {
//         item.addEventListener('click', (e) => {
//           e.stopPropagation();
//           item.classList.toggle('open');
//         });
//       });
//       document.addEventListener('click', () => {
//         document.querySelectorAll('.dropdown, .sub-dropdown').forEach(item => {
//           item.classList.remove('open');
//         });
//       });
//     };
//     handleDropdowns();
//     return () => {
//       document.removeEventListener('click', handleDropdowns);
//     };
//   }, []);

//   return (
//     <div className="header-tab-wrapper">
    
//       <div className="header-contact-bar">
//         <div className="header-contact-left">
//           <FaEnvelope className="icon" />
//           <span>dg.sectt@fipi.org.in</span>
//         </div>
//         <div className="middel"></div>
//         <div className="header-contact-right">
//           <FaSearch className="icon" />
//           <FaTwitter className="icon" />
//           <FaFacebookF className="icon" />
//           <FaLinkedinIn className="icon" />
//           <FaYoutube className="icon" />
//           {user && (
//             <button
//               className="logout-btn"
//               style={{ marginLeft: 12, background: "#e53935", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
//               onClick={onLogout}
//               title="Logout"
//             >
//               <FaSignOutAlt /> Logout
//             </button>
//           )}
//         </div>
//       </div>
      
//         <div className="header-tab-overlay">

//           <div className="header-tab-top">

//             <div className="logo-section">
//               <img src={fipiLogo} alt="FIPI Logo" className="logo-img" />
//             </div>
//             <nav className={`main-navigation ${menuOpen ? "open" : ""}`}>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">About Us</a>
//                 <div className="dropdown-menu">
//                   <a href="https://fipi.org.in/history.php">History</a>
//                   <div className="sub-dropdown">
//                     <a href="#" className="dropdown-toggle">Governing Council</a>
//                     <div className="dropdown-submenu">
//                       <a href="https://fipi.org.in/governing-council-members.php">Members</a>
//                       <a href="https://fipi.org.in/governing-council-meetings.php">Meetings</a>
//                     </div>
//                   </div>
//                   <a href="https://fipi.org.in/leadership-team.php">Leadership Team</a>
//                   <a href="https://fipi.org.in/vision.php">Vision</a>
//                   <a href="https://fipi.org.in/we-represent.php">We Represent</a>
//                   <a href="https://fipi.org.in/contact-us.php">Contact Us</a>
//                   <div className="sub-dropdown">
//                     <a href="#" className="dropdown-toggle">Anual Report</a>
//                     <div className="dropdown-submenu">
//                       <a href="https://fipi.org.in/assets/pdf/Annual_Report2023-24.pdf">Anual Report 2023-2024</a>
//                       <a href="https://fipi.org.in/assets/pdf/Annual_Report2022-23.pdf">Anual Report 2022-2023</a>
//                       <a href="https://fipi.org.in/assets/pdf/Annual_Report2021-22.pdf">Anual Report 2021-2022</a>
//                       <a href="https://fipi.org.in/assets/pdf/Annual_Report2020-21.pdf">Anual Report 2020-2021</a>
//                       <a href="https://fipi.org.in/assets/pdf/Annual_Report2019-20.pdf">Anual Report 2019-2020</a>
//                       <a href="https://fipi.org.in/assets/pdf/Annual_Report2018-19.pdf">Anual Report 2018-2019</a>
//                       <a href="https://fipi.org.in/assets/pdf/Annual_Report2017-18.pdf">Anual Report 2017-2018</a>
//                       <a href="https://fipi.org.in/assets/pdf/Annual_Report2016-17.pdf">Anual Report 2016-2019</a>

//                     </div>
//                   </div>
                  

//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Membership</a>
//                 <div className="dropdown-menu">
//                   <a href="https://www.fipi.org.in/members.php">Members</a>
//                   <a href="https://fipi.org.in/who-can-become.php">Who can Become Member?</a>
//                   <a href="https://fipi.org.in/Benefits.php">Benifits</a>
//                   <a href="https://fipi.org.in/member-form.php">Membership Form</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Media</a>
//                 <div className="dropdown-menu">
//                   <a href="https://fipi.org.in/in-news1.php">FIPI Speaks</a>
//                   <div className="sub-dropdown">
//                     <a href="#" className="dropdown-toggle">Publication</a>
//                     <div className="dropdown-submenu">
//                       <a href="https://fipi.org.in/fipi-journal.php">Journal</a>
//                       <a href="https://fipi.org.in/policy-economic.php">Policy & Economic Report</a>
//                     </div>
//                   </div>
//                   <a href="https://fipi.org.in/video-gallery.php">Videos Gallery</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Awards</a>
//                 <div className="dropdown-menu">
//                   <a href="https://www.fipi.org.in/awards-page2023.php">Awards 2023</a>
//                   <a href="/awards/special">Special Recognitions</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Recommendations</a>
//                 <div className="dropdown-menu">
//                   <div className="sub-dropdown">
//                     <a href="https://www.fipi.org.in/recommendations.php" className="dropdown-toggle">Recommendations</a>
//                     <div className="dropdown-submenu">
//                       <div className="sub-dropdown">
//                         <a href="#" className="dropdown-toggle">Finance & Taxation</a>
//                         <div className="dropdown-submenu">
//                           <a href="/recommendations/finance/gst">GST</a>
//                         </div>
//                       </div>
//                       <a href="/recommendations/upstream">Upstream</a>
//                       <a href="/recommendations/downstream">Downstream</a>
//                       <a href="/recommendations/gas">Natural Gas</a>
//                     </div>
//                   </div>

//                   <div className="sub-dropdown">
//                     <a href="#" className="dropdown-toggle">Reports</a>
//                     <div className="dropdown-submenu">
//                       <a href="https://fipi.org.in/upstream.php">Upstream</a>
//                       <a href="https://fipi.org.in/downstream-report.php">Downstream</a>
//                       <a href="https://fipi.org.in/downstream-report.php">Natural Gas</a>
//                       <a href="https://fipi.org.in/downstream-report.php">Economic Policy</a>
//                       <a href="https://fipi.org.in/downstream-report.php">Finance and Taxation</a>
//                       <a href="https://fipi.org.in/downstream-report.php">Downstream</a>
//                       <a href="https://fipi.org.in/downstream-report.php">Downstream</a>
//                     </div>
//                   </div>

//                   {/* <a href="/recommendations/research">Reports</a> */}
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Committees</a>
//                 <div className="dropdown-menu">
//                   <a href="/committees/downstream">Committees</a>
//                   <a href="https://fipi.org.in/committees-meetings.php">Meetings</a>
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">Events</a>
//                 <div className="dropdown-menu">
//                   <a href="https://fipi.org.in/events.php">Past Events</a>
//                   <a href="https://fipi.org.in/upcoming-events.php">Upcoming Events</a>
//                   {/* <a href="/events/energy-week">India Energy Week</a> */}
//                 </div>
//               </div>
//               <div className="nav-item dropdown">
//               <a href="/cgd-helpdesk" className="dropdown-toggle">CGD Help Desk</a>
//               </div>
//               <div className="nav-item dropdown">
//                 <a href="#" className="dropdown-toggle">FIPI Awards</a>
//                 <div className="dropdown-menu">
//                   <a href="/events/energy-week">India Energy Week</a>
//                   <a href="/events/upcoming">Upcoming Events</a>
//                   <a href="/events/past">Past Events</a>
//                 </div>
//               </div>
//             <div className="logo-section">
//               <a href="https://www.indiaenergyweek.com/event/2026/_home"><img src={IEWLogo} alt="IEW Logo" className="logo-img" onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} /></a>
//             </div>
//             </nav>
//             <div className="headerlast"></div>
//           </div>

//           {/* Include Header and Navigation components */}
         
//           {/* <Navigation
//             isLoggedIn={isLoggedIn}
//             userRole={userRole}
//             onLogin={onLogin}
//             onLogout={onLogout}
//             onLoginClick={onLoginClick}
//             onRegister={onRegister}
//             onRegisterClick={onRegisterClick}
//           /> */}
//                                 <div
//         className="header-tab-background"
//         style={{ backgroundImage: `url(${historyBg})` }}
//       >

// <button
//   className="hamburger"
//   onClick={() => setMenuOpen(!menuOpen)}
// >
//   ☰
// </button>
//           <div className="header-tab-content">
//               <h1></h1>
//                <h1>Welcome </h1>
//                  <h1> to</h1>
//             <h1>FIPI Awards 2025</h1>
//           </div>
//         </div>
//       </div>

      
//     </div>
//   );
// };

// export default HeaderTabComponent;

// import  { useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaSearch, FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube, FaSignOutAlt } from 'react-icons/fa';
import fipiLogo from '../assets/images/fipi-logo-white.png'; // Assuming this is the existing import, adjust if needed
import IEWLogo from '../assets/images/IEW_logo.png'; // Assuming this is the existing import, adjust if needed
import historyBgDesktop from '../assets/images/history.jpg';
import historyBgLaptop from '../assets/images/history.jpg';
import { Search, Menu, X } from 'lucide-react';
import historyBgMobile from '../assets/images/history3.jpg';
import "../styles/HeaderTabComponent.css"

const HeaderTabComponent = ({ user, onLogout, isLoggedIn, onLoginClick, onRegisterClick, onLogin, onRegister, userRole }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgImage, setBgImage] = useState('');
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const updateBackgroundImage = () => {
    if (window.innerWidth >= 1024) {
      setBgImage(historyBgDesktop);
    } else if (window.innerWidth >= 768) {
      setBgImage(historyBgLaptop);
    } else {
      setBgImage(historyBgMobile);
    }
  };

  useEffect(() => {
    updateBackgroundImage();
    window.addEventListener('resize', updateBackgroundImage);
    return () => window.removeEventListener('resize', updateBackgroundImage);
  }, []);

  useEffect(() => {
    const handleDropdowns = () => {
      document.querySelectorAll('.dropdown, .sub-dropdown').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          item.classList.toggle('open');
        });
      });
      document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown, .sub-dropdown').forEach(item => {
          item.classList.remove('open');
        });
      });
    };
    handleDropdowns();
    return () => {
      document.removeEventListener('click', handleDropdowns);
    };
  }, []);

  return (
    <div className="header-tab-wrapper">
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
              style={{
                marginLeft: 12,
                background: "#e53935",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
              onClick={onLogout}
              title="Logout"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>
      <div className="header-tab-overlay">
        <div className="header-tab-top">
          <div className="logo-section">
            <img src={fipiLogo} alt="FIPI Logo" className="logo-img" />
          </div>
          <nav className={`main-navigation ${menuOpen ? "open" : ""}`}>
            <div className="nav-item dropdown">
              <a href="#" className="dropdown-toggle">About Us</a>
              <div className="dropdown-menu">
                <a href="https://fipi.org.in/history.php">History</a>
                <div className="sub-dropdown">
                  <a href="#" className="dropdown-toggle">Governing Council</a>
                  <div className="dropdown-submenu">
                    <a href="https://fipi.org.in/governing-council-members.php">Members</a>
                    <a href="https://fipi.org.in/governing-council-meetings.php">Meetings</a>
                  </div>
                </div>
                <a href="https://fipi.org.in/leadership-team.php">Leadership Team</a>
                <a href="https://fipi.org.in/vision.php">Vision</a>
                <a href="https://fipi.org.in/we-represent.php">We Represent</a>
                <a href="https://fipi.org.in/contact-us.php">Contact Us</a>
                <div className="sub-dropdown">
                  <a href="#" className="dropdown-toggle">Anual Report</a>
                  <div className="dropdown-submenu">
                    <a href="https://fipi.org.in/assets/pdf/Annual_Report2023-24.pdf">Anual Report 2023-2024</a>
                    <a href="https://fipi.org.in/assets/pdf/Annual_Report2022-23.pdf">Anual Report 2022-2023</a>
                    <a href="https://fipi.org.in/assets/pdf/Annual_Report2021-22.pdf">Anual Report 2021-2022</a>
                    <a href="https://fipi.org.in/assets/pdf/Annual_Report2020-21.pdf">Anual Report 2020-2021</a>
                    <a href="https://fipi.org.in/assets/pdf/Annual_Report2019-20.pdf">Anual Report 2019-2020</a>
                    <a href="https://fipi.org.in/assets/pdf/Annual_Report2018-19.pdf">Anual Report 2018-2019</a>
                    <a href="https://fipi.org.in/assets/pdf/Annual_Report2017-18.pdf">Anual Report 2017-2018</a>
                    <a href="https://fipi.org.in/assets/pdf/Annual_Report2016-17.pdf">Anual Report 2016-2019</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="dropdown-toggle">Membership</a>
              <div className="dropdown-menu">
                <a href="https://www.fipi.org.in/members.php">Members</a>
                <a href="https://fipi.org.in/who-can-become.php">Who can Become Member?</a>
                <a href="https://fipi.org.in/Benefits.php">Benifits</a>
                <a href="https://fipi.org.in/member-form.php">Membership Form</a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="dropdown-toggle">Media</a>
              <div className="dropdown-menu">
                <a href="https://fipi.org.in/in-news1.php">FIPI Speaks</a>
                <div className="sub-dropdown">
                  <a href="#" className="dropdown-toggle">Publication</a>
                  <div className="dropdown-submenu">
                    <a href="https://fipi.org.in/fipi-journal.php">Journal</a>
                    <a href="https://fipi.org.in/policy-economic.php">Policy & Economic Report</a>
                  </div>
                </div>
                <a href="https://fipi.org.in/video-gallery.php">Videos Gallery</a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="dropdown-toggle">Awards</a>
              <div className="dropdown-menu">
                
                {/* <a href="https://www.fipi.org.in/awards-page2023.php">Awards 2025</a> */}
                <a href="https://www.award.fipi.org.in/fipiawards">Awards 2025 </a>
               <div className="sub-dropdown">
                <a href="#" className="dropdown-toggle">Previous Awards</a>
                 <div className="dropdown-submenu">
                    <a href="./https://fipi.org.in/awards-page2023.php">Awards 2023 </a>
                    <a href="./https://fipi.org.in/awards-page2022.php">Awards 2022 </a>
                    <a href="./https://fipi.org.in/awards-page2021.php">Awards 2021 </a>
                    <a href="./https://fipi.org.in/awards-2020.php">Awards 2020 </a>
                    <a href="./https://fipi.org.in/awards-2019.php">Awards 2019</a>
                    <a href=".https://fipi.org.in//awards-2017.php">Awards 2017</a>
                    <a href="https://fipi.org.in/awards-2016.php">Awards 2016</a>
                    <a href="https://fipi.org.in/awards-2015.php">Awards 2015</a>
                    <a href="https://fipi.org.in/awards-2014.php">Awards 2014</a>
                    <a href="https://fipi.org.in/awards-2013.php">Awards 2013</a>
                    <a href="https://fipi.org.in/awards-2012.php">Awards 2012</a>
                    <a href="https://fipi.org.in//awards-2011.php">Awards 2011</a>
                    <a href="https://fipi.org.in//awards-2009-2010.php">Awards 2009 & 2010</a>
                    <a href="https://fipi.org.in/awards-2008.php">Awards 2008</a>
                    <a href="https://fipi.org.in//awards-2007.php">Awards 2007</a>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="dropdown-toggle">Recommendations</a>
              <div className="dropdown-menu">
                <div className="sub-dropdown">
                  {/* <a href="https://www.fipi.org.in/recommendations.php" className="dropdown-toggle">Recommendations</a> */}
                  <a href="./recommendations.php">Recommendations</a>
                  <div className="dropdown-submenu">
                    <div className="sub-dropdown">
                      <a href="./recomm-finance.php">Finance and Taxation</a>
                      <div className="dropdown-submenu">
                        <a href="./recomm-financegst.php">GST</a>
                      </div>
                    </div>
                    <a href="./recomm-upstream.php">Upstream</a>
                    <a href="./recomm-downstream.php">Downstream</a>
                    <a href="/recommendations/gas">Natural Gas</a>
                  </div>
                </div>
                <div className="sub-dropdown">
                  <a href="#">Reports</a>
                  <div className="dropdown-submenu">
                    <a href="https://fipi.org.in/upstream.php">Upstream</a>
                    <a href="https://fipi.org.in/downstream-report.php">Downstream</a>
                    <a href="https://fipi.org.in/downstream-report.php">Natural Gas</a>
                    <a href="https://fipi.org.in/downstream-report.php">Economic Policy</a>
                    <a href="https://fipi.org.in/downstream-report.php">Finance and Taxation</a>
                    <a href="https://fipi.org.in/sustanability-report.php">Sustainability &amp; Environment</a>
                   
                    <a href="https://fipi.org.in/pre-budget-memorandam.php">Pre-Budget Memorandom</a>

                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="dropdown-toggle">Committees</a>
              <div className="dropdown-menu">
                <div className="sub-dropdown">
                <a href="https://fipi.org.in/committees/downstream">Committees</a>
                <div className="dropdown-submenu">
                <a href="https://fipi.org.in/budget-and-investment.php">Budget and Investment</a>
                <a href="https://fipi.org.in/tariff-duties-taxes.php">Tariff, Duties &amp; Taxes</a>
                <a href="https://fipi.org.in/lpg-marketing.php">LPG Marketing</a>
                <a href="https://fipi.org.in/safety-health-environment.php">Safety, Health &amp; Environment</a>
                <a href="https://fipi.org.in/natural-gas-cng-lng.php">Natural Gas / CNG / LNG</a>
                <a href="https://fipi.org.in/alternative-sources-of-energy.php">Alternative Sources of Energy</a>
                <a href="https://fipi.org.in//refiner-s-forum.php">Refiner's Forum</a>
                <a href="https://fipi.org.in//upstream-operations.php">Upstream Operations</a>
                <a href="https://fipi.org.in/downstream-marketing.php">Downstream Marketing</a>
                <a href="https://fipi.org.in/pipeliner-s-forum.php">Pipeliner's Forum</a>
                <a href="https://fipi.org.in/it-cyber-security.php">IT &amp; Cyber Security</a>
                <a href="https://fipi.org.in//cbm-shale-gas-gas-hydrates.php">CBM/ Shale Oil/ Gas Hydrates</a>
                <a href="https://fipi.org.in//petrochenicals-committee.php">Petrochemcials Committee</a>
                <a href="https://fipi.org.in/cgd.php">City Gas Distribution (CGD) </a>
                </div>
                <a href="https://fipi.org.in/committees-meetings.php">Meetings</a>
                
              </div>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="dropdown-toggle">Events</a>
              <div className="dropdown-menu">
                <a href="https://fipi.org.in/events.php">Past Events</a>
                <a href="https://fipi.org.in/upcoming-events.php">Upcoming Events</a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="/cgd-helpdesk" className="dropdown-toggle">CGD Help Desk</a>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="dropdown-toggle">FIPI Awards</a>
              <div className="dropdown-menu">
                <a href="https://fipi.org.in/events/energy-week">India Energy Week</a>
                <a href="https://fipi.org.in/events/upcoming">Upcoming Events</a>
                <a href="https://fipi.org.in/events/past">Past Events</a>
              </div>
            </div>
            <div className="logo-section">
              <a href="https://www.indiaenergyweek.com/event/2026/_home">
                <img
                  src={IEWLogo}
                  alt="IEW Logo"
                  className="logo-img"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                />
              </a>
            </div>
          </nav>
          <div className="headerlast">
            {/* <button className="hamburger" >
              ☰
            </button> */}
            <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        style={{color:"white"}}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
          </div>
        </div>
        <div className="header-tab-background" style={{ backgroundImage: `url(${bgImage})` }}>
          {/* <div className="header-tab-content">
            <h1>Welcome</h1>
            <h1>to</h1>
            <h1>FIPI Awards 2025</h1>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeaderTabComponent;


