import "../styles/globals.css";
import React from "react";
import { CSVProvider } from '../context/csv';

export default function MyApp({ Component, pageProps }) {
  return (
    <CSVProvider>
      <Component {...pageProps} />
    </CSVProvider>
  );
}
