import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import apiClient from "../api/axiosClient";


const TEMPLATE_FILENAME = "Digital Technology Provider of the Year Award_2025.xlsx";

const rowMapping = {
    organisationname: 6,
    
    growth_revenue_2024: 9,
    growth_revenue_2023: 10,
    
    total_revenue_2024: 11,
   
    revenue_A:14,
    revenue_B:15,
    revenue_C:16,
   
    year_commencement_A:19,
    no_customer_A:21,
    year_commencement_B:23,
    no_customer_B:25,
    year_commencement_C:27,
    no_customer_C:29,
   
    Investment_A:33,
    Investment_B:34,
    Investment_C:35,
    
    Patents_A:37,
    Patents_B:38,
    Patents_C:39,

    Investment_RD_2024:41,
    Revenue_RD_2024:42,
    growth_2024: 46,
    growth_2023: 47,
    
    no_customers_2024:48,
    percentage_revenue:49,


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

const ExcelDigital = () => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exported, setExported] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const resp = await apiClient.get("/vw-digital-submitted/");
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
            const growth_revenue_2024 = company.total_revenue_digital_2425;
            const growth_revenue_2023 = company.total_revenue_digital_2324;
            const total_revenue_2024 = company.total_revenue_digital_2425;
            const revenue_A = company.projectA_revenue;
            const revenue_B = company.projectB_customers;
            const revenue_C = company.projectC_customers;
            const year_commencement_A = company.projectA_year;
            const year_commencement_B = company.projectB_year;
            const year_commencement_C = company.projectC_year;
            const no_customer_A = company.projectA_customers;
            const no_customer_B = company.projectB_customers;
            const no_customer_C = company.projectC_customers;
            const Investment_A = company.techA_investment;
            const Investment_B = company.techB_investment;
            const Investment_C = company.techC_investment;
            const Patents_A = company.techA_patents;
            const Patents_B = company.techB_patents;
            const Patents_C = company.techC_patents;
            const Investment_RD_2024 = company.total_rnd_investment_2425;
            const Revenue_RD_2024 = company.total_revenue_company_2425;
            const growth_2024 = company.customers_2425;
            const growth_2023 = company.customers_2324;
            const no_customers_2024 = company.customers_2425;
            const percentage_revenue = company.revenue_percent_digital_2425;


            const writes = [
                [rowMapping.organisationname, organisationname],
                [rowMapping.growth_revenue_2024, growth_revenue_2024],
                [rowMapping.growth_revenue_2023, growth_revenue_2023],
                [rowMapping.total_revenue_2024, total_revenue_2024],
                [rowMapping.revenue_A, revenue_A],
                [rowMapping.revenue_B, revenue_B],
                [rowMapping.revenue_C, revenue_C],
                [rowMapping.no_customer_A, no_customer_A],
                [rowMapping.no_customer_B, no_customer_B],
                [rowMapping.no_customer_C, no_customer_C],
                [rowMapping.year_commencement_A, year_commencement_A],
                [rowMapping.year_commencement_B, year_commencement_B],
                [rowMapping.year_commencement_C, year_commencement_C],
                [rowMapping.Investment_A, Investment_A],
                [rowMapping.Investment_B, Investment_B],
                [rowMapping.Investment_C, Investment_C],
                [rowMapping.Patents_A, Patents_A],
                [rowMapping.Patents_B, Patents_B],
                [rowMapping.Patents_C, Patents_C],
                [rowMapping.Investment_RD_2024, Investment_RD_2024],
                [rowMapping.Revenue_RD_2024, Revenue_RD_2024],
                [rowMapping.growth_2024, growth_2024],
                [rowMapping.growth_2023, growth_2023],
                [rowMapping.no_customers_2024, no_customers_2024],
                [rowMapping.percentage_revenue, percentage_revenue],
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

export default ExcelDigital;