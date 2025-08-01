import React from 'react';

const QuantitativeHR = ({ formData, handleChange, sectionStart, sectionEnd }) => {
  const data = [
    {
      num: 1,
      title: 'Learning & Development (Training days per employee)',
      subItems: [
        { num: '1.1', label: 'GM and above', key: 'ldGM' },
        { num: '1.1.1', label: 'Executive (up to E-6 level)', key: 'ldExecutive' },
        { num: '1.1.2', label: 'Workmen', key: 'ldWorkmen' },
        { num: '1.2', label: 'HSE training days per employee', key: 'ldHSE' },
        { num: '1.3.1', label: 'Skill Development Training', key: 'ldSkill' },
        { num: '1.3.2', label: 'Functional/On-job Training', key: 'ldFunctional' },
        { num: '1.3.3', label: 'Management Training', key: 'ldManagement' },
      ]
    },
    {
      num: 2,
      title: 'Employee attrition rate (other than retirement)',
      subItems: [
        { num: '2.1', label: 'Entry level (within first 2 years)', key: 'attritionEntry' },
        { num: '2.2', label: 'Executives (up to E-6 level)', key: 'attritionExecutive' },
        { num: '2.3', label: 'Senior Management (E-7 & above)', key: 'attritionSenior' },
      ]
    },
    {
      num: 3,
      title: '% Recruitment (Full Time; Regular Employee)',
      subItems: [
        { num: '3.1', label: 'Total vacancies identified', key: 'recruitVacancies' },
        { num: '3.2', label: 'Total positions filled during year', key: 'recruitFilled' },
      ]
    },
    {
      num: 4,
      title: 'Recruitment Cycle Completion (Avg. days)',
      fields: [
        { key: 'recruitCycle' }
      ]
    },
    {
      num: 5,
      title: 'Diverse workforce (as on 31st March)',
      subItems: [
        { num: '5.0', label: 'Total No. of Employees', key: 'diversityTotal' },
        { num: '5.1', label: 'Employees under 40 years', key: 'diversityUnder40' },
        { num: '5.2', label: 'Female employees', key: 'diversityFemale' },
        { num: '5.3', label: 'Employees with higher qualification', key: 'diversityQualified' },
        { num: '5.4', label: 'Differently-abled employees (2024-25)', key: 'diversityDisabled2024' },
        { num: '5.4', label: 'Differently-abled employees (2023-24)', key: 'diversityDisabled2023' },
      ]
    },
    {
      num: 6,
      title: 'Preventive Medical Examination (PME)',
      subItems: [
        { num: '6.1', label: 'Employees undergone PME', key: 'pmeDone' },
        { num: '6.2', label: 'Employees required to undergo PME', key: 'pmeRequired' },
      ]
    },
    {
      num: 7,
      title: 'Progress in Retaining Female Workforce',
      fields: [
        { key: 'retentionFemalePast' }
      ]
    },
    {
      num: 8,
      title: 'Grievance Redressal Mechanism (within 300 words)',
      fields: [
        { key: 'grievanceMechanism' }
      ]
    },
    {
      num: 9,
      title: 'Recognition & Award Programmes (within 300 words)',
      fields: [
        { key: 'employeeAwards' }
      ]
    }
  ];

  const renderSection = (section) => {
    const items = section.subItems || section.fields;
    return (
      <>
        {items.map((item, index) => (
          <tr key={index}>
            {index === 0 && (
              <>
                <td className="sno-cell" rowSpan={items.length}>{section.num}</td>
                <td className="title-cell" rowSpan={items.length}><strong>{section.title}</strong></td>
              </>
            )}
            <td className="sno-cell">{item.num}</td>
            <td className="label-cell">{item.label || section.title}</td>
            <td>
              {section.num >= 8 ? (
                <textarea
                  name={item.key}
                  value={formData[item.key] || ''}
                  onChange={handleChange}
                  className="form-input"
                  rows={6}
                />
              ) : (
                <input
                  type="text"
                  name={item.key}
                  value={formData[item.key] || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              )}
            </td>
          </tr>
        ))}
      </>
    );
  };

  const part1 = data.filter(section => section.num >= sectionStart && section.num <= 5);
  const part2 = data.filter(section => section.num > 5 && section.num <= sectionEnd);

  return (
    <div className="quantitative-form">
      {part1.length > 0 && (
        <table className="quant-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Particulars</th>
              <th></th>
              <th>Subparticulars</th>
              <th>Assessment Year</th>
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
                <th>Subparticulars</th>
                <th>Assessment Year</th>
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

export default QuantitativeHR;
