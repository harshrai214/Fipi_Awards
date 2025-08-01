import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationSP = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Service Provider of the Year',
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
        // Quantitative fields from Part 1
        projectsAwarded2024: '',
        projectsAwarded2023: '',
        projectsValue2024: '',
        projectsValue2023: '',
        projectsInProgress: '',
        projectsInProgressRemarks: '',
        projectsInProgressValue: '',
        projectsCompleted: '',
        projectsNoTimeOverrun: '',
        projectsNoCostOverrun: '',
        technologiesIntroduced: '',
        technologiesValue: '',
        fatalities: '',
        lostTimeInjuries: '',
        oshaIncidents: '',
        manHoursOwn: '',
        manHoursContract: '',
        // Quantitative fields from Part 2 (Ongoing Projects)
        ongoingProject1Name: '',
        ongoingProject1Client: '',
        ongoingProject1Start: '',
        ongoingProject1End: '',
        ongoingProject1AwardValue: '',
        ongoingProject1ActualCost: '',
        ongoingProject2Name: '',
        ongoingProject2Client: '',
        ongoingProject2Start: '',
        ongoingProject2End: '',
        ongoingProject2AwardValue: '',
        ongoingProject2ActualCost: '',
        ongoingProject3Name: '',
        ongoingProject3Client: '',
        ongoingProject3Start: '',
        ongoingProject3End: '',
        ongoingProject3AwardValue: '',
        ongoingProject3ActualCost: '',
        ongoingProject4Name: '',
        ongoingProject4Client: '',
        ongoingProject4Start: '',
        ongoingProject4End: '',
        ongoingProject4AwardValue: '',
        ongoingProject4ActualCost: '',
        ongoingProject5Name: '',
        ongoingProject5Client: '',
        ongoingProject5Start: '',
        ongoingProject5End: '',
        ongoingProject5AwardValue: '',
        ongoingProject5ActualCost: '',
        // Quantitative fields from Part 2 (New Technologies)
        technology1Tech: '',
        technology1Project: '',
        technology1Client: '',
        technology1Cost: '',
        technology1Value: '',
        technology2Tech: '',
        technology2Project: '',
        technology2Client: '',
        technology2Cost: '',
        technology2Value: '',
        technology3Tech: '',
        technology3Project: '',
        technology3Client: '',
        technology3Cost: '',
        technology3Value: '',
        technology4Tech: '',
        technology4Project: '',
        technology4Client: '',
        technology4Cost: '',
        technology4Value: '',
        technology5Tech: '',
        technology5Project: '',
        technology5Client: '',
        technology5Cost: '',
        technology5Value: '',
        // Attachments
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
    const awardTitle = location.state?.awardTitle || 'Service Provider of the Year';

    const handleChange = (name, rawValue) => {
  let value = rawValue;

  // ───────────────────────────────────────────────
  // 1) Letters‐only for certain name fields
  if (["Organisationname","authorityName","contactName"].includes(name)) {
    if (!/^[A-Za-z\s]*$/.test(value)) {
      // reject any non‑letters/spaces
      return;
    }
  }

  // ───────────────────────────────────────────────
  // 2) Phone fields: digits only, max length 10
  if (name === "authorityPhone" || name === "contactPhone") {
    // strip non‑digits, cap at 10
    value = value.replace(/\D/g, "").slice(0, 10);
  }

  // ───────────────────────────────────────────────
  // 3) Numeric‐only fields for your tables:
  //    awardValue, actualCost, Cost, Value, etc.
  if (/AwardValue$/.test(name) || /ActualCost$/.test(name) ||
      /^technology\d+Cost$/.test(name) || /^technology\d+Value$/.test(name)) {
    // allow digits and at most one decimal point
    // you can further parseFloat on submit if you like
    value = value.replace(/[^0-9.]/g, "");
  }

  // ───────────────────────────────────────────────
  // 4) Dates (ongoingProjectXStart/End): let browser handle validity
  //    no extra sanitization

  // ───────────────────────────────────────────────
  // 5) Everything else: take as‐is (text, textarea, etc.)

  // Now commit to state
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  // ───────────────────────────────────────────────
  // Inline validation examples:
  // Re‑check required fields in their steps
  if (name === "Organisationname" && currentStep === 1 && !value) {
    setError("Organisation name is required.");
  } else if (name === "mailingAddress" && currentStep === 1 && !value.trim()) {
    setError("Mailing address is required.");
  } else if (name === "authorityName" && currentStep === 2 && !value) {
    setError("Authority name is required.");
  } else if (name === "authorityPhone" && value.length !== 10) {
    setError("Authority phone must be 10 digits.");
  } else {
    setError("");
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
                [field]: value,
            },
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
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
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
            setFormData((prev) => ({ ...prev, approvingAuthoritySignature: file }));
        }
    };

const handleSubmit = async e => {
  e.preventDefault();

  // 1) Must check declaration
  if (!formData.declaration) {
    return alert("Please accept the declaration.");
  }

  // 2) Build FormData
  const fd = new FormData();

  // — flat text fields —
  const flatMap = {
    organisation_name:        formData.Organisationname,
    category:                 formData.category,
    company_name:             formData.companyName,
    mailing_address:          formData.mailingAddress,

    authority_name:           formData.authorityName,
    authority_title:          formData.authorityTitle,
    authority_phone:          formData.authorityPhone,
    authority_email:          formData.authorityEmail,

    contact_name:             formData.contactName,
    contact_phone:            formData.contactPhone,
    contact_email:            formData.contactEmail,

    company_profile:          formData.companyProfile,
    award_justification:      formData.awardJustification || "",
    comment:                  formData.comment,
    declaration:              String(formData.declaration)
  };

  // — quantitative Part 1 —
  [
    'projectsAwarded2024','projectsAwarded2023',
    'projectsValue2024','projectsValue2023',
    'projectsInProgress','projectsInProgressRemarks','projectsInProgressValue',
    'projectsCompleted','projectsNoTimeOverrun','projectsNoCostOverrun',
    'technologiesIntroduced','technologiesValue',
    'fatalities','lostTimeInjuries','oshaIncidents','manHoursOwn','manHoursContract'
  ].forEach(key => {
    // map JS camel → Django snake
    const apiKey = key
      .replace(/([A-Z])/g, "_$1").toLowerCase()
      .replace(/^_/, "");
    flatMap[apiKey] = formData[key] ?? "";
  });

  // — “Ongoing Projects” 1–5 flat columns —
  for (let i = 1; i <= 5; i++) {
    ['Name','Client','Start','End','AwardValue','ActualCost'].forEach(field => {
      const jsKey  = `ongoingProject${i}${field}`;
      const snake  = `ongoing_project_${i}_${field
                        .replace(/^([A-Z])/, m=>m.toLowerCase())
                        .replace(/([A-Z])/g,m=>'_'+m.toLowerCase())}`;
      flatMap[snake] = formData[jsKey] ?? "";
    });
  }

  // — “New Technologies” 1–5 flat columns —
  for (let i = 1; i <= 5; i++) {
    ['Tech','Project','Client','Cost','Value'].forEach(field => {
      const jsKey = `technology${i}${field}`;
      // cost & value → decimals, the rest → text
      let snake = `technology_${i}_${field.toLowerCase()}`;
      if (field === 'Value')       snake = `technology_${i}_value_contributed`;
      flatMap[snake] = formData[jsKey] ?? "";
    });
  }

  // — attachments —
  if (formData.approvingAuthoritySignature) {
    fd.append('approving_authority_file', formData.approvingAuthoritySignature);
  }
  [1,2,3,4].forEach(n => {
    const att = formData[`attachments${n}`];
    if (att && att.file) {
      fd.append(`attachments${n}`, att.file);
      fd.append(`attachments${n}_desc`, att.description || "");
    }
  });

  // finally append every flat key/value:
  Object.entries(flatMap).forEach(([k,v]) => {
    fd.append(k, v);
  });

  // 3) POST
  try {
      const url = `${ACTIVE_API_BASE_URL}/service-provider/`;
      const res = await fetch(url, {
      method: "POST",
      body: fd
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", text);
      return alert("Submit failed—see console");
    }
    const data = await res.json();
    console.log("Saved:", data);
    alert("Submitted!");
    setIsSubmitted(true);
  } catch(err) {
    console.error("Network:", err);
    alert("Network error—see console");
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
        <h2>Quantitative Information - Part 1: Project Metrics & Safety</h2>
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
            ${[
                ['1', 'No. of Projects awarded', formData.projectsAwarded2024, formData.projectsAwarded2023],
                ['2', 'Value of Projects awarded (INR Crores)', formData.projectsValue2024, formData.projectsValue2023],
                ['3', 'No. of Projects in Progress', formData.projectsInProgress, '-'],
                ['4', 'Total Value of Projects in Progress (INR Crore)', formData.projectsInProgressValue, '-'],
                ['5', 'No. of Projects completed', formData.projectsCompleted, '-'],
                ['6', 'No. of Projects Completed without time overrun', formData.projectsNoTimeOverrun, '-'],
                ['7', 'No. of Projects Completed without cost overrun', formData.projectsNoCostOverrun, '-'],
                ['8', 'Number of new technologies introduced', formData.technologiesIntroduced, '-'],
                ['9', 'Value of the new technologies introduced (INR Crore)', formData.technologiesValue, '-'],
                ['10', 'No. of Fatalities', formData.fatalities, '-'],
                ['11', 'Number of lost time injuries', formData.lostTimeInjuries, '-'],
                ['12', 'Number of OSHA recordable incidents', formData.oshaIncidents, '-'],
                ['13', 'Total Man Hours Worked (Own Employees)', formData.manHoursOwn, '-'],
                ['14', 'Total Man Hours Worked (Contractual Employees)', formData.manHoursContract, '-'],
            ]
                .map(([num, title, value2024, value2023]) => `
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${title}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${value2024 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${value2023 || ''}</td>
                  </tr>
                `)
                .join('')}
          </tbody>
        </table>
        <h2>Quantitative Information - Part 2: Ongoing Projects Information</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S.No</th>
              <th style="border: 1px solid #000; padding: 8px;">Project Name</th>
              <th style="border: 1px solid #000; padding: 8px;">Client Name</th>
              <th style="border: 1px solid #000; padding: 8px;">Start Date</th>
              <th style="border: 1px solid #000; padding: 8px;">Scheduled Completion Date</th>
              <th style="border: 1px solid #000; padding: 8px;">Awarded Value (INR Crores)</th>
              <th style="border: 1px solid #000; padding: 8px;">Actual Cost (INR Crores)</th>
            </tr>
          </thead>
          <tbody>
            ${[
                [1, formData.ongoingProject1Name, formData.ongoingProject1Client, formData.ongoingProject1Start, formData.ongoingProject1End, formData.ongoingProject1AwardValue, formData.ongoingProject1ActualCost],
                [2, formData.ongoingProject2Name, formData.ongoingProject2Client, formData.ongoingProject2Start, formData.ongoingProject2End, formData.ongoingProject2AwardValue, formData.ongoingProject2ActualCost],
                [3, formData.ongoingProject3Name, formData.ongoingProject3Client, formData.ongoingProject3Start, formData.ongoingProject3End, formData.ongoingProject3AwardValue, formData.ongoingProject3ActualCost],
                [4, formData.ongoingProject4Name, formData.ongoingProject4Client, formData.ongoingProject4Start, formData.ongoingProject4End, formData.ongoingProject4AwardValue, formData.ongoingProject4ActualCost],
                [5, formData.ongoingProject5Name, formData.ongoingProject5Client, formData.ongoingProject5Start, formData.ongoingProject5End, formData.ongoingProject5AwardValue, formData.ongoingProject5ActualCost],
            ]
                .map(([num, name, client, start, end, awardValue, actualCost]) => `
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${name || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${client || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${start || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${end || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${awardValue || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${actualCost || ''}</td>
                  </tr>
                `)
                .join('')}
          </tbody>
        </table>
        <h2>Quantitative Information - Part 2: List of New Technologies</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S.No</th>
              <th style="border: 1px solid #000; padding: 8px;">Name of the Technology</th>
              <th style="border: 1px solid #000; padding: 8px;">Project Name</th>
              <th style="border: 1px solid #000; padding: 8px;">Client Name</th>
              <th style="border: 1px solid #000; padding: 8px;">Cost (INR Crores)</th>
              <th style="border: 1px solid #000; padding: 8px;">Value Contributed (100 words)</th>
            </tr>
          </thead>
          <tbody>
            ${[
                [1, formData.technology1Tech, formData.technology1Project, formData.technology1Client, formData.technology1Cost, formData.technology1Value],
                [2, formData.technology2Tech, formData.technology2Project, formData.technology2Client, formData.technology2Cost, formData.technology2Value],
                [3, formData.technology3Tech, formData.technology3Project, formData.technology3Client, formData.technology3Cost, formData.technology3Value],
                [4, formData.technology4Tech, formData.technology4Project, formData.technology4Client, formData.technology4Cost, formData.technology4Value],
                [5, formData.technology5Tech, formData.technology5Project, formData.technology5Client, formData.technology5Cost, formData.technology5Value],
            ]
                .map(([num, tech, project, client, cost, value]) => `
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${tech || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${project || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${client || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${cost || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${value || ''}</td>
                  </tr>
                `)
                .join('')}
          </tbody>
        </table>
        <h2>Comments</h2>
        <p>${formData.comment || ''}</p>
        <h2>Declaration</h2>
        <p>I declare that the information submitted is true and complete.</p>
      </div>
    `;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
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
                                value={formData.Organisationname || ''}
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
                                value={formData.category || ''}
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
                                value={formData.mailingAddress || ''}
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
                                        value={formData.authorityName || ''}
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
                                        value={formData.authorityTitle || ''}
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
                                        value={formData.authorityPhone || ''}
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
                                        value={formData.authorityEmail || ''}
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
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        contactEmail: prev.authorityEmail || '',
                                                        contactPhone: prev.authorityPhone || '',
                                                    }));
                                                } else {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        contactEmail: '',
                                                        contactPhone: '',
                                                    }));
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
                                        value={formData.contactName || ''}
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
                                        value={formData.contactPhone || ''}
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
                                        value={formData.contactEmail || ''}
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
                                value={formData.companyProfile || ''}
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

                                {[
                                    { num: 1, title: 'No. of Projects awarded', key2024: 'projectsAwarded2024', key2023: 'projectsAwarded2023' },
                                    { num: 2, title: 'Value of Projects awarded (INR Crores)', key2024: 'projectsValue2024', key2023: 'projectsValue2023' },
                                ].map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.num}</td>
                                        <td>{item.title}</td>
                                        <td>
                                            <input
                                                type="number"
                                                name={item.key2024}
                                                value={formData[item.key2024] || ''}
                                                onChange={(e) => handleChange(item.key2024, e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            {item.key2023 ? (
                                                <input
                                                    type="number"
                                                    name={item.key2023}
                                                    value={formData[item.key2023] || ''}
                                                    onChange={(e) => handleChange(item.key2023, e.target.value)}
                                                />
                                            ) : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Particulars</th>
                                    <th>2024-25</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { num: 3, title: 'No. of Projects in Progress', key2024: 'projectsInProgress' },
                                    { num: 4, title: 'Total Value of Projects in Progress (INR Crore)', key2024: 'projectsInProgressValue' },
                                    { num: 5, title: 'No. of Projects completed', key2024: 'projectsCompleted' },
                                    { num: 6, title: 'No. of Projects Completed without time overrun', key2024: 'projectsNoTimeOverrun' },
                                    { num: 7, title: 'No. of Projects Completed without cost overrun', key2024: 'projectsNoCostOverrun' },
                                    { num: 8, title: 'Number of new technologies introduced', key2024: 'technologiesIntroduced' },
                                    { num: 9, title: 'Value of the new technologies introduced (INR Crore)', key2024: 'technologiesValue' },
                                    { num: 10, title: 'No. of Fatalities', key2024: 'fatalities' },
                                    { num: 11, title: 'Number of lost time injuries', key2024: 'lostTimeInjuries' },
                                    { num: 12, title: 'Number of OSHA recordable incidents', key2024: 'oshaIncidents' },
                                    { num: 13, title: 'Total Man Hours Worked (Own Employees)', key2024: 'manHoursOwn' },
                                    { num: 14, title: 'Total Man Hours Worked (Contractual Employees)', key2024: 'manHoursContract' },
                                ].map((item, index) => (
                                    <tr key={index + 2}>
                                        <td>{item.num}</td>
                                        <td>{item.title}</td>
                                        <td>
                                            <input
                                                type="number"
                                                name={item.key2024}
                                                value={formData[item.key2024] || ''}
                                                onChange={(e) => handleChange(item.key2024, e.target.value)}
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
        <h3>Table 1: Ongoing Projects Information</h3>
        <table className="quant-table">
          <thead>
            <tr>
              <th>S.No</th><th>Project Name</th><th>Client Name</th>
              <th>Start Date</th><th>Scheduled Completion Date</th>
              <th>Awarded Value (INR Crores)</th><th>Actual Cost (INR Crores)</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
  <tr key={i}>
    <td>{i+1}</td>
    {["Name","Client","Start","End","AwardValue","ActualCost"].map(field => {
      const key = `ongoingProject${i+1}${field}`;
      const type = (field==="Start"||field==="End") ? "date"
                  : (field.includes("Value")||field.includes("Cost")) ? "number"
                  : "text";
      return (
        <td key={field}>
          <input
            type={type}
            name={key}
            value={formData[key]}
            onChange={e => handleChange(key, e.target.value)}
            className="form-input"
          />
        </td>
      );
    })}
  </tr>
))}
          </tbody>
        </table>

        <h3>Table 2: List of New Technologies</h3>
        <table className="quant-table">
          <thead>
            <tr>
              <th>S.No</th><th>Name of the Technology</th><th>Project Name</th>
              <th>Client Name</th><th>Cost (INR Crores)</th>
              <th>Value Contributed (100 words)</th>
            </tr>
          </thead>
          <tbody>
           {[...Array(5)].map((_, i) => (
  <tr key={i}>
    <td>{i+1}</td>
    {["Tech","Project","Client","Cost","Value"].map(field => {
      const key = `technology${i+1}${field}`;
      return (
        <td key={field}>
          <input
            type={field==="Cost" ? "number" : "text"}
            name={key}
            value={formData[key]}
            onChange={e => handleChange(key, e.target.value)}
            className="form-input"
          />
        </td>
      );
    })}
  </tr>
))}
          </tbody>
        </table>
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
                                                        value={attachment.description || ''}
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
                            <label>
                                Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span>
                            </label>
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
                                    checked={formData.declaration || false}
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

export default RegistrationSP;

