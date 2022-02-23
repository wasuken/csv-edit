import { useQuery } from "react-query";
import { useCSVContext } from "../context/csv";
import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "../styles/CSVList.module.css";

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

const initSortInfoState = {
  key: "",
  isSort: false,
  order: true,
};

function CSVList() {
  const [modalIsOpen, setIsOpen] = useState(-1);
  const [editRow, setEditRow] = useState([]);
  const [sortInfo, setSortInfo] = useState(initSortInfoState);
  const { csv, setcsv, page } = useCSVContext();

  useEffect(() => {
    if (csv.data.length > 0) {
      let csvv = { ...csv };
      let header = [...csvv.data[0]];
      let data = [...csvv.data.slice(1)];
      let ii = -1;
      header.forEach((v, i) => {
        if (v === sortInfo.key) {
          ii = i;
        }
      });
      data.sort((a, b) => {
		let ai = parseInt(a[ii]);
		let bi = parseInt(b[ii]);
		if(!ai){
		  ai = a[ii];
		  bi = b[ii];
		}
        if (ai > bi) {
          return sortInfo.order ? -1 : 1;
        } else if (ai < bi) {
          return sortInfo.order ? 1 : -1;
        } else {
          return 0;
        }
      });
      data = [header, ...data];
      csvv.data = data;

      setcsv({ ...csvv });
    }
  }, [sortInfo]);

  function updateSortInfo(k) {
    let info = { ...sortInfo };
    if (info.isSort) {
      // すでにソート済の処理
      if (info.key === k) {
        // 切り替え
        info.order = !info.order;
      } else {
        // key変更
        info.key = k;
      }
    } else {
      // 未設定
      info.isSort = true;
      info.key = k;
    }

    setSortInfo(info);
  }

  function openModal(i) {
    setIsOpen(i);
    setEditRow([...csv.data[i]]);
  }
  function handleEditRowItem(i, e) {
    const v = e.target.value;
    let newrow = [...editRow];
    newrow[i] = v;
    setEditRow([...newrow]);
  }
  function closeModal() {
    setIsOpen(-1);
    setEditRow([]);
  }
  function handleModalSubmit() {
    // 更新処理
    const editingInputs = document.querySelectorAll(".editing");
    let newcsv = { ...csv };
    let ary = [];
    editingInputs.forEach((x) => {
      const i = parseInt(x.getAttribute("num"));
      ary[i] = x.value;
    });
    newcsv.data[modalIsOpen] = ary;
    setcsv(newcsv);
    closeModal();
  }
  function handleDelete() {
    let newcsv = { ...csv };
    newcsv.data.splice(modalIsOpen, 1);
    setcsv(newcsv);
    closeModal();
  }
  if (csv.data.length <= 0) return <p>empty.</p>;
  return (
    <div className="" style={{whiteSpace: "nowrap"}}>
      <table
        className="table table-dark align-middle table-hover"

      >
        <thead>
          <tr>
            {(csv.data[0] ?? []).map((h, i) => (
              <th
                scope="col w-25 ptr"
                key={i}
                onClick={() => updateSortInfo(h)}
              >
                <div className={styles.ptr}>
                  {h}
                  {sortInfo.isSort && sortInfo.key === h
                  ? sortInfo.order
                  ? "↑"
                  : "↓"
                  : ""}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csv.data.slice(page * 100 + 1, page * 100 + 101).map((row, i) => (
            <tr key={i} onDoubleClick={(e) => openModal(page * 100 + i + 1)}>
              {row.map((v, j) => (
                <td className="text-break" key={j}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen >= 0}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Modal"
      >
        <h2>Edit</h2>
        {modalIsOpen >= 0 ? (
          <div>
            {csv.data[modalIsOpen].map((v, i) => (
              <div className="row g-3 align-items-center" key={i}>
                <div className="col-auto">
                  <label htmlFor={`edit-input-${i}`} className="col-form-label">
                    {csv.data[0][i]}
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    htmlFor={`edit-input-${i}`}
                    className="form-control editing"
                    num={i}
                    key={i}
                    defaultValue={v}
                    onChange={(e) => handleEditRowItem(i, e)}
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
          <button className="btn btn-danger ml-1" onClick={handleDelete}>
            Remove
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CSVList;
