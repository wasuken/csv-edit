import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";

import CSVInput from "../components/CSVInput";
import CSVList from "../components/CSVList";
import CSVPaginate from "../components/CSVPaginate";
import CSVSearch from "../components/CSVSearch";

import { useCSVContext } from "../context/csv";
import Header from "../components/Header.jsx";
import Modal from "react-modal";

Modal.setAppElement("#edit-modal");

export default function Home() {
  const { csv, setcsv } = useCSVContext();
  return (
    <div className={styles.container}>
      <Header />
      <div className="m-2"></div>
      <div id="edit-modal"></div>
      <CSVInput />
      {csv.data.length > 0 ? <CSVSearch /> : ""}
      {csv.data.length > 0 ? <CSVPaginate /> : ""}

      <CSVList />
    </div>
  );
}
