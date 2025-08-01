import React from "react";
import "../../styles/SidebarGuideline.css"; // Update path if needed

const GuidelineHRM = () => {
  const parameters = [
    { category: "1. Learning & Development", subParams: [
      ["1.1", "GM and above", "Total training days ÷ Number of GM+ employees"],
      ["1.1.1", "Executive (up to E6)", "Total training days ÷ Number of Executive level employees"],
      ["1.1.2", "Workmen", "Total training days ÷ Number of Workmen"],
      ["1.2", "HSE Training Days per Employee", "Total HSE training days ÷ Total regular employees (as on 31st March)"],
      ["1.3.1", "Skill Development", "Training days on Skill Development ÷ Total regular employees"],
      ["1.3.2", "Functional/On-job Training", "Training days on Functional/On-job ÷ Total regular employees"],
      ["1.3.3", "Management Training", "Training days on Management ÷ Total regular employees"],
    ]},
    { category: "2. Employee Attrition Rate", subParams: [
      ["2.1", "Entry Level", "Resigned entry-level ÷ Entry-level recruited in last 2 years"],
      ["2.2", "Executives", "Resigned executives ÷ Executive count at start of year"],
      ["2.3", "Senior Management", "Resigned senior execs ÷ Senior execs at start of year"],
    ]},
    { category: "3. % Recruitment", subParams: [
      ["3", "% Recruitment (Full-Time)", "(Positions Filled ÷ Vacancies) × 100"],
    ]},
    { category: "4. Recruitment Cycle", subParams: [
      ["4", "Recruitment Cycle Completion", "Avg. days from requisition to offer acceptance"],
    ]},
    { category: "5. Diverse Workforce", subParams: [
      ["5.1", "% Young Employees", "(Under 40 ÷ Total) × 100"],
      ["5.2", "% Female Employees", "(Female ÷ Total) × 100"],
      ["5.3", "% Highly Qualified", "(Postgraduates+ ÷ Total) × 100"],
      ["5.4", "% Growth in Differently-Abled", "(Current - Previous) ÷ Previous × 100"],
    ]},
    { category: "6. Preventive Medical Exam", subParams: [
      ["6", "% PME", "(PME Done ÷ Required PME) × 100"],
    ]},
    { category: "7. Female Workforce Retention", subParams: [
      ["7", "Progress", "(Current Female - 5 Years Ago) ÷ 5 Years Ago × 100"],
    ]},
    { category: "8. Grievance Redressal", subParams: [
      ["8", "Mechanism", "Yes/No with bullet points (within 300 words)"],
    ]},
    { category: "9. Recognition & Awards", subParams: [
      ["9", "Award Programs", "Bullet points (within 300 words)"],
    ]},
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines - Human Resource Management</h2>
      {parameters.map((section, index) => (
        <div key={index} className="guideline-section">
          <h3>{section.category}</h3>
          <table className="guideline-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula / Description</th>
              </tr>
            </thead>
            <tbody>
              {section.subParams.map(([no, param, formula], idx) => (
                <tr key={idx}>
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

export default GuidelineHRM;
