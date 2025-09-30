import React from "react";
import "../../styles/SidebarGuideline.css"; // Use your main guideline style

const GuidelineGreenHydrogen = () => {
  return (
    <div className="guideline-container">
      <h2>Evaluation Guidelines – Green Hydrogen Company of the Year</h2>
      <br />
      <p>
        <strong>Objective:</strong> This award recognizes the significant contributions towards the initiatives in promoting Green Hydrogen.
      </p>
      <br />
      <p>
        <strong>Eligibility:</strong> The award is open to all Energy Companies operating in India. The information related to Capital Investments, installed capacities, R&D centres, Patents etc. should pertain to works carried out in India. Any overseas investments and projects will not be considered for evaluation.
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
              <th>Description/ Formula</th>
            </tr>
          </thead>
          <tbody>
            {/* Section 1: Installed Capacity of Green Hydrogen Production Units */}
            <tr>
              <td>1</td>
              <td>Installed Capacity of Green hydrogen production units (MT)</td>
              <td>Total production capacity of all operational facilities that produce
                green hydrogen in the particular year </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Production of Green hydrogen (MT) </td>
              <td>Total green hydrogen produced in the particular year</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Carbon emitted per unit of Green Hydrogen Production (Tonne / Tonne) </td>
              <td>Refers to the amount of carbon released during the production of
                one unit of green hydrogen </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                Purity of Green Hydrogen Produced (%) </td>
              <td>Refers to the concentration or percentage of hydrogen (H₂) in the
                final gas output </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Cost of Production (INR / Tonne) </td>
              <td>
                Total expense incurred to produce one unit of Green Hydrogen</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Patents filed (Nos.)</td>
              <td>Number of patent applications officially submitted </td>
            </tr>

            {/* Section 2: Investment in Green Hydrogen */}
            <tr>
              <td>7</td>
              <td>Total Patents Granted (National) (Nos.)</td>
              <td>Number of patents that have been officially issued by a country’s
                patent office </td>
            </tr>
            <tr>
              <td>8</td>
              <td>Total Patents Granted (International) (Nos.) </td>
              <td>Number of patents that have been legally issued by foreign or
                international patent offices </td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                Patents Commercialized (Nos.)</td>
              <td>Number of patents that are being used commercially </td>
            </tr>

            {/* Section 3: Investment in Electrolyser/Membrane Manufacturing */}
            <tr>
              <td>10</td>
              <td>Investment in Green Hydrogen
              
                production/transportation/distribution/storage (INR Crore)
              </td>
              <td>Investment in Green Hydrogen Activities including Production,
                Transportation, Distribution and Storage
                <br />
                <br />
                Based on the above values, growth in the investment in the Green
                Hydrogen Activities is calculated using the formula: (Current yr –
                Previous yr)/ Previous yr X 100
              </td>
            </tr>
            <tr>
              <td>11</td>
              <td>Investment in Electrolyser/ Membrane Manufacturing (INR / Crore)</td>
              <td>Refers to investment in Electrolyser / Membrane Manufacturing
                <br />
                <br />
                Based on the above values, growth in the investment in the
                Electrolyser / Membrane Manufacturing Green Hydrogen
                Activities is calculated using the formula: (Current yr – Previous
                yr)/ Previous yr X 100
              </td>
            </tr>
            <tr>
              <td>12</td>
              <td colSpan="2">
                Upcoming Projects
                  
                </td>
              {/* <td></td> */}
            </tr>

            {/* Section 4: R&D in Green Hydrogen Value Chain */}
            <tr>
              <td>i</td>
              <td>Project Name </td>
              <td>Name of the Project </td>
            </tr>
            <tr>
              <td>ii</td>
              <td>Location </td>
              <td>Location of the Project </td>
            </tr>
            <tr>
              <td>iii</td>
              <td>Capacity (MT) </td>
              <td>Refers to capacity of the upcoming project </td>
            </tr>
            <tr>
              <td>iv</td>
              <td>Project Completion Year </td>
              <td>Refers to the year in which a project is fully finished and officially
                closed </td>
            </tr>
            <tr>
              <td>v</td>
              <td>Project Current Status</td>
              <td>Refers to the present stage or progress of a project </td>
            </tr>

            {/* Section 5: Upcoming Projects */}
            <tr>
              <td colSpan={2}></td>

              <td>Based on points (iii & iv), Project Capacity – Schedule is derived
                using the formula: [(Project Completion Year - Current
                Year)/Capacity]
                <br />
                <br />
                Note: For calculation Current Year is considered as 2025

              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <p className="notes">
        <strong>Notes:</strong><br />
        Investments on enhancing hydrogen capacities (other than green hydrogen) within refineries for internal consumption should not be included in the
        above.

      </p>


    </div>

  );
};

export default GuidelineGreenHydrogen;