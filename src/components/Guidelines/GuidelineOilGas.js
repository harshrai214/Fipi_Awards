import React from "react";
import "../../styles/Guidelinecss/GuidelineOilGas.css"; // Use Sidebar.css instead of SidebarGuideline.css

const GuidelineOilGas = () => {
  const sections = [
    {
      heading: "1. Oil & Gas Production",
      rows: [
        ["1.1", "Total oil production during the year", "Absolute Value in Million Tonne"],
        ["1.2", "Growth in oil production (%)", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["1.3", "Total gas production during the year", "Absolute Value in Billion Cubic Metre"],
        ["1.4", "Growth in gas production (%)", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "2. Production Cost",
      rows: [
        ["2.1", "Cost of production in the year", "Absolute Value ($/boe)"],
        ["2.2", "Improvement in production cost", "Production Cost of Previous Year / Production Cost of Current Year"],
      ],
    },
    {
      heading: "3. Capex in IOR / EOR Projects",
      rows: [
        ["3.1", "Capex in IOR / EOR projects in year (INR Crores)", "Capital expenditures for IOR/EOR projects"],
        ["3.2", "Percentage increase in capex for IOR / EOR projects", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "4. Innovation in Environmental Gain",
      rows: [
        ["4.1", "Total Energy consumed in Production (GJ)", "All forms of energy used in production (incl. renewable)"],
        ["4.2", "Total HC Production", "Absolute Value (MTOE)"],
        ["4.3", "Specific Energy consumption (GJ/MTOE)", "Energy consumed / Total HC Production"],
        ["4.4", "Total Carbon dioxide Emitted in production", "Absolute Value (Tonne)"],
        ["4.5", "Specific Carbon Footprint (Tonne / MTOE)", "CO2 Emitted / Total HC Production"],
      ],
    },
    {
      heading: "5. Safety",
      rows: [
        ["5.1", "Fatal Accident Rate", "(Fatalities × 10⁷) / Total manhours worked"],
        ["5.2", "Lost Time Injury Frequency", "(LTIs × 10⁶) / Total manhours worked"],
        ["5.3", "Total Recordable Incident Rate", "(OSHA Incidents × 2×10⁵) / Total manhours worked"],
      ],
    },
    {
      heading: "6. New Projects Initiated in Assessment Year",
      rows: [
        ["6.1", "Project Name", "Name of the Project"],
        ["6.2", "Board approval Date", "Date"],
        ["6.3", "Start Date", "Project kick-off date"],
        ["6.4", "Schedule Completion Date", "Planned project completion date"],
        ["6.5", "Total Envisaged Capex (INR Crores)", "CAPEX as approved by the Board"],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Oil & Gas Production Company of the Year</h2>
      <br></br>
      <p><strong>Objective:</strong> The “Oil & Gas Production Company of the Year” award is given in recognition of leadership and excellence in performance in Production for Oil and Gas in India during 2024-25.</p>
      <br></br>
      <p><strong>Eligibility Criteria:</strong> The award is open to Indian Companies engaged in Production of Oil & Gas in India as an Operator. Entries are accepted from E&P companies and E&P divisions of integrated companies.</p>

      {sections.map((section, idx) => (
        <div key={idx} className="guideline-section">
          <h3>{section.heading}</h3>
          <table className="guideline-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula / Description</th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={`${idx}-${i}`}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="guideline-notes">
        <h4>Notes:</h4>
        <ul>
          <li>INR / USD as on 31.03.2025: <strong>85.424</strong></li>
          <li>1 Tonne of oil = <strong>7.5 bbl</strong> of oil</li>
          <li>MTOE (Million Tonne Oil Equivalent): For gas, 1 BCM = <strong>1 MMT</strong> of oil</li>
        </ul>
      </div>
    </div>
  );
};

export default GuidelineOilGas;