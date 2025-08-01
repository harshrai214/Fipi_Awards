import React from "react";
import "../../styles/Guidelinecss/GuidelineExploration.css";

const GuidelineExploration = () => {
  return (
    <div className="guidelinee-container">
      <h2>Evaluation Guidelines – Exploration Company of the Year</h2>
  <br></br>
      <p>
        <strong>Objective:</strong> Exploration Company of the Year award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024–25.
      </p>
    <br></br>
      <p>
        <strong>Eligibility:</strong> The award is open to Indian Companies who are engaged in Exploration of Oil & Gas in India as an Operator.
      </p>

      <table className="guidelinee-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>S.No</th>
            <th>Parameter</th>
            <th>Formula</th>
          </tr>
        </thead>
        <tbody>
          {/* Section 1 */}
          <tr><td>1. Oil & Gas Reserves Accretion</td><td>1.1</td><td>2P oil reserves accretion (MMT)</td><td colSpan={"5"}>Absolute Value in Million Tonne</td></tr>
          <tr><td></td><td>1.2</td><td>2P oil reserve accretion growth (%)</td><td>(Current yr – Previous yr)/ Previous yr X 100</td></tr>
          <tr><td></td><td>1.3</td><td>2P gas reserves accretion (BCM)</td><td>Absolute Value in Billion Cubic Metre</td></tr>
          <tr><td></td><td>1.4</td><td>2P gas reserves accretion growth (%)</td><td>(Current yr – Previous yr)/ Previous yr X 100</td></tr>

          {/* Section 2 */}
          <tr><td>2. Finding Cost and its Improvement</td><td>2.1</td><td>Finding Cost (INR/MTOE)</td><td>Total cost incurred / reserves added (in MTOE)</td></tr>
          <tr><td></td><td>2.2</td><td>Total Reserves Accreted (MTOE)</td><td>2P oil + 2P gas reserves in MTOE</td></tr>
          <tr><td></td><td>2.3</td><td>Improvement in finding cost</td><td>Finding Cost of Previous Year / Current Year</td></tr>

          {/* Section 3 */}
          <tr><td>3. Exploratory Wells & Exploration Success Rate</td><td>3.1</td><td>Exploratory wells drilled</td><td>Absolute Number (completed in financial year)</td></tr>
          <tr><td></td><td>3.2</td><td>Hydrocarbon Bearing wells</td><td>Confirmed presence of HC after testing</td></tr>
          <tr><td></td><td>3.3</td><td>Exploration Success Rate</td><td>No. of HC wells / total exploratory wells</td></tr>

          {/* Section 4 */}
          <tr><td>4. Seismic Activities</td><td>4.1</td><td>2D LKM</td><td>Absolute Number in LKM</td></tr>
          <tr><td></td><td>4.2</td><td>3D SKM</td><td>Absolute Number in SKM</td></tr>
          <tr><td></td><td>4.3</td><td>Total seismic activity</td><td>(2D / 7) + (3D)</td></tr>
          <tr><td></td><td>4.4</td><td>Growth in seismic activity</td><td>Current year / Previous year</td></tr>

          {/* Section 5 */}
          <tr><td>5. Energy Efficiency in Reserve Accretion</td><td>5.1</td><td>Total Energy Consumed in Exploration (GJ)</td><td>Electricity + Fuel + Renewable Energy etc.</td></tr>
          <tr><td></td><td>5.2</td><td>Energy Consumed per MTOE</td><td>Total Energy Consumed / Total Reserve Accretion (MTOE)</td></tr>

          {/* Section 6 */}
          <tr><td>6. Exploratory Blocks Acquired</td><td>6.1</td><td>Standalone</td><td>Number of blocks awarded on standalone basis</td></tr>
          <tr><td></td><td>6.2</td><td>Partnership</td><td>Number of blocks awarded on partnership basis</td></tr>

          {/* Section 7 */}
          <tr><td>7. New Technologies Adopted</td><td>7.1</td><td>Technology Name</td><td>Name of the technology adopted for first time</td></tr>
          <tr><td></td><td>7.2</td><td>Technology Provider</td><td>Name of the provider</td></tr>
          <tr><td></td><td>7.3</td><td>Cost incurred (INR Cr.)</td><td>Cost for acquisition + implementation</td></tr>
          <tr><td></td><td>7.4</td><td>Areas of Impact</td><td>Productivity, Cost Effectiveness, Environmental Gain, Safety, Others</td></tr>
        </tbody>
      </table>

      <p className="notes">
        <strong>Notes:</strong><br />
        a. INR/USD as on 31.03.2025: 85.424<br />
        b. 1 Tonne of oil = 7.5 bbl<br />
        c. MTOE: Million Tonne Oil Equivalent. 1 BCM gas = 1 MMT of Oil
      </p>
    </div>
  );
};

export default GuidelineExploration;
