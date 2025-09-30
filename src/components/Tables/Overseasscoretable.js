// import React from "react";
// import { useRef,useState,useEffect } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import apiClient from "../../api/axiosClient";
// import "../../styles/scoretable.css";

// // const API_BASE = "http://localhost:8000/api";
// const ENDPOINT = "/vw-cbg-scores/";

// const Overseasscoretable = () => {
//  const tableRef = useRef();
//   const [apiData, setApiData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//  const empty = [];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //  use apiClient instead of fetch
//         const response = await apiClient.get(ENDPOINT);

//         // axios automatically parses JSON
//         setApiData(response.data.results || []); 
//         setLoading(false);
//       } catch (err) {
//         console.error("API error:", err);
//         setError("Failed to fetch data from API");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;


//   const companies = apiData.map(item => item.organisation_name);

//   // const staticData = [
//   //   {
//   //     id: 1,
//   //     organisation_name: "Raygain Technology Private Limited",
//   //     category: "Green Hydrogen Company of the Year",
//   //     firstname: "Adarsh",
//   //     lastname: "Chaudhary",
//   //     userid: "",
//   //     company_name: "Raygain Technology Private Limited",
//   //     mailing_address: "Adarsh",
//   //     authority_name: "Sfas",
//   //     authority_title: "fasfas",
//   //     authority_phone: "7546745764",
//   //     authorityLandline: "654643",
//   //     authority_email: "gre@re.com",
//   //     contact_name: "Adarsh Chaudhary",
//   //     contact_phone: "9874566321",
//   //     contact_email: "adarsh@raygain.com",
//   //     company_profile: "frgw",
//   //     comment: "fsdfs",
//   //     declaration: 0,
//   //     approving_authority_file: "gh/approving_authority/Daily_Task_2024-10-30_121833.png",
//   //    "installed_capacity_2024": 45.0,
//   //           "production_2024": 44.0,
//   //           "carbon_emission_2024": 30.0,
//   //           "purity_2024": 46.0,
//   //           "cost_of_production_2024": 97.0,
//   //           "patents_filed_2024": 14,
//   //           "patents_granted_national_2024": 48,
//   //           "patents_granted_international_2024": 48,
//   //           "patents_commercialized_2024": 489,
//   //           "investment_activities_2024": 46.0,
//   //           "investment_activities_2023": 4684.0,
//   //           "investment_electrolyser_2024": 64664.0,
//   //           "investment_electrolyser_2023": 646.0,
//   //           "upcoming_projects_2024": "",
//   //           "upcoming_projects_2023": "",
//   //           "project_name_1": "jugty",
//   //           "location_1": "g",
//   //           "capacity_1": 6547457.0,
//   //           "project_completion_year_1": 77,
//   //           "project_current_status_1": "ft",
//   //           "project_name_2": "dtr",
//   //           "location_2": "dtr",
//   //           "capacity_2": 547.0,
//   //           "project_completion_year_2": 747634,
//   //           "project_current_status_2": "fy",
//   //           "project_name_3": "f",
//   //           "location_3": "guy",
//   //           "capacity_3": 547.0,
//   //           "project_completion_year_3": 7,
//   //           "project_current_status_3": "hi",
//   //           "project_name_4": "huy",
//   //           "location_4": "gu",
//   //           "capacity_4": 4574.0,
//   //           "project_completion_year_4": 47437,
//   //           "project_current_status_4": "gu",
//   //           "project_name_5": "gu",
//   //           "location_5": "gu",
//   //           "capacity_5": 7347.0,
//   //           "project_completion_year_5": 57,
//   //           "project_current_status_5": "gu",
            
//   //           "user_id": 1,
//   //           "form_id": "green_hydrogen_1",
//   //           "form_mode": "draft",
//   //           "installed_capacity_2024_score": 8.18,
//   //           "production_2024_score": 4.63,
//   //           "carbon_emission_2024_score": 5.0,
//   //           "purity_2024_score": 2.74,
//   //           "cost_of_production_2024_score": 2.68,
//   //           "installed_capacity_gh_p_unit": 23.23,
//   //           "patents_filed_2024_score": 0.27,
//   //           "patents_granted_national_2024_score": 0.03,
//   //           "patents_granted_international_2024_score": 0.28,
//   //           "patents_commercialized_2024_score": 2.48,
//   //           "r_and_d_gh_production_total": 3.07
//   //   },
//   //   {
//   //     id: 2,
//   //     organisation_name: "Raygain Technology Pvt Ltd",
//   //     category: "Green Hydrogen Company of the Year",
//   //     firstname: "Harsh",
//   //     lastname: "Rai",
//   //     userid: "",
//   //     company_name: "Raygain Technology Pvt Ltd",
//   //     mailing_address: "gaziyabad",
//   //     authority_name: "Addi",
//   //     authority_title: "SO",
//   //     authority_phone: "6486846848",
//   //     authorityLandline: "5758",
//   //     authority_email: "cds@lk.in",
//   //     contact_name: "harsh",
//   //     contact_phone: "1478515454",
//   //     contact_email: "harsh@gmail.com",
//   //     company_profile: "fds",
//   //     comment: "ytfyhtf",
//   //     declaration: 0,
//   //     approving_authority_file: "",
//   //     "installed_capacity_2024": 55.0,
//   //           "production_2024": 57.0,
//   //           "carbon_emission_2024": 55.0,
//   //           "purity_2024": 84.0,
//   //           "cost_of_production_2024": 52.0,
//   //           "patents_filed_2024": 65,
//   //           "patents_granted_national_2024": 656,
//   //           "patents_granted_international_2024": 68,
//   //           "patents_commercialized_2024": 984,
//   //           "investment_activities_2024": 9874.0,
//   //           "investment_activities_2023": 1354.0,
//   //           "investment_electrolyser_2024": 9847.0,
//   //           "investment_electrolyser_2023": 5644.0,
//   //           "upcoming_projects_2024": "",
//   //           "upcoming_projects_2023": "",
//   //           "project_name_1": "fdtryf",
//   //           "location_1": "yrfyr",
//   //           "capacity_1": 75475.0,
//   //           "project_completion_year_1": 2023,
//   //           "project_current_status_1": "yf",
//   //           "project_name_2": "ytf",
//   //           "location_2": "yt",
//   //           "capacity_2": 7474743.0,
//   //           "project_completion_year_2": 2024,
//   //           "project_current_status_2": "gty",
//   //           "project_name_3": "fyt",
//   //           "location_3": "fr",
//   //           "capacity_3": 7743.0,
//   //           "project_completion_year_3": 2025,
//   //           "project_current_status_3": "yf",
//   //           "project_name_4": "uyf",
//   //           "location_4": "ytf",
//   //           "capacity_4": 747.0,
//   //           "project_completion_year_4": 2021,
//   //           "project_current_status_4": "tfyt",
//   //           "project_name_5": "fy",
//   //           "location_5": "f",
//   //           "capacity_5": 43747.0,
//   //           "project_completion_year_5": 2023,
//   //           "project_current_status_5": "uf",
            
//   //           "user_id": 3,
//   //           "form_id": "green_hydrogen_3",
//   //           "form_mode": "draft",
//   //           "installed_capacity_2024_score": 10.0,
//   //           "production_2024_score": 6.0,
//   //           "carbon_emission_2024_score": 2.73,
//   //           "purity_2024_score": 5.0,
//   //           "cost_of_production_2024_score": 5.0,
//   //           "installed_capacity_gh_p_unit": 28.73,
//   //           "patents_filed_2024_score": 1.27,
//   //           "patents_granted_national_2024_score": 0.42,
//   //           "patents_granted_international_2024_score": 0.4,
//   //           "patents_commercialized_2024_score": 5.0,
//   //           "r_and_d_gh_production_total": 7.09
//   //   },
//   //   {
//   //     id: 3,
//   //     organisation_name: "Raygain Technologies Private Limited",
//   //     category: "Green Hydrogen Company of the Year",
//   //     firstname: "Anant",
//   //     lastname: "Dhama",
//   //     userid: "",
//   //     company_name: "Raygain Technologies Private Limited",
//   //     mailing_address: "dcs",
//   //     authority_name: "fewd",
//   //     authority_title: "fwe",
//   //     authority_phone: "4869494949",
//   //     authorityLandline: "156",
//   //     authority_email: "ujj@e.com",
//   //     contact_name: "Anant",
//   //     contact_phone: "8767676565",
//   //     contact_email: "anant@gindowa.com",
//   //     company_profile: "fwds",
//   //     comment: "fvyvy",
//   //     declaration: 0,
//   //     approving_authority_file: "",
//   //     "installed_capacity_2024": 13.0,
//   //           "production_2024": 95.0,
//   //           "carbon_emission_2024": 64.0,
//   //           "purity_2024": 26.0,
//   //           "cost_of_production_2024": 65.0,
//   //           "patents_filed_2024": 154,
//   //           "patents_granted_national_2024": 4658,
//   //           "patents_granted_international_2024": 684,
//   //           "patents_commercialized_2024": 464,
//   //           "investment_activities_2024": 846.0,
//   //           "investment_activities_2023": 486.0,
//   //           "investment_electrolyser_2024": 486.0,
//   //           "investment_electrolyser_2023": 684.0,
//   //           "upcoming_projects_2024": "",
//   //           "upcoming_projects_2023": "",
//   //           "project_name_1": "sdvw",
//   //           "location_1": "crtfc",
//   //           "capacity_1": 44654.0,
//   //           "project_completion_year_1": 2023,
//   //           "project_current_status_1": "yfyf",
//   //           "project_name_2": "yfvhf",
//   //           "location_2": "yftyhfyftyfy",
//   //           "capacity_2": 646.0,
//   //           "project_completion_year_2": 2021,
//   //           "project_current_status_2": "f",
//   //           "project_name_3": "ytf",
//   //           "location_3": "ytf",
//   //           "capacity_3": 464.0,
//   //           "project_completion_year_3": 2024,
//   //           "project_current_status_3": "ytfv",
//   //           "project_name_4": "tyfv",
//   //           "location_4": "ytfv",
//   //           "capacity_4": 6346.0,
//   //           "project_completion_year_4": 2025,
//   //           "project_current_status_4": "yttfy",
//   //           "project_name_5": "tfv",
//   //           "location_5": "yfv",
//   //           "capacity_5": 646.0,
//   //           "project_completion_year_5": 2022,
//   //           "project_current_status_5": "fvy",
            
//   //           "user_id": 2,
//   //           "form_id": "green_hydrogen_2",
//   //           "form_mode": "draft",
//   //           "installed_capacity_2024_score": 2.36,
//   //           "production_2024_score": 10.0,
//   //           "carbon_emission_2024_score": 2.34,
//   //           "purity_2024_score": 1.55,
//   //           "cost_of_production_2024_score": 4.0,
//   //           "installed_capacity_gh_p_unit": 20.26,
//   //           "patents_filed_2024_score": 3.0,
//   //           "patents_granted_national_2024_score": 3.0,
//   //           "patents_granted_international_2024_score": 4.0,
//   //           "patents_commercialized_2024_score": 2.36,
//   //           "r_and_d_gh_production_total": 12.36
//   //   },
//   // ];
//   // const companies = [
//   //   "Raygain Technology Private Limited",
//   //   "Raygain Technology Pvt Ltd",
//   //   "Raygain Technologies Private Limited",
//   // ];

// const oil_production_percent = apiData.map(item => item.incremental_oil_percent);
// const oil_production_percent_pro_rata = apiData.map(item => item.incremental_oil_percent_pro_rata);
// const physical_performance_production = apiData.map(item => item.physical_performance_score);
// const oil_production_2024 = apiData.map(item => item.total_oil_2024);
// const oil_production_pro_rata = apiData.map(item => item.total_oil_production_score_pro_rata);
// const oil_production_2023 = apiData.map(item => item.total_oil_2023);

// const gas_production_percent = apiData.map(item => item.incremental_gas_percent);
// const gas_production_pro_rata = apiData.map(item => item.total_gas_production_score_pro_rata);
// const gas_production_2024 = apiData.map(item => item.total_gas_2024);
// const gas_production_percent_pro_rata = apiData.map(item => item.incremental_gas_percent_pro_rata);
// const gas_production_2023 = apiData.map(item => item.total_gas_2023);

// const physical_performance_reserve = apiData.map(item => item.physical_performance_reserves_score);
// const accretion_pro_rata = apiData.map(item => item.reserve_2p_oil_2024_score_pro_rata);
// const reserve_accretion_percent = apiData.map(item => item.reserve_2p_oil_percent);
// const reserve_accretion_percent_pro_rata = apiData.map(item => item.reserve_2p_oil_pro_rata);
// const accretion_2024 = apiData.map(item => item.reserve_2p_oil_2024);
// const accretion_2023 = apiData.map(item => item.reserve_2p_oil_2023);


// const financial_performance = apiData.map(item => item.financial_performance_score);
// const net_profit_pro_rata = apiData.map(item => item.net_profit_margin_2024_pro_rata);
// const net_profit_margin_percent = apiData.map(item => item.improvement_net_profit_margin);
// const net_profit_margin_percent_pro_rata = apiData.map(item => item.improvement_net_profit_margin_pro_rata);
// const net_profit_2024 = apiData.map(item => item.net_profit_2024);
// const net_profit_2023 = apiData.map(item => item.net_profit_2023);
// const net_profit_margin_2024 = apiData.map(item => item.net_profit_margin_2024);
// const net_profit_margin_2023 = apiData.map(item => item.net_profit_margin_2023);

// const turnover_2024 = apiData.map(item => item.annual_turnover_2024);
// const turnover_2023 = apiData.map(item => item.annual_turnover_2023);

// const increase_overseas = apiData.map(item => item.increase_overseas_investment_score);
// const overseas_investment_2024_pro_rata = apiData.map(item => item.overseas_investment_2024_pro_rata);
// const overseas_investment_percent = apiData.map(item => item.growth_overseas_investment);
// const overseas_investment_percent_pro_rata =apiData.map(item => item.growth_overseas_investment_pro_rata);
// const overseas_investment_2024 = apiData.map(item => item.overseas_investment_2024);
// const overseas_investment_2023 = apiData.map(item => item.overseas_investment_2023);

// const improvement_esg = apiData.map(item => item.improvement_ESG_activities_score);
// const specific_carbon_footprint = apiData.map(item => item.specific_carbon_footprint);
// const specific_carbon_footprint_pro_rata = apiData.map(item => item.specific_carbon_footprint_pro_rata);
// const carbon_emitted = apiData.map(item => item.total_carbon_2024);
// const hc_production = apiData.map(item => item.total_carbon_2023);

// const expenditure_pro_rata =apiData.map(item => item.community_expenditure_2024_pro_rata);
// const expenditure_percent = apiData.map(item => item.growth_community_welfare_percent);
// const expenditure_percent_pro_rata = apiData.map(item => item.growth_community_welfare_percent_pro_rata);
// const expenditure_2024 = apiData.map(item => item.community_expenditure_2024);
// const expenditure_2023 = apiData.map(item => item.community_expenditure_2023);


// const reserve_accretion_percent_BCM =apiData.map(item => item.reserve_2p_gas_percent);
// const reserve_accretion_percent_BCM_pro_rata =apiData.map(item => item.reserve_2p_gas_pro_rata);
// const accretion_BCM_pro_rata =apiData.map(item => item.reserve_2p_gas_2024_score_pro_rata);
// const accretion_2024_BCM =apiData.map(item => item.reserve_2p_gas_2024);
// const accretion_2023_BCM =apiData.map(item => item.reserve_2p_gas_2023);
// const reserve_replacement_ratio_BCM =apiData.map(item => item.reserve_replacement_ratio_raw);
// const reserve_replacement_ratio_BCM_pro_rata =apiData.map(item => item.reserve_replacement_ratio_pro_rata);
// const Total_score =apiData.map(item => item.grand_total);



// const handleExport = () => {
//     const table = tableRef.current;
//     const wb = XLSX.utils.table_to_book(table, { sheet: "Overseas Scores" });
//     const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Overseas_Scores.xlsx");
//   };

//   return (
//     <div className="table-box">
//       <button
//         onClick={handleExport } className="export-btn"
        
//       >
//         Export to Excel
//       </button>
//       <table ref={tableRef} className="min-w-full border border-gray-300 shadow-md rounded-lg">
//         <thead className="bg-blue-600 text-white">
//           <tr>
//             <th className="border px-3 py-2 cursor-pointer">S.No.</th>
//             <th className="border px-3 py-2 cursor-pointer">Evaluation Parameters</th>
//             <th className="border px-3 py-2 cursor-pointer">Max Score</th>
//             <th className="border px-3 py-2 cursor-pointer">Sub KPI Score</th>
//             <th className="border px-3 py-2 cursor-pointer">Unit of Eval</th>
          
//             {companies.map((company) => (
//               <th key={company} className="border px-3 py-2 cursor-pointer">
//                 {company}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody className="bg-white">
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">1</td>
//             <td className="border px-3 py-2">
//               <strong>Physical Performance-Production</strong>
//             </td>
//             <td className="border px-3 py-2">30</td>
//             <td className="border px-3 py-2">30</td>
//             <td className="border px-3 py-2"></td>
           
//             {physical_performance_production.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">1.1</td>
//             <td className="border px-3 py-2">
//               Total oil production during the year 2024-25 (MMT)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">10</td>
//             <td className="border px-3 py-2">MMT</td>
          
//             {oil_production_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">
//             <strong>  Total oil production during the year 2024-25 (MMT) Pro Rata </strong>
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
          
//             {oil_production_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">1.2</td>
//          <td className="border px-3 py-2" >
//         Incremental oil production during the year 2024-25 (%)</td>

//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">10</td>
//             <td className="border px-3 py-2">%</td>
           
//             {oil_production_percent.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//          <td className="border px-3 py-2" >
//         <strong>Incremental oil production during the year 2024-25 (%) Pro Rata</strong></td>

//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {oil_production_percent_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
           

//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">1.2.1</td>
//             <td className="border px-3 py-2">
//               Total oil production during the year 2024-25 (MMT)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {oil_production_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
          
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">1.2.2</td>
//             <td className="border px-3 py-2">Total oil production during the year 2023-24 (MMT)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {oil_production_2023.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>

//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">1.3</td>
//             <td className="border px-3 py-2">
//               Total gas production during the year 2024-25 (BCM)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">5</td>
//             <td className="border px-3 py-2">BCM</td>
          
//              {gas_production_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">
//               <strong>Total gas production during the year 2024-25 (BCM) Pro Rata</strong>
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
          
//              {gas_production_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">1.4</td>
//             <td className="border px-3 py-2">Incremental gas production during the year 2024-25 (%)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">5</td>
//             <td className="border px-3 py-2">%</td>
            
//             {gas_production_percent.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>Incremental gas production during the year 2024-25 (%) Pro Rata</strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
            
//             {gas_production_percent_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>


//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">1.4.1</td>
//             <td className="border px-3 py-2">
//               Total gas production during the year 2024-25 (BCM)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
         
//             {gas_production_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}

//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">1.4.2</td>
//             <td className="border px-3 py-2">Total gas production during the year 2023-24 (BCM)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
          
//             {gas_production_2023.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2</td>
//             <td className="border px-3 py-2"><strong>Physical Performance- Reserves Accretion</strong></td>
//             <td className="border px-3 py-2">30</td>
//             <td className="border px-3 py-2">30</td>
//             <td className="border px-3 py-2"></td>
           
//             {physical_performance_reserve.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.1</td>
//             <td className="border px-3 py-2">2P oil reserve accretion in 2024-25 (MMT)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">7.5</td>
//             <td className="border px-3 py-2">MMT</td>
           
//                         {accretion_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>2P oil reserve accretion in 2024-25 (MMT) Pro Rata</strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//                         {accretion_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.2</td>
//             <td className="border px-3 py-2">2P oil reserve accretion growth</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">7.5</td>
//             <td className="border px-3 py-2">%</td>
           
//             {reserve_accretion_percent.map((s, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {s.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>2P oil reserve accretion growth Pro Rata</strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {reserve_accretion_percent_pro_rata.map((s, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {s.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.2.1</td>
//             <td className="border px-3 py-2">
//               In year 2024-25 ( MMT)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
          
//             {accretion_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.2.2</td>
//             <td className="border px-3 py-2">In year 2023-24 ( MMT)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
         
//            {accretion_2023.map((s, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {s.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.3</td>
//             <td className="border px-3 py-2">
//               2P gas reserves accretion in 2024-25 (BCM)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">5</td>
//             <td className="border px-3 py-2">BCM</td>
           
//             {accretion_2024_BCM.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">
//               <strong>2P gas reserves accretion in 2024-25 (BCM) Pro Rata</strong>
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {accretion_BCM_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.4</td>
//             <td className="border px-3 py-2">2P gas reserves accretion growth</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">5</td>
//             <td className="border px-3 py-2">%</td>
          
//             {reserve_accretion_percent_BCM.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>2P gas reserves accretion growth Pro Rata</strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
          
//             {reserve_accretion_percent_BCM_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>

//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.4.1</td>
//             <td className="border px-3 py-2">In year 2024-25 (BCM)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
          
//             {accretion_2024_BCM.map((s, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {s.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.4.2</td>
//             <td className="border px-3 py-2">
//              In year 2023-24 (BCM)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {accretion_2023_BCM.map((s, i) => (
//               <td key={i} className="border px-3 py-2">{s.toFixed(2)}</td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.5</td>
//             <td className="border px-3 py-2">
//               Reserve Replacement Ratio (2.1+2.3)/(1.1+1.3)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">5</td>
//             <td className="border px-3 py-2">%</td>
           
//             {reserve_replacement_ratio_BCM.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//             <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">2.5</td>
//             <td className="border px-3 py-2">
//              <strong> Reserve Replacement Ratio (2.1+2.3)/(1.1+1.3) Pro Rata</strong>
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {reserve_replacement_ratio_BCM_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>

//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">3</td>
//             <td className="border px-3 py-2"><strong>Financial Performance</strong></td>
//             <td className="border px-3 py-2">10</td>
//             <td className="border px-3 py-2">10</td>
//             <td className="border px-3 py-2"></td>
          
//              {financial_performance.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">3.1</td>
//             <td className="border px-3 py-2">
//               Net Profit Margin in 2024-25
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">5</td>
//             <td className="border px-3 py-2">$</td>
           
//             {net_profit_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">
//            <strong>  Net Profit Margin in 2024-25 Pro Rata</strong>
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {net_profit_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">3.2</td>
//             <td className="border px-3 py-2">Improvement in Net Profit Margin (3.2.2 / 3.2.1)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">5</td>
//             <td className="border px-3 py-2">%</td>
           
//             {net_profit_margin_percent.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>Improvement in Net Profit Margin (3.2.2 / 3.2.1) Pro Rata</strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {net_profit_margin_percent_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">3.2.1</td>
//             <td className="border px-3 py-2">
//              Net Profit Margin in 2024-25 (Net Profit/ Turnover)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//              {net_profit_margin_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">
//              Net Profit Margin in 2023-24 (Net Profit/ Turnover)
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
          
//             {net_profit_margin_2023.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>Net Profit (INR Crore)</strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//                        {companies.map((v, i) => (
//               <td key={i} className="border px-3 py-2"></td>
//             ))}
//           </tr>
//                     <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">2024-25</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//              {net_profit_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//                     <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">2023-24</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//              {net_profit_2023.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>Turnover (INR Crore)</strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//                        {companies.map((v, i) => (
//               <td key={i} className="border px-3 py-2"></td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">
//               2024-25
//             </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {turnover_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">2023-24</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//              {turnover_2023.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">4</td>
//             <td className="border px-3 py-2"><strong>Increase in Overseas Investment (Actual; as per PI)</strong></td>
//             <td className="border px-3 py-2">20</td>
//             <td className="border px-3 py-2">20</td>
//             <td className="border px-3 py-2"></td>
           
//              {increase_overseas.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">4.1</td>
//             <td className="border px-3 py-2">Overseas investment in the Assessment Year (INR Crore)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">10</td>
//             <td className="border px-3 py-2">Number</td>
           
//              {overseas_investment_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>Overseas investment in the Assessment Year (INR Crore) Pro Rata</strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//              {overseas_investment_2024_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">4.2</td>
//             <td className="border px-3 py-2">Growth in overseas investment</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">10</td>
//             <td className="border px-3 py-2">%</td>
           
//              {overseas_investment_percent.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>Growth in overseas investment Pro Rata </strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//              {overseas_investment_percent_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">4.2.1</td>
//             <td className="border px-3 py-2">Overseas Investment in year 2024-25 (INR Crore)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">No.</td>
           
//              {overseas_investment_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">4.2.2</td>
//             <td className="border px-3 py-2">Overseas Investment in year 2023-24 (INR Crore)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//              {overseas_investment_2023.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
           
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">5</td>
//             <td className="border px-3 py-2"><strong>Improvement in ESG Activities</strong></td>
//             <td className="border px-3 py-2">10</td>
//             <td className="border px-3 py-2">10</td>
//             <td className="border px-3 py-2"></td>
           
//               {improvement_esg.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
          
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">5.1</td>
//             <td className="border px-3 py-2">Specific Carbon Footprint (Total Carbon Emitted / Total HC Production) (Tonne/ MTOE) </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">5</td>
//             <td className="border px-3 py-2">Number</td>
           
//             {specific_carbon_footprint.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>Specific Carbon Footprint (Total Carbon Emitted / Total HC Production) (Tonne/ MTOE) Pro Rata </strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {specific_carbon_footprint_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//           <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">Total Carbon Emitted (Tonne)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {carbon_emitted.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">Total HC Production (MTOE)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {hc_production.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">5.2</td>
//             <td className="border px-3 py-2">Expenditure on Community welfare</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">2.5</td>
//             <td className="border px-3 py-2">Number</td>
           
//             {expenditure_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>Expenditure on Community welfare Pro Rata </strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {expenditure_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">5.3</td>
//             <td className="border px-3 py-2">% Growth in community welfare </td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">2.5</td>
//             <td className="border px-3 py-2">%</td>
           
//             {expenditure_percent.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>% Growth in community welfare Pro Rata </strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {expenditure_percent_pro_rata.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">5.3.1</td>
//             <td className="border px-3 py-2">Expenditure on Community welfare 2024-25 (INR Crore)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {expenditure_2024.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
//            <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2">5.3.2</td>
//             <td className="border px-3 py-2">Expenditure on Community welfare 2023-24 (INR Crore)</td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
           
//             {expenditure_2023.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>

//               <tr className="hover:bg-gray-100">
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"><strong>Total</strong></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2"></td>
//             <td className="border px-3 py-2">100.00</td>
           
//             {Total_score.map((v, i) => (
//               <td key={i} className="border px-3 py-2">
//                 {v.toFixed(2)}
//               </td>
//             ))}
//           </tr>
         
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Overseasscoretable;