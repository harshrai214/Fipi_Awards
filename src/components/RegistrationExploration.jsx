// src/components/RegistrationExploration.jsx

import React, { useState } from "react";
import { ACTIVE_API_BASE_URL } from "../config/apiConfig"
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/RegistrationExploration.css";
// import AttachmentList from './AttachmentList';

const initialTechnology = {
  technology_name: "",
  technology_provider: "",
  cost: "",
  areas_of_impact: "",
  remarks: "",
};

const explorationFields = [
  { num: "1", label: "2P Oil reserves accretion (MMT)", key: "oil_reserves" },
  { num: "2", label: "2P Gas reserves accretion (BCM)", key: "gas_reserves" },
  { num: "3", label: "Total Reserves Accreted (MTOE)", key: "total_reserves" },
  { num: "4", label: "Finding Cost (INR Million)", key: "finding_cost" },
  {
    num: "5",
    label: "Total Number of exploratory wells drilled",
    key: "exploratory_wells",
  },
  {
    num: "6",
    label: "Number of Hydrocarbon Bearing wells",
    key: "hydrocarbon_wells",
  },
  {
    num: "7.1",
    label: "Total Seismic Activity - 2D LKM",
    key: "seismic_activity_2d",
  },
  {
    num: "7.2",
    label: "Total Seismic Activity - 3D SKM",
    key: "seismic_activity_3d",
  },
  {
    num: "8",
    label: "Total Energy Consumed (GJ) in Exploration",
    key: "energy_exploration",
  },
  {
    num: "8.1",
    label: "Total Energy Consumed by the Company (GJ)",
    key: "energy_company",
  },
  {
    num: "8.2",
    label: "Total Capex of the Company (INR Crores)",
    key: "capex_company",
  },
  {
    num: "8.3",
    label: "Total Opex of the Company (INR Crores)",
    key: "opex_company",
  },
  {
    num: "8.4",
    label: "Capex for Exploration (INR Crores)",
    key: "capex_exploration",
  },
  {
    num: "8.5",
    label: "Opex for Exploration (INR Crores)",
    key: "opex_exploration",
  },
  {
    num: "9",
    label: "Number of Exploratory Blocks acquired through Partnership",
    key: "blocks_partnership",
  },
  {
    num: "9.1",
    label: "Number of Exploratory Blocks acquired Standalone",
    key: "blocks_standalone",
  },
];

export default function RegistrationExploration() {
  const navigate = useNavigate();
  const location = useLocation();
  const awardTitle =
    location.state?.awardTitle || "Oil & Gas Exploration Company of the Year";

  const [formData, setFormData] = useState({
    // Step 1
    organisation_name: "",
    category: "Exploration Company of the Year",
    mailing_address: "",

    // Applicant
    firstname: "",
    lastname: "",
    userid: "",
    company_name: "",

    // Authority
    authority_name: "",
    authority_title: "",
    authority_phone: "",
    authority_email: "",
    approving_authority_file: null,

    // Contact
    contact_name: "",
    contact_phone: "",
    contact_email: "",

    // Company Profile
    company_profile: "",

    // quantitative fields for 2024 & 2023
    ...explorationFields.reduce(
      (acc, { key }) => ({
        ...acc,
        [`${key}2024`]: "",
        [`${key}2023`]: "",
      }),
      {}
    ),
    // technologies
    technologies: Array(5).fill({ ...initialTechnology }),

    // attachments (if used)
    attachments1: { description: "", file: null },
    attachments2: { description: "", file: null },
    attachments3: { description: "", file: null },
    attachments4: { description: "", file: null },

    // final signed form
    signed_form_file: null,

    // comments & declaration
    comment: "",
    declaration: false,

    // errors & fileError
    errors: {},
    fileError: "",
  });

  const handleAttachmentChange = (key, field, value) => {
    if (field === 'file' && value) {
      const file = value;
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

      let errorMsg = '';

      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        errorMsg = 'Only JPG, PNG, and PDF files are allowed for attachments.';
      } else if (file.size > maxSizeInBytes) {
        errorMsg = 'File size must not exceed 5 MB for attachments.';
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTechChange = (i, field, val) => {
    setFormData((f) => {
      const techs = [...f.technologies];
      techs[i] = { ...techs[i], [field]: val };
      return { ...f, technologies: techs };
    });
  };

  // handles file inputs by field name
  const handleFile = (e, fieldName) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setFormData((f) => ({ ...f, fileError: "Max file size 5 MB" }));
    } else {
      setFormData((f) => ({ ...f, [fieldName]: file, fileError: "" }));
    }
  };

  const [step, setStep] = useState(1);



  const next = () => {
    let newErrors = {};

    if (step === 1 && !formData.organisation_name) {
      newErrors.organisation_name = 'Organisation name is required.';
    }

    if (step === 1 && !formData.mailing_address?.trim()) {
      newErrors.mailing_address = 'Mailing address is required.';
    }

    if (step === 2 && !formData.authority_name) {
      newErrors.authority_name = 'Authority name is required.';
    }

    if (step === 2 && !formData.authority_title) {
      newErrors.authority_title = 'Authority designation is required.';
    }
    if (step === 2 && !formData.authority_email) {
      newErrors.authority_email = 'Authority email is required.';
    }
    if (step === 2 && !formData.authority_phone) {
      newErrors.authority_phone = 'Authority phone is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormData((prev) => ({
        ...prev,
        errors: newErrors,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      errors: {},
    }));

    setStep((s) => Math.min(5, s + 1));
  };


  const prev = () => setStep((s) => Math.max(1, s - 1));

  const saveDraft = () => {
    localStorage.setItem("registrationDraft", JSON.stringify(formData));
    alert("Draft saved");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 5 && !formData.declaration) {
      alert("Please accept the declaration before submitting.");
      return;
    }


    const fd = new FormData();

    // map your frontend keys to backend keys if needed
    const keyMapping = {
      // oil_reserves2024: 'oilReserves2024',
      // /* …other mappings… */
      // blocks_standalone2023: 'blocksStandalone2023'

      oil_reserves2024: "oilReserves2024",
      oil_reserves2023: "oilReserves2023",
      gas_reserves2024: "gasReserves2024",
      gas_reserves2023: "gasReserves2023",
      total_reserves2024: "totalReserves2024",
      total_reserves2023: "totalReserves2023",
      finding_cost2024: "findingCost2024",
      finding_cost2023: "findingCost2023",
      exploratory_wells2024: "exploratoryWells2024",
      exploratory_wells2023: "exploratoryWells2023",
      hydrocarbon_wells2024: "hydrocarbonWells2024",
      hydrocarbon_wells2023: "hydrocarbonWells2023",
      seismic_activity_2d2024: "seismicActivity2D2024",
      seismic_activity_2d2023: "seismicActivity2D2023",
      seismic_activity_3d2024: "seismicActivity3D2024",
      seismic_activity_3d2023: "seismicActivity3D2023",
      energy_exploration2024: "energyExploration2024",
      energy_exploration2023: "energyExploration2023",
      energy_company2024: "energyCompany2024",
      energy_company2023: "energyCompany2023",
      capex_company2024: "capexCompany2024",
      capex_company2023: "capexCompany2023",
      opex_company2024: "opexCompany2024",
      opex_company2023: "opexCompany2023",
      capex_exploration2024: "capexExploration2024",
      capex_exploration2023: "capexExploration2023",
      opex_exploration2024: "opexExploration2024",
      opex_exploration2023: "opexExploration2023",
      blocks_partnership2024: "blocksPartnership2024",
      blocks_partnership2023: "blocksPartnership2023",
      blocks_standalone2024: "blocksStandalone2024",
      blocks_standalone2023: "blocksStandalone2023",
    };

    Object.entries(formData).forEach(([k, v]) => {
      const backendKey = keyMapping[k] || k;

      // special‐case attachments1…4
      if (k.startsWith("attachments")) {
        // v = { description, file }
        if (v.file instanceof File) {
          fd.append(backendKey, v.file, v.file.name);
        }
        if (v.description) {
          fd.append(`${backendKey}_description`, v.description);
        }
        return;
      }

      // single-file fields
      if (v instanceof File) {
        fd.append(backendKey, v, v.name);
        return;
      }

      // primitives (string, number, boolean)
      if (typeof v !== "object" && v != null) {
        fd.append(backendKey, String(v));
      }
    });

    // technologies as JSON string
    fd.append("technologies", JSON.stringify(formData.technologies));

    // debug export
    for (let [key, value] of fd.entries()) {
      console.log(key, value);
    }

    try {
      const url = `${ACTIVE_API_BASE_URL}/registrations/`;
      const res = await fetch(url, {
        method: "POST",
        body: fd, // let browser set multipart/form-data header
      });
      const payload = await res.json();
      if (!res.ok) {
        console.error("API errors:", payload);
        return alert("Submission error—see console.");
      }
      alert("Submitted successfully!");
      navigate("/thank-you");
    } catch (err) {
      console.error("Network/CORS error", err);
      alert("Network error—see console.");
    }
  };

  // Render logic for each step (unchanged CSS class names)
  const renderStep = () => {
    const progress = ((step - 1) / 4) * 100;
    return (
      <>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>

        {step === 1 && (
          <div className="form-step">
            <h3 className="step-title">Step 1: Organization Details</h3>
            <div className="form-group">
              <label>
                Organisation Name<span className="text-red">*</span>
              </label>
              <input
                name="organisation_name"
                value={formData.organisation_name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className={`form-input ${formData.errors.organisation_name ? "has-error" : ""
                  }`}
              />
              {formData.errors.organisation_name && (
                <span className="error-tooltip">
                  {formData.errors.organisation_name}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>
                Select Category<span className="text-red">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
              >
                <option>Exploration Company of the Year</option>
                {/* …other options… */}
              </select>
            </div>
            <div className="form-group">
              <label>
                Postal Address<span className="text-red">*</span>
              </label>
              <textarea
                name="mailing_address"
                value={formData.mailing_address}
                onChange={handleChange}
                className={`form-textarea ${formData.errors.mailing_address ? "has-error" : ""
                  }`}
                rows={3}
              />
              {formData.errors.mailing_address && (
                <span className="error-tooltip">
                  {formData.errors.mailing_address}
                </span>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3 className="step-title">Step 2: Authority & Contact</h3>
            <div className="form-group">
              <label>
                Authority Name<span className="text-red">*</span>
              </label>
              <input
                name="authority_name"
                value={formData.authority_name}
                required
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className={`form-input ${formData.errors.authority_name ? "has-error" : ""}`}

              />
              {formData.errors.authority_name && (
                <span className="error-tooltip">
                  {formData.errors.authority_name}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input
                name="authority_title"
                value={formData.authority_title}
                required
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className={`form-input ${formData.errors.authority_title ? "has-error" : ""}`}
              />
              {formData.errors.authority_title && (
                <span className="error-tooltip">
                  {formData.errors.authority_title}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="authority_phone"
                value={formData.authority_phone}

                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className={`form-input ${formData.errors.authority_phone ? "has-error" : ""}`}
              />
              {formData.errors.authority_phone && (
                <span className="error-tooltip">
                  {formData.errors.authority_phone}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="authority_email"
                value={formData.authority_email}
                onChange={handleChange}
                className={`form-input ${formData.errors.authority_email ? "has-error" : ""}`}
              />
              {formData.errors.authority_email && (
                <span className="error-tooltip">
                  {formData.errors.authority_email}
                </span>
              )}
            </div>

            <div className="form-group">

              <label>
                <input
                  type="checkbox"
                  name="copy_applicant"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData((f) => ({
                        ...f,

                        contact_email: f.authority_email,
                        contact_phone: f.authority_phone,
                      }));
                    } else {
                      setFormData((f) => ({
                        ...f,

                        contact_email: "",
                        contact_phone: "",
                      }));
                    }
                  }}
                />{" "}
                Same as applicant
              </label>
            </div>
            <div className="form-group">
              <input
                placeholder="Contact Name"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Contact Phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className={`form-input ${formData.contactPhone && formData.contactPhone.length < 10 ? 'has-error' : ''
                  }`}
                disabled={formData.contact_phone}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Contact Email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="form-input"
                disabled={formData.contact_email}
              />
            </div>
            <div className="form-group">
              <label>Company Profile and Activities (2024–25)</label>
              <textarea
                name="company_profile"
                value={formData.company_profile}
                onChange={handleChange}
                className="form-textarea"
                rows={4}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3 className="step-title">Step 3: Exploration Data Part 1</h3>
            <table className="quant-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Particulars</th>
                  <th>2024‑25</th>
                  <th>2023‑24</th>
                </tr>
              </thead>
              <tbody>
                {explorationFields.slice(0, 5).map(({ num, label, key }) => (
                  <tr key={num}>
                    <td className="sno-cell">{num}</td>
                    <td className="label-cell">{label}</td>
                    <td>
                      <input
                        type="number"
                        name={`${key}2024`}
                        value={formData[`${key}2024`]}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name={`${key}2023`}
                        value={formData[`${key}2023`]}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {step === 4 && (
          <div className="form-step">
            <h3 className="step-title">
              Step 4: Exploration Data Part 2 & Technologies
            </h3>
            <table className="quant-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Particulars</th>
                  <th>2024‑25</th>
                  <th>2023‑24</th>
                </tr>
              </thead>
              <tbody>
                {explorationFields.slice(5).map(({ num, label, key }) => (
                  <tr key={num}>
                    <td className="sno-cell">{num}</td>
                    <td className="label-cell">{label}</td>
                    <td>
                      <input
                        type="number"
                        name={`${key}2024`}
                        value={formData[`${key}2024`]}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name={`${key}2023`}
                        value={formData[`${key}2023`]}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="quant-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Technology Name</th>
                  <th>Provider</th>
                  <th>Cost (INR Crores)</th>
                  <th>Areas of Impact</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {formData.technologies.map((t, i) => (
                  <tr key={i}>
                    <td className="sno-cell">{i + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={t.technology_name}
                        onChange={(e) =>
                          handleTechChange(i, "technology_name", e.target.value)
                        }
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={t.technology_provider}
                        onChange={(e) =>
                          handleTechChange(
                            i,
                            "technology_provider",
                            e.target.value
                          )
                        }
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={t.cost}
                        onChange={(e) =>
                          handleTechChange(i, "cost", e.target.value)
                        }
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={t.areas_of_impact}
                        onChange={(e) =>
                          handleTechChange(i, "areas_of_impact", e.target.value)
                        }
                        className="form-input"
                      />
                    </td>
                    <td>
                      <textarea
                        rows={2}
                        value={t.remarks}
                        onChange={(e) =>
                          handleTechChange(i, "remarks", e.target.value)
                        }
                        className="form-textarea"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="form-group">
              <label>Comments</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="form-textarea"
                rows={3}
              />
            </div>
          </div>
        )}

        {step === 5 && (
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
                            placeholder="Enter description"
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
                                e.target.files[0]
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
              <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
              <input
                type="file"
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleFile(e, "signed_form_file")}
                className="form-input"
              />
              {formData.fileError && (
                <span className="error">{formData.fileError}</span>
              )}
            </div>

            <div className="form-group declaration-section">
              <label className="declaration-label">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                />{" "}
                I declare the information is true.
              </label>
            </div>

          </div>
        )}
      </>
    );
  };

  return (
    <div className="application-form">
      <div className="form-header">
        <h1>Registration Form: {awardTitle}</h1>
        <p>Step {step} of 5</p>
      </div>

      {formData.errors.global && (
        <div className="error">{formData.errors.global}</div>
      )}

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div
          className={step === 1 ? "form-navigation-step1" : "form-navigation"}
        >
          {step > 1 && (
            <button type="button" onClick={prev} className="btn btn-outline">
              <ChevronLeft size={16} /> Previous
            </button>
          )}

          <button type="button" onClick={saveDraft} className="btn btn-outline">
            <Save size={16} /> Save Draft
          </button>

          {step < 5 && (
            <button type="button" onClick={next} className="btn btn-primary">
              Next <ChevronRight size={16} />
            </button>
          )} 
          {step === 5 && (
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          )}
          
        </div>
      </form>
    </div>
  );
}