import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Upload, Save } from 'lucide-react';
import '../styles/Form.css';

const ApplicationForm = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    applicantName: '',
    organization: '',
    designation: '',
    email: '',
    phone: '',

    // Project Details
    projectTitle: '',
    category: '',
    description: '',
    objectives: '',

    // Supporting Documents
    documents: [],

    // Declaration
    declaration: false,
  });

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Personal and organization details' },
    { id: 2, title: 'Project Details', description: 'Award category and project information' },
    { id: 3, title: 'Supporting Documents', description: 'Upload required documents' },
    { id: 4, title: 'Review & Submit', description: 'Review and submit your application' },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveDraft = () => {
    // Simulate saving to localStorage or API
    localStorage.setItem('applicationDraft', JSON.stringify(formData));
    alert('Application saved as draft!');
  };

  const submitApplication = () => {
    // Validate all required fields are filled
    if (
      !formData.applicantName ||
      !formData.organization ||
      !formData.designation ||
      !formData.email ||
      !formData.phone ||
      !formData.projectTitle ||
      !formData.category ||
      !formData.description ||
      !formData.objectives ||
      formData.documents.length === 0 ||
      !formData.declaration
    ) {
      alert('Please fill all required fields and upload documents before submitting.');
      return;
    }
    // Simulate submission
    console.log('Submitted Data:', formData);
    alert('Application submitted successfully!');
    onNavigate('/applicant-dashboard'); // Navigate to dashboard
    // Clear form or redirect as needed
    setFormData({
      applicantName: '',
      organization: '',
      designation: '',
      email: '',
      phone: '',
      projectTitle: '',
      category: '',
      description: '',
      objectives: '',
      documents: [],
      declaration: false,
    });
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3 className="step-title">Basic Information</h3>

            <div className="form-grid grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  value={formData.applicantName}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Organization *</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className="form-input"
                  placeholder="Enter organization name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Designation *</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className="form-input"
                  placeholder="Enter your designation"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="form-group form-group-full">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="form-input"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h3 className="step-title">Project Details</h3>

            <div className="form-content">
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                  className="form-input"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Award Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="innovation">Innovation Excellence</option>
                  <option value="environmental">Environmental Sustainability</option>
                  <option value="safety">Safety Leadership</option>
                  <option value="digital">Digital Transformation</option>
                  <option value="young">Young Professional</option>
                  <option value="csr">Corporate Social Responsibility</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Project Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="form-textarea"
                  placeholder="Describe your project in detail"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Objectives *</label>
                <textarea
                  value={formData.objectives}
                  onChange={(e) => handleInputChange('objectives', e.target.value)}
                  rows={4}
                  className="form-textarea"
                  placeholder="List the main objectives of your project"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h3 className="step-title">Supporting Documents</h3>

            <div className="form-content">
              <div className="upload-area">
                <Upload size={48} className="upload-icon" />
                <h4 className="upload-title">Upload Documents</h4>
                <p className="upload-description">Drag and drop your files here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="file-input"
                  accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
                />
                <p className="upload-note">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
                </p>
                {formData.documents.length > 0 && (
                  <div className="uploaded-files">
                    <h4>Uploaded Files:</h4>
                    <ul>
                      {formData.documents.map((doc, index) => (
                        <li key={index}>{doc.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="requirements-section">
                <h4 className="requirements-title">Required Documents:</h4>
                <ul className="requirements-list">
                  <li>• Project proposal document</li>
                  <li>• Supporting evidence/data</li>
                  <li>• Organization profile</li>
                  <li>• Previous awards/recognitions (if any)</li>
                  <li>• Letter of recommendation</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h3 className="step-title">Review & Submit</h3>

            <div className="review-section">
              <div className="review-group">
                <h4 className="review-title">Basic Information</h4>
                <p className="review-item">Name: {formData.applicantName || 'Not provided'}</p>
                <p className="review-item">Organization: {formData.organization || 'Not provided'}</p>
                <p className="review-item">Email: {formData.email || 'Not provided'}</p>
                <p className="review-item">Phone: {formData.phone || 'Not provided'}</p>
              </div>

              <div className="review-group">
                <h4 className="review-title">Project Details</h4>
                <p className="review-item">Title: {formData.projectTitle || 'Not provided'}</p>
                <p className="review-item">Category: {formData.category || 'Not provided'}</p>
                <p className="review-item">Description: {formData.description || 'Not provided'}</p>
                <p className="review-item">Objectives: {formData.objectives || 'Not provided'}</p>
              </div>

              <div className="review-group">
                <h4 className="review-title">Supporting Documents</h4>
                <p className="review-item">
                  {formData.documents.length > 0
                    ? `${formData.documents.length} file(s) uploaded`
                    : 'No documents uploaded'}
                </p>
              </div>
            </div>

            <div className="declaration-section">
              <label className="declaration-label">
                <input
                  type="checkbox"
                  checked={formData.declaration}
                  onChange={(e) => handleInputChange('declaration', e.target.checked)}
                  className="declaration-checkbox"
                  required
                />
                <span className="declaration-text">
                  I hereby declare that all the information provided is true and accurate to the best of my knowledge. I
                  understand that any false information may lead to disqualification.
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="application-form">
      {/* Header */}
      <div className="form-header">
        <button
          onClick={() => onNavigate('/applicant-dashboard')}
          className="back-button"
        >
          <ChevronLeft size={16} />
          Back to Dashboard
        </button>
        <h1 className="form-title">Award Application</h1>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div key={step.id} className="progress-step-container">
              <div
                className={`progress-step ${currentStep >= step.id ? 'active' : ''}`}
              >
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`progress-line ${currentStep > step.id ? 'active' : ''}`} />
              )}
            </div>
          ))}
        </div>

        <div className="step-info">
          <h2 className="step-title">{steps[currentStep - 1].title}</h2>
          <p className="step-description">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="form-content card">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="form-navigation">
        <div className="nav-left">
          {currentStep > 1 && (
            <button onClick={prevStep} className="btn btn-outline">
              <ChevronLeft size={16} />
              Previous
            </button>
          )}
        </div>

        <div className="nav-right">
          <button onClick={saveDraft} className="btn btn-outline">
            <Save size={16} />
            Save Draft
          </button>

          {currentStep < steps.length ? (
            <button onClick={nextStep} className="btn btn-primary">
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={submitApplication}
              disabled={!formData.declaration}
              className="btn btn-success"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;