import React from "react";
import "../../styles/SidebarGuideline.css"; // Use the existing Sidebar.css
const GuidelinePipeline = () => {
  const sections = [
    {
      heading: "1. Pipeline Throughput & Utilization",
      rows: [
        ["1.1", "% Increase in pipelines throughput", "(Current yr – Previous yr)/ Previous yr X 100\nNote: Data is being captured separately for crude oil, liquid products including LPG & Natural Gas. (For conversion 1325 MMSCM of natural gas = 1 MMT of natural gas shall be used)"],
        ["1.2", "Absolute throughput (MMT)", "Actual Throughput"],
        ["1.3", "% Capacity Utilization during the year", "Throughput / Capacity X 100"],
      ],
    },
    {
      heading: "2. % Reduction in operating cost",
      rows: [
        ["2", "% Reduction in operating cost", "(Current yr – Previous yr)/ Previous yr X 100\nNote: Data is being captured separately for crude oil, liquid products including LPG & Natural Gas. Operating cost (Exclude depreciation) to be provided in Rs./Ton/Km unit. (For conversion 1325 MMSCM of natural gas = 1 MMT of natural gas shall be used)"],
      ],
    },
    {
      heading: "3. % Reduction in specific energy consumption",
      rows: [
        ["3", "% Reduction in specific energy consumption", "(Current yr – Previous yr)/ Previous yr X 100\nNote: Data is being captured separately for crude oil, liquid products including LPG & Natural Gas. Energy consumption to be provided in Kcal/Ton-Km unit. (For conversion 1325 MMSCM of natural gas = 1 MMT of natural gas shall be used)"],
      ],
    },
    {
      heading: "4. Leakage in Gas, Crude Oil & Products Pipelines",
      rows: [
        ["4.1", "Leaks reported during the year", "Leak reported number"],
        ["4.2", "Loss due to leakage and sabotage etc.", "Actual loss in MMT"],
      ],
    },
    {
      heading: "5. Pipeline Downtime (Hours)",
      rows: [
        ["5", "Pipeline Downtime (Hours)", "Pipeline Downtime (Hours) due to reasons other than product non-availability and containment constraints"],
      ],
    },
    {
      heading: "6. Renewable Energy (RE) as percentage of total power consumed",
      rows: [
        ["6", "Renewable Energy (RE) as percentage of total power consumed", "RE Power produced / Total Power X 100\nRenewable power produced in KW as percentage of total power in KW"],
      ],
    },
    {
      heading: "7. Safety",
      rows: [
        ["7.1", "Fatal Accident Rate", "(No. of Fatalities x 10,00,00,000) / Total manhours worked in reporting period"],
        ["7.2", "Lost Time Injury frequency", "(No. lost time injuries in reporting period x 10,00,000) / Total hour worked in reporting period"],
        ["7.3", "Total Recordable Incident rate", "(No. of OSHA recordable incidents x 2,00,000) / Total hour worked in reporting period"],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Pipeline Transportation Company of the Year</h2>
      <br></br>
      <p><strong>Objective:</strong> Pipeline transportation company of the year award recognizes leadership and excellence in performance in transporting crude oil, petroleum products and natural gas through pipelines in India.</p>
<br></br>
      <p><strong>Eligibility Criteria:</strong> The award is open to companies owning and operating pipeline used for interstate transportation of Oil/Petroleum Products/Natural Gas in India.</p>

      {sections.map((section, idx) => (
        <div key={idx} className="guideline-section">
          <h3>{section.heading}</h3>
          <table className="guideline-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
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
    </div>
  );
};

export default GuidelinePipeline;