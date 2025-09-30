
// import React, { useState, useCallback, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../styles/FormProduction.css';
// import SidebarGuideline from "./SidebarGuideline"

// // Constants for max lengths
// const FIELD_MAX_LENGTH = 100;
// const COMPANY_PROFILE_MAX_LENGTH= 300;
// const COMMENT_MAX_LENGTH = 200;
// const PHONE_MAX_LENGTH = 10;

// // Validation regex
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /^\d{10}$/;

// const RegistrationRefinery = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [activeItem, setActiveItem] = useState(null);
//   const awardTitle = location.state?.awardTitle || 'Refinery of the Year';

//   // Form state initialization
//   const [formData, setFormData] = useState({
//     Organisationname: '',
//     category: 'Refinery of the Year',
//     mailingAddress: '',
//     refinery: '',
//     authorityName: '',
//     authorityTitle: '',
//     authorityPhone: '',
//     authorityEmail: '',
//     contactName: '',
//     contactPhone: '',
//     contactEmail: '',
//     companyProfile: '',
//     awardJustification: '',
//     approvingAuthoritySignature: null,
//     declaration: false,
//     comment: '',
//     refinery1_1MMTPA: ['', '', '', ''], // [2024-25, 2023-24, 2022-23, 2021-22]
//     refinery1_1_1MMTPA: ['', '', '', ''],
//     refinery1_2_1MMTPA: ['', '', '', ''],
//     refinery1_2_2MMTPA: ['', '', '', ''],
//     refinery1_3MMTPA: ['', '', '', ''],
//     refinery2MMTPA: ['', '', '', ''],
//     refinery3_1MMTPA: ['', '', '', ''],
//     refinery3_2MMTPA: ['', '', '', ''],
//     refinery4MMTPA: ['', '', '', ''],
//     refinery5_1MMTPA: ['', '', '', ''],
//     refinery5_1_2MMTPA: ['', '', '', ''],
//     refinery6_1MMTPA: ['', '', '', ''],
//     refinery6_1_1MMTPA: ['', '', '', ''],
//     refinery7MMTPA: ['', '', '', ''],
//     refinery8_1Safety: '',
//     refinery8_2Safety: '',
//     refinery8_3Safety: '',
//     refinery8_4Safety: '',
//     refinery8_5Safety: '',
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

//   // Validate field on blur
//   const validateField = (name, value) => {
//     let errorMsg = '';
//     if (['Organisationname', 'authorityName', 'authorityTitle', 'contactName', 'refinery'].includes(name)) {
//       if (!value.trim()) {
//         errorMsg = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
//       } else if (!/^[A-Za-z\s]*$/.test(value)) {
//         errorMsg = 'Only letters and spaces are allowed.';
//       }
//     } else if (name === 'mailingAddress' && !value.trim()) {
//       errorMsg = 'Mailing address is required.';
//     } else if (name === 'authorityEmail' || name === 'contactEmail') {
//       if (value && !validateEmail(value)) {
//         errorMsg = `Please enter a valid ${name === 'authorityEmail' ? 'Authority' : 'Contact'} email.`;
//       } else if (name === 'authorityEmail' && !value) {
//         errorMsg = 'Authority email is required.';
//       }
//     } else if (name === 'authorityPhone' || name === 'contactPhone') {
//       if (value && !validatePhone(value)) {
//         errorMsg = `${name === 'authorityPhone' ? 'Authority' : 'Contact'} phone must be exactly 10 digits.`;
//       } else if (name === 'authorityPhone' && !value) {
//         errorMsg = 'Authority phone is required.';
//       }
//     } else if (name === 'companyProfile' && !value.trim()) {
//       errorMsg = 'Company profile is required.';
//     } else if (name === 'awardJustification' && !value.trim()) {
//       errorMsg = 'Award justification is required.';
//     } else if (name === 'comment' && value.length > COMMENT_MAX_LENGTH) {
//       errorMsg = `Comment must not exceed ${COMMENT_MAX_LENGTH} characters.`;
//     }
//     return errorMsg;
//   };

//   // Handle changes for inputs/textareas/selects
//   const handleChange = (name, value, index = null) => {
//     // Length validation
//      let applicableMaxLength = FIELD_MAX_LENGTH;
//             if (name === 'companyProfile') applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
//             else if (name === 'comment') applicableMaxLength = COMMENT_MAX_LENGTH;
           

//             if (typeof value === 'string') {
//                 if (name === 'companyProfile') {
//                     const wordCount = value.trim().split(/\s+/).length;
//                     if (wordCount > 300) {
//                         alert("Maximum 300 words allowed in Company Profile.");
//                         return;
//                     }
//                 } else if (name === 'comment') {
//                     const wordCount = value.trim().split(/\s+/).length;
//                     if (wordCount > 200) {
//                         alert("Maximum 200 words allowed in Comments.");
//                         return;
//                     }
//                 }
//     }

//     // Name validation
//     if (['Organisationname', 'authorityName', 'contactName', 'refinery'].includes(name)) {
//       const isValid = /^[A-Za-z\s]*$/.test(value);
//       if (!isValid && value !== '') {
//         alert('Only letters and spaces are allowed.');
//         return;
//       }
//     }

//     // Quantitative fields validation
//     const quantFields = [
//       'refinery1_1MMTPA', 'refinery1_1_1MMTPA', 'refinery1_2_1MMTPA', 'refinery1_2_2MMTPA',
//       'refinery1_3MMTPA', 'refinery2MMTPA', 'refinery3_1MMTPA', 'refinery3_2MMTPA',
//       'refinery4MMTPA', 'refinery5_1MMTPA', 'refinery5_1_2MMTPA', 'refinery6_1MMTPA',
//       'refinery6_1_1MMTPA', 'refinery7MMTPA', 'refinery8_1Safety', 'refinery8_2Safety',
//       'refinery8_3Safety', 'refinery8_4Safety', 'refinery8_5Safety'
//     ];
//     if (quantFields.includes(name)) {
//       if (index !== null) {
//         const val = value.toString();
//         if (val.startsWith('-') || val.toLowerCase().includes('e')) {
//           alert('Negative numbers or scientific notation are not allowed.');
//           return;
//         }
//         setFormData((prev) => {
//           const updatedArray = [...prev[name]];
//           updatedArray[index] = value;
//           return { ...prev, [name]: updatedArray };
//         });
//         clearFieldError(`${name}[${index}]`);
//       } else {
//         if (value !== '' && (isNaN(value) || Number(value) < 0)) {
//           alert('Value must be a non-negative number.');
//           return;
//         }
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         clearFieldError(name);
//       }
//       return;
//     }

//     // Phone validation
//     if (['authorityPhone', 'contactPhone'].includes(name)) {
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

//     // Default handling
//     setFormData((prev) => ({
//       ...prev,
//       [name]: typeof value === 'boolean' ? value : value || '',
//     }));
//     clearFieldError(name);

//     if (['Organisationname', 'mailingAddress', 'refinery'].includes(name) && value && currentStep === 1) setError('');
//     if (['authorityName', 'authorityTitle', 'authorityEmail', 'authorityPhone', 'contactName', 'companyProfile', 'awardJustification'].includes(name) && value && currentStep === 2) setError('');
//   };

//   // Handle blur for validation
//   const handleBlur = (name, value) => {
//     const errorMsg = validateField(name, value);
//     if (errorMsg) {
//       setFieldErrors((prev) => ({ ...prev, [name]: errorMsg }));
//     } else {
//       clearFieldError(name);
//     }
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

//   // Quantitative data
//   const part1 = [
//     ['1', 'Refinery capacity', ],
//     ['1.1', 'Name Plate Capacity (MMTPA)', 'refinery1_1MMTPA'],
//     ['1.1.1', 'Actual Crude Processing (MMTPA)', 'refinery1_1_1MMTPA'],
//     ['1.2', 'Cracking Capacity', ],
//     ['1.2.1', 'Name Plate Capacity (MMTPA)', 'refinery1_2_1MMTPA'],
//     ['1.2.2', 'Actual Processing (MMTPA)', 'refinery1_2_2MMTPA'],
//     ['1.3', 'Distillates Yield (% of the crude throughput)', 'refinery1_3MMTPA'],
//     ['2', 'Gross Refining Margin ($/bbl)(GRM without any concession to be reported)', 'refinery2MMTPA'],
//     ['3', 'Operating Cost (Rs/MT)', ],
//     ['3.1', 'Internal Fuel consumption (% of the crude throughput)', 'refinery3_1MMTPA'],
//     ['3.2', 'Loss (% of the crude throughput)', 'refinery3_2MMTPA'],
//     ['4', 'MBN (use CHT methodology for the calculation)', 'refinery4MMTPA'],
//     ['5', 'Capital Expenditure (Rs in crore)', ],
//     ['5.1', 'Planned Capex (Original budget)', 'refinery5_1MMTPA'],
//     ['5.1.2', 'Actual Capex', 'refinery5_1_2MMTPA'],
//     ['6', 'Specific water consumption', ],
//     ['6.1', 'Fresh water consumption (m3)', 'refinery6_1MMTPA'],
//     ['6.1.1', 'NRG factor (indicator of level of complexity of refinery)', 'refinery6_1_1MMTPA'],
//   ];

//   const part2 = [
//   ['7', 'Carbon Emission (Tonne)  {Specific Carbon Emission for the refinery = (Total CO2 emissions due to burning of fuels +Equivalent CO2 emission in case of purchased electricity+ Equivalent CO2 emissionin case of purchase of any utility like H2, Steam etc. – CO2 emission which is emitted in Non Refinery operations) / crudeprocessed in barrel / Energy factor}', 'refinery7MMTPA'],
//   ['8', 'Safety', ''],
//   ['8.1', 'Number of fatalities (own + contract employees)', 'refinery8_1Safety'],
//   ['8.2', 'Number of lost time injuries in the reporting period (own employees + contract employees) ', 'refinery8_2Safety'],
//   ['8.3', 'Number of OSHA recordable incidents (own employees + contract employees) ', 'refinery8_3Safety'],
//   ['8.4', 'Total Manhours worked Own Employees', 'refinery8_4Safety'],
//   ['8.5', 'Total Manhours worked Contractors Employees', 'refinery8_5Safety'],
//   ];

// // Print form handler
// const handlePrint = () => {
//   const submissionDate = new Date('2025-08-05T23:41:00+05:30').toLocaleString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//     timeZone: 'Asia/Kolkata',
//   });

//   const printContent = `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
//         <p style="text-align: center;">Submission Date and Time: ${submissionDate}</p>
//         <h2>Organization & Contact Details</h2>
//         <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
//         <p><strong>Refinery:</strong> ${formData.refinery || ''}</p>
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
//               <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
//               <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//               <th style="border: 1px solid #000; padding: 8px;">2024–25</th>
//               <th style="border: 1px solid #000; padding: 8px;">2023–24</th>
//               <th style="border: 1px solid #000; padding: 8px;">2022–23</th>
//               <th style="border: 1px solid #000; padding: 8px;">2021–22</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${part1.map(([num, label, key]) => `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 8px;">${num}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${label}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][0] || '' : ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][1] || '' : ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][2] || '' : ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][3] || '' : ''}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//         <h2>Quantitative Information - Part 2</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead>
//             <tr>
//               <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
//               <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//               <th style="border: 1px solid #000; padding: 8px;">2024–25</th>
//               <th style="border: 1px solid #000; padding: 8px;">2023–24</th>
//               <th style="border: 1px solid #000; padding: 8px;">2022–23</th>
//               <th style="border: 1px solid #000; padding: 8px;">2021–22</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${part2.slice(0, 1).map(([num, label, key]) => `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 8px;">${num}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${label}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][0] || '' : ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][1] || '' : ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][2] || '' : ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][3] || '' : ''}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//         <h2>Safety Metrics</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead>
//             <tr>
//               <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
//               <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//               <th style="border: 1px solid #000; padding: 8px;">2024–25</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${part2.slice(1).map(([num, label, key]) => `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 8px;">${num}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${label}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//         <h2>Attachments</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead>
//             <tr>
//               <th style="border: 1px solid #000; padding: 8px;">S.No</th>
//               <th style="border: 1px solid #000; padding: 8px;">Description</th>
//               <th style="border: 1px solid #000; padding: 8px;">File Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${[1, 2, 3, 4].map((i) => `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 8px;">${i}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].description || ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].file?.name || ''}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//         <h2>Comments</h2>
//         <p>${formData.comment || ''}</p>
//         <h2>Declaration</h2>
//         <p>I declare that the information submitted is true and complete.</p>
//       <h2>Authority Signature</h2>
//         <p><strong>Name:</strong> ${formData.authorityName || ''}</p>
//         <p><strong>Title:</strong> ${formData.authorityTitle || ''}</p>
//         <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
//         </div>
//     `;
//   const printWindow = window.open('', '', 'height=600,width=800');
//   printWindow.document.write(printContent);
//   printWindow.document.close();
//   printWindow.print();
// };

// // Check for empty fields in a step
// const checkStepFieldsEmpty = (step) => {
//   let stepItems = [];

//   if (step === 3) {
//     // Step 3: Only rows with an editable key
//     stepItems = part1.filter(([, , key]) => key);
//   } else if (step === 4) {
//     // Step 4: Only rows with editable keys
//     stepItems = part2.filter(([, , key]) => key);
//   }

//   for (const [, , key] of stepItems) {
//     // Skip rows without editable input
//     if (!key) continue;

//     const val = formData[key];

//     if (Array.isArray(val)) {
//       // Any year empty → return true
//       if (val.some(v => v === '' || v === undefined || v === null)) {
//         return true;
//       }
//     } else if (val === '' || val === undefined || val === null) {
//       return true;
//     }
//   }

//   // Step 4: also check comment field
//   if (step === 4) {
//     if (!formData.comment || formData.comment.trim() === '') {
//       return true;
//     }
//   }

//   return false; // All filled
// };

// // Navigation handlers
// const nextStep = () => {
//   const errors = {};
//   if (currentStep === 1) {
//     if (!formData.Organisationname) {
//       errors.Organisationname = 'Organisation name is required.';
//     }
//     if (!formData.mailingAddress?.trim()) {
//       errors.mailingAddress = 'Mailing address is required.';
//     }
//     if (!formData.refinery && formData.category === 'Refinery of the Year') {
//       errors.refinery = 'Refinery name is required.';
//     }
//   }
//   if (currentStep === 2) {
//     if (!formData.authorityName) {
//       errors.authorityName = 'Authority name is required.';
//     }
//     if (!formData.authorityTitle) {
//       errors.authorityTitle = 'Authority designation is required.';
//     }
//     if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
//       errors.authorityEmail = 'Please enter a valid Authority email.';
//     }
//     if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
//       errors.authorityPhone = 'Authority phone must be exactly 10 digits.';
//     }
//     if (!formData.contactName) {
//       errors.contactName = 'Contact name is required.';
//     }
//     if (formData.contactEmail && !validateEmail(formData.contactEmail)) {
//       errors.contactEmail = 'Please enter a valid Contact email.';
//     }
//     if (formData.contactPhone && !validatePhone(formData.contactPhone) && !copyApplicantData) {
//       errors.contactPhone = 'Contact phone must be exactly 10 digits.';
//     }
//     if (!formData.companyProfile.trim()) {
//       errors.companyProfile = 'Company profile is required.';
//     }
//   }
//   if (currentStep === 3 && checkStepFieldsEmpty(3)) {
//     if (!window.confirm('Data not entered,If you wish to continue?')) {
//       return;
//     }
//   }
//   if (currentStep === 4 && checkStepFieldsEmpty(4)) {
//     if (!window.confirm('Data not entered,If you wish to continue?')) {
//       return;
//     }
//   }

//   setError('');
//   if (currentStep < 5) {
//     setCurrentStep((prev) => prev + 1);
//   }
// };

// const prevStep = () => {
//   if (currentStep > 1) setCurrentStep((prev) => prev - 1);
// };

// const saveDraft = () => {
//   localStorage.setItem('registrationRefineryDraft', JSON.stringify({ formData }));
//   alert('Draft Saved!');
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const errors = {};
//   if (!formData.Organisationname) {
//     errors.Organisationname = 'Organisation name is required.';
//   }
//   if (!formData.mailingAddress?.trim()) {
//     errors.mailingAddress = 'Mailing address is required.';
//   }
//   if (!formData.refinery && formData.category === 'Refinery of the Year') {
//     errors.refinery = 'Refinery name is required.';
//   }
//   if (!formData.authorityName) {
//     errors.authorityName = 'Authority name is required.';
//   }
//   if (!formData.authorityTitle) {
//     errors.authorityTitle = 'Authority designation is required.';
//   }
//   if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
//     errors.authorityEmail = 'Please enter a valid Authority email.';
//   }
//   if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
//     errors.authorityPhone = 'Authority phone must be exactly 10 digits.';
//   }
//   if (!formData.contactName) {
//     errors.contactName = 'Contact name is required.';
//   }
//   if (formData.contactEmail && !validateEmail(formData.contactEmail)) {
//     errors.contactEmail = 'Please enter a valid Contact email.';
//   }
//   if (formData.contactPhone && !validatePhone(formData.contactPhone) && !copyApplicantData) {
//     errors.contactPhone = 'Contact phone must be exactly 10 digits.';
//   }
//   if (!formData.companyProfile.trim()) {
//     errors.companyProfile = 'Company profile is required.';
//   }
//   if (!formData.declaration) {
//     errors.declaration = 'Please accept the declaration before submitting.';
//   }
//   if (!formData.approvingAuthoritySignature) {
//     errors.approvingAuthoritySignature = 'Please upload the document with the approving authority signature.';
//   }

//   if (Object.keys(errors).length > 0) {
//     setFieldErrors(errors);
//     alert(Object.values(errors)[0]);
//     return;
//   }

//   const fd = new FormData();
//   fd.append('organisation_name', formData.Organisationname);
//   fd.append('category', formData.category);
//   fd.append('mailing_address', formData.mailingAddress);
//   fd.append('refinery', formData.refinery);
//   fd.append('authority_name', formData.authorityName);
//   fd.append('authority_title', formData.authorityTitle);
//   fd.append('authority_phone', formData.authorityPhone);
//   fd.append('authority_email', formData.authorityEmail);
//   fd.append('contact_name', formData.contactName);
//   fd.append('contact_phone', formData.contactPhone);
//   fd.append('contact_email', formData.contactEmail);
//   fd.append('company_profile', formData.companyProfile);
//   fd.append('award_justification', formData.awardJustification);
//   fd.append('comment', formData.comment);
//   fd.append('declaration', String(formData.declaration));

//   // Quantitative fields
//   const quantFields = [
//     'refinery1_1MMTPA', 'refinery1_1_1MMTPA', 'refinery1_2_1MMTPA', 'refinery1_2_2MMTPA',
//     'refinery1_3MMTPA', 'refinery2MMTPA', 'refinery3_1MMTPA', 'refinery3_2MMTPA',
//     'refinery4MMTPA', 'refinery5_1MMTPA', 'refinery5_1_2MMTPA', 'refinery6_1MMTPA',
//     'refinery6_1_1MMTPA', 'refinery7MMTPA'
//   ];
//   quantFields.forEach((key) => {
//     ['2024_25', '2023_24', '2022_23', '2021_22'].forEach((year, index) => {
//       fd.append(`${key.replace(/([A-Z])/g, '_$1').toLowerCase()}_${year}`, formData[key][index] || '');
//     });
//   });

//   // Safety fields
//   const safetyFields = ['refinery8_1Safety', 'refinery8_2Safety', 'refinery8_3Safety', 'refinery8_4Safety', 'refinery8_5Safety'];
//   safetyFields.forEach((key) => {
//     fd.append(`${key.replace(/([A-Z])/g, '_$1').toLowerCase()}_2024_25`, formData[key] || '');
//   });

//   // Attachments
//   if (formData.approvingAuthoritySignature) {
//     fd.append('approving_authority_file', formData.approvingAuthoritySignature);
//   }
//   [1, 2, 3, 4].forEach((num) => {
//     const att = formData[`attachments${num}`];
//     if (att && att.file) {
//       fd.append(`attachments${num}`, att.file);
//       fd.append(`attachments${num}_desc`, att.description || '');
//     }
//   });

//   try {
//     // const url = `${ACTIVE_API_BASE_URL}/refinery/`;
//     // const res = await fetch(url, { method: 'POST', body: fd });
//     // if (!res.ok) {
//     //   const text = await res.text();
//     //   console.error('Server error:', text);
//     //   return alert('Submit failed—see console');
//     // }
//     // const data = await res.json();
//     // console.log('Saved:', data);
//     alert('Registration Submitted Successfully!');
//     console.log(formData)
//     setIsSubmitted(true);
//     setCurrentStep(1);
//     setCopyApplicantData(false);
//     setFormData({
//       Organisationname: '',
//       category: 'Refinery of the Year',
//       mailingAddress: '',
//       refinery: '',
//       authorityName: '',
//       authorityTitle: '',
//       authorityPhone: '',
//       authorityEmail: '',
//       contactName: '',
//       contactPhone: '',
//       contactEmail: '',
//       companyProfile: '',
//       approvingAuthoritySignature: null,
//       declaration: false,
//       comment: '',
//       refinery1_1MMTPA: ['', '', '', ''],
//       refinery1_1_1MMTPA: ['', '', '', ''],
//       refinery1_2_1MMTPA: ['', '', '', ''],
//       refinery1_2_2MMTPA: ['', '', '', ''],
//       refinery1_3MMTPA: ['', '', '', ''],
//       refinery2MMTPA: ['', '', '', ''],
//       refinery3_1MMTPA: ['', '', '', ''],
//       refinery3_2MMTPA: ['', '', '', ''],
//       refinery4MMTPA: ['', '', '', ''],
//       refinery5_1MMTPA: ['', '', '', ''],
//       refinery5_1_2MMTPA: ['', '', '', ''],
//       refinery6_1MMTPA: ['', '', '', ''],
//       refinery6_1_1MMTPA: ['', '', '', ''],
//       refinery7MMTPA: ['', '', '', ''],
//       refinery8_1Safety: '',
//       refinery8_2Safety: '',
//       refinery8_3Safety: '',
//       refinery8_4Safety: '',
//       refinery8_5Safety: '',
//       attachments1: { description: '', file: null },
//       attachments2: { description: '', file: null },
//       attachments3: { description: '', file: null },
//       attachments4: { description: '', file: null },
//     });
//     setFieldErrors({});
//     setError('');
//   } catch (err) {
//     console.error('Network:', err);
//     alert('Network error—see console');
//   }
// };

// const getRefineries = (orgName) => {
//   const refineryData = {
//     'Reliance Industries Limited': ['DTA Jamnagar', 'SEZ Jamnagar'],
//     'Nayara Energy Limited': ['Nayara Refinery'],
//     'HPCL–Mittal Energy Limited': ['HMEL', 'Bhatinda Refinery'],
//     'Oil and Natural Gas Corporation': ['Tatipaka Refinery'],
//     'Mangalore Refinery and Petrochemicals Limited': ['MRPL Refinery'],
//     'Numaligarh Refinery Limited': ['Numaligarh Refinery'],
//     'Chennai Petroleum Corporation Limited': ['Manali Refinery'],
//     'Hindustan Petroleum Corporation Limited': ['Mumbai Refinery', 'Visakhapattnam Refinery'],
//     'Bharat Petroleum Corporation Limited': ['Mumbai Refinery', 'Kochi Refinery', 'Bina Refinery'],
//     'Indian Oil Corporation Limited': [
//       'Barauni Refinery',
//       'Gujarat Refinery',
//       'Haldia Refinery',
//       'Mathura Refinery',
//       'Panipat Refinery',
//       'Guwahati Refinery',
//       'Digboi Refinery',
//       'Bongaigoan Refinery',
//       'Paradip Refinery',
//     ],
//   };
//   return refineryData[orgName] || [];
// };

// const renderStepContent = () => {
//   const progress = ((currentStep - 1) / 4) * 100;
//   const years = ['2024–25', '2023–24', '2022–23', '2021–22'];

//   return (
//     <div className="form-step" role="region" aria-label={`Step ${currentStep} of 5`}>
//       <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
//         <div className="progress" style={{ width: `${progress}%` }}></div>
//       </div>

//       {currentStep === 1 && (
//         <div>
//           <h3 className="step-title">Step 1: Organization Details</h3>
//           <div className="form-group">
//             <label htmlFor="Organisationname">
//               Organisation Name: <span aria-hidden="true" className="text-red">*</span>
//             </label>
//             <input
//               id="Organisationname"
//               name="Organisationname"
//               type="text"
//               maxLength={FIELD_MAX_LENGTH}
//               value={formData.Organisationname}
//               onChange={(e) => handleChange('Organisationname', e.target.value)}
//               onBlur={(e) => handleBlur('Organisationname', e.target.value)}
//               aria-describedby="Organisationname-error"
//               className={`form-input ${fieldErrors.Organisationname ? 'has-error' : ''}`}
//               placeholder="Enter organisation name"
//               required
//               aria-required="true"
//             />
//             {fieldErrors.Organisationname && (
//               <span className="error-tooltip" id="Organisationname-error" role="alert">
//                 {fieldErrors.Organisationname}
//               </span>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="refinery">
//               Select Refinery: <span className="text-red" aria-hidden="true">*</span>
//             </label>
//             <select
//               id="refinery"
//               name="refinery"
//               value={formData.refinery}
//               onChange={(e) => handleChange('refinery', e.target.value)}
//               onBlur={(e) => handleBlur('refinery', e.target.value)}
//               className={`form-input ${fieldErrors.refinery ? 'has-error' : ''}`}
//               aria-required="true"
//               aria-describedby="refinery-error"
//             >
//               <option value="">Select Refinery</option>
//               {getRefineries(formData.Organisationname).map((refinery, index) => (
//                 <option key={index} value={refinery}>
//                   {refinery}
//                 </option>
//               ))}
//             </select>
//             {fieldErrors.refinery && (
//               <span className="error-tooltip" id="refinery-error" role="alert">
//                 {fieldErrors.refinery}
//               </span>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="mailingAddress">
//               Postal Address: <span className="text-red" aria-hidden="true">*</span>
//             </label>
//             <textarea
//               id="mailingAddress"
//               name="mailingAddress"
//               value={formData.mailingAddress}
//               onChange={(e) => handleChange('mailingAddress', e.target.value)}
//               onBlur={(e) => handleBlur('mailingAddress', e.target.value)}
//               className={`form-textarea ${fieldErrors.mailingAddress ? 'has-error' : ''}`}
//               rows={3}
//               maxLength={FIELD_MAX_LENGTH}
//               placeholder="Enter Postal address"
//               aria-required="true"
//               aria-describedby="mailingAddress-error"
//             />
//             {fieldErrors.mailingAddress && (
//               <span className="error-tooltip" id="mailingAddress-error" role="alert">
//                 {fieldErrors.mailingAddress}
//               </span>
//             )}
//           </div>
//         </div>
//       )}
//       {currentStep === 2 && (
//         <div>
//           <h3 className="step-title">Step 2: Approving Authority & Contact</h3>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="step-section">
//               <h4>Approving Authority</h4>
//               <div className="form-group">
//                 <label htmlFor="authorityName">
//                   Name: <span className="text-red" aria-hidden="true">*</span>
//                 </label>
//                 <input
//                   id="authorityName"
//                   type="text"
//                   name="authorityName"
//                   value={formData.authorityName}
//                   onChange={(e) => handleChange('authorityName', e.target.value)}
//                   onBlur={(e) => handleBlur('authorityName', e.target.value)}
//                   className={`form-input ${fieldErrors.authorityName ? 'has-error' : ''}`}
//                   placeholder="Name"
//                   maxLength={FIELD_MAX_LENGTH}
//                   aria-required="true"
//                   aria-describedby="authorityName-error"
//                 />
//                 {fieldErrors.authorityName && (
//                   <span className="error-tooltip" id="authorityName-error" role="alert">
//                     {fieldErrors.authorityName}
//                   </span>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="authorityTitle">
//                   Designation: <span className="text-red" aria-hidden="true">*</span>
//                 </label>
//                 <input
//                   id="authorityTitle"
//                   type="text"
//                   name="authorityTitle"
//                   value={formData.authorityTitle}
//                   onChange={(e) => handleChange('authorityTitle', e.target.value)}
//                   onBlur={(e) => handleBlur('authorityTitle', e.target.value)}
//                   className={`form-input ${fieldErrors.authorityTitle ? 'has-error' : ''}`}
//                   placeholder="Designation"
//                   maxLength={FIELD_MAX_LENGTH}
//                   aria-required="true"
//                   aria-describedby="authorityTitle-error"
//                 />
//                 {fieldErrors.authorityTitle && (
//                   <span className="error-tooltip" id="authorityTitle-error" role="alert">
//                     {fieldErrors.authorityTitle}
//                   </span>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="authorityPhone">
//                   Phone Number: <span className="text-red" aria-hidden="true">*</span>
//                 </label>
//                 <input
//                   id="authorityPhone"
//                   type="tel"
//                   name="authorityPhone"
//                   value={formData.authorityPhone}
//                   onChange={(e) => handleChange('authorityPhone', e.target.value)}
//                   onBlur={(e) => handleBlur('authorityPhone', e.target.value)}
//                   className={`form-input ${fieldErrors.authorityPhone ? 'has-error' : ''}`}
//                   placeholder="10-digit phone number"
//                   maxLength={PHONE_MAX_LENGTH}
//                   aria-required="true"
//                   aria-describedby="authorityPhone-error"
//                 />
//                 {fieldErrors.authorityPhone && (
//                   <span className="error-tooltip" id="authorityPhone-error" role="alert">
//                     {fieldErrors.authorityPhone}
//                   </span>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="authorityEmail">
//                   Email Address: <span className="text-red" aria-hidden="true">*</span>
//                 </label>
//                 <input
//                   id="authorityEmail"
//                   type="email"
//                   name="authorityEmail"
//                   value={formData.authorityEmail}
//                   onChange={(e) => handleChange('authorityEmail', e.target.value)}
//                   onBlur={(e) => handleBlur('authorityEmail', e.target.value)}
//                   className={`form-input ${fieldErrors.authorityEmail ? 'has-error' : ''}`}
//                   placeholder="E-mail address"
//                   maxLength={FIELD_MAX_LENGTH}
//                   aria-required="true"
//                   aria-describedby="authorityEmail-error"
//                 />
//                 {fieldErrors.authorityEmail && (
//                   <span className="error-tooltip" id="authorityEmail-error" role="alert">
//                     {fieldErrors.authorityEmail}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="step-section">
//               <h4>Contacts (Nodal Officials) <span className="text-red" aria-hidden="true">*</span></h4>
//               <div className="form-group">
//                 <label htmlFor="copyApplicantData">
//                   <input
//                     id="copyApplicantData"
//                     type="checkbox"
//                     name="copyApplicantData"
//                     checked={copyApplicantData}
//                     onChange={handleCopyApplicantToggle}
//                     className="form-checkbox"
//                   />
//                   Same as applicant
//                 </label>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="contactName">
//                   Name:<span className="text-red" aria-hidden="true">*</span>
//                 </label>
//                 <input
//                   id="contactName"
//                   type="text"
//                   name="contactName"
//                   value={formData.contactName}
//                   onChange={(e) => handleChange('contactName', e.target.value)}
//                   onBlur={(e) => handleBlur('contactName', e.target.value)}
//                   className={`form-input ${fieldErrors.contactName ? 'has-error' : ''}`}
//                   placeholder="Name"
//                   maxLength={FIELD_MAX_LENGTH}
//                   disabled={copyApplicantData}
//                   aria-required="true"
//                   aria-describedby="contactName-error"
//                 />
//                 {fieldErrors.contactName && (
//                   <span className="error-tooltip" id="contactName-error" role="alert">
//                     {fieldErrors.contactName}
//                   </span>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="contactPhone">Phone Number:<span className="text-red">*</span></label>
//                 <input
//                   id="contactPhone"
//                   type="tel"
//                   name="contactPhone"
//                   value={formData.contactPhone}
//                   onChange={(e) => handleChange('contactPhone', e.target.value)}
//                   onBlur={(e) => handleBlur('contactPhone', e.target.value)}
//                   className={`form-input ${fieldErrors.contactPhone ? 'has-error' : ''}`}
//                   placeholder="10-digit phone number"
//                   maxLength={PHONE_MAX_LENGTH}
//                   disabled={copyApplicantData}
//                   aria-describedby="contactPhone-error"
//                 />
//                 {fieldErrors.contactPhone && (
//                   <span className="error-tooltip" id="contactPhone-error" role="alert">
//                     {fieldErrors.contactPhone}
//                   </span>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="contactEmail">Email Address:<span className="text-red">*</span></label>
//                 <input
//                   id="contactEmail"
//                   type="email"
//                   name="contactEmail"
//                   value={formData.contactEmail}
//                   onChange={(e) => handleChange('contactEmail', e.target.value)}
//                   onBlur={(e) => handleBlur('contactEmail', e.target.value)}
//                   className={`form-input ${fieldErrors.contactEmail ? 'has-error' : ''}`}
//                   placeholder="E-mail address"
//                   maxLength={FIELD_MAX_LENGTH}
//                   disabled={copyApplicantData}
//                   aria-describedby="contactEmail-error"
//                 />
//                 {fieldErrors.contactEmail && (
//                   <span className="error-tooltip" id="contactEmail-error" role="alert">
//                     {fieldErrors.contactEmail}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="companyProfile">Provide a brief write up on Refinery. <span className="text-red">*</span> </label>
//             <p className="note">(within 300 words)</p>
//             <textarea
//               id="companyProfile"
//               name="companyProfile"
//               value={formData.companyProfile}
//               onChange={(e) => handleChange('companyProfile', e.target.value)}
//               onBlur={(e) => handleBlur('companyProfile', e.target.value)}
//               className={`form-textarea ${fieldErrors.companyProfile ? 'has-error' : ''}`}
//               rows={6}
//               // maxLength={TEXTAREA_MAX_LENGTH}
//               aria-describedby="companyProfile-error"
//               required
//             />
//             {fieldErrors.companyProfile && (
//               <span className="error-tooltip" id="companyProfile-error" role="alert">
//                 {fieldErrors.companyProfile}
//               </span>
//             )}
//           </div>

//         </div>
//       )}

// {currentStep === 3 && (
//   <div>
//     <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
//     <table className="quant-table">
//       <thead>
//         <tr>
//           <th scope="col">S.No</th>
//           <th scope="col">Particulars</th>
//           <th scope="col">2024–25</th>
//           <th scope="col">2023–24</th>
//           <th scope="col">2022–23</th>
//           <th scope="col">2021–22</th>
//         </tr>
//       </thead>
//       <tbody>
//         {part1.map(([num, label, key]) => {
//           const isSectionRow = ["1", "1.2", "3", "5", "6", "8"].includes(num.toString());

//           // ✅ Keys that should behave like percentage (0–100 + % suffix)
//           const percentageKeys = ["purity2024", "refinery3_2MMTPA", "refinery1_3MMTPA"];

//           if (isSectionRow) {
//             return (
//               <tr key={num} style={{ fontWeight: "bold" }}>
//                 <td>{num}</td>
//                 <td colSpan={5}>{label}</td>
//               </tr>
//             );
//           }

//           return (
//             <tr key={num}>
//               <td>{num}</td>
//               <td>{label}</td>

//               {[0, 1, 2, 3].map((index) => {
//                 const fieldKey = `${key}[${index}]`;
//                 const isPercentageKey = percentageKeys.includes(key);

//                 return (
//                   <td key={index}>
//                     {key ? (
//                       isPercentageKey ? (
//                         // 🔹 Special % input with validation
//                         <div
//                           style={{
//                             position: "relative",
//                             display: "inline-block",
//                             width: "100%",
//                           }}
//                         >
//                           <input
//                             type="number"
//                             value={
//                               Array.isArray(formData[key])
//                                 ? formData[key][index] || ""
//                                 : ""
//                             }
//                             onChange={(e) => {
//                               let val = e.target.value;

//                               // Only digits
//                               if (!/^\d*$/.test(val)) return;

//                               // Clamp 0–100
//                               if (val !== "") {
//                                 let num = Number(val);
//                                 if (num > 100) num = 100;
//                                 if (num < 0) num = 0;
//                                 val = num.toString();
//                               }

//                               // Validation message
//                               const errorMsg =
//                                 val !== "" &&
//                                 (Number(val) < 0 || Number(val) > 100)
//                                   ? "Value must be between 0 and 100"
//                                   : "";

//                               setFieldErrors((prev) => ({
//                                 ...prev,
//                                 [fieldKey]: errorMsg,
//                               }));

//                               handleChange(key, val, index);
//                             }}
//                             className={`form-input no-spinner ${
//                               fieldErrors[fieldKey] ? "has-error" : ""
//                             }`}
//                             style={{ paddingRight: "24px" }}
//                             min="0"
//                             max="100"
//                             aria-describedby={
//                               fieldErrors[fieldKey]
//                                 ? `${fieldKey}-error`
//                                 : undefined
//                             }
//                           />
//                           <span
//                             style={{
//                               position: "absolute",
//                               right: "8px",
//                               top: "50%",
//                               transform: "translateY(-50%)",
//                               pointerEvents: "none",
//                               color: "#555",
//                             }}
//                           >
//                             %
//                           </span>
//                           {fieldErrors[fieldKey] && (
//                             <span
//                               id={`${fieldKey}-error`}
//                               className="error-tooltip"
//                               role="alert"
//                               style={{ color: "red", fontSize: "12px" }}
//                             >
//                               {fieldErrors[fieldKey]}
//                             </span>
//                           )}
//                         </div>
//                       ) : (
//                         // 🔹 Normal number input
//                         <input
//                           type="number"
//                           value={
//                             Array.isArray(formData[key])
//                               ? formData[key][index] || ""
//                               : ""
//                           }
//                           onChange={(e) => {
//                             const val = e.target.value;
//                             if (
//                               !val.startsWith("-") &&
//                               !val.toLowerCase().includes("e")
//                             ) {
//                               handleChange(key, val, index);
//                             }
//                           }}
//                           onBlur={(e) => handleBlur(fieldKey, e.target.value)}
//                           className={`form-input no-spinner ${
//                             fieldErrors[fieldKey] ? "has-error" : ""
//                           }`}
//                           min="0"
//                           aria-label={`${label} for ${years[index]}`}
//                           aria-describedby={
//                             fieldErrors[fieldKey]
//                               ? `${fieldKey}-error`
//                               : undefined
//                           }
//                           onKeyDown={(e) => {
//                             if (["-", "e", "E"].includes(e.key)) {
//                               e.preventDefault();
//                             }
//                           }}
//                         />
//                       )
//                     ) : (
//                       <span className="non-editable-cell"></span>
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// )}

// {currentStep === 4 && (
//   <div>
//     <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>

//     {/* First Table */}
//     <table className="quant-table">
//       <thead>
//         <tr>
//           <th scope="col">S.No</th>
//           <th scope="col">Particulars</th>
//           <th scope="col">2024–25</th>
//           <th scope="col">2023–24</th>
//           <th scope="col">2022–23</th>
//           <th scope="col">2021–22</th>
//         </tr>
//       </thead>
//       <tbody>
//         {part2.slice(0, 1).map(([num, label, key]) => {
//           const isSectionRow = ["1", "1.2", "3", "5", "6", "8"].includes(num.toString());

//           if (isSectionRow) {
//             // Section heading row → only label
//             return (
//               <tr key={num} style={{ fontWeight: "bold" }}>
//                 <td colSpan={6}>{label}</td>
//               </tr>
//             );
//           }

//           // Normal row with inputs
//           return (
//             <tr key={num}>
//               <td>{num}</td>
//               <td>{label}</td>
//               {[0, 1, 2, 3].map((index) => (
//                 <td key={index}>
//                   {key ? (
//                     <input
//                       type="number"
//                       value={formData[key][index] || ''}
//                       min="0"
//                       className={`form-input no-spinner ${
//                         fieldErrors[`${key}[${index}]`] ? 'has-error' : ''
//                       }`}
//                       aria-label={`${label} for ${years[index]}`}
//                       aria-describedby={
//                         fieldErrors[`${key}[${index}]`] ? `${key}-${index}-error` : undefined
//                       }
//                       onChange={(e) => {
//                         const val = e.target.value;
//                         if (!val.startsWith('-') && !val.toLowerCase().includes('e')) {
//                           handleChange(key, val, index);
//                         }
//                       }}
//                       onBlur={(e) => handleBlur(`${key}[${index}]`, e.target.value)}
//                       onKeyDown={(e) => {
//                         if (e.key === '-' || e.key === 'e' || e.key === 'E') {
//                           e.preventDefault();
//                         }
//                       }}
//                     />
//                   ) : (
//                     <span className="non-editable-cell"></span>
//                   )}
//                   {key && fieldErrors[`${key}[${index}]`] && (
//                     <span
//                       id={`${key}-${index}-error`}
//                       className="error-tooltip"
//                       role="alert"
//                     >
//                       {fieldErrors[`${key}[${index}]`]}
//                     </span>
//                   )}
//                 </td>
//               ))}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>

//     {/* Second Table */}
//     <table className="quant-table">
//       <thead>
//         <tr>
//           <th scope="col">S.No</th>
//           <th scope="col">Particulars</th>
//           <th scope="col">2024–25</th>
//         </tr>
//       </thead>
//       <tbody>
//         {part2.slice(1).map(([num, label, key]) => {
//           const isSectionRow = ["1", "1.2", "3", "5", "6", "8"].includes(num.toString());

//           if (isSectionRow) {
//             // Section heading row → only label
//             return (
//               <tr key={num} style={{ fontWeight: "bold" }}>
//                 <td>{num}</td>
//                 <td colSpan={3}>{label}</td>
//               </tr>
//             );
//           }

//           // Normal row with single input
//           return (
//             <tr key={label}>
//               <td>{num}</td>
//               <td>{label}</td>
//               <td>
//                 {key ? (
//                   <input
//                     type="number"
//                     value={formData[key] || ''}
//                     min="0"
//                     className={`form-input no-spinner ${
//                       fieldErrors[key] ? 'has-error' : ''
//                     }`}
//                     aria-label={`${label} for 2024–25`}
//                     aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
//                     onChange={(e) => {
//                       const val = e.target.value;
//                       if (!val.startsWith('-') && !val.toLowerCase().includes('e')) {
//                         handleChange(key, val);
//                       }
//                     }}
//                     onBlur={(e) => handleBlur(key, e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === '-' || e.key === 'e' || e.key === 'E') {
//                         e.preventDefault();
//                       }
//                     }}
//                   />
//                 ) : (
//                   <span className="non-editable-cell"></span>
//                 )}
//                 {key && fieldErrors[key] && (
//                   <span id={`${key}-error`} className="error-tooltip" role="alert">
//                     {fieldErrors[key]}
//                   </span>
//                 )}
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>

//     {/* Comment Field */}
//     <div className="form-group">
//       <label htmlFor="comment">Comments</label>
//       <textarea
//         id="comment"
//         name="comment"
//         value={formData.comment}
//         onChange={(e) => handleChange('comment', e.target.value)}
//         onBlur={(e) => handleBlur('comment', e.target.value)}
//         className={`form-textarea ${fieldErrors.comment ? 'has-error' : ''}`}
//         placeholder="Comments in (200 words) against input parameter, if any"
//         aria-describedby="comment-error"
//       />
//       {fieldErrors.comment && (
//         <span id="comment-error" className="error-tooltip" role="alert">
//           {fieldErrors.comment}
//         </span>
//       )}
//     </div>
//   </div>
// )}


//       {currentStep === 5 && (
//         <div className="form-step">
//           <h3 className="step-title">Step 5: Attachments & Declaration</h3>
//           <div className="form-group">
//             <label>List of Attachments (Optional):</label>
//             <table className="quant-table">
//               <thead>
//                 <tr>
//                   <th scope="col">S. No.</th>
//                   <th scope="col">Description</th>
//                   <th scope="col">Upload (only jpg, png, pdf, max 5 MB each)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {[1, 2, 3, 4].map((num) => {
//                   const key = `attachments${num}`;
//                   const attachment = formData[key];
//                   return (
//                     <tr key={key}>
//                       <td>{num}</td>
//                       <td>
//                         <input
//                           type="text"
//                           name={`${key}.description`}
//                           value={attachment.description}
//                           onChange={(e) => handleAttachmentChange(key, 'description', e.target.value)}
//                           onBlur={(e) => handleBlur(`${key}.description`, e.target.value)}
//                           placeholder="Enter description"
//                           className={`form-input ${fieldErrors[`${key}.description`] ? 'has-error' : ''}`}
//                           maxLength={FIELD_MAX_LENGTH}
//                           aria-label={`Attachment ${num} description`}
//                           aria-describedby={fieldErrors[`${key}.description`] ? `${key}-description-error` : undefined}
//                         />
//                         {fieldErrors[`${key}.description`] && (
//                           <span id={`${key}-description-error`} className="error-tooltip" role="alert">
//                             {fieldErrors[`${key}.description`]}
//                           </span>
//                         )}
//                       </td>
//                       <td>
//                         <input
//                           type="file"
//                           accept=".jpg,.png,.pdf"
//                           onChange={(e) => handleAttachmentChange(key, 'file', e.target.files[0], e)}
//                           className="form-input mt-4"
//                           aria-label={`Upload attachment ${num}`}
//                         />
//                         {attachment.file && (
//                           <p className="file-name">Selected file: {attachment.file.name}</p>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//           <div className="form-group">
//             <label>
//               Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.
//               <span className="text-red" aria-hidden="true">*</span>
//             </label>
//             <div className="form-navigation">
//               <button type="button" onClick={handlePrint} className="btn btn-outline">
//                 Print Preview
//               </button>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="approvingAuthoritySignature">
//               Upload Document with Approving Authority Signature (Director/Board Level)<span aria-hidden="true" className="text-red">*</span>:
//             </label>
//             <input
//               type="file"
//               id="approvingAuthoritySignature"
//               accept=".jpg,.png,.pdf"
//               onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
//               className={`form-input mt-4 ${fieldErrors.approvingAuthoritySignature ? 'has-error' : ''}`}
//               aria-describedby="approvingAuthoritySignature-error"
//               required
//             />
//             {formData.approvingAuthoritySignature && (
//               <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
//             )}
//             {fieldErrors.approvingAuthoritySignature && (
//               <span className="error-tooltip" id="approvingAuthoritySignature-error" role="alert">
//                 {fieldErrors.approvingAuthoritySignature}
//               </span>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="declaration">
//               <input
//                 id="declaration"
//                 type="checkbox"
//                 name="declaration"
//                 checked={formData.declaration}
//                 onChange={(e) => handleChange('declaration', e.target.checked)}
//                 className={`form-checkbox ${fieldErrors.declaration ? 'has-error' : ''}`}
//                 aria-required="true"
//                 aria-describedby="declaration-error"
//               />
//               I declare that the information submitted is true and complete.
//             </label>
//             {fieldErrors.declaration && (
//               <span className="error-tooltip" id="declaration-error" role="alert">
//                 {fieldErrors.declaration}
//               </span>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// useEffect(() => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }, [currentStep]);

// return (
//   <div className="sidebar-guideline-container">
//     <SidebarGuideline
//       isOpen={true}
//       sidebarItems={[{ id: 'Guideline', label: 'Guideline' }]}
//       activeItem={activeItem}
//       setActiveItem={setActiveItem}
//       selectedAwardCategory={formData.category}
//     />
//     <div className="application-form">
//       <div className="form-header">
//         <h1>{awardTitle}</h1>
//         <h6>Step {currentStep} of 5</h6>
//       </div>
//       {error && <div className="error" role="alert">{error}</div>}
//       {isSubmitted ? (
//         <div className="thank-you-message">
//           <h2>Thank you for your submission!</h2>
//           <p>Your registration has been successfully submitted.</p>
//           <button onClick={() => setIsSubmitted(false)} className="btn btn-primary">
//             Submit Another Response
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           {renderStepContent()}
//           {currentStep === 1 && (
//             <div className="form-navigation-step1">
//               <button type="button" onClick={saveDraft} className="btn btn-outline">
//                 <Save size={16} /> Save Draft
//               </button>
//               <button type="button" onClick={nextStep} className="btn btn-primary">
//                 Next <ChevronRight size={16} />
//               </button>
//             </div>
//           )}
//           {currentStep > 1 && (
//             <div className="form-navigation">
//               <button type="button" onClick={prevStep} className="btn btn-outline">
//                 <ChevronLeft size={16} /> Previous
//               </button>
//               <button type="button" onClick={saveDraft} className="btn btn-outline">
//                 <Save size={16} /> Save Draft
//               </button>
//               {currentStep < 5 && (
//                 <button type="button" onClick={nextStep} className="btn btn-primary">
//                   Next <ChevronRight size={16} />
//                 </button>
//               )}
//               {currentStep === 5 && (
//                 <button
//                   type="submit"
//                   className="btn btn-success"
//                   onClick={(e) => {
//                     if (!window.confirm('Are you sure you want to submit?')) {
//                       e.preventDefault();
//                     }
//                   }}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           )}
//         </form>
//       )}
//     </div>
//   </div>
// );
// };

// export default RegistrationRefinery;


import React, { useState, useEffect, useCallback } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import apiClient from '../api/axiosClient';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';
import SidebarGuideline from "./SidebarGuideline"
import TextField from "@mui/material/TextField";

const FIELD_MAX_LENGTH = 100;
const COMPANY_PROFILE_MAX_LENGTH= 300;
const COMMENT_MAX_LENGTH = 200;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const RegistrationRefinery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const awardTitle = location.state?.awardTitle || 'Refinery of the Year';

  // Form state initialization
  const [formData, setFormData] = useState({
    Organisationname: '',
    category: 'Refinery of the Year',
    mailingAddress: '',
    refinery: '',
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
    awardJustification: '',
    approvingAuthoritySignature: null,
    declaration: false,
    comment: '',
    refinery1_1MMTPA: ['', '', '', ''], // [2024-25, 2023-24, 2022-23, 2021-22]
    refinery1_1_1MMTPA: ['', '', '', ''],
    refinery1_2_1MMTPA: ['', '', '', ''],
    refinery1_2_2MMTPA: ['', '', '', ''],
    refinery1_3MMTPA: ['', '', '', ''],
    refinery2MMTPA: ['', '', '', ''],
    refinery3_1MMTPA: ['', '', '', ''],
    refinery3_2MMTPA: ['', '', '', ''],
    refinery4MMTPA: ['', '', '', ''],
    refinery5_1MMTPA: ['', '', '', ''],
    refinery5_1_2MMTPA: ['', '', '', ''],
    refinery6_1MMTPA: ['', '', '', ''],
    refinery6_1_1MMTPA: ['', '', '', ''],
    refinery7MMTPA: ['', '', '', ''],
    refinery8_1Safety: '',
    refinery8_2Safety: '',
    refinery8_3Safety: '',
    refinery8_4Safety: '',
    refinery8_5Safety: '',
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
      const prefillRaw = sessionStorage.getItem('registrationRefinery_prefill');
      if (prefillRaw) {
        const prefill = JSON.parse(prefillRaw);
        if (prefill && typeof prefill === 'object') {
          setFormData((prev) => ({ ...prev, ...prefill }));
          if (prefill.step) setCurrentStep(Number(prefill.step));
        }
        // remove after consuming so it doesn't override later edits
        sessionStorage.removeItem('registrationRefinery_prefill');
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
        const draftRaw = localStorage.getItem('registrationRefineryDraft');
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

  // Validate field on blur
  const validateField = (name, value) => {
    let errorMsg = '';
    if (['Organisationname', 'authorityName', 'contact_name', 'refinery'].includes(name)) {
      if (!value.trim()) {
        errorMsg = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
      } else if (!/^[A-Za-z\s]*$/.test(value)) {
        errorMsg = 'Only letters and spaces are allowed.';
      }
    } else if (name === 'mailingAddress' && !value.trim()) {
      errorMsg = 'Mailing address is required.';
    } else if (name === 'authorityEmail' || name === 'contactEmail') {
      if (value && !validateEmail(value)) {
        errorMsg = `Please enter a valid ${name === 'authorityEmail' ? 'Authority' : 'Contact'} email.`;
      } else if (name === 'authorityEmail' && !value) {
        errorMsg = 'Authority email is required.';
      }
    } else if (name === 'authorityPhone' || name === 'contact_phone') {
      if (value && !validatePhone(value)) {
        errorMsg = `${name === 'authorityPhone' ? 'Authority' : 'Contact'} phone must be exactly 10 digits.`;
      } else if (name === 'authorityPhone' && !value) {
        errorMsg = 'Authority phone is required.';
      }
    } else if (name === 'companyProfile' && !value.trim()) {
      errorMsg = 'Company profile is required.';
    } else if (name === 'awardJustification' && !value.trim()) {
      errorMsg = 'Award justification is required.';
    } else if (name === 'comment' && value.length > COMMENT_MAX_LENGTH) {
      errorMsg = `Comment must not exceed ${COMMENT_MAX_LENGTH} characters.`;
    }
    return errorMsg;
  };

  // Handle changes for inputs/textareas/selects
  const handleChange = (name, value, index = null) => {
    // Length validation
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
                }
    }

    // Name validation
    if (['Organisationname', 'authorityName', 'contact_name', 'refinery'].includes(name)) {
      const isValid = /^[A-Za-z\s]*$/.test(value);
      if (!isValid && value !== '') {
        alert('Only letters and spaces are allowed.');
        return;
      }
    }

    // Quantitative fields validation
    const quantFields = [
      'refinery1_1MMTPA', 'refinery1_1_1MMTPA', 'refinery1_2_1MMTPA', 'refinery1_2_2MMTPA',
      'refinery1_3MMTPA', 'refinery2MMTPA', 'refinery3_1MMTPA', 'refinery3_2MMTPA',
      'refinery4MMTPA', 'refinery5_1MMTPA', 'refinery5_1_2MMTPA', 'refinery6_1MMTPA',
      'refinery6_1_1MMTPA', 'refinery7MMTPA', 'refinery8_1Safety', 'refinery8_2Safety',
      'refinery8_3Safety', 'refinery8_4Safety', 'refinery8_5Safety'
    ];
    if (quantFields.includes(name)) {
      if (index !== null) {
        const val = value.toString();
        if (val.startsWith('-') || val.toLowerCase().includes('e')) {
          alert('Negative numbers or scientific notation are not allowed.');
          return;
        }
        setFormData((prev) => {
          const updatedArray = [...prev[name]];
          updatedArray[index] = value;
          return { ...prev, [name]: updatedArray };
        });
        clearFieldError(`${name}[${index}]`);
      } else {
        if (value !== '' && (isNaN(value) || Number(value) < 0)) {
          alert('Value must be a non-negative number.');
          return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        clearFieldError(name);
      }
      return;
    }

    // Phone validation
    if (['authorityPhone', 'contact_phone'].includes(name)) {
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

    // Default handling
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === 'boolean' ? value : value || '',
    }));
    clearFieldError(name);

    if (['Organisationname', 'mailingAddress', 'refinery'].includes(name) && value && currentStep === 1) setError('');
    if (['authorityName', 'authorityTitle', 'authorityEmail', 'authorityPhone', 'contact_name', 'companyProfile', 'awardJustification'].includes(name) && value && currentStep === 2) setError('');
  };

  // Handle blur for validation
  const handleBlur = (name, value) => {
    const errorMsg = validateField(name, value);
    if (errorMsg) {
      setFieldErrors((prev) => ({ ...prev, [name]: errorMsg }));
    } else {
      clearFieldError(name);
    }
  };

  // Handle checkbox for copying applicant data

 const handleCopyApplicantToggle = (e) => {
    const checked = e.target.checked;
    // setCopyApplicantData(checked);

    const model = {
      contact_name: "",
      contact_phone: "",
      contact_email: "",
    };

    if (checked) {
      const userInfo = JSON.parse(sessionStorage.getItem('user_info'));
      if(userInfo){
        model.contact_name = userInfo.applicant_name;
        model.contact_phone = userInfo.applicant_phone;
        model.contact_email = userInfo.email;
      }
    };

    setFormData((prev) => ({...prev, ...model}))

    clearFieldError("contact_name");
    clearFieldError("contact_phone");
    clearFieldError("contact_email");
  };

  // Keep contact fields in sync if checkbox ON and applicant fields (or localStorage) change
  // This effect reads live values from localStorage to honor "pick data from localStorage" requirement.
  // useEffect(() => {
  //   if (!copyApplicantData) return;

  //   let user = {};
  //   try {
  //     const raw = localStorage.getItem("user_info");
  //     if (raw) user = JSON.parse(raw);
  //   } catch (err) {
  //     console.warn("Failed to parse user_info from localStorage in sync effect:", err);
  //   }

  //   setFormData((prev) => ({
  //     ...prev,
  //     contact_name: user.applicant_name || prev.applicant_name || "",
  //     contact_phone: user.applicant_phone || prev.applicant_phone || "",
  //     contact_email: user.email || prev.applicant_email || "",
  //   }));

  //   clearFieldError("contact_name");
  //   clearFieldError("contact_phone");
  //   clearFieldError("contact_email");
  //   // We intentionally do not add formData.* to the dependency array here that would cause infinite loops.
  //   // The dependency below ensures we re-run when copyApplicantData toggles.
  // }, [copyApplicantData, clearFieldError]);


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

  // Quantitative data
  const part1 = [
    ['1', 'Refinery capacity', ''],
    ['1.1', 'Name Plate Capacity (MMTPA)', 'refinery1_1MMTPA'],
    ['1.1.1', 'Actual Crude Processing (MMTPA)', 'refinery1_1_1MMTPA'],
    ['1.2', 'Cracking Capacity', ''],
    ['1.2.1', 'Name Plate Capacity (MMTPA)', 'refinery1_2_1MMTPA'],
    ['1.2.2', 'Actual Crude Processing (MMTPA)', 'refinery1_2_2MMTPA'],
    ['1.3', 'Distillates Yield (% of the crude throughput)', 'refinery1_3MMTPA'],
    ['2', 'Gross Refining Margin ($/bbl)(GRM without any concession to be reported)', 'refinery2MMTPA'],
    ['3', 'Operating Cost (Rs/MT)', ''],
    ['3.1', 'Internal Fuel consumption (% of the crude throughput)', 'refinery3_1MMTPA'],
    ['3.2', 'Loss (% of the crude throughput)', 'refinery3_2MMTPA'],
    ['4', 'MBN (use CHT methodology for the calculation)', 'refinery4MMTPA'],
    ['5', 'Capital Expenditure (Rs in crore)', ''],
    ['5.1', 'Planned Capex (Original budget)', 'refinery5_1MMTPA'],
    ['5.1.2', 'Actual Capex', 'refinery5_1_2MMTPA'],
    ['6', 'Specific water consumption', ''],
    ['6.1', 'Fresh water consumption (m3)', 'refinery6_1MMTPA'],
    ['6.1.1', 'NRG factor (indicator of level of complexity of refinery)', 'refinery6_1_1MMTPA'],
  ];

  const part2 = [
  ['7', 'Carbon Emission (Tonne)  {Specific Carbon Emission for the refinery = (Total CO2 emissions due to burning of fuels +Equivalent CO2 emission in case of purchased electricity+ Equivalent CO2 emissionin case of purchase of any utility like H2, Steam etc. – CO2 emission which is emitted in Non Refinery operations) / crudeprocessed in barrel / Energy factor}', 'refinery7MMTPA'],
  ['8', 'Safety', ''],
  ['8.1', 'Number of fatalities (own + contract employees)', 'refinery8_1Safety'],
  ['8.2', 'Number of lost time injuries in the reporting period (own employees + contract employees) ', 'refinery8_2Safety'],
  ['8.3', 'Number of OSHA recordable incidents (own employees + contract employees) ', 'refinery8_3Safety'],
  ['8.4', 'Total Manhours worked Own Employees', 'refinery8_4Safety'],
  ['8.5', 'Total Manhours worked Contractors Employees', 'refinery8_5Safety'],
  ];


const handlePrint = () => {
  const submissionDate = new Date('2025-08-05T23:41:00+05:30').toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });

  const bodyContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
      <h2>Organization & Contact Details:</h2>
      <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
      <p><strong>Refinery:</strong> ${formData.refinery || ''}</p>
      <p><strong>Postal Address:</strong> ${formData.mailingAddress || ''}</p>
      <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ''}</p>
      <p><strong>Approving Authority Designation:</strong> ${formData.authorityTitle || ''}</p>
      <p><strong>Approving Authority Landline:</strong> ${formData.authorityLandline || ''}</p>
      <p><strong>Approving Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
      <p><strong>Approving Authority Email:</strong> ${formData.authorityEmail || ''}</p>

      <h2>Nodal Official Contact Details:</h2>
      <p><strong>Contact Name:</strong> ${formData.contact_name || ''}</p>
      <p><strong>Contact Phone:</strong> ${formData.contact_phone || ''}</p>
      <p><strong>Contact Email:</strong> ${formData.contact_email || ''}</p>
      <p><strong>Brief write up on Refinery:</strong> ${formData.companyProfile || ''}</p>

      <h2>Quantitative Information - Part 1</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
            <th style="border: 1px solid #000; padding: 6px; width: 530px; ">Particulars</th>
            <th style="border: 1px solid #000; padding: 8px;">2024–25</th>
            <th style="border: 1px solid #000; padding: 8px;">2023–24</th>
            <th style="border: 1px solid #000; padding: 8px;">2022–23</th>
            <th style="border: 1px solid #000; padding: 8px;">2021–22</th>
          </tr>
        </thead>
        <tbody>
          ${part1.map(([num, label, key]) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${num}</td>
              <td style="border: 1px solid #000; padding: 8px;">${label}</td>
              ${[0, 1, 2, 3].map(i =>
                `<td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][i] || '' : ''}</td>`
              ).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Quantitative Information - Part 2</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
            <th style="border: 1px solid #000; padding: 5px; width: 530px;">Particulars</th>
            <th style="border: 1px solid #000; padding: 9px;">2024–25</th>
            <th style="border: 1px solid #000; padding: 9px;">2023–24</th>
            <th style="border: 1px solid #000; padding: 9px;">2022–23</th>
            <th style="border: 1px solid #000; padding: 9px;">2021–22</th>
          </tr>
        </thead>
        <tbody>
          ${part2.slice(0, 1).map(([num, label, key]) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${num}</td>
              <td style="border: 1px solid #000; padding: 8px;">${label}</td>
              ${[0, 1, 2, 3].map(i =>
                `<td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][i] || '' : ''}</td>`
              ).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Safety Metrics</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
            <th style="border: 1px solid #000; padding: 8px;">2024–25</th>
          </tr>
        </thead>
        <tbody>
          ${part2.slice(1).map(([num, label, key]) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${num}</td>
              <td style="border: 1px solid #000; padding: 8px;">${label}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Attachments</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px; width:10px">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Description</th>
            <th style="border: 1px solid #000; padding: 8px;">File Name</th>
          </tr>
        </thead>
        <tbody>
          ${[1, 2, 3, 4].map(i => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${i}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`]?.description || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`]?.file?.name || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Comments</h2>
      <p>${formData.comment || ''}</p>

      <h2>Declaration</h2>
      <p>I declare that the information submitted is true and complete.</p>
      <br/>
      <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ''}</p>
      <p><strong>Approving Authority Designation:</strong> ${formData.authorityTitle || ''}</p>
      <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
      <p><strong>Approving Authority Signature:</strong></p>
    </div>
  `;

  const fullHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${awardTitle || "Form Submission"}</title>
        <meta charset="UTF-8">
      </head>
      <body>
        ${bodyContent}
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'height=800,width=1000');
  printWindow.document.write(fullHTML);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};


// Check for empty fields in a step
const checkStepFieldsEmpty = (step) => {
  let stepItems = [];

  if (step === 3) {
    // Step 3: Only rows with an editable key
    stepItems = part1.filter(([, , key]) => key);
  } else if (step === 4) {
    // Step 4: Only rows with editable keys
    stepItems = part2.filter(([, , key]) => key);
  }

  for (const [, , key] of stepItems) {
    // Skip rows without editable input
    if (!key) continue;

    const val = formData[key];

    if (Array.isArray(val)) {
      // Any year empty → return true
      if (val.some(v => v === '' || v === undefined || v === null)) {
        return true;
      }
    } else if (val === '' || val === undefined || val === null) {
      return true;
    }
  }

  // Step 4: also check comment field
  if (step === 4) {
    if (!formData.comment || formData.comment.trim() === '') {
      return true;
    }
  }

  return false; // All filled
};

// Navigation handlers
const nextStep = () => {
  const errors = {};
  if (currentStep === 1) {
   
    if (!formData.mailingAddress?.trim()) {
      errors.mailingAddress = 'Mailing address is required.';
    }
    if (!formData.refinery && formData.category === 'Refinery of the Year') {
      alert('Refinery name is required.');
      return
    }
  }
  if (currentStep === 2) {
    if (!formData.authorityName) {
      errors.authorityName = 'Authority name is required.';
    }
    if (!formData.authorityTitle) {
      errors.authorityTitle = 'Authority designation is required.';
    }
    if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
      errors.authorityEmail = 'Please enter a valid Authority email.';
    }
    // if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
    //   errors.authorityPhone = 'Authority phone must be exactly 10 digits.';
    // }
    if (!formData.authorityLandline) {
                alert('Authority Landline is required.');
                return;
            }
    if (!formData.contact_name) {
      errors.contact_name = 'Contact name is required.';
    }
    if (formData.contact_email && !validateEmail(formData.contact_email)) {
      errors.contact_email = 'Please enter a valid Contact email.';
    }
    if (formData.contact_phone && !validatePhone(formData.contact_phone) && !copyApplicantData) {
      errors.contact_phone = 'Contact phone must be exactly 10 digits.';
    }
    if (!formData.companyProfile.trim()) {
      errors.companyProfile = 'Company profile is required.';
    }
  }
  if (currentStep === 3 && checkStepFieldsEmpty(3)) {
    if (!window.confirm('Data not entered,If you wish to continue?')) {
      return;
    }
  }
  if (currentStep === 4 && checkStepFieldsEmpty(4)) {
    if (!window.confirm('Data not entered,If you wish to continue?')) {
      return;
    }
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
        formData: serializeFormForStorage(formData),
        step: currentStep,
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem('registrationRefineryDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

async function handleSubmit(event) {
  event.preventDefault();

  // Read user info synchronously from localStorage (do not rely on setFormData to finish)
  let storedUser = null;
  try {
    const raw = localStorage.getItem("user_info");
    if (raw) storedUser = JSON.parse(raw);
  } catch (err) {
    console.warn("Could not parse user_info from localStorage", err);
  }

  // Build a merged "final" data object for validation and sending.
  const dataToSend = {
    // base from state
    ...formData,
    // override from stored user (if present)
    firstname: (storedUser?.first_name ?? formData.firstname) || "",
    lastname: (storedUser?.last_name ?? formData.lastname) || "",
    userid: (storedUser?.id ?? formData.userid) || "",
    company_name: (storedUser?.organisation_name ?? formData.company_name) || "",
    Organisationname: (storedUser?.organisation_name ?? formData.Organisationname) || formData.Organisationname,
  };

  // Basic validations (same as you had but using merged data)
  if (!dataToSend.declaration) {
    return alert("Please accept the declaration.");
  }
  if (!dataToSend.approvingAuthoritySignature) {
    return alert("Upload authority signature.");
  }
  if (!/^\d{10}$/.test(dataToSend.authorityPhone || "")) {
    return alert("Invalid authority phone.");
  }
  if (!/^\d{10}$/.test(dataToSend.contact_phone || "")) {
    return alert("Invalid contact phone.");
  }

  // Prepare FormData
  const fd = new FormData();

  // NOTE: backend model expects `organisation_name` and `refinrey` (spelling preserved)
  fd.append("organisation_name", dataToSend.Organisationname || "");
  fd.append("refinrey", dataToSend.refinery || ""); // <-- IMPORTANT: model field name is `refinrey`
  fd.append("category", dataToSend.category || "");
  fd.append("firstname", dataToSend.firstname || "");
  fd.append("lastname", dataToSend.lastname || "");
  fd.append("userid", dataToSend.userid || "");
  fd.append("company_name", dataToSend.company_name || "");
  fd.append("mailing_address", dataToSend.mailingAddress || "");

  fd.append("authority_name", dataToSend.authorityName || "");
  fd.append("authority_title", dataToSend.authorityTitle || "");
  fd.append("authority_phone", dataToSend.authorityPhone || "");
  fd.append("authorityLandline", dataToSend.authorityLandline || "");
  fd.append("authority_email", dataToSend.authorityEmail || "");

  fd.append("contact_name", dataToSend.contact_name || "");
  fd.append("contact_phone", dataToSend.contact_phone || "");
  fd.append("contact_email", dataToSend.contact_email || "");

  fd.append("company_profile", dataToSend.companyProfile || "");
  fd.append("award_justification", dataToSend.awardJustification || "");
  fd.append("comment", dataToSend.comment || "");
  fd.append("declaration", dataToSend.declaration ? "true" : "false");

  // Approving authority signature file (model field: approving_authority_file)
  if (dataToSend.approvingAuthoritySignature instanceof File) {
    fd.append("approving_authority_file", dataToSend.approvingAuthoritySignature);
  }

  // QUANTITATIVE: Part 1 (4 years) — from multiple arrays (keeps your mapping)
  const map = {
    refinery1_1MMTPA: "name_plate_capacity",
    refinery1_1_1MMTPA: "actual_crude",
    refinery1_2_1MMTPA: "cracking_name_plate",
    refinery1_2_2MMTPA: "cracking_actual",
    refinery1_3MMTPA: "yield_distillates",
    refinery2MMTPA: "grm",
    refinery3_1MMTPA: "carbon_emission",
    refinery3_2MMTPA: "fatalities",
    refinery4MMTPA: "lost_time_injuries",
    refinery5_1MMTPA: "osha_incidents",
    refinery5_1_2MMTPA: "manhours_own",
    refinery6_1MMTPA: "manhours_contract",
  };

  const years = ["2024", "2023", "2022", "2021"];

  for (const [formKey, modelPrefix] of Object.entries(map)) {
    const values = dataToSend[formKey] ?? [];
    years.forEach((yr, idx) => {
      const fieldName = `${modelPrefix}_${yr}`;
      // Append even empty string - DRF will accept blank values for nullable fields
      fd.append(fieldName, values[idx] ?? "");
    });
  }

  // Attachments (1–4) - keep same naming as your model: attachments1_desc, attachments1, etc.
  [1, 2, 3, 4].forEach(n => {
    const a = dataToSend[`attachments${n}`] || { description: "", file: null };
    fd.append(`attachments${n}_desc`, a.description || "");
    if (a.file instanceof File) {
      fd.append(`attachments${n}`, a.file);
    }
  });

  // Send request
  try {
    // It's usually better to let axios set the Content-Type + boundary automatically.
    // const res = await apiClient.post("/registration-refinery/", fd /*, {
    //   headers: { "Content-Type": "multipart/form-data" }
    // }*/);
          try {
        localStorage.removeItem('registrationRefineryDraft');
      } catch (err) {
        // ignore
      }

    alert("Refinery registration submitted successfully!");
    setIsSubmitted(true);

    // Optional: update local state with the saved user values (keeps form consistent)
    setFormData(prev => ({
      ...prev,
      firstname: dataToSend.firstname,
      lastname: dataToSend.lastname,
      userid: dataToSend.userid,
      company_name: dataToSend.company_name,
      Organisationname: dataToSend.Organisationname,
    }));

  } catch (err) {
    console.error("Refinery submission failed:", err);

    // Better error message extraction:
    const resp = err?.response?.data;
    let msg = "";

    if (!resp) {
      msg = err?.message || "Unknown error";
    } else if (typeof resp === "string") {
      msg = resp;
    } else if (typeof resp === "object") {
      
      const parts = [];
      for (const [k, v] of Object.entries(resp)) {
        // v might be array or string or nested object
        if (Array.isArray(v)) {
          parts.push(`${k}: ${v.join(" | ")}`);
        } else if (typeof v === "object") {
          parts.push(`${k}: ${JSON.stringify(v)}`);
        } else {
          parts.push(`${k}: ${v}`);
        }
      }
      msg = parts.join("\n");
    } else {
      msg = "Submission failed";
    }

    // If backend returned a 400 restriction message (like "one application allowed per refinery"),
    // it will be shown here.
    alert("Submission error:\n" + msg);
  }
}


const getRefineries = (orgName) => {
  const refineryData = {
    'Reliance Industries Limited': ['DTA Jamnagar', 'SEZ Jamnagar'],
    'Nayara Energy Limited': ['Nayara Refinery'],
    'HPCL–Mittal Energy Limited': ['HMEL', 'Bhatinda Refinery'],
    'Oil and Natural Gas Corporation': ['Tatipaka Refinery'],
    'Mangalore Refinery and Petrochemicals Limited': ['MRPL Refinery'],
    'Numaligarh Refinery Limited': ['Numaligarh Refinery'],
    'Chennai Petroleum Corporation Limited': ['Manali Refinery'],
    'Hindustan Petroleum Corporation Limited': ['Mumbai Refinery', 'Visakhapattnam Refinery'],
    'Bharat Petroleum Corporation Limited': ['Mumbai Refinery', 'Kochi Refinery', 'Bina Refinery'],
    'Indian Oil Corporation Limited': [
      'Barauni Refinery',
      'Gujarat Refinery',
      'Haldia Refinery',
      'Mathura Refinery',
      'Panipat Refinery',
      'Guwahati Refinery',
      'Digboi Refinery',
      'Bongaigoan Refinery',
      'Paradip Refinery',
    ],
  };
  return refineryData[orgName] || [];
};

const renderStepContent = () => {
  const progress = ((currentStep - 1) / 4) * 100;
  const years = ['2024–25', '2023–24', '2022–23', '2021–22'];

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
              Organisation Name: 
              {/* <span aria-hidden="true" className="text-red">*</span> */}
            </label>
            <input
              id="Organisationname"
              name="Organisationname"
              type="text"
              maxLength={FIELD_MAX_LENGTH}
              value={formData.Organisationname}
              onChange={(e) => handleChange('Organisationname', e.target.value)}
              // disabled={true}
              onBlur={(e) => handleBlur('Organisationname', e.target.value)}
              aria-describedby="Organisationname-error"
              className={`form-input ${fieldErrors.Organisationname ? 'has-error' : ''}`}
              placeholder="Enter organisation name"
              required
              aria-required="true"
            />
            {fieldErrors.Organisationname && (
              <span className="error-tooltip" id="Organisationname-error" role="alert">
                {fieldErrors.Organisationname}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="refinery">
              Select Refinery: <span className="text-red" aria-hidden="true">*</span>
            </label>
            <select
              id="refinery"
              name="refinery"
              value={formData.refinery}
              onChange={(e) => handleChange('refinery', e.target.value)}
              onBlur={(e) => handleBlur('refinery', e.target.value)}
              className={`form-input ${fieldErrors.refinery ? 'has-error' : ''}`}
              aria-required="true"
              aria-describedby="refinery-error"
            >
              <option value="">Select Refinery</option>
              {getRefineries(formData.Organisationname).map((refinery, index) => (
                <option key={index} value={refinery}>
                  {refinery}
                </option>
              ))}
            </select>
            {fieldErrors.refinery && (
              <span className="error-tooltip" id="refinery-error" role="alert">
                {fieldErrors.refinery}
              </span>
            )}
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
              className={`form-textarea ${fieldErrors.mailingAddress ? 'has-error' : ''}`}
              rows={3}
              maxLength={FIELD_MAX_LENGTH}
              placeholder="Enter Postal address"
              aria-required="true"
              aria-describedby="mailingAddress-error"
            />
            {fieldErrors.mailingAddress && (
              <span className="error-tooltip" id="mailingAddress-error" role="alert">
                {fieldErrors.mailingAddress}
              </span>
            )}
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <h3 className="step-title">Step 2: Approving Authority & Contact</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="step-section">
              <h4>Approving Authority</h4>
              <p className="note">Approving authority should be concerned  Director /Board level executive. </p>
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
                  className={`form-input ${fieldErrors.authorityName ? 'has-error' : ''}`}
                  placeholder="Name"
                  maxLength={FIELD_MAX_LENGTH}
                  aria-required="true"
                  aria-describedby="authorityName-error"
                />
                {fieldErrors.authorityName && (
                  <span className="error-tooltip" id="authorityName-error" role="alert">
                    {fieldErrors.authorityName}
                  </span>
                )}
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
                  className={`form-input ${fieldErrors.authorityTitle ? 'has-error' : ''}`}
                  placeholder="Designation"
                  maxLength={FIELD_MAX_LENGTH}
                  aria-required="true"
                  aria-describedby="authorityTitle-error"
                />
                {fieldErrors.authorityTitle && (
                  <span className="error-tooltip" id="authorityTitle-error" role="alert">
                    {fieldErrors.authorityTitle}
                  </span>
                )}
              </div>


                              <div className="form-group">
                  <label htmlFor="authorityPhone">
                    Landline:{" "}
                    <span className="text-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="authorityLandline"
                    type="number"
                    name="authorityLandline"
                    value={formData.authorityLandline}
                    onChange={(e) =>
                      handleChange("authorityLandline", e.target.value)
                    }
                    // onBlur={(e) => handleBlur('authorityLandline', e.target.value)}
                    className={`form-input ${
                      !formData.authorityLandline && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
                    placeholder="Landline number"
                    aria-required="true"
                    aria-describedby={
                      fieldErrors.authorityLandline
                        ? "authorityLandline-error"
                        : undefined
                    }
                  />
                  {!formData.authorityLandline && currentStep === 2 && (
                    <span className="error-tooltip">
                      Authority Landline Number is required
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityPhone">
                    Mobile:{" "}
                    {/* <span className="text-red" aria-hidden="true"></span> */}
                  </label>
                  <input
                    id="authorityPhone"
                    type="tel"
                    name="authorityPhone"
                    value={formData.authorityPhone}
                    onChange={(e) =>
                      handleChange("authorityPhone", e.target.value)
                    }
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
                  Email Address: <span className="text-red" aria-hidden="true">*</span>
                </label>
                <input
                  id="authorityEmail"
                  type="email"
                  name="authorityEmail"
                  value={formData.authorityEmail}
                  onChange={(e) => handleChange('authorityEmail', e.target.value)}
                  onBlur={(e) => handleBlur('authorityEmail', e.target.value)}
                  className={`form-input ${fieldErrors.authorityEmail ? 'has-error' : ''}`}
                  placeholder="E-mail address"
                  maxLength={FIELD_MAX_LENGTH}
                  aria-required="true"
                  aria-describedby="authorityEmail-error"
                />
                {fieldErrors.authorityEmail && (
                  <span className="error-tooltip" id="authorityEmail-error" role="alert">
                    {fieldErrors.authorityEmail}
                  </span>
                )}
              </div>
            </div>
            <div className="step-section">
              <h4>Contacts (Nodal Officials) <span className="text-red" aria-hidden="true">*</span></h4>
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
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="companyProfile">Brief write up on Refinery. <span className="text-red">*</span> </label>
            <p className="note">(within 300 words)</p>
            <textarea
              id="companyProfile"
              name="companyProfile"
              value={formData.companyProfile}
              onChange={(e) => handleChange('companyProfile', e.target.value)}
              onBlur={(e) => handleBlur('companyProfile', e.target.value)}
              className={`form-textarea ${fieldErrors.companyProfile ? 'has-error' : ''}`}
              rows={6}
              // maxLength={TEXTAREA_MAX_LENGTH}
              aria-describedby="companyProfile-error"
              required
            />
            {fieldErrors.companyProfile && (
              <span className="error-tooltip" id="companyProfile-error" role="alert">
                {fieldErrors.companyProfile}
              </span>
            )}
          </div>

        </div>
      )}
{/* STEP 3 */}
{currentStep === 3 && (
  <div>
    <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
    <table className="quant-table">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Particulars</th>
          <th scope="col">2024–25</th>
          <th scope="col">2023–24</th>
          <th scope="col">2022–23</th>
          <th scope="col">2021–22</th>
        </tr>
      </thead>
      <tbody>
        {part1.map(([num, label, key]) => (
          <tr key={label}>
            <td>{num}</td>
            <td>{label}</td>
            {[0, 1, 2, 3].map((index) => (
              <td key={index}>
                {key ? (
                  <TextField
  type="text"
  value={
    Array.isArray(formData[key]) ? formData[key][index] || "" : ""
  }
  onChange={(e) => {
    const val = e.target.value;
    // Allow only digits and decimals
    if (/^\d*\.?\d*$/.test(val)) {
      handleChange(key, val, index);
    }
  }}
  onBlur={(e) => handleBlur(`${key}[${index}]`, e.target.value)}
  error={!!fieldErrors[`${key}[${index}]`]}
  helperText={fieldErrors[`${key}[${index}]`] || ""}
  variant="outlined"
  fullWidth
  inputProps={{
    inputMode: "decimal", // mobile keyboards show numeric with decimal
    pattern: "[0-9]*[.,]?[0-9]*", // regex pattern
  }}
  onKeyDown={(e) => {
    if (["e", "E", "-", "+"].includes(e.key)) {
      e.preventDefault();
    }
  }}
/>
                ) : (
                  <span className="non-editable-cell"></span>
                )}
                {key && fieldErrors[`${key}[${index}]`] && (
                  <span id={`${key}-${index}-error`} className="error-tooltip" role="alert">
                    {fieldErrors[`${key}[${index}]`]}
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{/* STEP 4 */}
{currentStep === 4 && (
  <div>
    <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>

    {/* First Table */}
    <table className="quant-table">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Particulars</th>
          <th scope="col">2024–25</th>
          <th scope="col">2023–24</th>
          <th scope="col">2022–23</th>
          <th scope="col">2021–22</th>
        </tr>
      </thead>
      <tbody>
        {part2.slice(0, 1).map(([num, label, key]) => (
          <tr key={label}>
            <td>{num}</td>
            <td>{label}</td>
            {[0, 1, 2, 3].map((index) => (
              <td key={index}>
                {key ? (
                  <TextField
  type="text"
  value={
    Array.isArray(formData[key]) ? formData[key][index] || "" : ""
  }
  onChange={(e) => {
    const val = e.target.value;
    // Allow only digits and decimals
    if (/^\d*\.?\d*$/.test(val)) {
      handleChange(key, val, index);
    }
  }}
  onBlur={(e) => handleBlur(`${key}[${index}]`, e.target.value)}
  error={!!fieldErrors[`${key}[${index}]`]}
  helperText={fieldErrors[`${key}[${index}]`] || ""}
  variant="outlined"
  fullWidth
  inputProps={{
    inputMode: "decimal", // mobile keyboards show numeric with decimal
    pattern: "[0-9]*[.,]?[0-9]*", // regex pattern
  }}
  onKeyDown={(e) => {
    if (["e", "E", "-", "+"].includes(e.key)) {
      e.preventDefault();
    }
  }}
/>
                ) : (
                  <span className="non-editable-cell"></span>
                )}
                {key && fieldErrors[`${key}[${index}]`] && (
                  <span id={`${key}-${index}-error`} className="error-tooltip" role="alert">
                    {fieldErrors[`${key}[${index}]`]}
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    {/* Second Table */}
    <table className="quant-table">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Particulars</th>
          <th scope="col">2024–25</th>
        </tr>
      </thead>
      <tbody>
        {part2.slice(1).map(([num, label, key]) => (
          <tr key={label}>
            <td>{num}</td>
            <td>{label}</td>
            <td>
              {key ? (
               <TextField
  type="text" // keep text to have full control
  value={formData[key] || ""}
  variant="outlined"
  fullWidth
  className={`form-input ${fieldErrors[key] ? "has-error" : ""}`}
  aria-label={`${label} for 2024–25`}
  aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
  error={!!fieldErrors[key]}
  helperText={fieldErrors[key] || ""}
  onChange={(e) => {
    const val = e.target.value;

    // Allow only digits and at most one decimal
    if (/^\d*\.?\d*$/.test(val)) {
      handleChange(key, val);
    }
  }}
  onBlur={(e) => handleBlur(key, e.target.value)}
  onKeyDown={(e) => {
    // Block arrows, minus, letters, exponential, etc.
    if (
      ["ArrowUp", "ArrowDown", "e", "E", "-", "+"].includes(e.key)
    ) {
      e.preventDefault();
    }
  }}
  onWheel={(e) => e.target.blur()} // disables scroll changing value
/>
              ) : (
                <span className="non-editable-cell"></span>
              )}
              {key && fieldErrors[key] && (
                <span id={`${key}-error`} className="error-tooltip" role="alert">
                  {fieldErrors[key]}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Comment Field */}
    <div className="form-group">
      <label htmlFor="comment">Comments</label>
      <textarea
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={(e) => handleChange('comment', e.target.value)}
        onBlur={(e) => handleBlur('comment', e.target.value)}
        className={`form-textarea ${fieldErrors.comment ? 'has-error' : ''}`}
        placeholder="Comments in (200 words) against input parameter, if any"
        aria-describedby="comment-error"
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
                className={`form-input mt-4 ${
                  fieldErrors.approvingAuthoritySignature ? "has-error" : ""
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
            <label htmlFor="declaration">
              <input
                id="declaration"
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={(e) => handleChange('declaration', e.target.checked)}
                className={`form-checkbox ${fieldErrors.declaration ? 'has-error' : ''}`}
                aria-required="true"
                aria-describedby="declaration-error"
              />
              I declare that the information submitted is true and complete.
            </label>
            {fieldErrors.declaration && (
              <span className="error-tooltip" id="declaration-error" role="alert">
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
        <h1>{awardTitle}</h1>
        <h6>Step {currentStep} of 5</h6>
      </div>
      {error && <div className="error" role="alert">{error}</div>}
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

export default RegistrationRefinery;