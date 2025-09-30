import React from "react";
import "../../styles/SidebarGuideline.css"; // Use the existing Sidebar.css

const GuidelineCGD = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – CGD Company of the Year</h2>

      <br />
      <p>
        <strong>Objective:</strong> To recognize and honor the best-performing City Gas Distribution (CGD) company in India for excellence in infrastructure
        expansion, operational performance, customer service, safety, and overall impact in the CGD sector during the financial
        year 2024–25. </p>
      <br />
      <p>
        <strong>Eligibility Criteria:</strong>
      </p>
      <ul>
        <li>The award is open to all energy companies operating in India involved in City Gas Distribution (CGD). </li>
        <li>Participants must adhere to the FIPI Awards Scheme Terms & Conditions. </li>
        <li>Performance data is evaluated based on achievements in FY2024–25 compared to FY2023–24 and aligned against Minimum
          Work Programme (MWP) targets.</li>
      </ul>
      <br />
      <p>
        <strong>Key Formulas Used & Their Descriptions:</strong><br />
        The following performance parameters are evaluated quantitatively. Formulas implied or used across sheets as follows in seriatim:</p>

      <table className="guideline-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Criteria</th>
            <th>Formula Used / Basis of Score </th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td><strong>1</strong></td>
            <td colSpan="2"><strong>General information</strong></td>

          </tr>
          <tr>
            <td><strong>2</strong></td>
            <td colSpan="2"><strong>GA Specific Information</strong></td>

          </tr>
          <tr>
            <td>2.1</td>
            <td>Base date for evaluation</td>
            <td>Cut-off date for evaluation of achievements for this award category – 31.03.2025</td>
          </tr>
          <tr>
            <td>2.2</td>
            <td>
              Effective start of work date (Contract
              Year)</td>
            <td>Date of start of contract year as per the authorisation letter (Subsequent quarter from the date of
              authorisation)</td>
          </tr>
          <tr>
            <td>2.3</td>
            <td>Exclusivity Period - Exclusivity from the
              purview of common carrier or contract
              carrier</td>
            <td>Duration of  exclusivity from the purview of common carrier or contract carrier as per the
              authorisation letter </td>
          </tr>
          <tr>
            <td>2.4</td>
            <td>Force Majeure start date (if any) </td>
            <td>
              Force majeure accepted by PNGRB, if any – Start date </td>
            {/*  */}
          </tr>
          <tr>
            <td>2.5</td>
            <td>Force Majeure end date (if any) (Note: if
              FM extension has been provided more
              than once, please provide data for all of
              them) </td>
            <td>End date of Force majeure. Please note that if FM extension has been accepted by PNGRB for
              more than once, please provide dates for the subsequent FM extensions too </td>
          </tr>
          {/* Section 2: Installed Capacity & Growth */}
          <tr>
            <td colSpan="2"></td>
            <td><strong>
              The above information is used to calculate the effective work age of the company for each
              GA</strong></td>

          </tr>
          <tr>
            <td><strong>3</strong></td>
            <td colSpan="2"><strong>CNG Stations Added</strong></td>

          </tr>
          <tr>
            <td>3.1</td>
            <td>Total MWP Target</td>
            <td>Cumulative D-PNG connections target assigned by PNGRB for the entire MWP period</td>
          </tr>


          <tr>
            <td>3.2</td>
            <td>Pro-rated MWP Target (Total PNG
              connections expected based on pro-rata
              schedule) </td>
            <td>
              Year-wise PNG connections target as per PNGRB’s pro-rata schedule </td>
          </tr>
          <tr>
            <td>3.3</td>
            <td>Actual PNG connections achieved</td>
            <td>Number of D-PNG connections achieved as on 31.03.2025, as reported to PNGRB</td>
          </tr>
          <tr>
            <td>3.4</td>
            <td>
              Number of Billed connections in 2024-
              25 as reported to PNGRB </td>
            <td>Number of connections billed in 2024-25. Provide cumulative number.</td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td><strong>The above information is used to calculate the following :</strong>
              <br />
              <br />
              1.<strong>Percentage of D-PNG target achieved as on 31.03.2025</strong>-Calculated with respect to pro rata
              MWP target as on 31.03.2025, or with respect to total MWP target in case exclusivity period is
              complete. This gives the absolute performance of the company for each GA for D-PNG.
              <br />
              <br />
              2.<strong>Weighted average effective age of the company</strong>- Weighted Average Effective Age is
              calculated as the weighted mean of each GA’s effective work age (after FM adjustments), using
              actual DPNG achievements as weights, and is used in age-normalised growth scoring to fairly
              compare established companies and newer entrants.
              <br />
              <br />
              3. <strong>Year-on-Year growth percentage</strong>,calculated by comparing the cumulative number of
              connections achieved in 2024-25 vs. 2023-24. This is used to calculate the <strong>Age-Normalised
                growth score</strong> for each company. The Age-Normalised Growth Score adjusts a company’s YoY
              growth by its weighted average effective work age, enabling fair comparison between established
              companies and newer entrants.<br /><br />
              4.<strong>Billed connections efficiency score </strong>-The Billed Connection Efficiency Score evaluates how
              effectively a company converts total PNG connections into active billed consumers.
            </td>
          </tr>

          {/* Section 4: Safety */}
          <tr>
            <td><strong>4</strong></td>
            <td colSpan="2"><strong>
              CNG Stations </strong></td>

          </tr>
          <tr>
            <td>4.1</td>
            <td>
              Total MWP Target </td>
            <td>Cumulative number of CNG station target assigned by PNGRB for the entire MWP period. For
              GAs with no CNG station target as per the authorisation letter, enter the value as 0. </td>
          </tr>
          <tr>
            <td>4.2</td>
            <td>Pro-rated MWP Target</td>
            <td>Year-wise number of CNG station target as per PNGRB’s pro-rata schedule </td>
          </tr>
          <tr>
            <td>4.3</td>
            <td>Actual no. of CNG stations achieved</td>
            <td>Number of CNG stations established as on 31.03.2025, as reported to PNGRB </td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td><strong>The above information is used to calculate the following :</strong>
              <br /><br />
              1.<strong>Percentage of CNG station target achieved as on 31.03.2025</strong>-
              Calculated with respect to
              pro rata MWP target as on 31.03.2025, or with respect to total MWP target in case exclusivity
              period is complete. This gives the absolute performance of the company for each GA for number
              of CNG stations.
              <br /><br />
              2.<strong>Weighted average effective age of the company</strong>-Weighted Average Effective Age is
              calculated as the weighted mean of each GA’s effective work age (after FM adjustments), using
              actual number of CNG stations established as weights, and is used in age-normalised growth
              scoring to fairly compare established companies and newer entrants.
              <br /><br />
              3.<strong>Year-on-Year growth percentage</strong>, calculated by comparing the cumulative number of CNG
              stations established in 2024-25 vs. 2023-24. This is used to calculate the Age-Normalised
              growth score for each company. The <strong>Age-Normalised Growth Score</strong> adjusts a company’s YoY
              growth by its weighted average effective work age, enabling fair comparison between established
              companies and newer entrants.<br /><br />
              4.<strong>MWP-Normalised Rollout efficiency</strong>-The MWP-Normalised Rollout Efficiency measures
              how efficiently a company commissions CNG stations each year relative to its total MWP target
              and is calculated by dividing the total CNG stations achieved by the total MWP target, dividing
              the result by the number of years elapsed, and multiplying by 100. </td>
          </tr>
          <tr>
            <td><strrong>5</strrong></td>
            <td colSpan="2"><strong>
              Inch-km of Pipeline laid (Steel + MDPE) </strong></td>

          </tr>
          <tr>
            <td>5.1</td>
            <td>
              Total MWP Target </td>
            <td>Cumulative inch-km of pipeline (steel + MDPE) assigned by PNGRB for the entire MWP period.
              Consider the targets given in the authorisation letter. For GAs with no inch-km target, enter the
              value as 0; for GAs with only inch-km of steel pipeline target, enter the value as assigned in the authorisation letter.  </td>
          </tr>
          <tr>
            <td>5.2</td>
            <td>Pro-rated MWP Target </td>
            <td>Year-wise inch-km of pipeline target as per PNGRB’s pro-rata schedule</td>
          </tr>
          <tr>
            <td>5.3</td>
            <td>Actual inch-km of steel+ MDPE
              pipeline laid </td>
            <td>
              Inch-km of pipeline achieved as on 31.03.2025, as reported to PNGRB </td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td><strong>The above information is used to calculate the following :</strong><br /> <br />
              1.<strong>Percentage of inch-km of pipeline laid as on 31.03.2025</strong>-Calculated with respect to pro rata
              MWP target as on 31.03.2025, or with respect to total MWP target in case exclusivity period is
              complete. This gives the absolute performance of the company for each GA for inch-km of
              pipeline laid. <br /><br />
              2.<strong>Weighted average effective age of the company</strong>- Weighted Average Effective Age is
              calculated as the weighted mean of each GA’s effective work age (after FM adjustments), using
              actual inch-km of pipeline laid as weights, and is used in age-normalised growth scoring to fairly
              compare established companies and newer entrants.<br /><br />
              3.<strong>Year-on-Year growth percentage</strong>,calculated by comparing the cumulative length of inch-km
              of pipeline laid in 2024-25 vs. 2023-24. This is used to calculate the <strong>Age-Normalised growth
                score</strong> for each company. The Age-Normalised Growth Score adjusts a company’s YoY growth by
              its weighted average effective work age, enabling fair comparison between established companies
              and newer entrants.<br /><br />
              4.<strong>MWP-Normalised Rollout efficiency</strong>- The MWP-Normalised Rollout Efficiency for Inch-
              km of Pipeline Laid measures how efficiently a company lays pipelines each year relative to its
              total MWP target and is calculated by dividing the total inch-km of pipeline laid by the total
              MWP target, dividing the result by the number of years elapsed, and multiplying by 100, </td>

          </tr>
          <tr>
            <td><strong>6</strong></td>
            <td colSpan="2"><strong>Natural Gas Sales & CBG Intake</strong></td>

          </tr>
          <tr>
            <td>6.1</td>
            <td>PNG Sales Volume </td>
            <td>Total volume of natural gas sold in (D-PNG + industrial + commercial) segment in a GA.</td>
          </tr>
          <tr>
            <td>6.2</td>
            <td>CNG Sales Volume </td>
            <td>Total volume of natural gas sold through CNG stations in a GA. </td>
          </tr>
          <tr>
            <td>6.3</td>
            <td>CBG intake in CGD network</td>
            <td>This information is used to calculate the percentage of CBG usage in a CGD network. </td>
          </tr>
          <tr>
            <td>7</td>
            <td colSpan="2"><strong>Safety</strong></td>

          </tr>
          <tr>
            <td>7.1</td>
            <td>Number of Fatalities</td>
            <td>No. of Fatalities means the number of deaths that have occurred due to a specific incident,
              accident or disaster within a defined reporting period</td>
          </tr>
          <tr>
            <td>7.2</td>
            <td>Total hours worked </td>
            <td>Total Man Hours Worked (Own Employees + contractual) means the sum of all hours actually
              worked by them during a given period.</td>
          </tr>
          <tr>
            <td>7.3</td>
            <td>Lost Time Injuries</td>
            <td>No. of Lost Time Injuries (LTI) means the number of work-related injuries or illnesses that result
              in an employee being unable to perform their regular job duties after the incident. </td>
          </tr>
          <tr>
            <td>7.4</td>
            <td>Total Recordable Incident Rate </td>
            <td>No. of OSHA recordable incidents refers to the count of work-related injuries or illnesses that
              must be reported under the Occupational Safety and Health Administration guidelines.</td>
          </tr>
          <tr>
            <td>7.5</td>
            <td>Number of safety audits conducted in
              2024-25 </td>
            <td>No. of safety audits conducted by the company in a GA</td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td><strong>
              The above information is used to calculate the following :  </strong><br /><br />
              1.<strong>Fatal Accident Rate (FAR)</strong>,derived using the formula: [(No. of Fatalities x 10,00,00,000) /
              Total manhours worked in reporting period].<br /><br />
              2.<strong> Lost Time Injury Frequency (LTIF)</strong>,derived using the formula: [(No. lost time injuries in
              reporting period x 10,00,000) / Total manhours worked in reporting period].<br /><br />
              3.<strong>Total Recordable Incident rate (TRIR)</strong>,derived using the formula: [(No. of OSHA
              recordable incidents x 2,00,000) / Total manhours worked in reporting period]. <br /><br />
              4. <strong>Safety</strong> audit score based on number of audits conducted.
            </td>
          </tr>


        </tbody>
      </table>


    </div>
  );
};

export default GuidelineCGD;