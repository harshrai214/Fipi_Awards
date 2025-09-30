import React from "react";
import "../../styles/SidebarGuideline.css"; // Use your shared guideline styles

const GuidelineNetZero = () => {
  return (
    <div className="guideline-container">
      <h2>Evaluation Guidelines – Goal Net Zero Company of the Year</h2>
      <br />
      <p>
        <strong>Objective:</strong> Goal Net Zero Company of the year Award, recognizes the most effective company in reducing Carbon footprint 
and improving energy efficiency.
      </p>
      <br />
      <p>
        <strong>Eligibility:</strong> The award is open to all Energy Companies operating in India. The information related to Capital Investments, 
Installed capacities, R&D centres, Patents etc. should pertains to works carried out in India. Any overseas investments and projects 
will not be considered for evaluation.
      </p>

      <div className="guideline-table-container">
        <table className="guideline-table">
           <thead>
            <tr>
              <th className="col-sno">S.No</th>
              <th className="col-param">Parameter</th>
              <th className="col-desc">Description / Formula</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-sno">1</td>
              <td className="col-param">Net Zero (Scope – I &amp; II) – Target Year</td>
              <td className="col-desc">
                The target year of achieving Net Zero as announced by the Company
                <br />
                <br />
                <strong>Net Zero Target Advancement (Years)</strong> is derived using the formula:
                <br />
                India Net Zero Target Year – Company Net Zero Target Year
              </td>
            </tr>

            <tr>
              <td className="col-sno">2</td>
              <td className="col-param">Carbon Emitted (tCO2e)</td>
              <td className="col-desc">
                Total Carbon (Carbon dioxide and carbon dioxide equivalent)
                emitted during the period
                <br />
                <br />
                Based on the above values, <strong>reduction in carbon emission</strong> is derived using the formula:
                <br />
                [(Previous year – Current year) / Previous year] × 100
              </td>
            </tr>

            <tr>
              <td className="col-sno">3</td>
              <td className="col-param">Total Energy Consumed (GJ)</td>
              <td className="col-desc">
                Total Energy Consumed may be calculated as sum of [Electricity
                (Import and Captive) + Consumption of HSD, ATF, Fuel oil, Petrol,
                Gas] as declared in Annual Sustainability Report / Annual Report
                or as may be calculated and approved
              </td>
            </tr>

            <tr>
              <td className="col-sno">4</td>
              <td className="col-param">Annual Revenue (INR Crore)</td>
              <td className="col-desc">
                Total Annual Revenue of the Company as mentioned in the Annual Report
                </td>
            </tr>

 <tr>
              <td colSpan={2} className="col-sno col-param"></td>
              <td className="col-desc">
               Based on point (3 &amp; 4), <strong>Total Energy Consumed per INR Crore
                of Revenue</strong> is derived using the formula:
                <br />
                Total Energy Consumed / Annual Revenue
                </td>
            </tr>




             <tr>
              <td colSpan={2} className="col-sno col-param"></td>
              <td className="col-desc">
              Further, <strong>reduction in energy consumption</strong> is calculated using the formula:
                <br />
                [(Total Energy Consumed per INR Crore of Revenue in the Current yr / Total Energy Consumed per INR Crore of Revenue in the Previous yr) – 1] × 100
              </td>
            </tr>
            

            <tr>
              <td className="col-sno">5</td>
              <td className="col-param">Capex for Wind Energy Generation (INR Crore)</td>
              <td className="col-desc">
                Refers to the upfront investment required to develop and commission a wind energy project
              </td>
            </tr>

            <tr>
              <td className="col-sno">6</td>
              <td className="col-param">Capex for Solar Energy Generation (INR Crore)</td>
              <td className="col-desc">
                Refers to the upfront investment required to develop and commission a solar energy project
              </td>
            </tr>

            <tr>
              <td className="col-sno">7</td>
              <td className="col-param">Capex for Other RE Generation (INR Crore)</td>
              <td className="col-desc">
                Refers to the upfront investment required to develop and commission other RE energy project
                </td>
            </tr>


            <tr>
              <td colSpan={2} className="col-sno col-param"></td>
              <td className="col-desc">
                Total Capex for RE Generation is calculated using the formula:
                <br />
                Sum [Capex (Wind Energy Generation + Solar Energy Generation + Other RE Generation)]
              
              </td>
            </tr>

            <tr>
              <td className="col-sno">8</td>
              <td className="col-param">Total Renewable Energy Power Production (MW)</td>
              <td className="col-desc">
                Total Renewable Energy Power Production means the overall amount
                of energy generated from renewable sources during the period
                <br />
                <br />
                Based on the above values, <strong>growth in renewable energy power
                production</strong> is derived using the formula:
                <br />
                [(Current year – Previous year) / Previous year] × 100
              </td>
            </tr>

            <tr>
              <td className="col-sno">9</td>
              <td className="col-param">Total Power Consumption (MW)</td>
              <td className="col-desc">
                Total Power Consumption is measured as Total Electricity Consumed
                (Import + Captive – Export)
                </td>
            </tr>


            <tr>
              <td colSpan={2} className="col-sno col-param"></td>
              <td className="col-desc">
               Based on point (8 &amp; 9), <strong>% RE of total power consumption</strong> is derived using the formula:
                <br />
                (Total Renewable Energy Power Produced) / (Total Power Consumed)
              </td>
            </tr>

            <tr>
              <td className="col-sno">10</td>
              <td className="col-param">
                Investment for GH2 production / Transportation / Distribution / Storage (INR Crore)
              </td>
              <td className="col-desc">
                Investment in Green Hydrogen Activities including Production,
                Transportation, Distribution and Storage during the particular year
              </td>
            </tr>

            <tr>
              <td className="col-sno">11</td>
              <td className="col-param">GH2 Production (MT)</td>
              <td className="col-desc">
                Total Green Hydrogen production during the particular year
              </td>
            </tr>

            <tr>
              <td className="col-sno">12</td>
              <td className="col-param">Tree Plantation (Nos.)</td>
              <td className="col-desc">
                Total trees planted during the particular year
              </td>
            </tr>

            <tr>
              <td className="col-sno">13</td>
              <td className="col-param">Capex for CCS/CCUS Projects (INR Crore)</td>
              <td className="col-desc">
                Refers to upfront investment required to develop and commission CCS/CCUS Projects during the particular year
              </td>
            </tr>

            <tr>
              <td className="col-sno">14</td>
              <td className="col-param">Carbon Captured (MT)</td>
              <td className="col-desc">
                Total Carbon (Carbon dioxide and carbon dioxide equivalent) captured during the particular year
              </td>
            </tr>
            
            <tr>
               <td style={{ minWidth: "80px", fontWeight: "bold" }}>Table 1</td>
              <td colSpan="2"><strong>Major activities planned as per Net Zero Target for 2024-25 (Max. top 5 Activities) (50 words each against each cell)</strong> </td>
              
            </tr>
            <tr>
              <td>i
              </td>
              <td>Activity Name</td>
              <td>Designated name used to represent a particular work </td>
            </tr>
            <tr>
              <td>ii</td>
              <td>Planned Activities </td>
              <td>Planned activities are the actions or tasks that an organization intends to execute as per 
its schedule</td>
            </tr>
            <tr>
              <td>iii</td>
              <td>Actual Progress </td>
              <td>Completion status of activities achieved in reality </td>
            </tr>









          </tbody>
        </table>
      </div>

      
      
      <p className="notes">
        <strong>Notes:</strong><br />
        a. Total Energy Consumption (GJ) = Electricity (Import + Captive - Export) + Consumption of (HSD, ATF, Fuel oil, Petrol, Gas); 
all units converted in GJ<br />
        b. Total Power Consumption (MW) = Total Electricity Consumed (Import + Captive - Export) <br />
      </p>

      
    </div>
  );
};

export default GuidelineNetZero;