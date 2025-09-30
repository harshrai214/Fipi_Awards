import React from "react";
import { useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiClient from "../../api/axiosClient";
import "../../styles/scoretable.css";
const ENDPOINT = "/vw-hrm-scores/";

const HRMscoretable = () => {
  const tableRef = useRef();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(ENDPOINT);
        setApiData(response.data.results || []); 
        setLoading(false);
      } catch (err) {
        console.error("API error:", err);
        setError("Failed to fetch data from API");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  const companies = apiData.map(item => item.organisation_name);
  const learning_development_score = apiData.map(item => item.learning_development_score);
  const total_no_of_training_score = apiData.map(item => item.total_no_training_days_score);
  const gm = apiData.map(item => item.ldGM);
  const gm_score = apiData.map(item => item.ldGM_score);
  const executive_score = apiData.map(item => item.ldExecutive_score);
  const executive = apiData.map(item => item.ldExecutive);
  const workmen_score = apiData.map(item => item.ldWorkmen_score);
  const workmen = apiData.map(item => item.ldWorkmen);
  const hse_score = apiData.map(item => item.installed_capacity_2024);
  const hse = apiData.map(item => item.ldHSE);
  const no_of_training_hse_score = apiData.map(item => item.HSE_training_days_score);
  
  
  const skill_score = apiData.map(item => item.ldSkill_score);
  const skill = apiData.map(item => item.ldSkill);
  const functional_score = apiData.map(item => item.ldFunctional_score);
  const functional =apiData.map(item => item.ldFunctional);
  const management_score = apiData.map(item => item.ldManagement_score);
  const management = apiData.map(item => item.ldManagement);
  
  

  const attrition_rate_score = apiData.map(item => item.employee_attrition_rate_score);
  const entry_level_attrition_score = apiData.map(item => item.attritionEntry_score);
  const entry_level = apiData.map(item => item.attritionEntry);
  const executive_attrition_score = apiData.map(item => item.attritionExecutive_score);
  const executive_attrition = apiData.map(item => item.attritionExecutive);
  const senior_attrition_score = apiData.map(item => item.attritionSenior_score);
  const senior_attrition = apiData.map(item => item.attritionSenior);
 
 
  const recruitment_score = apiData.map(item => item.recruitment_percent_score);
  const total_vacancies = apiData.map(item => item.recruitVacancies);
  const total_positions_score = apiData.map(item => item.total_vacancies_position_percent);
  const total_positions = apiData.map(item => item.recruitFilled);
  const recruitment_cycle_score = apiData.map(item => item.recruitement_cycle_completion_score);
  const recruitment_cycle = apiData.map(item => item.recruitCycle);
  

  
  const diverse_workforce_score = apiData.map(item => item.diverse_workforce_score);
  const total_no_of_employees = apiData.map(item => item.diversityTotal);
  const young_employees_score = apiData.map(item => item.percentage_young_employee_score);
  const no_of_employees_under40 = apiData.map(item => item.diversityUnder40);
  const no_of_employees_under40_percent = apiData.map(item => item.age_of_employees_under_40);
  const no_of_female_employees_score = apiData.map(item => item.female_employees_score);
  const no_of_female_employees = apiData.map(item => item.diversityFemale);
  const no_of_female_employees_percent = apiData.map(item => item.female_employees_percent);
  const no_of_employees_higher_score =apicData.map(item => item.employees_higher_qualification_score);
  const no_of_employees_higher = apiData.map(item => item.diversityQualified);
  const no_of_employees_higher_percent = apiData.map(item => item.employees_higher_qualification);
  
  
  const growth_differently_abled = apiData.map(item => item.growth_in_differently_abled_employees_score);
  const no_differently_abled_prev = apiData.map(item => item.diversityDisabled2023);
  const no_differently_abled_assessment = apiData.map(item => item.diversityDisabled2024);
  const differently_abled_percent = apiData.map(item => item.no_differently_abled_employees_percent);
  
  
  const PME_score = apiData.map(item => item.preventive_medical_examination_score);
  const PME_percent = apiData.map(item => item.installed_capacity_2024);
  const no_of_undergone_PME = apiData.map(item => item.pmeDone);
  const no_of_employees_PME = apiData.map(item => item.pmeRequired);
  const female_workforce_score = apiData.map(item => item.progress_retaining_female_workforce_score);
  const no_of_female_employees_workforce = apiData.map(item => item.retentionFemalePast);
  const female_workforce_percent = apiData.map(item => item.installed_capacity_2024);
  
 
  const Grievance2 = apiData.map(item => item.grievanceMechanism2);
  const Award2 = apiData.map(item => item.employeeAwards2);
 
 
  const Total_score = apiData.map(item => item.total_hrm_score);



  const handleExport = () => {
    const table = tableRef.current;
    const wb = XLSX.utils.table_to_book(table, { sheet: "HRM Scores" });
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "HRM_Scores.xlsx");
  };

return (
    <div className="table-box">
      <button
        onClick={handleExport } className="export-btn"
        
      >
        Export to Excel
      </button>
      <table ref={tableRef} className="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-3 py-2 cursor-pointer">S.No.</th>
            <th className="border px-3 py-2 cursor-pointer">Criteria</th>
            <th className="border px-3 py-2 cursor-pointer">Unit</th>
            <th className="border px-3 py-2 cursor-pointer">Marks</th>
            <th className="border px-3 py-2 cursor-pointer"></th>
          
            {companies.map((company) => (
              <th key={company} className="border px-3 py-2 cursor-pointer">
                {company}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1</td>
            <td className="border px-3 py-2">
              <strong>Learning & Development Score</strong>
            </td>
            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">22</td>
            <td className="border px-3 py-2"></td>
           
            {learning_development_score.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                {s.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
              <strong>Total no. of training days imparted to such employees/no. of such employees at the mentioned level Score
            </strong></td>
            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">15</td>
            <td className="border px-3 py-2"></td>
          
            {total_no_of_training_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.1</td>
         <td className="border px-3 py-2" >
       GM and above
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {gm.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {gm_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

 <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.2</td>
         <td className="border px-3 py-2" >
       Executive(up to E-6 level in PSU or equivalent)
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {executive.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {executive_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.3</td>
         <td className="border px-3 py-2" >
       Workmen
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {workmen.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {workmen_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.4</td>
         <td className="border px-3 py-2" >
       <strong>HSE training days per employee Score</strong>
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {hse_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {hse.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.5</td>
         <td className="border px-3 py-2" >
      <strong>No. of training days (excluding HSE) per employee for each of the following Score</strong>
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">15</td>
            <td className="border px-3 py-2"></td>
           
            {no_of_training_hse_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Skill Development Training
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {skill.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {skill_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          
          
          
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.5.2</td>
         <td className="border px-3 py-2" >
       Functional/On-job Training
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {functional.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {functional_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.5.3</td>
         <td className="border px-3 py-2" >
       Management Training
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {management.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {management_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2</td>
         <td className="border px-3 py-2" >
       <strong>Employee attrition rate (other than retirement) Score</strong>
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">15</td>
            <td className="border px-3 py-2"></td>
           
            {attrition_rate_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2.1</td>
         <td className="border px-3 py-2" >
        Entry level (within first two years of joining)
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {entry_level.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {entry_level_attrition_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2.2</td>
         <td className="border px-3 py-2" >
       Executives (up to E-6 level in PSU or equivalent)
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {executive_attrition.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {executive_attrition_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2.3</td>
         <td className="border px-3 py-2" >
       Senior Management
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {senior_attrition.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {senior_attrition_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3</td>
         <td className="border px-3 py-2" >
       <strong>% Recruitment (full-time ; regular employees) Score </strong>
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2">15</td>
            <td className="border px-3 py-2"></td>
           
            {recruitment_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3.1</td>
         <td className="border px-3 py-2" >
        Total vacancies identified for recruitment to be done during the year
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {total_vacancies.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> 
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3.2</td>
         <td className="border px-3 py-2" >
        Total no. of positions filled during  the year through hiring
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {total_positions.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr> 
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Score
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {total_positions_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4</td>
         <td className="border px-3 py-2" >
       <strong>Recruitement Cycle Completion Score </strong>
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {recruitment_cycle_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       Avg. no. of days from when the job requisition was received until the offer was accepted by the candidate
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {recruitment_cycle.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5</td>
         <td className="border px-3 py-2" >
        <strong>Diverse workforce (as on 31st March) Score</strong>
       </td>

            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2"></td>
           
            {diverse_workforce_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       Total no. of employees 
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {total_no_of_employees.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.1</td>
         <td className="border px-3 py-2" >
       <strong>Percentage young employees Score</strong>
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {young_employees_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       No. of Employees under 40 years 
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_of_employees_under40.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       % age of employees who are under 40 years
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_of_employees_under40_percent.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

 <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.2</td>
         <td className="border px-3 py-2" >
       <strong>% Female employees Score</strong>
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {no_of_female_employees_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       No. of female employees
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_of_female_employees.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       % female employees
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_of_female_employees_percent.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.3</td>
         <td className="border px-3 py-2" >
       <strong>% employees having higher qualification (post graduates & above) Score</strong>
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {no_of_employees_higher_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       No. of Employees having  higher qualification (post graduates & above)
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_of_employees_higher.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_of_employees_higher_percent.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.4</td>
         <td className="border px-3 py-2" >
       <strong>% Growth in differently-abled employement (as on 31st March) Score</strong>
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {growth_differently_abled.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       % female employeesNo. of differently-abled employees during previous year</td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_differently_abled_prev.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       No. of differently-abled employees during assessment year
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_differently_abled_assessment.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       increase
       </td>

            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {differently_abled_percent.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">6</td>
         <td className="border px-3 py-2" >
       <strong>Preventive Medical Examination (PME) Score</strong>
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {PME_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">6.1</td>
         <td className="border px-3 py-2" >
       No. of undergone PME in current year
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_of_undergone_PME.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">6.2</td>
         <td className="border px-3 py-2" >
       No. of employees who were to undergo PME as per company policy during the year
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_of_employees_PME.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
 <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">6.2</td>
         <td className="border px-3 py-2" >
       
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {PME_percent.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">7</td>
         <td className="border px-3 py-2" >
       <strong>Progress in Retaining Female Workforce Score</strong>
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {female_workforce_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       No. of Female employees 5 Years Ago
       </td>

            <td className="border px-3 py-2">No.</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {no_of_female_employees_workforce.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
       Increase
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {female_workforce_percent.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">8</td>
         <td className="border px-3 py-2" >
       <strong>Grievance Redressal Mechanism (Does the company provide a channel through which employees can report suspected grievances, and does the channel allow for confidential and/or anonymous reporting - Yes/No. If yes, provide details in bullet points - Within 300 words) Score</strong>
       </td>

            <td className="border px-3 py-2">Write-up</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {Grievance2.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">9</td>
         <td className="border px-3 py-2" >
       <strong>Recognition & Award Programmes for Employees (Details in bullet points of awards/recognitions programmes active within the organization for employees in the year 2024-25 : Within 300 words) Score</strong>
       </td>

            <td className="border px-3 py-2">Write-up</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {Award2.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

           
              <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Total</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">100.00</td>
           
            {Total_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {/* {v.toFixed(2)} */}
              </td>
            ))}
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default HRMscoretable;