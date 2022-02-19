import { useQuery } from "react-query";
import { useCSVContext } from "../context/csv";
import "bootstrap/dist/css/bootstrap.min.css";

function CSVPaginate() {
  const { csv, page, setPage } = useCSVContext();
  const total = Math.ceil(csv.length / 100);
  return (
    <nav aria-label="Page navigation">
      <div className="m-2">
        rows: {csv.length}
      </div>
      <h4 className="m-2">
        {page+1}/{total}
      </h4>
      <div>
        <select className="form-select w-25 m-2" value={page} onChange={(e) => setPage(parseInt(e.target.value))}>
          {[...Array(total)].map((_, i) => (
            <option key={i} value={i}>{i+1}</option>
          ))}
        </select>
      </div>
      <ul className="pagination m-2">
        <li className="page-item">
          <button disabled={page <= 0} className="page-link" onClick={() => setPage(0)}>First</button>
        </li>
        <li className="page-item">
          <button className="page-link" disabled={page <= 0} onClick={() => setPage(page-1)}>Previous</button>
        </li>
        <li className="page-item">
          <button className="page-link" disabled={page>=(total-1)}onClick={() => setPage(page+1)}>Next</button>
        </li>
        <li className="page-item">
          <button className="page-link" disabled={page>=(total-1)} onClick={() => setPage(total-1)}>Last</button>
        </li>
      </ul>
    </nav>
  );
}

export default CSVPaginate;
