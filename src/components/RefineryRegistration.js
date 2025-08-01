import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/Form.css"; // Unified with RegistrationForm
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RefineryRegistration = () => {
  const location = useLocation();
  const { state } = location;
  const [step, setStep] = useState(2);
  const [formData, setFormData] = useState({
    companyName: state?.refinery || '',
    refineryName: '',
    mailingAddress: '',
    approvingAuthorityName: '',
    designation: '', // Renamed from approvingAuthorityTitle
    approvingAuthorityPhone: '',
    approvingAuthorityEmail: '',
    approvingAuthoritySignature: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    writeUp: '',
    comment:"",
    part1: {
      refineryCapacity: { namePlate: '', actualCrude: '' },
      crackingCapacity: { namePlate: '', actualProcessing: '' },
      distillatesYield: '',
      grossRefiningMargin: '',
      operatingCost: '',
      internalFuelConsumption: '',
      lossPercentage: '',
      mbn: '',
      capitalExpenditure: { planned: '', actual: '' },
      specificWaterConsumption: { freshWater: '', nrgFactor: '' },
    },
    part2: {
      carbonEmission: '',
      safety: {
        fatalities: '',
        lostTimeInjuries: '',
        oshaIncidents: '',
        ownManhours: '',
        contractorManhours: '',
      },
    },
    attachments: [{ description: '', file: null }, { description: '', file: null }, { description: '', file: null }],
  });
  const [error, setError] = useState('');
  const [copyApplicantData, setCopyApplicantData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.refinery) {
      setFormData((prev) => ({ ...prev, companyName: state.refinery }));
    }
    if (copyApplicantData && state?.user) {
      setFormData((prev) => ({
        ...prev,
        contactName: state.user.name || '',
        contactPhone: state.user.phone || '',
        contactEmail: state.user.email || '',
      }));
    }
  }, [state, copyApplicantData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => {
      if (name.includes('.')) {
        const [section, field] = name.split('.');
        return {
          ...prev,
          [section]: { ...prev[section], [field]: value },
        };
      } else if (name.startsWith('attachments')) {
        const index = parseInt(name.match(/\d+/)[0]);
        const newAttachments = [...prev.attachments];
        if (type === 'file') {
          newAttachments[index] = { ...newAttachments[index], file: files[0] };
        } else {
          newAttachments[index] = { ...newAttachments[index], description: value };
        }
        return { ...prev, attachments: newAttachments };
      } else if (type === 'checkbox') {
        setCopyApplicantData(checked);
        return prev; // Handled in useEffect
      }
      return { ...prev, [name]: value };
    });
    // Validate required fields based on step
    if (step === 2 && (!formData.approvingAuthorityName || !formData.approvingAuthorityEmail)) {
      setError('Approving authority name and email are required.');
    } else if (step === 3 && !formData.writeUp.trim()) {
      setError('Write-up is required.');
    } else {
      setError('');
    }
  };

  const nextStep = () => {
    if (step === 2 && (!formData.approvingAuthorityName || !formData.approvingAuthorityEmail)) {
      setError('Approving authority name and email are required.');
      return;
    }
    if (step === 3 && !formData.writeUp.trim()) {
      setError('Write-up is required.');
      return;
    }
    if (step < 5) setStep(step + 1);
    setError('');
  };

  const prevStep = () => {
    if (step > 2) setStep(step - 1);
    else navigate('/RegistrationForm');
  };

  const handleSaveDraft = () => {
    localStorage.setItem('refineryDraft', JSON.stringify(formData));
    alert('Draft saved successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 5 && formData.attachments.some((a) => a.description.trim() && !a.file)) {
      setError('Please upload files for all described attachments.');
      return;
    }
    alert('Registration submitted successfully!');
    navigate('/dashboard');
  };



 const handlePrint = () => {
  const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #1e40af;">Registration Form - Refinery of the Year</h1>
      <h2>Organization & Contact Details</h2>
      <p><strong>Refinery Name:</strong> ${formData.companyName}</p>
      <p><strong>Mailing Address:</strong> ${formData.mailingAddress}</p>
      <h2>Authority Details</h2>
      <p><strong>Approving Authority Name:</strong> ${formData.approvingAuthorityName}</p>
      <p><strong>Designation:</strong> ${formData.designation}</p>
      <p><strong>Approving Authority Phone:</strong> ${formData.approvingAuthorityPhone}</p>
      <p><strong>Approving Authority Email:</strong> ${formData.approvingAuthorityEmail}</p>
      <h2>Contact Details</h2>
      <p><strong>Contact Name:</strong> ${formData.contactName}</p>
      <p><strong>Contact Phone:</strong> ${formData.contactPhone}</p>
      <p><strong>Contact Email:</strong> ${formData.contactEmail}</p>
      <h2>Write-Up</h2>
      <p><strong>Brief Write-Up on Refinery:</strong> ${formData.writeUp}</p>
      <h2>Quantitative Information - Part 1</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Parameters</th>
            <th>2024-25</th>
            <th>2023-24</th>
            <th>2022-23</th>
            <th>2021-22</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.1</td>
            <td>Name Plate Capacity (MMTPA)</td>
            <td>${formData.part1.refineryCapacity.namePlate}</td>
            <td>${formData.part1.refineryCapacity.namePlate}</td>
            <td>${formData.part1.refineryCapacity.namePlate}</td>
            <td>${formData.part1.refineryCapacity.namePlate}</td>
          </tr>
          <tr>
            <td>1.1.1</td>
            <td>Actual Crude Processing (MMTPA)</td>
            <td>${formData.part1.refineryCapacity.actualCrude}</td>
            <td>${formData.part1.refineryCapacity.actualCrude}</td>
            <td>${formData.part1.refineryCapacity.actualCrude}</td>
            <td>${formData.part1.refineryCapacity.actualCrude}</td>
          </tr>
          <tr>
            <td>1.2.1</td>
            <td>Cracking Capacity - Name Plate (MMTPA)</td>
            <td>${formData.part1.crackingCapacity.namePlate}</td>
            <td>${formData.part1.crackingCapacity.namePlate}</td>
            <td>${formData.part1.crackingCapacity.namePlate}</td>
            <td>${formData.part1.crackingCapacity.namePlate}</td>
          </tr>
          <tr>
            <td>1.2.2</td>
            <td>Cracking Capacity - Actual Processing (MMTPA)</td>
            <td>${formData.part1.crackingCapacity.actualProcessing}</td>
            <td>${formData.part1.crackingCapacity.actualProcessing}</td>
            <td>${formData.part1.crackingCapacity.actualProcessing}</td>
            <td>${formData.part1.crackingCapacity.actualProcessing}</td>
          </tr>
          <tr>
            <td>1.3</td>
            <td>Distillates Yield (% of crude throughput)</td>
            <td>${formData.part1.distillatesYield}</td>
            <td>${formData.part1.distillatesYield}</td>
            <td>${formData.part1.distillatesYield}</td>
            <td>${formData.part1.distillatesYield}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Gross Refining Margin ($/bbl)</td>
            <td>${formData.part1.grossRefiningMargin}</td>
            <td>${formData.part1.grossRefiningMargin}</td>
            <td>${formData.part1.grossRefiningMargin}</td>
            <td>${formData.part1.grossRefiningMargin}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Operating Cost (Rs/MT)</td>
            <td>${formData.part1.operatingCost}</td>
            <td>${formData.part1.operatingCost}</td>
            <td>${formData.part1.operatingCost}</td>
            <td>${formData.part1.operatingCost}</td>
          </tr>
          <tr>
            <td>3.1</td>
            <td>Internal Fuel Consumption (% of crude throughput)</td>
            <td>${formData.part1.internalFuelConsumption}</td>
            <td>${formData.part1.internalFuelConsumption}</td>
            <td>${formData.part1.internalFuelConsumption}</td>
            <td>${formData.part1.internalFuelConsumption}</td>
          </tr>
          <tr>
            <td>3.2</td>
            <td>Loss (% of crude throughput)</td>
            <td>${formData.part1.lossPercentage}</td>
            <td>${formData.part1.lossPercentage}</td>
            <td>${formData.part1.lossPercentage}</td>
            <td>${formData.part1.lossPercentage}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>MBN (use CHT methodology)</td>
            <td>${formData.part1.mbn}</td>
            <td>${formData.part1.mbn}</td>
            <td>${formData.part1.mbn}</td>
            <td>${formData.part1.mbn}</td>
          </tr>
          <tr>
            <td>5.1</td>
            <td>Planned Capex (Rs in crore)</td>
            <td>${formData.part1.capitalExpenditure.planned}</td>
            <td>${formData.part1.capitalExpenditure.planned}</td>
            <td>${formData.part1.capitalExpenditure.planned}</td>
            <td>${formData.part1.capitalExpenditure.planned}</td>
          </tr>
          <tr>
            <td>5.1.2</td>
            <td>Actual Capex (Rs in crore)</td>
            <td>${formData.part1.capitalExpenditure.actual}</td>
            <td>${formData.part1.capitalExpenditure.actual}</td>
            <td>${formData.part1.capitalExpenditure.actual}</td>
            <td>${formData.part1.capitalExpenditure.actual}</td>
          </tr>
          <tr>
            <td>6.1</td>
            <td>Fresh Water Consumption (m3)</td>
            <td>${formData.part1.specificWaterConsumption.freshWater}</td>
            <td>${formData.part1.specificWaterConsumption.freshWater}</td>
            <td>${formData.part1.specificWaterConsumption.freshWater}</td>
            <td>${formData.part1.specificWaterConsumption.freshWater}</td>
          </tr>
          <tr>
            <td>6.1.1</td>
            <td>NRG Factor</td>
            <td>${formData.part1.specificWaterConsumption.nrgFactor}</td>
            <td>${formData.part1.specificWaterConsumption.nrgFactor}</td>
            <td>${formData.part1.specificWaterConsumption.nrgFactor}</td>
            <td>${formData.part1.specificWaterConsumption.nrgFactor}</td>
          </tr>
        </tbody>
      </table>
      <h2>Quantitative Information - Part 2</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Parameters</th>
            <th>2024-25</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7</td>
            <td>Carbon Emission (Tonne)</td>
            <td>${formData.part2.carbonEmission}</td>
          </tr>
          <tr>
            <td>8.1</td>
            <td>Number of Fatalities (Own + Contract Employees)</td>
            <td>${formData.part2.safety.fatalities}</td>
          </tr>
          <tr>
            <td>8.2</td>
            <td>Number of Lost Time Injuries (Own + Contract Employees)</td>
            <td>${formData.part2.safety.lostTimeInjuries}</td>
          </tr>
          <tr>
            <td>8.3</td>
            <td>Number of OSHA Recordable Incidents (Own + Contract Employees)</td>
            <td>${formData.part2.safety.oshaIncidents}</td>
          </tr>
          <tr>
            <td>8.4</td>
            <td>Total Manhours Worked (Own Employees)</td>
            <td>${formData.part2.safety.ownManhours}</td>
          </tr>
          <tr>
            <td>8.5</td>
            <td>Total Manhours Worked (Contractor Employees)</td>
            <td>${formData.part2.safety.contractorManhours}</td>
          </tr>
        </tbody>
      </table>
      <h2>Comments</h2>
      <p><strong>Comments:</strong> ${formData.comment}</p>
      <h2>Attachments</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Description</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          ${formData.attachments
            .map(
              (attachment, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${attachment.description || 'N/A'}</td>
              <td>${attachment.file ? attachment.file.name : 'No file uploaded'}</td>
            </tr>
          `
            )
            .join('')}
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

  const progress = ((step - 1) / 4) * 100; // Updated for 5 steps
  const isNextDisabled = (step === 2 && (!formData.approvingAuthorityName || !formData.approvingAuthorityEmail)) ||
                        (step === 3 && !formData.writeUp.trim());

  return (
    <div className="application-form">
      <div className="form-header">
        <h1>Registration Form - Refinery of the Year</h1>
        <p>Step {step} of 5</p>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        {step === 2 && (
          <div className="form-step">
            <h3 className="step-title">Step 2: Authority & Contact Details</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="step-section">
                <h4 className="text-lg font-semibold text-1e40af">Approving Authority</h4>
                <div className="form-group">
                  <label>Details of Approving Authority (Director/Board Level):<span className="text-red">*</span></label>
                  <input
                    type="text"
                    name="approvingAuthorityName"
                    value={formData.approvingAuthorityName}
                    onChange={handleChange}
                    placeholder="Name"
                    className={`form-input ${step === 2 && !formData.approvingAuthorityName ? 'has-error' : ''}`}
                  />
                  {step === 2 && !formData.approvingAuthorityName && <span className="error-tooltip">Name is required</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="approvingAuthorityPhone"
                    value={formData.approvingAuthorityPhone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="approvingAuthorityEmail"
                    value={formData.approvingAuthorityEmail}
                    onChange={handleChange}
                    placeholder="E-mail address"
                    className={`form-input ${step === 2 && !formData.approvingAuthorityEmail ? 'has-error' : ''}`}
                  />
                  {step === 2 && !formData.approvingAuthorityEmail && <span className="error-tooltip">Email is required</span>}
                </div>
              </div>
              <div className="step-section">
                <h4 className="text-lg font-semibold text-1e40af">Contacts (Nodal Officials)</h4>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="copyApplicantData"
                      checked={copyApplicantData}
                      onChange={handleChange}
                    /> Same as applicant
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Name"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="E-mail address"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            <div className="form-navigation">
              <button type="button" onClick={prevStep} className="btn btn-outline">
                <ChevronLeft size={16} /> Previous
              </button>
              <button type="button" onClick={nextStep} className={`btn btn-primary ${isNextDisabled ? 'btn:disabled' : ''}`} disabled={isNextDisabled}>
                Next <ChevronRight size={16} />
              </button>
              <button type="button" onClick={handleSaveDraft} className="btn-outline">
                <Save size={16} /> Save Draft
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="form-step">
            <h3 className="step-title">Step 3: Write-up & Quantitative Information</h3>
            <div className="step-section">
              <div className="form-group">
                <label>Brief Write-Up on Refinery (within 300 words): <span className="text-red">*</span></label>
                <textarea
                  name="writeUp"
                  value={formData.writeUp}
                  onChange={handleChange}
                  maxLength={300}
                  placeholder="Provide a brief description of the refinery"
                  className={`form-input ${step === 3 && !formData.writeUp.trim() ? 'has-error' : ''}`}
                />
                {step === 3 && !formData.writeUp.trim() && <span className="error-tooltip">Write-up is required</span>}
              </div>
            </div>
            <table className="quant-table">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Parameters</th>
                  <th>2024-25</th>
                  <th>2023-24</th>
                  <th>2022-23</th>
                  <th>2021-22</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="2">1</td>
                  <td rowSpan="2">Refinery Capacity</td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  
                </tr>
                <tr></tr>
                <tr>
                  <td>1.1</td>
                  <td>Name Plate Capacity (MMTPA)</td>
                  <td><input type="number" name="part1.refineryCapacity.namePlate" value={formData.part1.refineryCapacity.namePlate} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.refineryCapacity.namePlate" value={formData.part1.refineryCapacity.namePlate} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.refineryCapacity.namePlate" value={formData.part1.refineryCapacity.namePlate} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.refineryCapacity.namePlate" value={formData.part1.refineryCapacity.namePlate} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.refineryCapacity.namePlate" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>1.1.1</td>
                  <td>Actual Crude Processing (MMTPA)</td>
                  <td><input type="number" name="part1.refineryCapacity.actualCrude" value={formData.part1.refineryCapacity.actualCrude} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.refineryCapacity.actualCrude" value={formData.part1.refineryCapacity.actualCrude} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.refineryCapacity.actualCrude" value={formData.part1.refineryCapacity.actualCrude} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.refineryCapacity.actualCrude" value={formData.part1.refineryCapacity.actualCrude} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.refineryCapacity.actualCrude" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td rowSpan="2">1.2</td>
                  <td rowSpan="2">Cracking Capacity</td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  {/* <td rowSpan="2"></td> */}
                </tr>
                <tr></tr>
                <tr>
                  <td>1.2.1</td>
                  <td>Name Plate Capacity (MMTPA)</td>
                  <td><input type="number" name="part1.crackingCapacity.namePlate" value={formData.part1.crackingCapacity.namePlate} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.crackingCapacity.namePlate" value={formData.part1.crackingCapacity.namePlate} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.crackingCapacity.namePlate" value={formData.part1.crackingCapacity.namePlate} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.crackingCapacity.namePlate" value={formData.part1.crackingCapacity.namePlate} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.crackingCapacity.namePlate" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>1.2.2</td>
                  <td>Actual Processing (MMTPA)</td>
                  <td><input type="number" name="part1.crackingCapacity.actualProcessing" value={formData.part1.crackingCapacity.actualProcessing} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.crackingCapacity.actualProcessing" value={formData.part1.crackingCapacity.actualProcessing} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.crackingCapacity.actualProcessing" value={formData.part1.crackingCapacity.actualProcessing} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.crackingCapacity.actualProcessing" value={formData.part1.crackingCapacity.actualProcessing} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.crackingCapacity.actualProcessing" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>1.3</td>
                  <td>Distillates Yield (% of the crude throughput)</td>
                  <td><input type="number" name="part1.distillatesYield" value={formData.part1.distillatesYield} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.distillatesYield" value={formData.part1.distillatesYield} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.distillatesYield" value={formData.part1.distillatesYield} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.distillatesYield" value={formData.part1.distillatesYield} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.distillatesYield" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>2</td>
                  <td>Gross Refining Margin ($/bbl) (GRM without any concession)</td>
                  <td><input type="number" name="part1.grossRefiningMargin" value={formData.part1.grossRefiningMargin} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.grossRefiningMargin" value={formData.part1.grossRefiningMargin} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.grossRefiningMargin" value={formData.part1.grossRefiningMargin} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.grossRefiningMargin" value={formData.part1.grossRefiningMargin} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.grossRefiningMargin" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>3</td>
                  <td>Operating Cost (Rs/MT)</td>
                  <td><input type="number" name="part1.operatingCost" value={formData.part1.operatingCost} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.operatingCost" value={formData.part1.operatingCost} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.operatingCost" value={formData.part1.operatingCost} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.operatingCost" value={formData.part1.operatingCost} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.operatingCost" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>3.1</td>
                  <td>Internal Fuel consumption (% of the crude throughput)</td>
                  <td><input type="number" name="part1.internalFuelConsumption" value={formData.part1.internalFuelConsumption} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.internalFuelConsumption" value={formData.part1.internalFuelConsumption} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.internalFuelConsumption" value={formData.part1.internalFuelConsumption} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.internalFuelConsumption" value={formData.part1.internalFuelConsumption} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.internalFuelConsumption" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>3.2</td>
                  <td>Loss (% of the crude throughput)</td>
                  <td><input type="number" name="part1.lossPercentage" value={formData.part1.lossPercentage} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.lossPercentage" value={formData.part1.lossPercentage} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.lossPercentage" value={formData.part1.lossPercentage} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.lossPercentage" value={formData.part1.lossPercentage} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.lossPercentage" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>4</td>
                  <td>MBN (use CHT methodology)</td>
                  <td><input type="number" name="part1.mbn" value={formData.part1.mbn} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.mbn" value={formData.part1.mbn} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.mbn" value={formData.part1.mbn} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.mbn" value={formData.part1.mbn} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.mbn" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td rowSpan="2">5</td>
                  <td rowSpan="2">Capital Expenditure (Rs in crore)</td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  {/* <td rowSpan="2"></td> */}
                </tr>
                <tr></tr>
                <tr>
                  <td>5.1</td>
                  <td>Planned Capex (Original budget)</td>
                  <td><input type="number" name="part1.capitalExpenditure.planned" value={formData.part1.capitalExpenditure.planned} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.capitalExpenditure.planned" value={formData.part1.capitalExpenditure.planned} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.capitalExpenditure.planned" value={formData.part1.capitalExpenditure.planned} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.capitalExpenditure.planned" value={formData.part1.capitalExpenditure.planned} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.capitalExpenditure.planned" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>5.1.2</td>
                  <td>Actual Capex</td>
                  <td><input type="number" name="part1.capitalExpenditure.actual" value={formData.part1.capitalExpenditure.actual} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.capitalExpenditure.actual" value={formData.part1.capitalExpenditure.actual} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.capitalExpenditure.actual" value={formData.part1.capitalExpenditure.actual} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.capitalExpenditure.actual" value={formData.part1.capitalExpenditure.actual} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.capitalExpenditure.actual" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td rowSpan="2">6</td>
                  <td rowSpan="2">Specific Water Consumption</td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  {/* <td rowSpan="2"></td> */}
                </tr>
                <tr></tr>
                <tr>
                  <td>6.1</td>
                  <td>Fresh water consumption (m3)</td>
                  <td><input type="number" name="part1.specificWaterConsumption.freshWater" value={formData.part1.specificWaterConsumption.freshWater} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.specificWaterConsumption.freshWater" value={formData.part1.specificWaterConsumption.freshWater} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.specificWaterConsumption.freshWater" value={formData.part1.specificWaterConsumption.freshWater} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.specificWaterConsumption.freshWater" value={formData.part1.specificWaterConsumption.freshWater} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.specificWaterConsumption.freshWater" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>6.1.1</td>
                  <td>NRG factor (indicator of level of complexity)</td>
                  <td><input type="number" name="part1.specificWaterConsumption.nrgFactor" value={formData.part1.specificWaterConsumption.nrgFactor} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.specificWaterConsumption.nrgFactor" value={formData.part1.specificWaterConsumption.nrgFactor} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.specificWaterConsumption.nrgFactor" value={formData.part1.specificWaterConsumption.nrgFactor} onChange={handleChange} className="form-input" /></td>
                  <td><input type="number" name="part1.specificWaterConsumption.nrgFactor" value={formData.part1.specificWaterConsumption.nrgFactor} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part1.specificWaterConsumption.nrgFactor" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
              </tbody>
            </table>
            
            <div className="form-navigation">
              <button type="button" onClick={prevStep} className="btn btn-outline">
                <ChevronLeft size={16} /> Previous
              </button>
              <button type="button" onClick={nextStep} className={`btn btn-primary ${isNextDisabled ? 'btn:disabled' : ''}`} disabled={isNextDisabled}>
                Next <ChevronRight size={16} />
              </button>
              <button type="button" onClick={handleSaveDraft} className="btn btn-outline">
                <Save size={16} /> Save Draft
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="form-step">
            <h3 className="step-title">Step 4: Quantitative Information</h3>
            <table className="quant-table">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Parameters</th>
                  <th>2024-25</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7</td>
                  <td>Carbon Emission (Tonne)</td>
                  <td><input type="number" name="part2.carbonEmission" value={formData.part2.carbonEmission} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part2.carbonEmission" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td rowSpan="5">8</td>
                  <td rowSpan="5">Safety</td>
                  {/* <td rowSpan="5"></td> */}
                 
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr>
                  <td>8.1</td>
                  <td>Number of fatalities (own + contract employees)</td>
                  <td><input type="number" name="part2.safety.fatalities" value={formData.part2.safety.fatalities} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part2.safety.fatalities" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>8.2</td>
                  <td>Number of lost time injuries (own + contract employees)</td>
                  <td><input type="number" name="part2.safety.lostTimeInjuries" value={formData.part2.safety.lostTimeInjuries} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part2.safety.lostTimeInjuries" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>8.3</td>
                  <td>Number of OSHA recordable incidents (own + contract employees)</td>
                  <td><input type="number" name="part2.safety.oshaIncidents" value={formData.part2.safety.oshaIncidents} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part2.safety.oshaIncidents" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>8.4</td>
                  <td>Total Manhours worked (Own Employees)</td>
                  <td><input type="number" name="part2.safety.ownManhours" value={formData.part2.safety.ownManhours} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part2.safety.ownManhours" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
                <tr>
                  <td>8.5</td>
                  <td>Total Manhours worked (Contractors Employees)</td>
                  <td><input type="number" name="part2.safety.contractorManhours" value={formData.part2.safety.contractorManhours} onChange={handleChange} className="form-input" /></td>
                  {/* <td><input type="text" name="part2.safety.contractorManhours" value="" onChange={handleChange} className="form-input" placeholder="Remarks" /></td> */}
                </tr>
              </tbody>
            </table>
               <div className="step-section">
              <div className="form-group">
                <label>Comments</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  maxLength={300}
                  placeholder="Comments in (200 words) against input parameter, if any "
                  className={`form-input ${step === 3 && !formData.comment.trim() ? 'has-error' : ''}`}
                />
                {step === 3 && !formData.comment.trim()}
              </div>
            </div>
          
            <div className="form-navigation">
              <button type="button" onClick={prevStep} className="btn btn-outline">
                <ChevronLeft size={16} /> Previous
              </button>
              <button type="button" onClick={nextStep} className={`btn btn-primary ${isNextDisabled ? 'btn:disabled' : ''}`} disabled={isNextDisabled}>
                Next <ChevronRight size={16} />
              </button>
              <button type="button" onClick={handleSaveDraft} className="btn btn-outline">
                <Save size={16} /> Save Draft
              </button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="form-step">
            <h3 className="step-title">Step 5: Document Upload</h3>
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
                  {formData.attachments.map((attachment, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          name={`attachments${index}.description`}
                          value={attachment.description}
                          onChange={handleChange}
                          placeholder="Enter description"
                          className="form-input"
                        />
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".jpg,.png,.pdf"
                          onChange={(e) => handleChange({ target: { name: `attachments${index}.file`, files: e.target.files } })}
                          className="form-input mt-4"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="form-group">
              <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid</label>
              
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
                onChange={(e) => handleChange({ target: { name: 'approvingAuthoritySignature', files: e.target.files } })}
                className="form-input mt-4"
                multiple
              />
            </div>
            
            <div className="form-navigation">
              <button type="button" onClick={prevStep} className="btn btn-outline">
                <ChevronLeft size={16} /> Previous
              </button>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button type="button" onClick={handleSaveDraft} className="btn btn-outline">
                <Save size={16} /> Save Draft
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RefineryRegistration;