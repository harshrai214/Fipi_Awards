import React from "react";
import "../../styles/SidebarGuideline.css"; // Use the existing Sidebar.css

const GuidelineCBGCompany = () => {
  const sections = [
    {
      heading: "1. CapEx Investment & Growth",
      rows: [
        ["1.1", "Absolute CapEx (₹ crore)", "Direct absolute value reported"],
        ["1.2", "YoY Growth in CapEx (%)", "(2024–25CapEx−2023–24CapEx)/2023–24CapEx × 100"],
      ],
    },
    {
      heading: "2. Installed Capacity & Growth",
      rows: [
        ["2.1", "Installed Capacity (MTPA)", "Direct value reported"],
        ["2.2", "YoY Growth in Installed Capacity (%)", "(2024–25Capacity−2023–24Capacity)/2023–24Capacity× 100"],
      ],
    },
    {
      heading: "3. Capacity Utilisation & Growth",
      rows: [
        ["3.1", "Capacity Utilisation (%)", "(Actual Production ÷ Installed Capacity) × 100"],
        ["3.2", "YoY Improvement in Utilisation (%)", "2024–25 Utilisation % − 2023–24 Utilisation %"],
      ],
    },
    {
      heading: "4. Safety",
      rows: [
        ["4.1", "Fatal Accident Rate", "(Fatalities × 10,00,00,000) ÷ Total Hours Worked"],
        ["4.2", "Lost Time Injury Frequency", "(LTIs × 10,00,000) ÷ Total Hours Worked"],
        ["4.3", "Total Recordable Incident Rate", "(OSHA Recordable × 2,00,000) ÷ Total Hours Worked"],
      ],
    },
    {
      heading: "5. R&D in CBG Areas",
      rows: [
        ["5.1", "Patents Filed", "Count of patents filed in FY"],
        ["5.2", "National Patents Granted", "Number granted in India"],
        ["5.3", "International Patents Granted", "Number granted in developed countries (e.g., US/EU)"],
        ["5.4", "Patents Commercialized", "Number of patents commercially implemented"],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – CBG Company of the Year</h2>
      <br></br>
      <p><strong>Objective:</strong> To recognize and honor the company with the best initiatives in Compressed Bio-Gas (CBG) in India for excellence in capacity expansion, capex utilisation, Research & Development and patents filed in this field during the financial year 2024–25.</p>
      <br></br>
      <p><strong>Eligibility Criteria:</strong></p>
      <ul>
        <li>The award is open to all energy companies operating in India involved in Compressed Bio-Gas (CBG). Any overseas investments and projects will not be considered for evaluation.</li>
        <li>Participants must adhere to the FIPI Awards Scheme Terms & Conditions.</li>
        <li>Performance data is evaluated based on data from FY2024–25 compared to FY2023–24.</li>
      </ul>

      <p><strong>Key Formulas Used & Their Descriptions:</strong> The following performance parameters are evaluated quantitatively. Formulas implied or used across sheets as follows in seriatim:</p>

      {sections.map((section, idx) => (
        <div key={idx} className="guideline-section">
          <h3>{section.heading}</h3>
          <table className="guideline-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Criteria</th>
                <th>Formula / Evaluation Method</th>
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
          <li>No specific notes provided for this category. Check back for updates.</li>
        </ul>
      </div>
    </div>
  );
};

export default GuidelineCBGCompany;