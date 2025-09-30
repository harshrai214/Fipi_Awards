import React, { useState, useEffect, useCallback } from 'react';
// import apiClient from '../api/axiosClient';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/Form.css';
import TextField from "@mui/material/TextField";
import SidebarGuideline from "./SidebarGuideline"
import { alignContent } from '@mui/system';

// Constants for max lengths
const FIELD_MAX_LENGTH = 100;
const COMPANY_PROFILE_MAX_LENGTH = 300;
const COMMENT_MAX_LENGTH = 200;
const TEXTAREA_MAX_LENGTH = 300;
const PHONE_MAX_LENGTH = 10;

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const RegistrationGNZ = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [fieldErrors, setFieldErrors] = useState({});
    const [activeItem, setActiveItem] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'Goal Net Zero Company of the Year',
        companyName: '',
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
        // Variables
        netZeroTarget2024: "",
        netZeroTarget2023: "",
        carbonEmitted2024: "",
        carbonEmitted2023: "",
        energyConsumed2024: "",
        energyConsumed2023: "",
        annualRevenue2024: "",
        annualRevenue2023: "",
        capexWind2024: "",
        capexWind2023: "",
        capexSolar2024: "",
        capexSolar2023: "",
        capexOtherRE2024: "",
        capexOtherRE2023: "",
        rePowerProd2024: "",
        rePowerProd2023: "",
        powerConsumed2024: "",
        powerConsumed2023: "",
        gh2Investment2024: "",
        gh2Investment2023: "",
        gh2Production2024: "",
        gh2Production2023: "",
        treePlantation2024: "",
        treePlantation2023: "",
        carbonCapture2024: "",
        carbonCapture2023: "",
        ccsCapex2024: "",
        ccsCapex2023: "",
        carbonCaptured2024: "",
        carbonCaptured2023: "",
        // Attachments
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
        // Individual technology variables (5 rows)
        activityName1: '',
        plannedActivities1: '',
        actualProgress1: '',
        activityName2: '',
        plannedActivities2: '',
        actualProgress2: '',
        activityName3: '',
        plannedActivities3: '',
        actualProgress3: '',
        activityName4: '',
        plannedActivities4: '',
        actualProgress4: '',
        activityName5: '',
        plannedActivities5: '',
        actualProgress5: '',
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
       const prefillRaw = sessionStorage.getItem('registrationGNZ_prefill');
       if (prefillRaw) {
         const prefill = JSON.parse(prefillRaw);
         if (prefill && typeof prefill === 'object') {
           setFormData((prev) => ({ ...prev, ...prefill }));
           if (prefill.step) setCurrentStep(Number(prefill.step));
         }
         // remove after consuming so it doesn't override later edits
         sessionStorage.removeItem('registrationGNZ_prefill');
       }
     } catch (err) {
       // ignore parse errors
     }
 
     // Note: we avoid loading large File objects here — the draft loader below (in another effect) may populate non-file fields.
   }, []);



    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    const location = useLocation();
    console.log('RegistrationExploration rendered, location.state:', location.state); // Debug log
    const awardTitle = location.state?.awardTitle || "Goal Net Zero Company of the Year";


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
          const draftRaw = localStorage.getItem('registrationGNZDraft');
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let applicableMaxLength = FIELD_MAX_LENGTH;
        if ([1, 2, 3, 4].includes(currentStep)) {
            let applicableMaxLength = FIELD_MAX_LENGTH;
            if (name === 'companyProfile') applicableMaxLength = COMPANY_PROFILE_MAX_LENGTH;
            else if (name === 'comment') applicableMaxLength = COMMENT_MAX_LENGTH;
            else if (['activityName1', 'activityName2', 'activityName3', 'activityName4', 'activityName5', 'plannedActivities1', 'plannedActivities2', 'plannedActivities3', 'plannedActivities4', 'plannedActivities5', 'actualProgress1', 'actualProgress2', 'actualProgress3', 'actualProgress4', 'actualProgress5'].includes(name)) {
                applicableMaxLength = 50;
            }

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


                else if (name === 'activityName1') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed ");
                        return;
                    }
                }
                else if (name === 'activityName2') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed");
                        return;
                    }
                }
                else if (name === 'activityName3') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed");
                        return;
                    }
                }
                else if (name === 'activityName4') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed ");
                        return;
                    }
                }
                else if (name === 'activityName5') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed");
                        return;
                    }
                }
                else if (name === 'plannedActivities1') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed");
                        return;
                    }
                }
                else if (name === 'plannedActivities2') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed");
                        return;
                    }
                }
                else if (name === 'plannedActivities3') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed");
                        return;
                    }
                }
                else if (name === 'plannedActivities4') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed");
                        return;
                    }
                }
                else if (name === 'plannedActivities5') {
                    const wordCount = value.trim().split(/\s+/).length;
                    if (wordCount > 50) {
                        alert("Maximum 50 words are allowed");
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
        if (['Organisationname', 'authorityName', 'contact_name'].includes(name)) {
            const isValid = /^[A-Za-z\s]*$/.test(value);
            if (!isValid && value !== '') {
                alert('Only letters and spaces are allowed.');
                return;
            }
        }

        // Phone validation
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
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === 'Organisationname' && value && currentStep === 1) setError('');
        if (name === 'mailingAddress' && value.trim() && currentStep === 1) setError('');
        if (name === 'authorityName' && value && currentStep === 2) setError('');
        if (name === 'authorityEmail' && value && currentStep === 2) setError('');
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
            const maxSizeInBytes = 5 * 1024 * 1024;

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

        setFormData((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: value,
            },
        }));
    };

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
        }
    };

    const nextStep = () => {
        if (currentStep === 1) {
            if (!formData.Organisationname) {
                alert('Organisation name is required.');
                return;
            }
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
                alert('Authority Designation is required.');
                return;
            }
            if (!formData.authorityEmail || !emailRegex.test(formData.authorityEmail)) {
                alert('Please enter a valid Authority email.');
                return;
            }
            // if (!formData.authorityPhone || !phoneRegex.test(formData.authorityPhone)) {
            //     alert('Authority phone must be exactly 10 digits.');
            //     return;
            // }
            if (!formData.authorityLandline) {
                alert('Authority Landline is required.');
                return;
            }
            if (!formData.contact_name) {
                alert('contact name is required.');
                return;
            }
            if (formData.contact_email && !emailRegex.test(formData.contact_email)) {
                alert('Please enter a valid Contact email.');
                return;
            }
            if (formData.contact_phone && !phoneRegex.test(formData.contact_phone) && !copyApplicantData) {
                alert('Contact phone must be exactly 10 digits.');
                return;
            }
            if (!formData.companyProfile) {
                alert('Company Profile is required.');
                return;
            }
        }
        if (hasEmptyFieldsInCurrentStep(currentStep)) {
            if (!window.confirm('Data not entered, If you wish to continue?')) {
                return;
            }
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
      localStorage.setItem('registrationGNZDraft', JSON.stringify(draftToStore));
      alert('Draft Saved!');
    } catch (err) {
      console.warn('Failed to save draft to localStorage', err);
      alert('Could not save draft locally.');
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.Organisationname?.trim()) {
            alert("Organisation name is required");
            return;
        }
        if (!formData.mailingAddress?.trim()) {
            alert("Mailing address is required");
            return;
        }
        if (!formData.authorityName?.trim()) {
            alert("Authority name is required");
            return;
        }
        if (!(formData.approvingAuthoritySignature instanceof File)) {
            alert("Please upload the Approving Authority Signature file");
            return;
        }
        if (!formData.declaration) {
            alert("Please accept the declaration before submitting.");
            return;
        }

        try {
            const fd = new FormData();

            // 1️⃣ Basic fields
            fd.append("organisation_name", formData.Organisationname);
            fd.append("category", formData.category);
            fd.append("company_name", formData.companyName);
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

            // 2️⃣ File upload
            fd.append("approving_authority_file", formData.approvingAuthoritySignature);

            // 3️⃣ Quantitative fields (snake_case + year)
            const quantitative = [
                "netZeroTarget", "carbonEmitted", "energyConsumed", "annualRevenue",
                "capexWind", "capexSolar", "capexOtherRE", "rePowerProd", "powerConsumed",
                "gh2Investment", "gh2Production", "treePlantation", "carbonCapture",
                "ccsCapex", "carbonCaptured"
            ];
            quantitative.forEach(base => {
                const snake = base.replace(/([A-Z])/g, "_$1").toLowerCase();
                fd.append(`${snake}_2024`, formData[`${base}2024`] || "");
                fd.append(`${snake}_2023`, formData[`${base}2023`] || "");
            });

            // 4️⃣ Activities (direct fields in the model)
            for (let i = 1; i <= 5; i++) {
                fd.append(`activityName${i}`, formData[`activityName${i}`] || "");
                fd.append(`plannedActivities${i}`, formData[`plannedActivities${i}`] || "");
                fd.append(`actualProgress${i}`, formData[`actualProgress${i}`] || "");
            }

            // 5️⃣ Attachments
            for (let i = 1; i <= 4; i++) {
                const att = formData[`attachments${i}`] || {};
                fd.append(`attachments${i}_desc`, att.description || "");
                if (att.file instanceof File) {
                    fd.append(`attachments${i}`, att.file);
                }
            }

            // 6️⃣ Technologies JSON (optional if you still want related table entries)
            const technologies = [];
            for (let i = 1; i <= 5; i++) {
                const name = formData[`activityName${i}`];
                const plan = formData[`plannedActivities${i}`];
                const progress = formData[`actualProgress${i}`];
                if (name || plan || progress) {
                    technologies.push({
                        activity_name: name,
                        planned_activities: plan,
                        actual_progress: progress
                    });
                }
            }
            fd.append("technologies", JSON.stringify(technologies));

            // // 7️⃣ Submit to API
            // await apiClient.post("/goal-net-zero/", fd, {
            //   headers: { "Content-Type": "multipart/form-data" }
            // });


            try {
        localStorage.removeItem('registrationGNZDraft');
      } catch (err) {
        // ignore
      }
            alert("Submitted successfully!");
            setIsSubmitted(true);
            console.log("Goal Net Zero registration submitted");
        } catch (err) {
            console.error("Submission error:", err.response || err);
            const msg =
                err.response?.data?.detail ||
                JSON.stringify(err.response?.data) ||
                err.message;
            alert("Submission failed: " + msg);
        }
    };




    // Helper function
    function toSnake(str) {
        return str.replace(/([A-Z])/g, "_$1").toLowerCase();
    }

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
      <p><strong>Brief write up on company’s profile:</strong> ${formData.companyProfile || ''}</p>

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
          ${part1.map(({ num, title, key2024, key2023 }) => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${num}</td>
              <td style="border: 1px solid #000; padding: 8px;">${title}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[key2024] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[key2023] || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>New Technologies Adopted</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px;">S.No</th>
            <th style="border: 1px solid #000; padding: 8px;">Activity Name</th>
            <th style="border: 1px solid #000; padding: 8px;">Planned Activities</th>
            <th style="border: 1px solid #000; padding: 8px;">Actual Progress</th>
          </tr>
        </thead>
        <tbody>
          ${[1, 2, 3, 4, 5].map(i => `
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">${i}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`activityName${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`plannedActivities${i}`] || ''}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formData[`actualProgress${i}`] || ''}</td>
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

        const printWindow = window.open('', '_blank', 'height=600,width=800');
        printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${awardTitle || 'Form Print'}</title>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);
        printWindow.document.close();
        printWindow.print();
    };

    const part1 = [
        { num: 1, title: 'Net Zero (Scope – I & II) – Target Year', key2024: "netZeroTarget2024" },
        { num: 2, title: 'Total Carbon Emitted (Scope – I & II) (tCO2e) ', key2024: 'carbonEmitted2024', key2023: 'carbonEmitted2023' },
        { num: 3, title: 'Total Energy Consumed (GJ)', key2024: 'energyConsumed2024', key2023: 'energyConsumed2023' },
        { num: 4, title: 'Annual Revenue (INR Crores)', key2024: 'annualRevenue2024', key2023: 'annualRevenue2023' },
        { num: 5, title: 'Capex for Wind Energy Generation (INR Crores)', key2024: 'capexWind2024', key2023: 'capexWind2023' },
        { num: 6, title: 'Capex for Solar Energy Generation (INR Crores) ', key2024: 'capexSolar2024', key2023: 'capexSolar2023' },
        { num: 7, title: 'Capex for Other RE Generation (INR Crores) ', key2024: 'capexOtherRE2024', key2023: 'capexOtherRE2023' },
        { num: 8, title: 'Total Renewable Energy Power Production (MW) ', key2024: 'rePowerProd2024', key2023: 'rePowerProd2023' },
        { num: 9, title: 'Total Power Consumption (MW)', key2024: 'powerConsumed2024', key2023: 'powerConsumed2023' },
        { num: 10, title: 'Investment for GH2 production/Transportation/Distribution/Storage (INR Crores) ', key2024: 'gh2Investment2024', key2023: 'gh2Investment2023' },
        { num: 11, title: 'GH2 Production (MT)', key2024: 'gh2Production2024', key2023: 'gh2Production2023' },
        { num: 12, title: 'Tree Plantation (Nos.)', key2024: 'treePlantation2024', key2023: 'treePlantation2023' },
        { num: 13, title: 'Initiatives/ Project undertaken for Carbon Capture ', },
        { num: '13.1', title: 'Capex (INR Crore) for CCS/CCUS Projects ', key2024: 'ccsCapex2024', key2023: 'ccsCapex2023' },
        { num: '13.2', title: 'Carbon Captured (MT)', key2024: 'carbonCaptured2024', key2023: 'carbonCaptured2023' },
    ];

    const hasEmptyFieldsInCurrentStep = (step) => {
        if (step === 3) {
            // Skip num 1 row
            const step3Sections = part1.filter(
                section => section.num >= 1 && section.num <= 9 && section.num !== 1
            );
            for (const section of step3Sections) {
                if (
                    (section.key2024 && (!formData[section.key2024] && formData[section.key2024] !== 0)) ||
                    (section.key2023 && (!formData[section.key2023] && formData[section.key2023] !== 0))
                ) {
                    return true;
                }
            }
        }

        if (step === 4) {
            // Skip num 13 row
            const step4Sections = part1.filter(
                section => section.num >= 10 && section.num <= 15 && section.num !== 13
            );
            for (const section of step4Sections) {
                if (
                    (section.key2024 && (!formData[section.key2024] && formData[section.key2024] !== 0)) ||
                    (section.key2023 && (!formData[section.key2023] && formData[section.key2023] !== 0))
                ) {
                    return true;
                }
            }

            // Check all activities inputs
            for (let i = 1; i <= 5; i++) {
                const fields = [
                    `activityName${i}`,
                    `plannedActivities${i}`,
                    `actualProgress${i}`,
                ];
                for (const f of fields) {
                    if (!formData[f] && formData[f] !== 0) {
                        return true;
                    }
                }
            }

            // Comment check
            if (!formData.comment || formData.comment.trim() === '') {
                return true;
            }
        }

        return false;
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
                            <label>Organisation Name
                                {/* <span className="text-red">*</span> */}
                            </label>
                            <input
                                type="text"
                                name="Organisationname"
                                maxLength={FIELD_MAX_LENGTH}
                                value={formData.Organisationname}
                                onChange={handleChange}
                                // disabled={true}
                                // onChange={(e) => handleChange(e)}
                                className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
                            />
                            {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Postal Address <span className="text-red">*</span></label>
                            <textarea
                                name="mailingAddress"
                                maxLength={FIELD_MAX_LENGTH}
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
                        <h3 className="step-title">Step 2: Approving Authority & Contact</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="step-section">
                                <h4>Approving Authority</h4>
                                <p className="note">Approving authority should be concerned  Director /Board level executive. </p>
                                <div className="form-group">
                                    <label>Name <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="authorityName"
                                        maxLength={FIELD_MAX_LENGTH}
                                        value={formData.authorityName}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Name"
                                    />
                                    {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Name is required</span>}
                                </div>

                                <div className="form-group">
                                    <label>Designation:
                                        <span className="text-red" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="authorityTitle"
                                        maxLength={FIELD_MAX_LENGTH}
                                        value={formData.authorityTitle}
                                        onChange={handleChange}
                                        className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Designation"
                                    />
                                    {!formData.authorityTitle && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
                                </div>


                                <div className="form-group">
                                    <label htmlFor="authorityPhone">
                                        Landline:{" "}
                                        <span className="text-red" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="authorityLandline"
                                        type="number"
                                        name="authorityLandline"
                                        value={formData.authorityLandline}
                                        onChange={handleChange}
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
                                    <label>Email <span className="text-red">*</span></label>
                                    <input
                                        type="email"
                                        name="authorityEmail"
                                        maxLength={FIELD_MAX_LENGTH}
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
                                        className={`form-input ${fieldErrors.contact_email ? "has-error" : ""}`}
                                        aria-describedby="contact_email-error"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Brief write up on company’s profile </label>
                            <p className="note">(within 300 words)</p>
                            <textarea
                                name="companyProfile"
                                // maxLength={COMPANY_PROFILE_MAX_LENGTH}
                                value={formData.companyProfile}
                                onChange={handleChange}
                                className="form-textarea"
                                rows={8}
                            />



                        </div>
                    </div>
                )}
                {currentStep === 3 && (
                    <div>
                        <h3 className="step-title">Step 3: Quantitative Information -Part 1</h3>
                        <table className="quant-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Particulars</th>
                                    <th colSpan="2" style={{ alignItems: "center", }}>Target Year</th>

                                </tr>
                                {part1.slice(0, 1).map(item => (
                                    <tr>
                                        <td>1</td>
                                        <td>Net Zero (Scope – I & II) – Target Year</td>
                                        <td colSpan="2">
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                type="text" // keep text so browser spinners don't show
                                                name={item.key2024}
                                                value={formData[item.key2024] || ""}
                                                onChange={(e) => {
                                                    let val = e.target.value;

                                                    // ✅ allow only digits and one decimal point
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
                                                    // block invalid characters and arrows
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
                                                    inputMode: "decimal", // numeric keypad on mobile
                                                    pattern: "[0-9]*\\.?[0-9]*", // regex for digits with optional decimal
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </thead>

                            <thead>

                                <tr>
                                    <th>S.No</th>
                                    <th>Particulars</th>
                                    <th>2024-25</th>
                                    <th>2023-24</th>
                                </tr>
                            </thead>
                            <tbody>
                                {part1.slice(1, 9).map(item => (
                                    <tr key={item.num}
                                        style={{ fontWeight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(Number(item.num)) ? "bold" : "normal" }}>
                                        <td className="sno-cell">{item.num}</td>
                                        <td className="label-cell">{item.title}</td>
                                        <td>

                                            {['1'].includes(item.num) ? (
                                                <span>{item.key2024}</span>
                                            ) : item.key2024 ? (
                                                // <input
                                                //     type="text"
                                                //     name={item.key2024}
                                                //     value={formData[item.key2024] || ''}
                                                //     onChange={(e) => {
                                                //         // Allow only digits
                                                //         if (/^\d*$/.test(e.target.value)) {
                                                //             handleChange(e);
                                                //         }
                                                //     }}

                                                //     className="form-input"
                                                //     min="0"
                                                //     onKeyDown={e => {
                                                //         if (['-', 'e', 'E'].includes(e.key)) {
                                                //             e.preventDefault();
                                                //         }
                                                //     }}
                                                // />
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    type="text" // use text to prevent browser spinners
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
                                                    onWheel={(e) => e.target.blur()} // disable mouse scroll increment
                                                    className="form-input"
                                                    inputProps={{
                                                        inputMode: "decimal", // mobile numeric keypad
                                                        pattern: "[0-9]*\\.?[0-9]*", // digits + optional decimal
                                                    }}
                                                />
                                            ) : null}
                                        </td>
                                        <td>
                                            {['1'].includes(item.num) ? (
                                                <span>{item.key2023}</span>
                                            ) : item.key2023 ? (
                                                // <input
                                                //     type="text"
                                                //     name={item.key2023}
                                                //     value={formData[item.key2023] || ''}
                                                //     onChange={(e) => {
                                                //         // Allow only digits
                                                //         if (/^\d*$/.test(e.target.value)) {
                                                //             handleChange(e);
                                                //         }
                                                //     }}

                                                //     className="form-input"
                                                //     min="0"
                                                //     onKeyDown={e => {
                                                //         if (['-', 'e', 'E'].includes(e.key)) {
                                                //             e.preventDefault();
                                                //         }
                                                //     }}
                                                // />
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    type="text" // prevents browser spinners
                                                    name={item.key2023}
                                                    value={formData[item.key2023] || ""}
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
                                                    onWheel={(e) => e.target.blur()} // prevent mouse scroll increment
                                                    className="form-input"
                                                    inputProps={{
                                                        inputMode: "decimal", // numeric keypad on mobile
                                                        pattern: "[0-9]*\\.?[0-9]*", // digits with optional decimal
                                                    }}
                                                />
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


                {currentStep === 4 && (
                    <div>
                        <h3 className="step-title">Step 4: Quantitative Information -Part 2</h3>
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
                                {part1.slice(9, 15).map(item => (
                                    <tr key={item.num}
                                        style={{ fontWeight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(Number(item.num)) ? "bold" : "normal" }}>
                                        <td className="sno-cell">{item.num}</td>
                                        <td className="label-cell">{item.title}</td>
                                        <td>
                                            {['13'].includes(item.num) ? (
                                                <span>{item.key2024}</span>
                                            ) : item.key2024 ? (
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    type="text" 
                                                    name={item.key2024}
                                                    value={formData[item.key2024] || ""}
                                                    onChange={(e) => {
                                                        let val = e.target.value;

                                                        
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
                                                        inputMode: "decimal", // numeric keypad on mobile
                                                        pattern: "[0-9]*\\.?[0-9]*", // digits with optional decimal
                                                    }}
                                                />
                                            ) : null}
                                        </td>
                                        <td>


                                            {['13'].includes(item.num) ? (
                                                <span>{item.key2023}</span>
                                            ) : item.key2023 ? (
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    type="text" // prevents browser spinners
                                                    name={item.key2023}
                                                    value={formData[item.key2023] || ""}
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
                                                    onWheel={(e) => e.target.blur()} // prevent mouse scroll increment
                                                    className="form-input"
                                                    inputProps={{
                                                        inputMode: "decimal", // numeric keypad on mobile
                                                        pattern: "[0-9]*\\.?[0-9]*", // digits with optional decimal
                                                    }}
                                                />
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Activities Table */}
                        <table className="quant-table">

                            <thead>
                                <th></th>
                                <th>Major activities planned as per Net Zero Target for 2024-25 (Max. top 5 Activities) (50 words each against each cell)</th>
                                <th></th>
                                <th></th>

                            </thead>
                        </table>
                        <table className="quant-table" >
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Activity Name</th>
                                    <th>Planned Activities</th>
                                    <th>Actual Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <tr key={i}>
                                        <td className="sno-cell">{i}</td>
                                        <td>
                                            <input
                                                type="text"
                                                name={`activityName${i}`}
                                                // maxLength={TEXTAREA_MAX_LENGTH}
                                                value={formData[`activityName${i}`] || ''}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name={`plannedActivities${i}`}
                                                // maxLength={TEXTAREA_MAX_LENGTH}
                                                value={formData[`plannedActivities${i}`] || ''}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name={`actualProgress${i}`}
                                                maxLength={TEXTAREA_MAX_LENGTH}
                                                value={formData[`actualProgress${i}`] || ''}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Comments Section */}
                        <div className="step-section" style={{ marginTop: '20px' }}>
                            <div className="form-group">
                                <label htmlFor="comment">Comments</label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    // maxLength={COMMENT_MAX_LENGTH}
                                    value={formData.comment || ''}
                                    onChange={handleChange}

                                    className="form-textarea"
                                    placeholder="Comments in (200 words) against input parameter, if any"
                                    rows={4}
                                />
                                {fieldErrors.comment && (
                                    <span className="error-tooltip" id="comment-error" role="alert">
                                        {fieldErrors.comment}
                                    </span>
                                )}
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
                                                        maxLength={FIELD_MAX_LENGTH}
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
                            <label>Print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
                            <div className="form-navigation">
                                <button type="button" onClick={handlePrint} className="btn btn-outline">
                                    Print Preview
                                </button>
                            </div>
                        </div>



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
                    </div>
                )}
            </div>
        )
    }
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

export default RegistrationGNZ;