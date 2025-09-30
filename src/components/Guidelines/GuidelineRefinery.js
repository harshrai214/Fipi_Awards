import React from "react";
import "../../styles/SidebarGuideline.css"; // Adjust path based on your folder structure

const GuidelineRefinery = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Refinery of the Year</h2>
      <br />
      <p>
        <strong>Objective:</strong> ‘The Refinery of the Year’ awards are given in recognition of leadership & excellence in refining of petroleum in India.
      </p>
      <br />
      <p>
        <strong>Eligibility criteria:</strong>The award is open to individual crude oil refineries operating in India. Companies are encouraged to apply for individual refineries separately for their leadership in performance in refining of crude oil in India during the assessment period.
      </p>

      <div className="guideline-table-container">
        <table className="guideline-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Parameter</th>
              <th>Formula / Method for performance  </th>
            </tr>
          </thead>
          <tbody>
            {/* Section 1 */}
            <tr>
              <td>1</td>
              <td colSpan="2"><strong>Refinery capacity</strong></td>
              
            </tr>
            <tr>
              <td>1.1</td>
              <td>Name Plate Capacity (MMTPA)</td>
              <td>Nameplate capacity (MMTPA) is the maximum designed, continuous processing capacity of an oil refinery, expressed in millions of metric tons per annum.</td>
            </tr>
            <tr>
              <td>1.1.1</td>
              <td>Actual Crude Processing (MMTPA)</td>
              <td>Actual Crude Processing (MMTPA) is the total quantity of crude oil in million metric tonnes that a refinery actually process over the course of a year.</td>
            </tr>
            <tr>
              <td colSpan="2"></td>
              
              <td>Based on the above values (1.1 & 1.1.1) <strong>Capacity utilization</strong> in the assessment year is derived using the formula:
                <br/>
                <br/>
                Current year / (Average of previous three years actual processing or name plate capacity, whichever is higher will be adopted for % calculations) X 100
              </td>
            </tr>
                        <tr>
              <td colSpan="2"></td>
              
              <td>
                Based on the above values (1.1 & 1.1.1)<strong> Increase in capacity utilization</strong> in year of Award over the previous year is derived using the formula:<br/>
                <br/>
                Current year/ Previous year X 100</td>
            </tr>
            <tr>
              <td>1.2</td>
              <td colSpan="2"><strong>Cracking Capacity</strong></td>
              
            </tr>
            <tr>
              <td>1.2.1</td>
              <td>Name Plate Capacity (MMTPA)</td>
              <td>Nameplate cracking capacity (MMTPA) is the maximum designed annual output of a refinery's cracking units, measured in millions of metric tonnes per year.</td>
            </tr>

            {/* Section 2 */}
            <tr>
              <td>1.2.2</td>
              <td>Actual Crude Processing (MMTPA)</td>
              <td>Actual Cracking Processing (MMTPA) in a refinery is the total amount of heavier petroleum fractions broken down into lighter, more valuable products annually using cracking units, measured in Million Metric Tons Per Annum</td>
            </tr>
            <tr>
             <td colSpan="2"></td>
              
              <td>Based on the above values (1.2.1 & 1.2.2) <strong>Cracking capacity utilization</strong> in the assessment year is derived using the formula:<br/>
                <br/>
                Current year / (Average of previous three years actual processing or name plate capacity, whichever is higher will be adopted for % calculations) X 100
              </td>
            </tr>
            <tr>
             <td colSpan="2"></td>
              
              <td>Based on the above values (1.2.1 & 1.2.2) <strong>Increase in Cracking capacity utilization</strong> in year of Award over the previous year is derived using the formula:<br/>
                <br/>
                Current year/ Previous year X 100
              </td>
            </tr>
             {/* Section 3 */}
            <tr>
              <td>1.3</td>
              <td>Distillates Yield (% of the crude throughput)</td>
              <td><strong>Improvement in distillates yield</strong> (% of crude throughput) is derived using the formula:
                <br/>
                <br/>
               Current year percentage – Previous year percentage 
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td><strong>Gross Refining Margin ($/bbl)</strong></td>
              <td>Gross Refining Margin ($/bbl) (GRM without any concession to be reported)</td>
            </tr>
            <tr>
              <td>3</td>
              <td><strong>Operating Cost (Rs/MT)</strong>
                <br/>
                <br/>
                Operation Metrics (Op Cost, F&L),
              </td>
              <td><strong>Improvement in operating costs</strong> is derived using the formula:
                <br/>
                <br/>
               (Current yr – Average of previous three yr)/ Average of previous three yr X 100                                          
(Depreciation to be excluded from operating cost)
 
              </td>
            </tr>
            <tr>
              <td>3.1</td>
              <td>Internal Fuel consumption (% of crude throughput) </td>
              <td><strong>Internal Fuel consumption</strong> (% of the crude throughput)</td>
            </tr>

            {/* Section 4 */}
            <tr>
              <td>3.2</td>
              <td>Loss (% of crude throughput) </td>
              <td><strong>Loss (% of the crude throughput)</strong></td>
            </tr>
           
            <tr>
              <td>4</td>
              <td><strong>MBN (use CHT methodology for the calculation)</strong>  </td>
              <td>Improvement in Energy Consumption (MBN)
                <br/>
                <br/>
                <strong>Absolute MBN</strong> (use CHT methodology for the calculation)
              </td>
            </tr>

            {/* Section 5 */}
            <tr>
              <td colSpan="2"></td>
              <td><strong>Improvement in MBN</strong> (% over average of past three years) is derived using the formula:
                <br/>
                <br/>
                (Current yr – Average of previous three yr)/ Average of previous three yr X 100

              </td>
             
            </tr>
            <tr>
              <td>5</td>
              <td colSpan="2"><strong>Capital Expenditure (Rs in crore)</strong></td>
              
            </tr>

            {/* Section 6 */}
            <tr>
              <td>5.1</td>
              <td>Planned Capex (Original budget)</td>
              <td>Planned capital expenditure (capex) in a refinery refers to the original budget set aside for new construction, major upgrades, and long-term asset improvements.</td>
            </tr>
            <tr>
              <td>5.1.2</td>
              <td>Actual Capex</td>
              <td>Actual Capex in a refinery refers to the capital expenditures a company makes to acquire, upgrade, or maintain long-term physical assets, such as new construction projects, machinery, or equipment</td>
            </tr>

            {/* Section 7 */}
            <tr>
              <td colSpan="2"></td>
              <td>Based on the above values (5.1 & 5.2) <strong>Capex Utilization (%)</strong> is derived using the formula:<br/>
              <br/>
              Actual Capex / Planned Capex (Approved budget) X 100
              </td>
              
            </tr>
            <tr>
              <td>6</td>
              <td colSpan="2"><strong>Specific water consumption</strong></td>

            </tr>
            <tr>
              <td>6.1</td>
              <td>Fresh water consumption (m3)</td>
              <td>Fresh water consumption (m3) in crude refinery is the total volume of fresh water used in cubic meters for various processes within a crude oil refinery.</td>
            </tr>
                        <tr>
              <td>6.1.1</td>
              <td>NRG factor (indicator of level of complexity of refinery)</td>
              <td>The Normalized Refinery Gross Factor (NRGF) is an indicator of a refinery's complexity, calculated by multiplying the throughput of individual processing units by their respective energy factors and dividing the total by the crude oil throughput</td>
            </tr>

            <tr>
              <td colSpan="2"></td>
              <td>Based on the above values (6.1 & 6.2) <strong>Improvement in specific water consumption</strong> is derived using the formula:
                <br/>
                <br/>
                (Current yr – Previous yr)/ Previous yr X 100
              </td>
              
            </tr>

            <tr>
              <td>7</td>
              <td><strong>Carbon Emission (Tonne)</strong> </td>
              <td>Specific Carbon Emission for the refinery during year of award</td>
            </tr>
                        <tr>
              <td colSpan="2"></td>
              <td><strong>Absolute Carbon Emission (Tonne)</strong> calculation formula<br/>
                <br/>
                Specific Carbon Emission for the refinery = (Total CO2 emissions due to burning of fuels + Equivalent CO2 emission in case of purchased electricity + Equivalent CO2 emission in case of purchase of any utility like H2, Steam etc. – CO2 emission which is emitted in Non Refinery operations) / crude processed in barrel / Energy factor
              </td>
              
            </tr>

            <tr>
              <td colSpan="2"></td>
              <td><strong>Improvement in Specific Carbon Emission</strong> is derived using the formula:<br/>
                <br/>
                (Current yr – Previous yr)/ Previous yr X 100
              </td>
              
            </tr>


            <tr>
              <td>8</td>
              <td colSpan="2"><strong>Safety</strong></td>

            </tr>


            {/* Section 8 */}
            <tr>
              <td>8.1</td>
              <td>Number of fatalities (own employees + contract employees)</td>
              <td>No. of Fatalities means the number of deaths that have occurred due to a specific incident, accident or disaster within a defined reporting period</td>
            </tr>
            <tr>
              <td>8.2</td>
              <td>Number of lost time injuries in the reporting period (own employees + contract employees)</td>
              <td>No. of Lost Time Injuries (LTI) means the number of work-related injuries or illnesses that result in an employee being unable to perform their regular job duties after the incident</td>
            </tr>
            <tr>
              <td>8.3</td>
              <td>Number of OSHA recordable incidents (own employees + contract employees)</td>
              <td>No. of OSHA recordable incidents refers to the count of work-related injuries or illnesses that must be reported under the Occupational Safety and Health Administration guidelines</td>
            </tr>
            <tr>
              <td>8.4</td>
              <td>Total Manhours worked Own Employees</td>
              <td>Total Manhours worked Own Employees</td>
            </tr>
            <tr>
              <td>8.5</td>
              <td>Total Manhours worked Contractors Employees</td>
              <td>Total Man Hours Worked (Contractual Employees) means the aggregate of all hours actually worked by workers hired through contractors during a given period</td>
            </tr>
                     
              <tr>
              <td colSpan="2"></td>
              <td>Based on point (8.1, 8.4 & 8.5), <strong>Fatal Accident Rate (FAR)</strong> is derived using the formula: [(No. of Fatalities x 10,00,00,000) / Total manhours (owned + contractual) worked in reporting period] </td>
            </tr>
             <tr>
            <td colSpan="2"></td>
              <td>Based on point (8.2, 8.4 & 8.5), <strong>Lost Time Injury Frequency (LTIF)</strong> is derived using the formula: [(Lost Time Injuries x 1,000,000) / Total manhours (owned + contractual) worked in reporting period]</td>
            </tr>
               <tr>
              
              <td colSpan="2"></td>
              <td>Based on point (8.3, 8.4 & 8.5),<strong> Total Recordable Incident Rate (TRIR)</strong> is derived using the formula: [(No. of OSHA recordable incidents x 2,00,000) / Total manhours (owned + contractual) worked in reporting period]</td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default GuidelineRefinery;