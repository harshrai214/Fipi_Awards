import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiClient from "../api/axiosClient";


const TEMPLATE_FILENAME = "Oil & Gas Production Company of the year Award_2025.xlsx";

const rowMapping = {
    organisationname: 6,
    oil_production_2024: 10,
    oil_production_2023: 11,
    gas_production_2024: 14,
    gas_production_2023: 15,
    production_cost_2024: 19,
    production_cost_2023: 20,
    capex_2024: 24,
    capex_2023: 25,

    total_energy_production:29,
    total_energy_company:30,
    total_capex:31,
    total_opex:32,
    capex_production:33,
    opex_production:34,
    total_carbon:36,
    // specific_energy_consumption: 27,
    // specific_carbon_footprint: 28,

    accident_rate_2024: 39,
    lost_time_injuries_2024: 41,
    incident_rate_2024: 43,
    total_manhours_own:44,
    total_manhours_contract:45,




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

const ExcelProdless = () => {
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
            const colIndex = 9 + idx;
            const col = colLetter(colIndex);
            console.log(`\n--- Writing company #${idx + 1} into column ${col} ---`);


            const organisationname = company.organisation_name;
            const oil_production_2024 = company.total_oil_2024;
            const oil_production_2023 = company.total_oil_2023;
            const gas_production_2024 = company.total_gas_2024;
            const gas_production_2023 = company.total_gas_2023;
            const production_cost_2024 = company.cost_per_boe_2024;
            const production_cost_2023 = company.cost_per_boe_2023;
            const capex_2024 = company.ior_eor_capex_2024;
            const capex_2023 = company.ior_eor_capex_2023;
            const specific_energy_consumption = company.organisation_name;
            const specific_carbon_footprint = company.organisation_name;
            const accident_rate_2024 = company.fatalities_2024;
            const lost_time_injuries_2024 = company.lost_time_injuries_2024;
            const incident_rate_2024 = company.osha_incidents_2024;
           
           
            const total_manhours_own = company.own_man_hours_2024;
            const total_manhours_contract = company.contract_man_hours_2024;
            const total_capex = company.total_capex_2024;
            const total_opex = company.total_opex_2024;
            const total_carbon = company.co2_emission_2024;

            const opex_production = company.production_opex_2024;
            const capex_production = company.production_capex_2024;
            const total_energy_company = company.company_energy_2024;
            const total_energy_production = company.osha_incidents_2024;




            const writes = [
                [rowMapping.organisationname, organisationname],
                [rowMapping.oil_production_2024, oil_production_2024],
                [rowMapping.oil_production_2023, oil_production_2023],
                [rowMapping.gas_production_2024, gas_production_2024],
                [rowMapping.gas_production_2023, gas_production_2023],
                [rowMapping.production_cost_2024, production_cost_2024],
                [rowMapping.production_cost_2023, production_cost_2023],
                [rowMapping.capex_2024, capex_2024],
                [rowMapping.capex_2023, capex_2023],
                [rowMapping.specific_energy_consumption, specific_energy_consumption],
                [rowMapping.specific_carbon_footprint, specific_carbon_footprint],
                [rowMapping.accident_rate_2024, accident_rate_2024],
                [rowMapping.lost_time_injuries_2024, lost_time_injuries_2024],
                [rowMapping.incident_rate_2024, incident_rate_2024],
                [rowMapping.total_energy_production, total_energy_production],
                [rowMapping.total_energy_company, total_energy_company],
                [rowMapping.total_capex, total_capex],
                [rowMapping.total_opex, total_opex],
                [rowMapping.capex_production, capex_production],
                [rowMapping.opex_production, opex_production],
                [rowMapping.total_carbon, total_carbon],
                [rowMapping.total_manhours_contract, total_manhours_contract],
                [rowMapping.total_manhours_own, total_manhours_own],

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

export default ExcelProdless;