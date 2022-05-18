import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";

const TotalDatas = () => {
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
  }, []);

  return (
    <div className="appTwo">
      <div className="app">
        <TableContainer
          sx={{ backgroundColor: "white", width: 900 }}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>TotalUnits</TableCell>
                <TableCell>Sold Amount</TableCell>
                <TableCell>Overall Profit</TableCell>
                <TableCell>Overall Loss</TableCell>
                <TableCell>Total Investment Left</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.map((data) => {
                const {
                  _id,
                  totalUnits,
                  soldAmount,
                  overallProfit,
                  overallLoss,
                  currentAmount,
                } = data;

                return (
                  <TableRow key={_id}>
                    <TableCell>{totalUnits}</TableCell>
                    <TableCell>{soldAmount}</TableCell>
                    <TableCell>{overallProfit}</TableCell>
                    <TableCell>{overallLoss}</TableCell>
                    <TableCell>{currentAmount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TotalDatas;
