import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationRefinery = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Refinery of the Year',
        companyName: '',
        mailingAddress: '',
        authorityName: '',
        authorityTitle: '',
        authorityPhone: '',
        authorityEmail: '',
        authoritySignature: '',
        copyApplicantData: false,
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        companyProfile: '',
        awardJustification: '',
        approvingAuthoritySignature: '',
        declaration: false,
        comment: '',
        refinery: '', // Added to prevent undefined error
        // Quantitative fields
        refinery1_1MMTPA: ['', '', '', ''],
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
        refinery8_1Safety: "",
        refinery8_2Safety: "",
        refinery8_3Safety: "",
        refinery8_4Safety: "",
        refinery8_5Safety: "",
        // Attachments
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
    });
    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    console.log('location.state:', location.state);
    const awardTitle = location.state?.awardTitle || "Refinery of the Year";

    const handleChange = (name, value, index = null) => {
        if (["authorityName", "contactName"].includes(name)) {
            const isValid = /^[A-Za-z\s]*$/.test(value);
            if (!isValid) return;
        }

        if (index !== null && Array.isArray(formData[name])) {
            setFormData(prev => {
                const updatedArray = [...prev[name]];
                updatedArray[index] = value;
                return { ...prev, [name]: updatedArray };
            });
        } else {
            if (name === 'authorityPhone') {
                const numericValue = value.replace(/\D/g, '').slice(0, 10);
                setFormData(prev => ({ ...prev, [name]: numericValue }));
                if (numericValue.length > 10) {
                    setError('Authority phone number must not exceed 10 digits.');
                } else {
                    setError('');
                }
            } else {
                setFormData(prev => ({ ...prev, [name]: value || '' }));
            }
        }

        if (name === 'Organisationname' && !value && currentStep === 1) {
            setError('Organisation name is required.');
        } else if (name === 'mailingAddress' && !value?.trim() && currentStep === 1) {
            setError('Mailing address is required.');
        } else if (name === 'refinery' && formData.category === 'Refinery of the Year' && !value?.trim() && currentStep === 1) {
            setError('Refinery name is required.');
        } else if (name === 'authorityName' && !value && currentStep === 2) {
            setError('Authority name is required.');
        } else if (name === 'authorityTitle' && !value && currentStep === 2) {
            setError('Authority designation is required.');
        } else {
            setError('');
        }
    };

    // const validateForm = () => {
    //     const errors = {};

    //     if (!formData.Organisationname?.trim()) {
    //         errors.Organisationname = 'Organisation name is required';
    //     }
    //     if (!formData.authorityName?.trim()) {
    //         errors.authorityName = 'Authority name is required';
    //     }
    //     if (!formData.authorityTitle?.trim()) {
    //         errors.authorityTitle = 'Authority Designation is required';
    //     }
    //     if (!formData.contactEmail?.trim()) {
    //         errors.contactEmail = 'Email is required';
    //     } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
    //         errors.contactEmail = 'Invalid email format';
    //     }

    //     return errors;
    // };

    const handleAttachmentChange = (key, field, value, event = null) => {
        if (field === 'file' && value) {
            const file = value;
            const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

            if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                setError('Only JPG, PNG, and PDF files are allowed for attachments.');
                if (event) event.target.value = null; // Reset file input
                return;
            }
            if (file.size > maxSizeInBytes) {
                setError('File size must not exceed 5 MB for attachments.');
                if (event) event.target.value = null; // Reset file input
                return;
            }
            setError('');
        }

        setFormData((prev) => ({
            ...prev,
            [key]: { ...prev[key], [field]: value }
        }));
    };

    const nextStep = () => {
        if (currentStep === 1 && !formData.Organisationname) {
            setError('Organisation name is required.');
            return;
        }
        if (currentStep === 1 && !formData.mailingAddress?.trim()) {
            setError('Mailing address is required.');
            return;
        }
        if (currentStep === 2 && !formData.authorityName) {
            setError('Authority name is required.');
            return;
        }
        if (currentStep === 2 && !formData.authorityTitle) {
            setError('Authority designation is required.');
            return;
        }
        setError('');
        if (currentStep < 5) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const saveDraft = () => {
        localStorage.setItem('registrationProductionDraft', JSON.stringify({ formData }));
        alert('Draft Saved!');
    };

    const handleApprovingAuthorityChange = (files) => {
        if (files && files.length > 0) {
            const file = files[0];
            const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

            if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                setError('Only JPG, PNG, and PDF files are allowed.');
                return;
            }
            if (file.size > maxSizeInBytes) {
                setError('File size must not exceed 5 MB.');
                return;
            }
            setError('');
            setFormData(prev => ({ ...prev, approvingAuthoritySignature: file }));
        }
    };

const handleSubmit = async e => {
  e.preventDefault();
  if (!formData.declaration) {
    alert("Please accept the declaration.");
    return;
  }
  if ((formData.authorityPhone || "").length !== 10) {
    alert("Authority phone must be 10 digits.");
    return;
  }

  const fd = new FormData();

  // ── 1) Flat fields ───────────────────────────────────────
  const flatMap = {
    organisation_name: formData.Organisationname,
    category:          formData.category,
    refinery:          formData.refinery,
    company_name:      formData.companyName,
    mailing_address:   formData.mailingAddress,
    authority_name:    formData.authorityName,
    authority_title:   formData.authorityTitle,
    authority_phone:   formData.authorityPhone,
    authority_email:   formData.authorityEmail,
    contact_name:      formData.contactName,
    contact_phone:     formData.contactPhone,
    contact_email:     formData.contactEmail,
    company_profile:   formData.companyProfile,
    award_justification: formData.awardJustification || "",
    comment:           formData.comment,
    declaration:       String(formData.declaration),
  };
  Object.entries(flatMap).forEach(([k,v]) => fd.append(k, v || ""));

  // ── 2) Four‑year array fields ───────────────────────────
  // map your state key → base model field name
  const arrayFieldMap = {
    refinery1_1MMTPA:     "name_plate_capacity",
    refinery1_1_1MMTPA:   "actual_crude",
    refinery1_2_1MMTPA:   "cracking_name_plate",
    refinery1_2_2MMTPA:   "cracking_actual",
    refinery1_3MMTPA:     "yield_distillates",
    refinery2MMTPA:       "grm",
    refinery3_1MMTPA:     "carbon_emission",
    refinery3_2MMTPA:     "fatalities",
    refinery4MMTPA:       "lost_time_injuries",
    refinery5_1MMTPA:     "osha_incidents",
    refinery5_1_2MMTPA:   "manhours_own",
    refinery6_1MMTPA:     "manhours_contract",
    refinery6_1_1MMTPA:   "throughput_crude",
    refinery7MMTPA:       "throughput_gas"
  };

  // for each array, append four separate year fields:
  Object.entries(arrayFieldMap).forEach(([stateKey, modelBase]) => {
    const arr = formData[stateKey] || ["", "", "", ""];
    [2024, 2023, 2022, 2021].forEach((year, idx) => {
      fd.append(`${modelBase}_${year}`, arr[idx] || "");
    });
  });

  // ── 3) Single‑year safety fields ────────────────────────
  const safetyMap = {
    refinery8_1Safety: "yield_sulphur",      // example
    refinery8_2Safety: "yield_vgo",
    refinery8_3Safety: "yield_atf",
    refinery8_4Safety: "yield_lpg",
    refinery8_5Safety: "yield_slop"
  };
  Object.entries(safetyMap).forEach(([stateKey, modelField]) => {
    fd.append(modelField, formData[stateKey] || "");
  });

  // ── 4) Files ───────────────────────────────────────────
  if (formData.approvingAuthoritySignature)
    fd.append("approving_authority_file", formData.approvingAuthoritySignature);
  [1,2,3,4].forEach(n => {
    const att = formData[`attachments${n}`];
    if (att?.file) {
      fd.append(`attachments${n}`, att.file);
      fd.append(`attachments${n}_desc`, att.description || "");
    }
  });

  // ── 5) POST ───────────────────────────────────────────
  try {
      const url = `${ACTIVE_API_BASE_URL}/registration-refinery/`;
      const res = await fetch(url, {
      method: "POST",
      body: fd
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt);
    }
    await res.json();
    alert("Submitted successfully!");
    setIsSubmitted(true);
  } catch(err) {
    console.error("Submit error:", err);
    alert("Submission failed — see console.");
  }
};



    const handlePrint = () => {
        const printContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h1 style="text-align: center; color: #1e40af;">Registration Form: ${awardTitle}</h1>
                <h2>Organization & Contact Details</h2>
                <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
                <p><strong>Category:</strong> ${formData.category || ''}</p>
                <p><strong>Refinery:</strong> ${formData.refinery || ''}</p>
                <p><strong>Mailing Address:</strong> ${formData.mailingAddress || ''}</p>
                <h2>Company Details</h2>
                <p><strong>Name of Company:</strong> ${formData.companyName || ''}</p>
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
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">2024–25</th>
                            <th style="border: 1px solid #000; padding: 8px;">2023–24</th>
                            <th style="border: 1px solid #000; padding: 8px;">2022–23</th>
                            <th style="border: 1px solid #000; padding: 8px;">2021-22</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${part1.map(([num, label, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">
                                    ${Array.isArray(formData[key]) ? formData[key][0] || '' : formData[key] || ''}
                                </td>
                                <td style="border: 1px solid #000; padding: 8px;">
                                    ${Array.isArray(formData[key]) ? formData[key][1] || '' : ''}
                                </td>
                                <td style="border: 1px solid #000; padding: 8px;">
                                    ${Array.isArray(formData[key]) ? formData[key][2] || '' : ''}
                                </td>
                                <td style="border: 1px solid #000; padding: 8px;">
                                    ${Array.isArray(formData[key]) ? formData[key][3] || '' : ''}
                                </td>
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
                            <th style="border: 1px solid #000; padding: 8px;">2024–25</th>
                            <th style="border: 1px solid #000; padding: 8px;">2023–24</th>
                            <th style="border: 1px solid #000; padding: 8px;">2022–23</th>
                            <th style="border: 1px solid #000; padding: 8px;">2021-22</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${part2.map(([num, label, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">
                                    ${Array.isArray(formData[key]) ? formData[key][0] || '' : formData[key] || ''}
                                </td>
                                <td style="border: 1px solid #000; padding: 8px;">
                                    ${Array.isArray(formData[key]) ? formData[key][1] || '' : ''}
                                </td>
                                <td style="border: 1px solid #000; padding: 8px;">
                                    ${Array.isArray(formData[key]) ? formData[key][2] || '' : ''}
                                </td>
                                <td style="border: 1px solid #000; padding: 8px;">
                                    ${Array.isArray(formData[key]) ? formData[key][3] || '' : ''}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h2>Declaration</h2>
                <p>I declare that the information submitted is true and complete.</p>
            </div>
        `;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    const getRefineries = (orgName) => {
        const refineryData = {
            "Reliance Industries Limited": ['DTA Jamnagar', 'SEZ Jamnagar'],
            'Nayara Energy Limited': ['Nayara Refinery'],
            'HPCL–Mittal Energy Limited': ['HMEL', 'Bhatinda Refinery'],
            'Oil and Natural Gas Corporation': ['Tatipaka Refinery'],
            'Mangalore Refinery and Petrochemicals Limited': ['MRPL Refinery'],
            'Numaligarh Refinery Limited': ['Numaligarh Refinery'],
            'Chennai Petroleum Corporation Limited': ['Manali Refinery'],
            'Hindustan Petroleum Corporation Limited': ['Mumbai Refinery', 'Visakhapattnam Refinery'],
            'Bharat Petroleum Corporation Limited': ['Mumbai Refinery', 'Kochi Refinery', 'Bina Refinery'],
            'Indian Oil Corporation Limited': ['Barauni Refinery', 'Gujarat Refinery', 'Haldia Refinery', 'Mathura Refinery', 'Panipat Refinery', 'Guwahati Refinery', 'Digboi Refinery', 'Bongaigoan Refinery', 'Paradip Refinery']
        };
        return refineryData[orgName] || [];
    };

    const part1 = [
        ['1', 'Refinery capacity', ''],
        ['1.1', 'Name Plate Capacity (MMTPA)', 'refinery1_1MMTPA'],
        ['1.1.1', 'Actual Crude Processing (MMTPA)', 'refinery1_1_1MMTPA'],
        ['1.2', 'Cracking Capacity', ''],
        ['1.2.1', 'Name Plate Capacity (MMTPA)', 'refinery1_2_1MMTPA'],
        ['1.2.2', 'Actual Processing (MMTPA)', 'refinery1_2_2MMTPA'],
        ['1.3', 'Distillates Yield (% of the crude throughput)', 'refinery1_3MMTPA'],
        ['2', 'Gross Refining Margin ($/bbl) (GRM without any concession to be reported)', 'refinery2MMTPA'],
        ['3', 'Operating Cost (Rs/MT) ', ''],
        ['3.1', 'Internal Fuel consumption (% of the crude throughput)', 'refinery3_1MMTPA'],
        ['3.2', 'Loss (% of the crude throughput)', 'refinery3_2MMTPA'],
        ['4', 'MBN (use CHT methodology for the calculation)', 'refinery4MMTPA'],
        ['5', 'Capital Expenditure (Rs in crore)', ''],
        ['5.1', 'Planned Capex (Original budget) ', 'refinery5_1MMTPA'],
        ['5.1.2', 'Actual Capex', 'refinery5_1_2MMTPA'],
        ['6', 'Specific water consumption', ''],
        ['6.1', 'Fresh water consumption (m3)', 'refinery6_1MMTPA'],
        ['6.1.1', 'NRG factor (indicator of level of complexity of refinery)', 'refinery6_1_1MMTPA'],
    ];

    const part2 = [
        ['7', 'Carbon Emission (Tonne){Specific Carbon Emission for the refinery = (Total CO2 emissions due to burning of fuels + Equivalent CO2 emission in case of purchased electricity + Equivalent CO2 emission in case of purchase of any utility like H2, Steam etc. – CO2 emission which is emitted in Non Refinery operations) / crude processed in barrel / Energy factor}', 'refinery7MMTPA'],
        ['8', 'Safety', ''],
        ['8.1', 'Number of fatalities (own employees + contract employees)', 'refinery8_1Safety'],
        ['8.2', 'Number of lost time injuries in the reporting period (own employees + contract employees)', 'refinery8_2Safety'],
        ['8.3', 'Number of OSHA recordable incidents (own employees + contract employees)', 'refinery8_3Safety'],
        ['8.4', 'Total Manhours worked Own Employees', 'refinery8_4Safety'],
        ['8.5', 'Total Manhours worked Contractors Employees', 'refinery8_5Safety'],
    ];

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
                                value={formData.Organisationname}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
                                        handleChange('Organisationname', value);
                                    }
                                }}
                                className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
                            />
                            {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
                        </div>

                        <div className="form-group">
                            <label>Select Category<span className="text-red">*</span></label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                className={`form-input ${!formData.category && currentStep === 1 ? 'has-error' : ''}`}
                            >
                                <option value="">Select Category</option>
                                <option value="Exploration Company of the Year">Exploration Company of the Year</option>
                                <option value="Oil & gas Production Company of the year (<1 MMTOE)">Oil & gas Production Company of the year Less than 1 MTOE</option>
                                <option value="Oil & gas Production Company of the year (>=1 MMTOE)">Oil & gas Production Company of the year More than or equal to 1 MMTOE</option>
                                <option value="Goal Net Zero Company of the Year">Goal Net Zero Company of the Year</option>
                                <option value="Green Hydrogen Company of the Year">Green Hydrogen Company of the Year</option>
                                <option value="Overseas Oil & Gas Company of the Year">Overseas Oil & Gas Company of the Year</option>
                                <option value="Digital Technology Provider of the Year">Digital Technology Provider of the Year</option>
                                <option value="Service Provider of the Year">Service Provider of the Year</option>
                                <option value="Pipeline Transportation Company of the Year">Pipeline Transportation Company of the Year</option>
                                <option value="Oil Marketing Company of the Year">Oil Marketing Company of the Year</option>
                                <option value="Human Resource Management">Human Resource Management</option>
                                <option value="CBG Company of the Year">CBG Company of the Year</option>
                                <option value="CGD Company of the Year">CGD Company of the Year</option>
                                <option value="Best Managed Project of the Year">Best Managed Project of the Year</option>
                                <option value="Refinery of the Year">Refinery of the Year</option>
                                <option value="Innovator of the year (team)">Innovator of the year (team)</option>
                                <option value="Woman Executive of the Year">Woman Executive of the Year</option>
                                <option value="Young Achiever of the Year(Male)">Young Achiever of the Year(Male)</option>
                                <option value="Young Achiever of the Year(Female)">Young Achiever of the Year(Female)</option>
                            </select>
                            {!formData.category && currentStep === 1 && <span className="error-tooltip">Category is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Select Refinery</label>
                            <select
                                name="refinery"
                                value={formData.refinery}
                                onChange={(e) => handleChange('refinery', e.target.value)}
                                className={`form-input ${!formData.refinery?.trim() && formData.category === 'Refinery of the Year' && currentStep === 1 ? 'has-error' : ''}`}
                            >
                                <option value="">Select Refinery</option>
                                {getRefineries(formData.Organisationname).map((refinery, index) => (
                                    <option key={index} value={refinery}>{refinery}</option>
                                ))}
                            </select>
                            {!formData.refinery?.trim() && formData.category === 'Refinery of the Year' && currentStep === 1 && <span className="error-tooltip">Refinery name is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Postal Address <span className="text-red">*</span></label>
                            <textarea
                                name="mailingAddress"
                                value={formData.mailingAddress}
                                onChange={(e) => handleChange('mailingAddress', e.target.value)}
                                className={`form-textarea ${!formData.mailingAddress?.trim() && currentStep === 1 ? 'has-error' : ''}`}
                                rows={3}
                                placeholder="Enter Postal address"
                            />
                            {!formData.mailingAddress?.trim() && currentStep === 1 && <span className="error-tooltip">Mailing address is required</span>}
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <h3 className="step-title">Step 2: Authority & Contact Details</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="step-section">
                                <h4>Approving Authority</h4>
                                <div className="form-group">
                                    <label>Name <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="authorityName"
                                        value={formData.authorityName}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
                                                handleChange('authorityName', value);
                                            }
                                        }}
                                        className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Name"
                                    />
                                    {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Authority name is required</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="authorityTitle"
                                        value={formData.authorityTitle}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
                                                handleChange('authorityTitle', value);
                                            }
                                        }}
                                        className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Designation"
                                    />
                                    {!formData.authorityTitle && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="authorityPhone"
                                        value={formData.authorityPhone}
                                        onChange={(e) => handleChange('authorityPhone', e.target.value)}
                                        className={`form-input ${error ? 'has-error' : ''}`}
                                        placeholder="Phone number"
                                        maxLength={10}
                                    />
                                    {error && <span className="error-tooltip">{error}</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="authorityEmail"
                                        value={formData.authorityEmail}
                                        onChange={(e) => handleChange('authorityEmail', e.target.value)}
                                        className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="E-mail address"
                                    />
                                    {!formData.authorityEmail && currentStep === 2 && <span className="error-tooltip">Email is required</span>}
                                </div>
                            </div>
                            <div className="step-section">
                                <h4>Contacts (Nodal Officials) <span className="text-red">*</span></h4>
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="copyApplicantData"
                                            checked={copyApplicantData}
                                            onChange={(e) => {
                                                setCopyApplicantData(e.target.checked);
                                                if (e.target.checked) {
                                                    setFormData({
                                                        ...formData,
                                                        contactEmail: formData.authorityEmail || '',
                                                        contactPhone: formData.authorityPhone || '',
                                                    });
                                                } else {
                                                    setFormData({
                                                        ...formData,
                                                        contactEmail: '',
                                                        contactPhone: '',
                                                    });
                                                }
                                            }}
                                            className="form-checkbox"
                                        /> Same as applicant
                                    </label>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^[A-Za-z\s]*$/.test(value)) {
                                                handleChange('contactName', value);
                                            }
                                        }}
                                        className="form-input"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={(e) => handleChange('contactPhone', e.target.value)}
                                        className="form-input"
                                        placeholder="Phone number"
                                        maxLength={10}
                                        disabled={copyApplicantData}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="contactEmail"
                                        value={formData.contactEmail}
                                        onChange={(e) => handleChange('contactEmail', e.target.value)}
                                        className="form-input"
                                        placeholder="E-mail address"
                                        disabled={copyApplicantData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Company Profile and Activities (2024–25)</label>
                            <p className="note">Write-up (max 300 words) — Operations during 2024–25</p>
                            <textarea
                                name="companyProfile"
                                value={formData.companyProfile}
                                onChange={(e) => handleChange('companyProfile', e.target.value)}
                                className="form-textarea"
                                rows={6}
                                maxLength={300}
                            />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Particulars</th>
                                    <th>2024–25</th>
                                    <th>2023–24</th>
                                    <th>2022–23</th>
                                    <th>2021-22</th>
                                </tr>
                            </thead>
                            <tbody>
                                {part1.map(([num, label, key]) => (
                                    <tr key={key || label}>
                                        <td>{num}</td>
                                        <td>{label}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Array.isArray(formData[key]) ? formData[key][0] || '' : ''}
                                                onChange={(e) => handleChange(key, e.target.value, 0)}
                                                className="form-input"
                                                disabled={!key}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Array.isArray(formData[key]) ? formData[key][1] || '' : ''}
                                                onChange={(e) => handleChange(key, e.target.value, 1)}
                                                className="form-input"
                                                disabled={!key}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Array.isArray(formData[key]) ? formData[key][2] || '' : ''}
                                                onChange={(e) => handleChange(key, e.target.value, 2)}
                                                className="form-input"
                                                disabled={!key}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Array.isArray(formData[key]) ? formData[key][3] || '' : ''}
                                                onChange={(e) => handleChange(key, e.target.value, 3)}
                                                className="form-input"
                                                disabled={!key}
                                            />
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

                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Particulars</th>
                                    <th>2024–25</th>
                                    <th>2023–24</th>
                                    <th>2022–23</th>
                                    <th>2021-22</th>
                                </tr>
                            </thead>
                            <tbody>
                                {part2.slice(0,1).map(([num, label, key]) => (
                                    <tr key={key || label}>
                                        <td>{num}</td>
                                        <td>{label}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Array.isArray(formData[key]) ? formData[key][0] || '' : ''}
                                                onChange={(e) => handleChange(key, e.target.value, 0)}
                                                className="form-input"
                                                disabled={!key}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Array.isArray(formData[key]) ? formData[key][1] || '' : ''}
                                                onChange={(e) => handleChange(key, e.target.value, 1)}
                                                className="form-input"
                                                disabled={!key}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Array.isArray(formData[key]) ? formData[key][2] || '' : ''}
                                                onChange={(e) => handleChange(key, e.target.value, 2)}
                                                className="form-input"
                                                disabled={!key}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Array.isArray(formData[key]) ? formData[key][3] || '' : ''}
                                                onChange={(e) => handleChange(key, e.target.value, 3)}
                                                className="form-input"
                                                disabled={!key}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>



                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Particulars</th>
                                    <th>2024–25</th>

                                </tr>
                            </thead>
                            <tbody>
                                {part2.slice(1).map(([num, label, key]) => (
                                    <tr key={key || label}>
                                        <td>{num}</td>
                                        <td>{label}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={Array.isArray(formData[key]) ? formData[key][0] || '' : formData[key] || ''}
                                                onChange={(e) => handleChange(key, e.target.value, 0)}
                                                className="form-input"
                                            />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="step-section">
                            <div className="form-group">
                                <label>Comments</label>
                                <textarea
                                    name="comment"
                                    value={formData.comment}
                                    onChange={(e) => handleChange('comment', e.target.value)}
                                    className="form-textarea"
                                    maxLength={300}
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
                            <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
                            <div className="form-navigation">
                                <button type="button" onClick={handlePrint} className="btn btn-outline">
                                    Print
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Upload Document with Approving Authority Signature (Director/Board Level)<span className="text-red">*</span></label>
                            <input
                                type="file"
                                accept=".jpg,.png,.pdf"
                                onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
                                className="form-input mt-4"
                            />
                            {formData.approvingAuthoritySignature && (
                                <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
                            )}
                            {error && <span className="error-tooltip">{error}</span>}
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="declaration"
                                    checked={formData.declaration}
                                    onChange={(e) => handleChange('declaration', e.target.checked)}
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

    return (
        <div className="application-form">
            <div className="form-header">
                <h1>
                    Registration Form: {awardTitle}
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
                                <button type="submit" className="btn btn-success">
                                    Submit
                                </button>
                            )}
                        </div>
                    )}
                </form>
            )}
        </div>
    );
};

export default RegistrationRefinery;