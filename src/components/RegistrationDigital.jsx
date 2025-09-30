import React, { useState, useEffect, useCallback } from "react";
// import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import apiClient from "../api/axiosClient";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/FormProduction.css";
import TextField from "@mui/material/TextField";
import SidebarGuideline from "./SidebarGuideline";


// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const COMPANY_PROFILE_MAX_LENGTH = 300;
const COMMENT_MAX_LENGTH = 200;
const TEXTAREA_MAX_LENGTH = 300;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const numberRegex = /^\d*\.?\d*$/; // Allow positive numbers (integers or decimals)
const yearRegex = /^\d{4}$/; // Allow 4-digit years

const RegistrationDigital = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const awardTitle =
    location.state?.awardTitle || "Digital Technology Provider of the Year";

  // Form state initialization
  const [formData, setFormData] = useState({
    organisation_name: "",
    category: "Digital Technology Provider of the Year",
    mailingAddress: "",
    authorityName: "",
    authorityTitle: "",
    authorityLandline: "",
    authorityPhone: "",
    authorityEmail: "",
    applicant_name: "",
    applicant_phone: "",
    applicant_email: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    companyProfile: "",
    awardJustification: "",
    approvingAuthoritySignature: null,
    declaration: false,
    comment: "",
    total_revenue_digital_2425: "",
    total_revenue_digital_2324: "",
    total_revenue_company_2425: "",
    total_revenue_company_2324: "",
    projectA_name: "",
    projectA_areas: "",
    projectA_year: "",
    projectA_customers: "",
    projectA_revenue: "",
    projectA_intangible_value: "",
    projectB_name: "",
    projectB_areas: "",
    projectB_year: "",
    projectB_customers: "",
    projectB_revenue: "",
    projectB_intangible_value: "",
    projectC_name: "",
    projectC_areas: "",
    projectC_year: "",
    projectC_customers: "",
    projectC_revenue: "",
    projectC_intangible_value: "",
    techA_name: "",
    techA_year: "",
    techA_investment: "",
    techA_patents: "",
    techA_intangible_value: "",
    techB_name: "",
    techB_year: "",
    techB_investment: "",
    techB_patents: "",
    techB_intangible_value: "",
    techC_name: "",
    techC_year: "",
    techC_investment: "",
    techC_patents: "",
    techC_intangible_value: "",
    total_rnd_investment_2425: "",
    customers_2425: "",
    customers_2324: "",
    revenue_percent_digital_2425: "",
    attachments1: { description: "", file: null },
    attachments2: { description: "", file: null },
    attachments3: { description: "", file: null },
    attachments4: { description: "", file: null },
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
        const prefillRaw = sessionStorage.getItem('registrationDigital_prefill');
        if (prefillRaw) {
          const prefill = JSON.parse(prefillRaw);
          if (prefill && typeof prefill === 'object') {
            setFormData((prev) => ({ ...prev, ...prefill }));
            if (prefill.step) setCurrentStep(Number(prefill.step));
          }
          // remove after consuming so it doesn't override later edits
          sessionStorage.removeItem('registrationDigital_prefill');
        }
      } catch (err) {
        // ignore parse errors
      }
  
      // Note: we avoid loading large File objects here — the draft loader below (in another effect) may populate non-file fields.
    }, []);

  // UI State
  const [currentStep, setCurrentStep] = useState(1);
  const [copyApplicantData, setCopyApplicantData] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Validation helpers
  const validateEmail = (email) => emailRegex.test(email);
  const validatePhone = (phone) => phoneRegex.test(phone);
  const validateNumber = (value) => numberRegex.test(value) || value === "";
  const validateYear = (value) => yearRegex.test(value) || value === "";

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
      const draftRaw = localStorage.getItem('registrationDigitalDraft');
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
  // Handle changes for inputs/textareas/selects
  const handleChange = (name, value, index = null) => {
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
            alert("Maximum 200 words allowed.");
            return;
          }
        } else if (value.length > applicableMaxLength) {
          alert(`Value cannot exceed ${applicableMaxLength} characters.`);
          return;
        }
      }

    }
    // Validate text fields
    if (["organisation_name", "authorityName", "contact_name"].includes(name)) {
      if (value && !/^[A-Za-z\s]*$/.test(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: "Only letters and spaces are allowed.",
        }));
        return;
      }
    }

    // Phone validation
    if (["authorityPhone", "contact_phone"].includes(name)) {
      const numericValue = value.replace(/\D/g, "").slice(0, PHONE_MAX_LENGTH);
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      clearFieldError(name);
      return;
    }

    if (["authorityEmail", "contact_email"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value || "",
      }));
      if (value && !validateEmail(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]:` Please enter a valid ${name === "authorityEmail" ? "Authority" : "Contact"} email.`,
        }));
      } else {
        clearFieldError(name);
      }
      return;
    }
 
    if (["projectA_year", "projectB_year", "projectC_year", "techA_year", "techB_year", "techC_year"].includes(name)) {
      const numericValue = value.replace(/\D/g, "").slice(0, 4); // Restrict to 4 digits
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      if (numericValue && !validateYear(numericValue)) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: "Please enter a valid 4-digit year.",
        }));
      } else {
        clearFieldError(name);
      }
      return;
    }

  

    // Numeric validation for quantitative fields
    if (
      [
        "total_revenue_digital_2425",
        "total_revenue_digital_2324",
        "total_revenue_company_2425",
        "total_revenue_company_2324",
        "projectA_revenue",
        "projectA_customers",
        "projectB_revenue",
        "projectB_customers",
        "projectC_revenue",
        "projectC_customers",
        "techA_investment",
        "techB_investment",
        "techC_investment",
        "total_rnd_investment_2425",
        "customers_2425",
        "customers_2324",
        "revenue_percent_digital_2425",
      ].includes(name)
    ) {
      if (value && !validateNumber(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: "Please enter a valid number.",
        }));
        return;
      }
    }

    // Default handling
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === "boolean" ? value : value || "",
    }));
    clearFieldError(name);

    // Clear step-specific errors
    if (name === "organisation_name" && value && currentStep === 1) setError("");
    if (name === "mailingAddress" && value?.trim() && currentStep === 1) setError("");
    if (name === "authorityName" && value && currentStep === 2) setError("");
    if (name === "authorityTitle" && value && currentStep === 2) setError("");
    if (name === "authorityEmail" && value && currentStep === 2) setError("");
    if (name === "authorityPhone" && value && currentStep === 2) setError("");
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
    if (field === "file" && value) {
      const file = value;
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, and PDF files are allowed for attachments.");
        if (event) event.target.value = null;
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert("File size must not exceed 5 MB for attachments.");
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
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, and PDF files are allowed for the signature.");
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert("File size must not exceed 5 MB for the signature.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        approvingAuthoritySignature: file,
      }));
      clearFieldError("approvingAuthoritySignature");
    }
  };

const handlePrint = () => {
  const submissionDate = new Date("2025-08-05T15:03:00+05:30").toLocaleString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }
  );

  const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
      <h2>Organization & Contact Details</h2>
      <p><strong>Organisation Name:</strong> ${formData.organisation_name || ""}</p>
      <p><strong>Postal Address:</strong> ${formData.mailingAddress || ""}</p>
      <h2>Approving Authority Details:</h2>
      <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ''}</p>
      <p><strong>Approving Authority Title:</strong> ${formData.authorityTitle || ''}</p>
      <p><strong>Approving Authority Landline:</strong> ${formData.authorityLandline || ""}</p>
      <p><strong>Approving Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
      <p><strong>Approving Authority Email:</strong> ${formData.authorityEmail || ''}</p>

      <h2>Nodal Official Contact Details:</h2>
      <p><strong>Contact Name:</strong> ${formData.contact_name || ""}</p>
      <p><strong>Contact Phone:</strong> ${formData.contact_phone || ""}</p>
      <p><strong>Contact Email:</strong> ${formData.contact_email || ""}</p>
      <p><strong>Brief Writeup of Company's Profile:</strong> ${formData.companyProfile || ""}</p>

      <h2>Quantitative Information - Part 1</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
            <th style="border: 1px solid #000; padding: 8px;">Remarks (Value)</th>
          </tr>
        </thead>
        <tbody>
          ${part1.map(([num, label, key]) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${num}</td>
              <td style="border: 1px solid #000; padding: 8px;">${label}</td>
              <td style="border: 1px solid #000; padding: 8px;">
                ${key
                  ? key.includes("total_revenue_digital")
                    ? `2024-25: ${formData.total_revenue_digital_2425 || ""}, 2023-24: ${formData.total_revenue_digital_2324 || ""}`
                    : key.includes("total_revenue_company")
                      ? `2024-25: ${formData.total_revenue_company_2425 || ""}, 2023-24: ${formData.total_revenue_company_2324 || ""}`
                      : formData[key] || ""
                  : ""}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <h2>Quantitative Information - Part 2</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
            <th style="border: 1px solid #000; padding: 8px;">Remarks</th>
          </tr>
        </thead>
        <tbody>
          ${part2.map(([num, label, key]) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${num}</td>
              <td style="border: 1px solid #000; padding: 8px;">${label}</td>
              <td style="border: 1px solid #000; padding: 8px;">
                ${key
                  ? key.includes("customers")
                    ? `2024-25: ${formData.customers_2425 || ""}, 2023-24: ${formData.customers_2324 || ""}`
                    : formData[key] || ""
                  : ""}
              </td>
            </tr>
          `).join("")}
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
              <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].description || ""}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].file?.name || ""}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <h2>Comments</h2>
      <p>${formData.comment || ""}</p>

      <h2>Declaration</h2>
      <p>I declare that the information submitted is true and complete.</p>
      <br/>
      <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ''}</p>
      <p><strong>Approving Authority Title:</strong> ${formData.authorityTitle || ''}</p>
      <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()}</p>
      <p><strong>Approving Authority Signature:</strong></p>
    </div>
  `;

  // ✅ Proper HTML structure to avoid "about:blank"
  const printWindow = window.open('', '_blank', 'height=600,width=800');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${awardTitle || "Form Submission"}</title>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};


  // Navigation handlers
  const nextStep = () => {
    if (currentStep === 1) {

      if (!formData.mailingAddress.trim()) {
        alert("Mailing address is required.");
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.authorityName) {
        alert("Authority name is required.");
        return;
      }
      if (!formData.authorityTitle) {
        alert("Authority designation is required.");
        return;
      }
      if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
        alert("Please enter a valid Authority email.");
        return;
      }
            if (!formData.authorityLandline) {
                alert('Authority Landline is required.');
                return;
            }
      if (!formData.contact_name) {
        alert("Contact name is required.");
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
      if (!formData.companyProfile) {
        alert("Company Profile is required.");
        return;
      }
    }
    if (currentStep === 3 && areRequiredFieldsEmpty(currentStep)) {
      if (!window.confirm("Data not entered, If you wish to continue?")) {
        return;
      }
    }
    if (currentStep === 4 && areRequiredFieldsEmpty(currentStep)) {
      if (!window.confirm("Data not entered, If you wish to continue?")) {
        return;
      }
    }

    setError("");
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
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
      localStorage.setItem('registrationDigitalDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ─── Validation ──────────────────────────────────────
    const errors = {};

    if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) {
      errors.authorityEmail = "Please enter a valid Authority email.";
    }
    if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
      errors.authorityPhone =
        "Please enter a valid 10-digit authority phone number.";
    }
    if (!formData.contact_name.trim()) {
      errors.contact_name = "Contact name is required.";
    }
    if (formData.contact_email && !validateEmail(formData.contact_email)) {
      errors.contact_email = "Please enter a valid Contact email.";
    }
    if (!formData.declaration) {
      errors.declaration = "Please accept the declaration before submitting.";
    }
    if (!formData.approvingAuthoritySignature) {
      errors.approvingAuthoritySignature =
        "Please upload the document with the approving authority signature.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      alert(Object.values(errors)[0]);
      return;
    }

    // ─── Build FormData ───────────────────────────────────
    const fd = new FormData();

    // Simple text fields
    const simpleFields = {
      // Organisation_name: formData.Organisationname,
      organisation_name: formData.organisation_name,
      category: formData.category,
      company_name: formData.companyName,
      mailing_address: formData.mailingAddress,
      authority_name: formData.authorityName,
      authority_title: formData.authorityTitle,
      authority_phone: formData.authorityPhone,
      authorityLandline: formData.authorityLandline,
      authority_email: formData.authorityEmail,
      contact_name: formData.contact_name,
      contact_phone: formData.contact_phone,
      contact_email: formData.contact_email,
      company_profile: formData.companyProfile,
      award_justification: formData.awardJustification,
      comment: formData.comment,
    };

    Object.entries(simpleFields).forEach(([key, value]) => {
      if (value != null && value !== "") {
        fd.append(key, value);
      }
    });

    fd.append("declaration", formData.declaration ? "true" : "false");

    // Signature file
    if (formData.approvingAuthoritySignature) {
      fd.append(
        "approving_authority_file",
        formData.approvingAuthoritySignature
      );
    }

    // Quantitative fields
    const quantFields = [
      "total_revenue_digital_2425",
      "total_revenue_digital_2324",
      "total_revenue_company_2425",
      "total_revenue_company_2324",
      "projectA_name",
      "projectA_areas",
      "projectA_year",
      "projectA_customers",
      "projectA_revenue",
      "projectA_intangible_value",
      "projectB_name",
      "projectB_areas",
      "projectB_year",
      "projectB_customers",
      "projectB_revenue",
      "projectB_intangible_value",
      "projectC_name",
      "projectC_areas",
      "projectC_year",
      "projectC_customers",
      "projectC_revenue",
      "projectC_intangible_value",
      "techA_name",
      "techA_year",
      "techA_investment",
      "techA_patents",
      "techA_intangible_value",
      "techB_name",
      "techB_year",
      "techB_investment",
      "techB_patents",
      "techB_intangible_value",
      "techC_name",
      "techC_year",
      "techC_investment",
      "techC_patents",
      "techC_intangible_value",
      "total_rnd_investment_2425",
      "customers_2425",
      "customers_2324",
      "revenue_percent_digital_2425",
    ];

    quantFields.forEach((key) => {
      fd.append(key, formData[key] || "");
    });

    // Attachments
    [1, 2, 3, 4].forEach((n) => {
      const slot = formData[`attachments${n}`];
      fd.append(`attachments${n}_desc`, slot.description || "");
      if (slot.file) {
        fd.append(`attachments${n}`, slot.file);
      }
    });

    // ─── API Request using apiClient ──────────────────────
    try {
    //   const res = await apiClient.post("/digital/", fd, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });


     try {
        localStorage.removeItem('registrationDigitalDraft');
      } catch (err) {
        // ignore
      }

      alert("Submitted successfully!");
      setIsSubmitted(true);
      setCurrentStep(1);
      setCopyApplicantData(false);

      // Reset form state
      setFormData({
        organisation_name: "",
        category: "Digital Technology Provider of the Year",
        companyName: "",
        mailingAddress: "",
        authorityName: "",
        authorityTitle: "",
        authorityPhone: "",
        authorityLandline: "",
        authorityEmail: "",
        applicant_name: "",
        applicant_phone: "",
        applicant_email: "",
        contact_name: "",
        contact_phone: "",
        contact_email: "",
        companyProfile: "",
        awardJustification: "",
        approvingAuthoritySignature: null,
        declaration: false,
        comment: "",
        total_revenue_digital_2425: "",
        total_revenue_digital_2324: "",
        total_revenue_company_2425: "",
        total_revenue_company_2324: "",
        projectA_name: "",
        projectA_areas: "",
        projectA_year: "",
        projectA_customers: "",
        projectA_revenue: "",
        projectA_intangible_value: "",
        projectB_name: "",
        projectB_areas: "",
        projectB_year: "",
        projectB_customers: "",
        projectB_revenue: "",
        projectB_intangible_value: "",
        projectC_name: "",
        projectC_areas: "",
        projectC_year: "",
        projectC_customers: "",
        projectC_revenue: "",
        projectC_intangible_value: "",
        techA_name: "",
        techA_year: "",
        techA_investment: "",
        techA_patents: "",
        techA_intangible_value: "",
        techB_name: "",
        techB_year: "",
        techB_investment: "",
        techB_patents: "",
        techB_intangible_value: "",
        techC_name: "",
        techC_year: "",
        techC_investment: "",
        techC_patents: "",
        techC_intangible_value: "",
        total_rnd_investment_2425: "",
        customers_2425: "",
        customers_2324: "",
        revenue_percent_digital_2425: "",
        attachments1: { description: "", file: null },
        attachments2: { description: "", file: null },
        attachments3: { description: "", file: null },
        attachments4: { description: "", file: null },
      });
      setFieldErrors({});
      setError("");
    } catch (err) {
      console.error("API error:", err.response?.data || err.message);
      alert("Submission failed; please check the console for details.");
    }
  };

  // Quantitative fields definition
  const part1 = [
    ["1", "Annual Revenue Declaration", ""],
    ["1.1", "Total Revenue Earned from Digital Technology Services", ""],
    ["", "in 2024-25 (INR Crores)", "total_revenue_digital_2425"],
    ["", "in 2023-24 (INR Crores)", "total_revenue_digital_2324"],
    ["1.2", "Total Revenue of the Company", ""],
    ["", "in 2024-25 (INR Crores)", "total_revenue_company_2425"],
    ["", "in 2023-24 (INR Crores)", "total_revenue_company_2324"],
    ["2", "Digital Technology Implemented (3 Top Tech.)", ""],
    ["2.1", "Digital Technology Project (A)", ""],
    ["", "Name of Digital Technology Project", "projectA_name"],
    ["", "Areas of Implementation for Project A", "projectA_areas"],
    ["", "Year of Commencement of Project A", "projectA_year"],
    ["", "No. of Customers for Project A (Nos.)", "projectA_customers"],
    ["", "Total Revenue till date for Project A (INR Crores)", "projectA_revenue"],
    ["", "Intangible Value Provided by Project A", "projectA_intangible_value"],
    ["2.2", "Digital Technology Project (B)", ""],
    ["", "Name of Digital Technology Project", "projectB_name"],
    ["", "Areas of Implementation for Project B", "projectB_areas"],
    ["", "Year of Commencement of Project B", "projectB_year"],
    ["", "No. of Customers for Project B (Nos.)", "projectB_customers"],
    ["", "Total Revenue till date for Project B (INR Crores)", "projectB_revenue"],
    ["", "Intangible Value Provided by Project B", "projectB_intangible_value"],
    ["2.3", "Digital Technology Project (C)", ""],
    ["", "Name of Digital Technology Project", "projectC_name"],
    ["", "Areas of Implementation for Project C", "projectC_areas"],
    ["", "Year of Commencement of Project C", "projectC_year"],
    ["", "No. of Customers for Project C (Nos.)", "projectC_customers"],
    ["", "Total Revenue till date for Project C (INR Crores)", "projectC_revenue"],
    ["", "Intangible Value Provided by Project C", "projectC_intangible_value"],
  ];

  const part2 = [
    ["3", "Upcoming R&D on Digital Technology (3 Top Tech.)", ""],
    ["3.1", "R&D Technology A", ""],
    ["", "Name of Technology A", "techA_name"],
    ["", "Year of Commencement of R&D for A", "techA_year"],
    ["", "Investment in R&D for A (INR Crores)", "techA_investment"],
    ["", "Patents Obtained for A", "techA_patents"],
    ["", "Intangible Value Added by A", "techA_intangible_value"],
    ["3.2", "R&D Technology B", ""],
    ["", "Name of Technology B", "techB_name"],
    ["", "Year of Commencement of R&D for B", "techB_year"],
    ["", "Investment in R&D for B (INR Crores)", "techB_investment"],
    ["", "Patents Obtained for B", "techB_patents"],
    ["", "Intangible Value Added by B", "techB_intangible_value"],
    ["3.3", "R&D Technology C", ""],
    ["", "Name of Technology C", "techC_name"],
    ["", "Year of Commencement of R&D for C", "techC_year"],
    ["", "Investment in R&D for C (INR Crores)", "techC_investment"],
    ["", "Patents Obtained for C", "techC_patents"],
    ["", "Intangible Value Added by C", "techC_intangible_value"],
    ["", "Total R&D Investment in 2024-25 (INR Crores)", "total_rnd_investment_2425"],
    ["4", "Market Presence and Growth", ""],
    ["", "Customers in 2024-25 (Nos.)", "customers_2425"],
    ["", "Customers in 2023-24 (Nos.)", "customers_2324"],
    ["", "% Revenue from Digital in 2024-25", "revenue_percent_digital_2425"],
  ];

  const areRequiredFieldsEmpty = (step) => {
    const stepData = step === 3 ? part1 : part2;

    for (const [, , key] of stepData) {
      const val = formData[key];
      if (!val || val === "") {
        if (key && !["someOptionalKey1", "someOptionalKey2"].includes(key)) {
          return true;
        }
      }
    }

    if (step === 4) {
      if (!formData.comment || formData.comment.trim() === "") {
        return true;
      }
    }

    return false;
  };
    const getPercentageError = (value) => {
    if (Number(value) > 100) {
      return "Value must be less than or equal to 100";
    }
    return "";
  };

  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;
    return (
      <div className="form-step" role="region" aria-label={`Step ${currentStep} of 5`}>
        <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>

        {currentStep === 1 && (
          <div>
            <h3 className="step-title">Step 1: Organization Details</h3>
            <div className="form-group">
              <label htmlFor="Organisationname">Organisation Name:
                 {/* <span className="text-red">*</span> */}
                 </label>
              <input
                id="organisation_name"
                type="text"
                name="organisation_name"
                value={formData.organisation_name}
                onChange={(e) => handleChange("organisation_name", e.target.value)}
                // disabled={true}
                className={`form-input ${!formData.organisation_name && currentStep === 1 ? "has-error" : ""}`}
                placeholder="Enter organisation name"
                maxLength={FIELD_MAX_LENGTH}
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mailingAddress">Postal Address <span className="text-red">*</span></label>
              <textarea
                id="mailingAddress"
                name="mailingAddress"
                value={formData.mailingAddress}
                onChange={(e) => handleChange("mailingAddress", e.target.value)}
                className={`form-textarea ${!formData.mailingAddress && currentStep === 1 ? "has-error" : ""}`}
                rows={3}
                placeholder="Enter Postal address"
                aria-required="true"
                maxLength={TEXTAREA_MAX_LENGTH}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="step-title">Step 2: Approving Authority & Contact</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="step-section">
                <h4>Approving Authority</h4>
                <p className="note">Approving authority should be concerned  Director /Board level executive. </p>
                <div className="form-group">
                  <label htmlFor="authorityName">Name <span className="text-red">*</span></label>
                  <input
                    id="authorityName"
                    type="text"
                    name="authorityName"
                    value={formData.authorityName}
                    onChange={(e) => handleChange("authorityName", e.target.value)}
                    className={`form-input ${!formData.authorityName && currentStep === 2 ? "has-error" : ""}`}
                    placeholder="Name"
                    maxLength={FIELD_MAX_LENGTH}
                    aria-required="true"
                  />
                  {fieldErrors.authorityName && (
                    <span id="authorityName-error" className="error-tooltip" role="alert">
                      {fieldErrors.authorityName}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityTitle">Designation <span className="text-red">*</span></label>
                  <input
                    id="authorityTitle"
                    type="text"
                    name="authorityTitle"
                    value={formData.authorityTitle}
                    onChange={(e) => handleChange("authorityTitle", e.target.value)}
                    className={`form-input ${!formData.authorityTitle && currentStep === 2 ? "has-error" : ""}`}
                    placeholder="Designation"
                    maxLength={FIELD_MAX_LENGTH}
                    aria-required="true"
                  />
                  {fieldErrors.authorityTitle && (
                    <span id="authorityTitle-error" className="error-tooltip" role="alert">
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
                                        onChange={(e) => handleChange("authorityLandline", e.target.value)}
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
                                        onChange={(e) => handleChange("authorityPhone", e.target.value)}
                                        // onBlur={(e) => handleBlur('authorityPhone', e.target.value)}
                                        className={`form-input`}
                                        placeholder="Phone number"
                                        maxLength={PHONE_MAX_LENGTH}
                                        aria-required="true"
                                    // aria-describedby={fieldErrors.authorityPhone ? 'authorityPhone-error' : undefined}
                                    />
                                </div>
                <div className="form-group">
                  <label htmlFor="authorityEmail">Email Address <span className="text-red">*</span></label>
                  <input
                    id="authorityEmail"
                    type="email"
                    name="authorityEmail"
                    value={formData.authorityEmail}
                    onChange={(e) => handleChange("authorityEmail", e.target.value)}
                    className={`form-input ${!formData.authorityEmail && currentStep === 2 ? "has-error" : ""}`}
                    placeholder="E-mail address"
                    aria-required="true"
                  />
                  {fieldErrors.authorityEmail && (
                    <span id="authorityEmail-error" className="error-tooltip" role="alert">
                      {fieldErrors.authorityEmail}
                    </span>
                  )}
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
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="companyProfile">Brief Writeup of Company's Profile</label>
              <p className="note"> (within 300 words)</p>
              <textarea
                id="companyProfile"
                name="companyProfile"
                value={formData.companyProfile}
                onChange={(e) => handleChange("companyProfile", e.target.value)}
                className={`form-textarea ${!formData.companyProfile && currentStep === 2 ? "has-error" : ""}`}
                rows={6}
                // maxLength={COMPANY_PROFILE_MAX_LENGTH}
              />
              {fieldErrors.companyProfile && (
                <span id="companyProfile-error" className="error-tooltip" role="alert">
                  {fieldErrors.companyProfile}
                </span>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
            <table className="quant-table">
              <thead>
                <tr>
                  <th scope="col">S. No.</th>
                  <th scope="col">Particulars</th>
                  <th scope="col">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {part1.map(([num, label, key]) => (
                  <tr key={key || num}>
                    <td>{num}</td>
                    <td>{label}</td>
                    <td>
                      {key ? (
                        // <input
                        //   type={
                        //     key.includes("year")
                        //       ? "number"
                        //       : key.includes("revenue") || key.includes("customers")
                        //       ? "number"
                        //       : "text"
                        //   }
                        //   value={formData[key] || ""}
                        //   onChange={(e) => handleChange(key, e.target.value)}
                        //   className={`form-input ${fieldErrors[key] ? "has-error" : ""}`}
                        //   aria-label={`${label} input`}
                        //   aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                        //   maxLength={
                        //     key.includes("name") || key.includes("areas") || key.includes("intangible_value")
                        //       ? FIELD_MAX_LENGTH
                        //       : key.includes("year")
                        //       ? 4
                        //       : undefined
                        //   }
                        //   step={key.includes("revenue") || key.includes("customers") ? "0.01" : undefined}
                        // />
                        <TextField
  variant="outlined"
  size="small"
  fullWidth
  type={key.includes("year") || key.includes("revenue") || key.includes("customers") ? "text" : "text"} 
  // always "text" to prevent browser number spinners
  value={formData[key] || ""}
  onChange={(e) => {
    let val = e.target.value;

    // If this is a numeric field, allow only digits and one decimal point
    if (key.includes("year") || key.includes("revenue") || key.includes("customers")) {
      val = val.replace(/[^0-9.]/g, "");
      const parts = val.split(".");
      if (parts.length > 2) {
        val = parts[0] + "." + parts.slice(1).join("");
      }
    }

    handleChange(key, val);
  }}
  onKeyDown={(e) => {
    // For numeric fields, block invalid characters
    if (key.includes("year") || key.includes("revenue") || key.includes("customers")) {
      if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    }
  }}
  onWheel={(e) => {
    if (key.includes("year") || key.includes("revenue") || key.includes("customers")) {
      e.target.blur(); // disable mouse scroll increment
    }
  }}
  className={`form-input ${fieldErrors[key] ? "has-error" : ""}`}
  aria-label={`${label} input`}
  aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
  inputProps={{
    maxLength:
      key.includes("name") || key.includes("areas") || key.includes("intangible_value")
        ? FIELD_MAX_LENGTH
        : key.includes("year")
        ? 4
        : undefined,
    inputMode:
      key.includes("year") || key.includes("revenue") || key.includes("customers")
        ? "decimal"
        : undefined, // numeric keypad for mobile
    pattern:
      key.includes("year") || key.includes("revenue") || key.includes("customers")
        ? "[0-9]*\\.?[0-9]*"
        : undefined,
    min: key.includes("year") || key.includes("revenue") || key.includes("customers") ? 0 : undefined,
  }}
/>
                      ) : (
                        <span></span>
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
        )}

{currentStep === 4 && (
  <div>
    <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
    <table className="quant-table">
      <thead>
        <tr>
          <th scope="col">S. No.</th>
          <th scope="col">Particulars</th>
          <th scope="col">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {part2.map(([num, label, key]) => {
          const isNumericField =
            key?.includes("year") || key?.includes("investment") || key?.includes("customers");

          return (
            <tr key={key || num}>
              <td>{num}</td>
              <td>{label}</td>
              <td>
                {key ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="text" // always text to prevent browser spinners
                    name={key}
                    value={formData[key] || ""}
                    onChange={(e) => {
                      let val = e.target.value;

                      // For numeric fields: allow only digits and one decimal point
                      if (isNumericField) {
                        val = val.replace(/[^0-9.]/g, "");
                        const parts = val.split(".");
                        if (parts.length > 2) {
                          val = parts[0] + "." + parts.slice(1).join("");
                        }
                      }

                      handleChange(key, val);
                    }}
                    onKeyDown={(e) => {
                      if (isNumericField) {
                        if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
                          e.preventDefault();
                        }
                      }
                    }}
                    onWheel={(e) => {
                      if (isNumericField) e.target.blur();
                    }}
                    className={`form-input ${fieldErrors[key] ? "has-error" : ""}`}
                    aria-label={`${label} input`}
                    aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                    inputProps={{
                      inputMode: isNumericField ? "decimal" : undefined,
                      pattern: isNumericField ? "[0-9]*\\.?[0-9]*" : undefined,
                      min: isNumericField ? 0 : undefined,
                      maxLength:
                        key.includes("name") ||
                        key.includes("patents") ||
                        key.includes("intangible_value")
                          ? FIELD_MAX_LENGTH
                          : key.includes("year")
                          ? 4
                          : undefined,
                      step: key.includes("investment") || key.includes("customers") ? "0.01" : undefined,
                    }}
                  />
                ) : (
                  <span></span>
                )}

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
          );
        })}
      </tbody>
    </table>


    <div className="form-group">
      <label htmlFor="comment">Comments</label>
      <textarea
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={(e) => handleChange("comment", e.target.value)} // ✅ standardized
        className={`form-textarea ${
          fieldErrors.comment ? "has-error" : ""
        }`}
        placeholder="Comments in (200 characters) against input parameter, if any"
        rows={4}
      />
      {fieldErrors.comment && (
        <span
          id="comment-error"
          className="error-tooltip"
          role="alert"
        >
          {fieldErrors.comment}
        </span>
      )}
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
                    <th scope="col">S. No.</th>
                    <th scope="col">Description</th>
                    <th scope="col">Upload (only jpg, png, pdf, max 5 MB each)</th>
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
                            onChange={(e) => handleAttachmentChange(key, "description", e.target.value)}
                            placeholder="Enter description"
                            className={`form-input ${fieldErrors[`${key}.description`] ? "has-error" : ""}`}
                            maxLength={FIELD_MAX_LENGTH}
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) => handleAttachmentChange(key, "file", e.target.files[0], e)}
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
                Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid. <span className="text-red">*</span>
              </label>
              <div className="form-navigation">
                <button type="button" onClick={handlePrint} className="btn btn-outline">
                  Print Preview
                </button>
              </div>
            </div>

                                   {/* <div className="form-group">
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
                        </div> */}


                        <div className="form-group">
              <label htmlFor="approvingAuthoritySignature">
                Upload Document with Approving Authority Signature
                (Director/Board Level)
                <span aria-hidden="true" className="text-red">
                  *
                </span>
                :
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
                className={`form-input mt-4 ${
                  fieldErrors.approvingAuthoritySignature ? "has-error" : ""
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
                  onChange={(e) => handleChange("declaration", e.target.checked)}
                  className="form-checkbox"
                  aria-required="true"
                /> I declare that the information submitted is true and complete.
              </label>
              {fieldErrors.declaration && (
                <span id="declaration-error" className="error-tooltip" role="alert">
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
        sidebarItems={[{ id: "Guideline", label: "Guideline" }]}
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
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn btn-primary"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            {currentStep === 1 && (
              <div className="form-navigation-step1">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="btn btn-outline"
                >
                  <Save size={16} /> Save Draft
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
            {currentStep > 1 && (
              <div className="form-navigation">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-outline"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <button
                  type="button"
                  onClick={saveDraft}
                  className="btn btn-outline"
                >
                  <Save size={16} /> Save Draft
                </button>
                {currentStep < 5 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                )}
                {currentStep === 5 && (
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={(e) => {
                      if (!window.confirm("Are you sure you want to submit?")) {
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

export default RegistrationDigital;