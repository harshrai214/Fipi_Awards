// // // src/components/RegistrationExploration.jsx

// // import React, { useState } from "react";
// // import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// // import { ChevronLeft, ChevronRight, Save } from "lucide-react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import "../styles/RegistrationExploration.css";
// // // import AttachmentList from './AttachmentList';

// // const initialTechnology = {
// //   technology_name: "",
// //   technology_provider: "",
// //   cost: "",
// //   areas_of_impact: "",
// //   remarks: "",
// // };

// // const explorationFields = [
// //   { num: "1", label: "2P Oil reserves accretion (MMT)", key: "oil_reserves" },
// //   { num: "2", label: "2P Gas reserves accretion (BCM)", key: "gas_reserves" },
// //   { num: "3", label: "Total Reserves Accreted (MTOE)", key: "total_reserves" },
// //   { num: "4", label: "Finding Cost (INR Million)", key: "finding_cost" },
// //   {
// //     num: "5",
// //     label: "Total Number of exploratory wells drilled",
// //     key: "exploratory_wells",
// //   },
// //   {
// //     num: "6",
// //     label: "Number of Hydrocarbon Bearing wells",
// //     key: "hydrocarbon_wells",
// //   },
// //   {
// //     num: "7.1",
// //     label: "Total Seismic Activity - 2D LKM",
// //     key: "seismic_activity_2d",
// //   },
// //   {
// //     num: "7.2",
// //     label: "Total Seismic Activity - 3D SKM",
// //     key: "seismic_activity_3d",
// //   },
// //   {
// //     num: "8",
// //     label: "Total Energy Consumed (GJ) in Exploration",
// //     key: "energy_exploration",
// //   },
// //   {
// //     num: "8.1",
// //     label: "Total Energy Consumed by the Company (GJ)",
// //     key: "energy_company",
// //   },
// //   {
// //     num: "8.2",
// //     label: "Total Capex of the Company (INR Crores)",
// //     key: "capex_company",
// //   },
// //   {
// //     num: "8.3",
// //     label: "Total Opex of the Company (INR Crores)",
// //     key: "opex_company",
// //   },
// //   {
// //     num: "8.4",
// //     label: "Capex for Exploration (INR Crores)",
// //     key: "capex_exploration",
// //   },
// //   {
// //     num: "8.5",
// //     label: "Opex for Exploration (INR Crores)",
// //     key: "opex_exploration",
// //   },
// //   {
// //     num: "9",
// //     label: "Number of Exploratory Blocks acquired through Partnership",
// //     key: "blocks_partnership",
// //   },
// //   {
// //     num: "9.1",
// //     label: "Number of Exploratory Blocks acquired Standalone",
// //     key: "blocks_standalone",
// //   },
// // ];

// // export default function RegistrationExploration() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const awardTitle =
// //     location.state?.awardTitle || "Oil & Gas Exploration Company of the Year";

// //   const [formData, setFormData] = useState({
// //     // Step 1
// //     organisation_name: "",
// //     category: "Exploration Company of the Year",
// //     mailing_address: "",

// //     // Applicant
// //     firstname: "",
// //     lastname: "",
// //     userid: "",
// //     company_name: "",

// //     // Authority
// //     authority_name: "",
// //     authority_title: "",
// //     authority_phone: "",
// //     authority_email: "",
// //     approving_authority_file: null,

// //     // Contact
// //     contact_name: "",
// //     contact_phone: "",
// //     contact_email: "",

// //     // Company Profile
// //     company_profile: "",

// //     // quantitative fields for 2024 & 2023
// //     ...explorationFields.reduce(
// //       (acc, { key }) => ({
// //         ...acc,
// //         [`${key}2024`]: "",
// //         [`${key}2023`]: "",
// //       }),
// //       {}
// //     ),
// //     // technologies
// //     technologies: Array(5).fill({ ...initialTechnology }),

// //     // attachments (if used)
// //     attachments1: { description: "", file: null },
// //     attachments2: { description: "", file: null },
// //     attachments3: { description: "", file: null },
// //     attachments4: { description: "", file: null },

// //     // final signed form
// //     signed_form_file: null,

// //     // comments & declaration
// //     comment: "",
// //     declaration: false,

// //     // errors & fileError
// //     errors: {},
// //     fileError: "",
// //   });

// //   const handleAttachmentChange = (key, field, value) => {
// //     if (field === 'file' && value) {
// //       const file = value;
// //       const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

// //       let errorMsg = '';

// //       if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
// //         errorMsg = 'Only JPG, PNG, and PDF files are allowed for attachments.';
// //       } else if (file.size > maxSizeInBytes) {
// //         errorMsg = 'File size must not exceed 5 MB for attachments.';
// //       }
// //     }
// //     setFormData((prev) => ({
// //       ...prev,
// //       [key]: {
// //         ...prev[key],
// //         [field]: value,
// //       },
// //     }));
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((f) => ({
// //       ...f,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const handleTechChange = (i, field, val) => {
// //     setFormData((f) => {
// //       const techs = [...f.technologies];
// //       techs[i] = { ...techs[i], [field]: val };
// //       return { ...f, technologies: techs };
// //     });
// //   };

// //   // handles file inputs by field name
// //   const handleFile = (e, fieldName) => {
// //     const file = e.target.files[0];
// //     if (file && file.size > 5 * 1024 * 1024) {
// //       setFormData((f) => ({ ...f, fileError: "Max file size 5 MB" }));
// //     } else {
// //       setFormData((f) => ({ ...f, [fieldName]: file, fileError: "" }));
// //     }
// //   };

// //   const [step, setStep] = useState(1);



// //   const next = () => {
// //     let newErrors = {};

// //     if (step === 1 && !formData.organisation_name) {
// //       newErrors.organisation_name = 'Organisation name is required.';
// //     }

// //     if (step === 1 && !formData.mailing_address?.trim()) {
// //       newErrors.mailing_address = 'Mailing address is required.';
// //     }

// //     if (step === 2 && !formData.authority_name) {
// //       newErrors.authority_name = 'Authority name is required.';
// //     }

// //     if (step === 2 && !formData.authority_title) {
// //       newErrors.authority_title = 'Authority designation is required.';
// //     }
// //     if (step === 2 && !formData.authority_email) {
// //       newErrors.authority_email = 'Authority email is required.';
// //     }
// //     if (step === 2 && !formData.authority_phone) {
// //       newErrors.authority_phone = 'Authority phone is required.';
// //     }

// //     if (Object.keys(newErrors).length > 0) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         errors: newErrors,
// //       }));
// //       return;
// //     }

// //     setFormData((prev) => ({
// //       ...prev,
// //       errors: {},
// //     }));

// //     setStep((s) => Math.min(5, s + 1));
// //   };


// //   const prev = () => setStep((s) => Math.max(1, s - 1));

// //   const saveDraft = () => {
// //     localStorage.setItem("registrationDraft", JSON.stringify(formData));
// //     alert("Draft saved");
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (step === 5 && !formData.declaration) {
// //       alert("Please accept the declaration before submitting.");
// //       return;
// //     }


// //     const fd = new FormData();

// //     // map your frontend keys to backend keys if needed
// //     const keyMapping = {
// //       // oil_reserves2024: 'oilReserves2024',
// //       // /* …other mappings… */
// //       // blocks_standalone2023: 'blocksStandalone2023'

// //       oil_reserves2024: "oilReserves2024",
// //       oil_reserves2023: "oilReserves2023",
// //       gas_reserves2024: "gasReserves2024",
// //       gas_reserves2023: "gasReserves2023",
// //       total_reserves2024: "totalReserves2024",
// //       total_reserves2023: "totalReserves2023",
// //       finding_cost2024: "findingCost2024",
// //       finding_cost2023: "findingCost2023",
// //       exploratory_wells2024: "exploratoryWells2024",
// //       exploratory_wells2023: "exploratoryWells2023",
// //       hydrocarbon_wells2024: "hydrocarbonWells2024",
// //       hydrocarbon_wells2023: "hydrocarbonWells2023",
// //       seismic_activity_2d2024: "seismicActivity2D2024",
// //       seismic_activity_2d2023: "seismicActivity2D2023",
// //       seismic_activity_3d2024: "seismicActivity3D2024",
// //       seismic_activity_3d2023: "seismicActivity3D2023",
// //       energy_exploration2024: "energyExploration2024",
// //       energy_exploration2023: "energyExploration2023",
// //       energy_company2024: "energyCompany2024",
// //       energy_company2023: "energyCompany2023",
// //       capex_company2024: "capexCompany2024",
// //       capex_company2023: "capexCompany2023",
// //       opex_company2024: "opexCompany2024",
// //       opex_company2023: "opexCompany2023",
// //       capex_exploration2024: "capexExploration2024",
// //       capex_exploration2023: "capexExploration2023",
// //       opex_exploration2024: "opexExploration2024",
// //       opex_exploration2023: "opexExploration2023",
// //       blocks_partnership2024: "blocksPartnership2024",
// //       blocks_partnership2023: "blocksPartnership2023",
// //       blocks_standalone2024: "blocksStandalone2024",
// //       blocks_standalone2023: "blocksStandalone2023",
// //     };

// //     Object.entries(formData).forEach(([k, v]) => {
// //       const backendKey = keyMapping[k] || k;

// //       // special‐case attachments1…4
// //       if (k.startsWith("attachments")) {
// //         // v = { description, file }
// //         if (v.file instanceof File) {
// //           fd.append(backendKey, v.file, v.file.name);
// //         }
// //         if (v.description) {
// //           fd.append(`${backendKey}_description`, v.description);
// //         }
// //         return;
// //       }

// //       // single-file fields
// //       if (v instanceof File) {
// //         fd.append(backendKey, v, v.name);
// //         return;
// //       }

// //       // primitives (string, number, boolean)
// //       if (typeof v !== "object" && v != null) {
// //         fd.append(backendKey, String(v));
// //       }
// //     });

// //     // technologies as JSON string
// //     fd.append("technologies", JSON.stringify(formData.technologies));

// //     // debug export
// //     for (let [key, value] of fd.entries()) {
// //       console.log(key, value);
// //     }

// //     try {
// //       const url = `${ACTIVE_API_BASE_URL}/registrations/`;
// //       const res = await fetch(url, {
// //         method: "POST",
// //         body: fd, // let browser set multipart/form-data header
// //       });
// //       const payload = await res.json();
// //       if (!res.ok) {
// //         console.error("API errors:", payload);
// //         return alert("Submission error—see console.");
// //       }
// //       alert("Submitted successfully!");
// //       navigate("/thank-you");
// //     } catch (err) {
// //       console.error("Network/CORS error", err);
// //       alert("Network error—see console.");
// //     }
// //   };

// //   // Render logic for each step (unchanged CSS class names)
// //   const renderStep = () => {
// //     const progress = ((step - 1) / 4) * 100;
// //     return (
// //       <>
// //         <div className="progress-bar">
// //           <div className="progress" style={{ width: `${progress}%` }} />
// //         </div>

// //         {step === 1 && (
// //           <div className="form-step">
// //             <h3 className="step-title">Step 1: Organization Details</h3>
// //             <div className="form-group">
// //               <label>
// //                 Organisation Name<span className="text-red">*</span>
// //               </label>
// //               <input
// //                 name="organisation_name"
// //                 value={formData.organisation_name}
// //                 onChange={(e) => {
// //                   const value = e.target.value;
// //                   if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
// //                     handleChange(e);
// //                   }
// //                 }}
// //                 className={`form-input ${formData.errors.organisation_name ? "has-error" : ""
// //                   }`}
// //               />
// //               {formData.errors.organisation_name && (
// //                 <span className="error-tooltip">
// //                   {formData.errors.organisation_name}
// //                 </span>
// //               )}
// //             </div>
// //             <div className="form-group">
// //               <label>
// //                 Select Category<span className="text-red">*</span>
// //               </label>
// //               <select
// //                 name="category"
// //                 value={formData.category}
// //                 onChange={handleChange}
// //                 className="form-input"
// //               >
// //                 <option>Exploration Company of the Year</option>
// //                 {/* …other options… */}
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label>
// //                 Postal Address<span className="text-red">*</span>
// //               </label>
// //               <textarea
// //                 name="mailing_address"
// //                 value={formData.mailing_address}
// //                 onChange={handleChange}
// //                 className={`form-textarea ${formData.errors.mailing_address ? "has-error" : ""
// //                   }`}
// //                 rows={3}
// //               />
// //               {formData.errors.mailing_address && (
// //                 <span className="error-tooltip">
// //                   {formData.errors.mailing_address}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {step === 2 && (
// //           <div className="form-step">
// //             <h3 className="step-title">Step 2: Authority & Contact</h3>
// //             <div className="form-group">
// //               <label>
// //                 Authority Name<span className="text-red">*</span>
// //               </label>
// //               <input
// //                 name="authority_name"
// //                 value={formData.authority_name}
// //                 required
// //                 onChange={(e) => {
// //                   const value = e.target.value;
// //                   if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
// //                     handleChange(e);
// //                   }
// //                 }}
// //                 className={`form-input ${formData.errors.authority_name ? "has-error" : ""}`}

// //               />
// //               {formData.errors.authority_name && (
// //                 <span className="error-tooltip">
// //                   {formData.errors.authority_name}
// //                 </span>
// //               )}
// //             </div>
// //             <div className="form-group">
// //               <label>Designation</label>
// //               <input
// //                 name="authority_title"
// //                 value={formData.authority_title}
// //                 required
// //                 onChange={(e) => {
// //                   const value = e.target.value;
// //                   if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
// //                     handleChange(e);
// //                   }
// //                 }}
// //                 className={`form-input ${formData.errors.authority_title ? "has-error" : ""}`}
// //               />
// //               {formData.errors.authority_title && (
// //                 <span className="error-tooltip">
// //                   {formData.errors.authority_title}
// //                 </span>
// //               )}
// //             </div>
// //             <div className="form-group">
// //               <label>Phone</label>
// //               <input
// //                 type="tel"
// //                 name="authority_phone"
// //                 value={formData.authority_phone}

// //                 onChange={(e) => {
// //                   const value = e.target.value;
// //                   if (/^\d{0,10}$/.test(value)) {
// //                     handleChange(e);
// //                   }
// //                 }}
// //                 className={`form-input ${formData.errors.authority_phone ? "has-error" : ""}`}
// //               />
// //               {formData.errors.authority_phone && (
// //                 <span className="error-tooltip">
// //                   {formData.errors.authority_phone}
// //                 </span>
// //               )}
// //             </div>
// //             <div className="form-group">
// //               <label>Email</label>
// //               <input
// //                 type="email"
// //                 name="authority_email"
// //                 value={formData.authority_email}
// //                 onChange={handleChange}
// //                 className={`form-input ${formData.errors.authority_email ? "has-error" : ""}`}
// //               />
// //               {formData.errors.authority_email && (
// //                 <span className="error-tooltip">
// //                   {formData.errors.authority_email}
// //                 </span>
// //               )}
// //             </div>

// //             <div className="form-group">

// //               <label>
// //                 <input
// //                   type="checkbox"
// //                   name="copy_applicant"
// //                   onChange={(e) => {
// //                     if (e.target.checked) {
// //                       setFormData((f) => ({
// //                         ...f,

// //                         contact_email: f.authority_email,
// //                         contact_phone: f.authority_phone,
// //                       }));
// //                     } else {
// //                       setFormData((f) => ({
// //                         ...f,

// //                         contact_email: "",
// //                         contact_phone: "",
// //                       }));
// //                     }
// //                   }}
// //                 />{" "}
// //                 Same as applicant
// //               </label>
// //             </div>
// //             <div className="form-group">
// //               <input
// //                 placeholder="Contact Name"
// //                 name="contact_name"
// //                 value={formData.contact_name}
// //                 onChange={handleChange}
// //                 className="form-input"
// //               />
// //             </div>
// //             <div className="form-group">
// //               <input
// //                 type="text"
// //                 placeholder="Contact Phone"
// //                 name="contact_phone"
// //                 value={formData.contact_phone}
// //                 onChange={(e) => {
// //                   const value = e.target.value;
// //                   if (/^\d{0,10}$/.test(value)) {
// //                     handleChange(e);
// //                   }
// //                 }}
// //                 className={`form-input ${formData.contactPhone && formData.contactPhone.length < 10 ? 'has-error' : ''
// //                   }`}
// //                 disabled={formData.contact_phone}
// //               />
// //             </div>
// //             <div className="form-group">
// //               <input
// //                 type="email"
// //                 placeholder="Contact Email"
// //                 name="contact_email"
// //                 value={formData.contact_email}
// //                 onChange={handleChange}
// //                 className="form-input"
// //                 disabled={formData.contact_email}
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label>Company Profile and Activities (2024–25)</label>
// //               <textarea
// //                 name="company_profile"
// //                 value={formData.company_profile}
// //                 onChange={handleChange}
// //                 className="form-textarea"
// //                 rows={4}
// //               />
// //             </div>
// //           </div>
// //         )}

// //         {step === 3 && (
// //           <div className="form-step">
// //             <h3 className="step-title">Step 3: Exploration Data Part 1</h3>
// //             <table className="quant-table">
// //               <thead>
// //                 <tr>
// //                   <th>S.No</th>
// //                   <th>Particulars</th>
// //                   <th>2024‑25</th>
// //                   <th>2023‑24</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {explorationFields.slice(0, 5).map(({ num, label, key }) => (
// //                   <tr key={num}>
// //                     <td className="sno-cell">{num}</td>
// //                     <td className="label-cell">{label}</td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         name={`${key}2024`}
// //                         value={formData[`${key}2024`]}
// //                         onChange={handleChange}
// //                         className="form-input"
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         name={`${key}2023`}
// //                         value={formData[`${key}2023`]}
// //                         onChange={handleChange}
// //                         className="form-input"
// //                       />
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {step === 4 && (
// //           <div className="form-step">
// //             <h3 className="step-title">
// //               Step 4: Exploration Data Part 2 & Technologies
// //             </h3>
// //             <table className="quant-table">
// //               <thead>
// //                 <tr>
// //                   <th>S.No</th>
// //                   <th>Particulars</th>
// //                   <th>2024‑25</th>
// //                   <th>2023‑24</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {explorationFields.slice(5).map(({ num, label, key }) => (
// //                   <tr key={num}>
// //                     <td className="sno-cell">{num}</td>
// //                     <td className="label-cell">{label}</td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         name={`${key}2024`}
// //                         value={formData[`${key}2024`]}
// //                         onChange={handleChange}
// //                         className="form-input"
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         name={`${key}2023`}
// //                         value={formData[`${key}2023`]}
// //                         onChange={handleChange}
// //                         className="form-input"
// //                       />
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             <table className="quant-table">
// //               <thead>
// //                 <tr>
// //                   <th>S.No</th>
// //                   <th>Technology Name</th>
// //                   <th>Provider</th>
// //                   <th>Cost (INR Crores)</th>
// //                   <th>Areas of Impact</th>
// //                   <th>Remarks</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {formData.technologies.map((t, i) => (
// //                   <tr key={i}>
// //                     <td className="sno-cell">{i + 1}</td>
// //                     <td>
// //                       <input
// //                         type="text"
// //                         value={t.technology_name}
// //                         onChange={(e) =>
// //                           handleTechChange(i, "technology_name", e.target.value)
// //                         }
// //                         className="form-input"
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="text"
// //                         value={t.technology_provider}
// //                         onChange={(e) =>
// //                           handleTechChange(
// //                             i,
// //                             "technology_provider",
// //                             e.target.value
// //                           )
// //                         }
// //                         className="form-input"
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="number"
// //                         value={t.cost}
// //                         onChange={(e) =>
// //                           handleTechChange(i, "cost", e.target.value)
// //                         }
// //                         className="form-input"
// //                       />
// //                     </td>
// //                     <td>
// //                       <input
// //                         type="text"
// //                         value={t.areas_of_impact}
// //                         onChange={(e) =>
// //                           handleTechChange(i, "areas_of_impact", e.target.value)
// //                         }
// //                         className="form-input"
// //                       />
// //                     </td>
// //                     <td>
// //                       <textarea
// //                         rows={2}
// //                         value={t.remarks}
// //                         onChange={(e) =>
// //                           handleTechChange(i, "remarks", e.target.value)
// //                         }
// //                         className="form-textarea"
// //                       />
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             <div className="form-group">
// //               <label>Comments</label>
// //               <textarea
// //                 name="comment"
// //                 value={formData.comment}
// //                 onChange={handleChange}
// //                 className="form-textarea"
// //                 rows={3}
// //               />
// //             </div>
// //           </div>
// //         )}

// //         {step === 5 && (
// //           <div className="form-step">
// //             <h3 className="step-title">Step 5: Attachments & Declaration</h3>


// //             <div className="form-group">
// //               <label>List of Attachments (Optional):</label>
// //               <table className="quant-table">
// //                 <thead>
// //                   <tr>
// //                     <th>S. No.</th>
// //                     <th>Description</th>
// //                     <th>Upload (only jpg, png, pdf, max 5 MB each)</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {[1, 2, 3, 4].map((num) => {
// //                     const key = `attachments${num}`;
// //                     const attachment = formData[key];
// //                     return (
// //                       <tr key={key}>
// //                         <td>{num}</td>
// //                         <td>
// //                           <input
// //                             type="text"
// //                             name={`${key}.description`}
// //                             value={attachment.description}
// //                             onChange={(e) =>
// //                               handleAttachmentChange(
// //                                 key,
// //                                 "description",
// //                                 e.target.value
// //                               )
// //                             }
// //                             placeholder="Enter description"
// //                             className="form-input"
// //                           />
// //                         </td>
// //                         <td>
// //                           <input
// //                             type="file"
// //                             accept=".jpg,.png,.pdf"
// //                             onChange={(e) =>
// //                               handleAttachmentChange(
// //                                 key,
// //                                 "file",
// //                                 e.target.files[0]
// //                               )
// //                             }
// //                             className="form-input mt-4"
// //                           />
// //                           {attachment.file && (
// //                             <p className="file-name">
// //                               Selected file: {attachment.file.name}
// //                             </p>
// //                           )}
// //                         </td>
// //                       </tr>
// //                     );
// //                   })}
// //                 </tbody>
// //               </table>
// //             </div>

// //             <div className="form-group">
// //               <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
// //               <input
// //                 type="file"
// //                 accept=".jpg,.png,.pdf"
// //                 onChange={(e) => handleFile(e, "signed_form_file")}
// //                 className="form-input"
// //               />
// //               {formData.fileError && (
// //                 <span className="error">{formData.fileError}</span>
// //               )}
// //             </div>

// //             <div className="form-group declaration-section">
// //               <label className="declaration-label">
// //                 <input
// //                   type="checkbox"
// //                   name="declaration"
// //                   checked={formData.declaration}
// //                   onChange={handleChange}
// //                 />{" "}
// //                 I declare the information is true.
// //               </label>
// //             </div>

// //           </div>
// //         )}
// //       </>
// //     );
// //   };

// //   return (
// //     <div className="application-form">
// //       <div className="form-header">
// //         <h1>Registration Form: {awardTitle}</h1>
// //         <p>Step {step} of 5</p>
// //       </div>

// //       {formData.errors.global && (
// //         <div className="error">{formData.errors.global}</div>
// //       )}

// //       <form onSubmit={handleSubmit}>
// //         {renderStep()}

// //         <div
// //           className={step === 1 ? "form-navigation-step1" : "form-navigation"}
// //         >
// //           {step > 1 && (
// //             <button type="button" onClick={prev} className="btn btn-outline">
// //               <ChevronLeft size={16} /> Previous
// //             </button>
// //           )}

// //           <button type="button" onClick={saveDraft} className="btn btn-outline">
// //             <Save size={16} /> Save Draft
// //           </button>

// //           {step < 5 && (
// //             <button type="button" onClick={next} className="btn btn-primary">
// //               Next <ChevronRight size={16} />
// //             </button>
// //           )} 
// //           {step === 5 && (
// //             <button type="submit" className="btn btn-success">
// //               Submit
// //             </button>
// //           )}

// //         </div>
// //       </form>
// //     </div>
// //   );
// // }














// import React, { useState, useCallback, useEffect } from 'react';
// // import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SidebarGuideline from "./SidebarGuideline"
// import '../styles/RegistrationExploration.css';
// import TextField from "@mui/material/TextField";

// // Constants for max lengths
// const FIELD_MAX_LENGTH = 100;
// const COMPANY_PROFILE_MAX_LENGTH = 300;
// const COMMENT_MAX_LENGTH = 200;
// const TEXTAREA_MAX_LENGTH = 300;
// const PHONE_MAX_LENGTH = 10;

// // Validation regex
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /^\d{10}$/;

// const initialTechnology = {
//   technology_name: '',
//   technology_provider: '',
//   cost: '',
//   areas_of_impact: '',
//   remarks: '',
// };

// const explorationFields = [
//   { num: '1', label: '2P Oil reserves accretion (MMT)', key: 'oil_reserves' },
//   { num: '2', label: '2P Gas reserves accretion (BCM)', key: 'gas_reserves' },
//   { num: '3', label: 'Total Reserves Accreted (MTOE)', key: 'total_reserves' },
//   { num: '4', label: 'Finding Cost (INR Million)', key: 'finding_cost' },
//   { num: '5', label: 'Total Number of exploratory wells drilled', key: 'exploratory_wells' },
//   { num: '6', label: 'Number of Hydrocarbon Bearing wells', key: 'hydrocarbon_wells' },
//   { num: "7", label: "Total Seismic Activity", key: "seismic_activity" },
//   { num: '7.1', label: 'Total Seismic Activity - 2D LKM', key: 'seismic_activity_2d' },
//   { num: '7.2', label: 'Total Seismic Activity - 3D SKM', key: 'seismic_activity_3d' },
//   { num: '8', label: 'Total Energy Consumed (GJ) in Exploration', key: 'energy_exploration' },
//   { num: '8.1', label: 'Total Energy Consumed by the Company (GJ)', key: 'energy_company' },
//   { num: '8.2', label: 'Total Capex of the Company (INR Crores)', key: 'capex_company' },
//   { num: '8.3', label: 'Total Opex of the Company (INR Crores)', key: 'opex_company' },
//   { num: '8.4', label: 'Capex for Exploration (INR Crores)', key: 'capex_exploration' },
//   { num: '8.5', label: 'Opex for Exploration (INR Crores)', key: 'opex_exploration' },
//   { num: '9', label: 'Number of Exploratory Blocks acquired through Partnership', key: 'blocks_partnership' },
//   { num: '9.1', label: 'Number of Exploratory Blocks acquired Standalone', key: 'blocks_standalone' },
// ];


// const RegistrationExploration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeItem, setActiveItem] = useState(null);
//   const awardTitle = location.state?.awardTitle || 'Oil & Gas Exploration Company of the Year';

//   // Form state initialization
//   const [formData, setFormData] = useState({
//     organisation_name: '',
//     category: 'Exploration Company of the Year',
//     mailing_address: '',
//     authority_name: '',
//     authority_title: '',
//     authority_phone: '',
//     authority_email: '',
//     contact_name: '',
//     contact_phone: '',
//     contact_email: '',
//     company_profile: '',
//     approving_authority_file: null,
//     declaration: false,
//     comment: '',
//     ...explorationFields.reduce((acc, { key }) => ({
//       ...acc,
//       [key]: ['', ''], // [2024, 2023]
//     }), {}),
//     technologies: Array(5).fill({ ...initialTechnology }),
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
//       if (['company_profile',].includes(name)) applicableMaxLength = 200;
//       else if (name === 'comment' || name.includes('_remarks')) applicableMaxLength = COMMENT_MAX_LENGTH;

//       if (typeof value === 'string') {
//         if (name === 'company_profile') {
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
//         //  else if (value.length > applicableMaxLength) {
//         //   alert(`Value cannot exceed ${applicableMaxLength} characters.`);
//         //   return;
//         // }
//       }
//     }
//     // Name validation
//     if (['organisation_name', 'authority_name', 'contact_name'].includes(name)) {
//       const isValid = /^[A-Za-z\s]*$/.test(value);
//       if (!isValid && value !== '') {
//         alert('Only letters and spaces are allowed.');
//         return;
//       }
//     }

//     // Phone validation
//     if (name === 'authority_phone' || name === 'contact_phone') {
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
//       setFormData((prev) => {
//         const updatedArray = [...prev[name]];
//         updatedArray[index] = value;
//         return {
//           ...prev,
//           [name]: updatedArray,
//         };
//       });
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: typeof value === 'boolean' ? value : value,
//       }));
//     }

//     // Clear step-specific errors
//     if (name === 'organisation_name' && value && currentStep === 1) setError('');
//     if (name === 'mailing_address' && value.trim() && currentStep === 1) setError('');
//     if (name === 'authority_name' && value && currentStep === 2) setError('');
//     if (name === 'authority_title' && value && currentStep === 2) setError('');
//     if (name === 'authority_email' && value && currentStep === 2) setError('');
//     if (name === 'authority_phone' && value && currentStep === 2) setError('');
//   };

//   // Handle technology fields
//   const handleTechChange = (index, field, value) => {
//     let applicableMaxLength = FIELD_MAX_LENGTH;
//     if (field === 'remarks') applicableMaxLength = TEXTAREA_MAX_LENGTH;

//     if ((typeof value === 'string') && value.length > applicableMaxLength) {
//       alert(`Your value must not exceed ${applicableMaxLength} characters.`);
//       return;
//     }

//     if (field === 'cost' && value !== '' && Number(value) < 0) {
//       alert('Cost cannot be negative.');
//       return;
//     }

//     setFormData((prev) => {
//       const techs = [...prev.technologies];
//       techs[index] = { ...techs[index], [field]: value };
//       return { ...prev, technologies: techs };
//     });
//     clearFieldError(`technologies[${index}].${field}`);
//   };

//   // Handle checkbox for copying applicant data
//   const handleCopyApplicantToggle = (e) => {
//     const checked = e.target.checked;
//     setCopyApplicantData(checked);
//     if (checked) {
//       setFormData((prev) => ({
//         ...prev,
//         contact_name: prev.authority_name,
//         contact_email: prev.authority_email,
//         contact_phone: prev.authority_phone,
//       }));
//       clearFieldError('contact_name');
//       clearFieldError('contact_email');
//       clearFieldError('contact_phone');
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         contact_name: '',
//         contact_email: '',
//         contact_phone: '',
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

//   // Handle approving authority file upload
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
//         approving_authority_file: file,
//       }));
//       clearFieldError('approving_authority_file');
//     }
//   };

//   // Print form handler
//   const handlePrint = () => {
//     const printContent = `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
//         <h2>Organization & Contact Details</h2>
//         <p><strong>Organisation Name:</strong> ${formData.organisation_name || ''}</p>
//         <p><strong>Postal Address:</strong> ${formData.mailing_address || ''}</p>
//         <p><strong>Authority Name:</strong> ${formData.authority_name || ''}</p>
//         <p><strong>Authority Title:</strong> ${formData.authority_title || ''}</p>
//         <p><strong>Authority Phone:</strong> ${formData.authority_phone || ''}</p>
//         <p><strong>Authority Email:</strong> ${formData.authority_email || ''}</p>
//         <h2>Contacts Nodal Officials:</h2>
//         <p><strong>Contact Name:</strong> ${formData.contact_name || ''}</p>
//         <p><strong>Contact Phone:</strong> ${formData.contact_phone || ''}</p>
//         <p><strong>Contact Email:</strong> ${formData.contact_email || ''}</p>
//         <p><strong>Company Profile:</strong> ${formData.company_profile || ''}</p>
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
//             ${explorationFields.slice(0, 5).map(({ num, label, key }) => `
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
//             ${explorationFields.slice(5).map(({ num, label, key }) => `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 8px;">${num}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${label}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${formData[key][0] || ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${formData[key][1] || ''}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//         <h2>Technologies</h2>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//           <thead>
//             <tr>
//               <th style="border: 1px solid #000; padding: 8px;">S.No</th>
//               <th style="border: 1px solid #000; padding: 8px;">Technology Name</th>
//               <th style="border: 1px solid #000; padding: 8px;">Provider</th>
//               <th style="border: 1px solid #000; padding: 8px;">Cost (INR Crores)</th>
//               <th style="border: 1px solid #000; padding: 8px;">Areas of Impact</th>
//               <th style="border: 1px solid #000; padding: 8px;">Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${formData.technologies.map((t, i) => `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 8px;">${i + 1}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${t.technology_name || ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${t.technology_provider || ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${t.cost || ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${t.areas_of_impact || ''}</td>
//                 <td style="border: 1px solid #000; padding: 8px;">${t.remarks || ''}</td>
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
//       </div>
//     `;
//     const printWindow = window.open('', '', 'height=600,width=800');
//     printWindow.document.write(printContent);
//     printWindow.document.close();
//     printWindow.print();
//   };
//   const hasEmptyFieldsStep3 = () => {
//     for (const { key } of explorationFields.slice(0, 5)) {
//       const values = formData[key];
//       if (!values || values.some(v => v === '' || v === null || v === undefined)) {
//         return true;
//       }
//     }
//     return false;
//   };

//   const hasEmptyFieldsStep4 = () => {
//     // Check numeric inputs
//     for (const { key } of explorationFields.slice(5)) {
//       const values = formData[key];
//       if (!values || values.some(v => v === '' || v === null || v === undefined)) {
//         return true;
//       }
//     }

//     if (formData.technologies) {
//       for (const tech of formData.technologies) {

//         if (
//           !tech.technology_name?.trim() ||
//           !tech.technology_provider?.trim() ||
//           tech.cost === '' || tech.cost === null || tech.cost === undefined ||
//           !tech.areas_of_impact?.trim()
//         ) {
//           return true;
//         }

//       }
//     }
//     // Check comment field (optional or required based on your form spec, here we check)
//     if (!formData.comment || formData.comment.trim() === '') {
//       return true;
//     }
//     return false;
//   };

//   // Navigation handlers
//   const nextStep = () => {
//     if (currentStep === 1) {
//       if (!formData.organisation_name) {
//         alert('Organisation name is required.');
//         return;
//       }
//       if (!formData.mailing_address.trim()) {
//         alert('Mailing address is required.');
//         return;
//       }
//     }
//     if (currentStep === 2) {
//       if (!formData.authority_name) {
//         alert('Authority name is required.');
//         return;
//       }
//       if (!formData.authority_title) {
//         alert('Authority designation is required.');
//         return;
//       }
//       if (!formData.authority_email || !validateEmail(formData.authority_email)) {
//         alert('Please enter a valid Authority email.');
//         return;
//       }
//       if (!formData.authority_phone || !validatePhone(formData.authority_phone)) {
//         alert('Authority phone must be exactly 10 digits.');
//         return;
//       }
//       if (!formData.contact_name) {
//         alert('Contact name is required.');
//         return;
//       }
//       if (formData.contact_email && !validateEmail(formData.contact_email)) {
//         alert('Please enter a valid Contact email.');
//         return;
//       }
//       if (formData.contact_phone && !validatePhone(formData.contact_phone) && !copyApplicantData) {
//         alert('Contact phone must be exactly 10 digits.');
//         return;
//       }
//       if (!formData.company_profile) {
//         alert('Company Profile is required.');
//         return;
//       }
//     }
//     if (currentStep === 3 && hasEmptyFieldsStep3()) {
//       if (!window.confirm('Data not entered, If you wish to continue?')) {
//         return; // Stop advancing
//       }
//     }

//     if (currentStep === 4 && hasEmptyFieldsStep4()) {
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
//     localStorage.setItem('registrationExplorationDraft', JSON.stringify({ formData }));
//     alert('Draft Saved!');
//   };

//   // Submit form handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (currentStep === 5 && !formData.declaration) {
//       alert("Please accept the declaration before submitting.");
//       return;
//     }


//     const fd = new FormData();

//     // map your frontend keys to backend keys if needed
//     const keyMapping = {
//       // oil_reserves2024: 'oilReserves2024',
//       // /* …other mappings… */
//       // blocks_standalone2023: 'blocksStandalone2023'

//       oil_reserves2024: "oilReserves2024",
//       oil_reserves2023: "oilReserves2023",
//       gas_reserves2024: "gasReserves2024",
//       gas_reserves2023: "gasReserves2023",
//       total_reserves2024: "totalReserves2024",
//       total_reserves2023: "totalReserves2023",
//       finding_cost2024: "findingCost2024",
//       finding_cost2023: "findingCost2023",
//       exploratory_wells2024: "exploratoryWells2024",
//       exploratory_wells2023: "exploratoryWells2023",
//       hydrocarbon_wells2024: "hydrocarbonWells2024",
//       hydrocarbon_wells2023: "hydrocarbonWells2023",
//       seismic_activity_2d2024: "seismicActivity2D2024",
//       seismic_activity_2d2023: "seismicActivity2D2023",
//       seismic_activity_3d2024: "seismicActivity3D2024",
//       seismic_activity_3d2023: "seismicActivity3D2023",
//       energy_exploration2024: "energyExploration2024",
//       energy_exploration2023: "energyExploration2023",
//       energy_company2024: "energyCompany2024",
//       energy_company2023: "energyCompany2023",
//       capex_company2024: "capexCompany2024",
//       capex_company2023: "capexCompany2023",
//       opex_company2024: "opexCompany2024",
//       opex_company2023: "opexCompany2023",
//       capex_exploration2024: "capexExploration2024",
//       capex_exploration2023: "capexExploration2023",
//       opex_exploration2024: "opexExploration2024",
//       opex_exploration2023: "opexExploration2023",
//       blocks_partnership2024: "blocksPartnership2024",
//       blocks_partnership2023: "blocksPartnership2023",
//       blocks_standalone2024: "blocksStandalone2024",
//       blocks_standalone2023: "blocksStandalone2023",
//     };

//     Object.entries(formData).forEach(([k, v]) => {
//       const backendKey = keyMapping[k] || k;

//       // special‐case attachments1…4
//       if (k.startsWith("attachments")) {
//         // v = { description, file }
//         if (v.file instanceof File) {
//           fd.append(backendKey, v.file, v.file.name);
//         }
//         if (v.description) {
//           fd.append(`${backendKey}_description`, v.description);
//         }
//         return;
//       }

//       // single-file fields
//       if (v instanceof File) {
//         fd.append(backendKey, v, v.name);
//         return;
//       }

//       // primitives (string, number, boolean)
//       if (typeof v !== "object" && v != null) {
//         fd.append(backendKey, String(v));
//       }
//     });

//     // technologies as JSON string
//     fd.append("technologies", JSON.stringify(formData.technologies));

//     // debug export
//     for (let [key, value] of fd.entries()) {
//       console.log(key, value);
//     }

//     //   try {
//     //     const url = `${ACTIVE_API_BASE_URL}/registrations/`;
//     //     const res = await fetch(url, {
//     //       method: "POST",
//     //       body: fd, // let browser set multipart/form-data header
//     //     });
//     //     const payload = await res.json();
//     //     if (!res.ok) {
//     //       console.error("API errors:", payload);
//     //       return alert("Submission error—see console.");
//     //     }
//     //     alert("Submitted successfully!");
//     //     navigate("/thank-you");
//     //   } catch (err) {
//     //     console.error("Network/CORS error", err);
//     //     alert("Network error—see console.");
//     //   }
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
//               <label htmlFor="organisation_name">
//                 Organisation Name: <span aria-hidden="true" className="text-red">*</span>
//               </label>
//               <input
//                 id="organisation_name"
//                 name="organisation_name"
//                 type="text"
//                 maxLength={FIELD_MAX_LENGTH}
//                 value={formData.organisation_name}
//                 onChange={(e) => handleChange('organisation_name', e.target.value)}
//                 aria-describedby="organisation_name-error"
//                 className={`form-input ${!formData.organisation_name && currentStep === 1 ? 'has-error' : ''}`}
//                 placeholder="Enter organisation name"
//                 required
//               />
//               {fieldErrors.organisation_name && (
//                 <span className="error-tooltip" id="organisation_name-error" role="alert">
//                   {fieldErrors.organisation_name}
//                 </span>
//               )}
//               {!formData.organisation_name && currentStep === 1 && (
//                 <span className="error-tooltip" id="organisation_name-error" role="alert">
//                   Organisation name is required
//                 </span>
//               )}
//             </div>



//             <div className="form-group">
//               <label htmlFor="mailing_address">
//                 Postal Address: <span aria-hidden="true" className="text-red">*</span>
//               </label>
//               <textarea
//                 id="mailing_address"
//                 name="mailing_address"
//                 value={formData.mailing_address}
//                 rows={3}
//                 maxLength={FIELD_MAX_LENGTH}
//                 onChange={(e) => handleChange('mailing_address', e.target.value)}
//                 aria-describedby="mailing_address-error"
//                 placeholder="Enter postal address"
//                 className={`form-textarea ${!formData.mailing_address.trim() && currentStep === 1 ? 'has-error' : ''}`}
//                 required
//               />
//               {fieldErrors.mailing_address && (
//                 <span className="error-tooltip" id="mailing_address-error" role="alert">
//                   {fieldErrors.mailing_address}
//                 </span>
//               )}
//               {!formData.mailing_address.trim() && currentStep === 1 && (
//                 <span className="error-tooltip" id="mailing_address-error" role="alert">
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
//                   <label htmlFor="authority_name">
//                     Name: <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="authority_name"
//                     name="authority_name"
//                     type="text"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.authority_name}
//                     onChange={(e) => handleChange('authority_name', e.target.value)}
//                     aria-describedby="authority_name-error"
//                     placeholder="Name"
//                     className={`form-input ${!formData.authority_name && currentStep === 2 ? 'has-error' : ''}`}
//                     required
//                   />
//                   {fieldErrors.authority_name && (
//                     <span className="error-tooltip" id="authority_name-error" role="alert">
//                       {fieldErrors.authority_name}
//                     </span>
//                   )}
//                   {!formData.authority_name && currentStep === 2 && (
//                     <span className="error-tooltip" id="authority_name-error" role="alert">
//                       Name is required
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="authority_title">
//                     Designation: <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="authority_title"
//                     name="authority_title"
//                     type="text"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.authority_title}
//                     onChange={(e) => handleChange('authority_title', e.target.value)}
//                     aria-describedby="authority_title-error"
//                     placeholder="Designation"
//                     className={`form-input ${!formData.authority_title && currentStep === 2 ? 'has-error' : ''}`}
//                     required
//                   />
//                   {fieldErrors.authority_title && (
//                     <span className="error-tooltip" id="authority_title-error" role="alert">
//                       {fieldErrors.authority_title}
//                     </span>
//                   )}
//                   {!formData.authority_title && currentStep === 2 && (
//                     <span className="error-tooltip" id="authority_title-error" role="alert">
//                       Designation is required
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="authority_phone">
//                     Phone Number: <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="authority_phone"
//                     name="authority_phone"
//                     type="tel"
//                     maxLength={PHONE_MAX_LENGTH}
//                     value={formData.authority_phone}
//                     onChange={(e) => handleChange('authority_phone', e.target.value)}
//                     aria-describedby="authority_phone-error"
//                     placeholder="10-digit phone number"
//                     className={`form-input ${!formData.authority_phone && currentStep === 2 ? 'has-error' : ''}`}
//                     required
//                   />
//                   {fieldErrors.authority_phone && (
//                     <span className="error-tooltip" id="authority_phone-error" role="alert">
//                       {fieldErrors.authority_phone}
//                     </span>
//                   )}
//                   {!formData.authority_phone && currentStep === 2 && (
//                     <span className="error-tooltip" id="authority_phone-error" role="alert">
//                       Phone is required
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="authority_email">
//                     Email Address:<span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="authority_email"
//                     name="authority_email"
//                     type="email"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.authority_email}
//                     onChange={(e) => handleChange('authority_email', e.target.value)}
//                     aria-describedby="authority_email-error"
//                     placeholder="Approving authority's email"
//                     className={`form-input ${!formData.authority_email && currentStep === 2 ? 'has-error' : ''}`}
//                     required
//                   />
//                   {fieldErrors.authority_email && (
//                     <span className="error-tooltip" id="authority_email-error" role="alert">
//                       {fieldErrors.authority_email}
//                     </span>
//                   )}
//                   {!formData.authority_email && currentStep === 2 && (
//                     <span className="error-tooltip" id="authority_email-error" role="alert">
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
//                   <label htmlFor="contact_name">
//                     Name <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="contact_name"
//                     name="contact_name"
//                     type="text"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.contact_name}
//                     onChange={(e) => handleChange('contact_name', e.target.value)}
//                     placeholder="Contact name"
//                     disabled={copyApplicantData}
//                     className={`form-input ${!formData.contact_name && currentStep === 2 ? 'has-error' : ''}`}
//                     aria-describedby="contact_name-error"
//                     required
//                   />
//                   {fieldErrors.contact_name && (
//                     <span className="error-tooltip" id="contactName-error" role="alert">
//                       {fieldErrors.contact_name}
//                     </span>
//                   )}
//                   {!formData.contact_name && currentStep === 2 && (
//                     <span className="error-tooltip" id="contactName-error" role="alert">
//                       Name is required
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="contact_phone">
//                     Phone Number: <span aria-hidden="true" className="text-red">*</span>
//                   </label>
//                   <input
//                     id="contact_phone"
//                     name="contact_phone"
//                     type="tel"
//                     maxLength={PHONE_MAX_LENGTH}
//                     value={formData.contact_phone}
//                     onChange={(e) => handleChange('contact_phone', e.target.value)}
//                     aria-describedby="contact_phone-error"
//                     placeholder="10-digit phone number"
//                     disabled={copyApplicantData}
//                     className={`form-input ${!formData.contact_phone && currentStep === 2 ? 'has-error' : ''}`}
//                     required
//                   />
//                   {fieldErrors.contact_phone && (
//                     <span className="error-tooltip" id="authority_phone-error" role="alert">
//                       {fieldErrors.authority_phone}
//                     </span>
//                   )}
//                   {!formData.contact_phone && currentStep === 2 && (
//                     <span className="error-tooltip" id="authority_phone-error" role="alert">
//                       Phone is required
//                     </span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="contact_email">Email</label>
//                   <input
//                     id="contact_email"
//                     name="contact_email"
//                     type="email"
//                     maxLength={FIELD_MAX_LENGTH}
//                     value={formData.contact_email}
//                     onChange={(e) => handleChange('contact_email', e.target.value)}
//                     placeholder="Contact email"
//                     disabled={copyApplicantData}
//                     className={`form-input ${fieldErrors.contact_email ? 'has-error' : ''}`}
//                     aria-describedby="contact_email-error"
//                   />
//                   {fieldErrors.contact_email && (
//                     <span className="error-tooltip" id="contact_email-error" role="alert">
//                       {fieldErrors.contact_email}
//                     </span>
//                   )}
//                 </div>
//               </section>
//             </div>

//             <div className="form-group">
//               <label htmlFor="company_profile">Brief write up on company profile and the activities with specific reference to
//                 Exploration operations during the year 2024-25.</label>
//               <p className="note">(within 300 words) </p>
//               <textarea
//                 id="company_profile"
//                 name="company_profile"
//                 value={formData.company_profile}
//                 rows={6}
//                 // maxLength={COMPANY_PROFILE_MAX_LENGTH}
//                 onChange={(e) => handleChange('company_profile', e.target.value)}
//                 className="form-textarea"
//                 placeholder="Enter company profile"
//               />
//               {fieldErrors.company_profile && (
//                 <span className="error-tooltip" id="company_profile-error" role="alert">
//                   {fieldErrors.company_profile}
//                 </span>
//               )}
//             </div>
//           </>
//         )}


//         {currentStep === 3 && (
//           <>
//             <h3 className="step-title">Step 3: Quantitative Information - Part 1</h3>
//             <table className="quant-table">
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Particulars</th>
//                   <th>2024-25</th>
//                   <th>2023-24</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {explorationFields.slice(0, 5).map(({ num, label, key }) => (
//                   <tr key={key || num}>
//                     <td>{num}</td>
//                     <td>{label}</td>
//                     {/* Input for 2024 */}
//                     <td>
//                       {/* <input
//                         type="text"
//                         min={0}
//                         name={key}
//                         value={Array.isArray(formData[key]) ? formData[key][0] || '' : ''}
//                         onChange={e => {
//                           let val = e.target.value;

//                           // Allow only digits (0-9)
//                           val = val.replace(/\D/g, "");

//                           handleChange(e.target.name, val, 0);
//                         }}
//                         className="form-input no-spinner"
//                       /> */}
//                       <TextField
//                         variant="outlined"
//                         fullWidth
//                         size="small"
//                         inputProps={{
//                           inputMode: "decimal", // brings up numeric keypad on mobile
//                           pattern: "[0-9]*\\.?[0-9]*", // allows digits + decimal
//                         }}
//                         name={key}
//                         value={Array.isArray(formData[key]) ? formData[key][0] || "" : ""}
//                         onChange={(e) => {
//                           let val = e.target.value;

//                           // Allow only digits and one decimal point
//                           val = val.replace(/[^0-9.]/g, ""); // remove non-numeric except "."
//                           const parts = val.split(".");
//                           if (parts.length > 2) {
//                             // keep only first decimal point
//                             val = parts[0] + "." + parts.slice(1).join("");
//                           }

//                           handleChange(e.target.name, val, 0);
//                         }}
//                         onWheel={(e) => e.target.blur()} // prevent mouse scroll increment
//                         onKeyDown={(e) => {
//                           // Prevent arrow up/down, exponential 'e', and plus/minus signs
//                           if (
//                             e.key === "ArrowUp" ||
//                             e.key === "ArrowDown" ||
//                             e.key === "e" ||
//                             e.key === "E" ||
//                             e.key === "+" ||
//                             e.key === "-"
//                           ) {
//                             e.preventDefault();
//                           }
//                         }}
//                       />




//                       {fieldErrors[`${key}[0]`] && (
//                         <span className="error-tooltip" role="alert">{fieldErrors[`${key}[0]`]}</span>
//                       )}
//                     </td>
//                     {/* Input for 2023 */}
//                     <td>
//                       {/* <input
//                         type="text"
//                         min={0}
//                         name={key}
//                         value={Array.isArray(formData[key]) ? formData[key][1] || '' : ''}
//                         onChange={e => {
//                           let val = e.target.value;

//                           // Allow only digits (0-9)
//                           val = val.replace(/\D/g, "");

//                           handleChange(e.target.name, val, 1);
//                         }}
//                         className="form-input no-spinner"
//                       /> */}
//                       <TextField
//                         variant="outlined"
//                         fullWidth
//                         size="small"
//                         inputProps={{
//                           inputMode: "decimal",
//                           pattern: "[0-9]*\\.?[0-9]*",
//                         }}
//                         name={key}
//                         value={Array.isArray(formData[key]) ? formData[key][1] || "" : ""}
//                         onChange={(e) => {
//                           let val = e.target.value;


//                           val = val.replace(/[^0-9.]/g, "");
//                           const parts = val.split(".");
//                           if (parts.length > 2) {

//                             val = parts[0] + "." + parts.slice(1).join("");
//                           }

//                           handleChange(e.target.name, val, 1);
//                         }}
//                         onWheel={(e) => e.target.blur()}
//                         onKeyDown={(e) => {

//                           if (
//                             e.key === "ArrowUp" ||
//                             e.key === "ArrowDown" ||
//                             e.key === "e" ||
//                             e.key === "E" ||
//                             e.key === "+" ||
//                             e.key === "-"
//                           ) {
//                             e.preventDefault();
//                           }
//                         }}
//                       />


//                       {fieldErrors[`${key}[1]`] && (
//                         <span className="error-tooltip" role="alert">{fieldErrors[`${key}[1]`]}</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}

//         {/* Step 4: Quantitative Information - Part 2 and Technologies */}
//         {currentStep === 4 && (
//           <>
//             <h3 className="step-title">Step 4: Quantitative Information - Part 2</h3>
//             <table className="quant-table">
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Particulars</th>
//                   <th>2024-25</th>
//                   <th>2023-24</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {explorationFields.slice(5).map(({ num, label, key }) => {
//                   if (!key) {
//                     // Non-input row
//                     return (
//                       <tr key={num}>
//                         <td>{num}</td>
//                         <td>{label}</td>
//                         <td colSpan={2} className="non-editable-cell">—</td>
//                       </tr>
//                     );
//                   }

//                   // Check if main 8 is fully filled
//                   const isMain8Filled =
//                     Array.isArray(formData["energy_exploration"]) &&
//                     formData["energy_exploration"].every(
//                       v => v !== "" && v !== null && v !== undefined
//                     );

//                   // Check if any of the subitems 8.1–8.5 have values
//                   const isAnySubFilled = ["8.1", "8.2", "8.3", "8.4", "8.5"].some(subNum => {
//                     const subKey = explorationFields.find(f => f.num === subNum)?.key;
//                     return (
//                       subKey &&
//                       Array.isArray(formData[subKey]) &&
//                       formData[subKey].some(v => v !== "" && v !== null && v !== undefined)
//                     );
//                   });

//                   // Disable subfields if main 8 is filled
//                   const disableSubFields =
//                     isMain8Filled && ["8.1", "8.2", "8.3", "8.4", "8.5"].includes(num);

//                   // Disable main 8 if any subitem is filled
//                   const disableMain8 =
//                     num === "8" && isAnySubFilled;

//                   return (
//                     <tr key={key}>
//                       <td>{num}</td>
//                       <td>{label}</td>
//                       {[0, 1].map((yearIndex) => (
//                         <td key={yearIndex}>
//                           <TextField
//                             type="text" // keep text to avoid browser spinners
//                             variant="outlined"
//                             size="small"
//                             fullWidth
//                             name={key}
//                             value={
//                               Array.isArray(formData[key])
//                                 ? formData[key][yearIndex] ?? ""
//                                 : ""
//                             }
//                             onChange={(e) => {
//                               let val = e.target.value;

//                               // Allow only digits and one decimal point
//                               val = val.replace(/[^0-9.]/g, "");
//                               const parts = val.split(".");
//                               if (parts.length > 2) {
//                                 // keep only the first decimal point
//                                 val = parts[0] + "." + parts.slice(1).join("");
//                               }

//                               handleChange(e.target.name, val, yearIndex);
//                             }}
//                             onKeyDown={(e) => {
//                               // block arrows, minus, exponential, plus
//                               if (
//                                 ["-", "+", "e", "E"].includes(e.key) ||
//                                 e.key === "ArrowUp" ||
//                                 e.key === "ArrowDown"
//                               ) {
//                                 e.preventDefault();
//                               }
//                             }}
//                             onWheel={(e) => e.target.blur()} // disable mouse scroll
//                             className="form-input no-spinner"
//                             disabled={disableSubFields || disableMain8}

//                             sx={{
//                               "& .MuiInputBase-root.Mui-disabled": {
//                                 backgroundColor: "#f5f5f5",
//                                 color: "rgba(0,0,0,0.6)",
//                               },
//                             }}
//                             inputProps={{
//                               inputMode: "decimal", // mobile keypad for decimal/numeric
//                               pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
//                             }}
//                           />
//                           {fieldErrors[`${key}[${yearIndex}]`] && (
//                             <span className="error-tooltip" role="alert">
//                               {fieldErrors[`${key}[${yearIndex}]`]}
//                             </span>
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>


//             <table className="quant-table">
//               <thead>
//                 <tr>
//                   <td>10</td>
//                   <td>New Technologies Adopted </td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                 </tr>
//               </thead>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Technology Name</th>
//                   <th>Technology Provider</th>
//                   <th>Cost of the Technology (INR Crores) </th>
//                   <th>Areas of Impact </th>
//                   <th>Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {formData.technologies && formData.technologies.map((tech, i) => (
//                   <tr key={i}>
//                     <td>{i + 1}</td>
//                     <td>
//                       <input
//                         type="text"
//                         name={`technologies.${i}.technology_name`}
//                         maxLength={FIELD_MAX_LENGTH}
//                         value={tech.technology_name || ''}
//                         onChange={e => handleTechChange(i, 'technology_name', e.target.value)}
//                         className="form-input"
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name={`technologies.${i}.technology_provider`}
//                         maxLength={FIELD_MAX_LENGTH}
//                         value={tech.technology_provider || ''}
//                         onChange={e => handleTechChange(i, 'technology_provider', e.target.value)}
//                         className="form-input"
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         min={0}
//                         name={`technologies.${i}.cost`}
//                         value={tech.cost || ''}
//                         onChange={e => handleTechChange(i, 'cost', e.target.value)}
//                         className="form-input"
//                         onKeyDown={e => {
//                           if (['-', 'e', 'E'].includes(e.key)) e.preventDefault();
//                         }}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name={`technologies.${i}.areas_of_impact`}
//                         maxLength={FIELD_MAX_LENGTH}
//                         value={tech.areas_of_impact || ''}
//                         onChange={e => handleTechChange(i, 'areas_of_impact', e.target.value)}
//                         className="form-input"
//                       />
//                     </td>
//                     <td>
//                       <textarea
//                         rows={2}
//                         maxLength={50}
//                         name={`technologies.${i}.remarks`}
//                         value={tech.remarks || ''}
//                         onChange={e => handleTechChange(i, 'remarks', e.target.value)}
//                         className="form-textarea"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Comments Section */}
//             <div className="form-group" style={{ marginTop: '1rem' }}>
//               <label htmlFor="comment">Comments</label>
//               <textarea
//                 id="comment"
//                 name="comment"
//                 // maxLength={COMMENT_MAX_LENGTH}
//                 value={formData.comment || ''}
//                 onChange={e => handleChange(e.target.name, e.target.value)}
//                 className="form-textarea"
//                 rows={4}
//               />
//               {fieldErrors.comment && (
//                 <span className="error-tooltip" role="alert">{fieldErrors.comment}</span>
//               )}
//             </div>
//           </>
//         )
//         }


//         {
//           currentStep === 5 && (
//             <>
//               <h3 className="step-title">Step 5: Attachments & Declaration</h3>

//               <div className="form-group">
//                 <label>List of Attachments (Optional):</label>
//                 <table className="quant-table">
//                   <thead>
//                     <tr>
//                       <th>S. No.</th>
//                       <th>Description</th>
//                       <th>Upload (jpg, png, pdf; max 5 MB)</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[1, 2, 3, 4].map((num) => {
//                       const key = `attachments${num}`;
//                       const attachment = formData[key];
//                       return (
//                         <tr key={key}>
//                           <td>{num}</td>
//                           <td>
//                             <input
//                               type="text"
//                               name={`${key}.description`}
//                               value={attachment.description}
//                               onChange={(e) => handleAttachmentChange(key, 'description', e.target.value)}
//                               placeholder="Enter description"
//                               maxLength={FIELD_MAX_LENGTH}
//                               className="form-input"
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="file"
//                               accept=".jpg,.png,.pdf"
//                               onChange={(e) => handleAttachmentChange(key, 'file', e.target.files[0], e)}
//                               className="form-input mt-4"
//                             />
//                             {attachment.file && (
//                               <p className="file-name">Selected file: {attachment.file.name}</p>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="form-group">
//                 <label>
//                   Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span aria-hidden="true" className="text-red">*</span>
//                 </label>
//                 <div className="form-navigation">
//                   <button type="button" onClick={handlePrint} className="btn btn-outline">
//                     Print Preview
//                   </button>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="approving_authority_file">
//                   Upload Document with Approving Authority Signature (Director/Board Level)<span aria-hidden="true" className="text-red">*</span>:
//                 </label>
//                 <input
//                   type="file"
//                   id="approving_authority_file"
//                   accept=".jpg,.png,.pdf"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       setFormData((prev) => ({
//                         ...prev,
//                         approving_authority_file: file,
//                       }));
//                     }
//                   }
//                   }
//                   className={`form-input mt-4 ${fieldErrors.approving_authority_file ? 'has-error' : ''}`}
//                   aria-describedby="approving_authority_file-error"
//                   required
//                 />
//                 {formData.approving_authority_file && (
//                   <p className="file-name">Selected file: {formData.approving_authority_file.name}</p>
//                 )}
//                 {fieldErrors.approving_authority_file && (
//                   <span className="error-tooltip" id="approving_authority_file-error" role="alert">
//                     {fieldErrors.approving_authority_file}
//                   </span>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label>
//                   <input
//                     id="declaration"
//                     type="checkbox"
//                     name="declaration"
//                     checked={formData.declaration}
//                     onChange={(e) => handleChange('declaration', e.target.checked)}
//                     className={`form-checkbox ${fieldErrors.declaration ? 'has-error' : ''}`}
//                     aria-describedby="declaration-error"
//                     required
//                   />{' '}
//                   I declare that the information submitted is true and complete.
//                 </label>
//                 {fieldErrors.declaration && (
//                   <span className="error-tooltip" id="declaration-error" role="alert">
//                     {fieldErrors.declaration}
//                   </span>
//                 )}

//               </div>
//             </>
//           )
//         }
//       </div >
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
//           <h1>{awardTitle}</h1>
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

// export default RegistrationExploration;

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
// import apiClient from "../api/axiosClient";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/FormProduction.css";
import SidebarGuideline from "./SidebarGuideline";
import TextField from "@mui/material/TextField";
import useRegistrationPrefill from '../hooks/useRegistrationPrefill';

// Constants for max lengths
const FIELD_MAXLength = 100;
const FIELD_MAX_LENGTH = FIELD_MAXLength; // preserve original name used elsewhere
const COMPANY_PROFILE_MAX_LENGTH = 300;
const COMMENT_MAX_LENGTH = 200;
const TEXTAREA_MAX_LENGTH = 300;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const initialTechnology = {
  technology_name: "",
  technology_provider: "",
  cost: "",
  areas_of_impact: "",
  remarks: "",
};

const explorationFields = [
  { num: "1", label: "2P Oil reserves accretion (MMT)", key: "oil_reserves" },
  { num: "2", label: "2P Gas reserves accretion (BCM)", key: "gas_reserves" },
  { num: "3", label: "Total Reserves Accreted (MTOE)", key: "total_reserves" },
  { num: "4", label: "Finding Cost (INR Million)", key: "finding_cost" },
  {
    num: "5",
    label: "Total Number of exploratory wells drilled",
    key: "exploratory_wells",
  },
  {
    num: "6",
    label: "Number of Hydrocarbon Bearing wells",
    key: "hydrocarbon_wells",
  },
  // { num: "7", label: "Total Seismic Activity", key: "seismic_activity" },
  {
    num: "7",
    label: "Total Seismic Activity - 2D LKM",
    key: "seismic_activity_2d",
  },
  {
    num: "8",
    label: "Total Seismic Activity - 3D SKM",
    key: "seismic_activity_3d",
  },
  {
    num: "9",
    label: "Total Energy Consumed (GJ) in Exploration",
    key: "energy_exploration",
  },
  {
    num: "9.1",
    label: "Total Energy Consumed by the Company (GJ)",
    key: "energy_company",
  },
  {
    num: "9.2",
    label: "Total Capex of the Company (INR Crore)",
    key: "capex_company",
  },
  {
    num: "9.3",
    label: "Total Opex of the Company (INR Crore)",
    key: "opex_company",
  },
  {
    num: "9.4",
    label: "Capex for Exploration (INR Crore)",
    key: "capex_exploration",
  },
  {
    num: "9.5",
    label: "Opex for Exploration (INR Crore)",
    key: "opex_exploration",
  },
  {
    num: "10",
    label: "Number of Exploratory Blocks acquired Standalone",
    key: "blocks_standalone",
  },
  {
    num: "11",
    label: "Number of Exploratory Blocks acquired through Partnership",
    key: "blocks_partnership",
  },
];

const toCamel = (snake) => {
  if (!snake) return snake;
  const parts = snake.split("_");
  const camel = parts
    .map((p, i) =>
      i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1)
    )
    .join("");
  return camel.replace(/(\d)([a-z])/g, (_, d, c) => d + c.toUpperCase());
};

const RegistrationExploration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const awardTitle =
    location.state?.awardTitle || "Oil & Gas Exploration Company of the Year";

  const subKeys = [
    "energy_company",
    "capex_company",
    "opex_company",
    "capex_exploration",
    "opex_exploration",
  ];

  const [formData, setFormData] = useState({
    organisationname: "",
    category: "Exploration Company of the Year",
    mailing_address: "",
    authority_name: "",
    authority_title: "",
    authority_phone: "",
    authorityLandline: "",
    authority_email: "",
    applicant_name: "",
    applicant_phone: "",
    applicant_email: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    company_profile: "",
    signed_form_file: null,
    declaration: false,
    comment: "",
    ...explorationFields.reduce(
      (acc, { key }) => ({
        ...acc,
        [key]: ["", ""], // [2024, 2023]
      }),
      {}
    ),
    technologies: Array(5).fill({ ...initialTechnology }),
    attachments1: { description: "", file: null },
    attachments2: { description: "", file: null },
    attachments3: { description: "", file: null },
    attachments4: { description: "", file: null },
  });

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
          organisationname: user.organisation_name || "",
          applicant_name: user.applicant_name || user.first_name || "",
          applicant_phone: user.applicant_phone || "",
          applicant_email: user.email || "",
        }));
      }
    } catch (err) {
      console.warn("Failed to parse user_info from localStorage:", err);
    }
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [copyApplicantData, setCopyApplicantData] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => emailRegex.test(email);
  const validatePhone = (phone) => phoneRegex.test(phone);

  const clearFieldError = useCallback((field) => {
    setFieldErrors((prev) => {
      if (prev[field]) {
        const { [field]: omitted, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  const isEnergyExplorationFilled = () =>
    Array.isArray(formData.energy_exploration) &&
    formData.energy_exploration.some(
      (v) => v !== "" && v !== null && v !== undefined
    );

  const isAnySubfieldFilled = () =>
    subKeys.some(
      (k) =>
        Array.isArray(formData[k]) &&
        formData[k].some((v) => v !== "" && v !== null && v !== undefined)
    );

  const handleChange = (name, value, index = null) => {
    if ([1, 2, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (["company_profile"].includes(name)) applicableMaxLength = 200;
      else if (name === "comment" || name.includes("_remarks"))
        applicableMaxLength = COMMENT_MAX_LENGTH;
      if (typeof value === "string") {
        if (name === "company_profile") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed.");
            return;
          }
        } else if (name === "comment") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            alert("Maximum 200 words allowed in Comments.");
            return;
          }
        }
      }
    }

    if (
      ["organisation_name", "authority_name", "contact_name"].includes(name)
    ) {
      const isValid = /^[A-Za-z\s]*$/.test(value);
      if (!isValid && value !== "") {
        alert("Only letters and spaces are allowed.");
        return;
      }
    }

    if (name === "authority_phone" || name === "contact_phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, PHONE_MAX_LENGTH);
      if (numericValue.length > PHONE_MAX_LENGTH) {
        alert("Phone number must not exceed 10 digits.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      clearFieldError(name);
      return;
    }

    if (index !== null) {
      setFormData((prev) => {
        const updatedArray = [...(prev[name] || ["", ""])];
        updatedArray[index] = value;

        const newState = {
          ...prev,
          [name]: updatedArray,
        };

        if (name === "energy_exploration" && value !== "") {
          subKeys.forEach((k) => {
            newState[k] = ["", ""];
          });
        }

        if (subKeys.includes(name) && value !== "") {
          newState["energy_exploration"] = ["", ""];
        }

        return newState;
      });

      return;
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: typeof value === "boolean" ? value : value,
      }));
    }

    if (name === "organisation_name" && value && currentStep === 1)
      setError("");
    if (name === "mailing_address" && value.trim() && currentStep === 1)
      setError("");
    if (name === "authority_name" && value && currentStep === 2) setError("");
    if (name === "authority_title" && value && currentStep === 2) setError("");
    if (name === "authority_email" && value && currentStep === 2) setError("");
    if (name === "authority_phone" && value && currentStep === 2) setError("");
  };

  const handleTechChange = (index, field, value) => {
    let applicableMaxLength = FIELD_MAX_LENGTH;
    if (field === "remarks") applicableMaxLength = TEXTAREA_MAX_LENGTH;

    if (typeof value === "string" && value.length > applicableMaxLength) {
      alert(`Your value must not exceed ${applicableMaxLength} characters.`);
      return;
    }

    if (field === "cost" && value !== "" && Number(value) < 0) {
      alert("Cost cannot be negative.");
      return;
    }

    setFormData((prev) => {
      const techs = [...prev.technologies];
      techs[index] = { ...techs[index], [field]: value };
      return { ...prev, technologies: techs };
    });
    clearFieldError(`technologies[${index}].${field}`);
  };

  useEffect(() => {
    if (!copyApplicantData) return;

    let user = {};
    try {
      const raw = localStorage.getItem("user_info");
      if (raw) user = JSON.parse(raw);
    } catch (err) {
      console.warn(
        "Failed to parse user_info from localStorage in sync effect:",
        err
      );
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
  }, [copyApplicantData, clearFieldError]);

  const handleCopyApplicantToggle = (e) => {
    const checked = e.target.checked;

    const model = {
      contact_name: "",
      contact_phone: "",
      contact_email: "",
    };

    if (checked) {
      const userInfo = JSON.parse(sessionStorage.getItem("user_info"));
      if (userInfo) {
        model.contact_name = userInfo.applicant_name;
        model.contact_phone = userInfo.applicant_phone;
        model.contact_email = userInfo.email;
      }
    }

    setFormData((prev) => ({ ...prev, ...model }));

    clearFieldError("contact_name");
    clearFieldError("contact_phone");
    clearFieldError("contact_email");
  };

  const handleAttachmentChange = (key, field, value, event = null) => {
    if (field === "file" && value) {
      const file = value;
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, and PDF files are allowed for attachments.");
        if (event) event.target.value = null;
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert("File size must not exceed 5 MB for attachments.");
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

  const handleApprovingAuthorityChange = (files) => {
    const file = files[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, and PDF files are allowed for the signature.");
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert("File size must not exceed 5 MB for the signature.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        signed_form_file: file,
      }));
      clearFieldError("approving_authority_file");
    }
  };

  function escapeHtml(str = "") {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  const handlePrint = () => {
    const title = escapeHtml(awardTitle || "");

    const bodyHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">${title}</h1>
        <h2>Organization & Contact Details:</h2>
        <p><strong>Organisation Name:</strong> ${escapeHtml(
          formData.organisationname || ""
        )}</p>
        <p><strong>Postal Address:</strong> ${escapeHtml(
          formData.mailing_address || ""
        )}</p>
        <p><strong>Approving Authority Name:</strong> ${escapeHtml(
          formData.authority_name || ""
        )}</p>
        <p><strong>Approving Authority Designation:</strong> ${escapeHtml(
          formData.authority_title || ""
        )}</p>
        <p><strong>Approving Authority Landline:</strong> ${escapeHtml(
          formData.authorityLandline || ""
        )}</p>
        <p><strong>Approving Authority Phone:</strong> ${escapeHtml(
          formData.authority_phone || ""
        )}</p>
        <p><strong>Approving Authority Email:</strong> ${escapeHtml(
          formData.authority_email || ""
        )}</p>
        <h2>Nodal Official Contact Details:</h2>
        <p><strong>Contact Name:</strong> ${escapeHtml(
          formData.contact_name || ""
        )}</p>
        <p><strong>Contact Phone:</strong> ${escapeHtml(
          formData.contact_phone || ""
        )}</p>
        <p><strong>Contact Email:</strong> ${escapeHtml(
          formData.contact_email || ""
        )}</p>
        <p><strong>Brief write up on company profile and the activities with specific reference to Exploration operations during the year 2024-25:</strong> ${escapeHtml(
          formData.company_profile || ""
        )}</p>
        <!-- Add quantitative info and other sections as required -->
      </div>
    `;

    const fullHtml = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            @page { margin: 20mm; }
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          </style>
        </head>
        <body>${bodyHtml}</body>
      </html>`;

    const printWindow = window.open("", "_blank", "height=600,width=800");
    printWindow.document.open();
    printWindow.document.write(fullHtml);
    printWindow.document.close();
    try {
      printWindow.document.title = title;
    } catch (e) {
      console.warn("Could not set print window title:", e);
    }
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      // printWindow.close();
    }, 300);
  };

  const hasEmptyFieldsStep3 = () => {
    for (const { key } of explorationFields.slice(0, 5)) {
      const values = formData[key];
      if (
        !values ||
        values.some((v) => v === "" || v === null || v === undefined)
      ) {
        return true;
      }
    }
    return false;
  };

  const hasEmptyFieldsStep4 = () => {
    const visibleKeys = explorationFields
      .slice(5)
      .map((f) => f.key)
      .filter((key) => {
        if (key === "energy_exploration") {
          return !isAnySubfieldFilled();
        }
        if (subKeys.includes(key)) {
          return !isEnergyExplorationFilled();
        }
        return true;
      });

    for (const key of visibleKeys) {
      const values = formData[key];
      if (
        !values ||
        values.some((v) => v === "" || v === null || v === undefined)
      ) {
        return true;
      }
    }

    if (formData.technologies) {
      for (const tech of formData.technologies) {
        if (
          !tech.technology_name?.trim() ||
          !tech.technology_provider?.trim() ||
          tech.cost === "" ||
          tech.cost === null ||
          tech.cost === undefined ||
          !tech.areas_of_impact?.trim()
        ) {
          return true;
        }
      }
    }

    if (!formData.comment || formData.comment.trim() === "") {
      return true;
    }
    return false;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.mailing_address.trim()) {
        alert("Mailing address is required.");
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.authority_name) {
        alert("Authority name is required.");
        return;
      }
      if (!formData.authority_title) {
        alert("Authority designation is required.");
        return;
      }
      if (
        !formData.authority_email ||
        !validateEmail(formData.authority_email)
      ) {
        alert("Please enter a valid Authority email.");
        return;
      }
      if (!formData.authorityLandline) {
        alert("Authority Landline is required.");
        return;
      }
      if (!formData.contact_name) {
        alert("Contact name is required.");
        return;
      }
      if (formData.contact_email && !validateEmail(formData.contact_email)) {
        alert("Please enter a valid Contact email.");
        return;
      }
      if (
        formData.contact_phone &&
        !validatePhone(formData.contact_phone) &&
        !copyApplicantData
      ) {
        alert("Contact phone must be exactly 10 digits.");
        return;
      }
      if (!formData.company_profile) {
        alert("Company Profile is required.");
        return;
      }
    }
    if (currentStep === 3 && hasEmptyFieldsStep3()) {
      if (!window.confirm("Data not entered, If you wish to continue?")) {
        return;
      }
    }

    if (currentStep === 4 && hasEmptyFieldsStep4()) {
      if (!window.confirm("Data not entered, If you wish to continue?")) {
        return;
      }
    }

    setError("");
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // 🔹 Prefill (loads from sessionStorage if user clicked "Continue" in dashboard)
  useRegistrationPrefill(setFormData, setCurrentStep);

  const handleSaveDraft = () => {
    try {
      localStorage.setItem('registrationExplorationDraft', JSON.stringify({
        formData,
        step: currentStep,
        lastModified: new Date().toISOString().split('T')[0]
      }));
      alert('Draft saved successfully!');
    } catch (err) {
      console.error('Error saving draft', err);
      alert('Could not save draft');
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let user = {};
    try {
      const raw = localStorage.getItem("user_info");
      if (raw) user = JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to parse user_info:", err);
    }

    const data = {
      ...formData,
      firstname: formData.firstname || user.first_name || "",
      lastname: formData.lastname || user.last_name || "",
      userid: formData.userid || user.id || "",
      company_name: formData.company_name || user.organisation_name || "",
      organisationname: formData.organisationname || user.organisation_name || "",
      contact_name: formData.contact_name || user.applicant_name || "",
      contact_phone: formData.contact_phone || user.applicant_phone || "",
      contact_email: formData.contact_email || user.email || "",
    };

    if (!data.declaration) {
      return alert("Please accept the declaration before submitting.");
    }

    const onlyDigits = (s = "") => String(s).replace(/\D/g, "");

    if (!data.authority_phone || onlyDigits(data.authority_phone).length !== 10) {
      return alert("Authority phone must be exactly 10 digits.");
    }
    if (data.contact_phone && onlyDigits(data.contact_phone).length !== 10) {
      return alert("Contact phone must be exactly 10 digits.");
    }

    const fd = new FormData();

    fd.append("organisation_name", data.organisationname || "");
    fd.append("category", data.category || "");
    fd.append("firstname", data.firstname || "");
    fd.append("lastname", data.lastname || "");
    fd.append("userid", data.userid || "");
    fd.append("company_name", data.company_name || "");
    fd.append("mailing_address", data.mailing_address || "");

    fd.append("authority_name", data.authority_name || "");
    fd.append("authority_title", data.authority_title || "");
    fd.append("authority_phone", data.authority_phone || "");
    fd.append("authorityLandline", data.authorityLandline || "");
    fd.append("authority_email", data.authority_email || "");

    fd.append("contact_name", data.contact_name || "");
    fd.append("contact_phone", data.contact_phone || "");
    fd.append("contact_email", data.contact_email || "");

    fd.append("company_profile", data.company_profile || "");
    fd.append("comment", data.comment || "");
    fd.append("declaration", data.declaration ? "true" : "false");

    if (data.signed_form_file) {
      let signedFile = null;
      if (data.signed_form_file instanceof File) signedFile = data.signed_form_file;
      else if (data.signed_form_file instanceof FileList && data.signed_form_file.length)
        signedFile = data.signed_form_file[0];
      else if (Array.isArray(data.signed_form_file) && data.signed_form_file instanceof File)
        signedFile = data.signed_form_file;

      if (signedFile) {
        if (signedFile.size > 40 * 1024 * 1024) {
          return alert(`Signed form file exceeds maximum size of 40 MB.`);
        }
        fd.append("signed_form_file", signedFile);
      }
    }

    if (Array.isArray(explorationFields)) {
      for (const entry of explorationFields) {
        const key = entry.key;
        const camelKey = toCamel(key);
        const val = data.hasOwnProperty(key) ? data[key] : data[camelKey];

        if (key === "seismic_activity") {
          fd.append("seismic_activity", val ?? "");
          continue;
        }

        let y24 = "";
        let y23 = "";

        if (Array.isArray(val)) {
          [y24 = "", y23 = ""] = val;
        } else if (val && typeof val === "object") {
          y24 = val["2024"] ?? val["y2024"] ?? val["y24"] ?? val["y_24"] ?? "";
          y23 = val["2023"] ?? val["y2023"] ?? val["y23"] ?? val["y_23"] ?? "";
        } else if (typeof val === "string" || typeof val === "number") {
          y24 = val;
          y23 = "";
        }

        const base = toCamel(key);
        fd.append(`${base}2024`, y24 ?? "");
        fd.append(`${base}2023`, y23 ?? "");
      }
    } else {
      console.warn("explorationFields is not an array; skipping exploration fields.");
    }

    [1, 2, 3, 4, 5].forEach((n) => {
      const slot = data[`attachments${n}`] || { description: "", file: null };
      if (slot.description) {
        fd.append(`attachments${n}_description`, slot.description);
      }
      const candidate = slot.file;
      if (candidate) {
        let fileToAppend = null;
        if (candidate instanceof File) fileToAppend = candidate;
        else if (candidate instanceof FileList && candidate.length) fileToAppend = candidate[0];
        else if (Array.isArray(candidate) && candidate instanceof File) fileToAppend = candidate;

        if (fileToAppend) {
          if (fileToAppend.size > 40 * 1024 * 1024) {
            throw new Error(`Attachment ${n} exceeds maximum size of 40 MB.`);
          }
          fd.append(`attachments${n}`, fileToAppend);
        }
      }
    });

    try {
      fd.append("technologies", JSON.stringify(data.technologies || []));
    } catch (err) {
      fd.append("technologies", "[]");
    }

    const endpoint = "/registrations/";

    try {
      // await apiClient.post(endpoint, fd);

      // Update localStorage apps and remove draft
      try {
        localStorage.removeItem("registrationExplorationDraft");
        const existingRaw = localStorage.getItem("applications");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const newApp = {
          id: `exploration-${Date.now()}`,
          title: data.category || formData.category || "Exploration Registration",
          status: "Submitted",
          formData: data,
          lastModified: new Date().toISOString().split("T")[0],
        };
        localStorage.setItem("applications", JSON.stringify([...existing, newApp]));
      } catch (lsErr) {
        console.warn("Could not update localStorage applications:", lsErr);
      }

      alert("Exploration registration submitted successfully!");
      setIsSubmitted(true);

      if (typeof setFormData === "function") {
        setFormData((prev) => ({
          ...prev,
          firstname: data.firstname,
          lastname: data.lastname,
          userid: data.userid,
          company_name: data.company_name,
          organisationname: data.organisationname,
        }));
      }
    } catch (err) {
      console.error("Exploration submission error:", err?.response || err);
      const resp = err?.response?.data;
      let message = "Submission failed.";
      if (!resp) {
        message = err?.message || message;
      } else if (typeof resp === "string") {
        message = resp;
      } else if (typeof resp === "object") {
        if (resp.organisation_name) {
          message = Array.isArray(resp.organisation_name)
            ? resp.organisation_name.join(" | ")
            : String(resp.organisation_name);
        } else {
          const parts = [];
          for (const [k, v] of Object.entries(resp)) {
            if (Array.isArray(v)) parts.push(`${k}: ${v.join(" | ")}`);
            else parts.push(`${k}: ${JSON.stringify(v)}`);
          }
          message = parts.length ? parts.join("\n") : JSON.stringify(resp);
        }
      }
      alert("Submission failed: " + message);
    }
  }

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
              <label htmlFor="organisationname">Organisation Name: </label>
              <input
                id="organisation_name"
                name="organisationname"
                type="text"
                onChange={(e) => handleChange("organisationname", e.target.value)}
                // disabled={!!formData.organisationname}
                maxLength={FIELD_MAX_LENGTH}
                value={formData.organisationname}
                aria-describedby="organisation_name-error"
                className="form-input"
                placeholder="Enter organisation name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mailing_address">
                Postal Address: <span aria-hidden="true" className="text-red">*</span>
              </label>
              <textarea
                id="mailing_address"
                name="mailing_address"
                value={formData.mailing_address}
                rows={3}
                maxLength={FIELD_MAX_LENGTH}
                onChange={(e) => handleChange("mailing_address", e.target.value)}
                aria-describedby="mailing_address-error"
                placeholder="Enter postal address"
                className={`form-textarea ${
                  !formData.mailing_address.trim() && currentStep === 1 ? "has-error" : ""
                }`}
                required
              />
              {fieldErrors.mailing_address && (
                <span className="error-tooltip" id="mailing_address-error" role="alert">
                  {fieldErrors.mailing_address}
                </span>
              )}
              {!formData.mailing_address.trim() && currentStep === 1 && (
                <span className="error-tooltip" id="mailing_address-error" role="alert">
                  Mailing address is required
                </span>
              )}
            </div>
          </>
        )}

       {currentStep === 2 && (
          <>
            <h3 className="step-title">
              Step 2: Approving Authority & Contact
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section
                aria-labelledby="approving-authority-heading"
                className="step-section"
              >
                <h4 id="approving-authority-heading">Approving Authority</h4>
                <p className="note">
                  Approving authority should be concerned Director /Board level
                  executive.{" "}
                </p>

                <div className="form-group">
                  <label htmlFor="authority_name">
                    Name:{" "}
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
                  </label>
                  <input
                    id="authority_name"
                    name="authority_name"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.authority_name}
                    onChange={(e) =>
                      handleChange("authority_name", e.target.value)
                    }
                    aria-describedby="authority_name-error"
                    placeholder="Name"
                    className={`form-input ${
                      !formData.authority_name && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="authority_title">
                    Designation:{" "}
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
                  </label>
                  <input
                    id="authority_title"
                    name="authority_title"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.authority_title}
                    onChange={(e) =>
                      handleChange("authority_title", e.target.value)
                    }
                    aria-describedby="authority_title-error"
                    placeholder="Designation"
                    className={`form-input ${
                      !formData.authority_title && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="authorityLandline">
                    Landline:{" "}
                    <span className="text-red" aria-hidden="true">
                      *
                    </span>
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
                  {/* {!formData.authorityLandline && currentStep === 2 && <span className="error-tooltip">Authority Landline Number is required</span>} */}
                </div>
                <div className="form-group">
                  <label htmlFor="authority_phone">
                    Mobile:
                    {/* <span className="text-red" aria-hidden="true"></span> */}
                  </label>
                  <input
                    id="authority_phone"
                    type="tel"
                    name="authority_phone"
                    value={formData.authority_phone}
                    onChange={(e) =>
                      handleChange("authority_phone", e.target.value)
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
                  <label htmlFor="authority_email">
                    Email:{" "}
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
                  </label>
                  <input
                    id="authority_email"
                    name="authority_email"
                    type="email"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.authority_email}
                    onChange={(e) =>
                      handleChange("authority_email", e.target.value)
                    }
                    aria-describedby="authority_email-error"
                    placeholder="Approving authority's email"
                    className={`form-input ${
                      !formData.authority_email && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
                    required
                  />
                </div>
              </section>

              <section
                aria-labelledby="contacts-heading"
                className="step-section"
              >
                <h4 id="contacts-heading">
                  Contacts (Nodal Officials){" "}
                  <span aria-hidden="true" className="text-red">
                    *
                  </span>
                </h4>

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
                    Name{" "}
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
                  </label>
                  <input
                    id="contact_name"
                    name="contact_name"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contact_name}
                    onChange={(e) =>
                      handleChange("contact_name", e.target.value)
                    }
                    placeholder="Contact name"
                    disabled={copyApplicantData}
                    className={`form-input ${
                      !formData.contact_name && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
                    aria-describedby="contact_name-error"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_phone">
                    Phone:
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
                  </label>
                  <input
                    id="contact_phone"
                    name="contact_phone"
                    type="tel"
                    maxLength={PHONE_MAX_LENGTH}
                    value={formData.contact_phone}
                    onChange={(e) =>
                      handleChange("contact_phone", e.target.value)
                    }
                    aria-describedby="contact_phone-error"
                    disabled={copyApplicantData}
                    placeholder="10-digit phone number"
                    className={`form-input ${
                      !formData.contact_phone && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
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
                    onChange={(e) =>
                      handleChange("contact_email", e.target.value)
                    }
                    placeholder="Contact email"
                    disabled={copyApplicantData}
                    className={`form-input ${
                      fieldErrors.contact_email ? "has-error" : ""
                    }`}
                    aria-describedby="contact_email-error"
                  />
                </div>
              </section>
            </div>

            <div className="form-group">
              <label htmlFor="company_profile">
                Brief write up on company profile and the activities with
                specific reference to Exploration operations during the year
                2024-25.
              </label>
              <p className="note">(within 300 words) </p>
              <textarea
                id="company_profile"
                name="company_profile"
                value={formData.company_profile}
                rows={6}
                // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                onChange={(e) =>
                  handleChange("company_profile", e.target.value)
                }
                className="form-textarea"
                placeholder="Enter company profile"
              />
            </div>
          </>
        )}

        {/* Step 3: Quantitative Information - Part 1 */}
        {currentStep === 3 && (
          <>
            <h3 className="step-title">
              Step 3: Quantitative Information - Part 1
            </h3>
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
                {explorationFields.slice(0, 5).map(({ num, label, key }) => (
                  <tr key={key || num}>
                    <td>{num}</td>
                    <td>{label}</td>
                    {/* Input for 2024 */}
                    <td>
                     <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        inputProps={{
                          inputMode: "decimal", // brings up numeric keypad on mobile
                          pattern: "[0-9]\\.?[0-9]", // allows digits + decimal
                        }}
                        name={key}
                        value={Array.isArray(formData[key]) ? formData[key][0] || "" : ""}
                        onChange={(e) => {
                          let val = e.target.value;

                          // Allow only digits and one decimal point
                          val = val.replace(/[^0-9.]/g, ""); // remove non-numeric except "."
                          const parts = val.split(".");
                          if (parts.length > 2) {
                            // keep only first decimal point
                            val = parts[0] + "." + parts.slice(1).join("");
                          }

                          handleChange(e.target.name, val, 0);
                        }}
                        onWheel={(e) => e.target.blur()} // prevent mouse scroll increment
                        onKeyDown={(e) => {
                          // Prevent arrow up/down, exponential 'e', and plus/minus signs
                          if (
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown" ||
                            e.key === "e" ||
                            e.key === "E" ||
                            e.key === "+" ||
                            e.key === "-"
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {fieldErrors[`${key}[0]`] && (
                        <span className="error-tooltip" role="alert">
                          {fieldErrors[`${key}[0]`]}
                        </span>
                      )}
                    </td>
                    {/* Input for 2023 */}
                    <td>
                      <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        inputProps={{
                          inputMode: "decimal", // brings up numeric keypad on mobile
                          pattern: "[0-9]\\.?[0-9]", // allows digits + decimal
                        }}
                        name={key}
                        value={Array.isArray(formData[key]) ? formData[key][1] || "" : ""}
                        onChange={(e) => {
                          let val = e.target.value;

                          // Allow only digits and one decimal point
                          val = val.replace(/[^0-9.]/g, ""); // remove non-numeric except "."
                          const parts = val.split(".");
                          if (parts.length > 2) {
                            // keep only first decimal point
                            val = parts[0] + "." + parts.slice(1).join("");
                          }

                          handleChange(e.target.name, val, 1);
                        }}
                        onWheel={(e) => e.target.blur()} // prevent mouse scroll increment
                        onKeyDown={(e) => {
                          // Prevent arrow up/down, exponential 'e', and plus/minus signs
                          if (
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown" ||
                            e.key === "e" ||
                            e.key === "E" ||
                            e.key === "+" ||
                            e.key === "-"
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {fieldErrors[`${key}[1]`] && (
                        <span className="error-tooltip" role="alert">
                          {fieldErrors[`${key}[1]`]}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

       
        {currentStep === 4 && (
          <>
            <h3 className="step-title">
              Step 4: Quantitative Information - Part 2
            </h3>
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
                {explorationFields.slice(5).map(({ num, label, key }) => {
                  if (!key) {
                    // Non-input row
                    return (
                      <tr key={num}>
                        <td>{num}</td>
                        <td>{label}</td>
                        <td colSpan={2} className="non-editable-cell">
                          —
                        </td>
                      </tr>
                    );
                  }

                  // Check if main 9 is fully filled
                  const isMain9Filled =
                    Array.isArray(formData["energy_exploration"]) &&
                    formData["energy_exploration"].every(
                      (v) => v !== "" && v !== null && v !== undefined
                    );

                  // Check if any of the subitems 9.1–9.5 have values
                  const isAnySubFilled = [
                    "9.1",
                    "9.2",
                    "9.3",
                    "9.4",
                    "9.5",
                  ].some((subNum) => {
                    const subKey = explorationFields.find(
                      (f) => f.num === subNum
                    )?.key;
                    return (
                      subKey &&
                      Array.isArray(formData[subKey]) &&
                      formData[subKey].some(
                        (v) => v !== "" && v !== null && v !== undefined
                      )
                    );
                  });

                  // Disable subfields if main 9 is filled
                  const disableSubFields =
                    isMain9Filled &&
                    ["9.1", "9.2", "9.3", "9.4", "9.5"].includes(num);

                  // Disable main 9 if any subitem is filled
                  const disableMain9 = num === "9" && isAnySubFilled;

                  return (
                    <tr key={key}>
                      <td>{num}</td>
                      <td>{label}</td>
                      {[0, 1].map((yearIndex) => (
                        <td key={yearIndex}>
                          <TextField
                            type="text" // keep text to avoid browser spinners
                            variant="outlined"
                            size="small"
                            fullWidth
                            name={key}
                            value={
                              Array.isArray(formData[key])
                                ? formData[key][yearIndex] ?? ""
                                : ""
                            }
                            onChange={(e) => {
                              let val = e.target.value;

                              // Allow only digits and one decimal point
                              val = val.replace(/[^0-9.]/g, "");
                              const parts = val.split(".");
                              if (parts.length > 2) {
                                // keep only the first decimal point
                                val = parts[0] + "." + parts.slice(1).join("");
                              }

                              handleChange(e.target.name, val, yearIndex);
                            }}
                            onKeyDown={(e) => {
                              // block arrows, minus, exponential, plus
                              if (
                                ["-", "+", "e", "E"].includes(e.key) ||
                                e.key === "ArrowUp" ||
                                e.key === "ArrowDown"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onWheel={(e) => e.target.blur()} // disable mouse scroll
                            className="form-input no-spinner"
                            disabled={disableSubFields || disableMain9}

                            sx={{
                              "& .MuiInputBase-root.Mui-disabled": {
                                backgroundColor: "#f5f5f5",
                                color: "rgba(0,0,0,0.6)",
                              },
                            }}
                            inputProps={{
                              inputMode: "decimal", // mobile keypad for decimal/numeric
                              pattern: "[0-9]\\.?[0-9]", // digits + optional decimal
                            }}
                          />
                          {fieldErrors[`${key}[${yearIndex}]`] && (
                            <span className="error-tooltip" role="alert">
                              {fieldErrors[`${key}[${yearIndex}]`]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <table className="quant-table">
              <thead>
                <tr>
                  <th colSpan="1">12</th>
                  <th colSpan="7">
                    <p className="tablerowq">New Technologies Adopted</p>
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Technology Name</th>
                  <th>Technology Provider</th>
                  <th>Cost of the Technology (INR Crore) </th>
                  <th>Areas of Impact </th>
                  <th>Remarks(Max 50 words)</th>
                </tr>
              </thead>
              <tbody>
                {formData.technologies &&
                  formData.technologies.map((tech, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <input
                          type="text"
                          name={`technologies.${i}.technology_name`}
                          maxLength={FIELD_MAX_LENGTH}
                          value={tech.technology_name || ""}
                          onChange={(e) =>
                            handleTechChange(
                              i,
                              "technology_name",
                              e.target.value
                            )
                          }
                          className="form-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={`technologies.${i}.technology_provider`}
                          maxLength={FIELD_MAX_LENGTH}
                          value={tech.technology_provider || ""}
                          onChange={(e) =>
                            handleTechChange(
                              i,
                              "technology_provider",
                              e.target.value
                            )
                          }
                          className="form-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          name={`technologies.${i}.cost`}
                          value={tech.cost || ""}
                          onChange={(e) =>
                            handleTechChange(i, "cost", e.target.value)
                          }
                          className="form-input"
                          onKeyDown={(e) => {
                            if (["-", "e", "E"].includes(e.key))
                              e.preventDefault();
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={`technologies.${i}.areas_of_impact`}
                          maxLength={FIELD_MAX_LENGTH}
                          value={tech.areas_of_impact || ""}
                          onChange={(e) =>
                            handleTechChange(
                              i,
                              "areas_of_impact",
                              e.target.value
                            )
                          }
                          className="form-input"
                        />
                      </td>
                      <td>
                        <textarea
                          rows={2}
                          maxLength={50}
                          name={`technologies.${i}.remarks`}
                          value={tech.remarks || ""}
                          onChange={(e) =>
                            handleTechChange(i, "remarks", e.target.value)
                          }
                          className="form-textarea"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Comments Section */}
            <div className="form-group" style={{ marginTop: "1rem" }}>
              <label htmlFor="comment">Comments</label>
              <textarea
                id="comment"
                name="comment"
                // maxLength={COMMENT_MAX_LENGTH}
                value={formData.comment || ""}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Comments in (200 words) against input parameter, if any"
                className="form-textarea"
                rows={4}
              />
              {fieldErrors.comment && (
                <span className="error-tooltip" role="alert">
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
                            onChange={(e) =>
                              handleAttachmentChange(
                                key,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Enter description"
                            maxLength={FIELD_MAX_LENGTH}
                            className="form-input"
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) =>
                              handleAttachmentChange(
                                key,
                                "file",
                                e.target.files[0],
                                e
                              )
                            }
                            className="form-input mt-4"
                          />
                          {attachment.file && (
                            <p className="file-name">
                              Selected file: {attachment.file.name}
                            </p>
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
                Print the completed application form and upload it with the
                signature of the approving authority. Without signature of the
                approving authority, application will not be considered valid.
                <span aria-hidden="true" className="text-red">
                  *
                </span>
              </label>
              <div className="form-navigation">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-outline"
                >
                  Print Preview
                </button>
              </div>
            </div>

           
            <div className="form-group">
              <label htmlFor="signed_form_file">
                Upload Document with Approving Authority Signature
                (Director/Board Level)
                <span aria-hidden="true" className="text-red">
                  *
                </span>
                :
              </label>
              <input
                type="file"
                id="signed_form_file"
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
                  fieldErrors.signed_form_file ? "has-error" : ""
                }`}
                aria-describedby="signed_form_file-error"
                required
              />
              {formData.signed_form_file && (
                <p className="file-name">
                  Selected file: {formData.signed_form_file.name}
                </p>
              )}
              {fieldErrors.signed_form_file && (
                <span
                  className="error-tooltip"
                  id="signed_form_file-error"
                  role="alert"
                >
                  {fieldErrors.signed_form_file}
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
                  onChange={(e) =>
                    handleChange("declaration", e.target.checked)
                  }
                  className={`form-checkbox ${
                    fieldErrors.declaration ? "has-error" : ""
                  }`}
                  aria-describedby="declaration-error"
                  required
                />{" "}
                I declare that the information submitted is true and complete.
              </label>
              {fieldErrors.declaration && (
                <span
                  className="error-tooltip"
                  id="declaration-error"
                  role="alert"
                >
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
    const middlePosition = window.innerHeight / 2;
    window.scrollTo({ top: middlePosition + 100, behavior: "smooth" });
  }, [currentStep]);

  return (
    <div className="sidebar-guideline-container">
      <SidebarGuideline
        isOpen={true}
        sidebarItems={[{ id: "Guideline", label: "Guideline" }]}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        selectedAwardCategory={formData.category}
      />
      <div className="application-form">
        <div className="form-header">
          <h1>{awardTitle}</h1>
          <h6>Step {currentStep} of 5</h6>
        </div>
        {error && <div className="error">{error}</div>}
        {isSubmitted ? (
          <div className="thank-you-message">
            <h2>Thank you for your submission!</h2>
            <p>Your Application has been successfully submitted.</p>
            <button onClick={() => setIsSubmitted(false)}>Submit Another Application</button>
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
                      if (!window.confirm("Are you sure you want to submit?")) {
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

export default RegistrationExploration;