import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
// import apiClient from '../api/axiosClient';
import SidebarGuideline from "./SidebarGuideline"
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import "../styles/FormProduction.css";

// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const COMMENT_MAX_LENGTH = 300;
const PROFILE_MAX_LENGTH = 300;
const COMPANY_PROFILE_MAX_LENGTH = 300;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
const phoneRegex = /^\d{10}$/;

// Utility functions to initialize arrays
const initialSingleGAArray = (num = 5) => Array(num).fill("");
const initialDoubleGAArray = (num = 5) =>
  Array(num)
    .fill()
    .map(() => ["", ""]);

// Field definitions for single and double GA fields
const fieldDefs = {
  single: [
    "baseDate",
    "startWorkDate",
    "exclusivityPeriod",
    "forceMajeureStart",
    "forceMajeureEnd",
    "pipelineTotalMWP",
    "forceMajeureStart2",
    "forceMajeureEnd2",
    "cngTotalMWP",
    "pngTotalMWP",
  ],
  double: [
    
    "pngProRatedMWP",
    "pngActual",
    "pngBilled",
    
    "cngProRatedMWP",
    "cngActual",
    
    "pipelineProRatedMWP",
    "pipelineActual",
    "pngSalesVolume",
    "cngSalesVolume",
    "cbgIntake",
    "fatalities",
    "totalHoursWorked",
    "lostTimeInjuries",
    "totalRecordableIncident",
    "safetyAudits",
  ],
};

// Function to get initial form data
const getInitialFormData = (numGAs = 5) => ({
  Organisationname: "",
  category: "CGD Company of the Year",
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
  approvingAuthoritySignature: null,
  declaration: false,
  comment: "",
  ga10YearMWP: Array(numGAs).fill(""), 
  ga8YearMWP: Array(numGAs).fill(""),
  ga5YearMWP: Array(numGAs).fill(""),
  ga3YearMWP: Array(numGAs).fill(""),
  gaNoMWP: Array(numGAs).fill(""),
  baseDate: "31/03/2025", 
  // per-GA single fields (one value per GA)
  ...Object.fromEntries(fieldDefs.single.map((key) => [key, initialSingleGAArray(numGAs)])),
  // per-GA double fields (two-year values per GA)
  ...Object.fromEntries(fieldDefs.double.map((key) => [key, initialDoubleGAArray(numGAs)])),
  attachments1: { description: "", file: null },
  attachments2: { description: "", file: null },
  attachments3: { description: "", file: null },
  attachments4: { description: "", file: null },
  // NEW: GA names array
  gaNames: Array(numGAs).fill(""),
});

const part1 = [
  ["1.1", "Number of GAs with 10 year MWP Target", "No.", "ga10YearMWP", true],
  ["1.2", "Number of GAs with 8 year MWP Target", "No.", "ga8YearMWP", true],
  ["1.3", "Number of GAs with 5 year MWP Target", "No.", "ga5YearMWP", true],
  ["1.4", "Number of GAs with 3 year MWP Target", "No.", "ga3YearMWP", true],
  ["1.5", "Number of GAs with no MWP Target", "No.", "gaNoMWP", true],
  ["2.1", "Base date for evaluation", "Date", "baseDate", true],
  ["2.2", "Effective start of work date (Contract Year)", "Date", "startWorkDate", true],
  ["2.3", "Exclusivity Period - Exclusivity from the purview of common carrier or contract carrier", "Years", "exclusivityPeriod", true],
  ["2.4", "Force Majeure start date (if any)", "Date", "forceMajeureStart", true],
  ["2.5", "Force Majeure end date (if any) (Note: if FM extension has been provided more than once, please provide data for all of them)", "Date", "forceMajeureEnd", true],
  ["2.6", "Force Majeure start date (if any)", "Date", "forceMajeureStart2", true],
  ["2.7", "Force Majeure end date (if any) (Note: if FM extension has been provided more than once, please provide data for all of them)", "Date", "forceMajeureEnd2", true],
  ["3", "D-PNG Connection", "", null, false, true],
  ["3.1", "Total MWP Target", "No.", "pngTotalMWP", true],
  ["3.2", "Pro-rated MWP Target (Total PNG connections expected based on pro-rata schedule)", "No.", "pngProRatedMWP", true],
  ["3.3", "Actual PNG connections achieved", "No.", "pngActual", true],
  ["3.4", "Number of Billed connections in 2024-25 as reported to PNGRB", "No.", "pngBilled", true],
];

const part2 = [
  ["4.1", "Total MWP Target", "No.", "cngTotalMWP", true],
  ["4.2", "Pro-rated MWP Target ", "No.", "cngProRatedMWP", true],
  ["4.3", "Actual no. of CNG stations achieved", "No.", "cngActual", true],
  ["5.1", "Total MWP Target ", "No.", "pipelineTotalMWP", true],
  ["5.2", "Pro-rated MWP Target (Total inch km of steel + MDPE pipeline) expected based on pro-rata schedule)", "No.", "pipelineProRatedMWP", true],
  ["5.3", "Actual inch-km of steel+ MDPE pipeline laid", "No.", "pipelineActual", true],
  ["6.1", "PNG Sales Volume", "MMSCM", "pngSalesVolume", true],
  ["6.2", "CNG Sales Volume", "MMSCM", "cngSalesVolume", true],
  ["6.3", "CBG intake in CGD network", "MMSCM", "cbgIntake", true],
  ["7.1", "Number of Fatalities ", "", "fatalities", true],
  ["7.2", "Total Hours Worked ", "", "totalHoursWorked", true],
  ["7.3", "Lost Time Injuries", "", "lostTimeInjuries", true],
  ["7.4", "Total Recordable Incidents ", "", "totalRecordableIncident", true],
  ["7.5", "Number of safety audits conducted in 2024-25", "", "safetyAudits", true],
];

const RegistrationCGD = () => {
  const [numGAs, setNumGAs] = useState(1);
  const [formData, setFormData] = useState(getInitialFormData(5));
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [copyApplicantData, setCopyApplicantData] = useState(false);
  const singleInputFieldsStep3 = ["pipelineTotalMWP", "cngTotalMWP", "pngTotalMWP"];

  const navigate = useNavigate();
  const location = useLocation();
  const awardTitle = location.state?.awardTitle || "CGD Company of the Year";

  // State for calculated rows
  const [calculatedRows, setCalculatedRows] = useState([
    { key: "exclusivityPeriodTotal", value: 0 },
    { key: "pngActualTotal", value: 0 },
    { key: "cngActualTotal", value: 0 },
    { key: "pipelineActualTotal", value: 0 },
  ]);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteIndex, setDeleteIndex] = useState(null);

// --- add near other useState hooks ---
// const [showDeleteModal, setShowDeleteModal] = useState(false);

// --- open delete-confirmation for last GA ---
const confirmDeleteLastGA = () => {
  if (numGAs <= 1) return; // protect last GA
  setShowDeleteModal(true);
};

// --- delete last GA when user confirms ---
const handleDeleteLastGA = () => {
  if (numGAs <= 1) {
    setShowDeleteModal(false);
    return;
  }
  setFormData((prev) => {
    const newFormData = { ...prev };

    // remove last element from arrays safely
    newFormData.gaNames = (prev.gaNames || []).slice(0, -1);

    fieldDefs.single.forEach((field) => {
      newFormData[field] = (prev[field] || []).slice(0, -1);
    });

    fieldDefs.double.forEach((field) => {
      newFormData[field] = (prev[field] || []).slice(0, -1);
    });

    ["ga10YearMWP", "ga8YearMWP", "ga5YearMWP", "ga3YearMWP", "gaNoMWP"].forEach((k) => {
      newFormData[k] = (prev[k] || []).slice(0, -1);
    });

    return newFormData;
  });

  setNumGAs((prev) => Math.max(1, prev - 1));
  setShowDeleteModal(false);
};

// --- cancel deletion ---
const cancelDeleteLastGA = () => {
  setShowDeleteModal(false);
};

  // Keep arrays present when numGAs changes
  useEffect(() => {
    setFormData((prev) => {
      const copy = { ...prev };
      // ensure gaNames exists
      if (!Array.isArray(copy.gaNames) || copy.gaNames.length < numGAs) {
        copy.gaNames = [...(copy.gaNames || []), ...Array(numGAs - (copy.gaNames?.length || 0)).fill("")];
      } else if (copy.gaNames.length > numGAs) {
        copy.gaNames = copy.gaNames.slice(0, numGAs);
      }

      fieldDefs.single.forEach((key) => {
        if (!Array.isArray(copy[key]) || copy[key].length < numGAs) {
          copy[key] = [...(copy[key] || []), ...Array(numGAs - (copy[key]?.length || 0)).fill("")];
        } else if (copy[key].length > numGAs) {
          copy[key] = copy[key].slice(0, numGAs);
        }
      });

      fieldDefs.double.forEach((key) => {
        if (!Array.isArray(copy[key]) || copy[key].length < numGAs) {
          copy[key] = [...(copy[key] || []), ...Array(numGAs - (copy[key]?.length || 0)).fill(["", ""])];
        } else if (copy[key].length > numGAs) {
          copy[key] = copy[key].slice(0, numGAs);
        }
      });

      // also for gaXYear arrays
      ["ga10YearMWP","ga8YearMWP","ga5YearMWP","ga3YearMWP","gaNoMWP"].forEach(k=>{
        if (!Array.isArray(copy[k]) || copy[k].length < numGAs) {
          copy[k] = [...(copy[k] || []), ...Array(numGAs - (copy[k]?.length || 0)).fill("")];
        } else if (copy[k].length > numGAs) {
          copy[k] = copy[k].slice(0, numGAs);
        }
      });

      return copy;
    });
  }, [numGAs]);

  // Calculate totals for calculated rows
  useEffect(() => {
    const exclusivityTotal = (formData.exclusivityPeriod || [])
      .map((val) => parseFloat(val) || 0)
      .reduce((sum, val) => sum + val, 0);

    const pngTotal = (formData.pngActual || [])
      .flat()
      .map((val) => parseFloat(val) || 0)
      .reduce((sum, val) => sum + val, 0);

    const cngTotal = (formData.cngActual || [])
      .flat()
      .map((val) => parseFloat(val) || 0)
      .reduce((sum, val) => sum + val, 0);

    const pipelineTotal = (formData.pipelineActual || [])
      .flat()
      .map((val) => parseFloat(val) || 0)
      .reduce((sum, val) => sum + val, 0);

    setCalculatedRows([
      { key: "exclusivityPeriodTotal", value: exclusivityTotal },
      { key: "pngActualTotal", value: pngTotal },
      { key: "cngActualTotal", value: cngTotal },
      { key: "pipelineActualTotal", value: pipelineTotal },
    ]);
  }, [
    formData.exclusivityPeriod,
    formData.pngActual,
    formData.cngActual,
    formData.pipelineActual,
  ]);

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
      const stored = sessionStorage.getItem("user_info");
      if (stored) {
        const user = JSON.parse(stored);
        setFormData((prev) => ({
          ...prev,
          userid: user.id || "",
          firstname: user.first_name || "",
          lastname: user.last_name || "",
          company_name: user.organisation_name || "",
          Organisationname: user.organisation_name || "",
          applicant_name: user.applicant_name || "",
          applicant_phone: user.applicant_phone || "",
          applicant_email: user.email || "",
        }));
      }
    } catch (err) {
      console.warn("Failed to parse user_info from localStorage:", err);
    }
  }, []);

  // ====== Toggle handler: copy from applicant ======
  const handleCopyApplicantToggle = (e) => {
    const checked = e.target.checked;
    const model = {
      contact_name: "",
      contact_phone: "",
      contact_email: "",
    };

    if (checked) {
      const userInfo = JSON.parse(sessionStorage.getItem('user_info') || '{}');
      if(userInfo){
        model.contact_name = userInfo.applicant_name || "";
        model.contact_phone = userInfo.applicant_phone || "";
        model.contact_email = userInfo.email || "";
      }
    };

    setFormData((prev) => ({...prev, ...model}));
    setCopyApplicantData(checked);
    clearFieldError("contact_name");
    clearFieldError("contact_phone");
    clearFieldError("contact_email");
  };


const deleteGA = (index) => {
  if (numGAs <= 1) return; // prevent deleting last GA

  setNumGAs((prev) => prev - 1);
  setFormData((prev) => {
    const newFormData = { ...prev };

    // GA Names
    newFormData.gaNames = (newFormData.gaNames || []).filter((_, i) => i !== index);

    // Single value arrays
    fieldDefs.single.forEach((field) => {
      newFormData[field] = (newFormData[field] || []).filter((_, i) => i !== index);
    });

    // Double value arrays
    fieldDefs.double.forEach((field) => {
      newFormData[field] = (newFormData[field] || []).filter((_, i) => i !== index);
    });

    // MWP fields
    ["ga10YearMWP","ga8YearMWP","ga5YearMWP","ga3YearMWP","gaNoMWP"].forEach((k) => {
      newFormData[k] = (newFormData[k] || []).filter((_, i) => i !== index);
    });

    return newFormData;
  });
};



  const addMoreGA = () => {
  setNumGAs((prev) => prev + 1);
  setFormData((prev) => {
    const newFormData = { ...prev };

    const defaultName = (prev.gaNames && prev.gaNames[0]) ? prev.gaNames[0] : "";

    newFormData.gaNames = [...(prev.gaNames || []), defaultName];

    fieldDefs.single.forEach((field) => {
      newFormData[field] = [...(prev[field] || []), ""];
    });

    
    fieldDefs.double.forEach((field) => {
      newFormData[field] = [...(prev[field] || []), ["", ""]];
    });

    ["ga10YearMWP","ga8YearMWP","ga5YearMWP","ga3YearMWP","gaNoMWP"].forEach((k) => {
      newFormData[k] = [...(prev[k] || []), ""];
    });

    return newFormData;
  });
};

// ===== confirm delete (open modal) =====
const confirmDeleteGA = (index) => {
  if (numGAs <= 1) return; // don't allow removing last GA
  setDeleteIndex(index);
  setShowDeleteModal(true);
};

// ===== actual delete (called when user confirms in modal) =====
const handleConfirmDelete = () => {
  if (deleteIndex === null) {
    setShowDeleteModal(false);
    return;
  }

  setFormData((prev) => {
    const newFormData = { ...prev };

    // remove that GA index from arrays safely (do not mutate prev arrays)
    newFormData.gaNames = (prev.gaNames || []).filter((_, i) => i !== deleteIndex);

    fieldDefs.single.forEach((field) => {
      newFormData[field] = (prev[field] || []).filter((_, i) => i !== deleteIndex);
    });

    fieldDefs.double.forEach((field) => {
      newFormData[field] = (prev[field] || []).filter((_, i) => i !== deleteIndex);
    });

    ["ga10YearMWP","ga8YearMWP","ga5YearMWP","ga3YearMWP","gaNoMWP"].forEach((k) => {
      newFormData[k] = (prev[k] || []).filter((_, i) => i !== deleteIndex);
    });

    return newFormData;
  });

  // decrease GA count and reset modal state
  setNumGAs((prev) => Math.max(1, prev - 1));
  setDeleteIndex(null);
  setShowDeleteModal(false);
};

// ===== cancel delete =====
const handleCancelDelete = () => {
  setDeleteIndex(null);
  setShowDeleteModal(false);
};

  // Validation helpers
  const validatePhone = (phone) => phoneRegex.test(phone);
  const validateEmail = (email) => emailRegex.test(email);

  // handleChange supports:
  // - normal fields: handleChange(name, value)
  // - single-per-GA arrays: handleChange(name, value, gaIndex)
  // - double-per-GA arrays (two years): handleChange(name, value, gaIndex, yearIndex)
  const handleChange = (name, value, gaIndex = null, yearIndex = null) => {
    // Limit lengths for some fields (existing logic kept)
    if ([1, 2, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (name === "companyProfile") applicableMaxLength = PROFILE_MAX_LENGTH;
      else if (name === "comment") applicableMaxLength = COMMENT_MAX_LENGTH;

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
        }
      }
    }

    // Text input sanitization
    if (["Organisationname", "authorityName", "contact_name"].includes(name)) {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        // disallow numeric/special characters
        return;
      }
      if (value.length > FIELD_MAX_LENGTH) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: `Input must not exceed ${FIELD_MAX_LENGTH} characters`,
        }));
        return;
      }
    }

    // Update form data
   setFormData((prev) => {
  if (
    gaIndex !== null &&
    yearIndex !== null &&
    !["pngTotalMWP", "cngTotalMWP", "pipelineTotalMWP"].includes(name) // ✅ exclude these from nested arrays
  ) {
    const updatedArray = [...(prev[name] || [])];
    updatedArray[gaIndex] = [...(updatedArray[gaIndex] || ["", ""])];
    updatedArray[gaIndex][yearIndex] = value;
    return { ...prev, [name]: updatedArray };
  } else if (gaIndex !== null) {
    const updatedArray = [...(prev[name] || [])];
    updatedArray[gaIndex] = value;
    return { ...prev, [name]: updatedArray };
  } else {
    if (name === "authorityPhone" || name === "contact_phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, PHONE_MAX_LENGTH);
      return { ...prev, [name]: numericValue };
    }
    return { ...prev, [name]: value };
  }
});


    // Clear errors on valid input (existing rules)
    if (name === "Organisationname" && value.trim() && currentStep === 1) {
      setFieldErrors((prev) => ({ ...prev, Organisationname: undefined }));
    }
    if (name === "mailingAddress" && value.trim() && currentStep === 1) {
      setFieldErrors((prev) => ({ ...prev, mailingAddress: undefined }));
    }
    if (name === "category" && value && currentStep === 1) {
      setFieldErrors((prev) => ({ ...prev, category: undefined }));
    }
    if (name === "authorityName" && value.trim() && currentStep === 2) {
      setFieldErrors((prev) => ({ ...prev, authorityName: undefined }));
    }
    if (name === "authorityTitle" && value.trim() && currentStep === 2) {
      setFieldErrors((prev) => ({ ...prev, authorityTitle: undefined }));
    }
    if (name === "authorityEmail" && validateEmail(value) && currentStep === 2) {
      setFieldErrors((prev) => ({ ...prev, authorityEmail: undefined }));
    }
    if (name === "authorityPhone" && validatePhone(value) && currentStep === 2) {
      setFieldErrors((prev) => ({ ...prev, authorityPhone: undefined }));
    }
    if (name === "contact_name" && value.trim() && !copyApplicantData && currentStep === 2) {
      setFieldErrors((prev) => ({ ...prev, contact_name: undefined }));
    }
    if (name === "contactEmail" && (!value || validateEmail(value)) && !copyApplicantData && currentStep === 2) {
      setFieldErrors((prev) => ({ ...prev, contact_email: undefined }));
    }
    if (name === "contact_phone" && (!value || validatePhone(value)) && !copyApplicantData && currentStep === 2) {
      setFieldErrors((prev) => ({ ...prev, contact_phone: undefined }));
    }
    if (name === "companyProfile" && value.trim() && currentStep === 2) {
      setFieldErrors((prev) => ({ ...prev, companyProfile: undefined }));
    }
  };

  const handleBlur = (name, value) => {
    const errors = {};
    if (name === "authorityEmail") {
      if (!value) errors.authorityEmail = "Email is required";
      else if (!validateEmail(value)) errors.authorityEmail = "Invalid email format";
    }
    if (name === "contact_name" && !value.trim() && !copyApplicantData) {
      errors.contact_name = "Contact name is required";
    }
    if (name === "contactEmail" && value && !validateEmail(value) && !copyApplicantData) {
      errors.contact_email = "Invalid email format";
    }
    if (name === "contact_phone" && value && !validatePhone(value) && !copyApplicantData) {
      errors.contact_phone = "Phone must be exactly 10 digits";
    }
    setFieldErrors((prev) => ({ ...prev, ...errors }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.authorityEmail) errors.authorityEmail = "Email is required";
    else if (!validateEmail(formData.authorityEmail)) errors.authorityEmail = "Invalid email format";
    if (!formData.contact_name?.trim() && !copyApplicantData) errors.contact_name = "Contact name is required";
    if (formData.contactEmail && !validateEmail(formData.contact_email) && !copyApplicantData) errors.contact_email = "Invalid email format";
    if (formData.contact_phone && !validatePhone(formData.contact_phone) && !copyApplicantData) errors.contact_phone = "Phone must be exactly 10 digits";
    if (!formData.approvingAuthoritySignature) errors.approvingAuthoritySignature = "Approving authority signature is required";
    if (!formData.declaration) errors.declaration = "Please accept the declaration";
    return errors;
  };

  const handleAttachmentChange = (key, field, value, event = null) => {
    if (field === "description" && value.length > FIELD_MAX_LENGTH) {
      setFieldErrors((prev) => ({ ...prev, [`${key}.description`]: `Description must not exceed ${FIELD_MAX_LENGTH} characters` }));
      return;
    }
    if (field === "file" && value) {
      const file = value;
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setFieldErrors((prev) => ({ ...prev, [key]: "Only JPG, PNG, and PDF files are allowed" }));
        if (event) event.target.value = null;
        return;
      }
      if (file.size > maxSizeInBytes) {
        setFieldErrors((prev) => ({ ...prev, [key]: "File size must not exceed 5 MB" }));
        if (event) event.target.value = null;
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined, [`${key}.description`]: undefined }));
  };

  const handleApprovingAuthorityChange = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setFieldErrors((prev) => ({ ...prev, approvingAuthoritySignature: "Only JPG, PNG, and PDF files are allowed" }));
        return;
      }
      if (file.size > maxSizeInBytes) {
        setFieldErrors((prev) => ({ ...prev, approvingAuthoritySignature: "File size must not exceed 5 MB" }));
        return;
      }
      setFormData((prev) => ({ ...prev, approvingAuthoritySignature: file }));
      setFieldErrors((prev) => ({ ...prev, approvingAuthoritySignature: undefined }));
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.Organisationname) { alert('Organisation name is required.'); return; }
      if (!formData.mailingAddress.trim()) { alert('Mailing address is required.'); return; }
    }
    if (currentStep === 2) {
      if (!formData.authorityName) { alert('Authority name is required.'); return; }
      if (!formData.authorityTitle) { alert('Authority designation is required.'); return; }
      if (!formData.authorityEmail || !validateEmail(formData.authorityEmail)) { alert('Please enter a valid Authority email.'); return; }
      if (!formData.authorityPhone || !validatePhone(formData.authorityPhone)) { alert('Authority phone must be exactly 10 digits.'); return; }
      if (!formData.contact_name) { alert('Contact name is required.'); return; }
      if (formData.contact_email && !validateEmail(formData.contact_email)) { alert('Please enter a valid Contact email.'); return; }
      if (formData.contact_phone && !validatePhone(formData.contact_phone) && !copyApplicantData) { alert('Contact phone must be exactly 10 digits.'); return; }
      if (!formData.companyProfile) { alert('Company Profile is required.'); return; }
    }

    // optional warnings for empty numeric tables (your existing confirmation behavior)
    if (currentStep === 3) {
      // areFieldsEmpty3 logic omitted for brevity; keep your existing check
    }
    if (currentStep === 4) {
      // areFieldsEmpty4 logic omitted for brevity; keep your existing check
    }

    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => { if (currentStep > 1) setCurrentStep((prev) => prev - 1); };

  const saveDraft = () => {
    localStorage.setItem("registrationCGDDraft", JSON.stringify({ formData }));
    alert("Draft Saved!");
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const raw = localStorage.getItem("user_info");
      if (raw) {
        const user = JSON.parse(raw);
        setFormData(prev => ({ ...prev, userid: user.id, firstname: user.first_name, lastname: user.last_name, company_name: user.organisation_name, Organisationname: user.organisation_name }));
      }
    } catch (err) {
      console.warn("Failed to load user_info:", err);
    }

    // Simple front validations
    if (!formData.declaration) return alert("Please accept the declaration before submitting.");
    if (!/^\d{10}$/.test((formData.authorityPhone || "").replace(/\D/g, ""))) return alert("Authority phone must be exactly 10 digits.");
    if (!formData.approvingAuthoritySignature) return alert("Please upload the approving authority signature file.");

    // Build FormData
    const fd = new FormData();

    // Basic fields
    fd.append("Organisationname", formData.Organisationname || "");
    fd.append("category", formData.category || "CGD Company of the Year");
    fd.append("companyName", formData.companyName || "");
    fd.append("mailingAddress", formData.mailingAddress || "");
    fd.append("authorityName", formData.authorityName || "");
    fd.append("authorityTitle", formData.authorityTitle || "");
    fd.append("authorityPhone", formData.authorityPhone || "");
    fd.append("authorityLandline", formData.authorityLandline || "");
    fd.append("authorityEmail", formData.authorityEmail || "");
    fd.append("approvingAuthoritySignature", formData.approvingAuthoritySignature);
    fd.append("contactName", formData.contact_name || "");
    fd.append("contactPhone", formData.contact_phone || "");
    fd.append("contactEmail", formData.contact_email || "");
    fd.append("companyProfile", formData.companyProfile || "");
    fd.append("comment", formData.comment || "");
    fd.append("declaration", formData.declaration ? "true" : "false");

    // GA presence arrays
    fd.append("ga10YearMWP", JSON.stringify(formData.ga10YearMWP || []));
    fd.append("ga8YearMWP", JSON.stringify(formData.ga8YearMWP || []));
    fd.append("ga5YearMWP", JSON.stringify(formData.ga5YearMWP || []));
    fd.append("ga3YearMWP", JSON.stringify(formData.ga3YearMWP || []));
    fd.append("gaNoMWP", JSON.stringify(formData.gaNoMWP || []));

    // Single-value-per-GA arrays
    fieldDefs.single.forEach(k => fd.append(k, JSON.stringify(formData[k] || [])));
    // Double-value-per-GA arrays
    fieldDefs.double.forEach(k => fd.append(k, JSON.stringify(formData[k] || [])));

    // Attachments
    [1,2,3,4].forEach(n => {
      const slot = formData[`attachments${n}`] || {};
      fd.append(`attachments${n}_desc`, slot.description || "");
      if (slot.file instanceof File) fd.append(`attachments${n}`, slot.file);
    });

    // NEW: per-GA combined objects for backend
    // gaObjects = [ { label: "GA1 (Mathura)", baseDate: "...", pngActual: ["123","45"], ... }, ... ]
    const gaObjects = Array.from({ length: numGAs }, (_, i) => {
      const label = `GA${i + 1}` + (formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : "");
      const obj = { label, name: formData.gaNames?.[i] || "" };
      // include single fields (one value)
      fieldDefs.single.forEach(f => {
        obj[f] = (formData[f] && formData[f][i] !== undefined) ? formData[f][i] : "";
      });
      // include double fields (2-year arrays)
      fieldDefs.double.forEach(f => {
        obj[f] = (formData[f] && formData[f][i] !== undefined) ? formData[f][i] : ["",""];
      });
      // include the ga presence flags if you want
      ["ga10YearMWP","ga8YearMWP","ga5YearMWP","ga3YearMWP","gaNoMWP"].forEach(k=>{
        obj[k] = (formData[k] && formData[k][i] !== undefined) ? formData[k][i] : "";
      });
      return obj;
    });

    fd.append("gaObjects", JSON.stringify(gaObjects));

    // Backwards-compatibility: append GA1, GA2 ... as JSON strings (so older backend variables still get something)
    gaObjects.forEach((g, idx) => {
      fd.append(`GA${idx+1}`, JSON.stringify(g));
    });

    try {
      // await apiClient.post("/registration-cgd/", fd, {
      //   headers: { "Content-Type": "multipart/form-data" }
      // });
      alert("CGD registration submitted successfully!");
      console.log(formData)
      setIsSubmitted(true);
    } catch (err) {
      console.error("CGD submission error:", err.response || err);
      const msg = err.response?.data?.detail || err.message;
      alert("Submission failed: " + msg);
    }
  } 




  const handlePrint = () => {
  const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
      <h2>Organization & Contact Details:</h2>
      <p><strong>Organisation Name:</strong> ${formData.Organisationname || ""}</p>
      <p><strong>Postal Address:</strong> ${formData.mailingAddress || ""}</p>
      <h2>Approving Authority Details</h2>
      <p><strong>Approving Authority Name:</strong>  ${formData.authorityName  || ""}</p>
      <p><strong>Approving Authority Title:</strong> ${formData.authorityTitle || ""}</p>
      <p><strong>Approving Authority Phone:</strong> ${formData.authorityPhone || ""}</p>
      <p><strong>Approving Authority Email:</strong> ${formData.authorityEmail || ""}</p>
      <h2>Nodal Official Contact Details:</h2>
      <p><strong>Contact Name:</strong> ${formData.contact_name || ""}</p>
      <p><strong>Contact Phone:</strong> ${formData.contact_phone || ""}</p>
      <p><strong>Contact Email:</strong> ${formData.contact_email || ""}</p>
      <p><strong>Brief write up on company’s profile:</strong> ${formData.companyProfile || ""}</p> ${
          formData.companyProfile || ""
        }</p>
        <h2>Quantitative Information - Part 1</h2>
        <h3>General Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;">Unit</th>
              <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
              <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
            </tr>
          </thead>
          <tbody>
            ${part1
              .slice(0, 5)
              .map(
                ([num, label, unit, key]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                <td style="border: 1px solid #000; padding: 8px;">${
                  formData[key]?.[0] || ""
                }</td>
                <td style="border: 1px solid #000; padding: 8px;">${
                  formData[key]?.[1] || ""
                }</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <h3>GA-Specific Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;">Unit</th>
              ${Array.from(
                { length: numGAs },
                (_, i) => `
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                }</th>
              `
              ).join("")}
            </tr>
          </thead>
          <tbody>
            ${part1
              .slice(5, 12)
              .map(
                ([num, label, unit, key, isInput]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                ${
                  isInput
                    ? Array.from(
                        { length: numGAs },
                        (_, gaIndex) => `
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex] || ""
                  }</td>
                `
                      ).join("")
                    : `
                  <td style="border: 1px solid #000; padding: 8px;" colspan="${numGAs}">
                    ${calculatedRows.find((row) => row.key === key)?.value || 0}
                  </td>
                `
                }
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <h3>D-PNG Connection</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;">Unit</th>
              ${Array.from(
                { length: numGAs },
                (_, i) => `
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2024-25)</th>
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2023-24)</th>
              `
              ).join("")}
            </tr>
          </thead>
          <tbody>
            ${part1
              .slice(13)
              .map(
                ([num, label, unit, key, isInput]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                ${
                  isInput
                    ? Array.from(
                        { length: numGAs },
                        (_, gaIndex) => `
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[0] || ""
                  }</td>
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[1] || ""
                  }</td>
                `
                      ).join("")
                    : `
                  <td style="border: 1px solid #000; padding: 8px;" colspan="${
                    numGAs * 2
                  }">
                    ${calculatedRows.find((row) => row.key === key)?.value || 0}
                  </td>
                `
                }
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <h2>Quantitative Information - Part 2</h2>
        <h3>CNG Stations</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;">Unit</th>
              ${Array.from(
                { length: numGAs },
                (_, i) => `
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2024-25)</th>
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2023-24)</th>
              `
              ).join("")}
            </tr>
          </thead>
          <tbody>
            ${part2
              .slice(0, 3)
              .map(
                ([num, label, unit, key, isInput]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                ${
                  isInput
                    ? Array.from(
                        { length: numGAs },
                        (_, gaIndex) => `
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[0] || ""
                  }</td>
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[1] || ""
                  }</td>
                `
                      ).join("")
                    : `
                  <td style="border: 1px solid #000; padding: 8px;" colspan="${
                    numGAs * 2
                  }">
                    ${calculatedRows.find((row) => row.key === key)?.value || 0}
                  </td>
                `
                }
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <h3>Inch-km of Pipeline Laid</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;">Unit</th>
              ${Array.from(
                { length: numGAs },
                (_, i) => `
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2024-25)</th>
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2023-24)</th>
              `
              ).join("")}
            </tr>
          </thead>
          <tbody>
            ${part2
              .slice(3, 6)
              .map(
                ([num, label, unit, key, isInput]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                ${
                  isInput
                    ? Array.from(
                        { length: numGAs },
                        (_, gaIndex) => `
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[0] || ""
                  }</td>
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[1] || ""
                  }</td>
                `
                      ).join("")
                    : `
                  <td style="border: 1px solid #000; padding: 8px;" colspan="${
                    numGAs * 2
                  }">
                    ${calculatedRows.find((row) => row.key === key)?.value || 0}
                  </td>
                `
                }
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <h3>Natural Gas Sales & CBG Intake</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;">Unit</th>
              ${Array.from(
                { length: numGAs },
                (_, i) => `
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2024-25)</th>
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2023-24)</th>
              `
              ).join("")}
            </tr>
          </thead>
          <tbody>
            ${part2
              .slice(6, 9)
              .map(
                ([num, label, unit, key]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                ${Array.from(
                  { length: numGAs },
                  (_, gaIndex) => `
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[0] || ""
                  }</td>
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[1] || ""
                  }</td>
                `
                ).join("")}
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <h3>Safety</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;">Unit</th>
              ${Array.from(
                { length: numGAs },
                (_, i) => `
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2024-25)</th>
                <th style="border: 1px solid #000; padding: 8px;">GA${
                  i + 1
                } (2023-24)</th>
              `
              ).join("")}
            </tr>
          </thead>
          <tbody>
            ${part2
              .slice(9)
              .map(
                ([num, label, unit, key]) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                ${Array.from(
                  { length: numGAs },
                  (_, gaIndex) => `
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[0] || ""
                  }</td>
                  <td style="border: 1px solid #000; padding: 8px;">${
                    formData[key]?.[gaIndex]?.[1] || ""
                  }</td>
                `
                ).join("")}
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
  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;
    return (
      <div
        className="form-step"
        role="form"
        aria-label={`Step ${currentStep} of 5`}
      >
        <div className="progress-bar" aria-hidden="true">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        {currentStep === 1 && (
          <div>
            <h3 className="step-title">Step 1: Organization Details</h3>
            <div className="form-group">
              <label htmlFor="Organisationname">
                Organisation Name:{" "}
                {/* <span className="text-red" aria-hidden="true">
                  *
                </span> */}
              </label>
              <input
                id="Organisationname"
                type="text"
                name="Organisationname"
                value={formData.Organisationname}
                onChange={(e) =>handleChange("Organisationname", e.target.value)}                
                className={`form-input ${
                  fieldErrors.Organisationname ? "has-error" : ""
                }`}
                maxLength={FIELD_MAX_LENGTH}

              />
             
            </div>
            <div className="form-group">
              <label htmlFor="mailingAddress">
                Postal Address:{" "}
                <span className="text-red" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="mailingAddress"
                name="mailingAddress"
                value={formData.mailingAddress}
                onChange={(e) => handleChange("mailingAddress", e.target.value)}
                onBlur={(e) => handleBlur("mailingAddress", e.target.value)}
                className={`form-textarea ${
                  fieldErrors.mailingAddress ? "has-error" : ""
                }`}
                rows={3}
                maxLength={FIELD_MAX_LENGTH}
                placeholder="Enter postal address"
                aria-describedby="mailingAddress-error"
                required
              />
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h3 className="step-title">
              Step 2: Approving Authority & Contact Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className="step-section"
                aria-labelledby="approving-authority-heading"
              >
                <h4 id="approving-authority-heading">Approving Authority</h4>
                <p className="note">Approving authority should be concerned  Director /Board level executive. </p>
                <div className="form-group">
                  <label htmlFor="authorityName">
                    Name:{" "}
                    <span className="text-red" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="authorityName"
                    type="text"
                    name="authorityName"
                    value={formData.authorityName}
                    onChange={(e) =>
                      handleChange("authorityName", e.target.value)
                    }
                    onBlur={(e) => handleBlur("authorityName", e.target.value)}
                    className={`form-input ${
                      fieldErrors.authorityName ? "has-error" : ""
                    }`}
                    placeholder="Name"
                    maxLength={FIELD_MAX_LENGTH}
                    aria-describedby="authorityName-error"
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
                </div>
                <div className="form-group">
                  <label htmlFor="authorityTitle">
                    Designation:{" "}
                    <span className="text-red" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="authorityTitle"
                    type="text"
                    name="authorityTitle"
                    value={formData.authorityTitle}
                    onChange={(e) =>
                      handleChange("authorityTitle", e.target.value)
                    }
                    onBlur={(e) => handleBlur("authorityTitle", e.target.value)}
                    className={`form-input ${
                      fieldErrors.authorityTitle ? "has-error" : ""
                    }`}
                    placeholder="Designation"
                    maxLength={FIELD_MAX_LENGTH}
                    aria-describedby="authorityTitle-error"
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
                    // onChange={handleChange}
                    onChange={(e) =>
                      handleChange("authorityLandline", e.target.value)
                    }
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
                    {/* <span className="text-red" aria-hidden="true">
                      *
                    </span> */}
                  </label>
                  <input
                    id="authorityPhone"
                    type="tel"
                    name="authorityPhone"
                    value={formData.authorityPhone}
                    // onChange={handleChange}
                    onChange={(e) =>
                      handleChange("authorityPhone", e.target.value)
                    }
                    className="form-input"
                    placeholder="Phone number"
                    maxLength={PHONE_MAX_LENGTH}
                    aria-required="true"
                    // aria-describedby={fieldErrors.authorityPhone ? 'authorityPhone-error' : undefined}
                  />
                </div>
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
                    className={`form-input ${
                      fieldErrors.authorityEmail ? "has-error" : ""
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
              </div>
              <div className="step-section" aria-labelledby="contacts-heading">
                <h4 id="contacts-heading">
                  Contacts (Nodal Officials){" "}
                  <span className="text-red" aria-hidden="true">
                    *
                  </span>
                </h4>
                <div className="form-group">
  <label>
    <input
      type="checkbox"
      name="copyApplicantData"
      // checked={copyApplicantData}
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
    value={formData.contact_name || ""}
    onChange={(e) => handleChange("contact_name", e.target.value)}
    onBlur={(e) => handleBlur("contact_name", e.target.value)}
    placeholder="Contact name"
    disabled={copyApplicantData}
    className={`form-input ${!formData.contact_name && currentStep === 2 ? "has-error" : ""}`}
    aria-describedby="contact_name-error"
    required
  />
  {fieldErrors.contact_name && <p id="contact_name-error" className="text-red">{fieldErrors.contact_name}</p>}
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
    value={formData.contact_phone || ""}
    onChange={(e) => handleChange("contact_phone", e.target.value)}
    onBlur={(e) => handleBlur("contact_phone", e.target.value)}
    aria-describedby="contact_phone-error"
    disabled={copyApplicantData}
    placeholder="10-digit phone number"
    className={`form-input ${!formData.contact_phone && currentStep === 2 ? "has-error" : ""}`}
    required
  />
  {fieldErrors.contact_phone && <p id="contact_phone-error" className="text-red">{fieldErrors.contact_phone}</p>}
</div>

<div className="form-group">
  <label htmlFor="contact_email">Email</label>
  <input
    id="contact_email"
    name="contact_email"
    type="email"
    maxLength={FIELD_MAX_LENGTH}
    value={formData.contact_email || ""}
    onChange={(e) => handleChange("contact_email", e.target.value)}
    onBlur={(e) => handleBlur("contact_email", e.target.value)}
    placeholder="Contact email"
    disabled={copyApplicantData}
    className={`form-input ${fieldErrors.contact_email ? "has-error" : ""}`}
    aria-describedby="contact_email-error"
  />
  {fieldErrors.contact_email && <p id="contact_email-error" className="text-red">{fieldErrors.contact_email}</p>}
</div>


              </div>
            </div>
            <div className="form-group">
              <label htmlFor="companyProfile">
                Brief write up on company’s profile{" "}
                <span className="text-red" aria-hidden="true">
                  *
                </span>
              </label>
              <p className="note">(within 300 words)</p>
              <textarea
                id="companyProfile"
                name="companyProfile"
                value={formData.companyProfile}
                onChange={(e) => handleChange("companyProfile", e.target.value)}
                onBlur={(e) => handleBlur("companyProfile", e.target.value)}
                className={`form-textarea ${
                  fieldErrors.companyProfile ? "has-error" : ""
                }`}
                rows={6}

                // maxLength={PROFILE_MAX_LENGTH}

                aria-describedby="companyProfile-error"
                required
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
          </div>
        )}
{currentStep === 3 && (
  <div>
    <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>

    {/* General Info */}
    <h4>General Information</h4>
    <table className="quant-table">
      <thead>
        <tr>
          <th>1</th>
          <th>General Information</th>
          <th>Unit</th>
          <th>Input</th>
        </tr>
      </thead>
      <tbody>
        {part1.slice(0, 5).map(([num, label, unit, key]) => (
          <tr key={key}>
            <td>{num}</td>
            <td>{label}</td>
            <td>{unit}</td>
            <td>
              {["3", "4", "5"].includes(num) ? (
                // Single input for fields 3, 4, 5
                <input
                  type="number"
                  value={formData[key] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className="form-input"
                  aria-label={`${label} (single input)`}
                />
              ) : (
                // Default multi-input logic
                <input
                  type="number"
                  value={formData[key]?.[0] || ""}
                  onChange={(e) => handleChange(key, e.target.value, 0)}
                  className="form-input"
                  aria-label={`${label} for Input`}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* GA Names row */}
    <h4>GA Names</h4>
    <table className="quant-table">
      <thead>
        <tr>
          {Array.from({ length: numGAs }, (_, i) => (
            <th key={i}>{`GA${i + 1}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Array.from({ length: numGAs }, (_, i) => (
            <td key={i}>
              <input
                type="text"
                value={formData.gaNames?.[i] || ""}
                onChange={(e) => handleChange("gaNames", e.target.value, i)}
                className="form-input"
                placeholder={`Name of GA${i + 1}`}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>

    {/* Buttons: Add More GA + Delete Last GA */}
    <div
      style={{
        marginTop: 12,
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      <button type="button" onClick={addMoreGA} className="btn btn-primary">
        Add More GA
      </button>

      {numGAs > 1 && (
        <button
          type="button"
          onClick={confirmDeleteLastGA}
          className="btn btn-danger"
          title="Delete last added GA"
        >
          Delete Last GA
        </button>
      )}

      <div style={{ color: "#444", marginLeft: "auto" }}>
        Total GAs: {numGAs}
      </div>
    </div>

    {/* GA-specific information */}
    <h4 style={{ marginTop: 18 }}>GA-Specific Information</h4>
    <div
      style={{
        overflowX: numGAs > 1 ? "auto" : "visible",
        maxWidth: numGAs > 1 ? "100%" : "none",
      }}
    >
      <table
        className="quant-table"
        style={{
          minWidth:
            numGAs > 1 ? `${700 + (numGAs - 5) * 160}px` : "700px",
        }}
      >
        <thead>
          <tr>
            <th>2</th>
            <th>GA Specific Information</th>
            <th>Unit</th>
            {Array.from({ length: numGAs }, (_, i) => (
              <th key={i}>
                {`GA${i + 1}`}
                {formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {part1.slice(5, 12).map(([num, label, unit, key, isInput]) => (
            <tr key={key}>
              <td>{num}</td>
              <td>{label}</td>
              <td>{unit}</td>
              {isInput ? (
                Array.from({ length: numGAs }, (_, gaIndex) => (
                  <td key={gaIndex}>
                    {key === "baseDate" ? (
                      <input
                        type="text"
                        value="31/03/2025"
                        readOnly
                        className="form-input"
                        aria-label="Base Date (static)"
                      />
                    ) : (
                      <input
                        type={unit === "Date" ? "date" : "number"}
                        value={formData[key]?.[gaIndex] || ""}
                        onChange={(e) =>
                          handleChange(key, e.target.value, gaIndex)
                        }
                        className="form-input"
                        aria-label={`${label} for GA${gaIndex + 1}`}
                      />
                    )}
                  </td>
                ))
              ) : (
                <td colSpan={numGAs}>
                  {calculatedRows.find((row) => row.key === key)?.value || 0}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* D-PNG Connection */}
    <h4 style={{ marginTop: 18 }}>D-PNG Connection</h4>
    <div
      style={{
        overflowX: numGAs > 1 ? "auto" : "visible",
        maxWidth: numGAs > 1 ? "100%" : "none",
      }}
    >
      <table
        className="quant-table"
        style={{
          minWidth:
            numGAs > 1 ? `${700 + (numGAs - 5) * 160}px` : "700px",
        }}
      >
        <thead>
          <tr>
            <th>3</th>
            <th>D-PNG Connection</th>
            <th>Unit</th>
            {Array.from({ length: numGAs }, (_, i) => (
              <React.Fragment key={i}>
                <th style={{ minWidth: "150px" }}>
                  {`GA${i + 1}`}
                  {formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""}{" "}
                  (2024-25)
                </th>
                <th style={{ minWidth: "150px" }}>
                  {`GA${i + 1}`}
                  {formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""}{" "}
                  (2023-24)
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {part1.slice(13).map(([num, label, unit, key, isInput]) => (
            <tr key={key}>
              <td>{num}</td>
              <td style={{ minWidth: "150px" }}>{label}</td>
              <td>{unit}</td>
              {isInput ? (
                Array.from({ length: numGAs }, (_, gaIndex) => (
                  <React.Fragment key={gaIndex}>
                    <td>
                      <input
                        type="number"
                        value={formData[key]?.[gaIndex]?.[0] || ""}
                        onChange={(e) =>
                          handleChange(key, e.target.value, gaIndex, 0)
                        }
                        className="form-input"
                        aria-label={`${label} for GA${gaIndex + 1} 2024-25`}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={formData[key]?.[gaIndex]?.[1] || ""}
                        onChange={(e) =>
                          handleChange(key, e.target.value, gaIndex, 1)
                        }
                        className="form-input"
                        aria-label={`${label} for GA${gaIndex + 1} 2023-24`}
                      />
                    </td>
                  </React.Fragment>
                ))
              ) : (
                <td colSpan={numGAs * 2}>
                  {calculatedRows.find((row) => row.key === key)?.value || 0}
                </td>
              )}
            </tr>
          ))} */}
{part1.slice(13).map(([num, label, unit, key, isInput], index) => (
  <tr key={key}>
    <td>{num}</td>
    <td style={{ minWidth: "150px" }}>{label}</td>
    <td>{unit}</td>
    {isInput ? (
      Array.from({ length: numGAs }, (_, gaIndex) => (
        <React.Fragment key={gaIndex}>
          {index === 0 ? (
            // Single input for the top key
            <td colSpan={2}>
              <input
                type={unit === "Date" ? "date" : "number"}
                value={formData[key]?.[gaIndex] || ""}
                onChange={(e) => handleChange(key, e.target.value, gaIndex)}
                className="form-input"
                aria-label={`${label} for GA${gaIndex + 1}`}
              />
            </td>
          ) : (
            // Two inputs for the rest
            <>
              <td>
                <input
                  type={unit === "Date" ? "date" : "number"}
                  value={formData[key]?.[gaIndex]?.[0] || ""}
                  onChange={(e) =>
                    handleChange(key, e.target.value, gaIndex, 0)
                  }
                  className="form-input"
                  aria-label={`${label} for GA${gaIndex + 1} 2024-25`}
                />
              </td>
              <td>
                <input
                  type={unit === "Date" ? "date" : "number"}
                  value={formData[key]?.[gaIndex]?.[1] || ""}
                  onChange={(e) =>
                    handleChange(key, e.target.value, gaIndex, 1)
                  }
                  className="form-input"
                  aria-label={`${label} for GA${gaIndex + 1} 2023-24`}
                />
              </td>
            </>
          )}
        </React.Fragment>
      ))
    ) : (
      <td colSpan={numGAs * 2}>
        {calculatedRows.find((row) => row.key === key)?.value || 0}
      </td>
    )}
  </tr>
))}

        </tbody>
      </table>
    </div>

    {showDeleteModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white rounded-lg shadow-2xl w-80 p-4">
          <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to delete GA no. {numGAs} ?
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button
              type="button"
              onClick={cancelDeleteLastGA}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              No
            </button>
            <button
              type="button"
              onClick={handleDeleteLastGA}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}



        {currentStep === 4 && (
          <div>
            <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>

            {/* CNG Stations */}
            <h4>CNG Stations</h4>
            <div style={{ overflowX: numGAs > 1 ? "auto" : "visible", maxWidth: numGAs > 1 ? "100%" : "none" }}>
              <table className="quant-table" style={{ minWidth: numGAs > 1 ? `${700 + (numGAs - 5) * 160}px` : "700px" }}>
                <thead>
                  <tr>
                    <th>4</th>
                    <th>CNG Stations</th>
                    <th>Unit</th>
                    {Array.from({ length: numGAs }, (_, i) => (
                      <React.Fragment key={i}>
                        <th style={{ minWidth: "150px" }}>{`GA${i + 1}`}{formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""} (2024-25)</th>
                        <th style={{ minWidth: "150px" }}>{`GA${i + 1}`}{formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""} (2023-24)</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* {part2.slice(0, 3).map(([num, label, unit, key, isInput]) => (
                    <tr key={key}>
                      <td>{num}</td>
                      <td>{label}</td>
                      <td>{unit}</td>
                      {isInput ? (
                        Array.from({ length: numGAs }, (_, gaIndex) => (
                          <React.Fragment key={gaIndex}>
                            <td><input type="number" value={formData[key]?.[gaIndex]?.[0] || ""} onChange={(e) => handleChange(key, e.target.value, gaIndex, 0)} className="form-input" /></td>
                            <td><input type="number" value={formData[key]?.[gaIndex]?.[1] || ""} onChange={(e) => handleChange(key, e.target.value, gaIndex, 1)} className="form-input" /></td>
                          </React.Fragment>
                        ))
                      ) : (
                        <td colSpan={numGAs * 2}>{calculatedRows.find((row) => row.key === key)?.value || 0}</td>
                      )}
                    </tr>
                  ))} */}
{part2.slice(0, 3).map(([num, label, unit, key, isInput], index) => (
  <tr key={key}>
    <td>{num}</td>
    <td>{label}</td>
    <td>{unit}</td>
    {isInput ? (
      Array.from({ length: numGAs }, (_, gaIndex) => (
        <React.Fragment key={gaIndex}>
          {index === 0 ? (
            // Single input for the top key
            <td colSpan={2}>
              <input
                type={unit === "Date" ? "date" : "number"}
                value={formData[key]?.[gaIndex] || ""}
                onChange={(e) => handleChange(key, e.target.value, gaIndex)}
                className="form-input"
                aria-label={`${label} for GA${gaIndex + 1}`}
              />
            </td>
          ) : (
            // Two inputs for the rest
            <>
              <td>
                <input
                  type={unit === "Date" ? "date" : "number"}
                  value={formData[key]?.[gaIndex]?.[0] || ""}
                  onChange={(e) =>
                    handleChange(key, e.target.value, gaIndex, 0)
                  }
                  className="form-input"
                  aria-label={`${label} for GA${gaIndex + 1} 2024-25`}
                />
              </td>
              <td>
                <input
                  type={unit === "Date" ? "date" : "number"}
                  value={formData[key]?.[gaIndex]?.[1] || ""}
                  onChange={(e) =>
                    handleChange(key, e.target.value, gaIndex, 1)
                  }
                  className="form-input"
                  aria-label={`${label} for GA${gaIndex + 1} 2023-24`}
                />
              </td>
            </>
          )}
        </React.Fragment>
      ))
    ) : (
      <td colSpan={numGAs * 2}>
        {calculatedRows.find((row) => row.key === key)?.value || 0}
      </td>
    )}
  </tr>
))}



                </tbody>
              </table>
            </div>

            {/* Inch-km of Pipeline Laid */}
            <h4>Inch-km of Pipeline Laid</h4>
            <div style={{ overflowX: numGAs > 1 ? "auto" : "visible", maxWidth: numGAs > 1 ? "100%" : "none" }}>
              <table className="quant-table" style={{ minWidth: numGAs > 1 ? `${700 + (numGAs - 5) * 160}px` : "700px" }}>
                <thead>
                  <tr>
                    <th>5</th>
                    <th>Inch-km of Pipeline Laid</th>
                    <th>Unit</th>
                    {Array.from({ length: numGAs }, (_, i) => (
                      <React.Fragment key={i}>
                        <th style={{ minWidth: "150px" }}>{`GA${i + 1}`}{formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""} (2024-25)</th>
                        <th style={{ minWidth: "150px" }}>{`GA${i + 1}`}{formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""} (2023-24)</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* {part2.slice(3, 6).map(([num, label, unit, key, isInput]) => (
                    <tr key={key}>
                      <td>{num}</td>
                      <td>{label}</td>
                      <td>{unit}</td>
                      {isInput ? (
                        Array.from({ length: numGAs }, (_, gaIndex) => (
                          <React.Fragment key={gaIndex}>
                            <td><input type="number" value={formData[key]?.[gaIndex]?.[0] || ""} onChange={(e) => handleChange(key, e.target.value, gaIndex, 0)} className="form-input" /></td>
                            <td><input type="number" value={formData[key]?.[gaIndex]?.[1] || ""} onChange={(e) => handleChange(key, e.target.value, gaIndex, 1)} className="form-input" /></td>
                          </React.Fragment>
                        ))
                      ) : (
                        <td colSpan={numGAs * 2}>{calculatedRows.find((row) => row.key === key)?.value || 0}</td>
                      )}
                    </tr>
                  ))} */}
               {part2.slice(3, 6).map(([num, label, unit, key, isInput], index) => (
  <tr key={key}>
    <td>{num}</td>
    <td>{label}</td>
    <td>{unit}</td>
    {isInput ? (
      Array.from({ length: numGAs }, (_, gaIndex) => (
        <React.Fragment key={gaIndex}>
          {index === 0 ? (
            // Single input for the top key
            <td colSpan={2}>
              <input
                type={unit === "Date" ? "date" : "number"}
                value={formData[key]?.[gaIndex] || ""}
                onChange={(e) => handleChange(key, e.target.value, gaIndex)}
                className="form-input"
                aria-label={`${label} for GA${gaIndex + 1}`}
              />
            </td>
          ) : (
            // Two inputs for the rest
            <>
              <td>
                <input
                  type={unit === "Date" ? "date" : "number"}
                  value={formData[key]?.[gaIndex]?.[0] || ""}
                  onChange={(e) =>
                    handleChange(key, e.target.value, gaIndex, 0)
                  }
                  className="form-input"
                  aria-label={`${label} for GA${gaIndex + 1} 2024-25`}
                />
              </td>
              <td>
                <input
                  type={unit === "Date" ? "date" : "number"}
                  value={formData[key]?.[gaIndex]?.[1] || ""}
                  onChange={(e) =>
                    handleChange(key, e.target.value, gaIndex, 1)
                  }
                  className="form-input"
                  aria-label={`${label} for GA${gaIndex + 1} 2023-24`}
                />
              </td>
            </>
          )}
        </React.Fragment>
      ))
    ) : (
      <td colSpan={numGAs * 2}>
        {calculatedRows.find((row) => row.key === key)?.value || 0}
      </td>
    )}
  </tr>
))}

                </tbody>
              </table>
            </div>

            {/* Natural Gas Sales & CBG Intake */}
            <h4>Natural Gas Sales & CBG Intake</h4>
            <div style={{ overflowX: numGAs > 1 ? "auto" : "visible", maxWidth: numGAs > 1 ? "100%" : "none" }}>
              <table className="quant-table" style={{ minWidth: numGAs > 1 ? `${700 + (numGAs - 5) * 160}px` : "700px" }}>
                <thead>
                  <tr>
                    <th>6</th>
                    <th>Natural Gas Sales & CBG Intake</th>
                    <th>Unit</th>
                    {Array.from({ length: numGAs }, (_, i) => (
                      <React.Fragment key={i}>
                        <th style={{ minWidth: "150px" }}>{`GA${i + 1}`}{formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""} (2024-25)</th>
                        <th style={{ minWidth: "150px" }}>{`GA${i + 1}`}{formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""} (2023-24)</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {part2.slice(6, 9).map(([num, label, unit, key]) => (
                    <tr key={key}>
                      <td>{num}</td>
                      <td>{label}</td>
                      <td>{unit}</td>
                      {Array.from({ length: numGAs }, (_, gaIndex) => (
                        <React.Fragment key={gaIndex}>
                          <td><input type="number" value={formData[key]?.[gaIndex]?.[0] || ""} onChange={(e) => handleChange(key, e.target.value, gaIndex, 0)} className="form-input" /></td>
                          <td><input type="number" value={formData[key]?.[gaIndex]?.[1] || ""} onChange={(e) => handleChange(key, e.target.value, gaIndex, 1)} className="form-input" /></td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Safety */}
            <h4>Safety</h4>
            <div style={{ overflowX: numGAs > 1 ? "auto" : "visible", maxWidth: numGAs > 1 ? "100%" : "none" }}>
              <table className="quant-table" style={{ minWidth: numGAs > 1 ? `${700 + (numGAs - 5) * 160}px` : "700px" }}>
                <thead>
                  <tr>
                    <th>7</th>
                    <th>Safety</th>
                    <th>Unit</th>
                    {Array.from({ length: numGAs }, (_, i) => (
                      <React.Fragment key={i}>
                        <th style={{ minWidth: "150px" }}>{`GA${i + 1}`}{formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""} (2024-25)</th>
                        <th style={{ minWidth: "150px" }}>{`GA${i + 1}`}{formData.gaNames?.[i] ? ` (${formData.gaNames[i]})` : ""} (2023-24)</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {part2.slice(9,15).map(([num, label, unit, key]) => (
                    <tr key={key}>
                      <td>{num}</td>
                      <td>{label}</td>
                      <td>{unit}</td>
                      {Array.from({ length: numGAs }, (_, gaIndex) => (
                        <React.Fragment key={gaIndex}>
                          <td><input type="number" value={formData[key]?.[gaIndex]?.[0] || ""} onChange={(e) => handleChange(key, e.target.value, gaIndex, 0)} className="form-input" /></td>
                          <td><input type="number" value={formData[key]?.[gaIndex]?.[1] || ""} onChange={(e) => handleChange(key, e.target.value, gaIndex, 1)} className="form-input" /></td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button type="button" onClick={addMoreGA} className="btn btn-primary mt-4">Add More GA</button>

            <div className="form-group">
              <label htmlFor="comment">Comments</label>
              <textarea id="comment" name="comment" value={formData.comment} onChange={(e) => handleChange("comment", e.target.value)} onBlur={(e) => handleBlur("comment", e.target.value)} className={`form-textarea ${fieldErrors.comment ? "has-error" : ""}`} placeholder="Comments in (200 words) against input parameter, if any" />
              {fieldErrors.comment && <span className="error-tooltip" id="comment-error" role="alert">{fieldErrors.comment}</span>}
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
                              handleAttachmentChange(
                                key,
                                "description",
                                e.target.value
                              )
                            }
                            onBlur={(e) =>
                              handleBlur(`${key}.description`, e.target.value)
                            }
                            placeholder="Enter description"
                            className={`form-input ${
                              fieldErrors[`${key}.description`]
                                ? "has-error"
                                : ""
                            }`}
                            maxLength={FIELD_MAX_LENGTH}
                            aria-describedby={`${key}-description-error`}
                          />
                          {fieldErrors[`${key}.description`] && (
                            <span
                              className="error-tooltip"
                              id={`${key}-description-error`}
                              role="alert"
                            >
                              {fieldErrors[`${key}.description`]}
                            </span>
                          )}
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
                            className={`form-input mt-4 ${
                              fieldErrors[key] ? "has-error" : ""
                            }`}
                            aria-label={`Upload attachment ${num}`}
                          />
                          {attachment.file && (
                            <p className="file-name">
                              Selected file: {attachment.file.name}
                            </p>
                          )}
                          {fieldErrors[key] && (
                            <span
                              className="error-tooltip"
                              id={`${key}-error`}
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
            </div>
            <div className="form-group">
              <label>
                Print the completed application form and upload it with the
                signature of the approving authority. Without signature of the
                approving authority, application will not be considered valid.{" "}
                <span className="text-red" aria-hidden="true">
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
                <button type="submit" className="btn btn-success">
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

export default RegistrationCGD;

