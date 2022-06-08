import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import React from "react";

const OrderSearchFooter = (props) => {
  const { handleChangePage, handlePageSize, pageSize, page, pageCount } = props;

  return (
    <div className="footer">
      <div className="footer__left">
        <FormControl variant="standard" size="small" sx={{ marginRight: 2 }}>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={pageSize}
            onChange={handlePageSize}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
        Page {page} of {Math.ceil(pageCount / pageSize)} ({pageCount} items)
      </div>
      <div className="footer__right">
        <Pagination
          count={Math.ceil(pageCount / pageSize)}
          variant="outlined"
          shape="rounded"
          siblingCount={2}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default OrderSearchFooter;
