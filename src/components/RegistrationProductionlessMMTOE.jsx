// import React, { useState } from 'react';
// import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../styles/FormProduction.css';

// const initialProject = {
//   name: '',
//   boardApprovalDate: '',
//   startDate: '',
//   completionDate: '',
//   capex: '',
//   remarks: ''
// };

// const RegistrationProductionlessMMTOE = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     Organisationname: '',
//     category: 'Oil & Gas Production Company of the Year (< 1 MMTOE)',
//     Firstname: '',
//     Lastname: '',
//     userid: '',
//     companyName: '',
//     mailingAddress: '',
//     authorityName: '',
//     authorityTitle: '',
//     authorityPhone: '',
//     authorityEmail: '',
//     authoritySignature: '',
//     copyApplicantData: false,
//     contactName: '',
//     contactPhone: '',
//     contactEmail: '',
//     companyProfile: '',
//     awardJustification: '',
//     approvingAuthoritySignature: '',
//     declaration: false,
//     comment: '',
//     '1_totalOil': ['', ''],
//     '2_totalGas': ['', ''],
//     '3_costPerBOE': ['', ''],
//     '4_iorEorCapex': ['', ''],
//     '5_totalEnergy': ['', ''],
//     '5.1_companyEnergy': ['', ''],
//     '5.2_totalCapex': ['', ''],
//     '5.3_totalOpex': ['', ''],
//     '5.4_productionCapex': ['', ''],
//     '5.5_productionOpex': ['', ''],
//     '6_co2Emission': ['', ''],
//     '8_fatalities': ['', ''],
//     '9_lostTimeInjuries': ['', ''],
//     '10_oshaIncidents': ['', ''],
//     '11_ownManHours': ['', ''],
//     '12_contractManHours': ['', ''],

//         project1_name: '',
//         project1_boardApprovalDate: '',
//         project1_startDate: '',
//         project1_completionDate: '',
//         project1_capex: '',
//         project1_remarks: '',
//         project2_name: '',
//         project2_boardApprovalDate: '',
//         project2_startDate: '',
//         project2_completionDate: '',
//         project2_capex: '',
//         project2_remarks: '',
//         project3_name: '',
//         project3_boardApprovalDate: '',
//         project3_startDate: '',
//         project3_completionDate: '',
//         project3_capex: '',
//         project3_remarks: '',
//         project4_name: '',
//         project4_boardApprovalDate: '',
//         project4_startDate: '',
//         project4_completionDate: '',
//         project4_capex: '',
//         project4_remarks: '',
//         project5_name: '',
//         project5_boardApprovalDate: '',
//         project5_startDate: '',
//         project5_completionDate: '',
//         project5_capex: '',
//         project5_remarks: '',


//     attachments1: { description: '', file: null },
//     attachments2: { description: '', file: null },
//     attachments3: { description: '', file: null },
//     attachments4: { description: '', file: null },
//   });

//   const [projects, setProjects] = useState(() => Array(5).fill().map(() => ({ ...initialProject })));
//   const [error, setError] = useState('');
//   const [copyApplicantData, setCopyApplicantData] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   console.log('location.state:', location.state);
//   const awardTitle = location.state?.awardTitle || "Oil & Gas Production Company of the Year";

//   const handleChange = (name, value, index = null) => {

//     if (["Firstname", "Lastname", "authorityName", "contactName"].includes(name)) {
//       const isValid = /^[A-Za-z\s]*$/.test(value);
//       if (!isValid) return;
//     }

//     if (index !== null) {
//       setFormData(prev => {
//         const updatedArray = [...prev[name]];
//         updatedArray[index] = value;
//         return {
//           ...prev,
//           [name]: updatedArray
//         };
//       });
//     } else {
//       if (name === 'authorityPhone') {
//         const numericValue = value.replace(/\D/g, '').slice(0, 10);
//         setFormData(prev => ({ ...prev, [name]: numericValue }));
//         if (numericValue.length > 10) {
//           setError('Authority phone number must not exceed 10 digits.');
//         } else {
//           setError('');
//         }
//       } else {
//         setFormData(prev => ({ ...prev, [name]: value }));
//       }
//     }

//     if (name === 'Organisationname' && !value && currentStep === 1) {
//       setError('Organisation name is required.');
//     } else if (name === 'mailingAddress' && !value.trim() && currentStep === 1) {
//       setError('Mailing address is required.');
//     } else if (name === 'authorityName' && !value && currentStep === 2) {
//       setError('Authority name is required.');
//     } else if (name === 'authorityTitle' && !value && currentStep === 2) {
//       setError('Authority designation is required.');
//     } else {
//       setError('');
//     }
//   };

//   // const validateForm = () => {
//   //   const errors = {};

//   //   if (!formData.Organisationname?.trim()) {
//   //     errors.Organisationname = 'Organisation name is required';
//   //   }
//   //   if (!formData.authorityName?.trim()) {
//   //     errors.authorityName = 'Authority name is required';
//   //   }
//   //   if (!formData.authorityTitle?.trim()) {
//   //     errors.authorityTitle = 'Authority Designation is required';
//   //   }


//   //   if (!formData.contactEmail?.trim()) {
//   //     errors.contactEmail = 'Email is required';
//   //   } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
//   //     errors.contactEmail = 'Invalid email format';
//   //   }

//   //   return errors;
//   // };

//   const handleAttachmentChange = (key, field, value) => {
//     if (field === 'file' && value) {
//       const file = value;
//       const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

//       if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
//         setError('Only JPG, PNG, and PDF files are allowed for attachments.');
//         return;
//       }
//       if (file.size > maxSizeInBytes) {
//         setError('File size must not exceed 5 MB for attachments.');
//         return;
//       }
//       setError('');
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         [field]: field === 'file' ? value : value
//       }
//     }));
//   };



//   // const handleProjectChange = (index, field, value) => {
//   //   const updatedProjects = [...projects];
//   //   updatedProjects[index] = { ...updatedProjects[index], [field]: value };
//   //   setProjects(updatedProjects);
//   // };

//   const nextStep = () => {
//     if (currentStep === 1 && !formData.Organisationname) {
//       setError('Organisation name is required.');
//       return;
//     }
//     if (currentStep === 1 && !formData.mailingAddress.trim()) {
//       setError('Mailing address is required.');
//       return;
//     }
//     if (currentStep === 2 && !formData.authorityName) {
//       setError('Authority name is required.');
//       return;
//     }
//     if (currentStep === 2 && !formData.authorityTitle) {
//       setError('Authority designation is required.');
//       return;
//     }
//     setError('');
//     if (currentStep < 5) {
//       setCurrentStep(prev => prev + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(prev => prev - 1);
//   };

//   const saveDraft = () => {
//     localStorage.setItem('registrationProductionDraft', JSON.stringify({ formData, projects }));
//     alert('Draft Saved!');
//   };

//   const handleApprovingAuthorityChange = (files) => {
//     if (files && files.length > 0) {
//       const file = files[0];
//       const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

//       if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
//         setError('Only JPG, PNG, and PDF files are allowed.');
//         return;
//       }
//       if (file.size > maxSizeInBytes) {
//         setError('File size must not exceed 5 MB.');
//         return;
//       }
//       setError('');
//       setFormData(prev => ({ ...prev, approvingAuthoritySignature: file }));
//     }
//   };

// async function handleSubmit(e) {
//   e.preventDefault();

//   // 1) Must accept the declaration
//   if (!formData.declaration) {
//     return alert("Please accept the declaration.");
//   }

//   const fd = new FormData();

//   // 2) Always include these required four fields
//   fd.append("organisation_name", formData.Organisationname || "");
//   fd.append("category",           formData.category         || "");
//   fd.append("mailing_address",    formData.mailingAddress   || "");
//   fd.append("authority_name",     formData.authorityName    || "");

//   // 3) Signature file is required
//   if (formData.approvingAuthoritySignature instanceof File) {
//     fd.append("approving_authority_file", formData.approvingAuthoritySignature);
//   } else {
//     // still append empty so DRF sees the key
//     fd.append("approving_authority_file", "");
//   }

//   // 4) Flat one‑to‑one field mappings (React key → API key)
//   const flatFields = {
//     Firstname:        "firstname",
//     Lastname:         "lastname",
//     userid:           "userid",
//     companyName:      "company_name",
//     contactName:      "contact_name",
//     contactPhone:     "contact_phone",
//     contactEmail:     "contact_email",
//     companyProfile:   "company_profile",
//     awardJustification:"award_justification",
//     comment:          "comment",
//     declaration:      "declaration"
//   };
//   Object.entries(flatFields).forEach(([jsKey, apiKey]) => {
//     let val = formData[jsKey];
//     if (jsKey === "declaration") {
//       val = formData.declaration ? "true" : "false";
//     }
//     if (val != null) {
//       fd.append(apiKey, val);
//     }
//   });

//   // 5) Year‐pair quantitative arrays → two separate fields each
//   const quantMap = [
//     ["1_totalOil",          "total_oil"],
//     ["2_totalGas",          "total_gas"],
//     ["3_costPerBOE",        "cost_per_boe"],
//     ["4_iorEorCapex",       "ior_eor_capex"],
//     ["5_totalEnergy",       "total_energy"],
//     ["5.1_companyEnergy",   "company_energy"],
//     ["5.2_totalCapex",      "total_capex"],
//     ["5.3_totalOpex",       "total_opex"],
//     ["5.4_productionCapex", "production_capex"],
//     ["5.5_productionOpex",  "production_opex"],
//     ["6_co2Emission",       "co2_emission"],
//     ["8_fatalities",        "fatalities"],
//     ["9_lostTimeInjuries",  "lost_time_injuries"],
//     ["10_oshaIncidents",    "osha_incidents"],
//     ["11_ownManHours",      "own_man_hours"],
//     ["12_contractManHours", "contract_man_hours"],
//   ];
//   quantMap.forEach(([jsKey, apiBase]) => {
//     const [y24 = "", y23 = ""] = formData[jsKey] || [];
//     fd.append(`${apiBase}_2024`, y24);
//     fd.append(`${apiBase}_2023`, y23);
//   });

//   // 6) Five discrete project blocks
//   for (let i = 1; i <= 5; i++) {
//     const prefix = `project${i}_`;
//     // matches your model fields
//     const mapping = {
//       name:            "project" + i + "_name",
//       boardApprovalDate:"project" + i + "_board_approval",
//       startDate:        "project" + i + "_start_date",
//       completionDate:   "project" + i + "_completion_date",
//       capex:            "project" + i + "_capex",
//       remarks:          "project" + i + "_remarks",
//     };
//     Object.entries(mapping).forEach(([jsField, apiKey]) => {
//       const val = formData[prefix + jsField];
//       if (val) {
//         fd.append(apiKey, val);
//       }
//     });
//   }

//   // 7) Four flat attachments (desc + file)
//   [1,2,3,4].forEach(n => {
//     const slot = formData[`attachments${n}`] || {};
//     fd.append(`attachments${n}_desc`, slot.description || "");
//     if (slot.file instanceof File) {
//       fd.append(`attachments${n}`, slot.file);
//     }
//   });

//   // 8) Final POST
//   try {
//       const url = `${ACTIVE_API_BASE_URL}/production/`;
//       const res = await fetch(url, {
//       method: "POST",
//       body: fd
//     });
//     if (!res.ok) {
//       const text = await res.text();
//       console.error("API error:", text);
//       return alert("Submission failed; see console for details.");
//     }
//     alert("Submitted successfully!");
//     // reset or redirect as desired
//   } catch (err) {
//     console.error("Network error:", err);
//     alert("Network error; please retry.");
//   }
// }




//   const handlePrint = () => {
//     const printContent = `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h1 style="text-align: center; color: #1e40af;">Registration Form: Oil & Gas Production</h1>
//         <h2>Organization & Contact Details</h2>
//         <p><strong>Organisation Name:</strong> ${formData.Organisationname}</p>
//         <p><strong>Category:</strong> ${formData.category}</p>
//         <p><strong>Mailing Address:</strong> ${formData.mailingAddress}</p>
//         <p><strong>First Name:</strong> ${formData.Firstname}</p>
//         <p><strong>Last Name:</strong> ${formData.Lastname}</p>
//         <p><strong>Email Address:</strong> ${formData.userid}</p>
//         <h2>Company Details</h2>
//         <p><strong>Name of Company:</strong> ${formData.companyName}</p>
//         <p><strong>Authority Name:</strong> ${formData.authorityName}</p>
//         <p><strong>Authority Title:</strong> ${formData.authorityTitle}</p>
//         <p><strong>Authority Phone:</strong> ${formData.authorityPhone}</p>
//         <p><strong>Authority Email:</strong> ${formData.authorityEmail}</p>
//         <p><strong>Contact Name:</strong> ${formData.contactName}</p>
//         <p><strong>Company Profile:</strong> ${formData.companyProfile}</p>
//         <h2>Quantitative Information - Part 1</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th></tr></thead>
//           <tbody>
//             <tr><td>1</td><td>Total oil production (MMT)</td><td>${formData['1_totalOil'][0]}</td><td>${formData['1_totalOil'][1]}</td></tr>
//             <tr><td>2</td><td>Total gas production (BCM)</td><td>${formData['2_totalGas'][0]}</td><td>${formData['2_totalGas'][1]}</td></tr>
//             <tr><td>3</td><td>Cost of production ($/boe)</td><td>${formData['3_costPerBOE'][0]}</td><td>${formData['3_costPerBOE'][1]}</td></tr>
//             <tr><td>4</td><td>Capex in IOR/EOR projects (Crores)</td><td>${formData['4_iorEorCapex'][0]}</td><td>${formData['4_iorEorCapex'][1]}</td></tr>
//             <tr><td>5</td><td>Total Energy Consumed in Production (GJ)</td><td>${formData['5_totalEnergy'][0]}</td><td>${formData['5_totalEnergy'][1]}</td></tr>
//             <tr><td>5.1</td><td>Total Energy Consumed by Company (GJ)</td><td>${formData['5.1_companyEnergy'][0]}</td><td>${formData['5.1_companyEnergy'][1]}</td></tr>
//             <tr><td>5.2</td><td>Total Capex (INR Crores)</td><td>${formData['5.2_totalCapex'][0]}</td><td>${formData['5.2_totalCapex'][1]}</td></tr>
//             <tr><td>5.3</td><td>Total Opex (INR Crores)</td><td>${formData['5.3_totalOpex'][0]}</td><td>${formData['5.3_totalOpex'][1]}</td></tr>
//             <tr><td>5.4</td><td>Capex for Production (INR Crores)</td><td>${formData['5.4_productionCapex'][0]}</td><td>${formData['5.4_productionCapex'][1]}</td></tr>
//             <tr><td>5.5</td><td>Opex for Production (INR Crores)</td><td>${formData['5.5_productionOpex'][0]}</td><td>${formData['5.5_productionOpex'][1]}</td></tr>
//             <tr><td>6</td><td>Total CO2 Emitted (Tonne)</td><td>${formData['6_co2Emission'][0]}</td><td>${formData['6_co2Emission'][1]}</td></tr>
//           </tbody>
//         </table>
//         <h2>Quantitative Information - Part 2</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th></tr></thead>
//           <tbody>
//             <tr><td>8</td><td>No. of Fatalities</td><td>${formData['8_fatalities'][0]}</td><td>${formData['8_fatalities'][1]}</td></tr>
//             <tr><td>9</td><td>Number of lost time injuries</td><td>${formData['9_lostTimeInjuries'][0]}</td><td>${formData['9_lostTimeInjuries'][1]}</td></tr>
//             <tr><td>10</td><td>Number of OSHA recordable incidents</td><td>${formData['10_oshaIncidents'][0]}</td><td>${formData['10_oshaIncidents'][1]}</td></tr>
//             <tr><td>11</td><td>Total Man Hours Worked (Own Employees)</td><td>${formData['11_ownManHours'][0]}</td><td>${formData['11_ownManHours'][1]}</td></tr>
//             <tr><td>12</td><td>Total Man Hours Worked (Contractual Employees)</td><td>${formData['12_contractManHours'][0]}</td><td>${formData['12_contractManHours'][1]}</td></tr>
//           </tbody>
//         </table>
//         <h2>New Projects</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead><tr><th>S. No.</th><th>Project Name</th><th>Board Approval Date</th><th>Start Date</th><th>Completion Date</th><th>Capex (INR Crores)</th><th>Remarks</th></tr></thead>
//           <tbody>
//             <tr><td>1</td><td>${formData.project1_name}</td><td>${formData.project1_boardApprovalDate}</td><td>${formData.project1_startDate}</td><td>${formData.project1_completionDate}</td><td>${formData.project1_capex}</td><td>${formData.project1_remarks}</td></tr>
//             <tr><td>2</td><td>${formData.project2_name}</td><td>${formData.project2_boardApprovalDate}</td><td>${formData.project2_startDate}</td><td>${formData.project2_completionDate}</td><td>${formData.project2_capex}</td><td>${formData.project2_remarks}</td></tr>
//             <tr><td>3</td><td>${formData.project3_name}</td><td>${formData.project3_boardApprovalDate}</td><td>${formData.project3_startDate}</td><td>${formData.project3_completionDate}</td><td>${formData.project3_capex}</td><td>${formData.project3_remarks}</td></tr>
//             <tr><td>4</td><td>${formData.project4_name}</td><td>${formData.project4_boardApprovalDate}</td><td>${formData.project4_startDate}</td><td>${formData.project4_completionDate}</td><td>${formData.project4_capex}</td><td>${formData.project4_remarks}</td></tr>
//             <tr><td>5</td><td>${formData.project5_name}</td><td>${formData.project5_boardApprovalDate}</td><td>${formData.project5_startDate}</td><td>${formData.project5_completionDate}</td><td>${formData.project5_capex}</td><td>${formData.project5_remarks}</td></tr>
//           </tbody>
//         </table>
//         <h2>Step 5: Declaration</h2>
//         <p>I declare that the information submitted is true and complete.</p>
//       </div>
//     `;
//     const printWindow = window.open('', '', 'height=600,width=800');
//     printWindow.document.write(printContent);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   const fullData = [
//     ['1', 'Total oil production during the year (MMT)', '1_totalOil'],
//     ['2', 'Total gas production during the year (BCM)', '2_totalGas'],
//     ['3', 'Cost of production ($/boe)', '3_costPerBOE'],
//     ['4', 'Capex in IOR / EOR projects implementation (in Crores)', '4_iorEorCapex'],
//     ['5', 'Total Energy (GJ) consumed in Production', '5_totalEnergy'],
//     ['5.1', 'Total Energy Consumed by the Company (GJ)', '5.1_companyEnergy'],
//     ['5.2', 'Total Capex of the Company (INR Crores)', '5.2_totalCapex'],
//     ['5.3', 'Total Opex of the Company (INR Crores)', '5.3_totalOpex'],
//     ['5.4', 'Capex for Production (INR Crores)', '5.4_productionCapex'],
//     ['5.5', 'Opex for Production (INR Crores)', '5.5_productionOpex'],
//     ['6', 'Total Carbon dioxide Emitted (Tonne) in Production', '6_co2Emission'],
//     ['8', 'No. of Fatalities', '8_fatalities'],
//     ['9', 'Number of lost time injuries', '9_lostTimeInjuries'],
//     ['10', 'Number of OSHA recordable incidents', '10_oshaIncidents'],
//     ['11', 'Total Man Hours Worked (Own Employees)', '11_ownManHours'],
//     ['12', 'Total Man Hours Worked (Contractual Employees)', '12_contractManHours'],
//   ];

//   const part1 = fullData.filter(([num]) => parseFloat(num) <= 8);
//   const part2 = fullData.filter(([num]) => parseFloat(num) > 8);

//   const renderStepContent = () => {
//     const progress = ((currentStep - 1) / 4) * 100;
//     return (
//       <div className="form-step">
//         <div className="progress-bar">
//           <div className="progress" style={{ width: `${progress}%` }}></div>
//         </div>

//         {currentStep === 1 && (
//           <div>
//             <h3 className="step-title">Step 1: Organization Details</h3>
//             <div className="form-group">
//               <label>Organisation Name <span className="text-red">*</span></label>
//               <input
//                 type="text"
//                 name="Organisationname"
//                 value={formData.Organisationname}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
//                     handleChange('Organisationname', value);
//                   }
//                 }}
//                 className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
//               />
//               {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
//             </div>
//             <div className="form-group">
//               <label>Select Category<span className="text-red">*</span></label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={(e) => handleChange('category', e.target.value)}
//                 className={`form-input ${!formData.category && currentStep === 1 ? 'has-error' : ''}`}
//               >
//                 <option value="">Select Category</option>
//                 <option value="Exploration Company of the Year">Exploration Company of the Year</option>
//                 <option value="Oil & Gas Production Company of the Year (< 1 MMTOE)">Oil & gas Production Company of the year Less than 1 MTOE</option>
//                 <option value="Oil & gas Production Company of the year (>=1 MMTOE)">Oil & gas Production Company of the year More than or equal to 1 MMTOE</option>
//                 <option value="Goal Net Zero Company of the Year">Goal Net Zero Company of the Year</option>
//                 <option value="Green Hydrogen Company of the Year">Green Hydrogen Company of the Year</option>
//                 <option value="Overseas Oil & Gas Company of the Year">Overseas Oil & Gas Company of the Year</option>
//                 <option value="Digital Technology Provider of the Year">Digital Technology Provider of the Year</option>
//                 <option value="Service Provider of the Year">Service Provider of the Year</option>
//                 <option value="Pipeline Transportation Company of the Year">Pipeline Transportation Company of the Year</option>
//                 <option value="Oil Marketing Company of the Year">Oil Marketing Company of the Year</option>
//                 <option value="Human Resource Management">Human Resource Management</option>
//                 <option value="CBG Company of the Year">CBG Company of the Year</option>
//                 <option value="CGD Company of the Year">CGD Company of the Year</option>
//                 <option value="Best Managed Project of the Year">Best Managed Project of the Year</option>
//                 <option value="Refinery of the Year">Refinery of the Year</option>
//                 <option value="Innovator of the year (team)">Innovator of the year (team)</option>
//                 <option value="Woman Executive of the Year">Woman Executive of the Year</option>
//                 <option value="Young Achiever of the Year(Male)">Young Achiever of the Year(Male)</option>
//                 <option value="Young Achiever of the Year(Female)">Young Achiever of the Year(Female)</option>
//               </select>
//               {!formData.category && currentStep === 1 && <span className="error-tooltip">Category is required</span>}
//             </div>
//             <div className="form-group">
//               <label>Postal Address <span className="text-red">*</span></label>
//               <textarea
//                 name="mailingAddress"
//                 value={formData.mailingAddress}
//                 onChange={(e) => handleChange('mailingAddress', e.target.value)}
//                 className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1 ? 'has-error' : ''}`}
//                 rows={3}
//                 placeholder="Enter Postal address"
//               />
//               {!formData.mailingAddress.trim() && currentStep === 1 && <span className="error-tooltip">Mailing address is required</span>}
//             </div>
//           </div>
//         )}

//         {currentStep === 2 && (
//           <div>
//             <h3 className="step-title">Step 2: Authority & Contact Details</h3>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="step-section">
//                 <h4>Approving Authority</h4>
//                 <div className="form-group">
//                   <label>Name <span className="text-red">*</span></label>
//                   <input
//                     type="text"
//                     name="authorityName"
//                     value={formData.authorityName}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
//                         handleChange('authorityName', value);
//                       }
//                     }}
//                     className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
//                     placeholder="Name"
//                   />
//                   {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Authority name is required</span>}
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="authorityTitle"
//                     value={formData.authorityTitle}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
//                         handleChange('authorityTitle', value);
//                       }
//                     }}
//                     className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
//                     placeholder="Designation"
//                   />
//                   {!formData.authorityTitle && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="tel"
//                     name="authorityPhone"
//                     value={formData.authorityPhone}
//                     onChange={(e) => handleChange('authorityPhone', e.target.value)}
//                     className={`form-input ${error ? 'has-error' : ''}`}
//                     placeholder="Phone number"
//                     maxLength={10}
//                   />
//                   {error && <span className="error-tooltip">{error}</span>}
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     name="authorityEmail"
//                     value={formData.authorityEmail}
//                     onChange={(e) => handleChange('authorityEmail', e.target.value)}
//                     className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
//                     placeholder="E-mail address"
//                   />
//                   {!formData.authorityEmail && currentStep === 2 && <span className="error-tooltip">Email is required</span>}
//                 </div>
//               </div>
//               <div className="step-section">
//                 <h4>Contacts (Nodal Officials) <span className="text-red">*</span></h4>
//                 <div className="form-group">
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="copyApplicantData"
//                       checked={copyApplicantData}
//                       onChange={(e) => {
//                         setCopyApplicantData(e.target.checked);
//                         if (e.target.checked) {
//                           setFormData({
//                             ...formData,

//                             contactEmail: formData.authorityEmail || '',
//                             contactPhone: formData.authorityPhone || '',
//                           });
//                         } else {
//                           setFormData({
//                             ...formData,

//                             contactEmail: '',
//                             contactPhone: '',
//                           });
//                         }
//                       }}
//                       className="form-checkbox"
//                     /> Same as applicant
//                   </label>
//                 </div>
//                 <div className="form-group">


//                   <input
//                     type="text"
//                     name="contactName"
//                     value={formData.contactName}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (/^[A-Za-z\s]*$/.test(value)) {
//                         handleChange('contactName', value);
//                       }
//                     }}
//                     className="form-input"
//                     placeholder="Name"
//                   />



//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="tel"
//                     name="contactPhone"
//                     value={formData.contactPhone}
//                     onChange={(e) => handleChange('contactPhone', e.target.value)}
//                     className="form-input"
//                     placeholder="Phone number"
//                     maxLength={10}
//                     disabled={copyApplicantData}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     name="contactEmail"
//                     value={formData.contactEmail}
//                     onChange={(e) => handleChange('contactEmail', e.target.value)}
//                     className="form-input"
//                     placeholder="E-mail address"
//                     disabled={copyApplicantData}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Company Profile and Activities (2024–25)</label>
//               <p className="note">Write-up (max 300 words) — Operations during 2024–25</p>
//               <textarea
//                 name="companyProfile"
//                 value={formData.companyProfile}
//                 onChange={(e) => handleChange('companyProfile', e.target.value)}
//                 className="form-textarea"
//                 rows={6}
//                 maxLength={300}
//               />
//             </div>
//           </div>
//         )}

//         {currentStep === 3 && (
//           <div>
//             <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Particulars</th>
//                   <th>2024–25</th>
//                   <th>2023–24</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {part1.map(([num, label, key]) => (
//                   <tr key={key}>
//                     <td>{num}</td>
//                     <td>{label}</td>
//                     <td>
//                       <input
//                         type="number"
//                         value={formData[key][0] || ''}
//                         onChange={(e) => handleChange(key, e.target.value, 0)}
//                         className="form-input"
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         value={formData[key][1] || ''}
//                         onChange={(e) => handleChange(key, e.target.value, 1)}
//                         className="form-input"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {currentStep === 4 && (
//           <div>
//             <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Particulars</th>
//                   <th>2024–25</th>
//                   <th>2023–24</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {part2.map(([num, label, key]) => (
//                   <tr key={key}>
//                     <td>{num}</td>
//                     <td>{label}</td>
//                     <td>
//                       <input
//                         type="number"
//                         value={formData[key][0] || ''}
//                         onChange={(e) => handleChange(key, e.target.value, 0)}
//                         className="form-input"
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         value={formData[key][1] || ''}
//                         onChange={(e) => handleChange(key, e.target.value, 1)}
//                         className="form-input"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <h3 style={{ marginTop: '40px' }}>New Projects Initiated to Augment Production (Board Approved)</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Project Name</th>
//                   <th>Board Approval Date</th>
//                   <th>Start Date</th>
//                   <th>Schedule Completion Date</th>
//                   <th>Total Envisaged Capex (INR Crores)</th>
//                   <th>Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>1</td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project1_name}
//                       onChange={(e) => handleChange('project1_name', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project1_boardApprovalDate}
//                       onChange={(e) => handleChange('project1_boardApprovalDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project1_startDate}
//                       onChange={(e) => handleChange('project1_startDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project1_completionDate}
//                       onChange={(e) => handleChange('project1_completionDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={formData.project1_capex}
//                       onChange={(e) => handleChange('project1_capex', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project1_remarks}
//                       onChange={(e) => handleChange('project1_remarks', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>2</td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project2_name}
//                       onChange={(e) => handleChange('project2_name', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project2_boardApprovalDate}
//                       onChange={(e) => handleChange('project2_boardApprovalDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project2_startDate}
//                       onChange={(e) => handleChange('project2_startDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project2_completionDate}
//                       onChange={(e) => handleChange('project2_completionDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={formData.project2_capex}
//                       onChange={(e) => handleChange('project2_capex', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project2_remarks}
//                       onChange={(e) => handleChange('project2_remarks', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>3</td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project3_name}
//                       onChange={(e) => handleChange('project3_name', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project3_boardApprovalDate}
//                       onChange={(e) => handleChange('project3_boardApprovalDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project3_startDate}
//                       onChange={(e) => handleChange('project3_startDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project3_completionDate}
//                       onChange={(e) => handleChange('project3_completionDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={formData.project3_capex}
//                       onChange={(e) => handleChange('project3_capex', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project3_remarks}
//                       onChange={(e) => handleChange('project3_remarks', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>4</td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project4_name}
//                       onChange={(e) => handleChange('project4_name', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project4_boardApprovalDate}
//                       onChange={(e) => handleChange('project4_boardApprovalDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project4_startDate}
//                       onChange={(e) => handleChange('project4_startDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project4_completionDate}
//                       onChange={(e) => handleChange('project4_completionDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={formData.project4_capex}
//                       onChange={(e) => handleChange('project4_capex', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project4_remarks}
//                       onChange={(e) => handleChange('project4_remarks', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>5</td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project5_name}
//                       onChange={(e) => handleChange('project5_name', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project5_boardApprovalDate}
//                       onChange={(e) => handleChange('project5_boardApprovalDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project5_startDate}
//                       onChange={(e) => handleChange('project5_startDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="date"
//                       value={formData.project5_completionDate}
//                       onChange={(e) => handleChange('project5_completionDate', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={formData.project5_capex}
//                       onChange={(e) => handleChange('project5_capex', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={formData.project5_remarks}
//                       onChange={(e) => handleChange('project5_remarks', e.target.value)}
//                       className="form-input"
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="step-section">
//               <div className="form-group">
//                 <label>Comments</label>
//                 <textarea
//                   name="comment"
//                   value={formData.comment}
//                   onChange={(e) => handleChange('comment', e.target.value)}
//                   className="form-textarea"
//                   maxLength={300}
//                   placeholder="Comments in (200 words) against input parameter, if any"
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {currentStep === 5 && (
//           <div className="form-step">
//             <h3 className="step-title">Step 5: Attachments & Declaration</h3>

//             <div className="form-group">
//               <label>List of Attachments (Optional):</label>
//               <table className="quant-table">
//                 <thead>
//                   <tr>
//                     <th>S. No.</th>
//                     <th>Description</th>
//                     <th>Upload (only jpg, png, pdf, max 5 MB each)</th>
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
//                             onChange={(e) =>
//                               handleAttachmentChange(key, 'description', e.target.value)
//                             }
//                             placeholder="Enter description"
//                             className="form-input"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="file"
//                             accept=".jpg,.png,.pdf"
//                             onChange={(e) =>
//                               handleAttachmentChange(key, 'file', e.target.files[0])
//                             }
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
//               <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
//               <div className="form-navigation">
//                 <button type="button" onClick={handlePrint} className="btn btn-outline">
//                   Print
//                 </button>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Upload Document with Approving Authority Signature (Director/Board Level)<span className="text-red">*</span>:</label>
//               <input
//                 type="file"
//                 accept=".jpg,.png,.pdf"
//                 onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
//                 className="form-input mt-4"
//               />
//               {formData.approvingAuthoritySignature && (
//                 <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
//               )}
//               {error && <span className="error-tooltip">{error}</span>}
//             </div>
//             <div className="form-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="declaration"
//                   checked={formData.declaration}
//                   onChange={(e) => handleChange('declaration', e.target.checked)}
//                   className="form-checkbox"
//                 />
//                 I declare that the information submitted is true and complete.


//               </label>
//               <div className="notes">
//                 <p>Notes/ Definition:</p>
//                 <ol type="a">
//                   <li> INR / USD as on 31.03.2025 (85.424)</li>
//                   <li> 1 Tonne of oil equivalent to 7.5 bbl of oil</li>
//                   <li> MTOE: Million Tonne of Oil Equivalent. For this calculation 1 BCM of natural gas is equivalent to 1 MMT of Oil</li>
//                   <li> Finding cost (INR/MTOE): Cost of finding oil and gas reserves added via exploration drilling activities, exclusive of land acquisition cost: (total cost incurred (INR)/ reserves added (oil + oil eq. gas reserves) (MTOE)</li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }

//   return (
//     <div className="application-form">
//       <div className="form-header">
//         <h1>
//           Registration Form: {
//             'Oil & Gas Production Company of the Year (< 1 MMTOE)'
//           }
//         </h1>

//         <h6>Step {currentStep} of 5</h6>
//       </div>
//       {error && <div className="error">{error}</div>}


//       {isSubmitted ? (
//         <div className="thank-you-message">
//           <h2>Thank you for your submission!</h2>
//           <p>Your registration has been successfully submitted.</p>
//           <button onClick={() => setIsSubmitted(false)}>Submit Another Response</button>
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
//                 <button type="submit" className="btn btn-success">
//                   Submit
//                 </button>
//               )}
//             </div>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };

// export default RegistrationProductionlessMMTOE;

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';
import SidebarGuideline from "./SidebarGuideline"
import TextField from "@mui/material/TextField";

// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const COMPANY_PROFILE_MAX_LENGTH = 2400;
const COMMENT_MAX_LENGTH = 200;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const RegistrationProductionlessMMTOE = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const awardTitle = location.state?.awardTitle || 'Oil & Gas Production Company of the Year (< 1 MMTOE)';

  // Form state initialization
  const [formData, setFormData] = useState({
    Organisationname: '',
    category: 'Oil & Gas Production Company of the Year (< 1 MMTOE)',
    mailingAddress: '',
    authorityName: '',
    authorityTitle: '',
    authorityPhone: '',
    authorityEmail: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    companyProfile: '',
    awardJustification: '',
    approvingAuthoritySignature: null,
    declaration: false,
    comment: '',
    '1_totalOil': ['', ''],
    '2_totalGas': ['', ''],
    '3_costPerBOE': ['', ''],
    '4_iorEorCapex': ['', ''],
    '5_totalEnergy': ['', ''],
    '5.1_companyEnergy': ['', ''],
    '5.2_totalCapex': ['', ''],
    '5.3_totalOpex': ['', ''],
    '5.4_productionCapex': ['', ''],
    '5.5_productionOpex': ['', ''],
    '6_co2Emission': ['', ''],
    '8_fatalities': ['', ''],
    '9_lostTimeInjuries': ['', ''],
    '10_oshaIncidents': ['', ''],
    '11_ownManHours': ['', ''],
    '12_contractManHours': ['', ''],
    project1_name: '',
    project1_boardApprovalDate: '',
    project1_startDate: '',
    project1_completionDate: '',
    project1_capex: '',
    project1_remarks: '',
    project2_name: '',
    project2_boardApprovalDate: '',
    project2_startDate: '',
    project2_completionDate: '',
    project2_capex: '',
    project2_remarks: '',
    project3_name: '',
    project3_boardApprovalDate: '',
    project3_startDate: '',
    project3_completionDate: '',
    project3_capex: '',
    project3_remarks: '',
    project4_name: '',
    project4_boardApprovalDate: '',
    project4_startDate: '',
    project4_completionDate: '',
    project4_capex: '',
    project4_remarks: '',
    project5_name: '',
    project5_boardApprovalDate: '',
    project5_startDate: '',
    project5_completionDate: '',
    project5_capex: '',
    project5_remarks: '',
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
        const prefillRaw = sessionStorage.getItem('registrationProductionless_prefill');
        if (prefillRaw) {
          const prefill = JSON.parse(prefillRaw);
          if (prefill && typeof prefill === 'object') {
            setFormData((prev) => ({ ...prev, ...prefill }));
            if (prefill.step) setCurrentStep(Number(prefill.step));
          }
          // remove after consuming so it doesn't override later edits
          sessionStorage.removeItem('registrationProductionless_prefill');
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
        const draftRaw = localStorage.getItem('registrationProductionlessDraft');
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
    if (['Organisationname', 'authorityName', 'authorityTitle', 'contactName'].includes(name)) {
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
    } else if (name === 'authorityPhone' || name === 'contactPhone') {
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
    } else if (name.includes('_name') || name.includes('_boardApprovalDate') || name.includes('_startDate') || name.includes('_completionDate') || name.includes('_capex')) {
      if (!value && value !== '0') {
        errorMsg = `${name.replace(/([A-Z])/g, ' $1').trim().replace(/project\d /i, 'Project ')} is required.`;
      }
    } else if (name.includes('_remarks') && value.length > COMMENT_MAX_LENGTH) {
      errorMsg = `Remarks must not exceed ${COMMENT_MAX_LENGTH} characters.`;
    }
    return errorMsg;
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

  // Handle changes for inputs/textareas/selects
  const handleChange = (name, value, index = null) => {
    if ([1, 2, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (['companyProfile'].includes(name)) applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
      else if (name === 'comment' || name.includes('_remarks')) applicableMaxLength = COMMENT_MAX_LENGTH;

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
        else if (value.length > applicableMaxLength) {
          alert(`Value cannot exceed ${applicableMaxLength} characters.`);
          return;
        }
      }
    }

    // Name validation
    if (['Organisationname', 'authorityName', 'contactName'].includes(name)) {
      const isValid = /^[A-Za-z\s]*$/.test(value);
      if (!isValid && value !== '') {
        alert('Only letters and spaces are allowed.');
        return;
      }
    }

    // Quantitative fields validation
    const quantFields = [
      '1_totalOil', '2_totalGas', '3_costPerBOE', '4_iorEorCapex',
      '5_totalEnergy', '5.1_companyEnergy', '5.2_totalCapex', '5.3_totalOpex',
      '5.4_productionCapex', '5.5_productionOpex', '6_co2Emission',
      '8_fatalities', '9_lostTimeInjuries', '10_oshaIncidents',
      '11_ownManHours', '12_contractManHours', 'project1_capex',
      'project2_capex', 'project3_capex', 'project4_capex', 'project5_capex'
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
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        clearFieldError(name);
      }
      return;
    }

    // Phone validation
    if (['authorityPhone', 'contactPhone'].includes(name)) {
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

    if (['Organisationname', 'mailingAddress'].includes(name) && value && currentStep === 1) setError('');
    if (['authorityName', 'authorityTitle', 'authorityEmail', 'authorityPhone', 'contactName', 'companyProfile', 'awardJustification'].includes(name) && value && currentStep === 2) setError('');
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

  // Quantitative data for steps 3 and 4
  const fullData = [
    ['1', 'Total oil production during the year (MMT)', '1_totalOil'],
    ['2', 'Total gas production during the year (BCM)', '2_totalGas'],
    ['3', 'Cost of production ($/boe)', '3_costPerBOE'],
    ['4', 'Capex in IOR / EOR projects implementation (in Crores)', '4_iorEorCapex'],
    ['5', 'Total Energy (GJ) consumed in Production', '5_totalEnergy'],
    ['5.1', 'Total Energy Consumed by the Company (GJ)', '5.1_companyEnergy'],
    ['5.2', 'Total Capex of the Company (INR Crores)', '5.2_totalCapex'],
    ['5.3', 'Total Opex of the Company (INR Crores)', '5.3_totalOpex'],
    ['5.4', 'Capex for Production (INR Crores)', '5.4_productionCapex'],
    ['5.5', 'Opex for Production (INR Crores)', '5.5_productionOpex'],
    ['6', 'Total Carbon dioxide Emitted (Tonne) in Production', '6_co2Emission'],
    ['7', 'No. of Fatalities', '8_fatalities'],
    ['8', 'Number of lost time injuries', '9_lostTimeInjuries'],
    ['9', 'Number of OSHA recordable incidents', '10_oshaIncidents'],
    ['10', 'Total Man Hours Worked (Own Employees)', '11_ownManHours'],
    ['11', 'Total Man Hours Worked (Contractual Employees)', '12_contractManHours'],
  ];

  const part1 = fullData.filter(([num]) => parseFloat(num) <= 6);
  const part2 = fullData.filter(([num]) => parseFloat(num) >= 8);

  // Print form handler
  const handlePrint = () => {
    const submissionDate = new Date('2025-08-06T00:20:00+05:30').toLocaleString('en-US', {
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
        <p><strong>Postal Address:</strong> ${formData.mailingAddress || ''}</p>
        <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
        <p><strong>Authority Title:</strong> ${formData.authorityTitle || ''}</p>
        <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
        <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>

        <p><strong>Contact Name:</strong> ${formData.contactName || ''}</p>
        <p><strong>Contact Phone:</strong> ${formData.contactPhone || ''}</p>
        <p><strong>Contact Email:</strong> ${formData.contactEmail || ''}</p>
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
            ${part1.map(([num, label, key]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][0] || '' : ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][1] || '' : ''}</td>
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
                <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][0] || '' : ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${Array.isArray(formData[key]) ? formData[key][1] || '' : ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h2>New Projects</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S.No</th>
              <th style="border: 1px solid #000; padding: 8px;">Project Name</th>
              <th style="border: 1px solid #000; padding: 8px;">Board Approval Date</th>
              <th style="border: 1px solid #000; padding: 8px;">Start Date</th>
              <th style="border: 1px solid #000; padding: 8px;">Completion Date</th>
              <th style="border: 1px solid #000; padding: 8px;">Capex (INR Crores)</th>
              <th style="border: 1px solid #000; padding: 8px;">Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${[1, 2, 3, 4, 5].map(i => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${i}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[`project${i}_name`] || ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[`project${i}_boardApprovalDate`] || ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[`project${i}_startDate`] || ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[`project${i}_completionDate`] || ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[`project${i}_capex`] || ''}</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[`project${i}_remarks`] || ''}</td>
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
        <h2>Authority Signature</h2>
        <p><strong>Name:</strong> ${formData.authority_name || ''}</p>
        <p><strong>Title:</strong> ${formData.authority_title || ''}</p>
        <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
        ${formData.approvingAuthoritySignature
        ? `<img src="${formData.approvingAuthoritySignature}" alt="Signature" style="max-height: 100px; margin-top: 10px;" />`
        : `<p><em>No signature uploaded.</em></p>`}
      </div>
      </div>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Check for empty fields in a step
  const hasEmptyFieldsInStep3 = () => {
    for (const [, , key] of part1) {
      // ⛔️ Skip validation if the field is currently disabled
      if (shouldDisableField(key)) continue;

      const arr = formData[key];
      if (!arr || arr.some(val => val === '' || val === undefined || val === null)) {
        return true;
      }
    }
    return false;
  };


  const hasEmptyFieldsInStep4 = () => {
    for (const [, , key] of part2) {
      const arr = formData[key];
      if (!arr || arr.some(val => val === '' || val === undefined || val === null)) {
        return true;
      }
    }
    for (let i = 1; i <= 5; i++) {
      const requiredFields = [
        `project${i}_name`,
        `project${i}_boardApprovalDate`,
        `project${i}_startDate`,
        `project${i}_completionDate`,
        `project${i}_capex`
      ];
      for (const field of requiredFields) {
        if (!formData[field] && formData[field] !== '0') {
          return true;
        }
      }
    }
    return false;
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
      if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
        errors.authorityPhone = 'Authority phone must be exactly 10 digits.';
      }
      if (!formData.contactName) {
        errors.contactName = 'Contact name is required.';
      }
      if (formData.contactEmail && !validateEmail(formData.contactEmail)) {
        errors.contactEmail = 'Please enter a valid Contact email.';
      }
      if (formData.contactPhone && !validatePhone(formData.contactPhone) && !copyApplicantData) {
        errors.contactPhone = 'Contact phone must be exactly 10 digits.';
      }
      if (!formData.companyProfile.trim()) {
        errors.companyProfile = 'Company profile is required.';
      }
    }
    if (currentStep === 3 && hasEmptyFieldsInStep3()) {
      if (!window.confirm('Data not entered, If you wish to continue?')) {
        return;
      }
    }
    if (currentStep === 4 && hasEmptyFieldsInStep4()) {
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
  const saveDraft = () => {
    try {
      const draftToStore = {
        formData: serializeFormForStorage(formData), // ⭐ ADDED - store a safe copy
        step: currentStep, // ⭐ ADDED - persist current step so user returns to same step
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem('registrationProductionlessDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.Organisationname) {
      errors.Organisationname = 'Organisation name is required.';
    }
    if (!formData.mailingAddress?.trim()) {
      errors.mailingAddress = 'Mailing address is required.';
    }
    if (!formData.authorityName) {
      errors.authorityName = 'Authority name is required.';
    }
    if (!formData.authorityTitle) {
      errors.authorityTitle = 'Authority designation is required.';
    }
    if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
      errors.authorityEmail = 'Please enter a valid Authority email.';
    }
    if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
      errors.authorityPhone = 'Authority phone must be exactly 10 digits.';
    }
    if (!formData.contactName) {
      errors.contactName = 'Contact name is required.';
    }
    if (formData.contactEmail && !validateEmail(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid Contact email.';
    }
    if (formData.contactPhone && !validatePhone(formData.contactPhone) && !copyApplicantData) {
      errors.contactPhone = 'Contact phone must be exactly 10 digits.';
    }
    if (!formData.companyProfile.trim()) {
      errors.companyProfile = 'Company profile is required.';
    }
    if (!formData.awardJustification.trim()) {
      errors.awardJustification = 'Award justification is required.';
    }
    if (!formData.declaration) {
      errors.declaration = 'Please accept the declaration before submitting.';
    }
    if (!formData.approvingAuthoritySignature) {
      errors.approvingAuthoritySignature = 'Please upload the document with the approving authority signature.';
    }
    for (let i = 1; i <= 5; i++) {
      const requiredFields = [
        `project${i}_name`,
        `project${i}_boardApprovalDate`,
        `project${i}_startDate`,
        `project${i}_completionDate`,
        `project${i}_capex`
      ];
      for (const field of requiredFields) {
        if (!formData[field] && formData[field] !== '0') {
          errors[field] = `${field.replace(/([A-Z])/g, ' $1').trim().replace(/project\d /i, 'Project ')} is required.`;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      alert(Object.values(errors)[0]);
      return;
    }

    const fd = new FormData();
    fd.append('organisation_name', formData.Organisationname || '');
    fd.append('category', formData.category || '');
    fd.append('mailing_address', formData.mailingAddress || '');
    fd.append('authority_name', formData.authorityName || '');
    fd.append('authority_title', formData.authorityTitle || '');
    fd.append('authority_phone', formData.authorityPhone || '');
    fd.append('authority_email', formData.authorityEmail || '');
    fd.append('contact_name', formData.contactName || '');
    fd.append('contact_phone', formData.contactPhone || '');
    fd.append('contact_email', formData.contactEmail || '');
    fd.append('company_profile', formData.companyProfile || '');
    fd.append('award_justification', formData.awardJustification || '');
    fd.append('comment', formData.comment || '');
    fd.append('declaration', String(formData.declaration));

    // Quantitative fields
    const quantMap = [
      ['1_totalOil', 'total_oil'],
      ['2_totalGas', 'total_gas'],
      ['3_costPerBOE', 'cost_per_boe'],
      ['4_iorEorCapex', 'ior_eor_capex'],
      ['5_totalEnergy', 'total_energy'],
      ['5.1_companyEnergy', 'company_energy'],
      ['5.2_totalCapex', 'total_capex'],
      ['5.3_totalOpex', 'total_opex'],
      ['5.4_productionCapex', 'production_capex'],
      ['5.5_productionOpex', 'production_opex'],
      ['6_co2Emission', 'co2_emission'],
      ['8_fatalities', 'fatalities'],
      ['9_lostTimeInjuries', 'lost_time_injuries'],
      ['10_oshaIncidents', 'osha_incidents'],
      ['11_ownManHours', 'own_man_hours'],
      ['12_contractManHours', 'contract_man_hours'],
    ];
    quantMap.forEach(([jsKey, apiBase]) => {
      const [y24 = '', y23 = ''] = formData[jsKey] || [];
      fd.append(`${apiBase}_2024_25`, y24);
      fd.append(`${apiBase}_2023_24`, y23);
    });

    // Project fields
    for (let i = 1; i <= 5; i++) {
      const prefix = `project${i}_`;
      const mapping = {
        name: `project${i}_name`,
        boardApprovalDate: `project${i}_board_approval`,
        startDate: `project${i}_start_date`,
        completionDate: `project${i}_completion_date`,
        capex: `project${i}_capex`,
        remarks: `project${i}_remarks`,
      };
      Object.entries(mapping).forEach(([jsField, apiKey]) => {
        const val = formData[prefix + jsField];
        if (val || val === '0') {
          fd.append(apiKey, val);
        }
      });
    }

    // Attachments
    if (formData.approvingAuthoritySignature) {
      fd.append('approving_authority_file', formData.approvingAuthoritySignature);
    }
    [1, 2, 3, 4].forEach(n => {
      const slot = formData[`attachments${n}`] || {};
      fd.append(`attachments${n}_desc`, slot.description || '');
      if (slot.file instanceof File) {
        fd.append(`attachments${n}`, slot.file);
      }
    });

    try {
      // const url = `${ACTIVE_API_BASE_URL}/productionless/`;
      // const res = await fetch(url, { method: 'POST', body: fd });
      // if (!res.ok) {
      //   const text = await res.text();
      //   console.error('API error:', text);
      //   return alert('Submission failed; see console for details.');
      // }
      // const data = await res.json();
      // console.log('Saved:', data);
      alert('Registration Submitted Successfully!');
      setIsSubmitted(true);
      setCurrentStep(1);
      setCopyApplicantData(false);
      setFormData({
        Organisationname: '',
        category: 'Oil & Gas Production Company of the Year (< 1 MMTOE)',
        mailingAddress: '',
        authorityName: '',
        authorityTitle: '',
        authorityPhone: '',
        authorityEmail: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        companyProfile: '',
        awardJustification: '',
        approvingAuthoritySignature: null,
        declaration: false,
        comment: '',
        '1_totalOil': ['', ''],
        '2_totalGas': ['', ''],
        '3_costPerBOE': ['', ''],
        '4_iorEorCapex': ['', ''],
        '5_totalEnergy': ['', ''],
        '5.1_companyEnergy': ['', ''],
        '5.2_totalCapex': ['', ''],
        '5.3_totalOpex': ['', ''],
        '5.4_productionCapex': ['', ''],
        '5.5_productionOpex': ['', ''],
        '6_co2Emission': ['', ''],
        '8_fatalities': ['', ''],
        '9_lostTimeInjuries': ['', ''],
        '10_oshaIncidents': ['', ''],
        '11_ownManHours': ['', ''],
        '12_contractManHours': ['', ''],
        project1_name: '',
        project1_boardApprovalDate: '',
        project1_startDate: '',
        project1_completionDate: '',
        project1_capex: '',
        project1_remarks: '',
        project2_name: '',
        project2_boardApprovalDate: '',
        project2_startDate: '',
        project2_completionDate: '',
        project2_capex: '',
        project2_remarks: '',
        project3_name: '',
        project3_boardApprovalDate: '',
        project3_startDate: '',
        project3_completionDate: '',
        project3_capex: '',
        project3_remarks: '',
        project4_name: '',
        project4_boardApprovalDate: '',
        project4_startDate: '',
        project4_completionDate: '',
        project4_capex: '',
        project4_remarks: '',
        project5_name: '',
        project5_boardApprovalDate: '',
        project5_startDate: '',
        project5_completionDate: '',
        project5_capex: '',
        project5_remarks: '',
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
      });
      setFieldErrors({});
      setError('');

       try {
        localStorage.removeItem('registrationProductionlessDraft');
      } catch (err) {
        // ignore
      }


    } catch (err) {
      console.error('Network error:', err);
      alert('Network error; please retry.');
    }
  };







  const shouldDisableField = (key) => {
    const val5 = formData['5_totalEnergy'];
    const hasVal5 = Array.isArray(val5) && (val5[0] || val5[1]);

    const subKeys = [
      '5.1_companyEnergy',
      '5.2_totalCapex',
      '5.3_totalOpex',
      '5.4_productionCapex',
      '5.5_productionOpex',
    ];

    const hasSubVals = subKeys.some(subKey => {
      const val = formData[subKey];
      return Array.isArray(val) && (val[0] || val[1]);
    });

    // If main has value, disable subs
    if (hasVal5 && subKeys.includes(key)) return true;

    // If any sub has value, disable main
    if (hasSubVals && key === '5_totalEnergy') return true;

    return false;
  };

  // Rendering steps content
  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;
    const years = ['2024–25', '2023–24'];

    return (
      <div className="form-step" role="region" aria-label={`Step ${currentStep} of 5`}>
        <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>

        {currentStep === 1 && (
          <div>
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
                onChange={(e) => handleChange('Organisationname', e.target.value)}
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
              <label htmlFor="mailingAddress">
                Postal Address <span aria-hidden="true" className="text-red">*</span>
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
                placeholder="Enter postal address"
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
                    onChange={(e) => handleChange('authorityName', e.target.value)}
                    onBlur={(e) => handleBlur('authorityName', e.target.value)}
                    aria-describedby="authorityName-error"
                    placeholder="Name"
                    className={`form-input ${fieldErrors.authorityName ? 'has-error' : ''}`}
                    required
                    aria-required="true"
                  />
                  {fieldErrors.authorityName && (
                    <span className="error-tooltip" id="authorityName-error" role="alert">
                      {fieldErrors.authorityName}
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
                    onBlur={(e) => handleBlur('authorityTitle', e.target.value)}
                    aria-describedby="authorityTitle-error"
                    placeholder="Designation"
                    className={`form-input ${fieldErrors.authorityTitle ? 'has-error' : ''}`}
                    required
                    aria-required="true"
                  />
                  {fieldErrors.authorityTitle && (
                    <span className="error-tooltip" id="authorityTitle-error" role="alert">
                      {fieldErrors.authorityTitle}
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
                    onChange={(e) => handleChange('authorityPhone', e.target.value)}
                    onBlur={(e) => handleBlur('authorityPhone', e.target.value)}
                    aria-describedby="authorityPhone-error"
                    placeholder="10-digit phone number"
                    className={`form-input ${fieldErrors.authorityPhone ? 'has-error' : ''}`}
                    required
                    aria-required="true"
                  />
                  {fieldErrors.authorityPhone && (
                    <span className="error-tooltip" id="authorityPhone-error" role="alert">
                      {fieldErrors.authorityPhone}
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
                    onChange={(e) => handleChange('authorityEmail', e.target.value)}
                    onBlur={(e) => handleBlur('authorityEmail', e.target.value)}
                    aria-describedby="authorityEmail-error"
                    placeholder="Approving authority's email"
                    className={`form-input ${fieldErrors.authorityEmail ? 'has-error' : ''}`}
                    required
                    aria-required="true"
                  />
                  {fieldErrors.authorityEmail && (
                    <span className="error-tooltip" id="authorityEmail-error" role="alert">
                      {fieldErrors.authorityEmail}
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
                    /> Same as applicant
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
                  <label htmlFor="contactPhone">Phone</label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    maxLength={PHONE_MAX_LENGTH}
                    value={formData.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                    onBlur={(e) => handleBlur('contactPhone', e.target.value)}
                    placeholder="10-digit contact phone"
                    disabled={copyApplicantData}
                    className={`form-input ${fieldErrors.contactPhone ? 'has-error' : ''}`}
                    aria-describedby="contactPhone-error"
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
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    onBlur={(e) => handleBlur('contactEmail', e.target.value)}
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
                Development & Production operations in 2024 -25. </label>
              <p className="note">(within 300 words)</p>
              <textarea
                id="companyProfile"
                name="companyProfile"
                value={formData.companyProfile}
                // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                onChange={(e) => handleChange('companyProfile', e.target.value)}
                onBlur={(e) => handleBlur('companyProfile', e.target.value)}
                className={`form-textarea ${fieldErrors.companyProfile ? 'has-error' : ''}`}
                rows={6}
                aria-describedby="companyProfile-error"
                required
                aria-required="true"
              />
              {fieldErrors.companyProfile && (
                <span className="error-tooltip" id="companyProfile-error" role="alert">
                  {fieldErrors.companyProfile}
                </span>
              )}
            </div>

          </div>
        )}

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
                </tr>
              </thead>
              <tbody>
                {part1.map(([num, label, key]) => (
                  <tr key={key}>
                    <td>{num}</td>
                    <td>{label}</td>
                    {[0, 1].map((index) => (
                      <td key={index}>
                        {/* <input
                          type="number"
                          value={Array.isArray(formData[key]) ? formData[key][index] || '' : ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!val.startsWith('-') && !val.toLowerCase().includes('e')) {
                              handleChange(key, val, index);
                            }
                          }}
                          onBlur={(e) => handleBlur(`${key}[${index}]`, e.target.value)}
                          className={`form-input no-spinner ${fieldErrors[`${key}[${index}]`] ? 'has-error' : ''}`}
                          aria-describedby={`${key}-${index}-error`}
                          min="0"
                          disabled={shouldDisableField(key)} // ✅ ADD THIS LINE HERE
                          onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                              e.preventDefault();
                            }
                          }}
                          aria-label={`${label} for ${years[index]}`}
                        /> */}
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="text" // use text to avoid number input spinners
                          value={Array.isArray(formData[key]) ? formData[key][index] || "" : ""}
                          onChange={(e) => {
                            let val = e.target.value;

                            // Allow only digits and one decimal point
                            val = val.replace(/[^0-9.]/g, "");
                            const parts = val.split(".");
                            if (parts.length > 2) {
                              // keep only the first decimal point
                              val = parts[0] + "." + parts.slice(1).join("");
                            }

                            handleChange(key, val, index);
                          }}
                          onBlur={(e) => handleBlur(`${key}[${index}]`, e.target.value)}
                          className={`form-input no-spinner ${fieldErrors[`${key}[${index}]`] ? "has-error" : ""}`}
                          aria-describedby={`${key}-${index}-error`}
                          disabled={shouldDisableField(key)}
                          sx={{
                            "& .MuiInputBase-root.Mui-disabled": {
                              backgroundColor: "#f5f5f5",
                              color: "rgba(0,0,0,0.6)",
                            },
                          }}
                          onKeyDown={(e) => {
                            // block invalid keys
                            if (
                              ["-", "+", "e", "E"].includes(e.key) ||
                              e.key === "ArrowUp" ||
                              e.key === "ArrowDown"
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onWheel={(e) => e.target.blur()} // disable scroll increment
                          aria-label={`${label} for ${years[index]}`}
                          inputProps={{
                            inputMode: "decimal", // mobile decimal keypad
                            pattern: "[0-9]*\\.?[0-9]*", // digits with optional decimal
                          }}
                        />




                        {fieldErrors[`${key}[${index}]`] && (
                          <span className="error-tooltip" id={`${key}-${index}-error`} role="alert">
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

        {currentStep === 4 && (
          <div>
            <h3 className="step-title">Step 4: Quantitative Information Part 2 & New Projects</h3>
            <table className="quant-table">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Particulars</th>
                  <th scope="col">2024–25</th>
                  <th scope="col">2023–24</th>
                </tr>
              </thead>
              <tbody>
                {part2.map(([num, label, key]) => (
                  <tr key={key}>
                    <td>{num}</td>
                    <td>{label}</td>
                    {[0, 1].map((index) => (
                      <td key={index}>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="text" // use text to avoid browser number spinners
                          value={Array.isArray(formData[key]) ? formData[key][index] || "" : ""}
                          onChange={(e) => {
                            let val = e.target.value;

                            // ✅ Allow only digits and a single decimal point
                            val = val.replace(/[^0-9.]/g, "");
                            const parts = val.split(".");
                            if (parts.length > 2) {
                              val = parts[0] + "." + parts.slice(1).join("");
                            }

                            handleChange(key, val, index);
                          }}
                          onBlur={(e) => handleBlur(`${key}[${index}]`, e.target.value)}
                          className={`form-input no-spinner ${fieldErrors[`${key}[${index}]`] ? "has-error" : ""}`}
                          aria-describedby={`${key}-${index}-error`}
                          onKeyDown={(e) => {
                            // block invalid characters and arrows
                            if (
                              ["-", "+", "e", "E"].includes(e.key) ||
                              e.key === "ArrowUp" ||
                              e.key === "ArrowDown"
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onWheel={(e) => e.target.blur()} // disable mouse scroll increment
                          aria-label={`${label} for ${years[index]}`}
                          inputProps={{
                            inputMode: "decimal", // numeric keypad on mobile
                            pattern: "[0-9]*\\.?[0-9]*", // digits with optional decimal
                          }}
                        />
                        {fieldErrors[`${key}[${index}]`] && (
                          <span className="error-tooltip" id={`${key}-${index}-error`} role="alert">
                            {fieldErrors[`${key}[${index}]`]}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="quant-table">

              <thead>
                <tr>
                  <td>7</td>
                  <td>New Projects initiated in Assessment year to augment production (Board Approved) </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Board Approval Date</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Schedule Completion Date</th>
                  <th scope="col">Total Envisaged Capex (INR Crores)</th>
                  <th scope="col">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>
                      <input
                        type="text"
                        name={`project${i}_name`}
                        maxLength={FIELD_MAX_LENGTH}
                        value={formData[`project${i}_name`]}
                        onChange={(e) => handleChange(`project${i}_name`, e.target.value)}
                        onBlur={(e) => handleBlur(`project${i}_name`, e.target.value)}
                        className={`form-input ${fieldErrors[`project${i}_name`] ? 'has-error' : ''}`}
                        aria-describedby={`project${i}_name-error`}
                        required
                        aria-required="true"
                      />
                      {fieldErrors[`project${i}_name`] && (
                        <span className="error-tooltip" id={`project${i}_name-error`} role="alert">
                          {fieldErrors[`project${i}_name`]}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="date"
                        value={formData[`project${i}_boardApprovalDate`]}
                        onChange={(e) => handleChange(`project${i}_boardApprovalDate`, e.target.value)}
                        onBlur={(e) => handleBlur(`project${i}_boardApprovalDate`, e.target.value)}
                        className={`form-input ${fieldErrors[`project${i}_boardApprovalDate`] ? 'has-error' : ''}`}
                        aria-describedby={`project${i}_boardApprovalDate-error`}
                        required
                        aria-required="true"
                      />
                      {fieldErrors[`project${i}_boardApprovalDate`] && (
                        <span className="error-tooltip" id={`project${i}_boardApprovalDate-error`} role="alert">
                          {fieldErrors[`project${i}_boardApprovalDate`]}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="date"
                        value={formData[`project${i}_startDate`]}
                        onChange={(e) => handleChange(`project${i}_startDate`, e.target.value)}
                        onBlur={(e) => handleBlur(`project${i}_startDate`, e.target.value)}
                        className={`form-input ${fieldErrors[`project${i}_startDate`] ? 'has-error' : ''}`}
                        aria-describedby={`project${i}_startDate-error`}
                        required
                        aria-required="true"
                      />
                      {fieldErrors[`project${i}_startDate`] && (
                        <span className="error-tooltip" id={`project${i}_startDate-error`} role="alert">
                          {fieldErrors[`project${i}_startDate`]}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="date"
                        value={formData[`project${i}_completionDate`]}
                        onChange={(e) => handleChange(`project${i}_completionDate`, e.target.value)}
                        onBlur={(e) => handleBlur(`project${i}_completionDate`, e.target.value)}
                        className={`form-input ${fieldErrors[`project${i}_completionDate`] ? 'has-error' : ''}`}
                        aria-describedby={`project${i}_completionDate-error`}
                        required
                        aria-required="true"
                      />
                      {fieldErrors[`project${i}_completionDate`] && (
                        <span className="error-tooltip" id={`project${i}_completionDate-error`} role="alert">
                          {fieldErrors[`project${i}_completionDate`]}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={formData[`project${i}_capex`] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val.startsWith('-') && !val.toLowerCase().includes('e')) {
                            handleChange(`project${i}_capex`, val);
                          }
                        }}
                        onBlur={(e) => handleBlur(`project${i}_capex`, e.target.value)}
                        className={`form-input no-spinner ${fieldErrors[`project${i}_capex`] ? 'has-error' : ''}`}
                        aria-describedby={`project${i}_capex-error`}
                        min="0"
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                            e.preventDefault();
                          }
                        }}
                        required
                        aria-required="true"
                      />
                      {fieldErrors[`project${i}_capex`] && (
                        <span className="error-tooltip" id={`project${i}_capex-error`} role="alert">
                          {fieldErrors[`project${i}_capex`]}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`project${i}_remarks`}
                        maxLength={50}
                        value={formData[`project${i}_remarks`]}
                        onChange={(e) => handleChange(`project${i}_remarks`, e.target.value)}
                        onBlur={(e) => handleBlur(`project${i}_remarks`, e.target.value)}
                        className={`form-input ${fieldErrors[`project${i}_remarks`] ? 'has-error' : ''}`}
                        aria-describedby={`project${i}_remarks-error`}
                      />
                      {fieldErrors[`project${i}_remarks`] && (
                        <span className="error-tooltip" id={`project${i}_remarks-error`} role="alert">
                          {fieldErrors[`project${i}_remarks`]}
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
                // maxLength={COMMENT_MAX_LENGTH}
                onChange={(e) => handleChange('comment', e.target.value)}
                onBlur={(e) => handleBlur('comment', e.target.value)}
                className={`form-textarea ${fieldErrors.comment ? 'has-error' : ''}`}
                placeholder="Comments in (200 words) against input parameter, if any"
                aria-describedby="comment-error"
              />
              {fieldErrors.comment && (
                <span className="error-tooltip" id="comment-error" role="alert">
                  {fieldErrors.comment}
                </span>
              )}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h3 className="step-title">Step 5: Attachments & Declaration</h3>
            <div className="form-group">
              <label>List of Attachments (Optional):</label>
              <table className="quant-table">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Description</th>
                    <th scope="col">Upload (only jpg, png, pdf, max 5 MB each)</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((num) => {
                    const key = `attachments${num}`;
                    return (
                      <tr key={key}>
                        <td>{num}</td>
                        <td>
                          <input
                            type="text"
                            name={`${key}.description`}
                            maxLength={FIELD_MAX_LENGTH}
                            value={formData[key].description}
                            onChange={(e) => handleAttachmentChange(key, 'description', e.target.value)}
                            onBlur={(e) => handleBlur(`${key}.description`, e.target.value)}
                            placeholder="Enter description"
                            className={`form-input ${fieldErrors[`${key}.description`] ? 'has-error' : ''}`}
                            aria-describedby={`${key}-description-error`}
                          />
                          {fieldErrors[`${key}.description`] && (
                            <span className="error-tooltip" id={`${key}-description-error`} role="alert">
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
                            aria-describedby={`${key}-file-error`}
                          />
                          {formData[key].file && (
                            <p className="file-name">Selected file: {formData[key].file.name}</p>
                          )}
                          {fieldErrors[`${key}.file`] && (
                            <span className="error-tooltip" id={`${key}-file-error`} role="alert">
                              {fieldErrors[`${key}.file`]}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="form-group">
              <label>Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span aria-hidden="true" className="text-red">*</span></label>
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
                aria-required="true"
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
          <h1>Category: {awardTitle}</h1>
          <h6>Step {currentStep} of 5</h6>
        </div>
        {error && <div className="error" role="alert">{error}</div>}
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

export default RegistrationProductionlessMMTOE;