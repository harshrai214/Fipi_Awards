import React from "react";
import "../../styles/Guidelinecss/GuidelineExploration.css";

const GuidelineProduction = () => {
  return (
    <div className="guidelinee-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Oil & Gas Production Company of the Year</h2>
      <br />
      <p>
        <strong>Objective:</strong> The “Oil & Gas Production Company of the Year” award is given in recognition of leadership and excellence in performance in Production for Oil and Gas in India during 2024-25.
      </p>
      <br />
      <p>
        <strong>Eligibility:</strong> The award is open to Indian Companies who are engaged in Production of Oil & Gas in India as an Operator. FIPI will consider entries from Exploration & Production of hydrocarbons (E&P) companies and E&P divisions of integrated companies.
      </p>

      <div className="guidelinee-table-container">
        <table className="guidelinee-table">
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
              <td>1.</td>
              <td>Total oil production during the year (MMT) </td>
              <td>
                Total oil produced by a company during the year
                <br />
                <br />
                Based on the above values, incremental oil production is derived using the formula:
                [(Current year – Previous year) / Previous year] × 100 </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Total gas production during the year</td>
              <td>Total gas produced by a company during the year
                <br />
                <br />
                Based on the above values, incremental gas production is derived using the formula:
                [(Current year – Previous year) / Previous year] × 100
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Cost of production</td>
              <td>The cost includes lifting cost plus processing cost plus transportation cost upto Central
                Tank Farm (CTF).
                <br />
                <br />
                Based on the above values, Improvement in production cost is calculated using the
                formula: Production Cost of Previous Year / Production Cost of Current Year</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Capex in IOR / EOR projects implementation (INR
                Crores) </td>
              <td>Capital expenditures involved in Improved Oil Recovery (IOR) and Enhanced Oil
                Recovery (EOR) projects
                <br />
                <br />
                Based on the above values, percentage increase in capex for IOR / EOR projects is
                calculated using the formula: [(Current yr – Previous yr)/ Previous yr] X 100
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                Total Energy consumed in Production (GJ) </td>
              <td>Total Energy = All forms of energy [Electricity (Import and Captive) + Consumption of
                HSD, ATF, Fuel oil, Petrol, Gas, Renewable energy etc.] as consumed in the production
                activities.
                <br />
                <br />
                In case the segregated energy consumption data for production activities of the
                company is not available, the total energy consumption of the company can be
                apportioned in the ratio of Capex plus Opex for production against total Capex + Opex
                of the company.
                <br />
                <br />
             <strong>Note:</strong><br/>
                    1. If the value for point 5 is available, please do not fill in the values for point 5.1 to 5.5<br/>
                    2. If the value for point 5 is not available, please fill in the values for points 5.1 to 5.5 <br/>
              </td>
            </tr>

            {/* Section 2 */}
            <tr>
              <td>5.1</td>
              <td>Total Energy Consumed by the Company (GJ) </td>
              <td>Refers to the aggregate amount of energy used by an organization during the period </td>
            </tr>
            <tr>
              <td>5.2</td>
              <td>Total Capex of the Company (INR Crore) </td>
              <td>Refers to the total capital expenditure incurred by a company during the period </td>
            </tr>
            <tr>
              <td>5.3</td>
              <td>Total Opex of the Company (INR Crore) </td>
              <td>Refers to the total operating expenditure incurred by a company during the period</td>
            </tr>

            {/* Section 3 */}
            <tr>
              <td>5.4</td>
              <td>Capex for Production (INR Crore)</td>
              <td>
                Refers to the capital expenditure incurred specifically on production activities during
                the period </td>
            </tr>
            <tr>
              <td>5.5</td>
              <td>Opex for Production (INR Crore) </td>
              <td>
                Refers to the operating expenditure incurred in carrying out production activities
                during the period
              </td>
            </tr>
            <tr>
              <td colSpan="2"></td>
              <td>
                Based on the above values,<strong> Specific Energy Consumption (GJ / MTOE)</strong> is calculated
                using the formula: [Total Energy Consumed in Production in year / Total hydrocarbon
                production (MTOE) in year] </td>

            </tr>

            {/* Section 4 */}
            <tr>
              <td>6</td>
              <td>
                Total Carbon dioxide Emitted in production (Tonne)</td>
              <td>Total Carbon dioxide emitted for all production-related activities during the period
                <br />
                <br />
                Based on the above values,<strong> Specific Carbon Footprint (Tonne / MTOE)</strong> is calculated
                using the formula: Total Carbon dioxide Emitted in production/ Total HC Production
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>Fatal Accident Rate</td>
              <td>
                No. of Fatalities means the number of deaths that have occurred due to a specific
                incident, accident or disaster within a defined reporting period.
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>Lost Time Injury frequency  </td>
              <td>
                No. of Lost Time Injuries (LTI) means the number of work-related injuries or illnesses
                that result in an employee being unable to perform their regular job duties after the
                incident. </td>
            </tr>
            <tr>
              <td>9</td>
              <td>Total Recordable Incident rate </td>
              <td>No. of OSHA recordable incidents refers to the count of work-related injuries or
                illnesses that must be reported under the Occupational Safety and Health
                Administration guidelines. </td>
            </tr>
            <tr>
              <td>10</td>
              <td>Total Man Hours Worked (Own Employees) </td>
              <td>Total Man Hours Worked (Own Employees) means the sum of all hours actually
                <br />
                worked by a company’s direct employees during a given period. </td>
            </tr>
            <tr>
              <td>11</td>
              <td>Total Man Hours Worked (Contractual Employees) </td>
              <td>
                Total Man Hours Worked (Contractual Employees) means the aggregate of all hours
                actually worked by workers hired through contractors during a given period.
              </td>
            </tr>

            {/* Section 5 */}
            <tr>
              <td></td>
              <td></td>
              <td>
                Based on point (7, 10 & 11), <strong>Fatal Accident Rate (FAR)</strong> is derived using the formula:
                [(No. of Fatalities x 10,00,00,000) / Total manhours (owned + contractual) worked in
                reporting period] </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                Based on point (8,10 & 11), <strong>Lost Time Injury Frequency (LTIF)</strong> is derived using the
                formula: [(No. lost time injuries in reporting period x 10,00,000) / Total manhours
                (owned + contractual) worked in reporting period] </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                Based on point (9, 10 & 11), <strong>Total Recordable Incident rate (TRIR)</strong> is derived using the
                formula: [(No. of OSHA recordable incidents x 2,00,000) / Total manhours (owned +
                contractual) worked in reporting period]
              </td>
            </tr>
            <tr>
              <td><strong>12</strong></td>
              <td colSpan="2"><strong>New Projects initiated in Assessment year to augment production (Board Approved)</strong> </td>

            </tr>

            {/* Section 6 */}
            <tr>
              <td>i</td>
              <td>Project Name</td>
              <td>Name of the Project</td>
            </tr>
            <tr>
              <td>ii</td>
              <td>Board approval Date</td>
              <td>Date</td>
            </tr>
            <tr>
              <td>iii</td>
              <td>Start Date</td>
              <td>The kick-off date of the project</td>
            </tr>
            <tr>
              <td>iv</td>
              <td>
                Schedule Completion Date </td>
              <td>The schedule completion date as mentioned in the project approval document</td>
            </tr>
            <tr>
              <td>v</td>
              <td>Total Envisaged Capex (INR Crores) </td>
              <td>
                The total CAPEX of the project as approved by the Board / Equivalent Authorities
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <p className="notes">
        <strong>Notes:</strong>
        <br />
        1. INR / USD as on 31.03.2025: 85.424
        <br />
        2. 1 Tonne of oil equivalent to 7.5 bbl of oil
        <br />
        3. <strong>MTOE:</strong> Million Tonne Oil and Oil equivalent Gas. For gas, 1 BCM gas
        equals to 1 MMT of oil to be considered.
      </p>
    </div>
  );
};

export default GuidelineProduction;