import React from "react";
import "../../styles/Sidebar.css"; // Use the existing Sidebar.css

const GuidelineOverseas = () => {
  const sections = [
    {
      heading: "1. Physical Performance-Production",
      rows: [
        ["1.1", "Total oil production during the year", "Absolute Value in Million Tonne"],
        ["1.2", "Incremental oil production during the year", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["1.3", "Total gas production during the year", "Absolute Value in Billion Cubic Metre"],
        ["1.4", "Incremental gas production during the year", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "2. Physical Performance-Reserves Accretion",
      rows: [
        ["2.1", "2P oil reserve accretion", "Absolute Value in Million Tonne"],
        ["2.2", "2P oil reserve accretion growth", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["2.3", "2P gas reserves accretion", "Absolute Value in Billion Cubic Metre"],
        ["2.4", "2P gas reserve accretion growth", "(Current yr – Previous yr)/ Previous yr X 100"],
        ["2.5", "Reserve Replacement Ratio", "2P Oil & Gas Reserve Accretion / Total Oil & Gas Production"],
      ],
    },
    {
      heading: "3. Financial Performance",
      rows: [
        ["3.1", "Net Profit (INR Crores)", "Net Profit is the final profit a company earns after deducting all expenses from its total revenue"],
        ["3.2", "Annual Turnover (INR Crores)", "Total Annual Turnover of the Company"],
        ["3.3", "Net Profit Margin", "Net Profit / Annual Turnover"],
        ["3.4", "Improvement in Net Profit Margin", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "4. Increase in Overseas Investment (Actual; as per Participating Interest)",
      rows: [
        ["4.1", "Overseas investment (INR Crores)", "Overseas investment by the Company in the particular year"],
        ["4.2", "Growth in investment (%)", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
    {
      heading: "5. Improvement in ESG Activities",
      rows: [
        ["5.1", "Total Carbon Emitted (Tonne)", "In proportion to its activity / participating interest"],
        ["5.2", "Specific Carbon Footprint (Tonne / MTOE)", "Total Carbon Emitted / Total HC Production"],
        ["5.3", "Expenditure on Community welfare (INR Crores)", "Expenditure on various community welfare activities undertaken at overseas countries in the particular year"],
        ["5.4", "Growth in community welfare (%)", "(Current yr – Previous yr)/ Previous yr X 100"],
      ],
    },
  ];

  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Overseas Oil & Gas Company of the Year</h2>
      <br></br>
      <p><strong>Objective:</strong> The “Overseas Oil & Gas Company of the Year” award is given in recognition of leadership and excellence in performance in exploration and production of Oil & Gas in Overseas Countries during 2024-25.</p>
      <br></br>
      <p><strong>Eligibility Criteria:</strong> The award is open to all Indian Companies who are engaged in the Exploration & Production of Oil & Gas in Overseas Countries. FIPI will consider entries from Exploration & Production of hydrocarbons (E&P) companies and E&P divisions of integrated companies.</p>

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
          <li>INR / USD as on 31.03.2025: <strong>85.424</strong></li>
          <li>1 Tonne of oil equivalent to <strong>7.5 bbl</strong> of oil</li>
          <li>MTOE: Million Tonne Oil and Oil equivalent Gas. For gas, 1 BCM gas equivalent to <strong>1 MMT</strong> of oil.</li>
          <li>Total Carbon Emitted includes GHG emissions</li>
        </ul>
      </div>
    </div>
  );
};

export default GuidelineOverseas;