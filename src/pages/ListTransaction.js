import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
} from "@mui/material";
import axios from "axios";
import "../App.css";

const ListTransactionPage = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3500/transaction", {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setApiData(response.data);
      });
  }, []);

  return (
    <>
      <div className="appTwo">
        <div className="app">
          <TableContainer
            sx={{ backgroundColor: "white", width: 900 }}
            component={Paper}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Stock Name</TableCell>
                  <TableCell>Transaction Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Transaction Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.map((data) => {
                  const {
                    _id,
                    stockName,
                    transactionType,
                    quantity,
                    amount,
                    transactionDate,
                  } = data;
                  return (
                    <TableRow key={_id}>
                      <TableCell>{stockName.bankName}</TableCell>
                      <TableCell>{transactionType}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>{amount}</TableCell>
                      <TableCell>{transactionDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <button onClick={() => refreshToken()}>Refresh</button> */}
        </div>
      </div>
    </>
  );
};

export default ListTransactionPage;
