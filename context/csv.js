import { createContext, useState, useContext } from "react";

const CSVContext = createContext();

export function useCSVContext() {
  return useContext(CSVContext);
}

export const initCsv = {
  data: [],
};

export const initSortInfoState = {
  key: "",
  isSort: false,
  order: true,
};

const initHistory = {
  list: [],
  sort: {}, // sortInfo
}

export function CSVProvider({ children }) {
  const [csv, setcsv] = useState(initCsv);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);

  const setHistCsv = (csvv, info = null) => {
	if(!info || (history.length <= 0)) {
	  info = {...initSortInfoState};
	}
    const v = csvv.data;
    setcsv(csvv);
    let hist = [];
	let h = {list: v, sort: info}
    if (history.length >= 5) {
      hist = [...history.slice(1), h];
    } else {
      hist = [...history, h];
    }
    setHistory(hist);
  };
  const rollbackHistCsv = () => {
    if (history.length <= 0) return;

    let hist = [...history];
    const v = hist.pop();
	setHistory(hist);

    let csvv = { ...initCsv };
    // csvv.data = (hist.slice(-1)[0] ?? []).list ?? [];
	csvv.data = [];
	const h = history.slice(-1)[0];
    if (h && h.sort) {
      csvv.data = h.list;
    }
    setcsv(csvv);
  };
  const setSort = (info) => {
    let csvv = { ...csv };
    let header = [...csvv.data[0]];
    let data = [...csvv.data.slice(1)];
    let ii = -1;
    header.forEach((v, i) => {
      if (v === info.key) {
        ii = i;
      }
    });
    data.sort((a, b) => {
      let ai = parseInt(a[ii]);
      let bi = parseInt(b[ii]);
      if (!ai) {
        ai = a[ii];
        bi = b[ii];
      }
      if (ai > bi) {
        return info.order ? -1 : 1;
      } else if (ai < bi) {
        return info.order ? 1 : -1;
      } else {
        return 0;
      }
    });
    data = [header, ...data];
    csvv.data = data;

    setHistCsv({ ...csvv }, info);
  };

  const value = {
    csv,
    setcsv: setHistCsv,
    history,
    page,
    setPage,
    rollbackHistCsv,
	setSort,
  };

  return <CSVContext.Provider value={value}>{children}</CSVContext.Provider>;
}
