// import React, { useState } from 'react';
// // import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../styles/FormProduction.css';

// const RegistrationYF = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [formData, setFormData] = useState({
//         Organisationname: '',
//         category: 'Young Achiever of the Year(Female)',
//         companyName: '',
//         mailingAddress: '',
//         authorityName: '',
//         authorityTitle: '',
//         authorityPhone: '',
//         authorityEmail: '',
//         authoritySignature: '',
//         HREmail: "",
//         HRName: "",
//         HRPhone: "",
//         copyApplicantData: false,
//         contactName: '',
//         contactPhone: '',
//         contactEmail: '',
//         Applicantjoining: "",
//         Applicantdetails: "",
//         Applicantprofile: "",
//         Applicantdesignation: "",
//         ApplicantDOB: "",
//         companyProfile: '',
//         awardJustification: '',
//         approvingAuthoritySignature: '',
//         declaration: false,
//         comment: '',
//         YF_1: "",
//         YF_2: "",
//         YF_3: "",
//         YF_4: "",
//         YF_5: "",
//         YF_6: "",
//         attachments1: { description: '', file: null },
//         attachments2: { description: '', file: null },
//         attachments3: { description: '', file: null },
//         attachments4: { description: '', file: null },
//     });
//     const [error, setError] = useState('');
//     const [copyApplicantData, setCopyApplicantData] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();
//     console.log('location.state:', location.state);
//     const awardTitle = location.state?.awardTitle || "Oil & Gas Production Company of the Year";

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
//             if (name === 'authorityPhone' || name === "HRPhone") {
//                 const numericValue = value.replace(/\D/g, '').slice(0, 10);
//                 setFormData(prev => ({ ...prev, [name]: numericValue }));
//                 if (numericValue.length > 10) {
//                     setError('phone number must not exceed 10 digits.');
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

//     const validateForm = () => {
//         const errors = {};

//         if (!formData.Organisationname?.trim()) {
//             errors.Organisationname = 'Organisation name is required';
//         }
//         if (!formData.authorityName?.trim()) {
//             errors.authorityName = 'Authority name is required';
//         }
//         if (!formData.authorityTitle?.trim()) {
//             errors.authorityTitle = 'Authority Designation is required';
//         }

//         if (!formData.contactEmail?.trim()) {
//             errors.contactEmail = 'Email is required';
//         } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
//             errors.contactEmail = 'Invalid email format';
//         }
//         if (!formData.HREmail?.trim()) {
//             errors.contactEmail = 'Email is required';
//         } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
//             errors.contactEmail = 'Invalid email format';
//         }

//         return errors;
//     };

//     const handleAttachmentChange = (key, field, value, event = null) => {
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
//         if (currentStep === 2 && !formData.ApplicantDOB) {
//             setError('Applicant DOB is required.');
//             return;
//         }
//         if (currentStep === 2 && !formData.Applicantdesignation) {
//             setError('Applicant designation is required.');
//             return;
//         }
//         if (currentStep === 2 && !formData.Applicantjoining) {
//             setError('Applicant joining date is required.');
//             return;
//         }
//         if (currentStep === 2 && !formData.Applicantprofile) {
//             setError('Applicant Profile is required.');
//             return;
//         }
//         if (currentStep === 2 && !formData.authorityTitle) {
//             setError('Authority designation is required.');
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

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.declaration) {
//     alert('Please accept the declaration before submitting.');
//     return;
//   }

//   const org = formData.Organisationname?.trim();
//   if (!org) {
//     alert('Organisation name is required.');
//     return;
//   }

//   if (!navigator.onLine) {
//     alert('You appear to be offline. Please check your internet connection.');
//     return;
//   }

//   // 1) Check count
//   try {
//     const res = await fetch(
//       `${ACTIVE_API_BASE_URL}/registration-youngfemale/count/?org=${encodeURIComponent(org)}`
//     );
//     if (!res.ok) {
//       const txt = await res.text();
//       console.error('Count error', res.status, txt);
//       alert('Could not verify submission count. Try again later.');
//       return;
//     }
//     const { count } = await res.json();
//     if (count >= 3) {
//       alert('you have reach your form limit the max limit is 3 for this form');
//       return;
//     }
//   } catch (err) {
//     console.error('Network error on count', err);
//     alert(`Network error verifying count. Is API running at ${ACTIVE_API_BASE_URL}?`);
//     return;
//   }

//   // 2) Build FormData (same mapping as before, just YM_ fields):
//   const fd = new FormData();
//   fd.append('organisation_name',     formData.Organisationname);
//   fd.append('category',              formData.category);
//   fd.append('company_name',          formData.companyName);
//   fd.append('mailing_address',       formData.mailingAddress);

//   fd.append('authority_name',        formData.authorityName);
//   fd.append('authority_title',       formData.authorityTitle);
//   fd.append('authority_phone',       formData.authorityPhone);
//   fd.append('authority_email',       formData.authorityEmail);

//   fd.append('hr_name',               formData.HRName);
//   fd.append('hr_phone',              formData.HRPhone);
//   fd.append('hr_email',              formData.HREmail);

//   fd.append('contact_name',          formData.contactName);
//   fd.append('contact_phone',         formData.contactPhone);
//   fd.append('contact_email',         formData.contactEmail);

//   fd.append('applicant_dob',         formData.ApplicantDOB);
//   fd.append('applicant_designation', formData.Applicantdesignation);
//   fd.append('applicant_profile',     formData.Applicantprofile);
//   fd.append('applicant_details',     formData.Applicantdetails);
//   fd.append('applicant_joining',     formData.Applicantjoining);

//   fd.append('company_profile',       formData.companyProfile);
//   fd.append('award_justification',   formData.awardJustification);
//   fd.append('comment',               formData.comment);
//   fd.append('declaration',           formData.declaration);

//   [1,2,3,4,5,6].forEach(n => {
//     fd.append(`yf_${n}`, formData[`YF_${n}`] || '');
//   });

//   if (formData.approvingAuthoritySignature) {
//     fd.append('approving_authority_file', formData.approvingAuthoritySignature);
//   }
//   [1,2,3,4].forEach(num => {
//     const slot = formData[`attachments${num}`] || {};
//     fd.append(`attachments${num}_desc`, slot.description || '');
//     if (slot.file) {
//       fd.append(`attachments${num}`, slot.file);
//     }
//   });

//   // 3) POST to create
//   try {
//     const postRes = await fetch(
//       `${ACTIVE_API_BASE_URL}/registration-youngfemale/`,
//       { method: 'POST', body: fd }
//     );
//     const data = await postRes.json();
//     if (!postRes.ok) {
//       console.error('Create error', data);
//       alert(data.error || 'Submission failed; see console.');
//       return;
//     }
//     alert('Submitted successfully!');
//     setIsSubmitted(true);
//     setCurrentStep(1);
//     // … reset formData …
//   } catch (err) {
//     console.error('Network error on submit', err);
//     alert(`Network error submitting. Is API running at ${ACTIVE_API_BASE_URL}?`);
//   }
// };

//     const handlePrint = () => {
//         const printContent = `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h1 style="text-align: center; color: #1e40af;">Registration Form: ${awardTitle}</h1>
//         <p style="text-align: center;">Submission Date and Time: Wednesday, July 30, 2025, 03:12 PM IST</p>
//         <h2>Organization Details</h2>
//         <p><strong>Organisation Name:</strong> ${formData.Organisationname}</p>
//         <p><strong>Category:</strong> ${formData.category}</p>
//         <p><strong>Mailing Address:</strong> ${formData.mailingAddress}</p>
//         <h2>Company Details</h2>
//         <p><strong>Name of Company:</strong> ${formData.companyName}</p>
//         <p><strong>Authority Name:</strong> ${formData.authorityName}</p>
//         <p><strong>Authority Title:</strong> ${formData.authorityTitle}</p>
//         <p><strong>Authority Phone:</strong> ${formData.authorityPhone}</p>
//         <p><strong>Authority Email:</strong> ${formData.authorityEmail}</p>
//         <h3>Corporate HR</h3>
//         <p><strong>HR Name:</strong> ${formData.HRName}</p>
//         <p><strong>HR Phone:</strong> ${formData.HRPhone}</p>
//         <p><strong>HR Email:</strong> ${formData.HREmail}</p>
//         <p><strong>Contact Name:</strong> ${formData.contactName}</p>
//         <p><strong>Contact Phone:</strong> ${formData.contactPhone}</p>
//         <p><strong>Contact Email:</strong> ${formData.contactEmail}</p>
//         <p><strong>Company Profile:</strong> ${formData.companyProfile}</p>
//         <h2>Applicant Details</h2>
//         <p><strong>Date of Birth:</strong> ${formData.ApplicantDOB}</p>
//         <p><strong>Designation:</strong> ${formData.Applicantdesignation}</p>
//         <p><strong>Career Profile:</strong> ${formData.Applicantprofile}</p>
//         <p><strong>Educational Qualifications:</strong> ${formData.Applicantdetails}</p>
//         <p><strong>Date of Joining:</strong> ${formData.Applicantjoining}</p>
//         <h2>Quantitative Information Part 1</h2>
//         <p><strong>1. Initiatives/exceptional contribution in the line of work:</strong> ${formData.YF_1}</p>
//         <p><strong>2. Examples of creativity/technique/imagination demonstrated in your line of work that set you apart from your peers:</strong> ${formData.YF_2}</p>
//         <p><strong>3. Leadership role played/example of project spearheaded by you/example of exceptional performance as team member in your line of work which helped you contributed differently from the defined level of expertise:</strong> ${formData.YF_3}</p>
//         <p><strong>4. How has the oil and gas sector/company benefited from your leadership/work?:</strong> ${formData.YF_4}</p>
//         <h2>Quantitative Information Part 2</h2>
//         <p><strong>5. Outline barriers or difficulties you faced and how they have been overcome:</strong> ${formData.YF_5}</p>
//         <p><strong>6. Work done/achievements (if any) in the area of environmental improvement/decarbonization/net zero targets:</strong> ${formData.YF_6}</p>
//         <p><strong>Comments:</strong> ${formData.comment}</p>
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
//         ['1', 'Initiatives/exceptional contribution in the line of work', 'YF_1'],
//         ['2', 'Examples of creativity/ technique/ imagination demonstrated in your line of work that set you apart from your peers ', 'YF_2'],
//         ['3', 'Leadership role played/example of project spearheaded by you/ example of exceptional performance as team member in your line of work which helped you contributed differently from the defined level of expertise ', 'YF_3'],
//         ['4', 'How has the oil and gas sector/company benefited from your leadership/ work? ', 'YF_4'],
//         ['5', 'Outline barriers or difficulties you faced and how they have been overcome ', 'YF_5'],
//         ['6', 'Work done/achievements (if any) in the area of environmental improvement/decarbonization/net zero targets.', 'YF_6'],
//     ];

//     const part1 = fullData.filter(([num]) => parseFloat(num) <= 4);
//     const part2 = fullData.filter(([num]) => parseFloat(num) > 4);

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
//                         <h3 className="step-title">Step 2: Authority , Contact & Applicant Details</h3>
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                             <div className="step-section">
//                                 <h4>Approving Authority</h4>
//                                 <p className="note">Approving authority should be CMD/MD in case of PSUs and CEO or equivalent senior executive in case of private Companies</p>
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
//                                 <h4>Corporate HR :</h4>
//                                 <div className="form-group">
//                                     <label>Name <span className="text-red">*</span></label>
//                                     <input
//                                         type="text"
//                                         name="HRName"
//                                         value={formData.HRName}
//                                         onChange={(e) => {
//                                             const value = e.target.value;
//                                             if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
//                                                 handleChange('HRName', value);
//                                             }
//                                         }}
//                                         className={`form-input ${!formData.HRName && currentStep === 2 ? 'has-error' : ''}`}
//                                         placeholder="Name"
//                                     />
//                                     {!formData.HRName && currentStep === 2 && <span className="error-tooltip">HR name is required</span>}
//                                 </div>

//                                 <div className="form-group">
//                                     <input
//                                         type="tel"
//                                         name="HRPhone"
//                                         value={formData.HRPhone}
//                                         onChange={(e) => handleChange('HRPhone', e.target.value)}
//                                         className={`form-input ${error ? 'has-error' : ''}`}
//                                         placeholder="Phone number"
//                                         maxLength={10}
//                                     />
//                                     {error && <span className="error-tooltip">{error}</span>}
//                                 </div>

//                                 <div className="form-group">
//                                     <input
//                                         type="email"
//                                         name="HREmail"
//                                         value={formData.HREmail}
//                                         onChange={(e) => handleChange('HREmail', e.target.value)}
//                                         className={`form-input ${!formData.HREmail && currentStep === 2 ? 'has-error' : ''}`}
//                                         placeholder="E-mail address"
//                                     />
//                                     {!formData.HREmail && currentStep === 2 && <span className="error-tooltip">Email is required</span>}
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
//                             <div className="step-section">
//                                 <h4>Applicant Details: <span className="text-red">*</span></h4>
//                                 <div className="form-group">
//                                     <label>Date of Birth of the Applicant: <span className="text-red">*</span></label>
//                                     <input
//                                         type="date"
//                                         name="ApplicantDOB"
//                                         value={formData.ApplicantDOB}
//                                         onChange={(e) => handleChange('ApplicantDOB', e.target.value)}
//                                         className={`form-input ${!formData.ApplicantDOB && currentStep === 2 ? 'has-error' : ''}`}

//                                         placeholder="DOB"
//                                     />
//                                     {!formData.ApplicantDOB && currentStep === 2 && <span className="error-tooltip">DOB is required</span>}
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Current Designation of the Applicant: <span className="text-red">*</span></label>
//                                     <input
//                                         type="text"
//                                         name="Applicantdesignation"
//                                         value={formData.Applicantdesignation}
//                                         onChange={(e) => handleChange('Applicantdesignation', e.target.value)}
//                                         className={`form-textarea ${!formData.Applicantdesignation && currentStep === 2 ? 'has-error' : ''}`}
//                                         placeholder="Applicant Designation"
//                                     />
//                                     {!formData.Applicantdesignation && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Career Profile (within 100 words)</label>
//                                     <p className="note">Write-up (max 300 words) — Operations during 2024–25</p>
//                                     <textarea
//                                         name="Applicantprofile"
//                                         value={formData.Applicantprofile}
//                                         onChange={(e) => handleChange('Applicantprofile', e.target.value)}
//                                         className={`form-textarea ${!formData.Applicantprofile && currentStep === 2 ? 'has-error' : ''}`}
//                                         rows={6}
//                                         maxLength={300}
//                                     />
//                                     {!formData.Applicantprofile && currentStep === 2 && <span className="error-tooltip">Profile is required</span>}
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Educational qualifications with name of institutions, years passed out & total percentage of marks received/grade/points (Graduation & upwards)</label>
//                                     <p className="note">Write up by applicant (Not more than 300 words)</p>
//                                     <textarea
//                                         name="Applicantdetails"
//                                         value={formData.Applicantdetails}
//                                         onChange={(e) => handleChange('Applicantdetails', e.target.value)}
//                                         className={`form-textarea ${!formData.Applicantdetails && currentStep === 2 ? 'has-error' : ''}`}
//                                         rows={6}
//                                         maxLength={300}
//                                     />
//                                     {!formData.Applicantdetails && currentStep === 2 && <span className="error-tooltip">Applicant Details is required</span>}
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Date of joining the organization <span className="text-red">*</span></label>
//                                     <input
//                                         type="date"
//                                         name="Applicantjoining"
//                                         value={formData.Applicantjoining}
//                                         onChange={(e) => handleChange('Applicantjoining', e.target.value)}
//                                         className={`form-input ${!formData.Applicantjoining && currentStep === 2 ? 'has-error' : ''}`}
//                                         placeholder="Date of Joining"
//                                     />
//                                     {!formData.Applicantjoining && currentStep === 2 && <span className="error-tooltip">Date of Joining is required</span>}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="step-section">
//                             <div className="form-group">
//                                 <label>Mention the rationale behind applying for this award (emphasis be on quantitative achievements such as cost saving, sale enhancement, efficiency in energy consumption, safety, environment etc.)</label>
//                                 <p className="note">Write up by applicant (Not more than 300 words)</p>
//                                 <textarea
//                                     name="companyProfile"
//                                     value={formData.companyProfile}
//                                     onChange={(e) => handleChange('companyProfile', e.target.value)}
//                                     className='form-textarea'
//                                     rows={6}
//                                     maxLength={300}
//                                 />

//                             </div>
//                         </div>
//                     </div>
//                 )
//                 }

//                 {
//                     currentStep === 3 && (
//                         <div>
//                             <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
//                             {part1.map(([num, label, key]) => (
//                                 <div key={key} className="form-group">
//                                     <label>
//                                         {num}. {label}
//                                         {label.includes('(Within 200 words)') && <span> (Within 200 words)</span>}
//                                     </label>
//                                     <textarea
//                                         name={key}
//                                         value={formData[key] || ''}
//                                         onChange={(e) => handleChange(key, e.target.value)}
//                                         className="form-textarea"
//                                         rows={6}
//                                         maxLength={200}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     )
//                 }

//                 {
//                     currentStep === 4 && (
//                         <div>
//                             <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
//                             {part2.map(([num, label, key]) => (
//                                 <div key={key} className="form-group">
//                                     <label>
//                                         {num}. {label}
//                                         {label.includes('(Within 200 words)') && <span> (Within 200 words)</span>}
//                                     </label>
//                                     <textarea
//                                         name={key}
//                                         value={formData[key] || ''}
//                                         onChange={(e) => handleChange(key, e.target.value)}
//                                         className="form-textarea"
//                                         rows={6}
//                                         maxLength={200}
//                                     />
//                                 </div>
//                             ))}
//                             <div className="step-section">
//                                 <div className="form-group">
//                                     <label>Comments</label>
//                                     <textarea
//                                         name="comment"
//                                         value={formData.comment}
//                                         onChange={(e) => handleChange('comment', e.target.value)}
//                                         className="form-textarea"
//                                         maxLength={300}
//                                         placeholder="Comments in (200 words) against input parameter, if any"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 }

//                 {
//                     currentStep === 5 && (
//                         <div className="form-step">
//                             <h3 className="step-title">Step 5: Attachments & Declaration</h3>
//                             <div className="form-group">
//                                 <label>List of Attachments (Optional):</label>
//                                 <table className="quant-table">
//                                     <thead>
//                                         <tr>
//                                             <th>S. No.</th>
//                                             <th>Description</th>
//                                             <th>Upload (only jpg, png, pdf, max 5 MB each)</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {[1, 2, 3, 4].map((num) => {
//                                             const key = `attachments${num}`;
//                                             const attachment = formData[key];
//                                             return (
//                                                 <tr key={key}>
//                                                     <td>{num}</td>
//                                                     <td>
//                                                         <input
//                                                             type="text"
//                                                             name={`${key}.description`}
//                                                             value={attachment.description}
//                                                             onChange={(e) =>
//                                                                 handleAttachmentChange(key, 'description', e.target.value)
//                                                             }
//                                                             placeholder="Enter description"
//                                                             className="form-input"
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <input
//                                                             type="file"
//                                                             accept=".jpg,.png,.pdf"
//                                                             onChange={(e) =>
//                                                                 handleAttachmentChange(key, 'file', e.target.files[0], e)
//                                                             }
//                                                             className="form-input mt-4"
//                                                         />
//                                                         {attachment.file && (
//                                                             <p className="file-name">Selected file: {attachment.file.name}</p>
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <div className="form-group">
//                                 <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>

//                                 <div className="form-navigation">
//                                     <button type="button" onClick={handlePrint} className="btn btn-outline">
//                                         Print
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <label>Upload Document with Approving Authority Signature (Director/Board Level)<span className="text-red">*</span>:</label>
//                                 <input
//                                     type="file"
//                                     accept=".jpg,.png,.pdf"
//                                     onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
//                                     className="form-input mt-4"
//                                 />
//                                 {formData.approvingAuthoritySignature && (
//                                     <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
//                                 )}
//                                 {error && <span className="error-tooltip">{error}</span>}
//                             </div>
//                             <div className="form-group">
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         name="declaration"
//                                         checked={formData.declaration}
//                                         onChange={(e) => handleChange('declaration', e.target.checked)}
//                                         className="form-checkbox"
//                                     />
//                                     I declare that the information submitted is true and complete.
//                                 </label>
//                                 <div className="notes">
//                                     <p>Notes/ Definition:</p>
//                                     <ol type="a">
//                                         <li>Only two entries are eligible to apply from the same company </li>
//                                         <li>Provide details of the approving authority (Director (HR) in case of PSUs and CEOs of Private Companies) </li>
//                                         <li>Approving Authority should be informed after each submission of application
//                                             through email  </li>
//                                     </ol>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 }
//             </div >
//         );
//     };

//     return (
//         <div className="application-form">
//             <div className="form-header">
//                 <h1>
//                     Registration Form: {'Young Achiever of the Year(Female)'}
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

// export default RegistrationYF;



import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/FormProduction.css';
import SidebarGuideline from "./SidebarGuideline"

// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const TEXTAREA_MAX_LENGTH = 300;
const PHONE_MAX_LENGTH = 10;
const COMPANY_PROFILE_MAX_LENGTH = 300;
const COMMENT_MAX_LENGTH = 200;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const nameRegex = /^[A-Za-z\s]*$/;

const RegistrationYF = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [fieldErrors, setFieldErrors] = useState({});
    const [activeItem, setActiveItem] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Young Achiever of the Year(Female)',
        mailingAddress: '',
        authorityName: '',
        authorityTitle: '',
        authorityPhone: '',
        authorityLandline: "",
        authorityEmail: '',
        HREmail: '',
        HRName: '',
        HRPhone: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        contactapplicant: "",
        Applicantjoining: '',
        Applicantdetails: '',
        Applicantprofile: '',
        Applicantdesignation: '',
        ApplicantDOB: '',
        companyProfile: '',
        approvingAuthoritySignature: '',
        declaration: false,
        comment: '',
        YF_1: '',
        YF_2: '',
        YF_3: '',
        YF_4: '',
        YF_5: '',
        YF_6: '',
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
    });

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
          const prefillRaw = sessionStorage.getItem('registrationYF_prefill');
          if (prefillRaw) {
            const prefill = JSON.parse(prefillRaw);
            if (prefill && typeof prefill === 'object') {
              setFormData((prev) => ({ ...prev, ...prefill }));
              if (prefill.step) setCurrentStep(Number(prefill.step));
            }
            // remove after consuming so it doesn't override later edits
            sessionStorage.removeItem('registrationYF_prefill');
          }
        } catch (err) {
          // ignore parse errors
        }
    
        // Note: we avoid loading large File objects here — the draft loader below (in another effect) may populate non-file fields.
      }, []);
    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const awardTitle = location.state?.awardTitle || 'Young Achiever of the Year(Female)';


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
          const draftRaw = localStorage.getItem('registrationYFDraft');
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
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let applicableMaxLength = FIELD_MAX_LENGTH;
        if (name === 'companyProfile') applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
        else if (name === 'comment') applicableMaxLength = COMMENT_MAX_LENGTH;
        else if (name === "Applicantdetails", " Applicantprofile") applicableMaxLength = 100;
        else if (['YF_1', 'YF_2', 'YF_3', 'YF_4', 'YF_5', 'YF_6'].includes(name)) {
            applicableMaxLength = COMMENT_MAX_LENGTH;
        }


        if (typeof value === 'string') {
            if (name === 'companyProfile') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 300) {
                    alert("Maximum 300 words allowed in Company Profile.");
                    return;
                }
            } else if (name === 'comment') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 200) {
                    alert("Maximum 200 words allowed in Comments.");
                    return;
                }
            }
            else if (name === 'Applicantdetails') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 100) {
                    alert("Maximum 100 words are allowed ");
                    return;
                }
            }

            else if (name === ' Applicantprofile') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 100) {
                    alert("Maximum 100 words are allowed ");
                    return;
                }
            }

            else if (name === 'YF_1') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 200) {
                    alert("Maximum 200 words are allowed");
                    return;
                }
            } else if (name === 'YF_2') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 200) {
                    alert("Maximum 200 words are allowed ");
                    return;
                }
            } else if (name === 'YF_3') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 200) {
                    alert("Maximum 200 words are allowed ");
                    return;
                }
            } else if (name === 'YF_4') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 200) {
                    alert("Maximum 200 words are allowed ");
                    return;
                }
            } else if (name === 'YF_5') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 200) {
                    alert("Maximum 200 words are allowed ");
                    return;
                }
            } else if (name === 'YF_6') {
                const wordCount = value.trim().split(/\s+/).length;
                if (wordCount > 200) {
                    alert("Maximum 200 words are allowed");
                    return;
                }
            }
            else if (value.length > applicableMaxLength) {
                alert(`Value cannot exceed ${applicableMaxLength} characters.`);
                return;
            }
        }



        // if (name === 'companyProfile' || name === 'Applicantprofile' || name === 'Applicantdetails' || name === 'awardJustification') {
        //     applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
        // } else if (name === 'comment') {
        //     applicableMaxLength = COMMENT_MAX_LENGTH;
        // } else if (['YF_1', 'YF_2', 'YF_3', 'YF_4', 'YF_5', 'YF_6'].includes(name)) {
        //     applicableMaxLength = TEXTAREA_MAX_LENGTH;
        // }

        if ((type === 'text') && value.length > applicableMaxLength) {
            alert(`Value must not exceed ${applicableMaxLength} characters.`);
            return;
        }

        // Name validation
        if (['Organisationname', 'authorityName', 'contactName', 'HRName'].includes(name)) {
            if (!nameRegex.test(value) && value !== '') {
                alert('Only letters and spaces are allowed.');
                return;
            }
        }

        // Phone validation
        if (name === 'authorityPhone' || name === 'HRPhone' || name === 'contactPhone' || name === 'contactapplicant') {
            const numericValue = value.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH);
            if (numericValue.length > PHONE_MAX_LENGTH) {
                alert('Phone number must not exceed 10 digits.');
                return;
            }
            setFormData((prev) => ({ ...prev, [name]: numericValue }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear errors on valid input
        if (name === 'Organisationname' && value && currentStep === 1) setError('');
        if (name === 'mailingAddress' && value.trim() && currentStep === 1) setError('');
        if (name === 'authorityName' && value && currentStep === 2) setError('');
        if (name === 'authorityEmail' && value && currentStep === 2) setError('');
        if (name === 'contactapplicant' && value && currentStep === 2) setError('');
        if (name === 'ApplicantDOB' && value && currentStep === 2) setError('');
        if (name === 'Applicantdesignation' && value && currentStep === 2) setError('');
        if (name === 'Applicantjoining' && value && currentStep === 2) setError('');
        if (name === 'Applicantprofile' && value && currentStep === 2) setError('');
        if (name === 'Applicantdetails' && value && currentStep === 2) setError('');
    };


    const handleCopyApplicantToggle = (e) => {
        const checked = e.target.checked;
        setCopyApplicantData(checked);
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                contactName: prev.authorityName,
                contactEmail: prev.authorityEmail,
                contactPhone: prev.authorityPhone,
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
    const handleAttachmentChange = (key, field, value, event = null) => {
        if (field === 'file' && value) {
            const file = value;
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
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
    };

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
        }
    };

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
            if (!formData.authorityEmail || !emailRegex.test(formData.authorityEmail)) {
                alert('Please enter a valid Authority email.');
                return;
            }
            if (!formData.authorityLandline) {
                alert('Authority Landline is required.');
                return;
            }

            if (!formData.HRName) {
                alert('HR name is required.');
                return;
            }
            if (!formData.HREmail || !emailRegex.test(formData.HREmail)) {
                alert('Please enter a valid HR email.');
                return;
            }
            if (!formData.HRPhone || !phoneRegex.test(formData.HRPhone)) {
                alert('HR phone must be exactly 10 digits.');
                return;
            }
            if (!formData.contactapplicant || !phoneRegex.test(formData.contactapplicant)) {
                alert('Applicant Contact number must be exactly 10 digits.');
                return;
            }
            if (!formData.ApplicantDOB) {
                alert('Applicant DOB is required.');
                return;
            }
            if (!formData.Applicantdesignation) {
                alert('Applicant designation is required.');
                return;
            }
            if (!formData.Applicantjoining) {
                alert('Applicant joining date is required.');
                return;
            }
            if (!formData.Applicantprofile) {
                alert('Applicant profile is required.');
                return;
            }
            if (!formData.Applicantdetails) {
                alert('Applicant details are required.');
                return;
            }
            if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
                alert('Please enter a valid Contact email.');
                return;
            }
            if (formData.contactPhone && !phoneRegex.test(formData.contactPhone) && !copyApplicantData) {
                alert('Contact phone must be exactly 10 digits.');
                return;
            }
            if (!formData.companyProfile) {
                alert('Company Profile is required.');
                return;
            }
        }
        if ((currentStep === 3) && hasEmptyFieldsInStep(currentStep)) {
            if (!window.confirm('Data not entered, If you wish to continue?')) {
                return; // Stay on step
            }
        }
        if ((currentStep === 4) && hasEmptyFieldsInStep(currentStep)) {
            if (!window.confirm('Data not entered, If you wish to continue?')) {
                return; // Stay on step
            }
        }
        setError('');
        if (currentStep < 5) setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };



      const saveDraft = () => {
    try {
      const draftToStore = {
        formData: serializeFormForStorage(formData), // ⭐ ADDED - store a safe copy
        step: currentStep, // ⭐ ADDED - persist current step so user returns to same step
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem('registrationYFDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.declaration) {
            alert('Please accept the declaration before submitting.');
            return;
        }

        const fd = new FormData();
        // Basic fields
        fd.append('organisation_name', formData.Organisationname);
        fd.append('category', formData.category);
        fd.append('company_name', formData.companyName);
        fd.append('mailing_address', formData.mailingAddress);
        fd.append('authority_name', formData.authorityName);
        fd.append('authority_title', formData.authorityTitle);
        fd.append('authority_phone', formData.authorityPhone);
        fd.append('authority_email', formData.authorityEmail);
        fd.append('hr_name', formData.HRName);
        fd.append('hr_phone', formData.HRPhone);
        fd.append('hr_email', formData.HREmail);
        fd.append('contact_name', formData.contactName);
        fd.append('contact_phone', formData.contactPhone);
        fd.append('contact_email', formData.contactEmail);
        fd.append('applicant_dob', formData.ApplicantDOB);
        fd.append('applicant_designation', formData.Applicantdesignation);
        fd.append('applicant_profile', formData.Applicantprofile);
        fd.append('applicant_details', formData.Applicantdetails);
        fd.append('applicant_joining', formData.Applicantjoining);
        fd.append('company_profile', formData.companyProfile);
        fd.append('award_justification', formData.awardJustification);
        fd.append('comment', formData.comment);
        fd.append('declaration', formData.declaration);

        // Quantitative fields
        [1, 2, 3, 4, 5, 6].forEach((n) => {
            fd.append(`yf_${n}`, formData[`YF_${n}`] || '');
        });

        // Signature file
        if (formData.approvingAuthoritySignature) {
            fd.append('approving_authority_file', formData.approvingAuthoritySignature);
        }

        // Attachments
        [1, 2, 3, 4].forEach((num) => {
            const slot = formData[`attachments${num}`] || {};
            fd.append(`attachments${num}_desc`, slot.description || '');
            if (slot.file) {
                fd.append(`attachments${num}`, slot.file);
            }
        });

        try {


                  try {
        localStorage.removeItem('registrationYFDraft');
      } catch (err) {
        // ignore
      }
            alert('Registration Submitted Successfully!');
            console.log(formData)
            setIsSubmitted(true);
            setCurrentStep(1);
            localStorage.removeItem('registrationYFDraft');
        } catch (err) {
            console.error('Submission error:', err);
            alert('An error occurred during submission.');
        }
    };

    const handlePrint = () => {
        const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
        <p style="text-align: center;">Submission Date and Time: Tuesday, August 05, 2025, 12:41 PM IST</p>
        <h2>Organization Details</h2>
        <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
        <p><strong>Postal Address:</strong> ${formData.mailingAddress || ''}</p>
        <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
        <p><strong>Authority Title:</strong> ${formData.authorityTitle || ''}</p>
        <p><strong>Authority Landline:</strong> ${formData.authorityLandline || ''}</p>
        <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
        <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>
        <h3>Corporate HR Head:</h3>
        <p><strong>HR Name:</strong> ${formData.HRName || ''}</p>
        <p><strong>HR Phone:</strong> ${formData.HRPhone || ''}</p>
        <p><strong>HR Email:</strong> ${formData.HREmail || ''}</p>
        <h2>Contacts Nodal Officials:</h2>
        <p><strong>Contact Name:</strong> ${formData.contactName || ''}</p>
        <p><strong>Contact Phone:</strong> ${formData.contactPhone || ''}</p>
        <p><strong>Contact Email:</strong> ${formData.contactEmail || ''}</p>
        <p><strong>Company Profile:</strong> ${formData.companyProfile || ''}</p>
        <h2>Applicant Details:</h2>
        <p><strong>Contact Number:</strong> ${formData.contactapplicant || ''}</p>
        <p><strong>Date of Birth:</strong> ${formData.ApplicantDOB || ''}</p>
        <p><strong>Designation:</strong> ${formData.Applicantdesignation || ''}</p>
        <p><strong>Career Profile:</strong> ${formData.Applicantprofile || ''}</p>
        <p><strong>Educational Qualifications:</strong> ${formData.Applicantdetails || ''}</p>
        <p><strong>Date of Joining:</strong> ${formData.Applicantjoining || ''}</p>
        <h2>Quantitative Information Part 1</h2>
<table border="1" style="border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <th style="text-align:left;">1. Initiatives/exceptional contribution in the line of work</th>
      <td>${formData.YF_1 || ''}</td>
    </tr>
    <tr>
      <th style="text-align:left;">2. Examples of creativity/technique/imagination demonstrated in your line of work that set you apart from your peers</th>
      <td>${formData.YF_2 || ''}</td>
    </tr>
    <tr>
      <th style="text-align:left;">3. Leadership role played/example of project spearheaded by you/example of exceptional performance as team member in your line of work which helped you contributed differently from the defined level of expertise</th>
      <td>${formData.YF_3 || ''}</td>
    </tr>
    <tr>
      <th style="text-align:left;">4. How has the oil and gas sector/company benefited from your leadership/work?</th>
      <td>${formData.YF_4 || ''}</td>
    </tr>
  </tbody>
</table>

<h2>Quantitative Information Part 2</h2>
<table border="1" style="border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <th style="text-align:left;">5. Outline barriers or difficulties you faced and how they have been overcome</th>
      <td>${formData.YF_5 || ''}</td>
    </tr>
    <tr>
      <th style="text-align:left;">6. Work done/achievements (if any) in the area of environmental improvement/decarbonization/net zero targets</th>
      <td>${formData.YF_6 || ''}</td>
    </tr>
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
      <h2>Authority Signature</h2>
        <p><strong>Name:</strong> ${formData.authorityName || ''}</p>
        <p><strong>Title:</strong> ${formData.authorityTitle || ''}</p>
        <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
        </div>
    `;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    const fullData = [
        ['1', 'Initiatives/exceptional contribution in the line of work', 'YF_1'],
        ['2', 'Examples of creativity/technique/imagination demonstrated in your line of work that set you apart from your peers', 'YF_2'],
        ['3', 'Leadership role played/example of project spearheaded by you/example of exceptional performance as team member in your line of work which helped you contributed differently from the defined level of expertise', 'YF_3'],
        ['4', 'How has the oil and gas sector/company benefited from your leadership/work?', 'YF_4'],
        ['5', 'Outline barriers or difficulties you faced and how they have been overcome', 'YF_5'],
        ['6', 'Work done/achievements (if any) in the area of environmental improvement/decarbonization/net zero targets', 'YF_6'],
    ];

    const part1 = fullData.filter(([num]) => parseFloat(num) <= 4);
    const part2 = fullData.filter(([num]) => parseFloat(num) > 4);

    const hasEmptyFieldsInStep = (step) => {
        // Pick the list of fields for this step
        const fields = step === 3 ? part1 : part2;
        for (const [, , key] of fields) {
            if (!formData[key] || formData[key].trim() === "") {
                return true;
            }
        }
        return false;
    };

    const renderStepContent = () => {
        const progress = ((currentStep - 1) / 4) * 100;
        return (
            <div className="form-step">
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>

                {currentStep === 1 && (
                    <div>
                        <h3 className="step-title">Step 1: Organization Details</h3>
                        <div className="form-group">
                            <label>Organisation Name <span className="text-red">*</span></label>
                            <input
                                type="text"
                                name="Organisationname"
                                maxLength={FIELD_MAX_LENGTH}
                                value={formData.Organisationname}
                                onChange={handleChange}
                                className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
                            />
                            {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
                        </div>

                        <div className="form-group">
                            <label>Postal Address <span className="text-red">*</span></label>
                            <textarea
                                name="mailingAddress"
                                maxLength={FIELD_MAX_LENGTH}
                                value={formData.mailingAddress}
                                onChange={handleChange}
                                className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1 ? 'has-error' : ''}`}
                                rows={3}
                                placeholder="Enter Postal address"
                            />
                            {!formData.mailingAddress.trim() && currentStep === 1 && <span className="error-tooltip">Mailing address is required</span>}
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <h3 className="step-title">Step 2:Approving Authority, Contact & Applicant Details</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="step-section">
                                <h4>Approving Authority</h4>
                                <p className="note">Approving authority should be CMD/MD in case of PSUs and CEO or equivalent senior executive in case of private Companies</p>
                                <div className="form-group">
                                    <label>Name <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="authorityName"
                                        maxLength={FIELD_MAX_LENGTH}
                                        value={formData.authorityName}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Name"
                                    />
                                    {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Authority name is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Designation <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="authorityTitle"
                                        maxLength={FIELD_MAX_LENGTH}
                                        value={formData.authorityTitle}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Designation"
                                    />
                                    {!formData.authorityTitle && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
                                </div>
                                {/* <div className="form-group">
                                    <label>Phone <span className="text-red">*</span></label>
                                    <input
                                        type="tel"
                                        name="authorityPhone"
                                        maxLength={PHONE_MAX_LENGTH}
                                        value={formData.authorityPhone}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.authorityPhone && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Phone number"
                                    />
                                    {!formData.authorityPhone && currentStep === 2 && <span className="error-tooltip">Phone is required</span>}
                                </div> */}


                                <div className="form-group">
                                    <label htmlFor="authorityPhone">
                                        Landline: <span className="text-red" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="authorityLandline"
                                        type="number"
                                        name="authorityLandline"
                                        value={formData.authorityLandline}
                                        onChange={handleChange}
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
                                        Mobile: <span className="text-red" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="authorityPhone"
                                        type="tel"
                                        name="authorityPhone"
                                        value={formData.authorityPhone}
                                        onChange={handleChange}
                                        // onBlur={(e) => handleBlur('authorityPhone', e.target.value)}
                                        className={`form-input`}
                                        placeholder="Phone number"
                                        maxLength={PHONE_MAX_LENGTH}
                                        aria-required="true"
                                    // aria-describedby={fieldErrors.authorityPhone ? 'authorityPhone-error' : undefined}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email <span className="text-red">*</span></label>
                                    <input
                                        type="email"
                                        name="authorityEmail"
                                        maxLength={FIELD_MAX_LENGTH}
                                        value={formData.authorityEmail}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="E-mail address"
                                    />
                                    {!formData.authorityEmail && currentStep === 2 && <span className="error-tooltip">Email is required</span>}
                                </div>
                            </div>
                            <div className="step-section">
                                <h4>Corporate HR Head </h4>
                                <div className="form-group">
                                    <label>Name <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="HRName"
                                        maxLength={FIELD_MAX_LENGTH}
                                        value={formData.HRName}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.HRName && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Name"
                                    />
                                    {!formData.HRName && currentStep === 2 && <span className="error-tooltip">HR name is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Phone <span className="text-red">*</span></label>
                                    <input
                                        type="tel"
                                        name="HRPhone"
                                        maxLength={PHONE_MAX_LENGTH}
                                        value={formData.HRPhone}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.HRPhone && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Phone number"
                                    />
                                    {!formData.HRPhone && currentStep === 2 && <span className="error-tooltip">Phone is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Email <span className="text-red">*</span></label>
                                    <input
                                        type="email"
                                        name="HREmail"
                                        maxLength={FIELD_MAX_LENGTH}
                                        value={formData.HREmail}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.HREmail && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="E-mail address"
                                    />
                                    {!formData.HREmail && currentStep === 2 && <span className="error-tooltip">Email is required</span>}
                                </div>
                            </div>
                            <div className="step-section">
                                <h4>Contacts (Nodal Officials)</h4>
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="copyApplicantData"
                                            checked={copyApplicantData}
                                            onChange={handleCopyApplicantToggle}
                                            className="form-checkbox"
                                        /> Same as applicant
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contactName">
                                        Name: <span aria-hidden="true" className="text-red">*</span>
                                    </label>
                                    <input
                                        id="contactName"
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Name"
                                        disabled={copyApplicantData}
                                        aria-required="true"
                                        aria-describedby="contactName-error"
                                    />
                                    {fieldErrors.contactName && (
                                        <span className="error-tooltip" id="contactName-error" role="alert">
                                            {fieldErrors.contactName}
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Phone number:  <span className="text-red">*</span></label>
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        maxLength={PHONE_MAX_LENGTH}
                                        value={formData.contactPhone}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Phone number"
                                        disabled={copyApplicantData}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>E-mail address:<span className="text-red">*</span></label>
                                    <input
                                        type="email"
                                        name="contactEmail"
                                        maxLength={FIELD_MAX_LENGTH}
                                        value={formData.contactEmail}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="E-mail address"
                                        disabled={copyApplicantData}
                                    />
                                </div>
                            </div>
                            <div className="step-section">
                                <h4>Applicant Details</h4>

                                <div className="form-group">
                                    <label htmlFor="contactapplicant">
                                        Contact details:   <span aria-hidden="true" className="text-red">*</span>
                                    </label>
                                    <input
                                        id="contactapplicant"
                                        name="contactapplicant"
                                        type="tel"
                                        maxLength={PHONE_MAX_LENGTH}
                                        value={formData.contactapplicant}
                                        onChange={handleChange}
                                        aria-describedby="contactapplicant-error"
                                        placeholder="10-digit phone number"
                                        className={`form-input ${!formData.contactapplicant && currentStep === 2 ? 'has-error' : ''}`}
                                        required
                                    />
                                    {fieldErrors.contactapplicant && (
                                        <span className="error-tooltip" id="contactapplicant-error" role="alert">
                                            {fieldErrors.contactapplicant}
                                        </span>
                                    )}
                                    {!formData.contactapplicant && currentStep === 2 && (
                                        <span className="error-tooltip" id="contactapplicant-error" role="alert">
                                            Phone is required
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth:<span className="text-red">*</span></label>
                                    <p className="note">(DD/MM/YYYY) </p>
                                    <input
                                        type="date"
                                        name="ApplicantDOB"
                                        value={formData.ApplicantDOB}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.ApplicantDOB && currentStep === 2 ? 'has-error' : ''}`}
                                    />
                                    {!formData.ApplicantDOB && currentStep === 2 && <span className="error-tooltip">DOB is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Current Designation: <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="Applicantdesignation"
                                        maxLength={FIELD_MAX_LENGTH}
                                        value={formData.Applicantdesignation}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.Applicantdesignation && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Applicant Designation"
                                    />
                                    {!formData.Applicantdesignation && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Career Profile <span className="text-red">*</span></label>

                                    <textarea
                                        name="Applicantprofile"
                                        // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                                        value={formData.Applicantprofile}
                                        onChange={handleChange}
                                        className={`form-textarea ${!formData.Applicantprofile && currentStep === 2 ? 'has-error' : ''}`}
                                        rows={6}
                                    />
                                    {!formData.Applicantprofile && currentStep === 2 && <span className="error-tooltip">Profile is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Educational qualifications with name of institutions, years passed out & total percentage of marks received/grade/points (Graduation & upwards)  <span className="text-red">*</span></label>

                                    <textarea
                                        name="Applicantdetails"
                                        // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                                        value={formData.Applicantdetails}
                                        onChange={handleChange}
                                        className={`form-textarea ${!formData.Applicantdetails && currentStep === 2 ? 'has-error' : ''}`}
                                        rows={6}
                                    />
                                    {!formData.Applicantdetails && currentStep === 2 && <span className="error-tooltip">Applicant Details is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Date of joining the organization<span className="text-red">*</span></label>
                                    <input
                                        type="date"
                                        name="Applicantjoining"
                                        value={formData.Applicantjoining}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.Applicantjoining && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Date of Joining"
                                    />
                                    {!formData.Applicantjoining && currentStep === 2 && <span className="error-tooltip">Date of Joining is required</span>}
                                </div>
                            </div>
                        </div>
                        <div className="step-section">
                            <div className="form-group">
                                <label>Mention the rationale behind applying for this award (emphasis be on quantitative achievement such as cost saving, sale enhancement, efficiency in energy consumption, safety, environment etc.) </label>
                                <p className="note">Write up by applicant (Not more than 300 words) </p>
                                <textarea
                                    name="companyProfile"
                                    // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                                    value={formData.companyProfile}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    rows={6}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
                        {part1.map(([num, label, key]) => (
                            <div key={key} className="form-group">
                                <label>{num}. {label} (Within 200 words)</label>
                                <textarea
                                    name={key}
                                    // maxLength={TEXTAREA_MAX_LENGTH}
                                    value={formData[key] || ''}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    rows={6}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {currentStep === 4 && (
                    <div>
                        <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
                        {part2.map(([num, label, key]) => (
                            <div key={key} className="form-group">
                                <label>{num}. {label} (Within 200 words)</label>
                                <textarea
                                    name={key}
                                    // maxLength={TEXTAREA_MAX_LENGTH}
                                    value={formData[key] || ''}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    rows={6}
                                />
                            </div>
                        ))}
                        <div className="step-section">
                            <div className="form-group">
                                <label>Comments</label>
                                <textarea
                                    name="comment"
                                    // maxLength={COMMENT_MAX_LENGTH}
                                    value={formData.comment}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    placeholder="Comments in (200 words) against input parameter, if any"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="form-step">
                        <h3 className="step-title">Step 5: Attachments & Declaration</h3>
                        <div className="form-group">
                            <label>List of Attachments (Optional):</label>
                            <table className="quant-table">
                                <thead>
                                    <tr>
                                        <th>S. No.</th>
                                        <th>Description</th>
                                        <th>Upload (only jpg, png, pdf, max 5 MB each)</th>
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
                                                        maxLength={FIELD_MAX_LENGTH}
                                                        value={attachment.description}
                                                        onChange={(e) =>
                                                            handleAttachmentChange(key, 'description', e.target.value)
                                                        }
                                                        placeholder="Enter description"
                                                        className="form-input"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        accept=".jpg,.png,.pdf"
                                                        onChange={(e) =>
                                                            handleAttachmentChange(key, 'file', e.target.files[0], e)
                                                        }
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
                            <label>Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
                            <div className="form-navigation">
                                <button type="button" onClick={handlePrint} className="btn btn-outline">
                                    Print Preview
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="approvingAuthoritySignature">
                                Upload Document with Approving Authority Signature (Director/Board Level)
                                <span aria-hidden="true" className="text-red">*</span>:
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
                                    type="checkbox"
                                    name="declaration"
                                    checked={formData.declaration}
                                    onChange={handleChange}
                                    className="form-checkbox"
                                />
                                I declare that the information submitted is true and complete.
                            </label>

                        </div>
                    </div>
                )}
            </div>
        );
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    <h1>{awardTitle}</h1>
                    <p>Step {currentStep} of 5</p>
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
                                <button type="button" onClick={saveDraft} className="btn btn-outline">
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
                                <button type="button" onClick={saveDraft} className="btn btn-outline">
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

export default RegistrationYF;