import React from "react";
import "../../styles/SidebarGuideline.css"; // Adjust path based on your folder structure

const GuidelineRefinery = () => {
  const sections = [
    {
      heading: "1. Production Efficiency",
      rows: [
        ["1.1", "Capacity utilization in the assessment year", "Current year / (Avg. of last 3 years or nameplate capacity, whichever is higher) X 100"],
        ["1.2", "Increase in capacity utilization", "Current year / Previous year X 100"],
        ["1.3", "Cracking capacity utilization", "Same as 1.1 for cracking capacity"],
        ["1.4", "Increase in cracking capacity utilization", "Current year / Previous year X 100"],
        ["1.5", "Improvement in distillates yield (% of crude throughput)", "Current year % – Previous year %"],
      ],
    },
    {
      heading: "2. Gross Refining Margin",
      rows: [["2", "GRM ($/bbl)", "Report GRM without any concessions"]],
    },
    {
      heading: "3. Operation Metrics",
      rows: [
        ["3.1", "Improvement in operating costs", "(Current yr – Avg. of previous 3 yr) / Avg. of previous 3 yr X 100"],
        ["3.2", "Internal Fuel consumption (% of crude throughput)", "Actual % of crude throughput"],
        ["3.3", "Loss (% of crude throughput)", "Actual % of crude throughput"],
      ],
      note: "Depreciation to be excluded from operating cost",
    },
    {
      heading: "4. Energy Consumption (MBN)",
      rows: [
        ["4.1", "Absolute MBN", "Use CHT methodology"],
        ["4.2", "Improvement in MBN (%)", "(Current yr – Avg. of previous 3 yr) / Avg. of previous 3 yr X 100"],
      ],
    },
    {
      heading: "5. Capital Expenditure",
      rows: [["5", "Capex Utilization (%)", "Actual Capex / Planned Capex (Approved) X 100"]],
    },
    {
      heading: "6. Specific Water Consumption",
      rows: [["6", "Improvement in specific water consumption", "(Current yr – Previous yr)/ Previous yr X 100"]],
    },
    {
      heading: "7. Specific Carbon Emission",
      rows: [
        [
          "7.1",
          "Absolute Carbon Emission (Tonne)",
          "((CO2 from fuel + CO2 from purchased electricity/utilities – Non-Refinery CO2) / crude in barrel / Energy factor)",
        ],
        ["7.2", "Improvement in Specific Carbon Emission", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "8. Safety",
      rows: [
        ["8.1", "Fatal Accident Rate", "(Fatalities x 10,00,00,000) / Total manhours worked"],
        ["8.2", "Lost Time Injury Frequency", "(Lost time injuries x 10,00,000) / Total manhours worked"],
        ["8.3", "Total Recordable Incident Rate", "(OSHA recordable incidents x 2,00,000) / Total manhours worked"],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Refinery of the Year</h2>
<br></br>
      <p>
        <strong>Objective:</strong> Recognizes leadership and excellence in refining petroleum in India.
      </p>
      <br></br>
      <p>
        <strong>Eligibility:</strong> Open to individual crude oil refineries operating in India. Each company may submit entries for each of their refineries separately for the award period.
      </p>

      {sections.map((section, index) => (
        <div className="guideline-section" key={index}>
          <h3>{section.heading}</h3>
          <table className="guideline-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula / Method</th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map(([no, param, formula], i) => (
                <tr key={i}>
                  <td>{no}</td>
                  <td>{param}</td>
                  <td>{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {section.note && <p className="guideline-note"><em>{section.note}</em></p>}
        </div>
      ))}
    </div>
  );
};

export default GuidelineRefinery;
