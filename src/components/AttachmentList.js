import React, { useState } from 'react';
import '../styles/AttachmentList.css';

const AttachmentList = ({  handlePrint }) => {


const [formData, setFormData] = useState({
  // ... other form fields
  attachments: [
    { description: '', file: null },
    { description: '', file: null },
    { description: '', file: null },
    { description: '', file: null },
  ],
  approvingAuthoritySignature: null,
});






  const handleAttachmentDescriptionChange = (index, value) => {
    const updatedAttachments = [...formData.attachments];
    updatedAttachments[index].description = value;
    setFormData({ ...formData, attachments: updatedAttachments });
  };

  const handleAttachmentFileChange = (index, files) => {
    const updatedAttachments = [...formData.attachments];
    updatedAttachments[index].file = files[0];
    setFormData({ ...formData, attachments: updatedAttachments });
  };

  const handleApprovingAuthorityChange = (files) => {
    setFormData({ ...formData, approvingAuthoritySignature: files[0] });
  };

  const handleDeclarationChange = (checked) => {
    setFormData({ ...formData, declaration: checked });
  };

  return (
    <div className="form-step">


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
                    onChange={(e) => handleAttachmentDescriptionChange(index, e.target.value)}
                    placeholder="Enter description"
                    className="form-input"
                  />
                </td>
                <td>
                  <input
                    type="file"
                    accept=".jpg,.png,.pdf"
                    onChange={(e) => handleAttachmentFileChange(index, e.target.files)}
                    className="form-input mt-4"
                  />
                  {attachment.file && <p className="file-name">Selected file: {attachment.file.name}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="form-group">
        <label>Print Document for Approving Authority Signature (Director/Board Level):</label>
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
          onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
          className="form-input mt-4"
        />
        {formData.approvingAuthoritySignature && (
          <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
        )}
      </div>

      <div className="declaration-section">
        <label className="declaration-label">
          <input
            type="checkbox"
            name="declaration"
            checked={formData.declaration}
            onChange={(e) => handleDeclarationChange(e.target.checked)}
            required
          />
          I declare that the information submitted is true and complete.
        </label>
      </div>

      <div className="definition-notes">
        <p>Notes/ Definition:</p>
        <ul>
          <li>a. INR / USD as on 31.03.2025 (85.424)</li>
          <li>b. 1 Tonne of oil equivalent to 7.5 bbl of oil</li>
          <li>c. MTOE: Million Tonne of Oil Equivalent. For this calculation 1 BCM of natural gas is equivalent to 1 MMT of Oil</li>
          <li>d. Finding cost (INR/MTOE): Cost of finding oil and gas reserves added via exploration drilling activities, exclusive of land acquisition cost: (total cost incurred (INR)/ reserves added (oil + oil eq. gas reserves) (MTOE)</li>
        </ul>
      </div> */}
    </div>
  );
};

export default AttachmentList;
