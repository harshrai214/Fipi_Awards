import React from "react";
import "../../styles/SidebarGuideline.css"; // Make sure this file exists or adjust path

const GuidelineOilmarketing = () => {
  const sections = [
    {
      heading: "1. Revenue Performance",
      rows: [
        ["1", "Revenue per unit of sales", "Revenue / Qty in MMT"],
        ["2", "Increase in domestic market share (liquid products only)", "Current year – Previous year"],
      ],
    },
    {
      heading: "2. Sales Growth",
      rows: [
        ["3.1", "Increase in MS sales", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["3.2", "Increase in HSD sales", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "3. Retail & Employee Metrics",
      rows: [
        ["4", "Total number of Retail Outlets at year end", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["5", "Sales per Employee", "Total Sales / No. of Marketing Employees"],
        ["6", "Sale of Lubricants as % of Fuel sales", "Sales of Lubricants / Sales of Fuels X 100"],
      ],
    },
    {
      heading: "4. Tankage Capacity Increase",
      rows: [
        ["7.1", "Increase in MS", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["7.2", "Increase in HSD", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["7.3", "Increase in Ethanol", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "5. Digital Initiatives",
      rows: [
        ["8.1", "Automated retail outlets as % of total", "Total Automated Ros / Total Ros X 100"],
        ["8.2", "Non-Cash sales as % of total", "Total non-cash sales / Total sales X 100"],
        ["8.3", "GPS enabled vehicle mgmt. system", "GPS enabled trucks / Total trucks X 100"],
      ],
    },
    {
      heading: "6. Customer Complaint Handling",
      rows: [
        ["9.1", "Number of complaints", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["9.2", "Avg. complaint turn-around time", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "7. New Energy Facilities at Retail Outlets",
      rows: [
        ["10.1.1", "EVs Fast charging stations", "Number of fast charging stations (assessment year)"],
        ["10.1.2", "Increase in EV stations", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["10.2.1", "H2 dispensing stations", "Number of H2 dispensing stations"],
        ["10.2.2", "Increase in H2 stations", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["10.3.1", "CBG sales through Ros", "CBG sales in MT"],
        ["10.3.2", "Increase in CBG sales through Ros", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "8. PMUY & Biofuel Investment",
      rows: [
        ["11.1", "PMUY customers", "Number of PMUY customers (assessment year)"],
        ["11.2", "Per capita LPG consumption (PMUY)", "Current yr / Previous yr X 100"],
        ["12", "Investment in Biofuels", "Investment in biofuels / Total Capex X 100"],
      ],
    },
    {
      heading: "9. Ethanol Programme & Safety",
      rows: [
        ["13", "Progress in Ethanol blending", "Actual blending / Blending target"],
        ["14", "Fatal Accident Rate", "(Fatalities x 10,00,00,000) / Total manhours worked"],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Oil Marketing Company of the Year</h2>
      <br></br>
      <p><strong>Objective:</strong> This award recognizes leadership and excellence in marketing and retailing of petroleum products (non-polymer hydrocarbons).</p>
      <br></br>
      <p><strong>Eligibility:</strong> Open to all oil marketing and retailing companies operating in India.</p>
      

      {sections.map((section, idx) => (
        <div key={idx} className="guideline-section">
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
              {section.rows.map(([no, param, method], i) => (
                <tr key={i}>
                  <td>{no}</td>
                  <td>{param}</td>
                  <td>{method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default GuidelineOilmarketing;
