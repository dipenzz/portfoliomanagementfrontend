import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import "../App.css";

const TransactionPage = () => {
  const [apiData, setApiData] = useState([]);

  const [values, setValues] = useState({
    stockName: "",
    transactionType: "",
    quantity: "",
    amount: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3500/stocks", {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => setApiData(response.data));
  }, []);

  const inputs = [
    {
      id: 1,
      name: "quantity",
      label: "Quantity",
      placeholder: "Enter quantity",
      type: "number",
      required: true,
    },
    {
      id: 2,
      name: "amount",
      label: "Amount",
      placeholder: "Enter Amount",
      type: "number",
      required: true,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    await axios.post(
      "http://localhost:3500/transaction",

      values,

      {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      }
    );
  };
  return (
    <div className="appTwo">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Transaction Form</h1>
            <div className="formInput">
              <label>StockName :</label>
              <select name="stockName" onChange={handleChange}>
                <option>--Select Stock Name--</option>
                {apiData.map((data) => {
                  const { _id, bankName } = data;
                  return (
                    <option key={_id} value={_id}>
                      {bankName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="formInput">
              <label>Transaction Type :</label>
              <select name="transactionType" onChange={handleChange}>
                <option>--Select Transation Type--</option>
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>
            {inputs.map((input) => {
              return (
                <Form
                  {...input}
                  key={input.id}
                  value={values[input.name]}
                  onChange={handleChange}
                />
              );
            })}
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionPage;
