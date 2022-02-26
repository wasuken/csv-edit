import { useQuery } from "react-query";
import { useCSVContext } from "../context/csv";

function CSVPaginate() {
  const { csv, page, setPage } = useCSVContext();
  const total = Math.ceil(csv.data.length / 100);
  return (
    <nav aria-label="Page navigation">
      <div className="m-2">rows: {csv.data.length}</div>
      <div className="d-flex">
        <select
          className="form-select w-25"
          value={page}
          onChange={(e) => setPage(parseInt(e.target.value))}
        >
          {[...Array(total)].map((_, i) => (
            <option key={i} value={i}>
              {i + 1}
            </option>
          ))}
        </select>

        <div
          style={{
            height: "200%",
            fontSize: "1rem",
            fontWeight: "400",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
          }}
        >
          /{total}
        </div>
      </div>
      <div></div>
      <ul className="pagination mt-2">
        <li className="page-item">
          <button
            disabled={page <= 0}
            className="page-link"
            onClick={() => setPage(0)}
          >
            First
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            disabled={page <= 0}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            disabled={page >= total - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            disabled={page >= total - 1}
            onClick={() => setPage(total - 1)}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default CSVPaginate;
