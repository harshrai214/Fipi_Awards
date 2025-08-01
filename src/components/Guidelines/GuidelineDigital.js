import React from "react";
import "../../styles/SidebarGuideline.css"; // Use the existing Sidebar.css

const GuidelineDigital = () => {
  const sections = [
    {
      heading: "1. Annual Revenue Declaration",
      rows: [
        ["1.1", "Revenue Earned from Digital Technology Services (INR Crores)", "Annual Revenue as earned from Digital Technology Services during the assessment year and as may be declared in the Annual Report of the Company"],
        ["1.2", "Growth in Revenue Earned from Digital Technology Services (%)", "((Current yr – Previous yr)/ Previous yr) X 100"],
        ["1.3", "Total Revenue of the Company (INR Crores)", "Total Annual Revenue of the Company"],
      ],
    },
    {
      heading: "2. Digital Technology Proliferation",
      rows: [
        ["2.1", "Name of Digital Technology Project", "Digital Technology Project Name"],
        ["2.2", "Areas of Implementation", "Specific Areas"],
        ["2.3", "Year of Commencement of Implementation", "Year"],
        ["2.4", "No. of Customers as on date", "No. of customers (companies) using the particular technology in the assessment year"],
        ["2.5", "Revenue till date (INR Crores)", "Revenue earned through this particular technology till 31st March of the assessment year"],
        ["2.6", "Digital Technologies Implementation Index", "(Sum of (No. of customers*completed years))/3\nNote: Completed Years to be calculated: (2025-Year of Implementation)"],
      ],
    },
    {
      heading: "3. Upcoming / R&D on Digital Technology",
      rows: [
        ["3.1", "Year of Commencement of R&D", "Specific year on which the approval was obtained"],
        ["3.2", "Investment (INR Crores)", "Total investment as envisaged in the approving document"],
        ["3.3", "Patents Obtained", "Total number of patents obtained against the said technology"],
        ["3.4", "The intangible areas where the R&D initiative is expected to add value*", "Please refer to the note below"],
        ["3.5", "Total Investment", "Sum of investment in all 3 technologies (INR Crores)"],
        ["3.6", "Total number of Patents Obtained", "Sum of patents obtained in all 3 technologies (Nos.)"],
        ["3.7", "Total Investment in R&D in the Assessment Year (INR Crores)", "Investment made in R&D activities in the assessment year"],
        ["3.8", "Total Investment in R&D as % of Total Revenue", "Total Investment in R&D / Total Revenue"],
      ],
    },
    {
      heading: "4. Market Presence and Growth",
      rows: [
        ["4.1", "Number of Customers", "Absolute Value"],
        ["4.2", "Growth in Number of Customers", "((Current yr – Previous yr)/ Previous yr) X 100"],
        ["4.3", "% of Total Revenue earned through Digital Technology", "Revenue Earned from Digital Technology Services / Total Revenue of the Company"],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Digital Technology Provider of the Year</h2>
      <br></br>
      <p><strong>Objective:</strong> The award recognizes the leadership in performance of a company in implementing the most cutting-edge digital technologies in Oil & Gas sector.</p>
      <br></br>
      <p><strong>Eligibility Criteria:</strong> The award is open to any company in India, implementing digital technologies in Oil & Gas sector.</p>

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
        
        <h4><strong>Areas of Intangible Value:</strong></h4>
        
          <ol type="1">
          <li> Reduction Carbon Footprint</li>
          <li> Improvement in Productivity</li>
          <li> Improvement in Energy Efficiency</li>
          <li> Reduction in Usage of Paper</li>
          <li> Expediting procurement/sales invoicing process</li>
          <li> Improvement in HSE Performance</li>
          <li> Improvement in Customer Interfacing</li>
          <li> Others</li>
          </ol>
        
      </div>
    </div>
  );
};

export default GuidelineDigital;