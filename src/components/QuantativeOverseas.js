import React from "react";
import { useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import "../../styles/GHscoretable.css";

const GHscoretable = () => {
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
      installed_capacity_2024: 45.0,
      production_2024: 44.0,
      carbon_emission_2024: 30.0,
      purity_2024: 46.0,
      cost_of_production_2024: 97.0,
      patents_filed_2024: 14,
      patents_granted_national_2024: 48,
      patents_granted_international_2024: 48,
      patents_commercialized_2024: 489,
      investment_activities_2024: 46.0,
      investment_activities_2023: 4684.0,
      investment_electrolyser_2024: 64664.0,
      investment_electrolyser_2023: 646.0,
      upcoming_projects_2024: "",
      upcoming_projects_2023: "",
      project_name_1: "jugty",
      location_1: "g",
      capacity_1: 6547457.0,
      project_completion_year_1: 2027,
      project_current_status_1: "ft",
      project_name_2: "dtr",
      location_2: "dtr",
      capacity_2: 547.0,
      project_completion_year_2: 2028,
      project_current_status_2: "fy",
      project_name_3: "f",
      location_3: "guy",
      capacity_3: 547.0,
      project_completion_year_3: 2029,
      project_current_status_3: "hi",
      project_name_4: "huy",
      location_4: "gu",
      capacity_4: 4574.0,
      project_completion_year_4: 2030,
      project_current_status_4: "gu",
      project_name_5: "gu",
      location_5: "gu",
      capacity_5: 7347.0,
      project_completion_year_5: 2031,
      project_current_status_5: "gu",
      user_id: 1,
      form_id: "green_hydrogen_1",
      form_mode: "draft",
      installed_capacity_2024_score: 8.18,
      production_2024_score: 4.63,
      carbon_emission_2024_score: 5.0,
      purity_2024_score: 2.74,
      cost_of_production_2024_score: 2.68,
      installed_capacity_gh_p_unit: 23.23,
      patents_filed_2024_score: 0.27,
      patents_granted_national_2024_score: 0.03,
      patents_granted_international_2024_score: 0.28,
      patents_commercialized_2024_score: 2.48,
      r_and_d_gh_production_total: 3.07,
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
      installed_capacity_2024: 55.0,
      production_2024: 57.0,
      carbon_emission_2024: 55.0,
      purity_2024: 84.0,
      cost_of_production_2024: 52.0,
      patents_filed_2024: 65,
      patents_granted_national_2024: 656,
      patents_granted_international_2024: 68,
      patents_commercialized_2024: 984,
      investment_activities_2024: 9874.0,
      investment_activities_2023: 1354.0,
      investment_electrolyser_2024: 9847.0,
      investment_electrolyser_2023: 5644.0,
      upcoming_projects_2024: "",
      upcoming_projects_2023: "",
      project_name_1: "fdtryf",
      location_1: "yrfyr",
      capacity_1: 75475.0,
      project_completion_year_1: 2028,
      project_current_status_1: "yf",
      project_name_2: "ytf",
      location_2: "yt",
      capacity_2: 7474743.0,
      project_completion_year_2: 2029,
      project_current_status_2: "gty",
      project_name_3: "fyt",
      location_3: "fr",
      capacity_3: 7743.0,
      project_completion_year_3: 2030,
      project_current_status_3: "yf",
      project_name_4: "uyf",
      location_4: "ytf",
      capacity_4: 747.0,
      project_completion_year_4: 2031,
      project_current_status_4: "tfyt",
      project_name_5: "fy",
      location_5: "f",
      capacity_5: 43747.0,
      project_completion_year_5: 2032,
      project_current_status_5: "uf",
      user_id: 3,
      form_id: "green_hydrogen_3",
      form_mode: "draft",
      installed_capacity_2024_score: 10.0,
      production_2024_score: 6.0,
      carbon_emission_2024_score: 2.73,
      purity_2024_score: 5.0,
      cost_of_production_2024_score: 5.0,
      installed_capacity_gh_p_unit: 28.73,
      patents_filed_2024_score: 1.27,
      patents_granted_national_2024_score: 0.42,
      patents_granted_international_2024_score: 0.4,
      patents_commercialized_2024_score: 5.0,
      r_and_d_gh_production_total: 7.09,
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
      installed_capacity_2024: 13.0,
      production_2024: 95.0,
      carbon_emission_2024: 64.0,
      purity_2024: 26.0,
      cost_of_production_2024: 65.0,
      patents_filed_2024: 154,
      patents_granted_national_2024: 4658,
      patents_granted_international_2024: 684,
      patents_commercialized_2024: 464,
      investment_activities_2024: 846.0,
      investment_activities_2023: 486.0,
      investment_electrolyser_2024: 486.0,
      investment_electrolyser_2023: 684.0,
      upcoming_projects_2024: "",
      upcoming_projects_2023: "",
      project_name_1: "sdvw",
      location_1: "crtfc",
      capacity_1: 44654.0,
      project_completion_year_1: 2029,
      project_current_status_1: "yfyf",
      project_name_2: "yfvhf",
      location_2: "yftyhfyftyfy",
      capacity_2: 646.0,
      project_completion_year_2: 2030,
      project_current_status_2: "f",
      project_name_3: "ytf",
      location_3: "ytf",
      capacity_3: 464.0,
      project_completion_year_3: 2031,
      project_current_status_3: "ytfv",
      project_name_4: "tyfv",
      location_4: "ytfv",
      capacity_4: 6346.0,
      project_completion_year_4: 2032,
      project_current_status_4: "yttfy",
      project_name_5: "tfv",
      location_5: "yfv",
      capacity_5: 646.0,
      project_completion_year_5: 2033,
      project_current_status_5: "fvy",
      user_id: 2,
      form_id: "green_hydrogen_2",
      form_mode: "draft",
      installed_capacity_2024_score: 2.36,
      production_2024_score: 10.0,
      carbon_emission_2024_score: 2.34,
      purity_2024_score: 1.55,
      cost_of_production_2024_score: 4.0,
      installed_capacity_gh_p_unit: 20.26,
      patents_filed_2024_score: 3.0,
      patents_granted_national_2024_score: 3.0,
      patents_granted_international_2024_score: 4.0,
      patents_commercialized_2024_score: 2.36,
      r_and_d_gh_production_total: 12.36,
    },
  ];

  const companies = [
    "Raygain Technology Private Limited",
    "Raygain Technology Pvt Ltd",
    "Raygain Technologies Private Limited",
  ];

  const currentYear = 2025;

  // Calculate scores
  const installed_capacity = staticData.map((item) => item.installed_capacity_2024);
  const installed_capacity_score = staticData.map((item) => item.installed_capacity_2024_score);
  const installed_capacity_growth = staticData.map(
    (item) =>
      item.installed_capacity_2024_score +
      item.production_2024_score +
      item.carbon_emission_2024_score +
      item.purity_2024_score +
      item.cost_of_production_2024_score
  );

  const production_MT = staticData.map((item) => item.production_2024);
  const production_MT_score = staticData.map((item) => item.production_2024_score);

  const carbon_emitted = staticData.map((item) => item.carbon_emission_2024);
  const carbon_emitted_score = staticData.map((item) => item.carbon_emission_2024_score);

  const purity = staticData.map((item) => item.purity_2024);
  const purity_score = staticData.map((item) => item.purity_2024_score);

  const cost_production = staticData.map((item) => item.cost_of_production_2024);
  const cost_production_score = staticData.map((item) => item.cost_of_production_2024_score);

  const investment_activities_raw = staticData.map((item) => item.investment_activities_2024);
  const max_investment_activities = Math.max(...investment_activities_raw);
  const investment_production_score = investment_activities_raw.map((raw) =>
    max_investment_activities > 0 ? (10 * raw) / max_investment_activities : 0
  );

  const growth_investment_raw = staticData.map((item) => {
    const prev = item.investment_activities_2023;
    const curr = item.investment_activities_2024;
    return prev > 0 ? ((curr - prev) / prev) * 100 : 0;
  });
  const max_growth_investment = Math.max(...growth_investment_raw);
  const growth_investment_score = growth_investment_raw.map((g) =>
    max_growth_investment > 0 ? (10 * g) / max_growth_investment : 0
  );
  const growth_investment_2024 = staticData.map((item) => item.investment_activities_2024);
  const growth_investment_2023 = staticData.map((item) => item.investment_activities_2023);
  const investment_growth = investment_production_score.map((s, i) => s + growth_investment_score[i]);

  const investment_electrolyser_raw = staticData.map((item) => item.investment_electrolyser_2024);
  const max_investment_electrolyser = Math.max(...investment_electrolyser_raw);
  const investment_electrolyser_score = investment_electrolyser_raw.map((raw) =>
    max_investment_electrolyser > 0 ? (5 * raw) / max_investment_electrolyser : 0
  );

  const growth_electrolyser_raw = staticData.map((item) => {
    const prev = item.investment_electrolyser_2023;
    const curr = item.investment_electrolyser_2024;
    return prev > 0 ? ((curr - prev) / prev) * 100 : 0;
  });
  const max_growth_electrolyser = Math.max(...growth_electrolyser_raw);
  const growth_electrolyser_score = growth_electrolyser_raw.map((g) =>
    max_growth_electrolyser > 0 ? (5 * g) / max_growth_electrolyser : 0
  );
  const investment_electrolyser_2023 = staticData.map((item) => item.investment_electrolyser_2023);
  const investment_electrolyser_growth = investment_electrolyser_score.map((s, i) => s + growth_electrolyser_score[i]);

  const patent_filed = staticData.map((item) => item.patents_filed_2024);
  const patent_filed_score = staticData.map((item) => item.patents_filed_2024_score);

  const patent_national = staticData.map((item) => item.patents_granted_national_2024);
  const patent_national_score = staticData.map((item) => item.patents_granted_national_2024_score);

  const patent_international = staticData.map((item) => item.patents_granted_international_2024);
  const patent_international_score = staticData.map((item) => item.patents_granted_international_2024_score);

  const patent_commercial = staticData.map((item) => item.patents_commercialized_2024);
  const patent_commercial_score = staticData.map((item) => item.patents_commercialized_2024_score);

  const r_n_d_growth = staticData.map((item) => item.r_and_d_gh_production_total);

  // Upcoming Projects (Section 5.1)
  const total_values = staticData.map((item) => {
    let total = 0;
    for (let j = 1; j <= 5; j++) {
      let completion = item[`project_completion_year_${j}`];
      let capacity = item[`capacity_${j}`];
      let diff = completion - currentYear;
      if (diff < 0) diff = 0;
      let marks = Math.max(0, 11 - diff);
      total += marks * capacity;
    }
    return total;
  });
  const max_total_value = Math.max(...total_values);
  const upcoming_project_scores_5_1 = total_values.map((tv) => (max_total_value > 0 ? (10 * tv) / max_total_value : 0));
  const upcoming_project_scores_5_2 = staticData.map(() => 0); // Assuming 5.2 is 0 as per Excel
  const upcoming_project_growth = upcoming_project_scores_5_1.map((s, i) => s + upcoming_project_scores_5_2[i]);

  // Project details for UI (using project 1 as per original code)
  const project_completion_year = staticData.map((item) => item.project_completion_year_1);
  const project_capacity = staticData.map((item) => item.capacity_1);
  const project_completed_year = project_completion_year.map((y) => y - currentYear);
  const project_formula = project_completed_year.map((d, i) =>
    project_capacity[i] > 0 ? d / project_capacity[i] : 0
  );
  const project_status = staticData.map((item) => item.project_current_status_1);

  // Grand Total
  const Total_score = staticData.map((item, i) => {
    return (
      installed_capacity_growth[i] +
      investment_growth[i] +
      investment_electrolyser_growth[i] +
      item.r_and_d_gh_production_total +
      upcoming_project_growth[i]
    );
  });

  const safeFmt = (v, digits = 2) => {
    if (v === null || v === undefined || v === "") return "-";
    if (typeof v === "number" && Number.isFinite(v)) {
      return digits === 0 ? String(Math.round(v)) : v.toFixed(digits);
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

    // Header
    aoa.push(["", "FIPI Awards 2025 - Green Hydrogen Company of the Year", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["", "", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["", "", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["Sr. No.", "Evaluation Parameters", "Max Score", "Sub KPI Score", "Eval. Method.", "Unit of Eval", "Minimum", "Maximum", ...companies]);

    // Section 1: Installed Capacity
    aoa.push([
      "1",
      "Installed Capacity of Green hydrogen production units",
      "35",
      "35",
      "",
      "",
      "",
      "",
      { f: "SUM(I6:I14:2)", v: installed_capacity_growth[0] },
      { f: "SUM(J6:J14:2)", v: installed_capacity_growth[1] },
      { f: "SUM(K6:K14:2)", v: installed_capacity_growth[2] },
      "",
      "",
    ]);

    // 1.1
    aoa.push([
      "1.1",
      "Installed Capacity of Green hydrogen production units (MT)",
      "",
      "10",
      "Highest gets max score",
      "MT",
      "",
      "",
      { f: "10*I7/MAX(I7:K7)", v: installed_capacity_score[0] },
      { f: "10*J7/MAX(I7:K7)", v: installed_capacity_score[1] },
      { f: "10*K7/MAX(I7:K7)", v: installed_capacity_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", installed_capacity[0], installed_capacity[1], installed_capacity[2], "", ""]);

    // 1.2
    aoa.push([
      "1.2",
      "Production of Green hydrogen (MT)",
      "",
      "10",
      "Highest gets max score",
      "MT",
      "",
      "",
      { f: "10*I9/MAX(I9:K9)", v: production_MT_score[0] },
      { f: "10*J9/MAX(I9:K9)", v: production_MT_score[1] },
      { f: "10*K9/MAX(I9:K9)", v: production_MT_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", production_MT[0], production_MT[1], production_MT[2], "", ""]);

    // 1.3
    aoa.push([
      "1.3",
      "Carbon emitted per unit of Green Hydrogen Production (Tonne/ Tonne)",
      "",
      "5",
      "Lowest gets max score",
      "Number",
      "",
      "",
      { f: "5*MIN(I11:K11)/I11", v: carbon_emitted_score[0] },
      { f: "5*MIN(I11:K11)/J11", v: carbon_emitted_score[1] },
      { f: "5*MIN(I11:K11)/K11", v: carbon_emitted_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", carbon_emitted[0], carbon_emitted[1], carbon_emitted[2], "", ""]);

    // 1.4
    aoa.push([
      "1.4",
      "Purity of Green Hydrogen Produced (%)",
      "",
      "5",
      "Highest gets max score",
      "%",
      "",
      "",
      { f: "5*I13/MAX(I13:K13)", v: purity_score[0] },
      { f: "5*J13/MAX(I13:K13)", v: purity_score[1] },
      { f: "5*K13/MAX(I13:K13)", v: purity_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", purity[0], purity[1], purity[2], "", ""]);

    // 1.5
    aoa.push([
      "1.5",
      "Cost of Production (INR / Tonne)",
      "",
      "5",
      "Lowest gets max score",
      "INR/Tonne",
      "",
      "",
      { f: "5*MIN(I15:K15)/I15", v: cost_production_score[0] },
      { f: "5*MIN(I15:K15)/J15", v: cost_production_score[1] },
      { f: "5*MIN(I15:K15)/K15", v: cost_production_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", cost_production[0], cost_production[1], cost_production[2], "", ""]);

    // Section 2: Investment in Green Hydrogen
    aoa.push([
      "2",
      "Investment in Green Hydrogen",
      "20",
      "20",
      "",
      "",
      "",
      "",
      { f: "SUM(I17:I19)", v: investment_growth[0] },
      { f: "SUM(J17:J19)", v: investment_growth[1] },
      { f: "SUM(K17:K19)", v: investment_growth[2] },
      "",
      "",
    ]);

    // 2.1
    aoa.push([
      "2.1",
      "Investment in Green Hydrogen production/transportation/distribution/storage (INR Crores)",
      "",
      "10",
      "Highest gets max score",
      "Number",
      "",
      "",
      { f: "10*I18/MAX(I18:K18)", v: investment_production_score[0] },
      { f: "10*J18/MAX(I18:K18)", v: investment_production_score[1] },
      { f: "10*K18/MAX(I18:K18)", v: investment_production_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", investment_activities_raw[0], investment_activities_raw[1], investment_activities_raw[2], "", ""]);

    // 2.2
    aoa.push([
      "2.2",
      "Growth (%) in investment in Green Hydrogen production/transportation/distribution/storage",
      "",
      "10",
      "Highest gets max score",
      "%",
      "",
      "",
      {
        f: "10 * (IF(I21=0,0,(I20-I21)/I21)) / MAX(IF(I21=0,0,(I20-I21)/I21), IF(J21=0,0,(J20-J21)/J21), IF(K21=0,0,(K20-K21)/K21))",
        v: growth_investment_score[0],
      },
      {
        f: "10 * (IF(J21=0,0,(J20-J21)/J21)) / MAX(IF(I21=0,0,(I20-I21)/I21), IF(J21=0,0,(J20-J21)/J21), IF(K21=0,0,(K20-K21)/K21))",
        v: growth_investment_score[1],
      },
      {
        f: "10 * (IF(K21=0,0,(K20-K21)/K21)) / MAX(IF(I21=0,0,(I20-I21)/I21), IF(J21=0,0,(J20-J21)/J21), IF(K21=0,0,(K20-K21)/K21))",
        v: growth_investment_score[2],
      },
      "",
      "",
    ]);
    aoa.push(["", "in 2024-25 (INR Crores)", "", "", "", "", "", "", growth_investment_2024[0], growth_investment_2024[1], growth_investment_2024[2], "", ""]);
    aoa.push(["", "in 2023-24 (INR Crores)", "", "", "", "", "", "", growth_investment_2023[0], growth_investment_2023[1], growth_investment_2023[2], "", ""]);

    // Section 3: Investment in Electrolyser
    aoa.push([
      "3",
      "Investment in Electrolyser/ Membrane Manufacturing",
      "10",
      "10",
      "",
      "",
      "",
      "",
      { f: "SUM(I24:I26)", v: investment_electrolyser_growth[0] },
      { f: "SUM(J24:J26)", v: investment_electrolyser_growth[1] },
      { f: "SUM(K24:K26)", v: investment_electrolyser_growth[2] },
      "",
      "",
    ]);

    // 3.1
    aoa.push([
      "3.1",
      "Investment in Electrolyser/ Membrane Manufacturing (INR Crores)",
      "",
      "5",
      "Highest gets max score",
      "Number",
      "",
      "",
      { f: "5*I25/MAX(I25:K25)", v: investment_electrolyser_score[0] },
      { f: "5*J25/MAX(I25:K25)", v: investment_electrolyser_score[1] },
      { f: "5*K25/MAX(I25:K25)", v: investment_electrolyser_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", investment_electrolyser_raw[0], investment_electrolyser_raw[1], investment_electrolyser_raw[2], "", ""]);

    // 3.2
    aoa.push([
      "3.2",
      "Growth (%) in investment in Electrolyser / Membrane Manufacturing",
      "",
      "5",
      "Highest gets max score",
      "%",
      "",
      "",
      {
        f: "5 * (IF(I28=0,0,(I27-I28)/I28)) / MAX(IF(I28=0,0,(I27-I28)/I28), IF(J28=0,0,(J27-J28)/J28), IF(K28=0,0,(K27-K28)/K28))",
        v: growth_electrolyser_score[0],
      },
      {
        f: "5 * (IF(J28=0,0,(J27-J28)/J28)) / MAX(IF(I28=0,0,(I27-I28)/I28), IF(J28=0,0,(J27-J28)/J28), IF(K28=0,0,(K27-K28)/K28))",
        v: growth_electrolyser_score[1],
      },
      {
        f: "5 * (IF(K28=0,0,(K27-K28)/K28)) / MAX(IF(I28=0,0,(I27-I28)/I28), IF(J28=0,0,(J27-J28)/J28), IF(K28=0,0,(K27-K28)/K28))",
        v: growth_electrolyser_score[2],
      },
      "",
      "",
    ]);
    aoa.push(["", "in 2024-25 (INR Crores)", "", "", "", "", "", "", investment_electrolyser_raw[0], investment_electrolyser_raw[1], investment_electrolyser_raw[2], "", ""]);
    aoa.push(["", "in 2023-24 (INR Crores)", "", "", "", "", "", "", investment_electrolyser_2023[0], investment_electrolyser_2023[1], investment_electrolyser_2023[2], "", ""]);

    // Section 4: R&D
    aoa.push([
      "4",
      "R&D in Green Hydrogen production/ transportation/distribution/ storage areas",
      "15",
      "15",
      "",
      "",
      "",
      "",
      { f: "SUM(I30:I36:2)", v: r_n_d_growth[0] },
      { f: "SUM(J30:J36:2)", v: r_n_d_growth[1] },
      { f: "SUM(K30:K36:2)", v: r_n_d_growth[2] },
      "",
      "",
    ]);

    // 4.1
    aoa.push([
      "4.1",
      "Patents filed in the Assessment year",
      "",
      "3",
      "Highest gets max score",
      "Number",
      "",
      "",
      { f: "3*I31/MAX(I31:K31)", v: patent_filed_score[0] },
      { f: "3*J31/MAX(I31:K31)", v: patent_filed_score[1] },
      { f: "3*K31/MAX(I31:K31)", v: patent_filed_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", patent_filed[0], patent_filed[1], patent_filed[2], "", ""]);

    // 4.2
    aoa.push([
      "4.2",
      "Total Patents Granted (National)",
      "",
      "3",
      "Highest gets max score",
      "Number",
      "",
      "",
      { f: "3*I33/MAX(I33:K33)", v: patent_national_score[0] },
      { f: "3*J33/MAX(I33:K33)", v: patent_national_score[1] },
      { f: "3*K33/MAX(I33:K33)", v: patent_national_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", patent_national[0], patent_national[1], patent_national[2], "", ""]);

    // 4.3
    aoa.push([
      "4.3",
      "Total Patents Granted (International)",
      "",
      "4",
      "Highest gets max score",
      "Number",
      "",
      "",
      { f: "4*I35/MAX(I35:K35)", v: patent_international_score[0] },
      { f: "4*J35/MAX(I35:K35)", v: patent_international_score[1] },
      { f: "4*K35/MAX(I35:K35)", v: patent_international_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", patent_international[0], patent_international[1], patent_international[2], "", ""]);

    // 4.4
    aoa.push([
      "4.4",
      "Patents Commercialized",
      "",
      "5",
      "Highest gets max score",
      "Number",
      "",
      "",
      { f: "5*I37/MAX(I37:K37)", v: patent_commercial_score[0] },
      { f: "5*J37/MAX(I37:K37)", v: patent_commercial_score[1] },
      { f: "5*K37/MAX(I37:K37)", v: patent_commercial_score[2] },
      "",
      "",
    ]);
    aoa.push(["", "", "", "", "", "", "", "", patent_commercial[0], patent_commercial[1], patent_commercial[2], "", ""]);

    // Section 5: Upcoming Projects
    let five_one_row = aoa.length + 1;
    aoa.push([
      "5",
      "Upcoming Projects",
      "20",
      "20",
      "",
      "",
      "",
      "",
      { f: `SUM(I${five_one_row}:I${five_one_row + 30}:2)`, v: upcoming_project_growth[0] },
      { f: `SUM(J${five_one_row}:J${five_one_row + 30}:2)`, v: upcoming_project_growth[1] },
      { f: `SUM(K${five_one_row}:K${five_one_row + 30}:2)`, v: upcoming_project_growth[2] },
      "",
      "",
    ]);

    // 5.1
    aoa.push([
      "5.1",
      "Marks obtained against Total Value of all the Upcoming Projects",
      "",
      "10",
      "",
      "",
      "",
      "",
      { f: `10*I${five_one_row + 2}/MAX(I${five_one_row + 2}:K${five_one_row + 2})`, v: upcoming_project_scores_5_1[0] },
      { f: `10*J${five_one_row + 2}/MAX(I${five_one_row + 2}:K${five_one_row + 2})`, v: upcoming_project_scores_5_1[1] },
      { f: `10*K${five_one_row + 2}/MAX(I${five_one_row + 2}:K${five_one_row + 2})`, v: upcoming_project_scores_5_1[2] },
      "",
      "",
    ]);

    let total_value_row = aoa.length + 1;
    aoa.push(["", "Total Value of all the Upcoming Projects", "", "", "", "", "0", "200", { v: total_values[0] }, { v: total_values[1] }, { v: total_values[2] }, "", ""]);

    // Project details
    let value_rows = [];
    for (let j = 1; j <= 5; j++) {
      aoa.push(["", `Project ${j}`, "", "", "", "", "", "", "", "", "", "", ""]);
      let capacity_row = aoa.length + 1;
      aoa.push(["", "Capacity (KT)", "", "", "", "", "", "", staticData[0][`capacity_${j}`], staticData[1][`capacity_${j}`], staticData[2][`capacity_${j}`], "", ""]);
      let completion_row = aoa.length + 1;
      aoa.push([
        "",
        "Project Completion Year",
        "",
        "",
        "",
        "",
        "",
        "",
        staticData[0][`project_completion_year_${j}`],
        staticData[1][`project_completion_year_${j}`],
        staticData[2][`project_completion_year_${j}`],
        "",
        "",
      ]);
      let diff_row = aoa.length + 1;
      aoa.push([
        "",
        "Year Difference: (Project Completion Year - 2025)",
        "",
        "",
        "",
        "",
        "",
        "",
        { f: `I${completion_row}-2025`, v: Math.max(0, staticData[0][`project_completion_year_${j}`] - currentYear) },
        { f: `J${completion_row}-2025`, v: Math.max(0, staticData[1][`project_completion_year_${j}`] - currentYear) },
        { f: `K${completion_row}-2025`, v: Math.max(0, staticData[2][`project_completion_year_${j}`] - currentYear) },
        "",
        "",
      ]);
      let marks_row = aoa.length + 1;
      aoa.push([
        "",
        "Marks Allocated to Year Difference",
        "",
        "",
        "",
        "",
        "",
        "",
        { f: `MAX(0,11-I${diff_row})`, v: Math.max(0, 11 - Math.max(0, staticData[0][`project_completion_year_${j}`] - currentYear)) },
        { f: `MAX(0,11-J${diff_row})`, v: Math.max(0, 11 - Math.max(0, staticData[1][`project_completion_year_${j}`] - currentYear)) },
        { f: `MAX(0,11-K${diff_row})`, v: Math.max(0, 11 - Math.max(0, staticData[2][`project_completion_year_${j}`] - currentYear)) },
        "",
        "",
      ]);
      let value_row = aoa.length + 1;
      aoa.push([
        "",
        "Project Value: (Marks Allocated to Year Difference * Capacity)",
        "",
        "",
        "",
        "",
        "",
        "",
        { f: `I${marks_row}*I${capacity_row}`, v: Math.max(0, 11 - Math.max(0, staticData[0][`project_completion_year_${j}`] - currentYear)) * staticData[0][`capacity_${j}`] },
        { f: `J${marks_row}*J${capacity_row}`, v: Math.max(0, 11 - Math.max(0, staticData[1][`project_completion_year_${j}`] - currentYear)) * staticData[1][`capacity_${j}`] },
        { f: `K${marks_row}*K${capacity_row}`, v: Math.max(0, 11 - Math.max(0, staticData[2][`project_completion_year_${j}`] - currentYear)) * staticData[2][`capacity_${j}`] },
        "",
        "",
      ]);
      value_rows.push(value_row);
    }

    // Update total value formulas
    aoa[total_value_row - 1][8] = { f: `SUM(I${value_rows.join(",I")})`, v: total_values[0] };
    aoa[total_value_row - 1][9] = { f: `SUM(J${value_rows.join(",J")})`, v: total_values[1] };
    aoa[total_value_row - 1][10] = { f: `SUM(K${value_rows.join(",K")})`, v: total_values[2] };

    // 5.2
    aoa.push(["5.2", "Project Size - Progress Status", "", "10", "", "", "", "", { f: "0", v: 0 }, { f: "0", v: 0 }, { f: "0", v: 0 }, "", ""]);

    // Grand Total
    aoa.push([
      "",
      "Grand Total",
      "100",
      "100",
      "",
      "",
      "",
      "",
      { f: "SUM(I5,I16,I23,I28,I39)", v: Total_score[0] },
      { f: "SUM(J5,J16,J23,J28,J39)", v: Total_score[1] },
      { f: "SUM(K5,K16,K23,K28,K39)", v: Total_score[2] },
      "",
      "",
    ]);

    // Notes
    aoa.push(["", "Notes:", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["", "*Areas of Intangible Value", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["1", "Reduction Carbon Footprint", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["2", "Improvement in Productivity", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["3", "Improvement in Energy Efficiency", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["4", "Reduction in Usage of Paper", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["5", "Expediting procurement/sales invoicing process", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["6", "Improvement in HSE Performance", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["7", "Improvement in Customer Interfacing", "", "", "", "", "", "", "", "", "", "", ""]);
    aoa.push(["8", "Others", "", "", "", "", "", "", "", "", "", "", ""]);

    const sheet = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Final Output Sheet");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Green_Hydrogen_Company_of_the_Year_2025.xlsx");
  };

  return (
    <div className="table-box">
      <button onClick={handleExport} className="export-btn">
        Export to Excel
      </button>
      <table ref={tableRef} className="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-3 py-2 cursor-pointer">Sr. No.</th>
            <th className="border px-3 py-2 cursor-pointer">Evaluation Parameters</th>
            <th className="border px-3 py-2 cursor-pointer">Max Score</th>
            <th className="border px-3 py-2 cursor-pointer">Sub KPI Score</th>
            <th className="border px-3 py-2 cursor-pointer">Eval. Method.</th>
            <th className="border px-3 py-2 cursor-pointer">Unit of Eval</th>
            <th className="border px-3 py-2 cursor-pointer">Minimum</th>
            <th className="border px-3 py-2 cursor-pointer">Maximum</th>
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
            <td className="border px-3 py-2"><strong>Installed Capacity of Green hydrogen production units</strong></td>
            <td className="border px-3 py-2">35</td>
            <td className="border px-3 py-2">35</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {installed_capacity_growth.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.1</td>
            <td className="border px-3 py-2">Installed Capacity of Green hydrogen production units (MT)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">MT</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {installed_capacity_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Installed Capacity of Green hydrogen production units (MT) Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {installed_capacity.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.2</td>
            <td className="border px-3 py-2">Production of Green hydrogen (MT)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">MT</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {production_MT_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Production of Green hydrogen (MT) Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {production_MT.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.3</td>
            <td className="border px-3 py-2">Carbon emitted per unit of Green Hydrogen Production (Tonne/ Tonne)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">Lowest gets max score</td>
            <td className="border px-3 py-2">Number</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {carbon_emitted_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Carbon emitted per unit of Green Hydrogen Production (Tonne/ Tonne) Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {carbon_emitted.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.4</td>
            <td className="border px-3 py-2">Purity of Green Hydrogen Produced (%)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {purity_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Purity of Green Hydrogen Produced (%) Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {purity.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">1.5</td>
            <td className="border px-3 py-2">Cost of Production (INR / Tonne)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">Lowest gets max score</td>
            <td className="border px-3 py-2">INR/Tonne</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {cost_production_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Cost of Production (INR / Tonne) Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {cost_production.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2</td>
            <td className="border px-3 py-2"><strong>Investment in Green Hydrogen</strong></td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2">20</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {investment_growth.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2.1</td>
            <td className="border px-3 py-2">Investment in Green Hydrogen production/transportation/distribution/storage (INR Crores)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">Number</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {investment_production_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Investment in Green Hydrogen production/transportation/distribution/storage (INR Crores) Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {investment_activities_raw.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">2.2</td>
            <td className="border px-3 py-2">Growth (%) in investment in Green Hydrogen production/transportation/distribution/storage</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {growth_investment_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">in 2024-25 (INR Crores)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {growth_investment_2024.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">in 2023-24 (INR Crores)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {growth_investment_2023.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3</td>
            <td className="border px-3 py-2"><strong>Investment in Electrolyser/ Membrane Manufacturing</strong></td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2">10</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {investment_electrolyser_growth.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3.1</td>
            <td className="border px-3 py-2">Investment in Electrolyser/ Membrane Manufacturing (INR Crores)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">Number</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {investment_electrolyser_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Investment in Electrolyser/ Membrane Manufacturing (INR Crores) Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {investment_electrolyser_raw.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">3.2</td>
            <td className="border px-3 py-2">Growth (%) in investment in Electrolyser / Membrane Manufacturing</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">%</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {growth_electrolyser_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">in 2024-25 (INR Crores)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {investment_electrolyser_raw.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">in 2023-24 (INR Crores)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {investment_electrolyser_2023.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4</td>
            <td className="border px-3 py-2"><strong>R&D in Green Hydrogen production/ transportation/distribution/ storage areas</strong></td>
            <td className="border px-3 py-2">15</td>
            <td className="border px-3 py-2">15</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {r_n_d_growth.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.1</td>
            <td className="border px-3 py-2">Patents filed in the Assessment year</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">3</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">Number</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {patent_filed_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Patents filed in the Assessment year Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {patent_filed.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.2</td>
            <td className="border px-3 py-2">Total Patents Granted (National)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">3</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">Number</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {patent_national_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Total Patents Granted (National) Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {patent_national.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.3</td>
            <td className="border px-3 py-2">Total Patents Granted (International)</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">4</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">Number</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {patent_international_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"><strong>Total Patents Granted (International) Value</strong></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {patent_international.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-3 py-2">4.4</td>
            <td className="border px-3 py-2">Patents Commercialized</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2">5</td>
            <td className="border px-3 py-2">Highest gets max score</td>
            <td className="border px-3 py-2">Number</td>
            <td className="border px-3 py-2"></td>
            <td className="border px-3 py-2"></td>
            {patent_commercial_score.map((v, i) => (
              <td key={i} className="border px-3 py-2">
                {safeFmt(v, 2)}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-100">


            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"><strong>Patents Commercialized Value</strong></td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

           

                       {patent_commercial.map((v, i) => (

              <td key={i} className="border px-3 py-2">

                {safeFmt(v, 2)}

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

                {safeFmt(v, 2)}

              </td>

            ))}

          </tr>

          <tr className="hover:bg-gray-100">

            <td className="border px-3 py-2">5.1</td>

            <td className="border px-3 py-2">Project Capacity - Schedule (B/A)</td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2">10</td>

            <td className="border px-3 py-2">Number</td>

           

            {upcoming_project_scores_5_1.map((v, i) => (

              <td key={i} className="border px-3 py-2">

                {safeFmt(v, 2)}

              </td>

            ))}

          </tr>

          <tr className="hover:bg-gray-100">

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2">Formula: (B/A)</td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

           

            {project_formula.map((v, i) => (

              <td key={i} className="border px-3 py-2">

                {safeFmt(v, 2)}

              </td>

            ))}

          </tr>

          <tr className="hover:bg-gray-100">

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2">

              Completed Year: (Project Completion Year - Current Year) - (B)

            </td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

           

            {project_completed_year.map((v, i) => (

              <td key={i} className="border px-3 py-2">

                {safeFmt(v, 2)}

              </td>

            ))}

          </tr>

          <tr className="hover:bg-gray-100">

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2">Project Completion year</td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

           

            {project_completion_year.map((v, i) => (

              <td key={i} className="border px-3 py-2">

                {safeFmt(v, 0)}

              </td>

            ))}

          </tr>

          <tr className="hover:bg-gray-100">

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2">Capacity - (A)</td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2"></td>

 

            {project_capacity.map((v, i) => (

              <td key={i} className="border px-3 py-2">

                {safeFmt(v, 2)}

              </td>

            ))}

          </tr>

          <tr className="hover:bg-gray-100">

            <td className="border px-3 py-2">5.2</td>

            <td className="border px-3 py-2"><strong>Project Size - Progress Status</strong></td>

            <td className="border px-3 py-2"></td>

            <td className="border px-3 py-2">10</td>

            <td className="border px-3 py-2"></td>

            

            {upcoming_project_scores_5_2.map((v, i) => (

              <td key={i} className="border px-3 py-2">

                {safeFmt(v, 2)}

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

                {safeFmt(v, 2)}

              </td>

            ))}

          </tr>

        </tbody>

      </table>

    </div>

  );

};

export default GHscoretable;