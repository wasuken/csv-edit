import { useQuery } from "react-query";
import { useCSVContext } from "../context/csv";
import React, { useState, useRef } from "react";
import Papa from "papaparse";
import "bootstrap/dist/css/bootstrap.min.css";

function CSVList(props) {
  const { csv, setcsv, page } = useCSVContext();
  if (csv.length <= 0) return <p>empty.</p>;
  return (
    <div className="" style={{width: "3000px"}}>
      <table className="table table-dark align-middle table-hover" style={{maxWidth: "100%"}}>
        <thead>
          <tr>
            {csv[0].map((h, i) => (
              <th scope="col w-25" key={i}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csv.slice((page*100)+1, (page*100)+101).map((row, i) => (
            <tr key={i}>
              {row.map((v, j) => (
                <td className="text-break" key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CSVList;
