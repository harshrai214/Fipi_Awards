import React from "react";
import "../../styles/SidebarGuideline.css"; // Update the path if needed

const GuidelineInnovator = () => {
  const sections = [
    {
      heading: "1. Tangible Benefits of the Innovation",
      params: [
        ["1.1", "Brief Description", "Provide a concise overview of the innovation."],
        ["1.2", "Quantifiable Impact", "List measurable business/operational benefits resulting from the innovation."],
        ["1.3", "Novelty and Uniqueness", "Highlight what makes the innovation original or significantly different."],
        ["1.4", "Scalability", "Explain the potential to scale the innovation to a larger environment."],
        ["1.5", "Replicability", "Demonstrate whether the innovation can be applied in other departments or organizations."],
        ["1.6", "Adaptability", "State how the innovation adapts to evolving needs or technologies."],
      ],
    },
    {
      heading: "2. Intangible Impact",
      params: [
        ["2.1", "Intangible Benefits", "Describe benefits such as brand value, employee motivation, market perception, etc."],
      ],
    },
    {
      heading: "3. Patents",
      params: [
        ["3.1", "Number of Patents Filed", "List the count of patent applications submitted."],
        ["3.2", "Number of Patents Granted", "List the count of patents officially granted."],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines - Innovator of the Year (Team)</h2>
      <br></br>
      <p><strong>Objective:</strong> To recognize and honor the Innovator of the Year (Team) in India for the impact of their innovation in the assessment year.</p>
      <br></br>
      <p><strong>Eligibility Criteria:</strong></p>
      <ul>
        <li>The award is open to all organisations operating in India in the energy sector.</li>
        <li>Participants must adhere to the FIPI Awards Scheme Terms & Conditions.</li>
        <li>Performance data is subjectively evaluated based on the responses received in the nominations.</li>
      </ul>

      {sections.map((section, index) => (
        <div key={index} className="guideline-section">
          <h3>{section.heading}</h3>
          <table className="guideline-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Evaluation Parameter</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {section.params.map(([no, param, desc], i) => (
                <tr key={i}>
                  <td>{no}</td>
                  <td>{param}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default GuidelineInnovator;
