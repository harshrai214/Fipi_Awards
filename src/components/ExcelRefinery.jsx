import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiClient from "../api/axiosClient";


const TEMPLATE_FILENAME = "Refinery of the Year_Award2025.xlsx";

const rowMapping = {
    organisationname: 3,
    name_plate_capacity_2024:7,
    actual_throughput_2024:8,
    actual_throughput_2023:9,
    actual_throughput_2022:10,
    actual_throughput_2021:11,
    actual_throughput_2024:14,
    actual_throughput_2023:15,

    cracking_name_plate_2024:18,
    cracking_capacity_2024:19,
    cracking_capacity_2023:20,
    cracking_capacity_2022:21,
    cracking_capacity_2021:22,

    cracking_capacity_2024:25,
    cracking_capacity_2023:26,

    distillates_2024:29,
    distillates_2023:30,
    grm_2024:46,
    operation_cost_2024:37,
    operation_cost_2023:38,
    operation_cost_2022:39,
    operation_cost_2021:40,
    internal_fuel_2024:41,
    loss_crude_2024:43,
    mbn_2024:46,
    mbn_2024:50,
    mbn_2023:51,
    mbn_2022:52,
    mbn_2021:53,
    actual_2024:57,
    planned_2024:58,


    fresh_water_2024:63,
    nrgf_2024:64,
    
    // refinery_throughput:, from where in the form 

    fresh_water_2023:67,
    nrgf_2023:68,

    // refinery_throughput:,

    carbon_emission_2024:71,
    carbon_emission_2024:75,
    carbon_emission_2023:76,

    no_fatalities:79,
    total_hour_worked:80,
    no_lost_time_injuries:83,
    total_hour_worked:84,
    no_incident:87,
    total_hour_worked:88,

};

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

const ExcelRefinery = () => {
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
            const colIndex = 6 + idx;
            const col = colLetter(colIndex);
            console.log(`\n--- Writing company #${idx + 1} into column ${col} ---`);


            const organisationname = company.organisation_name;
            const name_plate_capacity_2024 = company.name_plate_capacity_2024;
            const actual_throughput_2024 = company.actual_crude_2024;
            const actual_throughput_2023 = company.actual_crude_2023;
            const actual_throughput_2022 = company.actual_crude_2022;
            const actual_throughput_2021 = company.actual_crude_2021;
            const cracking_name_plate_2024 = company.cracking_name_plate_2024;
            const cracking_capacity_2024 = company.cracking_actual_crude_2024;
            const cracking_capacity_2023 = company.cracking_actual_crude_2023;
            const cracking_capacity_2022 = company.cracking_actual_crude_2022;
            const cracking_capacity_2021 = company.cracking_actual_crude_2021;
            const distillates_2024 = company.cracking_yield_distillates_2024;
            const distillates_2023 = company.cracking_yield_distillates_2023;
            const grm_2024 = company.cracking_grm_2024;
            const operation_cost_2024 = company.operating_cost_2024;
            const operation_cost_2023 = company.operating_cost_2023;
            const operation_cost_2022 = company.operating_cost_2022;
            const operation_cost_2021 = company.operating_cost_2021;
            const internal_fuel_2024 = company.Operating_Fuel_consumption_2024;
            const loss_crude_2024 = company.Loss_crude_percent_2024;
            const mbn_2024 = company.MBN_CHT_methodology_2024;
            const mbn_2023 = company.MBN_CHT_methodology_2023;
            const mbn_2022 = company.MBN_CHT_methodology_2022;
            const mbn_2021 = company.MBN_CHT_methodology_2021;
            const actual_2024 = company.Capital_Actual_Capex_2024;
            const planned_2024 = company.Capital_Planned_Capex_2024;
            const fresh_water_2024 = company.Specific_Fresh_water_2024;
            const fresh_water_2023 = company.Specific_Fresh_water_2023;
            const nrgf_2024 = company.Specific_NRG_factor_2024;
            const nrgf_2023 = company.Specific_NRG_factor_2023;
            const carbon_emission_2024 = company.Specific_Carbon_Emission_2024;
            const carbon_emission_2023 = company.Specific_Carbon_Emission_2023;
            const no_fatalities = company.safety_Number_of_fatalities;
            const total_hour_worked = company.Total_Manhours_Own_Employees;
            const no_lost_time_injuries = company.safety_Number_of_lost_time_injuries;
            const no_incident = company.safety_Number_of_OSHA_recordable_incidents;


            const writes = [
                [rowMapping.organisationname, organisationname],
                [rowMapping.name_plate_capacity_2024, name_plate_capacity_2024],
                [rowMapping.actual_throughput_2024, actual_throughput_2024],
                [rowMapping.actual_throughput_2023, actual_throughput_2023],
                [rowMapping.actual_throughput_2022, actual_throughput_2022],
                [rowMapping.actual_throughput_2021, actual_throughput_2021],
                [rowMapping.cracking_name_plate_2024, cracking_name_plate_2024],
                [rowMapping.cracking_capacity_2024, cracking_capacity_2024],
                [rowMapping.cracking_capacity_2023, cracking_capacity_2023],
                [rowMapping.cracking_capacity_2022, cracking_capacity_2022],
                [rowMapping.cracking_capacity_2021, cracking_capacity_2021],
                [rowMapping.distillates_2024, distillates_2024],
                [rowMapping.distillates_2023, distillates_2023],
                [rowMapping.grm_2024, grm_2024],
                [rowMapping.operation_cost_2024, operation_cost_2024],
                [rowMapping.operation_cost_2023, operation_cost_2023],
                [rowMapping.operation_cost_2022, operation_cost_2022],
                [rowMapping.operation_cost_2021, operation_cost_2021],
                [rowMapping.internal_fuel_2024, internal_fuel_2024],
                [rowMapping.loss_crude_2024, loss_crude_2024],
                [rowMapping.mbn_2024, mbn_2024],
                [rowMapping.mbn_2023, mbn_2023],
                [rowMapping.mbn_2022, mbn_2022],
                [rowMapping.mbn_2021, mbn_2021],
                [rowMapping.actual_2024, actual_2024],
                [rowMapping.planned_2024, planned_2024],
                [rowMapping.fresh_water_2024, fresh_water_2024],
                [rowMapping.fresh_water_2023, fresh_water_2023],
                [rowMapping.nrgf_2024, nrgf_2024],
                [rowMapping.nrgf_2023, nrgf_2023],
                [rowMapping.carbon_emission_2024, carbon_emission_2024],
                [rowMapping.carbon_emission_2023, carbon_emission_2023],
                [rowMapping.no_fatalities, no_fatalities],
                [rowMapping.total_hour_worked, total_hour_worked],
                [rowMapping.no_lost_time_injuries, no_lost_time_injuries],
                [rowMapping.no_incident, no_incident],
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

export default ExcelRefinery;