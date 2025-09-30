// import React, { useState } from 'react';
// import { X, Eye, EyeOff } from 'lucide-react';
// import '../styles/Modal.css';
// import RegisterModal from './RegisterModal';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';

// const LoginModal = ({ type, onClose, onLoginSuccess, onRegisterClick }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [postRegisterAction, setPostRegisterAction] = useState(() => {});
//   const [postLoginAction, setPostLoginAction] = useState(() => {});
//   const [registerType, setRegisterType] = useState('');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitted:', formData.email, formData.password); // Debug log
//     if (formData.email === 'raygain@gmail.com' && formData.password === 'raygain') {
//       const role = type === 'admin' ? 'admin' : 'user'; // Determine role based on type
//       console.log('Login successful, role:', role); // Debug log
//       onLoginSuccess(role); // Trigger success callback with role
//       onClose(); // Close modal after success
//     } else {
//       alert('Invalid email or password');
//     }
//   };

//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     alert('Password reset link sent to your email!');
//     setShowForgotPassword(false);
//   };

//   const handleRegisterClickLocal = (type, action = () => {}) => {
//     setRegisterType(type);
//     setShowRegisterModal(true);
//     setPostLoginAction(() => action);
//     // Call the onRegisterClick prop to notify the parent
//     if (onRegisterClick) {
//       onRegisterClick(type, action);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         {/* Header */}
//         <div className="modal-header">
//           <h2 className="modal-title">
//             {showForgotPassword ? 'Reset Password' : `${type === 'admin' ? 'Admin' : 'User'} Login`}
//           </h2>
//           <button onClick={onClose} className="modal-close">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="modal-body">
//           {!showForgotPassword ? (
//             <form onSubmit={handleSubmit} className="login-form">
//               <div className="form-group">
//                 <label className="form-label">Email Address</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="form-input"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Password</label>
//                 <div className="password-input-container">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     className="form-input password-input"
//                     placeholder="Enter your password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="password-toggle"
//                   >
//                     {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-options">
//                 <label className="checkbox-label">
//                   <input type="checkbox" className="checkbox" />
//                   <span className="checkbox-text">Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPassword(true)}
//                   className="forgot-password-link"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 className={`btn login-btn ${type === 'admin' ? 'btn-secondary' : 'btn-primary'}`}
//               >
//                 Sign In
//               </button>
//             </form>
//           ) : (
//             <form onSubmit={handleForgotPassword} className="forgot-form">
//               <p className="forgot-description">
//                 Enter your email address and we'll send you a link to reset your password.
//               </p>

//               <div className="form-group">
//                 <label className="form-label">Email Address</label>
//                 <input
//                   type="email"
//                   className="form-input"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>

//               <div className="forgot-actions">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPassword(false)}
//                   className="btn btn-outline"
//                 >
//                   Back to Login
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Send Reset Link
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>

//         {/* Footer */}
//         {!showForgotPassword && (
//           <div className="modal-footer">
//             <p className="signup-text">
//               Don't have an account?{' '}
//               <button className="signup-link" onClick={() => handleRegisterClickLocal('user')}>Registration</button>
//             </p>
//           </div>
//         )}

//         {showRegisterModal && (
//           <RegisterModal
//             type={registerType}
//             onClose={() => setShowRegisterModal(false)}
//             postRegisterAction={postRegisterAction}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginModal;

// import React, { useState } from 'react';
// import { X, Eye, EyeOff } from 'lucide-react';
// import '../styles/LoginModal.css'; // 👈 new CSS file
// import RegisterModal from './RegisterModal';

// const LoginModal = ({ onClose, onLoginSuccess, onRegisterClick }) => {
//   const [loginType, setLoginType] = useState('user');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [registerType, setRegisterType] = useState('');
//   const [formData, setFormData] = useState({
//     emailOrUsername: '',
//     password: '',
//   });
//   const [showForgotPassword, setShowForgotPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (loginType === 'admin') {
//       if (
//         formData.emailOrUsername === 'raygain' &&
//         formData.password === 'raygain'
//       ) {
//         onLoginSuccess('admin');
//         onClose();
//         return;
//       } else {
//         alert('❌ Invalid Admin credentials!');
//         return;
//       }
//     }

//     if (loginType === 'user') {
//       if (
//         formData.emailOrUsername === 'raygain@gmail.com' &&
//         formData.password === 'raygain'
//       ) {
//         onLoginSuccess('user');
//         onClose();
//       } else {
//         alert('❌ Invalid User credentials!');
//       }
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container animate-pop">
//         {/* Header */}
//         <div className="modal-header">
//           <h2 className="modal-title">
//             {showForgotPassword
//               ? '🔑 Reset Password'
//               : loginType === 'admin'
//               ? '👑 Admin Login'
//               : '🙋 User Login'}
//           </h2>
//           <button onClick={onClose} className="modal-close">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Toggle */}
//         {!showForgotPassword && (
//           <div className="login-toggle">
//             <button
//               className={`toggle-btn ${loginType === 'user' ? 'active' : ''}`}
//               onClick={() =>
//                 setFormData({ emailOrUsername: '', password: '' }) ||
//                 setLoginType('user')
//               }
//             >
//               User
//             </button>
//             <button
//               className={`toggle-btn ${loginType === 'admin' ? 'active' : ''}`}
//               onClick={() =>
//                 setFormData({ emailOrUsername: '', password: '' }) ||
//                 setLoginType('admin')
//               }
//             >
//               Admin
//             </button>
//           </div>
//         )}

//         {/* Body */}
//         <div className="modal-body">
//           {!showForgotPassword ? (
//             <form onSubmit={handleSubmit} className="login-form">
//               <div className="form-group">
//                 <label className="form-label">
//                   {loginType === 'admin' ? 'Username' : 'Email Address'}
//                 </label>
//                 <input
//                   type={loginType === 'admin' ? 'text' : 'email'}
//                   value={formData.emailOrUsername}
//                   onChange={(e) =>
//                     setFormData({ ...formData, emailOrUsername: e.target.value })
//                   }
//                   className="form-input glow"
//                   placeholder={
//                     loginType === 'admin'
//                       ? 'Enter your username'
//                       : 'Enter your email'
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Password</label>
//                 <div className="password-input-container">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={(e) =>
//                       setFormData({ ...formData, password: e.target.value })
//                     }
//                     className="form-input glow"
//                     placeholder="Enter your password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="password-toggle"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-options">
//                 <label className="checkbox-label">
//                   <input type="checkbox" className="checkbox" />
//                   <span className="checkbox-text">Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPassword(true)}
//                   className="forgot-password-link"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 className={`btn login-btn ${loginType === 'admin' ? 'btn-secondary' : 'btn-primary'}`}
//               >
//                 🚀 Sign In
//               </button>
//             </form>
//           ) : (
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 alert('📧 Password reset link sent!');
//                 setShowForgotPassword(false);
//               }}
//               className="forgot-form"
//             >
//               <p className="forgot-description">
//                 Enter your email address and we'll send you a link to reset your
//                 password.
//               </p>

//               <div className="form-group">
//                 <label className="form-label">Email Address</label>
//                 <input
//                   type="email"
//                   className="form-input glow"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>

//               <div className="forgot-actions">
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPassword(false)}
//                   className="btn btn-outline"
//                 >
//                   ⬅ Back
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Send Reset Link
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>

//         {/* Footer */}
//         {!showForgotPassword && loginType === 'user' && (
//           <div className="modal-footer">
//             <p className="signup-text">
//               Don't have an account?{' '}
//               <button
//                 className="signup-link"
//                 onClick={() => showRegisterModal()}
//               >
//                 Register Here
//               </button>
//             </p>
//           </div>
//         )}

//         {showRegisterModal && (
//           <RegisterModal
//             type={registerType}
//             onClose={() => setShowRegisterModal(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginModal;


// tagda code 




import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import '../styles/Modal.css';
import RegisterModal from './RegisterModal';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose, onLoginSuccess, onRegisterClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerType, setRegisterType] = useState('');
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { emailOrUsername, password } = formData;

    // ✅ Admin credentials
    if (emailOrUsername === 'raygain' && password === 'raygain') {
      onLoginSuccess('admin');
      onClose();
      return;
    }

    // ✅ User credentials
    if (emailOrUsername === 'raygain@gmail.com' && password === 'raygain') {
      onLoginSuccess('user');
      onClose();
      return;
    }

    // ❌ Invalid credentials
    alert('Invalid credentials!');
  };

  const handleRegisterClickLocal = (type) => {
    setRegisterType(type);
    setShowRegisterModal(true);
    if (onRegisterClick) {
      onRegisterClick(type);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {showForgotPassword ? 'Reset Password' : 'Sign In'}
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {!showForgotPassword ? (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Email / Username</label>
                <input
                  type="text"
                  value={formData.emailOrUsername}
                  onChange={(e) =>
                    setFormData({ ...formData, emailOrUsername: e.target.value })
                  }
                  className="form-input"
                  placeholder="Enter your email or username"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="form-input password-input"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox" />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="forgot-password-link"
                >
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Password reset link sent!');
                setShowForgotPassword(false);
              }}
              className="forgot-form"
            >
              <p className="forgot-description">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="forgot-actions">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="btn btn-outline"
                >
                  Back to Login
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Reset Link
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {!showForgotPassword && (
          <div className="modal-footer">
            <p className="signup-text">
              Don't have an account?{' '}
              <button
                className="signup-link"
                onClick={() => handleRegisterClickLocal('user')}
              >
                Registration
              </button>
            </p>
          </div>
        )}

        {showRegisterModal && (
          <RegisterModal
            type={registerType}
            onClose={() => setShowRegisterModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LoginModal;


