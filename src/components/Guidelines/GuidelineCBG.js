import React from "react";
import "../../styles/SidebarGuideline.css"; // Use the existing Sidebar.css

const GuidelineCBGCompany = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – CBG Company of the Year</h2>
      <br />
      <p>
        <strong>Objective:</strong> To recognize and honor the company with the best initiatives in Compressed Bio-Gas (CBG) in India for excellence in capacity expansion, capex utilisation, Research & Development and patents filed in this field during the financial year 2024–25.
      </p>
      <br />
      <p>
        <strong>Eligibility Criteria:</strong>
      </p>
      <ul>
        <li>The award is open to all energy companies operating in India involved in Compressed Bio-Gas (CBG). Any overseas investments and projects will not be considered for evaluation.</li>
        <li>Participants must adhere to the FIPI Awards Scheme Terms & Conditions.</li>
        <li>Performance data is evaluated based on data from FY2024–25 compared to FY2023–24.</li>
      </ul>

      <p>
        <strong>Key Formulas Used & Their Descriptions:</strong> The following performance parameters are evaluated quantitatively. Formulas implied or used across sheets as follows in seriatim:
      </p>

      <table className="guideline-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Criteria</th>
            <th>Formula / Evaluation Method</th>
          </tr>
        </thead>
        <tbody>
          {/* Section 1: CapEx Investment & Growth */}
          <tr>
            <td><strong>1.</strong></td>
            <td><strong>Absolute CapEx (INR crore)</strong></td>
            <td>Total capital expenditure made by the company during a financial year (INR crore). It is used to evaluate the scale of financial investment and year-on-year increase in Capex investment. </td>
            </tr>

          {/* Section 2: Installed Capacity & Growth */}
          <tr>
            <td><strong>2.</strong></td>
            <td><strong>Installed Capacity (MTPA)</strong></td>
            <td>Total installed production capacity of Compressed Bio-Gas (CBG) plant. It is used to evaluate the company’s ability to produce CBG and to assess year-on-year growth in installed capacity.</td>
            </tr>

          {/* Section 3: Capacity Utilisation & Growth */}
          <tr>
            <td><strong>3.</strong></td>
            <td><strong>Actual Production (MTPA)</strong></td>
            <td>Total CBG produced during the financial year; used to assess how efficiently the installed capacity is being utilised and to evaluate the year-on-year improvement in capacity utilisation.</td>
            </tr>

          {/* Section 4: Safety */}
          <tr>
            <td><strong>4.</strong></td>
            <td colSpan="2"> <strong>Safety</strong></td>
            </tr>
            <tr>
            <td>4.1</td>
            <td>Number of Fatalities</td>
            <td>No. of Fatalities means the number of deaths that have occurred due to a specific incident, accident or disaster within a defined reporting period.</td>
          </tr>
          <tr>
            <td>4.2</td>
            <td>Total hours worked</td>
            <td>Total Man Hours Worked (Own Employees + contractual) means the sum of all hours actually worked by them during a given period.</td>
          </tr>
          <tr>
            <td>4.3</td>
            <td>Lost Time Injuries</td>
            <td>No. of Lost Time Injuries (LTI) means the number of work-related injuries or illnesses that result in an employee being unable to perform their regular job duties after the incident.</td>
          </tr>
          <tr>
            <td>4.4</td>
            <td>Total Recordable Incident Rate</td>
            <td>No. of OSHA recordable incidents refers to the count of work-related injuries or illnesses that must be reported under the Occupational Safety and Health Administration guidelines.</td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td><strong>The above information is used to calculate the following :</strong> 
              <br/>
<strong>1. Fatal Accident Rate (FAR)</strong>, derived using the formula: [(No. of Fatalities x 10,00,00,000) / Total manhours worked in reporting period].<br/>
<strong>2. Lost Time Injury Frequency (LTIF)</strong>, derived using the formula: [(No. lost time injuries in reporting period x 10,00,000) / Total manhours worked in reporting period].<br/>
<strong>3. Total Recordable Incident rate (TRIR)</strong>, derived using the formula: [(No. of OSHA recordable incidents x 2,00,000) / Total manhours worked in reporting period].
</td>
          </tr>
          

          {/* Section 5: R&D in CBG Areas */}
          <tr>
            <td>5.</td>
            <td colSpan="2"> <strong>R&D in CBG Areas</strong></td>
          </tr>
          <tr>
            <td>5.1</td>
            <td>Number of Patents Filed</td>
            <td>Total patents filed during the financial year; used to assess the company’s innovation efforts in CBG technology.</td>
          </tr>
          <tr>
            <td>5.2</td>
            <td>Number of Patents Granted - National</td>
            <td>Total patents filed during the financial year; used to assess the company’s innovation efforts in CBG technology.</td>
          </tr>
          <tr>
            <td>5.3</td>
            <td>Number of Patents Granted - International</td>
            <td>Total patents filed during the financial year; used to assess the company’s innovation efforts in CBG technology.</td>
          </tr>
          <tr>
            <td>5.4</td>
            <td>Number of Patents Commercialized</td>
            <td>Total patents successfully implemented commercially; measures the practical applicability and market readiness of innovations.</td>
          </tr>
        </tbody>
      </table>
    
     
    </div>
  );
};

export default GuidelineCBGCompany;