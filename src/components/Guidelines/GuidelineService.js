import React from "react";
import "../../styles/SidebarGuideline.css";

const GuidelineService = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Service Provider of the Year</h2>

      <br />
      <p>
        <strong>Objective:</strong> This award recognizes the activities carried out by Service Providers in the Oil and Gas sector and has contributed significantly, efficiently and in a safe and environment friendly manner.
      </p>
      <br />
      <p>
        <strong>Eligibility:</strong>The award is open to all Oil & Gas Service Providers operating in India providing services to Indian Oil and Gas companies
      </p>

      <div className="guideline-table-container">
        <table className="guideline-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Parameter</th>
              <th>Description/Formula</th>
            </tr>
          </thead>
          <tbody>
            {/* Section 1 */}
            <tr>
              <td >1.</td>
              <td >No. of Projects awarded (Nos.)</td>
              <td >Total count of projects that were officially assigned during the year
                <br />
                <br />
                Based on the above values, <strong>growth in terms of no. of projects awarded</strong> is derived
                using the formula: [(Current year – Previous year) / Previous year] × 100
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Value of Projects awarded (INR Crore) </td>
              <td>Combined worth of all awarded projects during the year
                <br />
                <br />
                Based on the above values,<strong>growth in terms of value of projects awarded</strong> is
                derived using the formula: [(Current year – Previous year) / Previous year] × 100
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>No. of Projects in Progress in the Year (Nos.) </td>
              <td>Total number of projects that were actively being executed or worked on during a year </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Total Value of Projects in Progress (INR Crore) </td>
              <td>Combined worth of all ongoing projects during the year</td>
            </tr>

            {/* Section 2 */}
            <tr>
              <td>5</td>
              <td>No. of Projects completed (Nos.) </td>
              <td>Number of projects that were successfully finished and closed in the assessment year </td>
            </tr>
            <tr>
              <td>6</td>
              <td>No. of Projects Completed without time overrun (Nos.) </td>
              <td>Number of completed projects that met their planned timelines without any delays in the assessment year</td>
            </tr>
            <tr>
              <td colSpan="2"></td>
              <td>Based on Point (5&6),<strong> Efficiency in terms of time overrun</strong> is derived using the
                formula: [(No. of Projects completed in the assessment year / No. of Projects
                completed without time overrun in the assessment year)] </td>
            </tr>
            <tr>
              <td>7</td>
              <td>No. of Projects Completed without cost overrun (Nos.) </td>
              <td>Number of completed projects that did not exceed their sanctioned financial
                allocation in the assessment year </td>
            </tr>

            {/* Section 3 */}
            <tr>
              <td colSpan="2"></td>
              <td>Based on Point (5&6),<strong> Efficiency in terms of cost overrun</strong> is derived using the formula: [(No. of Projects completed in the assessment year / No. of Projects
                completed without cost overrun in the assessment year)] </td>
            </tr>
            <tr>
              <td>8</td>
              <td>New technologies introduced (Nos.)</td>
              <td>Refers to the new technologies or the processes used for the first time</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Value of the new technologies introduced (INR Crore) )</td>
              <td>Refers to investment made in adopting or implementing new technologies</td>
            </tr>
            <tr>
              <td>10</td>
              <td>No. of Fatalities </td>
              <td>No. of Fatalities means the number of deaths that have occurred due to a specific
                incident, accident or disaster within a defined reporting period </td>
            </tr>

            <tr>
              <td>11</td>
              <td>No. of lost time injuries</td>
              <td>No. of Lost Time Injuries (LTI) means the number of work-related injuries or
                illnesses that result in an employee being unable to perform their regular job
                duties after the incident </td>
            </tr>
            <tr>
              <td>12</td>
              <td>No. of OSHA recordable incidents </td>
              <td>No. of OSHA recordable incidents refers to the count of work-related injuries or
                illnesses that must be reported under the Occupational Safety and Health
                Administration guidelines </td>
            </tr>

            {/* Section 4 */}
            <tr>
              <td>13</td>
              <td>Total Man Hours Worked (Own Employees) </td>
              <td>Total Man Hours Worked (Own Employees) means the sum of all hours actually
                worked by a company’s direct employees during a given period </td>
            </tr>
            <tr>
              <td>14</td>
              <td>Total Man Hours Worked (Contractual Employees) </td>
              <td>Total Man Hours Worked (Contractual Employees) means the aggregate of all hours
                actually worked by workers hired through contractors during a given period</td>
            </tr>
            <tr>
              <td colSpan="2"></td>
              <td>Based on point (10, 13 & 14),<strong> Fatal Accident Rate (FAR)</strong> is derived using the
                formula: [(No. of Fatalities x 10,00,00,000) / Total manhours (owned + contractual)
                worked in reporting period] </td>
            </tr>
            <tr>
              <td colSpan="2"></td>

              <td>Based on point (11,13 & 14),<strong> Lost Time Injury Frequency (LTIF)</strong> is derived using the
                formula: [(No. lost time injuries in reporting period x 10,00,000) / Total manhours
                (owned + contractual) worked in reporting period] </td>
            </tr>

            {/* Section 5 */}
            <tr>
              <td colSpan="2"></td>
              <td >Based on point (12, 13 & 14),<strong> Total Recordable Incident rate (TRIR)</strong> is derived using
                the formula: [(No. of OSHA recordable incidents x 2,00,000) / Total manhours
                (owned + contractual) worked in reporting period] </td>
            </tr>
            <tr>
  <td style={{ minWidth: "80px", fontWeight: "bold" }}>Table 1</td>
  <td colSpan="2"><strong>Ongoing Projects Information</strong></td>
  {/* <td></td> */}
</tr>

            <tr>
              <td>i</td>
              <td>Project Name</td>
              <td>Name of the Project </td>
            </tr>

            {/* Section 6 */}
            <tr>
              <td >ii</td>
              <td >Client Name </td>
              <td >Name of the Client </td>
            </tr>
            <tr>
              <td>iii</td>
              <td>Start Date </td>
              <td>The kick-off date of the project </td>
            </tr>
            <tr>
              <td>iv</td>
              <td>Schedule Completion Date </td>
              <td>The schedule completion date as mentioned in the project approval document </td>
            </tr>
            <tr>
              <td>v</td>
              <td>Awarded Value (INR Crore) </td>
              <td>Refers to the total sanctioned or contracted cost of project</td>
            </tr>
            <tr>
              <td>vi</td>
              <td>Actual Cost of the Project (INR Crore)</td>
              <td>Refers to total amount of money actually spent</td>
            </tr>
            <tr>
              <td><strong>Table 2</strong></td>
              <td colSpan="2"><strong>New Technologies Information</strong> </td>
              
            </tr>
            <tr>
              <td>i</td>
              <td>Name of the Technology </td>
              <td>Technology Name</td>
            </tr>
            <tr>
              <td>ii</td>
              <td>Project Name using the technology </td>
              <td>Name of the Project where a particular technology is used </td>
            </tr>

            {/* Section 7 */}
            <tr>
              <td>iii</td>
              <td>Client Name </td>
              <td>Name of the Client</td>
            </tr>
            <tr>
              <td>iv</td>
              <td>Cost of the Technology (INR Crore)</td>
              <td>Refers to combined cost of acquiring, developing, implementing, and maintaining
                technology used in a particular project </td>
            </tr>
            <tr>
              <td>v</td>
              <td>Values contributed by the Technology (100 Words) </td>
              <td>Brief writeup on the values contributed by the particular technology in 100 words</td>
            </tr>

          </tbody>
        </table>
      </div>


    </div>
  );
};

export default GuidelineService;