import { useQuery } from "react-query";
import { useCSVContext } from "../context/csv";
import React, { useState, useRef } from "react";
import Papa from "papaparse";
import "bootstrap/dist/css/bootstrap.min.css";
import Encoding from "encoding-japanese";

function CSVInput() {
  const { csv, setcsv } = useCSVContext();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();
  const handleClearBtn = () => {
    setcsv([]);
    document.querySelector('#csv-file')?.value = [];
  };
  const handleUploadCSV = () => {
    const input = inputRef?.current;
    const reader = new FileReader();

    if (input.files.length <= 0) return;

    const [file] = input.files;

    setUploading(true);

    reader.onloadend = ({ target }) => {
      const detected = Encoding.detect(target.result);
      const { data, errors, meta } = Papa.parse(target.result, {
        header: false,
        encoding: detected,
      });

      setcsv(data);
      setUploading(false);
    };
    reader.readAsText(file);
  };
  return (
    <div>
      <div className="mb-4">
        <input
          id="csv-file"
          ref={inputRef}
          disabled={uploading}
          type="file"
          className="form-control"
        />
      </div>
      <button
        onClick={handleUploadCSV}
        disabled={uploading}
        className="btn btn-primary m-2"
      >
        {uploading ? "Uploading..." : "Open"}
      </button>
      <button onClick={() => handleClearBtn()} className="btn btn-primary m-2">
        clear
      </button>
    </div>
  );
}

export default CSVInput;
