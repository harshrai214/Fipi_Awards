import React from "react";
import "../../styles/SidebarGuideline.css"; // Make sure this file exists or adjust path

const GuidelineOilmarketing = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Oil Marketing Company of the Year</h2>
      <br />
      <p>
        <strong>Objective:</strong> - Oil Marketing Company of the Year recognizes leadership and excellence in marketing and retailing of petroleum products (non-polymer hydrocarbons).
      </p>
      <br />
      <p>
        <strong>Eligibility Criteria:</strong>
        <ul><li>The award is open to all oil marketing and retailing companies operating in India</li>
        <li></li>
        </ul>
      </p>



      <div className="guideline-table-container">
        <table className="guideline-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Criteria</th>
              <th>Formula / Evaluation Method</th>
            </tr>
          </thead>
          <tbody>
            {/* Section 1: Revenue Performance */}
            <tr>
              <td><strong>1</strong></td>
              <td> <strong>Revenue from Sales (Domestic Sales +
                Export)</strong></td>
              <td>Total sale volume (MMT) and revenue generated (INR crore) from the sale of
                petroleum products  </td>
            </tr>
            {/* Section 2: Sales Growth */}
            <tr>
              <td><strong>2</strong></td>
              <td><strong>Domestic market share (Only liquid
                product sales excluding Petrochemicals
                and Gas) </strong></td>
              <td>Percentage share of total liquid petroleum product sales (excluding
                petrochemicals and gas) in the Indian market </td>
            </tr>
            <tr>
              <td><strong>3</strong></td>
              <td><strong>Retail Sales (MMT) (MS + HSD) </strong></td>
              <td>Total volume of petroleum products sold through retail outlets; used to
                evaluate year-on-year growth in retail performance</td>
            </tr>
            <tr>
              <td>4</td>
              <td colSpan="2"><strong>
                No. of Retail Outlets</strong></td>

            </tr>
            <tr>
              <td><strong>5</strong></td>
              <td><strong>Sales per Employee</strong>(Only Marketing function
                employees on the rolls of organisation) </td>
              <td>Total Sales / No. of Employees </td>
            </tr>

            {/* Section 3: Retail & Employee Metrics */}
            <tr>
              <td><strong>6</strong></td>
              <td><strong>Sale of Lubricants as % of Fuel sales (MS + HSD) </strong></td>
              <td>
                Sales of Lubricants / Sales of Fuels X 100 </td>
            </tr>
            <tr>
              <td><strong>7</strong></td>
              <td colSpan="2"><strong>Increase in Tankage Capacity</strong></td>

            </tr>
            <tr>
              <td>7.1</td>
              <td>Increase in MS</td>
              <td>(Current yr – Previous yr)/ Previous yr X 100</td>
            </tr>

            {/* Section 7: Tankage Capacity Increase */}
            <tr>
              <td>7.2</td>
              <td>Increase in HSD</td>
              <td>(Current yr – Previous yr)/ Previous yr X 100</td>
            </tr>
            <tr>
              <td>7.3</td>
              <td>Increase in Ethanol </td>
              <td>(Current yr – Previous yr)/ Previous yr X 100 </td>
            </tr>
            <tr>
              <td><strong>8</strong></td>
              <td colSpan="2"><strong>
                Digital Initiative</strong></td>

            </tr>
            <tr>
              <td>8.1</td>
              <td>Automated retail outlets as % of total retail
                outlets</td>
              <td>Total Automated Ros / Total Ros X 100 </td>
            </tr>

            {/* Section 8: Digital Initiatives */}
            <tr>
              <td>8.2</td>
              <td>Non-Cash sales as % of Total sales </td>
              <td>Total non-cash sales / Total sales X 100 </td>
            </tr>
            <tr>
              <td>8.3</td>
              <td>GPS enabled vehicle management system as % of
                total vehicles </td>
              <td>GPS enabled trucks / Total no. of trucks X 100 </td>
            </tr>



            <tr>
              <td><strong>9</strong></td>
              <td colSpan="2"><strong>Improvement in customer complaints redressal </strong></td>

            </tr>
            <tr>
              <td>9.1</td>
              <td>No of Complaints </td>
              <td>(Current yr – Previous yr)/ Previous yr X 100 </td>
            </tr>

            {/* Section 6: Customer Complaint Handling */}
            <tr>
              <td>9.2</td>
              <td>Average customer complaint turn-around time (No. of days)</td>
              <td>(Current yr – Previous yr)/ Previous yr X 100 </td>
            </tr>
            <tr>
              <td><strong>10</strong></td>
              <td colSpan="2"><strong>
                New Energy Based facilities-EV/H2/CBG added
                in the RO </strong></td>

            </tr>
            <tr>
              <td>10.1.1</td>
              <td>EVs Fast charging station in the assessment year </td>
              <td>Number of Fast Charging station </td>
            </tr>

            {/* Section 7: New Energy Facilities at Retail Outlets */}
            <tr>
              <td>10.1.2</td>
              <td>Increase in EVs Fast charging station </td>
              <td>(Current yr – Previous yr)/ Previous yr X 100 </td>
            </tr>
            <tr>
              <td>10.2.1</td>
              <td>EVs Fast charging station in the assessment year</td>
              <td>Number of H2 dispensing station</td>
            </tr>
            <tr>
              <td>10.2.2</td>
              <td>Increase in H2 dispensing station </td>
              <td>(Current yr – Previous yr)/ Previous yr X 100</td>
            </tr>
            <tr>
              <td>10.3.1</td>
              <td>CBG sales through Ros in the assessment year </td>
              <td>CBG sales in MT</td>
            </tr>
            <tr>
              <td>10.2.2</td>
              <td>Increase in H2 dispensing station</td>
              <td>(Current yr – Previous yr) / Previous yr X 100</td>
            </tr>
            <tr>
              <td>10.3.1</td>
              <td>CBG sales through Ros in the assessment year</td>
              <td>CBG sales in MT</td>
            </tr>
            <tr>
              <td>10.3.2</td>
              <td>Increase in CBG sales through Ros</td>
              <td>CBG sales in MT</td>
            </tr>

            {/* Section 11: PMUY & Biofuel Investment */}
            <tr>
              <td><strong>11</strong></td>
              <td colSpan="2"><strong>LPG - per capita consumption of PMUY
                customers </strong></td>
              <td></td>
            </tr>
            <tr>
              <td>11.1</td>
              <td>
                PMUY customers in the assessment year</td>
              <td>Number of PMUY customers</td>
            </tr>
            <tr>
              <td>11.2</td>
              <td>L PG - per capita consumption of PMUY
                customers </td>
              <td>Current yr / Previous yr X 100 </td>
            </tr>
            <tr>
              <td><strong>12</strong></td>
              <td><strong>Investment in Biofuels (% of total capex) </strong></td>
              <td><strong>Actual Investment in biofuels / Total Capex of the company  X 100 </strong></td>
            </tr>

            {/* Section 9: Ethanol Programme & Safety */}
            <tr>
              <td><strong>13</strong></td>
              <td><strong>Progress in Ethanol blending programme </strong></td>
              <td>Actual Ethanol blending / Ethanol blending Target </td>
            </tr>
            <tr>
              <td><strong>14</strong></td>
              <td><strong>Fatal Accident Rate</strong></td>
              <td>(No. of Fatalities x 10,00,00,000) / Total manhours worked in reporting period</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default GuidelineOilmarketing;