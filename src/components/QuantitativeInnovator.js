import React from 'react';

const QuantitativeInnovator = ({ formData, handleChange, sectionStart, sectionEnd }) => {
  const data = [
    {
      num: 1,
      title: 'Tangible benefits of the innovation',
      subItems: [
        { num: '1.1', label: 'Brief description of the innovation...', key: 'innovationDescription', type: 'textarea', max: 300 },
        { num: '1.2', label: 'Quantifiable impact of innovation...', key: 'quantifiableImpact', type: 'textarea', max: 200 },
        { num: '1.3', label: 'Novelty and uniqueness...', key: 'noveltyUniqueness', type: 'textarea', max: 400 },
        { num: '1.4', label: 'Scalability', key: 'scalability', type: 'textarea', max: 100 },
        { num: '1.5', label: 'Replicability', key: 'replicability', type: 'textarea', max: 100 },
        { num: '1.6', label: 'Adaptability', key: 'adaptability', type: 'textarea', max: 100 },
      ]
    },
    {
      num: 2,
      title: 'Intangible Impact',
      subItems: [
        { num: '2.1', label: 'a. Health, Safety & Environment (HSE)', key: 'impactHSE', type: 'textarea', max: 300 },
        { num: '2.2', label: 'b. Carbon footprint reduction', key: 'impactCarbon', type: 'textarea', max: 300 },
        { num: '2.3', label: 'c. Quality or compliance improvements', key: 'impactQuality', type: 'textarea', max: 300 },
        { num: '2.4', label: 'd. Energy efficiency', key: 'impactEfficiency', type: 'textarea', max: 300 },
      ]
    },
    {
      num: 3,
      title: 'Patents',
      subItems: [
        { num: '3.1', label: 'Number of patents filed', key: 'patentsFiled', type: 'number' },
        { num: '3.2', label: 'Number of patents granted', key: 'patentsGranted', type: 'number' },
      ]
    },
    {
      num: 4,
      title: 'Miscellaneous',
      subItems: [
        { num: '4.1', label: 'Team composition and collaboration', key: 'teamComposition', type: 'textarea', max: 100 },
        { num: '4.2', label: 'External partnerships', key: 'externalPartnerships', type: 'textarea', max: 100 },
        { num: '4.3', label: 'Recognition or awards received', key: 'awardsReceived', type: 'textarea', max: 300 },
      ]
    },
  ];

  const renderField = (item) => {
    return item.type === 'textarea' ? (
      <textarea
        name={item.key}
        value={formData[item.key] || ''}
        onChange={handleChange}
        maxLength={item.max}
        className="form-input"
      />
    ) : (
      <input
        type={item.type}
        name={item.key}
        value={formData[item.key] || ''}
        onChange={handleChange}
        className="form-input"
      />
    );
  };

  const renderSection = (section) =>
    section.subItems.map((item, index) => (
      <tr key={item.key}>
        {index === 0 && (
          <>
            <td rowSpan={section.subItems.length}>{section.num}</td>
            <td rowSpan={section.subItems.length}><strong>{section.title}</strong></td>
          </>
        )}
        <td>{item.num}</td>
        <td>{item.label}</td>
        <td>{renderField(item)}</td>
      </tr>
    ));

  const part1 = data.filter(section => section.num >= sectionStart && section.num <= 3 && section.num <= sectionEnd);
  const part2 = data.filter(section => section.num === 4 && section.num >= sectionStart && section.num <= sectionEnd);

  const renderTeamMembers = () => (
    <div>
      <h4>List of Team Members (Max five)</h4>
      <table className="quant-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(i => (
            <tr key={i}>
              <td>{i}</td>
              <td>
                <input
                  type="text"
                  name={`teamMember${i}`}
                  value={formData[`teamMember${i}`] || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="quantitative-form">
      {part1.length > 0 && (
        <table className="quant-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Particulars</th>
              <th></th>
              <th>Sub</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>{part1.map(renderSection)}</tbody>
        </table>
      )}

      {part2.length > 0 && (
        <>
          <h3>Section 4 - Miscellaneous</h3>
          <table className="quant-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Particulars</th>
                <th></th>
                <th>Sub</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>{part2.map(renderSection)}</tbody>
          </table>
          {renderTeamMembers()}
        </>
      )}
    </div>
  );
};

export default QuantitativeInnovator;
