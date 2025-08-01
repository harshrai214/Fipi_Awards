import React from 'react';

const QuantitativeService = ({ formData, handleChange, part }) => {
  const part1 =  [
{ num: 1, title: 'No. of Projects awarded', key2024: 'projectsAwarded2024', key2023: 'projectsAwarded2023', remarksKey: 'projectsAwardedRemarks' },
{ num: 2, title: 'Value of Projects awarded (INR Crores)', key2024: 'projectsValue2024', key2023: 'projectsValue2023', remarksKey: 'projectsValueRemarks' },
{ num: 3, title: 'No. of Projects in Progress', key2024: 'projectsInProgress', remarksKey: 'projectsInProgressRemarks' },
{ num: 4, title: 'Total Value of Projects in Progress (INR Crore)', key2024: 'projectsInProgressValue', remarksKey: 'projectsInProgressValueRemarks' },
{ num: 5, title: 'No. of Projects completed', key2024: 'projectsCompleted', remarksKey: 'projectsCompletedRemarks' },
{ num: 6, title: 'No. of Projects Completed without time overrun', key2024: 'projectsNoTimeOverrun', remarksKey: 'projectsNoTimeOverrunRemarks' },
{ num: 7, title: 'No. of Projects Completed without cost overrun', key2024: 'projectsNoCostOverrun', remarksKey: 'projectsNoCostOverrunRemarks' },
{ num: 8, title: 'Number of new technologies introduced', key2024: 'technologiesIntroduced', remarksKey: 'technologiesIntroducedRemarks' },
{ num: 9, title: 'Value of the new technologies introduced (INR Crore)', key2024: 'technologiesValue', remarksKey: 'technologiesValueRemarks' },
{ num: 10, title: 'No. of Fatalities', key2024: 'fatalities', remarksKey: 'fatalitiesRemarks' },
{ num: 11, title: 'Number of lost time injuries', key2024: 'lostTimeInjuries', remarksKey: 'lostTimeInjuriesRemarks' },
{ num: 12, title: 'Number of OSHA recordable incidents', key2024: 'oshaIncidents', remarksKey: 'oshaIncidentsRemarks' },
{ num: 13, title: 'Total Man Hours Worked (Own Employees)', key2024: 'manHoursOwn', remarksKey: 'manHoursOwnRemarks' },
{ num: 14, title: 'Total Man Hours Worked (Contractual Employees)', key2024: 'manHoursContract', remarksKey: 'manHoursContractRemarks' }
]; 

  return (
    <div className="quantitative-form">
      {(!part || part === 1) && (
        <>
          {/* <h3>Part 1: Project Metrics & Safety</h3> */}
          <table className="quant-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Particulars</th>
                <th>2024-25</th>
                <th>2023-24</th>
                {/* <th>Remarks (50 words)</th> */}
              </tr>
            </thead>
            <tbody>
              {part1.map((item, index) => (
                <tr key={index}>
                  <td>{item.num}</td>
                  <td>{item.title}</td>
                  <td>
                    <input type="number" name={item.key2024} value={formData[item.key2024] || ''} onChange={handleChange} />
                  </td>
                  <td>
                    {item.key2023 ? (
                      <input type="number" name={item.key2023} value={formData[item.key2023] || ''} onChange={handleChange} />
                    ) : '-'}
                  </td>
                  {/* <td>
                    <input type="text" name={item.remarksKey} value={formData[item.remarksKey] || ''} onChange={handleChange} maxLength={300} />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {(!part || part === 2) && (
        <>
          {/* <h3>Part 2: Ongoing Projects Information</h3> */}
          <table className="quant-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Project Name</th>
                <th>Client Name</th>
                <th>Start Date</th>
                <th>Scheduled Completion Date</th>
                <th>Awarded Value (INR Crores)</th>
                <th>Actual Cost (INR Crores)</th>
                {/* <th>Remarks (100 words)</th> */}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {['Name', 'Client', 'Start', 'End', 'AwardValue', 'ActualCost'].map((field, j) => (
                    <td key={j}>
                      <input
                        type={field.includes('Date') ? 'date' : 'text'}
                        name={`ongoingProject${i + 1}${field}`}
                        value={formData[`ongoingProject${i + 1}${field}`] || ''}
                        onChange={handleChange}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* <h3>Part 2: List of New Technologies</h3> */}
          <table className="quant-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name of the Technology</th>
                <th>Project Name</th>
                <th>Client Name</th>
                <th>Cost (INR Crores)</th>
                <th>Value Contributed (100 words)</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {['Tech', 'Project', 'Client', 'Cost', 'Value'].map((field, j) => (
                    <td key={j}>
                      <input
                        type={field === 'Cost' ? 'number' : 'text'}
                        name={`technology${i + 1}${field}`}
                        value={formData[`technology${i + 1}${field}`] || ''}
                        onChange={handleChange}
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


        </>
      )}
    </div>
  );
};

export default QuantitativeService;