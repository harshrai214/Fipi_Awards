// import React, { useState } from 'react';
// import { Eye, EyeOff, X } from 'lucide-react';
// import "../styles/Register.css";

// const RegisterModal = ({ onClose, onRegisterSuccess }) => {
//   const [userid, setuserid] = useState('');
//   const [password, setpassword] = useState('');
//   const[Firstname,setFirstname]=useState("");
//   const[Lastname,setLastname]=useState("");
//    const[name,setname]=useState("");
//   const [organisationname, setorganisationname] = useState('');
//   const [designationname, setdesignationname] = useState('');
//   const [otp, setotp] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Registering:', { userid, password, organisationname, otp });
//     onRegisterSuccess(); // Optional: trigger post-registration behavior
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <div className="modal-header">
//           <h2 className="modal-title">Registration</h2>
//           <button className="modal-close" onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>

//         <div className="modal-body">
//           <form className="login-form" onSubmit={handleSubmit}>
//              <label className="form-label">Applicant Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setname(e.target.value)}
//               placeholder="Enter Applicant Name"
//               required
//             />
//             <input
            
//             />
            
//             {/* Designation */}
//             <label className="form-label">Designation</label>
//             <input
//               type="text"
//               value={designationname}
//               onChange={(e) => setdesignationname(e.target.value)}
//               placeholder="Enter Designation"
//               required
//             />
//             {/* Organisation Name */}
//             <label className="form-label">Organisation Name</label>
//             <input
//               type="text"
//               value={organisationname}
//               onChange={(e) => setorganisationname(e.target.value)}
//               placeholder="Enter Organisation Name"
//               required
//             />
            
//             {/* Email Field */}
//             <label className="form-label">Applicant Email Address</label>
//             <input
//               type="email"
//               value={userid}
//               onChange={(e) => setuserid(e.target.value)}
//               placeholder="Enter Email ID"
//               required
//             />

//             {/* Password Field */}
//             <label className="form-label">Password</label>
//             <div className="password-input-container">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setpassword(e.target.value)}
//                 placeholder="Enter Password"
//                 required
//                 className="password-input"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="password-toggle"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//             <label className="form-label">Confirm Password</label>
//             <div className="password-input-container">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setpassword(e.target.value)}
//                 placeholder="Confirm Password"
//                 required
//                 className="password-input"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="password-toggle"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
            

//             {/* OTP Field */}
//             <label className="form-label">OTP</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setotp(e.target.value)}
//               placeholder="One Time Password"
//               required
//             />

//             {/* Submit */}
//             <button type="submit" className="btn btn-primary login-btn">
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterModal;



// import React, { useState } from 'react';
// import { X, Eye, EyeOff } from 'lucide-react';
// import axios from 'axios';
// import '../styles/Register.css';

// const RegisterModal = ({ onClose, onRegisterSuccess }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     confirm_password: '',
//   });

//     const handleSubmit = async e => {
//       e.preventDefault();
//       if (formData.password !== formData.confirm_password) {
//         return alert('Passwords do not match.');
//       }

//       // 1) Do the network request and handle only its errors:
//     let res;
//     try {
//       res = await axios.post('http://localhost:8000/api/auth/register/', {
//         first_name: formData.first_name,
//         last_name:  formData.last_name,
//         email:      formData.email,
//         password:   formData.password,
//       });
//       console.log('Registration response:', res);
//     } catch (err) {
//       console.error('Registration API error:', err);
//       const msg = err.response?.data
//         ? JSON.stringify(err.response.data)
//         : err.message;
//       return alert('Registration failed: ' + msg);
//     }

//     // 2) Only once the API truly succeeded, call your success callback:
//     try {
//       onRegisterSuccess();
//     } catch (err) {
//       console.error('onRegisterSuccess threw:', err);
//     }
//     };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         {/* Header */}
//         <div className="modal-header">
//           <h2 className="modal-title">Register</h2>
//           <button onClick={onClose} className="modal-close">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="modal-body">
//           <form onSubmit={handleSubmit} className="login-form">
//             {['first_name','last_name','email'].map(field => (
//               <div className="form-group" key={field}>
//                 <label className="form-label">
//                   {field.replace('_',' ').replace(/\b\w/g,c=>c.toUpperCase())}
//                 </label>
//                 <input
//                   type={field==='email' ? 'email':'text'}
//                   className="form-input"
//                   placeholder={`Enter your ${field.replace('_',' ')}`}
//                   required
//                   value={formData[field]}
//                   onChange={e => setFormData({ ...formData, [field]: e.target.value })}
//                 />
//               </div>
//             ))}

//             <div className="form-group">
//               <label className="form-label">Password</label>
//               <div className="password-input-container">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   className="form-input password-input"
//                   placeholder="Enter password"
//                   required
//                   value={formData.password}
//                   onChange={e => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="password-toggle"
//                 >
//                   {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
//                 </button>
//               </div>
//             </div>

//             <div className="form-group">
//               <label className="form-label">Confirm Password</label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 className="form-input"
//                 placeholder="Confirm password"
//                 required
//                 value={formData.confirm_password}
//                 onChange={e => setFormData({ ...formData, confirm_password: e.target.value })}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary login-btn">
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterModal;



// RegisterModal.jsx
import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import '../styles/Register.css';

const RegisterModal = ({ onClose, onRegisterSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name:       '',
    last_name:        '',
    applicant_name:   '',
    applicant_phone:  '',
    designation:      '',
    organisation_name:'',
    email:            '',
    password:         '',
    confirm_password: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      return alert('Passwords do not match.');
    }

    // 1) Call registration API
    let res;
    try {
      res = await axios.post('http://localhost:8000/api/auth/register/', {
      // res = await axios.post('http://demo.raygain.com/fipi_awards_backend/api/auth/register/', {
        first_name:       formData.first_name,
        last_name:        formData.last_name,
        applicant_name:   formData.applicant_name,
        applicant_phone:   formData.applicant_phone,
        designation:      formData.designation,
        organisation_name:formData.organisation_name,
        email:            formData.email,
        password:         formData.password,
      });
      console.log('Registration response:', res);
    } catch (err) {
      console.error('Registration API error:', err);
      const msg = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
      return alert('Registration failed: ' + msg);
    }

    // 2) Immediately log in to get tokens and user claims 
    try {
      const loginRes = await axios.post('http://localhost:8000/api/auth/login/', {
        // const loginRes = await axios.post('http://demo.raygain.com/fipi_awards_backend/api/auth/register/', {
        email:    formData.email,
        password: formData.password,
      });
      const { access, refresh } = loginRes.data;
      localStorage.setItem('access_token',  access);
      localStorage.setItem('refresh_token', refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      // you can parse the JWT to extract the extra claims:
      const payload = JSON.parse(window.atob(access.split('.')[1]));
      console.log('JWT claims:', payload);
    } catch (err) {
      console.error('Auto-login error:', err);
      // even if login fails, we’ve registered successfully
    }

    // 3) Signal success & close modal
    onRegisterSuccess();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Register</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="login-form">
            {/* Applicant Name */}
            <div className="form-group">
              <label className="form-label">Applicant Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Applicant Name"
                required
                value={formData.applicant_name}
                onChange={e =>
                  setFormData({ ...formData, applicant_name: e.target.value })
                }
              />
            </div>
            {/* Applicant Phone Number */}
<div className="form-group">
  <label className="form-label">Applicant Phone Number</label>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{
      padding: '0.5rem',
      backgroundColor: '#eee',
      border: '1px solid #ccc',
      borderRadius: '4px 0 0 4px'
    }}>
      +91
    </span>
    <input
      type="text"
      className="form-input"
      placeholder="Enter 10-digit number"
      maxLength="10"
      value={formData.applicant_phone}
      onChange={e => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (input.length <= 10) {
          setFormData({ ...formData, applicant_phone: input });
        }
      }}
      required
      style={{ borderRadius: '0 4px 4px 0', flex: 1 }}
    />
  </div>
  {formData.applicant_phone && formData.applicant_phone.length !== 10 && (
    <small style={{ color: 'red' }}>Phone number must be exactly 10 digits.</small>
  )}
</div>

            {/* Designation */}
            <div className="form-group">
              <label className="form-label">Designation</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Designation"
                required
                value={formData.designation}
                onChange={e =>
                  setFormData({ ...formData, designation: e.target.value })
                }
              />
            </div>
            {/* Organisation */}
            <div className="form-group">
              <label className="form-label">Organisation Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Organisation Name"
                required
                value={formData.organisation_name}
                onChange={e =>
                  setFormData({ ...formData, organisation_name: e.target.value })
                }
              />
            </div>
            {/* First & Last Name */}
            {['first_name','last_name','email'].map(field => (
              <div className="form-group" key={field}>
                <label className="form-label">
                  {field.replace('_',' ').replace(/\b\w/g,c=>c.toUpperCase())}
                </label>
                <input
                  type={field==='email' ? 'email' : 'text'}
                  className="form-input"
                  placeholder={`Enter ${field.replace('_',' ')}`}
                  required
                  value={formData[field]}
                  onChange={e =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              </div>
            ))}
            {/* Password & Confirm */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input password-input"
                  placeholder="Enter password"
                  required
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Confirm password"
                required
                value={formData.confirm_password}
                onChange={e =>
                  setFormData({ ...formData, confirm_password: e.target.value })
                }
              />
            </div>

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




// import React, { useState } from 'react';
// import axios from 'axios';

// function RegisterModal({ onClose }) {
//   const [email, setEmail]       = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirst]   = useState('');
//   const [lastName, setLast]     = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/api/auth/register/', {
//         email,
//         password,
//         first_name: firstName,
//         last_name: lastName,
//       });
//       alert('Registration successful. Please log in.');
//       onClose();
//     } catch (err) {
//       alert('Registration failed: ' + JSON.stringify(err.response?.data));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email"    value={email}    onChange={e => setEmail(e.target.value)}    placeholder="Email"    required />
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
//       <input type="text"     value={firstName} onChange={e => setFirst(e.target.value)}      placeholder="First Name" />
//       <input type="text"     value={lastName}  onChange={e => setLast(e.target.value)}       placeholder="Last Name" />
//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default RegisterModal;