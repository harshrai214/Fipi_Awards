import React from 'react';
import "../styles/QuantitativeDigital.css";

const QuantitativeDigital = ({ formData, handleChange, sectionStart }) => {
  const renderRevenueSection = () => (
    <div>
      <h3>1. Annual Revenue Declaration</h3>
      <table className="quant-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Parameter</th>
            <th>2024-25</th>
            <th>2023-24</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.1</td>
            <td>Total Revenue from Digital Technology Services (INR Crores)</td>
            <td><input type="number" field="revenueDigital2024" value={formData.revenueDigital2024 || ''} onChange={handleChange} /></td>
            <td><input type="number" field="revenueDigital2023" value={formData.revenueDigital2023 || ''} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>1.2</td>
            <td>Total Revenue of the Company (INR Crores)</td>
            <td><input type="number" field="revenueCompany2024" value={formData.revenueCompany2024 || ''} onChange={handleChange} /></td>
            <td><input type="number" field="revenueCompany2023" value={formData.revenueCompany2023 || ''} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderTopTechProjects = () => (
    <div>
      <h3>2. Digital Technology Implemented (Top 3 Technologies Only)</h3>
      {[1, 2, 3].map(i => (
        <div key={i} className="tech-section">
          <h4>2.{i} Project {String.fromCharCode(64 + i)}</h4>
          <table className="quant-table">
            <tbody>
              <tr>
                <td>Name of Digital Technology Project</td>
                <td><input type="text" field={`project${i}Name`} value={formData[`project${i}Name`] || ''} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Areas of Implementation</td>
                <td><input type="text" field={`project${i}Area`} value={formData[`project${i}Area`] || ''} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Year of Commencement</td>
                <td><input type="number" field={`project${i}Year`} value={formData[`project${i}Year`] || ''} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>No. of Customers (as on date)</td>
                <td><input type="number" field={`project${i}Customers`} value={formData[`project${i}Customers`] || ''} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Total Revenue till date (INR Crores)</td>
                <td><input type="number" field={`project${i}Revenue`} value={formData[`project${i}Revenue`] || ''} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Intangible Value Provided*</td>
                <td><textarea field={`project${i}Value`} value={formData[`project${i}Value`] || ''} onChange={handleChange} rows={3} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );

  const renderRAndDSection = () => (
    <div>
      <h3>3. Upcoming / R&D on Digital Technology (Top 3 Technologies Only)</h3>
      {[1, 2, 3].map(i => (
        <div key={i} className="rnd-section">
          <h4>3.{i} Technology {String.fromCharCode(64 + i)}</h4>
          <table className="quant-table">
            <tbody>
              <tr>
                <td>Name of Technology</td>
                <td><input type="text" field={`rnd${i}Name`} value={formData[`rnd${i}Name`] || ''} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Year of Commencement of R&D</td>
                <td><input type="number" field={`rnd${i}Year`} value={formData[`rnd${i}Year`] || ''} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Investment (INR Crores)</td>
                <td><input type="number" field={`rnd${i}Investment`} value={formData[`rnd${i}Investment`] || ''} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Patents Obtained</td>
                <td><input type="number" field={`rnd${i}Patents`} value={formData[`rnd${i}Patents`] || ''} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Intangible Value Expected*</td>
                <td><textarea field={`rnd${i}Value`} value={formData[`rnd${i}Value`] || ''} onChange={handleChange} rows={3} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <div className="form-group">
        <label>Total Investment in R&D in 2024-25 (INR Crores)</label>
        <input type="number" field="totalRndInvestment2024" value={formData.totalRndInvestment2024 || ''} onChange={handleChange} />
      </div>
    </div>
  );

  const renderMarketPresence = () => (
    <div>
      <h3>4. Market Presence and Growth</h3>
      <table className="quant-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Parameter</th>
            <th>2024-25</th>
            <th>2023-24</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4.1</td>
            <td>Number of Customers</td>
            <td><input type="number" field="customers2024" value={formData.customers2024 || ''} onChange={handleChange} /></td>
            <td><input type="number" field="customers2023" value={formData.customers2023 || ''} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>4.2</td>
            <td>% of Revenue earned through Digital Tech (2024-25)</td>
            <td colSpan={2}>
              <input type="number" field="revenuePercentDigital2024" value={formData.revenuePercentDigital2024 || ''} onChange={handleChange} />%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="quantitative-form">
      {sectionStart === 1 && (
        <>
          {renderRevenueSection()}
          {renderTopTechProjects()}
        </>
      )}
      {sectionStart === 2 && (
        <>
          {renderRAndDSection()}
          {renderMarketPresence()}
          <div className="form-group">
            <label>Comments (Optional)</label>
            <textarea
              field="digitalComments"
              value={formData.digitalComments || ''}
              onChange={handleChange}
              placeholder="Add any relevant comments (200 words max)"
              rows={4}
              maxLength={1500}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QuantitativeDigital;
