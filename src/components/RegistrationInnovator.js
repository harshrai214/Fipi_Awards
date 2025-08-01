import React, { useState, useEffect } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationInnovator = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Innovator of the year (team)',
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
        approvingAuthoritySignature: '',
        declaration: false,
        comment: '',
        // Quantitative fields
        innovator1: "",
        innovator1_1: "",
        innovator1_2: "",
        innovator1_3: "",
        innovator1_4: "",
        innovator1_5: "",
        innovator1_6: "",
        innovator2: "",
        innovator2_1: "",
        innovator2_2: "",
        innovator2_3: "",
        innovator2_4: "",
        innovator3: "",
        innovator3_1: "",
        innovator3_2: "",
        innovator4: "",
        innovator4_1: "",
        innovator4_2: "",
        innovator4_3: "",
        innovatortextbox: "",
        // Team members (max 5)
        member1: "",
        member2: "",
        member3: "",
        member4: "",
        member5: "",
        // Attachments
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
    });
    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    const location = useLocation();
    console.log('location.state:', location.state);
    const awardTitle = location.state?.awardTitle || "Innovator of the year (team)";

    // Track submitted forms per organisation
    useEffect(() => {
        const storedSubmissions = JSON.parse(localStorage.getItem('organisationSubmissions') || '{}');
        if (storedSubmissions[formData.Organisationname]) {
            if (storedSubmissions[formData.Organisationname].length >= 5) {
                setError('Maximum limit of 5 forms reached for this organisation.');
            }
        }
    }, [formData.Organisationname]);

    const handleChange = (name, value, index = null) => {
        if (["authorityName", "contactName"].includes(name)) {
            const isValid = /^[A-Za-z\s]*$/.test(value);
            if (!isValid) return;
        }

        if (index !== null && Array.isArray(formData[name])) {
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
            } else if (name.startsWith('member') && ["member1", "member2", "member3", "member4", "member5"].every(m => formData[m] || (m === name && value))) {
                const filledMembers = ["member1", "member2", "member3", "member4", "member5"].filter(m => formData[m]).length;
                if (filledMembers >= 5 && !formData[name] && value) {
                    setError('Maximum limit of 5 team members reached.');
                    return;
                }
                setFormData(prev => ({ ...prev, [name]: value }));
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

  if (!formData.declaration) {
    alert('Please accept the declaration before submitting.');
    return;
  }
  const org = formData.Organisationname?.trim();
  if (!org) {
    alert('Organisation name is required.');
    return;
  }

  // 1) Check count ≤ 4
  try {
    const res = await fetch(
      `${ACTIVE_API_BASE_URL}/registration-innovator/count/?org=${encodeURIComponent(org)}`
    );
    if (!res.ok) {
      console.error(await res.text());
      alert('Could not verify submission count.');
      return;
    }
    const { count } = await res.json();
    if (count >= 5) {
      alert('you have reach your form limit the max limit is 5 for this form');
      return;
    }
  } catch (err) {
    console.error(err);
    alert(`Network error. Is API running at ${ACTIVE_API_BASE_URL}?`);
    return;
  }

  // 2) Build FormData
  const fd = new FormData();
  fd.append('organisation_name', formData.Organisationname);
  fd.append('category',          formData.category);
  fd.append('company_name',      formData.companyName);
  fd.append('mailing_address',   formData.mailingAddress);

  // Authority & contact
  fd.append('authority_name',    formData.authorityName);
  fd.append('authority_title',   formData.authorityTitle);
  fd.append('authority_phone',   formData.authorityPhone);
  fd.append('authority_email',   formData.authorityEmail);
  fd.append('contact_name',      formData.contactName);
  fd.append('contact_phone',     formData.contactPhone);
  fd.append('contact_email',     formData.contactEmail);

  // Company profile, declaration, comment
  fd.append('company_profile',   formData.companyProfile);
  fd.append('declaration',       formData.declaration);
  fd.append('comment',           formData.comment);

  // Quantitative sections
  [
    'innovator1','innovator1_1','innovator1_2','innovator1_3','innovator1_4','innovator1_5','innovator1_6',
    'innovator2','innovator2_1','innovator2_2','innovator2_3','innovator2_4',
    'innovator3','innovator3_1','innovator3_2',
    'innovator4','innovator4_1','innovator4_2','innovator4_3',
    'innovatortextbox'
  ].forEach(key => {
    fd.append(key, formData[key] || '');
  });

  // Team members
  ['member1','member2','member3','member4','member5'].forEach(key => {
    fd.append(key, formData[key] || '');
  });

  // Files
  if (formData.approvingAuthoritySignature) {
    fd.append('approving_authority_file', formData.approvingAuthoritySignature);
  }
  [1,2,3,4].forEach(n => {
    const slot = formData[`attachments${n}`] || {};
    fd.append(`attachments${n}_desc`, slot.description || '');
    if (slot.file) fd.append(`attachments${n}`, slot.file);
  });

  // 3) POST create
  try {
    const postRes = await fetch(
      `${ACTIVE_API_BASE_URL}/registration-innovator/`,
      { method: 'POST', body: fd }
    );
    const data    = await postRes.json();
    if (!postRes.ok) {
      alert(data.error || 'Submission failed; see console.');
      console.error(data);
      return;
    }
    alert('Submitted successfully!');
    setIsSubmitted(true);
    setCurrentStep(1);
  } catch (err) {
    console.error(err);
    alert(`Network error. Is API running at ${ACTIVE_API_BASE_URL}?`);
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
                <p><strong>Name of the innovation:</strong> ${formData.innovatortextbox || ''}</p>
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
                            <th style="border: 1px solid #000; padding: 8px;">Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${part1.map(([num, label, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
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
                            <th style="border: 1px solid #000; padding: 8px;">Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${part2.map(([num, label, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h2>List of Team Members (Max. 5 entries per company)</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${members.map(([num, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
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
        ['1', 'Tangible benefits of the innovation', 'innovator1'],
        ['1.1', 'Brief description of the innovation along with details of Technology used, Gestation period, financial implication, Innovative practices and the Development lifecycle (inception to implementation). (Max. 300 words)', 'innovator1_1'],
        ['1.2', 'Quantifiable impact of innovation:a. Cost savings b. Operational efficiency gains/improvement in productivity (Please provide data with units, if applicable). (Max. 200 words)', 'innovator1_2'],
        ['1.3', 'Novelty and uniqueness:a. Uniqueness of the innovation.b. Technological challenges that have been overcome.c. Environmental gain accrued.d. New technologies used (especially Digital Technologies). (Max. 400 words).', 'innovator1_3'],
        ['1.4', 'Scalability: Can the innovation be scaled across the oil & gas/energy sector (India/global)? (Max. 100 words).', 'innovator1_4'],
        ['1.5', 'Replicability: Can the innovation be implemented by other companies in the oil & gas/energy sector under similar conditions? (Max. 100 words).', 'innovator1_5'],
        ['1.6', 'Adaptability: Potential for further improvement or adaptation. Could this innovation evolve further? (Max. 100 words).', 'innovator1_6'],
        ['2', 'Intangible Impact', 'innovator2'],
        ['2.1', 'Intangible benefits: Describe impact on the following: (Max. 300 words) a. Health, Safety & Environment (HSE)', 'innovator2_1'],
        ['2.2', 'b. Carbon footprint reduction', 'innovator2_2'],
        ['2.3', 'c. Quality or compliance improvements ', 'innovator2_3'],
        ['2.4', 'd. Energy efficiency', 'innovator2_4'],
    ];

    const part2 = [
        ['3', 'Patents', 'innovator3'],
        ['3.1', 'Number of patents filed for the innovation', 'innovator3_1'],
        ['3.2', 'Number of domestic/international patents granted', 'innovator3_2'],
        ['4', 'Miscellaneous', 'innovator4'],
        ['4.1', 'External partnerships with academia/startups/R&D. (Max. 100 words).', 'innovator4_1'],
        ['4.2', 'Recognition or awards received from external bodies (other than the company itself)', 'innovator4_2'],
    ];
    const members = [
        ['1', "member1"],
        ['2', "member2"],
        ['3', "member3"],
        ['4', "member4"],
        ['5', "member5"],
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
                            {formData.Organisationname && error.includes('Maximum limit') && <span className="error-tooltip">{error}</span>}
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
                        <div className="form-group">
                            <label>Name of the innovation <span className="text-red">*</span></label>
                            <textarea
                                name="innovatortextbox"
                                value={formData.innovatortextbox}
                                onChange={(e) => handleChange('innovatortextbox', e.target.value)}
                                className={`form-textarea ${!formData.innovatortextbox.trim() && currentStep === 1 ? 'has-error' : ''}`}
                                rows={3}
                                placeholder="Enter Name of Innovation"
                            />
                            {!formData.innovatortextbox.trim() && currentStep === 1 && <span className="error-tooltip">Name of innovation is required</span>}
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
                                    <th>Response</th>
                                </tr>
                            </thead>
                            <tbody>
                                {part1.map(([num, label, key]) => (
                                    <tr key={key || label}>
                                        <td>{num}</td>
                                        <td>{label}</td>
                                        <td>
                                            <textarea
                                                value={formData[key] || ''}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                                className="form-textarea"
                                                rows={6}
                                                maxLength={300}
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
                                    <th>Response</th>
                                </tr>
                            </thead>
                            <tbody>
                                {part2.map(([num, label, key]) => (
                                    <tr key={key || label}>
                                        <td>{num}</td>
                                        <td>{label}</td>
                                        <td>
                                            <textarea
                                                value={formData[key] || ''}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                                className="form-textarea"
                                                rows={6}
                                                maxLength={300}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <table className="quant-table">
                            <caption className="table-header">List of Team Members (Max. 5 entries per company)</caption>
                            <p className="note">Note: Only up to 5 team members can be added.</p>
                            {["member1", "member2", "member3", "member4", "member5"].filter(m => formData[m]).length >= 5 && (
                                <p className="error-tooltip">Maximum limit of 5 team members reached.</p>
                            )}
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(([num, key]) => (
                                    <tr key={key}>
                                        <td>{num}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={formData[key] || ''}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                                className="form-input"
                                                disabled={["member1", "member2", "member3", "member4", "member5"].filter(m => formData[m]).length >= 5 && !formData[key]}
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
                                <ul>
                                    <li>The award is open to all Energy Companies operating in India. The information related to Capital Investments, Installed capacities, R&D centres, Patents etc. should pertains to works carried out in India. Any overseas investments and projects will not be considered for evaluation.</li>
                                </ul>
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
                    Registration Form: {awardTitle}
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
                            <button type="button" onClick={nextStep} className="btn btn-primary" disabled={error && error.includes('Maximum limit')}>
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
                                <button type="submit" className="btn btn-success" disabled={error && error.includes('Maximum limit')}>
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

export default RegistrationInnovator;