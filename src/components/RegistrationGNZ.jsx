import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/Form.css';

const initialTechnology = {
    activityName: '',
    plannedActivities: '',
    actualProgress: '',
};

const RegistrationGNZ = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Goal Net Zero Company of the Year',
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
        approvingAuthoritySignature: '',
        declaration: false,
        comment: '',

        //Variables
        netZeroTarget2024: "",
        netZeroTarget2023: "",
        carbonEmitted2024: "",
        carbonEmitted2023: "",
        energyConsumed2024: "",
        energyConsumed2023: "",
        annualRevenue2024: "",
        annualRevenue2023: "",
        capexWind2024: "",
        capexWind2023: "",
        capexSolar2024: "",
        capexSolar2023: "",
        capexOtherRE2024: "",
        capexOtherRE2023: "",
        rePowerProd2024: "",
        rePowerProd2023: "",
        powerConsumed2024: "",
        powerConsumed2023: "",
        gh2Investment2024: "",
        gh2Investment2023: "",
        gh2Production2024: "",
        gh2Production2023: "",
        treePlantation2024: "",
        treePlantation2023: "",
        carbonCapture2024: "",
        carbonCapture2023: "",
        ccsCapex2024: "",
        ccsCapex2023: "",
        carbonCaptured2024: "",
        carbonCaptured2023: "",

        //attachments
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },

    });

    const [technologies, setTechnologies] = useState(Array(5).fill(null).map(() => ({ ...initialTechnology })));
    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    const location = useLocation();
    console.log('RegistrationExploration rendered, location.state:', location.state); // Debug log
    const awardTitle = location.state?.awardTitle || "Goal Net Zero Company of the Year";

    const handleChange = (e, index = null) => {
        const { name, value, type, checked } = e.target;
        if (index !== null) {
            setFormData(prev => ({
                ...prev,
                [name]: prev[name].map((val, i) => i === index ? value : val)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }

        if (name === 'Organisationname' && !value && currentStep === 1) {
            setError('Organisation name is required.');
        } else if (name === 'mailingAddress' && !value.trim() && currentStep === 1) {
            setError('Mailing address is required.');
        } else {
            setError('');
        }
    };

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
    const handleTechnologyChange = (index, field, value) => {
        const updatedTechnologies = [...technologies];
        updatedTechnologies[index][field] = value;
        setTechnologies(updatedTechnologies);
    };

    const handleApprovingAuthorityChange = (files) => {
        setFormData({ ...formData, approvingAuthoritySignature: files[0] });
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
            setError('authority name is required.');
            return;
        }
        if (currentStep === 2 && !formData.authorityEmail) {
            setError('Authority name is required.');
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
        localStorage.setItem('registrationExplorationDraft', JSON.stringify({ formData, technologies }));
        alert('Draft Saved!');
    };

   const handleSubmit = async (e) => {
  e.preventDefault();

  // 1) Declaration checkbox
  if (!formData.declaration) {
    alert("Please accept the declaration before submitting.");
    return;
  }

  // 2) Build FormData
  const fd = new FormData();

  // 2a) Handle the four flat attachments explicitly
  [1, 2, 3, 4].forEach((n) => {
    const key = `attachments${n}`;
    const descKey = `${key}_desc`;
    const attachment = formData[key] || {};

    // description
    if (attachment.description) {
      fd.append(descKey, attachment.description);
    }

    // file
    if (attachment.file instanceof File) {
      fd.append(key, attachment.file);
    }
  });

  // 2b) Map of frontend → backend field names
  const fieldMap = {
    Organisationname: "organisation_name",
    category: "category",
    companyName: "company_name",
    mailingAddress: "mailing_address",
    authorityName: "authority_name",
    authorityTitle: "authority_title",
    authorityPhone: "authority_phone",
    authorityEmail: "authority_email",
    contactName: "contact_name",
    contactPhone: "contact_phone",
    contactEmail: "contact_email",
    companyProfile: "company_profile",
    comment: "comment",
    declaration: "declaration",
    approvingAuthoritySignature: "approving_authority_file",

    // quantitative 2024 / 2023
    netZeroTarget2024: "net_zero_target_2024",
    netZeroTarget2023: "net_zero_target_2023",
    carbonEmitted2024: "carbon_emitted_2024",
    carbonEmitted2023: "carbon_emitted_2023",
    energyConsumed2024: "energy_consumed_2024",
    energyConsumed2023: "energy_consumed_2023",
    annualRevenue2024: "annual_revenue_2024",
    annualRevenue2023: "annual_revenue_2023",
    capexWind2024: "capex_wind_2024",
    capexWind2023: "capex_wind_2023",
    capexSolar2024: "capex_solar_2024",
    capexSolar2023: "capex_solar_2023",
    capexOtherRE2024: "capex_other_re_2024",
    capexOtherRE2023: "capex_other_re_2023",
    rePowerProd2024: "re_power_prod_2024",
    rePowerProd2023: "re_power_prod_2023",
    powerConsumed2024: "power_consumed_2024",
    powerConsumed2023: "power_consumed_2023",
    gh2Investment2024: "gh2_investment_2024",
    gh2Investment2023: "gh2_investment_2023",
    gh2Production2024: "gh2_production_2024",
    gh2Production2023: "gh2_production_2023",
    treePlantation2024: "tree_plantation_2024",
    treePlantation2023: "tree_plantation_2023",
    carbonCapture2024: "carbon_capture_2024",
    carbonCapture2023: "carbon_capture_2023",
    ccsCapex2024: "ccs_capex_2024",
    ccsCapex2023: "ccs_capex_2023",
    carbonCaptured2024: "carbon_captured_2024",
    carbonCaptured2023: "carbon_captured_2023",
  };

  // 2c) Append all other fields
  Object.entries(formData).forEach(([key, val]) => {
    // skip the four flat attachments (we already did them)
    if (key.startsWith("attachments")) return;

    const backendKey = fieldMap[key];
    if (!backendKey) return;

    // file fields
    if (val instanceof File) {
      fd.append(backendKey, val);
    }
    // boolean
    else if (typeof val === "boolean") {
      fd.append(backendKey, val ? "true" : "false");
    }
    // anything else non‑empty
    else if (val !== "" && val != null) {
      fd.append(backendKey, val);
    }
  });

  // 2d) JSON‑encode the technologies array
  const filteredTech = technologies.filter(
    (t) => t.activityName || t.plannedActivities || t.actualProgress
  );
  fd.append("technologies", JSON.stringify(filteredTech));

  // 3) Send to your DRF endpoint
  try {
    
      const url = `${ACTIVE_API_BASE_URL}/goal-net-zero/`;
      const res = await fetch(url, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) {
      const err = await res.json();
      console.error("Submission error:", err);
      alert("Submission failed! See console for details.");
      return;
    }
    alert("Submitted successfully!");
    setIsSubmitted(true);
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error! Please try again.");
  }
};




    const handlePrint = () => {
        const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">Registration Form: Goal Net Zero Company of the Year</h1>
        <h2>Organization & Contact Details</h2>
        <p><strong>Organisation Name:</strong> ${formData.Organisationname}</p>
        <p><strong>Category:</strong> ${formData.category}</p>
        <p><strong>Mailing Address:</strong> ${formData.mailingAddress}</p>
        <p><strong>First Name:</strong> ${formData.Firstname}</p>
        <p><strong>Last Name:</strong> ${formData.Lastname}</p>
        <p><strong>Email Address:</strong> ${formData.userid}</p>
        <h2>Company Details</h2>
        <p><strong>Name of Company:</strong> ${formData.companyName}</p>
        <p><strong>Authority Name:</strong> ${formData.authorityName}</p>
        <p><strong>Authority Title:</strong> ${formData.authorityTitle}</p>
        <p><strong>Authority Phone:</strong> ${formData.authorityPhone}</p>
        <p><strong>Authority Email:</strong> ${formData.authorityEmail}</p>
        <p><strong>Contact Name:</strong> ${formData.contactName}</p>
        <p><strong>Company Profile:</strong> ${formData.companyProfile}</p>
        <h2>Quantitative Information - Exploration Part 1</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Net Zero (Scope – I & II) – Target Year</td><td>${part1.netZeroTarget2024}</td><td>${formData.netZeroTarget2023}</td><td></td></tr>
            <tr><td>2</td><td>Total Carbon Emitted (tCO2e)</td><td>${formData.carbonEmitted2024}</td><td>${formData.carbonEmitted2023}</td><td></td></tr>
            <tr><td>3</td><td>Total Energy Consumed (GJ)</td><td>${formData.energyConsumed2024}</td><td>${formData.energyConsumed2023}</td><td></td></tr>
            <tr><td>4</td><td>Annual Revenue (INR Crores)</td><td>${formData.annualRevenue2024}</td><td>${formData.annualRevenue2023}</td><td></td></tr>
            <tr><td>5</td><td>Capex – Wind Energy (INR Crores)</td><td>${formData.capexWind2024}</td><td>${formData.capexWind2023}</td><td></td></tr>
          </tbody>
        </table>
        <h2>Quantitative Information - Exploration Part 2</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th></tr></thead>
          <tbody>
            <tr><td>6</td><td>Capex – Solar Energy (INR Crores)</td><td>${formData.capexSolar2024}</td><td>${formData.capexSolar2023}</td><td></td></tr>
            <tr><td>7.1</td><td>Capex – Other RE Gen (INR Crores)</td><td>${formData.capexOtherRE2024}</td><td>${formData.capexOtherRE2023}</td><td></td></tr>
            <tr><td>7.2</td><td>RE Power Production (MW)</td><td>${formData.rePowerProd2024}</td><td>${formData.rePowerProd2023}</td><td></td></tr>
            <tr><td>8</td><td>Total Power Consumption (MW)</td><td>${formData.powerConsumed2024}</td><td>${formData.powerConsumed2023}</td><td></td></tr>
            <tr><td>8.1</td><td>GH2 Investment (INR Crores)</td><td>${formData.gh2Investment2024}</td><td>${formData.gh2Investment2023}</td><td></td></tr>
            <tr><td>8.2</td><td>GH2 Production (MT)</td><td>${formData.gh2Production2024}</td><td>${formData.gh2Production2023}</td><td></td></tr>
            <tr><td>8.3</td><td>Tree Plantation (Nos.)</td><td>${formData.treePlantation2024}</td><td>${formData.treePlantation2023}</td><td></td></tr>
            <tr><td>8.4</td><td>Carbon Capture Initiatives</td><td>${formData.carbonCapture2024}</td><td>${formData.carbonCapture2023}</td><td></td></tr>
            <tr><td>8.5</td><td>Capex for CCS/CCUS (INR Crores)</td><td>${formData.ccsCapex2024}</td><td>${formData.ccsCapex2023}</td><td></td></tr>
            <tr><td>9</td><td>Carbon Captured (MT)</td><td>${formData.carbonCaptured2024}</td><td>${formData.carbonCaptured2024}</td><td></td></tr>
          </tbody>
        </table>
        <h2>New Technologies Adopted</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead><tr><th>S. No.</th><th>Activity Name</th><th>Planned Activities</th><th>Actual Progress</th></tr></thead>
          <tbody>
            ${technologies.map((tech, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${tech.activityName}</td>
                <td>${tech.plannedActivities}</td>
                <td>${tech.actualProgress}</td>
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

    const part1 = [
        { num: 1, title: 'Net Zero (Scope – I & II) – Target Year', key2024: 'netZeroTarget2024', key2023: 'netZeroTarget2023' },
        { num: 2, title: 'Total Carbon Emitted (tCO2e)', key2024: 'carbonEmitted2024', key2023: 'carbonEmitted2023' },
        { num: 3, title: 'Total Energy Consumed (GJ)', key2024: 'energyConsumed2024', key2023: 'energyConsumed2023' },
        { num: 4, title: 'Annual Revenue (INR Crores)', key2024: 'annualRevenue2024', key2023: 'annualRevenue2023' },
        { num: 5, title: 'Capex – Wind Energy (INR Crores)', key2024: 'capexWind2024', key2023: 'capexWind2023' },
        { num: 6, title: 'Capex – Solar Energy (INR Crores)', key2024: 'capexSolar2024', key2023: 'capexSolar2023' },
        { num: 7, title: 'Capex – Other RE Gen (INR Crores)', key2024: 'capexOtherRE2024', key2023: 'capexOtherRE2023' },
        { num: 8, title: 'RE Power Production (MW)', key2024: 'rePowerProd2024', key2023: 'rePowerProd2023' },
        { num: 9, title: 'Total Power Consumption (MW)', key2024: 'powerConsumed2024', key2023: 'powerConsumed2023' },
        { num: 10, title: 'GH2 Investment (INR Crores)', key2024: 'gh2Investment2024', key2023: 'gh2Investment2023' },
        { num: 11, title: 'GH2 Production (MT)', key2024: 'gh2Production2024', key2023: 'gh2Production2023' },
        { num: 12, title: 'Tree Plantation (Nos.)', key2024: 'treePlantation2024', key2023: 'treePlantation2023' },
        { num: 13, title: 'Carbon Capture Initiatives', key2024: 'carbonCapture2024', key2023: 'carbonCapture2023' },
        { num: '13.1', title: 'Capex for CCS/CCUS (INR Crores)', key2024: 'ccsCapex2024', key2023: 'ccsCapex2023' },
        { num: '13.2', title: 'Carbon Captured (MT)', key2024: 'carbonCaptured2024', key2023: 'carbonCaptured2023' },
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
                                onChange={handleChange}
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
                                <option value="Oil & gas Production Company of the year Less than 1 MMTOE">Oil & gas Production Company of the year Less than 1 MTOE</option>
                                <option value="Oil & gas Production Company of the year More than or equal to 1 MMTOE">Oil & gas Production Company of the year More than or equal to 1 MMTOE</option>
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

                            {/* SelectedAwardCategory=formData.category */}
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
                                        // Prevent typing anything but A–Z or space
                                        onKeyPress={(e) => {
                                            if (!/^[A-Za-z\s]$/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        // Prevent pasting digits/symbols
                                        onPaste={(e) => {
                                            const paste = (e.clipboardData || window.clipboardData).getData('text');
                                            if (!/^[A-Za-z\s]+$/.test(paste)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Name"
                                        maxLength={100}
                                        pattern="[A-Za-z\s]+"
                                        title="Only letters and spaces are allowed"
                                        required
                                    />
                                    {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Name is required</span>}
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="authorityTitle"
                                        value={formData.authorityTitle}
                                        onChange={handleChange}
                                        // Prevent typing anything but A–Z, 0–9 or space
                                        onKeyPress={(e) => {
                                            if (!/^[A-Za-z0-9\s]$/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        // Prevent pasting anything but letters, digits or spaces
                                        onPaste={(e) => {
                                            const paste = (e.clipboardData || window.clipboardData).getData('text');
                                            if (!/^[A-Za-z0-9\s]+$/.test(paste)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="form-input"
                                        placeholder="Designation"
                                        maxLength={100}
                                        pattern="[A-Za-z0-9\s]+"
                                        title="Only letters, numbers and spaces are allowed"
                                    />
                                </div>


                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="authorityPhone"
                                        value={formData.authorityPhone}
                                        onChange={handleChange}
                                        // Block non‑digit keystrokes
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        // Block pasting anything but digits
                                        onPaste={(e) => {
                                            const paste = (e.clipboardData || window.clipboardData).getData('text');
                                            if (!/^[0-9]+$/.test(paste)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="form-input"
                                        placeholder="Phone number"
                                        maxLength={10}
                                        pattern="\d{10}"
                                        title="Please enter exactly 10 digits"
                                        required
                                    />
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

                                                        contactEmail: formData.authorityEmail,
                                                        contactPhone: formData.authorityPhone,
                                                    });
                                                }
                                            }}
                                            className="form-checkbox"
                                        /> Same as applicant
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Name <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="contactNodalName"
                                        value={formData.contactNodalName}
                                        onChange={handleChange}
                                        // Prevent typing anything but A–Z or space
                                        onKeyPress={(e) => {
                                            if (!/^[A-Za-z\s]$/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        // Prevent pasting digits/symbols
                                        onPaste={(e) => {
                                            const paste = (e.clipboardData || window.clipboardData).getData('text');
                                            if (!/^[A-Za-z\s]+$/.test(paste)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Name"
                                        maxLength={50}
                                        pattern="[A-Za-z\s]+"
                                        title="Only letters and spaces are allowed"
                                        required
                                    />
                                    {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Name is required</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="authorityPhone"
                                        value={formData.authorityPhone}
                                        onChange={handleChange}
                                        // Block non‑digit keystrokes
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        // Block pasting anything but digits
                                        onPaste={(e) => {
                                            const paste = (e.clipboardData || window.clipboardData).getData('text');
                                            if (!/^[0-9]+$/.test(paste)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="form-input"
                                        placeholder="Phone number"
                                        maxLength={10}
                                        pattern="\d{10}"
                                        title="Please enter exactly 10 digits"
                                        required
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
                                maxLength={2400}
                            />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h3 className="step-title">Step 3: Quantitative Information - Exploration Part 1</h3>
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
                                {part1.slice(0, 9).map(item => (
                                    <tr key={item.num}>
                                        <td className="sno-cell">{item.num}</td>
                                        <td className="label-cell">{item.title}</td>
                                        <td>
                                            <input
                                                type="number"
                                                name={item.key2024}
                                                value={formData[item.key2024] || ''}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name={item.key2023}
                                                value={formData[item.key2023] || ''}
                                                onChange={handleChange}
                                                className="form-input"
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
                        <h3 className="step-title">Step 4: Quantitative Information - Exploration Part 2</h3>
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
                                {part1.slice(9, 15).map(item => (
                                    <tr key={item.num}>
                                        <td className="sno-cell">{item.num}</td>
                                        <td className="label-cell">{item.title}</td>
                                        <td>
                                            <input
                                                type="number"
                                                name={item.key2024}
                                                value={formData[item.key2024] || ''}
                                                onChange={handleChange}
                                                className="form-input"
                                            />

                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name={item.key2023}
                                                value={formData[item.key2023] || ''}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <table className="quant-table">
                            <thead>
                                <tr>
                                    <th>S. No</th>
                                    <th>Activity Name</th>
                                    <th>Planned Activities</th>
                                    <th>Actual Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {technologies.map((tech, index) => (
                                    <tr key={index}>
                                        <td className="sno-cell">{index + 1}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={tech.activityName}
                                                onChange={(e) => handleTechnologyChange(index, 'activityName', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={tech.plannedActivities}
                                                onChange={(e) => handleTechnologyChange(index, 'plannedActivities', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={tech.actualProgress}
                                                onChange={(e) => handleTechnologyChange(index, 'actualProgress', e.target.value)}
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
                                    onChange={handleChange}
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
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="declaration"
                                    checked={formData.declaration}
                                    onChange={handleChange}    // ← use the same handler as other inputs
                                    className="form-checkbox"
                                />

                                I declare that the information submitted is true and complete.
                            </label>
                            <div className="notes">
                                <p>Notes/ Definition:</p>
                                <ol type="a">
                                    <li> INR / USD as on 31.03.2025 (85.424)</li>
                                    <li> 1 Tonne of oil equivalent to 7.5 bbl of oil</li>
                                    <li> MTOE: Million Tonne of Oil Equivalent. For this calculation 1 BCM of natural gas is equivalent to 1 MMT of Oil</li>
                                    <li> Finding cost (INR/MTOE): Cost of finding oil and gas reserves added via exploration drilling activities, exclusive of land acquisition cost: (total cost incurred (INR)/ reserves added (oil + oil eq. gas reserves) (MTOE)</li>
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
                <h1>Registration Form: {awardTitle}</h1>
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
                < form onSubmit={handleSubmit}>
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
        </div >
    );
};

export default RegistrationGNZ;