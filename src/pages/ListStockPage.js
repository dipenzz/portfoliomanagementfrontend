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
import { Link, Outlet } from "react-router-dom";

const ListStockPage = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3500/stocks", {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setApiData(response.data);
      });
  }, [apiData]);

  const setId = (_id, buyingRate, sellingRate, retailAmount, bankName) => {
    console.log(_id);
    localStorage.setItem("ID", _id);
    localStorage.setItem("BuyingRate", buyingRate);
    localStorage.setItem("SellingRate", sellingRate);
    localStorage.setItem("RetailAmount", retailAmount);
    localStorage.setItem("BankName", bankName);
  };

  const deleteItem = async (_id, bankName) => {
    // eslint-disable-next-line no-restricted-globals
    let deleteStock = confirm(
      `Are you sure you want to delete Stock ${bankName}`
    );
    if (deleteStock === false) return;
    axios.delete(`http://localhost:3500/stocks/${_id}`, {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    });
  };

  return (
    <>
      <div className="appTwo">
        <div className="app">
          <TableContainer
            sx={{ backgroundColor: "white", width: 1000 }}
            component={Paper}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Stock Name</TableCell>
                  <TableCell>TotalUnits</TableCell>
                  <TableCell>Buying Rate</TableCell>
                  <TableCell>Selling Rate</TableCell>
                  <TableCell>Sold Amount</TableCell>
                  <TableCell>Overall Profit</TableCell>
                  <TableCell>Overall Loss</TableCell>
                  <TableCell>Total Investment Left</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="left" sx={{ marginRight: "10px" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.map((data) => {
                  const {
                    _id,
                    bankName,
                    totalUnits,
                    buyingRate,
                    sellingRate,
                    soldAmount,
                    overallProfit,
                    overallLoss,
                    currentAmount,
                    retailAmount,
                  } = data;
                  return (
                    <TableRow key={_id}>
                      <TableCell>{bankName}</TableCell>
                      <TableCell>{totalUnits}</TableCell>
                      <TableCell>{buyingRate}</TableCell>
                      <TableCell>{sellingRate}</TableCell>
                      <TableCell>{soldAmount}</TableCell>
                      <TableCell>{overallProfit}</TableCell>
                      <TableCell>{overallLoss}</TableCell>
                      <TableCell>{currentAmount}</TableCell>
                      <TableCell>
                        <Link to="updatestock">
                          <button
                            className="btn"
                            onClick={() => {
                              setId(
                                _id,
                                buyingRate,
                                sellingRate,
                                retailAmount,
                                bankName
                              );
                            }}
                          >
                            Update
                          </button>
                        </Link>
                      </TableCell>
                      <TableCell ali>
                        <button
                          className="btn"
                          onClick={() => deleteItem(_id, bankName)}
                          style={{ backgroundColor: "firebrick" }}
                          disabled //The delete is disabled because The Transaction list uses foreign Id i.e Object Id from Stock so when we deleted the stocks, the trasaction tickets that used foreign Id from stock was also deleted which resulted in error in transaction list page.
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="app">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ListStockPage;
