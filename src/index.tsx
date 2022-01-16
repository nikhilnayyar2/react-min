import "@styles/index.scss";

import ReactDOM from "react-dom";
import React from "react";
import { Table } from "./table";
import { tableNotes } from "./data";

function App() {
  return (
    <div>
      <h4>Notes</h4>
      <ul>
        {tableNotes.map((note, i) => (
          <li key={i}>{note}</li>
        ))}
      </ul>
      <h4>Demos</h4>
      <ul id="App">
        <li>
          <p>-</p>
          <Table />
        </li>
        <li>
          <p>word-break</p>
          <Table className="word-break" />
        </li>
        <li>
          <p>word-break equal-width-col</p>
          <Table className="word-break equal-width-col" />
        </li>
        <li>
          <p>word-break equal-width-col min-width-30rem</p>
          <Table className="word-break equal-width-col min-width-30rem" />
        </li>
        <li>
          <p>word-break equal-width-col min-width-30rem max-height-30rem sticky-header</p>
          <Table className="word-break equal-width-col min-width-30rem max-height-30rem sticky-header" />
        </li>
      </ul>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
