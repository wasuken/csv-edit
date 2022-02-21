import { createContext, useState, useContext } from "react";

const CSVContext = createContext();

export function useCSVContext() {
  return useContext(CSVContext);
}

export const initCsv = {
  data: [],
  f: (v) => v,
};

export function CSVProvider({ children }) {
  const [csv, setcsv] = useState(initCsv);
  const [page, setPage] = useState(0);

  const value = {
    csv,
    setcsv,
    page,
    setPage,
  };

  return <CSVContext.Provider value={value}>{children}</CSVContext.Provider>;
}
