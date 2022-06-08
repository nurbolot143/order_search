import React from "react";

import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

const headCells = [
  {
    id: "code",
    label: "Код",
  },
  {
    id: "name",
    label: "Исследование",
  },
  {
    id: "biomaterialName",
    label: "Биомат.",
  },
  {
    id: "researchName",
    label: "Тип усл.",
  },
  {
    id: "price",
    label: "Цена",
  },
];

const OrderSearchHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label }) => (
          <TableCell
            key={id}
            align="left"
            padding="normal"
            sortDirection={orderBy === id ? order : false}
            style={{ background: "#bdbdbd" }}
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : "asc"}
              onClick={createSortHandler(id)}
            >
              {label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default OrderSearchHead;
