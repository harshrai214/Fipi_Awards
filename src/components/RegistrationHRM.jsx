import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationHRM = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Human Resource Management Company of the Year',
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
        ldGM: '', 
        ldExecutive: '', 
        ldWorkmen: '', 
        ldHSE: '', 
        ldSkill: '', 
        ldFunctional: '', 
        ldManagement: '',
        attritionEntry: '', 
        attritionExecutive: '', 
        attritionSenior: '',
        recruitVacancies: '', 
        recruitFilled: '',
        recruitCycle: '',
        diversityTotal: '', 
        diversityUnder40: '', 
        diversityFemale: '', 
        diversityQualified: '', 
        diversityDisabled2024: '', 
        diversityDisabled2023: '',
        pmeDone: '', 
        pmeRequired: '',
        retentionFemalePast: '',
        grievanceMechanism: '',
        grievanceMechanism2: '',
        grievanceMechanism3: '',
        employeeAwards: '',
        employeeAwards2: '',
        employeeAwards3: '',
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

// inside RegistrationHRM component
const handleSubmit = async e => {
  e.preventDefault();

  if (!formData.declaration) {
    alert('Please accept the declaration before submitting.');
    return;
  }
  if (formData.authorityPhone.replace(/\D/g,'').length !== 10) {
    alert('Authority phone must be 10 digits.');
    return;
  }

  const fd = new FormData();

  // ── Organisation & Contact ──
  fd.append('organisation_name', formData.Organisationname);
  fd.append('category',          formData.category);
  fd.append('company_name',      formData.companyName);
  fd.append('mailing_address',   formData.mailingAddress);

  fd.append('authority_name',    formData.authorityName);
  fd.append('authority_title',   formData.authorityTitle);
  fd.append('authority_phone',   formData.authorityPhone);
  fd.append('authority_email',   formData.authorityEmail);

  fd.append('copy_applicant_data', String(formData.copyApplicantData));
  fd.append('contact_name',      formData.contactName);
  fd.append('contact_phone',     formData.contactPhone);
  fd.append('contact_email',     formData.contactEmail);

  fd.append('company_profile',   formData.companyProfile);
  fd.append('comment',           formData.comment);
  fd.append('declaration',       String(formData.declaration));

  // ── Quantitative Part 1 ──
  [
    'ldGM','ldExecutive','ldWorkmen','ldHSE','ldSkill','ldFunctional','ldManagement',
    'attritionEntry','attritionExecutive','attritionSenior',
    'recruitVacancies','recruitFilled','recruitCycle',
    'diversityTotal','diversityUnder40','diversityFemale',
    'diversityQualified','diversityDisabled2024','diversityDisabled2023'
  ].forEach(key => {
    if (formData[key] !== undefined) fd.append(key, formData[key]);
  });

  // ── Quantitative Part 2 ──
  ['pmeDone','pmeRequired','retentionFemalePast',
   'grievanceMechanism','grievanceMechanism2','grievanceMechanism3',
   'employeeAwards','employeeAwards2','employeeAwards3'
  ].forEach(key => {
    if (formData[key] !== undefined) fd.append(key, formData[key]);
  });

  // ── Files ──
  if (formData.approvingAuthoritySignature) {
    fd.append('approving_authority_file', formData.approvingAuthoritySignature);
  }
  [1,2,3,4].forEach(n => {
    const att = formData[`attachments${n}`];
    if (att.file) {
      fd.append(`attachments${n}`,     att.file);
      fd.append(`attachments${n}_desc`, att.description);
    }
  });

  try {
      const url = `${ACTIVE_API_BASE_URL}/hrm-registration/`;
      const res = await fetch(url, {
      method: 'POST',
      body: fd,
    });
    if (!res.ok) throw await res.text();
    const data = await res.json();
    console.log('HRM created:', data);
    alert('Submitted successfully!');
    setIsSubmitted(true);
    // optionally reset your formData here...
  } catch(err) {
    console.error('Submission error:', err);
    alert('Submission failed');
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
                            <th style="border: 1px solid #000; padding: 8px;">Subparticulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">Assessment Year</th>
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
                            <th style="border: 1px solid #000; padding: 8px;">Subparticulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">Assessment Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderQuantitativePrint(6, 9)}
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
                title: 'Learning & Development (Training days per employee)',
                subItems: [
                    { num: '1.1', label: 'GM and above', key: 'ldGM' },
                    { num: '1.1.1', label: 'Executive (up to E-6 level)', key: 'ldExecutive' },
                    { num: '1.1.2', label: 'Workmen', key: 'ldWorkmen' },
                    { num: '1.2', label: 'HSE training days per employee', key: 'ldHSE' },
                    { num: '1.3.1', label: 'Skill Development Training', key: 'ldSkill' },
                    { num: '1.3.2', label: 'Functional/On-job Training', key: 'ldFunctional' },
                    { num: '1.3.3', label: 'Management Training', key: 'ldManagement' },
                ]
            },
            {
                num: 2,
                title: 'Employee attrition rate (other than retirement)',
                subItems: [
                    { num: '2.1', label: 'Entry level (within first 2 years)', key: 'attritionEntry' },
                    { num: '2.2', label: 'Executives (up to E-6 level)', key: 'attritionExecutive' },
                    { num: '2.3', label: 'Senior Management (E-7 & above)', key: 'attritionSenior' },
                ]
            },
            {
                num: 3,
                title: '% Recruitment (Full Time; Regular Employee)',
                subItems: [
                    { num: '3.1', label: 'Total vacancies identified', key: 'recruitVacancies' },
                    { num: '3.2', label: 'Total positions filled during year', key: 'recruitFilled' },
                ]
            },
            {
                num: 4,
                title: 'Recruitment Cycle Completion (Avg. days)',
                fields: [
                    { key: 'recruitCycle' }
                ]
            },
            {
                num: 5,
                title: 'Diverse workforce (as on 31st March)',
                subItems: [
                    { num: '5.0', label: 'Total No. of Employees', key: 'diversityTotal' },
                    { num: '5.1', label: 'Employees under 40 years', key: 'diversityUnder40' },
                    { num: '5.2', label: 'Female employees', key: 'diversityFemale' },
                    { num: '5.3', label: 'Employees with higher qualification', key: 'diversityQualified' },
                    { num: '5.4', label: 'Differently-abled employees (2024-25)', key: 'diversityDisabled2024' },
                    { num: '5.4', label: 'Differently-abled employees (2023-24)', key: 'diversityDisabled2023' },
                ]
            },
            {
                num: 6,
                title: 'Preventive Medical Examination (PME)',
                subItems: [
                    { num: '6.1', label: 'Employees undergone PME', key: 'pmeDone' },
                    { num: '6.2', label: 'Employees required to undergo PME', key: 'pmeRequired' },
                ]
            },
            {
                num: 7,
                title: 'Progress in Retaining Female Workforce',
                fields: [
                    { key: 'retentionFemalePast' }
                ]
            },
            {
                num: 8,
                title: 'Grievance Redressal Mechanism (within 300 words)',
                subItems: [
                    { num: "8.1", key: 'grievanceMechanism' },
                    { num: "8.2", key: 'grievanceMechanism2' },
                    { num: "8.3", key: 'grievanceMechanism3' }
                ]
            },
            {
                num: 9,
                title: 'Recognition & Award Programmes (within 300 words)',
                subItems: [
                    { num: "9.1", key: 'employeeAwards' },
                    { num: "9.2", key: 'employeeAwards2' },
                    { num: "9.3", key: 'employeeAwards3' }
                ]
            },
        ];

        let html = '';
        const filteredData = data.filter(section => section.num >= sectionStart && section.num <= sectionEnd);
        filteredData.forEach(section => {
            const items = section.subItems || section.fields;
            items.forEach((item, index) => {
                html += `
                    <tr>
                        ${index === 0 ? `<td style="border: 1px solid #000; padding: 8px;" rowspan="${items.length}">${section.num}</td>` : ''}
                        ${index === 0 ? `<td style="border: 1px solid #000; padding: 8px;" rowspan="${items.length}">${section.title}</td>` : ''}
                        <td style="border: 1px solid #000; padding: 8px;">${item.num || ''}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${item.label || section.title}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${formData[item.key] || ''}</td>
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
                                <option value="Human Resource Management Company of the Year">Human Resource Management</option>
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
                            <table className="quant-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Particulars</th>
                                        <th></th>
                                        <th>Subparticulars</th>
                                        <th>Assessment Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {
                                            num: 1,
                                            title: 'Learning & Development (Training days per employee)',
                                            subItems: [
                                                { num: '1.1', label: 'GM and above', key: 'ldGM' },
                                                { num: '1.1.1', label: 'Executive (up to E-6 level)', key: 'ldExecutive' },
                                                { num: '1.1.2', label: 'Workmen', key: 'ldWorkmen' },
                                                { num: '1.2', label: 'HSE training days per employee', key: 'ldHSE' },
                                                { num: '1.3.1', label: 'Skill Development Training', key: 'ldSkill' },
                                                { num: '1.3.2', label: 'Functional/On-job Training', key: 'ldFunctional' },
                                                { num: '1.3.3', label: 'Management Training', key: 'ldManagement' },
                                            ]
                                        },
                                        {
                                            num: 2,
                                            title: 'Employee attrition rate (other than retirement)',
                                            subItems: [
                                                { num: '2.1', label: 'Entry level (within first 2 years)', key: 'attritionEntry' },
                                                { num: '2.2', label: 'Executives (up to E-6 level)', key: 'attritionExecutive' },
                                                { num: '2.3', label: 'Senior Management (E-7 & above)', key: 'attritionSenior' },
                                            ]
                                        },
                                        {
                                            num: 3,
                                            title: '% Recruitment (Full Time; Regular Employee)',
                                            subItems: [
                                                { num: '3.1', label: 'Total vacancies identified', key: 'recruitVacancies' },
                                                { num: '3.2', label: 'Total positions filled during year', key: 'recruitFilled' },
                                            ]
                                        },
                                        {
                                            num: 4,
                                            title: 'Recruitment Cycle Completion (Avg. days)',
                                            fields: [
                                                { key: 'recruitCycle' }
                                            ]
                                        },
                                        {
                                            num: 5,
                                            title: 'Diverse workforce (as on 31st March)',
                                            subItems: [
                                                { num: '5.0', label: 'Total No. of Employees', key: 'diversityTotal' },
                                                { num: '5.1', label: 'Employees under 40 years', key: 'diversityUnder40' },
                                                { num: '5.2', label: 'Female employees', key: 'diversityFemale' },
                                                { num: '5.3', label: 'Employees with higher qualification', key: 'diversityQualified' },
                                                { num: '5.4', label: 'Differently-abled employees (2024-25)', key: 'diversityDisabled2024' },
                                                { num: '5.4', label: 'Differently-abled employees (2023-24)', key: 'diversityDisabled2023' },
                                            ]
                                        },
                                    ].map(section => {
                                        const items = section.subItems || section.fields;
                                        return items.map((item, index) => (
                                            <tr key={`${section.num}-${index}`}>
                                                {index === 0 && (
                                                    <>
                                                        <td className="sno-cell" rowSpan={items.length}>{section.num}</td>
                                                        <td className="title-cell" rowSpan={items.length}><strong>{section.title}</strong></td>
                                                    </>
                                                )}
                                                <td className="sno-cell">{item.num || ''}</td>
                                                <td className="label-cell">{item.label || section.title}</td>
                                                <td>
                                                    {section.num >= 6 ? (
                                                        <textarea
                                                            name={item.key}
                                                            value={formData[item.key] || ''}
                                                            onChange={handleChange}
                                                            className="form-input"
                                                            rows={6}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name={item.key}
                                                            value={formData[item.key] || ''}
                                                            onChange={handleChange}
                                                            className="form-input"
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        ));
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
                                        <th>Subparticulars</th>
                                        <th>Assessment Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {
                                            num: 6,
                                            title: 'Preventive Medical Examination (PME)',
                                            subItems: [
                                                { num: '6.1', label: 'Employees undergone PME', key: 'pmeDone' },
                                                { num: '6.2', label: 'Employees required to undergo PME', key: 'pmeRequired' },
                                            ]
                                        },
                                        {
                                            num: 7,
                                            title: 'Progress in Retaining Female Workforce',
                                            subItems: [
                                                { num: "7.1", label: "No. of Female Employees Five Years ago", key: 'retentionFemalePast' }
                                            ]
                                        },
                                        {
                                            num: 8,
                                            title: 'Grievance Redressal Mechanism (within 300 words)',
                                            subItems: [
                                                { num: "8.1", key: 'grievanceMechanism' },
                                                { num: "8.2", key: 'grievanceMechanism2' },
                                                { num: "8.3", key: 'grievanceMechanism3' }
                                            ]
                                        },
                                        {
                                            num: 9,
                                            title: 'Recognition & Award Programmes (within 300 words)',
                                            fields: [
                                                { num: "9.1", key: 'employeeAwards' },
                                                { num: "9.2", key: 'employeeAwards2' },
                                                { num: "9.3", key: 'employeeAwards3' }
                                            ]
                                        },
                                    ].map(section => {
                                        const items = section.subItems || section.fields;
                                        return items.map((item, index) => (
                                            <tr key={`${section.num}-${index}`}>
                                                {index === 0 && (
                                                    <>
                                                        <td className="sno-cell" rowSpan={items.length}>{section.num}</td>
                                                        <td className="title-cell" rowSpan={items.length}><strong>{section.title}</strong></td>
                                                    </>
                                                )}
                                                <td className="sno-cell">{item.num || ''}</td>
                                                <td className="label-cell">{item.label || section.title}</td>
                                                <td>
                                                    {section.num >= 8 ? (
                                                        <textarea
                                                            name={item.key}
                                                            value={formData[item.key] || ''}
                                                            onChange={handleChange}
                                                            className="form-input"
                                                            rows={6}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name={item.key}
                                                            value={formData[item.key] || ''}
                                                            onChange={handleChange}
                                                            className="form-input"
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        ));
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

export default RegistrationHRM;