import React from 'react';

const QuantitativePipeline= ({ formData, handleChange, sectionStart, sectionEnd }) => {
  const data = [
    {
      num: 1,
      title: 'Pipeline Throughput Capacity (MMT)',
      subItems: [
        { num: '1.1', label: 'Crude Oil', key: 'throughputCrude2024', remarksKey: 'throughputCrude2024Remarks' },
        { num: '1.2', label: 'Liquid Products (Including LPG)', key: 'throughputLiquid2024', remarksKey: 'throughputLiquid2024Remarks' },
        { num: '1.3', label: 'Natural Gas', key: 'throughputGas2024', remarksKey: 'throughputGas2024Remarks' },
      ]
    },
    {
      num: 2,
      title: 'Pipeline Actual Throughput (MMT)',
      subItems: [
        { num: '2.1', label: 'Crude Oil', key: 'actualThroughputCrude2024', remarksKey: 'actualThroughputCrude2024Remarks' },
        { num: '2.2', label: 'Liquid Products (Including LPG)', key: 'actualThroughputLiquid2024', remarksKey: 'actualThroughputLiquid2024Remarks' },
        { num: '2.3', label: 'Natural Gas', key: 'actualThroughputGas2024', remarksKey: 'actualThroughputGas2024Remarks' },
      ]
    },
    {
      num: 3,
      title: 'Operating Cost (Rs./Ton/Km) (Exclude depreciation)',
      subItems: [
        { num: '3.1', label: 'Crude Oil', key: 'opCostCrude2024', remarksKey: 'opCostCrude2024Remarks' },
        { num: '3.2', label: 'Liquid Products (Including LPG)', key: 'opCostLiquid2024', remarksKey: 'opCostLiquid2024Remarks' },
        { num: '3.3', label: 'Natural Gas', key: 'opCostGas2024', remarksKey: 'opCostGas2024Remarks' },
      ]
    },
    {
      num: 4,
      title: 'Specific Energy Consumption (Kcal/ Ton-Km)',
      subItems: [
        { num: '4.1', label: 'Crude Oil', key: 'energyCrude2024', remarksKey: 'energyCrude2024Remarks' },
        { num: '4.2', label: 'Liquid Products (Including LPG)', key: 'energyLiquid2024', remarksKey: 'energyLiquid2024Remarks' },
        { num: '4.3', label: 'Natural Gas', key: 'energyGas2024', remarksKey: 'energyGas2024Remarks' },
      ]
    },
    {
      num: 5,
      title: 'Leaks reported during the year (number)',
      subItems: [
        { num: '5.1', label: 'Crude Oil', key: 'leaksCrude2024', remarksKey: 'leaksCrude2024Remarks' },
        { num: '5.2', label: 'Liquid Products (Including LPG)', key: 'leaksLiquid2024', remarksKey: 'leaksLiquid2024Remarks' },
        { num: '5.3', label: 'Natural Gas', key: 'leaksGas2024', remarksKey: 'leaksGas2024Remarks' },
        { num: '5.4', label: 'Loss due to leakage (MMT)', key: 'lossLeakage2024', remarksKey: 'lossLeakage2024Remarks' },
      ]
    },
    {
      num: 6,
      title: 'Pipeline Downtime (Hours)',
      subItems: [
        { num: '6.1', label: 'Breakdown', key: 'downtimeBreakdown2024', remarksKey: 'downtimeBreakdown2024Remarks' },
        { num: '6.2', label: 'Leaks/Sabotage', key: 'downtimeSabotage2024', remarksKey: 'downtimeSabotage2024Remarks' },
      ]
    },
    {
      num: 7,
      title: 'Renewable Energy (RE) as % of total power consumed',
      subItems: [
        { num: '7.1', label: 'Total Power consumed (kw)', key: 'powerTotal2024', remarksKey: 'powerTotal2024Remarks' },
        { num: '7.2', label: 'RE Power produced (kw)', key: 'powerRE2024', remarksKey: 'powerRE2024Remarks' },
      ]
    },
    {
      num: 8,
      title: 'Safety',
      subItems: [
        { num: '8.1', label: 'Number of fatalities', key: 'fatalities2024', remarksKey: 'fatalities2024Remarks' },
        { num: '8.2', label: 'Lost time injuries', key: 'injuries2024', remarksKey: 'injuries2024Remarks' },
        { num: '8.3', label: 'OSHA recordable incidents', key: 'oshaIncidents2024', remarksKey: 'oshaIncidents2024Remarks' },
        { num: '8.4', label: 'Man-hours worked Own Employees', key: 'manhoursOwn2024', remarksKey: 'manhoursOwn2024Remarks' },
        { num: '8.5', label: 'Man-hours worked Contractors', key: 'manhoursContract2024', remarksKey: 'manhoursContract2024Remarks' },
      ]
    }
  ];

  const years = ['2024-25', '2023-24'];

  const renderSection = (section) => (
    section.subItems.map((item, index) => (
      <tr key={index}>
        {index === 0 && (
          <>
            <td className="sno-cell" rowSpan={section.subItems.length}>{section.num}</td>
            <td className="title-cell" rowSpan={section.subItems.length}><strong>{section.title}</strong></td>
          </>
        )}
        <td className="sno-cell">{item.num}</td>
        <td className="label-cell">{item.label}</td>
        {years.map((year, yIndex) => (
          <td key={yIndex}>
            <input
              type="number"
              name={item.key.replace('2024', year === '2024-25' ? '2024' : '2023')}
              value={formData[item.key.replace('2024', year === '2024-25' ? '2024' : '2023')] || ''}
              onChange={handleChange}
              className="form-input"
            />
          </td>
        ))}
        {/* <td>
          <input
            type="text"
            name={item.remarksKey?.replace('2024', '2024')}
            value={formData[item.remarksKey?.replace('2024', '2024')] || ''}
            onChange={handleChange}
            className="form-input"
          />
        </td> */}
      </tr>
    ))
  );

  const part1 = data.filter(section => section.num >= sectionStart && section.num <= 5);
  const part2 = data.filter(section => section.num >= 6 && section.num <= sectionEnd);

  return (
    <div className="quantitative-form">
      {part1.length > 0 && (
        <table className="quant-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Particulars</th>
              <th></th>
              <th></th>
              <th>2024-25</th>
              <th>2023-24</th>
              
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
                <th></th>
                <th>2024-25</th>
                <th>2023-24</th>
              </tr>
            </thead>
            <tbody>
              {part2.map(section => renderSection(section))}
            </tbody>
          </table>

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

export default QuantitativePipeline;
