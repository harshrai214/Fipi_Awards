import React, { useState, useEffect, useCallback } from "react";
// import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
// import apiClient from "../api/axiosClient";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/FormProduction.css";
import SidebarGuideline from "./SidebarGuideline";
import TextField from "@mui/material/TextField";

// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const COMPANY_PROFILE_MAX_LENGTH = 300;
const COMMENT_MAX_LENGTH = 200;
const TEXTAREA_MAX_LENGTH = 300;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const RegistrationHRM = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const awardTitle =
    location.state?.awardTitle ||
    "Human Resource Management Company of the Year";

  // Form state initialization
  const [formData, setFormData] = useState({
    Organisationname: "",
    category: "Human Resource Management Company of the Year",

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
    approvingAuthoritySignature: null,
    declaration: false,
    comment: "",
    ldGM: "",
    ldExecutive: "",
    ldWorkmen: "",
    ldHSE: "",
    ldSkill: "",
    ldFunctional: "",
    ldManagement: "",
    attritionEntry: "",
    attritionExecutive: "",
    attritionSenior: "",
    recruitVacancies: "",
    recruitFilled: "",
    recruitCycle: "",
    diversityTotal: "",
    diversityUnder40: "",
    diversityFemale: "",
    diversityQualified: "",
    diversityDisabled2024: "",
    diversityDisabled2023: "",
    pmeDone: "",
    pmeRequired: "",
    retentionFemalePast: "",
    grievanceMechanism: "",
    grievanceMechanism2: "",
    grievanceMechanism3: "",
    employeeAwards: "",
    employeeAwards2: "",
    employeeAwards3: "",
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
        const prefillRaw = sessionStorage.getItem('registrationHRM_prefill');
        if (prefillRaw) {
          const prefill = JSON.parse(prefillRaw);
          if (prefill && typeof prefill === 'object') {
            setFormData((prev) => ({ ...prev, ...prefill }));
            if (prefill.step) setCurrentStep(Number(prefill.step));
          }
          // remove after consuming so it doesn't override later edits
          sessionStorage.removeItem('registrationHRM_prefill');
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
        const draftRaw = localStorage.getItem('registrationHRMDraft');
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
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if ([1, 2, 3, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (name === "companyProfile")
        applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
      else if (name === "comment") applicableMaxLength = COMMENT_MAX_LENGTH;
      else if (
        [
          "grievanceMechanism",
          "grievanceMechanism2",
          "grievanceMechanism3",
          "employeeAwards",
          "employeeAwards2",
          "employeeAwards3",
        ].includes(name)
      ) {
        applicableMaxLength = TEXTAREA_MAX_LENGTH;
      }

      if (typeof value === "string") {
        if (name === "companyProfile") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed.");
            return;
          }
        } else if (name === "comment") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 200) {
            alert("Maximum 200 words allowed in Comments.");
            return;
          }
        } else if (name === "grievanceMechanism") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed ");
            return;
          }
        } else if (name === "grievanceMechanism2") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed ");
            return;
          }
        } else if (name === "grievanceMechanism3") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed ");
            return;
          }
        } else if (name === "employeeAwards") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed ");
            return;
          }
        } else if (name === "employeeAwards2") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed ");
            return;
          }
        } else if (name === "employeeAwards3") {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount > 300) {
            alert("Maximum 300 words allowed");
            return;
          }
        } else if (value.length > applicableMaxLength) {
          alert(`Value cannot exceed ${applicableMaxLength} characters.`);
          return;
        }
      }

      if (type === "number") {
        if (value === "") {
          clearFieldError(name);
        } else {
          const numVal = Number(value);
          if (numVal < 0) {
            alert("Value cannot be negative.");
            return;
          } else {
            clearFieldError(name);
          }
        }
      }
    } else {
      clearFieldError(name);
    }

    // Name validation
    if (["Organisationname", "authorityName", "contact_name"].includes(name)) {
      const isValid = /^[A-Za-z\s]*$/.test(value);
      if (!isValid && value !== "") {
        alert("Only letters and spaces are allowed.");
        return;
      }
    }

    // Phone validation
    if (name === "authorityPhone" || name === "contact_phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, PHONE_MAX_LENGTH);
      if (numericValue.length > PHONE_MAX_LENGTH) {
        alert("Phone number must not exceed 10 digits.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      clearFieldError(name);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "Organisationname" && value && currentStep === 1) setError("");
    if (name === "mailingAddress" && value.trim() && currentStep === 1)
      setError("");
    if (name === "authorityName" && value && currentStep === 2) setError("");
    if (name === "authorityTitle" && value && currentStep === 2) setError("");
    if (name === "authorityEmail" && value && currentStep === 2) setError("");
    if (name === "authorityPhone" && value && currentStep === 2) setError("");
  };

  // Handle checkbox for copying applicant data

  const handleCopyApplicantToggle = (e) => {
    const checked = e.target.checked;
    // setCopyApplicantData(checked);

    const model = {
      contact_name: "",
      contact_phone: "",
      contact_email: "",
    };

    if (checked) {
      const userInfo = JSON.parse(sessionStorage.getItem("user_info"));
      if (userInfo) {
        model.contact_name = userInfo.applicant_name;
        model.contact_phone = userInfo.applicant_phone;
        model.contact_email = userInfo.email;
      }
    }

    setFormData((prev) => ({ ...prev, ...model }));

    clearFieldError("contact_name");
    clearFieldError("contact_phone");
    clearFieldError("contact_email");
  };

  // Keep contact fields in sync if checkbox ON and applicant fields (or localStorage) change
  // This effect reads live values from localStorage to honor "pick data from localStorage" requirement.
  //   useEffect(() => {
  //     if (!copyApplicantData) return;

  //     let user = {};
  //     try {
  //       const raw = localStorage.getItem("user_info");
  //       if (raw) user = JSON.parse(raw);
  //     } catch (err) {
  //       console.warn("Failed to parse user_info from localStorage in sync effect:", err);
  //     }

  //     setFormData((prev) => ({
  //       ...prev,
  //       contact_name: user.applicant_name || prev.applicant_name || "",
  //       contact_phone: user.applicant_phone || prev.applicant_phone || "",
  //       contact_email: user.email || prev.applicant_email || "",
  //     }));

  //     clearFieldError("contact_name");
  //     clearFieldError("contact_phone");
  //     clearFieldError("contact_email");
  //     // We intentionally do not add formData.* to the dependency array here that would cause infinite loops.
  //     // The dependency below ensures we re-run when copyApplicantData toggles.
  //   }, [copyApplicantData, clearFieldError]);

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
  const grievanceAnswer = formData.grievanceMechanism || "No";
  const grievanceDetails =
    grievanceAnswer === "Yes" ? formData.grievanceMechanism2 || "—" : "";

  const awardsAnswer = formData.employeeAwards || "No";
  const awardsDetails =
    awardsAnswer === "Yes" ? formData.employeeAwards2 || "—" : "";

  const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
      <h2>Organization & Contact Details</h2>
      <p><strong>Organisation Name:</strong> ${formData.Organisationname || ""}</p>

      <h2>Nodal Official Contact Details:</h2>
      <p><strong>Postal Address:</strong> ${formData.mailingAddress || ""}</p>
      <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ""}</p>
      <p><strong>Approving Authority Title:</strong> ${formData.authorityTitle || ""}</p>
      <p><strong>Approving Authority Landline:</strong> ${formData.authorityLandline || ""}</p>
      <p><strong>Approving Authority Phone:</strong> ${formData.authorityPhone || ""}</p>
      <p><strong>Approving Authority Email:</strong> ${formData.authorityEmail || ""}</p>

      <p><strong>Contact Name:</strong> ${formData.contact_name || ""}</p>
      <p><strong>Contact Phone:</strong> ${formData.contact_phone || ""}</p>
      <p><strong>Contact Email:</strong> ${formData.contact_email || ""}</p>
      <p><strong>Brief write-up on company’s profile:</strong> ${formData.companyProfile || ""}</p>

      <h2>Quantitative Information - Part 1</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
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
            <th style="border: 1px solid #000; padding: 8px;">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
            <th style="border: 1px solid #000; padding: 8px;">Assessment Year</th>
          </tr>
        </thead>
        <tbody>
          ${renderQuantitativePrint(6, 9)}
        </tbody>
      </table>

      <h2>Qualitative Sections</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Description</th>
            <th style="border: 1px solid #000; padding: 8px;">Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #000; padding: 8px;">8.1</td>
            <td style="border: 1px solid #000; padding: 8px;">Grievance Mechanism</td>
            <td style="border: 1px solid #000; padding: 8px;">${grievanceAnswer}</td>
          </tr>
          ${
            grievanceAnswer === "Yes"
              ? `
                <tr>
                  <td style="border: 1px solid #000; padding: 8px;">8.2</td>
                  <td style="border: 1px solid #000; padding: 8px;">Details</td>
                  <td style="border: 1px solid #000; padding: 8px;">${grievanceDetails}</td>
                </tr>
              `
              : ""
          }
          <tr>
            <td style="border: 1px solid #000; padding: 8px;">9.1</td>
            <td style="border: 1px solid #000; padding: 8px;">Employee Awards</td>
            <td style="border: 1px solid #000; padding: 8px;">${awardsAnswer}</td>
          </tr>
          ${
            awardsAnswer === "Yes"
              ? `
                <tr>
                  <td style="border: 1px solid #000; padding: 8px;">9.2</td>
                  <td style="border: 1px solid #000; padding: 8px;">Details</td>
                  <td style="border: 1px solid #000; padding: 8px;">${awardsDetails}</td>
                </tr>
              `
              : ""
          }
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
          ${[1, 2, 3, 4]
            .map(
              (i) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${i}</td>
              <td style="border: 1px solid #000; padding: 8px;">${
                formData[`attachments${i}`].description || ""
              }</td>
              <td style="border: 1px solid #000; padding: 8px;">${
                formData[`attachments${i}`].file?.name || ""
              }</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <h2>Comments</h2>
      <p>${formData.comment || ""}</p>

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
      // if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) {
      //     alert('Authority phone must be exactly 10 digits.');
      //     return;
      // }
      if (!formData.authorityLandline) {
        alert("Authority Landline is required.");
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
        alert("Company profile is required.");
        return;
      }
    }
    if (currentStep === 3 && areFieldsEmpty(1, 5)) {
      if (!window.confirm("Data not entered, If you wish to continue?")) {
        return; // stop navigation if canceled
      }
    }
    if (currentStep === 4 && areFieldsEmpty(6, 9)) {
      if (!window.confirm("Data not entered, If you wish to continue?")) {
        return;
      }
    }

    if (Object.values(fieldErrors).some(Boolean)) {
      alert("Please resolve all errors before continuing.");
      return;
    }

    setError("");
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // Save draft handler
  const handleSaveDraft = () => {
    try {
      const draftToStore = {
        formData: serializeFormForStorage(formData), // ⭐ ADDED - store a safe copy
        step: currentStep, // ⭐ ADDED - persist current step so user returns to same step
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem('registrationHRMDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

  // Submit form handler
  // Paste this in place of your existing handleSubmit
  async function handleSubmit(event) {
    event.preventDefault();

    // 1) Load user info synchronously (don't rely on setFormData + immediate read)
    let user = {};
    try {
      const raw = localStorage.getItem("user_info");
      if (raw) user = JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to parse user_info from localStorage:", err);
    }

    // 2) Merge formData with possible user fields into a local `data` object
    const data = {
      // prefer the form's values, fallback to user values or empty string
      Organisationname:
        formData.Organisationname || user.organisation_name || "",
      organisation_name:
        formData.organisation_name ||
        formData.Organisationname ||
        user.organisation_name ||
        "",
      category: formData.category || "",
      mailingAddress: formData.mailingAddress || formData.mailing_address || "",
      mailing_address:
        formData.mailing_address || formData.mailingAddress || "",
      firstname: formData.firstname || user.first_name || "",
      lastname: formData.lastname || user.last_name || "",
      userid: formData.userid || (user.id ? String(user.id) : ""),
      company_name: formData.company_name || "",
      // Authority / contact fields (support both camelCase and PascalCase variants)
      authorityName: formData.authorityName || formData.authority_name || "",
      authority_name: formData.authority_name || formData.authorityName || "",
      authorityTitle: formData.authorityTitle || formData.authority_title || "",
      authority_title:
        formData.authority_title || formData.authorityTitle || "",
      authorityPhone: formData.authorityPhone || formData.authority_phone || "",
      authorityLandline:
        formData.authorityLandline || formData.authorityLandline || "",
      authority_phone:
        formData.authority_phone || formData.authorityPhone || "",
      authorityEmail: formData.authorityEmail || formData.authority_email || "",
      authority_email:
        formData.authority_email || formData.authorityEmail || "",
      contact_name:
        formData.contact_name ||
        formData.contact_name ||
        user.applicant_name ||
        "",
      contact_name:
        formData.contact_name ||
        formData.contact_name ||
        user.applicant_name ||
        "",
      contact_phone:
        formData.contact_phone ||
        formData.contact_phone ||
        user.applicant_phone ||
        "",
      contact_phone:
        formData.contact_phone ||
        formData.contact_phone ||
        user.applicant_phone ||
        "",
      contact_email:
        formData.contact_email || formData.contact_email || user.email || "",
      contact_email:
        formData.contact_email || formData.contact_email || user.email || "",
      companyProfile: formData.companyProfile || formData.company_profile || "",
      company_profile:
        formData.company_profile || formData.companyProfile || "",
      award_justification: formData.award_justification || "",
      comment: formData.comment || "",
      declaration: !!formData.declaration,
      // file (approving authority signature) — support both names
      approvingAuthoritySignature:
        formData.approvingAuthoritySignature ||
        formData.approving_authority_file ||
        null,
      approving_authority_file:
        formData.approving_authority_file ||
        formData.approvingAuthoritySignature ||
        null,
      // Quantitative fields (keep original keys as in your state)
      ldGM: formData.ldGM ?? "",
      ldExecutive: formData.ldExecutive ?? "",
      ldWorkmen: formData.ldWorkmen ?? "",
      ldHSE: formData.ldHSE ?? "",
      ldSkill: formData.ldSkill ?? "",
      ldFunctional: formData.ldFunctional ?? "",
      ldManagement: formData.ldManagement ?? "",
      attritionEntry: formData.attritionEntry ?? "",
      attritionExecutive: formData.attritionExecutive ?? "",
      attritionSenior: formData.attritionSenior ?? "",
      recruitVacancies: formData.recruitVacancies ?? "",
      recruitFilled: formData.recruitFilled ?? "",
      recruitCycle: formData.recruitCycle ?? "",
      diversityTotal: formData.diversityTotal ?? "",
      diversityUnder40: formData.diversityUnder40 ?? "",
      diversityFemale: formData.diversityFemale ?? "",
      diversityQualified: formData.diversityQualified ?? "",
      diversityDisabled2024: formData.diversityDisabled2024 ?? "",
      diversityDisabled2023: formData.diversityDisabled2023 ?? "",
      pmeDone: formData.pmeDone ?? "",
      pmeRequired: formData.pmeRequired ?? "",
      retentionFemalePast: formData.retentionFemalePast ?? "",
      grievanceMechanism: formData.grievanceMechanism ?? "",
      grievanceMechanism2: formData.grievanceMechanism2 ?? "",
      grievanceMechanism3: formData.grievanceMechanism3 ?? "",
      employeeAwards: formData.employeeAwards ?? "",
      employeeAwards2: formData.employeeAwards2 ?? "",
      employeeAwards3: formData.employeeAwards3 ?? "",
      // attachments objects
      attachments1: formData.attachments1 || { description: "", file: null },
      attachments2: formData.attachments2 || { description: "", file: null },
      attachments3: formData.attachments3 || { description: "", file: null },
      attachments4: formData.attachments4 || { description: "", file: null },
    };

    // 3) Basic validations (use `data` not `formData`)
    if (!data.declaration) {
      return alert("Please accept the declaration.");
    }

    const phoneRegex = /^\d{10}$/;
    if (
      !phoneRegex.test(
        String(data.authorityPhone || data.authority_phone || "")
      )
    ) {
      return alert("Authority phone must be a 10-digit number.");
    }
    if (
      data.contact_phone &&
      !phoneRegex.test(String(data.contact_phone || data.contact_phone || ""))
    ) {
      return alert("Contact phone must be a 10-digit number.");
    }

    // Approving authority signature/file must be provided
    const approvingFile =
      data.approvingAuthoritySignature || data.approving_authority_file || null;
    if (!approvingFile) {
      return alert("Please upload approving authority signature/document.");
    }

    // 4) Build FormData (map to backend/modeled field names)
    const fd = new FormData();

    // Identity & contact mapping (backend expects snake_case in model)
    fd.append("organisation_name", data.organisation_name || "");
    fd.append("category", data.category || "");
    fd.append("firstname", data.firstname || "");
    fd.append("lastname", data.lastname || "");
    fd.append("userid", data.userid || "");
    fd.append("company_name", data.company_name || "");
    fd.append(
      "mailing_address",
      data.mailing_address || data.mailingAddress || ""
    );

    fd.append(
      "authority_name",
      data.authority_name || data.authorityName || ""
    );
    fd.append(
      "authority_title",
      data.authority_title || data.authorityTitle || ""
    );
    fd.append(
      "authority_phone",
      data.authority_phone || data.authorityPhone || ""
    );
    fd.append(
      "authorityLandline",
      formData.authorityLandline || data.authorityLandline || ""
    );
    fd.append(
      "authority_email",
      data.authority_email || data.authorityEmail || ""
    );

    fd.append("contact_name", data.contact_name || data.contact_name || "");
    fd.append("contact_phone", data.contact_phone || data.contact_phone || "");
    fd.append("contact_email", data.contact_email || data.contact_email || "");

    fd.append(
      "company_profile",
      data.company_profile || data.companyProfile || ""
    );
    fd.append("award_justification", data.award_justification || "");
    fd.append("comment", data.comment || "");
    fd.append("declaration", data.declaration ? "true" : "false");

    // Approving file — backend model field name is approving_authority_file
    if (approvingFile instanceof File) {
      fd.append("approving_authority_file", approvingFile);
    } else if (
      typeof approvingFile === "object" &&
      approvingFile?.file instanceof File
    ) {
      // support case where approving file might be nested like { file: File }
      fd.append("approving_authority_file", approvingFile.file);
    }

    // 5) Append all quantitative fields exactly as model names
    const numericFields = [
      "ldGM",
      "ldExecutive",
      "ldWorkmen",
      "ldHSE",
      "ldSkill",
      "ldFunctional",
      "ldManagement",
      "attritionEntry",
      "attritionExecutive",
      "attritionSenior",
      "recruitVacancies",
      "recruitFilled",
      "recruitCycle",
      "diversityTotal",
      "diversityUnder40",
      "diversityFemale",
      "diversityQualified",
      "diversityDisabled2024",
      "diversityDisabled2023",
      "pmeDone",
      "pmeRequired",
      "retentionFemalePast",
    ];

    numericFields.forEach((f) => {
      const v = data[f];
      // append value or empty string (backend fields are null/blank allowed)
      fd.append(f, v !== undefined && v !== null ? String(v) : "");
    });

    // 6) Text blocks
    fd.append("grievanceMechanism", data.grievanceMechanism || "");
    fd.append("grievanceMechanism2", data.grievanceMechanism2 || "");
    fd.append("grievanceMechanism3", data.grievanceMechanism3 || "");

    fd.append("employeeAwards", data.employeeAwards || "");
    fd.append("employeeAwards2", data.employeeAwards2 || "");
    fd.append("employeeAwards3", data.employeeAwards3 || "");

    // 7) Attachments (map to attachments*_desc and attachments* fields)
    [1, 2, 3, 4].forEach((n) => {
      const slot = data[`attachments${n}`] || { description: "", file: null };
      fd.append(`attachments${n}_desc`, slot.description || "");
      if (slot.file instanceof File) {
        fd.append(`attachments${n}`, slot.file);
      } else if (
        slot.file &&
        typeof slot.file === "object" &&
        slot.file instanceof Blob
      ) {
        // if your file is a Blob or different wrapper, handle here
        fd.append(`attachments${n}`, slot.file);
      }
    });

    // 8) Endpoint: change this to your actual backend route if different.
    // Common paths used in earlier discussion: "/api/registration-hrm/" or "/hrm-registration/"
    const endpoint = "/hrm-registration/"; // <-- adjust to your registered URL if needed

    // 9) POST using axios (apiClient)
    try {
    //   const res = await apiClient.post(endpoint, fd, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });


          try {
        localStorage.removeItem('registrationHRMDraft');
      } catch (err) {
        // ignore
      }

      alert("HRM Registration submitted successfully!");
      setIsSubmitted(true);
    } catch (err) {
      console.error("HRM submission failed:", err.response || err);
      // show the most useful server message we can
      const serverMsg =
        err.response?.data?.detail ||
        err.response?.data ||
        err.response?.statusText ||
        err.message;
      alert("Submission error: " + JSON.stringify(serverMsg));
    }
  }

  // Quantitative data for steps 3 and 4
  const data = [
    {
      num: 1,

      subItems: [
        {
          num: "1",
          label:
            "Learning & Development(Total no. of training days imparted to such employees/no. of such employees at the mentioned level)",
        },
        { num: "1.1", label: "GM and above", key: "ldGM" },
        {
          num: "1.2",
          label: "Executive (up to E-6 level)",
          key: "ldExecutive",
        },
        { num: "1.3", label: "Workmen", key: "ldWorkmen" },
        { num: "1.4", label: "Total HSE training days", key: "ldHSE" },
        {
          num: "1.5",
          label:
            "No. of training days per employee (Excluding HSE) for each of the following: ",
          key: "",
        },
        { num: "1.5.1", label: "Skill Development Training", key: "ldSkill" },
        {
          num: "1.5.2",
          label: "Functional/On-job Training",
          key: "ldFunctional",
        },
        { num: "1.5.3", label: "Management Training", key: "ldManagement" },
      ],
    },
    {
      num: 2,
      // title: 'Employee attrition rate (other than retirement)',
      subItems: [
        { num: "2", label: "Employee attrition rate (other than retirement)" },
        {
          num: "2.1",
          label: "Entry level (within first two years of joining) ",
          key: "attritionEntry",
        },
        {
          num: "2.2",
          label: "Executives (up to E-6 level in PSU or equivalent)",
          key: "attritionExecutive",
        },
        {
          num: "2.3",
          label: "Senior Management (E-7 & above or equivalent) ",
          key: "attritionSenior",
        },
      ],
    },
    {
      num: 3,
      // title: '% Recruitment (Full Time; Regular Employee)',
      subItems: [
        { num: "3", label: "% Recruitment (Full Time; Regular Employee)" },
        {
          num: "3.1",
          label:
            "Total vacancies identified for recruitment to be during the year",
          key: "recruitVacancies",
        },
        {
          num: "3.2",
          label: "Total no of positions filled during the year through hiring",
          key: "recruitFilled",
        },
      ],
    },
    {
      num: 4,
      // title: 'Recruitment Cycle Completion (Avg. days)',
      subItems: [
        {
          num: "4",
          label:
            "Recruitment Cycle Completion (Avg. no. of days from when the job requisition was received until the offer was accepted by the candidate) ",
        },
        {
          num: "4.1",
          label: "Recruitment Cycle Completion",
          key: "recruitCycle",
        },
      ],
    },
    {
      num: 5,
      // title: 'Diverse workforce (as on 31st March)',
      subItems: [
        { num: "5", label: "Diverse workforce (as on 31st March" },
        { num: "5.1", label: "Total No. of Employees", key: "diversityTotal" },
        {
          num: "5.2",
          label: "No. of Employees under 40 years",
          key: "diversityUnder40",
        },
        {
          num: "5.3",
          label: "No. of Female employees",
          key: "diversityFemale",
        },
        {
          num: "5.4",
          label: "No of Employees with higher qualification",
          key: "diversityQualified",
        },
        {
          num: "5.5",
          label: "No. of Differently-abled employees (assessment yr)",
          key: "diversityDisabled2024",
        },
        {
          num: "5.6",
          label: "No. of Differently-abled employees (earlier yr)",
          key: "diversityDisabled2023",
        },
      ],
    },
    {
      num: 6,
      // title: 'Preventive Medical Examination (PME)',
      subItems: [
        { num: "6", label: "Preventive Medical Examination (PME)" },
        {
          num: "6.1",
          label:
            "No. of Employees undergone Preventive Medical Examination (PME) during the year",
          key: "pmeDone",
        },
        {
          num: "6.2",
          label:
            "No. of Employees who were to undergo PME as per company policy during the year ",
          key: "pmeRequired",
        },
      ],
    },
    {
      num: 7,
      // title: 'Progress in Retaining Female Workforce',
      subItems: [
        { num: "7", label: "Progress in Retaining Female Workforce" },
        {
          num: "7.1",
          label: "No. of Female Employees Five Years ago",
          key: "retentionFemalePast",
        },
      ],
    },
    {
      num: 8,
      // title: 'Grievance Redressal Mechanism (within 300 words)',
      subItems: [
        {
          num: "8",
          label:
            "Grievance Redressal Mechanism Does the company provide a channel through which employees can report suspected grievances, and does the channel allow for confidential and/or anonymous reporting (Yes/No); provide details in bullet points (within 300 words)",
        },
        { num: "8.1", key: "grievanceMechanism" },
        { num: "8.2", key: "grievanceMechanism2" },
        
      ],
    },
    {
      num: 9,
      // title: 'Recognition & Award Programmes (within 300 words)',
      subItems: [
        {
          num: "9",
          label:
            "Recognition & Award Programmes for Employees  Details (in bullet points) of awrds/recognitions programmes active within the organization for employees in the year 2024-25 (Within 300 words)",
        },
        { num: "9.1", key: "employeeAwards" },
        { num: "9.2", key: "employeeAwards2" },
        
      ],
    },
  ];

  const areFieldsEmpty = (start, end) => {
    const filteredData = data.filter(
      (section) => Number(section.num) >= start && Number(section.num) <= end
    );

    for (const section of filteredData) {
      const items = section.subItems || [];

      for (const item of items) {
        if (!item.key) continue; // ✅ Skip if there's no key (e.g., label or heading)

        const val = formData[item.key];

        // ✅ Skip hidden or optional fields (you can extend logic here if needed)
        if (val === undefined || val === null || val === "") {
          return true;
        }

        // ✅ Also check arrays (if any)
        if (
          Array.isArray(val) &&
          val.some((v) => v === "" || v === null || v === undefined)
        ) {
          return true;
        }
      }
    }

    return false; // ✅ All filled or non-required
  };

  const renderQuantitativePrint = (sectionStart, sectionEnd) => {
    let html = "";
    const filteredData = data.filter(
      (section) => section.num >= sectionStart && section.num <= sectionEnd
    );
    filteredData.forEach((section) => {
      const items = section.subItems || section.fields;
      items.forEach((item, index) => {
        html += `
          <tr>
           
            <td style="border: 1px solid #000; padding: 8px;">${
              item.num || ""
            }</td>
            <td style="border: 1px solid #000; padding: 8px;">${
              item.label || section.title
            }</td>
            <td style="border: 1px solid #000; padding: 8px;">${
              formData[item.key] || ""
            }</td>
          </tr>
        `;
      });
    });
    return html;
  };

  const getPercentageError = (value) => {

    if (Number(value) > 100) {
      return "Value must be less than or equal to 100";
    }
    return "";
  };
  // Rendering steps content
  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;

   

const headerNums = ["1", "1.5", "2", "3", "4", "5", "6", "7"];

const renderSection = (section) => {
  const items = section.subItems || section.fields || [];

  
  if (section.num == 8) {
    return (
      <>
        <tr>
          <td className="sno-cell">{section.subItems?.[0]?.num ?? ""}</td> 
          <td className="label-cell">{section.subItems?.[0]?.label ?? ""}</td>
          <td>
            <div className="yes-no-toggle">
              <button
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "grievanceMechanism", value: "Yes" } })
                }
                className={`form-button ${formData.grievanceMechanism === "Yes" ? "active" : ""}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "grievanceMechanism", value: "No" } })
                }
                className={`form-button ${formData.grievanceMechanism === "No" ? "active" : ""}`}
              >
                No
              </button>

              {fieldErrors.grievanceMechanism && (
                <span className="error-tooltip" id="grievanceMechanism-error" role="alert">
                  {fieldErrors.grievanceMechanism}
                </span>
              )}
            </div>
          </td>
        </tr>

        {formData.grievanceMechanism === "Yes" && (
          <tr>
            <td className="sno-cell">{section.subItems?.[1]?.num ?? ""}</td>
            <td colSpan={2}>
              <textarea
                name="grievanceMechanism2"
                value={formData.grievanceMechanism2 || ""}
                onChange={handleChange}
                className="form-input"
                rows={4}
              />
              {fieldErrors.grievanceMechanism2 && (
                <span className="error-tooltip" id="grievanceMechanism2-error" role="alert">
                  {fieldErrors.grievanceMechanism2}
                </span>
              )}
            </td>
          </tr>
        )}
      </>
    );
  }

  // --- Section 9 (Yes/No + optional textarea) ---
  if (section.num == 9) {
    return (
      <>
        <tr>
          <td className="sno-cell">{section.subItems?.[0]?.num ?? ""}</td>
          <td className="label-cell">{section.subItems?.[0]?.label ?? ""}</td>
          <td>
            <div className="yes-no-toggle">
              <button
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "employeeAwards", value: "Yes" } })
                }
                className={`form-button ${formData.employeeAwards === "Yes" ? "active" : ""}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "employeeAwards", value: "No" } })
                }
                className={`form-button ${formData.employeeAwards === "No" ? "active" : ""}`}
              >
                No
              </button>

              {fieldErrors.employeeAwards && (
                <span className="error-tooltip" id="employeeAwards-error" role="alert">
                  {fieldErrors.employeeAwards}
                </span>
              )}
            </div>
          </td>
        </tr>

        {formData.employeeAwards === "Yes" && (
          <tr>
            <td className="sno-cell">{section.subItems?.[1]?.num ?? ""}</td>
            <td colSpan={2}>
              <textarea
                name="employeeAwards2"
                value={formData.employeeAwards2 || ""}
                onChange={handleChange}
                className="form-input"
                rows={4}
              />
              {fieldErrors.employeeAwards2 && (
                <span className="error-tooltip" id="employeeAwards2-error" role="alert">
                  {fieldErrors.employeeAwards2}
                </span>
              )}
            </td>
          </tr>
        )}
      </>
    );
  }

  // --- Default rendering (includes sections 1–7 etc.) ---
  return items.map((item, index) => {
    const rowNum = (item?.num ?? "").toString();
    const isHeader = headerNums.includes(rowNum);

    // Header rows: bold + label spans both Label+Input columns (colSpan=2), no input cell
    if (isHeader) {
      return (
        <tr key={`${section.num}-${rowNum || index}`} style={{ fontWeight: "bold" }}>
          <td className="sno-cell">{item.num || ""}</td>
          <td className="label-cell" colSpan={2}>
            {item.label || section.title}
          </td>
        </tr>
      );
    }

    // Normal rows
    return (
      <tr key={`${section.num}-${rowNum || index}`}>
        <td className="sno-cell">{item.num || ""}</td>
        <td className="label-cell">{item.label || section.title}</td>

               {item.key ? (
          <td>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              type="text" // prevents browser spinners
              name={item.key}
              value={formData[item.key] || ""}
              onChange={(e) => {
                let val = e.target.value;
                // allow only integers and decimals
                val = val.replace(/[^0-9.]/g, "");
                const parts = val.split(".");
                if (parts.length > 2) {
                  val = parts[0] + "." + parts.slice(1).join("");
                }
                handleChange({ target: { name: e.target.name, value: val } });
              }}
              onKeyDown={(e) => {
                if (["-", "+", "e", "E"].includes(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown") {
                  e.preventDefault();
                }
              }}
              onWheel={(e) => e.target.blur()}
              className="form-input"
              aria-describedby={`${item.key}-error`}
              inputProps={{
                inputMode: "decimal",
                pattern: "[0-9]*\\.?[0-9]*",
                min: 0,
              }}
            />
            {fieldErrors[item.key] && (
              <span className="error-tooltip" id={`${item.key}-error`} role="alert">
                {fieldErrors[item.key]}
              </span>
            )}
          </td>
        ) : (
          <td />
        )}
      </tr>
    );
  });
};


    return (
      <div
        className="form-step"
        role="form"
        aria-label={`Step ${currentStep} of 5`}
      >
        <div className="progress-bar" aria-hidden="true">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>

        {currentStep === 1 && (
          <>
            <h3 className="step-title">Step 1: Organization Details</h3>

            <div className="form-group">
              <label htmlFor="Organisationname">
                Organisation Name:
                {/* <span aria-hidden="true" className="text-red">*</span> */}
              </label>
              <input
                id="Organisationname"
                name="Organisationname"
                type="text"
                maxLength={FIELD_MAX_LENGTH}
                value={formData.Organisationname}
                onChange={handleChange}
                // disabled={true}
                aria-describedby="Organisationname-error"
                className={`form-input ${
                  !formData.Organisationname && currentStep === 1
                    ? "has-error"
                    : ""
                }`}
                placeholder="Enter organisation name"
                required
              />
              {fieldErrors.Organisationname && (
                <span
                  className="error-tooltip"
                  id="Organisationname-error"
                  role="alert"
                >
                  {fieldErrors.Organisationname}
                </span>
              )}
              {!formData.Organisationname && currentStep === 1 && (
                <span
                  className="error-tooltip"
                  id="Organisationname-error"
                  role="alert"
                >
                  Organisation name is required
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mailingAddress">
                Postal Address{" "}
                <span aria-hidden="true" className="text-red">
                  *
                </span>
              </label>
              <textarea
                id="mailingAddress"
                name="mailingAddress"
                value={formData.mailingAddress}
                rows={3}
                maxLength={FIELD_MAX_LENGTH}
                onChange={handleChange}
                aria-describedby="mailingAddress-error"
                placeholder="Enter postal address"
                className={`form-textarea ${
                  !formData.mailingAddress.trim() && currentStep === 1
                    ? "has-error"
                    : ""
                }`}
                required
              />
              {fieldErrors.mailingAddress && (
                <span
                  className="error-tooltip"
                  id="mailingAddress-error"
                  role="alert"
                >
                  {fieldErrors.mailingAddress}
                </span>
              )}
              {!formData.mailingAddress.trim() && currentStep === 1 && (
                <span
                  className="error-tooltip"
                  id="mailingAddress-error"
                  role="alert"
                >
                  Mailing address is required
                </span>
              )}
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h3 className="step-title">
              Step 2: Approving Authority & Contact
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section
                aria-labelledby="approving-authority-heading"
                className="step-section"
              >
                <h4 id="approving-authority-heading">Approving Authority</h4>
                <p className="note">
                  Approving authority should be concerned Director /Board level
                  executive.{" "}
                </p>
                <div className="form-group">
                  <label htmlFor="authorityName">
                    Name{" "}
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
                  </label>
                  <input
                    id="authorityName"
                    name="authorityName"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.authorityName}
                    onChange={handleChange}
                    aria-describedby="authorityName-error"
                    placeholder="Name"
                    className={`form-input ${
                      !formData.authorityName && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
                    required
                  />
                  {fieldErrors.authorityName && (
                    <span
                      className="error-tooltip"
                      id="authorityName-error"
                      role="alert"
                    >
                      {fieldErrors.authorityName}
                    </span>
                  )}
                  {!formData.authorityName && currentStep === 2 && (
                    <span
                      className="error-tooltip"
                      id="authorityName-error"
                      role="alert"
                    >
                      Name is required
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="authorityTitle">
                    Designation{" "}
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
                  </label>
                  <input
                    id="authorityTitle"
                    name="authorityTitle"
                    type="text"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.authorityTitle}
                    onChange={handleChange}
                    aria-describedby="authorityTitle-error"
                    placeholder="Designation"
                    className={`form-input ${
                      !formData.authorityTitle && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
                    required
                  />
                  {fieldErrors.authorityTitle && (
                    <span
                      className="error-tooltip"
                      id="authorityTitle-error"
                      role="alert"
                    >
                      {fieldErrors.authorityTitle}
                    </span>
                  )}
                  {!formData.authorityTitle && currentStep === 2 && (
                    <span
                      className="error-tooltip"
                      id="authorityTitle-error"
                      role="alert"
                    >
                      Designation is required
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="authorityPhone">
                    Landline:{" "}
                    <span className="text-red" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="authorityLandline"
                    type="number"
                    name="authorityLandline"
                    value={formData.authorityLandline}
                    onChange={handleChange}
                    // onBlur={(e) => handleBlur('authorityLandline', e.target.value)}
                    className={`form-input ${
                      !formData.authorityLandline && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
                    placeholder="Landline number"
                    aria-required="true"
                    aria-describedby={
                      fieldErrors.authorityLandline
                        ? "authorityLandline-error"
                        : undefined
                    }
                  />
                  {!formData.authorityLandline && currentStep === 2 && (
                    <span className="error-tooltip">
                      Authority Landline Number is required
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="authorityPhone">
                    Mobile:{" "}
                    {/* <span className="text-red" aria-hidden="true"></span> */}
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
                </div>

                <div className="form-group">
                  <label htmlFor="authorityEmail">
                    Email{" "}
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
                  </label>
                  <input
                    id="authorityEmail"
                    name="authorityEmail"
                    type="email"
                    maxLength={FIELD_MAX_LENGTH}
                    value={formData.authorityEmail}
                    onChange={handleChange}
                    aria-describedby="authorityEmail-error"
                    placeholder="Approving authority's email"
                    className={`form-input ${
                      !formData.authorityEmail && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
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
                  {!formData.authorityEmail && currentStep === 2 && (
                    <span
                      className="error-tooltip"
                      id="authorityEmail-error"
                      role="alert"
                    >
                      Email is required
                    </span>
                  )}
                </div>
              </section>

              <section
                aria-labelledby="contacts-heading"
                className="step-section"
              >
                <h4 id="contacts-heading">
                  Contacts (Nodal Officials){" "}
                  <span aria-hidden="true" className="text-red">
                    *
                  </span>
                </h4>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="copyApplicantData"
                      //   checked={copyApplicantData}
                      onChange={handleCopyApplicantToggle}
                      className="form-checkbox"
                    />{" "}
                    Same as applicant
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="contact_name">
                    Name{" "}
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
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
                    className={`form-input ${
                      !formData.contact_name && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
                    aria-describedby="contact_name-error"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_phone">
                    Phone:
                    <span aria-hidden="true" className="text-red">
                      *
                    </span>
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
                    className={`form-input ${
                      !formData.contact_phone && currentStep === 2
                        ? "has-error"
                        : ""
                    }`}
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
                    onChange={handleChange}
                    placeholder="Contact email"
                    disabled={copyApplicantData}
                    className={`form-input ${
                      fieldErrors.contact_email ? "has-error" : ""
                    }`}
                    aria-describedby="contact_email-error"
                  />
                </div>
              </section>
            </div>

            <div className="form-group">
              <label htmlFor="companyProfile">
                Brief write-up on company’s profile{" "}
              </label>
              <p className="note">(within 300 words) </p>
              <textarea
                id="companyProfile"
                name="companyProfile"
                value={formData.companyProfile}
                rows={6}
                // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Enter company profile"
              />
              {fieldErrors.companyProfile && (
                <span
                  className="error-tooltip"
                  id="companyProfile-error"
                  role="alert"
                >
                  {fieldErrors.companyProfile}
                </span>
              )}
            </div>
          </>
        )}

        {currentStep === 3 && (
          <div className="quantitative-form">
            {data.filter((section) => section.num >= 1 && section.num <= 5)
              .length > 0 && (
              <table className="quant-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Particulars</th>
                    <th>Assessment Year</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((section) => section.num >= 1 && section.num <= 5)
                    .map((section) => renderSection(section))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="quantitative-form">
            {data.filter((section) => section.num >= 6 && section.num <= 9)
              .length > 0 && (
              <table className="quant-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Particulars</th>
                    <th>Assessment Year</th>

                    {/* <th>Assessment Year</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((section) => section.num >= 6 && section.num <= 9)
                    .map((section) => renderSection(section))}
                </tbody>
              </table>
            )}
            <div className="form-group">
              <label htmlFor="comment">Comments</label>
              <textarea
                id="comment"
                name="comment"
                // maxLength={COMMENT_MAX_LENGTH}
                value={formData.comment || ""}
                onChange={handleChange}
                className="form-textarea"
                rows={4}
                aria-describedby="comment-error"
              />
              {fieldErrors.comment && (
                <span className="error-tooltip" id="comment-error" role="alert">
                  {fieldErrors.comment}
                </span>
              )}
            </div>
          </div>
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
                    <th>Upload (jpg, png, pdf; max 5 MB)</th>
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
                              handleAttachmentChange(
                                key,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Enter description"
                            maxLength={FIELD_MAX_LENGTH}
                            className="form-input"
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            accept=".jpg,.png,.pdf"
                            onChange={(e) =>
                              handleAttachmentChange(
                                key,
                                "file",
                                e.target.files[0],
                                e
                              )
                            }
                            className="form-input mt-4"
                          />
                          {attachment.file && (
                            <p className="file-name">
                              Selected file: {attachment.file.name}
                            </p>
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
                Print the completed application form and upload it with the
                signature of the approving authority. Without signature of the
                approving authority, application will not be considered valid.
                <span aria-hidden="true" className="text-red">
                  *
                </span>
              </label>
              <div className="form-navigation">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-outline"
                >
                  Print Preview
                </button>
              </div>
            </div>

            {/* <div className="form-group">
                            <label htmlFor="approvingAuthoritySignature">
                                Upload Document with Approving Authority Signature (Director/Board Level)<span aria-hidden="true" className="text-red">*</span>:
                            </label>
                            <input
                                type="file"
                                id="approvingAuthoritySignature"
                                accept=".jpg,.png,.pdf"
                                onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
                                className={`form-input mt-4 ${fieldErrors.approvingAuthoritySignature ? 'has-error' : ''}`}
                                aria-describedby="approvingAuthoritySignature-error"
                                required
                            />
                            {formData.approvingAuthoritySignature && (
                                <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
                            )}
                            {fieldErrors.approvingAuthoritySignature && (
                                <span className="error-tooltip" id="approvingAuthoritySignature-error" role="alert">
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
              <label>
                <input
                  id="declaration"
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                  className={`form-checkbox ${
                    fieldErrors.declaration ? "has-error" : ""
                  }`}
                  aria-describedby="declaration-error"
                  required
                />{" "}
                I declare that the information submitted is true and complete.
              </label>
              {fieldErrors.declaration && (
                <span
                  className="error-tooltip"
                  id="declaration-error"
                  role="alert"
                >
                  {fieldErrors.declaration}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    );
  };
  useEffect(() => {
    const middlePosition = window.innerHeight / 2; // middle
    window.scrollTo({ top: middlePosition + 100, behavior: "smooth" });
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
        {error && <div className="error">{error}</div>}
        {isSubmitted ? (
          <div className="thank-you-message">
            <h2>Thank you for your submission!</h2>
            <p>Your Application has been successfully submitted.</p>
            <button onClick={() => setIsSubmitted(false)}>
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            {currentStep === 1 && (
              <div className="form-navigation-step1">
                <button
                  type="button"
                  onClick={handleSaveDraft}
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
                  onClick={handleSaveDraft}
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

export default RegistrationHRM;