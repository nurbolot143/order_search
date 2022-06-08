import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { useHttp } from "../hooks/http.hook";
import OrderSearchForm from "./OrderSearchForm";
import OrderSearchHead from "./OrderSearchHead";
import OrderSearchFooter from "./OrderSearchFooter";

import "./orderSearch.css";

function createData(name, biomaterialName, code, researchName, price) {
  return {
    name,
    biomaterialName,
    code,
    researchName,
    price,
  };
}

const rows = [
  createData("Cupcake", "", 305, "исследование", 578),
  createData("Donut", "", 452, "исследование", 578),
  createData("Eclair", "", 262, "исследование", 578),
  createData("Frozen yoghurt", "", 159, "исследование", 578),
  createData("Gingerbread", "", 356, "исследование", 578),
  createData("Honeycomb", "", 408, "исследование", 578),
  createData("Ice cream sandwich", "", 454, "исследование", 578),
  createData("Jelly Bean", "", 375, "исследование", 578),
  createData("KitKat", "", 518, "исследование", 578),
  createData("Lollipop", "", 392, "исследование", 578),
  createData("Marshmallow", "", 318, "исследование", 578),
  createData("Nougat", "", 360, "исследование", 578),
  createData("Oreo", "", 437, "исследование", 578),
  createData("KitKat", "", 643, "исследование", 578),
  createData("Lollipop", "", 245, "исследование", 578),
  createData("Marshmallow", "", 3187678, "исследование", 578),
  createData("Nougat", "", 36054, "исследование", 578),
  createData("Oreo", "", 4375, "исследование", 578),
];

const OrderSearch = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("code");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { request } = useHttp();

  useEffect(() => {}, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
    console.log(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
  };

  const pageCount = 132;

  return (
    <div className="orderSearch">
      <div className="top">
        <h1 className="title">Order Search</h1>
        <OrderSearchForm />
      </div>
      <Paper elevation={3} sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ height: 440 }}>
          <Table stickyHeader aria-label="customized table" size="small">
            <OrderSearchHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map(
                ({ code, name, biomaterialName, researchName, price }) => {
                  return (
                    <TableRow key={code + name}>
                      <TableCell>{code}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{biomaterialName}</TableCell>
                      <TableCell>{researchName}</TableCell>
                      <TableCell>{price}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <OrderSearchFooter
        handleChangePage={handleChangePage}
        handlePageSize={handlePageSize}
        pageCount={pageCount}
        pageSize={pageSize}
        page={page}
      />
    </div>
  );
};

export default OrderSearch;
