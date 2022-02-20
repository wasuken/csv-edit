import { useQuery } from "react-query";
import { useCSVContext } from "../context/csv";
import React, { useState, useRef } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Encoding from "encoding-japanese";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "60%",
  },
};

Modal.setAppElement("#edit-modal");

function CSVInput() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { csv, setcsv } = useCSVContext();
  const [uploading, setUploading] = useState(false);
  const [insPage, setInsPage] = useState(1);
  const inputRef = useRef();
  const total = Math.ceil(csv.length / 100);
  const [header, setHeader] = useState({});
  function handleChangeInputVal(h, e) {
    e.preventDefault();
    let hdv = { ...header };
    hdv[h] = e.target.value;
    setHeader(hdv);
  }
  function openModal() {
    if (csv.length > 0) {
      setIsOpen(true);
      let hd = {};
      csv[0].forEach((x) => (hd[x] = ""));
      setHeader(hd);
    }
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleClearBtn = () => {
    setcsv([]);
    document.querySelector("#csv-file").value = [];
  };
  const handleModalSubmit = () => {
    let csvv = [...csv];
    csvv.splice(insPage, 0, Object.values(header));
    setcsv(csvv);
    closeModal();
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
      <input
        id="csv-file"
        ref={inputRef}
        disabled={uploading}
        type="file"
        className="form-control w-50 m-2"
      />
      <CSVLink data={csv} className="btn btn-primary">
        Export
      </CSVLink>
      <button
        onClick={handleUploadCSV}
        disabled={uploading}
        className="btn btn-primary m-2"
      >
        {uploading ? "Uploading..." : "Open"}
      </button>
      <button onClick={() => handleClearBtn()} className="btn btn-primary m-2">
        Clear
      </button>
      <div className="m-2">
        <button onClick={() => openModal()} className="btn btn-primary m-2">
          Insert Row
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Modal"
      >
        <h2>Insert</h2>
        {modalIsOpen ? (
          <div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="input-page" className="col-form-label">
                  page
                </label>
              </div>
              <div className="col-auto">
                <select id="input-page" className="form-select w-25 m-2">
                  {[...Array(total)].map((_, i) => (
                    <option key={i} value={i}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {Object.keys(header).map((k, i) => (
              <div className="row g-3 align-items-center" key={i}>
                <div className="col-auto">
                  <label htmlFor={`input-${i}`} className="col-form-label">
                    {k}
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    htmlFor={`input-${i}`}
                    className="form-control"
                    num={i}
                    key={i}
                    value={header[k]}
                    onChange={(e) => handleChangeInputVal(k, e)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-primary me-1"
            onClick={() => handleModalSubmit()}
          >
            Submit
          </button>
          <button className="btn btn-secondary ml-1" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CSVInput;
