import "@styles/index.scss";

import ReactDOM from "react-dom";
import React from "react";
import { TableWithContainer } from "./TableWithContainer";
import { tableNotes } from "./data";
import { Table } from "./Table";

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
          <TableWithContainer />
        </li>
        <li>
          <p>word-break</p>
          <TableWithContainer className="word-break" />
        </li>
        <li>
          <p>word-break equal-width-col</p>
          <TableWithContainer className="word-break equal-width-col" />
        </li>
        <li>
          <p>word-break equal-width-col min-width-30rem</p>
          <TableWithContainer className="word-break equal-width-col min-width-30rem" />
        </li>
        <li>
          <p>word-break equal-width-col min-width-30rem max-height-30rem sticky-header</p>
          <TableWithContainer className="word-break equal-width-col min-width-30rem max-height-30rem sticky-header" />
        </li>
      </ul>
      <div>
        <p>deeply nested table</p>
        <div>
          <span>
            <span>
              <span>
                <Table />
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
