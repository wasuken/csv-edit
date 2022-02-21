import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import CSVInput from "../components/CSVInput";
import CSVList from "../components/CSVList";
import CSVPaginate from "../components/CSVPaginate";
import CSVSearch from "../components/CSVSearch";

import { useCSVContext } from "../context/csv";

export default function Home() {
  const { csv, setcsv } = useCSVContext();
  return (
    <div className={styles.container}>
      <CSVInput />
      {csv.data.length > 0 ? <CSVSearch /> : ""}
      {csv.data.length > 0 ? <CSVPaginate /> : ""}

      <CSVList />
      <div id="edit-modal"></div>
    </div>
  );
}
