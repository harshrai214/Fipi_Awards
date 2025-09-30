
import React from "react";
import "../../styles/SidebarGuideline.css"; // Use the existing Sidebar.css
const GuidelinePipeline = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Pipeline Transportation Company of the Year</h2>
      <br />
      <p>
        <strong>Objective:</strong> Pipeline transportation company of the year award recognizes leadership and excellence in performance in transporting crude oil, petroleum products and natural gas through pipelines in India.
      </p>
      <br />
      <p>
        <strong>Eligibility Criteria:</strong>The award is open to companies owning and operating pipeline used for interstate transportation of Oil/Petroleum Products/ Natural Gas in India.</p>

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
              <td>1</td>
              <td>Pipeline Throughput Capacity (MMT)</td>
              <td>S.no 1 will be used to calculate <strong>% Capacity Utilization during the year</strong> i.e.
                <br />
                <br/>
                Throughput / Capacity X 100
                <br />
                <br />
                Note: Data is being captured separately for crude oil, liquid products including LPG & Natural Gas.
                (For conversion 1325 MMSCM of natural gas = 1 MMT of natural gas shall be used)


              </td>

            </tr>
            <tr>
              <td>2</td>
              <td>Pipeline Actual Throughput (MMT)</td>
              <td>S.no 2 will be used to calculate <strong>% Capacity Utilization during the year</strong> i.e.
                <br />
                <br/>
                Throughput / Capacity X 100
                <br />
                <br />
                Note: Data is being captured separately for crude oil, liquid products including LPG & Natural Gas.
                (For conversion 1325 MMSCM of natural gas = 1 MMT of natural gas shall be used)


              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Operating Cost (Rs. /Ton/Km) (Exclude depreciation)</td>
              <td>To calculate the<strong> % reduction in operating cost i.e.</strong>
                <br />
                <br />
                (Current yr – Previous yr)/ Previous yr X 100
                <br />
                <br />
                Note: Data is being captured separately for crude oil, liquid products including LPG & Natural Gas. Operating cost (Exclude depreciation) to be provided in Rs. /Ton/Km unit.
                (For conversion 1325 MMSCM of natural gas = 1 MMT of natural gas shall be used)


              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Specific Energy Consumption (Kcal/ Ton-Km)</td>
              <td>To calculate the <strong>% Reduction in specific energy consumption i.e.</strong>
                (Current yr – Previous yr)/ Previous yr X 100
                <br />
                <br />
                Note: Data is being captured separately for crude oil, liquid products including LPG & Natural Gas. Energy consumption to be provided in Kcal/Ton-Km unit.
                (For conversion 1325 MMSCM of natural gas = 1 MMT of natural gas shall be used)
              </td>
            </tr>

            {/* Section 2 */}
            <tr>
              <td>5</td>
              <td>Leaks reported during the year (number)</td>
              <td>To calculate the number of leakages in Gas, Crude Oil & Products Pipelines
                <br />
                <br />
                Loss due to leakage (MMT) is calculated as Actual loss measured in MMT
              </td>
            </tr>

            {/* Section 3 */}
            <tr>
              <td>6</td>
              <td>Pipeline Downtime (Hours) due to reasons other than product/ Natural Gas non-availability and containment constraints</td>
              <td>To calculate the Pipeline Downtime (Hours) due to reasons other than product non-availability and containment constraints</td>
            </tr>

            {/* Section 4 */}
            <tr>
              <td>7</td>
              <td>Renewable Energy (RE) as percentage of total power consumed</td>
              <td>RE Power produced / Total Power X 100 i.e.
                Renewable power produced in KW as percentage of total power in KW</td>
            </tr>
            <tr>
              <td>8</td>
              <td colSpan="2">Safety</td>

            </tr>
            <tr>
              <td>8.1</td>
              <td>Number of fatalities (own employees + contract employees)</td>
              <td>No. of Fatalities means the number of deaths that have occurred due to a specific incident, accident, or disaster within a defined reporting period</td>
            </tr>

            {/* Section 5 */}
            <tr>
              <td>8.2</td>
              <td>Number of lost time injuries in the reporting period (own employees + contract employees)</td>
              <td>No. of Lost Time Injuries (LTI) means the number of work-related injuries or illnesses that result in an employee being unable to perform their regular job duties after the incident.</td>
            </tr>
            <tr>
              <td>8.3</td>
              <td>Number of OSHA recordable incidents (own employees + contract employees)</td>
              <td>No. of OSHA recordable incidents refers to the count of work-related injuries or illnesses that must be reported under the Occupational Safety and Health Administration guidelines.</td>
            </tr>
            <tr>
              <td>8.4</td>
              <td>Total Man-hours worked Own Employees</td>
              <td>Total Man Hours Worked (Own Employees) means the sum of all hours worked by a company’s direct employees during a given period.</td>
            </tr>
            <tr>
              <td>8.5</td>
              <td>Total Man-hours worked Contractors Employees</td>
              <td>Total Man Hours Worked (Contractual Employees) means the aggregate of all hours worked by workers hired through contractors during a given period.</td>
            </tr>
            <tr>
              <td colSpan="2"></td>
              <td>Based on point (8.1,8.4,8.5), <strong>Fatal Accident Rate (FAR)</strong> is derived using the formula: [(No. of Fatalities x 10,00,00,000) / Total manhours (owned + contractual) worked in reporting period]</td>

            </tr>
            
              <tr>
                <td colSpan="2"></td>
                <td>Based on point (8.2,8.4,8.5), <strong>Lost Time Injury Frequency (LTIF)</strong> is derived using the formula: [(No. lost time injuries in reporting period x 10,00,000) / Total manhours (owned + contractual) worked in reporting period]</td>

              </tr>
              
                <tr>
                  <td colSpan="2"></td>
                  <td>Based on point (8.3,8.4,8.5), <strong>Total Recordable Incident rate (TRIR)</strong> is derived using the formula: [(No. of OSHA recordable incidents x 2,00,000) / Total manhours (owned + contractual) worked in reporting period] </td>

                </tr>

          </tbody>
        </table>
      </div>


    </div>
  );
};
export default GuidelinePipeline;
