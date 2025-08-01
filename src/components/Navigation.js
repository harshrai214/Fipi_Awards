import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';
import { Search, Menu, X } from 'lucide-react';
import '../styles/Header.css';
import LoginModal from './LoginModal';
import fipiLogo from "../assets/images/fipi-logo-white.png";
import RegisterModal from './RegisterModal';

const Navigation = ({ isLoggedIn, userRole, onLogin, onLogout, onLoginClick, onRegisterClick, navigateTo }) => {
  const menuItems = [
    { id: 'home', label: 'Home', public: true },
    { id: 'guidelines', label: 'Guidelines', public: true },
    { id: 'faqs', label: 'FAQs', public: true },
    { id: 'contact', label: 'Contact Us', public: true },
    // { id: 'categories', label: 'Awards Categories', public: true },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [postLoginAction, setPostLoginAction] = useState(() => {});
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [postRegisterAction, setPostRegisterAction] = useState(() => {});

  const navigate = useNavigate(); // Use navigate within Navigation

  // Handle login click with function check
  const handleLoginClickLocal = (type, action = () => {}) => {
    if (onLoginClick && typeof onLoginClick === 'function') {
      setLoginType(type);
      setShowLoginModal(true);
      setPostLoginAction(() => action);
      onLoginClick(type, action); // Trigger parent function if provided
    } else {
      console.error('onLoginClick is not a function or not provided');
      setShowLoginModal(true); // Fallback to show modal anyway
      setPostLoginAction(() => action);
    }
  };

  // Handle register click with function check
  const handleRegisterClickLocal = (type, action = () => {}) => {
    if (onRegisterClick && typeof onRegisterClick === 'function') {
      setShowRegisterModal(true);
      setPostRegisterAction(() => action);
      onRegisterClick(type, action); // Trigger parent function if provided
    } else {
      console.error('onRegisterClick is not a function or not provided');
      setShowRegisterModal(true); // Fallback to show modal anyway
      setPostRegisterAction(() => action);
    }
  };

  // Conditionally set dashboard item based on user role
  const dashboardItem = isLoggedIn
    ? userRole === 'admin'
      ? { id: 'admin-dashboard', label: 'Admin Panel', public: false }
      : { id: 'applicant-dashboard', label: 'Dashboard', public: false }
    : null;

  const userMenuItems = [
    { id: 'RegistrationForm', label: 'Apply Now', public: false },
  ];

  const adminMenuItems = [];

  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-menu">
          {/* Menu Items */}
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={`/${item.id}`}
              className={`nav-item ${window.location.pathname === `/${item.id}` ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          {isLoggedIn && dashboardItem && (
            <Link
              key={dashboardItem.id}
              to={`/${dashboardItem.id}`}
              className={`nav-item ${window.location.pathname === `/${dashboardItem.id}` ? 'active' : ''}`}
            >
              {dashboardItem.label}
            </Link>
          )}

          {isLoggedIn && userMenuItems.map((item) => (
            <Link
              key={item.id}
              to={`/${item.id}`}
              className={`nav-item ${window.location.pathname === `/${item.id}` ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          {isLoggedIn && userRole === 'admin' && adminMenuItems.map((item) => (
            <Link
              key={item.id}
              to={`/${item.id}`}
              className={`nav-item ${window.location.pathname === `/${item.id}` ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Search and Buttons */}
          <div className="nav-actions">
            {!isLoggedIn ? (
              <>
                <div className="search-container">
                  <Search className="search-icon" size={16} />
                  <input
                    type="text"
                    placeholder="Search awards, applicants..."
                    className="search-input"
                  />
                </div>
                <div className="login-buttons">
                  <button
                    onClick={() => handleLoginClickLocal('user', () => navigate('/applicant-dashboard'))}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleRegisterClickLocal('user')}
                    className="btn btn-success"
                  >
                    Registration
                  </button>
                </div>
              </>
            ) : (
              <div className="user-section">
                <span className="welcome-text">
                  Welcome, {userRole === 'admin' ? 'Admin' : 'User'}
                </span>
                <button onClick={onLogout} className="btn btn-danger btn-sm">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {!isLoggedIn ? (
            <>
              <div className="mobile-search">
                <input
                  type="text"
                  placeholder="Search awards, applicants..."
                  className="form-input"
                />
              </div>
              <div className="mobile-login-buttons">
                <button
                  onClick={() => handleLoginClickLocal('user', () => navigate('/applicant-dashboard'))}
                  className="btn btn-primary"
                >
                  Login
                </button>
                <button
                  onClick={() => handleRegisterClickLocal('user')}
                  className="btn btn-success"
                >
                  Registration
                </button>
              </div>
            </>
          ) : (
            <div className="mobile-user-section">
              <p className="welcome-text">
                Welcome, {userRole === 'admin' ? 'Admin' : 'User'}
              </p>
              <button onClick={onLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Render LoginModal conditionally */}
      {showLoginModal && (
        <LoginModal
          type={loginType}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={(role) => {
            console.log('Login Success with role:', role); // Debug log
            if (onLogin && typeof onLogin === 'function') {
              onLogin(role);
            }
            setShowLoginModal(false);
            postLoginAction(); // Execute the stored action after login
            setPostLoginAction(() => {}); // Clear the action
          }}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onRegisterSuccess={() => {
            if (onRegisterClick && typeof onRegisterClick === 'function') {
              onRegisterClick('user'); // Assuming user registration for now
            }
            setShowRegisterModal(false);
            postRegisterAction();
            setPostRegisterAction(() => {});
          }}
        />
      )}
    </nav>
  );
};

export default Navigation;