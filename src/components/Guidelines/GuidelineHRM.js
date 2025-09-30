import React from "react";
import "../../styles/Guidelinecss/GuidelineExploration.css";

const GuidelineHRM = () => {
  return (
    <div className="guidelinee-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Human Resource Management Company of the Year</h2>
      

<p>
<strong>Objective</strong> This award recognizes the contribution of company’s Human Resource Management in achieving excellence across the entire spectrum of HR management in the company.
</p>
<br />
<p>
<strong>Eligibility criteria </strong>This award is open to all Oil & Gas companies operating in India
</p>



 
      <div className="guidelinee-table-container">
        <table className="guidelinee-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Parameter</th>
              <th>Formula / Description</th>
            </tr>
          </thead>
          <tbody>
            {/* Section 1: Learning & Development */}
           <tr>
            <td>1</td>
            <td>Learning & Development</td>
            <td>Avg. no. of training/learning days per employee (total training days/no. of employees at the mentioned level)</td>
           </tr>
           <tr>
            <td>1.1</td>
            <td>GM and above </td>
            <td>By “GM and above,” it is meant senior level executives like E7 level & above in PSUs and equivalent level in private sector. 

Total no. of training days imparted to such employees ÷ No. of such employees</td>
           </tr>
           <tr>
            <td>1.1.1</td>
            <td>Executive (up to E-6 level in PSU or equivalent) </td>
            <td>By “Middle management,” it is meant officer level employees (who are not staff) up to E6 level in PSUs and equivalent level in private sector.

Total no. of training days imparted to such employees ÷ No. of such employees</td>
            </tr>
          <tr>
              <td>1.1.2</td>
              <td>Workmen</td>
              <td>By “Workmen,” it is meant the staff levels regular employees of the company.

Total no. of training days imparted to such employees ÷ No. of such employees</td>
            </tr>
            <tr>
              <td>1.2</td>
              <td>HSE Training Days per Employee</td>
              <td>Total number of training days on HSE÷ Total number of regular employees (as on 31st March)</td>
            </tr>
          <tr>
              <td>1.3</td>
              <td>No. of training days per employee (Excluding HSE) for each of the following:</td>
              <td>-</td>
          </tr>
          <tr>
              <td>1.3.1</td>
              <td>Skill Development Training</td>
              <td>Total number of training days on Skill Development (excluding HSE) ÷ Total number of regular employees (as on 31st March)</td>
          </tr>
          <tr>
              <td>1.3.2</td>
              <td>Functional/On-job Training</td>
              <td>Total number of training days on Functional/On-job (excluding HSE) ÷ Total number of regular employees (as on 31st March)</td>
          </tr>
          <tr>
              <td>1.3.3</td>
              <td>Management Training </td>
              <td>Total number of training days on Management (excluding HSE) ÷ Total number of regular employees (as on 31st March)</td>
          </tr>
          <tr>
              <td>2</td>
              <td>Employee attrition rate (other than retirement)</td>
              <td>-</td>
          </tr>
          <tr>
              <td>2.1</td>
              <td>Entry level (within first two years of joining)</td>
              <td>Number of employees resigned during assessment year at the entry-level÷ Total number of employees recruited at the entry level in last two years.</td>
          </tr>
          <tr>
              <td>2.2</td>
              <td>Executives (up to E-6 level in PSU or equivalent)</td>
              <td>Number of employees resigned during assessment year at the middle-level÷ Total number of employees at the middle level at the beginning of the assessment year (1st April)</td>
          </tr>
          <tr>
              <td>2.3</td>
              <td>Senior Management (E-7 & above or equivalent)</td>
              <td>Number of employees resigned during assessment year at the senior management level÷ Total number of employees at the senior management level at the beginning of the assessment year (1st April)</td>
          </tr>
          <tr>
              <td>3</td>
              <td>% Recruitment (Full-Time; Regular Employee)</td>
              <td>-</td>
          </tr>
          <tr>
              <td>-</td>
              <td>Total vacancies identified for recruitment to be done during the year</td>
              <td>Number of Positions Filled during the year ÷ Total Vacancies identified for recruitment to be done during the year X 100</td>
          </tr>
          <tr>
              <td>-</td>
              <td>Total no. of positions filled during the year through hiring</td>
              <td>-</td>
          </tr>
          <tr>
              <td>4</td>
              <td>Recruitment Cycle Completion</td>
              <td>Avg. no. of days from when the job requisition was received until the offer was accepted by the candidate</td>
          </tr>
          <tr>
              <td>5</td>
              <td>Diverse Workforce (as on 31st March)</td>
              <td>-</td>
          </tr>
          <tr>
            <td>5.1</td>
              <td>% young employees</td>
              <td>(No. of Employees under 40 years ÷ Total No. of Employees) X 100</td>
          </tr>
          <tr>
            <td>5.2</td>
              <td>% female employees</td>
              <td>(No. of Female Employees ÷ Total No. of Employees) X 100</td>
          </tr>
          <tr>
              <td>5.3</td>
              <td>% employees having higher qualification (post graduates & above)</td>
              <td>No. of Employees having higher qualification (post graduates & above) ÷ Total No. of Employees X 100</td>
          </tr>
          <tr>
              <td>5.4</td>
              <td>% Growth in differently-abled employment</td>
              <td>Number of differently-abled employees in the current year – Number in the previous year ÷ Number in the previous year X 100</td>
          </tr>
          <tr>
              <td>6</td>
              <td>% Employees Undergone Preventive Medical Examination (PME)</td>
              <td>Employees undergone PME in current year ÷ No. of employees who were to undergo PME as per policy X 100 (as on 31st March)</td>
          </tr>
          <tr>
              <td>6</td>
              <td>% Employees Undergone Preventive Medical Examination (PME)</td>
              <td>Employees undergone PME in current year ÷ No. of employees who were to undergo PME as per policy X 100 (as on 31st March)</td>
          </tr>
          <tr>
              <td>7</td>
              <td>Progress in Retaining Female Workforce (as on 31st March)</td>
              <td>No. of Female Employees during Assessment Year – No. of Female Employees 5 Years Ago ÷ No. of Female Employees 5 Years Ago X 100 </td>
          </tr>
          <tr>
              <td>8</td>
              <td>Grievance Redressal Mechanism</td>
              <td>Does the company provide a channel through which employees can report suspected fraudulences, and does the channel allow for confidential and/or anonymous reporting (Yes/No). 

If yes, provide details in bullet points (Within 300 words)</td>
          </tr>
          <tr>
              <td>9</td>
              <td>Recognition & Award Programmes for Employees</td>
              <td>Details (in bullet points) of awards/recognitions programmes active within the organization for employees in the assessment year (within 300 words)</td>
          </tr>
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default GuidelineHRM;