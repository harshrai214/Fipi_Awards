import React, { useState } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationWE = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Woman Executive of the Year',
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
        Applicantjoining: "",
        Applicantdetails: "",
        Applicantprofile: "",
        Applicantdesignation: "",
        ApplicantDOB: "",
        companyProfile: '',
        awardJustification: '',
        approvingAuthoritySignature: '',
        declaration: false,
        comment: '',
        WE_1: "",
        WE_2: "",
        WE_3: "",
        WE_4: "",
        WE_5: "",
        WE_6: "",
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
        if (currentStep === 2 && !formData.ApplicantDOB) {
            setError('Applicant DOB is required.');
            return;
        }
        if (currentStep === 2 && !formData.Applicantdesignation) {
            setError('Applicant designation is required.');
            return;
        }
        if (currentStep === 2 && !formData.Applicantjoining) {
            setError('Applicant joining date is required.');
            return;
        }
        if (currentStep === 2 && !formData.Applicantprofile) {
            setError('Applicant Profile is required.');
            return;
        }
        if (currentStep === 2 && !formData.authorityTitle) {
            setError('Authority designation is required.');
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

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.declaration) {
//         alert('Please accept the declaration before submitting.');
//         return;
//     }

//     const fd = new FormData();
//     fd.append('organisation_name', formData.Organisationname);
//     fd.append('category', formData.category);
//     fd.append('company_name', formData.companyName);
//     fd.append('mailing_address', formData.mailingAddress);

//     fd.append('authority_name', formData.authorityName);
//     fd.append('authority_title', formData.authorityTitle);
//     fd.append('authority_phone', formData.authorityPhone);
//     fd.append('authority_email', formData.authorityEmail);

//     fd.append('contact_name', formData.contactName);
//     fd.append('contact_phone', formData.contactPhone);
//     fd.append('contact_email', formData.contactEmail);

//     fd.append('applicant_dob', formData.ApplicantDOB);
//     fd.append('applicant_designation', formData.Applicantdesignation);
//     fd.append('applicant_profile', formData.Applicantprofile);
//     fd.append('applicant_details', formData.Applicantdetails);
//     fd.append('applicant_joining', formData.Applicantjoining);

//     fd.append('company_profile', formData.companyProfile);
//     fd.append('award_justification', formData.awardJustification);
//     fd.append('comment', formData.comment);
//     fd.append('declaration', formData.declaration);

//     fd.append('we_1', formData.WE_1);
//     fd.append('we_2', formData.WE_2);
//     fd.append('we_3', formData.WE_3);
//     fd.append('we_4', formData.WE_4);
//     fd.append('we_5', formData.WE_5);
//     fd.append('we_6', formData.WE_6);

//     if (formData.approvingAuthoritySignature) {
//         fd.append('approving_authority_file', formData.approvingAuthoritySignature);
//     }

//     [1,2,3,4].forEach(num => {
//         const att = formData[`attachments${num}`];
//         fd.append(`attachments${num}_desc`, att.description || '');
//         if (att.file) fd.append(`attachments${num}`, att.file);
//     });

//     try {
//           const url = `${ACTIVE_API_BASE_URL}/registration-we/`;
//           const res = await fetch(url, {
//             method: 'POST',
//             body: fd
//         });
//         if (!res.ok) {
//             const err = await res.json();
//             alert(err.error || 'Submission failed');
//             return;
//         }
//         alert('Submitted successfully!');
//     } catch (err) {
//         alert('Network error, please retry.');
//     }
// };

// RegistrationWE.js (or wherever your handleSubmit lives)

const handleSubmit = async (e) => {
  e.preventDefault();

  // 1) Declaration checkbox
  if (!formData.declaration) {
    alert('Please accept the declaration before submitting.');
    return;
  }

  // 2) Organisation name
  const org = formData.Organisationname?.trim();
  if (!org) {
    alert('Organisation name is required.');
    return;
  }

  // 3) Offline guard
  if (!navigator.onLine) {
    alert('You appear to be offline. Please check your internet connection.');
    return;
  }

  // 4) Check count via GET
  try {
    const countRes = await fetch(
      `${ACTIVE_API_BASE_URL}/registration-we/count/?org=${encodeURIComponent(org)}`
    );
    const { count, error } = await countRes.json();

    if (!countRes.ok) {
      console.error('Count API error:', error);
      alert(error || 'Could not verify submission count. Try again later.');
      return;
    }

    if (count >= 2) {
      alert('you have reach your form limit the max limit is 2 for this form');
      return;
    }
  } catch (err) {
    console.error('Network error on count check:', err);
    alert(
      'Network error when verifying submission count. ' +
      `Is your API running at ${ACTIVE_API_BASE_URL}?`
    );
    return;
  }

  // 5) Build FormData
  const fd = new FormData();
  fd.append('organisation_name', formData.Organisationname);
  fd.append('category',          formData.category);
  fd.append('company_name',      formData.companyName);
  fd.append('mailing_address',   formData.mailingAddress);

  fd.append('authority_name',    formData.authorityName);
  fd.append('authority_title',   formData.authorityTitle);
  fd.append('authority_phone',   formData.authorityPhone);
  fd.append('authority_email',   formData.authorityEmail);

  fd.append('contact_name',      formData.contactName);
  fd.append('contact_phone',     formData.contactPhone);
  fd.append('contact_email',     formData.contactEmail);

  fd.append('applicant_dob',          formData.ApplicantDOB);
  fd.append('applicant_designation',  formData.Applicantdesignation);
  fd.append('applicant_profile',      formData.Applicantprofile);
  fd.append('applicant_details',      formData.Applicantdetails);
  fd.append('applicant_joining',      formData.Applicantjoining);

  fd.append('company_profile',     formData.companyProfile);
  fd.append('award_justification', formData.awardJustification);
  fd.append('comment',             formData.comment);
  fd.append('declaration',         formData.declaration);

  // WE questions
  [1,2,3,4,5,6].forEach(n => {
    fd.append(`we_${n}`, formData[`WE_${n}`] || '');
  });

  // Files
  if (formData.approvingAuthoritySignature) {
    fd.append('approving_authority_file', formData.approvingAuthoritySignature);
  }
  [1,2,3,4].forEach(num => {
    const slot = formData[`attachments${num}`] || {};
    fd.append(`attachments${num}_desc`, slot.description || '');
    if (slot.file) {
      fd.append(`attachments${num}`, slot.file);
    }
  });

  // 6) POST to create endpoint
  try {
    const postRes = await fetch(
      `${ACTIVE_API_BASE_URL}/registration-we/`,
      { method: 'POST', body: fd }
    );
    const postData = await postRes.json();

    if (!postRes.ok) {
      console.error('Create API error:', postData);
      alert(
        postData.error ||
        'Submission failed; please check backend logs and CORS settings.'
      );
      return;
    }

    alert('Submitted successfully!');
    // reset state or redirect...
  } catch (err) {
    console.error('Network error on submit:', err);
    alert(
      'Network error on submit. ' +
      `Is your API running at ${ACTIVE_API_BASE_URL}?`
    );
  }
};





    const handlePrint = () => {
        const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">Registration Form: ${awardTitle}</h1>
        <h2>Organization Details</h2>
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
        <p><strong>Contact Phone:</strong> ${formData.contactPhone}</p>
        <p><strong>Contact Email:</strong> ${formData.contactEmail}</p>
        <p><strong>Company Profile:</strong> ${formData.companyProfile}</p>
        <h2>Applicant Details</h2>
        <p><strong>Date of Birth:</strong> ${formData.ApplicantDOB}</p>
        <p><strong>Designation:</strong> ${formData.Applicantdesignation}</p>
        <p><strong>Career Profile:</strong> ${formData.Applicantprofile}</p>
        <p><strong>Educational Qualifications:</strong> ${formData.Applicantdetails}</p>
        <p><strong>Date of Joining:</strong> ${formData.Applicantjoining}</p>
        <h2>Quantitative Information Part 1</h2>
        <p><strong>1. Initiatives/exceptional contribution in the line of work:</strong> ${formData.WE_1}</p>
        <p><strong>2. Key examples of mentorship given to junior/new team member:</strong> ${formData.WE_2}</p>
        <p><strong>3. Key examples which demonstrate exceptional technical or professional expertise:</strong> ${formData.WE_3}</p>
        <p><strong>4. Key examples which demonstrate inputs in strategic perspective towards management decisions:</strong> ${formData.WE_4}</p>
        <h2>Quantitative Information Part 2</h2>
        <p><strong>5. Outline barriers or difficulties faced and how they have been overcome:</strong> ${formData.WE_5}</p>
        <p><strong>6. Work done/achievements in environmental improvement/decarbonization/net zero targets:</strong> ${formData.WE_6}</p>
        <p><strong>Comments:</strong> ${formData.comment}</p>
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
        ['1', 'Initiatives/exceptional contribution in the line of work', 'WE_1'],
        ['2', 'Key examples of mentorship given to junior/new team member ', 'WE_2'],
        ['3', 'Key examples which demonstrate exceptional technical or professional expertise (Within 200 words)', 'WE_3'],
        ['4', 'Key examples which demonstrate inputs in strategic perspective towards management decisions (Within 200 words)', 'WE_4'],
        ['5', 'Outline barriers or difficulties faced and how they have been overcome (Within 200 words)', 'WE_5'],
        ['6', 'Work done/achievements (if any) in the area of environmental improvement/decarbonization/net zero targets.', 'WE_6'],
    ];

    const part1 = fullData.filter(([num]) => parseFloat(num) <= 4);
    const part2 = fullData.filter(([num]) => parseFloat(num) > 4);

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
                        <h3 className="step-title">Step 2: Authority , Contact & Applicant Details</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="step-section">
                                <h4>Approving Authority</h4>
                                <p className="note">Approving authority should be CMD/MD in case of PSUs and CEO or equivalent senior executive in case of private Companies</p>
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
                            <div className="step-section">
                                <h4>Applicant Details: <span className="text-red">*</span></h4>
                                <div className="form-group">
                                    <label>Date of Birth of the Applicant: <span className="text-red">*</span></label>
                                    <input
                                        type="date"
                                        name="ApplicantDOB"
                                        value={formData.ApplicantDOB}
                                        onChange={(e) => handleChange('ApplicantDOB', e.target.value)}
                                        className={`form-input ${!formData.ApplicantDOB && currentStep === 2 ? 'has-error' : ''}`}

                                        placeholder="DOB"
                                    />
                                    {!formData.ApplicantDOB && currentStep === 2 && <span className="error-tooltip">DOB is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Current Designation of the Applicant: <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="Applicantdesignation"
                                        value={formData.Applicantdesignation}
                                        onChange={(e) => handleChange('Applicantdesignation', e.target.value)}
                                        className={`form-textarea ${!formData.Applicantdesignation && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Applicant Designation"
                                    />
                                    {!formData.Applicantdesignation && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Career Profile (within 100 words)</label>
                                    <p className="note">Write-up (max 300 words) — Operations during 2024–25</p>
                                    <textarea
                                        name="Applicantprofile"
                                        value={formData.Applicantprofile}
                                        onChange={(e) => handleChange('Applicantprofile', e.target.value)}
                                        className={`form-textarea ${!formData.Applicantprofile && currentStep === 2 ? 'has-error' : ''}`}
                                        rows={6}
                                        maxLength={300}
                                    />
                                    {!formData.Applicantprofile && currentStep === 2 && <span className="error-tooltip">Profile is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Educational qualifications with name of institutions, years passed out & total percentage of marks received/grade/points (Graduation & upwards)</label>
                                    <p className="note">Write up by applicant (Not more than 300 words)</p>
                                    <textarea
                                        name="Applicantdetails"
                                        value={formData.Applicantdetails}
                                        onChange={(e) => handleChange('Applicantdetails', e.target.value)}
                                        className={`form-textarea ${!formData.Applicantdetails && currentStep === 2 ? 'has-error' : ''}`}
                                        rows={6}
                                        maxLength={300}
                                    />
                                    {!formData.Applicantdetails && currentStep === 2 && <span className="error-tooltip">Applicant Details is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Date of joining the organization <span className="text-red">*</span></label>
                                    <input
                                        type="date"
                                        name="Applicantjoining"
                                        value={formData.Applicantjoining}
                                        onChange={(e) => handleChange('Applicantjoining', e.target.value)}
                                        className={`form-input ${!formData.Applicantjoining && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Date of Joining"
                                    />
                                    {!formData.Applicantjoining && currentStep === 2 && <span className="error-tooltip">Date of Joining is required</span>}
                                </div>
                            </div>
                        </div>
                        <div className="step-section">
                            <div className="form-group">
                                <label>Mention the rationale behind applying for this award (emphasis be on quantitative achievements such as cost saving, sale enhancement, efficiency in energy consumption, safety, environment etc.)</label>
                                <p className="note">Write up by applicant (Not more than 300 words)</p>
                                <textarea
                                    name="companyProfile"
                                    value={formData.companyProfile}
                                    onChange={(e) => handleChange('companyProfile', e.target.value)}
                                    className='form-textarea'
                                    rows={6}
                                    maxLength={300}
                                />

                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
                        {part1.map(([num, label, key]) => (
                            <div key={key} className="form-group">
                                <label>
                                    {num}. {label}
                                    {label.includes('(Within 200 words)') && <span> (Within 200 words)</span>}
                                </label>
                                <textarea
                                    name={key}
                                    value={formData[key] || ''}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="form-textarea"
                                    rows={6}
                                    maxLength={200}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {currentStep === 4 && (
                    <div>
                        <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
                        {part2.map(([num, label, key]) => (
                            <div key={key} className="form-group">
                                <label>
                                    {num}. {label}
                                    {label.includes('(Within 200 words)') && <span> (Within 200 words)</span>}
                                </label>
                                <textarea
                                    name={key}
                                    value={formData[key] || ''}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="form-textarea"
                                    rows={6}
                                    maxLength={200}
                                />
                            </div>
                        ))}
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
                                <p>Notes:</p>
                                <ol type="a">
                                    <li>Only two entries are eligible to apply from the same company </li>
                                    <li> Provide details of the approving authority (CMD/MD in case of PSUs and CEO
                                        or equivalent senior executive of private Companies)
                                    </li>
                                    <li>Approving Authority should be informed after each submission of application
                                        through email</li>
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
                <h1>
                    Registration Form: {"Overseas Oil & Gas Company of the Year"}
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

export default RegistrationWE;