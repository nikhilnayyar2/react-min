import React from "react";
import { Table } from "./Table";

export const TableWithContainer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={"table-container " + className}>
      <Table />
    </div>
  );
};

TableWithContainer.defaultProps = {
  className: undefined,
};
