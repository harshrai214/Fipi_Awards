import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import "../styles/Register.css";

const RegisterModal = ({ onClose, onRegisterSuccess }) => {
  const [userid, setuserid] = useState('');
  const [password, setpassword] = useState('');
  const[Firstname,setFirstname]=useState("");
  const[Lastname,setLastname]=useState("");
   const[name,setname]=useState("");
  const [organisationname, setorganisationname] = useState('');
  const [designationname, setdesignationname] = useState('');
  const [otp, setotp] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering:', { userid, password, organisationname, otp });
    onRegisterSuccess(); // Optional: trigger post-registration behavior
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Registration</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form className="login-form" onSubmit={handleSubmit}>
             <label className="form-label">Applicant Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter Applicant Name"
              required
            />
            
            {/* Designation */}
            <label className="form-label">Designation</label>
            <input
              type="text"
              value={designationname}
              onChange={(e) => setdesignationname(e.target.value)}
              placeholder="Enter Designation"
              required
            />
            {/* Organisation Name */}
            <label className="form-label">Organisation Name</label>
            <input
              type="text"
              value={organisationname}
              onChange={(e) => setorganisationname(e.target.value)}
              placeholder="Enter Organisation Name"
              required
            />
            
            {/* Email Field */}
            <label className="form-label">Applicant Email Address</label>
            <input
              type="email"
              value={userid}
              onChange={(e) => setuserid(e.target.value)}
              placeholder="Enter Email ID"
              required
            />

            {/* Password Field */}
            <label className="form-label">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter Password"
                required
                className="password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <label className="form-label">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            

            {/* OTP Field */}
            <label className="form-label">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              placeholder="One Time Password"
              required
            />

            {/* Submit */}
            <button type="submit" className="btn btn-primary login-btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
