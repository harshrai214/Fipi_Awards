import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import '../styles/Header.css';
import LoginModal from './LoginModal';
import fipiLogo from "../assets/images/fipi-logo-white.png";
import RegisterModal from './RegisterModal';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogin, isLoggedIn, userRole, onLogout, onLoginClick, onRegister, onRegisterClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [postLoginAction, setPostLoginAction] = useState(() => {});
  const [registerType, setRegisterType] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [postRegisterAction, setPostRegisterAction] = useState(() => {});

  const navigate = useNavigate();

  const handleLoginClickLocal = (type, action = () => {}) => {
    setLoginType(type);
    setShowLoginModal(true);
    setPostLoginAction(() => action); 
    onLoginClick(type, action); 
  };

  const handleRegisterClickLocal = (type, action = () => {}) => {
    setRegisterType(type);
    setShowRegisterModal(true);
    setPostLoginAction(() => action);
    onRegisterClick(type, action);
  }

  return (
    <header className="header">
      <div className="header-top">
        {/* Desktop Actions (Search and Login or User Section) */}
        {!isLoggedIn ? (
          <div className="desktop-actions">
            {/* <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search awards, applicants..."
                className="search-input"
              />
            </div> */}
            <div className="login-buttons">
              <button
                onClick={() => handleLoginClickLocal('user')}
                className="btn btn-primary"
              >
                Login
              </button>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="btn btn-primary"
              >
                Registration
              </button>
            </div>
          </div>
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
                  onClick={() => handleLoginClickLocal('user')}
                  className="btn btn-primary"
                >
                  User Login
                </button>
                <button
                  onClick={() => handleLoginClickLocal('admin')}
                  className="btn btn-secondary"
                >
                  Admin Login
                </button>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="btn btn-primary"
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
            onLogin(role);
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
            setShowRegisterModal(false);
            postRegisterAction();
            setPostRegisterAction(() => {});
          }}
        />
      )}
    </header>
  );
};

export default Header;