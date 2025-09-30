import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Sptable = () => {
  const tableHeading = [
    "Sr. No.",
    "Evaluation Parameters (Only for India's Oil & Gas Sector)",
    "Marks",
    "Sub KPI Score",
    "Eval. Method.",
    "Unit of Eval",
    "Minimum",
    "Maximum",
    
  ];
  const rows = [];
  const exportToExcel = () => {
    const table = document.querySelector("table");
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "FIPI_Awards_2025.xlsx");
  };
  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={exportToExcel}
        style={{
          padding: "10px",
          backgroundColor: "green",
          color: "white",
          marginBottom: "20px",
          position:"fixed",
          left:"30px"
        }}
      > Export to Excel</button>

      <h2 style={{  display:"flex", justifyContent:"center", font:"" }}>
        FIPI Awards 2025 - Service Provider Company of the Year
      </h2>

      <table
        border="1"
        cellPadding="5"
        style={{
          borderCollapse: "collapse",
          textAlign: "center",
          margin: "0 auto",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
          {tableHeading.map((item, index) => {
            return <th key={index}>{item}</th>
          })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>Project Evaluation Technical Capability</th>
            <th>20</th>
            <td>20</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1.1</td>
            <td>No of Project in 2024-25</td>
            <td></td>
            <td>10</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1.2</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score</td>
            <td>Number</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>1.3</td>
            <td>Growth in terms of no of project</td>
            <td></td>
            <td>10</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1.4</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score </td>
            <td>%</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1.5</td>
            <td>No of Projects awarded in 2024-25 </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1.6</td>
            <td>No of Projects awarded in 2023-24</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>2</th>
            <th>Project Execution Financial Capabilty </th>
            <th>20</th>
            <td>20</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2.1</td>
            <td> Total value of Projects in Progress(INR Crore) </td>
            <td></td>
            <td>10</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2.2</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score</td>
            <td>Number</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>2.3</td>
            <td>Growth in terms of no of projects</td>
            <td></td>
            <td>10</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2.4</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score </td>
            <td>%</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td> 2.5</td>
            <td> No of Projects awarded in 2024-25(INR Crore) </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td> 2.6</td>
            <td>No of Projects awarded in 2023-24(INR Crore)</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>3</th>
            <th> Introduction of new Technology </th>
            <th>25</th>
            <td>25</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3.1</td>
            <td> Efficiency in terms of time overrun </td>
            <td></td>
            <td>10</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3.2</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score</td>
            <td>%</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3.3</td>
            <td>Efficiency in terms of cost overrun</td>
            <td></td>
            <td>10</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3.4</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score </td>
            <td>%</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3.5 </td>
            <td> No of Projects Completed in 2024-25 </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3.6 </td>
            <td> No of Projects Completed in 2024-25 without time overrun </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3.7 </td>
            <td>No of Projects Completed in 2024-25 without Cost overrun </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>4</th>
            <th>Project Execution Efficiency </th>
            <th>25</th>
            <td>25</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4.1</td>
            <td> Number of new technologies introduced </td>
            <td></td>
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4.2</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score</td>
            <td>Number</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>4.2</td>
            <td> Value of new technologies introduced(INR Crore)</td>
            <td></td>
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4.3</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score </td>
            <td>Number</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td> 4.4</td>
            <td> Assesment by Award Committie </td>
            <td></td>
            <td>15</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>5</th>
            <th> Safety </th>
            <th>15</th>
            <td>15</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5.1</td>
            <td> Fatal Accident Rate </td>
            <td></td>
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5.2</td>
            <td> Lost Time Injury Frequency </td>
            <td></td>
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5.3</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score</td>
            <td>Number</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>5.4</td>
            <td> Value of new technologies introduced(INR Crore)</td>
            <td></td>
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5.5</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Highest gets max score </td>
            <td>Number</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <th>6</th>
            <th>Grand Total </th>
            <th>100</th>
            <th>100</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Sptable;
