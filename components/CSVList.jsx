import { useQuery } from "react-query";
import { useCSVContext } from "../context/csv";
import React, { useState, useRef } from "react";
import Papa from "papaparse";
import Modal from 'react-modal';
import "bootstrap/dist/css/bootstrap.min.css";

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		height: '60%',
	},
};

Modal.setAppElement('#edit-modal');

function CSVList() {
	const [modalIsOpen, setIsOpen] = useState(-1);
	const [editRow, setEditRow] = useState([]);

	function openModal(i){
		setIsOpen(i);
		setEditRow([...csv[i]]);
	}
	function handleEditRowItem(v, i){
		let newrow = [...editRow];
		newrow[i] = v;
		setEditRow([...newrow]);
	}
	function closeModal() {
		setIsOpen(-1);
		setEditRow([]);
	}
	function handleModalSubmit(){
		// 更新処理
		const editingInputs = document.querySelectorAll('.editing');
		let newcsv = [...csv];
		let ary = [];
		editingInputs.forEach((x) => {
			const i = parseInt(x.getAttribute('num'));
			ary[i] = x.value;
		})
		console.log(ary);
		newcsv[modalIsOpen] = ary;
		setcsv(newcsv);
		closeModal();
	}
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
						<tr key={i} onDoubleClick={(e) => openModal((page*100)+i+1) }>
							{row.map((v, j) => (
								<td className="text-break" key={j}>{v}</td>
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
				{
					(modalIsOpen >= 0)?
						(<div>
							 {editRow.map((v, i) => (
								 <div className="row g-3 align-items-center" key={i}>
									 <div className="col-auto">
										 <label htmlFor={`edit-input-${i}`} className="col-form-label">{csv[0][i]}</label>
									 </div>
									 <div className="col-auto">
										 <input type="text" htmlFor={`edit-input-${i}`} className="form-control editing" num={i} key={i} value={v} onChange={(e) => handleEditRowItem(e.target.value, i)}/>
									 </div>
								 </div>
							 ))}
						 </div>)
						:
						""
				}
				<div className="d-flex justify-content-between mt-3">
					<button className="btn btn-primary me-1" onClick={() => handleModalSubmit()}>Submit</button>
					<button className="btn btn-secondary ml-1" onClick={closeModal}>Cancel</button>
				</div>

			</Modal>
		</div>
	);
}

export default CSVList;
