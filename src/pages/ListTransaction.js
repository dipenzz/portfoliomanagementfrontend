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
// import useRefreshToken from "../hooks/useRefreshToken";
// import jwt_decode from "jwt-decode";

const ListTransactionPage = () => {
  const [apiData, setApiData] = useState([]);
  // const refresh = useRefreshToken();

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:3500/refresh", {
  //       token: localStorage.getItem("refreshToken"),
  //     });
  //     localStorage.setItem("accessToken", res.data.accessToken);
  //     localStorage.setItem("refreshToken", res.data.refreshToken);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // axios.interceptors.request.use(
  //   async (config) => {
  //     let currentDate = new Date();
  //     const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       await refreshToken();
  //       config.headers.authorization =
  //         "Bearer " + localStorage.getItem("accessToken");
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );

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
