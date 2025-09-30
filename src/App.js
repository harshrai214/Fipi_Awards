import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/App.css';

import HeaderTabComponent from './components/HeaderTabComponent';
import AdminDashboard from './components/AdminDashboard';
import ApplicantDashboard from './components/ApplicantDashboard';
import CallCenter from './components/CallCenter';
import HomePage from './components/HomePage';
import RegistrationForm from './components/RegistrationForm';
import RefineryRegistration from './components/RefineryRegistration';
import FooterTabComponent from './components/FooterTabComponent';
import RegistrationExploration from './components/RegistrationExploration'; // ✅ correct import
import RegistrationGNZ from './components/RegistrationGNZ';

import './styles/RegistrationExploration.css';
import RegistrationProductionlessMMTOE from './components/RegistrationProductionlessMMTOE';
import RegistrationProductionmoreMMTOE from './components/RegistrationProductionmoreMMTOE';
import RegistrationGH from './components/RegistrationGH';
import RegistrationDigital from './components/RegistrationDigital';
import RegistrationOverseas from './components/RegistrationOverseas';
import RegistrationSP from './components/RegistrationSP';
import RegistrationPipeline from './components/RegistrationPipeline';
import RegistrationOM from './components/RegistrationOM';
import RegistrationHRM from './components/RegistrationHRM';
import RegistrationRefinery from './components/RegistrationRefinery';
import RegistrationCBG from './components/RegistrationCBG';
import RegistrationBMP from './components/RegistrationBMP';
import RegistrationInnovator from './components/RegistrationInnovator';
import RegistrationWE from './components/RegistrationWE';
import RegistrationYM from './components/RegistrationYM';
import RegistrationYF from './components/RegistrationYF';
import RegistrationCGD from './components/RegistrationCGD';
import GHscoretable from './components/Tables/GHscoretable';
import Sidebar from './components/Sidebar';
import DownloadExcelFromTemplate from './components/DownloadExcelFromTemplate';
import CBGscoretable from './components/Tables/CBGscoretable';
import Prodscoretable from "./components/Tables/Prodscoretable";
import Refineryscoretable from "./components/Tables/Refineryscoretable";
import GNZscoretable from "./components/Tables/GNZscoretable";
import Overseasscoretable from "./components/Tables/Overseasscoretable";
import Digitalscoretable from "./components/Tables/Digitalscoretable";
import BMPscoretable from "./components/Tables/BMPscoretable";
import HRMscoretable from "./components/Tables/HRMscoretable";
import Sptable from "./components/Tables/Sptable";
import Excelgnz from "./components/Excelgnz";


function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const location = useLocation();
  const state = location.state || {};

  const formRoutes = [
    '/RegistrationForm',
    '/RegistrationExploration',
    '/RegistrationProduction',
    '/RefineryRegistration',
    '/RegistrationGNZ'
  ];

  const showSidebar = !formRoutes.includes(location.pathname);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
  };

  const handleLoginClick = (type, postLoginAction) => {
    console.log(`Login clicked for ${type}`);
  };

  const handleRegisterClick = (type, postRegisterAction) => {
    console.log(`Register clicked for ${type}`);
  };

  return (
    <div className="app-container">
      <HeaderTabComponent />
      <div className="layout-container">
        {/* Optional Sidebar rendering */}
        {/* {showSidebar && (
          <div className="sidebar-guideline-container">
            <Sidebar
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              isOpen={showSidebar}
            />
          </div>
        )} */}
        <div className="mainn-container">
          <Routes>
            <Route
              path="/fipiawards"
              element={
                <HomePage
                  isLoggedIn={isLoggedIn}
                  userRole={userRole}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  onLoginClick={handleLoginClick}
                  onRegisterClick={handleRegisterClick}
                />
              }
            />
            <Route path="/guidelines" element={<div className="page-title">Guidelines Content</div>} />
            <Route path="/faqs" element={<div className="page-title">FAQs Content</div>} />
            <Route path="/contact" element={<CallCenter />} />
            <Route
              path="/applicant-dashboard"
              element={isLoggedIn && userRole !== 'admin' ? <ApplicantDashboard /> : <div>Access denied for admin</div>}
            />
            <Route
              path="/admin-dashboard"
              element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <div>Access denied</div>}
            />
            <Route
              path="/RegistrationForm"
              element={isLoggedIn ? <RegistrationForm /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationExploration"
              element={isLoggedIn ? <RegistrationExploration /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationProductionlessMMTOE"
              element={isLoggedIn ? <RegistrationProductionlessMMTOE /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationProductionmoreMMTOE"
              element={isLoggedIn ? <RegistrationProductionmoreMMTOE /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationGH"
              element={isLoggedIn ? <RegistrationGH /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RefineryRegistration"
              element={isLoggedIn ? <RefineryRegistration /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationGNZ"
              element={isLoggedIn ? <RegistrationGNZ /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationDigital"
              element={isLoggedIn ? <RegistrationDigital /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationOverseas"
              element={isLoggedIn ? <RegistrationOverseas /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationSP"
              element={isLoggedIn ? <RegistrationSP /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationPipeline"
              element={isLoggedIn ? <RegistrationPipeline /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationOM"
              element={isLoggedIn ? <RegistrationOM /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationHRM"
              element={isLoggedIn ? <RegistrationHRM /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationCBG"
              element={isLoggedIn ? <RegistrationCBG /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationRefinery"
              element={isLoggedIn ? <RegistrationRefinery /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationBMP"
              element={isLoggedIn ? <RegistrationBMP /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationInnovator"
              element={isLoggedIn ? <RegistrationInnovator /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationWE"
              element={isLoggedIn ? <RegistrationWE /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationYM"
              element={isLoggedIn ? <RegistrationYM /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationYF"
              element={isLoggedIn ? <RegistrationYF /> : <Navigate to="/fipiawards" replace />}
            />
            <Route
              path="/RegistrationCGD"
              element={isLoggedIn ? <RegistrationCGD /> : <Navigate to="/fipiawards" replace />}
            />
             <Route path="/" element={<Navigate to="/fipiawards" replace />} />
             
             <Route path="/fipiawards" element={<Navigate to="/fipiawards" replace />} />
             <Route path="/GHscoretable" element={<GHscoretable/>}/>
             <Route path="/CBGscoretable" element={<CBGscoretable/>}/>
             <Route path="/Prodscoretable" element={<Prodscoretable/>}/>
             <Route path="/Refineryscoretable" element={<Refineryscoretable/>}/>
             <Route path="/GNZscoretable" element={<GNZscoretable/>}/>
             <Route path="/Overseasscoretable" element={<Overseasscoretable/>}/>
             <Route path="/Digitalscoretable" element={<Digitalscoretable/>}/>
             <Route path="/BMPscoretable" element={<BMPscoretable/>}/>
             <Route path="/HRMscoretable" element={<HRMscoretable/>}/>
             <Route path="/Sptable" element={<Sptable/>}/>
             <Route path="/DownloadExcelFromTemplate" element={<DownloadExcelFromTemplate/>}/>
             <Route path="/Excelgnz" element={<Excelgnz/>}/>

             
          </Routes>
         
        </div>
      </div>
      <FooterTabComponent />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;