import React from 'react';

const QuantitativeGNZ = ({ formData, handleChange, part }) => {
  const part1 =  [
{ num: 1, title: '1	Net Zero (Scope – I & II) – Target Year	', key2024: 'projectsAwarded2024', key2023: 'projectsAwarded2023', remarksKey: 'projectsAwardedRemarks' },
{ num: 2, title: 'Total Carbon Emitted (Scope – I & II) (tCO2e)', key2024: 'projectsValue2024', key2023: 'projectsValue2023', remarksKey: 'projectsValueRemarks' },
{ num: 3, title: 'Total Energy Consumed (GJ)', key2024: 'projectsInProgress',key2023: 'projectsValue2023', remarksKey: 'projectsInProgressRemarks' },
{ num: 4, title: 'Annual Revenue (INR Crores)', key2024: 'projectsInProgressValue',key2023: 'projectsValue2023', remarksKey: 'projectsInProgressValueRemarks' },
{ num: 5, title: 'Capex for Wind Energy Generation (INR Crores)', key2024: 'projectsCompleted',key2023: 'projectsValue2023', remarksKey: 'projectsCompletedRemarks' },
{ num: 6, title: 'Capex for Solar Energy Generation (INR Crores)', key2024: 'projectsNoTimeOverrun',key2023: 'projectsValue2023', remarksKey: 'projectsNoTimeOverrunRemarks' },
{ num: 7, title: 'Capex for Other RE Generation (INR Crores)', key2024: 'projectsNoCostOverrun', key2023: 'projectsValue2023',remarksKey: 'projectsNoCostOverrunRemarks' },
{ num: 8, title: 'Total Renewable Energy Power Production (MW)', key2024: 'technologiesIntroduced',key2023: 'projectsValue2023', remarksKey: 'technologiesIntroducedRemarks' },
{ num: 9, title: 'Total Power Consumption (MW)', key2024: 'technologiesValue', key2023: 'projectsValue2023',remarksKey: 'technologiesValueRemarks' },
{ num: 10, title: 'Investment for GH2 production/Transportation/Distribution/ Storage (INR Crores)', key2024: 'fatalities',key2023: 'projectsValue2023', remarksKey: 'fatalitiesRemarks' },
{ num: 11, title: 'GH2 Production (MT)', key2024: 'lostTimeInjuries', key2023: 'projectsValue2023',remarksKey: 'lostTimeInjuriesRemarks' },
{ num: 12, title: 'Tree Plantation (Nos.)', key2024: 'oshaIncidents',key2023: 'projectsValue2023', remarksKey: 'oshaIncidentsRemarks' },
{
      num: 13,
      title: 'Initiatives/ Project undertaken for Carbon Capture',
      key2024: 'projectsValue2024',
      key2023: 'projectsValue2023',
} ,
        { num: '13.1', title: 'Capex (INR Crore) for CCS/CCUS Projects', key: 'salesPerEmployeeTotal2024',key2023: 'projectsValue2023', remarksKey: 'salesPerEmployeeTotal2024Remarks' },
        { num: '13.2', title: 'Carbon Captured (MT)', key: 'salesPerEmployeeCount2024',key2023: 'projectsValue2023', remarksKey: 'salesPerEmployeeCount2024Remarks' },
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
          <table className='"quant-table'>
            <thead>
              <tr>
              <th> Major activities planned as per Net Zero Target for 2024-25 (Max. top 5 Activities) (50 words each against each cell)</th> 
           
            </tr>
             </thead>
             </table>
             <table className="quant-table">
             <thead>
             
              <tr>
                <th>S.No</th>
                <th>Activity Name</th>
                <th>Planned Activities</th>
                <th>Actual Progress</th>

                {/* <th>Remarks (100 words)</th> */}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {['Activity Name', 'Planned Activities', 'Actual Progress'].map((field, j) => (
                    <td key={j}>
                      <textarea
                        type={field.includes('Date') ? 'date' : 'text'}
                        name={`ongoingProject${i + 1}${field}`}
                        value={formData[`ongoingProject${i + 1}${field}`] || ''}
                         maxLength={50}
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

export default QuantitativeGNZ;