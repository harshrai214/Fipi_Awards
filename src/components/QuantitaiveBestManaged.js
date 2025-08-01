import React from 'react';
 import '../styles/QuantitativeBestManaged.css'

const QuantitativeBestManaged = ({ formData, handleChange, sectionStart }) => {
  const renderPart1 = () => (
    <div className="quantitative-form">
      <h3>Project Overview & Safety</h3>
      <table className="quant-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {[
            { num:1,label: 'Project No.', key: 'projectNo' },
            {num:2, label: 'Name of the Project', key: 'projectName' },
            { num:3,label: 'Start Date', key: 'startDate', type: 'date' },
            { num:4,label: 'Initial Planned Completion Date', key: 'plannedCompletionDate', type: 'date' },
            { num:5,label: 'Actual Completion Date', key: 'actualCompletionDate', type: 'date' },
            { num:6,label: 'Estimated Cost of the project (INR Crores)', key: 'estimatedCost' },
            {num:7, label: 'Actual Cost of the project (INR Crores)', key: 'actualCost' },
            { num:8,label: 'Brief description of the Project (200 words)', key: 'description', type: 'textarea' },
            { num:9,label: 'Uniqueness of the Project (200 words)', key: 'uniqueness', type: 'textarea' },
            { num:10,label: 'No. of Fatalities (in 2024-25)', key: 'fatalities' },
            { num:11,label: 'Number of lost time injuries (in 2024-25)', key: 'lostInjuries' },
            { num:12,label: 'Number of OSHA recordable incidents (in 2024-25)', key: 'oshaIncidents' },
            { num:13,label: 'Total Man Hours Worked (Own Employees)', key: 'manHoursOwn' },
            { num:14,label: 'Total Man Hours Worked (Contractual Employees)', key: 'manHoursContract' },
            {num:15, label: 'Carbon Emission during the Project Execution Period (Tonne)', key: 'carbonEmission' },
            { num:16,label: 'Steps taken to reduce Carbon Footprint (200 words)', key: 'carbonReductionSteps', type: 'textarea' },
          ].map((field, i) => (
            <tr key={i}>
                <td>{field.num}</td>
              <td>{field.label}</td>
              <td>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.key}
                    value={formData[field.key] || ''}
                    onChange={handleChange}
                    rows={5}
                    placeholder={``}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    name={field.key}
                    value={formData[field.key] || ''}
                    onChange={handleChange}
                    placeholder={``}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPart2 = () => (
    <div className="quantitative-form">
      <h3>Major Project Milestones</h3>
      <table className="quant-table">
        <thead>
          <tr>
            <th>Milestone Name</th>
            <th>Scheduled Completion (Months)</th>
            <th>Actual Completion (Months)</th>
            <th>Budgeted Amount (INR Crores)</th>
            <th>Actual Amount (INR Crores)</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              {['Name', 'Scheduled', 'Actual', 'Budgeted', 'ActualCost'].map((field, j) => (
                <td key={j}>
                  <input
                    type="text"
                    name={`milestone${i + 1}${field}`}
                    value={formData[`milestone${i + 1}${field}`] || ''}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
        <div className="step-section">
        <div className="form-group">
          <label>Comments</label>
          <textarea
            name="comment"
            value={formData.comment || ''}
            onChange={handleChange}
            maxLength={300}
            placeholder="Comments in (200 words) against input parameter, if any"
          />
        </div>
      
      </div>



    </div>
  );

  return (
    <>
      {sectionStart === 1 ? renderPart1() : renderPart2()}
    </>
  );
};

export default QuantitativeBestManaged;
