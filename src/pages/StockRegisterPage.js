import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import StockForm from "../components/StockForm";

const StockRegisterPage = () => {
  const [values, setValues] = useState({
    bankName: "",
    totalUnits: "",
    buyingRate: "",
    sellingRate: "",
    retailAmount: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setAdmin(localStorage.getItem("isAdmin"));
  }, []);

  const errRef = useRef();
  const [admin, setAdmin] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "bankName",
      placeholder: "Enter Stock Name",
      type: "text",
      label: "Stock Name :",
      required: true,
      errorMessage: "Stock Name is required !",
    },
    {
      id: 2,
      name: "totalUnits",
      placeholder: "Enter Total Units",
      type: "number",
      label: "Total Units :",
      required: true,
      errorMessage: "Total Units is required !",
    },
    {
      id: 3,
      name: "buyingRate",
      placeholder: "Enter Buying Rate",
      type: "number",
      label: "Buying Rate :",
      required: true,
      errorMessage: "Buying Rate is required !",
    },
    {
      id: 4,
      name: "sellingRate",
      placeholder: "Enter Selling Rate",
      type: "number",
      label: "Selling Rate :",
      required: true,
      errorMessage: "Selling Rate is required !",
    },
    {
      id: 5,
      name: "retailAmount",
      placeholder: "Enter Retail Amount",
      type: "number",
      label: "Retail Amount :",
      required: true,
      errorMessage: "Retail Amount is required !",
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
    await axios.post("http://localhost:3500/stocks", values, {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    });
    navigate("/baselayout/stocklists");
  };

  return (
    <>
      <div className="app">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h1>Stock Register</h1>
            <p
              ref={errRef}
              className={admin === "true" ? "offscreen" : "errmsg"}
            >
              Sorry Only Admins are Authorized to Add New Stock !
            </p>
            {inputs.map((input) => {
              return (
                <StockForm
                  {...input}
                  key={input.id}
                  value={values[input.name]}
                  onChange={handleChange}
                />
              );
            })}
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StockRegisterPage;
