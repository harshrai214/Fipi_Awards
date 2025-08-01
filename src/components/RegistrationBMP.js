import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationBMP = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [submittedProjectsCount, setSubmittedProjectsCount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Best Managed Project of the Year',
        companyName: '',
        mailingAddress: '',
        ProjectName: "",
        ProjectNameWriteup: "",  
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

        projectNo: '',
        projectName: '',
        startDate: '',
        plannedCompletionDate: '',
        actualCompletionDate: '',
        estimatedCost: '',
        actualCost: '',
        projectDescription: '',
        projectUniqueness: '',
        fatalities: '',
        lostTimeInjuries: '',
        oshaIncidents: '',
        manHoursOwn: '',
        manHoursContractual: '',
        carbonEmissionProject: '',
        carbonReductionSteps: '',


        name1: '', schedule1: '', actual1: '', budgetedAmount1: '', actualAmount1: '',
        name2: '', schedule2: '', actual2: '', budgetedAmount2: '', actualAmount2: '',
        name3: '', schedule3: '', actual3: '', budgetedAmount3: '', actualAmount3: '',
        
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
    const awardTitle = location.state?.awardTitle || "Oil & Gas Production Company of the Year";

    const handleChange = (name, value, index = null) => {
        if (["Firstname", "Lastname", "authorityName", "contactName"].includes(name)) {
            const isValid = /^[A-Za-z\s]*$/.test(value);
            if (!isValid) return;
        }

        if (index !== null) {
            // Handle array-based inputs if needed in the future, but not used here for milestones
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
            const maxSizeInBytes = 5 * 1024 * 1024;
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
            [key]: { ...prev[key], [field]: value }
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
            const maxSizeInBytes = 5 * 1024 * 1024;
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

  if (!formData.declaration) {
    alert('Please accept the declaration before submitting.');
    return;
  }
  const org = formData.Organisationname?.trim();
  if (!org) {
    alert('Organisation name is required.');
    return;
  }

  // 2-submission check
  try {
    const res = await fetch(
      `${ACTIVE_API_BASE_URL}/registration-bmp/count/?org=${encodeURIComponent(org)}`
    );
    if (!res.ok) throw new Error('Count API failed');
    const { count } = await res.json();
    if (count >= 2) {
      alert('you have reach your form limit the max limit is 2 for this form');
      return;
    }
  } catch (err) {
    console.error(err);
    alert('Could not verify submission count.');
    return;
  }

  // Build payload
  const fd = new FormData();
  fd.append('organisation_name', formData.Organisationname);
  fd.append('category',          formData.category);
  fd.append('company_name',      formData.companyName);
  fd.append('mailing_address',   formData.mailingAddress);

  fd.append('project_name',       formData.ProjectName);
  fd.append('project_writeup',    formData.ProjectNameWriteup);

  fd.append('authority_name',     formData.authorityName);
  fd.append('authority_title',    formData.authorityTitle);
  fd.append('authority_phone',    formData.authorityPhone);
  fd.append('authority_email',    formData.authorityEmail);

  fd.append('contact_name',       formData.contactName);
  fd.append('contact_phone',      formData.contactPhone);
  fd.append('contact_email',      formData.contactEmail);

  fd.append('company_profile',    formData.companyProfile);
  fd.append('award_justification',formData.awardJustification);
  fd.append('comment',            formData.comment);
  fd.append('declaration',        formData.declaration);

  // Quantitative part 1
  fd.append('project_no',               formData.projectNo);
  fd.append('start_date',               formData.startDate);
  fd.append('planned_completion_date',  formData.plannedCompletionDate);
  fd.append('actual_completion_date',   formData.actualCompletionDate);
  fd.append('estimated_cost',           formData.estimatedCost);
  fd.append('actual_cost',              formData.actualCost);
  fd.append('project_description',      formData.projectDescription);
  fd.append('project_uniqueness',       formData.projectUniqueness);
  fd.append('fatalities',               formData.fatalities);
  fd.append('lost_time_injuries',       formData.lostTimeInjuries);
  fd.append('osha_incidents',           formData.oshaIncidents);
  fd.append('man_hours_own',            formData.manHoursOwn);
  fd.append('man_hours_contractual',    formData.manHoursContractual);
  fd.append('carbon_emission_project',  formData.carbonEmissionProject);
  fd.append('carbon_reduction_steps',   formData.carbonReductionSteps);

  // **Quantitative part 2 – correct mapping:**
  fd.append('milestone1_name',       formData.name1);
  fd.append('milestone1_schedule',   formData.schedule1);
  fd.append('milestone1_actual',     formData.actual1);
  fd.append('milestone1_budget',     formData.budgetedAmount1);
  fd.append('milestone1_actual_amt', formData.actualAmount1);

  fd.append('milestone2_name',       formData.name2);
  fd.append('milestone2_schedule',   formData.schedule2);
  fd.append('milestone2_actual',     formData.actual2);
  fd.append('milestone2_budget',     formData.budgetedAmount2);
  fd.append('milestone2_actual_amt', formData.actualAmount2);

  fd.append('milestone3_name',       formData.name3);
  fd.append('milestone3_schedule',   formData.schedule3);
  fd.append('milestone3_actual',     formData.actual3);
  fd.append('milestone3_budget',     formData.budgetedAmount3);
  fd.append('milestone3_actual_amt', formData.actualAmount3);

  // Files
  if (formData.approvingAuthoritySignature) {
    fd.append('approving_authority_file', formData.approvingAuthoritySignature);
  }
  [1,2,3,4].forEach(n => {
    const slot = formData[`attachments${n}`] || {};
    fd.append(`attachments${n}_desc`, slot.description || '');
    if (slot.file) {
      fd.append(`attachments${n}`, slot.file);
    }
  });

  // Submit
  try {
    const postRes = await fetch(`${ACTIVE_API_BASE_URL}/registration-bmp/`, {
      method: 'POST', body: fd
    });
    const data = await postRes.json();
    if (!postRes.ok) {
      alert(data.error || 'Submission failed.');
      console.error('Error:', data);
      return;
    }
    alert('Submitted successfully!');
    setIsSubmitted(true);
    setCurrentStep(1);
  } catch (err) {
    console.error('Submit error:', err);
    alert('Network error during submission.');
  }
};



    const handlePrint = () => {
        const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">Registration Form: ${formData.category}</h1>
        <p style="text-align: center;">Submission Date and Time: 11:39 AM IST, Thursday, July 31, 2025</p>
        <h2>Organization & Contact Details</h2>
        <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
        <p><strong>Category:</strong> ${formData.category || ''}</p>
        <p><strong>Mailing Address:</strong> ${formData.mailingAddress || ''}</p>
        ${formData.ProjectName ? `<p><strong>Project Name:</strong> ${formData.ProjectName || ''}</p><p><strong>Write-up:</strong> ${formData.ProjectNameWriteup || ''}</p>` : ''}
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
                    <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                    <th style="border: 1px solid #000; padding: 8px;">Value</th>
                </tr>
            </thead>
            <tbody>
                ${projectDetails.map(([label, key]) => `
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                        <td style="border: 1px solid #000; padding: 8px;">
                            ${key === 'projectDescription' || key === 'projectUniqueness' || key === 'carbonReductionSteps'
                                ? `${formData[key] || ''}`
                                : `${formData[key] || ''}`
                            }
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <h2>Quantitative Information - Part 2</h2>
        <h4>Major Milestones</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #000; padding: 8px;">Milestone Name</th>
                    <th style="border: 1px solid #000; padding: 8px;">Schedule Completion (Months)</th>
                    <th style="border: 1px solid #000; padding: 8px;">Actual Completion (Months)</th>
                    <th style="border: 1px solid #000; padding: 8px;">Budgeted Amount (INR Crore)</th>
                    <th style="border: 1px solid #000; padding: 8px;">Actual Amount (INR Crore)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.name1 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.schedule1 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.actual1 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.budgetedAmount1 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.actualAmount1 || ''}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.name2 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.schedule2 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.actual2 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.budgetedAmount2 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.actualAmount2 || ''}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.name3 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.schedule3 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.actual3 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.budgetedAmount3 || ''}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${formData.actualAmount3 || ''}</td>
                </tr>
            </tbody>
        </table>
        <p><strong>Comments:</strong> ${formData.comment || ''}</p>
        <h2>Declaration</h2>
        <p>I declare that the information submitted is true and complete.</p>
      </div>
    `;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    const projectDetails = [
        ['Project No.', 'projectNo', 'text'],
        ['Name of the Project', 'projectName', 'text'],
        ['Start Date', 'startDate', 'date'],
        ['Initial Planned Completion Date', 'plannedCompletionDate', 'date'],
        ['Actual Completion Date', 'actualCompletionDate', 'date'],
        ['Estimated Cost of the Project (INR Crores)', 'estimatedCost', 'number'],
        ['Actual Cost of the Project (INR Crores)', 'actualCost', 'number'],
        ['No. of Fatalities (2024-25)', 'fatalities', 'number'],
        ['Number of Lost Time Injuries (2024-25)', 'lostTimeInjuries', 'number'],
        ['Number of OSHA Recordable Incidents (2024-25)', 'oshaIncidents', 'number'],
        ['Total Man Hours Worked (Own Employees)', 'manHoursOwn', 'number'],
        ['Total Man Hours Worked (Contractual Employees)', 'manHoursContractual', 'number'],
        ['Carbon Emission During Project Execution (Tonne)', 'carbonEmissionProject', 'number'],
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

                        {formData.category === 'Best Managed Project of the Year' && submittedProjectsCount < 2 && (
                            <>
                                <div className="form-group">
                                    <label>Project Name</label>
                                    <textarea
                                        name={`ProjectName`}
                                        value={formData[`ProjectName`] || ''}
                                        onChange={(e) => handleChange(`ProjectName`, e.target.value)}
                                        className="form-textarea"
                                        rows={3}
                                        maxLength={400}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Write-up (max 50 words)</label>
                                    <textarea
                                        name={`ProjectNameWriteup`}
                                        value={formData[`ProjectNameWriteup`] || ''}
                                        onChange={(e) => handleChange(`ProjectNameWriteup`, e.target.value)}
                                        className="form-textarea"
                                        rows={3}
                                        maxLength={400}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {submittedProjectsCount >= 2 && (
                            <p className="info-text" style={{ color: 'red', fontWeight: 'bold' }}>
                                You have already submitted the maximum of 2 projects.
                            </p>
                        )}
                    </div>
                )
                }

                {
                    currentStep === 2 && (
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
                        </div>
                    )
                }

                {
                    currentStep === 3 && (
                        <div>
                            <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>

                            <h4 className="mt-6">Project Details</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Particulars</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectDetails.map(([label, key, type]) => (
                                        <tr key={key}>
                                            <td>{label}</td>
                                            <td>
                                                {key === 'projectDescription' || key === 'projectUniqueness' || key === 'carbonReductionSteps' ? (
                                                    <textarea
                                                        value={formData[key] || ''}
                                                        onChange={(e) => handleChange(key, e.target.value)}
                                                        className="form-textarea"
                                                        rows={4}
                                                        maxLength={200}
                                                        placeholder={`Enter ${label} (max 200 words)`}
                                                    />
                                                ) : (
                                                    <input
                                                        type={type}
                                                        value={formData[key] || ''}
                                                        onChange={(e) => handleChange(key, e.target.value)}
                                                        className="form-input"

                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }

                {
                    currentStep === 4 && (
                        <div>
                            <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>

                            <h4 className="mt-6">Major Milestones</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Milestone Name</th>
                                        <th>Schedule Completion (Months)</th>
                                        <th>Actual Completion (Months)</th>
                                        <th>Budgeted Amount (INR Crore)</th>
                                        <th>Actual Amount (INR Crore)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                value={formData.name1 || ''}
                                                onChange={(e) => handleChange('name1', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={formData.schedule1 || ''}
                                                onChange={(e) => handleChange('schedule1', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={formData.actual1 || ''}
                                                onChange={(e) => handleChange('actual1', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={formData.budgetedAmount1 || ''}
                                                onChange={(e) => handleChange('budgetedAmount1', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={formData.actualAmount1 || ''}
                                                onChange={(e) => handleChange('actualAmount1', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                value={formData.name2 || ''}
                                                onChange={(e) => handleChange('name2', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={formData.schedule2 || ''}
                                                onChange={(e) => handleChange('schedule2', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={formData.actual2 || ''}
                                                onChange={(e) => handleChange('actual2', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={formData.budgetedAmount2 || ''}
                                                onChange={(e) => handleChange('budgetedAmount2', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={formData.actualAmount2 || ''}
                                                onChange={(e) => handleChange('actualAmount2', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                value={formData.name3 || ''}
                                                onChange={(e) => handleChange('name3', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={formData.schedule3 || ''}
                                                onChange={(e) => handleChange('schedule3', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={formData.actual3 || ''}
                                                onChange={(e) => handleChange('actual3', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={formData.budgetedAmount3 || ''}
                                                onChange={(e) => handleChange('budgetedAmount3', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={formData.actualAmount3 || ''}
                                                onChange={(e) => handleChange('actualAmount3', e.target.value)}
                                                className="form-input"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                    )
                }

                {
                    currentStep === 5 && (
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
                                    <p>Notes:</p>
                                    <ol type="a" >
                                        <li>It is expected that only best project entry will be submitted.</li>
                                        <li>maximum of 2 entries are permitted per company.</li> 
                                        <li>All entries must be recommended by the Corporate Office of the company.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        )
    }

    return (
        <div className="application-form">
            <div className="form-header">
                <h1>
                    Registration Form: {"Best Managed Project of the Year"}
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

export default RegistrationBMP;