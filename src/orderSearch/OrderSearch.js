import React, { useState, useEffect } from "react";

import {
  Alert,
  AlertTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useHttp } from "../hooks/http.hook";
import OrderSearchForm from "./OrderSearchForm";
import OrderSearchHead from "./OrderSearchHead";
import OrderSearchFooter from "./OrderSearchFooter";

import "./orderSearch.css";

const OrderSearch = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [countPage, setCountPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { request } = useHttp();

  const getOrders = async (url) => {
    setLoading(true);
    const res = await request(url);
    setLoading(false);
    return {
      count: res.count,
      size: res.size,
      data: res.dataObjects,
    };
  };

  useEffect(() => {
    setError(false);

    getOrders(
      `http://192.168.3.5:5666/api/orders/researches-with-prices?page=${page}&size=${pageSize}&sort[0].key=${orderBy}&sort[0].value=${order}`
    )
      .then((res) => {
        setOrderItems(res.data), setCountPage(res.count);
      })
      .catch((e) => {
        console.log(e), setError(true), setLoading(false);
      });
  }, [page, pageSize, orderBy, order]);

  const searchByCode = (code) => {
    setError(false);
    getOrders(
      `http://192.168.3.5:5666/api/orders/researches-with-prices?page=${page}&size=${pageSize}&sort[0].key=${orderBy}&sort[0].value=${order}&code=${code}`
    )
      .then((res) => {
        setOrderItems(res.data), setCountPage(res.count);
      })
      .catch((e) => {
        console.log(e), setError(true), setLoading(false);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const ordersRender = (items) =>
    items.map((item) => {
      const { code, name, biomaterialName, researchName, price, currencyName } =
        item;

      return (
        <TableRow key={code + name}>
          <TableCell>{code}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{biomaterialName}</TableCell>
          <TableCell>
            {researchName ? researchName.slice(0, 6) : null}
          </TableCell>
          <TableCell>{price + " " + currencyName}</TableCell>
        </TableRow>
      );
    });

  const elements = loading || error ? null : ordersRender(orderItems);

  const spinner = loading ? (
    <div className="spinner">
      <CircularProgress />
    </div>
  ) : null;

  const errorMessage = error ? (
    <Alert severity="error" className="error">
      <AlertTitle>Error</AlertTitle>
    </Alert>
  ) : null;

  return (
    <div className="orderSearch">
      <div className="top">
        <h1 className="title">Order Search</h1>
        <OrderSearchForm onSearchByCode={searchByCode} />
      </div>
      <Paper elevation={3} sx={{ overflow: "hidden", position: "relative" }}>
        {spinner}
        {errorMessage}
        <TableContainer sx={{ height: 440 }}>
          <Table stickyHeader aria-label="customized table" size="small">
            <OrderSearchHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>{elements}</TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {loading || error ? null : (
        <OrderSearchFooter
          handleChangePage={handleChangePage}
          handlePageSize={handlePageSize}
          countPage={countPage}
          pageSize={pageSize}
          page={page}
        />
      )}
    </div>
  );
};

export default OrderSearch;
