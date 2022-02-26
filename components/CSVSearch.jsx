import { useQuery } from "react-query";
import { useCSVContext } from "../context/csv";
import React, { useState, useRef } from "react";
import { CSVLink, CSVDownload } from "react-csv";

function CSVSearch() {
  const { csv, setcsv } = useCSVContext();
  const [query, setQuery] = useState("");

  function handleQuery(e) {
    const v = e.target.value.trim();
    setQuery(v);
  }
  function handleSearch() {
    let csvv = { ...csv };
    let data = csvv.data;
    const header = [...csv.data[0]];

    const d = data.slice(1).filter((x) => ~x.join("").indexOf(query));
    csvv.data = [header, ...d];
    setcsv(csvv);
  }

  return (
    <div className="d-flex">
      <input
        className="form-control w-25"
        type="text"
        placeholder="input search query"
        value={query}
        onChange={handleQuery}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default CSVSearch;
