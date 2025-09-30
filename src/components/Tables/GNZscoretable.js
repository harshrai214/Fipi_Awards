import React from "react";
import { useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../../styles/GHscoretable.css"

const GNZscoretable = () => {
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
  const val11 = staticData.map(item => item.installed_capacity_2024);
  const val12 = staticData.map(item => item.production_2024);
  const val13 = staticData.map(item => item.carbon_emission_2024);
  const val14 = staticData.map(item => item.purity_2024);
  const val15 = staticData.map(item => item.cost_of_production_2024);
  const val41 = staticData.map(item => item.patents_filed_2024);
  const val42 = staticData.map(item => item.patents_granted_national_2024);
  const val43 = staticData.map(item => item.patents_granted_international_2024);
  const val44 = staticData.map(item => item.patents_commercialized_2024);
  const score11 = staticData.map(item => item.installed_capacity_2024_score);
  const score12 = staticData.map(item => item.production_2024_score);
  const score13 = staticData.map(item => item.carbon_emission_2024_score);
  const score14 = staticData.map(item => item.purity_2024_score);
  const score15 = staticData.map(item => item.cost_of_production_2024_score);
  const score41 = staticData.map(item => item.patents_filed_2024_score);
  const score42 = staticData.map(item => item.patents_granted_national_2024_score);
  const score43 = staticData.map(item => item.patents_granted_international_2024_score);
  const score44 = staticData.map(item => item.patents_commercialized_2024_score);
  const section1 = staticData.map(item => item.installed_capacity_gh_p_unit);
  const section4 = staticData.map(item => item.r_and_d_gh_production_total);
  const val21 = staticData.map(item => item.investment_activities_2024);
  const investmentActivities2023 = staticData.map(item => item.investment_activities_2023);
  const val31 = staticData.map(item => item.investment_electrolyser_2024);
  const investmentElectrolyser2023 = staticData.map(item => item.investment_electrolyser_2023);
  const projectYear = staticData.map(item => item.project_completion_year_1);
  const projectCapacity = staticData.map(item => item.capacity_1);

  const val22 = staticData.map((item, index) => {
    const curr = item.investment_activities_2024;
    const prev = item.investment_activities_2023;
    if (prev > 0) {
      return ((curr - prev) / prev) * 100;
    } else {
      return curr > 0 ? Infinity : 0;
    }
  });
  const val32 = staticData.map((item, index) => {
    const curr = item.investment_electrolyser_2024;
    const prev = item.investment_electrolyser_2023;
    if (prev > 0) {
      return ((curr - prev) / prev) * 100;
    } else {
      return curr > 0 ? Infinity : 0;
    }
  });
  const currentYear = 2025;
  const projectTime = staticData.map(item => {
    const year = item.project_completion_year_1;
    return year > currentYear ? year - currentYear : 0;
  });
  const val51 = staticData.map(item => {
    const cap = item.capacity_1;
    const year = item.project_completion_year_1;
    if (cap > 0 && year > currentYear) {
      return (year - currentYear) / cap;
    }
    return ;
  });
  const val52 = staticData.map(item => item.capacity_1);

  // For scores that are not pre-computed in data, hardcoded static values
  const score21 = [0.47, 10.0, 0.86];
  const score22 = [0.0, 10.0, 1.18];
  const score31 = [5.0, 0.76, 0.04];
  const score32 = [5.0, 0.04, 0.0];
  const score51 = [0.0, 0.0, 0.0];
  const score52 = [10.0, 0.12, 0.07];
  const section2 = [];
  const section3 = [];
  const section5 = [];
  const grandTotal = [];

  const handleExport = () => {
    const table = tableRef.current;
    const wb = XLSX.utils.table_to_book(table, { sheet: "GNZ Scores" });
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "GNZ_Scores.xlsx");
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
            <th className="border px-3 py-2 cursor-pointer">Evaluation Parameters</th>
            <th className="border px-3 py-2 cursor-pointer">Max Score</th>
            <th className="border px-3 py-2 cursor-pointer">Sub KPI Score</th>
            <th className="border px-3 py-2 cursor-pointer">Unit of Eval</th>
          
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
              <strong>Net Zero (Scope – I & II) – Target Year</strong>
            </td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
           
            {section1.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                {s.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
              
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
          
            {val11.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        Net Zero Target Advancement (Years): A-B
       </td>

            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {score11.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
              India Net Zero Target Year - (A)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {val12.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Company Net Zero Target Year - (B)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {score12.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2</td>
            <td className="border px-3 py-2">
              <strong>Progress in Net Zero Activities (Assessment by Award Committee)</strong>
            </td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
          
            {val13.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3</td>
            <td className="border px-3 py-2"><strong>Total Carbon Emitted (Scope – I & II)</strong></td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2"></td>
            
                        {score13.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3.1</td>
            <td className="border px-3 py-2">
              Reduction in Carbon Emission (%)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
         
            {val14.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">%</td>
          
                       {score14.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Carbon Emitted in 2024-25 (tCO2e)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {val15.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Carbon Emitted in 2023-24 (tCO2e)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
                        {score15.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3.2</td>
            <td className="border px-3 py-2">Carbon Emitted in 2024-25 (tCO2e)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
           
            {section2.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                {s.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
              
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">No.</td>
          
            {companies.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4</td>
            <td className="border px-3 py-2"><strong>Energy Efficiency</strong></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
         
            {companies.map((_, i) => (
              <td key={i} className="border px-3 py-2">0</td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.1</td>
            <td className="border px-3 py-2">
              Reduction in Energy Consumption (%)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
           
            {val22.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {isFinite(v) ? v.toFixed(2) : "Inf"}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">%</td>
          
            {val21.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.2</td>
            <td className="border px-3 py-2">Total Energy Consumed (GJ) per INR Crore of Revenue</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
          
            {companies.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
             in 2024-25
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {section3.map((s, i) => (
              <td key={i} className="border px-3 py-2">{s.toFixed(2)}</td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
              in 2023-24
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {val31.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.2.1</td>
            <td className="border px-3 py-2">Total Energy Consumed (GJ)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
          
            {companies.map((_, i) => (
              <td key={i} className="border px-3 py-2"></td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
              in 2024-25
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {val32.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {isFinite(v) ? v.toFixed(2) : "Inf"}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">in 2023-24</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((_, i) => (
              <td key={i} className="border px-3 py-2"></td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.2.2</td>
            <td className="border px-3 py-2">
             Annual Revenue (INR Crore)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {section4.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                {s.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
              in 2024-25
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
          
            {val41.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">in 2023-24</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
                       {score41.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
             <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"><strong>Renewable Energy Generation</strong></td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2"></td>
           
          
            {val42.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.1</td>
            <td className="border px-3 py-2">Total Capex for RE Generation in 2024-25 (INR Crore)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
                        {score42.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
              
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">No.</td>
           
            {val43.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.1.1</td>
            <td className="border px-3 py-2">Capex for Wind Energy Generation in 2024-25 (INR Crore)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
             {score43.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.1.2</td>
            <td className="border px-3 py-2">Capex for Solar Energy Generation in 2024-25 (INR Crore)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
             {score43.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.1.3</td>
            <td className="border px-3 py-2">Capex for Other RE Generation in 2024-25 (INR Crore)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
             {score43.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.2</td>
            <td className="border px-3 py-2">Total Renewable Energy Power Production (MW)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
             {score43.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.2.1</td>
            <td className="border px-3 py-2">in 2024-25</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">No.</td>
           
             {score43.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.2.2</td>
            <td className="border px-3 py-2">in 2023-24</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
             {score43.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.3</td>
            <td className="border px-3 py-2">% Growth in Renewable Energy Power Production</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
             {score43.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">%</td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.4</td>
            <td className="border px-3 py-2">% RE of total power consumption</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Formula: (RE Produced) / Total Power Consumption </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">%</td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Total Power Consumption (in 2024-25) (MW)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">6</td>
            <td className="border px-3 py-2"><strong>Green Hydrogen Production</strong></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">6.1</td>
            <td className="border px-3 py-2">Investment for GH2 production/Transportation/ Distribution/ Storage (INR Crore)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">6.2</td>
            <td className="border px-3 py-2">GH2 Production (2024-25) (MT)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">No.</td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">7</td>
            <td className="border px-3 py-2"><strong>Tree Plantation (Nos.)</strong></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">No.</td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">8</td>
            <td className="border px-3 py-2"><strong>Initiatives undertaken for Carbon Capture </strong></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">8.1</td>
            <td className="border px-3 py-2">Capex (INR Crore) for CCS/CCUS Projects</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">No.</td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">8.2</td>
            <td className="border px-3 py-2">Carbon Captured in FY’25 (MMT)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">No.</td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
              <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Total</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">100.00</td>
           
            {companies.map((s, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
         
        </tbody>
      </table>
    </div>
  );
};

export default GNZscoretable;