import React from "react";
import "../../styles/Guidelinecss/GuidelineExploration.css";

const GuidelineExploration = () => {
  return (
    <div className="guidelinee-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Exploration Company of the Year</h2>

      <br></br>
      <p>
        <strong>Objective:</strong><br/><ul><li> Exploration Company of the Year award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024–25.</li></ul>
      </p>
      <br></br>
      <p>
        <strong>Eligibility:</strong><br/> <ul><li> The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.</li>
        <li>Only 1 nomination from an organization duly endorsed by concerned Director / Board Level Executive would be considered</li>
        </ul> 
      </p>
      <p>
        <br></br>
      <strong>Note:</strong><br/>
      <ul><li>Only 1 nomination from an organization duly endorsed by concerned Director / Board Level Executive would be considered.</li></ul> 
</p>
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
            <td >1</td>
            <td>2P oil reserves accretion (MMT) </td>
            <td>2P oil reserve accretion by a company during the year
              <br />
              <br />
              Based on the above values, 2P oil reserve accretion growth is derived using the formula: [(Current
              year – Previous year) / Previous year] × 100
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>2P gas reserves accretion in (BCM) </td>
            <td>2P gas reserve accretion by a company during the year
              <br />
              <br />
              Based on the above values, 2P gas reserve accretion growth is derived using the formula: [(Current
              year – Previous year) / Previous year] × 100
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Total Reserves Accreted (MTOE) </td>
            <td>
              Refers to increase in organization’s reserve during the year</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Finding Cost (INR Million)</td>
            <td>Cost of finding oil and gas reserves added via exploration drilling activities, exclusive of land
              acquisition cost</td>
          </tr>
          <tr>
            <td colspan="2"></td>

            <td>Based on point (3&4), Finding cost (INR/MTOE) is calculated using the formula: [(Total cost
              incurred (INR)/ Reserves added (oil + oil eq. gas reserves) (MTOE))] in the particular year.</td>
          </tr>

          {/* Section 2 */}
          <tr>
            <td colspan="2"></td>
            <td>Further, Improvement in finding cost is Calculated as: Finding Cost of Previous Year / Finding Cost
              of Assessment Year</td>

          </tr>
          <tr>
            <td>5</td>
            <td>Total Number of exploratory wells drilled</td>
            <td>The wells completed in the financial year (Absolute Number)</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Number of Hydrocarbon Bearing wells</td>
            <td>The wells completed in the financial year and has confirmed presence of HC after proper testing
              (Absolute Number)</td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td>Based on point (5&6), Exploration Success Rate is calculated using the formula: (Number of
              Hydrocarbon bearing wells in year / Total Number of exploratory well drilled in year)</td>

          </tr>

          {/* Section 3 */}
          <tr>
            <td>7</td>
            <td>Seismic Activities - 2D LKM </td>
            <td>Refers to the total length (in kilometers) of 2D seismic survey lines acquired </td>
          </tr>
          <tr>
            <td>8</td>
            <td>Seismic Activities - 3D SKM </td>
            <td>Refers to the total surface area (in square kilometers) over which 3D seismic data is collected </td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td>Based on point (7&8), Total seismic activity in year is calculated using the formula: [(2D/7) + (3D)].
              Note: Seven LKM of 2D data is considered equivalent to 1 SKM of 3D data </td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td>Further, Growth in seismic activity is calculated using the formula: [Total seismic activity in current
              year / Total seismic activity in previous year] </td>
          </tr>

          {/* Section 4 */}
          <tr>
            <td>9</td>
            <td>Total Energy Consumed in Exploration (GJ) </td>
            <td>Total Energy = All forms of energy [Electricity (Import and Captive) + Consumption of HSD, ATF, Fuel
              oil, Petrol, Gas, Renewable energy etc.] as consumed in the exploration activities.
              <br />
              <br />
              In case the segregated energy consumption data for exploration activities of the company is not
              available, the total energy consumption of the company can be apportioned in the ratio of Capex
              plus Opex for exploration against total Capex + Opex of the company.
              <br />
              <br />
              <strong>Note:</strong><br/>
                    1. If the value for point 9 is available, please do not fill in the values for point 9.1 to 9.5<br/>
                    2. If the value for point 9 is not available, please fill in the values for points 9.1 to 9.5 <br/>
                
                
                
            </td>
          </tr>
          <tr>
            <td>9.1</td>
            <td>Total Energy Consumed by the Company (GJ) </td>
            <td>Refers to the aggregate amount of energy used by an organization during the period </td>
          </tr>
          <tr>
            <td>9.2</td>
            <td>Total Capex of the Company (INR Crore) </td>
            <td>Refers to the total capital expenditure incurred by a company during the period</td>
          </tr>
          <tr>
            <td>9.3</td>
            <td>Total Opex of the Company (INR Crore)</td>
            <td>Refers to the total operating expenditure incurred by a company during the period </td>
          </tr>
          <tr>
            <td>9.4</td>
            <td>Capex for Exploration (INR Crore)</td>
            <td>Refers to the capital expenditure incurred specifically on exploration activities during the period </td>
          </tr>

          <tr>
            <td>9.5</td>
            <td>Opex for Exploration (INR Crore) </td>
            <td>Refers to the operating expenditure incurred in carrying out exploration activities during the period </td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td>Based on the above values, Energy Consumed per MTOE of Reserve Accretion is calculated using
              the formula: [Total Energy Consumed in Exploration in year / Total Oil & Gas reserves accretion
              (MTOE) in year] </td>

          </tr>
          <tr>
            <td>10</td>
            <td>Number of Exploratory Blocks Acquired -
              Standalone (Absolute Number) </td>
            <td>Number of exploratory blocks awarded to the company on standalone basis </td>
          </tr>

          {/* Section 6 */}
          <tr>
            <td>11</td>
            <td>Number of Exploratory Blocks Acquired -
              Partnership (Absolute Number)</td>
            <td>Number of exploratory blocks awarded to the company on partnership basis </td>
          </tr>
          <tr>
            <td ><strong>12</strong></td>
            <td colspan="2"><strong>New Technologies Adopted</strong></td>
          </tr>
          <tr>
            <td>i</td>
            <td>Technology Name</td>
            <td>The name of the technology which has been adopted / applied in the financial year for the first
              time by the company for exploration activities </td>
          </tr>

          {/* Section 7 */}
          <tr>
            <td>ii</td>
            <td>
              Technology Provider Name</td>
            <td>Name</td>
          </tr>
          <tr>
            <td>iii</td>
            <td>Cost incurred for the Technology (INR Crores) </td>
            <td>Cost incurred for the Technology means the cost of acquisition of the technology and its
              implementation cost.</td>
          </tr>
          <tr>
            <td>iv</td>
            <td>Areas of Impact </td>
            <td>Areas of impact includes improvement in following areas: <br />
            <br/>
              1.	Productivity<br />
              2.	Cost Effectiveness<br />
              3.	Environmental Gain<br />
              4.	Safety<br />
              5.	Others
            </td>
          </tr>

        </tbody>
      </table>

      <p className="notes">
        <strong>Notes:</strong><br />
        a. INR/USD as on 31.03.2025: 85.424<br />
        b. 1 Tonne of oil = 7.5 bbl<br />
        c. MTOE: Million Tonne Oil Equivalent. 1 BCM gas = 1 MMT of Oil<br/>
        d. If the value for point 9 is available, please do not fill in the values for 9.1 to 9.5<br/>
        e. If the value for point 9 is not available, please fill in the values for points 9.1 to 9.5  
      </p>
    </div>
  );
};

export default GuidelineExploration;
