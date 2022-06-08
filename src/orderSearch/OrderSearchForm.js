import React, { useState } from "react";

import { Button, Grid, OutlinedInput } from "@mui/material";

const OrderSearchForm = () => {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(code);
    setCode("");
  };

  return (
    <form style={{ margin: "10px 0" }} onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
        <Grid item>
          <OutlinedInput
            placeholder="Enter code"
            sx={{ height: 40, width: 150 }}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderSearchForm;
