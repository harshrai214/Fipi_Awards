import React, { useState, useEffect, useCallback } from 'react';
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import apiClient from '../api/axiosClient';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SidebarGuideline from "./SidebarGuideline"
import '../styles/FormProduction.css';
import TextField from "@mui/material/TextField";

// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const TEXTAREA_MAX_LENGTH = 300;
const COMMENT_MAX_LENGTH = 200;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const RegistrationBMP = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  //   const navigate = useNavigate();
  const awardTitle = location.state?.awardTitle || 'Best Managed Project of the Year';

  // Form state initialization
  const [formData, setFormData] = useState({
    Organisationname: '',
    category: 'Best Managed Project of the Year',
    mailingAddress: '',
    projectName: '',
    projectWriteup: '',
    authorityName: '',
    authorityTitle: '',
    authorityPhone: '',
    authorityEmail: '',
    applicant_name: "",
    authorityLandline: "",
    applicant_phone: "",
    applicant_email: "",
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    companyProfile: '',
    awardJustification: '',
    approvingAuthoritySignature: null,
    declaration: false,
    comment: '',
    projectNo: '',
    startDate: '',
    plannedCompletionDate: '',
    actualCompletionDate: '',
    estimatedCost: '',
    actualCost: '',
    projectDescription: '',
    projectUniqueness: '',
    carbonReductionSteps: '',
    fatalities: '',
    lostTimeInjuries: '',
    oshaIncidents: '',
    manHoursOwn: '',
    manHoursContractual: '',
    carbonEmissionProject: '',
    milestones: [
      { name: '', schedule: '', actual: '', budgetedAmount: '', actualAmount: '' },
      { name: '', schedule: '', actual: '', budgetedAmount: '', actualAmount: '' },
      { name: '', schedule: '', actual: '', budgetedAmount: '', actualAmount: '' },
      { name: '', schedule: '', actual: '', budgetedAmount: '', actualAmount: '' },
      { name: '', schedule: '', actual: '', budgetedAmount: '', actualAmount: '' },
    ],
    attachments1: { description: '', file: null },
    attachments2: { description: '', file: null },
    attachments3: { description: '', file: null },
    attachments4: { description: '', file: null },
  });


  const serializeFormForStorage = (fd) => {
    const clone = { ...fd };
    // Convert File objects to simple meta (name & type) so JSON.stringify won't throw.
    if (clone.approvingAuthoritySignature instanceof File) {
      clone.approvingAuthoritySignature = {
        name: clone.approvingAuthoritySignature.name,
        type: clone.approvingAuthoritySignature.type,
      };
    }
    for (let i = 1; i <= 4; i++) {
      const key = `attachments${i}`;
      if (clone[key] && clone[key].file instanceof File) {
        clone[key] = {
          ...clone[key],
          file: {
            name: clone[key].file.name,
            type: clone[key].file.type,
          },
        };
      }
    }
    return clone;
  };

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("user_info");
      if (stored) {
        const user = JSON.parse(stored);
        setFormData((prev) => ({
          ...prev,
          userid: user.id || "",
          firstname: user.first_name || "",
          lastname: user.last_name || "",
          company_name: user.organisation_name || "",
          Organisationname: user.organisation_name || "", // prefill organisation_name field
          // Fill applicant_* only (we DON'T prefill contact_* here)
          applicant_name: user.applicant_name || "",
          applicant_phone: user.applicant_phone || "",
          applicant_email: user.email || "",
        }));
      }
    } catch (err) {
      console.warn("Failed to parse user_info from localStorage:", err);
    }

    // ⭐ ADDED - If dashboard pushed a prefill payload (when user clicked Continue),
    // use it to prefill the form. This key is written by ApplicantDashboard when user continues.
    try {
      const prefillRaw = sessionStorage.getItem('registrationBMP_prefill');
      if (prefillRaw) {
        const prefill = JSON.parse(prefillRaw);
        if (prefill && typeof prefill === 'object') {
          setFormData((prev) => ({ ...prev, ...prefill }));
          if (prefill.step) setCurrentStep(Number(prefill.step));
        }
        // remove after consuming so it doesn't override later edits
        sessionStorage.removeItem('registrationBMP_prefill');
      }
    } catch (err) {
      // ignore parse errors
    }

    // Note: we avoid loading large File objects here — the draft loader below (in another effect) may populate non-file fields.
  }, []);




  // UI State
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedProjectsCount, setSubmittedProjectsCount] = useState(0);
  const [copyApplicantData, setCopyApplicantData] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Validation helpers
  const validateEmail = (email) => emailRegex.test(email);
  const validatePhone = (phone) => phoneRegex.test(phone);
  const validateDate = (date) => !date || dateRegex.test(date);

  // Clear error on field
  const clearFieldError = useCallback((field) => {
    setFieldErrors((prev) => {
      if (prev[field]) {
        const { [field]: omitted, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);
    useEffect(() => {
      try {
        const draftRaw = localStorage.getItem('registrationBMPDraft');
        if (draftRaw) {
          const draft = JSON.parse(draftRaw);
          if (draft?.formData && typeof draft.formData === 'object') {
            setFormData((prev) => ({ ...prev, ...draft.formData }));
          }
          if (draft?.step) {
            // ensure step is within 1..5
            const s = Number(draft.step);
            if (!isNaN(s) && s >= 1 && s <= 5) setCurrentStep(s);
          }
        }
      } catch (err) {
        console.warn('Failed to load draft from localStorage', err);
      }
    }, []);

  // Validate field on blur
  const validateField = (name, value, index = null, milestoneField = null) => {
    let errorMsg = '';
    if (['Organisationname', 'authorityName', 'contact_name', 'projectName', 'projectNo'].includes(name)) {
      if (!value.trim()) {
        errorMsg = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
      } else if (!/^[A-Za-z0-9\s]*$/.test(value)) {
        errorMsg = 'Only letters, numbers, and spaces are allowed.';
      }
    } else if (name === 'mailingAddress' && !value.trim()) {
      errorMsg = 'Mailing address is required.';
    } else if (name === 'projectWriteup' && !value.trim()) {
      errorMsg = 'Project write-up is required.';
    } else if (name === 'authorityEmail') {
      if (!value) {
        errorMsg = 'Authority email is required.';
      } else if (!validateEmail(value)) {
        errorMsg = 'Please enter a valid Authority email.';
      }
    } else if (name === 'contactEmail' && value && !validateEmail(value)) {
      errorMsg = 'Please enter a valid Contact email.';
    } else if (name === 'authorityPhone') {
      if (!value) {
        errorMsg = 'Authority phone is required.';
      } else if (!validatePhone(value)) {
        errorMsg = 'Authority phone must be exactly 10 digits.';
      }
    } else if (name === 'contactPhone' && value && !validatePhone(value)) {
      errorMsg = 'Contact phone must be exactly 10 digits.';
    } else if (['startDate', 'plannedCompletionDate', 'actualCompletionDate'].includes(name)) {
      if (value && !validateDate(value)) {
        errorMsg = 'Please enter a valid date in YYYY-MM-DD format.';
      }
    } else if (['comment', 'projectDescription', 'projectUniqueness', 'carbonReductionSteps'].includes(name) && value.length > COMMENT_MAX_LENGTH) {
      errorMsg = `Field must not exceed ${COMMENT_MAX_LENGTH} characters.`;
    }
    // } else if (name === 'milestones' && index !== null && milestoneField) {
    //   const fieldName = `milestones[${index}].${milestoneField}`;
    //   if (['name', 'schedule', 'actual', 'budgetedAmount', 'actualAmount'].includes(milestoneField) && !value) {
    //     errorMsg = `Milestone ${index + 1} ${milestoneField.replace(/([A-Z])/g, ' $1').trim()} is required.`;
    //   } else if (milestoneField === 'name' && value && !/^[A-Za-z0-9\s]*$/.test(value)) {
    //     errorMsg = 'Milestone name can only contain letters, numbers, and spaces.';
    //   } else if (['schedule', 'actual'].includes(milestoneField) && value && !validateDate(value)) {
    //     errorMsg = 'Please enter a valid date in YYYY-MM-DD format.';
    //   } else if (['budgetedAmount', 'actualAmount'].includes(milestoneField) && value && (isNaN(value) || Number(value) < 0)) {
    //     errorMsg = 'Value must be a non-negative number.';
    //   }
    //   return errorMsg ? { field: fieldName, message: errorMsg } : null;
    // }
    // return errorMsg;
  };

  // Handle blur for validation
  const handleBlur = (name, value, index = null, milestoneField = null) => {
    const result = validateField(name, value, index, milestoneField);
    if (result) {
      const field = milestoneField ? result.field : name;
      const message = milestoneField ? result.message : result;
      setFieldErrors((prev) => ({ ...prev, [field]: message }));
    } else {
      clearFieldError(milestoneField ? `milestones[${index}].${milestoneField}` : name);
    }
  };

  // Handle changes for inputs/textareas/selects
  const handleChange = (name, value, index = null, milestoneField = null) => {
    if ([1, 2, 3, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (['projectWriteup'].includes(name)) {
        applicableMaxLength = TEXTAREA_MAX_LENGTH;
      } else if (['comment', 'projectDescription', 'projectUniqueness', 'carbonReductionSteps'].includes(name)) {
        applicableMaxLength = COMMENT_MAX_LENGTH;
      }

      if (typeof value === 'string') {
        if (name === 'comment') {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            alert("Maximum 200 words allowed in Comments.");
            return;
          }
        }
        else if (name === 'projectWriteup') {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words are allowed ");
            return;
          }
        }
        else if (name === 'projectDescription') {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            alert("Maximum 200 words allowed in Comments.");
            return;
          }
        }
        else if (name === 'projectUniqueness') {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            alert("Maximum 200 words allowed in Comments.");
            return;
          }
        }
        else if (name === 'carbonReductionSteps') {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            alert("Maximum 200 words allowed in Comments.");
            return;
          }
        }
        else if (value.length > applicableMaxLength) {
          alert(`Value cannot exceed ${applicableMaxLength} characters.`);
          return;
        }
      }
    }

    // Name validation
    if (['Organisationname', 'authorityName', 'contact_name', 'projectName', 'projectNo'].includes(name)) {
      const isValid = /^[A-Za-z0-9\s]*$/.test(value);
      if (!isValid && value !== '') {
        alert('Only letters, numbers, and spaces are allowed.');
        return;
      }
    }

    // Phone validation
    if (['authorityPhone', 'contact_phone'].includes(name)) {
      const numericValue = value.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH);
      if (numericValue.length > PHONE_MAX_LENGTH) {
        alert('Phone number must not exceed 10 digits.');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      clearFieldError(name);
      return;
    }

    // Date validation
    if (['startDate', 'plannedCompletionDate', 'actualCompletionDate'].includes(name)) {
      if (value && !validateDate(value)) {
        alert('Please enter a valid date in YYYY-MM-DD format.');
        return;
      }
    }

    // Quantitative fields validation
    const quantFields = [
      'estimatedCost', 'actualCost', 'fatalities', 'lostTimeInjuries',
      'oshaIncidents', 'manHoursOwn', 'manHoursContractual', 'carbonEmissionProject'
    ];
    if (quantFields.includes(name)) {
      if (value === '' || (Number(value) >= 0 && !isNaN(value))) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        clearFieldError(name);
      } else {
        alert('Value must be a non-negative number.');
        return;
      }
      return;
    }

    // Milestone fields
    if (name === 'milestones' && index !== null && milestoneField) {
      const isNumberField = ['budgetedAmount', 'actualAmount'].includes(milestoneField);
      if (isNumberField && value !== '' && (isNaN(value) || Number(value) < 0)) {
        alert('Value must be a non-negative number.');
        return;
      }
      if (milestoneField === 'name' && value !== '' && !/^[A-Za-z0-9\s]*$/.test(value)) {
        alert('Milestone name can only contain letters, numbers, and spaces.');
        return;
      }
      if (['schedule', 'actual'].includes(milestoneField) && value && !validateDate(value)) {
        alert('Please enter a valid date in YYYY-MM-DD format.');
        return;
      }
      setFormData((prev) => {
        const updatedMilestones = [...prev.milestones];
        updatedMilestones[index] = { ...updatedMilestones[index], [milestoneField]: value };
        return { ...prev, milestones: updatedMilestones };
      });
      clearFieldError(`milestones[${index}].${milestoneField}`);
      return;
    }

    // Default handling
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === 'boolean' ? value : value || '',
    }));
    clearFieldError(name);
  };

  // Handle checkbox for copying applicant data

  const handleCopyApplicantToggle = (e) => {
    const checked = e.target.checked;
    setCopyApplicantData(checked);

    if (checked) {
      // Read latest user_info directly from localStorage (as requested)
      let user = {};
      try {
        const raw = localStorage.getItem("user_info");
        if (raw) user = JSON.parse(raw);
      } catch (err) {
        console.warn("Failed to parse user_info from localStorage on copy toggle:", err);
      }

      // Prefer user.applicant_name & user.applicant_phone & user.email, but fallback to formData applicant fields
      setFormData((prev) => ({
        ...prev,
        contact_name: user.applicant_name || prev.applicant_name || "",
        contact_phone: user.applicant_phone || prev.applicant_phone || "",
        contact_email: user.email || prev.applicant_email || "",
      }));

      // Remove any validation errors on those fields
      clearFieldError("contact_name");
      clearFieldError("contact_phone");
      clearFieldError("contact_email");
    } else {
      // When unchecked: clear contact_* so user can manually enter
      setFormData((prev) => ({
        ...prev,
        contact_name: "",
        contact_phone: "",
        contact_email: "",
      }));
      clearFieldError("contact_name");
      clearFieldError("contact_phone");
      clearFieldError("contact_email");
    }
  };

  // Keep contact fields in sync if checkbox ON and applicant fields (or localStorage) change
  // This effect reads live values from localStorage to honor "pick data from localStorage" requirement.
  useEffect(() => {
    if (!copyApplicantData) return;

    let user = {};
    try {
      const raw = localStorage.getItem("user_info");
      if (raw) user = JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to parse user_info from localStorage in sync effect:", err);
    }

    setFormData((prev) => ({
      ...prev,
      contact_name: user.applicant_name || prev.applicant_name || "",
      contact_phone: user.applicant_phone || prev.applicant_phone || "",
      contact_email: user.email || prev.applicant_email || "",
    }));

    clearFieldError("contact_name");
    clearFieldError("contact_phone");
    clearFieldError("contact_email");
    // We intentionally do not add formData.* to the dependency array here that would cause infinite loops.
    // The dependency below ensures we re-run when copyApplicantData toggles.
  }, [copyApplicantData, clearFieldError]);


  // Handle attachment changes
  const handleAttachmentChange = (key, field, value, event = null) => {
    if (field === 'file' && value) {
      const file = value;
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, and PDF files are allowed for attachments.');
        if (event) event.target.value = null;
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert('File size must not exceed 5 MB for attachments.');
        if (event) event.target.value = null;
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
    clearFieldError(key);
  };

  // Handle approving authority signature upload
  const handleApprovingAuthorityChange = (files) => {
    const file = files[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, and PDF files are allowed for the signature.');
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert('File size must not exceed 5 MB for the signature.');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        approvingAuthoritySignature: file,
      }));
      clearFieldError('approvingAuthoritySignature');
    }
  };

  // Project details for Step 3
  const projectDetails = [
    // ['Project No.', 'projectNo', 'text'],
    ["1", 'Name of the Project', 'projectName', 'text'],
    ["2", 'Start Date', 'startDate', 'date'],
    ["3", 'Initial Planned Completion Date', 'plannedCompletionDate', 'date'],
    ["4", 'Actual Completion Date', 'actualCompletionDate', 'date'],
    ["5", 'Estimated Cost of the Project (INR Crore)', 'estimatedCost', 'number'],
    ["6", 'Actual Cost of the Project (INR Crore)', 'actualCost', 'number'],
    ["7", 'Brief description of the Project (200 words) ', 'projectDescription', 'textarea'],
    ["8", 'Uniqueness of the Project (including financial, technological and environmental challenges) within 200 words  ', 'projectUniqueness', 'textarea'],
    ["9", 'No. of Fatalities (in 2024-25)', 'fatalities', 'number'],
    ["10", 'Number of Lost Time Injuries (in 2024-25)', 'lostTimeInjuries', 'number'],
    ["11", 'Number of OSHA Recordable Incidents (in 2024-25)', 'oshaIncidents', 'number'],
    ["12", 'Total Man Hours Worked (Own Employees)', 'manHoursOwn', 'number'],
    ["13", 'Total Man Hours Worked (Contractual Employees)', 'manHoursContractual', 'number'],
    ["14", 'Carbon Emission During Project Execution Period (Tonne) ', 'carbonEmissionProject', 'number'],

    ["15", 'Steps taken to reduce Carbon Footprint (Top Five; 200 words) ', 'carbonReductionSteps', 'textarea'],
  ];

 

  const handlePrint = () => {
    const submissionDate = new Date('2025-08-06T01:46:00+05:30').toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });

    const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
      <p style="text-align: center;">Submission Date and Time: ${submissionDate}</p>
      <h2>Organization & Contact Details</h2>
      <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
      <p><strong>Postal Address:</strong> ${formData.mailingAddress || ''}</p>
      <p><strong>Project Name:</strong> ${formData.projectName || ''}</p>
      <p><strong>Project Write-up:</strong> ${formData.projectWriteup || ''}</p>
      <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ""}</p>
      <p><strong>Approving Authority Title:</strong> ${formData.authorityTitle || ""}</p>
      <p><strong>Approving Authority Phone:</strong> ${formData.authorityPhone || ""}</p>
      <p><strong>Approving Authority Email:</strong> ${formData.authorityEmail || ""}</p>

      <h2>Nodal Official Contact Details:</h2>
      <p><strong>Contact Name:</strong> ${formData.contact_name || ''}</p>
      <p><strong>Contact Phone:</strong> ${formData.contact_phone || ''}</p>
      <p><strong>Contact Email:</strong> ${formData.contact_email || ''}</p>

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
              <td style="border: 1px solid #000; padding: 8px;">${formData[key] || ''}</td>
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
            <th style="border: 1px solid #000; padding: 8px;">Schedule Completion</th>
            <th style="border: 1px solid #000; padding: 8px;">Actual Completion</th>
            <th style="border: 1px solid #000; padding: 8px;">Budgeted Amount (INR Crore)</th>
            <th style="border: 1px solid #000; padding: 8px;">Actual Amount (INR Crore)</th>
          </tr>
        </thead>
        <tbody>
          ${formData.milestones.map((milestone) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${milestone.name || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${milestone.schedule || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${milestone.actual || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${milestone.budgetedAmount || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${milestone.actualAmount || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Attachments</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Description</th>
            <th style="border: 1px solid #000; padding: 8px;">File Name</th>
          </tr>
        </thead>
        <tbody>
          ${[1, 2, 3, 4].map((i) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${i}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].description || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].file?.name || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Comments</h2>
      <p>${formData.comment || ''}</p>
      <h2>Declaration</h2>
      <p>I declare that the information submitted is true and complete.</p>
      <br/>
      <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ""}</p>
      <p><strong>Approving Authority Title:</strong> ${formData.authorityTitle || ""}</p>
      <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
      <p><strong>Approving Authority Signature:</strong></p>
    </div>
  `;

    const printWindow = window.open("", "_blank", "height=600,width=800");
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${awardTitle || "Form Print"}</title>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.print();
  };

  // Check for empty fields in Step 3
  const hasEmptyFieldsStep3 = () => {
    const requiredFields = [
      'projectNo', 'projectName', 'startDate', 'plannedCompletionDate',
      'actualCompletionDate', 'estimatedCost', 'actualCost'
    ];
    for (const key of requiredFields) {
      if (!formData[key] && formData[key] !== '0') {
        return true;
      }
    }
    return false;
  };

  // Check for empty fields in Step 4
  const hasEmptyFieldsStep4 = () => {
    for (const milestone of formData.milestones) {
      if (
        !milestone.name ||
        !milestone.schedule ||
        !milestone.actual ||
        milestone.budgetedAmount === '' || milestone.budgetedAmount == null ||
        milestone.actualAmount === '' || milestone.actualAmount == null
      ) {
        return true;
      }
    }
    return false;
  };

  // Navigation handlers
  const nextStep = () => {
    const errors = {};
    if (currentStep === 1) {
      if (!formData.Organisationname) {
        errors.Organisationname = 'Organisation name is required.';
      }
      if (!formData.mailingAddress?.trim()) {
        errors.mailingAddress = 'Mailing address is required.';
      }
    }
    if (currentStep === 2) {
      if (!formData.authorityName) {
        errors.authorityName = 'Authority name is required.';
      }
      if (!formData.authorityTitle) {
        errors.authorityTitle = 'Authority designation is required.';
      }
      if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
        errors.authorityEmail = 'Please enter a valid Authority email.';
      }
      if (!formData.authorityLandline) {
        alert('Authority Landline is required.');
        return;
      }
      if (!formData.contact_name) {
        errors.contact_name = 'Contact name is required.';
      }
      if (formData.contact_email && !validateEmail(formData.contact_email)) {
        errors.contact_email = 'Please enter a valid Contact email.';
      }
      if (formData.contact_phone && !validatePhone(formData.contact_phone) && !copyApplicantData) {
        errors.contact_phone = 'Contact phone must be exactly 10 digits.';
      }
    }
    if (currentStep === 3 && hasEmptyFieldsStep3()) {
      if (!window.confirm('Data not entered, If you wish to continue?')) {
        return;
      }
    }
    if (currentStep === 4 && hasEmptyFieldsStep4()) {
      if (!window.confirm('Data not entered, If you wish to continue?')) {
        return;
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      alert(Object.values(errors)[0]);
      return;
    }

    if (submittedProjectsCount >= 2) {
      alert('You have already submitted the maximum of 2 projects.');
      return;
    }

    setError('');
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const saveDraft = () => {
    try {
      const draftToStore = {
        formData: serializeFormForStorage(formData), // ⭐ ADDED - store a safe copy
        step: currentStep, // ⭐ ADDED - persist current step so user returns to same step
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem('registrationBMPDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

  // helper for YYYY-MM-DD formatting
  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Declaration check
    if (!formData.declaration) {
      alert("Please accept the declaration before submitting.");
      return;
    }

    const org = formData.Organisationname?.trim();
    if (!org) {
      alert("Organisation name is required.");
      return;
    }

    // Submission limit check
    try {
      // const res = await apiClient.get(
      //   `/registration-bmp/count/?org=${encodeURIComponent(org)}`
      // );
      // if (res.data.count >= 2) {
      //   alert("You have reached the form limit. Max 2 submissions allowed.");
      //   return;
      // }
    } catch (err) {
      console.error("Count check failed:", err.response || err);
      alert("Could not verify submission count.");
      return;
    }

    const fd = new FormData();

    // Basic info
    fd.append("organisation_name", formData.Organisationname);
    fd.append("category", formData.category);
    fd.append("company_name", formData.companyName);
    fd.append("mailing_address", formData.mailingAddress);
    fd.append("project_name", formData.projectName);
    fd.append("project_writeup", formData.projectWriteup);

    fd.append("authority_name", formData.authorityName);
    fd.append("authority_title", formData.authorityTitle);
    fd.append("authority_phone", formData.authorityPhone);
    fd.append("authority_email", formData.authorityEmail);

    fd.append("contact_name", formData.contact_name);
    fd.append("contact_phone", formData.contact_phone);
    fd.append("contact_email", formData.contact_email);

    fd.append("company_profile", formData.companyProfile);
    fd.append("award_justification", formData.awardJustification);
    fd.append("comment", formData.comment);
    fd.append("declaration", formData.declaration);

    // Quantitative part 1
    fd.append("project_no", formData.projectNo);
    fd.append("start_date", formatDate(formData.startDate));
    fd.append("planned_completion_date", formatDate(formData.plannedCompletionDate));
    fd.append("actual_completion_date", formatDate(formData.actualCompletionDate));
    fd.append("estimated_cost", formData.estimatedCost);
    fd.append("actual_cost", formData.actualCost);
    fd.append("project_description", formData.projectDescription);
    fd.append("project_uniqueness", formData.projectUniqueness);
    fd.append("fatalities", formData.fatalities);
    fd.append("lost_time_injuries", formData.lostTimeInjuries);
    fd.append("osha_incidents", formData.oshaIncidents);
    fd.append("man_hours_own", formData.manHoursOwn);
    fd.append("man_hours_contractual", formData.manHoursContractual);
    fd.append("carbon_emission_project", formData.carbonEmissionProject);
    fd.append("carbon_reduction_steps", formData.carbonReductionSteps);

    // Milestones - from array
    formData.milestones.forEach((m, idx) => {
      const n = idx + 1; // milestone1, milestone2, ...
      fd.append(`milestone${n}_name`, m.name);
      fd.append(`milestone${n}_schedule`, formatDate(m.schedule));
      fd.append(`milestone${n}_actual`, formatDate(m.actual));
      fd.append(`milestone${n}_budget`, m.budgetedAmount);
      fd.append(`milestone${n}_actual_amt`, m.actualAmount);
    });

    // Files
    if (formData.approvingAuthoritySignature instanceof File) {
      fd.append("approving_authority_file", formData.approvingAuthoritySignature);
    }

    [1, 2, 3, 4].forEach((n) => {
      const slot = formData[`attachments${n}`] || {};
      fd.append(`attachments${n}_desc`, slot.description || "");
      if (slot.file instanceof File) {
        fd.append(`attachments${n}`, slot.file);
      }
    });

    try {
      // await apiClient.post("/registration-bmp/", fd, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });



      try {
        localStorage.removeItem('registrationCBGDraft');
      } catch (err) {
        // ignore
      }
      alert("Submitted successfully!");
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err.response || err);
      const msg =
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        err.message;
      alert("Submission failed: " + msg);
    }
  };




  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;
    return (
      <div className="form-step" role="region" aria-label={`Step ${currentStep} of 5`}>
        <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>

        {currentStep === 1 && (
          <div>
            <h3 className="step-title">Step 1: Organization Details</h3>
            <div className="form-group">
              <label htmlFor="Organisationname">
                Organisation Name
                {/* <span aria-hidden="true" className="text-red">*</span> */}
              </label>
              <input
                id="Organisationname"
                type="text"
                name="Organisationname"
                maxLength={FIELD_MAX_LENGTH}
                value={formData.Organisationname}
                onChange={(e) => handleChange('Organisationname', e.target.value)}
                // disabled ={true}
                onBlur={(e) => handleBlur('Organisationname', e.target.value)}
                className={`form-input ${fieldErrors.Organisationname ? 'has-error' : ''}`}
                placeholder="Enter organisation name"
                aria-required="true"
                aria-describedby="Organisationname-error"
              />
              {fieldErrors.Organisationname && (
                <span className="error-tooltip" id="Organisationname-error" role="alert">
                  {fieldErrors.Organisationname}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="mailingAddress">
                Postal Address <span aria-hidden="true" className="text-red">*</span>
              </label>
              <textarea
                id="mailingAddress"
                name="mailingAddress"
                maxLength={FIELD_MAX_LENGTH}
                value={formData.mailingAddress}
                onChange={(e) => handleChange('mailingAddress', e.target.value)}
                onBlur={(e) => handleBlur('mailingAddress', e.target.value)}
                className={`form-textarea ${fieldErrors.mailingAddress ? 'has-error' : ''}`}
                rows={3}
                placeholder="Enter postal address"
                aria-required="true"
                aria-describedby="mailingAddress-error"
              />
              {fieldErrors.mailingAddress && (
                <span className="error-tooltip" id="mailingAddress-error" role="alert">
                  {fieldErrors.mailingAddress}
                </span>
              )}
            </div>

          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="step-title">Step 2: Approving Authority & Contact</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section aria-labelledby="approving-authority-heading" className="step-section">
                <h4 id="approving-authority-heading">Approving Authority</h4>
                <p className="note">Approving authority should be concerned  Director /Board level executive. </p>
                <div className="form-group">
                  <label htmlFor="authorityName">
                    Name <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="authorityName"
                    type="text"
                    name="authorityName"
                    value={formData.authorityName}
                    onChange={(e) => handleChange('authorityName', e.target.value)}
                    onBlur={(e) => handleBlur('authorityName', e.target.value)}
                    className={`form-input ${fieldErrors.authorityName ? 'has-error' : ''}`}
                    placeholder="Name"
                    aria-required="true"
                    aria-describedby="authorityName-error"
                  />
                  {fieldErrors.authorityName && (
                    <span className="error-tooltip" id="authorityName-error" role="alert">
                      {fieldErrors.authorityName}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityTitle">
                    Designation <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="authorityTitle"
                    type="text"
                    name="authorityTitle"
                    value={formData.authorityTitle}
                    onChange={(e) => handleChange('authorityTitle', e.target.value)}
                    onBlur={(e) => handleBlur('authorityTitle', e.target.value)}
                    className={`form-input ${fieldErrors.authorityTitle ? 'has-error' : ''}`}
                    placeholder="Designation"
                    aria-required="true"
                    aria-describedby="authorityTitle-error"
                  />
                  {fieldErrors.authorityTitle && (
                    <span className="error-tooltip" id="authorityTitle-error" role="alert">
                      {fieldErrors.authorityTitle}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityPhone">
                    Landline: <span className="text-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="authorityLandline"
                    type="number"
                    name="authorityLandline"
                    value={formData.authorityLandline}
                    onChange={(e) => handleChange('authorityLandline', e.target.value)}
                    // onBlur={(e) => handleBlur('authorityLandline', e.target.value)}
                    className={`form-input ${!formData.authorityLandline && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="Landline number"
                    aria-required="true"
                    aria-describedby={fieldErrors.authorityLandline ? 'authorityLandline-error' : undefined}
                  />
                  {!formData.authorityLandline && currentStep === 2 && <span className="error-tooltip">Authority Landline Number is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityPhone">
                    Mobile:
                    {/* <span className="text-red" aria-hidden="true">*</span> */}
                  </label>
                  <input
                    id="authorityPhone"
                    type="tel"
                    name="authorityPhone"
                    value={formData.authorityPhone}
                    onChange={(e) => handleChange('authorityPhone', e.target.value)}
                    // onBlur={(e) => handleBlur('authorityPhone', e.target.value)}
                    className={`form-input`}
                    placeholder="Phone number"
                    maxLength={PHONE_MAX_LENGTH}
                    aria-required="true"
                  // aria-describedby={fieldErrors.authorityPhone ? 'authorityPhone-error' : undefined}
                  />
                </div>
                {/* <div className="form-group">
                                    <label htmlFor="authorityPhone">
                                        Landline: <span className="text-red" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="authorityLandline"
                                        type="number"
                                        name="authorityLandline"
                                        value={formData.authorityLandline}
                                        onChange={handleChange}
                                        // onBlur={(e) => handleBlur('authorityLandline', e.target.value)}
                                        className={`form-input ${!formData.authorityLandline && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Landline number"
                                        aria-required="true"
                                        aria-describedby={fieldErrors.authorityLandline ? 'authorityLandline-error' : undefined}
                                    />
                                    {!formData.authorityLandline && currentStep === 2 && <span className="error-tooltip">Authority Landline Number is required</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="authorityPhone">
                                        Mobile: <span className="text-red" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="authorityPhone"
                                        type="tel"
                                        name="authorityPhone"
                                        value={formData.authorityPhone}
                                        onChange={handleChange}
                                        // onBlur={(e) => handleBlur('authorityPhone', e.target.value)}
                                        className={`form-input`}
                                        placeholder="Phone number"
                                        maxLength={PHONE_MAX_LENGTH}
                                        aria-required="true"
                                    // aria-describedby={fieldErrors.authorityPhone ? 'authorityPhone-error' : undefined}
                                    />
                                </div> */}

                <div className="form-group">
                  <label htmlFor="authorityEmail">
                    Email:{" "}
                    <span className="text-red" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="authorityEmail"
                    type="email"
                    name="authorityEmail"
                    value={formData.authorityEmail}
                    onChange={(e) =>
                      handleChange("authorityEmail", e.target.value)
                    }
                    onBlur={(e) => handleBlur("authorityEmail", e.target.value)}
                    className={`form-input ${fieldErrors.authorityEmail ? "has-error" : ""
                      }`}
                    placeholder="E-mail address"
                    maxLength={FIELD_MAX_LENGTH}
                    aria-describedby="authorityEmail-error"
                    required
                  />
                  {fieldErrors.authorityEmail && (
                    <span
                      className="error-tooltip"
                      id="authorityEmail-error"
                      role="alert"
                    >
                      {fieldErrors.authorityEmail}
                    </span>
                  )}
                </div>

              </section>
              <section aria-labelledby="contacts-heading" className="step-section">
                <h4 id="contacts-heading">Contacts (Nodal Officials) <span aria-hidden="true" className="text-red">*</span></h4>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="copyApplicantData"
                      checked={copyApplicantData}
                      onChange={handleCopyApplicantToggle}
                      className="form-checkbox"
                    />{" "}
                    Same as applicant
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="contact_name">
                    Name <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="contact_name"
                    name="contact_name"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contact_name}
                    onChange={(e) => handleChange("contact_name", e.target.value)}
                    placeholder="Contact name"
                    disabled={copyApplicantData}
                    className={`form-input ${!formData.contact_name && currentStep === 2 ? "has-error" : ""}`}
                    aria-describedby="contact_name-error"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_phone">
                    Phone:<span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="contact_phone"
                    name="contact_phone"
                    type="tel"
                    maxLength={PHONE_MAX_LENGTH}
                    value={formData.contact_phone}
                    onChange={(e) => handleChange("contact_phone", e.target.value)}
                    aria-describedby="contact_phone-error"
                    disabled={copyApplicantData}
                    placeholder="10-digit phone number"
                    className={`form-input ${!formData.contact_phone && currentStep === 2 ? "has-error" : ""}`}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_email">Email</label>
                  <input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contact_email}
                    onChange={(e) => handleChange("contact_email", e.target.value)}
                    placeholder="Contact email"
                    disabled={copyApplicantData}
                    className={`form-input ${fieldErrors.contact_email ? "has-error" : ""}`}
                    aria-describedby="contact_email-error"
                  />
                </div>
              </section>
            </div>

          </div>
        )}

        {/* {currentStep === 3 && (
          <div>
            <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
            <h4 className="mt-6">Project Details</h4>
            <table className="quant-table">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Particulars</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                {projectDetails.map(([num, label, key, type]) => (
                  <tr key={key}>
                    <td>{num}</td>
                    <td>{label}</td>
                    <td>
                      {type === 'textarea' ? (
                        <textarea
                          value={formData[key] || ''}
                          onChange={(e) => handleChange(key, e.target.value)}
                          onBlur={(e) => handleBlur(key, e.target.value)}
                          className={`form-textarea ${fieldErrors[key] ? 'has-error' : ''}`}
                          rows={4}
                          // maxLength={COMMENT_MAX_LENGTH}

                          aria-label={label}
                          aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                        />
                      ) : (
                        <input
                          type={type}
                          name={key}
                          value={formData[key] || ''}
                          onChange={(e) => {
                            if (type === 'number' && (e.target.value.startsWith('-') || e.target.value.toLowerCase().includes('e'))) {
                              return;
                            }
                            handleChange(key, e.target.value);
                          }}
                          onBlur={(e) => handleBlur(key, e.target.value)}
                          className={`form-input ${fieldErrors[key] ? 'has-error' : ''} ${type === 'number' ? 'no-spinner' : ''}`}
                          min={type === 'number' ? '0' : undefined}
                          onKeyDown={(e) => {
                            if (type === 'number' && (e.key === '-' || e.key === 'e' || e.key === 'E')) {
                              e.preventDefault();
                            }
                          }}
                          aria-label={label}
                          aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                        />
                      )}
                      {fieldErrors[key] && (
                        <span id={`${key}-error`} className="error-tooltip" role="alert">
                          {fieldErrors[key]}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}
        
{currentStep === 3 && (
  <div>
    <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
    <h4 className="mt-6">Project Details</h4>
    <table className="quant-table">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Particulars</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {projectDetails.map(([num, label, key, type]) => (
          <tr key={key}>
            <td>{num}</td>
            <td>{label}</td>
            <td>
              {/* Render based on type */}
              {type === "textarea" ? (
                <textarea
                  value={formData[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onBlur={(e) => handleBlur(key, e.target.value)}
                  className={`form-box ${fieldErrors[key] ? "has-error" : ""}`}
                  rows={4}
                  aria-label={label}
                  aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                />
              ) : type === "number" ? (
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={(e) => {
                    // Allow only integers and decimals
                    if (/^\d*\.?\d*$/.test(e.target.value)) {
                      handleChange(key, e.target.value);
                    }
                  }}
                  onBlur={(e) => handleBlur(key, e.target.value)}
                  className={`form-box ${fieldErrors[key] ? "has-error" : ""}`}
                  aria-label={label}
                  aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                />
              ) : type === "date" ? (
                <input
                  type="date"
                  name={key}
                  value={formData[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onBlur={(e) => handleBlur(key, e.target.value)}
                  className={`form-box ${fieldErrors[key] ? "has-error" : ""}`}
                  aria-label={label}
                  aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onBlur={(e) => handleBlur(key, e.target.value)}
                  className={`form-box ${fieldErrors[key] ? "has-error" : ""}`}
                  aria-label={label}
                  aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                />
              )}

              {/* Error tooltip */}
              {fieldErrors[key] && (
                <span
                  id={`${key}-error`}
                  className="error-tooltip"
                  role="alert"
                >
                  {fieldErrors[key]}
                </span>
              )}
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
            <table className="quant-table">
              <thead>
                <tr>
                  <th colSpan="1">16</th>
                  <th colSpan="7">
                    <p className="tablerowq">
                      Major milestones of the project decided upfront
                    </p>
                  </th>
                </tr>
              </thead>

              <thead>
                <tr>
                  <th scope="col">Milestone Name</th>
                  <th scope="col">Schedule Completion (Months)</th>
                  <th scope="col">Actual Completion (Months) </th>
                  <th scope="col">Budgeted Amount (INR Crore)</th>
                  <th scope="col">Actual Amount (INR Crore)</th>
                </tr>
              </thead>
              <tbody>
                {formData.milestones.map((milestone, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name={`milestones[${index}].name`}
                        value={milestone.name || ''}
                        onChange={(e) => handleChange('milestones', e.target.value, index, 'name')}
                        onBlur={(e) => handleBlur('milestones', e.target.value, index, 'name')}
                        className={`form-input ${fieldErrors[`milestones[${index}].name`] ? 'has-error' : ''}`}
                        maxLength={FIELD_MAX_LENGTH}
                        aria-label={`Milestone ${index + 1} Name`}
                        aria-describedby={fieldErrors[`milestones[${index}].name`] ? `milestone-${index}-name-error` : undefined}
                      />
                      {fieldErrors[`milestones[${index}].name`] && (
                        <span id={`milestone-${index}-name-error`} className="error-tooltip" role="alert">
                          {fieldErrors[`milestones[${index}].name`]}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="date"
                        name={`milestones[${index}].schedule`}
                        value={milestone.schedule || ''}
                        onChange={(e) => handleChange('milestones', e.target.value, index, 'schedule')}
                        onBlur={(e) => handleBlur('milestones', e.target.value, index, 'schedule')}
                        className={`form-input ${fieldErrors[`milestones[${index}].schedule`] ? 'has-error' : ''}`}
                        aria-label={`Milestone ${index + 1} Schedule Completion`}
                        aria-describedby={fieldErrors[`milestones[${index}].schedule`] ? `milestone-${index}-schedule-error` : undefined}
                      />
                      {fieldErrors[`milestones[${index}].schedule`] && (
                        <span id={`milestone-${index}-schedule-error`} className="error-tooltip" role="alert">
                          {fieldErrors[`milestones[${index}].schedule`]}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="date"
                        name={`milestones[${index}].actual`}
                        value={milestone.actual || ''}
                        onChange={(e) => handleChange('milestones', e.target.value, index, 'actual')}
                        onBlur={(e) => handleBlur('milestones', e.target.value, index, 'actual')}
                        className={`form-input ${fieldErrors[`milestones[${index}].actual`] ? 'has-error' : ''}`}
                        aria-label={`Milestone ${index + 1} Actual Completion`}
                        aria-describedby={fieldErrors[`milestones[${index}].actual`] ? `milestone-${index}-actual-error` : undefined}
                      />
                      {fieldErrors[`milestones[${index}].actual`] && (
                        <span id={`milestone-${index}-actual-error`} className="error-tooltip" role="alert">
                          {fieldErrors[`milestones[${index}].actual`]}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        name={`milestones[${index}].budgetedAmount`}
                        value={milestone.budgetedAmount || ''}
                        onChange={(e) => handleChange('milestones', e.target.value, index, 'budgetedAmount')}
                        onBlur={(e) => handleBlur('milestones', e.target.value, index, 'budgetedAmount')}
                        className={`form-input no-spinner ${fieldErrors[`milestones[${index}].budgetedAmount`] ? 'has-error' : ''}`}
                        min="0"
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                            e.preventDefault();
                          }
                        }}
                        aria-label={`Milestone ${index + 1} Budgeted Amount`}
                        aria-describedby={fieldErrors[`milestones[${index}].budgetedAmount`] ? `milestone-${index}-budgetedAmount-error` : undefined}
                      />
                      {fieldErrors[`milestones[${index}].budgetedAmount`] && (
                        <span id={`milestone-${index}-budgetedAmount-error`} className="error-tooltip" role="alert">
                          {fieldErrors[`milestones[${index}].budgetedAmount`]}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        name={`milestones[${index}].actualAmount`}
                        value={milestone.actualAmount || ''}
                        onChange={(e) => handleChange('milestones', e.target.value, index, 'actualAmount')}
                        onBlur={(e) => handleBlur('milestones', e.target.value, index, 'actualAmount')}
                        className={`form-input no-spinner ${fieldErrors[`milestones[${index}].actualAmount`] ? 'has-error' : ''}`}
                        min="0"
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                            e.preventDefault();
                          }
                        }}
                        aria-label={`Milestone ${index + 1} Actual Amount`}
                        aria-describedby={fieldErrors[`milestones[${index}].actualAmount`] ? `milestone-${index}-actualAmount-error` : undefined}
                      />
                      {fieldErrors[`milestones[${index}].actualAmount`] && (
                        <span id={`milestone-${index}-actualAmount-error`} className="error-tooltip" role="alert">
                          {fieldErrors[`milestones[${index}].actualAmount`]}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form-group">
              <label htmlFor="comment">Comments</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                onBlur={(e) => handleBlur('comment', e.target.value)}
                className={`form-textarea ${fieldErrors.comment ? 'has-error' : ''}`}
                // maxLength={COMMENT_MAX_LENGTH}
                placeholder="Comments in (200 words) against input parameter, if any"
                aria-describedby="comment-error"
                rows={4}
              />
              {fieldErrors.comment && (
                <span id="comment-error" className="error-tooltip" role="alert">
                  {fieldErrors.comment}
                </span>
              )}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h3 className="step-title">Step 5: Attachments & Declaration</h3>
            <div className="form-group">
              <label>List of Attachments (Optional):</label>
              <table className="quant-table">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Description</th>
                    <th scope="col">Upload (only jpg, png, pdf, max 5 MB each)</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((num) => {
                    const key = `attachments${num}`;
                    return (
                      <tr key={key}>
                        <td>{num}</td>
                        <td>
                          <input
                            type="text"
                            name={`${key}.description`}
                            value={formData[key].description}
                            onChange={(e) => handleAttachmentChange(key, 'description', e.target.value)}
                            onBlur={(e) => handleBlur(`${key}.description`, e.target.value)}
                            placeholder="Enter description"
                            className={`form-input ${fieldErrors[`${key}.description`] ? 'has-error' : ''}`}
                            maxLength={FIELD_MAX_LENGTH}
                            aria-label={`Attachment ${num} description`}
                            aria-describedby={fieldErrors[`${key}.description`] ? `${key}-description-error` : undefined}
                          />
                          {fieldErrors[`${key}.description`] && (
                            <span id={`${key}-description-error`} className="error-tooltip" role="alert">
                              {fieldErrors[`${key}.description`]}
                            </span>
                          )}
                        </td>
                        <td>
                          <input
                            type="file"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) => handleAttachmentChange(key, 'file', e.target.files[0], e)}
                            className="form-input mt-4"
                            aria-label={`Upload attachment ${num}`}
                          />
                          {formData[key].file && (
                            <p className="file-name">Selected file: {formData[key].file.name}</p>
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
                Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.
                <span aria-hidden="true" className="text-red">*</span>
              </label>
              <div className="form-navigation">
                <button type="button" onClick={handlePrint} className="btn btn-outline">
                  Print Preview
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="approvingAuthoritySignature">
                Upload Document with Approving Authority Signature (Director/Board Level)
                <span aria-hidden="true" className="text-red">*</span>:
              </label>
              <input
                type="file"
                id="approvingAuthoritySignature"
                accept=".jpg,.png,.pdf"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files.length > 0) {
                    const confirmed = window.confirm(
                      "Are you sure the form is approved and signed by approving authority?"
                    );
                    if (!confirmed) {
                      // If user clicks "Cancel", clear the input
                      e.target.value = "";
                      return;
                    }
                    handleApprovingAuthorityChange(files);
                  }
                }}
                className={`form-input mt-4 ${fieldErrors.approvingAuthoritySignature ? "has-error" : ""
                  }`}
                aria-describedby="approvingAuthoritySignature-error"
                required
              />
              {formData.approvingAuthoritySignature && (
                <p className="file-name">
                  Selected file: {formData.approvingAuthoritySignature.name}
                </p>
              )}
              {fieldErrors.approvingAuthoritySignature && (
                <span
                  className="error-tooltip"
                  id="approvingAuthoritySignature-error"
                  role="alert"
                >
                  {fieldErrors.approvingAuthoritySignature}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="declaration">
                <input
                  id="declaration"
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={(e) => handleChange('declaration', e.target.checked)}
                  className={`form-checkbox ${fieldErrors.declaration ? 'has-error' : ''}`}
                  aria-required="true"
                  aria-describedby="declaration-error"
                />
                I declare that the information submitted is true and complete.
              </label>
              {fieldErrors.declaration && (
                <span className="error-tooltip" id="declaration-error" role="alert">
                  {fieldErrors.declaration}
                </span>
              )}

            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const middlePosition = window.innerHeight / 2; // middle
    window.scrollTo({ top: middlePosition + 100, behavior: 'smooth' });
  }, [currentStep]);

  return (
    <div className="sidebar-guideline-container">
      <SidebarGuideline
        isOpen={true}
        sidebarItems={[{ id: 'Guideline', label: 'Guideline' }]}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        selectedAwardCategory={formData.category}
      />
      <div className="application-form">
        <div className="form-header">
          <h1>{awardTitle}</h1>
          <h6>Step {currentStep} of 5</h6>
        </div>
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        {isSubmitted ? (
          <div className="thank-you-message">
            <h2>Thank you for your submission!</h2>
            <p>Your registration has been successfully submitted.</p>
            <button onClick={() => setIsSubmitted(false)} className="btn btn-primary">
              Submit Another Response
            </button>
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
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={(e) => {
                      if (!window.confirm('Are you sure you want to submit?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationBMP;