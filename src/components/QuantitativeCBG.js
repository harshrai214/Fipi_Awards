import { Subtitles } from 'lucide-react';
import React from 'react';

const QuantitativeCBG = ({ formData, handleChange, sectionStart, sectionEnd }) => {
  const data = [
      {
      num: 1,
      title: 'Absolute CapEx(INR -crores)',
      fields: [
        { key: 'retailOutlets2024',},
        { key: 'retailOutlets2023',  },
      ],
    },
      {
      num: 2,
      title: 'Installed Capacity(MTPA)',
      fields: [
        { key: 'install2024' },
        { key: 'install2023' },
      ],
    },
    
    
     {
      num: 3,
      title: 'Actual Production(MTPA)',
      fields: [
        { key: 'actual2024' },
        { key: 'actual2023'},
      ],
    },
    {
      num: 4,
      title: 'Safety',
      fields: [
        { key: 'safety2024' },
        { key: 'safety2023'},
      ],
    },
    {
      num: 4.1,
      title: 'Fatal Accident Rate {(No. of Fatalities x 10,00,00,000) / Total hour worked in reporting period}',
      fields: [
        { key: 'salesPerEmployeeTotal2024' },
        { key: 'salesPerEmployeeTotal2023'},
    
    ],
    },
       {
      num: 4.2,
      title: 'Lost Time Injury Frequency {(No. lost time injuries in reporting period x 10,00,000) / Total hour worked in reporting period}',
      fields: [
        { key: 'salesPerEmployeeCount2024' },
    { key: 'salesPerEmployeeCount2023'},]
      },
         {
      num: 4.3,
      title: 'Total Recordable Incident Rate {(No. of OSHA recordable incidents x 2,00,000) / Total hour worked in reporting period}',
      fields: [
        { key: 'salesPerEmployeeCount2024' },
    { key: 'salesPerEmployeeCount2023'},]
      },

        {
      num: 5,
      title: '5	R&D in CBG Area',
      fields: [
        { key: 'lubricantsSales2024' },
        { key: 'lubricantsSales2023' }
      
      ],
    },
      {
      num: 5.1,
      title: 'Number of Patents filed ',
      fields: [
        { key: 'lubricantsSales2024' },
        { key: 'lubricantsSales2023' }
      
      ],
    },
      {
      num: 5.2,
      title: 'Number of Patents granted - National',
      fields: [
        { key: 'fuelsSales2024' },
        { key: 'fuelsSales2023' },
      
      ],
    },
      {
      num: 5.3,
      title: 'Number of Patents Granted – International',
      fields: [
        { key: 'fuelsSales2024' },
      { key: 'fuelsSales2023' },
      ],
    },
      {
      num: 5.4,
      title: 'Number of Patents commercialized',
      fields: [
        { key: 'fuelsSales2024' },
      { key: 'fuelsSales2023' },
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

 const part1 = data.filter(section => section.num >= sectionStart && section.num <= 4.3);
  const part2 = data.filter(section => section.num >= 5 && section.num <= sectionEnd);

  return (
    <div className="quantitative-form">
       {part1.length > 0 && (
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
             {part1.map(section => renderSection(section))}
          </tbody>
        </table>
      )} 

        {part2.length > 0 && (
            <>
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
             {part2.map(section => renderSection(section))}
          </tbody>
        </table>

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
      </>
        )}
    </div>
  );
};

export default QuantitativeCBG;