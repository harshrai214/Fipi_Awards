import React from 'react';

const QuantitativeGreenHydrogen = ({ formData, handleChange, sectionStart, sectionEnd }) => {
  const data = [
    { num: 1, title: 'Installed Capacity of Green hydrogen production units (MT)', fields: [{ key: 'installedCapacity2024' }] },
    { num: 2, title: 'Production of Green hydrogen (MT)', fields: [{ key: 'production2024' }] },
    { num: 3, title: 'Carbon emitted per unit of Green Hydrogen Production (Tonne/Tonne)', fields: [{ key: 'carbonEmission2024' }] },
    { num: 4, title: 'Purity of Green Hydrogen Produced (%)', fields: [{ key: 'purity2024' }] },
    { num: 5, title: 'Cost of Production (INR / Tonne)', fields: [{ key: 'costOfProduction2024' }] },
    { num: 6, title: 'Patents filed in the Assessment year', fields: [{ key: 'patentsFiled2024' }] },
    { num: 7, title: 'Total Patents Granted (National)', fields: [{ key: 'patentsGrantedNational2024' }] },
    { num: 8, title: 'Total Patents Granted (International)', fields: [{ key: 'patentsGrantedInternational2024' }] },
    { num: 9, title: 'Patents Commercialized', fields: [{ key: 'patentsCommercialized2024' }] },
    { num: 10, title: 'Investment in Green Hydrogen Activities - production/transportation/distribution/storage (INR Crores)', fields: [{ key: 'investmentActivities2024' }] },
    { num: 11, title: 'Investment in Electrolyser/ Membrane Manufacturing (INR Crores)', fields: [{ key: 'investmentElectrolyser2024' }] },
    // num: 12 removed
  ];

  const renderSection = (section) => (
    <tr key={section.num}>
      <td className="sno-cell">{section.num}</td>
      <td className="title-cell"><strong>{section.title}</strong></td>
      <td></td>
      {section.fields.map((field, index) => (
        <td key={index}>
          <input
            type="number"
            name={field.key}
            value={formData[field.key] || ''}
            onChange={handleChange}
            className="form-input"
          />
        </td>
      ))}
    </tr>
  );


  const renderSection2 = (section) => (
    <tr key={section.num}>
      <td className="sno-cell">{section.num}</td>
      <td className="title-cell"><strong>{section.title}</strong></td>
      <td></td>
       <td>
      <input
        type="number"
        name={section.fields[0].key}
        value={formData[section.fields[0].key] || ''}
        onChange={handleChange}
        className="form-input"
      />
    </td>
    <td>
      <input
        type="number"
        name={section.fields[1].key}
        value={formData[section.fields[1].key] || ''}
        onChange={handleChange}
        className="form-input"
      />
    </td>
      
    </tr>
  );



  const part1 = data.filter(section => section.num >= sectionStart && section.num <= 7);
  const part2 = data.filter(section => section.num > 7 && section.num <= sectionEnd);

  return (
    <div className="quantitative-form">
      {part1.length > 0 && (
        <table className="quant-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Particulars</th>
              <th></th>
              <th>2024-25</th>
            </tr>
          </thead>
          <tbody>
            {part1.map(section => renderSection(section))}
          </tbody>
        </table>
      )}

      {part2.length > 0 && (
        <>
          <table className="quant-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Particulars</th>
                <th></th>
                <th>2023-24</th>
                {/* <th>2024-25</th> */}
              </tr>
            </thead>
            <tbody>
              {part2.map(section => renderSection(section))}
            </tbody>
          </table>

          {/* New Table for Point 13 */}
          <h3> Upcoming Projects</h3>
          <table className="quant-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Project Name</th>
                <th>Location</th>
                <th>Capacity(MT)(A)</th>
                <th>Project Completion Year(B)</th>
                <th>Project Current Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {['Project Name', 'Location', 'Capacity(MT)(A)','Project Completion Year(B)','Project Current Status'].map((field, j) => (
                    <td key={j}>
                      <textarea
                        name={`ongoingProject${i + 1}${field}`}
                        value={formData[`ongoingProject${i + 1}${field}`] || ''}
                        onChange={handleChange}
                        maxLength={100}
                        rows={2}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Comments Section */}
          <div className="step-section">
            <div className="form-group">
              <label>Comments</label>
              <textarea
                name="comment"
                value={formData.comment || ''}
                onChange={handleChange}
                maxLength={300}
                placeholder="Comments in (200 words) against input parameter, if any"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuantitativeGreenHydrogen;
