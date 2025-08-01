import React, { useState } from 'react';
import "../styles/QuantitativeProduction.css";

const initialProject = {
  name: '',
  boardApprovalDate: '',
  startDate: '',
  completionDate: '',
  capex: '',
  remarks: ''
};

const QuantitativeProduction = ({ sectionStart = 1 }) => {
  const [formData, setFormData] = useState({
    '1_totalOil': ['', ''],
    '2_totalGas': ['', ''],
    '3_costPerBOE': ['', ''],
    '4_iorEorCapex': ['', ''],
    '5_totalEnergy': ['', ''],
    '5.1_companyEnergy': ['', ''],
    '5.2_totalCapex': ['', ''],
    '5.3_totalOpex': ['', ''],
    '5.4_productionCapex': ['', ''],
    '5.5_productionOpex': ['', ''],
    '6_co2Emission': ['', ''],
    '8_fatalities': ['', ''],
    '9_lostTimeInjuries': ['', ''],
    '10_oshaIncidents': ['', ''],
    '11_ownManHours': ['', ''],
    '12_contractManHours': ['', ''],
  });

  const [projects, setProjects] = useState(Array(5).fill({ ...initialProject }));

  const handleChange = (key, index, value) => {
    setFormData((prev) => {
      const updated = { ...prev };
      updated[key][index] = value;
      return updated;
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const fullData = [
    ['1', 'Total oil production during the year (MMT)', '1_totalOil'],
    ['2', 'Total gas production during the year (BCM)', '2_totalGas'],
    ['3', 'Cost of production ($/boe)', '3_costPerBOE'],
    ['4', 'Capex in IOR / EOR projects implementation (in Crores)', '4_iorEorCapex'],
    ['5', 'Total Energy (GJ) consumed in Production', '5_totalEnergy'],
    ['5.1', 'Total Energy Consumed by the Company (GJ)', '5.1_companyEnergy'],
    ['5.2', 'Total Capex of the Company (INR Crores)', '5.2_totalCapex'],
    ['5.3', 'Total Opex of the Company (INR Crores)', '5.3_totalOpex'],
    ['5.4', 'Capex for Production (INR Crores)', '5.4_productionCapex'],
    ['5.5', 'Opex for Production (INR Crores)', '5.5_productionOpex'],
    ['6', 'Total Carbon dioxide Emitted (Tonne) in Production', '6_co2Emission'],
    ['8', 'No. of Fatalities', '8_fatalities'],
    ['9', 'Number of lost time injuries', '9_lostTimeInjuries'],
    ['10', 'Number of OSHA recordable incidents', '10_oshaIncidents'],
    ['11', 'Total Man Hours Worked (Own Employees)', '11_ownManHours'],
    ['12', 'Total Man Hours Worked (Contractual Employees)', '12_contractManHours'],
  ];

const part1 = fullData.filter(([num]) => parseFloat(num) <= 8);
const part2 = fullData.filter(([num]) => parseFloat(num) > 8);

  return (
    <div className="quantitative-container">
      {sectionStart === 1 && (
        <>
          
          <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>S. No</th>
                <th>Particulars</th>
                <th>2024–25</th>
                <th>2023–24</th>
              </tr>
            </thead>
            <tbody>
              {part1.map(([num, label, key]) => (
                <tr key={key}>
                  <td>{num}</td>
                  <td>{label}</td>
                  <td>
                    <input
                      type="text"
                      value={formData[key][0]}
                      onChange={(e) => handleChange(key, 0, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData[key][1]}
                      onChange={(e) => handleChange(key, 1, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {sectionStart === 2 && (
        <>
          <h3>Safety Data + Project Details</h3>
          <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>S. No</th>
                <th>Particulars</th>
                <th>2024–25</th>
                <th>2023–24</th>
              </tr>
            </thead>
            <tbody>
              {part2.map(([num, label, key]) => (
                <tr key={key}>
                  <td>{num}</td>
                  <td>{label}</td>
                  <td>
                    <input
                      type="text"
                      value={formData[key][0]}
                      onChange={(e) => handleChange(key, 0, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData[key][1]}
                      onChange={(e) => handleChange(key, 1, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: '40px' }}>
            New Projects Initiated to Augment Production (Board Approved)
          </h3>
          <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>S. No</th>
                <th>Project Name</th>
                <th>Board Approval Date</th>
                <th>Start Date</th>
                <th>Schedule Completion Date</th>
                <th>Total Envisaged Capex (INR Crores)</th>
                
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={project.boardApprovalDate}
                      onChange={(e) =>
                        handleProjectChange(index, 'boardApprovalDate', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={project.startDate}
                      onChange={(e) => handleProjectChange(index, 'startDate', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={project.completionDate}
                      onChange={(e) =>
                        handleProjectChange(index, 'completionDate', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={project.capex}
                      onChange={(e) => handleProjectChange(index, 'capex', e.target.value)}
                    />
                  </td>
                  {/* <td>
                    <input
                      type="text"
                      value={project.remarks}
                      onChange={(e) => handleProjectChange(index, 'remarks', e.target.value)}
                    />
                  </td> */}
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

export default QuantitativeProduction;
