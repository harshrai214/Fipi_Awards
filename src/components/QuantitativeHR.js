import React from "react";
import { useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiClient from "../../api/axiosClient";
import "../../styles/scoretable.css";

const ENDPOINT = "/vw-hrm-scores/";

const colToLetter = (col) => {
  let letter = '';
  col--; // 0-based
  do {
    letter = String.fromCharCode(65 + (col % 26)) + letter;
    col = Math.floor(col / 26) - 1;
  } while (col >= 0);
  return letter;
};

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
  const hse_score = apiData.map(item => item.HSE_training_days_score);
  const hse = apiData.map(item => item.ldHSE);
  const no_of_training_hse_score = apiData.map(item => item.no_of_training_days_hse_score);
  
  
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
  const no_of_employees_higher_score =apiData.map(item => item.employees_higher_qualification_score);
  const no_of_employees_higher = apiData.map(item => item.diversityQualified);
  const no_of_employees_higher_percent = apiData.map(item => item.employees_higher_qualification);
  
  
  const growth_differently_abled = apiData.map(item => item.growth_in_differently_abled_employees_score);
  const no_differently_abled_prev = apiData.map(item => item.diversityDisabled2023);
  const no_differently_abled_assessment = apiData.map(item => item.diversityDisabled2024);
  const differently_abled_percent = apiData.map(item => item.no_differently_abled_employees_percent);
  
  
  const PME_score = apiData.map(item => item.preventive_medical_examination_score);
  const PME_percent = apiData.map(item => item.no_of_undergone_PME_percent);
  const no_of_undergone_PME = apiData.map(item => item.pmeDone);
  const no_of_employees_PME = apiData.map(item => item.pmeRequired);
  const female_workforce_score = apiData.map(item => item.progress_retaining_female_workforce_score);
  const no_of_female_employees_workforce = apiData.map(item => item.retentionFemalePast);
  const female_workforce_percent = apiData.map(item => item.female_employees_5_years_percent);
  
 
  const Grievance2 = apiData.map(item => item.grievanceMechanism2);
  const Award2 = apiData.map(item => item.employeeAwards2);
 
 
  const Total_score = apiData.map(item => item.total_hrm_score);

  const safeFmt = (v, digits = 2) => {
    if (v === null || v === undefined || v === "") return "-";
    if (typeof v === "number" && Number.isFinite(v)) {
      return v.toFixed(digits);
    }
    const num = Number(v);
    if (!Number.isNaN(num) && Number.isFinite(num)) {
      return digits === 0 ? String(Math.round(num)) : num.toFixed(digits);
    }
    try {
      return String(v);
    } catch {
      return "-";
    }
  };

  const handleExport = () => {
    const aoa = [];
    const first_company_col = 7; // G for first company
    const n = companies.length;
    const max_col_letter = colToLetter(first_company_col + n - 1);
    aoa.push([null, 'Criteria', 'Unit', null, 'Max Marks', 'Max/Min', ...companies, null]);
    aoa.push([
      1,
      'Learning & Development',
      'No.',
      'Score',
      35,
      null,
      ...companies.map((_, i) => ({
        f: `SUM(${colToLetter(first_company_col + i)}3:${colToLetter(first_company_col + i)}18)`,
        v: safeFmt(learning_development_score[i], 2),
      })),
      null,
    ]);

    aoa.push([
      null,
      'Total no. of training days imparted to such employees/no. of such employees at the mentioned level',
      'No.',
      'Score',
      15,
      null,
      ...companies.map((_, i) => ({
        f: `SUM(${colToLetter(first_company_col + i)}5,${colToLetter(first_company_col + i)}7,${colToLetter(first_company_col + i)}9)`,
        v: safeFmt(total_no_of_training_score[i], 2),
      })),
      null,
    ]);

    // Row 4: 1.1,GM and above,No.,Performance,, raw gm
    aoa.push([
      1.1,
      'GM and above',
      'No.',
      'Performance',
      null,
      null,
      ...gm.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 5: ,,,Score,5,, scores
    aoa.push([
      null,
      null,
      null,
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}4/MAX(${colToLetter(first_company_col)}4:${max_col_letter}4)`,
        v: safeFmt(gm_score[i], 2),
      })),
      null,
    ]);

    // Row 6: 1.2,Executive (up to E-6 level in PSU or equivalent),No.,Performance,, raw executive
    aoa.push([
      1.2,
      'Executive (up to E-6 level in PSU or equivalent)',
      'No.',
      'Performance',
      null,
      null,
      ...executive.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 7: ,,,Score,5,, scores
    aoa.push([
      null,
      null,
      null,
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}6/MAX(${colToLetter(first_company_col)}6:${max_col_letter}6)`,
        v: safeFmt(executive_score[i], 2),
      })),
      null,
    ]);

    // Row 8: 1.3,Workmen,No.,Performance,, raw workmen
    aoa.push([
      1.3,
      'Workmen',
      'No.',
      'Performance',
      null,
      null,
      ...workmen.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 9: ,,,Score,5,, scores
    aoa.push([
      null,
      null,
      null,
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}8/MAX(${colToLetter(first_company_col)}8:${max_col_letter}8)`,
        v: safeFmt(workmen_score[i], 2),
      })),
      null,
    ]);

    // Row 10: 1.4,HSE training days per employee ,No.,Score,5,, scores
    aoa.push([
      1.4,
      'HSE training days per employee ',
      'No.',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}11/MAX(${colToLetter(first_company_col)}11:${max_col_letter}11)`,
        v: safeFmt(hse_score[i], 2),
      })),
      null,
    ]);
    aoa.push([
      null,
      null,
      'No.',
      'Performance',
      null,
      null,
      ...hse.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 12: 1.5,No. of training days (excluding HSE) per employee for each of the following,No.,Score,15,, scores
    aoa.push([
      1.5,
      'No. of training days (excluding HSE) per employee for each of the following',
      'No.',
      'Score',
      15,
      null,
      ...companies.map((_, i) => ({
        f: `SUM(${colToLetter(first_company_col + i)}14,${colToLetter(first_company_col + i)}16,${colToLetter(first_company_col + i)}18)`,
        v: safeFmt(no_of_training_hse_score[i], 2),
      })),
      null,
    ]);

    // Row 13: 1.5.1,Skill Development Training,No.,Performance,, raw skill
    aoa.push([
      1.5.1,
      'Skill Development Training',
      'No.',
      'Performance',
      null,
      null,
      ...skill.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 14: ,,,Score,5,, scores
    aoa.push([
      null,
      null,
      null,
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}13/MAX(${colToLetter(first_company_col)}13:${max_col_letter}13)`,
        v: safeFmt(skill_score[i], 2),
      })),
      null,
    ]);

    // Row 15: 1.5.2,Functional/On-job Training,No.,Performance,, raw functional
    aoa.push([
      1.5.2,
      'Functional/On-job Training',
      'No.',
      'Performance',
      null,
      null,
      ...functional.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 16: ,,,Score,5,, scores
    aoa.push([
      null,
      null,
      null,
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}15/MAX(${colToLetter(first_company_col)}15:${max_col_letter}15)`,
        v: safeFmt(functional_score[i], 2),
      })),
      null,
    ]);

    // Row 17: 1.5.3,Management Training,No.,Performance,, raw management
    aoa.push([
      1.5.3,
      'Management Training',
      'No.',
      'Performance',
      null,
      null,
      ...management.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 18: ,,,Score,5,, scores
    aoa.push([
      null,
      null,
      null,
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}17/MAX(${colToLetter(first_company_col)}17:${max_col_letter}17)`,
        v: safeFmt(management_score[i], 2),
      })),
      null,
    ]);

    // Row 19: 2,Employee attrition rate (other than retirement),No.,Score,15,, scores
    aoa.push([
      2,
      'Employee attrition rate (other than retirement)',
      'No.',
      'Score',
      15,
      null,
      ...companies.map((_, i) => ({
        f: `SUM(${colToLetter(first_company_col + i)}21,${colToLetter(first_company_col + i)}23,${colToLetter(first_company_col + i)}25)`,
        v: safeFmt(attrition_rate_score[i], 2),
      })),
      null,
    ]);

    // Row 20: 2.1,Entry level (within first two years of joining),No.,Performance,, raw entry_level
    aoa.push([
      2.1,
      'Entry level (within first two years of joining)',
      'No.',
      'Performance',
      null,
      null,
      ...entry_level.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 21: ,,,Score,5,, scores (lowest gets max)
    aoa.push([
      null,
      null,
      null,
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*MIN(${colToLetter(first_company_col)}20:${max_col_letter}20)/${colToLetter(first_company_col + i)}20`,
        v: safeFmt(entry_level_attrition_score[i], 2),
      })),
      null,
    ]);

    // Row 22: 2.2,Executives (up to E-6 level in PSU or equivalent),No.,Performance,, raw executive_attrition
    aoa.push([
      2.2,
      'Executives (up to E-6 level in PSU or equivalent)',
      'No.',
      'Performance',
      null,
      null,
      ...executive_attrition.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 23: ,,,Score,5,, scores (lowest gets max)
    aoa.push([
      null,
      null,
      null,
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*MIN(${colToLetter(first_company_col)}22:${max_col_letter}22)/${colToLetter(first_company_col + i)}22`,
        v: safeFmt(executive_attrition_score[i], 2),
      })),
      null,
    ]);

    // Row 24: 2.3,Senior Management,No.,Performance,, raw senior_attrition
    aoa.push([
      2.3,
      'Senior Management',
      'No.',
      'Performance',
      null,
      null,
      ...senior_attrition.map((v) => safeFmt(v, 2)),
      null,
    ]);

    // Row 25: ,,,Score,5,, scores (lowest gets max)
    aoa.push([
      null,
      null,
      null,
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*MIN(${colToLetter(first_company_col)}24:${max_col_letter}24)/${colToLetter(first_company_col + i)}24`,
        v: safeFmt(senior_attrition_score[i], 2),
      })),
      null,
    ]);

    // Row 26: 3,% Recruitment  (full-time ; regular employees),%,Score,5,, scores
    aoa.push([
      3,
      '% Recruitment  (full-time ; regular employees)',
      '%',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}29/MAX(${colToLetter(first_company_col)}29:${max_col_letter}29)`,
        v: safeFmt(recruitment_score[i], 2),
      })),
      null,
    ]);

    // Row 27: 3.1,Total vacancies identified for recruitment to be done during the year,No.,Performance,, raw total_vacancies
    aoa.push([
      3.1,
      'Total vacancies identified for recruitment to be done during the year',
      'No.',
      'Performance',
      null,
      null,
      ...total_vacancies.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 28: 3.2,Total no. of positions filled during  the year through hiring,No.,Performance,, raw total_positions
    aoa.push([
      3.2,
      'Total no. of positions filled during  the year through hiring',
      'No.',
      'Performance',
      null,
      null,
      ...total_positions.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 29: ,,%,Score,, raw total_positions_score, but with f for %
    aoa.push([
      null,
      null,
      '%',
      'Score',
      null,
      null,
      ...companies.map((_, i) => ({
        f: `100*${colToLetter(first_company_col + i)}28/${colToLetter(first_company_col + i)}27`,
        v: safeFmt(total_positions_score[i], 2),
      })),
      null,
    ]);

    // Row 30: 4,Recruitement Cycle Completion ,No.,Score,5,, scores (lowest gets max)
    aoa.push([
      4,
      'Recruitement Cycle Completion ',
      'No.',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*MIN(${colToLetter(first_company_col)}31:${max_col_letter}31)/${colToLetter(first_company_col + i)}31`,
        v: safeFmt(recruitment_cycle_score[i], 2),
      })),
      null,
    ]);

    // Row 31: ,Avg. no. of days from when the job requisition was received until the offer was accepted by the candidate,No.,Performance,, raw recruitment_cycle
    aoa.push([
      null,
      'Avg. no. of days from when the job requisition was received until the offer was accepted by the candidate',
      'No.',
      'Performance',
      null,
      null,
      ...recruitment_cycle.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 32: 5,Diverse workforce (as on 31st March),,Score,20,, scores
    aoa.push([
      5,
      'Diverse workforce (as on 31st March)',
      null,
      'Score',
      20,
      null,
      ...companies.map((_, i) => ({
        f: `SUM(${colToLetter(first_company_col + i)}34:${colToLetter(first_company_col + i)}46:2)`,
        v: safeFmt(diverse_workforce_score[i], 2),
      })),
      null,
    ]);

    // Row 33: -,Total no. of employees ,No.,,,, raw total_no_of_employees
    aoa.push([
      null,
      'Total no. of employees ',
      'No.',
      null,
      null,
      null,
      ...total_no_of_employees.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 34: ,Percentage young employees ,%,Score,5,, scores
    aoa.push([
      null,
      'Percentage young employees ',
      '%',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}36/MAX(${colToLetter(first_company_col)}36:${max_col_letter}36)`,
        v: safeFmt(young_employees_score[i], 2),
      })),
      null,
    ]);

    // Row 35: 5.1,No. of Employees under 40 years ,No.,,,, raw no_of_employees_under40
    aoa.push([
      5.1,
      'No. of Employees under 40 years ',
      'No.',
      null,
      null,
      null,
      ...no_of_employees_under40.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 36: ,%age of employees who are under 40 years,%,Performance,, formulas for %
    aoa.push([
      null,
      '%age of employees who are under 40 years',
      '%',
      'Performance',
      null,
      null,
      ...companies.map((_, i) => ({
        f: `100*${colToLetter(first_company_col + i)}35/${colToLetter(first_company_col + i)}33`,
        v: safeFmt(no_of_employees_under40_percent[i], 2),
      })),
      null,
    ]);

    // Row 37: ,% Female employees ,%,Score,5,, scores
    aoa.push([
      null,
      '% Female employees ',
      '%',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}39/MAX(${colToLetter(first_company_col)}39:${max_col_letter}39)`,
        v: safeFmt(no_of_female_employees_score[i], 2),
      })),
      null,
    ]);

    // Row 38: 5.2,No. of female employees,No.,,,, raw no_of_female_employees
    aoa.push([
      5.2,
      'No. of female employees',
      'No.',
      null,
      null,
      null,
      ...no_of_female_employees.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 39: ,% female employees,%,Performance,, formulas for %
    aoa.push([
      null,
      '% female employees',
      '%',
      'Performance',
      null,
      null,
      ...companies.map((_, i) => ({
        f: `100*${colToLetter(first_company_col + i)}38/${colToLetter(first_company_col + i)}33`,
        v: safeFmt(no_of_female_employees_percent[i], 2),
      })),
      null,
    ]);

    // Row 40: ,% employees having higher qualification (post graduates & above),%,Score,5,, scores
    aoa.push([
      null,
      '% employees having higher qualification (post graduates & above)',
      '%',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}42/MAX(${colToLetter(first_company_col)}42:${max_col_letter}42)`,
        v: safeFmt(no_of_employees_higher_score[i], 2),
      })),
      null,
    ]);

    // Row 41: 5.3,No. of Employees having higher qualification (post graduates & above),No.,,,, raw no_of_employees_higher
    aoa.push([
      5.3,
      'No. of Employees having higher qualification (post graduates & above)',
      'No.',
      null,
      null,
      null,
      ...no_of_employees_higher.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 42: ,,%,Performance,, formulas for %
    aoa.push([
      null,
      null,
      '%',
      'Performance',
      null,
      null,
      ...companies.map((_, i) => ({
        f: `100*${colToLetter(first_company_col + i)}41/${colToLetter(first_company_col + i)}33`,
        v: safeFmt(no_of_employees_higher_percent[i], 2),
      })),
      null,
    ]);

    // Row 43: ,% Growth in differently-abled employement (as on 31st March),%,Score,5,, scores
    aoa.push([
      null,
      '% Growth in differently-abled employement (as on 31st March)',
      '%',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}46/MAX(${colToLetter(first_company_col)}46:${max_col_letter}46)`,
        v: safeFmt(growth_differently_abled[i], 2),
      })),
      null,
    ]);

    // Row 44: 5.4,No. of differently-abled employees duirng previous year,No.,,,, raw no_differently_abled_prev
    aoa.push([
      5.4,
      'No. of differently-abled employees duirng previous year',
      'No.',
      null,
      null,
      null,
      ...no_differently_abled_prev.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 45: ,No. of differently-abled employees duirng assessment year,No.,,,, raw no_differently_abled_assessment
    aoa.push([
      null,
      'No. of differently-abled employees duirng assessment year',
      'No.',
      null,
      null,
      null,
      ...no_differently_abled_assessment.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 46: ,Increase ,%,Performance,, formulas for %
    aoa.push([
      null,
      'Increase ',
      '%',
      'Performance',
      null,
      null,
      ...companies.map((_, i) => ({
        f: `100*(${colToLetter(first_company_col + i)}45 - ${colToLetter(first_company_col + i)}44)/${colToLetter(first_company_col + i)}44`,
        v: safeFmt(differently_abled_percent[i], 2),
      })),
      null,
    ]);

    // Row 47: 6,Preventive Medical Examination (PME),%,Score,5,, scores
    aoa.push([
      6,
      'Preventive Medical Examination (PME)',
      '%',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}50/MAX(${colToLetter(first_company_col)}50:${max_col_letter}50)`,
        v: safeFmt(PME_score[i], 2),
      })),
      null,
    ]);

    // Row 48: 6.1,No. of undergone PME in current year,No.,,,, raw no_of_undergone_PME
    aoa.push([
      6.1,
      'No. of undergone PME in current year',
      'No.',
      null,
      null,
      null,
      ...no_of_undergone_PME.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 49: 6.2,No. of employees who were to undergo PME as per company policy during the year,No.,,,, raw no_of_employees_PME
    aoa.push([
      6.2,
      'No. of employees who were to undergo PME as per company policy during the year',
      'No.',
      null,
      null,
      null,
      ...no_of_employees_PME.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 50: ,,%,,, formulas for %
    aoa.push([
      null,
      null,
      '%',
      null,
      null,
      null,
      ...companies.map((_, i) => ({
        f: `100*${colToLetter(first_company_col + i)}48/${colToLetter(first_company_col + i)}49`,
        v: safeFmt(PME_percent[i], 2),
      })),
      null,
    ]);

    // Row 51: 7,Progress in Retaining Female Workforce,%,Score,5,, scores
    aoa.push([
      7,
      'Progress in Retaining Female Workforce',
      '%',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        f: `5*${colToLetter(first_company_col + i)}53/MAX(${colToLetter(first_company_col)}53:${max_col_letter}53)`,
        v: safeFmt(female_workforce_score[i], 2),
      })),
      null,
    ]);

    // Row 52: -,No. of Female employees 5 Years Ago,No.,,,, raw no_of_female_employees_workforce
    aoa.push([
      null,
      'No. of Female employees 5 Years Ago',
      'No.',
      null,
      null,
      null,
      ...no_of_female_employees_workforce.map((v) => safeFmt(v, 0)),
      null,
    ]);

    // Row 53: ,Increase ,%,Performance,, formulas for %
    aoa.push([
      null,
      'Increase ',
      '%',
      'Performance',
      null,
      null,
      ...companies.map((_, i) => ({
        f: `100*(${colToLetter(first_company_col + i)}38 - ${colToLetter(first_company_col + i)}52)/${colToLetter(first_company_col + i)}52`,
        v: safeFmt(female_workforce_percent[i], 2),
      })),
      null,
    ]);

    // Row 54: 8,Grievance Redressal Mechanism...,write-up,Score,5,, manual scores
    aoa.push([
      8,
      'Grievance Redressal Mechanism (Does the company provide a channel through which employees can report suspected grievances, and does the channel allow for confidential and/or anonymous reporting - Yes/No. If yes, provide details in bullet points - Within 300 words)',
      'write-up',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        v: safeFmt(0, 2), // Placeholder, as manual
      })),
      null,
    ]);

    // Add write-up text in a separate row or cell if needed, but since not, skip.

    // Row 55: 9,Recognition & Award Programmes...,write-up,Score,5,, manual scores
    aoa.push([
      9,
      'Recognition & Award Programmes for Employees (Details in bullet points of awards/recognitions programmes active within the organization for employees in the year 2024-25 : Within 300 words)',
      'write-up',
      'Score',
      5,
      null,
      ...companies.map((_, i) => ({
        v: safeFmt(0, 2), // Placeholder, as manual
      })),
      null,
    ]);

    // Row 56: ,,,,100,, total
    aoa.push([
      null,
      null,
      null,
      null,
      100,
      null,
      ...companies.map((_, i) => ({
        f: `SUM(${colToLetter(first_company_col + i)}2,${colToLetter(first_company_col + i)}19,${colToLetter(first_company_col + i)}26,${colToLetter(first_company_col + i)}30,${colToLetter(first_company_col + i)}32,${colToLetter(first_company_col + i)}47,${colToLetter(first_company_col + i)}51,${colToLetter(first_company_col + i)}54,${colToLetter(first_company_col + i)}55)`,
        v: safeFmt(Total_score[i], 2),
      })),
      null,
    ]);

    const sheet = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "HRM_Scores.xlsx");
  };

  return (
    <div className="table-box">
      <button
        onClick={handleExport} className="export-btn"
        
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
            <td className="border px-3 py-2">35</td>
            <td className="border px-3 py-2"></td>
           
            {learning_development_score.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(s, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr> <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3</td>
         <td className="border px-3 py-2" >
       <strong>% Recruitment (full-time ; regular employees) Score </strong>
       </td>

            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {recruitment_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
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
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>

           
              <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Total</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">100</td>
            <td className="border px-3 py-2"></td>
           
            {Total_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default HRMscoretable;
