// // import React, { useState, useEffect } from "react";
// // import * as XLSX from "xlsx";

// // export default function HrmScore({
// //   apiUrl = "/api/hrm",
// //   templateUrl = "/templates/HRM - Co of the Year - FINAL Evaluation Sheet.xlsx",
// //   filename = "hrm-filled.xlsx",
// //   limitCompanies = 5
// // }) {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [useMock, setUseMock] = useState(false);
// //   const [apiData, setApiData] = useState([]);
// //   const [fetchLoading, setFetchLoading] = useState(true);

// //   const mockData = [
// //     {
// //       "id": 3,
// //       "organisation_name": "Raygain Technology Private Limited",
// //       "category": "Human Resource Management Company of the Year",
// //       "firstname": "Adarsh",
// //       "lastname": "Chaudhary",
// //       "userid": "1",
// //       "company_name": "Raygain Technology Private Limited",
// //       "mailing_address": "rj",
// //       "authority_name": "Addi",
// //       "authority_title": "SDE2",
// //       "authority_phone": "0000000000",
// //       "authorityLandline": "75467",
// //       "authority_email": "ter@w.com",
// //       "copy_applicant_data": 0,
// //       "contact_name": "Adarsh Chaudhary",
// //       "contact_phone": "9874566321",
// //       "contact_email": "adarsh@raygain.com",
// //       "company_profile": "freds",
// //       "declaration": 1,
// //       "comment": "vere",
// //       "approving_authority_file": "hrm/approving_authority/Overseas_Oil__Gas_Company_of_the_Year.pdf",
// //       "ldGM": 484.0,
// //       "ldExecutive": 64.0,
// //       "ldWorkmen": 864.0,
// //       "ldHSE": 684.0,
// //       "ldSkill": 864.0,
// //       "ldFunctional": 684.0,
// //       "ldManagement": 864.0,
// //       "attritionEntry": 8648.0,
// //       "attritionExecutive": 648.0,
// //       "attritionSenior": 64.0,
// //       "recruitVacancies": 6846,
// //       "recruitFilled": 846,
// //       "recruitCycle": 486468.0,
// //       "diversityTotal": 556,
// //       "diversityUnder40": 486,
// //       "diversityFemale": 46,
// //       "diversityQualified": 46486,
// //       "diversityDisabled2024": 23,
// //       "diversityDisabled2023": 23,
// //       "pmeDone": 46546,
// //       "pmeRequired": 8468,
// //       "retentionFemalePast": 486,
// //       "grievanceMechanism": "Yes",
// //       "grievanceMechanism2": "34656",
// //       "grievanceMechanism3": "",
// //       "employeeAwards": "Yes",
// //       "employeeAwards2": "63465",
// //       "employeeAwards3": "",
// //       "attachments1_desc": "gtregt",
// //       "attachments1": "hrm/attachments/anant_cv_print_v1.1.pdf",
// //       "attachments2_desc": "gtr",
// //       "attachments2": "hrm/attachments/history_2.jpg",
// //       "attachments3_desc": "bhtr",
// //       "attachments3": "hrm/attachments/history_2_1.jpg",
// //       "attachments4_desc": "rber",
// //       "attachments4": "hrm/attachments/Anant_Dhama_CV_v_1.1.pdf",
// //       "created_at": "2025-08-28T19:17:27.944207",
// //       "user_id": 1,
// //       "form_id": "HRM_Registration_1",
// //       "form_mode": "draft",
// //       "differently_abled_employees_ass_year": "23",
// //       "ldGM_max": 484.0,
// //       "ldExecutive_max": 64.0,
// //       "ldWorkmen_max": 864.0,
// //       "ldHSE_max": 684.0,
// //       "ldSkill_max": 864.0,
// //       "ldFunctional_max": 684.0,
// //       "ldManagement_max": 864.0,
// //       "attritionEntry_min": 8648.0,
// //       "attritionExecutive_min": 648.0,
// //       "attritionSenior_min": 64.0,
// //       "total_vacancies_position_percent_max": 12.3576,
// //       "recruitCycle_min": 486468.0,
// //       "age_of_employees_under_40_max": 87.4101,
// //       "female_employees_percent_max": 8.2734,
// //       "employees_higher_qualification_max": 8360.7914,
// //       "no_differently_abled_employees_percent_max": 0.0,
// //       "no_of_undergone_PME_percent_max": 549.6693,
// //       "female_employees_5_years_percent_max": 0.0,
// //       "ldGM_score": 5.0,
// //       "ldExecutive_score": 5.0,
// //       "ldWorkmen_score": 5.0,
// //       "HSE_training_days_score": 5.0,
// //       "ldSkill_score": 5.0,
// //       "ldFunctional_score": 5.0,
// //       "ldManagement_score": 5.0,
// //       "total_no_training_days_score": 15.0,
// //       "no_of_training_days_hse_score": 15.0,
// //       "learning_development_score": 35.0,
// //       "attritionEntry_score": 5.0,
// //       "attritionExecutive_score": 5.0,
// //       "attritionSenior_score": 5.0,
// //       "employee_attrition_rate_score": 15.0,
// //       "total_vacancies_position_percent": 12.3576,
// //       "recruitment_percent_score": 5.0,
// //       "recruitement_cycle_completion_score": 5.0,
// //       "age_of_employees_under_40": 87.4101,
// //       "percentage_young_employee_score": 5.0,
// //       "female_employees_percent": 8.2734,
// //       "female_employees_score": 5.0,
// //       "employees_higher_qualification": 8360.7914,
// //       "employees_higher_qualification_score": 5.0,
// //       "no_differently_abled_employees_percent": 0.0,
// //       "growth_in_differently_abled_employees_score": 0.0,
// //       "diverse_workforce_score": 15.0,
// //       "preventive_medical_examination_score": 5.0,
// //       "progress_retaining_female_workforce_score": 0.0,
// //       "total_hrm_score": 80.0
// //     }
// //   ];

// //   // useEffect(() => {
// //   //   const fetchData = async () => {
// //   //     setFetchLoading(true);
// //   //     try {
// //   //       const res = await fetch(apiUrl);
// //   //       if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
// //   //       const data = await res.json();
// //   //       setApiData(data.results || data);
// //   //     } catch (err) {
// //   //       console.error("API error:", err);
// //   //       setError("Failed to fetch data from API");
// //   //     }
// //   //     setFetchLoading(false);
// //   //   };

// //   //   if (useMock) {
// //   //     setApiData(mockData);
// //   //     setFetchLoading(false);
// //   //   } else {
// //   //     fetchData();
// //   //   }
// //   // }, [useMock, apiUrl]);

// //   // if (fetchLoading) return <div>Loading data...</div>;
// //   // if (error) return <div>{error}</div>;

// //   // Define items to fill
// //   const RAW_ITEMS = [
// //     { key: "ldGM", label: "1.1", offset: 0 },
// //     { key: "ldExecutive", label: "1.2", offset: 0 },
// //     { key: "ldWorkmen", label: "1.3", offset: 0 },
// //     { key: "ldHSE", label: "1.4", offset: 1 },
// //     { key: "ldSkill", label: "1.5.1", offset: 0 },
// //     { key: "ldFunctional", label: "1.5.2", offset: 0 },
// //     { key: "ldManagement", label: "1.5.3", offset: 0 },
// //     { key: "attritionEntry", label: "2.1", offset: 0 },
// //     { key: "attritionExecutive", label: "2.2", offset: 0 },
// //     { key: "attritionSenior", label: "2.3", offset: 0 },
// //     { key: "recruitVacancies", label: "3.1", offset: 0 },
// //     { key: "recruitFilled", label: "3.2", offset: 0 },
// //     { key: "recruitCycle", label: "4", offset: 1 },
// //     { key: "diversityTotal", label: "Total no. of employees", offset: 0 },
// //     { key: "diversityUnder40", label: "5.1", offset: 0 },
// //     { key: "diversityFemale", label: "5.2", offset: 0 },
// //     { key: "diversityQualified", label: "5.3", offset: 0 },
// //     { key: "diversityDisabled2023", label: "5.4", offset: 0 },
// //     { key: "diversityDisabled2024", label: "5.4", offset: 1 },
// //     { key: "pmeDone", label: "6.1", offset: 0 },
// //     { key: "pmeRequired", label: "6.2", offset: 0 },
// //     { key: "retentionFemalePast", label: "7", offset: 1 },
// //   ];

// //   const SCORE_ITEMS = [
// //     { key: "learning_development_score", label: "1", offset: 0 },
// //     { key: "total_no_training_days_score", label: "Total no. of training days imparted to such employees/no. of such employees at the mentioned level", offset: 0 },
// //     { key: "ldGM_score", label: "1.1", offset: 1 },
// //     { key: "ldExecutive_score", label: "1.2", offset: 1 },
// //     { key: "ldWorkmen_score", label: "1.3", offset: 1 },
// //     { key: "HSE_training_days_score", label: "1.4", offset: 0 },
// //     { key: "no_of_training_days_hse_score", label: "1.5", offset: 0 },
// //     { key: "ldSkill_score", label: "1.5.1", offset: 1 },
// //     { key: "ldFunctional_score", label: "1.5.2", offset: 1 },
// //     { key: "ldManagement_score", label: "1.5.3", offset: 1 },
// //     { key: "employee_attrition_rate_score", label: "2", offset: 0 },
// //     { key: "attritionEntry_score", label: "2.1", offset: 1 },
// //     { key: "attritionExecutive_score", label: "2.2", offset: 1 },
// //     { key: "attritionSenior_score", label: "2.3", offset: 1 },
// //     { key: "recruitment_percent_score", label: "3", offset: 0 },
// //     { key: "recruitement_cycle_completion_score", label: "4", offset: 0 },
// //     { key: "diverse_workforce_score", label: "5", offset: 0 },
// //     { key: "percentage_young_employee_score", label: "Percentage young employees", offset: 0 },
// //     { key: "female_employees_score", label: "% Female employees", offset: 0 },
// //     { key: "employees_higher_qualification_score", label: "% employees having higher qualification", offset: 0 },
// //     { key: "growth_in_differently_abled_employees_score", label: "% Growth in differently-abled employement", offset: 0 },
// //     { key: "preventive_medical_examination_score", label: "6", offset: 0 },
// //     { key: "progress_retaining_female_workforce_score", label: "7", offset: 0 },
// //     { key: "total_hrm_score", label: "100", searchCol: 4, offset: 0 },
// //   ];

// //   const PERCENT_ITEMS = [
// //     { key: "total_vacancies_position_percent", label: "3.2", offset: 1 },
// //     { key: "age_of_employees_under_40", label: "5.1", offset: 1 },
// //     { key: "female_employees_percent", label: "5.2", offset: 1 },
// //     { key: "employees_higher_qualification", label: "5.3", offset: 1 },
// //     { key: "no_differently_abled_employees_percent", label: "5.4", offset: 2 },
// //     { key: "no_of_undergone_PME_percent_max", label: "6.2", offset: 1 },
// //     { key: "female_employees_5_years_percent_max", label: "7", offset: 2 },
// //   ];

// //   const decode = XLSX.utils.decode_range;
// //   const encode_cell = XLSX.utils.encode_cell;
// //   const encode_range = XLSX.utils.encode_range;

// //   const readTemplate = async () => {
// //     if (!templateUrl) throw new Error("Template URL is required.");
// //     const res = await fetch(templateUrl);
// //     if (!res.ok) throw new Error(`Failed to fetch template: ${res.status}`);
// //     const buf = await res.arrayBuffer();
// //     return XLSX.read(buf, { type: "array" });
// //   };

// //   const textAt = (sheet, c, r) => {
// //     const cell = sheet[encode_cell({ c, r })];
// //     if (!cell) return "";
// //     const v = cell.w ?? cell.v;
// //     return v == null ? "" : String(v);
// //   };

// //   const findRowByLabel = (sheet, label, searchCol = null) => {
// //     const ref = sheet["!ref"] || "A1:T500";
// //     const rng = decode(ref);
// //     const maxR = Math.max(rng.e.r, 499);
// //     const maxC = Math.max(Math.min(rng.e.c, 19), 0);
// //     const target = label.replace(/\s+/g, "").toLowerCase();
// //     for (let r = 0; r <= maxR; r++) {
// //       if (searchCol !== null) {
// //         const t = textAt(sheet, searchCol, r).replace(/\s+/g, "").toLowerCase();
// //         if (t === target || t.startsWith(target)) return r;
// //       } else {
// //         for (let c = 0; c <= maxC; c++) {
// //           const t = textAt(sheet, c, r).replace(/\s+/g, "").toLowerCase();
// //           if (!t) continue;
// //           if (t === target || t.startsWith(target)) return r;
// //         }
// //       }
// //     }
// //     return null;
// //   };

// //   const lastUsedColumn = (sheet) => {
// //     const ref = sheet["!ref"] || "A1:A1";
// //     const rng = decode(ref);
// //     let maxC = rng.e.c;
// //     for (let c = rng.e.c + 1; c <= rng.e.c + 50; c++) {
// //       let has = false;
// //       for (let r = rng.s.r; r <= rng.e.r; r++) {
// //         const cell = sheet[encode_cell({ c, r })];
// //         if (cell && cell.v !== undefined && cell.v !== "") {
// //           has = true;
// //           break;
// //         }
// //       }
// //       if (has) maxC = c;
// //     }
// //     return maxC;
// //   };

// //   const ensureRefCovers = (sheet, colIndex) => {
// //     const ref = sheet["!ref"] || "A1:A1";
// //     const rng = decode(ref);
// //     if (colIndex > rng.e.c) {
// //       rng.e.c = colIndex;
// //       sheet["!ref"] = encode_range(rng);
// //     }
// //   };

// //   const writeValue = (sheet, c, r, val) => {
// //     const addr = encode_cell({ c, r });
// //     if (val === null || val === undefined || val === "") {
// //       delete sheet[addr];
// //       return;
// //     }

// //     const n = Number(val);
// //     sheet[addr] =
// //       Number.isFinite(n) && String(val).trim() !== ""
// //         ? { t: "n", v: n }
// //         : { t: "s", v: String(val) };
// //   };

// //   const HEADER_ROW_INDEX = 0;
// //   const START_COL_INDEX = 6;

// //   const handleDownload = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const companies = apiData.slice(0, limitCompanies);
// //       if (!companies.length) throw new Error("No companies data available");

// //       const wb = await readTemplate();
// //       const sheetName = wb.SheetNames.includes("Sheet1") ? "Sheet1" : wb.SheetNames[0];
// //       const ws = wb.Sheets[sheetName];
// //       if (!ws) throw new Error(`Sheet "${sheetName}" not found in template`);

// //       const allItems = [...RAW_ITEMS, ...SCORE_ITEMS, ...PERCENT_ITEMS];
// //       const discoveredRows = {};
// //       for (const item of allItems) {
// //         const dk = item.label + (item.searchCol ?? "");
// //         if (discoveredRows[dk] === undefined) {
// //           const r = findRowByLabel(ws, item.label, item.searchCol ?? null);
// //           discoveredRows[dk] = r;
// //         }
// //       }

// //       companies.forEach((comp, i) => {
// //         const colIndex = START_COL_INDEX + i;

// //         writeValue(
// //           ws,
// //           colIndex,
// //           HEADER_ROW_INDEX,
// //           comp.organisation_name || `Co. ${String.fromCharCode(65 + i)}`
// //         );

// //         [...RAW_ITEMS, ...PERCENT_ITEMS, ...SCORE_ITEMS].forEach((item) => {
// //           const dk = item.label + (item.searchCol ?? "");
// //           const r = discoveredRows[dk];
// //           if (r !== null) {
// //             writeValue(ws, colIndex, r + item.offset, comp[item.key]);
// //           }
// //         });

// //         ensureRefCovers(ws, colIndex);
// //       });

// //       const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
// //       const blob = new Blob([wbout], { type: "application/octet-stream" });
// //       const url = URL.createObjectURL(blob);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = filename;
// //       document.body.appendChild(a);
// //       a.click();
// //       a.remove();
// //       URL.revokeObjectURL(url);
// //     } catch (e) {
// //       console.error(e);
// //       setError(e.message || "Failed to build Excel");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: 6, border: "1px solid #3333", borderRadius: 12 }}>
// //       <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
// //         <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
// //           <input
// //             type="checkbox"
// //             checked={useMock}
// //             onChange={(e) => setUseMock(e.target.checked)}
// //           />
// //           Use mock data (frontend test)
// //         </label>
// //         <button onClick={handleDownload} disabled={loading}>
// //           {loading ? "Preparing…" : "Download Filled Excel"}
// //         </button>
// //         {error && <span style={{ color: "crimson" }}>{error}</span>}
// //       </div>
// //     </div>
// //   );
// // }


// import React from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const ExcelModifier = () => {
//   const data = {
//     ldGM: 484.0,
//     ldExecutive: 64.0,
//     ldWorkmen: 864.0,
//     ldHSE: 684.0,
//     ldSkill: 864.0,
//     ldFunctional: 684.0,
//     ldManagement: 864.0,
//     attritionEntry: 8648.0,
//     attritionExecutive: 648.0,
//     attritionSenior: 64.0,
//     recruitVacancies: 6846,
//     recruitFilled: 846,
//     recruitCycle: 486468.0,
//     diversityTotal: 556,
//     diversityUnder40: 486,
//     diversityFemale: 46,
//     diversityQualified: 46486,
//     diversityDisabled2024: 23,
//     diversityDisabled2023: 23,
//     pmeDone: 46546,
//     pmeRequired: 8468,
//     retentionFemalePast: 486,
//     grievanceMechanism: "Yes",
//     employeeAwards: "Yes",
//     total_hrm_score: 80.0,
//   };

//   const cellMapping = {
//     ldGM: "G6",
//     ldExecutive: "G8",
//     ldWorkmen: "G10",
//     ldHSE: "G13",
//     ldSkill: "G15",
//     ldFunctional: "G17",
//     ldManagement: "G19",
//     attritionEntry: "G22",
//     attritionExecutive: "G24",
//     attritionSenior: "G26",
//     recruitVacancies: "G29",
//     recruitFilled: "G30",
//     recruitCycle: "G32",
//     diversityTotal: "G3",
//     diversityUnder40: "G37",
//     diversityFemale: "G40",
//     diversityQualified: "G43",
//     diversityDisabled2024: "G46",
//     diversityDisabled2023: "G47",
//     pmeDone: "G50",
//     pmeRequired: "G51",
//     retentionFemalePast: "G54",
//     grievanceMechanism: "G50",
//     employeeAwards: "G55",
//     total_hrm_score: "G58",
//   };

//   const handleModifyExcel = async () => {
//     try {
//       // ✅ Correct path for public/templates/
//       const response = await fetch(
//         process.env.PUBLIC_URL + "/templates/HRM - Co  of the Year - FINAL Evaluation Sheet.xlsx"
//       );

//       if (!response.ok) {
//         throw new Error("Template Excel file not found!");
//       }

//       const arrayBuffer = await response.arrayBuffer();

//       // ✅ Read workbook
//       const workbook = XLSX.read(arrayBuffer, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];

//       // ✅ Assign values
//       Object.entries(cellMapping).forEach(([key, cell]) => {
//         if (data[key] !== undefined) {
//           sheet[cell] = {
//             t: typeof data[key] === "number" ? "n" : "s",
//             v: data[key],
//           };
//         }
//       });

//       // ✅ Write back to Excel
//       const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//       const blob = new Blob([wbout], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       saveAs(blob, "Modified_HRM.xlsx");
//     } catch (error) {
//       console.error("Error modifying Excel:", error);
//       alert("Failed to generate Excel. Check console for details.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Modify Excel Template</h2>
//       <button
//         onClick={handleModifyExcel}
//         style={{
//           padding: "10px 20px",
//           background: "blue",
//           color: "white",
//           borderRadius: "8px",
//           cursor: "pointer",
//         }}
//       >
//         Export Modified Excel
//       </button>
//     </div>
//   );
// };

// export default ExcelModifier;

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExcelModifier = () => {
  const companies = [
    {
      ldGM: 484.0,
      ldExecutive: 64.0,
      ldWorkmen: 864.0,
      ldHSE: 684.0,
      ldSkill: 864.0,
      ldFunctional: 684.0,
      ldManagement: 864.0,
      attritionEntry: 8648.0,
      attritionExecutive: 648.0,
      attritionSenior: 64.0,
      recruitVacancies: 6846,
      recruitFilled: 846,
      recruitCycle: 486468.0,
      diversityTotal: 556,
      diversityUnder40: 486,
      diversityFemale: 46,
      diversityQualified: 46486,
      diversityDisabled2024: 23,
      diversityDisabled2023: 23,
      pmeDone: 46546,
      pmeRequired: 8468,
      retentionFemalePast: 486,
      grievanceMechanism: "Yes",
      employeeAwards: "Yes",
      total_hrm_score: 80.0,
    },
    {
      ldGM: 100,
      ldExecutive: 200,
      ldWorkmen: 300,
      ldHSE: 400,
      ldSkill: 500,
      ldFunctional: 600,
      ldManagement: 700,
      attritionEntry: 1111,
      attritionExecutive: 222,
      attritionSenior: 333,
      recruitVacancies: 444,
      recruitFilled: 555,
      recruitCycle: 666,
      diversityTotal: 777,
      diversityUnder40: 888,
      diversityFemale: 999,
      diversityQualified: 1000,
      diversityDisabled2024: 5,
      diversityDisabled2023: 7,
      pmeDone: 200,
      pmeRequired: 400,
      retentionFemalePast: 100,
      grievanceMechanism: "No",
      employeeAwards: "No",
      total_hrm_score: 90.0,
    },
    {
      ldGM: 100,
      ldExecutive: 200,
      ldWorkmen: 300,
      ldHSE: 400,
      ldSkill: 500,
      ldFunctional: 600,
      ldManagement: 700,
      attritionEntry: 1111,
      attritionExecutive: 222,
      attritionSenior: 333,
      recruitVacancies: 444,
      recruitFilled: 555,
      recruitCycle: 666,
      diversityTotal: 777,
      diversityUnder40: 888,
      diversityFemale: 999,
      diversityQualified: 1000,
      diversityDisabled2024: 5,
      diversityDisabled2023: 7,
      pmeDone: 200,
      pmeRequired: 400,
      retentionFemalePast: 100,
      grievanceMechanism: "No",
      employeeAwards: "No",
      total_hrm_score: 90.0,
    },
    // add more companies here...
  ];

  // ✅ Mapping rows for metrics (row numbers fixed)
  const rowMapping = {
    ldGM: 6,
    ldExecutive: 8,
    ldWorkmen: 10,
    ldHSE: 13,
    ldSkill: 15,
    ldFunctional: 17,
    ldManagement: 19,
    attritionEntry: 22,
    attritionExecutive: 24,
    attritionSenior: 26,
    recruitVacancies: 29,
    recruitFilled: 30,
    recruitCycle: 32,
    diversityTotal: 33,
    diversityUnder40: 37,
    diversityFemale: 40,
    diversityQualified: 43,
    diversityDisabled2024: 46,
    diversityDisabled2023: 47,
    pmeDone: 50,
    pmeRequired: 51,
    retentionFemalePast: 54,
    grievanceMechanism: 56,
    employeeAwards: 57,
    total_hrm_score: 58,
  };

  const colLetter = (colIndex) => {
    let letters = "";
    while (colIndex >= 0) {
      letters = String.fromCharCode((colIndex % 26) + 65) + letters;
      colIndex = Math.floor(colIndex / 26) - 1;
    }
    return letters;
  };

  const handleModifyExcel = async () => {
    try {
      const response = await fetch(
        process.env.PUBLIC_URL +
          "/templates/HRM - Co  of the Year - FINAL Evaluation Sheet.xlsx"
      );

      if (!response.ok) {
        throw new Error("Template Excel file not found!");
      }

      const arrayBuffer = await response.arrayBuffer();

      // ✅ Read workbook
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // ✅ Loop over companies
      companies.forEach((company, companyIndex) => {
        // Start from G column (which is 6th → index 6)
        const colIndex = 6 + companyIndex;
        const col = colLetter(colIndex);

        // ✅ For each metric
        Object.entries(rowMapping).forEach(([key, row]) => {
          if (company[key] !== undefined) {
            const cellRef = `${col}${row}`;
            sheet[cellRef] = {
              t: typeof company[key] === "number" ? "n" : "s",
              v: company[key],
            };
          }
        });
      });

      // ✅ Write back to Excel
      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Modified_HRM.xlsx");
    } catch (error) {
      console.error("Error modifying Excel:", error);
      alert("Failed to generate Excel. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Modify Excel Template</h2>
      <button
        onClick={handleModifyExcel}
        style={{
          padding: "10px 20px",
          background: "blue",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Export Modified Excel
      </button>
    </div>
  );
};

export default ExcelModifier;
