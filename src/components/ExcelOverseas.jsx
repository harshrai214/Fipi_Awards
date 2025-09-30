

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiClient from "../../api/axiosClient";

const TEMPLATE_FILENAME = "Overseas Oil & Gas Company of the year Award_2025_16082025.xlsx";

const rowMapping = {
  organisationname: 6,
  oil_production_2024:10,
  oil_production_2023:11,
  
  gas_production_2024:14,
  gas_production_2023:15,

  MMT_2024:19,
  MMT_2023:20,
  
  BCM_2024:23,
  BCM_2023:24,

  netprofit_2024:32,
  netprofit_2023:33,

  turnover_2024:35,
  turnover_2023:36,

  investment_2024:40,
  investment_2023:41,

  carbon_emmitted:44,
  hc_production:45,

  expenditure_2024:48,
  expenditure_2023:49,
};

/** Helpers for Excel columns / range */
const colLetter = (colIndex) => {
  let letters = "";
  while (colIndex >= 0) {
    letters = String.fromCharCode((colIndex % 26) + 65) + letters;
    colIndex = Math.floor(colIndex / 26) - 1;
  }
  return letters;
};

const colIndexFromLetter = (col) => {
  let index = 0;
  for (let i = 0; i < col.length; i++) {
    index = index * 26 + (col.charCodeAt(i) - 65 + 1);
  }
  return index - 1;
};

const expandSheetRange = (sheet, minCol, minRow, maxCol, maxRow) => {
  const start = `${colLetter(minCol)}${minRow}`;
  const end = `${colLetter(maxCol)}${maxRow}`;
  sheet["!ref"] = `${start}:${end}`;
};

const ExcelOverseas = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exported, setExported] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await apiClient.get("/vw-goalnetzero-submitted/");
        const results = (resp.data && (resp.data.results ?? resp.data)) || [];
        console.log("API results length:", results.length);
        setApiData(results);
      } catch (err) {
        console.error("API fetch error:", err);
        setError("Failed to fetch API data. See console.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loading && !error && apiData && apiData.length > 0 && !exported) {
      (async () => {
        try {
          await performExport(apiData);
          setExported(true);
        } catch (err) {
          console.error("Auto-export failed:", err);
        }
      })();
    }
  }, [loading, error, apiData, exported]);

  // Helper that tries many field names
  const getVal = (obj, ...keys) => {
    for (const k of keys) {
      if (!k) continue;
      const val = obj[k];
      if (val !== undefined && val !== null) return val;
    }
    return undefined;
  };

  // resolve merges: if (r,c) lies inside a merged range, return top-left of that merge
  const resolveMergeCell = (sheet, r, c) => {
    const merges = sheet["!merges"] || [];
    for (const m of merges) {
      if (r >= m.s.r && r <= m.e.r && c >= m.s.c && c <= m.e.c) {
        return { r: m.s.r, c: m.s.c };
      }
    }
    return { r, c };
  };

  const performExport = async (dataToWrite) => {
    if (!dataToWrite || dataToWrite.length === 0) {
      throw new Error("No API data to export.");
    }

    const url = encodeURI(`${process.env.PUBLIC_URL || ""}/templates/${TEMPLATE_FILENAME}`);
    console.log("Fetching template:", url);
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Template not found (status ${resp.status})`);

    const contentType = resp.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      const txt = await resp.text();
      console.error("Template fetch returned HTML (first 300 chars):", txt.slice(0, 300));
      throw new Error("Template returned HTML. Check file path/name.");
    }

    const arrayBuffer = await resp.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    console.log("Using sheet:", sheetName, "initial !ref:", sheet["!ref"]);

    // existing bounds
    const existingRef = sheet["!ref"] || "A1:A1";
    const [startRef, endRef] = existingRef.split(":");
    const startColLetter = (startRef || "A1").replace(/[0-9]/g, "");
    const startRow = parseInt((startRef || "A1").replace(/[A-Z]/gi, ""), 10) || 1;
    const endColLetter = (endRef || startRef || "A1").replace(/[0-9]/g, "");
    const endRow = parseInt((endRef || startRef || "A1").replace(/[A-Z]/gi, ""), 10) || 1;

    let minCol = colIndexFromLetter(startColLetter || "A");
    let minRow = startRow;
    let maxCol = colIndexFromLetter(endColLetter || "A");
    let maxRow = endRow;

    // Choose start column (zero-based). Change START_COL if you want to begin at G (6) or somewhere else.
    const START_COL = 9; // 6 => column G. Adjust if your template expects a different starting column.

    dataToWrite.forEach((company, idx) => {
      const colIndex = START_COL + idx; // zero-based
      const col = colLetter(colIndex);
      console.log(`\n--- Writing company #${idx + 1} into column ${col} (zero-based ${colIndex}) ---`);
      console.log("Company raw keys:", Object.keys(company).slice(0,50)); // quick peek

      // attempt multiple key names for each field to be resilient to API changes
      const organisationname = getVal(company, "organisation_name", "organisationname", "org_name", "organisation");

      const oil_production_2024 = getVal(company, "capex_solar_2024");
      const oil_production_2023 = getVal(company, "capex_solar_2024");
      const gas_production_2024 = getVal(company, "capex_other_re_2024", "capex_other_2024");
      const gas_production_2023 = getVal(company, "capex_other_re_2024", "capex_other_2024");
      const MMT_2024 = getVal(company, "re_power_prod_2024", "total_renewable_2024");
      const MMT_2023 = getVal(company, "re_power_prod_2024", "total_renewable_2024");
      const BCM_2024 = getVal(company, "re_power_prod_2023");
      const BCM_2023 = getVal(company, "re_power_prod_2023");
      const netprofit_2024 = getVal(company, "power_consumed_2024");
      const netprofit_2023 = getVal(company, "power_consumed_2024");
      const turnover_2024 = getVal(company, "gh2_investment_2024");
      const turnover_2023 = getVal(company, "gh2_investment_2024");
      const investment_2024 = getVal(company, "gh2_production_2024");
      const investment_2023 = getVal(company, "gh2_production_2024");
      const carbon_emmitted = getVal(company, "tree_plantation_2024");
      const hc_production = getVal(company, "ccs_capex_2024");
      const expenditure_2024 = getVal(company, "carbon_captured_2024");
      const expenditure_2023 = getVal(company, "carbon_captured_2024");

      const writes = [
        [rowMapping.organisationname, organisationname, "organisationname"],
        [rowMapping.oil_production_2024, oil_production_2024, "oil_production_2024"],
        [rowMapping.oil_production_2023, oil_production_2023, "oil_production_2023"],
        [rowMapping.gas_production_2024, gas_production_2024, "gas_production_2024"],
        [rowMapping.gas_production_2023, gas_production_2023, "gas_production_2023"],

        
        [rowMapping.MMT_2024, MMT_2024, "MMT_2024"],
        [rowMapping.MMT_2023, MMT_2023, "MMT_2023"],

        [rowMapping.BCM_2024, BCM_2024, "BCM_2024"],
        [rowMapping.BCM_2023, BCM_2023, "BCM_2023"],

        [rowMapping.netprofit_2024, netprofit_2024, "netprofit_2024"],
        [rowMapping.netprofit_2023, netprofit_2023, "netprofit_2023"],

        [rowMapping.turnover_2024, turnover_2024, "turnover_2024"],
        [rowMapping.turnover_2023, turnover_2023, "turnover_2023"],

        [rowMapping.investment_2024, investment_2024, "investment_2024"],
        [rowMapping.investment_2023, investment_2023, "investment_2023"],

        [rowMapping.carbon_emmitted, carbon_emmitted, "carbon_emmitted"],

        [rowMapping.hc_production, hc_production, "hc_production"],

        [rowMapping.expenditure_2024, expenditure_2024, "expenditure_2024"],
        [rowMapping.expenditure_2023, expenditure_2023, "expenditure_2023"],
      ];

      writes.forEach(([rowNum, value, fieldName]) => {
        if (rowNum == null) return; // missing mapping
        const rZero = rowNum - 1;
        const cZero = colIndex;

        // resolve merges (if writing inside a merged cell, write to master)
        const { r: rResolved, c: cResolved } = resolveMergeCell(sheet, rZero, cZero);

        // If value is undefined/null -> set to empty string but log it
        let writeVal = value;
        if (writeVal === undefined || writeVal === null || writeVal === "") {
          console.warn(`Company #${idx + 1} field "${fieldName}" missing -> writing empty string to ${colLetter(cResolved)}${rResolved + 1}`);
          writeVal = "";
        }

        // Try to coerce numeric-looking strings to numbers
        if (typeof writeVal === "string") {
          const trimmed = writeVal.trim();
          if (trimmed !== "" && /^-?\d+(\.\d+)?$/.test(trimmed)) {
            writeVal = Number(trimmed);
          }
        }

        // Use sheet_add_aoa with { origin: { r, c } } for robust placement
        try {
          XLSX.utils.sheet_add_aoa(sheet, [[writeVal]], { origin: { r: rResolved, c: cResolved } });
          const cellAddress = `${colLetter(cResolved)}${rResolved + 1}`;
          const newCell = sheet[cellAddress];
          if (newCell) {
            if (typeof writeVal === "number") newCell.t = "n";
            else if (typeof writeVal === "boolean") newCell.t = "b";
            else newCell.t = "s";
          }
          console.log(`WROTE ${fieldName} -> ${colLetter(cResolved)}${rResolved + 1} =`, writeVal);
        } catch (e) {
          console.error("Write failed for", fieldName, "at", rResolved, cResolved, e);
          // fallback: write raw cell object
          const fallbackCellRef = `${colLetter(cZero)}${rowNum}`;
          sheet[fallbackCellRef] = { t: typeof writeVal === "number" ? "n" : "s", v: writeVal };
        }

        if (cZero > maxCol) maxCol = cZero;
        if (rowNum > maxRow) maxRow = rowNum;
      });
    });

    // update sheet range so Excel shows new cells
    expandSheetRange(sheet, minCol, minRow, Math.max(maxCol, minCol), Math.max(maxRow, minRow));
    console.log("Updated sheet !ref:", sheet["!ref"]);

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `Modified_${TEMPLATE_FILENAME}`);
    console.log("Excel exported successfully.");
  };

  if (loading) return <div>Loading API data...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  return <></>;
};

export default ExcelOverseas;