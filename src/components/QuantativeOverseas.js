import { Subtitles } from 'lucide-react';
import React from 'react';

const QuantitativeOverseas = ({ formData, handleChange, sectionStart, sectionEnd }) => {
  const data = [
      {
      num: 1,
      title: 'Total oil production during the year(MMT)',
      fields: [
        { key: 'MMT2024',},
        { key: 'MMT2023',  },
      ],
    },
      {
      num: 2,
      title: 'Total gas production during the year(BCM)',
      fields: [
        { key: 'BCM2024' },
        { key: 'BCM2023' },
      ],
    },
    
    
     {
      num: 3,
      title: '2P oil reserve accretion (MMT)',
      fields: [
        { key: '2p2024' },
        { key: '2p2023'},
      ],
    },
    {
      num: 4,
      title: '2P gas reserves accretion (BCM)',
      fields: [
        { key: '2P2024' },
        { key: '2P2023'},
      ],
    },
    {
      num: 5,
      title: 'Net Profit (INR Crores)',
      fields: [
        { key: 'NP2024' },
        { key: 'NP2023'},
    
    ],
    },
       {
      num: 6,
      title: 'Annual Turnover (INR Crores)',
      fields: [
        { key: 'AT2024' },
    { key: 'AT2023'},]
      },
         {
      num: 7,
      title: 'Overseas Investment (INR Crores)',
      fields: [
        { key: 'OI2024' },
    { key: 'OI2023'},]
      },

        {
      num: 8,
      title: 'Total Carbon Emitted (Tonne)',
      fields: [
        { key: 'TCE2024' },
        { key: 'TCE2023' }
      
      ],
    },
      {
      num: 9,
      title: 'Expenditure on Community welfare (INR Crores)',
      fields: [
        { key: 'E2024' },
        { key: 'E2023' }
      
      ],
    },
   

    // {
    //   num: 5,
    //   title: '5	R&D in CBG Areas',
    //   subItems: [
    //     { num: '5.1', label: '', key: 'lubricantsSales2024', remarksKey: 'lubricantsSales2024Remarks' },
    //     { num: '5.2', label: ' – National', key: 'fuelsSales2024', remarksKey: 'fuelsSales2024Remarks' },
    //     { num: '5.3', label: '', key: 'fuelsSales2024', remarksKey: 'fuelsSales2024Remarks' },
    //     { num: '5.4', label: '', key: 'fuelsSales2024', remarksKey: 'fuelsSales2024Remarks' },
    //   ],
    // },
]

  const years = ['2024-25', '2023-24'];
    const year = ['2024-25', '2023-24'];

   const renderSection = (section) => {
    if (section.subItems) {
      return section.subItems.map((subItem, index) => (
        <tr key={index}>
          {index === 0 && (
            <>
              <td className="sno-cell border border-gray-300 p-2" rowSpan={section.subItems.length}>{section.num}</td>
              <td className="title-cell border border-gray-300 p-2" rowSpan={section.subItems.length}><strong>{section.title}</strong></td>
            </>
          )}
          <td className="sno-cell border border-gray-300 p-2">{subItem.num}</td>
          <td className="label-cell border border-gray-300 p-2">{subItem.label}</td>
          {years.map((year, yIndex) => (
            <td key={yIndex} className="border border-gray-300 p-2">
              <input
                type="number"
                name={year === '2024-25' ? subItem.key : subItem.key2023}
                value={formData[year === '2024-25' ? subItem.key : subItem.key2023] || ''}
                onChange={(e) => handleChange(year === '2024-25' ? subItem.key : subItem.key2023, e.target.value)}
                className="form-input w-full border border-gray-300 p-1 rounded"
              />
            </td>
          ))}
          
          {/* <td className="border border-gray-300 p-2">
            <input
              type="text"
              name={years[0] === '2024-25' ? subItem.remarksKey : subItem.remarksKey2023}
              value={formData[years[0] === '2024-25' ? subItem.remarksKey : subItem.remarksKey2023] || ''}
              onChange={(e) => handleChange(years[0] === '2024-25' ? subItem.remarksKey : subItem.remarksKey2023, e.target.value)}
              className="form-input w-full border border-gray-300 p-1 rounded"
            />
          </td> */}
        </tr>
      ));
    } else {
      return (
        <tr key={section.num}>
          <td className="sno-cell border border-gray-300 p-2">{section.num}</td>
          <td className="title-cell border border-gray-300 p-2"><strong>{section.title}</strong></td>
          <td className="label-cell border border-gray-300 p-2"></td>
          {section.fields.map((field, index) => (
            <td key={index} className="border border-gray-300 p-2">
              <input
                type="number"
                name={field.key}
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="form-input w-full border border-gray-300 p-1 rounded"
              />
            </td>
          ))}
          {/* <td className="border border-gray-300 p-2">
            <input
              type="text"
              name={section.fields[0].remarksKey}
              value={formData[section.fields[0].remarksKey] || ''}
              onChange={(e) => handleChange(section.fields[0].remarksKey, e.target.value)}
              className="form-input w-full border border-gray-300 p-1 rounded"
            />
          </td> */}
        </tr>
      );
    }
  };

  const filteredData = data.filter(section => section.num >= sectionStart && section.num <= sectionEnd);

  return (
    <div className="quantitative-form">
      {filteredData.length > 0 ? (
        <table className="quant-table w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="sno-cell border border-gray-300 p-2 text-center w-16">S.No</th>
              <th className="title-cell border border-gray-300 p-2 text-left">Particulars</th>
              <th className="label-cell border border-gray-300 p-2 w-16"></th>
              <th className="border border-gray-300 p-2 text-center">2024-25</th>
              <th className="border border-gray-300 p-2 text-center">2023-24</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredData.map(section => renderSection(section))}
          </tbody>
        </table>
      ) : (
        <p className="note text-gray-500">Quantitative information is not applicable for this category.</p>
      )}
      <div className="step-section mt-6">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Comments</label>
          <textarea
            name="comment"
            value={formData.comment || ''}
            onChange={(e) => handleChange('comment', e.target.value)}
            maxLength={300}
            placeholder="Comments in (200 words) against input parameter, if any"
            className="form-input w-full border border-gray-300 p-2 rounded mt-1"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default QuantitativeOverseas;