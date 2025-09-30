import React from "react";
import { useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiClient from "../../api/axiosClient";
import "../../styles/GHscoretable.css"

const GHscoretable = () => {
  const tableRef = useRef();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  use apiClient instead of fetch
        const response = await apiClient.get(ENDPOINT);

        // axios automatically parses JSON
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

  // const apiData = [
  //   {
  //     id: 1,
  //     organisation_name: "Raygain Technology Private Limited",
  //     category: "Green Hydrogen Company of the Year",
  //     firstname: "Adarsh",
  //     lastname: "Chaudhary",
  //     userid: "",
  //     company_name: "Raygain Technology Private Limited",
  //     mailing_address: "Adarsh",
  //     authority_name: "Sfas",
  //     authority_title: "fasfas",
  //     authority_phone: "7546745764",
  //     authorityLandline: "654643",
  //     authority_email: "gre@re.com",
  //     contact_name: "Adarsh Chaudhary",
  //     contact_phone: "9874566321",
  //     contact_email: "adarsh@raygain.com",
  //     company_profile: "frgw",
  //     comment: "fsdfs",
  //     declaration: 0,
  //     approving_authority_file: "gh/approving_authority/Daily_Task_2024-10-30_121833.png",
  //    "installed_capacity_2024": 45.0,
  //           "production_2024": 44.0,
  //           "carbon_emission_2024": 30.0,
  //           "purity_2024": 46.0,
  //           "cost_of_production_2024": 97.0,
  //           "patents_filed_2024": 14,
  //           "patents_granted_national_2024": 48,
  //           "patents_granted_international_2024": 48,
  //           "patents_commercialized_2024": 489,
  //           "investment_activities_2024": 46.0,
  //           "investment_activities_2023": 4684.0,
  //           "investment_electrolyser_2024": 64664.0,
  //           "investment_electrolyser_2023": 646.0,
  //           "upcoming_projects_2024": "",
  //           "upcoming_projects_2023": "",
  //           "project_name_1": "jugty",
  //           "location_1": "g",
  //           "capacity_1": 6547457.0,
  //           "project_completion_year_1": 77,
  //           "project_current_status_1": "ft",
  //           "project_name_2": "dtr",
  //           "location_2": "dtr",
  //           "capacity_2": 547.0,
  //           "project_completion_year_2": 747634,
  //           "project_current_status_2": "fy",
  //           "project_name_3": "f",
  //           "location_3": "guy",
  //           "capacity_3": 547.0,
  //           "project_completion_year_3": 7,
  //           "project_current_status_3": "hi",
  //           "project_name_4": "huy",
  //           "location_4": "gu",
  //           "capacity_4": 4574.0,
  //           "project_completion_year_4": 47437,
  //           "project_current_status_4": "gu",
  //           "project_name_5": "gu",
  //           "location_5": "gu",
  //           "capacity_5": 7347.0,
  //           "project_completion_year_5": 57,
  //           "project_current_status_5": "gu",
            
  //           "user_id": 1,
  //           "form_id": "green_hydrogen_1",
  //           "form_mode": "draft",
  //           "installed_capacity_2024_score": 8.18,
  //           "production_2024_score": 4.63,
  //           "carbon_emission_2024_score": 5.0,
  //           "purity_2024_score": 2.74,
  //           "cost_of_production_2024_score": 2.68,
  //           "installed_capacity_gh_p_unit": 23.23,
  //           "patents_filed_2024_score": 0.27,
  //           "patents_granted_national_2024_score": 0.03,
  //           "patents_granted_international_2024_score": 0.28,
  //           "patents_commercialized_2024_score": 2.48,
  //           "r_and_d_gh_production_total": 3.07
  //   },
  //   {
  //     id: 2,
  //     organisation_name: "Raygain Technology Pvt Ltd",
  //     category: "Green Hydrogen Company of the Year",
  //     firstname: "Harsh",
  //     lastname: "Rai",
  //     userid: "",
  //     company_name: "Raygain Technology Pvt Ltd",
  //     mailing_address: "gaziyabad",
  //     authority_name: "Addi",
  //     authority_title: "SO",
  //     authority_phone: "6486846848",
  //     authorityLandline: "5758",
  //     authority_email: "cds@lk.in",
  //     contact_name: "harsh",
  //     contact_phone: "1478515454",
  //     contact_email: "harsh@gmail.com",
  //     company_profile: "fds",
  //     comment: "ytfyhtf",
  //     declaration: 0,
  //     approving_authority_file: "",
  //     "installed_capacity_2024": 55.0,
  //           "production_2024": 57.0,
  //           "carbon_emission_2024": 55.0,
  //           "purity_2024": 84.0,
  //           "cost_of_production_2024": 52.0,
  //           "patents_filed_2024": 65,
  //           "patents_granted_national_2024": 656,
  //           "patents_granted_international_2024": 68,
  //           "patents_commercialized_2024": 984,
  //           "investment_activities_2024": 9874.0,
  //           "investment_activities_2023": 1354.0,
  //           "investment_electrolyser_2024": 9847.0,
  //           "investment_electrolyser_2023": 5644.0,
  //           "upcoming_projects_2024": "",
  //           "upcoming_projects_2023": "",
  //           "project_name_1": "fdtryf",
  //           "location_1": "yrfyr",
  //           "capacity_1": 75475.0,
  //           "project_completion_year_1": 2023,
  //           "project_current_status_1": "yf",
  //           "project_name_2": "ytf",
  //           "location_2": "yt",
  //           "capacity_2": 7474743.0,
  //           "project_completion_year_2": 2024,
  //           "project_current_status_2": "gty",
  //           "project_name_3": "fyt",
  //           "location_3": "fr",
  //           "capacity_3": 7743.0,
  //           "project_completion_year_3": 2025,
  //           "project_current_status_3": "yf",
  //           "project_name_4": "uyf",
  //           "location_4": "ytf",
  //           "capacity_4": 747.0,
  //           "project_completion_year_4": 2021,
  //           "project_current_status_4": "tfyt",
  //           "project_name_5": "fy",
  //           "location_5": "f",
  //           "capacity_5": 43747.0,
  //           "project_completion_year_5": 2023,
  //           "project_current_status_5": "uf",
            
  //           "user_id": 3,
  //           "form_id": "green_hydrogen_3",
  //           "form_mode": "draft",
  //           "installed_capacity_2024_score": 10.0,
  //           "production_2024_score": 6.0,
  //           "carbon_emission_2024_score": 2.73,
  //           "purity_2024_score": 5.0,
  //           "cost_of_production_2024_score": 5.0,
  //           "installed_capacity_gh_p_unit": 28.73,
  //           "patents_filed_2024_score": 1.27,
  //           "patents_granted_national_2024_score": 0.42,
  //           "patents_granted_international_2024_score": 0.4,
  //           "patents_commercialized_2024_score": 5.0,
  //           "r_and_d_gh_production_total": 7.09
  //   },
  //   {
  //     id: 3,
  //     organisation_name: "Raygain Technologies Private Limited",
  //     category: "Green Hydrogen Company of the Year",
  //     firstname: "Anant",
  //     lastname: "Dhama",
  //     userid: "",
  //     company_name: "Raygain Technologies Private Limited",
  //     mailing_address: "dcs",
  //     authority_name: "fewd",
  //     authority_title: "fwe",
  //     authority_phone: "4869494949",
  //     authorityLandline: "156",
  //     authority_email: "ujj@e.com",
  //     contact_name: "Anant",
  //     contact_phone: "8767676565",
  //     contact_email: "anant@gindowa.com",
  //     company_profile: "fwds",
  //     comment: "fvyvy",
  //     declaration: 0,
  //     approving_authority_file: "",
  //     "installed_capacity_2024": 13.0,
  //           "production_2024": 95.0,
  //           "carbon_emission_2024": 64.0,
  //           "purity_2024": 26.0,
  //           "cost_of_production_2024": 65.0,
  //           "patents_filed_2024": 154,
  //           "patents_granted_national_2024": 4658,
  //           "patents_granted_international_2024": 684,
  //           "patents_commercialized_2024": 464,
  //           "investment_activities_2024": 846.0,
  //           "investment_activities_2023": 486.0,
  //           "investment_electrolyser_2024": 486.0,
  //           "investment_electrolyser_2023": 684.0,
  //           "upcoming_projects_2024": "",
  //           "upcoming_projects_2023": "",
  //           "project_name_1": "sdvw",
  //           "location_1": "crtfc",
  //           "capacity_1": 44654.0,
  //           "project_completion_year_1": 2023,
  //           "project_current_status_1": "yfyf",
  //           "project_name_2": "yfvhf",
  //           "location_2": "yftyhfyftyfy",
  //           "capacity_2": 646.0,
  //           "project_completion_year_2": 2021,
  //           "project_current_status_2": "f",
  //           "project_name_3": "ytf",
  //           "location_3": "ytf",
  //           "capacity_3": 464.0,
  //           "project_completion_year_3": 2024,
  //           "project_current_status_3": "ytfv",
  //           "project_name_4": "tyfv",
  //           "location_4": "ytfv",
  //           "capacity_4": 6346.0,
  //           "project_completion_year_4": 2025,
  //           "project_current_status_4": "yttfy",
  //           "project_name_5": "tfv",
  //           "location_5": "yfv",
  //           "capacity_5": 646.0,
  //           "project_completion_year_5": 2022,
  //           "project_current_status_5": "fvy",
            
  //           "user_id": 2,
  //           "form_id": "green_hydrogen_2",
  //           "form_mode": "draft",
  //           "installed_capacity_2024_score": 2.36,
  //           "production_2024_score": 10.0,
  //           "carbon_emission_2024_score": 2.34,
  //           "purity_2024_score": 1.55,
  //           "cost_of_production_2024_score": 4.0,
  //           "installed_capacity_gh_p_unit": 20.26,
  //           "patents_filed_2024_score": 3.0,
  //           "patents_granted_national_2024_score": 3.0,
  //           "patents_granted_international_2024_score": 4.0,
  //           "patents_commercialized_2024_score": 2.36,
  //           "r_and_d_gh_production_total": 12.36
  //   },
  // ];

  // const companies = [
  //   "Raygain Technology Private Limited",
  //   "Raygain Technology Pvt Ltd",
  //   "Raygain Technologies Private Limited",
  
  const installed_capacity = apiData.map(item => item.installed_capacity_2024);
  const installed_capacity_score = apiData.map(item => item.installed_capacity_2024_score);
  const production_MT =apicData.map(item => item.production_2024);
  const production_MT_score = apiData.map(item => item.production_2024_score);
  const carbon_emitted = apiData.map(item => item.carbon_emission_2024);
  const carbon_emitted_score = apiData.map(item => item.carbon_emission_2024_score);
  const purity = apiData.map(item => item.purity_2024);
  const purity_score = apiData.map(item => item.purity_2024_score);
  const cost_production = apiData.map(item => item.cost_of_production_2024);
  const cost_production_score = apiData.map(item => item.cost_of_production_2024_score);
  const investment_production = apiData.map(item => item.installed_capacity_2024);
  const investment_production_score = apiData.map(item => item.installed_capacity_2024);
  const growth_investment_2024 = apiData.map(item => item.investment_activities_2024);
  const growth_investment_score = apiData.map(item => item.installed_capacity_2024);
  const growth_investment_2023 = apiData.map(item => item.investment_activities_2023);
  const investment_electrolyser = apiData.map(item => item.investment_electrolyser_2024);
  const investment_electrolyser_score = apiData.map(item => item.installed_capacity_2024);
  const investment_electrolyser_2023 = apiData.map(item => item.investment_electrolyser_2023);
  const investment_electrolyser_2024 = apiData.map(item => item.investment_electrolyser_2024);
  const growth_electrolyser_score = apiData.map(item => item.installed_capacity_2024);
  const patent_filed = apiData.map(item => item.patents_filed_2024);
  const patent_filed_score = apiData.map(item => item.patents_filed_2024_score);
  const patent_national = apiData.map(item => item.patents_granted_national_2024);
  const patent_national_score = apiData.map(item => item.patents_granted_national_2024_score);
  const patent_international = apiData.map(item => item.patents_granted_international_2024);
  const patent_international_score = apiData.map(item => item.patents_granted_international_2024_score);
  const patent_commercial = apiData.map(item => item.patents_commercialized_2024);
  const patent_commercial_score = apiData.map(item => item.instapatents_commercialized_2024_scorelled_capacity_2024);
 
  const Total_score = apiData.map(item => item.installed_capacity_2024);
  const installed_capacity_growth = apiData.map(item => item.installed_capacity_gh_p_unit);
  const investment_growth = apiData.map(item => item.installed_capacity_2024);
  const investment_electrolyser_growth = apiData.map(item => item.installed_capacity_2024);
  const r_n_d_growth = apiData.map(item => item.r_and_d_gh_production_total);
  const upcoming_project_growth = apiData.map(item => item.project_score);
  const marks_obtained = apiData.map(item => item.project_score);
  const total_value = apiData.map(item => item.project_score);
  const project_capacity_1 = apiData.map(item => item.project_score);
  const project_completion_year_1 = apiData.map(item => item.project_score);
  const year_difference_1 = apiData.map(item => item.project_score);
  const mark_allocated_1 = apiData.map(item => item.project_score);
  const project_value_1 = apiData.map(item => item.project_score);


  const project_capacity_2 = apiData.map(item => item.project_score);
  const project_completion_year_2 = apiData.map(item => item.project_score);
  const year_difference_2 = apiData.map(item => item.project_score);
  const mark_allocated_2 = apiData.map(item => item.project_score);
  const project_value_2 = apiData.map(item => item.project_score);

  const project_capacity_3 = apiData.map(item => item.project_score);
  const project_completion_year_3 = apiData.map(item => item.project_score);
  const year_difference_3 = apiData.map(item => item.project_score);
  const mark_allocated_3 = apiData.map(item => item.project_score);
  const project_value_3 = apiData.map(item => item.project_score);


  const project_capacity_4 = apiData.map(item => item.project_score);
  const project_completion_year_4 = apiData.map(item => item.project_score);
  const year_difference_4 = apiData.map(item => item.project_score);
  const mark_allocated_4 = apiData.map(item => item.project_score);
  const project_value_4 = apiData.map(item => item.project_score);

  const project_capacity_5 = apiData.map(item => item.project_score);
  const project_completion_year_5 = apiData.map(item => item.project_score);
  const year_difference_5 = apiData.map(item => item.project_score);
  const mark_allocated_5 = apiData.map(item => item.project_score);
  const project_value_5 = apiData.map(item => item.project_score);


  const handleExport = () => {
    const table = tableRef.current;
    const wb = XLSX.utils.table_to_book(table, { sheet: "GH Scores" });
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "GH_Scores.xlsx");
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
              <strong>Installed Capacity of Green hydrogen production units</strong>
            </td>
            <td className="border px-3 py-2">35</td>
            <td className="border px-3 py-2">35</td>
            <td className="border px-3 py-2"></td>
           
            {installed_capacity_growth.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.1</td>
            <td className="border px-3 py-2">
              Installed Capacity of Green hydrogen production units (MT)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">MT</td>
          
            {installed_capacity_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
         <td className="border px-3 py-2" >
        <strong>Installed Capacity of Green hydrogen production units (MT) Score</strong>
       </td>

            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {installed_capacity.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.2</td>
            <td className="border px-3 py-2">
              Production of Green hydrogen (MT)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">MT</td>
           
            {production_MT_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Production of Green hydrogen (MT) Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {production_MT.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.3</td>
            <td className="border px-3 py-2">
              Carbon emitted per unit of Green Hydrogen Production (Tonne/ Tonne)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">Number</td>
          
            {carbon_emitted_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Carbon emitted per unit of Green Hydrogen Production (Tonne/ Tonne) Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
                        {carbon_emitted.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.4</td>
            <td className="border px-3 py-2">
              Purity of Green Hydrogen Produced (%)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">%</td>
         
            {purity_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Purity of Green Hydrogen Produced (%) Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
          
                       {purity.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.5</td>
            <td className="border px-3 py-2">Cost of Production (INR / Tonne)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">%</td>
           
            {cost_production_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Cost of Production (INR / Tonne) Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
                        {cost_production.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2</td>
            <td className="border px-3 py-2"><strong>Investment in Green Hydrogen</strong></td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2"></td>
           
            {investment_growth.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2.1</td>
            <td className="border px-3 py-2">
              Investment in Green Hydrogen production/transportation/distribution/storage (INR Crore)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">Number</td>
          
            {investment_production_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Investment in Green Hydrogen production/transportation/distribution/storage (INR Crore) Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
         
          {growth_investment_2024.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2.2</td>
            <td className="border px-3 py-2">
              Growth (%) in investment in Green Hydrogen production/transportation/distribution/storage
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">%</td>
           
            {growth_investment_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {isFinite(v) ? v.toFixed(2) : "Inf"}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">in 2024-25 (INR Crore)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
          
            {growth_investment_2024.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">in 2023-24 (INR Crore)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
          
            {growth_investment_2023.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3</td>
            <td className="border px-3 py-2">
             <strong> Investment in Electrolyser/ Membrane Manufacturing</strong>
            </td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
           
            {investment_electrolyser_growth.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3.1</td>
            <td className="border px-3 py-2">
              Investment in Electrolyser/ Membrane Manufacturing (INR Crore)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">Number</td>
           
            {investment_electrolyser_2024.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Investment in Electrolyser/ Membrane Manufacturing (INR Crore) Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
          
            {investment_electrolyser_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3.2</td>
            <td className="border px-3 py-2">
              Growth (%) in investment in Electrolyser / Membrane Manufacturing
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">%</td>
           
            {investment_electrolyser_2023.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {isFinite(v) ? v.toFixed(2) : "Inf"}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong> Growth (%) in investment in Electrolyser / Membrane Manufacturing Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {growth_electrolyser_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4</td>
            <td className="border px-3 py-2">
             <strong> R&D in Green Hydrogen production/ transportation/distribution/ storage areas</strong>
            </td>
            <td className="border px-3 py-2">15</td>
            <td className="border px-3 py-2">15</td>
            <td className="border px-3 py-2"></td>
           
            {r_n_d_growth.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.1</td>
            <td className="border px-3 py-2">
              Patents filed in the Assessment year
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">3</td>
            <td className="border px-3 py-2">Number</td>
          
            {patent_filed.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Patents filed in the Assessment year Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
                       {patent_filed_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.2</td>
            <td className="border px-3 py-2">Total Patents Granted (National)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">3</td>
            <td className="border px-3 py-2">Number</td>
          
            {patent_national.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Total Patents Granted (National) Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
                        {patent_national_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.3</td>
            <td className="border px-3 py-2">
              Total Patents Granted (International)
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">4</td>
            <td className="border px-3 py-2">Number</td>
           
            {patent_international.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong> Total Patents Granted (International) Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
             {patent_international_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.4</td>
            <td className="border px-3 py-2">Patents Commercialized</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">Number</td>
           
            {patent_commercial.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Patents Commercialized Score</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
                       {patent_commercial_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2"><strong>Upcoming Projects</strong></td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2"></td>
           
            {upcoming_project_growth.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">5.1</td>
            <td className="border px-3 py-2">Marks obtained against Total Value of all the Upcoming Projects</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">Number</td>
           
            {marks_obtained.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Total Value of all the Upcoming Projects</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {total_value.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {isFinite(v) ? v.toFixed(2) : "Inf"}
              </td>
            ))}
          </tr>


          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
            <strong>Project 1</strong>
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {/* {v.toFixed(2)} */}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Capacity (KT)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_capacity_1.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Completion year</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_completion_year_1.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Year Difference:(Project Completion Year - 2025)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>

            {year_difference_1.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Marks Allocated to Year Difference</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {mark_allocated_1.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Value: (Marks Allocated to Year Difference * Capacity) </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {project_value_1.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
            <strong>Project 2</strong>
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Capacity (KT)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_capacity_2.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Completion year</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_completion_year_2.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Year Difference:(Project Completion Year - 2025)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>

            {year_difference_2.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Marks Allocated to Year Difference</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {mark_allocated_2.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Value: (Marks Allocated to Year Difference * Capacity) </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {project_value_2.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
            <strong>Project 3</strong>
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {/* {v.toFixed(2)} */}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Capacity (KT)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_capacity_3.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Completion year</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_completion_year_3.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Year Difference:(Project Completion Year - 2025)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>

            {year_difference_3.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Marks Allocated to Year Difference</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {mark_allocated_3.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Value: (Marks Allocated to Year Difference * Capacity) </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {project_value_3.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>


          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
            <strong>Project 4</strong>
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {/* {v.toFixed(2)} */}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Capacity (KT)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_capacity_4.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Completion year</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_completion_year_4.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Year Difference:(Project Completion Year - 2025)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>

            {year_difference_4.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Marks Allocated to Year Difference</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {mark_allocated_4.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Value: (Marks Allocated to Year Difference * Capacity) </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {project_value_4.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>

          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">
            <strong>Project 5</strong>
            </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {companies.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {/* {v.toFixed(2)} */}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Capacity (KT)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_capacity_5.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Completion year</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
           
            {project_completion_year_5.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(0)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Year Difference:(Project Completion Year - 2025)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>

            {year_difference_5.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Marks Allocated to Year Difference</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {mark_allocated_5.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
           <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">Project Value: (Marks Allocated to Year Difference * Capacity) </td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            
            {project_value_5.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Grand Total</strong></td>
            <td className="border px-3 py-2">100</td>
            <td className="border px-3 py-2">100</td>

            <td className="border px-3 py-2"></td>
            
            {Total_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {v.toFixed(2)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GHscoretable;