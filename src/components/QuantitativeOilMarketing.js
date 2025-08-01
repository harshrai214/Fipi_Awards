import { Subtitles } from 'lucide-react';
import React from 'react';

const QuantitativeOilMarketing = ({ formData, handleChange, sectionStart, sectionEnd }) => {
  const data = [
    {
          num: 1,
      title: 'Revenue from Sales',
      subItems: [
        { num: '', label: '', key: '', },
      ],
    },
    
    {
      num: 1.1,
      
      title:'Domestic sales',
      
      subItems: [
        
          { num: '1.1.1', label: 'Volume MMT', key: 'domesticVolumeMMT2024',},
          { num: '1.1.2', label: 'Sales Revenue (Rs. Crores)', key: 'domesticSalesRevenue2024' },
        ],
    },
    {
        num:1.2,
        title:"export",
        subItems:[
        
          { num: '1.2.1', label: 'Volume MMT', key: 'exportVolumeMMT2024',  },
          { num: '1.2.2', label: 'Sales Revenue (Rs. Crores)', key: 'exportSalesRevenue2024', },
        
      ],
    },
    {
      num: 2,
      title: 'Domestic market share (Only liquid product sales excluding Petrochemicals and Gas)',
      subItems: [
        { num: '2.1', label: 'Domestic Market Share %', key: 'domesticMarketShare2024', },
      ],
    },
    {
      num: 3,
      title: 'Retail Sales (MMT)',
      subItems: [
        { num: '3.1', label: 'MS', key: 'retailMS2024',  },
        { num: '3.2', label: 'HSD', key: 'retailHSD2024', remarksKey: 'retailHSD2024Remarks' },
      ],
    },
    {
      num: 4,
      title: 'No. of Retail Outlets',
      fields: [
        { label:"",key: 'retailOutlets2024', remarksKey: 'retailOutlets2024Remarks' },
        { label:"" ,key: 'retailOutlets2023', remarksKey: 'retailOutlets2023Remarks' },
      ],
    },
    {
      num: 5,
      title: 'Sales per Employee (Marketing function employees as on 31 March)',
      subItems: [
        { num: '5.1', label: 'Total Sales (MMT)', key: 'salesPerEmployeeTotal2024', remarksKey: 'salesPerEmployeeTotal2024Remarks' },
        { num: '5.2', label: 'No. of Employees', key: 'salesPerEmployeeCount2024', remarksKey: 'salesPerEmployeeCount2024Remarks' },
      ],
    },
    {
      num: 6,
      title: 'Sale of Lubricants and Fuels sales (MMT)',
      subItems: [
        { num: '6.1', label: 'Sales of Lubricants', key: 'lubricantsSales2024', remarksKey: 'lubricantsSales2024Remarks' },
        { num: '6.2', label: 'Sales of Fuels (MS + HSD)', key: 'fuelsSales2024', remarksKey: 'fuelsSales2024Remarks' },
      ],
    },
    {
      num: 7,
      title: 'Tankage Capacity at the year end (MMT)',
      subItems: [
        { num: '7.1', label: 'MS', key: 'tankageMS2024', remarksKey: 'tankageMS2024Remarks' },
        { num: '7.2', label: 'HSD', key: 'tankageHSD2024', remarksKey: 'tankageHSD2024Remarks' },
        { num: '7.3', label: 'Ethanol', key: 'tankageEthanol2024', remarksKey: 'tankageEthanol2024Remarks' },
      ],
    },
    {
      num: 8,
      title: 'Digital Initiative (Number)',
      subItems: [
        { num: '8.1', label: 'Total Automated ROs', key: 'automatedROs2024', remarksKey: 'automatedROs2024Remarks' },
        { num: '8.1.1', label: 'Total ROs', key: 'totalROs2024', remarksKey: 'totalROs2024Remarks' },
        { num: '8.2', label: 'Total Non-Cash sales', key: 'nonCashSales2024', remarksKey: 'nonCashSales2024Remarks' },
        { num: '8.2.1', label: 'Total sales', key: 'totalSales2024', remarksKey: 'totalSales2024Remarks' },
        { num: '8.3', label: 'GPS Enabled Trucks', key: 'gpsTrucks2024', remarksKey: 'gpsTrucks2024Remarks' },
        { num: '8.3.1', label: 'Total No. of Trucks', key: 'totalTrucks2024', remarksKey: 'totalTrucks2024Remarks' },
      ],
    },
    {
      num: 9,
      title: 'Customer Complaints redressal',
      subItems: [
        { num: '9.1', label: 'No. of Complaints', key: 'complaintsNumber2024', remarksKey: 'complaintsNumber2024Remarks' },
        { num: '9.2', label: 'Average customer complaint turn-around time (No. of days)', key: 'complaintsTurnaround2024', remarksKey: 'complaintsTurnaround2024Remarks' },
      ],
    },
    {
      num: 10,
      title: 'New Energy Based facilities-EV/H2/CBG added in the RO',
      subItems: [
        { num: '10.1', label: 'Fast charging EV Stations (No.)', key: 'evStations2024', remarksKey: 'evStations2024Remarks' },
        { num: '10.2', label: 'H2 Dispensing Station (No.)', key: 'h2Stations2024', remarksKey: 'h2Stations2024Remarks' },
        { num: '10.3', label: 'CBG (sales in MT)', key: 'cbgSales2024', remarksKey: 'cbgSales2024Remarks' },
      ],
    },
    {
      num: 11,
      title: 'LPG - per capita consumption of PMUY customers',
      subItems: [
        { num: '11.1', label: 'LPG per capita consumption of PMUY customers (No.)', key: 'lpgConsumption2024', remarksKey: 'lpgConsumption2024Remarks' },
      ],
    },
    {
      num: 12,
      title: 'Investment in Bio-fuels (% of total capex) (CBG plant, Ethanol Plant) (Rs. Crores)',
      subItems: [
        { num: '12.1', label: 'Actual Investment', key: 'biofuelsInvestment2024', remarksKey: 'biofuelsInvestment2024Remarks' },
        { num: '12.2', label: 'Total Capex', key: 'totalCapex2024', remarksKey: 'totalCapex2024Remarks' },
      ],
    },
    {
      num: 13,
      title: 'Progress in Ethanol Blending Programme in %',
      subItems: [
        { num: '13.1', label: 'Actual Ethanol Blending', key: 'ethanolBlendingActual2024', remarksKey: 'ethanolBlendingActual2024Remarks' },
        { num: '13.2', label: 'Ethanol Blending Target', key: 'ethanolBlendingTarget2024', remarksKey: 'ethanolBlendingTarget2024Remarks' },
      ],
    },
    {
      num: 14,
      title: 'Safety',
      subItems: [
        { num: '14.1', label: 'No. of fatalities (own employees + contract employees)', key: 'fatalities2024', remarksKey: 'fatalities2024Remarks' },
        { num: '14.2', label: 'Total No. of hours worked by all employees (including contract employees) in marketing function', key: 'hoursWorked2024', remarksKey: 'hoursWorked2024Remarks' },
      ],
    },
  ];

  const years = ['2024-25', '2023-24'];
    const year = ['2024-25', '2023-24'];

  const renderSection = (section) => {
    if (section.subItems) {
      return section.subItems.map((subItem, index) => (
        <React.Fragment key={index}>
          {subItem.subItems ? (
            subItem.subItems.map((nestedItem, nestedIndex) => (
              <tr key={`${index}-${nestedIndex}`}>
                {nestedIndex === 0 && index === 0 && (
                  <>
                    <td className="sno-cell" rowSpan={section.subItems.reduce((acc, item) => acc + (item.subItems ? item.subItems.length : 1), 0)}>{section.num}</td>
                    <td className="title-cell" rowSpan={section.subItems.reduce((acc, item) => acc + (item.subItems ? item.subItems.length : 1), 0)}><strong>{section.title}</strong></td>
                  </>
                )}
                {nestedIndex === 0 && (
                  <td className="sno-cell" rowSpan={subItem.subItems.length}>{subItem.num}</td>
                )}
                <td className="label-cell">{nestedItem.label}</td>
                {years.map((year, yIndex) => (
                  <td key={yIndex}>
                    <input
                      type="number"
                      name={nestedItem.key.replace('2024', year === '2024-25' ? '2024' : '2023')}
                      value={formData[nestedItem.key.replace('2024', year === '2024-25' ? '2024' : '2023')] || ''}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </td>
                ))}
                {/* <td>
                  <input
                    type="text"
                    name={nestedItem.remarksKey?.replace('2024', year === '2024-25' ? '2024' : '2023')}
                    value={formData[nestedItem.remarksKey?.replace('2024', year === '2024-25' ? '2024' : '2023')] || ''}
                    onChange={handleChange}
                    className="form-input"
                  />
                </td> */}
              </tr>
            ))
          ) : (
            <tr key={index}>
              {index === 0 && (
                <>
                  <td className="sno-cell" rowSpan={section.subItems.length}>{section.num}</td>
                  <td className="title-cell" rowSpan={section.subItems.length}><strong>{section.title}</strong></td>
                </>
              )}
              <td className="sno-cell">{subItem.num}</td>
              <td className="label-cell">{subItem.label}</td>
              {years.map((year, yIndex) => (
                <td key={yIndex}>
                  <input
                    type="number"
                    name={subItem.key.replace('2024', year === '2024-25' ? '2024' : '2023')}
                    value={formData[subItem.key.replace('2024', year === '2024-25' ? '2024' : '2023')] || ''}
                    onChange={handleChange}
                    className="form-input"
                  />
                </td>
              ))}
              {/* <td>
                <input
                  type="text"
                  name={subItem.remarksKey?.replace('2024', year === '2024-25' ? '2024' : '2023')}
                  value={formData[subItem.remarksKey?.replace('2024', year === '2024-25' ? '2024' : '2023')] || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              </td> */}
            </tr>
          )}
        </React.Fragment>
      ));
    } else {
      return (
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
          <td>
            <input
              type="text"
              name={section.fields[0].remarksKey}
              value={formData[section.fields[0].remarksKey] || ''}
              onChange={handleChange}
              className="form-input"
            />
          </td>
        </tr>
      );
    }
  };

  const part1 = data.filter(section => section.num >= sectionStart && section.num <= 6);
  const part2 = data.filter(section => section.num >= 7 && section.num <= sectionEnd);

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

export default QuantitativeOilMarketing;