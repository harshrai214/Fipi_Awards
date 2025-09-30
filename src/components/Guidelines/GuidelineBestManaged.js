import React from "react";
import "../../styles/Sidebar.css"; // Use the existing Sidebar.css

const GuidelineBestManaged = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Best Managed Project of the Year</h2>
    

      <br />
      <p>
        <strong>Objective:</strong> This award acknowledges outstanding contributions made in the Oil and Gas sector through activities that have been executed with exceptional efficiency, safety, and impact.
      </p>
      <br />
      <p>
        <strong>Eligibility Criteria:</strong> The award is open to all Oil and Gas companies operating in India. Eligible projects must be completed within Indian territory and should directly contribute to the oil and gas value chain, including areas such as biofuels, carbon recycling, and renewables. Only projects that have been commercially completed / commissioned during the financial year 2024–25 will be considered. The budgeted value of the project must be more than or equal to INR 500 crore.
      </p>

      {/* <p>
        <strong>Key Formulas Used & Their Descriptions:</strong> The following performance parameters are evaluated quantitatively. Formulas implied or used across sheets as follows in seriatim:
      </p> */}

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
            {/* Section 1: Name of the Project */}
            <tr>
              <td>1.</td>
              <td>Name of the Project</td>
              <td>Project Name</td>
            </tr>

            {/* Section 2: Schedule Management */}

            <tr>
              <td>2</td>
              <td>Start Date</td>
              <td>
                The kick-off date of the project which could be on or before the
                assessment year
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Initial Planned completion Date</td>
              <td>
                The planned completion date as mentioned in the project approval
                document
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Actual Completion Date</td>
              <td>
                The official completion date of the project which has to be in the
                assessment year
              </td>
            </tr>

            {/* Section 3: Cost Management */}
          <tr>
              <td>5</td>
              <td>Estimated Cost of the project (INR Crore)</td>
              <td>
                The cost of the project as approved by the Board / Approving
                authority at the initial stage
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Actual Cost of the project (INR Crore)</td>
              <td>
                The actual cost of the project as certified / approved by the
                Auditor / Competent authority after the completion of the project
              </td>
            </tr>
            
            {/* Section 4: Safety */}
            <tr>
              <td>7</td>
              <td>Brief description of the Project (200 words) </td>
              <td>	
Refers to a short, clear summary highlighting the project’s purpose, location, scope, and expected 
outcomes </td>
            </tr>
            <tr>
              <td>8</td>
              <td>Uniqueness of the Project (including financial, 
technological and environmental challenges) 
within 200 words </td>
              <td>Refers to a description of the project while also highlighting the financial, technological and 
environmental challenges  
                </td>
            </tr>
            <tr>
              <td>9</td>
              <td>No. of Fatalities (in 2024-25)</td>
              <td>
                	
No. of Fatalities means the number of deaths that have occurred due to a specific incident, 
accident or disaster within a defined reporting period.</td>
            </tr>
            <tr>
              <td>10</td>
              <td>No. of lost time injuries (in 2024-25) </td>
              <td>
                No. of Lost Time Injuries (LTI) means the number of work-related injuries or illnesses that result in 
an employee being unable to perform their regular job duties after the incident. </td>
            </tr>

            {/* Section 5: Carbon Footprint of the Project */}
            <tr>
              <td>11</td>
              <td>No. of OSHA recordable incidents (in 2024-25) </td>
              <td>No. of OSHA recordable incidents refers to the count of work-related injuries or illnesses that 
must be reported under the Occupational Safety and Health Administration guidelines.</td>
            </tr>
            <tr>
              <td>12</td>
              <td>Total Man Hours Worked (Own Employees) (in 2024-25)  </td>
              <td>
                Total Man Hours Worked (Own Employees) means the sum of all hours actually worked by a company’s direct employees during a given period. 
                </td>
            </tr>
            <tr>
              <td>13</td>
              <td>	
Total Man Hours Worked (Contractual 
Employees) (in 2024-25) </td>
              <td> Total Man Hours Worked (Contractual Employees) means the aggregate of all hours actually 
worked by workers hired through contractors during a given period. </td>
            </tr>

            {/* Section 6: Milestones based Project Management Efficiency */}
            <tr>
              <td colSpan="2"></td>
              <td>Based on point (9, 12 & 13), <strong>Fatal Accident Rate (FAR)</strong> is derived using the formula: [(No. of 
Fatalities x 10,00,00,000) / Total manhours (owned + contractual) worked in reporting period] </td>
              
            </tr>
            <tr>
              <td colSpan="2"></td>
              <td>	
Based on point (10, 12 & 13), <strong>Lost Time Injury Frequency (LTIF)</strong> is derived using the formula: 
[(No. lost time injuries in reporting period x 10,00,000) / Total manhours (owned + contractual) 
worked in reporting period] </td>
             
            </tr>
            <tr>
              <td colSpan="2"></td>
              <td>	
Based on point (11, 12 & 13), Total Recordable Incident rate (TRIR) is derived using the formula: 
[(No. of OSHA recordable incidents x 2,00,000) / Total manhours (owned + contractual) worked in 
reporting period] </td>
              
            </tr>
            <tr>
              <td>14</td>
              <td>Carbon Emission during the Project Execution 
Period (Tonne)</td>
              <td>Total carbon emitted (measured / estimated directly or indirectly, preferably by a third party) and 
certified by an approving authority. A proof in this regard is to be uploaded as a document.</td>
            </tr>
            <tr>
              <td>15</td>
              <td>	
Steps taken to reduce Carbon Footprint (Top 
Five; 200 words) </td>
              <td>Means the specific actions, measures, or initiatives implemented by an organization, project, or 
individual to cut down greenhouse gas emissions and minimize negative impact on the 
environment.</td>
            </tr>
            <tr>
              <td><strong>16</strong></td>
              <td colSpan="2"><strong>Major milestones of the project decided upfront</strong> </td>
              
            </tr>
            <tr>
              <td>i</td>
              <td>Milestone Name </td>
              <td>Refers to the title or label given to a significant stage in the project timeline </td>
            </tr>
            <tr>
              <td>ii</td>
              <td>Schedule Completion (Months) </td>
              <td>Schedule completion of each milestone in months </td>
            </tr>
            <tr>
              <td>iii</td>
              <td>Actual Completion (Months)

              </td>
              <td>Actual completion of each milestone in months</td>
            </tr>
            <tr>
              <td>iv</td>
              <td>Budgeted Amount (INR Crore)</td>
              <td>Budget expenditure against each milestone in INR Crore</td>
            </tr>
            <tr>
              <td>v</td>
              <td>Actual Amount (INR Crore) </td>
              <td>	
Actual expenditure against each milestone in INR Crore</td>
            </tr>
            <tr>
              <td colSpan="2"></td>
              <td>Based on the above points (ii & iii),<strong> Schedule Weightage</strong> is derived using the formula: Schedule 
Completion / Actual Completion</td>
            </tr>
                        <tr>
              <td colSpan="2"></td>
              <td>On the basis of points (iv & v), <strong>Cost Weightage</strong> is derived using the formula: Budgeted Amount / 
Actual Amount</td>
            </tr>
                        <tr>
              <td colSpan="2"></td>
              <td>From the above, Schedule Weightage and Cost Weightage will be added to arrive at Total 
Weightage, based on which Milestones based Project Management Efficiency will be calculated </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default GuidelineBestManaged;