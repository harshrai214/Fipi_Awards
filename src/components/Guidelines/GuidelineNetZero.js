import React from "react";
import "../../styles/SidebarGuideline.css"; // Use your shared guideline styles

const GuidelineNetZero = () => {
  return (
    <div className="guideline-container">
      <h2>Evaluation Guidelines – Goal Net Zero Company of the Year</h2>
      <br></br>
      <p>
        <strong>Objective:</strong> Recognizes the most effective company in reducing carbon footprint and improving energy efficiency.
      </p>
      <br></br>
      <p>
        <strong>Eligibility:</strong>
        <ul>
          <li>Open to all energy companies operating in India.</li>
          <li>Only data related to Indian operations (capital, R&D, patents, etc.) is considered.</li>
          <li>Overseas investments/projects are excluded from evaluation.</li>
        </ul>
      </p>

      {/* 1. Net Zero (Scope I & II) */}
      <h3>1. Net Zero (Scope – I & II)</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>1.1</td><td>Net Zero – Target Year</td><td>The target year as announced by the Company</td></tr>
          <tr><td>1.2</td><td>Major activities planned (2024-25)</td><td></td></tr>
          <tr><td>1.2.1</td><td>Activity Name (All 5)</td><td></td></tr>
          <tr><td>1.2.2</td><td>Planned Activities</td><td></td></tr>
          <tr><td>1.2.3</td><td>Actual Progress</td><td></td></tr>
        </tbody>
      </table>

      {/* 2. Carbon Emissions */}
      <h3>2. Total Carbon Emitted (Scope – I & II)</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>2.1</td><td>Carbon Emitted (tCO2e)</td><td>Total carbon emitted in the assessment year</td></tr>
          <tr><td>2.2</td><td>Reduction in Carbon Emission (%)</td><td>(Current yr – Previous yr)/ Previous yr × 100</td></tr>
        </tbody>
      </table>

      {/* 3. Energy Efficiency */}
      <h3>3. Energy Efficiency</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>3.1</td><td>Total Energy Consumed (GJ)</td><td>Sum of all energy types consumed</td></tr>
          <tr><td>3.2</td><td>Annual Revenue (INR Crores)</td><td>As per Annual Report</td></tr>
          <tr><td>3.3</td><td>Energy Consumed per INR Crore</td><td>Total Energy / Annual Revenue</td></tr>
          <tr><td>3.4</td><td>Reduction in Energy Consumption (%)</td><td>(Current yr – Previous yr)/ Previous yr × 100</td></tr>
        </tbody>
      </table>

      {/* 4. Renewable Energy */}
      <h3>4. Renewable Energy Generation</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>4.1</td><td>Capex for Wind Energy (INR Cr)</td><td>Investment in wind projects</td></tr>
          <tr><td>4.2</td><td>Capex for Solar Energy (INR Cr)</td><td>Investment in solar projects</td></tr>
          <tr><td>4.3</td><td>Capex for Other RE (INR Cr)</td><td>Investment in other renewable projects</td></tr>
          <tr><td>4.4</td><td>Total Capex for RE (INR Cr)</td><td>Total of 4.1 to 4.3</td></tr>
          <tr><td>4.5</td><td>Total RE Production</td><td>Absolute Value (MW)</td></tr>
          <tr><td>4.6</td><td>% Growth in RE Production</td><td>(Current yr – Previous yr)/ Previous yr × 100</td></tr>
          <tr><td>4.7</td><td>Total Power Consumption (MW)</td><td>Import + Captive – Export</td></tr>
          <tr><td>4.8</td><td>% RE of Total Power</td><td>RE Produced / Total Power Consumed</td></tr>
        </tbody>
      </table>

      {/* 5. Green Hydrogen */}
      <h3>5. Green Hydrogen Production</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>5.1</td><td>Investment in GH2 (INR Cr)</td><td>Includes production, storage, distribution</td></tr>
          <tr><td>5.2</td><td>GH2 Production (MT)</td><td>Total Green Hydrogen produced</td></tr>
        </tbody>
      </table>

      {/* 6. Tree Plantation */}
      <h3>6. Tree Plantation</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>6.1</td><td>Number of Trees Planted</td><td>Total trees planted during the year</td></tr>
        </tbody>
      </table>

      {/* 7. Carbon Capture */}
      <h3>7. Carbon Capture Initiatives</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>7.1</td><td>Capex for CCS/CCUS (INR Cr)</td><td>Investment in CCS/CCUS projects</td></tr>
          <tr><td>7.2</td><td>Carbon Captured (FY 25) (MT)</td><td>Total carbon captured</td></tr>
        </tbody>
      </table>

      {/* Notes */}
      <p className="notes">
        <strong>Notes:</strong><br />
        • Total Energy Consumption (GJ) = Electricity (Import + Captive – Export) + HSD, ATF, Fuel oil, Petrol, Gas<br />
        • Total Power Consumption (MW) = Total Electricity (Import + Captive – Export)
      </p>
    </div>
  );
};

export default GuidelineNetZero;
