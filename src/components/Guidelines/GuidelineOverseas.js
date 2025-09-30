import React from "react";
import "../../styles/Guidelinecss/GuidelineExploration.css";

const GuidelineOverseas = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Overseas Oil & Gas Company of the Year</h2>
      
      <br />
      <p>
        <strong>Objective:</strong> The “Overseas Oil & Gas Company of the Year” award is given in recognition of leadership and excellence in performance in exploration and production of Oil & Gas in Overseas Countries during 2024-25.
      </p>
      <br />
      <p>
        <strong>Eligibility Criteria:</strong>The award is open to all Indian Companies who are engaged in the Exploration & Production of Oil & Gas in Overseas Countries. FIPI will consider entries from Exploration & Production of hydrocarbons (E&P) companies and E&P divisions of integrated companies.
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
              <td className="col-param">
                Total oil production during the year (MMT)
              </td>
              <td className="col-desc">
                Total oil produced by a company during the year
                <br />
                <br />
                Based on the above values, incremental oil production is derived
                using the formula:
                <br />
                [(Current year - Previous year) / Previous year] × 100
              </td>
            </tr>
            <tr>
              <td className="col-sno">2</td>
              <td className="col-param">
                Total gas production during the year (BCM)
              </td>
              <td className="col-desc">
                Total gas produced by a company during the year
                <br /> <br />
                Based on the above values, incremental gas production is derived
                using the formula:
                <br />
                [(Current year - Previous year) / Previous year] × 100
              </td>
            </tr>
            <tr>
              <td className="col-sno">3</td>
              <td className="col-param">2P oil reserve accretion (MMT)</td>
              <td className="col-desc">
                2P oil reserve accretion by a company during the year
                <br /> <br />
                Based on the above values, 2P oil reserve accretion growth is
                derived using the formula:
                <br />
                [(Current year - Previous year) / Previous year] × 100
              </td>
            </tr>
            <tr>
              <td className="col-sno">4</td>
              <td className="col-param">2P gas reserves accretion (BCM)</td>
              <td className="col-desc">
                2P gas reserve accretion by a company during the year
                <br /> <br />
                Based on the above values, 2P gas reserve accretion growth is
                derived using the formula:
                <br />
                [(Current year - Previous year) / Previous year] × 100
              </td>
            </tr>

            {/* <tr>
              <td className="col-sno"></td>
              <td className="col-param"></td>
              <td className="col-desc">
                Further, <strong>Reserve Replacement Ratio </strong> is derived
                using the formula:
                <br />
                <em>
                  (2P Oil &amp; Gas Reserve Accretion) / (Total Oil &amp; Gas
                  Production)
                </em>
              </td>
            </tr> */}


<tr>
  <td colSpan={2} className="col-sno col-param"></td>
  <td className="col-desc">
    Further, <strong>Reserve Replacement Ratio </strong> is derived
    using the formula:
    <br />
    
      (2P Oil &amp; Gas Reserve Accretion) / (Total Oil &amp; Gas
      Production)
  
  </td>
</tr>





            <tr>
              <td className="col-sno">5</td>
              <td className="col-param">Net Profit (INR Crore)</td>
              <td className="col-desc">
                Net Profit is the final profit a company earns after deducting
                all expenses from its total revenue
              </td>
            </tr>

            <tr>
              <td className="col-sno">6</td>
              <td className="col-param">Annual Turnover (INR Crore)</td>
              <td className="col-desc">Total Annual Turnover of the Company</td>
            </tr>

            <tr>
              <td colSpan={2} className="col-sno col-param"></td>
              <td className="col-desc">
                Based on points (5 &amp; 6), <strong>Net Profit Margin</strong>{" "}
                is derived using the formula:
                <br />
                Net Profit / Annual Turnover
              </td>
            </tr>

            <tr>
              <td colSpan={2} className="col-sno col-param"></td>
              <td className="col-desc">
                Further, <strong>Improvement in Net Profit Margin</strong> is
                derived using the formula:
                <br />
              
                  {" "}
                  Net Profit Margin of Previous Year / Net Profit Margin of
                  Assessment Year
                
              </td>
            </tr>

            <tr>
              <td className="col-sno">7</td>
              <td className="col-param">Overseas investment (INR Crore)</td>
              <td className="col-desc">
                Overseas investment by the Company in the particular year
                <br /> <br />
                Based on the above values, growth in overseas investment is
                derived using the formula:
                <br />
              [(Current year - Previous year) / Previous year] × 100
              </td>
            </tr>

            <tr>
              <td className="col-sno">8</td>
              <td className="col-param">Total Carbon Emitted (Tonne / MTOE)</td>
              <td className="col-desc">
                In proportion to its activity / participating interest
              </td>
            </tr>

            <tr>
              <td colSpan={2} className="col-sno col-param"></td>
              <td className="col-desc">
                Further, <strong>Specific Carbon Footprint</strong> (Tonne /
                MTOE) is derived using the formula:
                <br />
                Total Carbon Emitted / Total HC Production
              </td>
            </tr>

            <tr>
              <td className="col-sno">9</td>
              <td className="col-param">
                Expenditure on Community welfare (INR Crore)
              </td>
              <td className="col-desc">
                Expenditure on various community welfare activities undertaken
                at overseas countries in the particular year
                <br /> <br />
                Based on the above values, growth in expenditure on community
                welfare is derived using the formula:
                <br />
                [(Current year - Previous year) / Previous year] × 100
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        <p className="notes">
        <strong>Notes:</strong>
        <br />
        1. INR / USD as on 31.03.2025 (85.424)
        <br />
        2. 1 Tonne of oil equivalent to 7.5 bbl of oil
        <br />
        3. <strong>MTOE:</strong> Million Tonne Oil and Oil equivalent Gas. For gas, 1 BCM gas equivalent to 1 MMT of oil.
        <br />
        4. Total Carbon Emitted includes GHG emissions 
      </p> 
      
    </div>
  );
};

export default GuidelineOverseas;