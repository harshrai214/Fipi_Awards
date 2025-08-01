import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/Form.css';

const initialTechnology = {
    projectName: '',
    location: '',
    capacity: '',
    projectCompletionYear: '',
    projectCurrentStatus: '',
};

const RegistrationGH = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Green Hydrogen Company of the Year',
        companyName: '',
        mailingAddress: '',
        authorityName: '',
        authorityTitle: '',
        authorityPhone: '',
        authorityEmail: '',
        contactName: '', // Added
        contactPhone: '',
        contactEmail: '',
        companyProfile: '',
        approvingAuthoritySignature: '',
        declaration: false,
        comment: '',
        installedCapacity2024: '',
        production2024: '',
        carbonEmission2024: '',
        purity2024: '',
        costOfProduction2024: '',
        patentsFiled2024: '',
        patentsGrantedNational2024: '',
        patentsCommercialized2024: '',
        investmentActivities2024: '',
        investmentActivities2023: '',
        investmentElectrolyser2024: '',
        investmentElectrolyser2023: '',
        patentsGrantedInternational2024: '',
        upcomingProjects2024: '',
        upcomingProjects2023: '',
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
    });

    const [technologies, setTechnologies] = useState(Array(5).fill(null).map(() => ({ ...initialTechnology })));
    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    const location = useLocation();
    const awardTitle = location.state?.awardTitle || 'Green Hydrogen Company of the Year';

    const handleChange = (e, index = null) => {
        const { name, value, type, checked } = e.target;
        if (index !== null) {
            setFormData((prev) => ({
                ...prev,
                [name]: prev[name].map((val, i) => (i === index ? value : val)),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value || '', // Default to empty string
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

    const handleTechnologyChange = (index, field, value) => {
        const updatedTechnologies = [...technologies];
        updatedTechnologies[index] = {
            ...updatedTechnologies[index],
            [field]: value || '', // Default to empty string
        };
        setTechnologies(updatedTechnologies);
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
                [field]: value,
            },
        }));
    };

    const handleApprovingAuthorityChange = (files) => {
        setFormData((prev) => ({
            ...prev,
            approvingAuthoritySignature: files[0],
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
        if (currentStep === 2 && !formData.authorityEmail) {
            setError('Authority email is required.');
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
        localStorage.setItem('registrationExplorationDraft', JSON.stringify({ formData, technologies }));
        alert('Draft Saved!');
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.declaration) {
    alert("Please accept the declaration before submitting.");
    return;
  }

  // Build a multipart/form-data payload
  const fd = new FormData();

  // 1) Flat text & numeric fields (use snake_case keys to match your Django model)
  fd.append("organisation_name",       formData.Organisationname);
  fd.append("category",                formData.category);
  fd.append("company_name",            formData.companyName);
  fd.append("mailing_address",         formData.mailingAddress);

  fd.append("authority_name",          formData.authorityName);
  fd.append("authority_title",         formData.authorityTitle);
  fd.append("authority_phone",         formData.authorityPhone);
  fd.append("authority_email",         formData.authorityEmail);

  fd.append("contact_name",            formData.contactName);
  fd.append("contact_phone",           formData.contactPhone);
  fd.append("contact_email",           formData.contactEmail);

  fd.append("company_profile",         formData.companyProfile);
  fd.append("comment",                 formData.comment);
  fd.append("declaration",             formData.declaration ? "true" : "false");

  // 2) Quantitative Part 1 (2024 only)
  fd.append("installed_capacity_2024",    formData.installedCapacity2024);
  fd.append("production_2024",            formData.production2024);
  fd.append("carbon_emission_2024",       formData.carbonEmission2024);
  fd.append("purity_2024",                formData.purity2024);
  fd.append("cost_of_production_2024",    formData.costOfProduction2024);
  fd.append("patents_filed_2024",         formData.patentsFiled2024);
  fd.append("patents_granted_national_2024",    formData.patentsGrantedNational2024);
  fd.append("patents_granted_international_2024", formData.patentsGrantedInternational2024);
  fd.append("patents_commercialized_2024",       formData.patentsCommercialized2024);

  // 3) Quantitative Part 2 (both years)
  fd.append("investment_activities_2024",    formData.investmentActivities2024);
  fd.append("investment_activities_2023",    formData.investmentActivities2023);
  fd.append("investment_electrolyser_2024",  formData.investmentElectrolyser2024);
  fd.append("investment_electrolyser_2023",  formData.investmentElectrolyser2023);
  fd.append("upcoming_projects_2024",        formData.upcomingProjects2024);
  fd.append("upcoming_projects_2023",        formData.upcomingProjects2023);

  // 4) Flat attachments
  if (formData.attachments1.file) {
    fd.append("attachments1_desc", formData.attachments1.description);
    fd.append("attachments1",      formData.attachments1.file);
  }
  if (formData.attachments2.file) {
    fd.append("attachments2_desc", formData.attachments2.description);
    fd.append("attachments2",      formData.attachments2.file);
  }
  if (formData.attachments3.file) {
    fd.append("attachments3_desc", formData.attachments3.description);
    fd.append("attachments3",      formData.attachments3.file);
  }
  if (formData.attachments4.file) {
    fd.append("attachments4_desc", formData.attachments4.description);
    fd.append("attachments4",      formData.attachments4.file);
  }

  // 5) Approving authority signature
  if (formData.approvingAuthoritySignature) {
    fd.append("approving_authority_file", formData.approvingAuthoritySignature);
  }

  // 6) Nested technologies array as JSON
  const filteredTech = technologies.filter(
    t =>
      t.projectName ||
      t.location ||
      t.capacity ||
      t.projectCompletionYear ||
      t.projectCurrentStatus
  );
  fd.append("technologies", JSON.stringify(filteredTech));

  // Finally: POST to your corrected endpoint
  try {
      const url = `${ACTIVE_API_BASE_URL}/green-hydrogen/`;
      const res = await fetch(url, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Server error body:", text);
      alert("Submission failed. See console for details.");
      return;
    }

    alert("Submitted successfully!");
    setIsSubmitted(true);
    setCurrentStep(1);
    // reset formData exactly as you listed
    setFormData({
      Organisationname: "",
      category: "Green Hydrogen Company of the Year",
      companyName: "",
      mailingAddress: "",
      authorityName: "",
      authorityTitle: "",
      authorityPhone: "",
      authorityEmail: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      companyProfile: "",
      approvingAuthoritySignature: "",
      declaration: false,
      comment: "",
      installedCapacity2024: "",
      production2024: "",
      carbonEmission2024: "",
      purity2024: "",
      costOfProduction2024: "",
      patentsFiled2024: "",
      patentsGrantedNational2024: "",
      patentsGrantedInternational2024: "",
      patentsCommercialized2024: "",
      investmentActivities2024: "",
      investmentActivities2023: "",
      investmentElectrolyser2024: "",
      investmentElectrolyser2023: "",
      upcomingProjects2024: "",
      upcomingProjects2023: "",
      attachments1: { description: "", file: null },
      attachments2: { description: "", file: null },
      attachments3: { description: "", file: null },
      attachments4: { description: "", file: null },
    });
    setTechnologies(
      Array(5)
        .fill(null)
        .map(() => ({ ...initialTechnology }))
    );
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error! Please try again.");
  }
};





    const handlePrint = () => {
        const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">Registration Form: ${awardTitle}</h1>
        <h2>Organization & Contact Details</h2>
        <p><strong>Organisation Name:</strong> ${formData.Organisationname}</p>
        <p><strong>Category:</strong> ${formData.category}</p>
        <p><strong>Mailing Address:</strong> ${formData.mailingAddress}</p>
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
          <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Installed Capacity of Green hydrogen production units (MT)</td><td>${formData.installedCapacity2024 || ''}</td></tr>
            <tr><td>2</td><td>Production of Green hydrogen (MT)</td><td>${formData.production2024 || ''}</td></tr>
            <tr><td>3</td><td>Carbon emitted per unit of Green Hydrogen Production (Tonne/Tonne)</td><td>${formData.carbonEmission2024 || ''}</td></tr>
            <tr><td>4</td><td>Purity of Green Hydrogen Produced (%)</td><td>${formData.purity2024 || ''}</td></tr>
            <tr><td>5</td><td>Cost of Production (INR / Tonne)</td><td>${formData.costOfProduction2024 || ''}</td></tr>
            <tr><td>6</td><td>Patents filed in the Assessment year</td><td>${formData.patentsFiled2024 || ''}</td></tr>
            <tr><td>7</td><td>Total Patents Granted (National)</td><td>${formData.patentsGrantedNational2024 || ''}</td></tr>
            <tr><td>8</td><td>Total Patents Granted (International)</td><td>${formData.patentsGrantedInternational2024 || ''}</td></tr>
            <tr><td>9</td><td>Patents Commercialized</td><td>${formData.patentsCommercialized2024 || ''}</td></tr>
          </tbody>
        </table>
        <h2>Quantitative Information - Exploration Part 2</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th></tr></thead>
          <tbody>
            <tr><td>10</td><td>Investment in Green Hydrogen Activities - production/transportation/distribution/storage (INR Crores)</td><td>${formData.investmentActivities2024 || ''}</td><td>${formData.investmentActivities2023 || ''}</td></tr>
            <tr><td>11</td><td>Investment in Electrolyser/ Membrane Manufacturing (INR Crores)</td><td>${formData.investmentElectrolyser2024 || ''}</td><td>${formData.investmentElectrolyser2023 || ''}</td></tr>
            <tr><td>12</td><td>Upcoming projects</td><td>${formData.upcomingProjects2024 || ''}</td><td>${formData.upcomingProjects2023 || ''}</td></tr>
          </tbody>
        </table>
        <h2>New Technologies Adopted</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead><tr><th>S. No.</th><th>Project Name</th><th>Location</th><th>Capacity (MT)</th><th>Project Completion Year</th><th>Project Current Status</th></tr></thead>
          <tbody>
            ${technologies.map((tech, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${tech.projectName || ''}</td>
                <td>${tech.location || ''}</td>
                <td>${tech.capacity || ''}</td>
                <td>${tech.projectCompletionYear || ''}</td>
                <td>${tech.projectCurrentStatus || ''}</td>
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

    const data = [
        { num: 1, title: 'Installed Capacity of Green hydrogen production units (MT)', key2024: 'installedCapacity2024' },
        { num: 2, title: 'Production of Green hydrogen (MT)', key2024: 'production2024' },
        { num: 3, title: 'Carbon emitted per unit of Green Hydrogen Production (Tonne/Tonne)', key2024: 'carbonEmission2024' },
        { num: 4, title: 'Purity of Green Hydrogen Produced (%)', key2024: 'purity2024' },
        { num: 5, title: 'Cost of Production (INR / Tonne)', key2024: 'costOfProduction2024' },
        { num: 6, title: 'Patents filed in the Assessment year', key2024: 'patentsFiled2024' },
        { num: 7, title: 'Total Patents Granted (National)', key2024: 'patentsGrantedNational2024' },
        { num: 8, title: 'Total Patents Granted (International)', key2024: 'patentsGrantedInternational2024' },
        { num: 9, title: 'Patents Commercialized', key2024: 'patentsCommercialized2024' },
        { num: 10, title: 'Investment in Green Hydrogen Activities - production/transportation/distribution/storage (INR Crores)', key2024: 'investmentActivities2024', key2023: 'investmentActivities2023' },
        { num: 11, title: 'Investment in Electrolyser/ Membrane Manufacturing (INR Crores)', key2024: 'investmentElectrolyser2024', key2023: 'investmentElectrolyser2023' },
        { num: 12, title: 'Upcoming projects', key2024: 'upcomingProjects2024', key2023: 'upcomingProjects2023' }, // Added keys
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
                                value={formData.Organisationname || ''}
                                onChange={handleChange}
                                className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
                            />
                            {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
                        </div>

                        <div className="form-group">
                            <label>Select Category<span className="text-red">*</span></label>
                            <select
                                name="category"
                                value={formData.category || ''}
                                onChange={(e) => handleChange(e)}
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
                            {!formData.category && currentStep === 1 && <span className="error-tooltip">Category is required</span>}
                        </div>

                        <div className="form-group">
                            <label>Postal Address <span className="text-red">*</span></label>
                            <textarea
                                name="mailingAddress"
                                value={formData.mailingAddress || ''}
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
                                        value={formData.authorityName || ''}
                                        onChange={handleChange}
                                        onKeyPress={(e) => {
                                            if (!/^[A-Za-z\s]$/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
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
                                        value={formData.authorityTitle || ''}
                                        onChange={handleChange}
                                        onKeyPress={(e) => {
                                            if (!/^[A-Za-z0-9\s]$/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
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
                                        value={formData.authorityPhone || ''}
                                        onChange={handleChange}
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
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
                                        value={formData.authorityEmail || ''}
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
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        contactName: prev.authorityName,
                                                        contactEmail: prev.authorityEmail,
                                                        contactPhone: prev.authorityPhone,
                                                    }));
                                                } else {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        contactName: '',
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
                                    <label>Name <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName || ''}
                                        onChange={handleChange}
                                        onKeyPress={(e) => {
                                            if (!/^[A-Za-z\s]$/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onPaste={(e) => {
                                            const paste = (e.clipboardData || window.clipboardData).getData('text');
                                            if (!/^[A-Za-z\s]+$/.test(paste)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className={`form-input ${!formData.contactName && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Name"
                                        maxLength={50}
                                        pattern="[A-Za-z\s]+"
                                        title="Only letters and spaces are allowed"
                                        required
                                    />
                                    {!formData.contactName && currentStep === 2 && <span className="error-tooltip">Name is required</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={formData.contactPhone || ''}
                                        onChange={handleChange}
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
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
                                        value={formData.contactEmail || ''}
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
                                value={formData.companyProfile || ''}
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
                                </tr>
                            </thead>
                            <tbody>
                                {data.slice(0, 9).map((item) => (
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
                                {data.slice(9, 12).map((item) => (
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
                                    <th>Project Name</th>
                                    <th>Location</th>
                                    <th>Capacity (MT) (A)</th>
                                    <th>Project Completion Year(B)</th>
                                    <th>Project Current Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {technologies.map((tech, index) => (
                                    <tr key={index}>
                                        <td className="sno-cell">{index + 1}</td>
                                        <td>
                                            <input
                                                type="text"
                                                name={`projectName_${index}`} // Unique name
                                                value={tech.projectName || ''}
                                                onChange={(e) => handleTechnologyChange(index, 'projectName', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name={`location_${index}`} // Unique name
                                                value={tech.location || ''}
                                                onChange={(e) => handleTechnologyChange(index, 'location', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name={`capacity_${index}`} // Unique name
                                                value={tech.capacity || ''}
                                                onChange={(e) => handleTechnologyChange(index, 'capacity', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name={`projectCompletionYear_${index}`} // Unique name
                                                value={tech.projectCompletionYear || ''}
                                                onChange={(e) => handleTechnologyChange(index, 'projectCompletionYear', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name={`projectCurrentStatus_${index}`} // Unique name
                                                value={tech.projectCurrentStatus || ''}
                                                onChange={(e) => handleTechnologyChange(index, 'projectCurrentStatus', e.target.value)}
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
                                    value={formData.comment || ''}
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
                                                        value={attachment.description || ''}
                                                        onChange={(e) => handleAttachmentChange(key, 'description', e.target.value)}
                                                        placeholder="Enter description"
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
                                <ol type="a">
                                    <li>INR / USD as on 31.03.2025 (85.424)</li>
                                    <li>1 Tonne of oil equivalent to 7.5 bbl of oil</li>
                                    <li>MTOE: Million Tonne of Oil Equivalent. For this calculation 1 BCM of natural gas is equivalent to 1 MMT of Oil</li>
                                    <li>
                                        Finding cost (INR/MTOE): Cost of finding oil and gas reserves added via exploration drilling activities, exclusive of land acquisition cost: (total cost incurred (INR)/ reserves added (oil + oil eq. gas reserves) (MTOE)
                                    </li>
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

export default RegistrationGH;