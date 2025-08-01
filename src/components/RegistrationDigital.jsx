import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationDigital = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Digital Technology Provider of the Year',
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
        // Quantitative fields
        '1_1_total_revenue_digital_2425': [''],
        '1_1_total_revenue_digital_2324': [''],
        '1_2_total_revenue_company_2425': [''],
        '1_2_total_revenue_company_2324': [''],
        '2_1_projectAName': [''],
        '2_1_projectAAreas': [''],
        '2_1_projectAYear': [''],
        '2_1_projectACustomers': [''],
        '2_1_projectARevenue': [''],
        '2_1_projectAIntangibleValue': [''],
        '2_2_projectBName': [''],
        '2_2_projectBAreas': [''],
        '2_2_projectBYear': [''],
        '2_2_projectBCustomers': [''],
        '2_2_projectBRevenue': [''],
        '2_2_projectBIntangibleValue': [''],
        '2_3_projectCName': [''],
        '2_3_projectCAreas': [''],
        '2_3_projectCYear': [''],
        '2_3_projectCCustomers': [''],
        '2_3_projectCRevenue': [''],
        '2_3_projectCIntangibleValue': [''],
        '3_1_techAName': [''],
        '3_1_techAYear': [''],
        '3_1_techAInvestment': [''],
        '3_1_techAPatents': [''],
        '3_1_techAIntangibleValue': [''],
        '3_2_techBName': [''],
        '3_2_techBYear': [''],
        '3_2_techBInvestment': [''],
        '3_2_techBPatents': [''],
        '3_2_techBIntangibleValue': [''],
        '3_3_techCName': [''],
        '3_3_techCYear': [''],
        '3_3_techCInvestment': [''],
        '3_3_techCPatents': [''],
        '3_3_techCIntangibleValue': [''],
        '3_4_totalRndInvestment2425': [''],
        '4_1_customers2425': [''],
        '4_1_customers2324': [''],
        '4_2_revenuePercentDigital2425': [''],
        //attachments
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
    });
    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    // const navigate = useNavigate();
    const location = useLocation();
    console.log('location.state:', location.state);
    // const awardTitle = location.state?.awardTitle || "Oil & Gas Production Company of the Year";

    const handleChange = (name, value, index = null) => {

        if (["Firstname", "Lastname", "authorityName", "contactName"].includes(name)) {
            const isValid = /^[A-Za-z\s]*$/.test(value);
            if (!isValid) return;
        }

        if (index !== null) {
            setFormData(prev => {
                const updatedArray = [...prev[name]];
                updatedArray[index] = value;
                return {
                    ...prev,
                    [name]: updatedArray
                };
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
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        }

        if (name === 'Organisationname' && !value && currentStep === 1) {
            setError('Organisation name is required.');
        } else if (name === 'mailingAddress' && !value.trim() && currentStep === 1) {
            setError('Mailing address is required.');
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
            [key]: {
                ...prev[key],
                [field]: value
            }
        }));
    };
    const nextStep = () => {
        if (currentStep === 1 && !formData.Organisationname) {
            setError('Organisation name is required.');
            return;
        }
        if (currentStep === 1 && !formData.mailingAddress.trim()) {
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
        localStorage.setItem('registrationProductionDraft', JSON.stringify({ formData}));
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

   

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // 1) Basic validations
//   if (!formData.declaration) {
//     return alert("Please accept the declaration before submitting.");
//   }
//   if (!formData.Organisationname.trim()) {
//     return alert("Organisation name is required.");
//   }
//   if (!formData.mailingAddress.trim()) {
//     return alert("Mailing address is required.");
//   }
//   if (!formData.authorityName.trim()) {
//     return alert("Authority name is required.");
//   }
//   if (!formData.authorityTitle.trim()) {
//     return alert("Authority designation is required.");
//   }
//   if (!formData.approvingAuthoritySignature) {
//     return alert("Approving authority signature file is required.");
//   }

//   // 2) Build FormData
//   const fd = new FormData();

//   // 2a) Map your simple fields (strings, booleans, email, phones…)
//   const simpleMap = {
//     Organisationname:        "organisation_name",
//     category:               "category",
//     companyName:            "company_name",
//     mailingAddress:         "mailing_address",
//     authorityName:          "authority_name",
//     authorityTitle:         "authority_title",
//     authorityPhone:         "authority_phone",
//     authorityEmail:         "authority_email",
//     contactName:            "contact_name",
//     contactPhone:           "contact_phone",
//     contactEmail:           "contact_email",
//     companyProfile:         "company_profile",
//     awardJustification:     "award_justification",
//     comment:                "comment",
//   };

//   Object.entries(simpleMap).forEach(([jsKey, apiKey]) => {
//     const val = formData[jsKey];
//     if (val != null && val !== "") {
//       fd.append(apiKey, val);
//     }
//   });

//   // Booleans need to be strings “true”/“false”
//   fd.append("declaration", formData.declaration ? "true" : "false");

//   // 2b) Signature file
//   fd.append("approving_authority_file", formData.approvingAuthoritySignature);

//   // 2c) Your quant fields (each stored as single-element array)
//   const quantFields = [
//     "1_1_totalRevenueDigital2425", "1_1_totalRevenueDigital2324",
//     "1_2_totalRevenueCompany2425", "1_2_totalRevenueCompany2324",
//     "2_1_projectAName",   "2_1_projectAAreas",   "2_1_projectAYear",
//     "2_1_projectACustomers","2_1_projectARevenue","2_1_projectAIntangibleValue",
//     "2_2_projectBName",   "2_2_projectBAreas",   "2_2_projectBYear",
//     "2_2_projectBCustomers","2_2_projectBRevenue","2_2_projectBIntangibleValue",
//     "2_3_projectCName",   "2_3_projectCAreas",   "2_3_projectCYear",
//     "2_3_projectCCustomers","2_3_projectCRevenue","2_3_projectCIntangibleValue",
//     "3_1_techAName",      "3_1_techAYear",       "3_1_techAInvestment",
//     "3_1_techAPatents",   "3_1_techAIntangibleValue","3_2_techBName",
//     "3_2_techBYear",      "3_2_techBInvestment", "3_2_techBPatents",
//     "3_2_techBIntangibleValue","3_3_techCName",   "3_3_techCYear",
//     "3_3_techCInvestment","3_3_techCPatents",   "3_3_techCIntangibleValue",
//     "3_4_totalRndInvestment2425","4_1_customers2425","4_1_customers2324",
//     "4_2_revenuePercentDigital2425"
//   ];

//   quantFields.forEach(key => {
//     const arr = formData[key];
//     const val = Array.isArray(arr) ? arr[0] : arr;
//     fd.append(key, val || "");
//   });

//   // 2d) Four flat attachments (desc+file)
//   [1,2,3,4].forEach(n => {
//     const slot = formData[`attachments${n}`]; // e.g. { description, file }
//     // **IMPORTANT**: Django expects `attachmentsN_description` to match your model
//     fd.append(`attachments${n}_description`, slot.description || "");
//     if (slot.file instanceof File) {
//       fd.append(`attachments${n}`, slot.file);
//     }
//   });

//   // 3) POST to backend
//   try {
//     const res = await fetch("http://localhost:8000/api/digital/", {
//       method: "POST",
//       body: fd,
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       console.error("Server validation errors:", data);
//       return alert("Submission failed! See console for details.");
//     }
//     alert("Submitted successfully!");
//     setIsSubmitted(true);
//     console.log("Response:", data);
//   } catch (err) {
//     console.error("Network error:", err);
//     alert("Network error, please retry.");
//   }
// };


// inside RegistrationDigital.js

const quantFields = [
  "total_revenue_digital_2425",
  "total_revenue_digital_2324",
  "total_revenue_company_2425",
  "total_revenue_company_2324",

  "projectA_name","projectA_areas","projectA_year",
  "projectA_customers","projectA_revenue","projectA_intangible_value",

  "projectB_name","projectB_areas","projectB_year",
  "projectB_customers","projectB_revenue","projectB_intangible_value",

  "projectC_name","projectC_areas","projectC_year",
  "projectC_customers","projectC_revenue","projectC_intangible_value",

  "techA_name","techA_year","techA_investment","techA_patents","techA_intangible_value",
  "techB_name","techB_year","techB_investment","techB_patents","techB_intangible_value",
  "techC_name","techC_year","techC_investment","techC_patents","techC_intangible_value",

  "total_rnd_investment_2425",
  "customers_2425","customers_2324","revenue_percent_digital_2425"
];

  async function handleSubmit(e) {
    e.preventDefault();
    // basic checks...
    if (!formData.Organisationname.trim()) return alert('Org name required');
    if (!formData.mailingAddress.trim()) return alert('Mailing address required');
    if (!formData.authorityName.trim()) return alert('Authority name required');
    if (!formData.authorityTitle.trim()) return alert('Authority title required');
    if (!formData.approvingAuthoritySignature) return alert('Please upload Authority signature');
    if (!formData.declaration) return alert('Please accept declaration');

    const fd = new FormData();

    // simple fields:
    Object.entries({
      organisation_name: formData.Organisationname,
      category:          formData.category,
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
      award_justification: formData.awardJustification,
      comment:           formData.comment
    }).forEach(([k,v]) => {
      if (v != null && v !== '') fd.append(k, v);
    });

    fd.append('declaration', formData.declaration ? 'true':'false');
    fd.append('approving_authority_file', formData.approvingAuthoritySignature);

    // quantitative:
    quantFields.forEach(key => {
      const v = Array.isArray(formData[key]) ? formData[key][0] : formData[key];
      fd.append(key, v || '');
    });

    // attachments 1–4:
    [1,2,3,4].forEach(n => {
      const { description, file } = formData[`attachments${n}`];
      fd.append(`attachments${n}_desc`, description || '');
      if (file) fd.append(`attachments${n}`, file);
    });

    // post:
    try {
      const url = `${ACTIVE_API_BASE_URL}/digital/`;
      const res = await fetch(url, {
        method: 'POST',
        body: fd
      });
      const data = await res.json();
    if (!res.ok) {
      console.error("Server errors:", data);
      alert("Submission failed; see console.");
      return;
    }
    alert("Submitted successfully!");
    setIsSubmitted(true);

  } catch (err) {
    console.error("Network error:", err);
    alert("Network error; please retry.");
  }
}




    const handlePrint = () => {
        const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h1 style="text-align: center; color: #1e40af;">Registration Form: Digital Technology Provider of the Year</h1>
    <h2>Organization & Contact Details</h2>
    <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
    <p><strong>Category:</strong> ${formData.category || ''}</p>
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
                <th style="border: 1px solid #000; padding: 8px;">Remarks (Value)</th>
            </tr>
        </thead>
        <tbody>
            ${part1.map(([num, label, key]) => `
                <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                    <td style="border: 1px solid #000; padding: 8px;">
                        ${key
                ? key === '1_1_total_revenue_digital_2425' && formData['1_1_total_revenue_digital_2324']
                    ? `2024-25: ${formData['1_1_totalRevenueDigital2425'][0] || ''}, 2023-24: ${formData['1_1_totalRevenueDigital2324'][0] || ''}`
                    : key === '1_2_totalRevenueCompany2425' && formData['1_2_totalRevenueCompany2324']
                        ? `2024-25: ${formData['1_2_totalRevenueCompany2425'][0] || ''}, 2023-24: ${formData['1_2_totalRevenueCompany2324'][0] || ''}`
                        : formData[key] ? formData[key][0] || '' : ''
                : ''
            }
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
                <th style="border: 1px solid #000; padding: 8px;">Remarks</th>
            </tr>
        </thead>
        <tbody>
            ${part2.map(([num, label, key]) => `
                <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                    <td style="border: 1px solid #000; padding: 8px;">
                        ${key
                    ? key === '4_1_customers2425' && formData['4_1_customers2324']
                        ? `2024-25: ${formData['4_1_customers2425'][0] || ''}, 2023-24: ${formData['4_1_customers2324'][0] || ''}`
                        : formData[key] ? formData[key][0] || '' : ''
                    : ''
                }
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

    // ─── Quantitative Information – Part 1 ─────────────────────────
const part1 = [
  ['1',   'Annual Revenue Declaration',                         ''],
  ['1.1', 'Total Revenue Earned from Digital Technology Services',''],
  ['',    'in 2024‑25 (INR Crores)',                             'total_revenue_digital_2425'],
  ['',    'in 2023‑24 (INR Crores)',                             'total_revenue_digital_2324'],
  ['1.2', 'Total Revenue of the Company',                        ''],
  ['',    'in 2024‑25 (INR Crores)',                             'total_revenue_company_2425'],
  ['',    'in 2023‑24 (INR Crores)',                             'total_revenue_company_2324'],

  ['2',   'Digital Technology Implemented (3 Top Tech.)',        ''],

  ['2.1', 'Digital Technology Project (A)',                      ''],
  ['',    'Name of Digital Technology Project',                  'projectA_name'],
  ['',    'Areas of Implementation for Project A',               'projectA_areas'],
  ['',    'Year of Commencement of Project A',                   'projectA_year'],
  ['',    'No. of Customers for Project A (Nos.)',               'projectA_customers'],
  ['',    'Total Revenue till date for Project A (INR Crores)',  'projectA_revenue'],
  ['',    'Intangible Value Provided by Project A',              'projectA_intangible_value'],

  ['2.2', 'Digital Technology Project (B)',                      ''],
  ['',    'Name of Digital Technology Project',                  'projectB_name'],
  ['',    'Areas of Implementation for Project B',               'projectB_areas'],
  ['',    'Year of Commencement of Project B',                   'projectB_year'],
  ['',    'No. of Customers for Project B (Nos.)',               'projectB_customers'],
  ['',    'Total Revenue till date for Project B (INR Crores)',  'projectB_revenue'],
  ['',    'Intangible Value Provided by Project B',              'projectB_intangible_value'],

  ['2.3', 'Digital Technology Project (C)',                      ''],
  ['',    'Name of Digital Technology Project',                  'projectC_name'],
  ['',    'Areas of Implementation for Project C',               'projectC_areas'],
  ['',    'Year of Commencement of Project C',                   'projectC_year'],
  ['',    'No. of Customers for Project C (Nos.)',               'projectC_customers'],
  ['',    'Total Revenue till date for Project C (INR Crores)',  'projectC_revenue'],
  ['',    'Intangible Value Provided by Project C',              'projectC_intangible_value'],
];

    // const part1 = fullData.filter(([num]) => parseFloat(num) <= 3);
    // const part2 = fullData.filter(([num]) => parseFloat(num) > 3);
    // ─── Quantitative Information – Part 2 ─────────────────────────
const part2 = [
  ['3',   'Upcoming R&D on Digital Technology (3 Top Tech.)',''],

  ['3.1', 'R&D Technology A',                                ''],
  ['',    'Name of Technology A',                            'techA_name'],
  ['',    'Year of Commencement of R&D for A',               'techA_year'],
  ['',    'Investment in R&D for A (INR Crores)',            'techA_investment'],
  ['',    'Patents Obtained for A',                          'techA_patents'],
  ['',    'Intangible Value Added by A',                     'techA_intangible_value'],

  ['3.2', 'R&D Technology B',                                ''],
  ['',    'Name of Technology B',                            'techB_name'],
  ['',    'Year of Commencement of R&D for B',               'techB_year'],
  ['',    'Investment in R&D for B (INR Crores)',            'techB_investment'],
  ['',    'Patents Obtained for B',                          'techB_patents'],
  ['',    'Intangible Value Added by B',                     'techB_intangible_value'],

  ['3.3', 'R&D Technology C',                                ''],
  ['',    'Name of Technology C',                            'techC_name'],
  ['',    'Year of Commencement of R&D for C',               'techC_year'],
  ['',    'Investment in R&D for C (INR Crores)',            'techC_investment'],
  ['',    'Patents Obtained for C',                          'techC_patents'],
  ['',    'Intangible Value Added by C',                     'techC_intangible_value'],

  ['',    'Total R&D Investment in 2024‑25 (INR Crores)',    'total_rnd_investment_2425'],

  ['4',   'Market Presence and Growth',''],
  ['',    'Customers in 2024‑25 (Nos.)',                      'customers_2425'],
  ['',    'Customers in 2023‑24 (Nos.)',                      'customers_2324'],
  ['',    '% Revenue from Digital in 2024‑25',                'revenue_percent_digital_2425'],
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
                            <label>Postal Address <span className="text-red">*</span></label>
                            <textarea
                                name="mailingAddress"
                                value={formData.mailingAddress}
                                onChange={(e) => handleChange('mailingAddress', e.target.value)}
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
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {part1.map(([num, label, key]) => (
                                    <tr key={key || num}>
                                        <td>{num}</td>
                                        <td>{label}</td>
                                        <td>
                                            {key ? (
                                                <input
                                                    type={
                                                        key.includes('Name') ||
                                                            key.includes('Areas') ||
                                                            key.includes('Patents')
                                                            ? 'text'
                                                            : 'number'
                                                    }
                                                    value={formData[key] || ''}
                                                    onChange={(e) => handleChange(key, e.target.value)}
                                                    className="form-input"
                                                />
                                            ):(<span></span> )}
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
                                    <th>Remarks </th>
                                </tr>
                            </thead>
                            <tbody>
                                {part2.map(([num, label, key]) => (
                                    <tr key={key || num}>
                                        <td>{num}</td>
                                        <td>{label}</td>
                                        <td>
                                            {key ? (<input
                                                    type={
                                                        key.includes('Name') ||
                                                            key.includes('Patents')
                                                            ? 'name'
                                                            : 'number'
                                                    }
                                                    value={formData[key] || ''}
                                                    onChange={(e) => handleChange(key, e.target.value)}
                                                    className="form-input"
                                                />
                                            ) : (<span></span>
                                            )}
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
                            <label>Upload Document with Approving Authority Signature (Director/Board Level)<span className="text-red">*</span>:</label>
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
                            <div className="notes">
                                <p>Notes/ Definition:</p>
                                <label>Areas of Intangible Value</label>
                                <ol type="a">
                                    <li> Reduction Carbon Footprint </li>
                                    <li> Improvement in Productivity </li>
                                    <li> Improvement in Energy Efficiency </li>
                                    <li> Reduction in Usage of Paper</li>
                                    <li>Improvement in HSE Performance </li>
                                    <li>Improvement in Customer Interfacing</li>
                                    <li>Others</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="application-form">
            <div className="form-header">
                <h1>
                    Registration Form: {"Digital Technology Provider of the Year"}
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

export default RegistrationDigital;