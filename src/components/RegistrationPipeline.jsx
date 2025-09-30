

import React, { useState, useEffect, useCallback } from "react";
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
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const RegistrationPipeline = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const awardTitle =
    location.state?.awardTitle || "Pipeline Transportation Company of the Year";

  const [formId, setFormId] = useState("Unknown");
  const [PkId, setPkId] = useState(0);

  // Form state initialization
  const [formData, setFormData] = useState({
    Organisationname: "",
    category: "Pipeline Transportation Company of the Year",
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
    throughputCrude: ["", ""], // [2024-25, 2023-24]
    throughputLiquid: ["", ""], // [2024-25, 2023-24]
    throughputGas: ["", ""], // [2024-25, 2023-24]
    actualThroughputCrude: ["", ""], // [2024-25, 2023-24]
    actualThroughputLiquid: ["", ""], // [2024-25, 2023-24]
    actualThroughputGas: ["", ""], // [2024-25, 2023-24]
    opCostCrude: ["", ""], // [2024-25, 2023-24]
    opCostLiquid: ["", ""], // [2024-25, 2023-24]
    opCostGas: ["", ""], // [2024-25, 2023-24]
    energyCrude: ["", ""], // [2024-25, 2023-24]
    energyLiquid: ["", ""], // [2024-25, 2023-24]
    energyGas: ["", ""], // [2024-25, 2023-24]
    leaksCrude: ["", ""], // [2024-25, 2023-24]
    leaksLiquid: ["", ""], // [2024-25, 2023-24]
    leaksGas: ["", ""], // [2024-25, 2023-24]
    lossLeakage: ["", ""], // [2024-25, 2023-24]
    downtimeBreakdown: ["", ""], // [2024-25, 2023-24]
    downtimeSabotage: ["", ""], // [2024-25, 2023-24]
    powerTotal: ["", ""], // [2024-25, 2023-24]
    powerRE: ["", ""], // [2024-25, 2023-24]
    fatalities: ["", ""], // [2024-25, 2023-24]
    injuries: ["", ""], // [2024-25, 2023-24]
    oshaIncidents: ["", ""], // [2024-25, 2023-24]
    manhoursOwn: ["", ""], // [2024-25, 2023-24]
    manhoursContract: ["", ""], // [2024-25, 2023-24]
    attachments1: { description: "", file: null },
    attachments2: { description: "", file: null },
    attachments3: { description: "", file: null },
    attachments4: { description: "", file: null },
  });

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("user_info");
      if (stored) {
        const user = JSON.parse(stored);
        setUserInfo(JSON.parse(stored));
        setFormId(`PipelineRegistration_${user.id}`);

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

  // This use Effect Prefill user Data using api;
  useEffect(() => {
    if (userInfo && formId) {
      // prefillFormData();
    } else {
      console.warn(
        `userInfo OR formId is invalid; Kindly check the method. and data`
      );
    }
  }, [userInfo, formId]);

  const isSubmited = () => formData.form_mode === 'submited';

  // function prefillFormData() {
  //   let url = `/pipeline/?userid=${userInfo.id}&form_id=${formId}`;
  //   apiClient
  //     .get(url)
  //     .then((res) => {
  //       if (res.data.length === 1) {
  //         const _ResData = res.data[0];
  //         setPkId(_ResData.id);
  //         /**
  //          * Set the api response in your state;
  //          */

  //         setFormData((prev) => {
  //           prev.category       =_ResData.category;
  //           prev.mailingAddress = _ResData.mailing_address;
  //           prev.authorityName  =_ResData.authority_name;
  //           prev.authorityTitle  =_ResData.authority_title;
  //           prev.authorityPhone  =_ResData.authority_phone;
  //           prev.authorityLandline  =_ResData.authorityLandline;
  //           prev.authorityEmail  =_ResData.authority_email;
  //           prev.applicant_name  =_ResData.contact_name;
  //           prev.applicant_phone  =_ResData.contact_phone;
  //           prev.applicant_email  =_ResData.contact_email;
  //           prev.contact_name  =_ResData.contact_name;
  //           prev.contact_phone  =_ResData.contact_phone;
  //           prev.contact_email  =_ResData.contact_email;
  //           prev.companyProfile  =_ResData.company_profile;





  //           prev.approvingAuthoritySignature =
  //             _ResData.approving_authority_file;
  //           prev["form_mode"] = _ResData?.form_mode || 'draft'

  //           return { ...prev };
  //         });

  //         console.log(
  //           `id :: ${_ResData.id}, mailingAddresss :: ${_ResData.mailing_address} `
  //         );
  //       }
  //       console.log("prefill status :: ", res);
  //     })
  //     .catch((err) =>
  //       console.error(`useEffect error on get dynamic data :: Error :: ${err}`)
  //     );
  // }


  // function prefillFormData() {
  //   const url = `/pipeline/?userid=${userInfo.id}&form_id=${formId}`;
  //   // apiClient
  //     // .get(url)
  //     // .then((res) => {
  //       // if (!Array.isArray(res.data) || res.data.length !== 1) {
  //       //   console.log("No prefill data found:", res.data);
  //       //   return;
  //       // }

  //       // const _ResData = res.data[0];
  //       // setPkId(_ResData.id || 0);

  //       // map for the numeric arrays: stateKey -> api base key
  //       const quantMap = {
  //         throughputCrude: "throughput_crude",
  //         throughputLiquid: "throughput_liquid",
  //         throughputGas: "throughput_gas",
  //         actualThroughputCrude: "actual_throughput_crude",
  //         actualThroughputLiquid: "actual_throughput_liquid",
  //         actualThroughputGas: "actual_throughput_gas",
  //         opCostCrude: "op_cost_crude",
  //         opCostLiquid: "op_cost_liquid",
  //         opCostGas: "op_cost_gas",
  //         energyCrude: "energy_crude",
  //         energyLiquid: "energy_liquid",
  //         energyGas: "energy_gas",
  //         leaksCrude: "leaks_crude",
  //         leaksLiquid: "leaks_liquid",
  //         leaksGas: "leaks_gas",
  //         lossLeakage: "loss_leakage",
  //         downtimeBreakdown: "downtime_breakdown",
  //         downtimeSabotage: "downtime_sabotage",
  //         powerTotal: "power_total",
  //         powerRE: "power_re",
  //         fatalities: "fatalities",
  //         injuries: "injuries",
  //         oshaIncidents: "osha_incidents",
  //         manhoursOwn: "manhours_own",
  //         manhoursContract: "manhours_contract",
  //       };

  //       // Build newFields immutably so React reliably re-renders controlled inputs
  //       const newFields = {
  //         // basic strings / booleans
  //         Organisationname:
  //           _ResData.organisation_name ??
  //           _ResData.organisationName ??
  //           _ResData.company_name ??
  //           "",
  //         category: _ResData.category ?? "",
  //         mailingAddress: _ResData.mailing_address ?? _ResData.mailingAddress ?? "",
  //         authorityName: _ResData.authority_name ?? "",
  //         authorityTitle: _ResData.authority_title ?? "",
  //         authorityPhone: _ResData.authority_phone ?? "",
  //         authorityLandline: _ResData.authority_landline ?? _ResData.authorityLandline ?? "",
  //         authorityEmail: _ResData.authority_email ?? "",
  //         applicant_name: _ResData.applicant_name ?? _ResData.contact_name ?? "",
  //         applicant_phone: _ResData.applicant_phone ?? _ResData.contact_phone ?? "",
  //         applicant_email: _ResData.applicant_email ?? _ResData.contact_email ?? "",
  //         contact_name: _ResData.contact_name ?? "",
  //         contact_phone: _ResData.contact_phone ?? "",
  //         contact_email: _ResData.contact_email ?? "",
  //         companyProfile: _ResData.company_profile ?? "",
  //         comment: _ResData.comment ?? "",
  //         declaration: _ResData.declaration === true || _ResData.declaration === "true",
  //         form_mode: _ResData.form_mode ?? "draft",
  //       };

  //       // Numeric arrays (set as strings so controlled inputs accept them)
  //       Object.entries(quantMap).forEach(([stateKey, apiKey]) => {
  //         const v2024 = _ResData[`${apiKey}_2024`];
  //         const v2023 = _ResData[`${apiKey}_2023`];
  //         // prefer empty string for missing values to keep inputs controlled
  //         newFields[stateKey] = [
  //           v2024 === null || v2024 === undefined ? "" : String(v2024),
  //           v2023 === null || v2023 === undefined ? "" : String(v2023),
  //         ];

  //         // also set flat fallback keys (some parts of your code may check these)
  //         newFields[`${stateKey}_2024`] = v2024 === null || v2024 === undefined ? "" : String(v2024);
  //         newFields[`${stateKey}_2023`] = v2023 === null || v2023 === undefined ? "" : String(v2023);
  //       });

  //       // Attachments and signature: server usually returns URLs/paths; keep both url preview and null file
  //       [1, 2, 3, 4].forEach((n) => {
  //         const fileKey = `attachments${n}`;
  //         const descKey = `${fileKey}_desc`;
  //         newFields[fileKey] = {
  //           description: _ResData[descKey] ?? "",
  //           file: null, // file object is null until user selects a new File
  //           url: _ResData[fileKey] ?? _ResData[`${fileKey}_url`] ?? null, // helpful for preview links
  //         };
  //       });

  //       // approving authority signature: file object stays null, store url for preview/storage check
  //       newFields.approvingAuthoritySignature = null;
  //       newFields.approvingAuthoritySignatureUrl =
  //         _ResData.approving_authority_file ?? _ResData.approving_authority_file_url ?? null;

  //       // Finally set the form state immutably
  //       setFormData((prev) => ({ ...prev, ...newFields }));

  //       console.log("Prefill applied, pkId:", _ResData.id);
  //     // })
  //     // .catch((err) => {
  //     //   console.error("prefillFormData error:", err);
  //     // });
  // }


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

  // Handle changes for inputs/textareas/selects
  const handleChange = (name, value, index = null) => {
    if ([1, 2, 4].includes(currentStep)) {
      let applicableMaxLength = FIELD_MAX_LENGTH;
      if (name === "companyProfile")
        applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
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
        } else if (value.length > applicableMaxLength) {
          alert(`Value cannot exceed ${applicableMaxLength} characters.`);
          return;
        }
      }
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
    if (["authorityPhone", "contact_phone"].includes(name)) {
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

    // Handle array-based inputs for quantitative fields
    if (index !== null) {
      setFormData((prev) => {
        const updatedArray = Array.isArray(prev[name])
          ? [...prev[name]]
          : ["", ""];
        updatedArray[index] = value;
        return {
          ...prev,
          [name]: updatedArray,
        };
      });
      clearFieldError(`${name}[${index}]`);
    } else {
      // Default handling for non-array fields
      setFormData((prev) => ({
        ...prev,
        [name]: typeof value === "boolean" ? value : value || "",
      }));
      clearFieldError(name);
    }

    if (name === "Organisationname" && value && currentStep === 1) setError("");
    if (name === "mailingAddress" && value?.trim() && currentStep === 1)
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

  // Quantitative data for steps 3 and 4
  const data = [
    {
      num: "1",
      label:
        "Pipeline Throughput Capacity (MMT) (1325 MMSCM of natural gas = 1 MMT of natural gas)",
    },
    { num: "1.1", label: "Crude Oil", key: "throughputCrude" },
    {
      num: "1.2",
      label: "Liquid Products (Including LPG)",
      key: "throughputLiquid",
    },
    { num: "1.3", label: "Natural Gas", key: "throughputGas" },

    {
      num: "2",
      label:
        "Pipeline Actual Throughput (MMT) (1325 MMSCM of natural gas = 1 MMT of natural gas) ",
    },
    { num: "2.1", label: "Crude Oil", key: "actualThroughputCrude" },
    {
      num: "2.2",
      label: "Liquid Products (Including LPG)",
      key: "actualThroughputLiquid",
    },
    { num: "2.3", label: "Natural Gas", key: "actualThroughputGas" },

    { num: "3", label: "Operating Cost (Rs./Ton/Km)  (Exclude depreciation) " },
    { num: "3.1", label: "Crude Oil", key: "opCostCrude" },
    {
      num: "3.2",
      label: "Liquid Products (Including LPG)",
      key: "opCostLiquid",
    },
    { num: "3.3", label: "Natural Gas", key: "opCostGas" },

    { num: "4", label: "Specific Energy Consumption (Kcal/ Ton-Km)" },
    { num: "4.1", label: "Crude Oil", key: "energyCrude" },
    {
      num: "4.2",
      label: "Liquid Products (Including LPG)",
      key: "energyLiquid",
    },
    { num: "4.3", label: "Natural Gas", key: "energyGas" },

    { num: "5", label: "Leaks reported during the year (number)" },
    { num: "5.1", label: "Crude Oil", key: "leaksCrude" },
    {
      num: "5.2",
      label: "Liquid Products (Including LPG)",
      key: "leaksLiquid",
    },
    { num: "5.3", label: "Natural Gas", key: "leaksGas" },
    { num: "5.4", label: "Loss due to leakage (MMT)", key: "lossLeakage" },

    {
      num: "6",
      label:
        "Pipeline Downtime (Hours) due to reasons other than product/ Natural Gas non-availability and containment constraints ",
    },
    { num: "6.1", label: "Breakdown", key: "downtimeBreakdown" },
    { num: "6.2", label: "Leaks/Sabotage", key: "downtimeSabotage" },

    {
      num: "7",
      label: "Renewable Energy (RE) as percentage of total power consumed",
    },
    { num: "7.1", label: "Total Power consumed (kw)", key: "powerTotal" },
    { num: "7.2", label: "RE Power produced (kw)", key: "powerRE" },

    { num: "8", label: "Safety" },
    {
      num: "8.1",
      label: "Number of fatalities (own employees + contract employees) ",
      key: "fatalities",
    },
    {
      num: "8.2",
      label:
        "Number of lost time injuries in the reporting period (own employees + contract employees)",
      key: "injuries",
    },
    {
      num: "8.3",
      label:
        "Number of OSHA recordable incidents (own employees + contract employees) ",
      key: "oshaIncidents",
    },
    {
      num: "8.4",
      label: "Total Man-hours worked Own Employees ",
      key: "manhoursOwn",
    },
    {
      num: "8.5",
      label: "Total Man-hours worked Contractors Employees ",
      key: "manhoursContract",
    },
  ];

  // Print form handler
  const renderQuantitativePrint = (sectionStart, sectionEnd) => {
    let html = "";

    const filteredData = data.filter(
      (section) =>
        parseFloat(section.num) >= sectionStart &&
        parseFloat(section.num) <= sectionEnd
    );

    filteredData.forEach((section) => {
      html += `
      <tr>
        <td style="border: 1px solid #000; padding: 8px;">${section.num}</td>
        <td style="border: 1px solid #000; padding: 8px;" colspan="3">${section.label
        }</td>
        <td style="border: 1px solid #000; padding: 8px;">${section.key ? formData[`${section.key}_2024`] || "" : ""
        }</td>
        <td style="border: 1px solid #000; padding: 8px;">${section.key ? formData[`${section.key}_2023`] || "" : ""
        }</td>
      </tr>
    `;
    });

    return html;
  };

  const handlePrint = () => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #1e40af;">${awardTitle}</h1>
        <h2>Organization & Contact Details</h2>
        <p><strong>Organisation Name:</strong> ${formData.Organisationname || ""
      }</p>
        <p><strong>Postal Address:</strong> ${formData.mailingAddress || ""}</p>
         <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ""
      }</p>
        <p><strong>Approving Authority Designation:</strong> ${formData.authorityTitle || ""
      }</p>
        <p><strong>Approving Authority Landline:</strong> ${formData.authorityLandline || ""
      }</p>
        <p><strong>Approving Authority Phone:</strong> ${formData.authorityPhone || ""
      }</p>
        <p><strong>Approving Authority Email:</strong> ${formData.authorityEmail || ""
      }</p>

        <h2>Nodal Official Contact Details:</h2>
        <p><strong>Contact Name:</strong> ${formData.contact_name || ""}</p>
        <p><strong>Contact Phone:</strong> ${formData.contact_phone || ""}</p>
        <p><strong>Contact Email:</strong> ${formData.contact_email || ""}</p>
        
        <p><strong>Brief write up on Petroleum Products pipeline transportation activities. (Length, Capacity must be provided for each product category separately besides other operations):</strong> ${formData.companyProfile || ""
      }</p>
        <h2>Quantitative Information - Part 1</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S.No</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;"></th>
              <th style="border: 1px solid #000; padding: 8px;"></th>
              <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
              <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
            </tr>
          </thead>
          <tbody>
            ${renderQuantitativePrint(1, 4.3)}
          </tbody>
        </table>
        <h2>Quantitative Information - Part 2</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">S.No</th>
              <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
              <th style="border: 1px solid #000; padding: 8px;"></th>
              <th style="border: 1px solid #000; padding: 8px;"></th>
              <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
              <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
            </tr>
          </thead>
          <tbody>
            ${renderQuantitativePrint(5, 8.5)}
          </tbody>
        </table>
        <h2>Attachments</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px; width:10px ">S.No</th>
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
                <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].description || ""
            }</td>
                <td style="border: 1px solid #000; padding: 8px;">${formData[`attachments${i}`].file?.name || ""
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
        <p><strong>Approving Authority Name:</strong> ${formData.authorityName || ""
      }</p>
        <p><strong>Approving Authority Designation:</strong> ${formData.authorityTitle || ""
      }</p>
        <p><strong>Signed on:</strong> ${formData.signatureDate || new Date().toLocaleDateString()
      }</p>
        <p><strong>Approving Authority Signature:</strong></p>
      </div>
  `;

    const printWindow = window.open("", "_blank", "height=600,width=800");
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

  // Check for empty fields in a section range
  const hasEmptyFieldsInStep = (startNum, endNum) => {
    // Filter flat data items in the num range
    const filteredItems = data.filter((section) => {
      const num = parseFloat(section.num);
      return num >= startNum && num <= endNum;
    });

    // Loop through and check if any key has empty value
    for (const section of filteredItems) {
      if (!section.key) continue; // Skip rows without input fields

      const val2024 = formData[`${section.key}_2024`];
      const val2023 = formData[`${section.key}_2023`];

      if (val2024 === "" || val2024 == null) return true;
      if (val2023 === "" || val2023 == null) return true;
    }

    return false;
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
      //   alert('Authority phone must be exactly 10 digits.');
      //   return;
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
        alert("Company Profile is required.");
        return;
      }
    }
    if (currentStep === 3 && hasEmptyFieldsInStep(1, 5)) {
      if (!window.confirm("Data not entered,If you wish to continue?")) {
        return;
      }
    }
    if (currentStep === 4 && hasEmptyFieldsInStep(6, 8)) {
      if (!window.confirm("Data not entered,If you wish to continue?")) {
        return;
      }
    }

    setError("");
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // Save draft handler
  const handleSaveDraft = () => {
    localStorage.setItem(
      "registrationPipelineDraft",
      JSON.stringify({ formData })
    );
    handleSubmit(null);
    alert("Draft Saved!");
  };





  //Final Submit button

  const finalSubmit = () => {
    handleSubmit(null, "submited")
  }


  // Submit form handler
  // Replace your existing handleSubmit with this
  async function handleSubmit(event, clickType = "draft") {
    if (event) {
      event?.preventDefault();
    }
    console.log("############################ Save the DAta on Server ##########################")
    // 1) Make a local copy of formData so we don't rely on async state updates
    let payload = { ...formData };

    // 2) Merge user_info synchronously (don't call setFormData here)
    try {
      const raw = localStorage.getItem("user_info");
      if (raw) {
        const u = JSON.parse(raw);
        payload.userid = u.id ?? payload.userid;
        payload.firstname = u.first_name ?? payload.firstname;
        payload.lastname = u.last_name ?? payload.lastname;
        payload.company_name = u.organisation_name ?? payload.company_name;
        payload.Organisationname =
          u.organisation_name ?? payload.Organisationname;
      }
    } catch (err) {
      console.warn("Failed to load user_info:", err);
    }



    const quantMap = {
      throughputCrude: { api: "throughput_crude", type: "decimal" },
      throughputLiquid: { api: "throughput_liquid", type: "decimal" },
      throughputGas: { api: "throughput_gas", type: "decimal" },
      actualThroughputCrude: {
        api: "actual_throughput_crude",
        type: "decimal",
      },
      actualThroughputLiquid: {
        api: "actual_throughput_liquid",
        type: "decimal",
      },
      actualThroughputGas: { api: "actual_throughput_gas", type: "decimal" },
      opCostCrude: { api: "op_cost_crude", type: "decimal" },
      opCostLiquid: { api: "op_cost_liquid", type: "decimal" },
      opCostGas: { api: "op_cost_gas", type: "decimal" },
      energyCrude: { api: "energy_crude", type: "decimal" },
      energyLiquid: { api: "energy_liquid", type: "decimal" },
      energyGas: { api: "energy_gas", type: "decimal" },
      lossLeakage: { api: "loss_leakage", type: "decimal" },
      downtimeBreakdown: { api: "downtime_breakdown", type: "decimal" },
      downtimeSabotage: { api: "downtime_sabotage", type: "decimal" },
      powerTotal: { api: "power_total", type: "decimal" },
      powerRE: { api: "power_re", type: "decimal" },

      leaksCrude: { api: "leaks_crude", type: "int" },
      leaksLiquid: { api: "leaks_liquid", type: "int" },
      leaksGas: { api: "leaks_gas", type: "int" },
      fatalities: { api: "fatalities", type: "int" },
      injuries: { api: "injuries", type: "int" },
      oshaIncidents: { api: "osha_incidents", type: "int" },
      manhoursOwn: { api: "manhours_own", type: "int" },
      manhoursContract: { api: "manhours_contract", type: "int" },
    };

    // 5) Validate / parse numeric inputs before building FormData
    const invalid = [];
    const parsed = {};

    const cleanString = (v) => {
      if (v === null || v === undefined) return "";
      return String(v).replace(/,/g, "").trim();
    };

    for (const [jsKey, { api, type }] of Object.entries(quantMap)) {
      const flat24Key = `${jsKey}_2024`;
      const flat23Key = `${jsKey}_2023`;

      const raw24 = payload.hasOwnProperty(flat24Key)
        ? payload[flat24Key]
        : Array.isArray(payload[jsKey])
          ? payload[jsKey][0]
          : "";
      const raw23 = payload.hasOwnProperty(flat23Key)
        ? payload[flat23Key]
        : Array.isArray(payload[jsKey])
          ? payload[jsKey][1]
          : "";

      const c24 = cleanString(raw24);
      const c23 = cleanString(raw23);

      const parse = (s, label) => {
        if (s === "") return null;
        const n = Number(s);
        if (!isFinite(n)) {
          invalid.push(`${label} -> "${s}"`);
          return null;
        }
        if (type === "int") {
          if (!Number.isInteger(n) && Math.abs(n - Math.round(n)) > 1e-9) {
            invalid.push(`${label} (expected integer) -> "${s}"`);
            return null;
          }
          return Math.round(n);
        }
        return n;
      };

      parsed[`${api}_2024`] = parse(c24, `${api}_2024`);
      parsed[`${api}_2023`] = parse(c23, `${api}_2023`);
    }

    if (invalid.length) {
      return alert(
        "Please fix these numeric fields:\n- " + invalid.join("\n- ")
      );
    }

    // 6) Build FormData
    const fd = new FormData();
    fd.append("organisation_name", payload.Organisationname || "");
    fd.append("category", payload.category || "");
    fd.append("firstname", payload.firstname || "");
    fd.append("lastname", payload.lastname || "");
    fd.append("userid", payload.userid || "");
    fd.append("company_name", payload.company_name || "");
    fd.append("mailing_address", payload.mailingAddress || "");

    fd.append("authority_name", payload.authorityName || "");
    fd.append("authority_title", payload.authorityTitle || "");
    fd.append("authority_phone", payload.authorityPhone || "");
    fd.append("authorityLandline", formData.authorityLandline || "");
    fd.append("authority_email", payload.authorityEmail || "");

    fd.append(
      "copy_applicant_data",
      payload.copy_applicant_data ? "true" : "false"
    );
    fd.append("contact_name", payload.contact_name || "");
    fd.append("contact_phone", payload.contact_phone || "");
    fd.append("contact_email", payload.contact_email || "");

    fd.append("company_profile", payload.companyProfile || "");
    fd.append("comment", payload.comment || "");
    fd.append("declaration", payload.declaration ? "true" : "false");
    fd.append("form_id", formId);
    fd.append("form_mode", clickType);
    // Add Table Pk Id;
    if (PkId > 0) fd.append("id", PkId);

    if (payload.approvingAuthoritySignature instanceof File) {
      fd.append(
        "approving_authority_file",
        payload.approvingAuthoritySignature
      );
    }

    for (const [key, val] of Object.entries(parsed)) {
      if (val !== null && val !== undefined) {
        fd.append(key, String(val));
      }
    }

    [1, 2, 3, 4].forEach((n) => {
      const slot = payload[`attachments${n}`] || {};
      if (slot.description) fd.append(`attachments${n}_desc`, slot.description);
      if (slot.file instanceof File) fd.append(`attachments${n}`, slot.file);
    });

    // 7) Submit
    try {
      // const response = await apiClient.post("/pipeline/", fd, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      alert("Pipeline registration submitted successfully!");
      setIsSubmitted(true);

      // When User save the Data It will Prefill the form data and fill pkId
      // prefillFormData();
    } catch (err) {
      console.error("Pipeline submission error:", err);
      const serverMsg =
        err?.response?.data ?? err?.message ?? JSON.stringify(err);
      alert("Submission failed: " + JSON.stringify(serverMsg));
    }
  }

  // Rendering steps content
  const renderStepContent = () => {
    const progress = ((currentStep - 1) / 4) * 100;
    const years = ["2024-25", "2023-24"];

    const renderSection = (section) => {
      const headerNums = ["1", "2", "3", "4", "5", "6", "7", "8"];

      const isHeaderRow = headerNums.includes(section.num);

      if (isHeaderRow) {
        return (
          <tr key={section.num}>
            <td colSpan="1" style={{ color: "black", fontWeight: "bold" }}>
              {section.num}
            </td>
            <td
              colSpan="7"
              style={{ color: "black", fontWeight: "bold", textAlign: "left" }}
            >
              <p style={{ margin: 0 }}>{section.label}</p>
            </td>
          </tr>
        );
      }
      return (
        <tr key={section.num}>
          {/* Serial Number */}
          <td className="sno-cell">{section.num}</td>

          {/* Label */}
          <td className="label-cell" colSpan={3}>
            {section.label}
          </td>

          {/* 2024-25 */}
          <td>
            {section.key ? (
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="text" // prevents browser spinners
                name={`${section.key}_2024`}
                value={formData[`${section.key}_2024`] || ""}
                onChange={(e) => {
                  let val = e.target.value;

                  // Allow only digits and a single decimal point
                  val = val.replace(/[^0-9.]/g, "");
                  const parts = val.split(".");
                  if (parts.length > 2) {
                    val = parts[0] + "." + parts.slice(1).join("");
                  }

                  handleChange(`${section.key}_2024`, val);
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
                className="form-input no-spinner"
                inputProps={{
                  inputMode: "decimal", // numeric keypad for mobile
                  pattern: "[0-9]*\\.?[0-9]*", // digits with optional decimal
                  min: 0, // minimum value
                }}
              />
            ) : (
              <span></span>
            )}
          </td>

          {/* 2023-24 */}
          <td>
            {section.key ? (
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="text" // prevents browser spinners
                name={`${section.key}_2023`}
                value={formData[`${section.key}_2023`] || ""}
                onChange={(e) => {
                  let val = e.target.value;

                  // Allow only digits and a single decimal point
                  val = val.replace(/[^0-9.]/g, "");
                  const parts = val.split(".");
                  if (parts.length > 2) {
                    val = parts[0] + "." + parts.slice(1).join("");
                  }

                  handleChange(`${section.key}_2023`, val);
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
                className="form-input no-spinner"
                inputProps={{
                  inputMode: "decimal", // numeric keypad for mobile
                  pattern: "[0-9]*\\.?[0-9]*", // digits with optional decimal
                  min: 0, // minimum value
                }}
              />
            ) : (
              <span></span>
            )}
          </td>
        </tr>
      );
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
                Organisation Name
                {/* <span aria-hidden="true" className="text-red">*</span> */}
              </label>
              <input
                id="Organisationname"
                name="Organisationname"
                type="text"
                maxLength={FIELD_MAX_LENGTH}
                value={formData.Organisationname}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                // disabled={true}
                aria-describedby="Organisationname-error"
                className={`form-input ${!formData.Organisationname && currentStep === 1
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
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                aria-describedby="mailingAddress-error"
                placeholder="Enter postal address"
                className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1
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
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    aria-describedby="authorityName-error"
                    placeholder="Name"
                    className={`form-input ${!formData.authorityName && currentStep === 2
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
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    aria-describedby="authorityTitle-error"
                    placeholder="Designation"
                    className={`form-input ${!formData.authorityTitle && currentStep === 2
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
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    // onBlur={(e) => handleBlur('authorityLandline', e.target.value)}
                    className={`form-input ${!formData.authorityLandline && currentStep === 2
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
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
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
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    aria-describedby="authorityEmail-error"
                    placeholder="Approving authority's email"
                    className={`form-input ${!formData.authorityEmail && currentStep === 2
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
                      // checked={copyApplicantData}
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
                    onChange={(e) =>
                      handleChange("contact_name", e.target.value)
                    }
                    placeholder="Contact name"
                    disabled={copyApplicantData}
                    className={`form-input ${!formData.contact_name && currentStep === 2
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
                    onChange={(e) =>
                      handleChange("contact_phone", e.target.value)
                    }
                    aria-describedby="contact_phone-error"
                    disabled={copyApplicantData}
                    placeholder="10-digit phone number"
                    className={`form-input ${!formData.contact_phone && currentStep === 2
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
                    onChange={(e) =>
                      handleChange("contact_email", e.target.value)
                    }
                    placeholder="Contact email"
                    disabled={copyApplicantData}
                    className={`form-input ${fieldErrors.contact_email ? "has-error" : ""
                      }`}
                    aria-describedby="contact_email-error"
                  />
                </div>
              </section>
            </div>
            <div className="form-group">
              <label htmlFor="companyProfile">
                Brief write up on Petroleum Products pipeline transportation
                activities. (Length, Capacity must be provided for each product
                category separately besides other operations){" "}
              </label>
              <p className="note">(within 300 words)</p>
              <textarea
                id="companyProfile"
                name="companyProfile"
                value={formData.companyProfile}
                rows={6}
                // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-textarea"
                placeholder="Enter company profile"
                aria-describedby="companyProfile-error"
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
          <>
            <h3 className="step-title">
              Step 3: Quantitative Information Part 1
            </h3>
            <div className="quantitative-form">
              {data.filter(
                (section) =>
                  parseFloat(section.num) >= 1 && parseFloat(section.num) <= 4.4
              ).length > 0 && (
                  <table className="quant-table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Particulars</th>
                        <th></th>
                        <th></th>
                        <th>2024-25</th>
                        <th>2023-24</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .filter(
                          (section) =>
                            parseFloat(section.num) >= 1 &&
                            parseFloat(section.num) <= 4.4
                        )
                        .map((section) => renderSection(section))}
                    </tbody>
                  </table>
                )}
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <h3 className="step-title">
              Step 4: Quantitative Information Part 2
            </h3>
            <div className="quantitative-form">
              {data.filter(
                (section) =>
                  parseFloat(section.num) >= 5 && parseFloat(section.num) <= 8.5
              ).length > 0 && (
                  <>
                    {/* Two-year table */}
                    <table className="quant-table">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Particulars</th>
                          <th></th>
                          <th></th>
                          <th>2024-25</th>
                          <th>2023-24</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .filter(
                            (section) =>
                              parseFloat(section.num) >= 5 &&
                              parseFloat(section.num) <= 8.5
                          )
                          .map((section) => renderSection(section))}
                      </tbody>
                    </table>

                    {/* Comments */}
                    <div className="form-group">
                      <label htmlFor="comment">Comments</label>
                      <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                        className="form-textarea"
                        placeholder="Comments in (200 words) against input parameter, if any"
                        rows={4}
                      />
                      {fieldErrors.comment && (
                        <span
                          className="error-tooltip"
                          id="comment-error"
                          role="alert"
                        >
                          {fieldErrors.comment}
                        </span>
                      )}
                    </div>
                  </>
                )}
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
                    <th>S.No</th>
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
                            className="form-input mt-4"
                            aria-describedby={`${key}-file-error`}
                          />
                          {attachment.file && (
                            <p className="file-name">
                              Selected file: {attachment.file.name}
                            </p>
                          )}
                          {fieldErrors[`${key}.file`] && (
                            <span
                              className="error-tooltip"
                              id={`${key}-file-error`}
                              role="alert"
                            >
                              {fieldErrors[`${key}.file`]}
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
              <label>
                <input
                  id="declaration"
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.checked)
                  }
                  className={`form-checkbox ${fieldErrors.declaration ? "has-error" : ""
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
            <button onClick={() => navigate('/fipiawards#Award%20Categories')}>
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
                  disabled={isSubmited()}
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
                  disabled={isSubmited()}
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
                    type="button"
                    className="btn btn-success"
                    disabled={isSubmited()}
                    onClick={(e) => {
                      if (!formData.declaration) {
                        return alert("Please accept the declaration before submitting.");
                      }
                      if (!formData.approvingAuthoritySignature) {
                        return alert("Please upload the approving authority signature file.");
                      }
                      if (!window.confirm("Are you sure you want to submit?")) {
                        e.preventDefault();

                        setIsSubmitted(true);
                      }


                      handleSubmit(e, "submit");
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

export default RegistrationPipeline;