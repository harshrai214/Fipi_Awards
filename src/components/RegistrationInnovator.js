// import React, { useState, useEffect } from 'react';
// import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import { useLocation } from 'react-router-dom';
// import '../styles/FormProduction.css';

// const RegistrationInnovator = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [formData, setFormData] = useState({
//         Organisationname: '',
//         category: 'Innovator of the year (team)',
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
//         approvingAuthoritySignature: '',
//         declaration: false,
//         comment: '',
//         // Quantitative fields
//         innovator1: "",
//         innovator1_1: "",
//         innovator1_2: "",
//         innovator1_3: "",
//         innovator1_4: "",
//         innovator1_5: "",
//         innovator1_6: "",
//         innovator2: "",
//         innovator2_1: "",
//         innovator2_2: "",
//         innovator2_3: "",
//         innovator2_4: "",
//         innovator3: "",
//         innovator3_1: "",
//         innovator3_2: "",
//         innovator4: "",
//         innovator4_1: "",
//         innovator4_2: "",
//         innovator4_3: "",
//         innovatortextbox: "",
//         // Team members (max 5)
//         member1: "",
//         member2: "",
//         member3: "",
//         member4: "",
//         member5: "",
//         // Attachments
//         attachments1: { description: '', file: null },
//         attachments2: { description: '', file: null },
//         attachments3: { description: '', file: null },
//         attachments4: { description: '', file: null },
//     });
//     const [error, setError] = useState('');
//     const [copyApplicantData, setCopyApplicantData] = useState(false);
//     const location = useLocation();
//     console.log('location.state:', location.state);
//     const awardTitle = location.state?.awardTitle || "Innovator of the year (team)";

//     // Track submitted forms per organisation
//     useEffect(() => {
//         const storedSubmissions = JSON.parse(localStorage.getItem('organisationSubmissions') || '{}');
//         if (storedSubmissions[formData.Organisationname]) {
//             if (storedSubmissions[formData.Organisationname].length >= 5) {
//                 setError('Maximum limit of 5 forms reached for this organisation.');
//             }
//         }
//     }, [formData.Organisationname]);

//     const handleChange = (name, value, index = null) => {
//         if (["authorityName", "contactName"].includes(name)) {
//             const isValid = /^[A-Za-z\s]*$/.test(value);
//             if (!isValid) return;
//         }

//         if (index !== null && Array.isArray(formData[name])) {
//             setFormData(prev => {
//                 const updatedArray = [...prev[name]];
//                 updatedArray[index] = value;
//                 return { ...prev, [name]: updatedArray };
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
//             } else if (name.startsWith('member') && ["member1", "member2", "member3", "member4", "member5"].every(m => formData[m] || (m === name && value))) {
//                 const filledMembers = ["member1", "member2", "member3", "member4", "member5"].filter(m => formData[m]).length;
//                 if (filledMembers >= 5 && !formData[name] && value) {
//                     setError('Maximum limit of 5 team members reached.');
//                     return;
//                 }
//                 setFormData(prev => ({ ...prev, [name]: value }));
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
//             [key]: { ...prev[key], [field]: value }
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
//             const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

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

//     const handleSubmit = async (e) => {
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

//   // 1) Check count ≤ 4
//   try {
//     const res = await fetch(
//       `${ACTIVE_API_BASE_URL}/registration-innovator/count/?org=${encodeURIComponent(org)}`
//     );
//     if (!res.ok) {
//       console.error(await res.text());
//       alert('Could not verify submission count.');
//       return;
//     }
//     const { count } = await res.json();
//     if (count >= 5) {
//       alert('you have reach your form limit the max limit is 5 for this form');
//       return;
//     }
//   } catch (err) {
//     console.error(err);
//     alert(`Network error. Is API running at ${ACTIVE_API_BASE_URL}?`);
//     return;
//   }

//   // 2) Build FormData
//   const fd = new FormData();
//   fd.append('organisation_name', formData.Organisationname);
//   fd.append('category',          formData.category);
//   fd.append('company_name',      formData.companyName);
//   fd.append('mailing_address',   formData.mailingAddress);

//   // Authority & contact
//   fd.append('authority_name',    formData.authorityName);
//   fd.append('authority_title',   formData.authorityTitle);
//   fd.append('authority_phone',   formData.authorityPhone);
//   fd.append('authority_email',   formData.authorityEmail);
//   fd.append('contact_name',      formData.contactName);
//   fd.append('contact_phone',     formData.contactPhone);
//   fd.append('contact_email',     formData.contactEmail);

//   // Company profile, declaration, comment
//   fd.append('company_profile',   formData.companyProfile);
//   fd.append('declaration',       formData.declaration);
//   fd.append('comment',           formData.comment);

//   // Quantitative sections
//   [
//     'innovator1','innovator1_1','innovator1_2','innovator1_3','innovator1_4','innovator1_5','innovator1_6',
//     'innovator2','innovator2_1','innovator2_2','innovator2_3','innovator2_4',
//     'innovator3','innovator3_1','innovator3_2',
//     'innovator4','innovator4_1','innovator4_2','innovator4_3',
//     'innovatortextbox'
//   ].forEach(key => {
//     fd.append(key, formData[key] || '');
//   });

//   // Team members
//   ['member1','member2','member3','member4','member5'].forEach(key => {
//     fd.append(key, formData[key] || '');
//   });

//   // Files
//   if (formData.approvingAuthoritySignature) {
//     fd.append('approving_authority_file', formData.approvingAuthoritySignature);
//   }
//   [1,2,3,4].forEach(n => {
//     const slot = formData[`attachments${n}`] || {};
//     fd.append(`attachments${n}_desc`, slot.description || '');
//     if (slot.file) fd.append(`attachments${n}`, slot.file);
//   });

//   // 3) POST create
//   try {
//     const postRes = await fetch(
//       `${ACTIVE_API_BASE_URL}/registration-innovator/`,
//       { method: 'POST', body: fd }
//     );
//     const data    = await postRes.json();
//     if (!postRes.ok) {
//       alert(data.error || 'Submission failed; see console.');
//       console.error(data);
//       return;
//     }
//     alert('Submitted successfully!');
//     setIsSubmitted(true);
//     setCurrentStep(1);
//   } catch (err) {
//     console.error(err);
//     alert(`Network error. Is API running at ${ACTIVE_API_BASE_URL}?`);
//   }
// };


//     const handlePrint = () => {
//         const printContent = `
//             <div style="font-family: Arial, sans-serif; padding: 20px;">
//                 <h1 style="text-align: center; color: #1e40af;">Registration Form: ${awardTitle}</h1>
//                 <h2>Organization & Contact Details</h2>
//                 <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
//                 <p><strong>Category:</strong> ${formData.category || ''}</p>
//                 <p><strong>Mailing Address:</strong> ${formData.mailingAddress || ''}</p>
//                 <p><strong>Name of the innovation:</strong> ${formData.innovatortextbox || ''}</p>
//                 <h2>Company Details</h2>
//                 <p><strong>Name of Company:</strong> ${formData.companyName || ''}</p>
//                 <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
//                 <p><strong>Authority Title:</strong> ${formData.authorityTitle || ''}</p>
//                 <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
//                 <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>
//                 <p><strong>Contact Name:</strong> ${formData.contactName || ''}</p>
//                 <p><strong>Contact Phone:</strong> ${formData.contactPhone || ''}</p>
//                 <p><strong>Contact Email:</strong> ${formData.contactEmail || ''}</p>
//                 <p><strong>Company Profile:</strong> ${formData.companyProfile || ''}</p>
//                 <h2>Quantitative Information - Part 1</h2>
//                 <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//                     <thead>
//                         <tr>
//                             <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
//                             <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//                             <th style="border: 1px solid #000; padding: 8px;">Response</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${part1.map(([num, label, key]) => `
//                             <tr>
//                                 <td style="border: 1px solid #000; padding: 8px;">${num}</td>
//                                 <td style="border: 1px solid #000; padding: 8px;">${label}</td>
//                                 <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//                 <h2>Quantitative Information - Part 2</h2>
//                 <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//                     <thead>
//                         <tr>
//                             <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
//                             <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//                             <th style="border: 1px solid #000; padding: 8px;">Response</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${part2.map(([num, label, key]) => `
//                             <tr>
//                                 <td style="border: 1px solid #000; padding: 8px;">${num}</td>
//                                 <td style="border: 1px solid #000; padding: 8px;">${label}</td>
//                                 <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//                 <h2>List of Team Members (Max. 5 entries per company)</h2>
//                 <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//                     <thead>
//                         <tr>
//                             <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
//                             <th style="border: 1px solid #000; padding: 8px;">Name</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${members.map(([num, key]) => `
//                             <tr>
//                                 <td style="border: 1px solid #000; padding: 8px;">${num}</td>
//                                 <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//                 <h2>Declaration</h2>
//                 <p>I declare that the information submitted is true and complete.</p>
//             </div>
//         `;
//         const printWindow = window.open('', '', 'height=600,width=800');
//         printWindow.document.write(printContent);
//         printWindow.document.close();
//         printWindow.print();
//     };

//     const part1 = [
//         ['1', 'Tangible benefits of the innovation', 'innovator1'],
//         ['1.1', 'Brief description of the innovation along with details of Technology used, Gestation period, financial implication, Innovative practices and the Development lifecycle (inception to implementation). (Max. 300 words)', 'innovator1_1'],
//         ['1.2', 'Quantifiable impact of innovation:a. Cost savings b. Operational efficiency gains/improvement in productivity (Please provide data with units, if applicable). (Max. 200 words)', 'innovator1_2'],
//         ['1.3', 'Novelty and uniqueness:a. Uniqueness of the innovation.b. Technological challenges that have been overcome.c. Environmental gain accrued.d. New technologies used (especially Digital Technologies). (Max. 400 words).', 'innovator1_3'],
//         ['1.4', 'Scalability: Can the innovation be scaled across the oil & gas/energy sector (India/global)? (Max. 100 words).', 'innovator1_4'],
//         ['1.5', 'Replicability: Can the innovation be implemented by other companies in the oil & gas/energy sector under similar conditions? (Max. 100 words).', 'innovator1_5'],
//         ['1.6', 'Adaptability: Potential for further improvement or adaptation. Could this innovation evolve further? (Max. 100 words).', 'innovator1_6'],
//         ['2', 'Intangible Impact', 'innovator2'],
//         ['2.1', 'Intangible benefits: Describe impact on the following: (Max. 300 words) a. Health, Safety & Environment (HSE)', 'innovator2_1'],
//         ['2.2', 'b. Carbon footprint reduction', 'innovator2_2'],
//         ['2.3', 'c. Quality or compliance improvements ', 'innovator2_3'],
//         ['2.4', 'd. Energy efficiency', 'innovator2_4'],
//     ];

//     const part2 = [
//         ['3', 'Patents', 'innovator3'],
//         ['3.1', 'Number of patents filed for the innovation', 'innovator3_1'],
//         ['3.2', 'Number of domestic/international patents granted', 'innovator3_2'],
//         ['4', 'Miscellaneous', 'innovator4'],
//         ['4.1', 'External partnerships with academia/startups/R&D. (Max. 100 words).', 'innovator4_1'],
//         ['4.2', 'Recognition or awards received from external bodies (other than the company itself)', 'innovator4_2'],
//     ];
//     const members = [
//         ['1', "member1"],
//         ['2', "member2"],
//         ['3', "member3"],
//         ['4', "member4"],
//         ['5', "member5"],
//     ];

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
//                             {formData.Organisationname && error.includes('Maximum limit') && <span className="error-tooltip">{error}</span>}
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
//                         <div className="form-group">
//                             <label>Name of the innovation <span className="text-red">*</span></label>
//                             <textarea
//                                 name="innovatortextbox"
//                                 value={formData.innovatortextbox}
//                                 onChange={(e) => handleChange('innovatortextbox', e.target.value)}
//                                 className={`form-textarea ${!formData.innovatortextbox.trim() && currentStep === 1 ? 'has-error' : ''}`}
//                                 rows={3}
//                                 placeholder="Enter Name of Innovation"
//                             />
//                             {!formData.innovatortextbox.trim() && currentStep === 1 && <span className="error-tooltip">Name of innovation is required</span>}
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
//                                     <th>Response</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {part1.map(([num, label, key]) => (
//                                     <tr key={key || label}>
//                                         <td>{num}</td>
//                                         <td>{label}</td>
//                                         <td>
//                                             <textarea
//                                                 value={formData[key] || ''}
//                                                 onChange={(e) => handleChange(key, e.target.value)}
//                                                 className="form-textarea"
//                                                 rows={6}
//                                                 maxLength={300}
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
//                                     <th>Response</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {part2.map(([num, label, key]) => (
//                                     <tr key={key || label}>
//                                         <td>{num}</td>
//                                         <td>{label}</td>
//                                         <td>
//                                             <textarea
//                                                 value={formData[key] || ''}
//                                                 onChange={(e) => handleChange(key, e.target.value)}
//                                                 className="form-textarea"
//                                                 rows={6}
//                                                 maxLength={300}
//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <table className="quant-table">
//                             <caption className="table-header">List of Team Members (Max. 5 entries per company)</caption>
//                             <p className="note">Note: Only up to 5 team members can be added.</p>
//                             {["member1", "member2", "member3", "member4", "member5"].filter(m => formData[m]).length >= 5 && (
//                                 <p className="error-tooltip">Maximum limit of 5 team members reached.</p>
//                             )}
//                             <thead>
//                                 <tr>
//                                     <th>S.No</th>
//                                     <th>Name</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {members.map(([num, key]) => (
//                                     <tr key={key}>
//                                         <td>{num}</td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={formData[key] || ''}
//                                                 onChange={(e) => handleChange(key, e.target.value)}
//                                                 className="form-input"
//                                                 disabled={["member1", "member2", "member3", "member4", "member5"].filter(m => formData[m]).length >= 5 && !formData[key]}
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
//                                 <p>Notes:</p>
//                                 <ul>
//                                     <li>The award is open to all Energy Companies operating in India. The information related to Capital Investments, Installed capacities, R&D centres, Patents etc. should pertains to works carried out in India. Any overseas investments and projects will not be considered for evaluation.</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className="application-form">
//             <div className="form-header">
//                 <h1>
//                     Registration Form: {awardTitle}
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
//                             <button type="button" onClick={nextStep} className="btn btn-primary" disabled={error && error.includes('Maximum limit')}>
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
//                                 <button type="submit" className="btn btn-success" disabled={error && error.includes('Maximum limit')}>
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

// export default RegistrationInnovator;




import React, { useState, useEffect, useCallback } from 'react';
// import { ACTIVE_API_BASE_URL } from '../config/apiConfig';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SidebarGuideline from "./SidebarGuideline"
import '../styles/FormProduction.css';

// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const COMPANY_PROFILE_MAX_LENGTH = 300;
const COMMENT_MAX_LENGTH = 200;
const PHONE_MAX_LENGTH = 10;
const INNOVATION_NAME_MAX_LENGTH = 100;
const TEXTAREA_MAX_LENGTH = {
  innovation_description: 300, // innovator1_1
  quantifiable_impact: 200, // innovator1_2
  novelty_uniqueness: 400, // innovator1_3
  scalability: 100, // innovator1_4
  replicability: 100, // innovator1_5
  adaptability: 100, // innovator1_6
  intangible_benefits_hse: 300, // innovator2_1
  carbon_footprint_reduction: 300, // innovator2_2
  quality_compliance: 300, // innovator2_3
  energy_efficiency: 300, // innovator2_4
  external_partnerships: 100, // innovator4_1
  external_recognition: 100, // innovator4_2
};

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const numberRegex = /^\d*$/;

const RegistrationInnovator = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const awardTitle = location.state?.awardTitle || 'Innovator of the Year (Team)';

  // Form state initialization
  const [formData, setFormData] = useState({
    Organisationname: '',
    category: 'Innovator of the Year (Team)',
    companyName: '',
    mailingAddress: '',
    authorityName: '',
    authorityTitle: '',
    authorityPhone: '',
    authorityEmail: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    companyProfile: '',
    approvingAuthoritySignature: null,
    declaration: false,
    comment: '',
    innovation_name: '', // Previously innovatortextbox
    // Quantitative fields
    tangible_benefits: '', // innovator1
    innovation_description: '', // innovator1_1
    quantifiable_impact: '', // innovator1_2
    novelty_uniqueness: '', // innovator1_3
    scalability: '', // innovator1_4
    replicability: '', // innovator1_5
    adaptability: '', // innovator1_6
    intangible_impact: '', // innovator2
    intangible_benefits_hse: '', // innovator2_1
    carbon_footprint_reduction: '', // innovator2_2
    quality_compliance: '', // innovator2_3
    energy_efficiency: '', // innovator2_4
    patents: '', // innovator3
    patents_filed: '', // innovator3_1
    patents_granted: '', // innovator3_2
    miscellaneous: '', // innovator4
    external_partnerships: '', // innovator4_1
    external_recognition: '', // innovator4_2
    external_presentation: '', // innovator4_3
    // Team members
    member1: '',
    member2: '',
    member3: '',
    member4: '',
    member5: '',
    // Attachments
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
        const prefillRaw = sessionStorage.getItem('registrationInnovator_prefill');
        if (prefillRaw) {
          const prefill = JSON.parse(prefillRaw);
          if (prefill && typeof prefill === 'object') {
            setFormData((prev) => ({ ...prev, ...prefill }));
            if (prefill.step) setCurrentStep(Number(prefill.step));
          }
          // remove after consuming so it doesn't override later edits
          sessionStorage.removeItem('registrationInnovator_prefill');
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

    useEffect(() => {
      try {
        const draftRaw = localStorage.getItem('registrationInnovatorDraft');
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
  const validateNumber = (value) => numberRegex.test(value) || value === '';

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

  // Validate field on blur
  const validateField = (name, value) => {
    let errorMsg = '';
    if (['Organisationname', 'authorityName', 'contactName'].includes(name)) {
      if (!value.trim()) {
        errorMsg = `${name} is required.`;
      } else if (!/^[A-Za-z\s]*$/.test(value)) {
        errorMsg = 'Only letters and spaces are allowed.';
      }
    } else if (name === 'innovation_name' && !value.trim()) {
      errorMsg = 'Name of innovation is required.';
    } else if (name === 'mailingAddress' && !value.trim()) {
      errorMsg = 'Mailing address is required.';
    } else if (name === 'authorityEmail' || name === 'contactEmail') {
      if (value && !validateEmail(value)) {
        errorMsg = `Please enter a valid ${name === 'authorityEmail' ? 'Authority' : 'Contact'} email.`;
      } else if (name === 'authorityEmail' && !value) {
        errorMsg = 'Authority email is required.';
      }
    } else if (name === 'authorityPhone' || name === 'contactPhone') {
      if (value && !validatePhone(value)) {
        errorMsg = `${name === 'authorityPhone' ? 'Authority' : 'Contact'} phone must be exactly 10 digits.`;
      } else if (name === 'authorityPhone' && !value) {
        errorMsg = 'Authority phone is required.';
      }
    } else if (name === 'companyProfile' && value.length > COMPANY_PROFILE_MAX_LENGTH) {
      errorMsg = `Company profile must not exceed ${COMPANY_PROFILE_MAX_LENGTH} characters.`;
    } else if (name === 'comment' && value.length > COMMENT_MAX_LENGTH) {
      errorMsg = `Comment must not exceed ${COMMENT_MAX_LENGTH} characters.`;
    } else if (['patents_filed', 'patents_granted'].includes(name) && value && !validateNumber(value)) {
      errorMsg = 'Please enter a valid number.';
    } else if (Object.keys(TEXTAREA_MAX_LENGTH).includes(name) && value.length > TEXTAREA_MAX_LENGTH[name]) {
      errorMsg = `This field must not exceed ${TEXTAREA_MAX_LENGTH[name]} characters.`;
    } else if (['member1', 'member2', 'member3', 'member4', 'member5'].includes(name)) {
      if (value && !/^[A-Za-z\s]*$/.test(value)) {
        errorMsg = 'Only letters and spaces are allowed.';
      }
    }
    return errorMsg;
  };

  // Handle changes for inputs/textareas/selects
  const handleChange = (name, value, index = null) => {
    if (!name) {
      console.error('handleChange called with undefined name:', { value, index });
      return;
    }

    if ([1, 2, 3, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (name === 'companyProfile') applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
      else if (name === 'comment') applicableMaxLength = COMMENT_MAX_LENGTH;
      else if ([
        "tangible_benefits",
        "quantifiable_impact",
        "carbon_footprint_reduction",
        "energy_efficiency",
        "quality_compliance",
        "intangible_impact",
        "innovation_description",
        "novelty_uniqueness",
        "scalability",
        "replicability",
        "adaptability",
        "intangible_benefits_hse",
        "external_partnerships",
        "external_recognition"
      ].includes(name)) {
        applicableMaxLength = 400;
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
        else if (name === 'innovation_description') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed ");
            return;
          }
        } else if (name === 'quantifiable_impact') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            alert("Maximum 200 words allowed ");
            return;
          }
        } else if (name === 'novelty_uniqueness') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 400) {
            alert("Maximum 400 words allowed ");
            return;
          }
        } else if (name === 'scalability') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 100) {
            alert("Maximum 100 words allowed ");
            return;
          }
        } else if (name === 'replicability') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 100) {
            alert("Maximum 100 words allowed ");
            return;
          }
        } else if (name === 'adaptability') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 100) {
            alert("Maximum 100 words allowed ");
            return;
          }
        } else if (name === 'intangible_benefits_hse') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed ");
            return;
          }
        } else if (name === 'carbon_footprint_reduction') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed ");
            return;
          }
        } else if (name === 'quality_compliance') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed .");
            return;
          }
        } else if (name === 'energy_efficiency') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed ");
            return;
          }
        } else if (name === 'external_partnerships') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 100) {
            alert("Maximum 100 words allowed ");
            return;
          }
        } else if (name === 'external_recognition') {
           const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 100) {
            alert("Maximum 100 words allowed ");
            return;
          }
        }

        else if (value.length > applicableMaxLength) {
          alert(`Value cannot exceed ${applicableMaxLength} characters.`);
          return;
        }
      }
    }



    // Validate text fields
    if (['Organisationname', 'authorityName', 'contactName'].includes(name)) {
      if (value && !/^[A-Za-z\s]*$/.test(value)) {
        return;
      }
    }

    // Phone validation
    if (['authorityPhone', 'contactPhone'].includes(name)) {
      const numericValue = value.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH);
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      clearFieldError(name);
      return;
    }

    // Numeric validation for patent fields


    // Team members limit check
    if (['member1', 'member2', 'member3', 'member4', 'member5'].includes(name)) {
      const filledMembers = ['member1', 'member2', 'member3', 'member4', 'member5'].filter(
        (m) => formData[m] || (m === name && value)
      ).length;
      if (filledMembers > 5) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: 'Maximum limit of 5 team members reached.',
        }));
        return;
      }
      if (value && !/^[A-Za-z\s]*$/.test(value)) {
        return;
      }
    }

    // Default handling
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === 'boolean' ? value : value || '',
    }));
    clearFieldError(name);

    // Clear step-specific errors
    if (name === 'Organisationname' && value && currentStep === 1) setError('');
    if (name === 'innovation_name' && value && currentStep === 1) setError('');
    if (name === 'mailingAddress' && value?.trim() && currentStep === 1) setError('');
    if (name === 'authorityName' && value && currentStep === 2) setError('');
    if (name === 'authorityTitle' && value && currentStep === 2) setError('');
    if (name === 'authorityEmail' && value && currentStep === 2) setError('');
    if (name === 'authorityPhone' && value && currentStep === 2) setError('');
  };

  // Handle blur for validation
  const handleBlur = (name, value) => {
    const errorMsg = validateField(name, value);
    if (errorMsg) {
      setFieldErrors((prev) => ({ ...prev, [name]: errorMsg }));
      alert(errorMsg);
    } else {
      clearFieldError(name);
    }
  };

  // Handle checkbox for copying applicant data

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
    const submissionDate = new Date('2025-08-05T15:44:00+05:30').toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });

    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
        <p style="text-align: center;">Submission Date and Time: ${submissionDate}</p>
        <h2>Organization & Contact Details</h2>
        <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
        <p><strong>Name of the Innovation:</strong> ${formData.innovation_name || ''}</p>
        <p><strong> Postal Address:</strong> ${formData.mailingAddress || ''}</p>
        <h2>Authority Details</h2>
        <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
        <p><strong>Authority Title:</strong> ${formData.authorityTitle || ''}</p>
        <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
        <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>
        <h2>Contacts Nodal Officials:</h2>
        <p><strong>Contact Name:</strong> ${formData.contactName || ''}</p>
        <p><strong>Contact Phone:</strong> ${formData.contactPhone || ''}</p>
        <p><strong>Contact Email:</strong> ${formData.contactEmail || ''}</p>
        <p><strong>Company Profile:</strong> ${formData.companyProfile || ''}</p>
        <h2>Quantitative Information - Part 1</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;">Response</th>
            </tr>
          </thead>
          <tbody>
            ${part1.map(([num, label, key]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h2>Quantitative Information - Part 2</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;">Response</th>
            </tr>
          </thead>
          <tbody>
            ${part2.map(([num, label, key]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h2>List of Team Members (Max. 5 entries per company)</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Name</th>
            </tr>
          </thead>
          <tbody>
            ${members.map(([num, key]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h2>Attachments</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Description</th>
              <th style="border: 1px solid #000; padding: 8px;">File</th>
            </tr>
          </thead>
          <tbody>
            ${[1, 2, 3, 4].map((n) => {
      const attachment = formData[`attachments${n}`];
      return `
                <tr>
                  <td style="border: 1px solid #000; padding: 8px;">${n}</td>
                  <td style="border: 1px solid #000; padding: 8px;">${attachment.description || ''}</td>
                  <td style="border: 1px solid #000; padding: 8px;">${attachment.file?.name || ''}</td>
                </tr>
              `;
    }).join('')}
          </tbody>
        </table>
        <h2>Declaration</h2>
        <p>I declare that the information submitted is true and complete.</p>
              <p><strong>Name:</strong> ${formData.authority_name || ''}</p>
        <p><strong>Title:</strong> ${formData.authority_title || ''}</p>
        <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
        <h2>Authority Signature:</h2>
        </div>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Navigation handlers
  const nextStep = () => {
    const errors = {};
    if (currentStep === 1) {
      if (!formData.Organisationname) {
        errors.Organisationname = 'Organisation name is required.';
      }
      if (!formData.mailingAddress?.trim()) {
        errors.mailingAddress = 'Mailing address is required.';
      }
      if (!formData.innovation_name?.trim()) {
        errors.innovation_name = 'Name of innovation is required.';
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
            if (!formData.authorityPhone || !phoneRegex.test(formData.authorityPhone)) {
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
      if (formData.contactPhone && !validatePhone(formData.contactPhone)) {
        alert('Contact phone must be exactly 10 digits.');
        return;
      }
      if (!formData.companyProfile) {
        alert('Company Profile is required.');
        return;
      }
    }
    if (currentStep === 3 && checkEmptyFieldsStep(3)) {
      if (!window.confirm("Data not entered,If you wish to continue?")) return;
    }
    if (currentStep === 4 && checkEmptyFieldsStep(4)) {
      if (!window.confirm("Data not entered,If you wish to continue?")) return;
    }

    setError('');
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
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
      localStorage.setItem('registrationInnovatorDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.Organisationname.trim()) {
      errors.Organisationname = 'Organisation name is required.';
    }
    if (!formData.mailingAddress.trim()) {
      errors.mailingAddress = 'Mailing address is required.';
    }
    if (!formData.innovation_name.trim()) {
      errors.innovation_name = 'Name of innovation is required.';
    }
    if (!formData.authorityName.trim()) {
      errors.authorityName = 'Authority name is required.';
    }
    if (!formData.authorityTitle.trim()) {
      errors.authorityTitle = 'Authority designation is required.';
    }
    if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
      errors.authorityEmail = 'Please enter a valid Authority email.';
    }
    if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
      errors.authorityPhone = 'Please enter a valid 10-digit authority phone number.';
    }
    if (!formData.contactName.trim()) {
      errors.contactName = 'Contact name is required.';
    }
    if (formData.contactEmail && !validateEmail(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid Contact email.';
    }
    if (!formData.declaration) {
      errors.declaration = 'Please accept the declaration before submitting.';
    }
    if (!formData.approvingAuthoritySignature) {
      errors.approvingAuthoritySignature = 'Please upload the document with the approving authority signature.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      alert(Object.values(errors)[0]);
      return;
    }

    const fd = new FormData();
    const simpleFields = {
      organisation_name: formData.Organisationname,
      category: formData.category,
      company_name: formData.companyName,
      mailing_address: formData.mailingAddress,
      authority_name: formData.authorityName,
      authority_title: formData.authorityTitle,
      authority_phone: formData.authorityPhone,
      authority_email: formData.authorityEmail,
      contact_name: formData.contactName,
      contact_phone: formData.contactPhone,
      contact_email: formData.contactEmail,
      company_profile: formData.companyProfile,
      innovation_name: formData.innovation_name,
      comment: formData.comment,
    };

    Object.entries(simpleFields).forEach(([key, value]) => {
      if (value != null && value !== '') fd.append(key, value);
    });

    fd.append('declaration', formData.declaration ? 'true' : 'false');
    if (formData.approvingAuthoritySignature) {
      fd.append('approving_authority_file', formData.approvingAuthoritySignature);
    }

    const quantFields = [
      'tangible_benefits',
      'innovation_description',
      'quantifiable_impact',
      'novelty_uniqueness',
      'scalability',
      'replicability',
      'adaptability',
      'intangible_impact',
      'intangible_benefits_hse',
      'carbon_footprint_reduction',
      'quality_compliance',
      'energy_efficiency',
      'patents',
      'patents_filed',
      'patents_granted',
      'miscellaneous',
      'external_partnerships',
      'external_recognition',
      'external_presentation',
      'member1',
      'member2',
      'member3',
      'member4',
      'member5',
    ];

    quantFields.forEach((key) => {
      const value = formData[key];
      fd.append(key, value || '');
    });

    [1, 2, 3, 4].forEach((n) => {
      const slot = formData[`attachments${n}`];
      fd.append(`attachments${n}_desc`, slot.description || '');
      if (slot.file) fd.append(`attachments${n}`, slot.file);
    });

    try {
      // const res = await fetch(
      //   `${ACTIVE_API_BASE_URL}/registration-innovator/count/?org=${encodeURIComponent(formData.Organisationname)}`
      // );
      // if (!res.ok) {
      //   console.error(await res.text());
      //   alert('Could not verify submission count.');
      //   return;
      // }
      // const { count } = await res.json();
      // if (count >= 5) {
      //   alert('You have reached the maximum limit of 5 forms for this organisation.');
      //   return;
      // }

      // const postRes = await fetch(`${ACTIVE_API_BASE_URL}/registration-innovator/`, {
      //   method: 'POST',
      //   body: fd,
      // });
      // const data = await postRes.json();
      // if (!postRes.ok) {
      //   console.error('Server errors:', data);
      //   alert(data.error || 'Submission failed; see console.');
      //   return;
      // }
try {
        localStorage.removeItem('registrationInnovatorDraft');
      } catch (err) {
        // ignore
      }



      alert('Submitted successfully!');
      setIsSubmitted(true);
      setCurrentStep(1);
      setCopyApplicantData(false);
      setFormData({
        Organisationname: '',
        category: 'Innovator of the Year (Team)',
        companyName: '',
        mailingAddress: '',
        authorityName: '',
        authorityTitle: '',
        authorityPhone: '',
        authorityEmail: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        companyProfile: '',
        approvingAuthoritySignature: null,
        declaration: false,
        comment: '',
        innovation_name: '',
        tangible_benefits: '',
        innovation_description: '',
        quantifiable_impact: '',
        novelty_uniqueness: '',
        scalability: '',
        replicability: '',
        adaptability: '',
        intangible_impact: '',
        intangible_benefits_hse: '',
        carbon_footprint_reduction: '',
        quality_compliance: '',
        energy_efficiency: '',
        patents: '',
        patents_filed: '',
        patents_granted: '',
        miscellaneous: '',
        external_partnerships: '',
        external_recognition: '',
        external_presentation: '',
        member1: '',
        member2: '',
        member3: '',
        member4: '',
        member5: '',
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
      });
      setFieldErrors({});
      setError('');
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error; please retry.');
    }
  };

  // Quantitative fields definition
  const part1 = [
    ['1', 'Tangible benefits of the innovation', 'tangible_benefits'],
    [
      '1.1',
      'Brief description of the innovation along with details of Technology used, Gestation period, financial implication, Innovative practices and the Development lifecycle (inception to implementation). (Max. 300 words)',
      'innovation_description',
    ],
    [
      '1.2',
      'Quantifiable impact of innovation: a. Cost savings b. Operational efficiency gains/improvement in productivity (Please provide data with units, if applicable). (Max. 200 words)',
      'quantifiable_impact',
    ],
    [
      '1.3',
      'Novelty and uniqueness: a. Uniqueness of the innovation. b. Technological challenges that have been overcome. c. Environmental gain accrued. d. New technologies used (especially Digital Technologies). (Max. 400 words).',
      'novelty_uniqueness',
    ],
    ['1.4', 'Scalability: Can the innovation be scaled across the oil & gas/energy sector (India/global)? (Max. 100 words).', 'scalability'],
    ['1.5', 'Replicability: Can the innovation be implemented by other companies in the oil & gas/energy sector under similar conditions? (Max. 100 words).', 'replicability'],
    ['1.6', 'Adaptability: Potential for further improvement or adaptation. Could this innovation evolve further? (Max. 100 words).', 'adaptability'],
    ['2', 'Intangible Impact', 'intangible_impact'],
    ['2.1', 'Intangible benefits: Describe impact on the following: (Max. 300 words) a. Health, Safety & Environment (HSE)', 'intangible_benefits_hse'],
    ['2.2', 'b. Carbon footprint reduction', 'carbon_footprint_reduction'],
    ['2.3', 'c. Quality or compliance improvements', 'quality_compliance'],
    ['2.4', 'd. Energy efficiency', 'energy_efficiency'],
  ];

  const part2 = [
    ['3', 'Patents', 'patents'],
    ['3.1', 'Number of patents filed for the innovation', 'patents_filed'],
    ['3.2', 'Number of domestic/international patents granted', 'patents_granted'],
    ['4', 'Miscellaneous', 'miscellaneous'],
    ['4.1', 'Team composition and cross-functional collaboration (Max. 100 words). ', 'external_partnerships'],
    ['4.2', 'External partnerships with academia/startups/R&D (Max. 100 words). ', 'external_recognition'],
    ['4.3', 'Recognition or awards received from external bodies (other than the company itself) ', 'external_presentation'],
  ];

  const members = [
    ['1', 'member1'],
    ['2', 'member2'],
    ['3', 'member3'],
    ['4', 'member4'],
    ['5', 'member5'],
  ];
  const checkEmptyFieldsStep = (step) => {
    // Choose the data array slice depending on step
    const stepData = step === 3 ? part1 : part2;

    // Iterate and check if any related formData[key] is empty
    for (let [num, label, key] of stepData) {
      const value = formData[key];
      // For textareas or inputs, treat empty string or undefined as empty
      if (!value || (Array.isArray(value) && value.some(v => !v))) {
        // skip keys you want to ignore here if any, e.g. optional fields
        if (['tangible_benefits', 'intangible_impact', 'patents', 'miscellaneous'].includes(key))
          continue;
        return true; // found empty
      }
    }
    return false; // all filled
  };


  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;
    return (
      <div className="form-step" role="region" aria-label={`Step ${currentStep} of 5`}>
        <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>

        {currentStep === 1 && (
          <div>
            <h3 className="step-title">Step 1: Organization Details</h3>
            <div className="form-group">
              <label htmlFor="Organisationname">
                Organisation Name: <span className="text-red" aria-hidden="true">*</span>
              </label>
              <input
                id="Organisationname"
                type="text"
                name="Organisationname"
                value={formData.Organisationname}
                // disabled={true} 
                onChange={(e) => handleChange('Organisationname', e.target.value)}
                // onBlur={(e) => handleBlur('Organisationname', e.target.value)}
                className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
                placeholder="Enter organisation name"
                maxLength={FIELD_MAX_LENGTH}
                aria-required="true"
                aria-describedby={fieldErrors.Organisationname ? 'Organisationname-error' : undefined}
              />
              {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
            </div>


            <div className="form-group">
              <label htmlFor="innovation_name">
                Name of the Innovation: <span className="text-red" aria-hidden="true">*</span>
              </label>
              <input
                id="innovation_name"
                type="text"
                name="innovation_name"
                value={formData.innovation_name}
                onChange={(e) => handleChange('innovation_name', e.target.value)}
                onBlur={(e) => handleBlur('innovation_name', e.target.value)}
                className={`form-input ${!formData.innovation_name && currentStep === 1 ? 'has-error' : ''}`}
                placeholder="Enter name of innovation"
                maxLength={INNOVATION_NAME_MAX_LENGTH}
                aria-required="true"
                aria-describedby={fieldErrors.innovation_name ? 'innovation_name-error' : undefined}
              />
              {!formData.innovation_name && currentStep === 1 && <span className="error-tooltip">Innovation name is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="mailingAddress">
                Postal Address: <span className="text-red" aria-hidden="true">*</span>
              </label>
              <textarea
                id="mailingAddress"
                name="mailingAddress"
                value={formData.mailingAddress}
                onChange={(e) => handleChange('mailingAddress', e.target.value)}
                onBlur={(e) => handleBlur('mailingAddress', e.target.value)}
                className={`form-textarea ${!formData.mailingAddress && currentStep === 1 ? 'has-error' : ''}`}
                rows={3}
                placeholder="Enter Postal address"
                aria-required="true"
                aria-describedby={fieldErrors.mailingAddress ? 'mailingAddress-error' : undefined}
              />
              {!formData.mailingAddress && currentStep === 1 && <span className="error-tooltip">Postal address is required</span>}
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h3 className="step-title">Step 2: Approving Authority & Contact Details</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="step-section">
                <h4>Approving Authority</h4>
                <div className="form-group">
                  <label htmlFor="authorityName">
                    Name: <span className="text-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="authorityName"
                    type="text"
                    name="authorityName"
                    value={formData.authorityName}
                    onChange={(e) => handleChange('authorityName', e.target.value)}
                    onBlur={(e) => handleBlur('authorityName', e.target.value)}
                    className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="Name"
                    maxLength={FIELD_MAX_LENGTH}
                    aria-required="true"
                    aria-describedby={fieldErrors.authorityName ? 'authorityName-error' : undefined}
                  />
                  {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Authority name is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityTitle">
                    Designation: <span className="text-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="authorityTitle"
                    type="text"
                    name="authorityTitle"
                    value={formData.authorityTitle}
                    onChange={(e) => handleChange('authorityTitle', e.target.value)}
                    onBlur={(e) => handleBlur('authorityTitle', e.target.value)}
                    className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="Designation"
                    maxLength={FIELD_MAX_LENGTH}
                    aria-required="true"
                    aria-describedby={fieldErrors.authorityTitle ? 'authorityTitle-error' : undefined}
                  />
                  {!formData.authorityTitle && currentStep === 2 && <span className="error-tooltip">Authority Designation is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityPhone">
                    Phone Number: <span className="text-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="authorityPhone"
                    type="tel"
                    name="authorityPhone"
                    value={formData.authorityPhone}
                    onChange={(e) => handleChange('authorityPhone', e.target.value)}
                    onBlur={(e) => handleBlur('authorityPhone', e.target.value)}
                    className={`form-input ${!formData.authorityPhone && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="Phone number"
                    maxLength={PHONE_MAX_LENGTH}
                    aria-required="true"
                    aria-describedby={fieldErrors.authorityPhone ? 'authorityPhone-error' : undefined}
                  />
                  {!formData.authorityPhone && currentStep === 2 && <span className="error-tooltip">Authority Phone is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityEmail">
                    Email Address: <span className="text-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="authorityEmail"
                    type="email"
                    name="authorityEmail"
                    value={formData.authorityEmail}
                    onChange={(e) => handleChange('authorityEmail', e.target.value)}
                    onBlur={(e) => handleBlur('authorityEmail', e.target.value)}
                    className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="E-mail address"
                    aria-required="true"
                    aria-describedby={fieldErrors.authorityEmail ? 'authorityEmail-error' : undefined}
                  />
                  {!formData.authorityEmail && currentStep === 2 && <span className="error-tooltip">Authority Email is required</span>}
                </div>
              </div>
              <div className="step-section">
                <h4>Contacts (Nodal Officials) <span className="text-red" aria-hidden="true">*</span></h4>
                <div className="form-group">
                  <label htmlFor="copyApplicantData">
                    <input
                      id="copyApplicantData"
                      type="checkbox"
                      name="copyApplicantData"
                      checked={copyApplicantData}
                      onChange={handleCopyApplicantToggle}
                      className="form-checkbox"
                    />
                    Same as applicant
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="contactName">
                    Name: <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contactName}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    placeholder="Contact name"
                    disabled={copyApplicantData}
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
                  <label htmlFor="contactPhone">Phone Number</label>
                  <input
                    id="contactPhone"
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                    onBlur={(e) => handleBlur('contactPhone', e.target.value)}
                    className={`form-input ${!formData.contactPhone && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="Phone number"
                    maxLength={PHONE_MAX_LENGTH}
                    disabled={copyApplicantData}
                    aria-describedby={fieldErrors.contactPhone ? 'contactPhone-error' : undefined}
                  />
                  {!formData.contactPhone && currentStep === 2 && <span className="error-tooltip">contact phone is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">Email Address</label>
                  <input
                    id="contactEmail"
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    onBlur={(e) => handleBlur('contactEmail', e.target.value)}
                    className={`form-input ${!formData.contactEmail && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="E-mail address"
                    disabled={copyApplicantData}
                    aria-describedby={fieldErrors.contactEmail ? 'contactEmail-error' : undefined}
                  />
                  {!formData.contactEmail && currentStep === 2 && <span className="error-tooltip">contact email is required</span>}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="companyProfile">Brief write up on company’s profile </label>
              <p className="note">(within 300 words)</p>
              <textarea
                id="companyProfile"
                name="companyProfile"
                value={formData.companyProfile}
                onChange={(e) => handleChange('companyProfile', e.target.value)}
                onBlur={(e) => handleBlur('companyProfile', e.target.value)}
                className={`form-input ${!formData.companyProfile && currentStep === 2 ? 'has-error' : ''}`}
                rows={6}
                // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                aria-describedby={fieldErrors.companyProfile ? 'companyProfile-error' : undefined}
              />
              {!formData.companyProfile && currentStep === 2 && <span className="error-tooltip">company profile is required</span>}
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
            <table className="quant-table">
              <thead>
                <tr>
                  <th scope="col">S. No.</th>
                  <th scope="col">Particulars</th>
                  <th scope="col">Response</th>
                </tr>
              </thead>
              <tbody>
                {part1.map(([num, label, key]) => (
                  <tr key={key || label}>
                    <td>{num}</td>
                    <td>{label}</td>
                    <td>
                      {['tangible_benefits', 'intangible_impact'].includes(key) ? (
                        <span></span>
                      ) : (
                        <textarea
                          value={formData[key] || ''}
                          onChange={(e) => handleChange(key, e.target.value)}
                          onBlur={(e) => handleBlur(key, e.target.value)}
                          className={`form-textarea ${fieldErrors[key] ? 'has-error' : ''}`}
                          rows={6}
                          // maxLength={TEXTAREA_MAX_LENGTH[key] || 300}
                          aria-label={`${label} input`}
                          aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                        />
                      )}
                      {fieldErrors[key] && (
                        <span id={`${key}-error`} className="error-tooltip" role="alert">
                          {fieldErrors[key]}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
            <table className="quant-table">
              <thead>
                <tr>
                  <th scope="col">S. No.</th>
                  <th scope="col">Particulars</th>
                  <th scope="col">Response</th>
                </tr>
              </thead>
              <tbody>
                {part2.map(([num, label, key]) => (
                  <tr key={key || label}>
                    <td>{num}</td>
                    <td>{label}</td>
                    <td>
                      {['patents', 'miscellaneous'].includes(key) ? (
                        <span></span>
                      ) : (
                        ['patents_filed', 'patents_granted'].includes(key) ? (
                          <input
                            type="number"
                            value={formData[key] || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (!val.startsWith('-') && !val.toLowerCase().includes('e')) {
                                handleChange(key, val);
                              }
                            }}
                            onBlur={(e) => handleBlur(key, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                e.preventDefault();
                              }
                            }}
                            className={`form-input no-spinner ${fieldErrors[key] ? 'has-error' : ''}`}
                            placeholder="Enter value"
                            min="0"
                            aria-label={`${label} input`}
                            aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                          />
                        ) : (
                          <input
                            type="text"
                            value={formData[key] || ''}
                            onChange={(e) => handleChange(key, e.target.value)}
                            onBlur={(e) => handleBlur(key, e.target.value)}
                            className={`form-input ${fieldErrors[key] ? 'has-error' : ''}`}
                            placeholder="Enter value"
                            // maxLength={TEXTAREA_MAX_LENGTHS[key] || undefined}
                            aria-label={`${label} input`}
                            aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                          />
                        )
                      )}
                      {fieldErrors[key] && (
                        <span id={`${key}-error`} className="error-tooltip" role="alert">
                          {fieldErrors[key]}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="quant-table">
              <caption className="table-header">List of Team Members (Max. 5 entries per company)</caption>
              <p className="note">Note: Only up to 5 team members can be added.</p>
              {['member1', 'member2', 'member3', 'member4', 'member5']
                .filter((m) => formData[m])
                .length >= 5 && (
                  <p className="error-tooltip" role="alert">
                    Maximum limit of 5 team members reached.
                  </p>
                )}
              <thead>
                <tr>
                  <th scope="col">S. No.</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                {members.map(([num, key]) => (
                  <tr key={key}>
                    <td>{num}</td>
                    <td>
                      <input
                        type="text"
                        value={formData[key] || ''}
                        onChange={(e) => handleChange(key, e.target.value)}
                        onBlur={(e) => handleBlur(key, e.target.value)}
                        className={`form-input ${fieldErrors[key] ? 'has-error' : ''}`}
                        disabled={
                          ['member1', 'member2', 'member3', 'member4', 'member5'].filter((m) => formData[m]).length >=
                          5 && !formData[key]
                        }
                        aria-label={`Team member ${num} name`}
                        aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                      />
                      {fieldErrors[key] && (
                        <span id={`${key}-error`} className="error-tooltip" role="alert">
                          {fieldErrors[key]}
                        </span>
                      )}
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
                value={formData.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                onBlur={(e) => handleBlur('comment', e.target.value)}
                className={`form-textarea ${fieldErrors.comment ? 'has-error' : ''}`}
                // maxLength={COMMENT_MAX_LENGTH}
                placeholder="Comments in (200 characters) against input parameter, if any"
                aria-describedby={fieldErrors.comment ? 'comment-error' : undefined}
              />
              {fieldErrors.comment && (
                <span id="comment-error" className="error-tooltip" role="alert">
                  {fieldErrors.comment}
                </span>
              )}
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
                    <th scope="col">S. No.</th>
                    <th scope="col">Description</th>
                    <th scope="col">Upload (only jpg, png, pdf, max 5 MB each)</th>
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
                            onBlur={(e) => handleBlur(`${key}.description`, e.target.value)}
                            placeholder="Enter description"
                            className={`form-input ${fieldErrors[`${key}.description`] ? 'has-error' : ''}`}
                            maxLength={FIELD_MAX_LENGTH}
                            aria-label={`Attachment ${num} description`}
                            aria-describedby={fieldErrors[`${key}.description`] ? `${key}-description-error` : undefined}
                          />
                          {fieldErrors[`${key}.description`] && (
                            <span id={`${key}-description-error`} className="error-tooltip" role="alert">
                              {fieldErrors[`${key}.description`]}
                            </span>
                          )}
                        </td>
                        <td>
                          <input
                            type="file"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) => handleAttachmentChange(key, 'file', e.target.files[0], e)}
                            className="form-input mt-4"
                            aria-label={`Upload attachment ${num}`}
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
                Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.
                <span className="text-red" aria-hidden="true">*</span>
              </label>
              <div className="form-navigation">
                <button type="button" onClick={handlePrint} className="btn btn-outline">
                  Print Preview
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="approvingAuthoritySignature">
                Upload Document with Approving Authority Signature (Director/Board Level)
                <span className="text-red" aria-hidden="true">*</span>
              </label>
              <input
                id="approvingAuthoritySignature"
                type="file"
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
                className={`form-input mt-4 ${fieldErrors.approvingAuthoritySignature ? 'has-error' : ''}`}
                aria-required="true"
                aria-describedby={fieldErrors.approvingAuthoritySignature ? 'approvingAuthoritySignature-error' : undefined}
              />
              {formData.approvingAuthoritySignature && (
                <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
              )}
              {fieldErrors.approvingAuthoritySignature && (
                <span id="approvingAuthoritySignature-error" className="error-tooltip" role="alert">
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
                  onChange={(e) => handleChange('declaration', e.target.checked)}
                  className="form-checkbox"
                  aria-required="true"
                />
                I declare that the information submitted is true and complete.
              </label>
              {fieldErrors.declaration && (
                <span id="declaration-error" className="error-tooltip" role="alert">
                  {fieldErrors.declaration}
                </span>
              )}

            </div>
          </div>
        )}
      </div>
    );
  };
  useEffect(() => {
    // Scroll window to top smoothly
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
          <h6>Step {currentStep} of 5</h6>
        </div>
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        {isSubmitted ? (
          <div className="thank-you-message">
            <h2>Thank you for your submission!</h2>
            <p>Your registration has been successfully submitted.</p>
            <button onClick={() => setIsSubmitted(false)} className="btn btn-primary">
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            {currentStep === 1 && (
              <div className="form-navigation-step1">
                <button type="button" onClick={saveDraft} className="btn btn-outline">
                  <Save size={16} /> Save Draft
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                  disabled={fieldErrors.Organisationname?.includes('Maximum limit')}
                >
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

export default RegistrationInnovator;
