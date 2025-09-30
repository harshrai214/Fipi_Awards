// // import React, { useState } from 'react';
// // import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// // import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import '../styles/FormProduction.css';

// // const RegistrationCBG = () => {
// //     const [currentStep, setCurrentStep] = useState(1);
// //     const [isSubmitted, setIsSubmitted] = useState(false);
// //     const [formData, setFormData] = useState({
// //         Organisationname: '',
// //         category: 'CBG Company of the Year',
// //         companyName: '',
// //         mailingAddress: '',
// //         authorityName: '',
// //         authorityTitle: '',
// //         authorityPhone: '',
// //         authorityEmail: '',
// //         authoritySignature: '',
// //         copyApplicantData: false,
// //         contactName: '',
// //         contactPhone: '',
// //         contactEmail: '',
// //         companyProfile: '',

// //         approvingAuthoritySignature: '',
// //         declaration: false,
// //         comment: '',
// //         // Quantitative fields
// //         retailOutlets2024: ['', ''],
// //         install2024: ['', ''],
// //         actual2024: ['', ''],
// //         safety2024: ['', ''],
// //         accident_rate2024: ['', ''],
// //         injury2024: ['', ''],
// //         incident_rate2024: ['', ''],
// //         lubricantsSales2024: ['', ''],
// //         patent2024: ['', ''],
// //         national2024: ['', ''],
// //         international2024: ['', ''],
// //         commercial2024: ['', ''],
// //         //attachments
// //         attachments1: { description: '', file: null },
// //         attachments2: { description: '', file: null },
// //         attachments3: { description: '', file: null },
// //         attachments4: { description: '', file: null },
// //     });
// //     const [error, setError] = useState('');
// //     const [copyApplicantData, setCopyApplicantData] = useState(false);
// //     const navigate = useNavigate();
// //     const location = useLocation();
// //     console.log('location.state:', location.state);
// //     const awardTitle = location.state?.awardTitle;

// //     const handleChange = (name, value, index = null) => {

// //         if (["Firstname", "Lastname", "authorityName", "contactName"].includes(name)) {
// //             const isValid = /^[A-Za-z\s]*$/.test(value);
// //             if (!isValid) return;
// //         }

// //         if (index !== null) {
// //             setFormData(prev => {
// //                 const updatedArray = [...prev[name]];
// //                 updatedArray[index] = value;
// //                 return {
// //                     ...prev,
// //                     [name]: updatedArray
// //                 };
// //             });
// //         } else {
// //             if (name === 'authorityPhone') {
// //                 const numericValue = value.replace(/\D/g, '').slice(0, 10);
// //                 setFormData(prev => ({ ...prev, [name]: numericValue }));
// //                 if (numericValue.length > 10) {
// //                     setError('Authority phone number must not exceed 10 digits.');
// //                 } else {
// //                     setError('');
// //                 }
// //             } else {
// //                 setFormData(prev => ({ ...prev, [name]: value }));
// //             }
// //         }

// //         if (name === 'Organisationname' && !value && currentStep === 1) {
// //             setError('Organisation name is required.');
// //         } else if (name === 'mailingAddress' && !value.trim() && currentStep === 1) {
// //             setError('Mailing address is required.');
// //         } else if (name === 'authorityName' && !value && currentStep === 2) {
// //             setError('Authority name is required.');
// //         } else if (name === 'authorityTitle' && !value && currentStep === 2) {
// //             setError('Authority designation is required.');
// //         } else {
// //             setError('');
// //         }
// //     };

// //     // const validateForm = () => {
// //     //     const errors = {};

// //     //     if (!formData.Organisationname?.trim()) {
// //     //         errors.Organisationname = 'Organisation name is required';
// //     //     }
// //     //     if (!formData.authorityName?.trim()) {
// //     //         errors.authorityName = 'Authority name is required';
// //     //     }
// //     //     if (!formData.authorityTitle?.trim()) {
// //     //         errors.authorityTitle = 'Authority Designation is required';
// //     //     }
// //     //     if (!formData.contactEmail?.trim()) {
// //     //         errors.contactEmail = 'Email is required';
// //     //     } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
// //     //         errors.contactEmail = 'Invalid email format';
// //     //     }

// //     //     return errors;
// //     // };

// //     const handleAttachmentChange = (key, field, value, event = null) => {
// //         if (field === 'file' && value) {
// //             const file = value;
// //             const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

// //             if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
// //                 setError('Only JPG, PNG, and PDF files are allowed for attachments.');
// //                 if (event) event.target.value = null; // Reset file input
// //                 return;
// //             }
// //             if (file.size > maxSizeInBytes) {
// //                 setError('File size must not exceed 5 MB for attachments.');
// //                 if (event) event.target.value = null; // Reset file input
// //                 return;
// //             }
// //             setError('');
// //         }

// //         setFormData((prev) => ({
// //             ...prev,
// //             [key]: {
// //                 ...prev[key],
// //                 [field]: value
// //             }
// //         }));
// //     };
// //     const nextStep = () => {
// //         if (currentStep === 1 && !formData.Organisationname) {
// //             setError('Organisation name is required.');
// //             return;
// //         }
// //         if (currentStep === 1 && !formData.mailingAddress.trim()) {
// //             setError('Mailing address is required.');
// //             return;
// //         }
// //         if (currentStep === 2 && !formData.authorityName) {
// //             setError('Authority name is required.');
// //             return;
// //         }
// //         if (currentStep === 2 && !formData.authorityTitle) {
// //             setError('Authority designation is required.');
// //             return;
// //         }
// //         setError('');
// //         if (currentStep < 5) {
// //             setCurrentStep(prev => prev + 1);
// //         }
// //     };

// //     const prevStep = () => {
// //         if (currentStep > 1) setCurrentStep(prev => prev - 1);
// //     };

// //     const saveDraft = () => {
// //         localStorage.setItem('registrationProductionDraft', JSON.stringify({ formData }));
// //         alert('Draft Saved!');
// //     };

// //     const handleApprovingAuthorityChange = (files) => {
// //         if (files && files.length > 0) {
// //             const file = files[0];
// //             const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

// //             if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
// //                 setError('Only JPG, PNG, and PDF files are allowed.');
// //                 return;
// //             }
// //             if (file.size > maxSizeInBytes) {
// //                 setError('File size must not exceed 5 MB.');
// //                 return;
// //             }
// //             setError('');
// //             setFormData(prev => ({ ...prev, approvingAuthoritySignature: file }));
// //         }
// //     };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   // 1) Declaration & phone validation
// //   if (!formData.declaration) {
// //     alert("Please accept the declaration.");
// //     return;
// //   }
// //   if ((formData.authorityPhone || "").length !== 10) {
// //     alert("Authority phone must be exactly 10 digits.");
// //     return;
// //   }

// //   // 2) Build FormData
// //   const fd = new FormData();

// //   // 2a) Flat fields → snake_case keys
// //   const flatMap = {
// //     organisation_name:    formData.Organisationname,
// //     category:             formData.category,
// //     company_name:         formData.companyName,
// //     mailing_address:      formData.mailingAddress,

// //     authority_name:       formData.authorityName,
// //     authority_title:      formData.authorityTitle,
// //     authority_phone:      formData.authorityPhone,
// //     authority_email:      formData.authorityEmail,

// //     contact_name:         formData.contactName,
// //     contact_phone:        formData.contactPhone,
// //     contact_email:        formData.contactEmail,

// //     company_profile:      formData.companyProfile,
// //     comment:              formData.comment,
// //     declaration:          String(formData.declaration),
// //   };

// //   Object.entries(flatMap).forEach(([key, val]) => {
// //     fd.append(key, val || "");
// //   });

// //   // 2b) Quantitative arrays: each state entry is [value2024, value2023]
// //   const metrics = [
// //     ["retail_outlets",    formData.retailOutlets2024],
// //     ["install_capacity",  formData.install2024],
// //     ["actual_prod",       formData.actual2024],
// //     ["safety_index",      formData.safety2024],
// //     ["accident_rate",     formData.accident_rate2024],
// //     ["lost_injury_rate",  formData.injury2024],
// //     ["incident_rate",     formData.incident_rate2024],
// //     ["lubricants_sales",  formData.lubricantsSales2024],
// //     ["patents_filed",     formData.patent2024],
// //     ["patents_national",  formData.national2024],
// //     ["patents_international", formData.international2024],
// //     ["patents_commercial",    formData.commercial2024],
// //   ];

// //   metrics.forEach(([base, arr2024]) => {
// //     // we stored both years in a two‑element array on state
// //     const [v24, v23] = arr2024 || ["",""];
// //     fd.append(`${base}_2024`, v24 || "");
// //     fd.append(`${base}_2023`, v23 || "");
// //   });

// //   // 2c) Files
// //   if (formData.approvingAuthoritySignature) {
// //     fd.append("approving_authority_file", formData.approvingAuthoritySignature);
// //   }
// //   [1,2,3,4].forEach(n => {
// //     const { description, file } = formData[`attachments${n}`] || {};
// //     if (file) {
// //       fd.append(`attachments${n}`, file);
// //       fd.append(`attachments${n}_desc`, description || "");
// //     }
// //   });

// //   // 3) Send
// //   try {
// //       const url = `${ACTIVE_API_BASE_URL}/registration-cbg/`;
// //       const res = await fetch(url, {
// //       method: "POST",
// //       body: fd
// //     });
// //     if (!res.ok) {
// //       const err = await res.text();
// //       console.error("Server error:", err);
// //       return alert("Submission failed. See console.");
// //     }
// //     await res.json();
// //     alert("Submitted successfully!");
// //     setIsSubmitted(true);
// //   } catch (err) {
// //     console.error("Network error:", err);
// //     alert("Network error. See console.");
// //   }
// // };


// //     const handlePrint = () => {
// //         const printContent = `
// //       <div style="font-family: Arial, sans-serif; padding: 20px;">
// //     <h1 style="text-align: center; color: #1e40af;">Registration Form: Digital Technology Provider of the Year</h1>
// //     <h2>Organization & Contact Details</h2>
// //     <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
// //     <p><strong>Category:</strong> ${formData.category || ''}</p>
// //     <p><strong>Mailing Address:</strong> ${formData.mailingAddress || ''}</p>
// //     <h2>Company Details</h2>
// //     <p><strong>Name of Company:</strong> ${formData.companyName || ''}</p>
// //     <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
// //     <p><strong>Authority Title:</strong> ${formData.authorityTitle || ''}</p>
// //     <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
// //     <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>
// //     <p><strong>Contact Name:</strong> ${formData.contactName || ''}</p>
// //     <p><strong>Contact Phone:</strong> ${formData.contactPhone || ''}</p>
// //     <p><strong>Contact Email:</strong> ${formData.contactEmail || ''}</p>
// //     <p><strong>Company Profile:</strong> ${formData.companyProfile || ''}</p>
// //     <h2>Quantitative Information - Part 1</h2>
// //     <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
// //         <thead>
// //             <tr>
// //                 <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
// //                 <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
// //                 <th style="border: 1px solid #000; padding: 8px;">Remarks (Value)</th>
// //             </tr>
// //         </thead>
// //         <tbody>
// //   ${part1.map(([num, label, key]) => `
// //     <tr>
// //       <td style="border: 1px solid #000; padding: 8px;">${num}</td>
// //       <td style="border: 1px solid #000; padding: 8px;">${label}</td>
// //       <td style="border: 1px solid #000; padding: 8px;">
// //         ${formData[key]
// //                 ? `2024-25: ${formData[key][0] || ''}, 2023-24: ${formData[key][1] || ''}`
// //                 : ''
// //             }
// //       </td>
// //     </tr>
// //   `).join('')}
// // </tbody>
// // js
// // Copy
// // Edit
// // <tbody>
// //   ${part2.map(([num, label, key]) => `
// //     <tr>
// //       <td style="border: 1px solid #000; padding: 8px;">${num}</td>
// //       <td style="border: 1px solid #000; padding: 8px;">${label}</td>
// //       <td style="border: 1px solid #000; padding: 8px;">
// //         ${formData[key]
// //                     ? `2024-25: ${formData[key][0] || ''}, 2023-24: ${formData[key][1] || ''}`
// //                     : ''
// //                 }
// //       </td>
// //     </tr>
// //   `).join('')}
// // </tbody>
// //     </table>
// //     <h2>Declaration</h2>
// //     <p>I declare that the information submitted is true and complete.</p>
// //     </div>
// //     `;
// //         const printWindow = window.open('', '', 'height=600,width=800');
// //         printWindow.document.write(printContent);
// //         printWindow.document.close();
// //         printWindow.print();
// //     };

// //     const part1 = [
// //         ['1', 'Absolute CapEx(INR -crores)', 'retailOutlets2024',],
// //         ['2', 'Installed Capacity(MTPA)', 'install2024',],
// //         ['3', 'Actual Production(MTPA)', 'actual2024',],
// //         ['4', 'Safety', 'safety2024',],
// //         ['4.1', 'Fatal Accident Rate {(No. of Fatalities x 10,00,00,000) / Total hour worked in reporting period}', 'accident_rate2024',],
// //         ['4.2', 'Lost Time Injury Frequency {(No. lost time injuries in reporting period x 10,00,000) / Total hour worked in reporting period}', 'injury2024',],
// //         ['4.3', 'Total Recordable Incident Rate {(No. of OSHA recordable incidents x 2,00,000) / Total hour worked in reporting period}', 'incident_rate2024',],


// //     ];
// //     // const part1 = fullData.filter(([num]) => parseFloat(num) <= 3);
// //     // const part2 = fullData.filter(([num]) => parseFloat(num) > 3);
// //     const part2 = [
// //         ['5', '5 R&D in CBG Area', 'lubricantsSales2024',],
// //         ['5.1', 'Number of Patents filed', 'patent2024',],
// //         ['5.2', 'Number of Patents granted - National ', 'national2024',],
// //         ['5.3', 'Number of Patents Granted – International', 'international2024',],
// //         ['5.4', 'Number of Patents commercialized', 'commercial2024',],
// //     ];
// //     const renderStepContent = () => {
// //         const progress = ((currentStep - 1) / 4) * 100;
// //         return (
// //             <div className="form-step">
// //                 <div className="progress-bar">
// //                     <div className="progress" style={{ width: `${progress}%` }}></div>
// //                 </div>

// //                 {currentStep === 1 && (
// //                     <div>
// //                         <h3 className="step-title">Step 1: Organization Details</h3>
// //                         <div className="form-group">
// //                             <label>Organisation Name <span className="text-red">*</span></label>
// //                             <input
// //                                 type="text"
// //                                 name="Organisationname"
// //                                 value={formData.Organisationname}
// //                                 onChange={(e) => {
// //                                     const value = e.target.value;
// //                                     if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
// //                                         handleChange('Organisationname', value);
// //                                     }
// //                                 }}
// //                                 className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
// //                             />
// //                             {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
// //                         </div>
// //                         <div className="form-group">
// //                             <label>Select Category<span className="text-red">*</span></label>
// //                             <select
// //                                 name="category"
// //                                 value={formData.category}
// //                                 onChange={(e) => handleChange('category', e.target.value)}
// //                                 className={`form-input ${!formData.category && currentStep === 1 ? 'has-error' : ''}`}
// //                             >
// //                                 <option value="">Select Category</option>
// //                                 <option value="Exploration Company of the Year">Exploration Company of the Year</option>
// //                                 <option value="Oil & gas Production Company of the year (<1 MMTOE)">Oil & gas Production Company of the year Less than 1 MTOE</option>
// //                                 <option value="Oil & gas Production Company of the year (>=1 MMTOE)">Oil & gas Production Company of the year More than or equal to 1 MMTOE</option>
// //                                 <option value="Goal Net Zero Company of the Year">Goal Net Zero Company of the Year</option>
// //                                 <option value="Green Hydrogen Company of the Year">Green Hydrogen Company of the Year</option>
// //                                 <option value="Overseas Oil & Gas Company of the Year">Overseas Oil & Gas Company of the Year</option>
// //                                 <option value="Digital Technology Provider of the Year">Digital Technology Provider of the Year</option>
// //                                 <option value="Service Provider of the Year">Service Provider of the Year</option>
// //                                 <option value="Pipeline Transportation Company of the Year">Pipeline Transportation Company of the Year</option>
// //                                 <option value="Oil Marketing Company of the Year">Oil Marketing Company of the Year</option>
// //                                 <option value="Human Resource Management">Human Resource Management</option>
// //                                 <option value="CBG Company of the Year">CBG Company of the Year</option>
// //                                 <option value="CGD Company of the Year">CGD Company of the Year</option>
// //                                 <option value="Best Managed Project of the Year">Best Managed Project of the Year</option>
// //                                 <option value="Refinery of the Year">Refinery of the Year</option>
// //                                 <option value="Innovator of the year (team)">Innovator of the year (team)</option>
// //                                 <option value="Woman Executive of the Year">Woman Executive of the Year</option>
// //                                 <option value="Young Achiever of the Year(Male)">Young Achiever of the Year(Male)</option>
// //                                 <option value="Young Achiever of the Year(Female)">Young Achiever of the Year(Female)</option>
// //                             </select>
// //                             {!formData.category && currentStep === 1 && <span className="error-tooltip">Category is required</span>}
// //                         </div>
// //                         <div className="form-group">
// //                             <label>Postal Address <span className="text-red">*</span></label>
// //                             <textarea
// //                                 name="mailingAddress"
// //                                 value={formData.mailingAddress}
// //                                 onChange={(e) => handleChange('mailingAddress', e.target.value)}
// //                                 className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1 ? 'has-error' : ''}`}
// //                                 rows={3}
// //                                 placeholder="Enter Postal address"
// //                             />
// //                             {!formData.mailingAddress.trim() && currentStep === 1 && <span className="error-tooltip">Mailing address is required</span>}
// //                         </div>
// //                     </div>
// //                 )}
// //                 {currentStep === 2 && (
// //                     <div>
// //                         <h3 className="step-title">Step 2: Authority & Contact Details</h3>
// //                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                             <div className="step-section">
// //                                 <h4>Approving Authority</h4>
// //                                 <div className="form-group">
// //                                     <label>Name <span className="text-red">*</span></label>
// //                                     <input
// //                                         type="text"
// //                                         name="authorityName"
// //                                         value={formData.authorityName}
// //                                         onChange={(e) => {
// //                                             const value = e.target.value;
// //                                             if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
// //                                                 handleChange('authorityName', value);
// //                                             }
// //                                         }}
// //                                         className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
// //                                         placeholder="Name"
// //                                     />
// //                                     {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Authority name is required</span>}
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <input
// //                                         type="text"
// //                                         name="authorityTitle"
// //                                         value={formData.authorityTitle}
// //                                         onChange={(e) => {
// //                                             const value = e.target.value;
// //                                             if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
// //                                                 handleChange('authorityTitle', value);
// //                                             }
// //                                         }}
// //                                         className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
// //                                         placeholder="Designation"
// //                                     />
// //                                     {!formData.authorityTitle && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <input
// //                                         type="tel"
// //                                         name="authorityPhone"
// //                                         value={formData.authorityPhone}
// //                                         onChange={(e) => handleChange('authorityPhone', e.target.value)}
// //                                         className={`form-input ${error ? 'has-error' : ''}`}
// //                                         placeholder="Phone number"
// //                                         maxLength={10}
// //                                     />
// //                                     {error && <span className="error-tooltip">{error}</span>}
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <input
// //                                         type="email"
// //                                         name="authorityEmail"
// //                                         value={formData.authorityEmail}
// //                                         onChange={(e) => handleChange('authorityEmail', e.target.value)}
// //                                         className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
// //                                         placeholder="E-mail address"
// //                                     />
// //                                     {!formData.authorityEmail && currentStep === 2 && <span className="error-tooltip">Email is required</span>}
// //                                 </div>
// //                             </div>
// //                             <div className="step-section">
// //                                 <h4>Contacts (Nodal Officials) <span className="text-red">*</span></h4>
// //                                 <div className="form-group">
// //                                     <label>
// //                                         <input
// //                                             type="checkbox"
// //                                             name="copyApplicantData"
// //                                             checked={copyApplicantData}
// //                                             onChange={(e) => {
// //                                                 setCopyApplicantData(e.target.checked);
// //                                                 if (e.target.checked) {
// //                                                     setFormData({
// //                                                         ...formData,

// //                                                         contactEmail: formData.authorityEmail || '',
// //                                                         contactPhone: formData.authorityPhone || '',
// //                                                     });
// //                                                 } else {
// //                                                     setFormData({
// //                                                         ...formData,

// //                                                         contactEmail: '',
// //                                                         contactPhone: '',
// //                                                     });
// //                                                 }
// //                                             }}
// //                                             className="form-checkbox"
// //                                         /> Same as applicant
// //                                     </label>
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <input
// //                                         type="text"
// //                                         name="contactName"
// //                                         value={formData.contactName}
// //                                         onChange={(e) => {
// //                                             const value = e.target.value;
// //                                             if (/^[A-Za-z\s]*$/.test(value)) {
// //                                                 handleChange('contactName', value);
// //                                             }
// //                                         }}
// //                                         className="form-input"
// //                                         placeholder="Name"
// //                                     />
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <input
// //                                         type="tel"
// //                                         name="contactPhone"
// //                                         value={formData.contactPhone}
// //                                         onChange={(e) => handleChange('contactPhone', e.target.value)}
// //                                         className="form-input"
// //                                         placeholder="Phone number"
// //                                         maxLength={10}
// //                                         disabled={copyApplicantData}
// //                                     />
// //                                 </div>
// //                                 <div className="form-group">
// //                                     <input
// //                                         type="email"
// //                                         name="contactEmail"
// //                                         value={formData.contactEmail}
// //                                         onChange={(e) => handleChange('contactEmail', e.target.value)}
// //                                         className="form-input"
// //                                         placeholder="E-mail address"
// //                                         disabled={copyApplicantData}
// //                                     />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                         <div className="form-group">
// //                             <label>Company Profile and Activities (2024–25)</label>
// //                             <p className="note">Write-up (max 300 words) — Operations during 2024–25</p>
// //                             <textarea
// //                                 name="companyProfile"
// //                                 value={formData.companyProfile}
// //                                 onChange={(e) => handleChange('companyProfile', e.target.value)}
// //                                 className="form-textarea"
// //                                 rows={6}
// //                                 maxLength={300}
// //                             />
// //                         </div>
// //                     </div>
// //                 )}

// //                 {currentStep === 3 && (
// //                     <div>
// //                         <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
// //                         <table>
// //                             <thead>
// //                                 <tr>
// //                                     <th>S.No</th>
// //                                     <th>Particulars</th>
// //                                     <th>2024-2025</th>
// //                                     <th>2023-2024</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {part1.map(([num, label, key]) => (
// //                                     <tr key={key || num}>
// //                                         <td>{num}</td>
// //                                         <td>{label}</td>
// //                                         <td>
// //                                             <input
// //                                                 type="number"
// //                                                 value={formData[key][0] || ''}
// //                                                 onChange={(e) => handleChange(key, e.target.value, 0)}
// //                                                 className="form-input"
// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <input
// //                                                 type="number"
// //                                                 value={formData[key][1] || ''}
// //                                                 onChange={(e) => handleChange(key, e.target.value, 1)}
// //                                                 className="form-input"
// //                                             />
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 )}
// //                 {currentStep === 4 && (
// //                     <div>
// //                         <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
// //                         <table>
// //                             <thead>
// //                                 <tr>
// //                                     <th>S.No</th>
// //                                     <th>Particulars</th>
// //                                     <th>2024-2025</th>
// //                                     <th>2023-2024</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {part2.map(([num, label, key]) => (
// //                                     <tr key={key || num}>
// //                                         <td>{num}</td>
// //                                         <td>{label}</td>
// //                                         <td>
// //                                             <input
// //                                                 type="number"
// //                                                 value={formData[key][0] || ''}
// //                                                 onChange={(e) => handleChange(key, e.target.value, 0)}
// //                                                 className="form-input"
// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <input
// //                                                 type="number"
// //                                                 value={formData[key][1] || ''}
// //                                                 onChange={(e) => handleChange(key, e.target.value, 1)}
// //                                                 className="form-input"
// //                                             />
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                         <div className="step-section">
// //                             <div className="form-group">
// //                                 <label>Comments</label>
// //                                 <textarea
// //                                     name="comment"
// //                                     value={formData.comment}
// //                                     onChange={(e) => handleChange('comment', e.target.value)}
// //                                     className="form-textarea"
// //                                     maxLength={300}
// //                                     placeholder="Comments in (200 words) against input parameter, if any"
// //                                 />
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {currentStep === 5 && (
// //                     <div className="form-step">
// //                         <h3 className="step-title">Step 5: Attachments & Declaration</h3>
// //                         <div className="form-group">
// //                             <label>List of Attachments (Optional):</label>
// //                             <table className="quant-table">
// //                                 <thead>
// //                                     <tr>
// //                                         <th>S. No.</th>
// //                                         <th>Description</th>
// //                                         <th>Upload (only jpg, png, pdf, max 5 MB each)</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     {[1, 2, 3, 4].map((num) => {
// //                                         const key = `attachments${num}`;
// //                                         const attachment = formData[key];
// //                                         return (
// //                                             <tr key={key}>
// //                                                 <td>{num}</td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="text"
// //                                                         name={`${key}.description`}
// //                                                         value={attachment.description}
// //                                                         onChange={(e) =>
// //                                                             handleAttachmentChange(key, 'description', e.target.value)
// //                                                         }
// //                                                         placeholder="Enter description"
// //                                                         className="form-input"
// //                                                     />
// //                                                 </td>
// //                                                 <td>
// //                                                     <input
// //                                                         type="file"
// //                                                         accept=".jpg,.png,.pdf"
// //                                                         onChange={(e) =>
// //                                                             handleAttachmentChange(key, 'file', e.target.files[0], e)
// //                                                         }
// //                                                         className="form-input mt-4"
// //                                                     />
// //                                                     {attachment.file && (
// //                                                         <p className="file-name">Selected file: {attachment.file.name}</p>
// //                                                     )}
// //                                                 </td>
// //                                             </tr>
// //                                         );
// //                                     })}
// //                                 </tbody>
// //                             </table>
// //                         </div>
// //                         <div className="form-group">
// //                             <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
// //                             <div className="form-navigation">
// //                                 <button type="button" onClick={handlePrint} className="btn btn-outline">
// //                                     Print
// //                                 </button>
// //                             </div>
// //                         </div>
// //                         <div className="form-group">
// //                             <label>Upload Document with Approving Authority Signature (Director/Board Level)<span className="text-red">*</span>:</label>
// //                             <input
// //                                 type="file"
// //                                 accept=".jpg,.png,.pdf"
// //                                 onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
// //                                 className="form-input mt-4"
// //                             />
// //                             {formData.approvingAuthoritySignature && (
// //                                 <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
// //                             )}
// //                             {error && <span className="error-tooltip">{error}</span>}
// //                         </div>
// //                         <div className="form-group">
// //                             <label>
// //                                 <input
// //                                     type="checkbox"
// //                                     name="declaration"
// //                                     checked={formData.declaration}
// //                                     onChange={(e) => handleChange('declaration', e.target.checked)}
// //                                     className="form-checkbox"
// //                                 />
// //                                 I declare that the information submitted is true and complete.


// //                             </label>

// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         )
// //     }

// //     return (
// //         <div className="application-form">
// //             <div className="form-header">
// //                 <h1>
// //                     Registration Form: {"CBG Company of the Year"}
// //                 </h1>

// //                 <h6>Step {currentStep} of 5</h6>
// //             </div>
// //             {error && <div className="error">{error}</div>}


// //             {isSubmitted ? (
// //                 <div className="thank-you-message">
// //                     <h2>Thank you for your submission!</h2>
// //                     <p>Your registration has been successfully submitted.</p>
// //                     <button onClick={() => setIsSubmitted(false)}>Submit Another Response</button>
// //                 </div>
// //             ) : (
// //                 <form onSubmit={handleSubmit}>
// //                     {renderStepContent()}
// //                     {currentStep === 1 && (
// //                         <div className="form-navigation-step1">
// //                             <button type="button" onClick={saveDraft} className="btn btn-outline">
// //                                 <Save size={16} /> Save Draft
// //                             </button>
// //                             <button type="button" onClick={nextStep} className="btn btn-primary">
// //                                 Next <ChevronRight size={16} />
// //                             </button>
// //                         </div>
// //                     )}
// //                     {currentStep > 1 && (
// //                         <div className="form-navigation">
// //                             <button type="button" onClick={prevStep} className="btn btn-outline">
// //                                 <ChevronLeft size={16} /> Previous
// //                             </button>
// //                             <button type="button" onClick={saveDraft} className="btn btn-outline">
// //                                 <Save size={16} /> Save Draft
// //                             </button>
// //                             {currentStep < 5 && (
// //                                 <button type="button" onClick={nextStep} className="btn btn-primary">
// //                                     Next <ChevronRight size={16} />
// //                                 </button>
// //                             )}
// //                             {currentStep === 5 && (
// //                                 <button type="submit" className="btn btn-success">
// //                                     Submit
// //                                 </button>
// //                             )}
// //                         </div>
// //                     )}
// //                 </form>
// //             )}
// //         </div>
// //     );
// // };

// // export default RegistrationCBG;





// import React, { useState, useCallback, useEffect } from 'react';
// // import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SidebarGuideline from "./SidebarGuideline"
// import TextField from "@mui/material/TextField";
// import '../styles/FormProduction.css';

// // Constants for max lengths
// const FIELD_MAX_LENGTH = 100;
// const COMPANY_PROFILE_MAX_LENGTH = 300;
// const COMMENT_MAX_LENGTH = 200;
// const PHONE_MAX_LENGTH = 10;

// // Validation regex
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /^\d{10}$/;

// const RegistrationCBG = () => {
//   const location = useLocation();
//   const [activeItem, setActiveItem] = useState(null);
//   const navigate = useNavigate();
//   const awardTitle = location.state?.awardTitle || 'CBG Company of the Year';

//   // Form state initialization
//   const [formData, setFormData] = useState({
//     Organisationname: '',
//     category: 'CBG Company of the Year',
//     mailingAddress: '',
//     authorityName: '',
//     authorityTitle: '',
//     authorityPhone: '',
//     authorityEmail: '',
//     contactName: '',
//     contactPhone: '',
//     contactEmail: '',
//     companyProfile: '',
//     approvingAuthoritySignature: null,
//     declaration: false,
//     comment: '',
//     retailOutlets2024: ['', ''],
//     install2024: ['', ''],
//     actual2024: ['', ''],
//     safety2024: ['', ''],
//     accident_rate2024: ['', ''],
//     injury2024: ['', ''],
//     incident_rate2024: ['', ''],
//     lubricantsSales2024: ['', ''],
//     patent2024: ['', ''],
//     national2024: ['', ''],
//     international2024: ['', ''],
//     commercial2024: ['', ''],
//     attachments1: { description: '', file: null },
//     attachments2: { description: '', file: null },
//     attachments3: { description: '', file: null },
//     attachments4: { description: '', file: null },
//   });

//   // UI State
//   const [currentStep, setCurrentStep] = useState(1);
//   const [copyApplicantData, setCopyApplicantData] = useState(false);
//   const [fieldErrors, setFieldErrors] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState('');

//   // Validation helpers
//   const validateEmail = (email) => emailRegex.test(email);
//   const validatePhone = (phone) => phoneRegex.test(phone);

//   // Clear error on field
//   const clearFieldError = useCallback((field) => {
//     setFieldErrors((prev) => {
//       if (prev[field]) {
//         const { [field]: omitted, ...rest } = prev;
//         return rest;
//       }
//       return prev;
//     });
//   }, []);

//   // Handle changes for inputs/textareas/selects
//   const handleChange = (name, value, index = null) => {
//     if ([1, 2, 4].includes(currentStep)) {
//       let applicableMaxLength = FIELD_MAX_LENGTH;
//       if (name === 'companyProfile') applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
//       else if (name === 'comment') applicableMaxLength = COMMENT_MAX_LENGTH;

//       if (typeof value === 'string') {
//         if (name === 'companyProfile') {
//           const wordCount = value.trim().split(/\s+/).length;
//           if (wordCount > 300) {
//             alert("Maximum 300 words allowed in Company Profile.");
//             return;
//           }
//         } else if (name === 'comment') {
//           const wordCount = value.trim().split(/\s+/).length;
//           if (wordCount > 200) {
//             alert("Maximum 200 words allowed in Comments.");
//             return;
//           }
//         } else if (value.length > applicableMaxLength) {
//           alert(`Value cannot exceed ${applicableMaxLength} characters.`);
//           return;
//         }
//       }

//     }

//     // Name validation
//     if (['Organisationname', 'authorityName', 'contactName'].includes(name)) {
//       const isValid = /^[A-Za-z\s]*$/.test(value);
//       if (!isValid && value !== '') {
//         alert('Only letters and spaces are allowed.');
//         return;
//       }
//     }

//     // Phone validation
//     if (name === 'authorityPhone' || name === 'contactPhone') {
//       const numericValue = value.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH);
//       if (numericValue.length > PHONE_MAX_LENGTH) {
//         alert('Phone number must not exceed 10 digits.');
//         return;
//       }
//       setFormData((prev) => ({
//         ...prev,
//         [name]: numericValue,
//       }));
//       clearFieldError(name);
//       return;
//     }

//     // Quantitative fields validation
//     if (index !== null) {
//       if (value === '') {
//         clearFieldError(name);
//       } else {
//         const numVal = Number(value);
//         if (numVal < 0) {
//           alert('Value cannot be negative.');
//           return;
//         } else {
//           clearFieldError(name);
//         }
//       }


//       setFormData(prev => {
//         if (index !== null) {
//           const existing = Array.isArray(prev[name]) ? prev[name] : [];
//           const updated = [...existing];
//           updated[index] = value;
//           return { ...prev, [name]: updated };
//         }
//         return { ...prev, [name]: value };
//       });
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: typeof value === 'boolean' ? value : value,
//       }));
//     }

//     if (name === 'Organisationname' && value && currentStep === 1) setError('');
//     if (name === 'mailingAddress' && value.trim() && currentStep === 1) setError('');
//     if (name === 'authorityName' && value && currentStep === 2) setError('');
//     if (name === 'authorityTitle' && value && currentStep === 2) setError('');
//     if (name === 'authorityEmail' && value && currentStep === 2) setError('');
//     if (name === 'authorityPhone' && value && currentStep === 2) setError('');
//   };

//   // Handle checkbox for copying applicant data

//   const handleCopyApplicantToggle = (e) => {
//     const checked = e.target.checked;
//     setCopyApplicantData(checked);
//     if (checked) {
//       setFormData((prev) => ({
//         ...prev,
//         contactName: prev.authorityName,
//         contactEmail: prev.authorityEmail,
//         contactPhone: prev.authorityPhone,
//       }));
//       clearFieldError('contactName');
//       clearFieldError('contactEmail');
//       clearFieldError('contactPhone');
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         contactName: '',
//         contactEmail: '',
//         contactPhone: '',
//       }));
//     }
//   };

//   // Handle attachment changes
//   const handleAttachmentChange = (key, field, value, event = null) => {
//     if (field === 'file' && value) {
//       const file = value;
//       const maxSizeInBytes = 5 * 1024 * 1024;
//       const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

//       if (!allowedTypes.includes(file.type)) {
//         alert('Only JPG, PNG, and PDF files are allowed for attachments.');
//         if (event) event.target.value = null;
//         return;
//       }
//       if (file.size > maxSizeInBytes) {
//         alert('File size must not exceed 5 MB for attachments.');
//         if (event) event.target.value = null;
//         return;
//       }
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         [field]: value,
//       },
//     }));
//     clearFieldError(key);
//   };

//   // Handle approving authority signature upload
//   const handleApprovingAuthorityChange = (files) => {
//     const file = files[0];
//     if (file) {
//       const maxSizeInBytes = 5 * 1024 * 1024;
//       const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

//       if (!allowedTypes.includes(file.type)) {
//         alert('Only JPG, PNG, and PDF files are allowed for the signature.');
//         return;
//       }
//       if (file.size > maxSizeInBytes) {
//         alert('File size must not exceed 5 MB for the signature.');
//         return;
//       }
//       setFormData((prev) => ({
//         ...prev,
//         approvingAuthoritySignature: file,
//       }));
//       clearFieldError('approvingAuthoritySignature');
//     }
//   };

//   // Print form handler
//   const handlePrint = () => {
//     const printContent = `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
//         <h2>Organization & Contact Details</h2>
//         <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
//         <p><strong>Postal Address:</strong> ${formData.mailingAddress || ''}</p>
//         <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
//         <p><strong>Authority Title:</strong> ${formData.authorityTitle || ''}</p>
//         <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
//         <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>
//         <h2>Contacts Nodal Officials:</h2>
//         <p><strong>Contact Name:</strong> ${formData.contactName || ''}</p>
//         <p><strong>Contact Phone:</strong> ${formData.contactPhone || ''}</p>
//         <p><strong>Contact Email:</strong> ${formData.contactEmail || ''}</p>
//         <p><strong>Company Profile:</strong> ${formData.companyProfile || ''}</p>
//         <h2>Quantitative Information - Part 1</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead>
//             <tr>
//               <th style="border: 1px solid #000; padding: 8px;">S.No</th>
//               <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//               <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
//               <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${part1.map(([num, label, key]) => `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 8px;">${num}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${label}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${formData[key][0] || ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${formData[key][1] || ''}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//         <h2>Quantitative Information - Part 2</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead>
//             <tr>
//               <th style="border: 1px solid #000; padding: 8px;">S.No</th>
//               <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//               <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
//               <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${part2.map(([num, label, key]) => `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 8px;">${num}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${label}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${formData[key][0] || ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${formData[key][1] || ''}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//         <h2>Attachments</h2>
//       <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//         <thead>
//           <tr>
//             <th style="border: 1px solid #000; padding: 8px;">S.No</th>
//             <th style="border: 1px solid #000; padding: 8px;">Description</th>
//             <th style="border: 1px solid #000; padding: 8px;">File Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${[1, 2, 3, 4].map(i => `
//             <tr>
//               <td style="border: 1px solid #000; padding: 8px;">${i}</td>
//               <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].description || ''}</td>
//               <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].file?.name || ''}</td>
//             </tr>
//           `).join('')}
//         </tbody>
//       </table>
//         <h2>Comments</h2>
//         <p>${formData.comment || ''}</p>
//         <h2>Declaration</h2>
//         <p>I declare that the information submitted is true and complete.</p>
//         <h2>Authority Signature</h2>
//         <p><strong>Name:</strong> ${formData.authority_name || ''}</p>
//         <p><strong>Title:</strong> ${formData.authority_title || ''}</p>
//         <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
//         ${formData.approvingAuthoritySignature
//         ? `<img src="${formData.approvingAuthoritySignature}" alt="Signature" style="max-height: 100px; margin-top: 10px;" />`
//         : `<p><em>No signature uploaded.</em></p>`}
//       </div>
//     `;
//     const printWindow = window.open('', '', 'height=600,width=800');
//     printWindow.document.write(printContent);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   // Navigation handlers
//   const nextStep = () => {
//     if (currentStep === 1) {
//       if (!formData.Organisationname) {
//         alert('Organisation name is required.');
//         return;
//       }
//       if (!formData.mailingAddress.trim()) {
//         alert('Mailing address is required.');
//         return;
//       }
//     }
//     if (currentStep === 2) {
//       if (!formData.authorityName) {
//         alert('Authority name is required.');
//         return;
//       }
//       if (!formData.authorityTitle) {
//         alert('Authority designation is required.');
//         return;
//       }
//       if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
//         alert('Please enter a valid Authority email.');
//         return;
//       }
//       if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
//         alert('Authority phone must be exactly 10 digits.');
//         return;
//       }
//       if (!formData.contactName) {
//         alert('Contact name is required.');
//         return;
//       }
//       if (formData.contactEmail && !validateEmail(formData.contactEmail)) {
//         alert('Please enter a valid Contact email.');
//         return;
//       }
//       if (formData.contactPhone && !validatePhone(formData.contactPhone) && !copyApplicantData) {
//         alert('Contact phone must be exactly 10 digits.');
//         return;
//       }
//       if (!formData.companyProfile) {
//         alert('Company Profile is required.');
//         return;
//       }
//     }
//     if (currentStep === 3 && hasEmptyFieldsInStep(currentStep)) {
//       if (!window.confirm('Data not entered, If you wish to continue?')) {
//         return; // Stop advancing
//       }
//     }

//     if (currentStep === 4 && hasEmptyFieldsInStep(currentStep)) {
//       if (!window.confirm('Data not entered, If you wish to continue?')) {
//         return;
//       }
//     }

//     setError('');
//     if (currentStep < 5) setCurrentStep((prev) => prev + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep((prev) => prev - 1);
//   };

//   // Save draft handler
//   const handleSaveDraft = () => {
//     localStorage.setItem('registrationCBGDraft', JSON.stringify({ formData }));
//     alert('Draft Saved!');
//   };

//   // Submit form handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1) Declaration & phone validation
//     if (!formData.declaration) {
//       alert("Please accept the declaration.");
//       return;
//     }
//     if ((formData.authorityPhone || "").length !== 10) {
//       alert("Authority phone must be exactly 10 digits.");
//       return;
//     }

//     // 2) Build FormData
//     const fd = new FormData();

//     // 2a) Flat fields → snake_case keys
//     const flatMap = {
//       organisation_name: formData.Organisationname,
//       category: formData.category,
//       company_name: formData.companyName,
//       mailing_address: formData.mailingAddress,

//       authority_name: formData.authorityName,
//       authority_title: formData.authorityTitle,
//       authority_phone: formData.authorityPhone,
//       authority_email: formData.authorityEmail,

//       contact_name: formData.contactName,
//       contact_phone: formData.contactPhone,
//       contact_email: formData.contactEmail,

//       company_profile: formData.companyProfile,
//       comment: formData.comment,
//       declaration: String(formData.declaration),
//     };

//     Object.entries(flatMap).forEach(([key, val]) => {
//       fd.append(key, val || "");
//     });

//     // 2b) Quantitative arrays: each state entry is [value2024, value2023]
//     const metrics = [
//       ["retail_outlets", formData.retailOutlets2024],
//       ["install_capacity", formData.install2024],
//       ["actual_prod", formData.actual2024],
//       ["safety_index", formData.safety2024],
//       ["accident_rate", formData.accident_rate2024],
//       ["lost_injury_rate", formData.injury2024],
//       ["incident_rate", formData.incident_rate2024],
//       ["lubricants_sales", formData.lubricantsSales2024],
//       ["patents_filed", formData.patent2024],
//       ["patents_national", formData.national2024],
//       ["patents_international", formData.international2024],
//       ["patents_commercial", formData.commercial2024],
//     ];

//     metrics.forEach(([base, arr2024]) => {
//       // we stored both years in a two‑element array on state
//       const [v24, v23] = arr2024 || ["", ""];
//       fd.append(`${base}_2024`, v24 || "");
//       fd.append(`${base}_2023`, v23 || "");
//     });

//     // 2c) Files
//     if (formData.approvingAuthoritySignature) {
//       fd.append("approving_authority_file", formData.approvingAuthoritySignature);
//     }
//     [1, 2, 3, 4].forEach(n => {
//       const { description, file } = formData[`attachments${n}`] || {};
//       if (file) {
//         fd.append(`attachments${n}`, file);
//         fd.append(`attachments${n}_desc`, description || "");
//       }
//     });

//     // 3) Send
//     try {
//       // const url = `${ACTIVE_API_BASE_URL}/registration-cbg/`;
//       //   const res = await fetch(url, {
//       //   method: "POST",
//       //   body: fd
//       // });
//       // if (!res.ok) {
//       //   const err = await res.text();
//       //   console.error("Server error:", err);
//       //   return alert("Submission failed. See console.");
//       // }
//       // await res.json();
//       alert("Submitted successfully!");
//       setIsSubmitted(true);
//     } catch (err) {
//       console.error("Network error:", err);
//       alert("Network error. See console.");
//     }
//   };

//   // Quantitative data for steps 3 and 4
//   const part1 = [
//     ['1', 'Absolute CapEx (INR - crores)', 'retailOutlets2024'],
//     ['2', 'Installed Capacity (MTPA)', 'install2024'],
//     ['3', 'Actual Production (MTPA)', 'actual2024'],
//     ['4', 'Safety', 'safety2024'],
//     ['4.1', 'Number of Fatalities', 'accident_rate2024'],
//     ['4.2','Total hours worked','totalhourworked2024'],
//     ['4.3', 'Lost Time Injuries', 'injury2024'],
//     ['4.4', 'Total Recordable Incident Rate', 'incident_rate2024'],
//   ];

//   const part2 = [
//     ['5', 'R&D in CBG Area', 'lubricantsSales2024'],
//     ['5.1', 'Number of Patents filed', 'patent2024'],
//     ['5.2', 'Number of Patents granted - National', 'national2024'],
//     ['5.3', 'Number of Patents Granted – International', 'international2024'],
//     ['5.4', 'Number of Patents commercialized', 'commercial2024'],
//   ];
//   const hasEmptyFieldsInStep = (step) => {
//     // Pick relevant data array for validation
//     const stepData = step === 3 ? part1 : part2;

//     for (const [, , key] of stepData) {
//       const arr = formData[key];
//       // Check if the key exists and is an array of two year-values
//       if (!arr || arr.some(v => v === '' || v === undefined || v === null)) {
//         return true;
//       }
//     }
//     return false;
//   };


//   // Rendering steps content
//   const renderStepContent = () => {
//     const progress = ((currentStep - 1) / 4) * 100;

//     return (
//       <div className="form-step" role="form" aria-label={`Step ${currentStep} of 5`}>
//         <div className="progress-bar" aria-hidden="true">
//           <div className="progress" style={{ width: `${progress}%` }} />
//         </div>

//         {currentStep === 1 && (
//           <>
//             <h3 className="step-title">Step 1: Organization Details</h3>

//             <div className="form-group">
//               <label htmlFor="Organisationname">
//                 Organisation Name <span aria-hidden="true" className="text-red">*</span>
//               </label>
//               <input
//                 id="Organisationname"
//                 name="Organisationname"
//                 type="text"
//                 maxLength={FIELD_MAX_LENGTH}
//                 value={formData.Organisationname}
//                 onChange={(e) => handleChange('Organisationname', e.target.value)}
//                 aria-describedby="Organisationname-error"
//                 className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
//                 placeholder="Enter organisation name"
//                 required
//               />
//               {fieldErrors.Organisationname && (
//                 <span className="error-tooltip" id="Organisationname-error" role="alert">
//                   {fieldErrors.Organisationname}
//                 </span>
//               )}
//               {!formData.Organisationname && currentStep === 1 && (
//                 <span className="error-tooltip" id="Organisationname-error" role="alert">
//                   Organisation name is required
//                 </span>
//               )}
//             </div>


//             <div className="form-group">
//               <label htmlFor="mailingAddress">
//                 Postal Address <span aria-hidden="true" className="text-red">*</span>
//               </label>
//               <textarea
//                 id="mailingAddress"
//                 name="mailingAddress"
//                 value={formData.mailingAddress}
//                 rows={3}
//                 maxLength={FIELD_MAX_LENGTH}
//                 onChange={(e) => handleChange('mailingAddress', e.target.value)}
//                 aria-describedby="mailingAddress-error"
//                 placeholder="Enter postal address"
//                 className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1 ? 'has-error' : ''}`}
//                 required
//               />
//               {fieldErrors.mailingAddress && (
//                 <span className="error-tooltip" id="mailingAddress-error" role="alert">
//                   {fieldErrors.mailingAddress}
//                 </span>
//               )}
//               {!formData.mailingAddress.trim() && currentStep === 1 && (
//                 <span className="error-tooltip" id="mailingAddress-error" role="alert">
//                   Mailing address is required
//                 </span>
//               )}
//             </div>
//           </>
//         )}

//         {currentStep === 2 && (
//           <>
//             <h3 className="step-title">Step 2: Approving Authority & Contact</h3>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <section aria-labelledby="approving-authority-heading" className="step-section">
//                 <h4 id="approving-authority-heading">Approving Authority</h4>

//                 <div className="form-group">
//                   <label htmlFor="authorityName">
//                     Name <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="authorityName"
//                     name="authorityName"
//                     type="text"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.authorityName}
//                     onChange={(e) => handleChange('authorityName', e.target.value)}
//                     aria-describedby="authorityName-error"
//                     placeholder="Name"
//                     className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
//                     required
//                   />
//                   {fieldErrors.authorityName && (
//                     <span className="error-tooltip" id="authorityName-error" role="alert">
//                       {fieldErrors.authorityName}
//                     </span>
//                   )}
//                   {!formData.authorityName && currentStep === 2 && (
//                     <span className="error-tooltip" id="authorityName-error" role="alert">
//                       Name is required
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="authorityTitle">
//                     Designation <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="authorityTitle"
//                     name="authorityTitle"
//                     type="text"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.authorityTitle}
//                     onChange={(e) => handleChange('authorityTitle', e.target.value)}
//                     aria-describedby="authorityTitle-error"
//                     placeholder="Designation"
//                     className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
//                     required
//                   />
//                   {fieldErrors.authorityTitle && (
//                     <span className="error-tooltip" id="authorityTitle-error" role="alert">
//                       {fieldErrors.authorityTitle}
//                     </span>
//                   )}
//                   {!formData.authorityTitle && currentStep === 2 && (
//                     <span className="error-tooltip" id="authorityTitle-error" role="alert">
//                       Designation is required
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="authorityPhone">
//                     Phone <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="authorityPhone"
//                     name="authorityPhone"
//                     type="tel"
//                     maxLength={PHONE_MAX_LENGTH}
//                     value={formData.authorityPhone}
//                     onChange={(e) => handleChange('authorityPhone', e.target.value)}
//                     aria-describedby="authorityPhone-error"
//                     placeholder="10-digit phone number"
//                     className={`form-input ${!formData.authorityPhone && currentStep === 2 ? 'has-error' : ''}`}
//                     required
//                   />
//                   {fieldErrors.authorityPhone && (
//                     <span className="error-tooltip" id="authorityPhone-error" role="alert">
//                       {fieldErrors.authorityPhone}
//                     </span>
//                   )}
//                   {!formData.authorityPhone && currentStep === 2 && (
//                     <span className="error-tooltip" id="authorityPhone-error" role="alert">
//                       Phone is required
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="authorityEmail">
//                     Email <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="authorityEmail"
//                     name="authorityEmail"
//                     type="email"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.authorityEmail}
//                     onChange={(e) => handleChange('authorityEmail', e.target.value)}
//                     aria-describedby="authorityEmail-error"
//                     placeholder="Approving authority's email"
//                     className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
//                     required
//                   />
//                   {fieldErrors.authorityEmail && (
//                     <span className="error-tooltip" id="authorityEmail-error" role="alert">
//                       {fieldErrors.authorityEmail}
//                     </span>
//                   )}
//                   {!formData.authorityEmail && currentStep === 2 && (
//                     <span className="error-tooltip" id="authorityEmail-error" role="alert">
//                       Email is required
//                     </span>
//                   )}
//                 </div>
//               </section>

//               <section aria-labelledby="contacts-heading" className="step-section">
//                 <h4 id="contacts-heading">Contacts (Nodal Officials) <span aria-hidden="true" className="text-red">*</span></h4>

//                 <div className="form-group">
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="copyApplicantData"
//                       checked={copyApplicantData}
//                       onChange={handleCopyApplicantToggle}
//                       className="form-checkbox"
//                     />{' '}
//                     Same as applicant
//                   </label>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="contactName">
//                     Name <span className="text-red" aria-hidden="true">*</span>
//                   </label>
//                   <input
//                     id="contactName"
//                     type="text"
//                     name="contactName"
//                     value={formData.contactName}
//                     onChange={(e) => handleChange('contactName', e.target.value)}

//                     className={`form-input ${!formData.contactName && currentStep === 2 ? 'has-error' : ''}`}
//                     placeholder="Name"
//                     maxLength={FIELD_MAX_LENGTH}
//                     disabled={copyApplicantData}
//                     aria-required="true"
//                     aria-describedby={fieldErrors.contactName ? 'contactName-error' : undefined}
//                   />
//                   {!formData.contactName && currentStep === 1 && <span className="error-tooltip">Contact name is required</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="contactPhone">Phone</label>
//                   <input
//                     id="contactPhone"
//                     name="contactPhone"
//                     type="tel"
//                     maxLength={PHONE_MAX_LENGTH}
//                     value={formData.contactPhone}
//                     onChange={(e) => handleChange('contactPhone', e.target.value)}
//                     placeholder="10-digit contact phone"
//                     disabled={copyApplicantData}
//                     className={`form-input ${fieldErrors.contactPhone ? 'has-error' : ''}`}
//                     aria-describedby="contactPhone-error"
//                   />
//                   {fieldErrors.contactPhone && (
//                     <span className="error-tooltip" id="contactPhone-error" role="alert">
//                       {fieldErrors.contactPhone}
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="contactEmail">Email</label>
//                   <input
//                     id="contactEmail"
//                     name="contactEmail"
//                     type="email"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.contactEmail}
//                     onChange={(e) => handleChange('contactEmail', e.target.value)}
//                     placeholder="Contact email"
//                     disabled={copyApplicantData}
//                     className={`form-input ${fieldErrors.contactEmail ? 'has-error' : ''}`}
//                     aria-describedby="contactEmail-error"
//                   />
//                   {fieldErrors.contactEmail && (
//                     <span className="error-tooltip" id="contactEmail-error" role="alert">
//                       {fieldErrors.contactEmail}
//                     </span>
//                   )}
//                 </div>
//               </section>
//             </div>

//             <div className="form-group">
//               <label htmlFor="companyProfile">Provide a brief write up on your company’s profile.  </label>
//               <p className="note">(within 300 words) </p>
//               <textarea
//                 id="companyProfile"
//                 name="companyProfile"
//                 value={formData.companyProfile}
//                 rows={6}
//                 // maxLength={COMPANY_PROFILE_MAX_LENGTH}
//                 onChange={(e) => handleChange('companyProfile', e.target.value)}
//                 className="form-textarea"
//                 placeholder="Enter company profile"
//               />
//               {fieldErrors.companyProfile && (
//                 <span className="error-tooltip" id="companyProfile-error" role="alert">
//                   {fieldErrors.companyProfile}
//                 </span>
//               )}
//             </div>
//           </>
//         )}


//         {currentStep === 3 && (
//           <>
//             <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
//             <div className="quantitative-form">
//               <table className="quant-table">
//                 <thead>
//                   <tr>
//                     <th>S.No</th>
//                     <th>Particulars</th>
//                     <th>2024-25</th>
//                     <th>2023-24</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {part1.map(([num, label, key]) => (



//                     <tr key={key || num} >
//                       <td>{num}</td>
//                       <td>{label}</td>
//                       <td>
//                         <TextField
//   variant="outlined"
//   size="small"
//   fullWidth
//   type="text" // prevents browser spinners
//   name={key}
//   value={formData[key]?.[0] || ""}
//   onChange={(e) => {
//     let val = e.target.value;

//     // Allow only digits and a single decimal point
//     val = val.replace(/[^0-9.]/g, "");
//     const parts = val.split(".");
//     if (parts.length > 2) {
//       val = parts[0] + "." + parts.slice(1).join("");
//     }

//     handleChange(e.target.name, val, 0);
//   }}
//   onKeyDown={(e) => {
//     // block '-', '+', 'e', 'E', arrow keys
//     if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
//       e.preventDefault();
//     }
//   }}
//   onWheel={(e) => e.target.blur()} // disable mouse scroll increment
//   className="form-input"
//   inputProps={{
//     inputMode: "decimal", // numeric keypad for mobile
//     pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
//     min: 0,
//   }}
// />

//                       </td>
//                       <td>
//                         <TextField
//   variant="outlined"
//   size="small"
//   fullWidth
//   type="text" // prevents browser spinners
//   name={key}
//   value={formData[key]?.[1] || ""}
//   onChange={(e) => {
//     let val = e.target.value;

//     // Allow only digits and a single decimal point
//     val = val.replace(/[^0-9.]/g, "");
//     const parts = val.split(".");
//     if (parts.length > 2) {
//       val = parts[0] + "." + parts.slice(1).join("");
//     }

//     handleChange(e.target.name, val, 1);
//   }}
//   onKeyDown={(e) => {
//     // block '-', '+', 'e', 'E', arrow keys
//     if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
//       e.preventDefault();
//     }
//   }}
//   onWheel={(e) => e.target.blur()} // disable mouse scroll increment
//   className="form-input"
//   inputProps={{
//     inputMode: "decimal", // numeric keypad for mobile
//     pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
//     min: 0,
//   }}
// />

//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}


//         {currentStep === 4 && (
//           <>
//             <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
//             <div className="quantitative-form">
//               <table className="quant-table">
//                 <thead>
//                   <tr>
//                     <th>S.No</th>
//                     <th>Particulars</th>
//                     <th>2024-25</th>
//                     <th>2023-24</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {part2.map(([num, label, key]) => (
//                     <tr key={key || num}>
//                       <td>{num}</td>
//                       <td>{label}</td>
//                       <td>
//                         <TextField
//   variant="outlined"
//   size="small"
//   fullWidth
//   type="text" // prevents browser spinners
//   name={key}
//   value={formData[key]?.[0] || ""}
//   onChange={(e) => {
//     let val = e.target.value;

//     // Allow only digits and a single decimal point
//     val = val.replace(/[^0-9.]/g, "");
//     const parts = val.split(".");
//     if (parts.length > 2) {
//       val = parts[0] + "." + parts.slice(1).join("");
//     }

//     handleChange(e.target.name, val, 0);
//   }}
//   onKeyDown={(e) => {
//     // block '-', '+', 'e', 'E', arrow keys
//     if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
//       e.preventDefault();
//     }
//   }}
//   onWheel={(e) => e.target.blur()} // disable mouse scroll increment
//   className="form-input"
//   inputProps={{
//     inputMode: "decimal", // numeric keypad for mobile
//     pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
//     min: 0,
//   }}
// />

//                       </td>
//                       <td>
//                         <TextField
//   variant="outlined"
//   size="small"
//   fullWidth
//   type="text" // prevents browser spinners
//   name={key}
//   value={formData[key]?.[1] || ""}
//   onChange={(e) => {
//     let val = e.target.value;

//     // Allow only digits and a single decimal point
//     val = val.replace(/[^0-9.]/g, "");
//     const parts = val.split(".");
//     if (parts.length > 2) {
//       val = parts[0] + "." + parts.slice(1).join("");
//     }

//     handleChange(e.target.name, val, 1);
//   }}
//   onKeyDown={(e) => {
//     // block '-', '+', 'e', 'E', arrow keys
//     if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
//       e.preventDefault();
//     }
//   }}
//   onWheel={(e) => e.target.blur()} // disable mouse scroll increment
//   className="form-input"
//   inputProps={{
//     inputMode: "decimal", // numeric keypad for mobile
//     pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
//     min: 0,
//   }}
// />

//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="form-group">
//                 <label htmlFor="comment">Comments</label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   // maxLength={COMMENT_MAX_LENGTH}
//                   value={formData.comment}
//                   onChange={(e) => handleChange('comment', e.target.value)}
//                   className="form-textarea"
//                   placeholder="Comments in (200 words) against input parameter, if any"
//                   rows={4}
//                 />
//                 {fieldErrors.comment && (
//                   <span className="error-tooltip" id="comment-error" role="alert">
//                     {fieldErrors.comment}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//         {currentStep === 5 && (
//           <>
//             <h3 className="step-title">Step 5: Attachments & Declaration</h3>

//             <div className="form-group">
//               <label>List of Attachments (Optional):</label>
//               <table className="quant-table">
//                 <thead>
//                   <tr>
//                     <th>S. No.</th>
//                     <th>Description</th>
//                     <th>Upload (jpg, png, pdf; max 5 MB)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {[1, 2, 3, 4].map((num) => {
//                     const key = `attachments${num}`;
//                     const attachment = formData[key];
//                     return (
//                       <tr key={key}>
//                         <td>{num}</td>
//                         <td>
//                           <input
//                             type="text"
//                             name={`${key}.description`}
//                             value={attachment.description}
//                             onChange={(e) => handleAttachmentChange(key, 'description', e.target.value)}
//                             placeholder="Enter description"
//                             maxLength={FIELD_MAX_LENGTH}
//                             className="form-input"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="file"
//                             accept=".jpg,.png,.pdf"
//                             onChange={(e) => handleAttachmentChange(key, 'file', e.target.files[0], e)}
//                             className="form-input mt-4"
//                           />
//                           {attachment.file && (
//                             <p className="file-name">Selected file: {attachment.file.name}</p>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             <div className="form-group">
//               <label>
//                 Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span aria-hidden="true" className="text-red">*</span>
//               </label>
//               <div className="form-navigation">
//                 <button type="button" onClick={handlePrint} className="btn btn-outline">
//                   Print Preview
//                 </button>
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="approvingAuthoritySignature">
//                 Upload Document with Approving Authority Signature (Director/Board Level)<span aria-hidden="true" className="text-red">*</span>:
//               </label>
//               <input
//                 type="file"
//                 id="approvingAuthoritySignature"
//                 accept=".jpg,.png,.pdf"
//                 onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
//                 className={`form-input mt-4 ${fieldErrors.approvingAuthoritySignature ? 'has-error' : ''}`}
//                 aria-describedby="approvingAuthoritySignature-error"
//                 required
//               />
//               {formData.approvingAuthoritySignature && (
//                 <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
//               )}
//               {fieldErrors.approvingAuthoritySignature && (
//                 <span className="error-tooltip" id="approvingAuthoritySignature-error" role="alert">
//                   {fieldErrors.approvingAuthoritySignature}
//                 </span>
//               )}
//             </div>

//             <div className="form-group">
//               <label>
//                 <input
//                   id="declaration"
//                   type="checkbox"
//                   name="declaration"
//                   checked={formData.declaration}
//                   onChange={(e) => handleChange('declaration', e.target.checked)}
//                   className={`form-checkbox ${fieldErrors.declaration ? 'has-error' : ''}`}
//                   aria-describedby="declaration-error"
//                   required
//                 />{' '}
//                 I declare that the information submitted is true and complete.
//               </label>
//               {fieldErrors.declaration && (
//                 <span className="error-tooltip" id="declaration-error" role="alert">
//                   {fieldErrors.declaration}
//                 </span>
//               )}

//             </div>
//           </>
//         )}
//       </div>
//     );
//   };
//   useEffect(() => {
//     // Scroll window to top smoothly
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [currentStep]);

//   return (
//     <div className="sidebar-guideline-container">
//       <SidebarGuideline
//         isOpen={true}
//         sidebarItems={[{ id: 'Guideline', label: 'Guideline' }]}
//         activeItem={activeItem}
//         setActiveItem={setActiveItem}
//         selectedAwardCategory={formData.category}
//       />
//       <div className="application-form">
//         <div className="form-header">
//           <h1>
//             Category : {awardTitle}
//           </h1>
//           <h6>Step {currentStep} of 5</h6>
//         </div>
//         {error && <div className="error">{error}</div>}
//         {isSubmitted ? (
//           <div className="thank-you-message">
//             <h2>Thank you for your submission!</h2>
//             <p>Your registration has been successfully submitted.</p>
//             <button onClick={() => setIsSubmitted(false)}>Submit Another Response</button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             {renderStepContent()}
//             {currentStep === 1 && (
//               <div className="form-navigation-step1">
//                 <button type="button" onClick={handleSaveDraft} className="btn btn-outline">
//                   <Save size={16} /> Save Draft
//                 </button>
//                 <button type="button" onClick={nextStep} className="btn btn-primary">
//                   Next <ChevronRight size={16} />
//                 </button>
//               </div>
//             )}
//             {currentStep > 1 && (
//               <div className="form-navigation">
//                 <button type="button" onClick={prevStep} className="btn btn-outline">
//                   <ChevronLeft size={16} /> Previous
//                 </button>
//                 <button type="button" onClick={handleSaveDraft} className="btn btn-outline">
//                   <Save size={16} /> Save Draft
//                 </button>
//                 {currentStep < 5 && (
//                   <button type="button" onClick={nextStep} className="btn btn-primary">
//                     Next <ChevronRight size={16} />
//                   </button>
//                 )}
//                 {currentStep === 5 && (
//                   <button
//                     type="submit"
//                     className="btn btn-success"
//                     onClick={(e) => {
//                       if (!window.confirm('Are you sure you want to submit?')) {
//                         e.preventDefault();
//                       }
//                     }}
//                   >
//                     Submit
//                   </button>
//                 )}
//               </div>
//             )}
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegistrationCBG;

// src/components/RegistrationCBG.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import apiClient from '../api/axiosClient';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';
import SidebarGuideline from "./SidebarGuideline"
import TextField from "@mui/material/TextField";

// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const COMPANY_PROFILE_MAX_LENGTH = 300;
const COMMENT_MAX_LENGTH = 200;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const RegistrationCBG = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const awardTitle = location.state?.awardTitle || 'CBG Company of the Year';

  // Form state initialization
  const [formData, setFormData] = useState({
    Organisationname: '',
    category: 'CBG Company of the Year',
    mailingAddress: '',
    authorityName: '',
    authorityTitle: '',
    authorityPhone: '',
    authorityLandline: "",
    authorityEmail: '',
    applicant_name: "",
    applicant_phone: "",
    applicant_email: "",
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    companyProfile: '',
    approvingAuthoritySignature: null,
    declaration: false,
    comment: '',
    retailOutlets2024: ['', ''],
    install2024: ['', ''],
    actual2024: ['', ''],
    safety2024: ['', ''],
    accident_rate2024: ['', ''],
    totalhourworked2024: ['', ''],
    injury2024: ['', ''],
    incident_rate2024: ['', ''],
    lubricantsSales2024: ['', ''],
    patent2024: ['', ''],
    national2024: ['', ''],
    international2024: ['', ''],
    commercial2024: ['', ''],
    attachments1: { description: '', file: null },
    attachments2: { description: '', file: null },
    attachments3: { description: '', file: null },
    attachments4: { description: '', file: null },
  });

  // ⭐ ADDED - helper to produce a storage-safe copy of formData
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
      const prefillRaw = sessionStorage.getItem('registrationCBG_prefill');
      if (prefillRaw) {
        const prefill = JSON.parse(prefillRaw);
        if (prefill && typeof prefill === 'object') {
          setFormData((prev) => ({ ...prev, ...prefill }));
          if (prefill.step) setCurrentStep(Number(prefill.step));
        }
        // remove after consuming so it doesn't override later edits
        sessionStorage.removeItem('registrationCBG_prefill');
      }
    } catch (err) {
      // ignore parse errors
    }

    // Note: we avoid loading large File objects here — the draft loader below (in another effect) may populate non-file fields.
  }, []);

  // UI State
  const [currentStep, setCurrentStep] = useState(1);
  const [copyApplicantData, setCopyApplicantData] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // ⭐ ADDED - On mount, if there's a saved draft, merge its formData and step into state.
  useEffect(() => {
    try {
      const draftRaw = localStorage.getItem('registrationCBGDraft');
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

  // Handle changes for inputs/textareas/selects
  const handleChange = (name, value, index = null) => {
    if ([1, 2, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (name === 'companyProfile') applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
      else if (name === 'comment') applicableMaxLength = COMMENT_MAX_LENGTH;

      if (typeof value === 'string') {
        if (name === 'companyProfile') {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed.");
            return;
          }
        } else if (name === 'comment') {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            alert("Maximum 200 words allowed in Comments.");
            return;
          }
        } else if (value.length > applicableMaxLength) {
          alert(`Value cannot exceed ${applicableMaxLength} characters.`);
          return;
        }
      }
    }

    // Name validation
    if (['Organisationname', 'authorityName', 'contact_name'].includes(name)) {
      const isValid = /^[A-Za-z\s]*$/.test(value);
      if (!isValid && value !== '') {
        alert('Only letters and spaces are allowed.');
        return;
      }
    }

    // Phone validation
    if (name === 'authorityPhone' || name === 'contact_phone') {
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

    // Quantitative fields validation
    if (index !== null) {
      if (value === '') {
        clearFieldError(name);
      } else {
        const numVal = Number(value);
        if (numVal < 0) {
          alert('Value cannot be negative.');
          return;
        } else {
          clearFieldError(name);
        }
      }
      setFormData(prev => {
        if (index !== null) {
          const existing = Array.isArray(prev[name]) ? prev[name] : [];
          const updated = [...existing];
          updated[index] = value;
          return { ...prev, [name]: updated };
        }
        return { ...prev, [name]: value };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: typeof value === 'boolean' ? value : value,
      }));
    }

    if (name === 'Organisationname' && value && currentStep === 1) setError('');
    if (name === 'mailingAddress' && value.trim() && currentStep === 1) setError('');
    if (name === 'authorityName' && value && currentStep === 2) setError('');
    if (name === 'authorityTitle' && value && currentStep === 2) setError('');
    if (name === 'authorityEmail' && value && currentStep === 2) setError('');
    if (name === 'authorityPhone' && value && currentStep === 2) setError('');
  };

  // Handle checkbox for copying applicant data
  const handleCopyApplicantToggle = (e) => {
    const checked = e.target.checked;
    const model = {
      contact_name: "",
      contact_phone: "",
      contact_email: "",
    };

    if (checked) {
      const userInfo = JSON.parse(sessionStorage.getItem('user_info') || '{}');
      if (userInfo) {
        model.contact_name = userInfo.applicant_name || userInfo.name || '';
        model.contact_phone = userInfo.applicant_phone || userInfo.phone || '';
        model.contact_email = userInfo.email || userInfo.applicant_email || '';
      }
    };

    setFormData((prev) => ({ ...prev, ...model }))
    setCopyApplicantData(checked);
    clearFieldError("contact_name");
    clearFieldError("contact_phone");
    clearFieldError("contact_email");
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

  const handlePrint = () => {
    // ... your existing print logic remains unchanged
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
        <h2>Organization & Contact Details</h2>
        <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
        <p><strong>Postal Address:</strong> ${formData.mailingAddress || ''}</p>
        <p><strong>Approving Authority Name:</strong>  ${formData.authorityName || ""}</p>
        <p><strong>Approving Authority Designation:</strong> ${formData.authorityTitle || ""}</p>
        <p><strong>Approving Authority Phone:</strong> ${formData.authorityPhone || ""}</p>
        <p><strong>Approving Authority Landline:</strong> ${formData.authorityPhone || ""}</p>

        <p><strong>Approving Authority Email:</strong> ${formData.authorityEmail || ""}</p>

        <h2>Nodal Official Contact Details:</h2>
        <p><strong>Contact Name:</strong> ${formData.contact_name || ''}</p>
        <p><strong>Contact Phone:</strong> ${formData.contact_phone || ''}</p>
        <p><strong>Contact Email:</strong> ${formData.contact_email || ''}</p>
        <p><strong>Provide a brief write up on your company’s profile:</strong> ${formData.companyProfile || ''}</p>
        <h2>Quantitative Information - Part 1</h2>
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
            ${part1.map(([num, label, key]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[key][0] || ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[key][1] || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h2>Quantitative Information - Part 2</h2>
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
            ${part2.map(([num, label, key]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[key][0] || ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[key][1] || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h2>Attachments</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;width:10px">S.No</th>
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
        <br/>
        <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ""}</p>
        <p><strong>Approving Authority Designation:</strong> ${formData.authorityTitle || ""}</p>
        <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
        <p><strong>Approving Authority Signature:</strong></p>
      </div>
    `;
    const printWindow = window.open("", "_blank", "height=600,width=800");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${awardTitle || "Form Print"}</title>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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
        alert('Authority designation is required.');
        return;
      }
      if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
        alert('Please enter a valid Authority email.');
        return;
      }
      if (!formData.authorityLandline) {
        alert('Authority Landline is required.');
        return;
      }
      if (!formData.contact_name) {
        alert('Contact name is required.');
        return;
      }
      if (formData.contact_email && !validateEmail(formData.contact_email)) {
        alert('Please enter a valid Contact email.');
        return;
      }
      if (formData.contact_phone && !validatePhone(formData.contact_phone) && !copyApplicantData) {
        alert('Contact phone must be exactly 10 digits.');
        return;
      }
      if (!formData.companyProfile) {
        alert('Company Profile is required.');
        return;
      }
    }
    if (currentStep === 3 && hasEmptyFieldsInStep(currentStep)) {
      if (!window.confirm('Data not entered, If you wish to continue?')) {
        return; // Stop advancing
      }
    }

    if (currentStep === 4 && hasEmptyFieldsInStep(currentStep)) {
      if (!window.confirm('Data not entered, If you wish to continue?')) {
        return;
      }
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
      localStorage.setItem('registrationCBGDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) Validation
    if (!formData.declaration) {
      alert("Please accept the declaration.");
      return;
    }
    if ((formData.authorityPhone || "").length !== 10) {
      alert("Authority phone must be exactly 10 digits.");
      return;
    }

    // 2) Build FormData object
    const fd = new FormData();

    // 2a) Flat fields
    const flatMap = {
      organisation_name: formData.Organisationname,
      category: formData.category,
      company_name: formData.companyName || "",
      mailing_address: formData.mailingAddress,

      firstname: formData.firstname,
      lastname: formData.lastname,

      authority_name: formData.authorityName,
      authority_title: formData.authorityTitle,
      authority_phone: formData.authorityPhone,
      authority_email: formData.authorityEmail,

      contact_name: formData.contact_name,
      contact_phone: formData.contact_phone,
      contact_email: formData.contact_email,

      company_profile: formData.companyProfile,
      comment: formData.comment,
      declaration: String(formData.declaration),
    };

    Object.entries(flatMap).forEach(([key, val]) => {
      fd.append(key, val || "");
    });

    // 2b) Quantitative arrays (two values: 2024, 2023)
    const metrics = [
      ["retail_outlets", formData.retailOutlets2024],
      ["install_capacity", formData.install2024],
      ["actual_prod", formData.actual2024],
      ["safety_index", formData.safety2024],
      ["accident_rate", formData.accident_rate2024],
      ["totalhourworked2024", formData.totalhourworked2024],
      ["lost_injury_rate", formData.injury2024],
      ["incident_rate", formData.incident_rate2024],
      ["lubricants_sales", formData.lubricantsSales2024],
      ["patents_filed", formData.patent2024],
      ["patents_national", formData.national2024],
      ["patents_international", formData.international2024],
      ["patents_commercial", formData.commercial2024],
    ];

    metrics.forEach(([base, arr]) => {
      const [v2024, v2023] = arr || ["", ""];
      fd.append(`${base}_2024`, v2024 || "");
      fd.append(`${base}_2023`, v2023 || "");
    });

    // 2c) File uploads
    if (formData.approvingAuthoritySignature instanceof File) {
      fd.append("approving_authority_file", formData.approvingAuthoritySignature);
    }

    [1, 2, 3, 4].forEach((n) => {
      const { description, file } = formData[`attachments${n}`] || {};
      fd.append(`attachments${n}_desc`, description || "");
      if (file instanceof File) {
        fd.append(`attachments${n}`, file);
      }
    });

    // 3) Axios POST request
    try {
      // const res = await apiClient.post("/registration-cbg/", fd, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      alert("Submitted successfully!");
      setIsSubmitted(true);
      // console.log("Server response:", res.data);

      // ⭐ ADDED - persist a lightweight submitted record in localStorage.applications
      // try {
      //   const approvingUrl =
      //     res?.data?.approving_authority_file_url ??
      //     res?.data?.approving_authority_file ??
      //     res?.data?.file_url ??
      //     '';

      //   // if server didn't return a URL but user uploaded a file, create an object URL as a fallback (not persistent across sessions)
      //   const fallbackUrl = (!approvingUrl && formData.approvingAuthoritySignature instanceof File)
      //     ? URL.createObjectURL(formData.approvingAuthoritySignature)
      //     : '';

      //   const submittedApp = {
      //     // id: res?.data?.id ?? `cbg-${Date.now()}`,
      //     title: formData.category || 'CBG Company of the Year',
      //     status: 'Submitted',
      //     lastModified: new Date().toISOString().split('T')[0],
      //     progress: 100,
      //     approvingAuthoritySignatureUrl: approvingUrl || fallbackUrl,
      //     // store some metadata for convenience
      //     applicant_name: formData.applicant_name || '',
      //     contact_phone: formData.contact_phone || '',
      //     organisation: formData.Organisationname || '',
      //   };

      //   const raw = localStorage.getItem('applications');
      //   let arr = [];
      //   try { arr = JSON.parse(raw) || []; } catch (err) { arr = []; }
      //   arr.unshift(submittedApp);
      //   localStorage.setItem('applications', JSON.stringify(arr));
      // } catch (persistErr) {
      //   console.warn('Failed to persist submitted application locally:', persistErr);
      // }

      // ⭐ ADDED - remove the draft after successful submit (if it exists)
      try {
        localStorage.removeItem('registrationCBGDraft');
      } catch (err) {
        // ignore
      }

    } catch (err) {
      console.error("Submission error:", err.response || err);
      let msg =
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        err.message;

      // Custom message if duplicate organisation
      if (
        err.response?.data?.organisation_name &&
        String(err.response.data.organisation_name).includes("application limit")
      ) {
        msg = "You have reached the application limit. Only 1 application per Organization is allowed.";
      }

      alert("Submission failed: " + msg);
    }
  };

  const headerNums = ["4", "5"];
  const part1 = [
    ['1', 'Absolute CapEx (INR - crores)', 'retailOutlets2024'],
    ['2', 'Installed Capacity (MTPA)', 'install2024'],
    ['3', 'Actual Production (MTPA)', 'actual2024'],
    ['4', 'Safety', ],
    ['4.1', 'Number of Fatalities', 'accident_rate2024'],
    ['4.2', 'Total hours worked', 'totalhourworked2024'],
    ['4.3', 'Lost Time Injuries', 'injury2024'],
    ['4.4', 'Total Recordable Incident Rate', 'incident_rate2024'],
  ];

  const part2 = [
    ['5', 'R&D in CBG Area',],
    ['5.1', 'Number of Patents filed', 'patent2024'],
    ['5.2', 'Number of Patents granted - National', 'national2024'],
    ['5.3', 'Number of Patents Granted – International', 'international2024'],
    ['5.4', 'Number of Patents commercialized', 'commercial2024'],
  ];
  // const hasEmptyFieldsInStep = (step) => {
  //   // Pick relevant data array for validation
  //   const stepData = step === 3 ? part1 : part2;

  //   for (const [, , key] of stepData) {
  //     const arr = formData[key];
  //     // Check if the key exists and is an array of two year-values
  //     if (!arr || arr.some(v => v === '' || v === undefined || v === null)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };
const hasEmptyFieldsInStep = (step) => {
  const stepData = step === 3 ? part1 : part2;

  for (const [, , key] of stepData) {
    if (!key) continue; 

    const val = formData[key];
    if (val === undefined || val === null || val === "") {
      return true;
    }
    if (
      Array.isArray(val) &&
      val.some((v) => v === "" || v === null || v === undefined)
    ) {
      return true;
    }
  }

  return false;
};

  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;

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
                Organisation Name
                {/* <span aria-hidden="true" className="text-red">*</span> */}
              </label>
              <input
                id="Organisationname"
                name="Organisationname"
                type="text"
                maxLength={FIELD_MAX_LENGTH}
                value={formData.Organisationname}
                onChange={(e) => handleChange('Organisationname', e.target.value)}
                // disabled ={true}
                aria-describedby="Organisationname-error"
                className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
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
                onChange={(e) => handleChange('mailingAddress', e.target.value)}
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
                <p className="note">Approving authority should be concerned  Director /Board level executive. </p>
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
                    onChange={(e) => handleChange('authorityName', e.target.value)}
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
                    onChange={(e) => handleChange('authorityTitle', e.target.value)}
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
                    Landline: <span className="text-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="authorityLandline"
                    type="number"
                    name="authorityLandline"
                    value={formData.authorityLandline}
                    onChange={(e) => handleChange('authorityLandline', e.target.value)}
                    // onBlur={(e) => handleBlur('authorityLandline', e.target.value)}
                    className={`form-input ${!formData.authorityLandline && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="Landline number"
                    aria-required="true"
                    aria-describedby={fieldErrors.authorityLandline ? 'authorityLandline-error' : undefined}
                  />
                  {!formData.authorityLandline && currentStep === 2 && <span className="error-tooltip">Authority Landline Number is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityPhone">
                    Mobile:
                    {/* <span className="text-red" aria-hidden="true">*</span> */}
                  </label>
                  <input
                    id="authorityPhone"
                    type="tel"
                    name="authorityPhone"
                    value={formData.authorityPhone}
                    onChange={(e) => handleChange('authorityPhone', e.target.value)}
                    // onBlur={(e) => handleBlur('authorityPhone', e.target.value)}
                    className={`form-input`}
                    placeholder="Phone number"
                    maxLength={PHONE_MAX_LENGTH}
                    aria-required="true"
                  // aria-describedby={fieldErrors.authorityPhone ? 'authorityPhone-error' : undefined}
                  />
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
                    onChange={(e) => handleChange('authorityEmail', e.target.value)}
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
                      // checked={copyApplicantData}
                      onChange={handleCopyApplicantToggle}
                      className="form-checkbox"
                    />{" "}
                    Same as applicant
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="contact_name">
                    Name <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="contact_name"
                    name="contact_name"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contact_name}
                    onChange={(e) => handleChange("contact_name", e.target.value)}
                    placeholder="Contact name"
                    disabled={copyApplicantData}
                    className={`form-input ${!formData.contact_name && currentStep === 2 ? "has-error" : ""}`}
                    aria-describedby="contact_name-error"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_phone">
                    Phone:<span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="contact_phone"
                    name="contact_phone"
                    type="tel"
                    maxLength={PHONE_MAX_LENGTH}
                    value={formData.contact_phone}
                    onChange={(e) => handleChange("contact_phone", e.target.value)}
                    aria-describedby="contact_phone-error"
                    disabled={copyApplicantData}
                    placeholder="10-digit phone number"
                    className={`form-input ${!formData.contact_phone && currentStep === 2 ? "has-error" : ""}`}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_email">Email</label>
                  <input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contact_email}
                    onChange={(e) => handleChange("contact_email", e.target.value)}
                    placeholder="Contact email"
                    disabled={copyApplicantData}
                    className={`form-input ${fieldErrors.contact_email ? "has-error" : ""}`}
                    aria-describedby="contact_email-error"
                  />
                </div>
              </section>
            </div>

            <div className="form-group">
              <label htmlFor="companyProfile">Provide a brief write up on your company’s profile.  </label>
              <p className="note">(within 300 words) </p>
              <textarea
                id="companyProfile"
                name="companyProfile"
                value={formData.companyProfile}
                rows={6}
                // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                onChange={(e) => handleChange('companyProfile', e.target.value)}
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

        {/* {currentStep === 3 && (
          <>
            <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
            <div className="quantitative-form">
              <table className="quant-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Particulars</th>
                    <th>2024-25</th>
                    <th>2023-24</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {part1.map(([num, label, key]) => (
                    <tr key={key || num}>
                      <td>{num}</td>
                      <td>{label}</td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="text" // prevents browser spinners
                          name={key}
                          value={formData[key]?.[0] || ""}
                          onChange={(e) => {
                            let val = e.target.value;

                            // Allow only digits and a single decimal point
                            val = val.replace(/[^0-9.]/g, "");
                            const parts = val.split(".");
                            if (parts.length > 2) {
                              val = parts[0] + "." + parts.slice(1).join("");
                            }

                            handleChange(e.target.name, val, 0);
                          }}
                          onKeyDown={(e) => {
                            // block '-', '+', 'e', 'E', arrow keys
                            if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
                              e.preventDefault();
                            }
                          }}
                          onWheel={(e) => e.target.blur()} // disable mouse scroll increment
                          className="form-input"
                          inputProps={{
                            inputMode: "decimal", // numeric keypad for mobile
                            pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                            min: 0,
                          }}
                        />


                      </td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="text" // prevents browser spinners
                          name={key}
                          value={formData[key]?.[1] || ""}
                          onChange={(e) => {
                            let val = e.target.value;

                            // Allow only digits and a single decimal point
                            val = val.replace(/[^0-9.]/g, "");
                            const parts = val.split(".");
                            if (parts.length > 2) {
                              val = parts[0] + "." + parts.slice(1).join("");
                            }

                            handleChange(e.target.name, val, 1);
                          }}
                          onKeyDown={(e) => {
                            // block '-', '+', 'e', 'E', arrow keys
                            if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
                              e.preventDefault();
                            }
                          }}
                          onWheel={(e) => e.target.blur()} // disable mouse scroll increment
                          className="form-input"
                          inputProps={{
                            inputMode: "decimal", // numeric keypad for mobile
                            pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                            min: 0,
                          }}
                        />

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )} */}
{currentStep === 3 && (
  <>
    <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
    <div className="quantitative-form">
      <table className="quant-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Particulars</th>
            <th>2024-25</th>
            <th>2023-24</th>
          </tr>
        </thead>
        <tbody>
          {part1.map(([num, label, key], index) => {
            if (headerNums.includes(num.toString())) {
              return (
                <tr key={`header-${num}-${index}`} >
                  <td className="sno-cell">{num}</td>
                  <td className="label-cell" colSpan={3}>
                    {label}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={key || num}>
                <td>{num}</td>
                <td>{label}</td>
                <td>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="text"
                    name={key}
                    value={formData[key]?.[0] || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9.]/g, "");
                      const parts = val.split(".");
                      if (parts.length > 2) {
                        val = parts[0] + "." + parts.slice(1).join("");
                      }
                      handleChange(e.target.name, val, 0);
                    }}
                    onKeyDown={(e) => {
                      if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
                        e.preventDefault();
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    className="form-input"
                    inputProps={{
                      inputMode: "decimal",
                      pattern: "[0-9]*\\.?[0-9]*",
                      min: 0,
                    }}
                  />
                </td>
                <td>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="text"
                    name={key}
                    value={formData[key]?.[1] || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9.]/g, "");
                      const parts = val.split(".");
                      if (parts.length > 2) {
                        val = parts[0] + "." + parts.slice(1).join("");
                      }
                      handleChange(e.target.name, val, 1);
                    }}
                    onKeyDown={(e) => {
                      if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
                        e.preventDefault();
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    className="form-input"
                    inputProps={{
                      inputMode: "decimal",
                      pattern: "[0-9]*\\.?[0-9]*",
                      min: 0,
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
)}



        {/* {currentStep === 4 && (
          <>
            <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
            <div className="quantitative-form">
              <table className="quant-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Particulars</th>
                    <th>2024-25</th>
                    <th>2023-24</th>
                  </tr>
                </thead>
                <tbody>
                  {part2.map(([num, label, key]) => (
                    <tr key={key || num}>
                      <td>{num}</td>
                      <td>{label}</td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="text" // prevents browser spinners
                          name={key}
                          value={formData[key]?.[0] || ""}
                          onChange={(e) => {
                            let val = e.target.value;

                            // Allow only digits and a single decimal point
                            val = val.replace(/[^0-9.]/g, "");
                            const parts = val.split(".");
                            if (parts.length > 2) {
                              val = parts[0] + "." + parts.slice(1).join("");
                            }

                            handleChange(e.target.name, val, 0);
                          }}
                          onKeyDown={(e) => {
                            // block '-', '+', 'e', 'E', arrow keys
                            if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
                              e.preventDefault();
                            }
                          }}
                          onWheel={(e) => e.target.blur()} // disable mouse scroll increment
                          className="form-input"
                          inputProps={{
                            inputMode: "decimal", // numeric keypad for mobile
                            pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                            min: 0,
                          }}
                        />

                      </td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="text" // prevents browser spinners
                          name={key}
                          value={formData[key]?.[1] || ""}
                          onChange={(e) => {
                            let val = e.target.value;

                            // Allow only digits and a single decimal point
                            val = val.replace(/[^0-9.]/g, "");
                            const parts = val.split(".");
                            if (parts.length > 2) {
                              val = parts[0] + "." + parts.slice(1).join("");
                            }

                            handleChange(e.target.name, val, 1);
                          }}
                          onKeyDown={(e) => {
                            // block '-', '+', 'e', 'E', arrow keys
                            if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
                              e.preventDefault();
                            }
                          }}
                          onWheel={(e) => e.target.blur()} // disable mouse scroll increment
                          className="form-input"
                          inputProps={{
                            inputMode: "decimal", // numeric keypad for mobile
                            pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                            min: 0,
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
                  // maxLength={COMMENT_MAX_LENGTH}
                  value={formData.comment}
                  onChange={(e) => handleChange('comment', e.target.value)}
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
            </div>
          </>
        )} */}
{currentStep === 4 && (
  <>
    <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
    <div className="quantitative-form">
      <table className="quant-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Particulars</th>
            <th>2024-25</th>
            <th>2023-24</th>
          </tr>
        </thead>
        <tbody>
          {part2.map(([num, label, key], index) => {
            if (headerNums.includes(num.toString())) {
              return (
                <tr
                  key={`header-${num}-${index}`}
                  
                >
                  <td className="sno-cell">{num}</td>
                  <td className="label-cell" colSpan={3}>
                    {label}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={key || num}>
                <td>{num}</td>
                <td>{label}</td>
                <td>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="text"
                    name={key}
                    value={formData[key]?.[0] || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9.]/g, "");
                      const parts = val.split(".");
                      if (parts.length > 2) {
                        val = parts[0] + "." + parts.slice(1).join("");
                      }
                      handleChange(e.target.name, val, 0);
                    }}
                    onKeyDown={(e) => {
                      if (
                        ["-", "+", "e", "E"].includes(e.key) ||
                        e.key === "ArrowUp" ||
                        e.key === "ArrowDown"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    className="form-input"
                    inputProps={{
                      inputMode: "decimal",
                      pattern: "[0-9]*\\.?[0-9]*",
                      min: 0,
                    }}
                  />
                </td>
                <td>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="text"
                    name={key}
                    value={formData[key]?.[1] || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9.]/g, "");
                      const parts = val.split(".");
                      if (parts.length > 2) {
                        val = parts[0] + "." + parts.slice(1).join("");
                      }
                      handleChange(e.target.name, val, 1);
                    }}
                    onKeyDown={(e) => {
                      if (
                        ["-", "+", "e", "E"].includes(e.key) ||
                        e.key === "ArrowUp" ||
                        e.key === "ArrowDown"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    className="form-input"
                    inputProps={{
                      inputMode: "decimal",
                      pattern: "[0-9]*\\.?[0-9]*",
                      min: 0,
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="form-group">
        <label htmlFor="comment">Comments</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={(e) => handleChange("comment", e.target.value)}
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
                  <Save size={16} /> Print Preview
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="approvingAuthoritySignature">
                Upload Document with Approving Authority Signature
                (Director/Board Level)
                <span aria-hidden="true" className="text-red">
                  *
                </span>
                :
              </label>
              <input
                type="file"
                id="approvingAuthoritySignature"
                accept=".jpg,.png,.pdf"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files.length > 0) {
                    const confirmed = window.confirm(
                      "Are you sure the form is approved and signed by approving authority?"
                    );
                    if (!confirmed) {
                      // If user clicks "Cancel", clear the input
                      e.target.value = "";
                      return;
                    }
                    handleApprovingAuthorityChange(files);
                  }
                }}
                className={`form-input mt-4 ${fieldErrors.approvingAuthoritySignature ? "has-error" : ""
                  }`}
                aria-describedby="approvingAuthoritySignature-error"
                required
              />
              {formData.approvingAuthoritySignature && (
                <p className="file-name">
                  Selected file: {formData.approvingAuthoritySignature.name}
                </p>
              )}
              {formData.approvingAuthoritySignature && (
                <p className="file-name">
                  Uploaded file:{" "}
                  <a
                    href={
                      typeof formData.approvingAuthoritySignature === "string"
                        ? formData.approvingAuthoritySignature
                        : formData.approvingAuthoritySignature.url
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </p>
              )}




              {/* {attachment.url && !attachment.file && <p className="file-name"></p>} */}
              {fieldErrors.approvingAuthoritySignature && (
                <span
                  className="error-tooltip"
                  id="approvingAuthoritySignature-error"
                  role="alert"
                >
                  {fieldErrors.approvingAuthoritySignature}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>
                <input
                  id="declaration"
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={(e) => handleChange('declaration', e.target.checked)}
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
  useEffect(() => {
    const middlePosition = window.innerHeight / 2; // middle
    window.scrollTo({ top: middlePosition + 100, behavior: 'smooth' });
  }, [currentStep]);

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
            {awardTitle}
          </h1>
          <h6>Step {currentStep} of 5</h6>
        </div>
        {error && <div className="error">{error}</div>}
        {isSubmitted ? (
          <div className="thank-you-message">
            <h2>Thank you for your submission!</h2>
            <p>Your Application has been successfully submitted.</p>
            <button onClick={() => setIsSubmitted(false)}>
              Submit Another Application
            </button>
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

export default RegistrationCBG;
