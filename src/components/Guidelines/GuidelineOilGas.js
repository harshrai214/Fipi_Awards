import React from "react";
import "../../styles/Guidelinecss/GuidelineOilGas.css"; // Use Sidebar.css instead of SidebarGuideline.css

const GuidelineOilGas = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Oil & Gas Production Company of the Year</h2>
      <br />
      <p>
        <strong>Objective:</strong> The “Oil & Gas Production Company of the Year” award is given in recognition of leadership and excellence in performance in Production for Oil and Gas in India during 2024-25.
      </p>
      <br />
      <p>
        <strong>Eligibility Criteria:</strong> The award is open to Indian Companies engaged in Production of Oil & Gas in India as an Operator. Entries are accepted from E&P companies and E&P divisions of integrated companies.
      </p>

      <p>
        <strong>Key Formulas Used & Their Descriptions:</strong> The following performance parameters are evaluated quantitatively. Formulas implied or used across sheets as follows in seriatim:
      </p>

      <div className="guideline-table-container">
        <table className="guideline-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>S.No</th>
              <th>Parameter</th>
              <th>Formula / Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>1. Oil & Gas Production</tr>
            {/* Section 1: Oil & Gas Production */}
            <tr>
              
              <td>1.1</td>
              <td>Total oil production during the year</td>
              <td>Absolute Value in Million Tonne</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>1.2</td>
              <td>Growth in oil production (%)</td>
              <td>(Current yr – Previous yr) / Previous yr X 100</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>1.3</td>
              <td>Total gas production during the year</td>
              <td>Absolute Value in Billion Cubic Metre</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>1.4</td>
              <td>Growth in gas production (%)</td>
              <td>(Current yr – Previous yr) / Previous yr X 100</td>
            </tr>

            {/* Section 2: Production Cost */}
            <tr>
              <td>2. Production Cost</td>
              <td>2.1</td>
              <td>Cost of production in the year</td>
              <td>Absolute Value ($/boe)</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>2.2</td>
              <td>Improvement in production cost</td>
              <td>Production Cost of Previous Year / Production Cost of Current Year</td>
            </tr>

            {/* Section 3: Capex in IOR / EOR Projects */}
            <tr>3. Capex in IOR / EOR Projects</tr>
            <tr>
              
              <td>3.1</td>
              <td>Capex in IOR / EOR projects in year (INR Crores)</td>
              <td>Capital expenditures for IOR/EOR projects</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>3.2</td>
              <td>Percentage increase in capex for IOR / EOR projects</td>
              <td>(Current yr – Previous yr) / Previous yr X 100</td>
            </tr>

            {/* Section 4: Innovation in Environmental Gain */}
            <tr>4. Innovation in Environmental Gain</tr>
            <tr>
              
              <td>4.1</td>
              <td>Total Energy consumed in Production (GJ)</td>
              <td>All forms of energy used in production (incl. renewable)</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>4.2</td>
              <td>Total HC Production</td>
              <td>Absolute Value (MTOE)</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>4.3</td>
              <td>Specific Energy consumption (GJ/MTOE)</td>
              <td>Energy consumed / Total HC Production</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>4.4</td>
              <td>Total Carbon dioxide Emitted in production</td>
              <td>Absolute Value (Tonne)</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>4.5</td>
              <td>Specific Carbon Footprint (Tonne / MTOE)</td>
              <td>CO2 Emitted / Total HC Production</td>
            </tr>

            {/* Section 5: Safety */}
             <tr>5. Safety</tr>
            <tr>
             
              <td>5.1</td>
              <td>Fatal Accident Rate</td>
              <td>(Fatalities × 10⁷) / Total manhours worked</td>
            </tr>
            <tr>
              <td></td>
              <td>5.2</td>
              <td>Lost Time Injury Frequency</td>
              <td>(LTIs × 10⁶) / Total manhours worked</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>5.3</td>
              <td>Total Recordable Incident Rate</td>
              <td>(OSHA Incidents × 2×10⁵) / Total manhours worked</td>
            </tr>

            {/* Section 6: New Projects Initiated in Assessment Year */}
            <tr>6. New Projects Initiated in Assessment Year</tr>
            <tr>
              
              <td>6.1</td>
              <td>Project Name</td>
              <td>Name of the Project</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>6.2</td>
              <td>Board approval Date</td>
              <td>Date</td>
            </tr>
            <tr>
              <td></td>
              <td>6.3</td>
              <td>Start Date</td>
              <td>Project kick-off date</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>6.4</td>
              <td>Schedule Completion Date</td>
              <td>Planned project completion date</td>
            </tr>
            <tr>
              {/* <td></td> */}
              <td>6.5</td>
              <td>Total Envisaged Capex (INR Crores)</td>
              <td>CAPEX as approved by the Board</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <div className="guideline-notes">
        <h4>Notes:</h4>
        <ul>
          <li>INR / USD as on 31.03.2025: <strong>85.424</strong></li>
          <li>1 Tonne of oil = <strong>7.5 bbl</strong> of oil</li>
          <li>MTOE (Million Tonne Oil Equivalent): For gas, 1 BCM = <strong>1 MMT</strong> of oil</li>
        </ul>
      </div> */}
    </div>
  );
};

export default GuidelineOilGas;