import React from "react";
import { useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../../styles/GHscoretable.css"

const HRMscoretable = () => {
  const tableRef = useRef();

  const staticData = [
    {
      id: 1,
      organisation_name: "Raygain Technology Private Limited",
      category: "Green Hydrogen Company of the Year",
      firstname: "Adarsh",
      lastname: "Chaudhary",
      userid: "",
      company_name: "Raygain Technology Private Limited",
      mailing_address: "Adarsh",
      authority_name: "Sfas",
      authority_title: "fasfas",
      authority_phone: "7546745764",
      authorityLandline: "654643",
      authority_email: "gre@re.com",
      contact_name: "Adarsh Chaudhary",
      contact_phone: "9874566321",
      contact_email: "adarsh@raygain.com",
      company_profile: "frgw",
      comment: "fsdfs",
      declaration: 0,
      approving_authority_file: "gh/approving_authority/Daily_Task_2024-10-30_121833.png",
     "installed_capacity_2024": 45.0,
            "production_2024": 44.0,
            "carbon_emission_2024": 30.0,
            "purity_2024": 46.0,
            "cost_of_production_2024": 97.0,
            "patents_filed_2024": 14,
            "patents_granted_national_2024": 48,
            "patents_granted_international_2024": 48,
            "patents_commercialized_2024": 489,
            "investment_activities_2024": 46.0,
            "investment_activities_2023": 4684.0,
            "investment_electrolyser_2024": 64664.0,
            "investment_electrolyser_2023": 646.0,
            "upcoming_projects_2024": "",
            "upcoming_projects_2023": "",
            "project_name_1": "jugty",
            "location_1": "g",
            "capacity_1": 6547457.0,
            "project_completion_year_1": 77,
            "project_current_status_1": "ft",
            "project_name_2": "dtr",
            "location_2": "dtr",
            "capacity_2": 547.0,
            "project_completion_year_2": 747634,
            "project_current_status_2": "fy",
            "project_name_3": "f",
            "location_3": "guy",
            "capacity_3": 547.0,
            "project_completion_year_3": 7,
            "project_current_status_3": "hi",
            "project_name_4": "huy",
            "location_4": "gu",
            "capacity_4": 4574.0,
            "project_completion_year_4": 47437,
            "project_current_status_4": "gu",
            "project_name_5": "gu",
            "location_5": "gu",
            "capacity_5": 7347.0,
            "project_completion_year_5": 57,
            "project_current_status_5": "gu",
            
            "user_id": 1,
            "form_id": "green_hydrogen_1",
            "form_mode": "draft",
            "installed_capacity_2024_score": 8.18,
            "production_2024_score": 4.63,
            "carbon_emission_2024_score": 5.0,
            "purity_2024_score": 2.74,
            "cost_of_production_2024_score": 2.68,
            "installed_capacity_gh_p_unit": 23.23,
            "patents_filed_2024_score": 0.27,
            "patents_granted_national_2024_score": 0.03,
            "patents_granted_international_2024_score": 0.28,
            "patents_commercialized_2024_score": 2.48,
            "r_and_d_gh_production_total": 3.07
    },
    {
      id: 2,
      organisation_name: "Raygain Technology Pvt Ltd",
      category: "Green Hydrogen Company of the Year",
      firstname: "Harsh",
      lastname: "Rai",
      userid: "",
      company_name: "Raygain Technology Pvt Ltd",
      mailing_address: "gaziyabad",
      authority_name: "Addi",
      authority_title: "SO",
      authority_phone: "6486846848",
      authorityLandline: "5758",
      authority_email: "cds@lk.in",
      contact_name: "harsh",
      contact_phone: "1478515454",
      contact_email: "harsh@gmail.com",
      company_profile: "fds",
      comment: "ytfyhtf",
      declaration: 0,
      approving_authority_file: "",
      "installed_capacity_2024": 55.0,
            "production_2024": 57.0,
            "carbon_emission_2024": 55.0,
            "purity_2024": 84.0,
            "cost_of_production_2024": 52.0,
            "patents_filed_2024": 65,
            "patents_granted_national_2024": 656,
            "patents_granted_international_2024": 68,
            "patents_commercialized_2024": 984,
            "investment_activities_2024": 9874.0,
            "investment_activities_2023": 1354.0,
            "investment_electrolyser_2024": 9847.0,
            "investment_electrolyser_2023": 5644.0,
            "upcoming_projects_2024": "",
            "upcoming_projects_2023": "",
            "project_name_1": "fdtryf",
            "location_1": "yrfyr",
            "capacity_1": 75475.0,
            "project_completion_year_1": 2023,
            "project_current_status_1": "yf",
            "project_name_2": "ytf",
            "location_2": "yt",
            "capacity_2": 7474743.0,
            "project_completion_year_2": 2024,
            "project_current_status_2": "gty",
            "project_name_3": "fyt",
            "location_3": "fr",
            "capacity_3": 7743.0,
            "project_completion_year_3": 2025,
            "project_current_status_3": "yf",
            "project_name_4": "uyf",
            "location_4": "ytf",
            "capacity_4": 747.0,
            "project_completion_year_4": 2021,
            "project_current_status_4": "tfyt",
            "project_name_5": "fy",
            "location_5": "f",
            "capacity_5": 43747.0,
            "project_completion_year_5": 2023,
            "project_current_status_5": "uf",
            
            "user_id": 3,
            "form_id": "green_hydrogen_3",
            "form_mode": "draft",
            "installed_capacity_2024_score": 10.0,
            "production_2024_score": 6.0,
            "carbon_emission_2024_score": 2.73,
            "purity_2024_score": 5.0,
            "cost_of_production_2024_score": 5.0,
            "installed_capacity_gh_p_unit": 28.73,
            "patents_filed_2024_score": 1.27,
            "patents_granted_national_2024_score": 0.42,
            "patents_granted_international_2024_score": 0.4,
            "patents_commercialized_2024_score": 5.0,
            "r_and_d_gh_production_total": 7.09
    },
    {
      id: 3,
      organisation_name: "Raygain Technologies Private Limited",
      category: "Green Hydrogen Company of the Year",
      firstname: "Anant",
      lastname: "Dhama",
      userid: "",
      company_name: "Raygain Technologies Private Limited",
      mailing_address: "dcs",
      authority_name: "fewd",
      authority_title: "fwe",
      authority_phone: "4869494949",
      authorityLandline: "156",
      authority_email: "ujj@e.com",
      contact_name: "Anant",
      contact_phone: "8767676565",
      contact_email: "anant@gindowa.com",
      company_profile: "fwds",
      comment: "fvyvy",
      declaration: 0,
      approving_authority_file: "",
      "installed_capacity_2024": 13.0,
            "production_2024": 95.0,
            "carbon_emission_2024": 64.0,
            "purity_2024": 26.0,
            "cost_of_production_2024": 65.0,
            "patents_filed_2024": 154,
            "patents_granted_national_2024": 4658,
            "patents_granted_international_2024": 684,
            "patents_commercialized_2024": 464,
            "investment_activities_2024": 846.0,
            "investment_activities_2023": 486.0,
            "investment_electrolyser_2024": 486.0,
            "investment_electrolyser_2023": 684.0,
            "upcoming_projects_2024": "",
            "upcoming_projects_2023": "",
            "project_name_1": "sdvw",
            "location_1": "crtfc",
            "capacity_1": 44654.0,
            "project_completion_year_1": 2023,
            "project_current_status_1": "yfyf",
            "project_name_2": "yfvhf",
            "location_2": "yftyhfyftyfy",
            "capacity_2": 646.0,
            "project_completion_year_2": 2021,
            "project_current_status_2": "f",
            "project_name_3": "ytf",
            "location_3": "ytf",
            "capacity_3": 464.0,
            "project_completion_year_3": 2024,
            "project_current_status_3": "ytfv",
            "project_name_4": "tyfv",
            "location_4": "ytfv",
            "capacity_4": 6346.0,
            "project_completion_year_4": 2025,
            "project_current_status_4": "yttfy",
            "project_name_5": "tfv",
            "location_5": "yfv",
            "capacity_5": 646.0,
            "project_completion_year_5": 2022,
            "project_current_status_5": "fvy",
            
            "user_id": 2,
            "form_id": "green_hydrogen_2",
            "form_mode": "draft",
            "installed_capacity_2024_score": 2.36,
            "production_2024_score": 10.0,
            "carbon_emission_2024_score": 2.34,
            "purity_2024_score": 1.55,
            "cost_of_production_2024_score": 4.0,
            "installed_capacity_gh_p_unit": 20.26,
            "patents_filed_2024_score": 3.0,
            "patents_granted_national_2024_score": 3.0,
            "patents_granted_international_2024_score": 4.0,
            "patents_commercialized_2024_score": 2.36,
            "r_and_d_gh_production_total": 12.36
    },
  ];

  const companies = [
    "Raygain Technology Private Limited",
    "Raygain Technology Pvt Ltd",
    "Raygain Technologies Private Limited",
  ];

  const learning_development_score = staticData.map(item => item.learning_development_score);
  const total_no_of_training_score = staticData.map(item => item.total_no_training_days_score);
  const gm = staticData.map(item => item.ldGM);
  const gm_score = staticData.map(item => item.ldGM_score);
  const executive_score = staticData.map(item => item.ldExecutive_score);
  const executive = staticData.map(item => item.ldExecutive);
  const workmen_score = staticData.map(item => item.ldWorkmen_score);
  const workmen = staticData.map(item => item.ldWorkmen);
  const hse_score = staticData.map(item => item.installed_capacity_2024);
  const hse = staticData.map(item => item.ldHSE);
  const no_of_training_hse_score = staticData.map(item => item.HSE_training_days_score);
  
  
  const skill_score = staticData.map(item => item.ldSkill_score);
  const skill = staticData.map(item => item.ldSkill);
  const functional_score = staticData.map(item => item.ldFunctional_score);
  const functional = staticData.map(item => item.ldFunctional);
  const management_score = staticData.map(item => item.ldManagement_score);
  const management = staticData.map(item => item.ldManagement);
  
  

  const attrition_rate_score = staticData.map(item => item.employee_attrition_rate_score);
  const entry_level_attrition_score = staticData.map(item => item.attritionEntry_score);
  const entry_level = staticData.map(item => item.attritionEntry);
  const executive_attrition_score = staticData.map(item => item.attritionExecutive_score);
  const executive_attrition = staticData.map(item => item.attritionExecutive);
  const senior_attrition_score = staticData.map(item => item.attritionSenior_score);
  const senior_attrition = staticData.map(item => item.attritionSenior);
 
 
  const recruitment_score = staticData.map(item => item.recruitment_percent_score);
  const total_vacancies = staticData.map(item => item.recruitVacancies);
  const total_positions_score = staticData.map(item => item.total_vacancies_position_percent);
  const total_positions = staticData.map(item => item.recruitFilled);
  const recruitment_cycle_score = staticData.map(item => item.recruitement_cycle_completion_score);
  const recruitment_cycle = staticData.map(item => item.recruitCycle);
  

  
  const diverse_workforce_score = staticData.map(item => item.diverse_workforce_score);
  const total_no_of_employees = staticData.map(item => item.diversityTotal);
  const young_employees_score = staticData.map(item => item.percentage_young_employee_score);
  const no_of_employees_under40 = staticData.map(item => item.diversityUnder40);
  const no_of_employees_under40_percent = staticData.map(item => item.age_of_employees_under_40);
  const no_of_female_employees_score = staticData.map(item => item.female_employees_score);
  const no_of_female_employees = staticData.map(item => item.diversityFemale);
  const no_of_female_employees_percent = staticData.map(item => item.female_employees_percent);
  const no_of_employees_higher_score = staticData.map(item => item.employees_higher_qualification_score);
  const no_of_employees_higher = staticData.map(item => item.diversityQualified);
  const no_of_employees_higher_percent = staticData.map(item => item.employees_higher_qualification);
  
  
  const growth_differently_abled = staticData.map(item => item.growth_in_differently_abled_employees_score);
  const no_differently_abled_prev = staticData.map(item => item.diversityDisabled2023);
  const no_differently_abled_assessment = staticData.map(item => item.diversityDisabled2024);
  const differently_abled_percent = staticData.map(item => item.no_differently_abled_employees_percent);
  
  
  const PME_score = staticData.map(item => item.preventive_medical_examination_score);
  const PME_percent = staticData.map(item => item.installed_capacity_2024);
  const no_of_undergone_PME = staticData.map(item => item.pmeDone);
  const no_of_employees_PME = staticData.map(item => item.pmeRequired);
  const female_workforce_score = staticData.map(item => item.progress_retaining_female_workforce_score);
  const no_of_female_employees_workforce = staticData.map(item => item.retentionFemalePast);
  const female_workforce_percent = staticData.map(item => item.installed_capacity_2024);
  
 
  const Grievance2 = staticData.map(item => item.grievanceMechanism2);
  const Award2 = staticData.map(item => item.employeeAwards2);
 
 
  const Total_score = staticData.map(item => item.total_hrm_score);



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