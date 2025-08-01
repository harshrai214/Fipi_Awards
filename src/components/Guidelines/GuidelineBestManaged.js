import React from "react";
import "../../styles/Sidebar.css"; // Use the existing Sidebar.css

const GuidelineBestManaged = () => {
  const sections = [
    {
      heading: "1. Name of the Project",
      rows: [["1", "Name of the Project", "Project Name"]],
    },
    {
      heading: "2. Schedule Management",
      rows: [
        ["2.1", "Start Date", "The kick-off date of the project which could be on or before the assessment year"],
        ["2.2", "Initial Planned completion Date", "The planned completion date as mentioned in the project approval document"],
        ["2.3", "Actual Completion Date", "The official completion date of the project which has to be in the assessment year"],
      ],
    },
    {
      heading: "3. Cost Management",
      rows: [
        ["3.1", "Estimated Cost of the project (INR Crores)", "The cost of the project as approved by the Board / Approving authority at the initial stage"],
        ["3.2", "Actual Cost of the project (INR Crores)", "The actual cost of the project as certified / approved by the Auditor / Competent authority after the completion of the project"],
      ],
    },
    {
      heading: "4. Safety",
      rows: [
        ["4.1", "Fatal Accident Rate", "{(No. of Fatalities x 10,00,00,000) / Total manhours (owned + contractual) worked in reporting period}"],
        ["4.2", "Lost Time Injury frequency", "{(No. lost time injuries in reporting period x 10,00,000) / Total manhours (owned + contractual) worked in reporting period}"],
        ["4.2", "Total Recordable Incident rate", "{(No. of OSHA recordable incidents x 2,00,000) / Total manhours (owned + contractual) worked in reporting period}"],
      ],
    },
    {
      heading: "5. Carbon Footprint of the Project",
      rows: [
        ["5.1", "Carbon Emission during the Project Execution Period (Tonne)", "Total carbon emitted (measured / estimated directly or indirectly, preferably by a third party) and certified by an approving authority. A proof in this regard is to be uploaded as a document."],
        ["5.2", "Steps taken to reduce Carbon Footprint", "(Top Five; 200 words) Writeup"],
      ],
    },
    {
      heading: "6. Milestones based Project Management Efficiency",
      rows: [
        ["6.1", "Schedule Completion (Months)", "Schedule completion of each milestone in months"],
        ["6.2", "Actual Completion (Months)", "Actual completion of each milestone in months"],
        ["6.3", "Budgeted Amount (INR Crores)", "Budget expenditure against each milestone in INR Crores"],
        ["6.4", "Actual Amount (INR Crores)", "Actual expenditure against each milestone in INR Crores"],
        ["6.5", "Schedule Weightage", "Schedule Completion / Actual Completion"],
        ["6.6", "Cost Weightage", "Budgeted Amount / Actual Amount"],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Best Managed Project of the Year</h2>
      <br></br>
      <p><strong>Objective:</strong> This award acknowledges outstanding contributions made in the Oil and Gas sector through activities that have been executed with exceptional efficiency, safety, and impact.</p>
      <br></br>
      <p><strong>Eligibility Criteria:</strong> The award is open to all Oil and Gas companies operating in India. Eligible projects must be completed within Indian territory and should directly contribute to the oil and gas value chain, including areas such as biofuels, carbon recycling, and renewables. Only projects that have been commercially completed / commissioned during the financial year 2024–25 will be considered. The budgeted value of the project must be more than or equal to INR 500 crore.</p>

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

      <div className="guideline-notes">
        <h4>Notes:</h4>
        <ul>
          <li>No specific notes provided for this category. Check back for updates.</li>
        </ul>
      </div>
    </div>
  );
};

export default GuidelineBestManaged;