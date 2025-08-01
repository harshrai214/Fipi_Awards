import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationOM = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Oil Marketing Company of the Year',
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
        domesticVolumeMMT2024: '', domesticVolumeMMT2023: '',
        domesticSalesRevenue2024: '', domesticSalesRevenue2023: '',
        exportVolumeMMT2024: '', exportVolumeMMT2023: '',
        exportSalesRevenue2024: '', exportSalesRevenue2023: '',
        domesticMarketShare2024: '', domesticMarketShare2023: '',
        retailMS2024: '', retailMS2023: '',
        retailHSD2024: '', retailHSD2023: '',
        retailOutlets2024: '', retailOutlets2023: '',
        salesPerEmployeeTotal2024: '', salesPerEmployeeTotal2023: '',
        salesPerEmployeeCount2024: '', salesPerEmployeeCount2023: '',
        lubricantsSales2024: '', lubricantsSales2023: '',
        fuelsSales2024: '', fuelsSales2023: '',
        tankageMS2024: '', tankageMS2023: '',
        tankageHSD2024: '', tankageHSD2023: '',
        tankageEthanol2024: '', tankageEthanol2023: '',
        automatedROs2024: '', automatedROs2023: '',
        totalROs2024: '', totalROs2023: '',
        nonCashSales2024: '', nonCashSales2023: '',
        totalSales2024: '', totalSales2023: '',
        gpsTrucks2024: '', gpsTrucks2023: '',
        totalTrucks2024: '', totalTrucks2023: '',
        complaintsNumber2024: '', complaintsNumber2023: '',
        complaintsTurnaround2024: '', complaintsTurnaround2023: '',
        evStations2024: '', evStations2023: '',
        h2Stations2024: '', h2Stations2023: '',
        cbgSales2024: '', cbgSales2023: '',
        lpgConsumption2024: '', lpgConsumption2023: '',
        biofuelsInvestment2024: '', biofuelsInvestment2023: '',
        totalCapex2024: '', totalCapex2023: '',
        ethanolBlendingActual2024: '', ethanolBlendingActual2023: '',
        ethanolBlendingTarget2024: '', ethanolBlendingTarget2023: '',
        fatalities2024: '', fatalities2023: '',
        hoursWorked2024: '', hoursWorked2023: '',
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
    });
    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const awardTitle = location.state?.awardTitle || "Oil Marketing Company of the Year";

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

    const validateForm = () => {
        const errors = {};

        if (!formData.Organisationname?.trim()) {
            errors.Organisationname = 'Organisation name is required';
        }
        if (!formData.authorityName?.trim()) {
            errors.authorityName = 'Authority name is required';
        }
        if (!formData.authorityTitle?.trim()) {
            errors.authorityTitle = 'Authority Designation is required';
        }
        if (!formData.contactEmail?.trim()) {
            errors.contactEmail = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
            errors.contactEmail = 'Invalid email format';
        }

        return errors;
    };

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

const handleSubmit = async e => {
  e.preventDefault();

  // 1) Validate required bits
  if (!formData.declaration) {
    return alert("Please accept the declaration before submitting.");
  }
  if ((formData.authorityPhone || "").replace(/\D/g, "").length !== 10) {
    return alert("Authority phone must be exactly 10 digits.");
  }

  // 2) Build the FormData
  const fd = new FormData();
  // — Organisation & contacts
  fd.append("organisation_name", formData.Organisationname || "");
  fd.append("category",          formData.category);
  fd.append("company_name",      formData.companyName || "");
  fd.append("mailing_address",   formData.mailingAddress || "");

  fd.append("authority_name",  formData.authorityName);
  fd.append("authority_title", formData.authorityTitle || "");
  fd.append("authority_phone", formData.authorityPhone);
  fd.append("authority_email", formData.authorityEmail);

  fd.append("contact_name",  formData.contactName || "");
  fd.append("contact_phone", formData.contactPhone || "");
  fd.append("contact_email", formData.contactEmail || "");

  // — Profile & comments
  fd.append("company_profile", formData.companyProfile || "");
  fd.append("comment",         formData.comment || "");
  fd.append("declaration",     String(formData.declaration));

  // — Signature
  if (formData.approvingAuthoritySignature) {
    fd.append("approving_authority_file", formData.approvingAuthoritySignature);
  }

  // 3) The numeric tables
  // map your React field names → the exact Django field names:
  const mapping = {
    domesticVolumeMMT2024:   "domestic_volume_mmt_2024",
    domesticVolumeMMT2023:   "domestic_volume_mmt_2023",
    domesticSalesRevenue2024:"domestic_sales_revenue_2024",
    domesticSalesRevenue2023:"domestic_sales_revenue_2023",
    exportVolumeMMT2024:     "export_volume_mmt_2024",
    exportVolumeMMT2023:     "export_volume_mmt_2023",
    exportSalesRevenue2024:  "export_sales_revenue_2024",
    exportSalesRevenue2023:  "export_sales_revenue_2023",
    domesticMarketShare2024: "domestic_market_share_2024",
    domesticMarketShare2023: "domestic_market_share_2023",
    retailMS2024:            "retail_ms_2024",
    retailMS2023:            "retail_ms_2023",
    retailHSD2024:           "retail_hsd_2024",
    retailHSD2023:           "retail_hsd_2023",
    retailOutlets2024:       "retail_outlets_2024",
    retailOutlets2023:       "retail_outlets_2023",
    salesPerEmployeeTotal2024: "sales_per_employee_total_2024",
    salesPerEmployeeTotal2023: "sales_per_employee_total_2023",
    salesPerEmployeeCount2024: "sales_per_employee_count_2024",
    salesPerEmployeeCount2023: "sales_per_employee_count_2023",
    lubricantsSales2024:     "lubricants_sales_2024",
    lubricantsSales2023:     "lubricants_sales_2023",
    fuelsSales2024:          "fuels_sales_2024",
    fuelsSales2023:          "fuels_sales_2023",
    tankageMS2024:           "tankage_ms_2024",
    tankageMS2023:           "tankage_ms_2023",
    tankageHSD2024:          "tankage_hsd_2024",
    tankageHSD2023:          "tankage_hsd_2023",
    tankageEthanol2024:      "tankage_ethanol_2024",
    tankageEthanol2023:      "tankage_ethanol_2023",
    automatedROs2024:        "automated_ros_2024",
    automatedROs2023:        "automated_ros_2023",
    totalROs2024:            "total_ros_2024",
    totalROs2023:            "total_ros_2023",
    nonCashSales2024:        "non_cash_sales_2024",
    nonCashSales2023:        "non_cash_sales_2023",
    totalSales2024:          "total_sales_2024",
    totalSales2023:          "total_sales_2023",
    gpsTrucks2024:           "gps_trucks_2024",
    gpsTrucks2023:           "gps_trucks_2023",
    totalTrucks2024:         "total_trucks_2024",
    totalTrucks2023:         "total_trucks_2023",
    complaintsNumber2024:    "complaints_number_2024",
    complaintsNumber2023:    "complaints_number_2023",
    complaintsTurnaround2024:"complaints_turnaround_2024",
    complaintsTurnaround2023:"complaints_turnaround_2023",
    evStations2024:          "ev_stations_2024",
    evStations2023:          "ev_stations_2023",
    h2Stations2024:          "h2_stations_2024",
    h2Stations2023:          "h2_stations_2023",
    cbgSales2024:            "cbg_sales_2024",
    cbgSales2023:            "cbg_sales_2023",
    lpgConsumption2024:      "lpg_consumption_2024",
    lpgConsumption2023:      "lpg_consumption_2023",
    biofuelsInvestment2024:  "biofuels_investment_2024",
    biofuelsInvestment2023:  "biofuels_investment_2023",
    totalCapex2024:          "total_capex_2024",
    totalCapex2023:          "total_capex_2023",
    ethanolBlendingActual2024:"ethanol_blending_actual_2024",
    ethanolBlendingActual2023:"ethanol_blending_actual_2023",
    ethanolBlendingTarget2024:"ethanol_blending_target_2024",
    ethanolBlendingTarget2023:"ethanol_blending_target_2023",
    fatalities2024:          "fatalities_2024",
    fatalities2023:          "fatalities_2023",
    hoursWorked2024:         "hours_worked_2024",
    hoursWorked2023:         "hours_worked_2023",
  };

  Object.entries(mapping).forEach(([rk, apiField]) => {
    fd.append(apiField, formData[rk] || "");
  });

  // 4) Attachments
  [1,2,3,4].forEach(n => {
    const att = formData[`attachments${n}`];
    if (att?.file) {
      fd.append(`attachments${n}`, att.file);
      fd.append(`attachments${n}_desc`, att.description || "");
    }
  });

  // 5) POST
  try {
      const url = `${ACTIVE_API_BASE_URL}/registration-om/`;
      const res = await fetch(url, {
      method: "POST",
      body: fd
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }
    await res.json();
    alert("Submitted successfully!");
    setIsSubmitted(true);
  } catch (err) {
    console.error("Submission error:", err);
    alert("Submit failed—see console.");
  }
};





    const handlePrint = () => {
        const printContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h1 style="text-align: center; color: #1e40af;">Registration Form: ${awardTitle}</h1>
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
                        ${renderQuantitativePrint(1, 6)}
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
                        ${renderQuantitativePrint(7, 14)}
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
                title: 'Revenue from Sales',
                subItems: [{ num: '', label: '', key: '' }],
            },
            {
                num: 1.1,
                title: 'Domestic sales',
                subItems: [
                    { num: '1.1.1', label: 'Volume MMT', key2024: 'domesticVolumeMMT2024', key2023: 'domesticVolumeMMT2023' },
                    { num: '1.1.2', label: 'Sales Revenue (Rs. Crores)', key2024: 'domesticSalesRevenue2024', key2023: 'domesticSalesRevenue2023' },
                ],
            },
            {
                num: 1.2,
                title: 'Export',
                subItems: [
                    { num: '1.2.1', label: 'Volume MMT', key2024: 'exportVolumeMMT2024', key2023: 'exportVolumeMMT2023' },
                    { num: '1.2.2', label: 'Sales Revenue (Rs. Crores)', key2024: 'exportSalesRevenue2024', key2023: 'exportSalesRevenue2023' },
                ],
            },
            {
                num: 2,
                title: 'Domestic market share (Only liquid product sales excluding Petrochemicals and Gas)',
                subItems: [{ num: '2.1', label: 'Domestic Market Share %', key2024: 'domesticMarketShare2024', key2023: 'domesticMarketShare2023' }],
            },
            {
                num: 3,
                title: 'Retail Sales (MMT)',
                subItems: [
                    { num: '3.1', label: 'MS', key2024: 'retailMS2024', key2023: 'retailMS2023' },
                    { num: '3.2', label: 'HSD', key2024: 'retailHSD2024', key2023: 'retailHSD2023' },
                ],
            },
            {
                num: 4,
                title: 'No. of Retail Outlets',
                subItems: [
                    { label: '', key2024: 'retailOutlets2024', key2023: 'retailOutlets2023' },
                ],
            },
            {
                num: 5,
                title: 'Sales per Employee (Marketing function employees as on 31 March)',
                subItems: [
                    { num: '5.1', label: 'Total Sales (MMT)', key2024: 'salesPerEmployeeTotal2024', key2023: 'salesPerEmployeeTotal2023' },
                    { num: '5.2', label: 'No. of Employees', key2024: 'salesPerEmployeeCount2024', key2023: 'salesPerEmployeeCount2023' },
                ],
            },
            {
                num: 6,
                title: 'Sale of Lubricants and Fuels sales (MMT)',
                subItems: [
                    { num: '6.1', label: 'Sales of Lubricants', key2024: 'lubricantsSales2024', key2023: 'lubricantsSales2023' },
                    { num: '6.2', label: 'Sales of Fuels (MS + HSD)', key2024: 'fuelsSales2024', key2023: 'fuelsSales2023' },
                ],
            },
            {
                num: 7,
                title: 'Tankage Capacity at the year end (MMT)',
                subItems: [
                    { num: '7.1', label: 'MS', key2024: 'tankageMS2024', key2023: 'tankageMS2023' },
                    { num: '7.2', label: 'HSD', key2024: 'tankageHSD2024', key2023: 'tankageHSD2023' },
                    { num: '7.3', label: 'Ethanol', key2024: 'tankageEthanol2024', key2023: 'tankageEthanol2023' },
                ],
            },
            {
                num: 8,
                title: 'Digital Initiative (Number)',
                subItems: [
                    { num: '8.1', label: 'Total Automated ROs', key2024: 'automatedROs2024', key2023: 'automatedROs2023' },
                    { num: '8.1.1', label: 'Total ROs', key2024: 'totalROs2024', key2023: 'totalROs2023' },
                    { num: '8.2', label: 'Total Non-Cash sales', key2024: 'nonCashSales2024', key2023: 'nonCashSales2023' },
                    { num: '8.2.1', label: 'Total sales', key2024: 'totalSales2024', key2023: 'totalSales2023' },
                    { num: '8.3', label: 'GPS Enabled Trucks', key2024: 'gpsTrucks2024', key2023: 'gpsTrucks2023' },
                    { num: '8.3.1', label: 'Total No. of Trucks', key2024: 'totalTrucks2024', key2023: 'totalTrucks2023' },
                ],
            },
            {
                num: 9,
                title: 'Customer Complaints redressal',
                subItems: [
                    { num: '9.1', label: 'No. of Complaints', key2024: 'complaintsNumber2024', key2023: 'complaintsNumber2023' },
                    { num: '9.2', label: 'Average customer complaint turn-around time (No. of days)', key2024: 'complaintsTurnaround2024', key2023: 'complaintsTurnaround2023' },
                ],
            },
            {
                num: 10,
                title: 'New Energy Based facilities-EV/H2/CBG added in the RO',
                subItems: [
                    { num: '10.1', label: 'Fast charging EV Stations (No.)', key2024: 'evStations2024', key2023: 'evStations2023' },
                    { num: '10.2', label: 'H2 Dispensing Station (No.)', key2024: 'h2Stations2024', key2023: 'h2Stations2023' },
                    { num: '10.3', label: 'CBG (sales in MT)', key2024: 'cbgSales2024', key2023: 'cbgSales2023' },
                ],
            },
            {
                num: 11,
                title: 'LPG - per capita consumption of PMUY customers',
                subItems: [
                    { num: '11.1', label: 'LPG per capita consumption of PMUY customers (No.)', key2024: 'lpgConsumption2024', key2023: 'lpgConsumption2023' },
                ],
            },
            {
                num: 12,
                title: 'Investment in Bio-fuels (% of total capex) (CBG plant, Ethanol Plant) (Rs. Crores)',
                subItems: [
                    { num: '12.1', label: 'Actual Investment', key2024: 'biofuelsInvestment2024', key2023: 'biofuelsInvestment2023' },
                    { num: '12.2', label: 'Total Capex', key2024: 'totalCapex2024', key2023: 'totalCapex2023' },
                ],
            },
            {
                num: 13,
                title: 'Progress in Ethanol Blending Programme in %',
                subItems: [
                    { num: '13.1', label: 'Actual Ethanol Blending', key2024: 'ethanolBlendingActual2024', key2023: 'ethanolBlendingActual2023' },
                    { num: '13.2', label: 'Ethanol Blending Target', key2024: 'ethanolBlendingTarget2024', key2023: 'ethanolBlendingTarget2023' },
                ],
            },
            {
                num: 14,
                title: 'Safety',
                subItems: [
                    { num: '14.1', label: 'No. of fatalities (own employees + contract employees)', key2024: 'fatalities2024', key2023: 'fatalities2023' },
                    { num: '14.2', label: 'Total No. of hours worked by all employees (including contract employees) in marketing function', key2024: 'hoursWorked2024', key2023: 'hoursWorked2023' },
                ],
            },
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
                        <td style="border: 1px solid #000; padding: 8px;">${formData[item.key2024] || ''}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${formData[item.key2023] || ''}</td>
                    </tr>
                `;
            });
        });
        return html;
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
                                value={formData.Organisationname}
                                required
                                placeholder="Enter Organisation Name"
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
                                        required
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
                                    {[
                                        {
                                            num: 1,
                                            title: 'Revenue from Sales',
                                            subItems: [{ num: '', label: '', key2024: '', key2023: '' }],
                                        },
                                        {
                                            num: 1.1,
                                            title: 'Domestic sales',
                                            subItems: [
                                                { num: '1.1.1', label: 'Volume MMT', key2024: 'domesticVolumeMMT2024', key2023: 'domesticVolumeMMT2023' },
                                                { num: '1.1.2', label: 'Sales Revenue (Rs. Crores)', key2024: 'domesticSalesRevenue2024', key2023: 'domesticSalesRevenue2023' },
                                            ],
                                        },
                                        {
                                            num: 1.2,
                                            title: 'Export',
                                            subItems: [
                                                { num: '1.2.1', label: 'Volume MMT', key2024: 'exportVolumeMMT2024', key2023: 'exportVolumeMMT2023' },
                                                { num: '1.2.2', label: 'Sales Revenue (Rs. Crores)', key2024: 'exportSalesRevenue2024', key2023: 'exportSalesRevenue2023' },
                                            ],
                                        },
                                        {
                                            num: 2,
                                            title: 'Domestic market share (Only liquid product sales excluding Petrochemicals and Gas)',
                                            subItems: [{ num: '2.1', label: 'Domestic Market Share %', key2024: 'domesticMarketShare2024', key2023: 'domesticMarketShare2023' }],
                                        },
                                        {
                                            num: 3,
                                            title: 'Retail Sales (MMT)',
                                            subItems: [
                                                { num: '3.1', label: 'MS', key2024: 'retailMS2024', key2023: 'retailMS2023' },
                                                { num: '3.2', label: 'HSD', key2024: 'retailHSD2024', key2023: 'retailHSD2023' },
                                            ],
                                        },
                                        {
                                            num: 4,
                                            title: 'No. of Retail Outlets',
                                            subItems: [
                                                { label: '', key2024: 'retailOutlets2024', key2023: 'retailOutlets2023' },
                                            ],
                                        },
                                        {
                                            num: 5,
                                            title: 'Sales per Employee (Marketing function employees as on 31 March)',
                                            subItems: [
                                                { num: '5.1', label: 'Total Sales (MMT)', key2024: 'salesPerEmployeeTotal2024', key2023: 'salesPerEmployeeTotal2023' },
                                                { num: '5.2', label: 'No. of Employees', key2024: 'salesPerEmployeeCount2024', key2023: 'salesPerEmployeeCount2023' },
                                            ],
                                        },
                                        {
                                            num: 6,
                                            title: 'Sale of Lubricants and Fuels sales (MMT)',
                                            subItems: [
                                                { num: '6.1', label: 'Sales of Lubricants', key2024: 'lubricantsSales2024', key2023: 'lubricantsSales2023' },
                                                { num: '6.2', label: 'Sales of Fuels (MS + HSD)', key2024: 'fuelsSales2024', key2023: 'fuelsSales2023' },
                                            ],
                                        },
                                    ].map(section => {
                                        if (section.subItems) {
                                            return section.subItems.map((subItem, index) => (
                                                <tr key={`${section.num}-${index}`}>
                                                    {index === 0 && (
                                                        <>
                                                            <td className="sno-cell" rowSpan={section.subItems.length}>{section.num}</td>
                                                            <td className="title-cell" rowSpan={section.subItems.length}><strong>{section.title}</strong></td>
                                                        </>
                                                    )}
                                                    <td className="sno-cell">{subItem.num}</td>
                                                    <td className="label-cell">{subItem.label}</td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name={subItem.key2024}
                                                            value={formData[subItem.key2024] || ''}
                                                            onChange={handleChange}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name={subItem.key2023}
                                                            value={formData[subItem.key2023] || ''}
                                                            onChange={handleChange}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                </tr>
                                            ));
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {currentStep === 4 && (
                    <div>
                        <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
                        <div className="quantitative-form">
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
                                    {[
                                        {
                                            num: 7,
                                            title: 'Tankage Capacity at the year end (MMT)',
                                            subItems: [
                                                { num: '7.1', label: 'MS', key2024: 'tankageMS2024', key2023: 'tankageMS2023' },
                                                { num: '7.2', label: 'HSD', key2024: 'tankageHSD2024', key2023: 'tankageHSD2023' },
                                                { num: '7.3', label: 'Ethanol', key2024: 'tankageEthanol2024', key2023: 'tankageEthanol2023' },
                                            ],
                                        },
                                        {
                                            num: 8,
                                            title: 'Digital Initiative (Number)',
                                            subItems: [
                                                { num: '8.1', label: 'Total Automated ROs', key2024: 'automatedROs2024', key2023: 'automatedROs2023' },
                                                { num: '8.1.1', label: 'Total ROs', key2024: 'totalROs2024', key2023: 'totalROs2023' },
                                                { num: '8.2', label: 'Total Non-Cash sales', key2024: 'nonCashSales2024', key2023: 'nonCashSales2023' },
                                                { num: '8.2.1', label: 'Total sales', key2024: 'totalSales2024', key2023: 'totalSales2023' },
                                                { num: '8.3', label: 'GPS Enabled Trucks', key2024: 'gpsTrucks2024', key2023: 'gpsTrucks2023' },
                                                { num: '8.3.1', label: 'Total No. of Trucks', key2024: 'totalTrucks2024', key2023: 'totalTrucks2023' },
                                            ],
                                        },
                                        {
                                            num: 9,
                                            title: 'Customer Complaints redressal',
                                            subItems: [
                                                { num: '9.1', label: 'No. of Complaints', key2024: 'complaintsNumber2024', key2023: 'complaintsNumber2023' },
                                                { num: '9.2', label: 'Average customer complaint turn-around time (No. of days)', key2024: 'complaintsTurnaround2024', key2023: 'complaintsTurnaround2023' },
                                            ],
                                        },
                                        {
                                            num: 10,
                                            title: 'New Energy Based facilities-EV/H2/CBG added in the RO',
                                            subItems: [
                                                { num: '10.1', label: 'Fast charging EV Stations (No.)', key2024: 'evStations2024', key2023: 'evStations2023' },
                                                { num: '10.2', label: 'H2 Dispensing Station (No.)', key2024: 'h2Stations2024', key2023: 'h2Stations2023' },
                                                { num: '10.3', label: 'CBG (sales in MT)', key2024: 'cbgSales2024', key2023: 'cbgSales2023' },
                                            ],
                                        },
                                        {
                                            num: 11,
                                            title: 'LPG - per capita consumption of PMUY customers',
                                            subItems: [
                                                { num: '11.1', label: 'LPG per capita consumption of PMUY customers (No.)', key2024: 'lpgConsumption2024', key2023: 'lpgConsumption2023' },
                                            ],
                                        },
                                        {
                                            num: 12,
                                            title: 'Investment in Bio-fuels (% of total capex) (CBG plant, Ethanol Plant) (Rs. Crores)',
                                            subItems: [
                                                { num: '12.1', label: 'Actual Investment', key2024: 'biofuelsInvestment2024', key2023: 'biofuelsInvestment2023' },
                                                { num: '12.2', label: 'Total Capex', key2024: 'totalCapex2024', key2023: 'totalCapex2023' },
                                            ],
                                        },
                                        {
                                            num: 13,
                                            title: 'Progress in Ethanol Blending Programme in %',
                                            subItems: [
                                                { num: '13.1', label: 'Actual Ethanol Blending', key2024: 'ethanolBlendingActual2024', key2023: 'ethanolBlendingActual2023' },
                                                { num: '13.2', label: 'Ethanol Blending Target', key2024: 'ethanolBlendingTarget2024', key2023: 'ethanolBlendingTarget2023' },
                                            ],
                                        },
                                        {
                                            num: 14,
                                            title: 'Safety',
                                            subItems: [
                                                { num: '14.1', label: 'No. of fatalities (own employees + contract employees)', key2024: 'fatalities2024', key2023: 'fatalities2023' },
                                                { num: '14.2', label: 'Total No. of hours worked by all employees (including contract employees) in marketing function', key2024: 'hoursWorked2024', key2023: 'hoursWorked2023' },
                                            ],
                                        },
                                    ].map(section => {
                                        if (section.subItems) {
                                            return section.subItems.map((subItem, index) => (
                                                <tr key={`${section.num}-${index}`}>
                                                    {index === 0 && (
                                                        <>
                                                            <td className="sno-cell" rowSpan={section.subItems.length}>{section.num}</td>
                                                            <td className="title-cell" rowSpan={section.subItems.length}><strong>{section.title}</strong></td>
                                                        </>
                                                    )}
                                                    <td className="sno-cell">{subItem.num}</td>
                                                    <td className="label-cell">{subItem.label}</td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name={subItem.key2024}
                                                            value={formData[subItem.key2024] || ''}
                                                            onChange={handleChange}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name={subItem.key2023}
                                                            value={formData[subItem.key2023] || ''}
                                                            onChange={handleChange}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                </tr>
                                            ));
                                        }
                                    })}
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
                <h1>Registration Form: {awardTitle}</h1>
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

export default RegistrationOM;