// import React, { useState } from 'react';
// import { Filter } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import LoginModal from './LoginModal';
// import '../styles/HomePage.css';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import RegisterModal from './RegisterModal';
// import { useLocation } from 'react-router-dom';

// // Fallback image URL if history.jpg is missing
// const historyBg = "https://via.placeholder.com/600x400"; // Placeholder image

// const HomePage = ({ user, handleOpenLoginModal,isLoggedIn,onLogout, onLoginClick, onRegisterClick, onLogin, onRegister,userRole }) => {
//   const [filters, setFilters] = useState({
//     year: 'All Years',
//     category: 'All Categories',
//     status: 'All Statuses',
//   });
//   const [selectedAward, setSelectedAward] = useState(null);
//   const [showAllAwards, setShowAllAwards] = useState(false);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   // const [IsLoggedIn, setIsLoggedIn] = useState(false);
//   // const [UserRole, setUserRole] = useState('user');
//   const navigate = useNavigate();

// const location = useLocation();
  
//   return (
    
//     <div className="homepage">
//       <Header
//             isLoggedIn={isLoggedIn}
//             userRole={userRole}
//             onLogin={onLogin}
//             onLogout={onLogout}
//             onLoginClick={onLoginClick}
//             onRegister={onRegister}
//             onRegisterClick={onRegisterClick}
//           />
//           {location.pathname !== '/RegistrationForm' && (
//       <Sidebar isLoggedIn={isLoggedIn}
//       onLoginClick={handleOpenLoginModal}
//         onLogin={onLogin} 
//         />
//           )}
     
     
//       </div>
   
//   );
// };

// export default HomePage;



import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import AdminDashboard from './AdminDashboard'; // ✅ Import your AdminDashboard
import '../styles/HomePage.css';

const HomePage = ({
  user,
  handleOpenLoginModal,
  isLoggedIn,
  onLogout,
  onLoginClick,
  onRegisterClick,
  onLogin,
  onRegister,
  userRole, 
}) => {

  const navigate = useNavigate();
  const location = useLocation();

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
        <>
          {isLoggedIn ? (
            userRole === 'admin' ? (
              <AdminDashboard />
            ) : (
              <Sidebar
                isLoggedIn={isLoggedIn}
                onLoginClick={handleOpenLoginModal}
                onLogin={onLogin}
              />
            )
          ) : (
            <Sidebar
              isLoggedIn={isLoggedIn}
              onLoginClick={handleOpenLoginModal}
              onLogin={onLogin}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
