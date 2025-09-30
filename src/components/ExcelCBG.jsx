import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiClient from "../api/axiosClient";


const TEMPLATE_FILENAME = "CBG Company of the year 2025.xlsx";

const rowMapping = {
  organisationname: 2,
  Absolute_CapEx_2024:5,
  Absolute_CapEx_2023:6,
  Install_capacity_2024:14,
  Install_capacity_2023:15,
  Actual_prod_2024:24,
  Actual_prod_2023:25,
  Accident_2024:35,
  Total_hour:36,
  Lost_time_injuries_2024:40,
  Incident_2024:44,
  Patent_filed_2024:49,
  National_2024:54,
  International_2024:58,
  Commercial_2024:62, 
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

const ExcelCBG = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exported, setExported] = useState(false); // ensure single run

  
  useEffect(() => {
    (async () => {
      try {
        const resp = await apiClient.get("/vw-cbg-scores/");
        const results = (resp.data && (resp.data.results ?? resp.data)) || [];
        console.log("API results length:", results.length, "first:", results[0]);
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

  // main export logic extracted so we can call it from useEffect
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
    const magic = new Uint8Array(arrayBuffer.slice(0, 4));
    console.log("Template magic bytes:", magic, "->", String.fromCharCode(...magic));
    if (!String.fromCharCode(...magic).startsWith("PK")) {
      console.warn("Template does not look like xlsx (missing PK).");
    }

    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      throw new Error("Workbook contains no sheets.");
    }
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    console.log("Using sheet:", sheetName, "initial !ref:", sheet["!ref"]);

    // compute existing bounds
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

    // For each company (row of data), map fields to variables and write into column (G, H, I...)
    dataToWrite.forEach((company, idx) => {
      const colIndex = 4 + idx; 
      const col = colLetter(colIndex);
      console.log(`\n--- Writing company #${idx + 1} into column ${col} ---`);

 


      const organisationname = company.organisation_name;
      const Absolute_CapEx_2024 = company.retail_outlets_2024;
      const Absolute_CapEx_2023 = company.retail_outlets_2023;
      const Install_capacity_2024 = company.install_capacity_2024;
      const Install_capacity_2023 = company.install_capacity_2023;
      const Actual_prod_2024 = company.actual_prod_2024;
      const Actual_prod_2023 = company.actual_prod_2023;
      const Accident_2024 = company.accident_rate_2024;
      const Total_hour = company.totalhourworked2024;
      const Lost_time_injuries_2024 = company.lost_injury_rate_2024;
      const Incident_2024=  company.incident_rate_2024;
      const Patent_filed_2024=  company.patents_filed_2024;
      const National_2024=  company.patents_national_2024;
      const International_2024= company.patents_international_2024;
      const Commercial_2024=    company.patents_commercial_2024;
     


      const writes = [
        [rowMapping.organisationname, organisationname],
        [rowMapping.Absolute_CapEx_2024, Absolute_CapEx_2024],
        [rowMapping.Absolute_CapEx_2023, Absolute_CapEx_2023],
        [rowMapping.Install_capacity_2024, Install_capacity_2024],
        [rowMapping.Install_capacity_2023, Install_capacity_2023],
        [rowMapping.Actual_prod_2024, Actual_prod_2024],
        [rowMapping.Actual_prod_2023, Actual_prod_2023],
        [rowMapping.Accident_2024, Accident_2024],
        [rowMapping.Total_hour, Total_hour],
        [rowMapping.Lost_time_injuries_2024, Lost_time_injuries_2024],
        [rowMapping.Incident_2024, Incident_2024],
        [rowMapping.Capex_Other_2024, Capex_Other_2024],
        [rowMapping.National_2024, National_2024],
        [rowMapping.Patent_filed_2024, Patent_filed_2024],
        [rowMapping.International_2024, International_2024],
        [rowMapping.Commercial_2024, Commercial_2024],
      ];

      
      writes.forEach(([rowNum, value]) => {
        if (rowNum == null) return; // skip if mapping missing
        const cellRef = `${col}${rowNum}`;
        const pre = sheet[cellRef] ? sheet[cellRef].v : undefined;
        console.log(`pre ${cellRef} =`, pre);

        let writeVal = value;
        if (writeVal === undefined || writeVal === null) {
          writeVal = "";
        }

        try {
          XLSX.utils.sheet_add_aoa(sheet, [[writeVal]], { origin: cellRef });
          const newCell = sheet[cellRef];
          if (newCell) {
            if (typeof writeVal === "number") newCell.t = "n";
            else if (typeof writeVal === "boolean") newCell.t = "b";
            else newCell.t = "s";
          }
        } catch (e) {
          sheet[cellRef] = { t: typeof writeVal === "number" ? "n" : "s", v: writeVal };
        }

        const post = sheet[cellRef] ? sheet[cellRef].v : undefined;
        console.log(`post ${cellRef} =`, post);

        if (colIndex > maxCol) maxCol = colIndex;
        if (rowNum > maxRow) maxRow = rowNum;
      });
    });

    // update sheet range so Excel shows new cells
    expandSheetRange(sheet, minCol, minRow, Math.max(maxCol, minCol), Math.max(maxRow, minRow));
    console.log("Updated sheet !ref:", sheet["!ref"]);

    // write workbook and download
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `Modified_${TEMPLATE_FILENAME}`);
    console.log("Excel exported successfully.");
  };

  if (loading) return <div>Loading API data...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
   
    <></>
  );
};

export default ExcelCBG;