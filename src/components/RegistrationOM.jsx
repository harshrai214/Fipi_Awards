
// import React, { useState, useEffect, useCallback } from 'react';
// // import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SidebarGuideline from "./SidebarGuideline"
// import '../styles/FormProduction.css';

// // Constants for max lengths
// const FIELD_MAX_LENGTH = 100;
// const COMPANY_PROFILE_MAX_LENGTH = 300;
// const COMMENT_MAX_LENGTH = 200;
// const PHONE_MAX_LENGTH = 10;

// // Validation regex
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /^\d{10}$/;

// const RegistrationOM = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [activeItem, setActiveItem] = useState(null);
//   const awardTitle = location.state?.awardTitle || 'Oil Marketing Company of the Year';

//   // Form state initialization
//   const [formData, setFormData] = useState({
//     Organisationname: '',
//     category: 'Oil Marketing Company of the Year',
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
//     domesticVolumeMMT2024: '',
//     domesticVolumeMMT2023: '',
//     domesticSalesRevenue2024: '',
//     domesticSalesRevenue2023: '',
//     exportVolumeMMT2024: '',
//     exportVolumeMMT2023: '',
//     exportSalesRevenue2024: '',
//     exportSalesRevenue2023: '',
//     domesticMarketShare2024: '',
//     domesticMarketShare2023: '',
//     retailMS2024: '',
//     retailMS2023: '',
//     retailHSD2024: '',
//     retailHSD2023: '',
//     retailOutlets2024: '',
//     retailOutlets2023: '',
//     salesPerEmployeeTotal2024: '',
//     salesPerEmployeeTotal2023: '',
//     salesPerEmployeeCount2024: '',
//     salesPerEmployeeCount2023: '',
//     lubricantsSales2024: '',
//     lubricantsSales2023: '',
//     fuelsSales2024: '',
//     fuelsSales2023: '',
//     tankageMS2024: '',
//     tankageMS2023: '',
//     tankageHSD2024: '',
//     tankageHSD2023: '',
//     tankageEthanol2024: '',
//     tankageEthanol2023: '',
//     automatedROs2024: '',
//     automatedROs2023: '',
//     totalROs2024: '',
//     totalROs2023: '',
//     nonCashSales2024: '',
//     nonCashSales2023: '',
//     totalSales2024: '',
//     totalSales2023: '',
//     gpsTrucks2024: '',
//     gpsTrucks2023: '',
//     totalTrucks2024: '',
//     totalTrucks2023: '',
//     complaintsNumber2024: '',
//     complaintsNumber2023: '',
//     complaintsTurnaround2024: '',
//     complaintsTurnaround2023: '',
//     evStations2024: '',
//     evStations2023: '',
//     h2Stations2024: '',
//     h2Stations2023: '',
//     cbgSales2024: '',
//     cbgSales2023: '',
//     lpgConsumption2024: '',
//     lpgConsumption2023: '',
//     biofuelsInvestment2024: '',
//     biofuelsInvestment2023: '',
//     totalCapex2024: '',
//     totalCapex2023: '',
//     ethanolBlendingActual2024: '',
//     // ethanolBlendingActual2023: '',
//     ethanolBlendingTarget2024: '',
//     // ethanolBlendingTarget2023: '',
//     fatalities2024: '',
//     // fatalities2023: '',
//     hoursWorked2024: '',
//     // hoursWorked2023: '',
//     domesticsales1: "",
//     domesticsales2: "",
//     export1: "",
//     export2: "",
//     ethanol: "",
//     safety: "",


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
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

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
//         }
//       }


//       // if ((type === 'text') && value.length > applicableMaxLength) {
//       //   alert(`Your value does not exceed more than ${applicableMaxLength} characters.`);
//       //   return;
//       // } else {
//       //   clearFieldError(name);
//       // }


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

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));

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
//         contactName: prev.authorityName,     // ✅ camelCase
//         contactEmail: prev.authorityEmail,   // ✅ camelCase
//         contactPhone: prev.authorityPhone,   // ✅ camelCase
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
//         <p><strong>Mailing Address:</strong> ${formData.mailingAddress || ''}</p>
//         <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
//         <p><strong>Authority Title:</strong> ${formData.authorityTitle || ''}</p>
//         <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
//         <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>
//         <h2>Contacts Nodal Officials:</h2>
//         <p><strong>Contact Name:</strong> ${formData.contactName || ''}</p>
//         <p><strong>Contact Phone:</strong> ${formData.contactPhone || ''}</p>
//         <p><strong>Contact Email:</strong> ${formData.contactEmail || ''}</p>
//         <p><strong>Company Profile:</strong> ${formData.companyProfile || ''}</p>
// <h2>Quantitative Information - Part 1</h2>
//   <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//     <thead>
//       <tr>
//         <th style="border: 1px solid #000; padding: 8px;">S.No</th>
//         <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//         <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
//         <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${renderQuantitativePrint(1, 6.2, true)}
//     </tbody>
//   </table>

//   <h2>Quantitative Information - Part 2</h2>
//   <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//     <thead>
//       <tr>
//         <th style="border: 1px solid #000; padding: 8px;">S.No</th>
//         <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//         <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
//         <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${renderQuantitativePrint(7, 12.2, true)}
//     </tbody>
//   </table>

//   <h2>Quantitative Information - Part 2 (Single Year)</h2>
//   <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//     <thead>
//       <tr>
//         <th style="border: 1px solid #000; padding: 8px;">S.No</th>
//         <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
//         <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${renderQuantitativePrint(13, 14.2, false)}
//     </tbody>
//   </table>
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
//       <h2>Authority Signature:</h2>
//         <p><strong>Name:</strong> ${formData.authorityName || ''}</p>
//         <p><strong>Title:</strong> ${formData.authorityTitle || ''}</p>
//         <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
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
//     if (currentStep === 3 && areFieldsEmpty(1.1, 6.2)) {
//       if (!window.confirm('Data not entered,If you wish to continue?')) {
//         return; // halt navigation
//       }
//     }
//     if (currentStep === 4 && areFieldsEmpty(7.1, 14.2)) {
//       if (!window.confirm('Data not entered,If you wish to continue?')) {
//         return; // halt navigation
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
//     localStorage.setItem('registrationOMDraft', JSON.stringify({ formData }));
//     alert('Draft Saved!');
//   };

//   // Submit form handler
//   const handleSubmit = async e => {
//     e.preventDefault();

//     // 1) Validate required bits
//     if (!formData.declaration) {
//       return alert("Please accept the declaration before submitting.");
//     }
//     if ((formData.authorityPhone || "").replace(/\D/g, "").length !== 10) {
//       return alert("Authority phone must be exactly 10 digits.");
//     }

//     // 2) Build the FormData
//     const fd = new FormData();
//     // — Organisation & contacts
//     fd.append("organisation_name", formData.Organisationname || "");
//     fd.append("category", formData.category);
//     fd.append("company_name", formData.companyName || "");
//     fd.append("mailing_address", formData.mailingAddress || "");

//     fd.append("authority_name", formData.authorityName);
//     fd.append("authority_title", formData.authorityTitle || "");
//     fd.append("authority_phone", formData.authorityPhone);
//     fd.append("authority_email", formData.authorityEmail);

//     fd.append("contact_name", formData.contactName || "");
//     fd.append("contact_phone", formData.contactPhone || "");
//     fd.append("contact_email", formData.contactEmail || "");

//     // — Profile & comments
//     fd.append("company_profile", formData.companyProfile || "");
//     fd.append("comment", formData.comment || "");
//     fd.append("declaration", String(formData.declaration));

//     // — Signature
//     if (formData.approvingAuthoritySignature) {
//       fd.append("approving_authority_file", formData.approvingAuthoritySignature);
//     }

//     // 3) The numeric tables
//     // map your React field names → the exact Django field names:
//     const mapping = {
//       domesticVolumeMMT2024: "domestic_volume_mmt_2024",
//       domesticVolumeMMT2023: "domestic_volume_mmt_2023",
//       domesticSalesRevenue2024: "domestic_sales_revenue_2024",
//       domesticSalesRevenue2023: "domestic_sales_revenue_2023",
//       exportVolumeMMT2024: "export_volume_mmt_2024",
//       exportVolumeMMT2023: "export_volume_mmt_2023",
//       exportSalesRevenue2024: "export_sales_revenue_2024",
//       exportSalesRevenue2023: "export_sales_revenue_2023",
//       domesticMarketShare2024: "domestic_market_share_2024",
//       domesticMarketShare2023: "domestic_market_share_2023",
//       retailMS2024: "retail_ms_2024",
//       retailMS2023: "retail_ms_2023",
//       retailHSD2024: "retail_hsd_2024",
//       retailHSD2023: "retail_hsd_2023",
//       retailOutlets2024: "retail_outlets_2024",
//       retailOutlets2023: "retail_outlets_2023",
//       salesPerEmployeeTotal2024: "sales_per_employee_total_2024",
//       salesPerEmployeeTotal2023: "sales_per_employee_total_2023",
//       salesPerEmployeeCount2024: "sales_per_employee_count_2024",
//       salesPerEmployeeCount2023: "sales_per_employee_count_2023",
//       lubricantsSales2024: "lubricants_sales_2024",
//       lubricantsSales2023: "lubricants_sales_2023",
//       fuelsSales2024: "fuels_sales_2024",
//       fuelsSales2023: "fuels_sales_2023",
//       tankageMS2024: "tankage_ms_2024",
//       tankageMS2023: "tankage_ms_2023",
//       tankageHSD2024: "tankage_hsd_2024",
//       tankageHSD2023: "tankage_hsd_2023",
//       tankageEthanol2024: "tankage_ethanol_2024",
//       tankageEthanol2023: "tankage_ethanol_2023",
//       automatedROs2024: "automated_ros_2024",
//       automatedROs2023: "automated_ros_2023",
//       totalROs2024: "total_ros_2024",
//       totalROs2023: "total_ros_2023",
//       nonCashSales2024: "non_cash_sales_2024",
//       nonCashSales2023: "non_cash_sales_2023",
//       totalSales2024: "total_sales_2024",
//       totalSales2023: "total_sales_2023",
//       gpsTrucks2024: "gps_trucks_2024",
//       gpsTrucks2023: "gps_trucks_2023",
//       totalTrucks2024: "total_trucks_2024",
//       totalTrucks2023: "total_trucks_2023",
//       complaintsNumber2024: "complaints_number_2024",
//       complaintsNumber2023: "complaints_number_2023",
//       complaintsTurnaround2024: "complaints_turnaround_2024",
//       complaintsTurnaround2023: "complaints_turnaround_2023",
//       evStations2024: "ev_stations_2024",
//       evStations2023: "ev_stations_2023",
//       h2Stations2024: "h2_stations_2024",
//       h2Stations2023: "h2_stations_2023",
//       cbgSales2024: "cbg_sales_2024",
//       cbgSales2023: "cbg_sales_2023",
//       lpgConsumption2024: "lpg_consumption_2024",
//       lpgConsumption2023: "lpg_consumption_2023",
//       biofuelsInvestment2024: "biofuels_investment_2024",
//       biofuelsInvestment2023: "biofuels_investment_2023",
//       totalCapex2024: "total_capex_2024",
//       totalCapex2023: "total_capex_2023",
//       ethanolBlendingActual2024: "ethanol_blending_actual_2024",
//       ethanolBlendingActual2023: "ethanol_blending_actual_2023",
//       ethanolBlendingTarget2024: "ethanol_blending_target_2024",
//       ethanolBlendingTarget2023: "ethanol_blending_target_2023",
//       fatalities2024: "fatalities_2024",
//       fatalities2023: "fatalities_2023",
//       hoursWorked2024: "hours_worked_2024",
//       hoursWorked2023: "hours_worked_2023",
//     };

//     Object.entries(mapping).forEach(([rk, apiField]) => {
//       fd.append(apiField, formData[rk] || "");
//     });

//     // 4) Attachments
//     [1, 2, 3, 4].forEach(n => {
//       const att = formData[`attachments${n}`];
//       if (att?.file) {
//         fd.append(`attachments${n}`, att.file);
//         fd.append(`attachments${n}_desc`, att.description || "");
//       }
//     });

//     // 5) POST
//     try {
//       //   const url = `${ACTIVE_API_BASE_URL}/registration-om/`;
//       //   const res = await fetch(url, {
//       //   method: "POST",
//       //   body: fd
//       // });
//       // if (!res.ok) {
//       //   const err = await res.text();
//       //   throw new Error(err);
//       // }
//       // await res.json();
//       alert("Submitted successfully!");
//       console.log(formData)
//       setIsSubmitted(true);
//     } catch (err) {
//       console.error("Submission error:", err);
//       alert("Submit failed—see console.");
//     }
//   };

//   // Quantitative data for steps 3 and 4
//   const data = [


//     { num: "1", label: "Revenue from Sales", },
//     { num: "1.1", label: "Domestic sales", key2024: "domesticsales1", key2023: "domesticsales2" },
//     { num: '1.1.1', label: 'Volume MMT', key: 'domesticVolumeMMT2024' },
//     { num: '1.1.2', label: 'Sales Revenue (Rs. Crores)', key: 'domesticSalesRevenue2024' },


//     { num: "1.2", label: "Export", key2024: "export1", key2023: "export2" },
//     { num: '1.2.1', label: 'Volume MMT', key: 'exportVolumeMMT2024' },
//     { num: '1.2.2', label: 'Sales Revenue (Rs. Crores)', key: 'exportSalesRevenue2024' },

//     { num: "2", label: "	Domestic market share (Only liquid product sales excluding Petrochemicals and Gas) " },
//     { num: '2.1', label: 'Domestic Market Share %', key: 'domesticMarketShare2024' },

//     { num: "3", label: "Retail Sales (MMT)" },
//     { num: '3.1', label: 'MS', key: 'retailMS2024' },
//     { num: '3.2', label: 'HSD', key: 'retailHSD2024' },

//     { num: '4', label: 'No. of Retail Outlets', key: 'retailOutlets2024' },

//     { num: "5", label: "Sales per Employee (Only Marketing function employees on the rolls of organisation as on 31 March.) " },
//     { num: '5.1', label: 'Total Sales (MMT)', key: 'salesPerEmployeeTotal2024' },
//     { num: '5.2', label: 'No. of Employees', key: 'salesPerEmployeeCount2024' },

//     { num: "6", label: "Sale of Lubricants and Fuels sales (MMT) " },
//     { num: '6.1', label: 'Sales of Lubricants', key: 'lubricantsSales2024' },
//     { num: '6.2', label: 'Sales of Fuels (MS + HSD)', key: 'fuelsSales2024' },

//     { num: "7", label: "Tankage Capacity at the year end (MMT)" },
//     { num: '7.1', label: 'MS', key: 'tankageMS2024' },
//     { num: '7.2', label: 'HSD', key: 'tankageHSD2024' },
//     { num: '7.3', label: 'Ethanol', key: 'tankageEthanol2024' },

//     { num: "8", label: "Digital Initiative (Number)" },
//     { num: '8.1', label: 'Total Automated ROs', key: 'automatedROs2024' },
//     { num: '8.1.1', label: 'Total ROs', key: 'totalROs2024' },
//     { num: '8.2', label: 'Total Non-Cash sales', key: 'nonCashSales2024' },
//     { num: '8.2.1', label: 'Total sales', key: 'totalSales2024' },
//     { num: '8.3', label: 'GPS Enabled Trucks', key: 'gpsTrucks2024' },
//     { num: '8.3.1', label: 'Total No. of Trucks', key: 'totalTrucks2024' },

//     { num: "9", label: "Customer Complaints redressal" },
//     { num: '9.1', label: 'No. of Complaints', key: 'complaintsNumber2024' },
//     { num: '9.2', label: 'Average customer complaint turn-around time (No. of days)', key: 'complaintsTurnaround2024' },

//     { num: "10", label: "New Energy Based facilities-EV/H2/CBG added in the RO " },
//     { num: '10.1', label: 'Fast charging EV Stations (as provided to MoP&NG) (No.) ', key: 'evStations2024' },
//     { num: '10.2', label: 'H2 Dispensing Station (No.)', key: 'h2Stations2024' },
//     { num: '10.3', label: 'CBG (sales in MT)', key: 'cbgSales2024' },

//     { num: "11", label: "LPG - per capita consumption of PMUY customers " },
//     { num: '11.1', label: 'LPG per capita consumption of PMUY customers (No.)', key: 'lpgConsumption2024' },

//     { num: "12", label: "Investment in Bio-fuels (% of total capex) (CBG plant, Ethanol Plant) (Rs. Crores) " },
//     { num: '12.1', label: 'Actual Investment', key: 'biofuelsInvestment2024' },
//     { num: '12.2', label: 'Total Capex', key: 'totalCapex2024' },

//     { num: "13", label: "Progress in Ethanol Blending Programme in %", key: "ethanol" },
//     { num: '13.1', label: 'Actual Ethanol Blending', key: 'ethanolBlendingActual2024' },
//     { num: '13.2', label: 'Ethanol Blending Target', key: 'ethanolBlendingTarget2024' },

//     { num: "14", label: "Safety", key: "safety" },
//     { num: '14.1', label: 'No. of fatalities (own employees + contract employees)', key: 'fatalities2024' },
//     { num: '14.2', label: 'Total No. of hours worked by all employees (including contract employees) in marketing function', key: 'hoursWorked2024' },
//   ];

//   const areFieldsEmpty = (start, end) => {
//     const flattenedItems = [];

//     // Recursive extractor to handle nested subItems and top-level keys
//     const extractItems = (items) => {
//       for (const item of items) {
//         if (item.key) {
//           flattenedItems.push({ num: parseFloat(item.num), key: item.key });
//         }
//         if (item.subItems && Array.isArray(item.subItems)) {
//           extractItems(item.subItems);
//         }
//       }
//     };

//     extractItems(data);

//     // Filter by the given range
//     const filteredItems = flattenedItems.filter(
//       (item) => item.num >= start && item.num <= end
//     );

//     // Check each field’s value
//     for (const item of filteredItems) {
//       const val = formData[item.key];

//       // Skip only if value is explicitly present
//       if (val === undefined || val === null || val === '') {
//         return true;
//       }

//       // Also check if it's an array and contains any empty entries
//       if (Array.isArray(val) && val.some(v => v === '' || v === null || v === undefined)) {
//         return true;
//       }
//     }

//     return false;
//   };



//   const renderQuantitativePrint = (start, end, twoYears = true) => {
//     return data
//       .filter(section => parseFloat(section.num) >= start && parseFloat(section.num) <= end)
//       .map(section => {
//         const val2024 = formData[section.key?.replace("2023", "2024")] || "";
//         const val2023 = twoYears
//           ? formData[section.key?.replace("2024", "2023")] || ""
//           : null;

//         return `
//         <tr>
//           <td style="border: 1px solid #000; padding: 8px;">${section.num}</td>
//           <td style="border: 1px solid #000; padding: 8px;">${section.label}</td>
//           <td style="border: 1px solid #000; padding: 8px;">${val2024}</td>
//           ${twoYears ? `<td style="border: 1px solid #000; padding: 8px;">${val2023}</td>` : ""}
//         </tr>
//       `;
//       })
//       .join("");
//   };


//   // Rendering steps content
//   const renderStepContent = () => {
//     const progress = ((currentStep - 1) / 4) * 100;
//     const years = ['2024-25', '2023-24'];

//     const renderSection = (section) => {
//       const isSingleYear = section.num.startsWith("13") || section.num.startsWith("14");

//       return (
//         <tr key={section.num}>
//           {/* Serial Number */}
//           <td className="sno-cell">{section.num}</td>

//           {/* Label */}
//           <td className="label-cell" colSpan={3}>
//             {section.label}
//           </td>

//           {isSingleYear ? (
//             // Only one input for 2024-25
//             <td>
//               {section.key2024 ? (
//                 <input
//                   type="number"
//                   name={section.key2024}
//                   value={formData[section.key2024] || ""}
//                   onChange={handleChange}
//                   onKeyDown={(e) => {
//                     if (e.key === '-' || e.key === 'e' || e.key === 'E') {
//                       e.preventDefault();
//                     }
//                   }}
//                   className="form-input no-spinner"
//                   min="0"

//                 />
//               ) : section.key ? (
//                 <input
//                   type="number"
//                   name={section.key.replace("2023", "2024")}
//                   value={formData[section.key.replace("2023", "2024")] || ""}
//                   onChange={handleChange}
//                   onKeyDown={(e) => {
//                     if (e.key === '-' || e.key === 'e' || e.key === 'E') {
//                       e.preventDefault();
//                     }
//                   }}
//                   className="form-input no-spinner"
//                   min="0"
//                 />
//               ) : (
//                 <span></span>
//               )}
//             </td>
//           ) : (
//             // Normal two-year rendering
//             <>
//               <td>
//                 {section.key2024 ? (
//                   <input
//                     type="number"
//                     name={section.key2024}
//                     value={formData[section.key2024] || ""}
//                     onChange={handleChange}
//                     onKeyDown={(e) => {
//                       if (e.key === '-' || e.key === 'e' || e.key === 'E') {
//                         e.preventDefault();
//                       }
//                     }}
//                     className="form-input no-spinner"
//                     min="0"
//                   />
//                 ) : section.key ? (
//                   <input
//                     type="number"
//                     name={section.key.replace("2023", "2024")}
//                     value={formData[section.key.replace("2023", "2024")] || ""}
//                     onChange={handleChange}
//                     onKeyDown={(e) => {
//                       if (e.key === '-' || e.key === 'e' || e.key === 'E') {
//                         e.preventDefault();
//                       }
//                     }}
//                     className="form-input no-spinner"
//                     min="0"
//                   />
//                 ) : (
//                   <span></span>
//                 )}
//               </td>
//               <td>
//                 {section.key2023 ? (
//                   <input
//                     type="number"
//                     name={section.key2023}
//                     value={formData[section.key2023] || ""}
//                     onChange={handleChange}
//                     onKeyDown={(e) => {
//                       if (e.key === '-' || e.key === 'e' || e.key === 'E') {
//                         e.preventDefault();
//                       }
//                     }}
//                     className="form-input no-spinner"
//                     min="0"
//                   />
//                 ) : section.key ? (
//                   <input
//                     type="number"
//                     name={section.key.replace("2024", "2023")}
//                     value={formData[section.key.replace("2024", "2023")] || ""}
//                     onChange={handleChange}
//                     onKeyDown={(e) => {
//                       if (e.key === '-' || e.key === 'e' || e.key === 'E') {
//                         e.preventDefault();
//                       }
//                     }}
//                     className="form-input no-spinner"
//                     min="0"
//                   />
//                 ) : (
//                   <span></span>
//                 )}
//               </td>
//             </>
//           )}
//         </tr>
//       );
//     };







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
//                 onChange={handleChange}
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
//                 onChange={handleChange}
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
//             <h3 className="step-title">Step 2:Approving Authority & Contact</h3>
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
//                     onChange={handleChange}
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
//                     onChange={handleChange}
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
//                     onChange={handleChange}
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
//                     onChange={handleChange}
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
//                     Name <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="contactName"
//                     name="contactName"
//                     type="text"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.contactName}
//                     onChange={(e) => handleChange}
//                     placeholder="Contact name"
//                     disabled={copyApplicantData}
//                     className={`form-input ${!formData.contactName && currentStep === 2 ? 'has-error' : ''}`}
//                     aria-describedby="contactName-error"
//                     required
//                   />
//                   {fieldErrors.contactName && (
//                     <span className="error-tooltip" id="contactName-error" role="alert">
//                       {fieldErrors.contactName}
//                     </span>
//                   )}
//                   {!formData.contactName && currentStep === 2 && (
//                     <span className="error-tooltip" id="contactName-error" role="alert">
//                       Name is required
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="contactPhone">Phone</label>
//                   <input
//                     id="contactPhone"
//                     name="contactPhone"
//                     type="tel"
//                     maxLength={PHONE_MAX_LENGTH}
//                     value={formData.contactPhone}
//                     onChange={handleChange}
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
//                     onChange={handleChange}
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
//               <label htmlFor="companyProfile">Provide a brief write up on your Oil Marketing operations.  </label>
//               <p className="note">(within 300 words)</p>
//               <textarea
//                 id="companyProfile"
//                 name="companyProfile"
//                 value={formData.companyProfile}
//                 rows={6}
//                 // maxLength={COMPANY_PROFILE_MAX_LENGTH}
//                 onChange={handleChange}
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
//               {data.filter(section => parseFloat(section.num) >= 1 && parseFloat(section.num) <= 6.2).length > 0 && (
//                 <table className="quant-table">
//                   <thead>
//                     <tr>
//                       <th>S.No</th>
//                       <th>Particulars</th>
//                       <th></th>
//                       <th></th>
//                       <th>2024-25</th>
//                       <th>2023-24</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data
//                       .filter(section => parseFloat(section.num) >= 1 && parseFloat(section.num) <= 6.2)
//                       .map(section => renderSection(section))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </>
//         )}

//         {currentStep === 4 && (
//           <>
//             <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
//             <div className="quantitative-form">
//               {data.filter(section => parseFloat(section.num) >= 7 && parseFloat(section.num) <= 14.3).length > 0 && (
//                 <>
//                   <table className="quant-table">
//                     <thead>
//                       <tr>
//                         <th>S.No</th>
//                         <th>Particulars</th>
//                         <th></th>
//                         <th></th>
//                         <th>2024-25</th>
//                         <th>2023-24</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {data
//                         .filter(section => parseFloat(section.num) >= 7 && parseFloat(section.num) <= 12.2)
//                         .map(section => renderSection(section))}
//                     </tbody>
//                   </table>
//                   <table className="quant-table">
//                     <thead>
//                       <tr>
//                         <th>S.No</th>
//                         <th>Particulars</th>
//                         <th></th>
//                         <th></th>
//                         <th>2024-25</th>

//                       </tr>
//                     </thead>
//                     <tbody>
//                       {data
//                         .filter(section => parseFloat(section.num) >= 13 && parseFloat(section.num) <= 14.2)
//                         .map(section => renderSection(section))}
//                     </tbody>
//                   </table>

//                   <div className="form-group">
//                     <label htmlFor="comment">Comments</label>
//                     <textarea
//                       id="comment"
//                       name="comment"
//                       value={formData.comment}
//                       onChange={handleChange}
//                       className="form-textarea"
//                       placeholder="Comments in (200 words) against input parameter, if any"
//                       rows={4}
//                     />
//                     {fieldErrors.comment && (
//                       <span className="error-tooltip" id="comment-error" role="alert">
//                         {fieldErrors.comment}
//                       </span>
//                     )}
//                   </div>
//                 </>
//               )}
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
//                   onChange={handleChange}
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
//             {awardTitle}
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

// export default RegistrationOM;

import React, { useState, useEffect, useCallback } from 'react';
// import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import apiClient from '../api/axiosClient';
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

const RegistrationOM = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const awardTitle = location.state?.awardTitle || 'Oil Marketing Company of the Year';

  // Form state initialization
  const [formData, setFormData] = useState({
    Organisationname: '',
    category: 'Oil Marketing Company of the Year',
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
    domesticVolumeMMT2024: '',
    domesticVolumeMMT2023: '',
    domesticSalesRevenue2024: '',
    domesticSalesRevenue2023: '',
    exportVolumeMMT2024: '',
    exportVolumeMMT2023: '',
    exportSalesRevenue2024: '',
    exportSalesRevenue2023: '',
    domesticMarketShare2024: '',
    domesticMarketShare2023: '',
    retailMS2024: '',
    retailMS2023: '',
    retailHSD2024: '',
    retailHSD2023: '',
    retailOutlets2024: '',
    retailOutlets2023: '',
    salesPerEmployeeTotal2024: '',
    salesPerEmployeeTotal2023: '',
    salesPerEmployeeCount2024: '',
    salesPerEmployeeCount2023: '',
    lubricantsSales2024: '',
    lubricantsSales2023: '',
    fuelsSales2024: '',
    fuelsSales2023: '',
    tankageMS2024: '',
    tankageMS2023: '',
    tankageHSD2024: '',
    tankageHSD2023: '',
    tankageEthanol2024: '',
    tankageEthanol2023: '',
    automatedROs2024: '',
    automatedROs2023: '',
    totalROs2024: '',
    totalROs2023: '',
    nonCashSales2024: '',
    nonCashSales2023: '',
    totalSales2024: '',
    totalSales2023: '',
    gpsTrucks2024: '',
    gpsTrucks2023: '',
    totalTrucks2024: '',
    totalTrucks2023: '',
    complaintsNumber2024: '',
    complaintsNumber2023: '',
    complaintsTurnaround2024: '',
    complaintsTurnaround2023: '',
    evStations2024: '',
    evStations2023: '',
    h2Stations2024: '',
    h2Stations2023: '',
    cbgSales2024: '',
    cbgSales2023: '',
    lpgConsumption2024: '',
    lpgConsumption2023: '',
    biofuelsInvestment2024: '',
    biofuelsInvestment2023: '',
    totalCapex2024: '',
    totalCapex2023: '',
    ethanolBlendingActual2024: '',
    // ethanolBlendingActual2023: '',
    ethanolBlendingTarget2024: '',
    // ethanolBlendingTarget2023: '',
    fatalities2024: '',
    // fatalities2023: '',
    hoursWorked2024: '',
    hoursWorked2023: '',
    domesticsales1: "",
    domesticsales2: "",
    export1: "",
    export2: "",
    ethanol: "",
    safety: "",


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
      const prefillRaw = sessionStorage.getItem('registrationOM_prefill');
      if (prefillRaw) {
        const prefill = JSON.parse(prefillRaw);
        if (prefill && typeof prefill === 'object') {
          setFormData((prev) => ({ ...prev, ...prefill }));
          if (prefill.step) setCurrentStep(Number(prefill.step));
        }
        // remove after consuming so it doesn't override later edits
        sessionStorage.removeItem('registrationOM_prefill');
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
        const draftRaw = localStorage.getItem('registrationOMDraft');
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
      }


      // if ((type === 'text') && value.length > applicableMaxLength) {
      //   alert(`Your value does not exceed more than ${applicableMaxLength} characters.`);
      //   return;
      // } else {
      //   clearFieldError(name);
      // }


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

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'Organisationname' && value && currentStep === 1) setError('');
    if (name === 'mailingAddress' && value.trim() && currentStep === 1) setError('');
    if (name === 'authorityName' && value && currentStep === 2) setError('');
    if (name === 'authorityTitle' && value && currentStep === 2) setError('');
    if (name === 'authorityEmail' && value && currentStep === 2) setError('');
    if (name === 'authorityPhone' && value && currentStep === 2) setError('');
  };

  const handleCopyApplicantToggle = (e) => {
    const checked = e.target.checked;
    setCopyApplicantData(checked);

    if (checked) {
      // Read latest user_info directly from localStorage (as requested)
      let user = {};
      try {
        const raw = localStorage.getItem("user_info");
        if (raw) user = JSON.parse(raw);
      } catch (err) {
        console.warn("Failed to parse user_info from localStorage on copy toggle:", err);
      }

      // Prefer user.applicant_name & user.applicant_phone & user.email, but fallback to formData applicant fields
      setFormData((prev) => ({
        ...prev,
        contact_name: user.applicant_name || prev.applicant_name || "",
        contact_phone: user.applicant_phone || prev.applicant_phone || "",
        contact_email: user.email || prev.applicant_email || "",
      }));

      // Remove any validation errors on those fields
      clearFieldError("contact_name");
      clearFieldError("contact_phone");
      clearFieldError("contact_email");
    } else {
      // When unchecked: clear contact_* so user can manually enter
      setFormData((prev) => ({
        ...prev,
        contact_name: "",
        contact_phone: "",
        contact_email: "",
      }));
      clearFieldError("contact_name");
      clearFieldError("contact_phone");
      clearFieldError("contact_email");
    }
  };

  // Keep contact fields in sync if checkbox ON and applicant fields (or localStorage) change
  // This effect reads live values from localStorage to honor "pick data from localStorage" requirement.
  useEffect(() => {
    if (!copyApplicantData) return;

    let user = {};
    try {
      const raw = localStorage.getItem("user_info");
      if (raw) user = JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to parse user_info from localStorage in sync effect:", err);
    }

    setFormData((prev) => ({
      ...prev,
      contact_name: user.applicant_name || prev.applicant_name || "",
      contact_phone: user.applicant_phone || prev.applicant_phone || "",
      contact_email: user.email || prev.applicant_email || "",
    }));

    clearFieldError("contact_name");
    clearFieldError("contact_phone");
    clearFieldError("contact_email");
    // We intentionally do not add formData.* to the dependency array here that would cause infinite loops.
    // The dependency below ensures we re-run when copyApplicantData toggles.
  }, [copyApplicantData, clearFieldError]);



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
        <p><strong>Mailing Address:</strong> ${formData.mailingAddress || ''}</p>
        <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
        <p><strong>Authority Designation:</strong> ${formData.authorityTitle || ''}</p>
        <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
        <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>
        <h2>Contacts Nodal Officials:</h2>
        <p><strong>Contact Name:</strong> ${formData.contact_name || ''}</p>
        <p><strong>Contact Phone:</strong> ${formData.contact_phone || ''}</p>
        <p><strong>Contact Email:</strong> ${formData.contact_email || ''}</p>
        <p><strong>Company Profile:</strong> ${formData.companyProfile || ''}</p>
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
      ${renderQuantitativePrint(1, 6.2, true)}
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
      ${renderQuantitativePrint(7, 12.2, true)}
    </tbody>
  </table>

  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <thead>
      <tr>
        <th style="border: 1px solid #000; padding: 8px;">S.No</th>
        <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
        <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
      </tr>
    </thead>
    <tbody>
      ${renderQuantitativePrint(13, 14.2, false)}
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
      <h2>Authority Signature:</h2>
        <p><strong>Name:</strong> ${formData.authorityName || ''}</p>
        <p><strong>Title:</strong> ${formData.authorityTitle || ''}</p>
        <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
        <h2>Approving Authority Signature:</h2>
      </div>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
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
      // if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
      //   alert('Authority phone must be exactly 10 digits.');
      //   return;
      // }
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
    if (currentStep === 3 && areFieldsEmpty(1.1, 6.2)) {
      if (!window.confirm('Data not entered,If you wish to continue?')) {
        return; // halt navigation
      }
    }
    if (currentStep === 4 && areFieldsEmpty(7.1, 14.2)) {
      if (!window.confirm('Data not entered,If you wish to continue?')) {
        return; // halt navigation
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
      localStorage.setItem('registrationOMDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 0) Seed from localStorage
    try {
      const raw = localStorage.getItem("user_info");
      if (raw) {
        const user = JSON.parse(raw);
        setFormData((prev) => ({
          ...prev,
          firstname: user.first_name || "",
          lastname: user.last_name || "",
          userid: user.id || "",
          company_name: user.organisation_name || "",
          Organisationname: user.organisation_name || "",
        }));
      }
    } catch (err) {
      console.warn("Failed to load user_info:", err);
    }

    // 1) Basic validations
    if (!formData.declaration) {
      return alert("Please accept the declaration before submitting.");
    }
    if (!/^\d{10}$/.test((formData.authorityPhone || "").replace(/\D/g, ""))) {
      return alert("Authority phone must be exactly 10 digits.");
    }
    // contactPhone is optional, but if filled, validate
    if (formData.contact_phone && !/^\d{10}$/.test(formData.contact_phone.replace(/\D/g, ""))) {
      return alert("Contact phone must be exactly 10 digits.");
    }

    // 2) Build FormData
    const fd = new FormData();

    // — Organisation & User info
    fd.append("organisation_name", formData.Organisationname || "");
    fd.append("category", formData.category);
    fd.append("firstname", formData.firstname || "");
    fd.append("lastname", formData.lastname || "");
    fd.append("userid", formData.userid || "");
    fd.append("company_name", formData.company_name || "");
    fd.append("mailing_address", formData.mailingAddress || "");

    // — Authority
    fd.append("authority_name", formData.authorityName || "");
    fd.append("authority_title", formData.authorityTitle || "");
    fd.append("authority_phone", formData.authorityPhone || "");
    fd.append("authorityLandline", formData.authorityLandline || "");
    fd.append("authority_email", formData.authorityEmail || "");

    // — Copy & Contact
    fd.append("copy_applicant_data", formData.copy_applicant_data ? "true" : "false");
    fd.append("contact_name", formData.contact_name || "");
    fd.append("contact_phone", formData.contact_phone || "");
    fd.append("contact_email", formData.contact_email || "");

    // — Profile, comments, declaration
    fd.append("company_profile", formData.companyProfile || "");
    fd.append("comment", formData.comment || "");
    fd.append("declaration", formData.declaration ? "true" : "false");

    // — Signature file
    if (formData.approvingAuthoritySignature) {
      fd.append("approving_authority_file", formData.approvingAuthoritySignature);
    }

    // 3) Map numeric fields
    const mapping = {
      domesticVolumeMMT2024: "domestic_volume_mmt_2024",
      domesticVolumeMMT2023: "domestic_volume_mmt_2023",
      domesticSalesRevenue2024: "domestic_sales_revenue_2024",
      domesticSalesRevenue2023: "domestic_sales_revenue_2023",
      exportVolumeMMT2024: "export_volume_mmt_2024",
      exportVolumeMMT2023: "export_volume_mmt_2023",
      exportSalesRevenue2024: "export_sales_revenue_2024",
      exportSalesRevenue2023: "export_sales_revenue_2023",
      domesticMarketShare2024: "domestic_market_share_2024",
      domesticMarketShare2023: "domestic_market_share_2023",
      retailMS2024: "retail_ms_2024",
      retailMS2023: "retail_ms_2023",
      retailHSD2024: "retail_hsd_2024",
      retailHSD2023: "retail_hsd_2023",
      retailOutlets2024: "retail_outlets_2024",
      retailOutlets2023: "retail_outlets_2023",
      salesPerEmployeeTotal2024: "sales_per_employee_total_2024",
      salesPerEmployeeTotal2023: "sales_per_employee_total_2023",
      salesPerEmployeeCount2024: "sales_per_employee_count_2024",
      salesPerEmployeeCount2023: "sales_per_employee_count_2023",
      lubricantsSales2024: "lubricants_sales_2024",
      lubricantsSales2023: "lubricants_sales_2023",
      fuelsSales2024: "fuels_sales_2024",
      fuelsSales2023: "fuels_sales_2023",
      tankageMS2024: "tankage_ms_2024",
      tankageMS2023: "tankage_ms_2023",
      tankageHSD2024: "tankage_hsd_2024",
      tankageHSD2023: "tankage_hsd_2023",
      tankageEthanol2024: "tankage_ethanol_2024",
      tankageEthanol2023: "tankage_ethanol_2023",
      automatedROs2024: "automated_ros_2024",
      automatedROs2023: "automated_ros_2023",
      totalROs2024: "total_ros_2024",
      totalROs2023: "total_ros_2023",
      nonCashSales2024: "non_cash_sales_2024",
      nonCashSales2023: "non_cash_sales_2023",
      totalSales2024: "total_sales_2024",
      totalSales2023: "total_sales_2023",
      gpsTrucks2024: "gps_trucks_2024",
      gpsTrucks2023: "gps_trucks_2023",
      totalTrucks2024: "total_trucks_2024",
      totalTrucks2023: "total_trucks_2023",
      complaintsNumber2024: "complaints_number_2024",
      complaintsNumber2023: "complaints_number_2023",
      complaintsTurnaround2024: "complaints_turnaround_2024",
      complaintsTurnaround2023: "complaints_turnaround_2023",
      evStations2024: "ev_stations_2024",
      evStations2023: "ev_stations_2023",
      h2Stations2024: "h2_stations_2024",
      h2Stations2023: "h2_stations_2023",
      cbgSales2024: "cbg_sales_2024",
      cbgSales2023: "cbg_sales_2023",
      lpgConsumption2024: "lpg_consumption_2024",
      lpgConsumption2023: "lpg_consumption_2023",
      biofuelsInvestment2024: "biofuels_investment_2024",
      biofuelsInvestment2023: "biofuels_investment_2023",
      totalCapex2024: "total_capex_2024",
      totalCapex2023: "total_capex_2023",
      ethanolBlendingActual2024: "ethanol_blending_actual_2024",
      ethanolBlendingActual2023: "ethanol_blending_actual_2023",
      ethanolBlendingTarget2024: "ethanol_blending_target_2024",
      ethanolBlendingTarget2023: "ethanol_blending_target_2023",
      fatalities2024: "fatalities_2024",
      fatalities2023: "fatalities_2023",
      hoursWorked2024: "hours_worked_2024",
      hoursWorked2023: "hours_worked_2023",
      domesticsales1: "domesticsales1",
      domesticsales2: "domesticsales2",
      export1: "export1",
      export2: "export2",
      ethanol: "ethanol",
      safety: "safety",
    };

    Object.entries(mapping).forEach(([stateKey, apiField]) => {
      fd.append(apiField, formData[stateKey] || "");
    });

    // 4) Attachments
    [1, 2, 3, 4].forEach((n) => {
      const slot = formData[`attachments${n}`] || {};
      // description
      fd.append(`attachments${n}_desc`, slot.description || "");
      // file
      if (slot.file instanceof File) {
        fd.append(`attachments${n}`, slot.file);
      }
    });



    // 5) POST to API
    // try {
    //   await apiClient.post("/registration-om/", fd, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });

           try {
        localStorage.removeItem('registrationOMDraft');
      } catch (err) {
        // ignore
      }
    alert("Registration-OM submitted successfully!");
    // optionally reset form or set a submitted flag
    setIsSubmitted(true);
    // } catch (err) {
    // console.error("registration-om submission error:", err.response || err);
    // const msg = err.response?.data?.detail || err.message;
    // alert("Submission failed: " + msg);/     
    // }
  };

  const data = [


    { num: "1", label: "Revenue from Sales", key: "" },
    //no input for 1.1     domesticVolumeMMT2024,  domesticVolumeMMT2023
    { num: "1.1", label: "Domestic sales (Rs. Crores)", key: "" },
    { num: '1.1.1', label: 'Sales Volume (MMT)', key: 'domesticVolumeMMT2024' },
    { num: '1.1.2', label: 'Sales Revenue (Rs. Crores)', key: 'domesticSalesRevenue2024' },

    //no input for 1.2 export1 and export 2 variable
    { num: "1.2", label: "Export", key: "" },
    { num: '1.2.1', label: 'Sales Volume (MMT)', key: 'exportVolumeMMT2024' },
    { num: '1.2.2', label: 'Sales Revenue (Rs. Crores)', key: 'exportSalesRevenue2024' },

    { num: "2", label: "	Domestic market share (Only liquid product sales excluding Petrochemicals and Gas) ", key: "" },
    { num: '2.1', label: 'Domestic Market Share %', key: 'domesticMarketShare2024' },

    { num: "3", label: "Retail Sales (MMT)", key: "" },
    { num: '3.1', label: 'MS', key: 'retailMS2024' },
    { num: '3.2', label: 'HSD', key: 'retailHSD2024' },

    { num: '4', label: 'No. of Retail Outlets' },

    { num: "5", label: "Sales per Employee (Only Marketing function employees on the rolls of organisation as on 31 March.) ", key: "" },
    { num: '5.1', label: 'Total Sales (MMT)', key: 'salesPerEmployeeTotal2024' },
    { num: '5.2', label: 'No. of Employees', key: 'salesPerEmployeeCount2024' },

    { num: "6", label: "Sale of Lubricants and Fuels sales (MMT) ", key: "" },
    { num: '6.1', label: 'Sales of Lubricants', key: 'lubricantsSales2024' },
    { num: '6.2', label: 'Sales of Fuels (MS + HSD)', key: 'fuelsSales2024' },

    { num: "7", label: "Tankage Capacity at the year end (MMT)", key: "" },
    { num: '7.1', label: 'MS', key: 'tankageMS2024' },
    { num: '7.2', label: 'HSD', key: 'tankageHSD2024' },
    { num: '7.3', label: 'Ethanol', key: 'tankageEthanol2024' },

    { num: "8", label: "Digital Initiative (Number)", key: "" },
    { num: '8.1', label: 'Total Automated ROs', key: 'automatedROs2024' },
    { num: '8.1.1', label: 'Total ROs', key: 'totalROs2024' },
    { num: '8.2', label: 'Total Non-Cash sales', key: 'nonCashSales2024' },
    { num: '8.2.1', label: 'Total sales', key: 'totalSales2024' },
    { num: '8.3', label: 'GPS Enabled Trucks', key: 'gpsTrucks2024' },
    { num: '8.3.1', label: 'Total No. of Trucks', key: 'totalTrucks2024' },

    { num: "9", label: "Customer Complaints redressal", key: "" },
    { num: '9.1', label: 'No. of Complaints', key: 'complaintsNumber2024' },
    { num: '9.2', label: 'Average customer complaint turn-around time (No. of days)', key: 'complaintsTurnaround2024' },

    { num: "10", label: "New Energy Based facilities-EV/H2/CBG added in the RO ", key: "" },
    { num: '10.1', label: 'Fast charging EV Stations (as provided to MoP&NG) (No.) ', key: 'evStations2024' },
    { num: '10.2', label: 'H2 Dispensing Station (No.)', key: 'h2Stations2024' },
    { num: '10.3', label: 'CBG (sales in MT)', key: 'cbgSales2024' },

    { num: "11", label: "LPG - per capita consumption of PMUY customers ", key: "" },
    { num: '11.1', label: 'LPG per capita consumption of PMUY customers (No.)', key: 'lpgConsumption2024' },

    { num: "12", label: "Investment in Bio-fuels (% of total capex) (CBG plant, Ethanol Plant) (Rs. Crores) ", key: "" },
    { num: '12.1', label: 'Actual Investment', key: 'biofuelsInvestment2024' },
    { num: '12.2', label: 'Total Capex', key: 'totalCapex2024' },

    { num: "13", label: "Progress in Ethanol Blending Programme in %", key: "" },
    { num: '13.1', label: 'Actual Ethanol Blending', key: 'ethanolBlendingActual2024' },
    { num: '13.2', label: 'Ethanol Blending Target', key: 'ethanolBlendingTarget2024' },

    { num: "14", label: "Safety", key: "" },
    { num: '14.1', label: 'No. of fatalities (own employees + contract employees)', key: 'fatalities2024' },
    { num: '14.2', label: 'Total No. of hours worked by all employees (including contract employees) in marketing function', key: 'hoursWorked2024' },
  ];

  const areFieldsEmpty = (start, end) => {
    const flattenedItems = [];

    // Recursive extractor to handle nested subItems and top-level keys
    const extractItems = (items) => {
      for (const item of items) {
        if (item.key) {
          flattenedItems.push({ num: parseFloat(item.num), key: item.key });
        }
        if (item.subItems && Array.isArray(item.subItems)) {
          extractItems(item.subItems);
        }
      }
    };

    extractItems(data);

    // Filter by the given range
    const filteredItems = flattenedItems.filter(
      (item) => item.num >= start && item.num <= end
    );

    // Check only fields that are actually in formData
    for (const item of filteredItems) {
      if (Object.prototype.hasOwnProperty.call(formData, item.key)) {
        const val = formData[item.key];

        if (val === null || val === "") {
          return true; // key exists but empty
        }

        if (Array.isArray(val) && val.some(v => v === "" || v === null || v === undefined)) {
          return true;
        }
      }
      // if key not present in formData → skip it
    }

    return false;
  };

  const handlethankyou = () => {
    setIsSubmitted(false);
    // go to /fipiawards and then set the hash
    navigate("/fipiawards");
    ;
  };




  const renderQuantitativePrint = (start, end, twoYears = true) => {
    return data
      .filter(section => parseFloat(section.num) >= start && parseFloat(section.num) <= end)
      .map(section => {
        const val2024 = formData[section.key?.replace("2023", "2024")] || "";
        const val2023 = twoYears
          ? formData[section.key?.replace("2024", "2023")] || ""
          : null;

        return `
        <tr>
          <td style="border: 1px solid #000; padding: 8px;">${section.num}</td>
          <td style="border: 1px solid #000; padding: 8px;">${section.label}</td>
          <td style="border: 1px solid #000; padding: 8px;">${val2024}</td>
          ${twoYears ? `<td style="border: 1px solid #000; padding: 8px;">${val2023}</td>` : ""}
        </tr>
      `;
      })
      .join("");
  };


  // Rendering steps content
  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;
    const years = ['2024-25', '2023-24'];

    const renderSection = (section) => {
      const isSingleYear = section.num.startsWith("13") || section.num.startsWith("14");

      // List of header numbers
      const headerNums = [
        "1", "1.1", "1.2", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"
      ];

      const isHeaderRow = headerNums.includes(section.num);

      if (isHeaderRow) {
        return (
          <tr key={section.num}>
            <td colSpan="1"
              style={{ color: "black", fontWeight: "bold" }}>
              {section.num}
            </td>
            <td colSpan="7"
              style={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
              <p style={{ margin: 0 }}>{section.label}</p>
            </td>
          </tr>

        );
      }

      // --- Normal rows with inputs ---
      return (
        <tr key={section.num}>
          {/* Serial Number */}
          <td className="sno-cell">{section.num}</td>

          {/* Label */}
          <td className="label-cell" colSpan={3}>
            <p>{section.label}</p>
          </td>

          {isSingleYear ? (
            <td colSpan={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="text" // prevent browser number spinners
                name={section.key2024 || section.key?.replace("2023", "2024")}
                value={formData[section.key2024 || section.key?.replace("2023", "2024")] || ""}
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
                  // Block '-', '+', 'e', 'E', arrow keys
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
          ) : (
            <>
              <td>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="text" // prevent browser number spinners
                  name={section.key2024 || section.key?.replace("2023", "2024")}
                  value={formData[section.key2024 || section.key?.replace("2023", "2024")] || ""}
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
                    // Block '-', '+', 'e', 'E', arrow keys
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
              {/* type="text"
  name={section.key2024}
  value={formData[section.key2024] || ""}
  onChange={(e) => {
    // Allow only digits
    if (/^\d*$/.test(e.target.value)) {
      handleChange(e);
    }
  }}
  className="form-input"
  inputMode="numeric"   // brings up numeric keyboard on mobile
  pattern="[0-9]*"      
 */}

              <td>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="text" // prevent browser number spinners
                  name={section.key2023 || section.key?.replace("2024", "2023")}
                  value={formData[section.key2023 || section.key?.replace("2024", "2023")] || ""}
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
                    // Block '-', '+', 'e', 'E', arrow keys
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
            </>
          )}
        </tr>
      );
    };








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
                // disabled={true}
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
            <h3 className="step-title">Step 2:Approving Authority & Contact</h3>
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
                    Landline:{" "}
                    <span className="text-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="authorityLandline"
                    type="number"
                    name="authorityLandline"
                    value={formData.authorityLandline}
                    onChange={handleChange}
                    // onBlur={(e) => handleBlur('authorityLandline', e.target.value)}
                    className={`form-input ${!formData.authorityLandline && currentStep === 2
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
                    <span className="text-red" aria-hidden="true"></span>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    placeholder="Contact email"
                    disabled={copyApplicantData}
                    className={`form-input ${fieldErrors.contact_email ? "has-error" : ""}`}
                    aria-describedby="contact_email-error"
                  />
                </div>

              </section>
            </div>

            <div className="form-group">
              <label htmlFor="companyProfile">Provide a brief write up on your Oil Marketing operations.  </label>
              <p className="note">(within 300 words)</p>
              <textarea
                id="companyProfile"
                name="companyProfile"
                value={formData.companyProfile}
                rows={6}
                // maxLength={COMPANY_PROFILE_MAX_LENGTH}
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
            <div className="quantitative-form">
              {data.filter(section => parseFloat(section.num) >= 1 && parseFloat(section.num) <= 6.2).length > 0 && (
                <table className="quant-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Particulars</th>
                      <th></th>
                      <th></th>
                      <th>2024-25</th>
                      <th>2023-24</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .filter(section => parseFloat(section.num) >= 1 && parseFloat(section.num) <= 6.2)
                      .map(section => renderSection(section))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
            <div className="quantitative-form">
              {data.filter(section => parseFloat(section.num) >= 7 && parseFloat(section.num) <= 14.3).length > 0 && (
                <>
                  <table className="quant-table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Particulars</th>
                        <th></th>
                        <th></th>
                        <th>2024-25</th>
                        <th>2023-24</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .filter(section => parseFloat(section.num) >= 7 && parseFloat(section.num) <= 12.2)
                        .map(section => renderSection(section))}
                    </tbody>
                  </table>
                  <table className="quant-table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Particulars</th>
                        <th></th>
                        <th></th>
                        <th>2024-25</th>

                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .filter(section => parseFloat(section.num) >= 13 && parseFloat(section.num) <= 14.2)
                        .map(section => renderSection(section))}
                    </tbody>
                  </table>

                  <div className="form-group">
                    <label htmlFor="comment">Comments</label>
                    <textarea
                      id="comment"
                      name="comment"
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
          <h1>
            {awardTitle}
          </h1>
          <h6>Step {currentStep} of 5</h6>
        </div>
        {error && <div className="error">{error}</div>}
        {isSubmitted ? (
          <div className="thank-you-message">
            <h2>Thank you for your submission!</h2>
            <p>Your application has been successfully submitted.</p>
            <button onClick={handlethankyou}>
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

export default RegistrationOM;






