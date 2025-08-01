import React from "react";
import "../../styles/SidebarGuideline.css"; // Use your main guideline style

const GuidelineGreenHydrogen = () => {
  return (
    <div className="guideline-container">
      <h2>Evaluation Guidelines – Green Hydrogen Company of the Year</h2>
      <br></br>
      <p>
        <strong>Objective:</strong> Recognizes significant contributions toward promoting Green Hydrogen production and deployment.
      </p>
      <br></br>
      <p>
        <strong>Eligibility:</strong> Open to Indian energy companies with operations focused on Green Hydrogen. Only Indian investments and projects are considered.
      </p>

      {/* 1. Installed Capacity */}
      <h3>1. Installed Capacity of Green Hydrogen Production Units</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>1.1</td><td>Installed Capacity (MT)</td><td>Total production capacity of all operational facilities that produce green hydrogen</td></tr>
          <tr><td>1.2</td><td>Production of Green Hydrogen (MT)</td><td>Total green hydrogen produced in the assessment year</td></tr>
          <tr><td>1.3</td><td>Carbon emitted per unit (Tonne/Tonne)</td><td>Carbon released during production of one unit of green hydrogen</td></tr>
          <tr><td>1.4</td><td>Purity of Green Hydrogen Produced (%)</td><td>Concentration or percentage of H₂ in final output</td></tr>
          <tr><td>1.5</td><td>Cost of Production (INR / Tonne)</td><td>Expense incurred to produce one unit of Green Hydrogen</td></tr>
        </tbody>
      </table>

      {/* 2. Investment in GH2 */}
      <h3>2. Investment in Green Hydrogen</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>2.1</td><td>Investment in production/transportation/distribution/storage (INR Cr)</td><td>Includes investments across entire value chain</td></tr>
          <tr><td>2.2</td><td>Growth (%) in Investment</td><td>(Current yr – Previous yr)/ Previous yr × 100</td></tr>
        </tbody>
      </table>

      {/* 3. Electrolyser/Membrane Manufacturing */}
      <h3>3. Investment in Electrolyser/Membrane Manufacturing</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        
        <tbody>
          <tr><td>3.1</td><td>Investment (INR Cr)</td><td>Investment in electrolyser or membrane manufacturing plants</td></tr>
          <tr><td>3.2</td><td>Growth (%) in Investment</td><td>(Current yr – Previous yr)/ Previous yr × 100</td></tr>
        </tbody>
      </table>

      {/* 4. R&D */}
      <h3>4. R&D in Green Hydrogen Value Chain</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>4.1</td><td>Patents Filed (Nos.)</td><td>Number of patent applications officially submitted</td></tr>
          <tr><td>4.2</td><td>Patents Granted (National) (Nos.)</td><td>Granted by Indian patent authority</td></tr>
          <tr><td>4.3</td><td>Patents Granted (International) (Nos.)</td><td>Granted by global authorities</td></tr>
          <tr><td>4.4</td><td>Patents Commercialized (Nos.)</td><td>Patents that are implemented and generating value</td></tr>
        </tbody>
      </table>

      {/* 5. Upcoming Projects */}
      <h3>5. Upcoming Projects</h3>
      <table className="guideline-table">
                    <thead>
              <tr>
                <th>S.No</th>
                <th>Parameter</th>
                <th>Formula</th>
              </tr>
            </thead>
        <tbody>
          <tr><td>5.1</td><td>Project Name</td><td>Name of the upcoming project</td></tr>
          <tr><td>5.2</td><td>Location</td><td>Location of the facility/project</td></tr>
          <tr><td>5.3</td><td>Capacity (MT)</td><td>Production capacity of the new project</td></tr>
          <tr><td>5.4</td><td>Project Completion Year</td><td>Expected year of commissioning</td></tr>
          <tr><td>5.5</td><td>Current Status</td><td>Planning / Under Construction / Commissioned etc.</td></tr>
          <tr><td>5.6</td><td>Capacity per Year Schedule</td><td>(Project Completion Year - Current Year)/Capacity</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default GuidelineGreenHydrogen;
