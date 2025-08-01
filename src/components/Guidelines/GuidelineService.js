import React from "react";
import "../../styles/SidebarGuideline.css";

const GuidelineService = () => {
  const sections = [
    {
      heading: "1. Project Execution Technical Capability",
      rows: [
        ["1.1", "No. of Projects in Progress", "Total number of projects being executed in the year"],
        ["1.2", "No. of Projects Awarded", "Total projects officially assigned during the year"],
        ["1.3", "Growth in Projects (%)", "(Current yr – Previous yr) / Previous yr × 100"],
      ],
    },
    {
      heading: "2. Project Execution Financial Capability",
      rows: [
        ["2.1", "Total Value of Projects in Progress (INR Crores)", "Combined value of all ongoing projects"],
        ["2.2", "Value of Projects Awarded (INR Crores)", "Combined worth of awarded projects"],
        ["2.3", "Growth in Project Value (%)", "(Current yr – Previous yr) / Previous yr × 100"],
      ],
    },
    {
      heading: "3. Project Execution Efficiency",
      rows: [
        ["3.1", "No. of Projects Completed", "Successfully closed projects in the assessment year"],
        ["3.2", "Projects without Time Overrun", "Completed projects without delay"],
        ["3.3", "Projects without Cost Overrun", "Completed projects within financial allocation"],
        ["3.4", "Efficiency (Time Overrun)", "No. of projects without time overrun / Total completed projects"],
        ["3.5", "Efficiency (Cost Overrun)", "No. of projects without cost overrun / Total completed projects"],
      ],
    },
    {
      heading: "4. Safety",
      rows: [
        ["4.1", "Fatal Accident Rate", "(Fatalities × 10,00,00,000) / Total manhours worked"],
        ["4.2", "Lost Time Injury Frequency", "(Lost time injuries × 10,00,000) / Total manhours worked"],
        ["4.3", "Total Recordable Incident Rate", "(OSHA recordable incidents × 2,00,000) / Total manhours worked"],
      ],
    },
    {
      heading: "5. Introduction of New Technologies",
      rows: [
        ["5.1", "New Technologies Introduced (Nos.)", "Technologies/processes used for the first time"],
        ["5.2", "Value of Technologies (INR Crores)", "Investment made in adopting/implementing them"],
      ],
    },
    {
      heading: "6. Ongoing Projects Information",
      rows: [
        ["6.1", "Project Name", "Name of the ongoing project"],
        ["6.2", "Client Name", "Name of the client company"],
        ["6.3", "Start Date", "Project kick-off date"],
        ["6.4", "Schedule Completion Date", "Scheduled project end date"],
        ["6.5", "Awarded Value (INR Crores)", "Total sanctioned/contracted cost"],
        ["6.6", "Actual Cost of the Project (INR Crores)", "Total amount spent till now"],
        ["6.7", "Remarks (100 Words)", "Brief write-up (within 100 words)"],
      ],
    },
    {
      heading: "7. New Technologies Information",
      rows: [
        ["7.1", "Technology Name", "Name of the new technology"],
        ["7.2", "Project Name", "Project where it was used"],
        ["7.3", "Client Name", "Name of the client"],
        ["7.4", "Technology Cost (INR Crores)", "Cost of acquiring/deploying the tech"],
        ["7.5", "Value Contributed (100 Words)", "Short description of impact (within 100 words)"],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Service Provider Company of the Year</h2>
<br></br>
      <p>
        <strong>Objective:</strong> To recognize the contributions of service providers in the oil and gas sector who have delivered work efficiently, safely, and in an environmentally friendly manner.
      </p>
      <br></br>
      <p>
        <strong>Eligibility:</strong> Open to all Oil & Gas Service Providers operating in India providing services to Indian oil and gas companies.
      </p>

      {sections.map((section, index) => (
        <div className="guideline-section" key={index}>
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
              {section.rows.map(([no, param, formula], i) => (
                <tr key={i}>
                  <td>{no}</td>
                  <td>{param}</td>
                  <td>{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default GuidelineService;
