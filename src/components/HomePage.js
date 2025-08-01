import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import '../styles/HomePage.css';
import Sidebar from './Sidebar';
import Header from './Header';
import RegisterModal from './RegisterModal';
import { useLocation } from 'react-router-dom';

// Fallback image URL if history.jpg is missing
const historyBg = "https://via.placeholder.com/600x400"; // Placeholder image

const HomePage = ({ user, isLoggedIn,onLogout, onLoginClick, onRegisterClick, onLogin, onRegister,userRole }) => {
  const [filters, setFilters] = useState({
    year: 'All Years',
    category: 'All Categories',
    status: 'All Statuses',
  });
  const [selectedAward, setSelectedAward] = useState(null);
  const [showAllAwards, setShowAllAwards] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [IsLoggedIn, setIsLoggedIn] = useState(false);
  // const [UserRole, setUserRole] = useState('user');
  const navigate = useNavigate();

const location = useLocation();

// const handleLogin = (role) => {
//     setIsLoggedIn(true);
//     setUserRole(role);
//   };



  const clearFilters = () => {
    setFilters({
      year: 'All Years',
      category: 'All Categories',
      status: 'All Statuses',
    });
  };

  // const awards = [
  //   {
  //     title: 'Exploration Company of the Year ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "FIPI will consider entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies."
  //   },
  //   {
  //     title: 'Production Company of the Year ',
  //     description: 'Honoring commitment to environmental protection and sustainability',
  //     status: 'Open',
  //     details: 'This award recognizes organizations that demonstrate exceptional efforts in reducing environmental impact and promoting sustainable practices.',
  //   },
  //   {
  //     title: 'Goal Net Zero Company of the Year ',
  //     description: 'Celebrating outstanding safety practices and leadership',
  //     status: 'Open',
  //     details: 'This award honors leaders who have implemented exemplary safety protocols, significantly enhancing workplace safety standards.',
  //   },
  //   {
  //     title: 'Green Hydrogen Company of the Year',
  //     description: 'Recognizing digital innovation and transformation initiatives',
  //     status: 'Open',
  //     details: 'This award highlights projects that leverage digital tools to revolutionize operations and improve efficiency in the energy sector.',
  //   },
  //   {
  //     title: 'Overseas Oil & Gas Company of the Year ',
  //     description: 'Acknowledging exceptional contributions by young professionals',
  //     status: 'Open',
  //     details: 'This award recognizes young talent under 35 who have made significant contributions to the industry.',
  //   },
  //   {
  //     title: 'Digital Technology Provider of the Year ',
  //     description: 'Honoring outstanding CSR initiatives in the energy sector',
  //     status: 'Open',
  //     details: 'This award celebrates companies that excel in community engagement and social responsibility programs.',
  //   },
  //   {
  //     title: 'Service Provider of the Year',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "FIPI will consider entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies."
  //   },
  //   {
  //     title: 'Pipeline Transportation Company of the Year ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "FIPI will consider entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies."
  //   },
  //   {
  //     title: 'Oil Marketing Company of the Year  ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "FIPI will consider entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies."
  //   },
  //   {
  //     title: 'Human Resource Management   ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "FIPI will consider entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies."
  //   },
  //   {
  //     title: 'CBG Company of the Year  ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "FIPI will consider entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies."
  //   },
  //   {
  //     title: 'CGD Company of the Yea ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "FIPI will consider entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies."
  //   },
  //   {
  //     title: 'Best Managed Project of the Year  ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "Only two projects are eligible to apply from the same company "
  //   },
  //   {
  //     title: 'Refinery of the Year ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "FIPI will consider entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies."
  //   },
  //   {
  //     title: 'Innovator Team of the Year  ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "Max. 5 entries per company"
  //   },
  //   {
  //     title: 'Women Executive Company of the Year  ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "Only two entries are eligible to apply from the same company"
  //   },
  //   {
  //     title: 'Young Achiever Female  ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "Only three entries are eligible to apply from the same company"
  //   },
  //   {
  //     title: 'Young Achiever Male ',
  //     description: 'Recognizing groundbreaking innovations in oil & gas technology',
  //     status: 'Open',
  //     details: 'The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.',
  //     objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
  //     eligibility: "Only three entries are eligible to apply from the same company"
  //   },
  // ];

  // const handleLearnMore = (award) => {
  //   setSelectedAward(award);
  // };

  // const handleApply = () => {
  //   if (isLoggedIn) {
  //     navigate('/application-form', { state: { award: selectedAward } });
  //   } else {
  //     setIsLoginModalOpen(true); // Open LoginModal instead of direct navigation
  //   }
  //   setSelectedAward(null);
  // };

  // const handleStartApplication = () => {
  //   if (isLoggedIn) {
  //     navigate('/RegistrationForm');
  //   } else {
  //     setIsLoginModalOpen(true); // Open LoginModal for start application
  //   }
  // };

  // const handleLoginSuccess = (role) => {
  //   onLoginClick(role); // Pass role to parent for state update
  //   setIsLoginModalOpen(false); // Close modal after successful login
  //   if (selectedAward) {
  //     navigate('/application-form', { state: { award: selectedAward } });
  //   } else {
  //     navigate('/application-form');
  //   }
  // };

  // const handleCloseLoginModal = () => {
  //   setIsLoginModalOpen(false);
  // };

  return (
    
    <div className="homepage">
      <Header
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            onLogin={onLogin}
            onLogout={onLogout}
            onLoginClick={onLoginClick}
            onRegister={onRegister}
            onRegisterClick={onRegisterClick}
          />
          {location.pathname !== '/RegistrationForm' && (
      <Sidebar isLoggedIn={isLoggedIn}
        onLogin={onLogin} />
          )}
     
       {/* <div className="main-layout">
        <div className="main-content">
          <div className="content-container">
            <h2 className="content-title">Oil & Gas Industry Awards Scheme</h2>
            <p className="content-description">
              The FIPI Oil & Gas Awards have been created to recognize the leaders, innovators, and pioneers in the oil and gas industry. The objective of the FIPI Oil & Gas Awards is to celebrate the industry's most outstanding achievements.
            </p> 
            
            </div>
            </div>
            </div> */}
            {/* <div className="awards-grid">
              {awards.slice(0, showAllAwards ? awards.length : 6).map((award, index) => (
                <div key={index} className="award-card">
                  <div className="card-body">
                    <div className="award-header">
                      <h3 className="award-title">{award.title}</h3>
                    </div>
                    <p className="award-description">{award.description}</p>
                    <div className="award-footer">
                      <button onClick={() => handleLearnMore(award)} className="btn btn-primary btn-sm">Learn More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!showAllAwards && awards.length > 6 && (
              <button onClick={() => setShowAllAwards(true)} className="btn btn-outline btn-sm show-more">
                Show More
              </button>
            )} */}
        
       
      {/* {selectedAward && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedAward.title}</h2>
            <div className="modal-section">
              <h3 className="modal-subhead">Description</h3>
              <p>{selectedAward.description}</p>
            </div>
            <div className="modal-section">
              <h3 className="modal-subhead">Status</h3>
              <p>{selectedAward.status}</p>
            </div>
            <div className="modal-section">
              <h3 className="modal-subhead">Details</h3>
              <p>{selectedAward.details}</p>
            </div>
            {selectedAward.objective && (
              <div className="modal-section">
                <h3 className="modal-subhead">Objective</h3>
                <p>{selectedAward.objective}</p>
              </div>
            )}
            {selectedAward.eligibility && (
              <div className="modal-section">
                <h3 className="modal-subhead">Eligibility</h3>
                <p>{selectedAward.eligibility}</p>
              </div>
            )}
            <div className="modal-actions">
              <button onClick={handleApply} className="btn btn-success btn-sm">Apply Now</button>
              <button onClick={() => setSelectedAward(null)} className="btn btn-outline btn-sm">Close</button>
            </div>
          </div>
        </div>
      )}
      {isLoginModalOpen && (
        <LoginModal
          type="user"
          onClose={handleCloseLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )} */}
      {/* <div className="cta-section">
        <div className="card-container">
          <h2 className="cta-title">Ready to Apply?</h2>
          <p className="cta-description">
            Join the prestigious FIPI Awards and showcase your excellence in the oil & gas industry
          </p>
          <button onClick={handleStartApplication} className="btn btn-primary btn-lg">Start Your Application</button>
        </div>
      </div> */}
      </div>
   
  );
};

export default HomePage;