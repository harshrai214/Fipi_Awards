// import React, { useState } from 'react';
// import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import { useLocation } from 'react-router-dom';
// import '../styles/FormProduction.css';



// const RegistrationOverseas = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [formData, setFormData] = useState({
//         Organisationname: '',
//         category: 'Overseas Oil & Gas Company of the Year',
//         companyName: '',
//         mailingAddress: '',
//         authorityName: '',
//         authorityTitle: '',
//         authorityPhone: '',
//         authorityEmail: '',
//         authoritySignature: '',
//         copyApplicantData: false,
//         contactName: '',
//         contactPhone: '',
//         contactEmail: '',
//         companyProfile: '',
//         awardJustification: '',
//         approvingAuthoritySignature: '',
//         declaration: false,
//         comment: '',
//         '1_totalOil': ['', ''],
//         '2_totalGas': ['', ''],
//         '3_2POil': ['', ''],
//         '4_2PGas': ['', ''],
//         '5_netProfit': ['', ''],
//         '6_annual': ['', ''],
//         '7_overseas': ['', ''],
//         '8_totalCarbon': ['', ''],
//         '9_expenditure': ['', ''],

//         attachments1: { description: '', file: null },
//         attachments2: { description: '', file: null },
//         attachments3: { description: '', file: null },
//         attachments4: { description: '', file: null },
//     });
//     const [error, setError] = useState('');
//     const [copyApplicantData, setCopyApplicantData] = useState(false);
//     // const navigate = useNavigate();
//     const location = useLocation();
//     console.log('location.state:', location.state);
//     // const awardTitle = location.state?.awardTitle || "Oil & Gas Production Company of the Year";

//     const handleChange = (name, value, index = null) => {

//         if (["Firstname", "Lastname", "authorityName", "contactName"].includes(name)) {
//             const isValid = /^[A-Za-z\s]*$/.test(value);
//             if (!isValid) return;
//         }

//         if (index !== null) {
//             setFormData(prev => {
//                 const updatedArray = [...prev[name]];
//                 updatedArray[index] = value;
//                 return {
//                     ...prev,
//                     [name]: updatedArray
//                 };
//             });
//         } else {
//             if (name === 'authorityPhone') {
//                 const numericValue = value.replace(/\D/g, '').slice(0, 10);
//                 setFormData(prev => ({ ...prev, [name]: numericValue }));
//                 if (numericValue.length > 10) {
//                     setError('Authority phone number must not exceed 10 digits.');
//                 } else {
//                     setError('');
//                 }
//             } else {
//                 setFormData(prev => ({ ...prev, [name]: value }));
//             }
//         }

//         if (name === 'Organisationname' && !value && currentStep === 1) {
//             setError('Organisation name is required.');
//         } else if (name === 'mailingAddress' && !value.trim() && currentStep === 1) {
//             setError('Mailing address is required.');
//         } else if (name === 'authorityName' && !value && currentStep === 2) {
//             setError('Authority name is required.');
//         } else if (name === 'authorityTitle' && !value && currentStep === 2) {
//             setError('Authority designation is required.');
//         } else {
//             setError('');
//         }
//     };

//     // const validateForm = () => {
//     //     const errors = {};

//     //     if (!formData.Organisationname?.trim()) {
//     //         errors.Organisationname = 'Organisation name is required';
//     //     }
//     //     if (!formData.authorityName?.trim()) {
//     //         errors.authorityName = 'Authority name is required';
//     //     }
//     //     if (!formData.authorityTitle?.trim()) {
//     //         errors.authorityTitle = 'Authority Designation is required';
//     //     }


//     //     if (!formData.contactEmail?.trim()) {
//     //         errors.contactEmail = 'Email is required';
//     //     } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
//     //         errors.contactEmail = 'Invalid email format';
//     //     }

//     //     return errors;
//     // };

//      const handleAttachmentChange = (key, field, value, event = null) => {
//         if (field === 'file' && value) {
//             const file = value;
//             const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

//             if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
//                 setError('Only JPG, PNG, and PDF files are allowed for attachments.');
//                 if (event) event.target.value = null; // Reset file input
//                 return;
//             }
//             if (file.size > maxSizeInBytes) {
//                 setError('File size must not exceed 5 MB for attachments.');
//                 if (event) event.target.value = null; // Reset file input
//                 return;
//             }
//             setError('');
//         }

//         setFormData((prev) => ({
//             ...prev,
//             [key]: {
//                 ...prev[key],
//                 [field]: value
//             }
//         }));
//     };

//     const nextStep = () => {
//         if (currentStep === 1 && !formData.Organisationname) {
//             setError('Organisation name is required.');
//             return;
//         }
//         if (currentStep === 1 && !formData.mailingAddress.trim()) {
//             setError('Mailing address is required.');
//             return;
//         }
//         if (currentStep === 2 && !formData.authorityName) {
//             setError('Authority name is required.');
//             return;
//         }
//         if (currentStep === 2 && !formData.authorityTitle) {
//             setError('Authority designation is required.');
//             return;
//         }
//         setError('');
//         if (currentStep < 5) {
//             setCurrentStep(prev => prev + 1);
//         }
//     };

//     const prevStep = () => {
//         if (currentStep > 1) setCurrentStep(prev => prev - 1);
//     };

//     const saveDraft = () => {
//         localStorage.setItem('registrationProductionDraft', JSON.stringify({ formData }));
//         alert('Draft Saved!');
//     };

//     const handleApprovingAuthorityChange = (files) => {
//         if (files && files.length > 0) {
//             const file = files[0];
//             const maxSizeInBytes = 5 * 1024 * 1024; 

//             if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
//                 setError('Only JPG, PNG, and PDF files are allowed.');
//                 return;
//             }
//             if (file.size > maxSizeInBytes) {
//                 setError('File size must not exceed 5 MB.');
//                 return;
//             }
//             setError('');
//             setFormData(prev => ({ ...prev, approvingAuthoritySignature: file }));
//         }
//     };

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     console.log('Form Data before submission:', formData); // Log formData to debug
//     //     if (!formData.declaration) {
//     //         alert('Please accept the declaration before submitting.');
//     //         return;
//     //     }

//     //     if (!error && formData.authorityPhone.length === 10) {
//     //         console.log('Form submitted with data:', formData);
//     //         localStorage.setItem('registrationProduction', JSON.stringify({ formData }));
//     //         alert('Registration Submitted Successfully!');
//     //         setIsSubmitted(true)
//     //         setCurrentStep(1);
//     //         setFormData({
//     //             Organisationname: '',
//     //             category: 'Overseas Oil & Gas Company of the Yearr',
//     //             Firstname: '',
//     //             Lastname: '',
//     //             userid: '',
//     //             companyName: '',
//     //             mailingAddress: '',
//     //             authorityName: '',
//     //             authorityTitle: '',
//     //             authorityPhone: '',
//     //             authorityEmail: '',
//     //             authoritySignature: '',
//     //             copyApplicantData: false,
//     //             contactName: '',
//     //             contactPhone: '',
//     //             contactEmail: '',
//     //             companyProfile: '',
//     //             awardJustification: '',
//     //             approvingAuthoritySignature: '',
//     //             declaration: false,
//     //             comment: '',
//     //             '1_totalOil': ['', ''],
//     //             '2_totalGas': ['', ''],
//     //             '3_2POil': ['', ''],
//     //             '4_2PGas': ['', ''],
//     //             '5_netProfit': ['', ''],
//     //             '6_annual': ['', ''],
//     //             '7_overseas': ['', ''],
//     //             '8_totalCarbon': ['', ''],
//     //             '9_expenditure': ['', ''],
//     //         });

//     //     } else {
//     //         setError('Please enter a valid 10-digit authority phone number.');
//     //     }
//     // };



//     const handleSubmit = async e => {
//   e.preventDefault();
//   if (!formData.declaration) {
//     return alert('Please accept the declaration.');
//   }

//   // 1️⃣ basic validation…
//   if (!formData.Organisationname.trim()) return alert('Organisation is required');
//   if (!formData.mailingAddress.trim()) return alert('Mailing address is required');
//   if (!formData.authorityName.trim()) return alert('Authority name is required');
//   if (!formData.approvingAuthoritySignature) return alert('Authority signature file is required');

//   const fd = new FormData();

//   // 2️⃣ scalar & file fields mapping
//   const map = {
//     Organisationname: 'organisation_name',
//     category:         'category',
//     companyName:      'company_name',
//     mailingAddress:   'mailing_address',
//     authorityName:    'authority_name',
//     authorityTitle:   'authority_title',
//     authorityPhone:   'authority_phone',
//     authorityEmail:   'authority_email',
//     approvingAuthoritySignature: 'approving_authority_file',
//     contactName:      'contact_name',
//     contactPhone:     'contact_phone',
//     contactEmail:     'contact_email',
//     companyProfile:   'company_profile',
//     awardJustification: 'award_justification',
//     comment:          'comment',
//     declaration:      'declaration',
//   };
//   Object.entries(formData).forEach(([k,v]) => {
//     const field = map[k];
//     if (!field) return;
//     fd.append(field, v instanceof File ? v : v || '');
//   });

//   // 3️⃣ quantitative pairs → two fields each
//   const q = [
//     ['1_totalOil','total_oil'],
//     ['2_totalGas','total_gas'],
//     ['3_2POil','reserve_2p_oil'],
//     ['4_2PGas','reserve_2p_gas'],
//     ['5_netProfit','net_profit'],
//     ['6_annual','annual_turnover'],
//     ['7_overseas','overseas_investment'],
//     ['8_totalCarbon','total_carbon'],
//     ['9_expenditure','community_expenditure'],
//   ];
//   q.forEach(([jsKey,djKey]) => {
//     const [y24='', y23=''] = formData[jsKey] || [];
//     fd.append(`${djKey}_2024`, y24);
//     fd.append(`${djKey}_2023`, y23);
//   });

//   // 4️⃣ attachments: desc + file
//   [1,2,3,4].forEach(n => {
//     const slot = formData[`attachments${n}`] || {};
//     fd.append(`attachments${n}_desc`, slot.description||'');
//     if (slot.file) fd.append(`attachments${n}`, slot.file);
//   });

//   // 5️⃣ post
//   try {
//       const url = `${ACTIVE_API_BASE_URL}/overseas/`;
//       const res = await fetch(url, {
//       method: 'POST',
//       body: fd
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       console.error('API error:', data);
//       return alert('Submission failed; check console.');
//     }
//     alert('Submitted successfully!');
//     //… redirect or clear form …
//   } catch(err) {
//     console.error('Network error:', err);
//     alert('Network error; please retry.');
//   }
// };



//     const handlePrint = () => {
//         const printContent = `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h1 style="text-align: center; color: #1e40af;">Registration Form: Oil & Gas Production</h1>
//         <h2>Organization & Contact Details</h2>
//         <p><strong>Organisation Name:</strong> ${formData.Organisationname}</p>
//         <p><strong>Category:</strong> ${formData.category}</p>
//         <p><strong>Mailing Address:</strong> ${formData.mailingAddress}</p>
//         <h2>Company Details</h2>
//         <p><strong>Name of Company:</strong> ${formData.companyName}</p>
//         <p><strong>Authority Name:</strong> ${formData.authorityName}</p>
//         <p><strong>Authority Title:</strong> ${formData.authorityTitle}</p>
//         <p><strong>Authority Phone:</strong> ${formData.authorityPhone}</p>
//         <p><strong>Authority Email:</strong> ${formData.authorityEmail}</p>
//         <p><strong>Contact Name:</strong> ${formData.contactName}</p>
//         <p><strong>Contact Phone:</strong> ${formData.contactPhone}</p>
//         <p><strong>Contact Email:</strong> ${formData.contactEmail}</p>
//         <p><strong>Company Profile:</strong> ${formData.companyProfile}</p>
//         <h2>Quantitative Information - Part 1</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th></tr></thead>
//           <tbody>
//             <tr><td>1</td><td>Total oil production (MMT)</td><td>${formData['1_totalOil'][0]}</td><td>${formData['1_totalOil'][1]}</td></tr>
//             <tr><td>2</td><td>Total gas production (BCM)</td><td>${formData['2_totalGas'][0]}</td><td>${formData['2_totalGas'][1]}</td></tr>
//             <tr><td>3</td><td>2P oil reserve accretion (MMT)</td><td>${formData['3_2POil'][0]}</td><td>${formData['3_2POil'][1]}</td></tr>
//             <tr><td>4</td><td>2P gas reserves accretion (BCM)</td><td>${formData['4_2PGas'][0]}</td><td>${formData['4_2PGas'][1]}</td></tr>
//             <tr><td>5</td><td>Net Profit (INR Crores)</td><td>${formData['5_netProfit'][0]}</td><td>${formData['5_netProfit'][1]}</td></tr>          
//           </tbody>
//         </table>
//         <h2>Quantitative Information - Part 2</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th></tr></thead>
//           <tbody>
//             <tr><td>6</td><td>Annual Turnover (INR Crores)</td><td>${formData['6_annual'][0]}</td><td>${formData['6_annual'][1]}</td></tr>
//             <tr><td>7</td><td>Overseas Investment (INR Crores)</td><td>${formData['7_overseas'][0]}</td><td>${formData['7_overseas'][1]}</td></tr>
//             <tr><td>8</td><td>Total Carbon Emitted (Tonne)</td><td>${formData['8_totalCarbon'][0]}</td><td>${formData['8_totalCarbon'][1]}</td></tr>
//             <tr><td>9</td><td>Expenditure on Community welfare (INR Crores) </td><td>${formData['9_expenditure'][0]}</td><td>${formData['9_expenditure'][1]}</td></tr>
//           </tbody>
//         </table>
//         <h2>Step 5: Declaration</h2>
//         <p>I declare that the information submitted is true and complete.</p>
//       </div>
//     `;
//         const printWindow = window.open('', '', 'height=600,width=800');
//         printWindow.document.write(printContent);
//         printWindow.document.close();
//         printWindow.print();
//     };

//     const fullData = [
//         ['1', 'Total oil production during the year (MMT)', '1_totalOil'],
//         ['2', 'Total gas production during the year (BCM)', '2_totalGas'],
//         ['3', '2P oil reserve accretion (MMT)', '3_2POil'],
//         ['4', '2P gas reserves accretion (BCM)', '4_2PGas'],
//         ['5', 'Net Profit (INR Crores)', '5_netProfit'],
//         ['6', 'Annual Turnover (INR Crores)', '6_annual'],
//         ['7', 'Overseas Investment (INR Crores)', '7_overseas'],
//         ['8', 'Total Carbon Emitted (Tonne)', '8_totalCarbon'],
//         ['9', 'Expenditure on Community welfare (INR Crores) ', '9_expenditure'],
//     ];

//     const part1 = fullData.filter(([num]) => parseFloat(num) <= 5);
//     const part2 = fullData.filter(([num]) => parseFloat(num) > 5);

//     const renderStepContent = () => {
//         const progress = ((currentStep - 1) / 4) * 100;
//         return (
//             <div className="form-step">
//                 <div className="progress-bar">
//                     <div className="progress" style={{ width: `${progress}%` }}></div>
//                 </div>

//                 {currentStep === 1 && (
//                     <div>
//                         <h3 className="step-title">Step 1: Organization Details</h3>
//                         <div className="form-group">
//                             <label>Organisation Name <span className="text-red">*</span></label>
//                             <input
//                                 type="text"
//                                 name="Organisationname"
//                                 value={formData.Organisationname}
//                                 onChange={(e) => {
//                                     const value = e.target.value;
//                                     if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
//                                         handleChange('Organisationname', value);
//                                     }
//                                 }}
//                                 className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
//                             />
//                             {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
//                         </div>
//                         <div className="form-group">
//                             <label>Select Category<span className="text-red">*</span></label>
//                             <select
//                                 name="category"
//                                 value={formData.category}
//                                 onChange={(e) => handleChange('category', e.target.value)}
//                                 className={`form-input ${!formData.category && currentStep === 1 ? 'has-error' : ''}`}
//                             >
//                                 <option value="">Select Category</option>
//                                 <option value="Exploration Company of the Year">Exploration Company of the Year</option>
//                                 <option value="Oil & gas Production Company of the year (<1 MMTOE)">Oil & gas Production Company of the year Less than 1 MTOE</option>
//                                 <option value="Oil & gas Production Company of the year (>=1 MMTOE)">Oil & gas Production Company of the year More than or equal to 1 MMTOE</option>
//                                 <option value="Goal Net Zero Company of the Year">Goal Net Zero Company of the Year</option>
//                                 <option value="Green Hydrogen Company of the Year">Green Hydrogen Company of the Year</option>
//                                 <option value="Overseas Oil & Gas Company of the Year">Overseas Oil & Gas Company of the Year</option>
//                                 <option value="Digital Technology Provider of the Year">Digital Technology Provider of the Year</option>
//                                 <option value="Service Provider of the Year">Service Provider of the Year</option>
//                                 <option value="Pipeline Transportation Company of the Year">Pipeline Transportation Company of the Year</option>
//                                 <option value="Oil Marketing Company of the Year">Oil Marketing Company of the Year</option>
//                                 <option value="Human Resource Management">Human Resource Management</option>
//                                 <option value="CBG Company of the Year">CBG Company of the Year</option>
//                                 <option value="CGD Company of the Year">CGD Company of the Year</option>
//                                 <option value="Best Managed Project of the Year">Best Managed Project of the Year</option>
//                                 <option value="Refinery of the Year">Refinery of the Year</option>
//                                 <option value="Innovator of the year (team)">Innovator of the year (team)</option>
//                                 <option value="Woman Executive of the Year">Woman Executive of the Year</option>
//                                 <option value="Young Achiever of the Year(Male)">Young Achiever of the Year(Male)</option>
//                                 <option value="Young Achiever of the Year(Female)">Young Achiever of the Year(Female)</option>
//                             </select>
//                             {!formData.category && currentStep === 1 && <span className="error-tooltip">Category is required</span>}
//                         </div>
//                         <div className="form-group">
//                             <label>Postal Address <span className="text-red">*</span></label>
//                             <textarea
//                                 name="mailingAddress"
//                                 value={formData.mailingAddress}
//                                 onChange={(e) => handleChange('mailingAddress', e.target.value)}
//                                 className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1 ? 'has-error' : ''}`}
//                                 rows={3}
//                                 placeholder="Enter Postal address"
//                             />
//                             {!formData.mailingAddress.trim() && currentStep === 1 && <span className="error-tooltip">Mailing address is required</span>}
//                         </div>
//                     </div>
//                 )}

//                 {currentStep === 2 && (
//                     <div>
//                         <h3 className="step-title">Step 2: Authority & Contact Details</h3>
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                             <div className="step-section">
//                                 <h4>Approving Authority</h4>
//                                 <div className="form-group">
//                                     <label>Name <span className="text-red">*</span></label>
//                                     <input
//                                         type="text"
//                                         name="authorityName"
//                                         value={formData.authorityName}
//                                         onChange={(e) => {
//                                             const value = e.target.value;
//                                             if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
//                                                 handleChange('authorityName', value);
//                                             }
//                                         }}
//                                         className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
//                                         placeholder="Name"
//                                     />
//                                     {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Authority name is required</span>}
//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         name="authorityTitle"
//                                         value={formData.authorityTitle}
//                                         onChange={(e) => {
//                                             const value = e.target.value;
//                                             if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
//                                                 handleChange('authorityTitle', value);
//                                             }
//                                         }}
//                                         className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
//                                         placeholder="Designation"
//                                     />
//                                     {!formData.authorityTitle && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="tel"
//                                         name="authorityPhone"
//                                         value={formData.authorityPhone}
//                                         onChange={(e) => handleChange('authorityPhone', e.target.value)}
//                                         className={`form-input ${error ? 'has-error' : ''}`}
//                                         placeholder="Phone number"
//                                         maxLength={10}
//                                     />
//                                     {error && <span className="error-tooltip">{error}</span>}
//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="email"
//                                         name="authorityEmail"
//                                         value={formData.authorityEmail}
//                                         onChange={(e) => handleChange('authorityEmail', e.target.value)}
//                                         className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
//                                         placeholder="E-mail address"
//                                     />
//                                     {!formData.authorityEmail && currentStep === 2 && <span className="error-tooltip">Email is required</span>}
//                                 </div>
//                             </div>
//                             <div className="step-section">
//                                 <h4>Contacts (Nodal Officials) <span className="text-red">*</span></h4>
//                                 <div className="form-group">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             name="copyApplicantData"
//                                             checked={copyApplicantData}
//                                             onChange={(e) => {
//                                                 setCopyApplicantData(e.target.checked);
//                                                 if (e.target.checked) {
//                                                     setFormData({
//                                                         ...formData,

//                                                         contactEmail: formData.authorityEmail || '',
//                                                         contactPhone: formData.authorityPhone || '',
//                                                     });
//                                                 } else {
//                                                     setFormData({
//                                                         ...formData,

//                                                         contactEmail: '',
//                                                         contactPhone: '',
//                                                     });
//                                                 }
//                                             }}
//                                             className="form-checkbox"
//                                         /> Same as applicant
//                                     </label>
//                                 </div>
//                                 <div className="form-group">


//                                     <input
//                                         type="text"
//                                         name="contactName"
//                                         value={formData.contactName}
//                                         onChange={(e) => {
//                                             const value = e.target.value;
//                                             if (/^[A-Za-z\s]*$/.test(value)) {
//                                                 handleChange('contactName', value);
//                                             }
//                                         }}
//                                         className="form-input"
//                                         placeholder="Name"
//                                     />



//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="tel"
//                                         name="contactPhone"
//                                         value={formData.contactPhone}
//                                         onChange={(e) => handleChange('contactPhone', e.target.value)}
//                                         className="form-input"
//                                         placeholder="Phone number"
//                                         maxLength={10}
//                                         disabled={copyApplicantData}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="email"
//                                         name="contactEmail"
//                                         value={formData.contactEmail}
//                                         onChange={(e) => handleChange('contactEmail', e.target.value)}
//                                         className="form-input"
//                                         placeholder="E-mail address"
//                                         disabled={copyApplicantData}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <label>Company Profile and Activities (2024–25)</label>
//                             <p className="note">Write-up (max 300 words) — Operations during 2024–25</p>
//                             <textarea
//                                 name="companyProfile"
//                                 value={formData.companyProfile}
//                                 onChange={(e) => handleChange('companyProfile', e.target.value)}
//                                 className="form-textarea"
//                                 rows={6}
//                                 maxLength={300}
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {currentStep === 3 && (
//                     <div>
//                         <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>S.No</th>
//                                     <th>Particulars</th>
//                                     <th>2024–25</th>
//                                     <th>2023–24</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {part1.map(([num, label, key]) => (
//                                     <tr key={key}>
//                                         <td>{num}</td>
//                                         <td>{label}</td>
//                                         <td>
//                                             <input
//                                                 type="number"
//                                                 value={formData[key][0] || ''}
//                                                 onChange={(e) => handleChange(key, e.target.value, 0)}
//                                                 className="form-input"
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="number"
//                                                 value={formData[key][1] || ''}
//                                                 onChange={(e) => handleChange(key, e.target.value, 1)}
//                                                 className="form-input"
//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}

//                 {currentStep === 4 && (
//                     <div>
//                         <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>S.No</th>
//                                     <th>Particulars</th>
//                                     <th>2024–25</th>
//                                     <th>2023–24</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {part2.map(([num, label, key]) => (
//                                     <tr key={key}>
//                                         <td>{num}</td>
//                                         <td>{label}</td>
//                                         <td>
//                                             <input
//                                                 type="number"
//                                                 value={formData[key][0] || ''}
//                                                 onChange={(e) => handleChange(key, e.target.value, 0)}
//                                                 className="form-input"
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="number"
//                                                 value={formData[key][1] || ''}
//                                                 onChange={(e) => handleChange(key, e.target.value, 1)}
//                                                 className="form-input"
//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>


//                         <div className="step-section">
//                             <div className="form-group">
//                                 <label>Comments</label>
//                                 <textarea
//                                     name="comment"
//                                     value={formData.comment}
//                                     onChange={(e) => handleChange('comment', e.target.value)}
//                                     className="form-textarea"
//                                     maxLength={300}
//                                     placeholder="Comments in (200 words) against input parameter, if any"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {currentStep === 5 && (
//                     <div className="form-step">
//                         <h3 className="step-title">Step 5: Attachments & Declaration</h3>
//                         <div className="form-group">
//                             <label>List of Attachments (Optional):</label>
//                             <table className="quant-table">
//                                 <thead>
//                                     <tr>
//                                         <th>S. No.</th>
//                                         <th>Description</th>
//                                         <th>Upload (only jpg, png, pdf, max 5 MB each)</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {[1, 2, 3, 4].map((num) => {
//                                         const key = `attachments${num}`;
//                                         const attachment = formData[key];
//                                         return (
//                                             <tr key={key}>
//                                                 <td>{num}</td>
//                                                 <td>
//                                                     <input
//                                                         type="text"
//                                                         name={`${key}.description`}
//                                                         value={attachment.description}
//                                                         onChange={(e) =>
//                                                             handleAttachmentChange(key, 'description', e.target.value)
//                                                         }
//                                                         placeholder="Enter description"
//                                                         className="form-input"
//                                                     />
//                                                 </td>
//                                                 <td>
//                                                     <input
//                                                         type="file"
//                                                         accept=".jpg,.png,.pdf"
//                                                         onChange={(e) =>
//                                                             handleAttachmentChange(key, 'file', e.target.files[0], e)
//                                                         }
//                                                         className="form-input mt-4"
//                                                     />
//                                                     {attachment.file && (
//                                                         <p className="file-name">Selected file: {attachment.file.name}</p>
//                                                     )}
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>


//                         <div className="form-group">
//                             <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
//                             <div className="form-navigation">
//                                 <button type="button" onClick={handlePrint} className="btn btn-outline">
//                                     Print
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <label>Upload Document with Approving Authority Signature (Director/Board Level)<span className="text-red">*</span>:</label>
//                             <input
//                                 type="file"
//                                 accept=".jpg,.png,.pdf"
//                                 onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
//                                 className="form-input mt-4"
//                             />
//                             {formData.approvingAuthoritySignature && (
//                                 <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
//                             )}
//                             {error && <span className="error-tooltip">{error}</span>}
//                         </div>
//                         <div className="form-group">
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     name="declaration"
//                                     checked={formData.declaration}
//                                     onChange={(e) => handleChange('declaration', e.target.checked)}
//                                     className="form-checkbox"
//                                 />
//                                 I declare that the information submitted is true and complete.


//                             </label>
//                             <div className="notes">
//                                 <p>Notes/ Definition:</p>
//                                 <ol type="a">
//                                     <li> INR / USD as on 31.03.2025 (85.424)</li>
//                                     <li> 1 Tonne of oil equivalent to 7.5 bbl of oil</li>
//                                     <li> MTOE: Million Tonne of Oil Equivalent. For this calculation 1 BCM of natural gas is equivalent to 1 MMT of Oil</li>
//                                     <li> Finding cost (INR/MTOE): Cost of finding oil and gas reserves added via exploration drilling activities, exclusive of land acquisition cost: (total cost incurred (INR)/ reserves added (oil + oil eq. gas reserves) (MTOE)</li>
//                                 </ol>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         )
//     }

//     return (
//         <div className="application-form">
//             <div className="form-header">
//                 <h1>
//                     Registration Form: {"Overseas Oil & Gas Company of the Year"}
//                 </h1>

//                 <h6>Step {currentStep} of 5</h6>
//             </div>
//             {error && <div className="error">{error}</div>}


//             {isSubmitted ? (
//                 <div className="thank-you-message">
//                     <h2>Thank you for your submission!</h2>
//                     <p>Your registration has been successfully submitted.</p>
//                     <button onClick={() => setIsSubmitted(false)}>Submit Another Response</button>
//                 </div>
//             ) : (
//                 <form onSubmit={handleSubmit}>
//                     {renderStepContent()}
//                     {currentStep === 1 && (
//                         <div className="form-navigation-step1">
//                             <button type="button" onClick={saveDraft} className="btn btn-outline">
//                                 <Save size={16} /> Save Draft
//                             </button>
//                             <button type="button" onClick={nextStep} className="btn btn-primary">
//                                 Next <ChevronRight size={16} />
//                             </button>
//                         </div>
//                     )}
//                     {currentStep > 1 && (
//                         <div className="form-navigation">
//                             <button type="button" onClick={prevStep} className="btn btn-outline">
//                                 <ChevronLeft size={16} /> Previous
//                             </button>
//                             <button type="button" onClick={saveDraft} className="btn btn-outline">
//                                 <Save size={16} /> Save Draft
//                             </button>
//                             {currentStep < 5 && (
//                                 <button type="button" onClick={nextStep} className="btn btn-primary">
//                                     Next <ChevronRight size={16} />
//                                 </button>
//                             )}
//                             {currentStep === 5 && (
//                                 <button type="submit" className="btn btn-success">
//                                     Submit
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </form>
//             )}
//         </div>
//     );
// };

// export default RegistrationOverseas;



import React, { useState, useEffect, useCallback } from 'react';
// import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';
import SidebarGuideline from "./SidebarGuideline"
import TextField from "@mui/material/TextField";

// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const COMMENT_MAX_LENGTH = 300;
const COMPANY_PROFILE_MAX_LENGTH = 2400;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const RegistrationOverseas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const awardTitle = location.state?.awardTitle || 'Overseas Oil & Gas Company of the Year';

  // Form state initialization
  const [formData, setFormData] = useState({
    Organisationname: '',
    category: 'Overseas Oil & Gas Company of the Year',
    mailingAddress: '',
    authorityName: '',
    authorityTitle: '',
    authorityPhone: '',
    authorityEmail: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    companyProfile: '',
    declaration: false,
    approvingAuthoritySignature: null,
    comment: '',
    totalOil2024: '',
    totalOil2023: '',
    totalGas2024: '',
    totalGas2023: '',
    twoPOil2024: '',
    twoPOil2023: '',
    twoPGas2024: '',
    twoPGas2023: '',
    netProfit2024: '',
    netProfit2023: '',
    annualTurnover2024: '',
    annualTurnover2023: '',
    overseasInvestment2024: '',
    overseasInvestment2023: '',
    totalCarbon2024: '',
    totalCarbon2023: '',
    expenditureCommunity2024: '',
    expenditureCommunity2023: '',
    attachments1: { description: '', file: null },
    attachments2: { description: '', file: null },
    attachments3: { description: '', file: null },
    attachments4: { description: '', file: null },
    projectName1: '',
    location1: '',
    capacity1: '',
    projectCompletionYear1: '',
    projectCurrentStatus1: '',
    projectName2: '',
    location2: '',
    capacity2: '',
    projectCompletionYear2: '',
    projectCurrentStatus2: '',
    projectName3: '',
    location3: '',
    capacity3: '',
    projectCompletionYear3: '',
    projectCurrentStatus3: '',
    projectName4: '',
    location4: '',
    capacity4: '',
    projectCompletionYear4: '',
    projectCurrentStatus4: '',
    projectName5: '',
    location5: '',
    capacity5: '',
    projectCompletionYear5: '',
    projectCurrentStatus5: '',
  });

  // UI State

    const serializeFormForStorage = (fd) => {
      const clone = { ...fd };
      // Convert File objects to simple meta (name & type) so JSON.stringify won't throw.
      if (clone.approvingAuthoritySignature instanceof File) {
        clone.approvingAuthoritySignature = {
          name: clone.approvingAuthoritySignature.name,
          type: clone.approvingAuthoritySignature.type,
        };
      }
      for (let i = 1; i <= 4; i++) {
        const key = `attachments${i}`;
        if (clone[key] && clone[key].file instanceof File) {
          clone[key] = {
            ...clone[key],
            file: {
              name: clone[key].file.name,
              type: clone[key].file.type,
            },
          };
        }
      }
      return clone;
    };
  
    useEffect(() => {
      try {
        const stored = sessionStorage.getItem("user_info");
        if (stored) {
          const user = JSON.parse(stored);
          setFormData((prev) => ({
            ...prev,
            userid: user.id || "",
            firstname: user.first_name || "",
            lastname: user.last_name || "",
            company_name: user.organisation_name || "",
            Organisationname: user.organisation_name || "", // prefill organisation_name field
            // Fill applicant_* only (we DON'T prefill contact_* here)
            applicant_name: user.applicant_name || "",
            applicant_phone: user.applicant_phone || "",
            applicant_email: user.email || "",
          }));
        }
      } catch (err) {
        console.warn("Failed to parse user_info from localStorage:", err);
      }
  
      // ⭐ ADDED - If dashboard pushed a prefill payload (when user clicked Continue),
      // use it to prefill the form. This key is written by ApplicantDashboard when user continues.
      try {
        const prefillRaw = sessionStorage.getItem('registrationOverseas_prefill');
        if (prefillRaw) {
          const prefill = JSON.parse(prefillRaw);
          if (prefill && typeof prefill === 'object') {
            setFormData((prev) => ({ ...prev, ...prefill }));
            if (prefill.step) setCurrentStep(Number(prefill.step));
          }
          // remove after consuming so it doesn't override later edits
          sessionStorage.removeItem('registrationOverseas_prefill');
        }
      } catch (err) {
        // ignore parse errors
      }
  
      // Note: we avoid loading large File objects here — the draft loader below (in another effect) may populate non-file fields.
    }, []);


  const [currentStep, setCurrentStep] = useState(1);
  const [copyApplicantData, setCopyApplicantData] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Validation helpers
  const validateEmail = (email) => emailRegex.test(email);
  const validatePhone = (phone) => phoneRegex.test(phone);

  // Clear error on field
  const clearFieldError = useCallback((field) => {
    setFieldErrors((prev) => {
      if (prev[field]) {
        const { [field]: omitted, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);
    useEffect(() => {
      try {
        const draftRaw = localStorage.getItem('registrationOverseasDraft');
        if (draftRaw) {
          const draft = JSON.parse(draftRaw);
          if (draft?.formData && typeof draft.formData === 'object') {
            setFormData((prev) => ({ ...prev, ...draft.formData }));
          }
          if (draft?.step) {
            // ensure step is within 1..5
            const s = Number(draft.step);
            if (!isNaN(s) && s >= 1 && s <= 5) setCurrentStep(s);
          }
        }
      } catch (err) {
        console.warn('Failed to load draft from localStorage', err);
      }
    }, []);

  // Handle changes for inputs/textareas/selects
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if ([1, 2, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (name === 'companyProfile') applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
      else if (name === 'comment') applicableMaxLength = COMMENT_MAX_LENGTH;

      if ((type === 'text' || e.target.tagName === 'TEXTAREA') && value.length > applicableMaxLength) {
        alert(`Your value does not exceed more than ${applicableMaxLength} characters.`);
        return;
      } else {
        clearFieldError(name);
      }
      if (name === 'authorityPhone' || name === 'contactPhone') {
        const numericValue = value.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH);
        if (numericValue.length > PHONE_MAX_LENGTH) {
          alert('Phone number must not exceed 10 digits.');
          return;
        }
        setFormData((prev) => ({
          ...prev,
          [name]: numericValue,
        }));
        clearFieldError(name);
        return;
      }


    } else {
      clearFieldError(name);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'Organisationname' && value && currentStep === 1) setError('');
    if (name === 'mailingAddress' && value.trim() && currentStep === 1) setError('');
  };

  // Handle checkbox for copying applicant data
  const handleCopyApplicantToggle = (e) => {
    const checked = e.target.checked;
    setCopyApplicantData(checked);

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        contactName: prev.authorityName,     // ✅ camelCase
        contactEmail: prev.authorityEmail,   // ✅ camelCase
        contactPhone: prev.authorityPhone,   // ✅ camelCase
      }));

      clearFieldError('contactName');
      clearFieldError('contactEmail');
      clearFieldError('contactPhone');
    } else {
      setFormData((prev) => ({
        ...prev,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
      }));
    }
  };


  // Handle attachment changes
  const handleAttachmentChange = (key, field, value, event = null) => {
    if (field === 'file' && value) {
      const file = value;
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, and PDF files are allowed for attachments.');
        if (event) event.target.value = null;
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert('File size must not exceed 5 MB for attachments.');
        if (event) event.target.value = null;
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
    clearFieldError(key);
  };

  // Handle approving authority signature upload
  const handleApprovingAuthorityChange = (files) => {
    const file = files[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, and PDF files are allowed for the signature.');
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert('File size must not exceed 5 MB for the signature.');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        approvingAuthoritySignature: file,
      }));
      clearFieldError('approvingAuthoritySignature');
    }
  };

  // Print form handler
  const handlePrint = () => {
    const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
      <h2>Organization & Contact Details</h2>
      <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
      <p><strong>Postal Address:</strong> ${formData.mailingAddress || ''}</p>
      <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
      <p><strong>Authority Title:</strong> ${formData.authorityTitle || ''}</p>
      <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
      <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>
            <h2>Contacts Nodal Officials</h2>
      <p><strong>Contact Name:</strong> ${formData.contactName || ''}</p>
      <p><strong>Contact Phone:</strong> ${formData.contactPhone || ''}</p>
      <p><strong>Contact Email:</strong> ${formData.contactEmail || ''}</p>
      <h2>Company Profile</h2>
      <p>${formData.companyProfile || ''}</p>
      <h2>Quantitative Information</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
            <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
            <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
          </tr>
        </thead>
        <tbody>
          ${quantitativeData.map(({ num, title, key2024, key2023 }) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${num}</td>
              <td style="border: 1px solid #000; padding: 8px;">${title}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[key2024] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[key2023] || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <h2>Projects :</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Project Name</th>
            <th style="border: 1px solid #000; padding: 8px;">Location</th>
            <th style="border: 1px solid #000; padding: 8px;">Capacity (MTOE)</th>
            <th style="border: 1px solid #000; padding: 8px;">Completion Year</th>
            <th style="border: 1px solid #000; padding: 8px;">Current Status</th>
          </tr>
        </thead>
        <tbody>
          ${[1, 2, 3, 4, 5].map(i => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${i}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`projectName${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`location${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`capacity${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`projectCompletionYear${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`projectCurrentStatus${i}`] || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <h2>Attachments</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Description</th>
            <th style="border: 1px solid #000; padding: 8px;">File Name</th>
          </tr>
        </thead>
        <tbody>
          ${[1, 2, 3, 4].map(i => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${i}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].description || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].file?.name || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <h2>Comments</h2>
      <p>${formData.comment || ''}</p>
      <h2>Declaration</h2>
      <p>I declare that the information submitted is true and complete.</p>
    </div>
  `;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  }
  useEffect(() => {
    // Scroll window to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const hasEmptyFields = (keys) => {
    for (const key of keys) {
      // If field is an array (like [value1, value2]), validate all elements
      const val = formData[key];
      if (Array.isArray(val)) {
        if (val.some(v => v === '' || v === null || v === undefined)) {
          return true;
        }
      } else if (val === '' || val === null || val === undefined) {
        return true;
      }
    }
    return false;
  };

  // Navigation handlers
  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.Organisationname) {
        alert('Organisation name is required.');
        return;
      }
      if (!formData.mailingAddress.trim()) {
        alert('Mailing address is required.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.authorityName) {
        alert('Authority name is required.');
        return;
      }
      if (!formData.authorityTitle) {
        alert('Authority Designation is required.');
        return;
      }
      if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
        alert('Please enter a valid Authority email.');
        return;
      }
      if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
        alert('Authority phone must be exactly 10 digits.');
        return;
      }
      if (!formData.contactName) {
        alert('Contact name is required.');
        return;
      }
      if (formData.contactEmail && !validateEmail(formData.contactEmail)) {
        alert('Please enter a valid Contact email.');
        return;
      }
      if (formData.contactPhone && !validatePhone(formData.contactPhone) && !copyApplicantData) {
        alert('Contact phone must be exactly 10 digits.');
        return;
      }
      if (!formData.companyProfile) {
        alert('Company Profile is required.');
        return;
      }
    }
    if (currentStep === 3 && hasEmptyFields(step3Keys)) {
      if (!window.confirm('Data not entered,If you wish to continue?')) {
        return;
      }


    }
    if (currentStep === 4 && hasEmptyFields(step3Keys)) {
      if (!window.confirm('Data not entered,If you wish to continue?')) {
        return;
      }


    }

    if (Object.values(fieldErrors).some(Boolean)) {
      alert('Please resolve all errors before continuing.');
      return;
    }

    setError('');
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // Save draft handler
   const handleSaveDraft = () => {
    try {
      const draftToStore = {
        formData: serializeFormForStorage(formData), // ⭐ ADDED - store a safe copy
        step: currentStep, // ⭐ ADDED - persist current step so user returns to same step
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem('registrationOverseasDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

  // Submit form handler
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.declaration) {
      return alert('Please accept the declaration.');
    }

    // 1️⃣ basic validation…
    if (!formData.Organisationname.trim()) return alert('Organisation is required');
    if (!formData.mailingAddress.trim()) return alert('Mailing address is required');
    if (!formData.authorityName.trim()) return alert('Authority name is required');
    if (!formData.approvingAuthoritySignature) return alert('Authority signature file is required');

    const fd = new FormData();

    // 2️⃣ scalar & file fields mapping
    const map = {
      Organisationname: 'organisation_name',
      category: 'category',
      companyName: 'company_name',
      mailingAddress: 'mailing_address',
      authorityName: 'authority_name',
      authorityTitle: 'authority_title',
      authorityPhone: 'authority_phone',
      authorityEmail: 'authority_email',
      approvingAuthoritySignature: 'approving_authority_file',
      contactName: 'contact_name',
      contactPhone: 'contact_phone',
      contactEmail: 'contact_email',
      companyProfile: 'company_profile',
      awardJustification: 'award_justification',
      comment: 'comment',
      declaration: 'declaration',
    };
    Object.entries(formData).forEach(([k, v]) => {
      const field = map[k];
      if (!field) return;
      fd.append(field, v instanceof File ? v : v || '');
    });

    // 3️⃣ quantitative pairs → two fields each
    const q = [
      ['1_totalOil', 'total_oil'],
      ['2_totalGas', 'total_gas'],
      ['3_2POil', 'reserve_2p_oil'],
      ['4_2PGas', 'reserve_2p_gas'],
      ['5_netProfit', 'net_profit'],
      ['6_annual', 'annual_turnover'],
      ['7_overseas', 'overseas_investment'],
      ['8_totalCarbon', 'total_carbon'],
      ['9_expenditure', 'community_expenditure'],
    ];
    q.forEach(([jsKey, djKey]) => {
      const [y24 = '', y23 = ''] = formData[jsKey] || [];
      fd.append(`${djKey}_2024`, y24);
      fd.append(`${djKey}_2023`, y23);
    });

    // 4️⃣ attachments: desc + file
    [1, 2, 3, 4].forEach(n => {
      const slot = formData[`attachments${n}`] || {};
      fd.append(`attachments${n}_desc`, slot.description || '');
      if (slot.file) fd.append(`attachments${n}`, slot.file);
    });


     try {
        localStorage.removeItem('registrationOverseasDraft');
      } catch (err) {
        // ignore
      }
    // // 5️⃣ post
    // try {
    //   const url = `${ACTIVE_API_BASE_URL}/overseas/`;
    //   const res = await fetch(url, {
    //     method: 'POST',
    //     body: fd
    //   });
    //   const data = await res.json();
    //   if (!res.ok) {
    //     console.error('API error:', data);
    //     return alert('Submission failed; check console.');
    //   }
    //   alert('Submitted successfully!');
    //   //… redirect or clear form …
    // } catch (err) {
    //   console.error('Network error:', err);
    //   alert('Network error; please retry.');
    // }
  };

  // Quantitative data for steps 3 and 4
  const quantitativeData = [
    { num: 1, title: 'Total oil production during the year (MMT)', key2024: 'totalOil2024', key2023: 'totalOil2023' },
    { num: 2, title: 'Total gas production during the year (BCM)', key2024: 'totalGas2024', key2023: 'totalGas2023' },
    { num: 3, title: '2P oil reserve accretion (MMT)', key2024: 'twoPOil2024', key2023: 'twoPOil2023' },
    { num: 4, title: '2P gas reserves accretion (BCM)', key2024: 'twoPGas2024', key2023: 'twoPGas2023' },
    { num: 5, title: 'Net Profit (INR Crores)', key2024: 'netProfit2024', key2023: 'netProfit2023' },
    { num: 6, title: 'Annual Turnover (INR Crores)', key2024: 'annualTurnover2024', key2023: 'annualTurnover2023' },
    { num: 7, title: 'Overseas Investment (INR Crores)', key2024: 'overseasInvestment2024', key2023: 'overseasInvestment2023' },
    { num: 8, title: 'Total Carbon Emitted (Tonne)', key2024: 'totalCarbon2024', key2023: 'totalCarbon2023' },
    { num: 9, title: 'Expenditure on Community welfare (INR Crores)', key2024: 'expenditureCommunity2024', key2023: 'expenditureCommunity2023' },
  ];
  const step3Keys = quantitativeData.slice(0, 5).flatMap(item => [item.key2024, item.key2023]);

  // For step 4 inputs
  const step4QuantKeys = quantitativeData.slice(5, 9).flatMap(item => [item.key2024, item.key2023]);
  // Plus project fields for step 4
  const projectKeys = [1, 2, 3, 4, 5].flatMap(i => [
    `projectName${i}`, `location${i}`, `capacity${i}`, `projectCompletionYear${i}`, `projectCurrentStatus${i}`
  ]);
  const step4Keys = [...step4QuantKeys, ...projectKeys];

  // Rendering steps content
  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;

    const renderSection = (section) =>
      section.subItems.map((item, index) => {
        const key2024 = item.key2024 || item.key; // or adjust as needed
        const key2023 = item.key2023 || (item.key ? item.key.replace('2024', '2023') : '');

        return (
          <tr key={item.num}>
            {index === 0 && (
              <>
                <td rowSpan={section.subItems.length} className="sno-cell">{section.num}</td>
                <td rowSpan={section.subItems.length} className="title-cell"><strong>{section.title}</strong></td>
              </>
            )}
            <td className="sno-cell">{item.num}</td>
            <td className="label-cell">{item.label}</td>
            <td>
              <input
                type="number"
                name={key2024}
                value={formData[key2024] || ''}
                min="0"
                className="form-input no-spinner"
                aria-describedby={`${key2024}-error`}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val.startsWith('-') && !val.toLowerCase().includes('e')) handleChange(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e' || e.key === 'E') e.preventDefault();
                }}
              />
              {fieldErrors[key2024] && (
                <span className="error-tooltip" id={`${key2024}-error`} role="alert">{fieldErrors[key2024]}</span>
              )}
            </td>
            <td>
              <input
                type="number"
                name={key2023}
                value={formData[key2023] || ''}
                min="0"
                className="form-input no-spinner"
                aria-describedby={`${key2023}-error`}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val.startsWith('-') && !val.toLowerCase().includes('e')) handleChange(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e' || e.key === 'E') e.preventDefault();
                }}
              />
              {fieldErrors[key2023] && (
                <span className="error-tooltip" id={`${key2023}-error`} role="alert">{fieldErrors[key2023]}</span>
              )}
            </td>
          </tr>
        );
      });


    return (
      <div className="form-step" role="form" aria-label={`Step ${currentStep} of 5`}>
        <div className="progress-bar" aria-hidden="true">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>

        {currentStep === 1 && (
          <>
            <h3 className="step-title">Step 1: Organization Details</h3>

            <div className="form-group">
              <label htmlFor="Organisationname">
                Organisation Name <span aria-hidden="true" className="text-red">*</span>
              </label>
              <input
                id="Organisationname"
                name="Organisationname"
                type="text"
                maxLength={FIELD_MAX_LENGTH}
                value={formData.Organisationname}
                onChange={handleChange}
                aria-describedby="Organisationname-error"
                className="form-input"
                placeholder="Enter organisation name"
                required
              />
              {fieldErrors.Organisationname && (
                <span className="error-tooltip" id="Organisationname-error" role="alert">
                  {fieldErrors.Organisationname}
                </span>
              )}
              {!formData.Organisationname && currentStep === 1 && (
                <span className="error-tooltip" id="Organisationname-error" role="alert">
                  Organisation name is required
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mailingAddress">
                Postal Address <span aria-hidden="true" className="text-red">*</span>
              </label>
              <textarea
                id="mailingAddress"
                name="mailingAddress"
                value={formData.mailingAddress}
                rows={3}
                maxLength={FIELD_MAX_LENGTH}
                onChange={handleChange}
                aria-describedby="mailingAddress-error"
                placeholder="Enter postal address"
                className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1 ? 'has-error' : ''}`}
                required
              />
              {fieldErrors.mailingAddress && (
                <span className="error-tooltip" id="mailingAddress-error" role="alert">
                  {fieldErrors.mailingAddress}
                </span>
              )}
              {!formData.mailingAddress.trim() && currentStep === 1 && (
                <span className="error-tooltip" id="mailingAddress-error" role="alert">
                  Mailing address is required
                </span>
              )}
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3 className="step-title">Step 2: Approving Authority & Contact</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section aria-labelledby="approving-authority-heading" className="step-section">
                <h4 id="approving-authority-heading">Approving Authority</h4>

                <div className="form-group">
                  <label htmlFor="authorityName">
                    Name <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="authorityName"
                    name="authorityName"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.authorityName}
                    onChange={handleChange}
                    aria-describedby="authorityName-error"
                    placeholder="Name"
                    className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
                    required
                  />
                  {fieldErrors.authorityName && (
                    <span className="error-tooltip" id="authorityName-error" role="alert">
                      {fieldErrors.authorityName}
                    </span>
                  )}
                  {!formData.authorityName && currentStep === 2 && (
                    <span className="error-tooltip" id="authorityName-error" role="alert">
                      Name is required
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="authorityTitle">
                    Designation <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="authorityTitle"
                    name="authorityTitle"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.authorityTitle}
                    onChange={handleChange}
                    aria-describedby="authorityTitle-error"
                    placeholder="Designation"
                    className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
                    required
                  />
                  {fieldErrors.authorityTitle && (
                    <span className="error-tooltip" id="authorityTitle-error" role="alert">
                      {fieldErrors.authorityTitle}
                    </span>
                  )}
                  {!formData.authorityTitle && currentStep === 2 && (
                    <span className="error-tooltip" id="authorityTitle-error" role="alert">
                      Designation is required
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="authorityPhone">
                    Phone <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="authorityPhone"
                    name="authorityPhone"
                    type="tel"
                    maxLength={PHONE_MAX_LENGTH}
                    value={formData.authorityPhone}
                    onChange={handleChange}
                    aria-describedby="authorityPhone-error"
                    placeholder="10-digit phone number"
                    className={`form-input ${!formData.authorityPhone && currentStep === 2 ? 'has-error' : ''}`}
                    required
                  />
                  {fieldErrors.authorityPhone && (
                    <span className="error-tooltip" id="authorityPhone-error" role="alert">
                      {fieldErrors.authorityPhone}
                    </span>
                  )}
                  {!formData.authorityPhone && currentStep === 2 && (
                    <span className="error-tooltip" id="authorityPhone-error" role="alert">
                      Phone is required
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="authorityEmail">
                    Email <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="authorityEmail"
                    name="authorityEmail"
                    type="email"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.authorityEmail}
                    onChange={handleChange}
                    aria-describedby="authorityEmail-error"
                    placeholder="Approving authority's email"
                    className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
                    required
                  />
                  {fieldErrors.authorityEmail && (
                    <span className="error-tooltip" id="authorityEmail-error" role="alert">
                      {fieldErrors.authorityEmail}
                    </span>
                  )}
                  {!formData.authorityEmail && currentStep === 2 && (
                    <span className="error-tooltip" id="authorityEmail-error" role="alert">
                      Email is required
                    </span>
                  )}
                </div>
              </section>

              <section aria-labelledby="contacts-heading" className="step-section">
                <h4 id="contacts-heading">Contacts (Nodal Officials) <span aria-hidden="true" className="text-red">*</span></h4>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="copyApplicantData"
                      checked={copyApplicantData}
                      onChange={handleCopyApplicantToggle}
                      className="form-checkbox"
                    />{' '}
                    Same as applicant
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="contactName">
                    Name <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Contact name"
                    disabled={copyApplicantData} // This disables the input when copyApplicantData is true
                    className={`form-input ${!formData.contactName && currentStep === 2 ? 'has-error' : ''}`}
                    aria-describedby="contactName-error"
                    required
                  />
                  {fieldErrors.contactName && (
                    <span className="error-tooltip" id="contactName-error" role="alert">
                      {fieldErrors.contactName}
                    </span>
                  )}
                  {!formData.contactName && currentStep === 2 && (
                    <span className="error-tooltip" id="contactName-error" role="alert">
                      Name is required
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contactPhone">Phone</label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    maxLength={PHONE_MAX_LENGTH}
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="10-digit contact phone"
                    disabled={copyApplicantData}
                    className={`form-input ${fieldErrors.contactPhone ? 'has-error' : ''}`}
                    aria-describedby="contactPhone-error"
                    pattern="\d{10}" // Enforce 10-digit number
                  />
                  {fieldErrors.contactPhone && (
                    <span className="error-tooltip" id="contactPhone-error" role="alert">
                      {fieldErrors.contactPhone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contactEmail">Email</label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="Contact email"
                    disabled={copyApplicantData}
                    className={`form-input ${fieldErrors.contactEmail ? 'has-error' : ''}`}
                    aria-describedby="contactEmail-error"
                  />
                  {fieldErrors.contactEmail && (
                    <span className="error-tooltip" id="contactEmail-error" role="alert">
                      {fieldErrors.contactEmail}
                    </span>
                  )}
                </div>
              </section>
            </div>

            <div className="form-group">
              <label htmlFor="companyProfile">Brief write up on company profile and the activities with specific reference to
                Development & Production operations in 2024 -25.</label>
              <p className="note">(within 300 words) </p>
              <textarea
                id="companyProfile"
                name="companyProfile"
                value={formData.companyProfile}
                rows={6}
                maxLength={COMPANY_PROFILE_MAX_LENGTH}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Enter company profile"
              />
              {fieldErrors.companyProfile && (
                <span className="error-tooltip" id="companyProfile-error" role="alert">
                  {fieldErrors.companyProfile}
                </span>
              )}
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
            <table className="quant-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Particulars</th>
                  <th>2024–25</th>
                  <th>2023–24</th>
                </tr>
              </thead>
              <tbody>
                {quantitativeData.slice(0, 5).map((item) => (
                  <tr key={item.num}>
                    <td className="sno-cell">{item.num}</td>
                    <td className="label-cell">{item.title}</td>
                    <td>
                      {/* <input
                        type="number"
                        name={item.key2024}
                        value={formData[item.key2024] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val.startsWith('-') && !val.toLowerCase().includes('e')) {
                            handleChange(e);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                            e.preventDefault();
                          }
                        }}
                        className="form-input no-spinner"
                        min="0"
                      /> */}
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text" // prevents browser spinners
                        name={item.key2024}
                        value={formData[item.key2024] || ""}
                        onChange={(e) => {
                          let val = e.target.value;

                          // Allow only digits and a single decimal point
                          val = val.replace(/[^0-9.]/g, "");
                          const parts = val.split(".");
                          if (parts.length > 2) {
                            val = parts[0] + "." + parts.slice(1).join("");
                          }

                          handleChange({
                            target: {
                              name: e.target.name,
                              value: val,
                            },
                          });
                        }}
                        onKeyDown={(e) => {
                          // block '-', '+', 'e', 'E', arrow keys
                          if (
                            ["-", "+", "e", "E"].includes(e.key) ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // disable mouse scroll increment
                        className="form-input no-spinner"
                        inputProps={{
                          inputMode: "decimal", // mobile numeric keypad
                          pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                          min: 0, // minimum value
                        }}
                      />
                    </td>
                    <td>
<TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text" // prevents browser spinners
                        name={item.key2023}
                        value={formData[item.key2023] || ""}
                        onChange={(e) => {
                          let val = e.target.value;

                          // Allow only digits and a single decimal point
                          val = val.replace(/[^0-9.]/g, "");
                          const parts = val.split(".");
                          if (parts.length > 2) {
                            val = parts[0] + "." + parts.slice(1).join("");
                          }

                          handleChange({
                            target: {
                              name: e.target.name,
                              value: val,
                            },
                          });
                        }}
                        onKeyDown={(e) => {
                          // block '-', '+', 'e', 'E', arrow keys
                          if (
                            ["-", "+", "e", "E"].includes(e.key) ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // disable mouse scroll increment
                        className="form-input no-spinner"
                        inputProps={{
                          inputMode: "decimal", // mobile numeric keypad
                          pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                          min: 0, // minimum value
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {currentStep === 4 && (
          <>
            <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
            <table className="quant-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Particulars</th>
                  <th>2024–25</th>
                  <th>2023–24</th>
                </tr>
              </thead>
              <tbody>
                {quantitativeData.slice(5, 9).map((item) => (
                  <tr key={item.num}>
                    <td className="sno-cell">{item.num}</td>
                    <td className="label-cell">{item.title}</td>
                    <td>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text" // prevents browser spinners
                        name={item.key2024}
                        value={formData[item.key2024] || ""}
                        onChange={(e) => {
                          let val = e.target.value;

                          // Allow only digits and one decimal point
                          val = val.replace(/[^0-9.]/g, "");
                          const parts = val.split(".");
                          if (parts.length > 2) {
                            val = parts[0] + "." + parts.slice(1).join("");
                          }

                          handleChange({
                            target: {
                              name: e.target.name,
                              value: val,
                            },
                          });
                        }}
                        onKeyDown={(e) => {
                          // block '-', '+', 'e', 'E', arrow keys
                          if (
                            ["-", "+", "e", "E"].includes(e.key) ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // prevent mouse scroll increment
                        className="form-input no-spinner"
                        inputProps={{
                          inputMode: "decimal", // mobile numeric keypad
                          pattern: "[0-9]*\\.?[0-9]*", // digits with optional decimal
                          min: 0, // minimum value
                        }}
                      />
                    </td>
                    <td>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text" // prevents browser spinners
                        name={item.key2023}
                        value={formData[item.key2023] || ""}
                        onChange={(e) => {
                          let val = e.target.value;

                          // Allow only digits and one decimal point
                          val = val.replace(/[^0-9.]/g, "");
                          const parts = val.split(".");
                          if (parts.length > 2) {
                            val = parts[0] + "." + parts.slice(1).join("");
                          }

                          handleChange({
                            target: {
                              name: e.target.name,
                              value: val,
                            },
                          });
                        }}
                        onKeyDown={(e) => {
                          // block '-', '+', 'e', 'E', arrow keys
                          if (
                            ["-", "+", "e", "E"].includes(e.key) ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // prevent mouse scroll increment
                        className="form-input no-spinner"
                        inputProps={{
                          inputMode: "decimal", // mobile numeric keypad
                          pattern: "[0-9]*\\.?[0-9]*", // digits with optional decimal
                          min: 0, // minimum value
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>




            <div className="form-group">
              <label htmlFor="comment">Comments</label>
              <textarea
                id="comment"
                name="comment"
                maxLength={COMMENT_MAX_LENGTH}
                value={formData.comment}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Comments in (200 words) against input parameter, if any"
                rows={4}
              />
              {fieldErrors.comment && (
                <span className="error-tooltip" id="comment-error" role="alert">
                  {fieldErrors.comment}
                </span>
              )}
            </div>
          </>
        )}

        {currentStep === 5 && (
          <>
            <h3 className="step-title">Step 5: Attachments & Declaration</h3>

            <div className="form-group">
              <label>List of Attachments (Optional):</label>
              <table className="quant-table">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Description</th>
                    <th>Upload (jpg, png, pdf; max 5 MB)</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((num) => {
                    const key = `attachments${num}`;
                    const attachment = formData[key];
                    return (
                      <tr key={key}>
                        <td>{num}</td>
                        <td>
                          <input
                            type="text"
                            name={`${key}.description`}
                            value={attachment.description}
                            onChange={(e) => handleAttachmentChange(key, 'description', e.target.value)}
                            placeholder="Enter description"
                            maxLength={FIELD_MAX_LENGTH}
                            className="form-input"
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) => handleAttachmentChange(key, 'file', e.target.files[0], e)}
                            className="form-input mt-4"
                          />
                          {attachment.file && (
                            <p className="file-name">Selected file: {attachment.file.name}</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="form-group">
              <label>
                Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span aria-hidden="true" className="text-red">*</span>
              </label>
              <div className="form-navigation">
                <button type="button" onClick={handlePrint} className="btn btn-outline">
                  Print Preview
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="approvingAuthoritySignature">
                Upload Document with Approving Authority Signature (Director/Board Level)<span aria-hidden="true" className="text-red">*</span>:
              </label>
              <input
                type="file"
                id="approvingAuthoritySignature"
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
                className={`form-input mt-4 ${fieldErrors.approvingAuthoritySignature ? 'has-error' : ''}`}
                aria-describedby="approvingAuthoritySignature-error"
                required
              />
              {formData.approvingAuthoritySignature && (
                <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
              )}
              {fieldErrors.approvingAuthoritySignature && (
                <span className="error-tooltip" id="approvingAuthoritySignature-error" role="alert">
                  {fieldErrors.approvingAuthoritySignature}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="declaration">
                <input
                  id="declaration"
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                  className={`form-checkbox ${fieldErrors.declaration ? 'has-error' : ''}`}
                  aria-describedby="declaration-error"
                  required
                />{' '}
                I declare that the information submitted is true and complete.
              </label>
              {fieldErrors.declaration && (
                <span className="error-tooltip" id="declaration-error" role="alert">
                  {fieldErrors.declaration}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="sidebar-guideline-container">
      <SidebarGuideline
        isOpen={true}
        sidebarItems={[{ id: 'Guideline', label: 'Guideline' }]}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        selectedAwardCategory={formData.category}
      />
      <div className="application-form">
        <div className="form-header">
          <h1>
            Category : {'Overseas Oil & Gas Company of the Year'}
          </h1>
          <h6>Step {currentStep} of 5</h6>
        </div>
        {error && <div className="error">{error}</div>}
        {isSubmitted ? (
          <div className="thank-you-message">
            <h2>Thank you for your submission!</h2>
            <p>Your registration has been successfully submitted.</p>
            <button onClick={() => setIsSubmitted(false)}>Submit Another Response</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            {currentStep === 1 && (
              <div className="form-navigation-step1">
                <button type="button" onClick={handleSaveDraft} className="btn btn-outline">
                  <Save size={16} /> Save Draft
                </button>
                <button type="button" onClick={nextStep} className="btn btn-primary">
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
            {currentStep > 1 && (
              <div className="form-navigation">
                <button type="button" onClick={prevStep} className="btn btn-outline">
                  <ChevronLeft size={16} /> Previous
                </button>
                <button type="button" onClick={handleSaveDraft} className="btn btn-outline">
                  <Save size={16} /> Save Draft
                </button>
                {currentStep < 5 && (
                  <button type="button" onClick={nextStep} className="btn btn-primary">
                    Next <ChevronRight size={16} />
                  </button>
                )}
                {currentStep === 5 && (
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={(e) => {
                      if (!window.confirm('Are you sure you want to submit?')) {
                        e.preventDefault();

                      }
                    }}
                  >
                    Submit
                  </button>

                )}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationOverseas;