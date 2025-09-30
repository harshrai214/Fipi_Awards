import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiClient from "../api/axiosClient";


const TEMPLATE_FILENAME = "Green Hydrogen Company of the Year Award_2025.xlsx";

const rowMapping = {
    organisationname: 5,
    installed_capacity: 8,
    production_GH: 10,
    carbon_emitted: 12,
    cost_production: 16,

    investment_GH: 19,
    growth_2024: 22,
    growth_2023: 23,

    investment_electrolyser: 26,
    growth_electrolyser: 28,

    patent_filed:31,
    patent_national:33,
    patent_international:35,
    patent_commercialized:37,



    capacity_1:42,
    completion_1:43,
    marks_1:45,

    capacity_2:48,
    completion_2:49,
    marks_2:51,

    capacity_3:54,
    completion_3:55,
    marks_3:57,

    capacity_4:60,
    completion_4:61,
    marks_4:63,

    capacity_5:66,
    completion_5:67,
    marks_5:69,

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

const ExcelGH = () => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exported, setExported] = useState(false); // ensure single run


    useEffect(() => {
        (async () => {
            try {
                const resp = await apiClient.get("/vw-productionless-submitted/");
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

        dataToWrite.forEach((company, idx) => {
            const colIndex = 9 + idx;
            const col = colLetter(colIndex);
            console.log(`\n--- Writing company #${idx + 1} into column ${col} ---`);


            const organisationname = company.organisation_name;
            const installed_capacity = company.installed_capacity_2024;
            const production_GH = company.production_2024;
            const carbon_emitted = company.carbon_emission_2024;
            const cost_production = company.cost_of_production_2024;
            const investment_GH = company.total_gas_2023;
            const growth_2024 = company.cost_per_boe_2024;
            const growth_2023 = company.cost_per_boe_2023;
            const investment_electrolyser = company.ior_eor_capex_2024;
            const growth_electrolyser = company.ior_eor_capex_2023;
            const patent_filed = company.patents_filed_2024;
            const patent_national = company.patents_granted_national_2024;
            const patent_international = company.patents_granted_international_2024;
            const patent_commercialized = company.patents_commercialized_2024;
           
            const capacity_1 = company.capacity_1;
            const completion_1 = company.project_completion_year_1;
            const marks_1 = company.contract_man_hours_2024;
           
            const capacity_2 = company.total_capex_2024;
            const completion_2 = company.total_opex_2024;
            const marks_2 = company.co2_emission_2024;

            const capacity_3 = company.production_opex_2024;
            const completion_3 = company.production_capex_2024;
            const marks_3 = company.company_energy_2024;
            const capacity_4 = company.production_opex_2024;
            const completion_4 = company.production_capex_2024;
            const marks_4 = company.company_energy_2024;
            const capacity_5 = company.production_opex_2024;
            const completion_5 = company.production_capex_2024;
            const marks_5 = company.company_energy_2024;

            

            const writes = [
                [rowMapping.organisationname, organisationname],
                [rowMapping.installed_capacity, installed_capacity],
                [rowMapping.production_GH, production_GH],
                [rowMapping.carbon_emitted, carbon_emitted],
                [rowMapping.cost_production, cost_production],
                [rowMapping.investment_GH, investment_GH],
                [rowMapping.growth_2024, growth_2024],
                [rowMapping.growth_2023, growth_2023],
                [rowMapping.investment_electrolyser, investment_electrolyser],
                [rowMapping.growth_electrolyser, growth_electrolyser],
                [rowMapping.patent_filed, patent_filed],
                [rowMapping.patent_national, patent_national],
                [rowMapping.patent_international, patent_international],
                [rowMapping.patent_commercialized, patent_commercialized],
                [rowMapping.capacity_1, capacity_1],
                [rowMapping.completion_1, completion_1],
                [rowMapping.marks_1, marks_1],
                [rowMapping.capacity_2, capacity_2],
                [rowMapping.completion_2, completion_2],
                [rowMapping.marks_2, marks_2],
                [rowMapping.capacity_3, capacity_3],
                [rowMapping.completion_3, completion_3],
                [rowMapping.marks_3, marks_3],
                [rowMapping.capacity_4, capacity_4],
                [rowMapping.completion_4, completion_4],
                [rowMapping.marks_4, marks_4],
                [rowMapping.capacity_5, capacity_5],
                [rowMapping.completion_5, completion_5],
                [rowMapping.marks_5, marks_5],             
            ];


            writes.forEach(([rowNum, value]) => {
                if (rowNum == null) return; 
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

export default ExcelGH;