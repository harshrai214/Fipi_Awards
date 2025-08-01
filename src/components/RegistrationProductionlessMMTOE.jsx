import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const initialProject = {
  name: '',
  boardApprovalDate: '',
  startDate: '',
  completionDate: '',
  capex: '',
  remarks: ''
};

const RegistrationProductionlessMMTOE = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    Organisationname: '',
    category: 'Oil & Gas Production Company of the Year (< 1 MMTOE)',
    Firstname: '',
    Lastname: '',
    userid: '',
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

  const [projects, setProjects] = useState(() => Array(5).fill().map(() => ({ ...initialProject })));
  const [error, setError] = useState('');
  const [copyApplicantData, setCopyApplicantData] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location.state:', location.state);
  const awardTitle = location.state?.awardTitle || "Oil & Gas Production Company of the Year";

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
  //   const errors = {};

  //   if (!formData.Organisationname?.trim()) {
  //     errors.Organisationname = 'Organisation name is required';
  //   }
  //   if (!formData.authorityName?.trim()) {
  //     errors.authorityName = 'Authority name is required';
  //   }
  //   if (!formData.authorityTitle?.trim()) {
  //     errors.authorityTitle = 'Authority Designation is required';
  //   }


  //   if (!formData.contactEmail?.trim()) {
  //     errors.contactEmail = 'Email is required';
  //   } else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
  //     errors.contactEmail = 'Invalid email format';
  //   }

  //   return errors;
  // };

  const handleAttachmentChange = (key, field, value) => {
    if (field === 'file' && value) {
      const file = value;
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        setError('Only JPG, PNG, and PDF files are allowed for attachments.');
        return;
      }
      if (file.size > maxSizeInBytes) {
        setError('File size must not exceed 5 MB for attachments.');
        return;
      }
      setError('');
    }

    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: field === 'file' ? value : value
      }
    }));
  };



  // const handleProjectChange = (index, field, value) => {
  //   const updatedProjects = [...projects];
  //   updatedProjects[index] = { ...updatedProjects[index], [field]: value };
  //   setProjects(updatedProjects);
  // };

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
    localStorage.setItem('registrationProductionDraft', JSON.stringify({ formData, projects }));
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

async function handleSubmit(e) {
  e.preventDefault();

  // 1) Must accept the declaration
  if (!formData.declaration) {
    return alert("Please accept the declaration.");
  }

  const fd = new FormData();

  // 2) Always include these required four fields
  fd.append("organisation_name", formData.Organisationname || "");
  fd.append("category",           formData.category         || "");
  fd.append("mailing_address",    formData.mailingAddress   || "");
  fd.append("authority_name",     formData.authorityName    || "");

  // 3) Signature file is required
  if (formData.approvingAuthoritySignature instanceof File) {
    fd.append("approving_authority_file", formData.approvingAuthoritySignature);
  } else {
    // still append empty so DRF sees the key
    fd.append("approving_authority_file", "");
  }

  // 4) Flat one‑to‑one field mappings (React key → API key)
  const flatFields = {
    Firstname:        "firstname",
    Lastname:         "lastname",
    userid:           "userid",
    companyName:      "company_name",
    contactName:      "contact_name",
    contactPhone:     "contact_phone",
    contactEmail:     "contact_email",
    companyProfile:   "company_profile",
    awardJustification:"award_justification",
    comment:          "comment",
    declaration:      "declaration"
  };
  Object.entries(flatFields).forEach(([jsKey, apiKey]) => {
    let val = formData[jsKey];
    if (jsKey === "declaration") {
      val = formData.declaration ? "true" : "false";
    }
    if (val != null) {
      fd.append(apiKey, val);
    }
  });

  // 5) Year‐pair quantitative arrays → two separate fields each
  const quantMap = [
    ["1_totalOil",          "total_oil"],
    ["2_totalGas",          "total_gas"],
    ["3_costPerBOE",        "cost_per_boe"],
    ["4_iorEorCapex",       "ior_eor_capex"],
    ["5_totalEnergy",       "total_energy"],
    ["5.1_companyEnergy",   "company_energy"],
    ["5.2_totalCapex",      "total_capex"],
    ["5.3_totalOpex",       "total_opex"],
    ["5.4_productionCapex", "production_capex"],
    ["5.5_productionOpex",  "production_opex"],
    ["6_co2Emission",       "co2_emission"],
    ["8_fatalities",        "fatalities"],
    ["9_lostTimeInjuries",  "lost_time_injuries"],
    ["10_oshaIncidents",    "osha_incidents"],
    ["11_ownManHours",      "own_man_hours"],
    ["12_contractManHours", "contract_man_hours"],
  ];
  quantMap.forEach(([jsKey, apiBase]) => {
    const [y24 = "", y23 = ""] = formData[jsKey] || [];
    fd.append(`${apiBase}_2024`, y24);
    fd.append(`${apiBase}_2023`, y23);
  });

  // 6) Five discrete project blocks
  for (let i = 1; i <= 5; i++) {
    const prefix = `project${i}_`;
    // matches your model fields
    const mapping = {
      name:            "project" + i + "_name",
      boardApprovalDate:"project" + i + "_board_approval",
      startDate:        "project" + i + "_start_date",
      completionDate:   "project" + i + "_completion_date",
      capex:            "project" + i + "_capex",
      remarks:          "project" + i + "_remarks",
    };
    Object.entries(mapping).forEach(([jsField, apiKey]) => {
      const val = formData[prefix + jsField];
      if (val) {
        fd.append(apiKey, val);
      }
    });
  }

  // 7) Four flat attachments (desc + file)
  [1,2,3,4].forEach(n => {
    const slot = formData[`attachments${n}`] || {};
    fd.append(`attachments${n}_desc`, slot.description || "");
    if (slot.file instanceof File) {
      fd.append(`attachments${n}`, slot.file);
    }
  });

  // 8) Final POST
  try {
      const url = `${ACTIVE_API_BASE_URL}/production/`;
      const res = await fetch(url, {
      method: "POST",
      body: fd
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("API error:", text);
      return alert("Submission failed; see console for details.");
    }
    alert("Submitted successfully!");
    // reset or redirect as desired
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error; please retry.");
  }
}




  const handlePrint = () => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">Registration Form: Oil & Gas Production</h1>
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
        <h2>Quantitative Information - Part 1</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Total oil production (MMT)</td><td>${formData['1_totalOil'][0]}</td><td>${formData['1_totalOil'][1]}</td></tr>
            <tr><td>2</td><td>Total gas production (BCM)</td><td>${formData['2_totalGas'][0]}</td><td>${formData['2_totalGas'][1]}</td></tr>
            <tr><td>3</td><td>Cost of production ($/boe)</td><td>${formData['3_costPerBOE'][0]}</td><td>${formData['3_costPerBOE'][1]}</td></tr>
            <tr><td>4</td><td>Capex in IOR/EOR projects (Crores)</td><td>${formData['4_iorEorCapex'][0]}</td><td>${formData['4_iorEorCapex'][1]}</td></tr>
            <tr><td>5</td><td>Total Energy Consumed in Production (GJ)</td><td>${formData['5_totalEnergy'][0]}</td><td>${formData['5_totalEnergy'][1]}</td></tr>
            <tr><td>5.1</td><td>Total Energy Consumed by Company (GJ)</td><td>${formData['5.1_companyEnergy'][0]}</td><td>${formData['5.1_companyEnergy'][1]}</td></tr>
            <tr><td>5.2</td><td>Total Capex (INR Crores)</td><td>${formData['5.2_totalCapex'][0]}</td><td>${formData['5.2_totalCapex'][1]}</td></tr>
            <tr><td>5.3</td><td>Total Opex (INR Crores)</td><td>${formData['5.3_totalOpex'][0]}</td><td>${formData['5.3_totalOpex'][1]}</td></tr>
            <tr><td>5.4</td><td>Capex for Production (INR Crores)</td><td>${formData['5.4_productionCapex'][0]}</td><td>${formData['5.4_productionCapex'][1]}</td></tr>
            <tr><td>5.5</td><td>Opex for Production (INR Crores)</td><td>${formData['5.5_productionOpex'][0]}</td><td>${formData['5.5_productionOpex'][1]}</td></tr>
            <tr><td>6</td><td>Total CO2 Emitted (Tonne)</td><td>${formData['6_co2Emission'][0]}</td><td>${formData['6_co2Emission'][1]}</td></tr>
          </tbody>
        </table>
        <h2>Quantitative Information - Part 2</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th></tr></thead>
          <tbody>
            <tr><td>8</td><td>No. of Fatalities</td><td>${formData['8_fatalities'][0]}</td><td>${formData['8_fatalities'][1]}</td></tr>
            <tr><td>9</td><td>Number of lost time injuries</td><td>${formData['9_lostTimeInjuries'][0]}</td><td>${formData['9_lostTimeInjuries'][1]}</td></tr>
            <tr><td>10</td><td>Number of OSHA recordable incidents</td><td>${formData['10_oshaIncidents'][0]}</td><td>${formData['10_oshaIncidents'][1]}</td></tr>
            <tr><td>11</td><td>Total Man Hours Worked (Own Employees)</td><td>${formData['11_ownManHours'][0]}</td><td>${formData['11_ownManHours'][1]}</td></tr>
            <tr><td>12</td><td>Total Man Hours Worked (Contractual Employees)</td><td>${formData['12_contractManHours'][0]}</td><td>${formData['12_contractManHours'][1]}</td></tr>
          </tbody>
        </table>
        <h2>New Projects</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead><tr><th>S. No.</th><th>Project Name</th><th>Board Approval Date</th><th>Start Date</th><th>Completion Date</th><th>Capex (INR Crores)</th><th>Remarks</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>${formData.project1_name}</td><td>${formData.project1_boardApprovalDate}</td><td>${formData.project1_startDate}</td><td>${formData.project1_completionDate}</td><td>${formData.project1_capex}</td><td>${formData.project1_remarks}</td></tr>
            <tr><td>2</td><td>${formData.project2_name}</td><td>${formData.project2_boardApprovalDate}</td><td>${formData.project2_startDate}</td><td>${formData.project2_completionDate}</td><td>${formData.project2_capex}</td><td>${formData.project2_remarks}</td></tr>
            <tr><td>3</td><td>${formData.project3_name}</td><td>${formData.project3_boardApprovalDate}</td><td>${formData.project3_startDate}</td><td>${formData.project3_completionDate}</td><td>${formData.project3_capex}</td><td>${formData.project3_remarks}</td></tr>
            <tr><td>4</td><td>${formData.project4_name}</td><td>${formData.project4_boardApprovalDate}</td><td>${formData.project4_startDate}</td><td>${formData.project4_completionDate}</td><td>${formData.project4_capex}</td><td>${formData.project4_remarks}</td></tr>
            <tr><td>5</td><td>${formData.project5_name}</td><td>${formData.project5_boardApprovalDate}</td><td>${formData.project5_startDate}</td><td>${formData.project5_completionDate}</td><td>${formData.project5_capex}</td><td>${formData.project5_remarks}</td></tr>
          </tbody>
        </table>
        <h2>Step 5: Declaration</h2>
        <p>I declare that the information submitted is true and complete.</p>
      </div>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

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
    ['8', 'No. of Fatalities', '8_fatalities'],
    ['9', 'Number of lost time injuries', '9_lostTimeInjuries'],
    ['10', 'Number of OSHA recordable incidents', '10_oshaIncidents'],
    ['11', 'Total Man Hours Worked (Own Employees)', '11_ownManHours'],
    ['12', 'Total Man Hours Worked (Contractual Employees)', '12_contractManHours'],
  ];

  const part1 = fullData.filter(([num]) => parseFloat(num) <= 8);
  const part2 = fullData.filter(([num]) => parseFloat(num) > 8);

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
                <option value="Oil & Gas Production Company of the Year (< 1 MMTOE)">Oil & gas Production Company of the year Less than 1 MTOE</option>
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
                  <th>2024–25</th>
                  <th>2023–24</th>
                </tr>
              </thead>
              <tbody>
                {part1.map(([num, label, key]) => (
                  <tr key={key}>
                    <td>{num}</td>
                    <td>{label}</td>
                    <td>
                      <input
                        type="number"
                        value={formData[key][0] || ''}
                        onChange={(e) => handleChange(key, e.target.value, 0)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={formData[key][1] || ''}
                        onChange={(e) => handleChange(key, e.target.value, 1)}
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
            <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Particulars</th>
                  <th>2024–25</th>
                  <th>2023–24</th>
                </tr>
              </thead>
              <tbody>
                {part2.map(([num, label, key]) => (
                  <tr key={key}>
                    <td>{num}</td>
                    <td>{label}</td>
                    <td>
                      <input
                        type="number"
                        value={formData[key][0] || ''}
                        onChange={(e) => handleChange(key, e.target.value, 0)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={formData[key][1] || ''}
                        onChange={(e) => handleChange(key, e.target.value, 1)}
                        className="form-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 style={{ marginTop: '40px' }}>New Projects Initiated to Augment Production (Board Approved)</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Project Name</th>
                  <th>Board Approval Date</th>
                  <th>Start Date</th>
                  <th>Schedule Completion Date</th>
                  <th>Total Envisaged Capex (INR Crores)</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <input
                      type="text"
                      value={formData.project1_name}
                      onChange={(e) => handleChange('project1_name', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project1_boardApprovalDate}
                      onChange={(e) => handleChange('project1_boardApprovalDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project1_startDate}
                      onChange={(e) => handleChange('project1_startDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project1_completionDate}
                      onChange={(e) => handleChange('project1_completionDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={formData.project1_capex}
                      onChange={(e) => handleChange('project1_capex', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.project1_remarks}
                      onChange={(e) => handleChange('project1_remarks', e.target.value)}
                      className="form-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <input
                      type="text"
                      value={formData.project2_name}
                      onChange={(e) => handleChange('project2_name', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project2_boardApprovalDate}
                      onChange={(e) => handleChange('project2_boardApprovalDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project2_startDate}
                      onChange={(e) => handleChange('project2_startDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project2_completionDate}
                      onChange={(e) => handleChange('project2_completionDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={formData.project2_capex}
                      onChange={(e) => handleChange('project2_capex', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.project2_remarks}
                      onChange={(e) => handleChange('project2_remarks', e.target.value)}
                      className="form-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <input
                      type="text"
                      value={formData.project3_name}
                      onChange={(e) => handleChange('project3_name', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project3_boardApprovalDate}
                      onChange={(e) => handleChange('project3_boardApprovalDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project3_startDate}
                      onChange={(e) => handleChange('project3_startDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project3_completionDate}
                      onChange={(e) => handleChange('project3_completionDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={formData.project3_capex}
                      onChange={(e) => handleChange('project3_capex', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.project3_remarks}
                      onChange={(e) => handleChange('project3_remarks', e.target.value)}
                      className="form-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <input
                      type="text"
                      value={formData.project4_name}
                      onChange={(e) => handleChange('project4_name', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project4_boardApprovalDate}
                      onChange={(e) => handleChange('project4_boardApprovalDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project4_startDate}
                      onChange={(e) => handleChange('project4_startDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project4_completionDate}
                      onChange={(e) => handleChange('project4_completionDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={formData.project4_capex}
                      onChange={(e) => handleChange('project4_capex', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.project4_remarks}
                      onChange={(e) => handleChange('project4_remarks', e.target.value)}
                      className="form-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <input
                      type="text"
                      value={formData.project5_name}
                      onChange={(e) => handleChange('project5_name', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project5_boardApprovalDate}
                      onChange={(e) => handleChange('project5_boardApprovalDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project5_startDate}
                      onChange={(e) => handleChange('project5_startDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formData.project5_completionDate}
                      onChange={(e) => handleChange('project5_completionDate', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={formData.project5_capex}
                      onChange={(e) => handleChange('project5_capex', e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.project5_remarks}
                      onChange={(e) => handleChange('project5_remarks', e.target.value)}
                      className="form-input"
                    />
                  </td>
                </tr>
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
                              handleAttachmentChange(key, 'file', e.target.files[0])
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
        <h1>
          Registration Form: {
            'Oil & Gas Production Company of the Year (< 1 MMTOE)'
          }
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

export default RegistrationProductionlessMMTOE;