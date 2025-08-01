import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationPipeline = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Pipeline Transportation Company of the Year',
        companyName: '',
        mailingAddress: '',
        authorityName: '',
        authorityTitle: '',
        authorityPhone: '',
        authorityEmail: '',
        copyApplicantData: false,
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        companyProfile: '',
 
        approvingAuthoritySignature: '',
        declaration: false,
        comment: '',
        throughputCrude2024: '',
        throughputCrude2023: '',
        throughputLiquid2024: '',
        throughputLiquid2023: '',
        throughputGas2024: '',
        throughputGas2023: '',
        actualThroughputCrude2024: '',
        actualThroughputCrude2023: '',
        actualThroughputLiquid2024: '',
        actualThroughputLiquid2023: '',
        actualThroughputGas2024: '',
        actualThroughputGas2023: '',
        opCostCrude2024: '',
        opCostCrude2023: '',
        opCostLiquid2024: '',
        opCostLiquid2023: '',
        opCostGas2024: '',
        opCostGas2023: '',
        energyCrude2024: '',
        energyCrude2023: '',
        energyLiquid2024: '',
        energyLiquid2023: '',
        energyGas2024: '',
        energyGas2023: '',
        leaksCrude2024: '',
        leaksCrude2023: '',
        leaksLiquid2024: '',
        leaksLiquid2023: '',
        leaksGas2024: '',
        leaksGas2023: '',
        lossLeakage2024: '',
        lossLeakage2023: '',
        downtimeBreakdown2024: '',
        downtimeBreakdown2023: '',
        downtimeSabotage2024: '',
        downtimeSabotage2023: '',
        powerTotal2024: '',
        powerTotal2023: '',
        powerRE2024: '',
        powerRE2023: '',
        fatalities2024: '',
        fatalities2023: '',
        injuries2024: '',
        injuries2023: '',
        oshaIncidents2024: '',
        oshaIncidents2023: '',
        manhoursOwn2024: '',
        manhoursOwn2023: '',
        manhoursContract2024: '',
        manhoursContract2023: '',
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
    });
    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const awardTitle = location.state?.awardTitle || "Pipeline Transportation Company of the Year";

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (["Firstname", "Lastname", "authorityName", "contactName"].includes(name)) {
            const isValid = /^[A-Za-z\s]*$/.test(value);
            if (!isValid) return;
        }

        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (name === 'authorityPhone') {
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
                if (event) event.target.value = null;
                return;
            }
            if (file.size > maxSizeInBytes) {
                setError('File size must not exceed 5 MB for attachments.');
                if (event) event.target.value = null;
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

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate declaration first
  if (!formData.declaration) {
    alert("Please accept the declaration before submitting.");
    return;
  }

  // Build FormData for multipart/form-data
  const fd = new FormData();

  // ─── Basic Information ─────────────────────────────
  fd.append("organisation_name", formData.Organisationname);
  fd.append("category", formData.category);
  fd.append("company_name", formData.companyName || "");
  fd.append("mailing_address", formData.mailingAddress);

  // ─── Authority Information ─────────────────────────
  fd.append("authority_name", formData.authorityName);
  fd.append("authority_title", formData.authorityTitle || "");
  fd.append("authority_phone", formData.authorityPhone);
  fd.append("authority_email", formData.authorityEmail);

  fd.append("copy_applicant_data", formData.copyApplicantData ? "true" : "false");

  // ─── Contact Details ───────────────────────────────
  fd.append("contact_name", formData.contactName || "");
  fd.append("contact_phone", formData.contactPhone || "");
  fd.append("contact_email", formData.contactEmail || "");

  // ─── Profile, Comments, Declaration ────────────────
  fd.append("company_profile", formData.companyProfile || "");
  fd.append("comment", formData.comment || "");
  fd.append("declaration", String(formData.declaration));

  // ─── Signature ─────────────────────────────────────
  if (formData.approvingAuthoritySignature) {
    fd.append("approving_authority_file", formData.approvingAuthoritySignature);
  }

  // ─── Quantitative Information (2024 & 2023) ────────
  const numericFields = [
    // Throughput
    "throughputCrude2024", "throughputCrude2023",
    "throughputLiquid2024", "throughputLiquid2023",
    "throughputGas2024", "throughputGas2023",
    // Actual Throughput
    "actualThroughputCrude2024", "actualThroughputCrude2023",
    "actualThroughputLiquid2024", "actualThroughputLiquid2023",
    "actualThroughputGas2024", "actualThroughputGas2023",
    // Operating cost
    "opCostCrude2024", "opCostCrude2023",
    "opCostLiquid2024", "opCostLiquid2023",
    "opCostGas2024", "opCostGas2023",
    // Energy Consumption
    "energyCrude2024", "energyCrude2023",
    "energyLiquid2024", "energyLiquid2023",
    "energyGas2024", "energyGas2023",
    // Leaks
    "leaksCrude2024", "leaksCrude2023",
    "leaksLiquid2024", "leaksLiquid2023",
    "leaksGas2024", "leaksGas2023",
    "lossLeakage2024", "lossLeakage2023",
    // Downtime
    "downtimeBreakdown2024", "downtimeBreakdown2023",
    "downtimeSabotage2024", "downtimeSabotage2023",
    // Power
    "powerTotal2024", "powerTotal2023",
    "powerRe2024", "powerRe2023",
    // Safety
    "fatalities2024", "fatalities2023",
    "injuries2024", "injuries2023",
    "oshaIncidents2024", "oshaIncidents2023",
    "manhoursOwn2024", "manhoursOwn2023",
    "manhoursContract2024", "manhoursContract2023"
  ];

    numericFields.forEach((field) => {
    // Convert camelCase to snake_case with underscores before digits too
    const apiKey = field
      // 1) insert underscore before each uppercase letter
      .replace(/([A-Z])/g, "_$1")
      // 2) insert underscore before each digit sequence
      .replace(/([0-9]+)/g, "_$1")
      // 3) turn it all lower‑case
      .toLowerCase()
      // 4) strip any leading underscore
      .replace(/^_+/, "")
      // 5) collapse any double‑underscores (in case you got “__”)
      .replace(/__+/g, "_");

    fd.append(apiKey, formData[field] ?? "");
  });

  // ─── Attachments (1..4) ────────────────────────────
  [1, 2, 3, 4].forEach((num) => {
    const att = formData[`attachments${num}`];
    if (att && att.file) {
      fd.append(`attachments${num}`, att.file);
      fd.append(`attachments${num}_desc`, att.description || "");
    }
  });

  // ─── Send POST request ─────────────────────────────
  try {
    const url = `${ACTIVE_API_BASE_URL}/pipeline/`;
    const res = await fetch(url, {
      method: "POST",
      body: fd
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server Error:", errorText);
      alert("Error: " + errorText);
      return;
    }

    const data = await res.json();
    console.log("Pipeline Registration Saved:", data);
    alert("Registration submitted successfully!");

    // Reset form if needed
    setIsSubmitted(true);
    setFormData({
      // Reset all your form fields here as per initial state
    });

  } catch (error) {
    console.error("Error submitting Pipeline Registration:", error);
    alert("Submission failed! Check console for details.");
  }
};


    const handlePrint = () => {
        const printContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h1 style="text-align: center; color: #1e40af;">Registration Form: Pipeline Transportation Company of the Year</h1>
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
                            <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
                            <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderQuantitativePrint(1, 5)}
                    </tbody>
                </table>
                <h2>Quantitative Information - Part 2</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
                            <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderQuantitativePrint(6, 8)}
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

    const renderQuantitativePrint = (sectionStart, sectionEnd) => {
        const data = [
            {
                num: 1,
                title: 'Pipeline Throughput Capacity (MMT)',
                subItems: [
                    { num: '1.1', label: 'Crude Oil', key: 'throughputCrude2024' },
                    { num: '1.2', label: 'Liquid Products (Including LPG)', key: 'throughputLiquid2024' },
                    { num: '1.3', label: 'Natural Gas', key: 'throughputGas2024' },
                ]
            },
            {
                num: 2,
                title: 'Pipeline Actual Throughput (MMT)',
                subItems: [
                    { num: '2.1', label: 'Crude Oil', key: 'actualThroughputCrude2024' },
                    { num: '2.2', label: 'Liquid Products (Including LPG)', key: 'actualThroughputLiquid2024' },
                    { num: '2.3', label: 'Natural Gas', key: 'actualThroughputGas2024' },
                ]
            },
            {
                num: 3,
                title: 'Operating Cost (Rs./Ton/Km) (Exclude depreciation)',
                subItems: [
                    { num: '3.1', label: 'Crude Oil', key: 'opCostCrude2024' },
                    { num: '3.2', label: 'Liquid Products (Including LPG)', key: 'opCostLiquid2024' },
                    { num: '3.3', label: 'Natural Gas', key: 'opCostGas2024' },
                ]
            },
            {
                num: 4,
                title: 'Specific Energy Consumption (Kcal/ Ton-Km)',
                subItems: [
                    { num: '4.1', label: 'Crude Oil', key: 'energyCrude2024' },
                    { num: '4.2', label: 'Liquid Products (Including LPG)', key: 'energyLiquid2024' },
                    { num: '4.3', label: 'Natural Gas', key: 'energyGas2024' },
                ]
            },
            {
                num: 5,
                title: 'Leaks reported during the year (number)',
                subItems: [
                    { num: '5.1', label: 'Crude Oil', key: 'leaksCrude2024' },
                    { num: '5.2', label: 'Liquid Products (Including LPG)', key: 'leaksLiquid2024' },
                    { num: '5.3', label: 'Natural Gas', key: 'leaksGas2024' },
                    { num: '5.4', label: 'Loss due to leakage (MMT)', key: 'lossLeakage2024' },
                ]
            },
            {
                num: 6,
                title: 'Pipeline Downtime (Hours)',
                subItems: [
                    { num: '6.1', label: 'Breakdown', key: 'downtimeBreakdown2024' },
                    { num: '6.2', label: 'Leaks/Sabotage', key: 'downtimeSabotage2024' },
                ]
            },
            {
                num: 7,
                title: 'Renewable Energy (RE) as % of total power consumed',
                subItems: [
                    { num: '7.1', label: 'Total Power consumed (kw)', key: 'powerTotal2024' },
                    { num: '7.2', label: 'RE Power produced (kw)', key: 'powerRE2024' },
                ]
            },
            {
                num: 8,
                title: 'Safety',
                subItems: [
                    { num: '8.1', label: 'Number of fatalities', key: 'fatalities2024' },
                    { num: '8.2', label: 'Lost time injuries', key: 'injuries2024' },
                    { num: '8.3', label: 'OSHA recordable incidents', key: 'oshaIncidents2024' },
                    { num: '8.4', label: 'Man-hours worked Own Employees', key: 'manhoursOwn2024' },
                    { num: '8.5', label: 'Man-hours worked Contractors', key: 'manhoursContract2024' },
                ]
            }
        ];

        let html = '';
        const filteredData = data.filter(section => section.num >= sectionStart && section.num <= sectionEnd);
        filteredData.forEach(section => {
            section.subItems.forEach((item, index) => {
                html += `
                    <tr>
                        ${index === 0 ? `<td style="border: 1px solid #000; padding: 8px;" rowspan="${section.subItems.length}">${section.num}</td>` : ''}
                        ${index === 0 ? `<td style="border: 1px solid #000; padding: 8px;" rowspan="${section.subItems.length}">${section.title}</td>` : ''}
                        <td style="border: 1px solid #000; padding: 8px;">${item.num}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${item.label}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${formData[item.key] || ''}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${formData[item.key.replace('2024', '2023')] || ''}</td>
                    </tr>
                `;
            });
        });
        return html;
    };

    const renderStepContent = () => {
        const progress = ((currentStep - 1) / 4) * 100;
        const data = [
            {
                num: 1,
                title: 'Pipeline Throughput Capacity (MMT)',
                subItems: [
                    { num: '1.1', label: 'Crude Oil', key: 'throughputCrude2024' },
                    { num: '1.2', label: 'Liquid Products (Including LPG)', key: 'throughputLiquid2024' },
                    { num: '1.3', label: 'Natural Gas', key: 'throughputGas2024' },
                ]
            },
            {
                num: 2,
                title: 'Pipeline Actual Throughput (MMT)',
                subItems: [
                    { num: '2.1', label: 'Crude Oil', key: 'actualThroughputCrude2024' },
                    { num: '2.2', label: 'Liquid Products (Including LPG)', key: 'actualThroughputLiquid2024' },
                    { num: '2.3', label: 'Natural Gas', key: 'actualThroughputGas2024' },
                ]
            },
            {
                num: 3,
                title: 'Operating Cost (Rs./Ton/Km) (Exclude depreciation)',
                subItems: [
                    { num: '3.1', label: 'Crude Oil', key: 'opCostCrude2024' },
                    { num: '3.2', label: 'Liquid Products (Including LPG)', key: 'opCostLiquid2024' },
                    { num: '3.3', label: 'Natural Gas', key: 'opCostGas2024' },
                ]
            },
            {
                num: 4,
                title: 'Specific Energy Consumption (Kcal/ Ton-Km)',
                subItems: [
                    { num: '4.1', label: 'Crude Oil', key: 'energyCrude2024' },
                    { num: '4.2', label: 'Liquid Products (Including LPG)', key: 'energyLiquid2024' },
                    { num: '4.3', label: 'Natural Gas', key: 'energyGas2024' },
                ]
            },
            {
                num: 5,
                title: 'Leaks reported during the year (number)',
                subItems: [
                    { num: '5.1', label: 'Crude Oil', key: 'leaksCrude2024' },
                    { num: '5.2', label: 'Liquid Products (Including LPG)', key: 'leaksLiquid2024' },
                    { num: '5.3', label: 'Natural Gas', key: 'leaksGas2024' },
                    { num: '5.4', label: 'Loss due to leakage (MMT)', key: 'lossLeakage2024' },
                ]
            },
            {
                num: 6,
                title: 'Pipeline Downtime (Hours)',
                subItems: [
                    { num: '6.1', label: 'Breakdown', key: 'downtimeBreakdown2024' },
                    { num: '6.2', label: 'Leaks/Sabotage', key: 'downtimeSabotage2024' },
                ]
            },
            {
                num: 7,
                title: 'Renewable Energy (RE) as % of total power consumed',
                subItems: [
                    { num: '7.1', label: 'Total Power consumed (kw)', key: 'powerTotal2024' },
                    { num: '7.2', label: 'RE Power produced (kw)', key: 'powerRE2024' },
                ]
            },
            {
                num: 8,
                title: 'Safety',
                subItems: [
                    { num: '8.1', label: 'Number of fatalities', key: 'fatalities2024' },
                    { num: '8.2', label: 'Lost time injuries', key: 'injuries2024' },
                    { num: '8.3', label: 'OSHA recordable incidents', key: 'oshaIncidents2024' },
                    { num: '8.4', label: 'Man-hours worked Own Employees', key: 'manhoursOwn2024' },
                    { num: '8.5', label: 'Man-hours worked Contractors', key: 'manhoursContract2024' },
                ]
            }
        ];

        const years = ['2024-25', '2023-24'];

        const renderSection = (section) => (
            section.subItems.map((item, index) => {
                const key = item.key || '';
                return (
                    <tr key={index}>
                        {index === 0 && (
                            <>
                                <td className="sno-cell" rowSpan={section.subItems.length}>{section.num}</td>
                                <td className="title-cell" rowSpan={section.subItems.length}><strong>{section.title}</strong></td>
                            </>
                        )}
                        <td className="sno-cell">{item.num}</td>
                        <td className="label-cell">{item.label}</td>
                        {years.map((year, yIndex) => (
                            <td key={yIndex}>
                                <input
                                    type="number"
                                    name={key.replace('2024', year === '2024-25' ? '2024' : '2023')}
                                    value={formData[key.replace('2024', year === '2024-25' ? '2024' : '2023')] || ''}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </td>
                        ))}
                    </tr>
                );
            })
        );

        const part1 = data.filter(section => section.num >= 1 && section.num <= 5);
        const part2 = data.filter(section => section.num >= 6 && section.num <= 8);

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
                                onChange={handleChange}
                                className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
                            />
                            {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Select Category <span className="text-red">*</span></label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                onChange={handleChange}
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
                        <div className="quantitative-form">
                            {data.filter(section => section.num >= 1 && section.num <= 6).length > 0 && (
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
                                        {data.filter(section => section.num >= 1 && section.num <= 5).map(section => renderSection(section))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}
                {currentStep === 4 && (
                    <div>
                        <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
                        <div className="quantitative-form">
                            {data.filter(section => section.num >= 6 && section.num <= 8).length > 0 && (
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
                                            {data.filter(section => section.num >= 6 && section.num <= 8).map(section => renderSection(section))}
                                        </tbody>
                                    </table>
                                    <div className="step-section">
                                        <div className="form-group">
                                            <label>Comments</label>
                                            <textarea
                                                name="comment"
                                                value={formData.comment || ''}
                                                onChange={handleChange}
                                                maxLength={300}
                                                placeholder="Comments in (200 words) against input parameter, if any"
                                            />
                                        </div>
                                    </div>
                                </>
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
                                    onChange={handleChange}
                                    className="form-checkbox"
                                />
                                I declare that the information submitted is true and complete.
                            </label>
                            <div className="notes">
                                <p>Notes/ Definition:</p>
                                <label>Areas of Intangible Value</label>
                                <ol type="a">
                                    <li>Reduction Carbon Footprint</li>
                                    <li>Improvement in Productivity</li>
                                    <li>Improvement in Energy Efficiency</li>
                                    <li>Reduction in Usage of Paper</li>
                                    <li>Improvement in HSE Performance</li>
                                    <li>Improvement in Customer Interfacing</li>
                                    <li>Others</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="application-form">
            <div className="form-header">
                <h1>Registration Form: Pipeline Transportation Company of the Year</h1>
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

export default RegistrationPipeline;