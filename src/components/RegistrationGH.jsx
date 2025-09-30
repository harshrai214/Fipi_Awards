// RegistrationGH.jsx
import React, { useState, useEffect, useCallback } from 'react';
// import apiClient from '../api/axiosClient';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarGuideline from "./SidebarGuideline"
import TextField from "@mui/material/TextField";
import '../styles/Form.css';

const FIELD_MAX_LENGTH = 100;
const COMMENT_MAX_LENGTH = 100;
const COMPANY_PROFILE_MAX_LENGTH = 300;
const PHONE_MAX_LENGTH = 10;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const RegistrationGH = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [formData, setFormData] = useState({
    Organisationname: '',
    category: 'Green Hydrogen Company of the Year',
    mailingAddress: '',
    authorityName: '',
    authorityTitle: '',
    authorityPhone: '',
    authorityLandline: "",
    authorityEmail: '',
    applicant_name: "",
    applicant_phone: "",
    applicant_email: "",
    contact_name: '',
    contact_phone: '',
    contact_email: '',
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
    projectName1: '',
    location1: '',
    capacity1: '',
    projectCompletionYear1: '',
    projectCurrentStatus1: '',
    projectName2: '',
    location2: '',
    capacity2: '',
    projectCompletionYear2: '',
    projectCurrentStatus2: '',
    projectName3: '',
    location3: '',
    capacity3: '',
    projectCompletionYear3: '',
    projectCurrentStatus3: '',
    projectName4: '',
    location4: '',
    capacity4: '',
    projectCompletionYear4: '',
    projectCurrentStatus4: '',
    projectName5: '',
    location5: '',
    capacity5: '',
    projectCompletionYear5: '',
    projectCurrentStatus5: '',
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
      const prefillRaw = sessionStorage.getItem('registrationGH_prefill');
      if (prefillRaw) {
        const prefill = JSON.parse(prefillRaw);
        if (prefill && typeof prefill === 'object') {
          setFormData((prev) => ({ ...prev, ...prefill }));
          if (prefill.step) setCurrentStep(Number(prefill.step));
        }
        // remove after consuming so it doesn't override later edits
        sessionStorage.removeItem('registrationGH_prefill');
      }
    } catch (err) {
      // ignore parse errors
    }

    // Note: we avoid loading large File objects here — the draft loader below (in another effect) may populate non-file fields.
  }, []);


  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [copyApplicantData, setCopyApplicantData] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const awardTitle = location.state?.awardTitle || 'Green Hydrogen Company of the Year';

  const clearFieldError = (field) => {
    setFieldErrors(prev => {
      if (prev[field]) {
        const { [field]: omitted, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  };

  useEffect(() => {
    try {
      const draftRaw = localStorage.getItem('registrationGHDraft');
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

  const validateEmail = (email) => emailRegex.test(email);

  const validatePhone = (phone) => phoneRegex.test(phone);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if ([1, 2, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (name === 'companyProfile') applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
      else if (name === 'comment') applicableMaxLength = COMMENT_MAX_LENGTH;

      if (typeof value === 'string') {
        if (name === 'companyProfile') {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed.");
            return;
          }
        } else if (name === 'comment') {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            alert("Maximum 200 words allowed in Comments.");
            return;
          }
        }



      }

    } else {
      // For Steps 3 and 4, no max-length alerts
      clearFieldError(name);
    }
    if (name === 'authorityPhone' || name === 'contact_phone') {
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
    if (['Organisationname', 'companyName', 'authorityName', 'contact_name', 'Applicantdesignation'].includes(name)) {
      const isValid = /^[A-Za-z\s]*$/.test(value);
      if (!isValid && value !== '') {
        alert('Only letters and spaces are allowed.');
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'Organisationname' && value && currentStep === 1) setError('');
    if (name === 'mailingAddress' && value.trim() && currentStep === 1) setError('');
  };


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




  const handleAttachmentChange = (key, field, value, event = null) => {
    if (field === 'file' && value) {
      const file = value;
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
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

    setFormData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleApprovingAuthorityChange = (files) => {
    setFormData(prev => ({
      ...prev,
      approvingAuthoritySignature: files[0],
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {

      if (!formData.mailingAddress.trim()) {
        alert('Mailing address is required.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.authorityName) {
        alert('Authority name is required.');
        return;
      }
      if (!formData.authorityTitle) {
        alert('Authority designation is required.');
        return;
      }
      if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
        alert('Please enter a valid Authority email.');
        return;
      }
      if (!formData.authorityLandline) {
        alert('Authority Landline is required.');
        return;
      }
      if (!formData.contact_name) {
        alert('Contact name is required.');
        return;
      }
      if (formData.contact_email && !validateEmail(formData.contact_email)) {
        alert('Please enter a valid Contact email.');
        return;
      }
      if (formData.contact_phone && !validatePhone(formData.contact_phone) && !copyApplicantData) {
        alert('Contact phone must be exactly 10 digits.');
        return;
      }
      if (!formData.companyProfile) {
        alert('Company Profile is required.');
        return;
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

    setError('');
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const saveDraft = () => {
    try {
      const draftToStore = {
        formData: serializeFormForStorage(formData), // ⭐ ADDED - store a safe copy
        step: currentStep, // ⭐ ADDED - persist current step so user returns to same step
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem('registrationGHDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!validateEmail(formData.authorityEmail)) {
      alert("Please enter a valid Authority email.");
      return;
    }
    if (!validatePhone(formData.authorityPhone)) {
      alert("Authority phone must be exactly 10 digits.");
      return;
    }
    if (formData.contact_email && !validateEmail(formData.contact_email)) {
      alert("Please enter a valid Contact email.");
      return;
    }
    if (
      formData.contact_phone &&
      !validatePhone(formData.contact_phone) &&
      !copyApplicantData
    ) {
      alert("Contact phone must be exactly 10 digits.");
      return;
    }

    if (!formData.declaration) {
      alert("Please accept the declaration before submitting.");
      return;
    }

    try {
      const fd = new FormData();

      // Explicitly map frontend keys → backend keys
      fd.append("organisation_name", formData.Organisationname);
      fd.append("category", formData.category);
      fd.append("mailing_address", formData.mailingAddress);
      fd.append("authority_name", formData.authorityName);
      fd.append("authority_title", formData.authorityTitle);
      fd.append("authority_phone", formData.authorityPhone);
      fd.append("authorityLandline", formData.authorityLandline || "");
      fd.append("authority_email", formData.authorityEmail);
      fd.append("contact_name", formData.contact_name);
      fd.append("contact_phone", formData.contact_phone);
      fd.append("contact_email", formData.contact_email);
      fd.append("company_profile", formData.companyProfile);
      fd.append("comment", formData.comment);
      fd.append("declaration", formData.declaration);

      // File
      if (formData.approvingAuthoritySignature instanceof File) {
        fd.append("approving_authority_file", formData.approvingAuthoritySignature);
      }

      // Quantitative fields
      fd.append("installed_capacity_2024", formData.installedCapacity2024);
      fd.append("production_2024", formData.production2024);
      fd.append("carbon_emission_2024", formData.carbonEmission2024);
      fd.append("purity_2024", formData.purity2024);
      fd.append("cost_of_production_2024", formData.costOfProduction2024);
      fd.append("patents_filed_2024", formData.patentsFiled2024);
      fd.append("patents_granted_national_2024", formData.patentsGrantedNational2024);
      fd.append("patents_granted_international_2024", formData.patentsGrantedInternational2024);
      fd.append("patents_commercialized_2024", formData.patentsCommercialized2024);
      fd.append("investment_activities_2024", formData.investmentActivities2024);
      fd.append("investment_activities_2023", formData.investmentActivities2023);
      fd.append("investment_electrolyser_2024", formData.investmentElectrolyser2024);
      fd.append("investment_electrolyser_2023", formData.investmentElectrolyser2023);
      fd.append("upcoming_projects_2024", formData.upcomingProjects2024);
      fd.append("upcoming_projects_2023", formData.upcomingProjects2023);

      // Attachments
      [1, 2, 3, 4].forEach((n) => {
        const att = formData[`attachments${n}`] || {};
        fd.append(`attachments${n}_desc`, att.description || "");
        if (att.file instanceof File) {
          fd.append(`attachments${n}`, att.file);
        }
      });

      // Projects
      for (let i = 1; i <= 5; i++) {
        fd.append(`project_name_${i}`, formData[`projectName${i}`]);
        fd.append(`location_${i}`, formData[`location${i}`]);
        fd.append(`capacity_${i}`, formData[`capacity${i}`]);
        fd.append(`project_completion_year_${i}`, formData[`projectCompletionYear${i}`]);
        fd.append(`project_current_status_${i}`, formData[`projectCurrentStatus${i}`]);
      }

      // API request
      // await apiClient.post("/green-hydrogen/", fd, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      try {
        localStorage.removeItem('registrationCBGDraft');
      } catch (err) {
        // ignore
      }


      alert("Registration Submitted Successfully!");
      setIsSubmitted(true);
      setCurrentStep(1);
    } catch (err) {
      console.error("Submission error:", err.response || err);
      const msg = err.response?.data?.detail || JSON.stringify(err.response?.data) || err.message;
      alert("Submission failed: " + msg);
    }
  };

  const handlePrint = () => {
    const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
      <h2>Organization & Contact Details</h2>
      <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
      <p><strong>Postal Address:</strong> ${formData.mailingAddress || ''}</p>
      <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ''}</p>
      <p><strong>Approving Authority Title:</strong> ${formData.authorityTitle || ''}</p>
      <p><strong>Approving Authority Landline:</strong> ${formData.authorityLandline || ""}</p>
      <p><strong>Approving Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
      <p><strong>Approving Authority Email:</strong> ${formData.authorityEmail || ''}</p>

      <h2>Nodal Official Contact Details:</h2>
      <p><strong>Contact Name:</strong> ${formData.contact_name || ''}</p>
      <p><strong>Contact Phone:</strong> ${formData.contact_phone || ''}</p>
      <p><strong>Contact Email:</strong> ${formData.contact_email || ''}</p>
      <p><strong>>Brief write up on company’s profile:</strong> ${formData.companyProfile || ''}</p>

      <h2>Quantitative Information</h2>
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
          ${data.map(({ num, title, key2024, key2023 }) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${num}</td>
              <td style="border: 1px solid #000; padding: 8px;">${title}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[key2024] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${key2023 ? (formData[key2023] || '') : 'N/A'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Upcoming Projects</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Project Name</th>
            <th style="border: 1px solid #000; padding: 8px;">Location</th>
            <th style="border: 1px solid #000; padding: 8px;">Capacity (MT)</th>
            <th style="border: 1px solid #000; padding: 8px;">Completion Year</th>
            <th style="border: 1px solid #000; padding: 8px;">Current Status</th>
          </tr>
        </thead>
        <tbody>
          ${[1, 2, 3, 4, 5].map(i => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${i}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`projectName${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`location${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`capacity${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`projectCompletionYear${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`projectCurrentStatus${i}`] || ''}</td>
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
          ${[1, 2, 3, 4].map(i => `
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
      <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ''}</p>
      <p><strong>Approving Authority Title:</strong> ${formData.authorityTitle || ''}</p>
      <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
      <p><strong>Approving Authority Signature:</strong></p>
    </div>
  `;

    // ✅ Add a title to remove "about:blank"
    const printWindow = window.open('', '_blank', 'height=600,width=800');
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${awardTitle || 'Print View'}</title>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);
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
  ];

  const hasEmptyFieldsStep3 = () => {
    // Check inputs in Step 3: data indexes 0 to 8 (inclusive) for 2024 only (per your code)
    for (let i = 0; i <= 8; i++) {
      const key2024 = data[i]?.key2024;
      if (key2024) {
        const val = formData[key2024];
        if (val === '' || val === undefined || val === null) {
          return true;
        }
      }
    }
    return false;
  };

  const hasEmptyFieldsStep4 = () => {
    // Check inputs in Step 4: data indexes 9 to 11 for both years (2024 and 2023)
    for (let i = 9; i <= 11; i++) {
      const key2024 = data[i]?.key2024;
      const key2023 = data[i]?.key2023;
      if (key2024) {
        const val = formData[key2024];
        if (val === '' || val === undefined || val === null) {
          return true;
        }
      }
      if (key2023) {
        const val = formData[key2023];
        if (val === '' || val === undefined || val === null) {
          return true;
        }
      }
    }
    // Check project inputs in Step 4 (projectName, location, etc.)
    for (let i = 1; i <= 5; i++) {
      const fields = [
        `projectName${i}`,
        `location${i}`,
        `capacity${i}`,
        `projectCompletionYear${i}`,
        `projectCurrentStatus${i}`,
      ];
      for (const key of fields) {
        const val = formData[key];
        if (val === '' || val === undefined || val === null) {
          return true;
        }
      }
    }

    return false;
  };


  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;

    return (
      <div className="form-step">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <>
            <h3 className="step-title">Step 1: Organization Details</h3>

            <div className="form-group">
              <label>Organisation Name:
                {/* <span className="text-red">*</span> */}
              </label>
              <input
                type="text"
                name="Organisationname"
                value={formData.Organisationname}
                onChange={handleChange}
                // disabled = {true}
                maxLength={FIELD_MAX_LENGTH}
                className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
              />
              {fieldErrors.Organisationname && <span className="error-tooltip">{fieldErrors.Organisationname}</span>}
              {/* {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>} */}
            </div>

            <div className="form-group">
              <label>Postal Address:<span className="text-red">*</span></label>
              <textarea
                name="mailingAddress"
                value={formData.mailingAddress}
                onChange={handleChange}
                maxLength={FIELD_MAX_LENGTH}
                rows={3}
                placeholder="Enter Postal address"
                className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1 ? 'has-error' : ''}`}
              />
              {fieldErrors.mailingAddress && <span className="error-tooltip">{fieldErrors.mailingAddress}</span>}
              {!formData.mailingAddress.trim() && currentStep === 1 && <span className="error-tooltip">Mailing address is required</span>}
            </div>
          </>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <>
            <h3 className="step-title">Step 2: Approving Authority & Contact</h3>
            {/* Authority and Contact form inputs with maxLength and placeholders*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="step-section">
                <h4>Approving Authority</h4>
                <p className="note">Approving authority should be concerned  Director /Board level executive. </p>
                <div className="form-group">
                  <label>Name:<span className="text-red">*</span></label>
                  <input
                    type="text"
                    name="authorityName"
                    value={formData.authorityName}
                    onChange={handleChange}
                    maxLength={FIELD_MAX_LENGTH}
                    className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="Name"
                  />
                  {fieldErrors.authorityName && <span className="error-tooltip">{fieldErrors.authorityName}</span>}
                  {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Name is required</span>}
                </div>
                <div className="form-group">
                  <label>Designation:<span className="text-red">*</span></label>
                  <input
                    type="text"
                    name="authorityTitle"
                    value={formData.authorityTitle}
                    onChange={handleChange}
                    maxLength={FIELD_MAX_LENGTH}
                    className="form-input"
                    placeholder="Designation"
                  />
                  {fieldErrors.authorityTitle && <span className="error-tooltip">{fieldErrors.authorityTitle}</span>}
                  {!formData.authorityTitle && currentStep === 2 && <span className="error-tooltip">Name is required</span>}
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
                    Mobile:
                    {/* <span className="text-red" aria-hidden="true"></span> */}
                  </label>
                  <input
                    id="authorityPhone"
                    type="tel"
                    name="authorityPhone"
                    value={formData.authorityPhone}
                    onChange={handleChange}
                    // onBlur={(e) => handleBlur('authorityPhone', e.target.value)}
                    className="form-input"
                    placeholder="Phone number"
                    maxLength={PHONE_MAX_LENGTH}
                    aria-required="true"
                  // aria-describedby={fieldErrors.authorityPhone ? 'authorityPhone-error' : undefined}
                  />
                </div>

                <div className="form-group">
                  <label>Email:<span className="text-red">*</span></label>
                  <input
                    type="email"
                    name="authorityEmail"
                    value={formData.authorityEmail}
                    onChange={handleChange}
                    className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
                    placeholder="E-mail address"
                  />
                  {fieldErrors.authorityEmail && <span className="error-tooltip">{fieldErrors.authorityEmail}</span>}
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
                      onChange={handleCopyApplicantToggle}
                      className="form-checkbox"
                    />{" "}
                    Same as applicant
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="contact_name">
                    Name: <span aria-hidden="true" className="text-red">*</span>
                  </label>
                  <input
                    id="contact_name"
                    name="contact_name"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contact_name}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    aria-describedby="contact_phone-error"
                    disabled={copyApplicantData}
                    placeholder="10-digit phone number"
                    className={`form-input ${!formData.contact_phone && currentStep === 2 ? "has-error" : ""}`}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_email">Email:</label>
                  <input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.contact_email}
                    onChange={handleChange}
                    placeholder="Contact email"
                    disabled={copyApplicantData}
                    className={`form-input ${fieldErrors.contact_email ? "has-error" : ""}`}
                    aria-describedby="contact_email-error"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Brief write up on company’s profile.</label>
              <p className="note">(within 300 words) </p>
              <textarea
                name="companyProfile"
                value={formData.companyProfile}
                onChange={handleChange}
                className="form-textarea"
                rows={6}
              // maxLength={COMPANY_PROFILE_MAX_LENGTH}
              />
              {fieldErrors.companyProfile && <span className="error-tooltip">{fieldErrors.companyProfile}</span>}
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h3 className="step-title">Step 3: Quantitative Information - Part 1</h3>
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
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text" // use text to prevent browser spinners
                        name={item.key2024}
                        value={formData[item.key2024] || ""}
                        onChange={(e) => {
                          let val = e.target.value;

                          // Allow only digits and a single decimal point
                          val = val.replace(/[^0-9.]/g, "");
                          const parts = val.split(".");
                          if (parts.length > 2) {
                            val = parts[0] + "." + parts.slice(1).join("");
                          }

                          handleChange({
                            target: {
                              name: e.target.name,
                              value: val,
                            },
                          });
                        }}
                        onKeyDown={(e) => {
                          // block '-', '+', 'e', 'E', arrow keys
                          if (
                            ["-", "+", "e", "E"].includes(e.key) ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // disable mouse scroll increment
                        className="form-input"
                        inputProps={{
                          inputMode: "decimal", // mobile numeric keypad
                          pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                          min: 0, // maintain minimum value 0
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}



        {currentStep === 4 && (
          <>
            <h3 className="step-title">Step 4: Quantitative Information - Part 2</h3>
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
                {data.slice(9, 12).map(item => (
                  <tr key={item.num}>
                    <td className="sno-cell">{item.num}</td>
                    <td className="label-cell">{item.title}</td>
                    <td>
                      {/* <input
                        type="number"
                        name={item.key2024}
                        value={formData[item.key2024] || ''}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        onKeyDown={e => {
                          if (['-', 'e', 'E'].includes(e.key)) e.preventDefault();
                        }}
                      /> */}
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text" // prevents browser number spinners
                        name={item.key2024}
                        value={formData[item.key2024] || ""}
                        onChange={(e) => {
                          let val = e.target.value;

                          // Allow only digits and one decimal point
                          val = val.replace(/[^0-9.]/g, "");
                          const parts = val.split(".");
                          if (parts.length > 2) {
                            val = parts[0] + "." + parts.slice(1).join("");
                          }

                          handleChange({
                            target: {
                              name: e.target.name,
                              value: val,
                            },
                          });
                        }}
                        onKeyDown={(e) => {
                          // block '-', '+', 'e', 'E', arrow keys
                          if (
                            ["-", "+", "e", "E"].includes(e.key) ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // prevent mouse scroll increment
                        className="form-input"
                        inputProps={{
                          inputMode: "decimal", // mobile numeric keypad
                          pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                          min: 0, // maintain minimum value
                        }}
                      />
                    </td>
                    <td>
                      {/* <input
                        type="number"
                        name={item.key2023}
                        value={formData[item.key2023] || ''}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        onKeyDown={e => {
                          if (['-', 'e', 'E'].includes(e.key)) e.preventDefault();
                        }}
                      /> */}
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="text" // prevents browser spinners
                        name={item.key2023}
                        value={formData[item.key2023] || ""}
                        onChange={(e) => {
                          let val = e.target.value;

                          // Allow only digits and one decimal point
                          val = val.replace(/[^0-9.]/g, "");
                          const parts = val.split(".");
                          if (parts.length > 2) {
                            val = parts[0] + "." + parts.slice(1).join("");
                          }

                          handleChange({
                            target: {
                              name: e.target.name,
                              value: val,
                            },
                          });
                        }}
                        onKeyDown={(e) => {
                          // block '-', '+', 'e', 'E', arrow keys
                          if (
                            ["-", "+", "e", "E"].includes(e.key) ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // prevent mouse scroll increment
                        className="form-input"
                        inputProps={{
                          inputMode: "decimal", // numeric keypad for mobile
                          pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                          min: 0, // minimum value
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="quant-table">
              <thead>
                <tr>
                  <th colSpan="1">12</th>
                  <th colSpan="7">
                    <p className="tablerowq">Upcoming projects</p>
                  </th>
                </tr>
              </thead>
              <thead></thead>

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
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i}>
                    <td className="sno-cell">{i}</td>
                    <td>
                      <input
                        type="text"
                        name={`projectName${i}`}
                        value={formData[`projectName${i}`] || ''}
                        onChange={handleChange}
                        className="form-input"
                        maxLength={FIELD_MAX_LENGTH}

                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`location${i}`}
                        value={formData[`location${i}`] || ''}
                        onChange={handleChange}
                        className="form-input"
                        maxLength={FIELD_MAX_LENGTH}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name={`capacity${i}`}
                        value={formData[`capacity${i}`] || ''}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        onKeyDown={e => { if (['-', 'e', 'E'].includes(e.key)) e.preventDefault(); }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name={`projectCompletionYear${i}`}
                        value={formData[`projectCompletionYear${i}`] || ''}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        onKeyDown={e => { if (['-', 'e', 'E'].includes(e.key)) e.preventDefault(); }}
                      />
                    </td>
                    <td>
                      {/* <textarea
                        name={`projectCurrentStatus${i}`}
                        value={formData[`projectCurrentStatus${i}`] || ''}
                        onKeyDown={e => { if (['-', 'e', 'E'].includes(e.key)) e.preventDefault(); }}
                        onChange={handleChange}
                          className="form-input"
                        rows={3}

                      /> */}
                      <textarea
                        name={`projectCurrentStatus${i}`}
                        value={formData[`projectCurrentStatus${i}`] || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          const words = value.trim().split(/\s+/).filter(Boolean);

                          if (words.length > 50) {
                            alert("maximum 50 words allowed.");
                            return;
                          }

                          handleChange(e);
                        }}
                        className="form-input resize-none"
                        rows={3}
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
                  // maxLength={COMMENT_MAX_LENGTH}
                  placeholder="Comments ( within 200 words) against input parameter, if any"
                />
                {fieldErrors.comment && <span className="error-tooltip">{fieldErrors.comment}</span>}
              </div>

              <br />
              <p className="notes">
                <strong>Notes:</strong><br />
                Investments on enhancing hydrogen capacities (other than green hydrogen) within
                refineries for internal consumption should not be included in the above.
              </p>
            </div>
          </>
        )}


        {currentStep === 5 && (
          <>
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
                  {[1, 2, 3, 4].map(num => {
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
                            maxLength={FIELD_MAX_LENGTH}
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) => handleAttachmentChange(key, 'file', e.target.files[0], e)}
                            className="form-input mt-4"
                          />
                          {attachment.file && <p className="file-name">Selected file: {attachment.file.name}</p>}
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
                <span className="text-red">*</span>
              </label>
              <div className="form-navigation">
                <button type="button" onClick={handlePrint} className="btn btn-outline">
                  Print Preview
                </button>
              </div>
            </div>

            {/* <div className="form-group">
              <label htmlFor="approving_authority_file">
                Upload Document with Approving Authority Signature (Director/Board Level)<span aria-hidden="true" className="text-red">*</span>:
              </label>
              <input
                type="file"
                id="approving_authority_file"
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
                className={`form-input mt-4 ${fieldErrors.approving_authority_file ? 'has-error' : ''}`}
                aria-describedby="approving_authority_file-error"
                required
              />
              {formData.approving_authority_file && (
                <p className="file-name">Selected file: {formData.approving_authority_file.name}</p>
              )}
              {fieldErrors.approving_authority_file && (
                <span className="error-tooltip" id="approving_authority_file-error" role="alert">
                  {fieldErrors.approving_authority_file}
                </span>
              )}
            </div> */}


            {/* <div className="form-group">
                            <label htmlFor="approvingAuthoritySignature">
                                Upload Document with Approving Authority Signature (Director/Board Level)
                                <span aria-hidden="true" className="text-red">*</span>:
                            </label>
                            <input
                                type="file"
                                id="approving_authority_file"
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
                                className={`form-input mt-4 ${fieldErrors.approving_authority_file ? "has-error" : ""}`}
                                aria-describedby="approving_authority_file-error"
                                required
                            />
                            {formData.approving_authority_file && (
                                <p className="file-name">
                                    Selected file: {formData.approving_authority_file.name}
                                </p>
                            )}
                            {fieldErrors.approving_authority_file && (
                                <span
                                    className="error-tooltip"
                                    id="approving_authority_file-error"
                                    role="alert"
                                >
                                    {fieldErrors.approving_authority_file}
                                </span>
                            )}
                        </div> */}


            <div className="form-group">
              <label htmlFor="approving_authority_file">
                Upload Document with Approving Authority Signature
                (Director/Board Level)
                <span aria-hidden="true" className="text-red">
                  *
                </span>
                :
              </label>
              <input
                type="file"
                id="approving_authority_file"
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
                className={`form-input mt-4 ${fieldErrors.approving_authority_file ? "has-error" : ""
                  }`}
                aria-describedby="approving_authority_file-error"
                required
              />
              {formData.approving_authority_file && (
                <p className="file-name">
                  Selected file: {formData.approving_authority_file.name}
                </p>
              )}
              {fieldErrors.approving_authority_file && (
                <span
                  className="error-tooltip"
                  id="approving_authority_file-error"
                  role="alert"
                >
                  {fieldErrors.approving_authority_file}
                </span>
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

            </div>
          </>
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

export default RegistrationGH;